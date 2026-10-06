import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ShareButton } from "@/components/share/ShareButton";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Badge";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import { instagram } from "@/data/site";
import { getLineupShare } from "@/lib/share";
import type { Product } from "@/types/product";

export function FinalCTA({ products }: { products: Product[] }) {
  const { finalCta } = content;

  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden border-t border-white/10 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 size-[56rem] max-w-[220vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(139_207_0/0.22),transparent_62%)]"
      />
      <Container size="wide" className="flex flex-col items-center text-center">
        <Eyebrow className="justify-center">{finalCta.eyebrow}</Eyebrow>
        <h2
          id="final-cta-title"
          className="mt-6 font-display text-[clamp(3rem,12vw,9rem)] leading-[0.85] font-black uppercase [font-stretch:80%]"
        >
          {finalCta.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-core8-muted">{finalCta.text}</p>

        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center">
          <ButtonLink href={routes.chooseGoal} size="lg" icon={<ArrowUpRight aria-hidden="true" className="size-4" />}>
            {finalCta.primary}
          </ButtonLink>
          <ExternalButton href={instagram.href} size="lg" variant="secondary" icon={<InstagramIcon className="size-4" />}>
            {finalCta.secondary}
          </ExternalButton>
          <ShareButton {...getLineupShare(products)} label="Share CORE8" className="h-13 px-7 text-xs" />
        </div>

        <ul aria-hidden="true" className="mt-16 flex items-end justify-center -space-x-6 sm:-space-x-4">
          {products.map((product, index) => (
            <li key={product.slug} className={index === 2 ? "z-10" : index === 1 || index === 3 ? "z-[5]" : ""}>
              <Image
                src={product.image.src}
                alt=""
                width={product.image.width}
                height={product.image.height}
                sizes="20vw"
                className={index === 2 ? "h-40 w-auto sm:h-64" : index === 1 || index === 3 ? "h-36 w-auto sm:h-56" : "h-32 w-auto sm:h-48"}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
