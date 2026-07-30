# Story 028 — Página /livroskill (link magnet: book-to-skill)

**Status:** Ready

## Descrição

Nova página isca standalone em `/livroskill` (produção:
`www.sowsales.com.br/xquads/livroskill`), no formato **link magnet** (mesmo
padrão da /omniroute e /markitdown): captura nome + email + telefone e libera um
link + comando, sem prompt.

Caso: book-to-skill, ferramenta que transforma qualquer livro técnico (PDF,
EPUB, DOCX...) numa skill do Claude Code, com capítulos carregados sob demanda,
24 a 51x mais eficiente em tokens que jogar o livro inteiro no contexto.
Link de destino: `https://github.com/virgiliojr94/book-to-skill`.

`source = "livroskill-page"`.

## Critérios de Aceite

- **AC1** — Rota `/livroskill` (`src/app/livroskill/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#F59E0B`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, o que faz, por que serve), sem revelar o link.
- **AC4** — O botão de link fica atrás do `LeadGate` e só aparece após nome + email + telefone.
- **AC5** — Após o lead, botão grande que abre o link em nova aba + comando de instalação copiável.
- **AC6** — Lead com `source="livroskill-page"`; desbloqueio via `xquads_lead_captured`.
- **AC7** — `SalesCta` com `utmContent="livroskill"`.
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

- `/livroskill` em dev, link liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 028
- Validada por @produto: GO 10/10, Draft → Ready
