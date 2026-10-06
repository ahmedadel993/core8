import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import { accentStyle, pad } from "@/lib/utils";
import type { Product } from "@/types/product";

/** Five goal links; each lights up in its product colour on hover/focus. */
export function ChooseYourGoal({ products }: { products: Product[] }) {
  const { chooseGoal } = content;

  return (
    <section id="choose-your-goal" aria-labelledby="choose-goal-title" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading id="choose-goal-title" eyebrow={chooseGoal.eyebrow} title={chooseGoal.title} intro={chooseGoal.intro} />

        <ul className="mt-14 grid gap-3 lg:grid-cols-5">
          {products.map((product, index) => (
            <li key={product.slug} style={accentStyle(product.color)}>
              <Link
                href={routes.product(product.slug)}
                className="group relative flex h-full min-h-32 items-center overflow-hidden rounded-3xl border border-white/10 bg-core8-dark p-6 transition-[border-color,box-shadow] duration-500 hover:border-accent hover:shadow-[0_0_60px_-15px_var(--accent)] focus-visible:border-accent focus-visible:shadow-[0_0_60px_-15px_var(--accent)] lg:min-h-[30rem] lg:flex-col lg:items-start lg:p-7"
              >
                <div
                  aria-hidden="true"
                  className="absolute -end-10 -bottom-10 size-64 rounded-full bg-accent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30 group-focus-visible:opacity-30"
                />

                <div className="relative z-10 flex-1">
                  <span className="text-xs font-semibold tracking-[0.3em] text-core8-gray">{pad(index + 1)}</span>
                  <span className="mt-1 block font-display text-4xl leading-none font-black uppercase transition-colors duration-300 [font-stretch:80%] group-hover:text-accent group-focus-visible:text-accent sm:text-5xl lg:mt-4 lg:text-[clamp(2rem,3.2vw,3rem)]">
                    {product.goal.short}
                  </span>
                  <span className="mt-2 block text-sm text-core8-muted">
                    {product.name}
                    <span className="ms-2 text-core8-gray">
                      <span lang="ar" dir="rtl">
                        {product.goal.shortAr}
                      </span>
                    </span>
                  </span>
                </div>

                <Image
                  src={product.image.src}
                  alt=""
                  width={product.image.width}
                  height={product.image.height}
                  sizes="(min-width: 1024px) 200px, 96px"
                  className="relative h-28 w-auto shrink-0 object-contain transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105 motion-reduce:transition-none lg:absolute lg:start-1/2 lg:bottom-4 lg:h-[58%] lg:-translate-x-1/2 lg:translate-y-6 lg:opacity-80 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 rtl:lg:translate-x-1/2"
                />

                <ArrowUpRight
                  aria-hidden="true"
                  className="relative z-10 ms-3 size-5 shrink-0 text-core8-gray transition-colors group-hover:text-accent lg:absolute lg:end-6 lg:top-6 lg:ms-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
