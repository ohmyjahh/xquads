# Story 030 — Página /agenteclaude (criar agentes especialistas no Claude via Projetos, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/agenteclaude` (produção:
`www.sowsales.com.br/xquads/agenteclaude`), no formato tutorial (padrão da
/ensinarclaude).

Baseada no roteiro do Rafa: como criar agentes treinados dentro do Claude (via
menu Projetos) para funções específicas da empresa, usando 3 pilares:
1. **Contexto** — arquivos de memória subidos no Projeto (o que é a empresa, o que
   vende, público-alvo, atividades do agente, como executar cada uma)
2. **Identidade** — nas instruções do Projeto (como atua, como quer ser chamado,
   personalidade)
3. **Workflow** — também nas instruções (o que perguntar antes, passo a passo de
   atuação, o que recebe e o que entrega)

Entregável gated: passo a passo detalhado + template de instruções copiável
(identidade + workflow) + checklist dos arquivos de memória.
`source = "agenteclaude-page"`.

## Critérios de Aceite

- **AC1** — Rota `/agenteclaude` (`src/app/agenteclaude/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#D97757`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, os 3 pilares), sem revelar o passo a passo/template.
- **AC4** — Passo a passo, template e checklist ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — O template de instruções (identidade + workflow) tem botão de copiar.
- **AC6** — Conteúdo fiel ao roteiro (Projetos, arquivos de memória, instruções).
- **AC7** — Lead com `source="agenteclaude-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="agenteclaude"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, passo a passo + template + checklist.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Formato tutorial da /ensinarclaude (Story 021)

## Complexidade

**S (pequena).** Página tutorial no padrão.

## Definition of Done

- `/agenteclaude` em dev, conteúdo liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 030
- Validada por @produto: GO 10/10, Draft → Ready
