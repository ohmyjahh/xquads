# Story 021 — Página /ensinarclaude (Record a Skill do Claude Cowork, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/ensinarclaude` (produção:
`www.sowsales.com.br/xquads/ensinarclaude`), no padrão das demais iscas.

Explica e ensina o recurso "Record a skill" lançado no Claude Cowork em
21/07/2026: o usuário grava a tela fazendo uma tarefa e narra em voz alta; o
Claude captura tela + cliques + narração e transforma numa skill reutilizável.

Como não é um "prompt copiável" e sim um recurso do app, o entregável atrás do
gate é: (1) passo a passo detalhado de onde clicar e como gravar, (2) um roteiro
de narração copiável (o que falar durante a gravação, no formato de boas
práticas), (3) checklist de segurança (o que não gravar, como preparar a tela).

Liberado só após nome + email + telefone no `LeadGate`,
`source = "ensinarclaude-page"`.

## Fatos confirmados (fontes web, 22/07/2026)

- Lançado 21/07/2026 no Claude Cowork (app desktop). Anúncio oficial @claudeai.
- Local: menu "+" → "Record a skill".
- Fluxo: grava a tela fazendo a tarefa, narra as escolhas/regras/exceções; Claude
  captura tela, cliques, teclas e voz e gera uma skill; revisar e testar antes de usar.
- Planos: Pro, Max, Team. Só desktop (não web/mobile).
- Boas práticas: declarar o objetivo, entradas permitidas, regras de decisão,
  exceções, verificação de qualidade, formato/destino final.
- Testar com: exemplo normal, caso extremo, requisição fora de escopo.
- Segurança: não gravar senhas/dados sensíveis/ações irreversíveis; preparar a
  tela (fechar email/chat/apps de senha, remover tokens/keys, usar dados fictícios).

## Critérios de Aceite

- **AC1** — Rota `/ensinarclaude` (`src/app/ensinarclaude/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#D97757` (cor do Claude), layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que é, requisitos), sem revelar o passo a passo completo.
- **AC4** — Passo a passo, roteiro de narração e checklist ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — O roteiro de narração tem botão de copiar.
- **AC6** — Informação fiel às fontes; sem inventar telas/opções não confirmadas.
- **AC7** — Lead com `source="ensinarclaude-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="ensinarclaude"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)

## Complexidade

**S (pequena).**

## Riscos

- **R1** — Recurso novo, detalhes de UI podem mudar. Mitigação: descrever só o confirmado, tom "no menu +", sem inventar labels exatos além de "Record a skill".

## Definition of Done

- `/ensinarclaude` em dev, conteúdo liberado só após lead, `npm run build` verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 021
- Validada por @produto: GO 10/10, Draft → Ready
