import type { Metadata } from "next";
import { ProductPage } from "@/components/products/ProductPage";
import { getProduct } from "@/data/products";
import { buildProductMetadata } from "@/lib/seo";

const product = getProduct("berry-lean");

export const metadata: Metadata = buildProductMetadata(product);

export default function Page() {
  return <ProductPage product={product} />;
}
