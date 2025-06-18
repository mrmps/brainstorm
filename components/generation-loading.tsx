"use client";

import * as React from "react";
import { LoadingProgress } from "@/components/loading-progress";

interface GenerationLoadingProps {
  /** Whether the parent is currently in a loading state */
  isActive: boolean;
  /** Optional additional Tailwind classes */
  className?: string;
}

/**
 * Full-page generation loading widget.
 *
 * Starts with "1 possibility" and quickly counts up to ~400,
 * then slowly crawls to 500 while the request is in flight.
 */
export default function GenerationLoading({
  isActive,
  className,
}: GenerationLoadingProps) {
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    if (!isActive) {
      // Reset when not active so we start fresh next time
      setCount(1);
      return;
    }

    let current = 1;
    let slowInterval: NodeJS.Timeout | undefined;

    // Fast climb to 400
    const fastInterval = setInterval(() => {
      const increment = 20 + Math.floor(Math.random() * 40); // 20-59
      current = Math.min(current + increment, 400);
      setCount(current);

      if (current >= 400) {
        clearInterval(fastInterval);
        // Slow climb past 400 → 500
        slowInterval = setInterval(() => {
          current = Math.min(current + 1, 500);
          setCount(current);
          if (current >= 500) {
            clearInterval(slowInterval!);
          }
        }, 300);
      }
    }, 75);

    return () => {
      clearInterval(fastInterval);
      if (slowInterval) clearInterval(slowInterval);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className={`space-y-4 flex flex-col items-center justify-center min-h-[120px] ${
        className ?? ""
      }`}
    >
      {/* Spinner */}
      <div className="relative flex items-center justify-center h-12 w-12 mb-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-primary/30 to-primary/70 opacity-30 animate-pulse" />
        <svg
          className="animate-spin h-10 w-10 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>

      {/* Progress bar */}
      <LoadingProgress isActive={isActive} />

      {/* Counter text */}
      <div className="text-lg font-medium animate-pulse">
        Generating {count.toLocaleString()} possibilities...
      </div>

      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <span className="animate-fade animate-infinite animate-duration-1500">
          Running through a dozen AI models
        </span>
      </div>
    </div>
  );
} 