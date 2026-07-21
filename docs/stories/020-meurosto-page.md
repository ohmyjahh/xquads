# Story 020 — Página /meurosto (busca reversa de rosto com Claude + conector Chrome, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/meurosto` (produção:
`www.sowsales.com.br/xquads/meurosto`), no padrão das demais iscas.

Baseada no roteiro do Rafa: usar o **Claude** com o **conector do Google Chrome**
(que abre o próprio navegador) pra fazer busca reversa do rosto e achar todas as
fotos da pessoa na internet, com bônus de pedidos de remoção. É o ângulo "a IA
faz tudo sozinha", complementar à `/foto` (Story 014), que fica intacta.

3 prompts em sequência:

| # | Prompt | Objetivo |
|---|--------|----------|
| 1 | Descrever o rosto | Sobe selfie; Claude lista as características que tornam a pessoa reconhecível |
| 2 | Busca reversa (o truque) | Com o conector do Chrome instalado, Claude abre o navegador, roda busca reversa e devolve os links |
| 3 | Remoção (bônus) | Claude escreve um pedido de remoção personalizado para cada site |

Inclui o passo de instalar o conector do Chrome (personalizar → conectores →
navegar conectores → Google Chrome → instalar). Prompts liberados só após nome +
email + telefone no `LeadGate`, `source = "meurosto-page"`.

## Critérios de Aceite

- **AC1** — Rota `/meurosto` (`src/app/meurosto/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#38BDF8`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (por que importa, o que precisa, como instalar o conector do Chrome), sem revelar os prompts.
- **AC4** — Os 3 prompts ficam atrás do `LeadGate` e só aparecem após nome + email + telefone.
- **AC5** — Cada prompt tem botão de copiar; conteúdo fiel ao roteiro.
- **AC6** — Aviso de uso ético: só com o próprio rosto (perseguição é crime), como na /foto.
- **AC7** — Lead com `source="meurosto-page"`; desbloqueio persiste via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="meurosto"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página `src/app/meurosto/page.tsx`, slug em `app-shell.tsx`, conteúdo.
**OUT:** mudanças em API/LeadGate/SalesCta/hooks; alterar a /foto; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão consolidado; a /foto (Story 014) serve de referência de tom para privacidade

## Complexidade

**S (pequena).** Página no padrão, 3 prompts curtos.

## Riscos

- **R1** — O conector do Chrome / navegador do Claude pode falhar ou não estar disponível em todo plano. Mitigação: nota realista e passo a passo de instalação.
- **R2** — Uso indevido com rosto de terceiros. Mitigação: aviso ético explícito.

## Definition of Done

- `/meurosto` em dev, prompts liberados só após lead, `npm run build` verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 020
- Validada por @produto: GO 10/10, Draft → Ready
