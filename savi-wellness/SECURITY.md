# Segurança, privacidade e conformidade — SAVI Wellness

Este documento registra os controles implementados, o que foi verificado e os riscos residuais. Não há promessa de risco zero.

## Arquitetura

- Site **100% estático** (HTML/CSS/JS pré-gerados). Não há servidor de aplicação, API, banco de dados, formulário, login, upload ou armazenamento de dados de visitantes.
- Nenhum script, fonte, imagem ou CSS de terceiros. Nenhuma ferramenta de analytics, pixel ou cookie.
- Único destino externo: links para `https://wa.me/…` (e Instagram, quando configurado), sempre com `target="_blank" rel="noopener noreferrer external"`.

## Headers (gerados em `out/_headers` a cada build)

| Header | Valor / objetivo |
|---|---|
| Content-Security-Policy | `default-src 'self'`; `script-src 'self'` + **hash SHA-256 de cada script inline** gerado pelo Next (sem `unsafe-inline`/`unsafe-eval`); `object-src 'none'`; `frame-ancestors 'none'`; `form-action 'none'`; `base-uri 'self'`; `upgrade-insecure-requests` |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` (só faz efeito sob HTTPS). Adicionar `preload` apenas após confirmar todos os subdomínios em HTTPS. |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | câmera, microfone, geolocalização, pagamento, USB, sensores, `browsing-topics` etc. desativados |
| X-Frame-Options | `DENY` (redundante com `frame-ancestors`, para navegadores antigos) |
| Cross-Origin-Opener-Policy / Resource-Policy | `same-origin` |

**Importante:** os hashes mudam a cada build. O `_headers` é regenerado automaticamente pelos scripts `build` e `build:preview`; nunca edite à mão nem reutilize um `_headers` de outro build.

## Código

- Sem `eval`, `new Function` ou `innerHTML` com conteúdo dinâmico.
- Único `dangerouslySetInnerHTML`: o JSON-LD, gerado a partir do arquivo de configuração e serializado com escape de `<`, U+2028 e U+2029 (impede fechar a tag `<script>`).
- Número do WhatsApp validado (`55` + 10–11 dígitos); mensagens sempre com `encodeURIComponent` e limitadas a 500 caracteres; nenhuma mensagem contém texto do visitante nem dados de saúde.
- Domínio (`NEXT_PUBLIC_SITE_URL`) validado com `new URL` (somente http/https).
- Source maps de produção desativados; `poweredByHeader` desligado; página 404 própria, sem stack traces.

## Cadeia de dependências

- Produção: somente `next`, `react`, `react-dom`. Fontes e assets estão versionados no projeto (sem CDN).
- `.npmrc`: `save-exact` (versões fixas), `ignore-scripts` (scripts de instalação de pacotes não executam), `audit`.
- `npm audit` em 24/10/2026: **0 vulnerabilidades**.
- Use sempre `npm ci` com o `package-lock.json` versionado.

## Verificações realizadas (24/10/2026)

- Build de prévia e build de produção (com dados fictícios em cópia isolada) compilando sem erros; TypeScript estrito sem erros.
- Navegador headless (Chromium 153) servindo `out/` **com a CSP real**: nenhuma violação de CSP, nenhum erro de console, nenhum recurso quebrado em desktop, tablet e mobile.
- Bloqueio do build de produção com pendências: confirmado.
- Revisão manual por busca de padrões inseguros no código-fonte.

## Riscos residuais e manutenção

1. **`style-src 'unsafe-inline'`** — necessário para atributos `style` usados nas animações (variáveis CSS). Risco baixo: não há conteúdo de usuário nem CSS de terceiros. Pode ser removido no futuro migrando essas variáveis para classes.
2. **Dependência do provedor** — a CSP e o HSTS só valem se a hospedagem aplicar o `_headers` (Cloudflare Pages/Netlify). Validar após o deploy em securityheaders.com.
3. **WhatsApp/Meta** — a conversa ocorre fora do site, sob a política da Meta. Orientar a equipe a não solicitar dados de saúde detalhados pelo aplicativo antes da consulta.
4. **Atualizações** — revisar `npm audit` e atualizar Next/React mensalmente ou ao surgir alerta de segurança; refazer o build (e, portanto, a CSP).
5. **Contas** — proteger o acesso à hospedagem, ao domínio/DNS e ao repositório com autenticação em dois fatores; habilitar DNSSEC se o registrador permitir.

## LGPD, cookies e publicidade médica

- **Minimização:** o site não coleta dados pessoais. Logs técnicos do provedor de hospedagem devem ser declarados na Política de Privacidade (campo pendente).
- **Cookies:** nenhum cookie não essencial → **nenhum banner** é exibido (correto para o cenário atual). Se analytics/pixel forem adicionados no futuro, é obrigatório implementar consentimento prévio (sem opções pré-marcadas, com recusa e revogação) **antes** de carregar qualquer script — e atualizar a CSP e a política. `siteConfig.nonEssentialCookies = true` bloqueia o build até isso ser feito.
- **Resolução CFM nº 2.336/2023:** o rodapé exibe responsável técnico (nome, CRM/UF) e, somente se informado e registrado, especialidade + RQE. Nenhum título, especialidade, registro, depoimento, antes/depois ou promessa de resultado foi inventado. Textos de serviço foram reescritos para retirar expressões das peças originais como “resultados reais” e “resultados naturais com segurança”.
- As páginas de Privacidade e Termos são **minutas estruturadas**, com campos pendentes visíveis, e dependem de revisão jurídica. Este projeto não declara conformidade legal.
