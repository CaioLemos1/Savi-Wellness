import { hero } from "@/content/content";
import { WhatsAppLink, Arrow } from "@/components/ui/WhatsAppLink";

export function Hero() {
  const lines = [...hero.titleLines];
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-900"
    >
      <div className="light-field is-alive" aria-hidden="true" />

      {/* Fotografia editorial — sangra na borda direita */}
      <div className="absolute right-0 top-0 h-[66svh] w-[82%] sm:w-[66%] lg:bottom-0 lg:h-auto lg:w-[40%] xl:w-[38%]">
        <div className="hero-photo relative h-full w-full overflow-hidden">
          <img
            src={hero.image.src}
            srcSet={hero.image.srcSet}
            sizes="(min-width: 64rem) 40vw, 82vw"
            width={hero.image.width}
            height={hero.image.height}
            alt={hero.image.alt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[60%_22%]"
          />
          {/* Véu tonal para legibilidade do texto sobreposto (mobile) e integração ao navy */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-navy-900)_10%,rgba(6,25,46,0.6)_40%,rgba(6,25,46,0)_72%),linear-gradient(to_right,rgba(6,25,46,0.7)_0%,rgba(6,25,46,0)_22%)] lg:bg-[linear-gradient(to_right,var(--color-navy-900)_0%,rgba(6,25,46,0)_28%)]"
          />
        </div>
        {/* Fio vertical arquitetônico */}
        <span aria-hidden="true" className="hero-rule absolute -left-px top-0 hidden h-full w-px bg-champagne/40 lg:block" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col px-(--gutter) pb-10 pt-[46svh] sm:pt-[48svh] lg:pb-14 lg:pt-[9.5rem]">
        {/* Rubrica, como nas peças da marca */}
        <ul className="hero-fade eyebrow mb-10 hidden space-y-2.5 text-porcelain/85 lg:block" style={{ ["--i" as string]: 0 }}>
          {hero.eyebrow.map((w) => (
            <li key={w}>{w}</li>
          ))}
          <li aria-hidden="true" className="!mt-6 block h-px w-16 bg-porcelain/60" />
        </ul>

        <h1 id="hero-title" className="display max-w-[11ch] text-[clamp(3.4rem,11.5vw,5rem)] text-porcelain lg:text-[clamp(5.2rem,8.4vw,9.6rem)]">
          {lines.map((l, i) => (
            <span key={l} className="line-mask hero-line" style={{ ["--i" as string]: i }}>
              <span>{l}</span>
            </span>
          ))}
          <span className="line-mask hero-line" style={{ ["--i" as string]: lines.length }}>
            <span>
              {hero.titleLast.lead} <em>{hero.titleLast.emphasis}</em>.
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:mt-12 lg:max-w-[46rem] lg:grid-cols-[1px_1fr] lg:gap-10">
          <span aria-hidden="true" className="hero-rule hidden w-px bg-champagne/60 lg:block" />
          <div>
            <p className="hero-fade lede max-w-[34ch] text-porcelain/85" style={{ ["--i" as string]: 1 }}>
              {hero.lead}
            </p>
            <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ ["--i" as string]: 2 }}>
              <WhatsAppLink className="btn btn-solid" label={hero.cta}>
                {hero.cta} <Arrow />
              </WhatsAppLink>
              <a href="#cuidados" className="label ulink text-porcelain/85 hover:text-porcelain">
                {hero.secondary}
              </a>
            </div>
          </div>
        </div>

        <div className="hero-fade mt-auto flex items-end justify-between gap-6 pt-14" style={{ ["--i" as string]: 3 }}>
          <p className="eyebrow text-[0.625rem] text-champagne sm:text-[0.6875rem]">The Art of Feeling Well.</p>
          <a
            href="#a-savi"
            className="scroll-cue relative hidden h-20 w-px overflow-hidden bg-porcelain/15 after:absolute after:inset-0 after:bg-porcelain/80 sm:block lg:mr-[42%]"
            aria-label="Rolar para a próxima seção"
          />
        </div>
      </div>
    </section>
  );
}
