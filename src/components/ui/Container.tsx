import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "default" | "narrow" | "wide";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[96rem]",
};

export function Container<T extends ElementType = "div">({ as, size = "default", className, ...props }: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("mx-auto w-full px-4 sm:px-6 lg:px-10", sizes[size], className)} {...props} />;
}
