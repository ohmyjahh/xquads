# Story 078 — /efeitos: previews individuais passam para depois do gate

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-26

---

## Descrição

Ajuste de funil na `/efeitos`, pedido pelo dono: *"Deixa para a pessoa desvendar os efeitos
apenas depois que ela preencher."*

Hoje a página mostra, **antes** do formulário, o quadro compilado **e** seis previews
individuais. Isso entrega boa parte do valor de graça. A mudança:

| Antes do gate | Depois do gate |
|---|---|
| Título + quadro compilado + **formulário** | Previews individuais, os 17 comandos, requisitos, instalação e uso |

O quadro compilado continua na vitrine — é o que dá vontade. O detalhe de cada efeito vira
recompensa.

### Observação registrada (decisão do dono)

Os requisitos (Claude Code, Node, ffmpeg, Python e a ressalva do macOS) estavam antes do gate
de propósito, para quem não atende não gastar um lead. Com "o quadro e abaixo o formulário",
eles passam para depois. É escolha do dono, trocando proteção do visitante por captura mais
cedo. Fica registrado e é reversível numa linha.

---

## Acceptance Criteria

**AC1** — Antes do gate ficam **somente**: cabeçalho, quadro compilado e o formulário.

**AC2** — As seis previews individuais continuam na página, movidas para **depois** do gate.

**AC3** — Os 17 comandos, requisitos, instalação e uso ficam depois do gate.

**AC4** — Nenhuma imagem é removida nem deixa de carregar.

**AC5** — Nada mais muda: `source`, `utmContent`, assinatura, formulário e licença seguem iguais.

**AC6** — `lint` e `build` sem erro novo.

---

## Escopo

### IN
- `src/app/efeitos/page.tsx` — apenas reordenação de seções

### OUT
- Qualquer alteração em componentes compartilhados
- Remover conteúdo da página — tudo que sai da frente reaparece depois do gate
- Mexer em outra página

---

## Complexidade

**PP (1 ponto).** Reordenação, sem lógica nova.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Perder conteúdo na mudança | Média | AC2 e AC3: conferir que tudo reaparece depois do gate |
| `lazy` da primeira imagem após a troca | Baixa | O quadro compilado continua sendo a primeira |
| Visitante sem macOS só descobrir depois de dar o e-mail | Média | Consequência aceita pelo dono; registrada acima |

---

## Definition of Done

- [x] Os 6 ACs conferidos
- [x] `lint` e `build` passando
- [x] Conferido no navegador: antes e depois do gate
- [ ] Publicado e validado em produção

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-26 | @mestre | Story criada a pedido do dono; publicação já autorizada |
| 2026-10-26 | @produto | Validação 10/10 (GO) |
| 2026-10-26 | @desenvolvedor | Três seções movidas para depois do gate; só reordenação |
| 2026-10-26 | @qualidade | QA PASS 6/6 |

## QA Results

**Verdict: PASS** — 6/6 ACs.

**Antes do gate** (verificado por `[::1]`, fora do bypass):

| Item | Estado |
|---|---|
| Quadro compilado | ✅ única imagem, carregando |
| Formulário | ✅ 5 campos, logo abaixo |
| Previews individuais | ✅ escondidas |
| Os 17 comandos | ✅ escondidos |
| Requisitos | ✅ escondidos |
| Instalação | ✅ escondida |

**Depois do gate:** 7/7 imagens, 17/17 comandos, requisitos, instalação e uso — nada se perdeu.

**Falso negativo no teste:** a medição acusou "1/7 imagens". A aba estava em segundo plano, e
`loading="lazy"` só dispara quando a imagem entra na tela de verdade. Com a aba em primeiro
plano: 7/7, zero pendentes. Não era defeito da página.
