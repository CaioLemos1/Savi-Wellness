"use client";

import { useEffect } from "react";

/**
 * Um único IntersectionObserver para todo o site: adiciona `.is-in` aos
 * elementos com [data-reveal] quando entram na tela. Sem biblioteca.
 *
 * Elementos revelados por clip-path ([data-reveal="photo"]) começam com
 * área visível zero — e o IntersectionObserver considera o clip-path do
 * próprio alvo. Por isso observamos o elemento pai e revelamos o filho.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const targets = new Map<Element, HTMLElement[]>();
    for (const el of els) {
      const observed = el.dataset.reveal === "photo" && el.parentElement ? el.parentElement : el;
      const list = targets.get(observed) ?? [];
      list.push(el);
      targets.set(observed, list);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          targets.get(e.target)?.forEach((el) => el.classList.add("is-in"));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    targets.forEach((_, t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return null;
}
