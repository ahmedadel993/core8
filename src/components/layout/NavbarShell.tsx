"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The only client logic in the navbar: switch from transparent to a solid,
 * blurred bar once the page has scrolled. Children stay server-rendered.
 *
 * The blur lives on a sibling layer, not on <header>: `backdrop-filter` on an
 * ancestor would become the containing block of the fixed mobile menu panel.
 */
export function NavbarShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header data-scrolled={scrolled} className="group/nav fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-transparent transition-[background-color,border-color] duration-500 group-data-[scrolled=true]/nav:border-white/10 group-data-[scrolled=true]/nav:bg-black/75 group-data-[scrolled=true]/nav:backdrop-blur-xl"
      />
      <div className="relative">{children}</div>
    </header>
  );
}
