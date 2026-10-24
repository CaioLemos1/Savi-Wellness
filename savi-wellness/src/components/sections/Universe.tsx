import { universe } from "@/content/content";
import { Monogram } from "@/components/brand/Monogram";

export function Universe() {
  const last = universe.title.length - 1;
  return (
    <section
      id="a-savi"
      aria-labelledby="universo-title"
      className="on-light relative overflow-hidden bg-ivory text-ink"
    >
      {/* O “fio”: a linha vertical das peças da marca, que se desenha na transição navy → marfim */}
      <span aria-hidden="true" className="thread absolute left-1/2 top-0 h-28 w-px bg-champagne-deep/70 lg:left-[calc(var(--gutter)+0.5px)] lg:h-48" />

      <div className="mx-auto max-w-[100rem] px-(--gutter) pb-24 pt-36 lg:pb-36 lg:pt-56">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-2">
            <p className="eyebrow text-champagne-deep" data-reveal>
              <span className="serif-italic mr-3 font-serif text-base normal-case tracking-normal">I.</span>
              {universe.eyebrow}
            </p>
          </div>

          <div className="lg:col-span-7">
            <h2
              id="universo-title"
              data-reveal="mask"
              className="display text-[clamp(2.8rem,7.4vw,7rem)] text-navy-900"
            >
              {universe.title.map((l, i) => (
                <span key={l} className="line-mask" style={{ ["--i" as string]: i }}>
                  <span className={i === 1 ? "lg:pl-[1.2em]" : undefined}>
                    {i === last ? (
                      <>
                        e <em>cuidado</em>.
                      </>
                    ) : (
                      l
                    )}
                  </span>
                </span>
              ))}
            </h2>

            <div className="mt-14 grid grid-cols-[1fr_6.5rem] gap-6 sm:grid-cols-[1fr_9rem] lg:mt-20 lg:block lg:pl-[22%]">
              <div>
                <span aria-hidden="true" className="mb-8 block h-px w-14 bg-navy-900/50" data-reveal="line-x" />
                <p className="lede max-w-[40ch] text-ink/85" data-reveal style={{ ["--d" as string]: 1 }}>
                  {universe.body}
                </p>
                <div className="mt-10 flex items-center gap-4 text-navy-900" data-reveal style={{ ["--d" as string]: 2 }}>
                  <Monogram className="h-6 w-auto text-champagne-deep" />
                  <span aria-hidden="true" className="h-px w-8 bg-navy-900/30" />
                  <p className="eyebrow text-[0.625rem] text-taupe">SAVI Wellness</p>
                </div>
              </div>
              {/* Foto (mobile) */}
              <div className="relative h-[22rem] overflow-hidden lg:hidden" data-reveal="photo">
                <img
                  src={universe.image.src}
                  width={universe.image.width}
                  height={universe.image.height}
                  alt={universe.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Coluna fotográfica (desktop) */}
          <div className="relative hidden lg:col-span-2 lg:col-start-11 lg:block">
            <div className="relative h-[min(72vh,44rem)] overflow-hidden" data-reveal="photo">
              <img
                src={universe.image.src}
                width={universe.image.width}
                height={universe.image.height}
                alt={universe.image.alt}
                loading="lazy"
                decoding="async"
                className="parallax h-full w-full object-cover"
              />
            </div>
            <p className="eyebrow mt-5 text-[0.625rem] text-taupe">Luz, pele, tempo.</p>
          </div>
        </div>

        {/* Princípios */}
        <ul className="mt-24 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:mt-36 lg:grid-cols-4">
          {universe.principles.map((p, i) => (
            <li key={p.word} className="relative pt-7">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full bg-navy-900/25"
                data-reveal="line-x"
                style={{ ["--d" as string]: i }}
              />
              <div data-reveal style={{ ["--d" as string]: i + 1 }}>
                <p className="flex items-baseline gap-4">
                  <span className="serif-italic font-serif text-sm text-champagne-deep">0{i + 1}</span>
                  <span className="font-serif text-[1.9rem] font-light leading-none text-navy-900">{p.word}</span>
                </p>
                <p className="mt-3 pl-8 text-[0.95rem] text-taupe">{p.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
