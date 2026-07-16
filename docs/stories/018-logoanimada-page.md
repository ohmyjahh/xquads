# Story 018 — Página /logoanimada (1 prompt de animação de logo, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/logoanimada` (produção:
`www.sowsales.com.br/xquads/logoanimada`), no padrão das demais iscas.

A página entrega um prompt (em inglês) que faz uma IA de imagem-para-vídeo animar
o logo da pessoa em motion graphics 4K, adaptando a animação ao nicho informado.
O prompt fica atrás do `LeadGate`, liberado só após nome + email + telefone,
`source = "logoanimada-page"`.

## Critérios de Aceite

- **AC1** — Rota `/logoanimada` (`src/app/logoanimada/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#EC4899`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, como usar, onde funciona), sem revelar o prompt.
- **AC4** — O prompt fica atrás do `LeadGate` e só aparece após nome + email + telefone.
- **AC5** — O prompt tem botão de copiar; conteúdo fiel ao enviado (só corrige o OCR `Al` → `AI`).
- **AC6** — Lead com `source="logoanimada-page"`; desbloqueio persiste via `xquads_lead_captured`.
- **AC7** — `SalesCta` com `utmContent="logoanimada"`.
- **AC8** — `npm run build` verde.

## Escopo

**IN:** página `src/app/logoanimada/page.tsx`, slug em `app-shell.tsx`, conteúdo educacional.
**OUT:** mudanças em API/LeadGate/SalesCta/hooks; push/deploy (só local nesta story).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão consolidado em `/foto`, `/estudogpt`, `/familia`, `/frameworkviral`

## Complexidade

**S (pequena).** Uma página no padrão, com um único prompt.

## Riscos

- **R1** — Prompt assume que a pessoa anexa o logo numa IA de imagem-para-vídeo. Mitigação: a seção "como usar" deixa isso explícito e cita ferramentas.

## Definition of Done

- `/logoanimada` em dev, prompt liberado só após lead, `npm run build` verde.
- Mostrado em localhost. Push/deploy só após autorização (fora desta story).

## Change Log

- Draft criado por @mestre — Story 018
- Validada por @produto: GO 10/10, Draft → Ready
