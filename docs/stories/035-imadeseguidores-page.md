# Story 035 — Página /imadeseguidores (analisar Instagram + concorrentes + plano de conteúdo com Claude, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/imadeseguidores` (produção:
`www.sowsales.com.br/xquads/imadeseguidores`), na linha da /claudelinkedin (Claude
com navegador).

Método: usar o app do Claude no modo code (navegador) pra analisar o próprio
perfil do Instagram (insights), analisar os concorrentes e gerar uma programação
de conteúdo de 15 dias.

Fluxo (fornecido pelo Rafa, prompts a melhorar):
- Setup: baixar o app do Claude + ativar o modo code
- Prompt 1: abrir o navegador e entrar no Instagram
- Prompt 2: entrar nos insights e analisar o perfil (seguidores, engajamento,
  curtidas, horários, melhores conteúdos) → relatório
- Prompt 3: analisar o perfil dos concorrentes (com campo pra colar o link)
- Prompt 4: criar programação de conteúdo dos próximos 15 dias (posts/semana +
  stories) com base nas duas análises

`source = "imadeseguidores-page"`.

## Critérios de Aceite

- **AC1** — Rota `/imadeseguidores` (`src/app/imadeseguidores/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#E1306C`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, o que precisa: app do Claude + modo code), sem revelar os prompts.
- **AC4** — Os 4 prompts + o passo de setup ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — Cada prompt tem botão de copiar; prompt 3 tem campo pra colar o link do concorrente; prompt 4 tem campo de posts/semana.
- **AC6** — Passo de setup (baixar app + ativar modo code) explicado antes dos prompts.
- **AC7** — Lead com `source="imadeseguidores-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="imadeseguidores"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, prompts melhorados, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão Claude-com-navegador da /claudelinkedin (Story 029)

## Complexidade

**S (pequena).** Página no padrão, 4 prompts + setup.

## Riscos

- **R1** — Depende do app do Claude com modo code/navegador + Instagram logado. Mitigação: passo de setup + nota realista.

## Definition of Done

- `/imadeseguidores` em dev, prompts liberados só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 035
- Validada por @produto: GO 10/10, Draft → Ready
