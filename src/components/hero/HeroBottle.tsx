import Image from "next/image";
import { accentStyle } from "@/lib/utils";
import type { Product } from "@/types/product";

/**
 * Hero product visual. Motion is CSS-only (float + slow ring spin) so the hero
 * ships no JavaScript and the LCP image is not blocked by hydration.
 */
export function HeroBottle({ product }: { product: Product }) {
  return (
    <div style={accentStyle(product.color)} className="relative mx-auto flex aspect-square w-full max-w-[min(92vw,38rem)] items-center justify-center">
      {/* Glow */}
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-accent opacity-25 blur-[90px]" />
      {/* Rings */}
      <div aria-hidden="true" className="absolute inset-[6%] rounded-full border border-white/10" />
      <div
        aria-hidden="true"
        className="absolute inset-[16%] animate-spin-slow rounded-full border border-dashed border-accent/40 motion-reduce:animate-none"
      />
      <div aria-hidden="true" className="absolute inset-[27%] rounded-full border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent" />

      <div className="relative h-[86%] animate-float motion-reduce:animate-none">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          priority
          sizes="(min-width: 1024px) 380px, 60vw"
          className="h-full w-auto object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.75)]"
        />
      </div>

      {/* Reflection floor */}
      <div aria-hidden="true" className="absolute bottom-[5%] left-1/2 h-6 w-1/2 -translate-x-1/2 rounded-[100%] bg-accent/30 blur-2xl" />
    </div>
  );
}
