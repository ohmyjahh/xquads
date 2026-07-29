# Story 025 — Página /airbnb (prompt de tour cinematográfico de imóvel, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/airbnb` (produção:
`www.sowsales.com.br/xquads/airbnb`), no padrão das iscas de prompt (similar à
/logoanimada, que também é prompt em inglês pra IA de vídeo).

Modelo: a pessoa printa as fotos de um anúncio do Airbnb, gera um tour
cinematográfico do imóvel com IA de imagem-para-vídeo (usando as fotos como
referência) e vende o vídeo pro anfitrião. Isca de renda extra.

O prompt (em inglês, fornecido pelo Rafa) fica atrás do `LeadGate`. Corrigido o
OCR (colchetes) e levemente melhorado (4K, sem pessoas/texto/marca d'água, fidelidade).
`source = "airbnb-page"`.

## Critérios de Aceite

- **AC1** — Rota `/airbnb` (`src/app/airbnb/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#FF5A5F`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (a oportunidade, como usar, o que precisa), sem revelar o prompt.
- **AC4** — O prompt fica atrás do `LeadGate` e só aparece após nome + email + telefone.
- **AC5** — O prompt tem botão de copiar; conteúdo fiel ao enviado (OCR corrigido + melhoria leve).
- **AC6** — Seção de como abordar/vender pro anfitrião.
- **AC7** — Lead com `source="airbnb-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="airbnb"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, prompt melhorado, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão de página-prompt-em-inglês da /logoanimada (Story 018)

## Complexidade

**S (pequena).** Página no padrão, 1 prompt.

## Riscos

- **R1** — IA de vídeo pode não reproduzir o imóvel com fidelidade total. Mitigação: nota realista + orientação de gerar e revisar.

## Definition of Done

- `/airbnb` em dev, prompt liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 025
- Validada por @produto: GO 10/10, Draft → Ready
