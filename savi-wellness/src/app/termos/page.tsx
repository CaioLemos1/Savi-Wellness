import type { Metadata } from "next";
import { LegalPage, Field } from "@/components/legal/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site da SAVI Wellness.",
  alternates: { canonical: "/termos/" },
};

export default function Termos() {
  const { legal } = siteConfig;
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Ao acessar este site, você concorda com as condições abaixo. Ele é mantido por{" "}
        <Field value={legal.companyName} pending="razão social" />, CNPJ <Field value={legal.cnpj} pending="CNPJ" />.
      </p>

      <h2>1. Finalidade do site</h2>
      <p>
        O conteúdo deste site tem caráter exclusivamente informativo e institucional. Ele não substitui consulta,
        avaliação ou orientação médica. Qualquer indicação de cuidado ou procedimento depende de avaliação
        profissional individual, e resultados variam de pessoa para pessoa.
      </p>

      <h2>2. Agendamentos e contato</h2>
      <p>
        O contato é realizado pelo WhatsApp. O envio de mensagem não garante disponibilidade de horário nem
        estabelece, por si só, relação médico-paciente.
      </p>

      <h2>3. Propriedade intelectual</h2>
      <p>
        Marca, logotipo, monograma, textos, fotografias e demais elementos visuais pertencem à SAVI Wellness ou a seus
        licenciantes e não podem ser reproduzidos sem autorização prévia.
      </p>

      <h2>4. Links externos</h2>
      <p>
        Links para serviços de terceiros (como WhatsApp e Instagram) seguem as políticas e termos dessas plataformas,
        sobre as quais a SAVI não tem controle.
      </p>

      <h2>5. Legislação e foro</h2>
      <p>
        Estes termos são regidos pela legislação brasileira. Foro: <Field value={null} pending="comarca" />.
      </p>

      <h2>6. Contato</h2>
      <p>
        Dúvidas sobre estes termos: <Field value={legal.privacyContactEmail} pending="e-mail de contato" />.
      </p>
    </LegalPage>
  );
}
