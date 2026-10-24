import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/env";
import { sanitizeWhatsAppNumber } from "@/lib/whatsapp";

/**
 * Dados estruturados apenas com informações reais e configuradas.
 * Nada de avaliações, especialidades ou endereço não confirmados.
 */
export function organizationJsonLd() {
  const { brand, instagram, address, legal } = siteConfig;
  const phone = sanitizeWhatsAppNumber(siteConfig.whatsapp.number);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: brand.name,
    slogan: brand.signature,
    description: siteConfig.seo.description,
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    image: `${siteUrl}/og-image.jpg`,
  };
  if (legal.companyName) data.legalName = legal.companyName;
  if (phone) data.telephone = `+${phone}`;
  if (instagram) data.sameAs = [instagram];
  if (address) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: "BR",
    };
  }
  return data;
}

/** Serializa JSON-LD com escape de `<` para impedir quebra de contexto do <script>. */
export function serializeJsonLd(data: unknown): string {
  const LS = String.fromCharCode(0x2028);
  const PS = String.fromCharCode(0x2029);
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .split(LS).join("\\u2028")
    .split(PS).join("\\u2029");
}
