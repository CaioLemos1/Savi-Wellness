import { experience } from "@/content/content";

export function Experience() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="grain relative isolate overflow-hidden bg-navy-900 text-porcelain"
    >
      <div className="light-field is-soft" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[100rem] gap-16 px-(--gutter) py-24 lg:grid-cols-12 lg:gap-x-8 lg:py-40">
        <div className="lg:col-span-5">
          <p className="eyebrow text-champagne" data-reveal>
            <span className="serif-italic mr-3 font-serif text-base normal-case tracking-normal">III.</span>
            {experience.eyebrow}
          </p>
          <h2
            id="experiencia-title"
            data-reveal="mask"
            className="display mt-10 text-[clamp(2.7rem,6vw,5.6rem)] text-porcelain"
          >
            {experience.title.lines.map((l, i) => (
              <span key={l} className="line-mask" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
            <span className="line-mask" style={{ ["--i" as string]: 2 }}>
              <span>
                <em className="text-champagne">{experience.title.emphasis}</em>
              </span>
            </span>
          </h2>
          <p className="lede mt-10 max-w-[38ch] text-porcelain-muted" data-reveal style={{ ["--d" as string]: 1 }}>
            {experience.intro}
          </p>

          {/* Prancha de detalhe: imagem pequena, de propósito — como uma nota de rodapé visual */}
          <figure className="mt-14 flex items-end gap-5" data-reveal style={{ ["--d" as string]: 2 }}>
            <div className="relative w-[9.5rem] overflow-hidden" data-reveal="photo">
              <img
                src={experience.image.src}
                width={experience.image.width}
                height={experience.image.height}
                alt={experience.image.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="eyebrow max-w-[14ch] pb-1 text-[0.6rem] leading-loose text-porcelain-muted">
              Fig. — Atenção ao detalhe
            </figcaption>
          </figure>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7 lg:pt-6">
          <span aria-hidden="true" className="thread absolute bottom-6 left-[1.4rem] top-6 w-px bg-champagne/30" />
          {experience.steps.map((s, i) => (
            <li
              key={s.title}
              className="relative grid grid-cols-[2.8rem_1fr] gap-x-6 pb-14 last:pb-0 sm:gap-x-10"
              data-reveal
              style={{ ["--d" as string]: i }}
            >
              <span className="relative z-[1] flex h-11 w-11 items-center justify-center bg-navy-900 font-serif text-xl italic text-champagne ring-1 ring-champagne/40">
                {s.roman}
              </span>
              <div className="pt-1.5">
                <h3 className="font-serif text-[2rem] font-light leading-none text-porcelain">{s.title}</h3>
                <p className="mt-4 max-w-[40ch] leading-relaxed text-porcelain-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
