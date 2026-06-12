# Story 010 — Página `/fable` com manual Claude + Higgsfield MCP

**Status:** InReview (aguardando validação visual local)
**Criado:** 2026-06-12
**Autor:** @sm
**Implementado por:** @dev
**Prioridade:** Média — conteúdo educativo + CTA de vendas

---

## Contexto

Criar página `/fable` ensinando como conectar o Claude ao MCP do Higgsfield e um manual prático de primeiros projetos usando o MCP para criar telas, design e assets visuais.

## Descrição

Criar `src/app/fable/page.tsx` standalone com:

1. **Hero** + introdução
2. **O que é MCP e o que é o Higgsfield**
3. **Como conectar** — Claude Web/Desktop (conectores) e Claude Code (comando copiável)
4. **Ferramentas do MCP** (generate_image, generate_video, create_character, etc.)
5. **Manual de primeiros projetos** — telas, design, identidade visual, personagem consistente
6. **Framework de prompt** e dicas práticas
7. **CTA final** — componente `SalesCta` (padrão de todas as páginas)

## Decisões registradas

| Item | Valor |
|------|-------|
| Rota | `/fable` (servida em `sowsales.com.br/xquads/fable`) |
| Cor accent | `#8B5CF6` (roxo, já usado no design system do projeto) |
| MCP URL ensinada | `https://mcp.higgsfield.ai/mcp` |
| utm_content do CTA | `fable` |
| Sidebar | NÃO (adicionar `/fable` a STANDALONE_ROUTES) |
| Fontes | higgsfield.ai/mcp, techsy.io (setup Claude Code), pesquisa 2026-06-12 |

## Acceptance Criteria

1. **AC1** — Rota `/fable` acessível, sem sidebar
2. **AC2** — Passo a passo de conexão para Claude Web/Desktop E Claude Code, com comando copiável
3. **AC3** — Manual com pelo menos 3 projetos práticos usando o MCP (telas/design)
4. **AC4** — Blocos de código/prompt com botão copiar funcional
5. **AC5** — `SalesCta` no final com `utm_content=fable`
6. **AC6** — `npm run build` passa sem erros

## File List

- `src/app/fable/page.tsx` (novo)
- `src/components/layout/app-shell.tsx` (adicionar `/fable`)
- `docs/stories/010-fable-higgsfield-mcp-page.md` (este arquivo)
