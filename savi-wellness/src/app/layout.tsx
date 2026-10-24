import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { isPreview, siteUrl } from "@/lib/env";
import { PreviewBadge } from "@/components/ui/PreviewBadge";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.seo.title, template: "%s — SAVI Wellness" },
  description: siteConfig.seo.description,
  applicationName: siteConfig.brand.name,
  alternates: { canonical: "/" },
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: "/",
    siteName: siteConfig.brand.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SAVI Wellness — The Art of Feeling Well." }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#06192e",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Fontes de títulos: pré-carregadas para evitar troca tardia (CLS/LCP) */}
        <link rel="preload" href="/fonts/jost-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/newsreader-display-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/newsreader-display-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <PreviewBadge />
      </body>
    </html>
  );
}
