import { Container } from "@/components/ui/Container";
import { accentStyle, pad } from "@/lib/utils";
import type { Product } from "@/types/product";

/**
 * Desktop progress rail along the bottom of the sticky stage. The fill and
 * the active state are driven by `useProductScroll` (data-active/data-done).
 * Decorative: each chapter already has its own heading for assistive tech.
 */
export function ScrollProgress({ products }: { products: Product[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden pb-7 lg:block">
      <Container size="wide">
        <div className="relative h-px bg-white/15">
          <div data-story-progress-fill className="absolute inset-0 origin-left scale-x-0 bg-white/70" />
        </div>
        <ol className="mt-4 grid grid-cols-5">
          {products.map((product, index) => (
            <li
              key={product.slug}
              data-story-progress-item
              data-active={index === 0}
              style={accentStyle(product.color)}
              className="group/progress flex items-center gap-2.5 text-[0.65rem] font-semibold tracking-[0.25em] text-core8-gray uppercase transition-colors duration-300 data-[active=true]:text-white data-[done=true]:text-core8-muted"
            >
              <span className="size-2 rounded-full border border-current transition-colors duration-300 group-data-[active=true]/progress:border-accent group-data-[active=true]/progress:bg-accent" />
              <span>{pad(index + 1)}</span>
              <span className="hidden xl:inline">{product.name}</span>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
