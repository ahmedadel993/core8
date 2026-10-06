"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Stagger delay in ms. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Lightweight fade-up on scroll using IntersectionObserver (no GSAP).
 * Hidden styles live in globals.css and only apply when JS runs and the user
 * allows motion, so content is never invisible to crawlers or no-JS visitors.
 */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, style, ...props }: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Component: ElementType = as ?? "div";
  return (
    <Component
      ref={ref}
      data-reveal={visible ? "visible" : "hidden"}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style}
      {...props}
    />
  );
}
