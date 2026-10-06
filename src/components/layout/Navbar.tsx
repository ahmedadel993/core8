import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoLink } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavbarShell } from "@/components/layout/NavbarShell";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNavigation, primaryCta } from "@/data/navigation";
import { products } from "@/data/products";

export function Navbar() {
  const productLinks = products.map((product) => ({
    slug: product.slug,
    name: product.name,
    goal: product.goal.short,
    color: product.color,
  }));

  return (
    <NavbarShell>
      <Container as="nav" size="wide" aria-label="Main" className="flex h-(--nav-height) items-center justify-between gap-6">
        <LogoLink />

        <ul className="hidden items-center gap-9 lg:flex">
          {mainNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs font-semibold tracking-[0.2em] text-core8-muted uppercase transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <ButtonLink href={primaryCta.href} icon={<ArrowUpRight aria-hidden="true" className="size-4" />}>
            {primaryCta.label}
          </ButtonLink>
        </div>

        <MobileMenu items={mainNavigation} cta={primaryCta} products={productLinks} />
      </Container>
    </NavbarShell>
  );
}
