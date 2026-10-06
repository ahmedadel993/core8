import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, intro, align = "start", className }: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-5 font-display text-4xl leading-[0.95] font-extrabold tracking-tight text-balance uppercase [font-stretch:85%] sm:text-5xl lg:text-6xl xl:text-7xl"
      >
        {title}
      </h2>
      {intro ? <p className="mt-6 max-w-2xl text-base leading-relaxed text-core8-gray sm:text-lg">{intro}</p> : null}
    </header>
  );
}
