import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { Eyebrow } from "@/components/ui/Badge";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { content, generalFaqs } from "@/data/content";
import { routes } from "@/data/navigation";
import { instagram, siteConfig } from "@/data/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with CORE8 for orders, availability, stockists and collaborations. Message us on Instagram @core8.drinks.",
  path: routes.contact,
});

const breadcrumbs = [
  { name: "Home", path: routes.home },
  { name: "Contact", path: routes.contact },
];

// The contact page answers the practical questions only.
const contactFaqs = generalFaqs.filter((faq) => /buy|store|allergens/i.test(faq.question));

export default function ContactPage() {
  const { contact } = content;

  return (
    <>
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden pt-(--nav-height)">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -z-10 size-[56rem] max-w-[200vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(139_207_0/0.18),transparent_62%)]"
        />
        <Container size="wide" className="pt-12 pb-24 sm:pt-16 sm:pb-32">
          <Breadcrumbs items={breadcrumbs} />
          <Eyebrow className="mt-10">{contact.eyebrow}</Eyebrow>
          <h1 id="contact-title" className="mt-5 font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] font-black uppercase [font-stretch:80%]">
            {contact.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-core8-muted">{contact.intro}</p>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-core8-dark p-7 transition-colors hover:border-core8-green sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-core8-green text-black">
                  <InstagramIcon className="size-7" />
                </span>
                <ArrowUpRight aria-hidden="true" className="size-6 text-core8-gray transition-colors group-hover:text-core8-green" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-core8-gray uppercase">Message us on {instagram.label}</p>
                <p className="mt-2 font-display text-[clamp(2rem,7vw,4rem)] leading-none font-black break-all [font-stretch:85%]">
                  {instagram.handle}
                </p>
              </div>
              <span className="sr-only">(opens Instagram in a new tab)</span>
            </a>

            <ul className="grid gap-4">
              {contact.channels.map((channel) => (
                <li key={channel.title} className="rounded-3xl border border-white/10 p-6 sm:p-7">
                  <h2 className="font-display text-xl font-extrabold uppercase [font-stretch:85%]">{channel.title}</h2>
                  <p className="mt-2 text-core8-gray">{channel.text}</p>
                </li>
              ))}
              {siteConfig.email ? (
                <li className="rounded-3xl border border-white/10 p-6 sm:p-7">
                  <h2 className="font-display text-xl font-extrabold uppercase [font-stretch:85%]">Email</h2>
                  <a href={`mailto:${siteConfig.email}`} className="mt-2 inline-flex items-center gap-2 text-core8-muted hover:text-white">
                    <Mail aria-hidden="true" className="size-4" />
                    {siteConfig.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </Container>
      </section>
      <FAQ id="contact-faq" eyebrow={content.faq.eyebrow} title="Before you message" faqs={contactFaqs} />
      <JsonLd data={[breadcrumbJsonLd(breadcrumbs), faqJsonLd(contactFaqs)]} />
    </>
  );
}
