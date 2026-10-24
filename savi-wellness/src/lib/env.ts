import { siteConfig } from "@/config/site";

/** Build de prévia: permite pendências, mas marca o site como noindex e exibe selo. */
export const isPreview = process.env.SAVI_PREVIEW === "1" || process.env.NODE_ENV !== "production";

const FALLBACK_URL = "http://localhost:3000";

function normalizeUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u.origin;
  } catch {
    return null;
  }
}

export const siteUrl: string =
  normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? normalizeUrl(siteConfig.siteUrl) ?? FALLBACK_URL;
