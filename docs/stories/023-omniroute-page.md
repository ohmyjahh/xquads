# Story 023 — Página /omniroute (link magnet: libera link após lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/omniroute` (produção:
`www.sowsales.com.br/xquads/omniroute`). Estreia um **novo formato** de isca no
Xquads: em vez de entregar um prompt grande, a página captura nome + email +
telefone e libera apenas um **link** (link magnet).

Caso real: o OmniRoute, gateway de IA open-source que roteia entre 290+
provedores, comprime tokens e dá acesso a tokens gratuitos.
Link de destino: `https://github.com/diegosouzapw/OmniRoute`.

Estrutura: conteúdo educacional livre (o que é, o que faz) → `LeadGate` →
após o lead, botão grande que abre o link + comando de instalação rápida.
`source = "omniroute-page"`.

## Critérios de Aceite

- **AC1** — Rota `/omniroute` (`src/app/omniroute/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#6366F1`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é o OmniRoute, principais recursos), sem revelar o link/botão.
- **AC4** — O botão de link fica atrás do `LeadGate` e só aparece após nome + email + telefone.
- **AC5** — Após o lead, botão grande que abre o link em nova aba (`target="_blank"`, `rel="noopener noreferrer"`).
- **AC6** — Modelo reaproveitável para futuras páginas só-link (estrutura simples).
- **AC7** — Lead com `source="omniroute-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="omniroute"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, conteúdo com base no repo real.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)

## Complexidade

**S (pequena).** Página simples, novo formato só-link.

## Riscos

- **R1** — Slug corrigido para /omniroute (batendo com o nome do produto), conforme decisao do Rafa.

## Definition of Done

- `/omniroute` em dev, link liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 023
- Validada por @produto: GO 10/10, Draft → Ready
