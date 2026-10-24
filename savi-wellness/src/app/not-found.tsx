import { Wordmark } from "@/components/brand/Wordmark";

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy-900 px-(--gutter) text-center text-porcelain">
      <div className="light-field is-soft" aria-hidden="true" />
      <Wordmark className="relative h-auto w-40" />
      <span aria-hidden="true" className="relative mt-10 block h-16 w-px bg-champagne/50" />
      <h1 className="display relative mt-10 text-[clamp(2.4rem,6vw,4rem)]">
        Esta página <em>não existe</em>.
      </h1>
      <a href="/" className="btn relative mt-12">
        Voltar ao início
      </a>
    </main>
  );
}
