import Link from "next/link";
import { Wordmark } from "@/components/layout/Logo";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { content } from "@/data/content";
import { mainNavigation, routes } from "@/data/navigation";
import { products } from "@/data/products";
import { instagram, siteConfig } from "@/data/site";
import { accentStyle } from "@/lib/utils";

const linkClass = "text-sm text-core8-muted transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-core8-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] max-w-[200vw] -translate-x-1/2 rounded-full bg-core8-green/10 blur-3xl"
      />
      <Container size="wide" className="relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-5xl sm:text-6xl" />
            <p className="mt-4 text-sm font-semibold tracking-[0.35em] text-core8-green uppercase">{siteConfig.tagline}</p>
            <p lang="ar" dir="rtl" className="mt-3 w-fit text-sm text-core8-gray">
              {siteConfig.taglineAr}
            </p>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 py-2 ps-2 pe-5 text-sm transition-colors hover:border-core8-green"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                <InstagramIcon className="size-4.5" />
              </span>
              {instagram.handle}
              <span className="sr-only">(opens Instagram in a new tab)</span>
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-core8-gray uppercase">Navigation</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={routes.home} className={linkClass}>
                  Home
                </Link>
              </li>
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-core8-gray uppercase">Products</h2>
            <ul className="mt-5 space-y-3">
              {products.map((product) => (
                <li key={product.slug} style={accentStyle(product.color)}>
                  <Link href={routes.product(product.slug)} className={`${linkClass} inline-flex items-center gap-2.5`}>
                    <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.3em] text-core8-gray uppercase">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={routes.contact} className={linkClass}>
                  Get in touch
                </Link>
              </li>
              <li>
                <a href={instagram.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram {instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 max-w-3xl text-xs leading-relaxed text-core8-gray">{content.disclaimer}</p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-core8-gray sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="tracking-[0.3em] uppercase">Natural · Fresh · Balanced</p>
        </div>
      </Container>
    </footer>
  );
}
