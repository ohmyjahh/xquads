# Story 022 — Página /linkedin (método de 5 prompts + skill linkedin-posts pra download)

**Status:** Ready

## Descrição

Nova página isca standalone em `/linkedin` (produção:
`www.sowsales.com.br/xquads/linkedin`), no padrão das demais iscas e espelhando a
estrutura da `/frameworkviral` (método de prompts + download de skill).

Os 5 prompts (fornecidos pelo Rafa) são o método de engenharia reversa que gera a
skill de LinkedIn: abrir o navegador → achar os 10 maiores perfis de IA do mundo
→ analisar cada um → montar um blueprint (.md) → transformar em skill com
categorias e workflow → gerar o arquivo pra usar no Claude Web.

O PRÓPRIO prompt 5 é o que gera o arquivo de skill pro Claude Web. A página NÃO
oferece download de skill pronta: entrega só os 5 prompts copiáveis e o passo a
passo. A pessoa roda os prompts e gera a própria skill.

Prompts liberados após nome + email + telefone no `LeadGate`,
`source = "linkedin-page"`.

## Critérios de Aceite

- **AC1** — Rota `/linkedin` (`src/app/linkedin/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#0A66C2` (azul LinkedIn), layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, como funciona, o que precisa), sem revelar os prompts.
- **AC4** — Os 5 prompts ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — Cada prompt tem botão de copiar. SEM download de arquivo na página.
- **AC6** — Passo a passo de como executar o método, do prompt 1 ao 5.
- **AC7** — Lead com `source="linkedin-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="linkedin"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, redação dos 5 prompts melhorados e do conteúdo.
**OUT:** download de arquivo/zip (o prompt 5 já gera o arquivo); API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão consolidado nas demais iscas

## Complexidade

**S (pequena).** Página no padrão, 5 prompts + passo a passo.

## Riscos

- **R1** — Prompts 1-2 dependem do Claude com navegador. Mitigação: nota realista + fallback.

## Definition of Done

- `/linkedin` em dev, prompts liberados só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 022
- Validada por @produto: GO 10/10, Draft → Ready
