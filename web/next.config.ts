import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = isStaticExport ? (process.env.PAGES_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  basePath,
  env: {
    // Exposto ao código para prefixar caminhos de /public (ver src/lib/asset.ts).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isStaticExport && {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
  }),
};

export default nextConfig;
