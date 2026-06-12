# Story 009 — Página `/loop` com conteúdo gated por lead capture

**Status:** Ready for Review
**Criado:** 2026-06-12
**Autor:** @sm
**Implementado por:** @dev
**Prioridade:** Média — lead magnet (réplica da página do PDF `:loop.pdf` da área de trabalho)

---

## Contexto

Recriar como página `/loop` o conteúdo do PDF "Crie um loop que corrija seu próprio trabalho" (skills /spec, /build e /review para Claude Code). Diferente das outras páginas do projeto (lead capture via modal no primeiro clique), aqui o lead capture é um **formulário inline que desbloqueia o restante da página**.

## Descrição

Criar `src/app/loop/page.tsx` standalone com:

1. **Conteúdo livre (antes do gate):** hero + parágrafo intro + diagrama do loop + seção "o que é um loop"
2. **Gate inline:** caixa "Desbloqueie a construção / Receba as 3 instruções" com nome, e-mail e telefone (mesmos campos e API `/api/leads` das outras páginas). Sem menção a PDF (não haverá download)
3. **Conteúdo desbloqueado:** os 3 prompts copiáveis (/spec, /build, /review), passo a passo de execução, modo fácil (plan-optimizer), loop de um parágrafo
4. **CTA final de vendas** apontando para a página de vendas (mesmo padrão da página /claude)

## Decisões registradas

| Item | Valor |
|------|-------|
| Rota | `/loop` (servida em `sowsales.com.br/xquads/loop`) |
| Tema | Claro/creme, fiel ao visual do PDF (fundo `#FAF9F5`, accent coral `#C15F3C`, code blocks escuros) |
| Gate | Formulário inline; desbloqueio persistido via flag `xquads_lead_captured` (mesma das outras páginas) |
| Lead já capturado em outra página | Página já abre desbloqueada |
| Source do lead | `loop-page` |
| CTA link | mesma URL de vendas com `utm_content=isca-loop` |
| Sidebar | NÃO (adicionar `/loop` a STANDALONE_ROUTES) |
| Seção "PDF para impressão" do original | REMOVIDA (não teremos PDF) |

## Acceptance Criteria

1. **AC1** — Rota `/loop` acessível, sem sidebar
2. **AC2** — Sem lead capturado: visível apenas hero, intro, diagrama, seção "o que é um loop" e o formulário gate
3. **AC3** — Ao enviar o formulário, lead é salvo via `/api/leads` e o restante da página aparece (sem redirect)
4. **AC4** — Com flag `xquads_lead_captured` já presente, página abre completa com aviso "Desbloqueado"
5. **AC5** — Todos os blocos de código têm botão de copiar funcional
6. **AC6** — CTA final aponta para a página de vendas com `utm_content=isca-loop`
7. **AC7** — `npm run build` passa sem erros

## File List

- `src/app/loop/page.tsx` (novo)
- `src/components/layout/app-shell.tsx` (adicionar `/loop` a STANDALONE_ROUTES)
- `docs/stories/009-loop-page-gated.md` (este arquivo)
