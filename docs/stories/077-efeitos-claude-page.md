# Story 077 — Página /efeitos: a skill de 17 efeitos de vídeo do Rafa

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-26

---

## Descrição

Rafa pediu uma página para `github.com/ohmyjahh/efeitos-claude` — **repositório dele**, criado
hoje. É uma skill do Claude Code: a pessoa arrasta um clipe no chat, digita `/efeito <nome>` e
recebe o vídeo editado, com o áudio original e o HDR preservado.

Diferença das páginas anteriores: aqui o material é **do próprio Rafa**. A página não apresenta
o trabalho de um terceiro, apresenta o dele — e isso pode ser dito.

### Verificação (feita antes desta story)

| Item | Resultado |
|---|---|
| Repositório | `ohmyjahh/efeitos-claude`, **público** ✅ |
| Licença | MIT |
| Criado | 26/10/2026 |
| Efeitos | 17, um comando cada |
| Previews | 17 imagens + 1 catálogo, **todas abrindo em `raw.githubusercontent.com`** (HTTP 200, `image/jpeg`) |

O repositório ser público é o que faz a página funcionar: se fosse privado, o visitante bateria
em 404 depois de entregar o e-mail.

### Decisão: esta página usa imagem

Nenhuma página do projeto usa `<img>` até hoje, e na Story 075 eu evitei justamente por isso.
Aqui a decisão se inverte: **o produto é visual**. Descrever "widgets de vidro fosco em volta da
cabeça" em texto não vende o que uma preview mostra em meio segundo.

As imagens vêm do próprio repositório, por `raw.githubusercontent.com`, em `<img>` nativa —
sem `next/image`, portanto **sem precisar liberar domínio no `next.config`** e sem risco de
configuração. Carregamento preguiçoso em tudo que não é a primeira imagem.

### Requisitos eliminatórios, antes do gate

Seguindo o padrão das Stories 072 e 075:

- Claude Code, Node 18+, ffmpeg e Python 3
- **macOS faz diferença real:** o recorte da pessoa usa o Vision do sistema. Fora do macOS a
  skill roda, mas os elementos ficam **na frente** da pessoa em vez de atrás — que é justamente
  a graça de boa parte dos efeitos

Quem não tem isso não deve gastar um lead para descobrir depois.

---

## Acceptance Criteria

**AC1** — Existe a rota `/efeitos` renderizando sem erro de build e sem erro no console.

**AC2** — A página mostra previews reais dos efeitos, servidas do próprio repositório.

**AC3** — As imagens usam `<img>` nativa (não `next/image`) e não exigem alteração de
`next.config`; todas as que não são a primeira usam `loading="lazy"`.

**AC4** — Os requisitos (Claude Code, Node, ffmpeg, Python) e a diferença do macOS aparecem
**antes** do gate.

**AC5** — Os 17 efeitos são listados com o comando de cada um.

**AC6** — O conteúdo liberado (comando de instalação e de uso) fica atrás do `LeadGate`, com
`source="efeitos-page"`.

**AC7** — O formulário traz os **cinco** campos do padrão atual, incluindo faturamento mensal
(Story 076).

**AC8** — O comando de instalação tem botão de copiar com `try/catch` e aviso em caso de falha.

**AC9** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia.

**AC10** — A licença MIT e a autoria do Rafa são informadas, com a data da conferência.

**AC11** — `SalesCta` presente com `utmContent="efeitos"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/efeitos/page.tsx`
- Uso dos componentes existentes: `LeadGate`, `SalesCta`, `hasCapturedLead`

### OUT
- Qualquer alteração em `LeadGate`, `SalesCta`, `/api/leads`, `next.config` ou layout
- Hospedar cópia das imagens neste repositório — elas vêm do repositório de origem
- Tutorial de Remotion ou de como criar efeito novo
- Mexer em qualquer página existente

---

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead`
- As previews publicadas em `ohmyjahh/efeitos-claude` — o repositório precisa continuar público

---

## Complexidade

**P (2 pontos).** Padrão conhecido; a novidade é a imagem.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Repositório virar privado e quebrar imagens e link | **Alta** | É do Rafa; será avisado de que a página depende de ele continuar público |
| Página pesada por causa das previews | Média | Catálogo único na vitrine; previews individuais com `loading="lazy"` |
| Pessoa fora do macOS esperar o recorte | Média | AC4: dito antes do gate, não depois |
| Lint reclamar de `<img>` (`no-img-element`) | Baixa | É aviso, não erro; se bloquear, desativar na linha com justificativa |
| Caminho das imagens mudar no repositório | Baixa | Conferido agora; data registrada |

---

## Definition of Done

- [x] Rota `/efeitos` compila e responde em local
- [x] Os 11 ACs conferidos
- [x] `npm run lint` sem erro novo
- [x] `npm run build` passando
- [x] **Todas as imagens carregando de fato**, conferidas no navegador
- [x] Prévia mostrada ao Rafa
- [ ] Aprovação explícita antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-26 | @mestre | Story criada; repositório, licença e previews verificados |
| 2026-10-26 | @produto | Validação 10/10 (GO). Status Draft → Ready |
| 2026-10-26 | @desenvolvedor | Página implementada com previews do repositório de origem |
| 2026-10-26 | @qualidade | QA PASS 11/11 |

## QA Results

**Verdict: PASS** — 11/11 ACs.

| AC | Verificação | Resultado |
|---|---|---|
| AC1 | build + navegador + console | ✅ console sem erro |
| AC2 | previews servidas do repositório | ✅ |
| AC3 | `<img>` nativa, `next.config` intocado, `lazy` | ✅ 7/7 imagens, `lazy` em todas menos a primeira |
| AC4 | acesso por `[::1]` | ✅ requisitos e a ressalva do macOS **antes** do gate |
| AC5 | contagem no texto renderizado | ✅ **17/17** comandos listados |
| AC6 | idem | ✅ `source="efeitos-page"`; `setup.sh` não vaza |
| AC7 | leitura dos campos | ✅ **5 campos**, incluindo faturamento (Story 076) |
| AC8 | `try/catch` no CopyButton | ✅ |
| AC9 | localhost × `[::1]` | ✅ tarja só em localhost |
| AC10 | `grep` | ✅ MIT + data |
| AC11 | `grep` | ✅ `utmContent="efeitos"` + assinatura |

### Imagens, conferidas uma a uma

Rolagem forçada para resolver o `lazy`, depois `naturalWidth` de cada `<img>`:

| Arquivo | Carregou | Largura |
|---|---|---|
| catalogo.jpg | ✅ | 1690 px |
| glass-widgets, documentary, orbit, spotlight, kallaway-split, rabbit-hole | ✅ | 540 px cada |

**Quebradas: nenhuma.** `lint` não acusou a `<img>` — o `eslint-disable-next-line` ficou por
precaução e pode ser removido num próximo passe.
