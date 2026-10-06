import type { Metadata, Viewport } from "next";
import { Archivo, Cairo } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { getDirection } from "@/lib/i18n";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

// One variable family (weight + width axes) covers body copy, condensed
// product names and the extended CORE8 wordmark.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Arabic is used for secondary product names/taglines only; don't preload it.
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  category: "food & drink",
  formatDetection: { telephone: false },
  ...buildMetadata({ description: siteConfig.description, path: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.locale} dir={getDirection(siteConfig.locale)} className={`${archivo.variable} ${cairo.variable}`}>
      <body className="min-h-svh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-core8-green focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
