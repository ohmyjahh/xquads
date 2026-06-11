# Story 008 — Página `/claude` com guia dos 3 níveis do Claude

**Status:** Ready for Review
**Criado:** 2026-06-11
**Autor:** @sm
**Implementado por:** @dev
**Prioridade:** Média — conteúdo educativo + CTA para página de vendas

---

## Contexto

Criar uma página guia `/claude` explicando os 3 níveis do Claude (Web, Cowork e Code) para o público do xquads. A página é educativa, mas inclui um CTA grande logo após o primeiro parágrafo, direcionando para a página de vendas (`raxo.com.br/vibecodingvsl`) — mesma URL de redirect usada no lead form (Story 007).

## Descrição

Criar `src/app/claude/page.tsx` standalone (fora da sidebar, igual `/idvisual` e `/viral`) com:

1. **Hero** — título + subtítulo do guia
2. **Primeiro parágrafo** — introdução sobre o Claude
3. **CTA grande** — "nova possibilidade de renda no mercado: usar IA para criar projetos para sua empresa ou vender para outras empresas" + botão para a página de vendas
4. **Os 3 níveis:**
   - **Claude Web** — chat, PDFs, uso geral
   - **Claude Cowork** — conectores (Gmail, Canva, Notion), subpastas, automações de tarefas repetitivas
   - **Claude Code** — criação de códigos, aplicativos e sistemas
5. **Como usar os conectores** — passo a passo prático
6. **Como usar as habilidades (skills)** — passo a passo prático
7. **Footer** — @rafa.grandi

## Decisões registradas

| Item | Valor |
|------|-------|
| Rota | `/claude` (servida em `sowsales.com.br/xquads/claude`) |
| Cor accent | `#D97757` (coral Anthropic/Claude) |
| CTA link | `https://www.raxo.com.br/vibecodingvsl?utm_source=instagram&utm_medium=organico&utm_campaign=xquads-isca-nov25&utm_content=guia-claude` |
| utm_content | `guia-claude` (identifica o conteúdo de origem, padrão da Story 007) |
| Sidebar | NÃO adicionar (página standalone, divulgada por link) |
| Lead capture | Não há (página informativa, CTA leva direto à página de vendas) |

## Acceptance Criteria

1. **AC1** — Rota `/claude` acessível e renderiza o guia completo
2. **AC2** — CTA aparece logo após o primeiro parágrafo, visualmente destacado, com link para a página de vendas abrindo na mesma aba
3. **AC3** — Os 3 níveis (Web, Cowork, Code) apresentados como cards/seções distintas
4. **AC4** — Seções de conectores e skills presentes com instruções práticas
5. **AC5** — Visual consistente com o design system do projeto (dark, cards `#1a1a1e`, bordas `#2a2a2e`)
6. **AC6** — `npm run build` passa sem erros

## File List

- `src/app/claude/page.tsx` (novo)
- `docs/stories/008-claude-guide-page.md` (este arquivo)
