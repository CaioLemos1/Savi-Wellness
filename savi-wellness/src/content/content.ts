/**
 * Conteúdo institucional da landing page.
 * Todo texto de saúde aqui deve ser revisado pela responsável médica antes da
 * publicação (ver siteConfig.validation.medicalContentApproved).
 * Diretriz: sem promessa de resultado, sem "segurança garantida", sem superlativos.
 */

export type Modality = "presencial" | "online";

export type Service = {
  id: string;
  number: string;
  name: string;
  /** Nome curto, usado na mensagem do WhatsApp (sem dados de saúde). */
  messageName: string;
  description: string;
  modalities: Modality[];
  image: { src: string; width: number; height: number; alt: string };
};

export const nav = [
  { id: "inicio", label: "Início" },
  { id: "a-savi", label: "A SAVI" },
  { id: "cuidados", label: "Cuidados" },
  { id: "contato", label: "Contato" },
] as const;

export const hero = {
  eyebrow: ["Medicina", "Estética", "Bem-estar"],
  // A última palavra recebe itálico, como na peça "A beleza encontra a ciência."
  titleLines: ["A beleza", "encontra"],
  titleLast: { lead: "a", emphasis: "ciência" },
  lead: "Medicina estética com olhar individualizado, valorizando a naturalidade, a harmonia e a singularidade de cada pessoa.",
  cta: "Agendar atendimento",
  secondary: "Conhecer os cuidados",
  image: {
    src: "/images/hero-retrato-580.webp",
    srcSet: "/images/hero-retrato-400.webp 400w, /images/hero-retrato-580.webp 580w",
    width: 580,
    height: 1200,
    alt: "Retrato editorial em luz natural: rosto de mulher com pele ao natural, iluminado por luz suave lateral.",
  },
};

export const universe = {
  eyebrow: "O universo SAVI",
  title: ["Uma nova perspectiva", "sobre beleza", "e cuidado."],
  body: "Na SAVI, acreditamos em uma abordagem que considera a individualidade, a naturalidade e o bem-estar. Nossa proposta integra conhecimento científico e atenção personalizada para construir uma experiência de cuidado alinhada às necessidades de cada pessoa.",
  principles: [
    { word: "Individualidade", line: "Cada pessoa, um olhar próprio." },
    { word: "Naturalidade", line: "Harmonia antes de excesso." },
    { word: "Ciência", line: "Conhecimento como ponto de partida." },
    { word: "Bem-estar", line: "Cuidado que vai além da estética." },
  ],
  image: {
    src: "/images/luz-ombro-280.webp",
    width: 280,
    height: 1190,
    alt: "Detalhe de ombro sob luz natural recortada, em tons de areia.",
  },
};

export const services: Service[] = [
  {
    id: "skincare",
    number: "01",
    name: "Consulta médica de skincare",
    messageName: "a consulta médica de skincare",
    description:
      "Avaliação médica e orientação individualizada para os cuidados com a pele, com foco em saúde e prevenção.",
    modalities: ["presencial", "online"],
    image: { src: "/images/cuidado-skincare-188.webp", width: 188, height: 170, alt: "Gota de sérum translúcido sobre superfície clara." },
  },
  {
    id: "toxina-botulinica",
    number: "02",
    name: "Toxina botulínica",
    messageName: "o atendimento com toxina botulínica",
    description:
      "Planejamento individualizado de procedimentos com toxina botulínica, mediante avaliação profissional.",
    modalities: ["presencial"],
    image: { src: "/images/cuidado-toxina-188.webp", width: 188, height: 163, alt: "Detalhe de olhar feminino em luz suave." },
  },
  {
    id: "preenchimento-facial",
    number: "03",
    name: "Preenchimento facial",
    messageName: "o atendimento de preenchimento facial",
    description:
      "Abordagem individualizada, considerando as características e proporções de cada pessoa.",
    modalities: ["presencial"],
    image: { src: "/images/cuidado-preenchimento-188.webp", width: 188, height: 165, alt: "Detalhe de rosto e lábios em luz natural." },
  },
  {
    id: "tratamentos-esteticos",
    number: "04",
    name: "Tratamentos estéticos e rejuvenescimento",
    messageName: "os tratamentos estéticos e de rejuvenescimento",
    description:
      "Protocolos de cuidados estéticos definidos conforme avaliação e indicação profissional.",
    modalities: ["presencial"],
    image: { src: "/images/cuidado-tratamentos-188.webp", width: 188, height: 176, alt: "Pele do ombro e pescoço sob luz quente." },
  },
  {
    id: "teleconsultas",
    number: "05",
    name: "Teleconsultas",
    messageName: "as teleconsultas",
    description:
      "Atendimento médico remoto, quando adequado e permitido pelas normas aplicáveis.",
    modalities: ["online"],
    image: { src: "/images/cuidado-teleconsulta-188.webp", width: 188, height: 165, alt: "Notebook aberto sobre bancada de mármore claro." },
  },
  {
    id: "acompanhamento",
    number: "06",
    name: "Acompanhamento contínuo",
    messageName: "o acompanhamento contínuo",
    description: "Acompanhamento individualizado ao longo da jornada de cuidados.",
    modalities: ["presencial", "online"],
    image: { src: "/images/cuidado-acompanhamento-188.webp", width: 188, height: 144, alt: "Pedra lisa e ramo verde sobre prato de vidro." },
  },
];

export const careIndex = {
  eyebrow: "Nossos cuidados",
  title: ["Cuidado completo", "para a sua beleza", "e bem-estar."],
  note: "Indicações definidas somente após avaliação profissional individual.",
};

export const experience = {
  eyebrow: "A experiência SAVI",
  title: { lines: ["O cuidado", "começa no"], emphasis: "olhar." },
  intro:
    "Antes de qualquer indicação, existe uma conversa. Cada etapa é conduzida com tempo, atenção e critério — para que o cuidado faça sentido para quem o recebe.",
  steps: [
    { roman: "I", title: "Escuta", text: "Entender a sua história, as suas expectativas e o que é importante para você." },
    { roman: "II", title: "Avaliação", text: "Uma análise profissional e individual, que orienta cada decisão seguinte." },
    { roman: "III", title: "Planejamento", text: "Um plano de cuidados construído com você, com indicações claras e realistas." },
    { roman: "IV", title: "Acompanhamento", text: "Presença ao longo da jornada, com retornos e orientações sempre que necessário." },
  ],
  image: {
    src: "/images/cuidado-toxina-188.webp",
    width: 188,
    height: 163,
    alt: "Detalhe de um olhar em luz natural.",
  },
};

export const invitation = {
  title: { lead: "Seu cuidado merece um novo", emphasis: "olhar." },
  body: "Conheça a SAVI e descubra as possibilidades de um atendimento pensado para você.",
  cta: "Conversar com a SAVI",
};

export const modalityLabel = (m: Modality[]) =>
  m.length === 2 ? "Presencial e online" : m[0] === "online" ? "Online" : "Presencial";
