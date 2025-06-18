import * as React from "react";

export default function PoweredByBanner() {
  return (
    <section
      className="w-full"
      style={{
        background: "var(--primary)",
        paddingTop: "2px",
        paddingBottom: "2px",
      }}
    >
      <div
        className="max-w-5xl mx-auto px-3 flex flex-row items-center justify-center gap-6 text-xs"
        style={{
          color: "var(--primary-foreground)",
          minHeight: "24px",
        }}
      >
        <a
          href="https://inference.net"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 flex-shrink-0 hover:underline"
        >
          <span className="whitespace-nowrap">Affordable LLM inference by</span>
          <img
            src="/inf.png"
            alt="Inference.net logo"
            className="h-4 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
        <span className="hidden md:inline-block opacity-50">|</span>
        <a
          href="https://contextual.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 flex-shrink-0 hover:underline"
        >
          <span className="whitespace-nowrap">Contextual reranking by</span>
          <img
            src="https://contextual.ai/wp-content/uploads/2024/07/logo-black.png"
            alt="Contextual AI logo"
            className="h-4 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
      </div>
    </section>
  );
}