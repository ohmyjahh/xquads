# Story 016 — Página /familia (4 prompts de árvore genealógica, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/familia` (produção:
`www.sowsales.com.br/xquads/familia`), no mesmo padrão das demais iscas do Xquads.

A página ensina o visitante a usar a IA para montar e pesquisar a própria árvore
genealógica, entregando quatro prompts prontos em sequência (mesma conversa):

| # | Prompt | Objetivo |
|---|--------|----------|
| 1 | Montar a árvore | A IA pergunta tudo que precisa (nome, parentescos, origem da família) e monta a árvore |
| 2 | Rastrear a linhagem | A partir do nome e sobrenome, a IA desenha a linhagem e origem dos sobrenomes até onde conseguir |
| 3 | Pesquisar registros públicos | A IA busca registros públicos, bancos de ancestralidade e obituários atrás de parentes desconhecidos |
| 4 | Gerar a árvore visual | A IA cria uma imagem da árvore genealógica conectando tudo que foi levantado |

O acesso aos quatro prompts só é liberado após nome + email + telefone no
`LeadGate`, gravado via `/api/leads` (dual-write Sheets + GENE CRM),
`source = "familia-page"`.

## Critérios de Aceite

- **AC1** — Rota `/familia` (`src/app/familia/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#D9A441`, layout no padrão das iscas (fundo `#121214`, header com badge, footer `@rafa.grandi`).
- **AC3** — Conteúdo educacional livre acima do gate, explicando o método e o que cada prompt faz, sem revelar os prompts.
- **AC4** — Os 4 prompts ficam atrás do `LeadGate` e só aparecem após nome + email + telefone.
- **AC5** — Cada prompt tem seu botão de copiar.
- **AC6** — Aviso curto sobre conferir os achados (IA pode inventar genealogia) e sobre dados de terceiros.
- **AC7** — Lead com `source="familia-page"`; desbloqueio persiste via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="familia"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página `src/app/familia/page.tsx`, slug em `app-shell.tsx`, redação dos 4 prompts e do conteúdo.
**OUT:** mudanças em API/LeadGate/SalesCta/hooks; push/deploy (só local nesta story).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (todos prontos)
- Padrão consolidado em `/foto` e `/estudogpt`

## Complexidade

**S (pequena).** Página nova em padrão consolidado.

## Riscos

- **R1** — IA inventa parentes e datas com facilidade. Mitigação: prompt 3 pede fonte e nível de confiança e proíbe inventar; aviso na página.
- **R2** — `git add -A` arrasta lixo. Mitigação: adicionar só os arquivos da story (quando houver push).

## Definition of Done

- `/familia` funcionando em dev, 4 prompts liberados só após lead, `npm run build` verde.
- Mostrado em localhost. Push/deploy só após autorização (fora desta story).

## Change Log

- Draft criado por @mestre — Story 016
- Validada por @produto: GO 10/10, Draft → Ready
