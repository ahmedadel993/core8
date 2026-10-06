import "react";

declare module "react" {
  interface CSSProperties {
    /** Per-product accent colour consumed by Tailwind as `var(--accent)`. */
    "--accent"?: string;
    /** Stagger delay for `Reveal`. */
    "--reveal-delay"?: string;
  }
}
