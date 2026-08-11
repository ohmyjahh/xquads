# Story 036 — Página /appdozero (download-magnet do PDF da palestra "Do Zero ao Primeiro Usuário")

**Status:** Ready

## Descrição

Nova página isca standalone em `/appdozero` (produção:
`www.sowsales.com.br/xquads/appdozero`), formato download-magnet: captura nome +
email + telefone e libera o download do PDF da palestra do Rafa.

Contexto: o Rafa vai dar a palestra "Do Zero ao Primeiro Usuário" (Blockchain Rio
2026) e quem postar/marcar nos stories ganha acesso à apresentação em PDF. Esta
página entrega esse PDF após o lead.

PDF fonte: `~/Desktop/Do zero ao primeiro usuário - Rafa Grandi.pdf` (33 slides,
~25MB), copiado para `public/downloads/do-zero-ao-primeiro-usuario.pdf`.
Tema: construir e lançar um app com IA e transformar em renda recorrente (4 blocos:
ideia, ferramentas, estrutura, canais de venda).

`source = "appdozero-page"`.

## Critérios de Aceite

- **AC1** — Rota `/appdozero` (`src/app/appdozero/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#D1FF02` (acid lime, casa com a apresentação), layout no padrão, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é a palestra, o que a pessoa recebe), sem liberar o download.
- **AC4** — O botão de download fica atrás do `LeadGate` e só aparece após nome + email + telefone.
- **AC5** — Após o lead, botão grande que baixa o PDF (href com prefixo `/xquads`, atributo download).
- **AC6** — O PDF existe em `public/downloads/do-zero-ao-primeiro-usuario.pdf`.
- **AC7** — Lead com `source="appdozero-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="appdozero"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, PDF em public/downloads, conteúdo baseado na palestra.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão de download da /frameworkviral (Story 017)

## Complexidade

**S (pequena).** Download-magnet no padrão.

## Definition of Done

- `/appdozero` em dev, PDF liberado só após lead e baixando certo, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 036
- Validada por @produto: GO 10/10, Draft → Ready
