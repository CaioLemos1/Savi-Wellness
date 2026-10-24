# SAVI Wellness — Landing page

> **Status: PENDENTE DE VALIDAÇÃO.** O site está implementado, compilado e testado, mas **não deve ser publicado** até o preenchimento dos dados oficiais e as revisões médica e jurídica. Ver [`PENDENCIAS.md`](./PENDENCIAS.md).

Landing page institucional, 100% estática, com conversão para o WhatsApp.
*The Art of Feeling Well.*

---

## 1. Direção criativa (resumo)

**Conceito — “Luz de janela”.** As peças da SAVI têm um traço recorrente: luz natural atravessando um espaço arquitetônico e projetando sombras diagonais sobre o azul-marinho. O site transforma esse gesto em sistema:

| Elemento | O que faz | Por quê |
|---|---|---|
| **Luz de janela** | Camada de sombras diagonais sobre os fundos navy, que se assenta suavemente na entrada (animação finita, só `transform`). | Retirada das próprias peças; dá atmosfera sem fotografia extra e sem custo contínuo de CPU. |
| **O Fio** | A linha vertical fina das peças vira elemento de navegação: aparece na hero, desenha-se na transição navy → marfim, conecta as etapas da Experiência e abre o Convite final. | Costura as seções e cria ritmo editorial. Usa CSS *scroll-driven* (sem JS); navegadores sem suporte veem a linha pronta. |
| **Índice de Cuidados** | Lista editorial numerada (01–06). No desktop, passar o cursor ou o foco troca a imagem da “prancha” fixa; clicar abre detalhes e CTA contextual. No mobile, acordeão por toque com imagem dentro do item. | Substitui a grade de cards; funciona sem hover; acessível (`aria-expanded`, `inert`). |
| **Revelação editorial** | Títulos sobem linha a linha por máscara; fotos se revelam por “cortina”. | Ritmo cinematográfico, sempre desligado com `prefers-reduced-motion`. |
| **Itálico de ênfase** | Uma palavra por título em itálico (*ciência*, *cuidado*, *olhar*), como na peça “A beleza encontra a *ciência*”. | Assinatura tipográfica da marca. |

**Paleta (amostrada dos arquivos):** navy `#06192E` (fundo dos posts ≈ `#04162A–#061626`), porcelana `#EEE0D6` (cor exata do wordmark), champagne `#D6CC9F` (cor do monograma), marfim `#F2E8DC`, areia `#E6D8C6` (fundo da peça de serviços), taupe `#5E5247`. Todas as combinações de texto foram verificadas para contraste AA.

**Tipografia:** os arquivos não identificam a fonte. A mais próxima testada lado a lado com as peças foi **Newsreader** (títulos, OFL) — instanciada localmente em tamanho óptico de display, peso 300–400, subconjunto latino (~80 KB). **Jost** (OFL) para textos funcionais e rótulos espaçados, próxima do “WELLNESS / MEDICINA ESTÉTICA” das peças. Cormorant foi testada e descartada: o circunflexo de “ciência” destoava da marca.

**Logo e favicon:** o wordmark SAVI Wellness e o monograma SV foram **vetorizados por traçado** (potrace) diretamente dos arquivos enviados — sem redesenho, sem fonte aproximada, proporções preservadas. Assim que o designer enviar os vetores originais, basta substituí-los (ver §5).

## 2. Stack e por quê

- **Next.js 16 (App Router) + TypeScript**, com `output: "export"` → HTML estático. Sem servidor, banco, API ou autenticação: menor superfície de ataque e hospedagem simples.
- **Tailwind CSS 4** para layout; CSS próprio para os detalhes editoriais (`src/styles/globals.css`).
- **Sem biblioteca de animação.** Motion/GSAP foram avaliados e não se justificam aqui: todas as animações são CSS (entrada da hero roda mesmo antes do JS), um único `IntersectionObserver` cuida das revelações e o parallax/“fio” usam CSS scroll-driven. Menos JavaScript, melhor INP.
- **Fontes locais** (`public/fonts`), com `preload` — nenhum request a Google Fonts ou CDN.
- Dependências de produção: apenas `next`, `react`, `react-dom`.

## 3. Estrutura

```
src/
  config/site.ts          ← ÚNICO arquivo de dados: WhatsApp, Instagram, endereço, dados legais, domínio, validações
  content/content.ts      ← textos institucionais, serviços, mensagens contextuais, imagens
  app/                    ← layout, página, /privacidade, /termos, 404, sitemap, robots, manifest
  components/
    brand/                ← Wordmark, Monogram (vetores oficiais traçados)
    sections/             ← Header, Hero, Universe, CareIndex, Experience, Invitation, Footer
    ui/                   ← WhatsAppLink, WhatsAppFloat, RevealObserver, PreviewBadge
    legal/                ← modelo das páginas legais
  lib/                    ← whatsapp.ts (links seguros), env.ts, structured-data.ts
  styles/globals.css      ← tokens de design, tipografia, movimento
public/                   ← favicon (SVG/ICO/PNG), apple-touch-icon, og-image, fotos .webp, fontes
scripts/
  check-config.mjs        ← lista pendências; bloqueia build de produção incompleto
  generate-headers.mjs    ← gera out/_headers com CSP por hash
  serve-static.mjs        ← servidor local de teste com os headers de produção
```

## 4. Como rodar

Requer **Node ≥ 22.18**.

```bash
npm ci                 # instala (scripts de instalação desativados por segurança, .npmrc)
npm run dev            # desenvolvimento em http://localhost:3000
npm run check:config   # lista o que falta preencher
npm run build:preview  # prévia interna: permite pendências, gera noindex + selo “Prévia”
npm run serve          # testa out/ com os headers de produção em http://localhost:4173
npm run build          # PRODUÇÃO — falha enquanto houver pendência obrigatória
```

## 5. O que editar (sem mexer em código)

| Quero mudar… | Arquivo |
|---|---|
| Número do WhatsApp, Instagram, endereço, CNPJ, responsável técnico, e-mail LGPD, domínio | `src/config/site.ts` |
| Textos, serviços, modalidades, mensagens do WhatsApp por serviço | `src/content/content.ts` |
| Fotos | substituir em `public/images/` (mesmo nome) ou apontar novo caminho em `content.ts` |
| Logo / monograma oficiais | `src/components/brand/paths.ts` (paths SVG) e `public/brand/*.svg`; regenerar favicons |

O número do WhatsApp deve ter só dígitos: `55` + DDD + número (ex.: `5511912345678`). Os links são montados como `https://wa.me/NUMERO?text=MENSAGEM` com `encodeURIComponent`; nenhuma mensagem contém dados digitados pelo visitante.

## 6. Publicação

Recomendado: **Cloudflare Pages** ou **Netlify** (HTTPS automático e suporte ao arquivo `_headers`, onde está a CSP).

- **Cloudflare Pages:** build command `npm run build` · output `out` · variável `NODE_VERSION=22` e `NEXT_PUBLIC_SITE_URL=https://seu-dominio`.
- **Netlify:** já configurado em `netlify.toml`.
- Use um projeto/branch separado para prévia (`npm run build:preview`) e outro para produção.
- Após publicar: medir no PageSpeed Insights (mobile), testar em iPhone/Android reais, validar headers em securityheaders.com e só então avaliar adicionar `preload` ao HSTS.

> Vercel não lê `_headers`. Se for usada, os headers precisam ser replicados em `vercel.json` (e a CSP regenerada a cada build).
