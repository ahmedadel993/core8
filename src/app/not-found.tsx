import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryCta, routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found | CORE8",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center pt-(--nav-height)">
      <Container className="text-center">
        <p className="font-display text-[clamp(6rem,30vw,16rem)] leading-none font-black text-core8-green [font-stretch:125%]">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold uppercase sm:text-4xl">This page is off the menu.</h1>
        <p className="mt-4 text-core8-gray">The page you were looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryCta.href} icon={<ArrowUpRight aria-hidden="true" className="size-4" />}>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href={routes.home} variant="secondary">
            Back home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
