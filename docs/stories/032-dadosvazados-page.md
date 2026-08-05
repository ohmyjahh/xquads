# Story 032 — Página /dadosvazados (auditar dados vazados + pedir remoção LGPD, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/dadosvazados` (produção:
`www.sowsales.com.br/xquads/dadosvazados`), no padrão das iscas de prompt e na
linha de privacidade da /foto e /meurosto (que ficam intactas).

Método (3 prompts): a IA busca na web tudo que existe sobre a pessoa (dados
expostos, vazamentos, bases, credenciais), depois escreve um pedido de remoção
com respaldo legal (LGPD) para cada empresa, e por fim envia os e-mails via
conector do Gmail (@gmail).

É defensivo (a pessoa audita os PRÓPRIOS dados). Prompts melhorados (corrigidos
os erros de digitação) e aviso de não colocar senhas reais no prompt.
`source = "dadosvazados-page"`.

## Critérios de Aceite

- **AC1** — Rota `/dadosvazados` (`src/app/dadosvazados/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#F43F5E`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (por que importa, o que precisa, aviso ético/segurança), sem revelar os prompts.
- **AC4** — Os 3 prompts + o passo de conectar o Gmail ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — Cada prompt tem botão de copiar; prompts melhorados a partir dos exemplos do Rafa.
- **AC6** — Aviso: só com os próprios dados; nunca colocar senhas reais no prompt.
- **AC7** — Lead com `source="dadosvazados-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="dadosvazados"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, prompts melhorados, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; alterar /foto e /meurosto; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- Tom de privacidade da /foto e /meurosto; conector no prompt (padrão @canva da /clonardesign)

## Complexidade

**S (pequena).** Página no padrão, 3 prompts + 1 passo.

## Riscos

- **R1** — A IA pode inventar vazamento/URL. Mitigação: prompt pede fonte e confirmação; aviso de conferir.
- **R2** — Usuário colocar dado ultrassensível (senha) no prompt. Mitigação: aviso explícito.

## Definition of Done

- `/dadosvazados` em dev, prompts liberados só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 032
- Validada por @produto: GO 10/10, Draft → Ready
