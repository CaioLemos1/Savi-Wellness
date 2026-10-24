import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

/** Valor configurado ou marcador visível e rastreável de pendência. */
export function Field({ value, pending }: { value: string | null | undefined; pending: string }) {
  if (value) return <>{value}</>;
  return (
    <mark className="bg-transparent px-1 font-medium text-champagne-deep outline outline-1 outline-dashed outline-champagne-deep/60">
      [PENDENTE: {pending}]
    </mark>
  );
}

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  const reviewed = siteConfig.legal.policiesLastReviewed;
  return (
    <>
      <header className="bg-navy-900">
        <div className="mx-auto flex h-20 max-w-[100rem] items-center justify-between px-(--gutter)">
          <a href="/" aria-label="SAVI Wellness — página inicial" className="text-porcelain">
            <Wordmark decorative className="h-10 w-auto" />
          </a>
          <a href="/" className="label ulink text-porcelain/85">
            Voltar ao site
          </a>
        </div>
      </header>
      <main id="conteudo" className="on-light bg-ivory text-ink">
        <article className="legal mx-auto max-w-[46rem] px-(--gutter) py-20 lg:py-28">
          <p className="eyebrow text-champagne-deep">SAVI Wellness</p>
          <h1 className="display mt-6 text-[clamp(2.6rem,6vw,4.4rem)] text-navy-900">{title}</h1>
          <p className="mt-6 text-sm text-taupe">
            Última atualização: <Field value={reviewed} pending="data após revisão jurídica" />
          </p>
          {!siteConfig.validation.legalPagesApproved && (
            <p className="mt-8 border-l border-champagne-deep pl-4 text-sm text-taupe">
              Minuta estruturada para revisão jurídica. Não publicar sem validação profissional e sem o preenchimento
              dos campos marcados como pendentes.
            </p>
          )}
          <div className="mt-14 space-y-6 leading-relaxed text-ink/85 [&_h2]:mt-14 [&_h2]:font-serif [&_h2]:text-[1.9rem] [&_h2]:font-light [&_h2]:leading-tight [&_h2]:text-navy-900 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
