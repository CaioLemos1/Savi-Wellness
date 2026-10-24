"use client";

import { useState } from "react";
import { careIndex, services, modalityLabel } from "@/content/content";
import { WhatsAppLink, Arrow } from "@/components/ui/WhatsAppLink";
import { serviceMessage } from "@/lib/whatsapp";

/**
 * Índice de Cuidados — lista editorial interativa.
 * Desktop: passar o cursor/foco pré-visualiza a imagem na “prancha” fixa;
 * clicar abre os detalhes. Mobile: acordeão por toque, imagem dentro do item.
 * Não depende de hover; cada item é um botão com aria-expanded.
 */
export function CareIndex() {
  const [open, setOpen] = useState<string>(services[0]!.id);
  const [preview, setPreview] = useState<string | null>(null);
  const shownId = preview ?? open;
  const shown = services.find((s) => s.id === shownId) ?? services[0]!;
  const shownIndex = services.indexOf(shown);

  return (
    <section id="cuidados" aria-labelledby="cuidados-title" className="on-light relative bg-sand text-ink">
      <div className="mx-auto max-w-[100rem] px-(--gutter) py-24 lg:py-36">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <p className="eyebrow text-champagne-deep lg:col-span-2" data-reveal>
            <span className="serif-italic mr-3 font-serif text-base normal-case tracking-normal">II.</span>
            {careIndex.eyebrow}
          </p>
          <h2
            id="cuidados-title"
            data-reveal="mask"
            className="display text-[clamp(2.5rem,5.6vw,5.4rem)] text-navy-900 lg:col-span-8"
          >
            {careIndex.title.map((l, i) => (
              <span key={l} className="line-mask" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </header>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          <ol
            className="lg:col-span-7 lg:col-start-1"
            onMouseLeave={() => setPreview(null)}
            aria-label="Lista de cuidados"
          >
            {services.map((s, i) => {
              const isOpen = open === s.id;
              const panelId = `cuidado-${s.id}`;
              const btnId = `${panelId}-btn`;
              return (
                <li
                  key={s.id}
                  className="relative border-t border-navy-900/20 last:border-b"
                  data-reveal
                  style={{ ["--d" as string]: i }}
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? "" : s.id)}
                      onMouseEnter={() => setPreview(s.id)}
                      onFocus={() => setPreview(s.id)}
                      onBlur={() => setPreview(null)}
                      className="group grid min-h-[5.5rem] w-full grid-cols-[2.75rem_1fr_auto] items-center gap-x-3 py-6 text-left sm:grid-cols-[4rem_1fr_auto_auto] sm:gap-x-6"
                    >
                      <span
                        className={`font-serif text-xl italic transition-colors duration-500 ${isOpen || preview === s.id ? "text-champagne-deep" : "text-taupe"}`}
                      >
                        {s.number}
                      </span>
                      <span
                        className={`label text-[0.78rem] leading-relaxed transition-[color,transform] duration-500 ease-(--ease-silk) sm:text-[0.86rem] ${isOpen ? "text-navy-900" : "text-ink/85 group-hover:text-navy-900"} motion-safe:group-hover:translate-x-1.5`}
                      >
                        {s.name}
                      </span>
                      <span className="eyebrow hidden text-[0.6rem] text-taupe sm:block">{modalityLabel(s.modalities)}</span>
                      <span aria-hidden="true" className="relative ml-2 block h-3 w-3">
                        <span className="absolute left-0 top-1/2 h-px w-full bg-navy-900/70" />
                        <span
                          className={`absolute left-1/2 top-0 h-full w-px bg-navy-900/70 transition-transform duration-500 ease-(--ease-silk) ${isOpen ? "scale-y-0" : "scale-y-100"}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="accordion-panel"
                    data-open={isOpen}
                    inert={!isOpen}
                  >
                    <div>
                      <div className="grid grid-cols-[1fr] gap-6 pb-9 pl-[3.5rem] sm:pl-[5.5rem] lg:pr-16">
                        <div className="flex gap-5">
                          <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden sm:w-28 lg:hidden">
                            <img
                              src={s.image.src}
                              width={s.image.width}
                              height={s.image.height}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="max-w-[46ch] text-[0.98rem] leading-relaxed text-ink/80">{s.description}</p>
                            <p className="eyebrow mt-4 text-[0.6rem] text-champagne-deep sm:hidden">
                              {modalityLabel(s.modalities)}
                            </p>
                          </div>
                        </div>
                        <WhatsAppLink
                          message={serviceMessage(s.messageName)}
                          className="label ulink inline-flex w-fit items-center gap-3 text-[0.7rem] text-navy-900"
                          label={`Conversar sobre ${s.name}`}
                        >
                          Conversar sobre este cuidado <span aria-hidden="true">→</span>
                        </WhatsAppLink>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Prancha fotográfica (desktop) */}
          <aside aria-hidden="true" className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-32 ml-auto max-w-[20rem]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory" data-reveal="photo">
                {services.map((s) => (
                  <div key={s.id} className="plate-img" data-active={s.id === shown.id}>
                    <img
                      src={s.image.src}
                      width={s.image.width}
                      height={s.image.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <span className="absolute inset-3 border border-ivory/40" />
              </div>
              <div className="mt-6 flex items-start justify-between gap-6 border-t border-navy-900/20 pt-5">
                <p className="font-serif text-lg italic text-champagne-deep">
                  {String(shownIndex + 1).padStart(2, "0")}
                  <span className="text-taupe"> / {String(services.length).padStart(2, "0")}</span>
                </p>
                <div className="text-right">
                  <p className="font-serif text-2xl font-light leading-tight text-navy-900">{shown.name}</p>
                  <p className="eyebrow mt-2 text-[0.6rem] text-taupe">{modalityLabel(shown.modalities)}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-12 max-w-[60ch] text-[0.85rem] text-taupe lg:pl-[calc(4rem+1.5rem)]" data-reveal>
          {careIndex.note}
        </p>
      </div>
    </section>
  );
}
