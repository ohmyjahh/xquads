# Story 031 — Página /appseguro (prompt master de auditoria de segurança, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/appseguro` (produção:
`www.sowsales.com.br/xquads/appseguro`), no padrão das iscas de prompt.

Baseada no roteiro do Rafa: um "prompt master" que a pessoa roda no código do
app vibe-coded ANTES de publicar, pra achar furos de segurança comuns: chave API
exposta no front-end, tabela do banco pública (RLS), stack trace vazando pro
usuário, secrets no repo, endpoints sem auth, etc. Retorna um relatório
priorizado.

É segurança DEFENSIVA (a pessoa audita o próprio app). O prompt é escrito por mim
com base no roteiro, cobrindo as principais classes de vulnerabilidade de apps
feitos com IA, e pede um relatório por severidade com correção.

O prompt fica atrás do `LeadGate`, `source = "appseguro-page"`.

## Critérios de Aceite

- **AC1** — Rota `/appseguro` (`src/app/appseguro/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#EF4444`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (por que importa, o que o prompt checa, como usar), sem revelar o prompt.
- **AC4** — O prompt master fica atrás do `LeadGate`, liberado só após lead.
- **AC5** — O prompt tem botão de copiar; é defensivo e pede correção, não exploração.
- **AC6** — Lista dos tipos de furo que o prompt cobre.
- **AC7** — Lead com `source="appseguro-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="appseguro"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, o prompt master, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)

## Complexidade

**S (pequena).** Página no padrão, 1 prompt master denso.

## Definition of Done

- `/appseguro` em dev, prompt liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 031
- Validada por @produto: GO 10/10, Draft → Ready
