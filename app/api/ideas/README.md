# Idea Generation API (`/api/ideas`)

This directory contains the Next.js **route handler** responsible for generating, deduplicating and ranking innovative ideas using multiple LLM calls.

---

## Overview
`app/api/ideas/route.ts` exposes two HTTP methods:

1. **POST** `/api/ideas` – Accepts a JSON body with a long‐form query and returns a ranked list of ideas.
2. **GET**  `/api/ideas?query=...` – Convenience wrapper that performs the same behaviour using a query-string parameter.

Both methods ultimately call the same `generateIdeas()` function.

---

## Request
### POST
```http
POST /api/ideas HTTP/1.1
Content-Type: application/json

{
  "query": "Your problem statement – must be at least 30 characters long."
}
```

### GET
```http
GET /api/ideas?query=Your+URL+encoded+problem+statement
```

> **Note**
> Queries shorter than **30 characters** are rejected with HTTP 400.

---

## Response
Successful calls return **HTTP 200** and a JSON payload of the form:

```jsonc
{
  "ideas": [
    {
      "id": "18f38e1d-30b8-4f9c-9ba5-46e6448b7b9d",
      "title": "In-store AR Composting Dashboard",
      "description": "Install an augmented-reality kiosk that…",
      "persona": "Daniel Kahneman",
      "rank": 1
    },
    // …more ideas (possibly > 10 due to multiple personas)
  ],
  "latency": {
    "total_ms": 1420,
    "generation_total_ms": 938,
    "ranking_ms": 312,
    "finalize_ms": 73,
    "per_persona": [
      { "persona": "Geoffrey Hinton", "generation_ms": 86 },
      { "persona": "Robin Wall Kimmerer", "generation_ms": 102 }
      // …one entry per persona invoked
    ]
  }
}
```

Additional metadata is surfaced via the response header `x-route-latency-ms` for easy client-side performance monitoring.

---

## How it Works (High-level)
1. **Idea Generation** – For every persona defined in [`lib/personas.ts`](../../lib/personas.ts) a chat completion is requested from the Inference API with a prompt instructing the model to return **10 XML-wrapped ideas**.
2. **XML Parsing** – The raw LLM output is parsed by `parseIdeasXML()` which extracts `<idea>`, `<title>` and `<description>` tags into a structured object.
3. **Deduplication** – Candidate ideas are compared with `string-similarity-js`; pairs above a **0.97 similarity** threshold are treated as duplicates and removed.
4. **Quality Ranking** – Remaining ideas are re-ranked via [Contextual.ai](https://contextual.ai) using the `ctxl-rerank-v1-instruct` model. The service scores items based on quality, novelty and potential value.
5. **Final Assembly** – The top-ranked IDs are ordered, remaining ideas appended, and a `rank` field is injected to preserve the final ordering.

---

## Environment Variables
The route depends on two secrets that **must** be present (e.g. in `.env.local`):

| Variable               | Purpose                                   |
|------------------------|-------------------------------------------|
| `CONTEXTUAL_API_KEY`   | Auth token to call Contextual.ai re-rank |
| `INFERENCE_API_KEY`    | Auth token for the Inference LLM backend |

If either variable is missing during server start-up, the route throws immediately to avoid accidental unauthenticated calls.

---

## Local Development
```bash
# Install dependencies (pnpm is preferred across the repo)
pnpm install

# Run Next.js in dev mode with your env vars loaded
CONTEXTUAL_API_KEY=… INFERENCE_API_KEY=… pnpm dev
```

---

## Extending / Customising
* **Personas** – Edit `lib/personas.ts` to add or remove thinkers.
* **Similarity threshold** – Adjust `SIMILARITY_THRESHOLD` in `route.ts` to be more/less strict.
* **Ranking provider** – Swap out the Contextual.ai block in `generateIdeas()` with any rerank service or bespoke logic.

---

## License & Attribution
Created as part of the Brainstorm project. The individuals listed in `personas.ts` are referenced for inspirational purposes only and do not endorse this software. 