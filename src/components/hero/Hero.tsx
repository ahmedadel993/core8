import { ArrowUpRight } from "lucide-react";
import { HeroBottle } from "@/components/hero/HeroBottle";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import type { Product } from "@/types/product";

export function Hero({ product }: { product: Product }) {
  const { hero } = content;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-center overflow-hidden pt-(--nav-height)">
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-[70%] size-[60rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(139_207_0/0.16),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <p className="text-outline absolute -bottom-[0.18em] hidden md:block left-1/2 -translate-x-1/2 font-display text-[34vw] leading-none font-black whitespace-nowrap select-none [font-stretch:125%]">
          CORE8
        </p>
      </div>

      <Container size="wide" className="grid items-center gap-x-10 gap-y-2 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="order-1 lg:self-end">
          <p className="text-xs font-semibold tracking-[0.35em] text-core8-green uppercase">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-4">
            <span className="block font-display text-[clamp(3.75rem,17vw,10.5rem)] leading-[0.85] font-black tracking-tight [font-stretch:125%]">
              CORE<span className="text-core8-green">8</span>
            </span>
            <span className="mt-4 block text-[clamp(1rem,3.6vw,1.75rem)] font-semibold tracking-[0.42em] text-white uppercase">
              {hero.tagline}
            </span>
          </h1>
        </div>

        <div className="order-2 -my-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:my-0">
          <HeroBottle product={product} />
        </div>

        <div className="order-3 lg:self-start">
          <p className="mt-2 max-w-md font-display text-xl leading-snug font-semibold text-core8-muted sm:text-2xl lg:mt-8">
            {hero.lines.map((line, index) => (
              <span key={line} className={index === hero.lines.length - 1 ? "block text-white" : "me-2 inline-block"}>
                {line}
              </span>
            ))}
          </p>
          <p lang="ar" dir="rtl" className="mt-4 w-fit text-sm text-core8-gray">
            {siteConfig.taglineAr}
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
            <ButtonLink href={routes.chooseGoal} size="lg" icon={<ArrowUpRight aria-hidden="true" className="size-4" />}>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={routes.products} size="lg" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <a
        href="#range"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] font-semibold tracking-[0.3em] text-core8-gray uppercase transition-colors hover:text-white md:flex"
      >
        {hero.scrollHint}
        <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-core8-green motion-reduce:animate-none" />
        </span>
      </a>
    </section>
  );
}
