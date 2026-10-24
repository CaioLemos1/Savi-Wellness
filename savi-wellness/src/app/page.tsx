import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Universe } from "@/components/sections/Universe";
import { CareIndex } from "@/components/sections/CareIndex";
import { Experience } from "@/components/sections/Experience";
import { Invitation } from "@/components/sections/Invitation";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { organizationJsonLd, serializeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Universe />
        <CareIndex />
        <Experience />
        <Invitation />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
      <script
        type="application/ld+json"
        // Conteúdo 100% estático, gerado a partir do arquivo de configuração e escapado.
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd()) }}
      />
    </>
  );
}
