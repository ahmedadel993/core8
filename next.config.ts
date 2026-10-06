import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static marketing site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // Emit `/products/lean-kiwi/index.html` so any static host serves clean URLs.
  trailingSlash: true,
  images: {
    // The Image Optimization API needs a server. Assets in `public/images` are
    // pre-optimised WebP files produced by `scripts/process-images.py`.
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
