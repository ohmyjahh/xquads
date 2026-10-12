# Story 069 — Página /plugins (quatro plugins para quem faz vibe coding)

**Status:** Done

## Descrição

Nova página isca standalone em `/plugins` (produção: `www.sowsales.com.br/xquads/plugins`), com
quatro extensões para quem programa com agente de IA. A quarta é o próprio Xquads, e leva à página
de vendas em vez do gate.

`source = "plugins-page"`.

## Correção de nome: "Super Basic" é o Supabase

O dono citou "o plugin do Super Basic, que é nativo do Claude e do Codex". Busca por esse nome não
encontra plugin algum. O padrão de nomes ditados foneticamente já apareceu nesta série de páginas:
"Riggs Field" era Higgsfield (Story 043), "Freepeek" era Freepik, "Maker" era Make.

**"Super Basic" é o Supabase**, que tem plugin oficial para Claude Code e instalador para Codex, e é
peça central de quem faz vibe coding por ser o banco de dados dessas aplicações.

## Os quatro, verificados (12/10/2026)

| # | O que é | Natureza | Verificação |
|---|---|---|---|
| 1 | **Supabase** | Plugin oficial | Instala pelo marketplace oficial da Anthropic; traz servidor MCP e skills juntos |
| 2 | **Vercel** | Plugin oficial | `/plugin install vercel`; 3 agentes (AI Architect, Deployment Expert, Performance Optimizer) e 5 comandos (`/bootstrap`, `/deploy`, `/env`, `/status`, `/marketplace`) |
| 3 | **claude-mem** | **Skill**, não plugin | `thedotmack/claude-mem`, **99.978 estrelas**, Apache-2.0, push no dia da checagem |
| 4 | **Xquads** | **Skill**, produto do dono | Leva à página de vendas |

O dono já observou que os itens 3 e 4 são skills e não plugins. A página registra a diferença em vez
de chamar os quatro de plugin.

## Dois pontos de honestidade

1. **O Vercel teve crítica pública sobre telemetria** em abril de 2026: o plugin injetava instruções
   e o consentimento de coleta era confuso. O autor da crítica publicou atualização dizendo que os
   quatro problemas foram corrigidos. A página menciona que vale conferir as opções de telemetria
   ao instalar, sem transformar isso em acusação.
2. **O Codex ainda não é suportado pelo plugin da Vercel.** O changelog fala em Claude Code e Cursor,
   com Codex "em breve". Dizer que os dois primeiros são nativos "do Claude e do Codex" seria
   impreciso para a Vercel.

## Critérios de Aceite

- **AC1** — Rota `/plugins` (`src/app/plugins/page.tsx`) standalone.
- **AC2** — Accent `#86EFAC`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Os quatro itens, com **plugin e skill rotulados corretamente**.
- **AC4** — O Xquads leva à **página de vendas** (`raxo.com.br/vibecodingvsl`), com UTM própria desta página, e **não** fica atrás do gate.
- **AC5** — Parte aberta: o que cada um resolve. Parte gated: como instalar cada um.
- **AC6** — A ressalva de telemetria do Vercel aparece, de forma factual.
- **AC7** — A página **não afirma** que o plugin da Vercel funciona no Codex.
- **AC8** — Links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC9** — Números e data visíveis.
- **AC10** — Lead `source="plugins-page"`, bypass só em localhost, `SalesCta` com `utmContent="plugins"`.
- **AC11** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (médio)** — Chamar skill de plugin e confundir quem for instalar. *Mitigação:* AC3.
- **R2 (baixo)** — Afirmação incorreta sobre suporte a Codex. *Mitigação:* AC7.

## Complexidade

**S (pequena).**

## Change Log

- **2026-10-12** — Draft criado por @mestre — Story 069
- **2026-10-12** — Validada por @produto: **GO 10/10**. O nome ditado foi decodificado e confirmado antes de virar conteúdo, a distinção entre plugin e skill virou critério, e a limitação de suporte a Codex foi verificada em vez de repetida do enunciado. Draft → **Ready**.
- **2026-10-12** — Implementada e verificada: **PASS.** Os quatro itens presentes; rótulos corretos (2 "plugin oficial", 2 "skill"); o card do Xquads leva à página de vendas com UTM própria (`utm_campaign=plugins`) e fica **fora** do gate; ressalva sobre o suporte a Codex e observação de telemetria do Vercel presentes. Lint limpo, build verde.

## File List
- `src/app/plugins/page.tsx`
- `docs/stories/069-plugins-page.md`
- **2026-10-12** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-10-12** — Publicada e verificada em produção: responde 200.
