# Story 034 — Página /segundocerebro (prompt de memória automática no Obsidian, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/segundocerebro` (produção:
`www.sowsales.com.br/xquads/segundocerebro`), no padrão das iscas de prompt.

Prompt (fornecido pelo Rafa) que configura o Obsidian como memória de longo prazo
automática para Claude Code / Codex: lê o contexto do cofre antes de qualquer
tarefa e registra padrões/decisões/preferências/projetos/stack/aprendizados depois
de cada entrega, sem o usuário precisar pedir.

Prompt mantido fiel ao original (só troca travessões por pontuação equivalente).
`source = "segundocerebro-page"`.

## Critérios de Aceite

- **AC1** — Rota `/segundocerebro` (`src/app/segundocerebro/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#A855F7`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, como funciona, o que precisa), sem revelar o prompt.
- **AC4** — O prompt fica atrás do `LeadGate`, liberado só após lead.
- **AC5** — O prompt tem botão de copiar; fiel ao original (sem travessão).
- **AC6** — Lead com `source="segundocerebro-page"`; desbloqueio via `xquads_lead_captured`.
- **AC7** — `SalesCta` com `utmContent="segundocerebro"`.
- **AC8** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, o prompt, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)

## Complexidade

**S (pequena).** Página no padrão, 1 prompt denso.

## Definition of Done

- `/segundocerebro` em dev, prompt liberado só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 034
- Validada por @produto: GO 10/10, Draft → Ready
