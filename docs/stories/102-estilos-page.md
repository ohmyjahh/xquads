# Story 102 — Página /estilos: os códigos de estilo de animação

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-23

---

## Descrição

Rafa gravou um reel mostrando a mesma cena animada em 10 estilos diferentes, e o CTA pede para
comentar **"ESTILO"**. Esta página entrega o que foi prometido: o prompt-base e os códigos.

Fonte: `~/Desktop/Edições IA/Estilos Claude PT/30-codigos-secretos.md`.

### A ideia do material

A cena fica travada e só o **código de estilo** muda. Os códigos vão em inglês dentro do prompt,
porque é assim que os modelos reconhecem o estilo; o nome em português serve para a tela.
O fluxo é: gerar a imagem parada → aprovar → só então animar.

### Decisão de escopo: 10, não 40

O documento tem **10 do vídeo + 30 novos**, e o próprio Rafa escreveu lá que os 30 servem para
"fazer mais três reels no mesmo formato", organizados por tema (texturas à mão, retrô, 3D).

Publicar os 30 agora **queima a pauta dos próximos vídeos dele**. A página entrega os **10 do
vídeo**, que é exatamente a promessa feita a quem comentou. Os 30 ficam de fora até ele decidir
— acrescentá-los depois é trivial.

### Rota

O CTA é "ESTILO", mas `/estilo` já existe desde junho com outro assunto ("Estilo Pessoal",
Story 009). A rota nova é **`/estilos`**, no plural.

### O que vai antes do gate

Dois pontos que mudam o resultado e são decisivos:

1. **Onde cada estilo funciona melhor.** O próprio documento diz: traço, vetor, pixel e lousa
   saem bem pedindo HTML/SVG direto ao Claude; Lego, CGI e massinha pedem gerador de imagem ou
   vídeo. Quem tentar massinha no Claude vai achar que o código não presta.
2. **A ordem importa**: imagem parada primeiro, animação depois. Animar antes de aprovar o
   quadro é desperdício de geração.

---

## Acceptance Criteria

**AC1** — Existe a rota `/estilos` renderizando sem erro de build e sem erro próprio no console.

**AC2** — A página explica a ideia (cena travada, só o código muda) sem jargão.

**AC3** — Os **10 códigos do vídeo** aparecem com o nome em português e o código em inglês.

**AC4** — Cada código tem botão de copiar individual, com `try/catch` e aviso em falha.

**AC5** — O prompt-base aparece com botão de copiar próprio.

**AC6** — A ressalva de qual ferramenta serve a qual estilo, e a ordem (imagem antes de animar),
aparecem **antes** do gate.

**AC7** — O conteúdo liberado fica atrás do `LeadGate`, com `source="estilos-page"`.

**AC8** — O formulário traz os cinco campos do padrão atual.

**AC9** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia.

**AC10** — Os 30 códigos extras **não** aparecem na página.

**AC11** — `SalesCta` com `utmContent="estilos"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/estilos/page.tsx`

### OUT
- Os 30 códigos novos — são pauta dos próximos reels do Rafa
- Alterar a `/estilo` existente
- Ensinar a usar gerador de imagem ou vídeo específico
- Alterar componentes compartilhados, `/api/leads` ou layout

---

## Complexidade

**P (2 pontos).** Conteúdo pronto; o trabalho é organizar para copiar fácil.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Queimar a pauta dos próximos vídeos | **Alta** | AC10: só os 10 do vídeo |
| Confundir com a `/estilo` existente | Média | Rota no plural, assunto declarado no título |
| Pessoa tentar massinha no Claude e achar que não funciona | Média | AC6: a ressalva vem antes do gate |
| Código copiado pela metade | Média | AC4: botão por código, não um bloco só |

---

## Definition of Done

- [x] Os 11 ACs conferidos
- [x] `lint` e `build` sem erro novo
- [x] Conferido no navegador, antes e depois do gate
- [x] Conferido que os 30 extras não vazaram
- [ ] Aprovação explícita antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-23 | @mestre | Story criada a partir do documento do Rafa; escopo limitado a 10 para não queimar pauta |
| 2026-11-23 | @produto | Validação 10/10 (GO) |
| 2026-11-23 | @desenvolvedor | Página implementada |
| 2026-11-23 | @qualidade | QA PASS 11/11 |

## QA Results

**Verdict: PASS** — 11/11.

**Antes do gate:** ressalva "Lego, CGI e massinha" ✅, ordem imagem-antes-de-animar ✅,
5 campos ✅, códigos e prompt-base escondidos ✅.

**Depois do gate:** prompt-base ✅, **10/10 códigos** ✅, 11 botões de copiar (1 do prompt-base
+ 10 individuais) ✅, dica de HTML/SVG ✅.

**AC10 — os 30 extras não vazaram:** busca por `Claymation`, `Ukiyo-e`, `Voxel Art`, `Synthwave`
e `Chibi` no HTML servido: **0 ocorrências de cada**.

**Observação:** a página nova nasceu já com o pop-up da Black Box (Story 101), sem configuração
nenhuma — confirma que o layout raiz cobre também as páginas criadas daqui em diante.
