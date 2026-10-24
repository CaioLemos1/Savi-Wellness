import { WORDMARK } from "./paths";

type Props = { className?: string; title?: string; decorative?: boolean };

/**
 * Logotipo oficial SAVI Wellness (lockup completo, proporções preservadas).
 * Vetor obtido por traçado fiel do arquivo enviado; herda a cor via currentColor.
 */
export function Wordmark({ className, title = "SAVI Wellness", decorative = false }: Props) {
  return (
    <svg
      viewBox={WORDMARK.viewBox}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={WORDMARK.d} />
    </svg>
  );
}
