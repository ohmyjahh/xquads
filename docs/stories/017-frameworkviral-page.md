# Story 017 — Página /frameworkviral (método de 3 prompts + skill roteiro-viral pra download)

**Status:** Ready

## Descrição

Nova página isca standalone em `/frameworkviral` (produção:
`www.sowsales.com.br/xquads/frameworkviral`), no padrão das demais iscas.

A página ensina a fazer engenharia reversa de Reels virais e transformar isso
num framework de roteiros, entregando:

1. **Quatro prompts** (o método): (1) buscar Reels acima de 40k views e listar os
   links, (2) transcrever todos, (3) analisar os roteiros e montar o framework,
   (4) transformar o framework em skill (Claude Code + Claude Web).
2. **A skill `roteiro-viral` pronta pra baixar**, em dois formatos:
   - **Claude Code** (`.zip` com `SKILL.md` + `reference.md` + `INSTALL.md`)
   - **Claude Web** (`.zip` com instruções de Project do claude.ai + como usar)

Tudo (prompts + downloads) é liberado após nome + email + telefone no `LeadGate`,
`source = "frameworkviral-page"`.

Além dos prompts, a página traz uma seção técnica explicando o caminho real de
transcrição (yt-dlp para baixar, ffmpeg para extrair áudio, whisper para
transcrever local/offline), com a dica de validar a pipeline com 1 Reel antes.

## Critérios de Aceite

- **AC1** — Rota `/frameworkviral` (`src/app/frameworkviral/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#D1FF02`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate, incluindo a seção do pipeline técnico (yt-dlp / ffmpeg / whisper), sem revelar os prompts nem liberar os downloads.
- **AC4** — Os 4 prompts e os 2 botões de download ficam atrás do `LeadGate`, liberados só após nome + email + telefone.
- **AC5** — Cada prompt tem botão de copiar; cada skill tem botão de baixar o `.zip`.
- **AC6** — Os dois `.zip` existem em `public/downloads/` e são servidos com o prefixo `/xquads` (links com `NEXT_PUBLIC_BASE_PATH`).
- **AC7** — Lead com `source="frameworkviral-page"`; desbloqueio persiste via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="frameworkviral"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:**
- Página `src/app/frameworkviral/page.tsx`, slug em `app-shell.tsx`
- `public/downloads/roteiro-viral-claude-code.zip` (SKILL.md + reference.md + INSTALL.md)
- `public/downloads/roteiro-viral-claude-web.zip` (instruções de Project + como usar)
- Redação dos 3 prompts e do conteúdo educacional

**OUT:** mudanças em API/LeadGate/SalesCta/hooks; push/deploy (só local nesta story).

## Dependências

- Skill fonte em `~/Desktop/roteiro-viral/` (SKILL.md + reference.md)
- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão consolidado em `/foto`, `/estudogpt`, `/familia`

## Complexidade

**M (média).** Página no padrão + geração de dois artefatos `.zip` para download.

## Riscos

- **R1** — Link de download sem o prefixo `/xquads` quebra (basePath). Mitigação: usar `NEXT_PUBLIC_BASE_PATH` no href.
- **R2** — IA transcrevendo/pesquisando pode inventar. Mitigação: seção técnica explica o caminho real (whisper local) e o prompt pede transcrição fiel.
- **R3** — `git add -A` arrasta lixo. Mitigação: adicionar só os arquivos da story (no push).

## Definition of Done

- `/frameworkviral` em dev, prompts + downloads liberados só após lead, `.zip` baixam certo, `npm run build` verde.
- Mostrado em localhost. Push/deploy só após autorização (fora desta story).

## Change Log

- Draft criado por @mestre — Story 017
- Validada por @produto: GO 10/10, Draft → Ready
