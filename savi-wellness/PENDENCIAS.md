# Status: PENDENTE DE VALIDAÇÃO

O site está desenvolvido, compila e foi testado. **Não está pronto para publicação** até os itens abaixo serem resolvidos. O comando `npm run build` recusa gerar a versão de produção enquanto faltarem os dados obrigatórios (rode `npm run check:config` para ver a lista atualizada).

## Dados obrigatórios (`src/config/site.ts`)

- [ ] Número oficial do WhatsApp (`55` + DDD + número)
- [ ] Domínio final com HTTPS
- [ ] Razão social e CNPJ
- [ ] Diretor(a) técnico(a): nome completo, CRM e UF (RQE e especialidade **somente** se registrados e se forem anunciados)
- [ ] E-mail do canal de privacidade (LGPD)
- [ ] Data da revisão jurídica das políticas

## Validações

- [ ] **Revisão médica** de todos os textos e da lista de serviços (`src/content/content.ts`) → marcar `validation.medicalContentApproved`
- [ ] Confirmar quais serviços já estão disponíveis na abertura e as modalidades (presencial/online) de cada um
- [ ] Confirmar se teleconsulta será oferecida e em quais condições
- [ ] **Revisão jurídica** de Política de Privacidade e Termos (campos `[PENDENTE: …]` nas páginas) → marcar `validation.legalPagesApproved`
- [ ] Informar o provedor de hospedagem e a retenção de logs na Política de Privacidade

## Opcionais (aparecem automaticamente quando preenchidos)

- [ ] Instagram oficial
- [ ] Endereço (pode ficar vazio até a inauguração do espaço)

## Assets recomendados

- [ ] **Vetores originais** (SVG/AI/PDF) do logotipo e do monograma. Os atuais foram traçados fielmente dos arquivos enviados, mas o arquivo-fonte do designer é a referência definitiva.
- [ ] Uma **versão horizontal/reduzida do logotipo** para tamanhos pequenos, se existir no manual: no header, “WELLNESS” fica com ~5 px de altura.
- [ ] **Fotografias em alta resolução** com direitos de uso confirmados. As imagens atuais foram recortadas das peças do Instagram: o retrato da hero tem 580 px de largura e as imagens dos serviços, 188 px — funcionam, mas ficam suaves em telas retina, especialmente na prancha do Índice de Cuidados (desktop). Ideal: hero ≥ 1600 px de altura; serviços ≥ 900 px.
- [ ] Confirmar origem/licença das imagens das peças (se forem geradas por IA ou de banco, verificar termos de uso comercial).

## Testes a fazer após o deploy (não possíveis neste ambiente)

- [ ] PageSpeed Insights mobile e desktop no domínio real (as medições mobile locais não são confiáveis — ver relatório abaixo)
- [ ] iPhone (Safari) e Android (Chrome) reais, incluindo abertura do WhatsApp a partir do Instagram (navegador interno)
- [ ] Firefox e Edge atuais
- [ ] Leitor de tela (VoiceOver / TalkBack)
- [ ] securityheaders.com e observatory.mozilla.org

---

## Relatório de testes executados (24/10/2026)

Ambiente: Chromium headless 153 servindo `out/` com os headers de produção (`npm run serve`).

| Verificação | Resultado |
|---|---|
| Build de prévia / build de produção (dados fictícios, cópia isolada) | ✓ sem erros |
| Bloqueio do build de produção com pendências | ✓ |
| TypeScript estrito (`tsc --noEmit`) | ✓ |
| `npm audit` | ✓ 0 vulnerabilidades |
| Violações de CSP / erros de console / recursos 404 | ✓ nenhum (1440, 820 e 390 px) |
| Rolagem horizontal | ✓ nenhuma em 1440, 820 e 390 px |
| Um único H1 e hierarquia de títulos | ✓ |
| Links do WhatsApp (12 por página), `target` e `rel` | ✓ |
| Imagens quebradas / sem `alt` | ✓ nenhuma |
| Teclado: “pular para o conteúdo”, ordem do Tab, foco visível | ✓ |
| Menu mobile: foco inicial, foco preso, Esc, bloqueio de rolagem, retorno do foco | ✓ |
| Índice de Cuidados: hover troca imagem, clique alterna `aria-expanded` | ✓ |
| Indicador de seção ativa e fundo do header ao rolar | ✓ |
| Botão flutuante: aparece após a hero e some na seção de contato/rodapé | ✓ |
| `prefers-reduced-motion`: todo conteúdo visível, sem animação | ✓ |
| Produção: `robots` index/follow, canonical, sem selo de prévia | ✓ |
| Lighthouse desktop (home / privacidade) | Performance 95 / 99 · Acessibilidade 100 / 100 · Boas práticas 100 / 100 · LCP 1,2 s · CLS 0 |
| Lighthouse SEO | 66–69 **apenas** porque a prévia é `noindex` de propósito; no build de produção esse item passa |
| Lighthouse mobile | **Inconclusivo neste ambiente**: uma página HTML vazia de controle também marcou 0, com ~10 s de CPU “não atribuída” do próprio sandbox. CLS 0 e TBT 0 ms foram medidos. Medir no PageSpeed Insights após o deploy. |
