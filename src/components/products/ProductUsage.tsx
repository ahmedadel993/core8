import { GlassWater } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types/product";

export function ProductUsage({ product }: { product: Product }) {
  return (
    <section aria-labelledby="usage-title" className="py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading id="usage-title" eyebrow="How to enjoy" title={`Your ${product.name} moment`} />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {product.howToEnjoy.map((tip) => (
            <li key={tip} className="flex gap-4 rounded-3xl border border-white/10 p-6 sm:p-7">
              <GlassWater aria-hidden="true" className="size-6 shrink-0 text-accent" />
              <p className="text-base leading-relaxed text-core8-muted">{tip}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
