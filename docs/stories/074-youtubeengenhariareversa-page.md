# Story 074 — Página /youtubeengenhariareversa: captura e encaminha para a aula no YouTube

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-15

---

## Descrição

Rafa gravou uma aula no YouTube e quer uma página cujo único trabalho é **pegar os dados da
pessoa e encaminhá-la para o vídeo**. Não é uma página de conteúdo: é uma porta.

| | |
|---|---|
| Rota | `/youtubeengenhariareversa` |
| Destino | `https://www.youtube.com/watch?v=EFilkTPJgV4` |
| Título do vídeo | "Como usar o CLAUDE para Engenharia Reversa de qualquer APP" |
| Canal | Rafa Grandi (`youtube.com/@rafagrandii`) — confirmado pela API oembed do YouTube |

### Decisão técnica: por que `LeadGate` e não `LeadForm`

O projeto tem dois componentes de captura. O `LeadForm` é o que redireciona — seria o candidato
óbvio — mas ele tem a URL de destino **fixa no código** (`REDIRECT_URL`, a VSL da RAXO) e é usado
por 16 páginas. Torná-lo configurável mexeria num componente em produção para atender uma página.

O `LeadGate` chama `onUnlock()` **somente após o lead ser salvo com sucesso**
(`src/components/lead-gate.tsx:60`). A página pode redirecionar de dentro desse callback. Mesmo
resultado, sem tocar em nada compartilhado.

### Regra de quando redirecionar

| Situação | Comportamento | Por quê |
|---|---|---|
| Acabou de preencher o formulário | Redireciona sozinha | É o pedido do Rafa |
| Já tinha lead salvo (voltou na página) | Mostra o botão, sem redirecionar | Ela já pagou com os dados; jogar fora sem aviso é ruim |
| `localhost` (revisão) | Mostra o botão, sem redirecionar | Senão é impossível revisar a página |

Em todos os casos o botão para a aula fica visível, o que também cobre a hipótese de o
redirecionamento automático falhar.

---

## Acceptance Criteria

**AC1** — Existe a rota `/youtubeengenhariareversa` renderizando sem erro de build e sem erro
no console.

**AC2** — A página é enxuta: diz o que a pessoa vai assistir e captura. Sem passo a passo, sem
prompt, sem lista de recursos.

**AC3** — O formulário usa o `LeadGate` compartilhado com `source="youtube-engenharia-reversa"`.

**AC4** — O formulário traz os quatro campos do padrão atual, incluindo "Qual sua área de atuação?".

**AC5** — Ao enviar o formulário com sucesso, a pessoa é levada ao vídeo automaticamente.

**AC6** — Quem já tem lead salvo, e qualquer acesso em `localhost`, vê o botão para a aula **sem**
ser redirecionado.

**AC7** — O link aponta exatamente para `https://www.youtube.com/watch?v=EFilkTPJgV4`, abrindo em
nova aba quando clicado no botão.

**AC8** — Nenhum arquivo compartilhado é alterado: `LeadGate`, `LeadForm`, `/api/leads`, layout.

**AC9** — `SalesCta` presente com `utmContent="youtubeengenhariareversa"` e assinatura
`@rafa.grandi`.

---

## Escopo

### IN
- `src/app/youtubeengenhariareversa/page.tsx`
- Uso dos componentes já existentes: `LeadGate`, `SalesCta`, `hasCapturedLead`

### OUT
- Tornar o `REDIRECT_URL` do `LeadForm` configurável (mexeria em 16 páginas em produção)
- Player do vídeo embutido na página — o pedido é encaminhar para o YouTube, onde a visualização conta
- Miniatura do vídeo: nenhuma página do projeto usa `<img>` e não há domínio externo liberado no `next.config`; não vale abrir essa porta por uma capa
- Resumo ou transcrição do vídeo
- Mexer em qualquer página existente

---

## Dependências

- `LeadGate` (`src/components/lead-gate.tsx`)
- `SalesCta` (`src/components/sales-cta.tsx`)
- `hasCapturedLead` (`src/hooks/use-copy-with-lead.ts`)

Nenhuma dependência nova.

---

## Complexidade

**PP (1 ponto).** É a página mais simples do conjunto: um texto curto, o gate e um redirecionamento.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Redirecionamento automático disparar em `localhost` e impedir a revisão | Alta | AC6: o redirect só acontece no caminho `formUnlocked` |
| Pessoa com lead salvo ser jogada ao YouTube ao abrir a página | Média | AC6: com lead salvo, mostra o botão |
| Redirecionamento falhar e a pessoa ficar sem destino | Média | O botão fica visível em todos os casos |
| Vídeo sair do ar ou virar privado | Baixa | Fora do controle do projeto; a página é trocada se acontecer |
| Alterar o `LeadForm` e afetar 16 páginas | Alta | AC8 proíbe; a solução não precisa dele |

---

## Definition of Done

- [x] Rota `/youtubeengenhariareversa` compila e responde em local
- [x] Todos os 9 ACs conferidos
- [x] `npm run lint` sem erro novo
- [x] `npm run build` passando
- [x] Redirecionamento testado no caminho real (formulário preenchido), sem poluir a planilha
- [x] Prévia aberta no navegador e mostrada ao Rafa
- [ ] Aprovação explícita do Rafa antes de qualquer push
- [ ] Após publicar: rota responde 200 em produção e o gate funciona

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-15 | @mestre | Story criada; vídeo e canal confirmados pela API oembed |
| 2026-10-15 | @produto | Validação 10/10 (GO). Status Draft → Ready |
| 2026-10-15 | @desenvolvedor | Página implementada; lint e build passando |
| 2026-10-15 | @qualidade | QA PASS 9/9. Os três caminhos de redirecionamento testados de verdade |

## QA Results

**Verdict: PASS** — 9/9 ACs.

| AC | Como foi verificado | Resultado |
|---|---|---|
| AC1 | `npm run build` + navegador | ✅ rota gerada, sem erro |
| AC2 | Leitura da página | ✅ só título, uma frase e o gate |
| AC3 | `grep` no código | ✅ `source="youtube-engenharia-reversa"` |
| AC4 | Formulário preenchido campo a campo por `[::1]` | ✅ nome, e-mail, telefone, área |
| AC5 | **Formulário enviado de verdade** | ✅ a aba foi para `youtube.com/watch?v=EFilkTPJgV4`, título "Como usar o CLAUDE para Engenharia Reversa de qualquer APP" |
| AC6 | Retorno à página com a flag de lead ativa, e acesso por `localhost` | ✅ ficou na página mostrando o botão nos dois casos |
| AC7 | `grep` da URL | ✅ uma única URL, exata |
| AC8 | `git status` | ✅ só os 2 arquivos novos |
| AC9 | `grep` no código | ✅ `utmContent` + assinatura |

**Isolamento do teste:** o `.env.local` não define `GOOGLE_SHEETS_WEBHOOK` nem `GENE_WEBHOOK_URL`.
Os logs do servidor confirmaram `skipping Sheets write` e `skipping GENE write` — o lead de teste
não saiu da máquina e a planilha de produção não foi tocada. A flag `xquads_lead_captured`
gravada durante o teste foi removida do navegador ao final.
