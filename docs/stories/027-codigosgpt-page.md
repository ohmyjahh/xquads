# Story 027 — Página /codigosgpt (5 códigos secretos do ChatGPT, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/codigosgpt` (produção:
`www.sowsales.com.br/xquads/codigosgpt`), baseada no carrossel do Rafa "5 códigos
secretos pro ChatGPT", EXPANDIDA para 38 códigos.

Decisão do Rafa: mostrar SÓ os códigos (comando + o que faz + quando usar),
SEM os prompts completos, e uma lista bem maior. Pesquisado (Towards AI, etc.)
e montada uma lista de 38 códigos organizados em 7 categorias: verdade e
precisão, pensamento crítico, planejamento, análise e decisão, escrita, resumo
e clareza, aprofundar. Inclui os 5 originais do post (/truth, /blueprint, /gaps,
/rank, /pushback). Cada código indica se vai no início ou no fim do prompt.

Nota de honestidade na página: o `/` não é feature nativa; é atalho que ajuda o
modelo a interpretar o formato/papel/profundidade.

Liberados após nome + email + telefone no `LeadGate`, `source = "codigosgpt-page"`.

## Critérios de Aceite

- **AC1** — Rota `/codigosgpt` (`src/app/codigosgpt/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#4ADE80`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (o que são, como funcionam), sem revelar os comandos/versões.
- **AC4** — Os 5 códigos ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — Cada código tem comando curto copiável + versão completa copiável.
- **AC6** — Botão sólido com accent claro usa texto escuro (contraste).
- **AC7** — Lead com `source="codigosgpt-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="codigosgpt"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, os 5 comandos + versões completas, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Padrão de card comando-curto + versão-completa da /estudogpt (Story 015)

## Complexidade

**S (pequena).** Página no padrão, 5 cards.

## Definition of Done

- `/codigosgpt` em dev, códigos liberados só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 027
- Validada por @produto: GO 10/10, Draft → Ready
