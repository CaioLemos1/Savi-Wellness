import { siteConfig } from "@/config/site";
import { nav } from "@/content/content";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { isPreview } from "@/lib/env";
import { whatsappConfigured } from "@/lib/whatsapp";

function Pending({ children }: { children: string }) {
  if (!isPreview) return null;
  return (
    <span className="inline-block border border-dashed border-champagne/50 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-champagne">
      Pendente · {children}
    </span>
  );
}

export function Footer() {
  const { legal, address, instagram } = siteConfig;
  const td = legal.technicalDirector;
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 text-porcelain" aria-labelledby="rodape-titulo">
      <h2 id="rodape-titulo" className="sr-only">
        Rodapé — SAVI Wellness
      </h2>
      <div className="mx-auto max-w-[100rem] px-(--gutter)">
        <div className="h-px bg-porcelain/12" />
        <div className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <Wordmark className="h-auto w-44 text-porcelain" />
            <p className="eyebrow mt-8 text-[0.6rem] text-champagne">The Art of Feeling Well.</p>
            <p className="mt-6 max-w-[30ch] font-serif text-xl font-light italic leading-snug text-porcelain-muted">
              {siteConfig.brand.positioning}
            </p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow text-[0.6rem] text-porcelain-muted">Navegação</p>
            <ul className="mt-6 space-y-3.5">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} className="ulink text-[0.95rem] text-porcelain/85 hover:text-porcelain">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-[0.6rem] text-porcelain-muted">Atendimento</p>
            <ul className="mt-6 space-y-3.5 text-[0.95rem]">
              <li>
                <WhatsAppLink className="ulink text-porcelain/85 hover:text-porcelain" label="Conversar pelo WhatsApp">
                  WhatsApp
                </WhatsAppLink>{" "}
                {!whatsappConfigured && <Pending>número</Pending>}
              </li>
              <li>
                {instagram ? (
                  <a href={instagram} target="_blank" rel="noopener noreferrer external" className="ulink text-porcelain/85 hover:text-porcelain">
                    Instagram<span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ) : (
                  <Pending>Instagram</Pending>
                )}
              </li>
              <li className="text-porcelain-muted">
                {address ? (
                  <address className="not-italic leading-relaxed">
                    {address.street}
                    <br />
                    {address.district} — {address.city}/{address.state}
                    <br />
                    CEP {address.postalCode}
                  </address>
                ) : (
                  <Pending>endereço</Pending>
                )}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-[0.6rem] text-porcelain-muted">Legal</p>
            <ul className="mt-6 space-y-3.5 text-[0.95rem]">
              <li>
                <a href="/privacidade/" className="ulink text-porcelain/85 hover:text-porcelain">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos/" className="ulink text-porcelain/85 hover:text-porcelain">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Identificação legal e médica — Resolução CFM nº 2.336/2023 */}
        <div className="grid gap-4 border-t border-porcelain/12 py-8 text-[0.78rem] leading-relaxed text-porcelain-muted lg:grid-cols-[1fr_auto] lg:gap-10">
          <div className="space-y-1.5">
            <p>
              {legal.companyName ?? <Pending>razão social</Pending>}
              {legal.cnpj ? <> · CNPJ {legal.cnpj}</> : <> <Pending>CNPJ</Pending></>}
              {legal.crmCompanyRegistration && <> · Registro CRM {legal.crmCompanyRegistration}</>}
            </p>
            <p>
              {td ? (
                <>
                  Responsável técnico(a): {td.name} · CRM/{td.uf} {td.crm}
                  {td.rqe && td.specialty && (
                    <>
                      {" "}
                      · {td.specialty} · RQE {td.rqe}
                    </>
                  )}
                </>
              ) : (
                <Pending>responsável técnico(a) · CRM/UF</Pending>
              )}
            </p>
            <p>
              Conteúdo de caráter informativo. Indicações e condutas dependem de avaliação médica individual.
            </p>
          </div>
          <p className="lg:text-right">© {year} SAVI Wellness</p>
        </div>
      </div>
    </footer>
  );
}
