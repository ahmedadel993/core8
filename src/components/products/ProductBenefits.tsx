import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pad } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductBenefits({ product }: { product: Product }) {
  return (
    <section aria-labelledby="benefits-title" className="border-t border-white/10 bg-core8-dark py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading id="benefits-title" eyebrow={product.goal.label} title={`Why ${product.name}`} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {product.benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit.text} delay={index * 80} className="relative overflow-hidden rounded-3xl border border-white/10 bg-black p-7 sm:p-8">
              <span aria-hidden="true" className="font-display text-5xl font-black text-accent [font-stretch:80%]">
                {pad(index + 1)}
              </span>
              <h3 className="mt-6 text-xl leading-snug font-semibold">{benefit.text}</h3>
              <p lang="ar" dir="rtl" className="mt-3 w-fit text-sm text-core8-gray">
                {benefit.textAr}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
