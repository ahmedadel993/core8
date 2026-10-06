"use client";

import { useRef, type ReactNode } from "react";
import { useProductScroll } from "@/components/scrollytelling/useProductScroll";

interface ScrollProductStoryProps {
  /** Intro heading rendered in normal flow above the sticky stage. */
  header: ReactNode;
  /** Server-rendered stage layers (visuals, steps, progress). */
  children: ReactNode;
}

/**
 * Client boundary for the scrollytelling section. It owns only the DOM refs
 * and the GSAP hook; every piece of content is passed in pre-rendered from
 * Server Components, so product copy stays in the static HTML.
 *
 * Desktop: a tall track with a CSS-sticky stage (no ScrollTrigger pinning).
 * Mobile: the same markup flows as stacked panels.
 */
export function ScrollProductStory({ header, children }: ScrollProductStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useProductScroll(sectionRef);

  return (
    <section ref={sectionRef} id="range" aria-labelledby="range-title" className="relative bg-black">
      {header}
      <div data-story-track className="relative lg:h-[600vh]">
        <div className="relative lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
