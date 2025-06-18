import { NextResponse } from "next/server";
import OpenAI from "openai";
import personas from "@/lib/personas";
import { stringSimilarity } from "string-similarity-js";

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

if (!process.env.CONTEXTUAL_API_KEY) {
  throw new Error("CONTEXTUAL_API_KEY is not set");
}

if (!process.env.INFERENCE_API_KEY) {
  throw new Error("INFERENCE_API_KEY is not set");
}

const CTXL_API_KEY = process.env.CONTEXTUAL_API_KEY;

const openai = new OpenAI({
  baseURL: "https://api.inference.net/v1",
  apiKey: process.env.INFERENCE_API_KEY,
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
    // STEP before try: record the overall route start time
    stepStart("route");

    // Step 1: Generate ideas for each persona with structured output
    stepStart("generation");
    const ideaPromises = personas.map(async (persona) => {
      const genStart = Date.now();
      
      try {
        // Generate ideas directly in a parseable format
        const completion = await openai.chat.completions.create({
          model: "deepseek/deepseek-v3-0324/fp-8",
          messages: [
            {
              role: "user",
              content: `You are ${persona.name}: ${persona.thinkingTechnique}

The user is asking: "${query}"

Generate 10 unique, high-quality ideas that reflect your specific perspective and expertise. Each idea should:
1. Be practical and actionable
2. Reflect your unique viewpoint and background
3. Be different from obvious or common suggestions
4. Include specific details that make it compelling

Try to come up with the best possible idea, not just the one that is the most relevant to your expertise. You are just a person in a room trying to solve a problem, and just happen to be very intelligent.

You can add thoughts inside your response, but once your are ready to answer, make sure to format your ideas using XML tags like this:

<idea>
<description>Your description here. Explain the idea thoroughly, including why it's valuable, how it works, and what makes it unique. Use multiple sentences to fully flesh out the concept. Be specific and actionable. This can be as long as needed to properly explain the idea.</description>
<title>Your compelling and specific title here</title>
</idea>

<idea>
<description>Next explanation with all the context and specifics needed to understand and implement this idea.</description>
<title>Next creative title</title>
</idea>

Continue this pattern for all 10 ideas. Each idea must be wrapped in <idea> tags with <description> and <title> sub-tags.`
            }
          ],
          temperature: 0.8,
        });
        
        const genEnd = Date.now();
        const text = completion.choices[0]?.message?.content || "";

        // Parse the structured text directly - no second LLM call needed
        const ideas = parseIdeasXML(text, persona.name);

        return {
          ideas,
          latency: {
            generation_ms: genEnd - genStart,
          },
          persona: persona.name,
          success: true,
        };
      } catch (error) {
        console.error(`Failed to generate ideas for persona ${persona.name}:`, error);
        const genEnd = Date.now();
        return {
          ideas: [],
          latency: {
            generation_ms: genEnd - genStart,
          },
          persona: persona.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    const allIdeasResults = await Promise.all(ideaPromises);
    stepEnd("generation");

    // Flatten ideas and collect per-persona latency, filtering out failed requests
    const successfulResults = allIdeasResults.filter(r => r.success);
    const failedResults = allIdeasResults.filter(r => !r.success);
    
    // Log failed requests but continue with successful ones
    if (failedResults.length > 0) {
      console.warn(`${failedResults.length} persona requests failed:`, failedResults.map(r => ({ persona: r.persona, error: r.error })));
    }

    // If all requests failed, return an error
    if (successfulResults.length === 0) {
      console.error("All persona requests failed");
      return NextResponse.json({ error: "Failed to generate any ideas" }, { status: 500 });
    }

    let allIdeas: Omit<Idea, "rank">[] = successfulResults.flatMap(r => r.ideas);
    const perPersonaLatency = allIdeasResults.map(r => ({
      persona: r.persona,
      generation_ms: r.latency.generation_ms,
      success: r.success,
    }));

    // === FILTER OUT NEAR-DUPLICATE IDEAS (almost exactly the same) ===
    // We'll use a high similarity threshold (e.g., 0.97) to only filter almost identical ideas
    const SIMILARITY_THRESHOLD = 0.97;
    const uniqueIdeas: Omit<Idea, "rank">[] = [];
    for (const idea of allIdeas) {
      // Compare against all previously accepted ideas
      const isDuplicate = uniqueIdeas.some(existing => {
        // Compare both title+description
        const sim = stringSimilarity(
          (idea.title + " " + idea.description).toLowerCase(),
          (existing.title + " " + existing.description).toLowerCase()
        );
        return sim >= SIMILARITY_THRESHOLD;
      });
      if (!isDuplicate) {
        uniqueIdeas.push(idea);
      }
    }
    allIdeas = uniqueIdeas;
    // === END FILTER ===

    // Step 3: Ranking via Contextual.ai rerank API
    stepStart("ranking");
    let bestIds: string[] = [];
    try {
      const rankingStart = Date.now();
      // Compose document strings (title + description)
      const docs = allIdeas.map((idea) => `${idea.title} — ${idea.description}`);

      const ctxlRes = await fetch("https://api.app.contextual.ai/v1/rerank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTXL_API_KEY}`,
        },
        body: JSON.stringify({
          query,
          documents: docs,
          model: "ctxl-rerank-v1-instruct",
          top_n: 100,
          instruction: "Rank documents by overall quality, novelty and potential value of the idea."
        }),
      });

      if (!ctxlRes.ok) {
        throw new Error(`Contextual rerank failed ${ctxlRes.status}`);
      }

      const rerankData = await ctxlRes.json();
      const indices: number[] = (rerankData.results as { index: number }[]).map((r) => r.index);

      // indices refer to document positions (1-based?). API example shows 1. We'll assume 0-based? We'll guard.
      bestIds = indices.map((idx) => allIdeas[idx]?.id).filter(Boolean) as string[];

      const rankingEnd = Date.now();
      timings["ranking_latency_ms"] = rankingEnd - rankingStart;
    } catch (err) {
      console.error("Contextual rerank failed, using default order.", err);
      bestIds = allIdeas.map((idea) => idea.id);
    }
    stepEnd("ranking");

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

    // === ROUTE END TIMING ===
    stepEnd("route");

    // Compose latency info
    const latency = {
      total_ms: timings["route_latency_ms"],
      generation_total_ms: timings["generation_latency_ms"],
      ranking_ms: timings["ranking_latency_ms"],
      finalize_ms: timings["finalize_latency_ms"],
      per_persona: perPersonaLatency,
      successful_personas: successfulResults.length,
      failed_personas: failedResults.length,
    };

    const response = NextResponse.json({
      ideas: finalIdeas,
      latency,
    });

    // Attach total latency header to response for easy client access
    response.headers.set("x-route-latency-ms", String(latency.total_ms ?? ""));

    return response;
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json({ error: "Failed to generate ideas" }, { status: 500 });
  }
}

// XML parser function that extracts ideas from XML-structured format
function parseIdeasXML(text: string, personaName: string): Omit<Idea, "rank">[] {
  const ideas: Omit<Idea, "rank">[] = [];
  
  // Match all <idea> blocks with description first, then title
  const ideaMatches = text.matchAll(/<idea>\s*<description>([\s\S]*?)<\/description>\s*<title>([\s\S]*?)<\/title>\s*<\/idea>/g);
  
  // Regex used to detect any leftover XML tags inside the extracted content.
  const leftoverTagRegex = /<\s*\/?\s*(idea|title|description)\b/i;
  
  for (const match of ideaMatches) {
    const description = match[1].trim();
    const title = match[2].trim();

    // Skip ideas that still contain un-parsed XML markers – indicates malformed input.
    if (!title || !description) continue;
    if (leftoverTagRegex.test(title) || leftoverTagRegex.test(description)) {
      continue;
    }
    
    ideas.push({
      id: crypto.randomUUID(),
      title,
      description,
      persona: personaName,
    });
  }
  
  return ideas;
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