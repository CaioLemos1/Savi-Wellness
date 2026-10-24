/**
 * Servidor local SOMENTE para testes da pasta out/, aplicando os mesmos
 * headers de out/_headers (inclusive CSP), para validar a política antes do deploy.
 * Uso: npm run serve  →  http://localhost:4173
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, normalize, extname, resolve } from "node:path";

const ROOT = resolve("out");
const PORT = Number(process.env.PORT || 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".woff": "font/woff", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
  ".webmanifest": "application/manifest+json", ".json": "application/json",
};

function parseHeaders() {
  const rules = [];
  let cur = null;
  for (const raw of readFileSync(join(ROOT, "_headers"), "utf8").split("\n")) {
    if (!raw.trim() || raw.startsWith("#")) continue;
    if (!raw.startsWith(" ")) { cur = { pattern: raw.trim(), headers: {} }; rules.push(cur); continue; }
    const i = raw.indexOf(":"); cur.headers[raw.slice(0, i).trim()] = raw.slice(i + 1).trim();
  }
  return rules;
}
const match = (p, url) => (p.endsWith("*") ? url.startsWith(p.slice(0, -1)) : url === p);

createServer((req, res) => {
  const rules = parseHeaders(); // relido a cada requisição: reflete sempre o último build
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  let file = normalize(join(ROOT, url));
  if (!file.startsWith(ROOT)) { res.writeHead(400).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  let status = 200;
  if (!existsSync(file)) { file = join(ROOT, "404.html"); status = 404; }
  for (const r of rules) if (match(r.pattern, url)) for (const [k, v] of Object.entries(r.headers)) if (k !== "Strict-Transport-Security") res.setHeader(k, v);
  res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
  res.writeHead(status).end(readFileSync(file));
}).listen(PORT, () => console.log(`Servindo out/ com headers de produção em http://localhost:${PORT}`));
