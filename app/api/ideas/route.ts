import { NextResponse } from "next/server";
import { generateText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import personas from "@/lib/personas";

// Typesafe interfaces
interface GeneratedIdea {
  title: string;
  description: string;
}

interface Idea extends GeneratedIdea {
  id: string;
  persona: string;
  rank: number;
}

// Extraction schema for a single idea
const ideaExtractSchema = z.object({
  title: z.string().describe("A concise, compelling title for the idea"),
  description: z.string().describe("A detailed description explaining the idea and its value proposition"),
});

// Extraction schema for a list of ideas
const ideasExtractSchema = z.object({
  ideas: z.array(ideaExtractSchema)
});

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query || typeof query !== "string" || query.trim().length < 30) {
      return NextResponse.json(
        { error: "Query must be at least 30 characters" },
        { status: 400 }
      );
    }

    return generateIdeas(query);
  } catch (e) {
    console.error("Invalid JSON", e);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

async function generateIdeas(query: string) {
  // We'll collect latency for each step
  const timings: Record<string, number> = {};
  const stepStart = (step: string) => {
    timings[`${step}_start`] = Date.now();
  };
  const stepEnd = (step: string) => {
    timings[`${step}_end`] = Date.now();
    timings[`${step}_latency_ms`] = timings[`${step}_end`] - timings[`${step}_start`];
  };

  try {
    // Step 1: Generate ideas for each persona
    stepStart("generation");
    const ideaPromises = personas.map(async (persona) => {
      // 1. Generate ideas as plain text using openai/gpt-4o-mini
      const genStart = Date.now();
      const { text } = await generateText({
        model: openai("gpt-4.1-mini"),
        prompt: `You are ${persona.name}: ${persona.perspective}

The user is asking: "${query}"

Generate 10 unique, high-quality ideas that reflect your specific perspective and expertise. Each idea should:
1. Be practical and actionable
2. Reflect your unique viewpoint and background
3. Be different from obvious or common suggestions
4. Include specific details that make it compelling

Try to come up with the best possible idea, not just the one that is the most relevant to your espertise. You are just a person in a room trying to solve a problem, and just happen to be very intelligent.

Format as a numbered list. Each item should have a title and a detailed explanation.`,
      });
      const genEnd = Date.now();

      // 2. Extract ideas from the generated text using gpt-4.1-nano
      const extractStart = Date.now();
      const extraction = await generateObject({
        model: openai("gpt-4.1-nano"),
        schema: ideasExtractSchema,
        prompt: `Extract the list of ideas from the following text. For each idea, extract the title and a detailed description. If the explanation is missing, use the title as the description.

Text:
${text}
`,
      });
      const extractEnd = Date.now();

      // 3. Map extracted ideas to our Idea type (without rank)
      const ideas = extraction.object.ideas.map((idea: GeneratedIdea): Omit<Idea, "rank"> => ({
        ...idea,
        persona: persona.name,
        id: crypto.randomUUID(),
      }));

      // Return per-persona latency info for debugging
      return {
        ideas,
        latency: {
          generation_ms: genEnd - genStart,
          extraction_ms: extractEnd - extractStart,
        },
        persona: persona.name,
      };
    });

    const allIdeasResults = await Promise.all(ideaPromises);
    stepEnd("generation");

    // Flatten ideas and collect per-persona latency
    const allIdeas: Omit<Idea, "rank">[] = allIdeasResults.flatMap(r => r.ideas);
    const perPersonaLatency = allIdeasResults.map(r => ({
      persona: r.persona,
      generation_ms: r.latency.generation_ms,
      extraction_ms: r.latency.extraction_ms,
    }));

    // Step 2: Prepare summary for ranking
    stepStart("summary");
    const summaryForRanking = allIdeas
      .map(
        (idea) =>
          `ID: ${idea.id}\nTitle: ${idea.title}\nDescription: ${idea.description}`
      )
      .join("\n---\n");
    stepEnd("summary");

    // Step 3: Ranking
    stepStart("ranking");
    const rankingPrompt = `
You are an expert at evaluating and ranking creative ideas for quality, novelty, and value.

Given the following 50 ideas (each with an ID, title, description, and persona), select and order the best 50 ideasin the order you believe is best, from #1 (best) to #50 (least best). Only use the information provided.

Return a JSON array of the IDs in your chosen order. Do not include any explanation or extra text.

Ideas:
${summaryForRanking}
`;

    let bestIds: string[] = [];
    let rankingLatencyMs = 0;
    try {
      const rankingStart = Date.now();
      const { text: idsText } = await generateText({
        model: openai("gpt-4.1"),
        prompt: rankingPrompt,
      });
      const rankingEnd = Date.now();
      rankingLatencyMs = rankingEnd - rankingStart;

      // Clean potential markdown/code-fence wrappers
      let cleaned = idsText
        .replace(/```json[\s\S]*?/i, "") // remove ```json prefix if present
        .replace(/```/g, "") // remove closing fences
        .trim();

      // Extract first JSON array if additional text present
      const arrMatch = cleaned.match(/\[[\s\S]*\]/);
      if (arrMatch) {
        cleaned = arrMatch[0];
      }

      bestIds = JSON.parse(cleaned);
    } catch (err) {
      // If ranking fails, fall back to the original order
      console.error("Failed to get ranked IDs from large model, using default order.", err);
      bestIds = allIdeas.map((idea) => idea.id);
    }
    stepEnd("ranking");
    timings["ranking_latency_ms"] = rankingLatencyMs;

    // Step 4: Reorder and finalize
    stepStart("finalize");
    const idToIdea = new Map(allIdeas.map((idea) => [idea.id, idea]));
    const bestIdSet = new Set(bestIds);
    const orderedTop: Idea[] = bestIds.map((id, idx) => {
      const idea = idToIdea.get(id);
      if (!idea) {
        return {
          id,
          title: "Unknown",
          description: "",
          persona: "",
          rank: idx + 1,
        };
      }
      return {
        ...idea,
        rank: idx + 1,
      };
    });

    // Append the rest of the ideas (those not in bestIds) preserving original generation order
    const remaining = allIdeas.filter((idea) => !bestIdSet.has(idea.id));
    const finalIdeas: Idea[] = orderedTop.concat(
      remaining.map((idea, index) => ({ ...idea, rank: orderedTop.length + index + 1 }))
    );
    stepEnd("finalize");

    // Compose latency info
    const latency = {
      generation_total_ms: timings["generation_latency_ms"],
      summary_ms: timings["summary_latency_ms"],
      ranking_ms: timings["ranking_latency_ms"],
      finalize_ms: timings["finalize_latency_ms"],
      per_persona: perPersonaLatency,
    };

    return NextResponse.json({
      ideas: finalIdeas,
      latency,
    });
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json({ error: "Failed to generate ideas" }, { status: 500 });
  }
}

// Modify GET to reuse generateIdeas
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";

  if (!query || query.trim().length < 30) {
    return NextResponse.json(
      { error: "Query must be at least 30 characters" },
      { status: 400 }
    );
  }

  return generateIdeas(query.trim());
}