# Story 013: Página /orquestrador (Fable 5 Orquestrador + Sonnet 5 Executor)

**Status:** InReview
**Épico:** Páginas isca Xquads
**Criada por:** @sage (2026-07-10)

## Descrição

A Anthropic publicou no Twitter (@ClaudeDevs, 07/07/2026) os padrões oficiais de orquestração multi-modelo do Claude 5: usar o **Fable 5 como orquestrador/advisor** e o **Sonnet 5 como executor/worker**. Os números são fortes e viraram assunto (tweet principal com 30K likes e 5,4M de views):

- BrowseComp: Fable 5 lead + Sonnet 5 workers = 86,8% de acurácia a $18,53/problema, contra 90,8% a $40,56 do Fable 5 sozinho. Ou seja, **96% da performance a 46% do custo**.
- SWE-bench Pro: Sonnet 5 + Fable 5 advisor = **~92% do score do Fable 5 a ~63% do preço**. O Fable 5 é chamado ~1 vez por tarefa só para direcionar.

Queremos uma página isca no Xquads que (1) explique o contexto e os dois padrões (Orquestrador e Advisor) em linguagem acessível e (2) entregue um passo a passo prático de configuração, tanto no Claude Code (subagentes com model: sonnet) quanto na API (advisor tool e Managed Agents multiagente).

## Critérios de Aceitação

1. **Dado** que o visitante acessa `/xquads/orquestrador`, **quando** a página carrega, **então** vê uma página standalone (sem sidebar) no padrão visual das demais iscas (dark #121214, accent próprio, badge, header, footer @rafa.grandi).
2. **Dado** que o visitante lê a primeira dobra, **então** entende o anúncio da Anthropic com os números reais dos benchmarks (BrowseComp e SWE-bench Pro) e um diagrama/explicação dos dois padrões.
3. **Dado** que o visitante avança na página, **quando** chega ao passo a passo completo, **então** encontra um `LeadGate` que desbloqueia o restante mediante nome/email/telefone (source: `orquestrador-page`).
4. **Dado** que o lead foi capturado, **então** o conteúdo desbloqueado mostra: passo a passo no Claude Code (criar subagente com `model: sonnet`, sessão principal em Fable 5) e passo a passo na API (advisor tool + orquestrador com workers).
5. **Dado** que o visitante chega ao final, **então** vê o `SalesCta` com `utmContent="orquestrador"`.
6. A rota `/orquestrador` está registrada em `STANDALONE_ROUTES` no `app-shell.tsx`.
7. O texto da página não usa travessão (regra do projeto) e é denso/manual completo, não guia raso.
8. `npm run lint` e `npm run build` passam sem erros.

## Escopo

**IN:**
- `src/app/orquestrador/page.tsx` (client component, padrão das demais iscas)
- Registro em `STANDALONE_ROUTES`
- Uso dos componentes existentes: `LeadGate`, `SalesCta`
- Conteúdo técnico verificado (modelos claude-fable-5 e claude-sonnet-5, preços $10/$50 e $3/$15 por MTok, advisor tool beta, subagentes Claude Code)

**OUT:**
- Novos componentes reutilizáveis
- Alterações na API de leads
- Push/deploy (aguarda autorização do usuário)
- Assets/imagens novas

## Dependências

- Componentes `LeadGate` e `SalesCta` existentes (Stories 009/010)
- API `/api/leads` funcionando (Story 001/002)

## Complexidade

**S** (1 página, padrão estabelecido, conteúdo é o principal esforço)

## Valor de Negócio

Isca de topo de funil sobre tema quente (anúncio Anthropic com milhões de views) para capturar leads qualificados interessados em IA aplicada, alimentando o funil do vibecodingvsl.

## Riscos

- Números de benchmark precisam ser fiéis aos tweets (fonte: prints do @ClaudeDevs)
- Advisor tool está em beta; sintaxe pode mudar (mitigação: indicar que é beta e apontar docs)

## Definition of Done

- [x] Página renderiza em `/xquads/orquestrador` local (HTTP 200, conteúdo verificado)
- [x] LeadGate captura lead com source `orquestrador-page`
- [x] SalesCta presente com utm_content correto
- [x] Rota em STANDALONE_ROUTES
- [x] Lint e build passando (1 apontamento LOW `set-state-in-effect`, mesmo padrão das páginas fable/loop/emprego, mantido por consistência anti hydration-mismatch)
- [x] Sem travessão no texto
- [x] Commit local (push só com autorização)

## QA Results (@vera)

**Verdict: PASS** (2026-07-10)
1. Code review: OK, segue padrão das iscas. 1 issue LOW documentada (set-state-in-effect, padrão pré-existente do codebase)
2. Testes: projeto sem suite de testes (padrão do repo), build estático valida compilação
3. AC: 8/8 atendidos
4. Regressões: build gerou todas as rotas existentes sem erro
5. Performance: página estática prerendered
6. Segurança: sem secrets, lead via /api/leads existente
7. Docs: story atualizada

## File List

- `docs/stories/013-orquestrador-fable-sonnet-page.md` (nova)
- `src/app/orquestrador/page.tsx` (nova)
- `src/components/layout/app-shell.tsx` (modificada)

## Change Log

- 2026-07-10: Story criada (@sage)
- 2026-07-10: Validada 10/10, GO. Draft -> Ready (@eden)
