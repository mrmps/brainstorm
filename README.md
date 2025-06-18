# Brainstorm.cool

**Brainstorm.cool** is a lightning-fast AI ideation engine that can generate **hundreds of high-quality ideas in seconds**. It does so by firing parallel LLM requests to [Inference.net](https://inference.net) for cost-effective generation and then re-ranking the results with [Contextual.ai](https://contextual.ai) to surface the most novel, valuable suggestions.

---

## Why Another Brainstorming Tool?
1. **Massive throughput** – Dozens of personas query the LLM **in parallel**, producing a large and diverse idea pool.
2. **Super-cheap generation** – Inference.net prices are a fraction of OpenAI's, making large fan-outs affordable.
3. **Quality over quantity** – Contextual.ai re-ranks every idea so the best rise to the top, not just the most obvious.
4. **Fully open-source** – Built with Next.js (App Router) + TypeScript + Tailwind and packaged with pnpm.

---

## Quick Start
```bash
# 1. Clone & install (pnpm is the preferred client for this repo)
git clone https://github.com/<your-org>/brainstorm.cool.git
cd brainstorm.cool
pnpm install

# 2. Configure secrets (see below)
cp .env.example .env.local # then edit it

# 3. Run the dev server
pnpm dev
# ➜  open http://localhost:3000
```

---

## Required API Keys
Brainstorm.cool relies on **two external services** and will throw on start-up if the keys are missing.

| Variable               | Where to get it                              | Purpose                               |
|------------------------|----------------------------------------------|---------------------------------------|
| `INFERENCE_API_KEY`    | `https://inference.net/dashboard`            | Auth token for cost-efficient LLM calls|
| `CONTEXTUAL_API_KEY`   | `https://contextual.ai/` (after sign-up)     | Rerank ideas by quality & novelty      |

Create an `.env.local` file at the project root:
```env
# .env.local
INFERENCE_API_KEY=pk-...
CONTEXTUAL_API_KEY=pk-...
```

---

## How It Works  
*(see `app/api/ideas/route.ts` for the exact implementation)*

1. **Receive a query** (`/api/ideas`, POST or GET). The query must be ≥ 30 characters.
2. **Parallel generation** – For each persona in [`lib/personas.ts`](./lib/personas.ts) a chat completion is sent to Inference.net (currently using the `deepseek/deepseek-v3-0324/fp-8` model). With ~40 personas × 10 ideas each you quickly reach **400+ raw ideas**.
3. **Parse** the XML-wrapped titles & descriptions into strongly-typed objects.
4. **Deduplicate** near-identical ideas with `string-similarity-js` (≥ 0.97 similarity threshold).
5. **Rerank** the remaining ideas via `POST https://api.app.contextual.ai/v1/rerank` using the `ctxl-rerank-v1-instruct` model. This scores documents by overall quality, novelty, and potential value.
6. **Return** a JSON payload with the ordered list and latency stats. A response header `x-route-latency-ms` makes performance visible in the browser console.

---

## Example Request
```http
POST /api/ideas HTTP/1.1
Content-Type: application/json

{
  "query": "Our city council wants initiatives to cut restaurant food waste by 50%."  
}
```

Example response (abridged):
```jsonc
{
  "ideas": [
    { "title": "In-store AR Composting Dashboard", "rank": 1, ... },
    { "title": "Dynamic Portion-Sizing Algorithm", "rank": 2, ... },
    // …
  ],
  "latency": { "total_ms": 1460, "generation_total_ms": 1020, "ranking_ms": 310 }
}
```

---

## Project Structure
```
app/
  api/
    ideas/          # Route handler described above
components/         # Reusable UI pieces
lib/
  personas.ts       # 40+ curated expert perspectives
public/
...
```

---

## Deployment
The project is **framework-agnostic** – any platform that can run Next.js 14 with Node ≥ 18 will work (Vercel, Render, Railway, Fly, etc.). Just make sure to set the two env vars above.

---

## Extending
• **Add personas** – Append new thinkers to `lib/personas.ts`.
• **Tune similarity threshold** – Change `SIMILARITY_THRESHOLD` in `route.ts`.
• **Swap reranker** – Replace the Contextual.ai block with your own scoring logic or another service.

---

## License
MIT – do whatever you like, just provide attribution if you build something cool on top.

> **Note**: The real-world individuals referenced in `personas.ts` are used purely for inspirational purposes and do **not** endorse this project.
