import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "md" | "lg";

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.14em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-core8-green text-black hover:bg-white hover:shadow-[0_0_40px_-8px_var(--core8-green)]",
  secondary: "border border-white/25 text-white hover:border-white hover:bg-white hover:text-black",
  ghost: "text-core8-muted hover:text-white",
  accent: "bg-accent text-black hover:bg-white hover:shadow-[0_0_40px_-8px_var(--accent)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.7rem]",
  lg: "h-13 px-7 text-xs",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

export function buttonClasses({ variant = "primary", size = "md", className }: StyleProps & { className?: string }) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = StyleProps & ComponentPropsWithoutRef<typeof Link>;

export function ButtonLink({ variant, size, icon, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {icon}
    </Link>
  );
}

type ExternalButtonProps = StyleProps & ComponentPropsWithoutRef<"a">;

export function ExternalButton({ variant, size, icon, className, children, ...props }: ExternalButtonProps) {
  return (
    <a className={buttonClasses({ variant, size, className })} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      {icon}
    </a>
  );
}
