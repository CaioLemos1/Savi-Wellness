import { siteConfig } from "@/config/site";

/** Aceita apenas dígitos, 12–13 caracteres, iniciando por 55 (Brasil). */
export function sanitizeWhatsAppNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return /^55\d{10,11}$/.test(digits) ? digits : null;
}

const NUMBER = sanitizeWhatsAppNumber(siteConfig.whatsapp.number);

export const whatsappConfigured = NUMBER !== null;

/**
 * Monta o link oficial `https://wa.me/NUMERO?text=MENSAGEM`.
 * A mensagem é sempre codificada com encodeURIComponent e nunca contém
 * dados informados pelo visitante (somente textos fixos do site).
 * Sem número configurado (prévia), o link abre o WhatsApp sem destinatário.
 */
export function whatsappHref(message: string = siteConfig.whatsapp.defaultMessage): string {
  const text = encodeURIComponent(message.slice(0, 500));
  return NUMBER ? `https://wa.me/${NUMBER}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function serviceMessage(serviceName: string): string {
  return `Olá! Gostaria de receber informações sobre ${serviceName} da SAVI.`;
}
