"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  row1Prompts,
  row2Prompts,
  row3Prompts,
  ExamplePrompt,
} from "@/lib/examplePrompts";
import { stringSimilarity } from "string-similarity-js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Import shadcn/ui Sheet (sidebar) components
import { Sheet, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import GenerationLoading from "@/components/generation-loading";
import FAQ from "@/components/faq";
import PoweredByBanner from "@/components/powered-by-banner";
import { ArrowRight, CheckCircle, ListChecks, MessageCircleQuestion, Users  } from "lucide-react";
import Navbar from "@/components/navbar";
import Image from "next/image";

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

  // Sidebar state
  const [selectedIdea, setSelectedIdea] = React.useState<Idea | null>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

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

  // Compute similar ideas for sidebar
  const similarIdeas = React.useMemo(() => {
    if (!selectedIdea) return [] as Idea[];
    // compute similarity on title+description
    const sims = results
      .filter((i) => i.id !== selectedIdea.id)
      .map((idea) => ({
        idea,
        score: stringSimilarity(
          `${selectedIdea.title} ${selectedIdea.description}`,
          `${idea.title} ${idea.description}`
        ),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((s) => s.idea);
    return sims;
  }, [selectedIdea, results]);

  // Handler for card click
  function handleCardClick(idea: Idea) {
    setSelectedIdea(idea);
    setSidebarOpen(true);
  }


  return (
    <div className="min-h-screen bg-background">
      <PoweredByBanner />
      {/* Sidebar for selected idea */}
      <Sheet open={sidebarOpen} onOpenChange={open => {
        setSidebarOpen(open);
        if (!open) setTimeout(() => setSelectedIdea(null), 200);
      }}>
        <SheetContent side="right" className="max-w-md w-full p-0 flex flex-col">
          {/* Visually hidden title for accessibility */}
          <SheetTitle className="sr-only">{selectedIdea?.title}</SheetTitle>

          {selectedIdea ? (
            <>
              {/* HEADER */}
              <div className="bg-primary/10 px-6 py-4 backdrop-blur-md sticky top-0 z-10">
                <div className="text-primary font-mono text-xs">
                  {typeof selectedIdea.number === "number" ? (
                    <>#{selectedIdea.number}</>
                  ) : (
                    <>#{selectedIdea.rank}</>
                  )}
                </div>
                <h2 className="text-lg font-semibold leading-snug mt-1">
                  {selectedIdea.title}
                </h2>
                <p className="text-xs text-muted-foreground italic mt-1">
                  {selectedIdea.persona}
                </p>
              </div>

              {/* BODY SCROLL AREA */}
              <ScrollArea className="flex-1 px-6 py-4" style={{ maxHeight: "calc(100vh - 120px)", minHeight: 0 }}>
                <div className="flex flex-col gap-8" style={{ minHeight: 0 }}>
                  <div>
                    <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                      {selectedIdea.description}
                    </p>
                  </div>

                  {similarIdeas.length > 0 && (
                    <div className="mt-0">
                      <Separator className="my-4" />
                      <h4 className="text-sm font-semibold text-foreground mb-3">Similar ideas</h4>
                      <ul className="space-y-3">
                        {similarIdeas.map((idea) => (
                          <li key={idea.id}>
                            <button
                              onClick={() => setSelectedIdea(idea)}
                              className="block w-full text-left bg-secondary/60 hover:bg-secondary px-3 py-2 rounded-md transition-colors"
                            >
                              <p className="text-sm font-medium text-foreground">
                                {idea.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-3">
                                {idea.description}
                              </p>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* FOOTER ACTIONS */}
              <div className="p-4 border-t border-border/60 flex justify-end gap-3 bg-background/80 backdrop-blur-md sticky bottom-0">
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No idea selected
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 py-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-zinc-800">Every possibility.</span> <span className="text-primary italic font-extrabold" style={{ letterSpacing: "0.02em" }}>Ranked.</span>
          </h1>
          <p className="text-lg text-zinc-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Generate 500+ answers to any question, then see the best ones first. No more wondering if there&#39;s something better.
          </p>
          
          {/* Powered by Inference section */}
          <div className="mb-8 flex items-center justify-center">
            <div className="group relative bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border border-primary/30 rounded-full px-8 py-2 flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <a href="https://inference.net" target="_blank" rel="noopener noreferrer" className="relative flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-primary transition-colors duration-200">
                <span className="tracking-wide">Powered by</span>
                <Image src="/inf.png" alt="Inference" width={80} height={24} priority />
              </a>
              <div className="relative">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping opacity-30"></div>
              </div>
            </div>
          </div>
          {/* Input Section */}
          <div className="relative inset-x-0 bottom-0 z-20 mx-auto w-full max-w-3xl" style={{ transform: "none", transformOrigin: "50% 50% 0px", opacity: 1 }}>
            <div className="relative flex w-full flex-col gap-4">
              <div className="relative order-2 px-2 pb-3 sm:pb-4 md:order-1">
                <div className="border-input rounded-3xl border bg-popover relative z-10 p-0 pt-1 shadow-xs backdrop-blur-xl ring-1 ring-zinc-200">
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
                  {progress > 0 &&  !loading && (
                    <div className="absolute left-0 right-0 bottom-[-1px] pointer-events-none mx-6 max-w-[calc(100%-44px)]">
                      <Progress value={progress} className="rounded-b-3xl" />
                    </div>
                  )}
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
                <GenerationLoading isActive={loading} />
              ) : (
                <div className="space-y-2">
                  <div className="text-lg font-medium">Found {results.length.toLocaleString()} possibilities</div>
                  <div className="text-sm text-muted-foreground">Showing the best results first</div>
                  {latency !== null && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Latency: {latency?.toFixed(0)} ms
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
                    className="p-3 border border-border/40 rounded-lg bg-white/90 hover:shadow-md hover:border-primary/60 transition-all cursor-pointer group flex flex-col gap-1 min-h-[80px] focus:ring-2 focus:ring-primary/40 outline-none relative"
                    onClick={() => handleCardClick(item)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${item.title}`}
                  >
                    {/* Number badge in top-right, out of main flow */}
                    <span className="absolute top-2 right-2 text-xs font-mono text-primary/80 bg-primary/10 rounded px-2 py-0.5 shadow-sm z-10">
                      {typeof item.number === "number" ? `#${item.number}` : `#${item.rank}`}
                    </span>
                    <div className="font-semibold text-base text-foreground group-hover:text-primary transition-colors pr-10">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2 leading-snug">
                      {item.description}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="relative px-6 py-28 pb-12 bg-gradient-to-b from-secondary/15 via-background to-background overflow-hidden">
        {/* Decorative SVG background */}
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 opacity-30 blur-2xl"
          width="1200"
          height="320"
          viewBox="0 0 1200 320"
          fill="none"
        >
          <ellipse cx="600" cy="160" rx="600" ry="120" fill="url(#howitworks-gradient)" />
          <defs>
            <linearGradient id="howitworks-gradient" x1="0" y1="0" x2="1200" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2E7850" />
              <stop offset="1" stopColor="#DFEAE5" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center rounded-full border px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold tracking-wide shadow-sm mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
              <path d="M10 2v16m8-8H2" />
            </svg>
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-700 mb-6">
            From Question to <span className="text-primary">Best Answer</span> in Seconds
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-zinc-600 mb-20">
            Our process combines the creativity of multiple AI models with advanced ranking to deliver the most relevant, high-quality answers—every time.
          </p>

          {/* Import lucide icons at the top of your file:
              import { MessageCircleQuestion, Users, ListChecks, CheckCircle } from "lucide-react";
          */}
          <div className="relative grid md:grid-cols-4 gap-10">
            {[
              {
                step: "01",
                title: "You ask",
                desc: "Pose any open-ended question—brainstorm, name, or solve. The more detail, the better.",
                icon: (
                  <MessageCircleQuestion className="w-7 h-7 text-primary" strokeWidth={2} />
                ),
              },
              {
                step: "02",
                title: "We generate",
                desc: "multiple creative AI personas each create 10 unique ideas, giving you a diverse pool of possibilities.",
                icon: (
                  <Users className="w-7 h-7 text-primary" strokeWidth={2} />
                ),
              },
              {
                step: "03",
                title: "We rank",
                desc: "Every idea is scored for quality, creativity, and relevance using a specialized reranking model.",
                icon: (
                  <ListChecks className="w-7 h-7 text-primary" strokeWidth={2} />
                ),
              },
              {
                step: "04",
                title: "You choose",
                desc: "Browse the top-ranked results—instantly see the best options, ready for your next move.",
                icon: (
                  <CheckCircle className="w-7 h-7 text-primary" strokeWidth={2} />
                ),
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="space-y-5">
                {/* Icon bubble */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-white ring-1 ring-black/5">
                  {icon}             
                </div>
                {/* Step label */}
                <p className="font-mono text-xs uppercase tracking-wider text-primary/70">{step}</p>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <section className="relative px-6 py-28 bg-gradient-to-b from-primary via-zinc-900 to-black rounded-t-[20px] shadow-md text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to brainstorm better?</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80 mb-10">
            Start your first brainstorm now and watch the top ideas rise to the top—instantly.
          </p>
          <button
            onClick={() => {
              const textarea = document.querySelector('textarea');
              if (textarea) (textarea as HTMLTextAreaElement).focus();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            Get started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-2xl font-semibold text-zinc-100 mb-2">
              Stop settling for the first answer.
            </p>
            <p className="text-zinc-400">
              The best option is ranked #1. Always.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {/* <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">API</a>
            <a href="#" className="hover:text-foreground transition-colors">Examples</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
