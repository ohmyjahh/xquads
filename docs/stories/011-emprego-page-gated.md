# Story 011 — Página `/emprego` com prompts de candidatura em massa (gated)

**Status:** InReview (aguardando validação visual local)
**Criado:** 2026-06-15
**Autor:** @sm
**Implementado por:** @dev
**Prioridade:** Média — lead magnet (base em roteiro de vídeo)

---

## Contexto

Página de apoio a um vídeo: "O que acontece quando você pede à IA para se candidatar a 500 empregos por você". Entrega os prompts do roteiro (recrutador sênior + ATS, currículo modelo mestre fórmula XYZ, modo agente buscando vagas, candidatura automatizada). Mesmo padrão das páginas /loop e /fable: gancho livre, gate de leads, conteúdo bloqueado, CTA final.

## Descrição

Criar `src/app/emprego/page.tsx` standalone com:

1. **Hero** + gancho do vídeo (parágrafo livre)
2. **Gate de leads** (`LeadGate`, source `emprego-page`)
3. **Conteúdo bloqueado:** os 4 prompts copiáveis na ordem do roteiro + avisos de uso responsável
4. **CTA final** (`SalesCta`, `utm_content=emprego`)

## Decisões registradas

| Item | Valor |
|------|-------|
| Rota | `/emprego` (servida em `sowsales.com.br/xquads/emprego`) |
| Cor accent | `#10B981` (verde sucesso/aprovação) |
| Gate | `LeadGate` inline, flag `xquads_lead_captured` |
| utm_content | `emprego` |
| Sidebar | NÃO (adicionar `/emprego` a STANDALONE_ROUTES) |
| Fonte | roteiro do vídeo fornecido pelo Rafa |

## Acceptance Criteria

1. **AC1** — Rota `/emprego` acessível, sem sidebar
2. **AC2** — Hero + gancho livres; prompts bloqueados pelo gate
3. **AC3** — 4 prompts do roteiro, cada um com botão copiar funcional
4. **AC4** — Gate salva lead via `/api/leads` e libera o conteúdo
5. **AC5** — `SalesCta` no final com `utm_content=emprego`
6. **AC6** — `npm run build` passa sem erros

## File List

- `src/app/emprego/page.tsx` (novo)
- `src/components/layout/app-shell.tsx` (adicionar `/emprego`)
- `docs/stories/011-emprego-page-gated.md` (este arquivo)
