# Story 079 — Página /openbot: time de agentes de IA no seu computador

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-28

---

## Descrição

Rafa pediu a rota `/openbot` com **o passo a passo de uso** do OpenBot e o link para instalar
(`openbot.run`). Publicação já autorizada.

O OpenBot é um aplicativo de desktop que roda um time de agentes de IA na máquina da pessoa. Os
agentes têm nome, instruções e pasta próprios, conversam entre si, passam tarefa um para o outro
e revisam o trabalho. Usa os planos de IA que a pessoa já paga.

### Verificação da fonte (feita antes desta story)

| Item | Resultado |
|---|---|
| Site | `openbot.run` — aberto no navegador, carrega e oferece download ✅ |
| Preço | Grátis (o próprio site diz US$ 0) |
| Plataformas | macOS 13+ **Apple silicon**, Windows 10+ x64, Linux x64 (AppImage) |
| Celular | iPhone e Android — **conectam ao computador**, não rodam sozinhos |
| Provedores | Codex, Claude Code, Gemini, Grok, OpenCode, Cursor, Cline, Muse Code, Pi, Mercury, ACP, endpoint compatível com OpenAI, Ollama, LM Studio |
| Dados | Ficam no computador que roda o app, não em servidor do fabricante |

### Os dois pontos eliminatórios, que vão antes do gate

**1. Mac Intel não roda.** O site é explícito: macOS 13+ **Apple silicon**. Quem tem Mac Intel
precisa saber antes de entregar o e-mail.

**2. "Grátis" pode enganar.** O aplicativo não cobra nada, mas **não inclui a inteligência**: a
pessoa precisa de um plano que já pague (ChatGPT, Claude, Gemini, Grok) ou de um modelo rodando
local. Sem isso, instala e não usa.

Mesmo padrão das Stories 072 e 075: o que é eliminatório aparece antes do formulário.

### Observação sobre a ordem (Story 078)

Na `/efeitos`, o dono pediu requisitos **depois** do gate. Aqui eles vão **antes**, porque não
são preferência de funil e sim condição de funcionamento: na `/efeitos` quem não tinha macOS
ainda conseguia usar a skill com um resultado pior; aqui, sem Apple silicon ou sem plano de IA,
não há produto nenhum. Se o dono preferir igualar o padrão da `/efeitos`, é uma linha.

---

## Acceptance Criteria

**AC1** — Existe a rota `/openbot` renderizando sem erro de build e sem erro no console.

**AC2** — A página explica o que o OpenBot faz em linguagem de quem não é desenvolvedor.

**AC3** — Os requisitos de plataforma (incluindo **Apple silicon**) e o fato de que a pessoa
precisa trazer o próprio plano de IA aparecem **antes** do gate.

**AC4** — O passo a passo de uso fica atrás do `LeadGate`, com `source="openbot-page"`.

**AC5** — O formulário traz os cinco campos do padrão atual, incluindo faturamento mensal.

**AC6** — Há link para `https://openbot.run/` no conteúdo liberado.

**AC7** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia.

**AC8** — A gratuidade é informada sem induzir a erro: grátis o app, a IA é por conta da pessoa.

**AC9** — `SalesCta` com `utmContent="openbot"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/openbot/page.tsx`
- `LeadGate`, `SalesCta`, `hasCapturedLead` já existentes

### OUT
- Alterar componentes compartilhados, `/api/leads`, `next.config` ou layout
- Imagens do site do OpenBot — não são do Rafa nem de repositório aberto
- Comparações nominais com concorrentes, embora o site traga
- Falar da versão paga para empresas
- Mexer em página existente

---

## Dependências

Nenhuma nova.

---

## Complexidade

**P (2 pontos).**

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Pessoa com Mac Intel dar o e-mail e não conseguir usar | **Alta** | AC3: requisito antes do gate |
| "Grátis" ser entendido como "IA incluída" | **Alta** | AC8: dito com todas as letras |
| Produto novo mudar requisito ou preço | Média | Data da conferência no rodapé |
| Pessoa achar que roda no celular sozinho | Média | Dizer que o celular conecta ao computador |

---

## Definition of Done

- [x] Os 9 ACs conferidos
- [x] `lint` e `build` sem erro novo
- [x] Conferido no navegador, antes e depois do gate
- [ ] Publicado e validado em produção pelo navegador (não por `curl`)

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-28 | @mestre | Story criada; site verificado no navegador |
| 2026-10-28 | @produto | Validação 10/10 (GO) |
| 2026-10-28 | @desenvolvedor | Página implementada |
| 2026-10-28 | @qualidade | QA PASS 9/9 |

## QA Results

**Verdict: PASS** — 9/9 ACs. Verificado por `[::1]` (gate ativo) e `localhost` (destravado).

**Antes do gate:** requisito Apple silicon ✅, "não vem com a IA dentro" ✅, celular conecta ao
computador ✅, 5 campos obrigatórios ✅, passos e link escondidos ✅, console limpo ✅.

**Depois do gate:** 5/5 passos ✅, link `https://openbot.run/` com `target="_blank"` e
`rel="noopener"` ✅.
