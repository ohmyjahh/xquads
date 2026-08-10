# Story 033 — Página /gptads (como anunciar no ChatGPT Ads, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/gptads` (produção:
`www.sowsales.com.br/xquads/gptads`), formato tutorial (padrão /ensinarclaude).

Estudo e passo a passo do ChatGPT Ads (OpenAI Ads Manager), plataforma self-serve
de anúncios dentro do ChatGPT, lançada em 22/07/2026.

Entregável gated: passo a passo completo de como criar uma campanha + template de
Context Hints copiável + notas de custo/formato/targeting.
`source = "gptads-page"`.

## Fatos confirmados (fontes web, 10/08/2026)

- Plataforma: "Advertise in ChatGPT" / OpenAI Ads Manager em ads.openai.com. Login com conta OpenAI.
- Cadastro: nome comercial, endereço, registro (EIN), cartão, favicon.
- Fluxo: criar campanha (objetivo: cliques/impressões/conversões) → orçamento → lance → criativo → lançar e monitorar.
- Orçamento: diário mínimo $25 OU orçamento de campanha mínimo $1. Lance mínimo $0,01.
- Lance: CPC, CPM ou custo por conversão.
- Context Hints: caixa de texto livre no nível do grupo de anúncios pra descrever quem atingir (targeting por CONTEXTO da conversa, não keyword tradicional). É o principal mecanismo.
- Formatos: estático (nome da empresa, imagem, título, descrição) + product carousel. Aparecem no fim da conversa, separados da resposta.
- Targeting geográfico: país, região, DMA, CEP (EUA). Países: EUA, Canadá, UK, Austrália, NZ, Japão, Coreia do Sul.
- Quem vê: usuários dos planos Free e Go. NÃO em Plus/Pro/Business/Enterprise/Education. Nada pra menores de 18.
- Audiences próprias: upload de e-mails/telefones, mín. 25 mil (recomendado 100 mil).
- Métricas: impressões, cliques, conversões, valor de vendas, ROAS, gasto, CTR, CPC médio, CPM médio. Pixel de conversão + UTM.

## Critérios de Aceite

- **AC1** — Rota `/gptads` (`src/app/gptads/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#10A37F` (verde ChatGPT), layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, como funciona o targeting, quem vê), sem revelar o passo a passo completo/template.
- **AC4** — Passo a passo, template e detalhes ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — O template de Context Hints tem botão de copiar.
- **AC6** — Informação fiel às fontes; sem inventar. Notar que é novo e pode mudar/estar em rollout.
- **AC7** — Lead com `source="gptads-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="gptads"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, passo a passo + template + conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Formato tutorial da /ensinarclaude (Story 021)

## Complexidade

**S (pequena).** Página tutorial no padrão.

## Riscos

- **R1** — Recurso novo, detalhes de UI/países/preço podem mudar. Mitigação: descrever só o confirmado, nota de rollout.

## Definition of Done

- `/gptads` em dev, conteúdo liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 033
- Validada por @produto: GO 10/10, Draft → Ready
