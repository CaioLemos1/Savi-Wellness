"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { nav } from "@/content/content";

/** Seções sem link próprio herdam o item de navegação mais próximo. */
const SECTION_TO_NAV: Record<string, string> = {
  inicio: "inicio",
  "a-savi": "a-savi",
  cuidados: "cuidados",
  experiencia: "a-savi",
  contato: "contato",
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Fundo do header ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Indicador de seção ativa
  useEffect(() => {
    const sections = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(SECTION_TO_NAV[e.target.id] ?? "inicio");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menu mobile: trava a rolagem, foco inicial, Esc e foco preso no diálogo
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    // Ciclo de foco: botão fechar (no header) + links do menu
    const links = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    const focusables = () => [toggleRef.current, ...links()].filter((el): el is HTMLElement => el !== null);
    links()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && close(false);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <>
    <header
      data-scrolled={scrolled || open}
      className="group/header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-700 ease-(--ease-silk) border-b border-transparent data-[scrolled=true]:border-porcelain/10 data-[scrolled=true]:bg-navy-900/92 data-[scrolled=true]:backdrop-blur-md"
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-champagne focus:px-4 focus:py-2 focus:text-navy-900"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-[4.75rem] max-w-[100rem] items-center justify-between px-(--gutter) transition-[height] duration-700 lg:group-data-[scrolled=false]/header:h-[6.5rem]">
        <a href="#inicio" className="relative z-[51] block text-porcelain" aria-label="SAVI Wellness — voltar ao início">
          <Wordmark
            decorative
            className="h-[2.6rem] w-auto transition-[height] duration-700 ease-(--ease-silk) lg:group-data-[scrolled=false]/header:h-[3.4rem]"
          />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className="label ulink text-porcelain/80 transition-colors hover:text-porcelain aria-[current=true]:text-porcelain"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <WhatsAppLink className="btn hidden min-h-11 px-5 text-porcelain lg:inline-flex" label="Agendar atendimento">
            Agendar atendimento
          </WhatsAppLink>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-[51] -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-full bg-porcelain transition-transform duration-500 ease-(--ease-silk) ${open ? "top-1/2 rotate-[22deg]" : "top-0"}`}
              />
              <span
                className={`absolute left-0 block h-px bg-porcelain transition-all duration-500 ease-(--ease-silk) ${open ? "top-1/2 w-full -rotate-[22deg]" : "bottom-0 w-2/3"}`}
              />
            </span>
          </button>
        </div>
      </div>

    </header>
      {/* Menu mobile */}
      <div
        id="menu-mobile"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-navy-900 lg:hidden"
      >
        <div className="light-field is-soft" aria-hidden="true" />
        <div className="relative flex min-h-full flex-col px-(--gutter) pb-10 pt-28">
          <p className="eyebrow mb-10 text-champagne">Menu</p>
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.id} className="border-b border-porcelain/12">
                <a
                  href={`#${item.id}`}
                  onClick={() => close(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className="menu-item group flex items-baseline gap-5 py-5"
                  style={{ ["--i" as string]: i }}
                >
                  <span className="serif-italic font-serif text-lg text-champagne">0{i + 1}</span>
                  <span className="display text-[2.6rem] text-porcelain">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-12">
            <WhatsAppLink className="btn btn-solid w-full justify-between" label="Agendar atendimento">
              Agendar atendimento <span className="arrow" aria-hidden="true" />
            </WhatsAppLink>
            <p className="eyebrow mt-8 text-center text-porcelain-muted">The Art of Feeling Well.</p>
          </div>
        </div>
      </div>
    </>
  );
}
