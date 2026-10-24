import type { Metadata } from "next";
import { LegalPage, Field } from "@/components/legal/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a SAVI Wellness trata dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: { canonical: "/privacidade/" },
};

export default function Privacidade() {
  const { legal, address } = siteConfig;
  const addr = address ? `${address.street}, ${address.district}, ${address.city}/${address.state}, CEP ${address.postalCode}` : null;
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        Esta política explica, de forma direta, como os dados pessoais são tratados quando você visita este site e
        quando escolhe falar com a SAVI Wellness. Ela segue a Lei Geral de Proteção de Dados Pessoais (Lei nº
        13.709/2018 — LGPD).
      </p>

      <h2>1. Quem é o controlador</h2>
      <ul>
        <li>Razão social: <Field value={legal.companyName} pending="razão social" /></li>
        <li>CNPJ: <Field value={legal.cnpj} pending="CNPJ" /></li>
        <li>Endereço: <Field value={addr} pending="endereço do controlador" /></li>
        <li>Canal de privacidade (encarregado/DPO): <Field value={legal.privacyContactEmail} pending="e-mail do canal de privacidade" /></li>
      </ul>

      <h2>2. O que este site coleta</h2>
      <p>
        Este site foi construído para coletar o mínimo possível. Ele <strong>não possui formulários</strong>,{" "}
        <strong>não utiliza cookies de publicidade ou de análise</strong> e <strong>não carrega ferramentas de
        rastreamento de terceiros</strong>.
      </p>
      <p>
        Como em qualquer site, o provedor de hospedagem pode registrar dados técnicos de acesso (como endereço IP,
        navegador, data e hora) para segurança e funcionamento do serviço. Provedor de hospedagem:{" "}
        <Field value={null} pending="nome do provedor e prazo de retenção dos registros" />.
      </p>

      <h2>3. Quando você nos chama pelo WhatsApp</h2>
      <p>
        Os botões de atendimento abrem o WhatsApp com uma mensagem inicial que menciona apenas, quando for o caso, o
        nome do cuidado sobre o qual você deseja informações. Nenhum dado é enviado pelo site. A conversa ocorre no
        WhatsApp, serviço da WhatsApp LLC/Meta, sujeito à política de privacidade própria dessa plataforma.
      </p>
      <p>
        Os dados que você compartilhar na conversa (como nome, telefone e preferência de horário) são utilizados para
        responder ao seu contato e organizar o atendimento. Recomendamos não enviar informações detalhadas de saúde
        pelo aplicativo antes da consulta; elas serão tratadas no momento adequado, com o cuidado que exigem.
      </p>

      <h2>4. Finalidades e bases legais</h2>
      <ul>
        <li>Responder a solicitações e agendar atendimentos — procedimentos preliminares a contrato (art. 7º, V). <Field value={null} pending="validar base legal" /></li>
        <li>Segurança do site e prevenção a fraudes — legítimo interesse (art. 7º, IX). <Field value={null} pending="validar base legal" /></li>
        <li>Dados de saúde, quando fornecidos no contexto do atendimento — tutela da saúde por profissional de saúde (art. 11, II, “f”). <Field value={null} pending="validar base legal" /></li>
      </ul>

      <h2>5. Compartilhamento</h2>
      <p>
        Os dados não são vendidos. Podem ser tratados por fornecedores estritamente necessários à operação:{" "}
        <Field value={null} pending="lista de operadores (hospedagem, WhatsApp Business, sistema de agenda/prontuário)" />.
      </p>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>
        Os dados são mantidos apenas pelo tempo necessário às finalidades acima ou pelo prazo exigido em lei e nas
        normas aplicáveis à prática médica. Prazos definidos: <Field value={null} pending="política de retenção" />.
      </p>

      <h2>7. Seus direitos</h2>
      <p>Nos termos do art. 18 da LGPD, você pode solicitar, a qualquer momento:</p>
      <ul>
        <li>confirmação da existência de tratamento e acesso aos dados;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
        <li>portabilidade, informação sobre compartilhamentos e revogação do consentimento, quando aplicável.</li>
      </ul>
      <p>
        Para exercer seus direitos, escreva para <Field value={legal.privacyContactEmail} pending="e-mail do canal de privacidade" />.
        Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
      </p>

      <h2>8. Cookies</h2>
      <p>
        Este site não utiliza cookies não essenciais. Por isso, não exibimos um aviso de consentimento. Se isso mudar,
        esta política será atualizada e você poderá aceitar ou recusar esses cookies antes de qualquer ativação.
      </p>

      <h2>9. Segurança</h2>
      <p>
        O site é servido exclusivamente por conexão segura (HTTPS) e adota cabeçalhos de segurança, política de
        conteúdo restritiva e ausência de scripts de terceiros. Nenhuma medida elimina todos os riscos, mas buscamos
        reduzi-los de forma contínua.
      </p>

      <h2>10. Alterações</h2>
      <p>Esta política pode ser atualizada. A data da última revisão aparece no topo desta página.</p>
    </LegalPage>
  );
}
