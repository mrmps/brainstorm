"use client"
import * as React from "react"
import { Progress } from "@/components/ui/progress"

interface LoadingProgressProps {
  /** Whether the parent is currently in a loading state */
  isActive: boolean
  /** Optional width override */
  className?: string
}

/**
 * Brand-aware progress bar used during loading states.
 * Quickly progresses to 20%, then crawls towards 95% until the real work finishes.
 */
export function LoadingProgress({ isActive, className }: LoadingProgressProps) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (!isActive) {
      // Reset when leaving the loading state so the next load starts fresh
      setValue(0)
      return
    }

    let current = 0
    setValue(current)

    const interval = setInterval(() => {
      // Accelerate quickly to 20%, then slow down
      const increment = current < 20 ? 4 + Math.random() * 4 : 1 + Math.random() * 2
      current = Math.min(current + increment, 95) // never hit 100% on its own
      setValue(Math.floor(current))
    }, 180)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  return <Progress value={value} className={className ?? "w-[60%]"} />
}
