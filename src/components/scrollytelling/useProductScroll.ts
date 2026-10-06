"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Share of each product segment spent holding vs. transitioning. */
const HOLD = 0.62;
const MOVE = 1 - HOLD;
const FINALE = 0.7;
const OUTRO = 0.45;

const DESKTOP = "(min-width: 1024px)";

interface StoryElements {
  track: HTMLElement;
  steps: HTMLElement[];
  reveals: HTMLElement[][];
  bottles: HTMLElement[];
  glows: HTMLElement[];
  words: HTMLElement[];
  ring: HTMLElement | null;
  finale: HTMLElement | null;
  progressFill: HTMLElement | null;
  progressItems: HTMLElement[];
}

function collect(root: HTMLElement): StoryElements | null {
  const track = root.querySelector<HTMLElement>("[data-story-track]");
  if (!track) return null;
  const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", root);
  return {
    track,
    steps,
    reveals: steps.map((step) => gsap.utils.toArray<HTMLElement>("[data-story-reveal]", step)),
    bottles: gsap.utils.toArray<HTMLElement>("[data-story-bottle]", root),
    glows: gsap.utils.toArray<HTMLElement>("[data-story-glow]", root),
    words: gsap.utils.toArray<HTMLElement>("[data-story-word]", root),
    ring: root.querySelector<HTMLElement>("[data-story-ring]"),
    finale: root.querySelector<HTMLElement>("[data-story-finale]"),
    progressFill: root.querySelector<HTMLElement>("[data-story-progress-fill]"),
    progressItems: gsap.utils.toArray<HTMLElement>("[data-story-progress-item]", root),
  };
}

/** Horizontal distance between bottles in the closing lineup. */
function lineupSpacing() {
  return Math.min(window.innerWidth * 0.155, 240);
}

function markActive(items: HTMLElement[], active: number) {
  items.forEach((item, index) => {
    item.dataset.active = String(index === active);
    item.dataset.done = String(index < active);
  });
}

/** Desktop: one scrubbed timeline drives the whole sticky stage. */
function buildDesktopTimeline(el: StoryElements) {
  const { steps, reveals, bottles, glows, words, ring, finale, progressFill, progressItems } = el;
  const count = steps.length;
  const center = (count - 1) / 2;

  // Initial state: first product on stage, everything else waiting.
  gsap.set(steps, { autoAlpha: 0 });
  gsap.set(steps[0], { autoAlpha: 1 });
  reveals.slice(1).forEach((group) => gsap.set(group, { autoAlpha: 0, y: 36 }));
  gsap.set(bottles, { autoAlpha: 0, yPercent: 22, scale: 0.84, rotation: 9, x: 0 });
  gsap.set(bottles[0], { autoAlpha: 1, yPercent: 0, scale: 1, rotation: 0 });
  gsap.set(glows, { autoAlpha: 0 });
  gsap.set(glows[0], { autoAlpha: 1 });
  gsap.set(words, { autoAlpha: 0, xPercent: 6 });
  gsap.set(words[0], { autoAlpha: 1 });
  if (finale) gsap.set(finale, { autoAlpha: 0, y: 40 });
  if (progressFill) gsap.set(progressFill, { scaleX: 0, transformOrigin: "0% 50%" });

  // Index switches halfway through each transition (and into the finale).
  const switchTimes = Array.from({ length: count - 1 }, (_, i) => i + HOLD + MOVE / 2);
  const finaleTime = count - 1 + HOLD + FINALE / 2;
  let active = -1;

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: el.track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      invalidateOnRefresh: true,
      // Settle on a fully revealed chapter when the user stops mid-transition.
      snap: { snapTo: "labelsDirectional", duration: { min: 0.2, max: 0.6 }, delay: 0.12, ease: "power1.inOut" },
    },
    onUpdate() {
      const time = tl.time();
      const next = time >= finaleTime ? count : switchTimes.filter((t) => time >= t).length;
      if (next !== active) {
        active = next;
        markActive(progressItems, active);
      }
    },
  });

  for (let i = 0; i < count; i += 1) {
    tl.addLabel(`product-${i}`, i === 0 ? 0 : i + 0.1);
    // Hold: the bottle breathes with the scroll.
    tl.to(bottles[i], { rotation: -4, scale: 1.04, yPercent: -3, duration: HOLD, ease: "none" }, i);
    tl.to(words[i], { xPercent: -6, duration: HOLD + MOVE, ease: "none" }, i);

    const t = i + HOLD;
    // Outgoing product (the last one hands over to the finale).
    // Text fully leaves before the next chapter's text arrives (no overlap).
    tl.to(steps[i], { autoAlpha: 0, y: -36, duration: MOVE * 0.4, ease: "power2.in" }, t);
    tl.to(words[i], { autoAlpha: 0, duration: MOVE * 0.5 }, t);
    tl.to(glows[i], { autoAlpha: 0, duration: MOVE }, t);

    if (i < count - 1) {
      tl.to(bottles[i], { autoAlpha: 0, yPercent: -24, scale: 0.86, rotation: -14, duration: MOVE * 0.55, ease: "power2.in" }, t);
      // Incoming product.
      tl.to(glows[i + 1], { autoAlpha: 1, duration: MOVE }, t);
      tl.to(words[i + 1], { autoAlpha: 1, duration: MOVE }, t + MOVE * 0.3);
      tl.to(bottles[i + 1], { autoAlpha: 1, yPercent: 0, scale: 1, rotation: 0, duration: MOVE * 0.6, ease: "power3.out" }, t + MOVE * 0.4);
      tl.to(steps[i + 1], { autoAlpha: 1, y: 0, duration: 0.01 }, t + MOVE * 0.45);
      tl.to(reveals[i + 1], { autoAlpha: 1, y: 0, duration: MOVE * 0.5, stagger: 0.025, ease: "power3.out" }, t + MOVE * 0.45);
    }
  }

  // Finale: every bottle comes together in a lineup.
  const f = count - 1 + HOLD;
  tl.to(glows[0], { autoAlpha: 1, duration: FINALE }, f);
  bottles.forEach((bottle, index) => {
    tl.to(
      bottle,
      {
        autoAlpha: 1,
        x: () => (index - center) * lineupSpacing(),
        yPercent: 22,
        scale: 0.58,
        rotation: 0,
        duration: FINALE,
        ease: "power3.inOut",
      },
      f + Math.abs(index - center) * 0.05,
    );
  });
  if (finale) tl.to(finale, { autoAlpha: 1, y: 0, duration: FINALE * 0.6, ease: "power3.out" }, f + FINALE * 0.5);
  tl.to({}, { duration: OUTRO });
  tl.addLabel("finale");

  const total = tl.duration();
  if (ring) tl.to(ring, { rotation: 320, duration: total, ease: "none" }, 0);
  if (progressFill) tl.to(progressFill, { scaleX: 1, duration: total, ease: "none" }, 0);

  markActive(progressItems, 0);
}

