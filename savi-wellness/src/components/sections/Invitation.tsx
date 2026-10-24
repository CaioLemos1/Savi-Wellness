import { invitation } from "@/content/content";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppLink, Arrow } from "@/components/ui/WhatsAppLink";

/** Encerramento: ecoa a peça “Bem-vinda ao universo Savi” — eixo central, fio vertical, assinatura. */
export function Invitation() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="grain relative isolate overflow-hidden bg-navy-950 text-porcelain"
    >
      <div className="light-field is-alive" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[60rem] flex-col items-center px-(--gutter) py-24 text-center lg:py-36">
        <span aria-hidden="true" className="thread block h-24 w-px bg-champagne/60 lg:h-32" />
        <p className="eyebrow mt-12 text-champagne" data-reveal>
          <span className="serif-italic mr-3 font-serif text-base normal-case tracking-normal">IV.</span>
          Contato
        </p>
        <h2
          id="contato-title"
          data-reveal="mask"
          className="display mt-8 text-[clamp(2.6rem,6.4vw,5.8rem)] text-porcelain"
        >
          <span className="line-mask" style={{ ["--i" as string]: 0 }}>
            <span>{invitation.title.lead}</span>
          </span>
          <span className="line-mask" style={{ ["--i" as string]: 1 }}>
            <span>
              <em className="text-champagne">{invitation.title.emphasis}</em>
            </span>
          </span>
        </h2>
        <p className="lede mt-8 max-w-[38ch] text-porcelain-muted" data-reveal style={{ ["--d" as string]: 1 }}>
          {invitation.body}
        </p>
        <div className="mt-12" data-reveal style={{ ["--d" as string]: 2 }}>
          <WhatsAppLink className="btn btn-solid" label={invitation.cta}>
            {invitation.cta} <Arrow />
          </WhatsAppLink>
        </div>

        <div className="mt-24 flex flex-col items-center lg:mt-32" data-reveal style={{ ["--d" as string]: 1 }}>
          <Wordmark className="h-auto w-[min(17rem,62vw)] text-porcelain" />
          <span aria-hidden="true" className="mt-10 block h-16 w-px bg-champagne/50" />
          <p className="eyebrow mt-10 text-[0.65rem] tracking-[0.42em] text-porcelain/90">The Art of Feeling Well.</p>
        </div>
      </div>
    </section>
  );
}
