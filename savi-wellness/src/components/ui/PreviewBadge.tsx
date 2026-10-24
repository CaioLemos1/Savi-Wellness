import { isPreview } from "@/lib/env";

/** Selo exibido apenas em builds de prévia (nunca no build de produção). */
export function PreviewBadge() {
  if (!isPreview) return null;
  return (
    <p className="pointer-events-none fixed hidden sm:block left-0 top-1/2 z-[45] -translate-y-1/2 rotate-180 border border-l-0 border-dashed border-champagne/60 bg-navy-950/90 px-1.5 py-3 text-[0.55rem] uppercase tracking-[0.2em] text-champagne [writing-mode:vertical-rl]">
      Prévia · pendente de validação
    </p>
  );
}
