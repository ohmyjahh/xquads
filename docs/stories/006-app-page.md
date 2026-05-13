# Story 006 — Adicionar página `/app` com prompt ARCHITEKT

**Status:** Ready for Review
**Criado:** 2026-05-13
**Validado:** 2026-05-13
**Implementado:** 2026-05-13
**Autor:** @sm (River)
**Validado por:** @po (Pax) — Score 9/10
**Implementado por:** @dev (Dex)
**QA por:** @qa (Quinn) — PASS
**Prioridade:** Média — nova ferramenta gratuita

---

## Contexto

Nova rota `/app` entrega o system prompt do **ARCHITEKT** — arquiteto sênior de produtos digitais que transforma uma ideia de app (de input vago a parágrafo) em blueprint completo (análise estratégica, MVP, arquitetura técnica, schema Prisma, roadmap em fases) pronto pra ser entregue ao Claude Code.

Padrão de página standalone com 1 prompt + botão copy + LeadForm (igual `/imagemgpt`, `/carrossel`, etc.).

## Decisões registradas

| Item | Valor |
|------|-------|
| Título | "Arquiteto de Apps" |
| Subtítulo | "De ideia a blueprint técnico em uma conversa. Pronto pra entregar ao Claude Code." |
| Cor accent | `#10B981` (verde esmeralda — tom tech/dev) |
| Ícone hero | `Blocks` ou `LayoutGrid` (Lucide) |
| Source | `prompt-app` |
| Captura de lead | 1ª interação (flag global `xquads_lead_captured`) |
| Layout | Stack vertical (mesma estrutura `/imagemgpt`) |

## Acceptance Criteria

1. **AC1 — Rota acessível sem sidebar**
   - **Dado** que o app está rodando
   - **Quando** o usuário acessa `/app`
   - **Então** a página renderiza standalone (sem sidebar do AppShell)

2. **AC2 — Botão "Copiar prompt"**
   - **Dado** que o usuário ainda não preencheu o LeadForm
   - **Quando** clica em "Copiar prompt"
   - **Então** o LeadForm abre (type="copy")
   - **E** ao submeter com sucesso, o prompt do ARCHITEKT é copiado pro clipboard

3. **AC3 — Lead já capturado libera direto**
   - **Dado** que `xquads_lead_captured` está em localStorage
   - **Quando** o usuário clica em "Copiar prompt"
   - **Então** o copy acontece direto, sem reabrir o LeadForm

4. **AC4 — Source tracking**
   - **Dado** que o usuário copia o prompt
   - **Quando** o LeadForm submete pra `/api/leads`
   - **Então** `downloadName/source` recebe `prompt-app`

5. **AC5 — Padrão visual consistente**
   - Hero com badge accent + título com palavra colorida
   - Bloco "Como usar" com passos
   - Caixa de prompt em monospace com scroll
   - Accent `#10B981` em badge, título, botões e highlights

## Escopo

### IN
- Criar `src/app/app/page.tsx`
- Inserir o prompt do ARCHITEKT integralmente como string template
- Adicionar `/app` em `STANDALONE_ROUTES` do AppShell

### OUT
- Edição do prompt pelo usuário
- Múltiplas variações/skills (é 1 prompt único)
- Download de arquivo complementar (sem .md aqui)

## Dependências

- ✅ Padrão estabelecido em `/imagemgpt` e `/curriculo`

## Complexidade

**Estimativa:** XS (extra small) — ~20 min

## Definition of Done

- [ ] `src/app/app/page.tsx` criada
- [ ] `/app` em STANDALONE_ROUTES
- [ ] Build local passa
- [ ] Lint zero erros
- [ ] Dev local testado (renderiza, copy funciona, LeadForm aparece)
- [ ] Commit + autorização do usuário pra push

## Change Log

- **2026-05-13** — Story criada por @sm (River). Decisões: título "Arquiteto de Apps", cor `#10B981`, padrão `/imagemgpt`.
- **2026-05-13** — @po (Pax): GO 9/10. Draft → Ready.

## QA Results

_A ser preenchido por @qa após implementação_
