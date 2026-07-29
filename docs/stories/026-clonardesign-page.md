# Story 026 — Página /clonardesign (clonar design + tornar editável no Canva, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/clonardesign` (produção:
`www.sowsales.com.br/xquads/clonardesign`), no padrão das iscas de prompt.

Fluxo: a pessoa anexa o print de um design/arte no ChatGPT → prompt 1 recria a
imagem idêntica → conecta o app do Canva no ChatGPT (ativa com `@canva`) →
prompt 2 transforma a arte num design totalmente editável no Canva, com cada
elemento em camada separada.

Os 2 prompts (fornecidos como exemplo pelo Rafa, para melhorar) ficam atrás do
`LeadGate`, com o passo de conectar o Canva entre eles.
`source = "clonardesign-page"`.

## Critérios de Aceite

- **AC1** — Rota `/clonardesign` (`src/app/clonardesign/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#7D2AE8`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, como usar, o que precisa), sem revelar os prompts.
- **AC4** — Os 2 prompts + o passo de conectar o Canva ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — Cada prompt tem botão de copiar; prompts melhorados a partir dos exemplos do Rafa.
- **AC6** — Passo de conectar o app do Canva (@canva) explicado entre os dois prompts.
- **AC7** — Lead com `source="clonardesign-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="clonardesign"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, prompts melhorados, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)

## Complexidade

**S (pequena).** Página no padrão, 2 prompts + passo intermediário.

## Riscos

- **R1** — Depende do app do Canva conectado ao ChatGPT, que pode variar por plano/rollout. Mitigação: nota realista + passo a passo de conexão.

## Definition of Done

- `/clonardesign` em dev, prompts liberados só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 026
- Validada por @produto: GO 10/10, Draft → Ready