/** Desktop + reduced motion: no scrubbing, just crossfade between products. */
function buildReducedDesktop(el: StoryElements) {
  const { steps, bottles, glows, words, finale, progressItems } = el;
  const count = steps.length;
  const center = (count - 1) / 2;
  let active = -1;

  const show = (index: number) => {
    if (index === active) return;
    active = index;
    const isFinale = index >= count;
    const fade = { duration: 0.25, overwrite: true };
    steps.forEach((step, i) => gsap.to(step, { ...fade, autoAlpha: i === index ? 1 : 0 }));
    words.forEach((word, i) => gsap.to(word, { ...fade, autoAlpha: i === index ? 1 : 0 }));
    glows.forEach((glow, i) => gsap.to(glow, { ...fade, autoAlpha: i === (isFinale ? 0 : index) ? 1 : 0 }));
    bottles.forEach((bottle, i) => {
      gsap.set(bottle, isFinale ? { x: (i - center) * lineupSpacing(), yPercent: 22, scale: 0.58 } : { x: 0, yPercent: 0, scale: 1 });
      gsap.to(bottle, { ...fade, autoAlpha: isFinale || i === index ? 1 : 0 });
    });
    if (finale) gsap.to(finale, { ...fade, autoAlpha: isFinale ? 1 : 0 });
    markActive(progressItems, index);
  };

  gsap.set([...steps, ...bottles, ...glows, ...words], { autoAlpha: 0, rotation: 0 });
  if (finale) gsap.set(finale, { autoAlpha: 0 });
  show(0);

  ScrollTrigger.create({
    trigger: el.track,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => show(Math.min(count, Math.floor(self.progress * (count + 0.6)))),
  });
}

/** Mobile / tablet: stacked panels, nothing pinned, light reveals. */
function buildMobile(root: HTMLElement, el: StoryElements) {
  el.steps.forEach((step, index) => {
    gsap.from(el.reveals[index], {
      autoAlpha: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: { trigger: step, start: "top 78%", once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-story-mobile-bottle]", root).forEach((bottle) => {
    gsap.fromTo(
      bottle,
      { yPercent: 8, rotation: 5, scale: 0.94 },
      {
        yPercent: -6,
        rotation: -3,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: bottle, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  const finaleMobile = root.querySelector<HTMLElement>("[data-story-finale-mobile]");
  if (finaleMobile) {
    gsap.from(finaleMobile.querySelectorAll("[data-story-lineup-item]"), {
      autoAlpha: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: finaleMobile, start: "top 80%", once: true },
    });
  }
}

export function useProductScroll(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const elements = collect(root);
      if (!elements || elements.steps.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: DESKTOP,
          mobile: "(max-width: 1023.98px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, mobile, reduce } = context.conditions ?? {};
          if (desktop && reduce) buildReducedDesktop(elements);
          else if (desktop) buildDesktopTimeline(elements);
          else if (mobile && !reduce) buildMobile(root, elements);
        },
      );

      // Images and fonts change layout height; re-measure once settled.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      return () => window.removeEventListener("load", refresh);
    },
    { scope },
  );
}
