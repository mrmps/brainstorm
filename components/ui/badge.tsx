import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium",
  outline: "inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge"; 