import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  /** `accent` uses the nearest `--accent` colour. */
  tone?: "neutral" | "accent";
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]",
        tone === "accent" ? "border-accent/40 text-accent" : "border-white/15 text-core8-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small uppercase label used above section headings. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent", className)}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
