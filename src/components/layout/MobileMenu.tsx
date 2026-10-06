"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { routes } from "@/data/navigation";
import { accentStyle, cn } from "@/lib/utils";
import type { ProductSlug } from "@/types/product";
import type { NavItem } from "@/types/site";

// Static class names so Tailwind can see them; applied only while opening.
const itemDelays = [
  "group-data-[open=true]/menu:delay-75",
  "group-data-[open=true]/menu:delay-100",
  "group-data-[open=true]/menu:delay-150",
  "group-data-[open=true]/menu:delay-200",
];

interface MobileMenuProps {
  items: NavItem[];
  cta: NavItem;
  products: { slug: ProductSlug; name: string; goal: string; color: string }[];
}

export function MobileMenu({ items, cta, products }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Close if the viewport grows into the desktop layout.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => event.matches && setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-10 -me-2 inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>

      <div
        id={panelId}
        inert={!open}
        data-open={open}
        className="group/menu fixed inset-x-0 top-(--nav-height) bottom-0 overflow-y-auto bg-black opacity-0 transition-opacity duration-300 data-[open=true]:opacity-100 motion-reduce:transition-none"
      >
        <div className="flex min-h-full flex-col px-4 pt-6 pb-10 sm:px-6">
          <ul className="border-t border-white/10">
            {items.map((item, index) => (
              <li
                key={item.href}
                className={cn(
                  "translate-y-4 border-b border-white/10 opacity-0 transition-[opacity,transform] duration-500 group-data-[open=true]/menu:translate-y-0 group-data-[open=true]/menu:opacity-100 motion-reduce:transition-none",
                  itemDelays[index % itemDelays.length],
                )}
              >
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between py-5 font-display text-3xl font-extrabold uppercase [font-stretch:85%]"
                >
                  {item.label}
                  <ArrowUpRight aria-hidden="true" className="size-5 text-core8-gray" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-xs font-semibold tracking-[0.3em] text-core8-gray uppercase">Shop by goal</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
            {products.map((product) => (
              <li key={product.slug} style={accentStyle(product.color)}>
                <Link
                  href={routes.product(product.slug)}
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm transition-colors hover:border-accent"
                >
                  <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-accent" />
                  <span className="font-semibold">{product.name}</span>
                  <span className="ms-auto text-xs text-core8-gray">{product.goal}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href={cta.href} onClick={close} className={cn(buttonClasses({ size: "lg" }), "mt-10 w-full")}>
            {cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
