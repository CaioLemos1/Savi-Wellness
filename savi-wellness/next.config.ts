import type { NextConfig } from "next";

/**
 * Exportação 100% estática (sem servidor, sem API, sem banco de dados).
 * Os headers de segurança são gerados após o build por scripts/generate-headers.mjs
 * (arquivo out/_headers, compatível com Cloudflare Pages e Netlify), porque
 * `headers()` do next.config não é aplicado em exportações estáticas.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: { unoptimized: true },
};

export default nextConfig;
