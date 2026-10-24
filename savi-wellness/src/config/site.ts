/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SAVI WELLNESS — CONFIGURAÇÃO CENTRAL
 * ─────────────────────────────────────────────────────────────────────────────
 *  Este é o ÚNICO arquivo que precisa ser editado para:
 *  WhatsApp, Instagram, endereço, dados legais, responsável técnico, domínio
 *  e status de validação do conteúdo.
 *
 *  Regra do projeto: nenhum dado é inventado. Tudo que ainda não foi fornecido
 *  está como `null` (marcado com  ⚠ PENDENTE). O build de produção
 *  (`npm run build`) é BLOQUEADO enquanto houver pendências obrigatórias.
 *  Para uma prévia interna, use `npm run build:preview` (gera noindex e selo
 *  "Prévia — pendente de validação").
 *
 *  Este arquivo não pode ter imports: ele é lido também pelo script
 *  scripts/check-config.mjs (Node com remoção de tipos).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  brand: {
    name: "SAVI Wellness",
    shortName: "SAVI",
    signature: "The Art of Feeling Well.",
    positioning: "Uma nova perspectiva sobre beleza e cuidado.",
  },

  /** Domínio final, sem barra no final. Pode ser sobrescrito por NEXT_PUBLIC_SITE_URL. */
  siteUrl: null as string | null, // ⚠ PENDENTE — ex.: "https://www.saviwellness.com.br"

  seo: {
    title: "SAVI Wellness — Medicina estética e bem-estar",
    description:
      "Medicina estética com olhar individualizado, valorizando a naturalidade, a harmonia e a singularidade de cada pessoa. The Art of Feeling Well.",
    locale: "pt_BR",
  },

  whatsapp: {
    /**
     * Número oficial em formato internacional, SOMENTE dígitos:
     * 55 + DDD + número. Ex.: "5511999999999".
     */
    number: null as string | null, // ⚠ PENDENTE
    defaultMessage:
      "Olá! Conheci a SAVI pelo site e gostaria de saber mais sobre os atendimentos.",
  },

  /** Perfil oficial. Ex.: "https://www.instagram.com/saviwellness" */
  instagram: null as string | null, // ⚠ PENDENTE (opcional — só aparece quando preenchido)

  /** Endereço confirmado. Enquanto null, nenhum endereço é exibido nem enviado aos dados estruturados. */
  address: null as null | {
    street: string; // "Rua Exemplo, 123 — Sala 4"
    district: string;
    city: string;
    state: string; // "SP"
    postalCode: string; // "00000-000"
  }, // ⚠ PENDENTE (opcional até a inauguração do espaço)

  legal: {
    /** Razão social da clínica (pessoa jurídica). */
    companyName: null as string | null, // ⚠ PENDENTE
    /** CNPJ no formato 00.000.000/0000-00 */
    cnpj: null as string | null, // ⚠ PENDENTE
    /** Inscrição da pessoa jurídica no CRM, quando aplicável. */
    crmCompanyRegistration: null as string | null, // ⚠ PENDENTE (verificar aplicabilidade)
    /**
     * Diretor(a) técnico(a) médico(a). Resolução CFM nº 2.336/2023:
     * publicidade de estabelecimento deve identificar o responsável técnico.
     */
    technicalDirector: null as null | {
      name: string; // nome completo
      crm: string; // número do CRM
      uf: string; // estado do CRM
      /** RQE — preencher SOMENTE se houver especialidade registrada e for anunciada. */
      rqe?: string;
      specialty?: string;
    }, // ⚠ PENDENTE
    /** Canal para titulares de dados (LGPD). Ex.: "privacidade@dominio.com.br" */
    privacyContactEmail: null as string | null, // ⚠ PENDENTE
    /** Data da última revisão da Política de Privacidade/Termos (AAAA-MM-DD). */
    policiesLastReviewed: null as string | null, // ⚠ PENDENTE (após revisão jurídica)
  },

  validation: {
    /** Marcar true SOMENTE após a responsável médica revisar textos e serviços. */
    medicalContentApproved: false, // ⚠ PENDENTE
    /** Marcar true SOMENTE após revisão jurídica de Privacidade e Termos. */
    legalPagesApproved: false, // ⚠ PENDENTE
  },

  /**
   * Cookies não essenciais (analytics, pixels). O site, como entregue, NÃO usa
   * nenhum — por isso não exibe banner de consentimento. Se algum dia for
   * ativado, é obrigatório implementar consentimento prévio (ver SECURITY.md).
   */
  nonEssentialCookies: false,
} as const;

export type SiteConfig = typeof siteConfig;
