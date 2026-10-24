import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SAVI Wellness",
    short_name: "SAVI",
    description: "Medicina estética e bem-estar. The Art of Feeling Well.",
    start_url: "/",
    display: "browser",
    background_color: "#06192e",
    theme_color: "#06192e",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
