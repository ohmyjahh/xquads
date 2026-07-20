# Story 019 — Página /vendasgpt (4 prompts pra vender no ChatGPT, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/vendasgpt` (produção:
`www.sowsales.com.br/xquads/vendasgpt`), no padrão das demais iscas.

Baseada no roteiro do Rafa: usar o ChatGPT (modo agente/Work, que abre o próprio
navegador) pra vender coisas paradas em casa. Entrega 4 prompts em sequência:

| # | Prompt | Objetivo |
|---|--------|----------|
| 1 | Precificar | Sobe fotos dos itens; ChatGPT diz o que são e por quanto vendê-los com dados de mercado |
| 2 | Anunciar | Escreve o anúncio de cada item: título, descrição e preço |
| 3 | Publicar (o truque) | ChatGPT abre o próprio navegador e cria os anúncios no Facebook Marketplace |
| 4 | Negociar (bônus) | Agenda tarefa a cada 24h pra responder compradores e negociar |

Prompts liberados só após nome + email + telefone no `LeadGate`,
`source = "vendasgpt-page"`.

## Critérios de Aceite

- **AC1** — Rota `/vendasgpt` (`src/app/vendasgpt/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#10B981`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, como usar, o que precisa: ChatGPT com modo agente/navegador), sem revelar os prompts.
- **AC4** — Os 4 prompts ficam atrás do `LeadGate` e só aparecem após nome + email + telefone.
- **AC5** — Cada prompt tem botão de copiar; conteúdo fiel ao roteiro.
- **AC6** — Nota realista de que os passos 3 e 4 dependem do modo agente do ChatGPT e que a pessoa deve revisar antes de publicar.
- **AC7** — Lead com `source="vendasgpt-page"`; desbloqueio persiste via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="vendasgpt"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página `src/app/vendasgpt/page.tsx`, slug em `app-shell.tsx`, conteúdo.
**OUT:** mudanças em API/LeadGate/SalesCta/hooks; push/deploy (só local nesta story).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão consolidado em /foto, /estudogpt, /familia, /frameworkviral, /logoanimada

## Complexidade

**S (pequena).** Página no padrão, 4 prompts curtos.

## Riscos

- **R1** — Passos 3 e 4 dependem do ChatGPT agent mode, que nem todo plano tem e pode falhar. Mitigação: nota realista na página, sem prometer automação garantida.

## Definition of Done

- `/vendasgpt` em dev, prompts liberados só após lead, `npm run build` verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 019
- Validada por @produto: GO 10/10, Draft → Ready
