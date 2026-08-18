# Story 037 — Página /marcadagua (cobertura editorial: marca d'água do Claude + ferramenta de remoção, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/marcadagua` (produção:
`www.sowsales.com.br/xquads/marcadagua`), em formato de MATÉRIA/COBERTURA
editorial (não tutorial de evasão).

Contexto: a Anthropic anunciou (11/08/2026) marca d'água invisível em todo texto
gerado pelo Claude (modelos desde 02/08/2026, global, por conta do EU AI Act
art. 50). Surgiram ferramentas open source de remoção, como a Watermarks Remover
(github.com/guillaumemeyer/watermarks-remover).

DECISÃO EDITORIAL (importante): a página COBRE e CONTEXTUALIZA a novidade e a
existência da ferramenta, com honestidade dos dois lados. NÃO é um passo a passo
de instalação/evasão, NÃO usa o enquadramento "escreva sem deixar rastro / 0%
detector", e NÃO entrega a skill como recompensa de lead. O gate libera análise
editorial (o que muda na prática), não a ferramenta.

`source = "marcadagua-page"`.

## Critérios de Aceite

- **AC1** — Rota `/marcadagua` (`src/app/marcadagua/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#3B82F6`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo livre: a notícia (o que a Anthropic anunciou, como funciona, onde se aplica).
- **AC4** — Parte gated: análise editorial (o que muda pra quem usa IA, os dois lados, o que a marca prova/não prova). NÃO tutorial de remoção.
- **AC5** — Fatos fiéis às fontes; ferramenta mencionada como cobertura factual com contexto crítico, link como fonte (não CTA de download).
- **AC6** — Honestidade dos dois lados: por que a marca existe (transparência/regulação) e os poréns de remover.
- **AC7** — Lead com `source="marcadagua-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="marcadagua"`.
- **AC9** — `npm run build` verde.

## Fatos confirmados (fontes web, 18/08/2026)

- Anthropic anunciou (11/08/2026) marca d'água invisível em texto do Claude.
- Modelos lançados desde 02/08/2026; aplicada globalmente, não só na UE.
- Cobre Platform API, claude.ai, Claude Code, Claude Cowork, Claude Tag, e via AWS/GCP/Microsoft Foundry.
- Enviesa sutilmente a escolha de palavras; detectável com texto suficiente; viaja com o texto copiado.
- Motivada pelo EU AI Act Article 50 (enforceable 02/08/2026).
- Limitações: sinal se perde com edição pesada, paráfrase, tradução ou mistura; textos curtos podem não ter sinal suficiente.
- A marca prova PROCESSAMENTO pelo Claude, não autoria.
- Ferramenta de remoção open source: Watermarks Remover (guillaumemeyer).

## Escopo

**IN:** página editorial, slug em `app-shell.tsx`, conteúdo baseado nas fontes.
**OUT:** tutorial de instalação/evasão; API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Complexidade

**S (pequena).** Página editorial no padrão.

## Definition of Done

- `/marcadagua` em dev, análise liberada só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 037
- Validada por @produto: GO 10/10, Draft → Ready
