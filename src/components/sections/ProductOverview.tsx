import { ArrowUpRight } from "lucide-react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import type { Product } from "@/types/product";

export function ProductOverview({ products }: { products: Product[] }) {
  const { overview } = content;

  return (
    <section aria-labelledby="overview-title" className="border-t border-white/10 bg-core8-dark py-24 sm:py-32">
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="overview-title" eyebrow={overview.eyebrow} title={overview.title} intro={overview.intro} />
          <ButtonLink href={routes.products} variant="secondary" icon={<ArrowUpRight aria-hidden="true" className="size-4" />}>
            All products
          </ButtonLink>
        </div>
        <ProductGrid products={products} className="mt-14" />
      </Container>
    </section>
  );
}
