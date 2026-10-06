import type { JsonLdNode } from "@/lib/jsonld";

/** Server-rendered JSON-LD. `<` is escaped so data can never close the script tag. */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
