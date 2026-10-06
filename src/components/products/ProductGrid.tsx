import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function ProductGrid({ products, headingLevel, className }: ProductGridProps) {
  const columns = products.length >= 5 ? "xl:grid-cols-5" : "xl:grid-cols-3";
  return (
    <ul className={cn("grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-5", columns, className)}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
