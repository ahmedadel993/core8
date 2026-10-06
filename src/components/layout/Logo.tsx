import Link from "next/link";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/** Typographic CORE8 wordmark: crisp at any size, no image request. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-black tracking-tight [font-stretch:125%]", className)}>
      CORE<span className="text-core8-green">8</span>
    </span>
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link href={routes.home} aria-label={`${siteConfig.name} home`} className={cn("inline-flex items-center", className)}>
      <Wordmark className="text-2xl leading-none" />
    </Link>
  );
}
