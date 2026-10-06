import { ProductBottleAnimation } from "@/components/scrollytelling/ProductBottleAnimation";
import { ProductStoryContent } from "@/components/scrollytelling/ProductStoryContent";
import { ScrollProductStory } from "@/components/scrollytelling/ScrollProductStory";
import { ScrollProgress } from "@/components/scrollytelling/ScrollProgress";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { content } from "@/data/content";
import type { Product } from "@/types/product";

/** Server composition of the scroll story; only `ScrollProductStory` is a client component. */
export function ProductStory({ products }: { products: Product[] }) {
  const { story } = content;

  return (
    <ScrollProductStory
      header={
        <Container size="wide" className="pt-24 pb-4 sm:pt-32 lg:pb-0">
          <SectionHeading id="range-title" eyebrow={story.eyebrow} title={story.title} intro={story.intro} />
        </Container>
      }
    >
      <ProductBottleAnimation products={products} />
      <ProductStoryContent products={products} />
      <ScrollProgress products={products} />
    </ScrollProductStory>
  );
}
