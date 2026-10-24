"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Botão flutuante discreto: aparece só depois da primeira dobra e some quando
 * a seção de contato ou o rodapé estão visíveis (evita redundância e sobreposição).
 */
export function WhatsAppFloat() {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const targets = [document.getElementById("contato"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setNearEnd(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !nearEnd;

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer external"
      aria-label="Conversar com a SAVI pelo WhatsApp (abre em nova aba)"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-[3.25rem] items-center overflow-hidden rounded-full border border-champagne/50 bg-navy-900/95 text-porcelain transition-[opacity,transform,border-color] duration-700 ease-(--ease-silk) hover:border-champagne lg:bottom-8 lg:right-8 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <span className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-[1.35rem] w-[1.35rem]" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
          <path d="M4.6 19.4l1.15-3.35A7.9 7.9 0 1 1 8.1 18.5z" strokeLinejoin="round" />
          <path d="M9.3 8.7c.2-.5.5-.55.8-.55h.45c.2 0 .4.1.5.4l.6 1.45c.1.25 0 .45-.12.6l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5c.18-.16.4-.2.6-.1l1.45.6c.3.12.4.32.4.5v.45c0 .3-.05.6-.55.8-.6.27-1.6.45-3-.2-1.6-.8-3-2.2-3.8-3.8-.66-1.4-.48-2.4-.23-2.95z" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="label hidden max-w-0 whitespace-nowrap pr-0 text-[0.65rem] transition-[max-width,padding] duration-700 ease-(--ease-silk) group-hover:max-w-[12rem] group-hover:pr-6 group-focus-visible:max-w-[12rem] group-focus-visible:pr-6 lg:inline">
        Conversar com a SAVI
      </span>
    </a>
  );
}
