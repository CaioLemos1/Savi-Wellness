/**
 * Verifica pendências em src/config/site.ts.
 *  - `node scripts/check-config.mjs`              → lista pendências (não falha)
 *  - `node scripts/check-config.mjs --production` → FALHA se houver pendência obrigatória
 * Requer Node ≥ 22.18 (remoção nativa de tipos TypeScript).
 */
import { siteConfig as c } from "../src/config/site.ts";

const production = process.argv.includes("--production");
const required = [];
const optional = [];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || c.siteUrl;
if (!siteUrl || !/^https:\/\//.test(siteUrl) || /PENDENTE/i.test(siteUrl)) required.push("siteUrl / NEXT_PUBLIC_SITE_URL (domínio final com https)");
if (!c.whatsapp.number || !/^55\d{10,11}$/.test(String(c.whatsapp.number).replace(/\D/g, ""))) required.push("whatsapp.number (formato 55DDDNUMERO)");
if (!c.legal.companyName) required.push("legal.companyName (razão social)");
if (!c.legal.cnpj) required.push("legal.cnpj");
if (!c.legal.technicalDirector) required.push("legal.technicalDirector (nome, CRM, UF) — Res. CFM 2.336/2023");
if (!c.legal.privacyContactEmail) required.push("legal.privacyContactEmail (canal LGPD)");
if (!c.legal.policiesLastReviewed) required.push("legal.policiesLastReviewed (data da revisão jurídica)");
if (!c.validation.medicalContentApproved) required.push("validation.medicalContentApproved (revisão médica do conteúdo)");
if (!c.validation.legalPagesApproved) required.push("validation.legalPagesApproved (revisão jurídica de Privacidade/Termos)");
if (c.legal.technicalDirector?.rqe && !c.legal.technicalDirector?.specialty) required.push("legal.technicalDirector.specialty (RQE informado sem especialidade)");
if (!c.instagram) optional.push("instagram");
if (!c.address) optional.push("address (endereço — opcional até a inauguração)");
if (c.nonEssentialCookies) required.push("nonEssentialCookies=true exige implementar consentimento antes do build");

const line = (s) => `   • ${s}`;
if (required.length) {
  console.log(`\n⚠  PENDENTE DE VALIDAÇÃO — ${required.length} item(ns) obrigatório(s):`);
  console.log(required.map(line).join("\n"));
}
if (optional.length) {
  console.log(`\nℹ  Opcionais não preenchidos:`);
  console.log(optional.map(line).join("\n"));
}
if (!required.length) console.log("\n✓ Configuração completa para publicação.");

if (production && required.length) {
  console.error("\n✗ Build de produção bloqueado. Preencha src/config/site.ts ou use `npm run build:preview` para uma prévia interna (noindex).\n");
  process.exit(1);
}
console.log("");
