import type { ReactNode } from "react";
import { whatsappHref } from "@/lib/whatsapp";

type Props = {
  message?: string;
  className?: string;
  children: ReactNode;
  /** Rótulo acessível completo, quando o texto visível for curto. */
  label?: string;
};

/** Link seguro para o WhatsApp: HTTPS, nova aba, sem opener/referrer. */
export function WhatsAppLink({ message, className, children, label }: Props) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer external"
      className={className}
      aria-label={label ? `${label} (abre o WhatsApp em nova aba)` : undefined}
    >
      {children}
      {!label && <span className="sr-only"> (abre o WhatsApp em nova aba)</span>}
    </a>
  );
}

export function Arrow() {
  return <span className="arrow" aria-hidden="true" />;
}
