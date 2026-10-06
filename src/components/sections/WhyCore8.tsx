import { Droplet, Dumbbell, Leaf, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content, principles } from "@/data/content";
import { pad } from "@/lib/utils";
import type { Principle } from "@/types/site";

const icons: Record<Principle["icon"], LucideIcon> = {
  leaf: Leaf,
  sparkles: Sparkles,
  droplet: Droplet,
  zap: Zap,
  dumbbell: Dumbbell,
};

export function WhyCore8() {
  const { why } = content;

  return (
    <section id="why-core8" aria-labelledby="why-title" className="relative border-t border-white/10 bg-core8-dark py-24 sm:py-32">
      <Container size="wide" className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="why-title" eyebrow={why.eyebrow} title={why.title} intro={why.intro} />
        </div>

        <ol className="border-t border-white/10">
          {principles.map((principle, index) => {
            const Icon = icons[principle.icon];
            return (
              <Reveal
                as="li"
                key={principle.title}
                delay={index * 60}
                className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-white/10 py-8 sm:grid-cols-[3rem_auto_1fr] sm:gap-x-8"
              >
                <span className="hidden pt-2 text-xs font-semibold tracking-[0.2em] text-core8-gray sm:block">{pad(index + 1)}</span>
                <span className="row-span-2 flex size-12 items-center justify-center rounded-2xl border border-white/10 text-core8-green transition-colors duration-500 group-hover:border-core8-green group-hover:bg-core8-green group-hover:text-black sm:row-span-2">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="self-center font-display text-2xl font-extrabold uppercase [font-stretch:85%] sm:text-3xl">
                  {principle.title}
                </h3>
                <p className="col-start-2 text-base leading-relaxed text-core8-gray sm:col-start-3">{principle.description}</p>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
