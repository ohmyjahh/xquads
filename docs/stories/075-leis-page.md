# Story 075 — Página /leis: toda a legislação brasileira em Markdown

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-26

---

## Descrição

Rafa pediu uma página para distribuir `github.com/ctresb/leis`: a legislação brasileira
convertida de fontes oficiais para Markdown, com cabeçalho estruturado em cada arquivo.

Para o público do Xquads, o valor não é "ler lei" — é ter uma base que um agente de IA consegue
consultar. Cada arquivo traz cabeçalho YAML com tipo, número, data, ementa, situação e o link da
fonte. É material pronto para alimentar um agente, coisa que PDF do Diário Oficial não é.

### Verificação da fonte (feita antes desta story)

| Item | Resultado |
|---|---|
| Repositório existe | Sim — 1.779 estrelas |
| Projeto vivo | Criado em 15/10/2026, último envio em 21/10/2026 |
| Acervo | 323.849 normas na base inicial |
| Cobertura | Constituição, federal, estadual/distrital, municipal, reguladores, jurisprudência, tratados |
| Licença | **MIT** (o GitHub marca NOASSERTION; o arquivo `LICENSE` é MIT, de João Davi) |
| Tamanho | **~4,2 GB** — relevante para quem for clonar |
| Histórico | 323.851 commits, um por norma, 5.414 signatários |

### Os dois pontos que mudam a página

**1. O tamanho.** São ~4,2 GB, quase tudo histórico. Mandar "clone o repositório" sem avisar faz
a pessoa travar a internet dela à toa. A página precisa dar o caminho leve primeiro.

**2. O aviso do próprio autor.** O README diz, em destaque, que os textos têm caráter informativo,
**não substituem a publicação no Diário Oficial**, são conversão automática e OCR, e que se deve
conferir a fonte antes de citar. Numa página sobre leis isso não é rodapé: é informação que muda
o que a pessoa pode fazer com o material. Vai **antes** do gate, como os requisitos de sistema na
`/gravacao` (Story 072).

---

## Acceptance Criteria

**AC1** — Existe a rota `/leis` renderizando sem erro de build e sem erro no console.

**AC2** — A página explica o acervo em linguagem de quem vai usar com IA, não em linguagem
jurídica nem traduzindo o README.

**AC3** — O aviso de que o material **não substitui a fonte oficial** (conversão automática/OCR,
conferir antes de citar) aparece **antes** do gate, com destaque visual próprio.

**AC4** — O tamanho (~4,2 GB) é informado, e o conteúdo liberado oferece o caminho leve
(clone raso e navegação pelo GitHub) além do clone completo.

**AC5** — O conteúdo liberado fica atrás do `LeadGate` compartilhado, com `source="leis-page"`.

**AC6** — O formulário traz os quatro campos do padrão atual, incluindo "Qual sua área de atuação?".

**AC7** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia local.

**AC8** — A licença MIT é informada junto do link, com a data da conferência, e o crédito ao autor.

**AC9** — Comandos exibidos têm botão de copiar com `try/catch` e aviso visível em caso de falha
(mesmo padrão da Story 073).

**AC10** — `SalesCta` presente com `utmContent="leis"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/leis/page.tsx`
- Uso dos componentes já existentes: `LeadGate`, `SalesCta`, `hasCapturedLead`

### OUT
- Qualquer alteração em `LeadGate`, `SalesCta`, `/api/leads` ou no layout
- Orientação jurídica de qualquer espécie, ou exemplo de como aplicar uma lei
- Tutorial de montagem de RAG ou de agente jurídico — a página entrega a base, não o sistema
- Reproduzir texto de norma na página
- Mexer em qualquer página existente

---

## Dependências

- `LeadGate` (`src/components/lead-gate.tsx`)
- `SalesCta` (`src/components/sales-cta.tsx`)
- `hasCapturedLead` (`src/hooks/use-copy-with-lead.ts`)

Nenhuma dependência nova.

---

## Complexidade

**P (2 pontos).** Padrão já repetido no projeto. O trabalho foi a verificação e decidir o que
destacar.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Pessoa tratar o material como fonte oficial e citar errado | **Alta** | AC3: aviso antes do gate, com destaque |
| Clonar 4,2 GB sem saber | Alta | AC4: tamanho informado e clone raso oferecido primeiro |
| Página parecer consultoria jurídica | Média | OUT proíbe; a página fala do acervo, nunca do conteúdo das normas |
| Projeto novo (11 dias) mudar de estrutura | Média | Data de conferência no rodapé do link |
| Falso negativo na validação por `curl` | Média | Validar abrindo no navegador |

---

## Definition of Done

- [x] Rota `/leis` compila e responde em local
- [x] Todos os 10 ACs conferidos
- [x] `npm run lint` sem erro novo
- [x] `npm run build` passando
- [x] Prévia aberta no navegador e mostrada ao Rafa
- [ ] Aprovação explícita do Rafa antes de qualquer push
- [ ] Após publicar: rota responde 200 em produção e o gate funciona

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-26 | @mestre | Story criada com verificação de fonte anexada |
| 2026-10-26 | @produto | Validação 10/10 (GO). Status Draft → Ready |
| 2026-10-26 | @desenvolvedor | Página implementada; os três comandos executados de verdade antes de publicar |
| 2026-10-26 | @qualidade | QA PASS 10/10 |

## QA Results

**Verdict: PASS** — 10/10 ACs.

| AC | Como foi verificado | Resultado |
|---|---|---|
| AC1 | `npm run build` + navegador | ✅ rota gerada, console limpo |
| AC2 | Leitura da página | ✅ fala de base para agente, não de direito |
| AC3 | Acesso por `[::1]` (fora do bypass) | ✅ o aviso do Diário Oficial aparece **antes** do gate |
| AC4 | Idem | ✅ "~4 GB" antes do gate; três caminhos no conteúdo liberado |
| AC5 | Idem | ✅ `source="leis-page"`; comandos não vazam |
| AC6 | Leitura dos campos | ✅ nome, e-mail, telefone, área |
| AC7 | localhost × `[::1]` | ✅ tarja só em localhost |
| AC8 | `grep` | ✅ MIT, João Davi, data da conferência |
| AC9 | `try/catch` no CopyButton | ✅ mesmo padrão da 073 |
| AC10 | `grep` | ✅ `utmContent="leis"` + assinatura |

### Os comandos foram executados antes de publicar

| Teste | Resultado |
|---|---|
| `git clone --depth 1 --filter=blob:none --sparse` | ✅ saída 0, **197 MB** |
| `git sparse-checkout set federal/leis-ordinarias` | ✅ saída 0, 16.784 arquivos `.md`, **959 MB** |
| Cabeçalho dos arquivos | ✅ confere com o README (`titulo`, `tipo`, `numero`, `data`, `ementa`, `revogada`, `versao_texto`) |

**Correção feita por causa do teste:** o texto dizia que a terceira opção era "a mais leve"
sem número. A medição real deu ~960 MB para a pasta do exemplo — muito menos que os 4,2 GB, mas
longe de "leve". O texto passou a informar o número medido. Diretório de teste removido ao final.
