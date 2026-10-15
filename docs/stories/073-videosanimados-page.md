# Story 073 — Página /videosanimados: de um áudio gravado no celular a um vídeo animado

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-14

---

## Descrição

Rafa pediu uma página nova na rota `/videosanimados` com **um passo a passo e nada mais**:
como transformar um áudio gravado no celular em um vídeo animado.

O conteúdo foi ditado por ele e tem quatro passos:

1. Abrir o aplicativo de gravação de voz do celular e gravar o áudio que vai ser o áudio do
   vídeo — explicando a promoção, o que é a empresa, etc.
2. Entrar no Instagram, buscar por "motion" e encontrar um vídeo cujo estilo de edição agrade.
3. No **Claude**, subir a gravação do áudio e colar o link do vídeo.
4. Pedir com um prompt — que ele autorizou melhorar: *"pode melhorar esse prompt que eu vou te
   falar"*. O dele: "Analise... Crie um vídeo animado e profissional utilizando o Motion Design,
   utilizando o áudio que está em anexo e seguindo padrão de edição desse vídeo do Instagram."

### Ponto esclarecido antes da implementação

No ditado, o nome da ferramenta do passo 3 se perdeu ("Dentro do **suba**, a gravação do seu
áudio"). Perguntado, Rafa confirmou: **Claude**. Nenhum outro passo foi inferido.

### Por que a página não existe ainda

| Página existente | Assunto | Sobrepõe? |
|---|---|---|
| `/logoanimada` | Prompt para animar uma logo | Não — é logo, não é fala |
| `/promptsdevideo` | Prompts de animação por código | Não — não parte de áudio |
| `/editordevideosia` | Direção de edição de vídeo gravado | Não — monta material filmado |

O fluxo áudio → vídeo animado não existe em nenhuma rota.

---

## Acceptance Criteria

**AC1** — Existe a rota `/videosanimados` renderizando sem erro de build e sem erro no console.

**AC2** — A página contém **os quatro passos ditados, na ordem ditada**, sem passo inventado
e sem seção de conteúdo que não foi pedida.

**AC3** — O passo 3 nomeia o Claude como a ferramenta.

**AC4** — O passo 4 traz o prompt melhorado, começando por análise do vídeo de referência,
mantendo a intenção do original: motion design + áudio anexo + padrão de edição da referência.

**AC5** — O prompt tem botão de copiar, com tratamento de falha do clipboard (`try/catch`),
para não repetir o débito conhecido do `useCopyWithLead`.

**AC6** — O passo a passo e o prompt ficam atrás do `LeadGate` compartilhado, com
`source="videosanimados-page"`.

**AC7** — O formulário traz os quatro campos do padrão atual, incluindo "Qual sua área de atuação?".

**AC8** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia local.

**AC9** — `SalesCta` presente com `utmContent="videosanimados"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/videosanimados/page.tsx`
- Uso dos componentes já existentes: `LeadGate`, `SalesCta`, `hasCapturedLead`

### OUT
- Qualquer alteração em `LeadGate`, `SalesCta`, `/api/leads` ou no layout
- Correção do débito do `useCopyWithLead` nas outras 16 páginas (segue registrado, não autorizado)
- Seções extras não pedidas: comparativo de ferramentas, galeria de exemplos, preços
- Mexer em qualquer página existente

---

## Dependências

- `LeadGate` (`src/components/lead-gate.tsx`) — já com o campo de área (Story 066)
- `SalesCta` (`src/components/sales-cta.tsx`)
- `hasCapturedLead` (`src/hooks/use-copy-with-lead.ts`)

Nenhuma dependência nova.

---

## Complexidade

**P (2 pontos).** Página de passo a passo, padrão repetido no projeto. O conteúdo veio pronto
do Rafa; o trabalho é escrever o prompt e montar.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Claude não abrir o link do Instagram (exige login na maior parte dos casos) | **Alta** | Uma linha dentro do próprio passo 3: se não abrir, salvar o vídeo e subir o arquivo. Sem criar seção nova |
| Expectativa de que o vídeo sai pronto em um clique | Média | O prompt pede o roteiro visual para aprovação antes de produzir |
| Adicionar conteúdo além do pedido | Média | AC2 e o OUT barram. Rafa já deu esse feedback antes |
| Botão de copiar falhar em silêncio | Média | AC5: `try/catch` com aviso visível |
| Falso negativo na validação por `curl` (conteúdo atrás do gate) | Média | Validar abrindo no navegador |

---

## Definition of Done

- [x] Rota `/videosanimados` compila e responde em local
- [x] Todos os 9 ACs conferidos
- [x] `npm run lint` sem erro novo
- [x] `npm run build` passando
- [x] Prévia aberta no navegador e mostrada ao Rafa
- [ ] Aprovação explícita do Rafa antes de qualquer push
- [ ] Após publicar: rota responde 200 em produção e o gate funciona

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-14 | @mestre | Story criada; ferramenta do passo 3 confirmada com o Rafa (Claude) |
| 2026-10-14 | @produto | Validação 10/10 (GO). Status Draft → Ready |
| 2026-10-14 | @desenvolvedor | Página implementada; lint e build passando |
| 2026-10-14 | @qualidade | QA PASS 9/9. Gate verificado por IPv6 (fora do bypass): 4 campos presentes, prompt e passos não vazam. Clipboard testado nos dois caminhos — clique real copia, falha mostra aviso. Console limpo |

## QA Results

**Verdict: PASS** — 9/9 ACs.

| AC | Como foi verificado | Resultado |
|---|---|---|
| AC1 | `npm run build` + navegador + console | ✅ rota gerada, console sem erro |
| AC2 | Leitura dos 4 passos contra o ditado | ✅ ordem e conteúdo iguais, sem seção extra |
| AC3 | Passo 3 nomeia a ferramenta | ✅ "Abra o Claude" |
| AC4 | Prompt começa por análise, mantém motion design + áudio + referência | ✅ |
| AC5 | Clique real (copiou, sem aviso) e clique sem gesto (NotAllowedError capturado, aviso visível) | ✅ os dois caminhos |
| AC6 | Acesso por `http://[::1]:3002` — fora da lista de bypass | ✅ prompt e passos não aparecem no DOM |
| AC7 | Leitura dos campos do formulário | ✅ nome, e-mail, telefone, área de atuação |
| AC8 | Comparação localhost × IPv6 | ✅ tarja só em localhost |
| AC9 | `grep` no código | ✅ `utmContent="videosanimados"` + assinatura |

**Observação de teste:** a validação por `curl` deu falso negativo outra vez (conteúdo renderizado no cliente). A verificação válida foi pelo navegador, como nas stories 058/059.
