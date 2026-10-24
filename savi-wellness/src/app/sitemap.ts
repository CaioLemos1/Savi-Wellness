import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/privacidade/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/termos/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
