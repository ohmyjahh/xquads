# Story 024 — Página /markitdown (link magnet: libera link após lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/markitdown` (produção:
`www.sowsales.com.br/xquads/markitdown`), no formato **link magnet** (mesmo
padrão da /omniroute, Story 023): captura nome + email + telefone e libera um
link + comando de instalação, sem prompt.

Caso: MarkItDown, utilitário Python da Microsoft que converte diversos formatos
(PDF, Word, Excel, PowerPoint, imagens, áudio, HTML, etc.) em Markdown otimizado
para uso com LLMs.
Link de destino: `https://github.com/microsoft/markitdown`.

`source = "markitdown-page"`.

## Critérios de Aceite

- **AC1** — Rota `/markitdown` (`src/app/markitdown/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#14B8A6`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, o que converte, por que serve pra IA), sem revelar o link.
- **AC4** — O botão de link fica atrás do `LeadGate` e só aparece após nome + email + telefone.
- **AC5** — Após o lead, botão grande que abre o link em nova aba + comando de instalação copiável.
- **AC6** — Lead com `source="markitdown-page"`; desbloqueio via `xquads_lead_captured`.
- **AC7** — `SalesCta` com `utmContent="markitdown"`.
- **AC8** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, conteúdo com base no repo real.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Modelo link-magnet da /omniroute (Story 023)

## Complexidade

**S (pequena).** Link-magnet reaproveitando o padrão da /omniroute.

## Definition of Done

- `/markitdown` em dev, link liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 024
- Validada por @produto: GO 10/10, Draft → Ready
