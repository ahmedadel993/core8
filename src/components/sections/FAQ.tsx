import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/types/site";

interface FAQProps {
  id?: string;
  eyebrow: string;
  title: string;
  faqs: FaqItem[];
}

/**
 * Native <details> accordion: accessible, keyboard-friendly and zero JS.
 * Pair with `faqJsonLd(faqs)` on the page — the content is visible here.
 */
export function FAQ({ id = "faq", eyebrow, title, faqs }: FAQProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-white/10 py-24 sm:py-32">
      <Container size="wide" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} className="lg:sticky lg:top-32 lg:self-start" />

        <div className="border-t border-white/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-start text-lg font-semibold transition-colors hover:text-core8-green sm:text-xl [&::-webkit-details-marker]:hidden">
                <h3>{faq.question}</h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-core8-green group-open:text-black">
                  <Plus aria-hidden="true" className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pe-14 pb-7 text-base leading-relaxed text-core8-gray">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
