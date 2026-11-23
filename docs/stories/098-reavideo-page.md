# Story 098 — Página /reavideo: engenharia reversa de qualquer vídeo, plano a plano

**Status:** Done
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-23

---

## Descrição

Rafa pediu uma página sobre `github.com/JuneYaooo/rea-video`.

A ferramenta pega um vídeo qualquer e diz, **plano a plano**, se aquilo foi filmado, gerado por
IA ou feito em código — e entrega o caminho para refazer. É exatamente o trabalho que o público
do Xquads faz no olho quando quer copiar uma referência.

### Verificação da fonte (feita antes desta story)

| Item | Resultado |
|---|---|
| Repositório | **12.480 estrelas**, público |
| Licença | Apache-2.0 |
| Vivo | Criado em 29/10/2026, push em **23/11/2026** (hoje) |
| Site | `reavideo.ai` — responde 200 |
| Linguagem | Python (≥ 3.10), roda via agente |
| Documentação | Tem **README em português** (`i18n/README_pt.md`) |

### Por que essa página é boa para este público

As páginas que já existem sobre engenharia reversa (`/replicadeapp`,
`/youtubeengenhariareversa`) tratam de **aplicativo**. Nenhuma trata de **vídeo**. O assunto é
novo na casa e é o que mais encosta no dia a dia de quem faz conteúdo: ver um reel que funcionou
e querer saber como foi feito.

### Pontos eliminatórios, antes do gate

1. **Precisa de um agente que rode comando** — Claude Code ou Codex. Não é aplicativo com botão.
2. **Precisa de ffmpeg e Python 3.10+.**
3. **Modelo com visão é opcional, mas muda o resultado**: sem ele funciona; com ele, a conclusão
   sobre o que é IA fica mais precisa e sai um prompt reverso por plano.

Mesmo padrão das Stories 072, 075 e 079.

### Aviso de segurança que vale repassar

O autor abre o README avisando que **não lançou nenhuma criptomoeda** e que qualquer token com o
nome do projeto é golpe. Projeto com 12 mil estrelas vira isca; uma linha na página protege quem
for procurar.

---

## Acceptance Criteria

**AC1** — Existe a rota `/reavideo` renderizando sem erro de build e sem erro no console.

**AC2** — A página explica o que a ferramenta faz na linguagem de quem produz conteúdo, não em
termos de visão computacional.

**AC3** — Os tipos de vídeo que ela analisa aparecem de forma escaneável.

**AC4** — Os requisitos (agente, ffmpeg, Python) e a ressalva do modelo de visão aparecem
**antes** do gate.

**AC5** — O aviso sobre o golpe de criptomoeda aparece na página, atribuído ao autor.

**AC6** — O conteúdo liberado fica atrás do `LeadGate`, com `source="reavideo-page"`.

**AC7** — O formulário traz os cinco campos do padrão atual, incluindo faturamento mensal.

**AC8** — Os comandos de instalação têm botão de copiar com `try/catch` e aviso em caso de falha.

**AC9** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia.

**AC10** — Há link para o repositório e para o **README em português**, com licença Apache-2.0
e data da conferência.

**AC11** — `SalesCta` com `utmContent="reavideo"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/reavideo/page.tsx`
- `LeadGate`, `SalesCta`, `hasCapturedLead` já existentes

### OUT
- Alterar componentes compartilhados, `/api/leads`, `next.config` ou layout
- Imagens ou GIFs do repositório de origem — não são do Rafa
- Ensinar a usar modelo de visão, configurar chave ou endpoint
- Comparar com concorrente
- Mexer em página existente

---

## Complexidade

**P (2 pontos).**

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Pessoa sem Claude Code achar que é app com botão | **Alta** | AC4: requisito antes do gate |
| Alguém cair em token falso procurando o projeto | Média | AC5: aviso do autor repassado |
| Expectativa de precisão sem modelo de visão | Média | Dito que funciona sem, e o que melhora com |
| Projeto novo mudar comando de instalação | Média | Data da conferência no rodapé |

---

## Definition of Done

- [x] Os 11 ACs conferidos
- [x] `lint` e `build` sem erro novo
- [x] Conferido no navegador, antes e depois do gate
- [x] Links testados (repositório, README pt, site)
- [x] Prévia mostrada ao Rafa
- [x] Aprovação explícita antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-23 | @mestre | Story criada; repositório, licença, site e README pt verificados |
| 2026-11-23 | @produto | Validação 10/10 (GO) |
| 2026-11-23 | @desenvolvedor | Página implementada |
| 2026-11-23 | @qualidade | QA PASS 11/11 |

## QA Results

**Verdict: PASS** — 11/11 ACs. Verificado por `[::1]` (gate ativo) e `localhost` (destravado).

**Antes do gate:** requisitos e "não é um aplicativo com botão" ✅, ressalva do modelo de visão ✅,
aviso de golpe de criptomoeda ✅, 6/6 tipos de vídeo ✅, 5 campos ✅, instalação escondida ✅.

**Depois do gate:** pedido pronto ✅, comandos de plugin ✅, explicação do VIDEO.md ✅,
link do repositório e do README em português ✅, licença Apache 2.0 ✅.

### Dois falsos alarmes investigados antes de reportar

**1. README em português deu 503.** Três tentativas seguidas depois e o `raw` deram 200 — foi
soluço momentâneo do GitHub, não link quebrado.

**2. 404 no console.** Rastreado recurso a recurso: são as chamadas do Pixel do Facebook
(`connect.facebook.net`, `facebook.com/tr`), bloqueadas no ambiente de teste. É do layout do
site, pré-existente, e nenhum recurso da página falhou — 54 recursos, zero problemas próprios.
| 2026-11-23 | @devops | Publicado (`40fa848`), no ar em ~30 s |
| 2026-11-23 | @qualidade | **Validado em produção** sem flag de lead: gate ativo, 5 campos, requisitos e aviso de golpe antes do formulário. Status → Done |
