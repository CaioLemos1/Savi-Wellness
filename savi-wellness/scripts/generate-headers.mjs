/**
 * Pós-build: gera out/_headers (Cloudflare Pages / Netlify) com uma
 * Content-Security-Policy estrita. Os scripts inline do Next.js recebem
 * hash SHA-256 individual — sem 'unsafe-inline' e sem 'unsafe-eval' em script-src.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = "out";
if (!existsSync(OUT)) {
  console.error("Pasta out/ não encontrada. Rode o build antes.");
  process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) htmlFiles.push(p);
  }
})(OUT);

const hashes = new Set();
const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(scriptRe)) {
    const attrs = m[1] ?? "";
    const body = m[2] ?? "";
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/type\s*=\s*"application\/(ld\+)?json"/i.test(attrs)) continue; // blocos de dados não executam
    if (!body.length) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(" ")}`.trim(),
  // style-src precisa de 'unsafe-inline' por atributos style (variáveis CSS de animação) do React.
  // Risco baixo: não há CSS de terceiros nem conteúdo de usuário. Ver SECURITY.md.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const permissions = [
  "accelerometer=()", "autoplay=()", "camera=()", "display-capture=()", "encrypted-media=()",
  "fullscreen=(self)", "geolocation=()", "gyroscope=()", "magnetometer=()", "microphone=()",
  "midi=()", "payment=()", "picture-in-picture=()", "publickey-credentials-get=()",
  "screen-wake-lock=()", "sync-xhr=()", "usb=()", "xr-spatial-tracking=()", "browsing-topics=()",
].join(", ");

const headers = `# Gerado automaticamente por scripts/generate-headers.mjs — não editar à mão.
/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: ${permissions}
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  X-DNS-Prefetch-Control: off

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000

/brand/*
  Cache-Control: public, max-age=2592000

/fonts/*
  Cache-Control: public, max-age=31536000
`;

writeFileSync(join(OUT, "_headers"), headers);
writeFileSync(join(OUT, "csp.txt"), csp + "\n");
console.log(`✓ _headers gerado (${htmlFiles.length} páginas, ${hashes.size} hashes de script inline).`);
console.log("  Arquivos:", htmlFiles.map((f) => relative(OUT, f)).join(", "));
