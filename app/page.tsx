"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  row1Prompts,
  row2Prompts,
  row3Prompts,
  ExamplePrompt,
} from "@/lib/examplePrompts";

interface Idea {
  id: string;
  title: string;
  description: string;
  persona: string;
  rank: number;
  number?: number; // Add number field, optional for backward compatibility
}

export default function Home() {
  const [query, setQuery] = React.useState<string>("");
  const [results, setResults] = React.useState<Idea[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [latency, setLatency] = React.useState<number | null>(null);

  const minChars = 30;
  const progress = Math.min((query.length / minChars) * 100, 100);
  const canSubmit = query.trim().length >= minChars;

  async function search() {
    if (!canSubmit) return;
    setLoading(true);
    setHasSearched(true);
    setLatency(null);
    try {
      const start = performance.now();
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const end = performance.now();
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();

      // If API returns { ideas, latency }
      let ideas: Idea[];
      if (Array.isArray(data)) {
        ideas = data as Idea[];
      } else {
        ideas = data.ideas as Idea[];
        // optional latency from payload
        if (data.latency && typeof data.latency === "object" && data.latency.ranking_ms) {
          setLatency(data.latency.ranking_ms as number);
        }
      }

      // fallback to header/client latency
      if (latency === null) {
        const serverLatency = res.headers.get("x-route-latency-ms");
        if (serverLatency !== null) {
          setLatency(Number(serverLatency));
        } else if (latency === null) {
          setLatency(end - start);
        }
      }

      setResults(ideas);
    } catch (error) {
      console.error(error);
      setResults([]);
      setLatency(null);
    } finally {
      setLoading(false);
    }
  }

  // Sort results by number if present, otherwise by rank
  const sortedResults = React.useMemo(() => {
    if (!results || results.length === 0) return [];
    // If all have number, sort by number ascending
    if (results.every(r => typeof r.number === "number")) {
      return [...results].sort((a, b) => (a.number! - b.number!));
    }
    // Fallback: sort by rank ascending
    return [...results].sort((a, b) => a.rank - b.rank);
  }, [results]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-foreground tracking-tight">Brainstorm</div>
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <button className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-zinc-900">Every possibility.</span> <span className="text-zinc-700 italic font-extrabold" style={{ letterSpacing: "0.02em" }}>Ranked.</span>
          </h1>
          <p className="text-lg text-zinc-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Generate 1,000+ answers to any question, then see the best ones first. No more wondering if there&#39;s something better.
          </p>
        
          {/* Input Section */}
          <div className="relative inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl" style={{ transform: "none", transformOrigin: "50% 50% 0px", opacity: 1 }}>
            <div className="relative flex w-full flex-col gap-4">
              <div className="relative order-2 px-2 pb-3 sm:pb-4 md:order-1">
                <div className="border-input rounded-3xl border bg-popover relative z-10 p-0 pt-1 shadow-xs backdrop-blur-xl">
                  <textarea
                    data-slot="textarea"
                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content rounded-md border px-3 py-2 transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 w-full resize-none border-none bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 overflow-y-auto min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
                    autoFocus
                    style={{ maxHeight: "200px" }}
                    rows={1}
                    placeholder="What&#39;s the best name for my startup?"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey && canSubmit) {
                        e.preventDefault();
                        search();
                      }
                    }}
                  />
                  {/* Subtle progress bar below the textarea enclosure */}
                  <div className="absolute left-0 right-0 bottom-[-6px] h-1.5 w-full rounded-b-3xl overflow-hidden pointer-events-none mx-6 max-w-[calc(100%-44px)]">
                    <div
                      className="h-full transition-all duration-300 ease-out rounded-b-3xl"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, #b4e1fa 0%, #38bdf8 50%, #22d3ee 100%)`,
                        opacity: progress > 0 ? 0.7 : 0.2,
                        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s"
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-5 w-full justify-between px-3 pb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center gap-2 flex-1 max-w-xs">
                        <span className="text-xs text-muted-foreground font-mono min-w-[3rem]">
                          {query.length}/{minChars}
                        </span>
                      </div>
                    </div>
                    <button
                      data-slot="tooltip-trigger"
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-black text-white shadow-xs hover:bg-black/90 gap-1.5 px-3 has-[>svg]:px-2.5 size-9 rounded-full transition-all duration-300 ease-out"
                      type="button"
                      aria-label="Send message"
                      data-state="closed"
                      onClick={() => search()}
                      disabled={!canSubmit}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-4"><path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example chips - full width scrolling component */}
          {!hasSearched && (
            <div className="mt-8 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <style jsx>{`
                @keyframes scroll-left {
                  0% {
                    transform: translateX(0%);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                @keyframes scroll-right {
                  0% {
                    transform: translateX(-50%);
                  }
                  100% {
                    transform: translateX(0%);
                  }
                }
                .scroll-row-1 {
                  animation: scroll-left 60s linear infinite;
                }
                .scroll-row-2 {
                  animation: scroll-right 45s linear infinite;
                }
                .scroll-row-3 {
                  animation: scroll-left 75s linear infinite;
                }
              `}</style>
              
              <div className="flex flex-col gap-2">
                {/* Row 1 - Slow left scroll */}
                <div className="overflow-hidden w-full">
                  <div className="scroll-row-1 flex whitespace-nowrap">
                    {/* Original set */}
                    {[...row1Prompts, ...row1Prompts].map((example: ExamplePrompt, i) => (
                      <button
                        key={`1-${i}`}
                        onClick={() => setQuery(example.prompt)}
                        className="bg-white px-2 py-1 sm:px-2 sm:py-2 rounded-md sm:rounded-lg bg-opacity-50 mr-2 border border-stone-200 text-xs sm:text-sm w-auto whitespace-nowrap flex-shrink-0 cursor-pointer hover:bg-opacity-100 hover:border-stone-300 active:bg-opacity-70 transition-all duration-100 select-none"
                      >
                        {example.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Fast right scroll */}
                <div className="overflow-hidden w-full">
                  <div className="scroll-row-2 flex whitespace-nowrap">
                    {/* Original set */}
                    {[...row2Prompts, ...row2Prompts].map((example: ExamplePrompt, i) => (
                      <button
                        key={`2-${i}`}
                        onClick={() => setQuery(example.prompt)}
                        className="bg-white px-2 py-1 sm:px-2 sm:py-2 rounded-md sm:rounded-lg bg-opacity-50 mr-2 border border-stone-200 text-xs sm:text-sm w-auto whitespace-nowrap flex-shrink-0 cursor-pointer hover:bg-opacity-100 hover:border-stone-300 active:bg-opacity-70 transition-all duration-100 select-none"
                      >
                        {example.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 3 - Medium left scroll */}
                <div className="overflow-hidden w-full">
                  <div className="scroll-row-3 flex whitespace-nowrap">
                    {/* Original set */}
                    {[...row3Prompts, ...row3Prompts].map((example: ExamplePrompt, i) => (
                      <button
                        key={`3-${i}`}
                        onClick={() => setQuery(example.prompt)}
                        className="bg-white px-2 py-1 sm:px-2 sm:py-2 rounded-md sm:rounded-lg bg-opacity-50 mr-2 border border-stone-200 text-xs sm:text-sm w-auto whitespace-nowrap flex-shrink-0 cursor-pointer hover:bg-opacity-100 hover:border-stone-300 active:bg-opacity-70 transition-all duration-100 select-none"
                      >
                        {example.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section - right under input */}
      {(loading || results.length > 0) && (
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              {loading ? (
                <div className="space-y-2">
                  <div className="text-lg font-medium">Generating possibilities...</div>
                  <div className="text-sm text-muted-foreground">Running through a dozen AI models</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-lg font-medium">Found {results.length.toLocaleString()} possibilities</div>
                  <div className="text-sm text-muted-foreground">Showing the best results first</div>
                  {latency !== null && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Latency: {latency.toFixed(0)} ms (@route.ts)
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-gradient-to-r from-muted to-muted/60 rounded-xl animate-pulse"
                  />
                ))
              ) : (
                sortedResults.map((item) => (
                  <Card
                    key={item.id}
                    className="p-6 border border-border/60 rounded-xl bg-white/80 backdrop-blur-sm hover:shadow-lg hover:border-border transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-sm font-mono text-muted-foreground">
                        {/* Show number if present, else rank */}
                        {typeof item.number === "number" ? (
                          <>#{item.number}</>
                        ) : (
                          <>#{item.rank}</>
                        )}
                      </div>
                      <div className="text-right text-xs text-muted-foreground italic">
                        {item.persona}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="px-6 py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-16">How it works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "You ask", desc: "Any question with multiple possible answers" },
              { step: "02", title: "We generate", desc: "12 different AI models create thousands of possibilities" },
              { step: "03", title: "We rank", desc: "Every option scored for quality and relevance" },
              { step: "04", title: "You choose", desc: "From the definitively best options, in order" }
            ].map(({ step, title, desc }) => (
              <div key={step} className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-mono text-sm flex items-center justify-center mx-auto">
                  {step}
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-2xl font-semibold text-foreground mb-2">
              Stop settling for the first answer.
            </p>
            <p className="text-muted-foreground">
              The best option is ranked #1. Always.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">API</a>
            <a href="#" className="hover:text-foreground transition-colors">Examples</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
