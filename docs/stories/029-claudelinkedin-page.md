# Story 029 — Página /claudelinkedin (candidatura em massa no LinkedIn com o Claude, gated por lead)

**Status:** Ready

## Descrição

Nova página isca standalone em `/claudelinkedin` (produção:
`www.sowsales.com.br/xquads/claudelinkedin`). É a **versão Claude** da /emprego
(que usava o modo agente do ChatGPT): aqui o Claude abre o navegador, entra no
LinkedIn e faz a busca + candidatura.

Fluxo (fornecido pelo Rafa, prompts a melhorar):
1. Prompt: recrutador sênior → 20 cargos + palavras-chave ATS
2. Prompt: reescrever currículo em modelo mestre (fórmula XYZ do Google, remove red flags)
3. PASSO (não é prompt): pedir pro Claude abrir o navegador e entrar no LinkedIn; usuário loga na conta
4. Prompt: encontrar vagas dos cargos (últimos 7 dias) → lista com link + score de compatibilidade + currículo personalizado
5. Prompt: candidatar-se nas 500 vagas que mais fazem sentido, personalizando cada uma + relatório
6. FALLBACK: se o Claude recusar o passo 5, um prompt manual (entrar em cada vaga, achar Candidatar-se, enviar o currículo, repetir)

`source = "claudelinkedin-page"`.

## Critérios de Aceite

- **AC1** — Rota `/claudelinkedin` (`src/app/claudelinkedin/page.tsx`) standalone, slug em `STANDALONE_ROUTES`.
- **AC2** — Accent `#D97757` (Claude), layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo educacional livre acima do gate (a oportunidade, o que precisa: Claude com navegador), sem revelar os prompts.
- **AC4** — Prompts + passos ficam atrás do `LeadGate`, liberados só após lead.
- **AC5** — Cada prompt tem botão de copiar; o passo 3 é descritivo (logar), não copiável; inclui o prompt de fallback.
- **AC6** — Deixa claro que o passo 3 exige o navegador do Claude e login manual no LinkedIn.
- **AC7** — Lead com `source="claudelinkedin-page"`; desbloqueio via `xquads_lead_captured`.
- **AC8** — `SalesCta` com `utmContent="claudelinkedin"`.
- **AC9** — `npm run build` verde.

## Escopo

**IN:** página, slug em `app-shell.tsx`, prompts melhorados + fallback, conteúdo.
**OUT:** API/LeadGate/SalesCta/hooks; alterar a /emprego; push/deploy (só local).

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`, `/api/leads` (prontos)
- /emprego (Story 011) como referência de tom (versão ChatGPT, fica intacta)

## Complexidade

**S (pequena).** Página no padrão, 4 prompts + 1 passo + 1 fallback.

## Riscos

- **R1** — Claude pode recusar candidatura automatizada. Mitigação: o fallback já está previsto na página.
- **R2** — Depende do navegador do Claude + login no LinkedIn. Mitigação: passo explícito + nota realista.

## Definition of Done

- `/claudelinkedin` em dev, prompts liberados só após lead, build verde.
- Mostrado em localhost. Push/deploy só após autorização.

## Change Log

- Draft criado por @mestre — Story 029
- Validada por @produto: GO 10/10, Draft → Ready
