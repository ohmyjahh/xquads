# Story 055 — Página /editordevideosia (prompt mestre de direção de edição)

**Status:** Done

## Descrição

Nova página isca standalone em `/editordevideosia` (produção:
`www.sowsales.com.br/xquads/editordevideosia`), entregando o **Prompt mestre de edição — Rafa**:
um documento que coloca a IA no papel de diretor de edição, motion designer e finalizador.

`source = "editordevideosia-page"`.

## Como se diferencia das páginas de editor já existentes

| Página | Natureza do prompt |
|---|---|
| `/editordevideos` (Story 047) | **Pipeline técnico**: FFmpeg, Whisper e Remotion, com comandos e etapas de execução |
| `/editordevideosia` (esta) | **Direção criativa**: linguagem visual, vocabulário de cenas, motion que explica, tipografia, som e revisão |

O primeiro diz *como montar a esteira*. Este diz *que decisões tomar* dentro dela. São complementares
e devem se referenciar.

Traço marcante deste prompt: ele é **agnóstico de ferramenta**. Cita Remotion e Higgsfield como
opções no briefing, não como exigência, o que o torna utilizável em editor tradicional também.

## Critérios de Aceite

- **AC1** — Rota `/editordevideosia` (`src/app/editordevideosia/page.tsx`) standalone.
- **AC2** — Accent `#CAFF42`, o verde-lima que o próprio prompt define como cor de marca. Footer `@rafa.grandi`.
- **AC3** — Parte **aberta**: como usar (copiar, anexar o vídeo, preencher o briefing), o índice das 11 seções e o que o prompt entrega.
- **AC4** — Parte **gated**: o prompt completo, com botão de copiar e fallback de clipboard.
- **AC5** — **Apenas o conteúdo entre INÍCIO DO PROMPT e FIM DO PROMPT** entra no bloco copiável. A instrução de uso que vem antes é texto da página, não do prompt.
- **AC6** — Prompt reproduzido **byte a byte**, verificado por `diff` contra o arquivo de origem.
- **AC7** — A parte aberta registra que o prompt já traz padrões prontos (cor de marca, intensidade, entrega), de modo que funciona sem preencher todos os campos do briefing.
- **AC8** — Cross-link para `/editordevideos`, sem prometer nada sobre páginas ainda não publicadas.
- **AC9** — Lead `source="editordevideosia-page"`, bypass só em localhost, `SalesCta` com `utmContent="editordevideosia"`.
- **AC10** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, prompt íntegro, índice das seções.
**OUT:** alterar o texto do prompt; tocar em `/editordevideos` ou `/editordevideos2`; exigir ferramenta
específica que o prompt trata como opcional.

## Riscos

- **R1 (médio)** — Três páginas de editor podem confundir. *Mitigação:* AC8 e a distinção explícita entre pipeline técnico e direção criativa.
- **R2 (baixo)** — Pessoa achar que precisa preencher todo o briefing antes de usar. *Mitigação:* AC7.
- **R3 (baixo)** — Perda de trecho do prompt na transcrição. *Mitigação:* AC6 com `diff`.

## Complexidade

**S (pequena).** Página de conteúdo no padrão consolidado.

## Valor de negócio

É o prompt mais autoral do acervo: carrega preferências de direção do dono, como legenda sem caixa de
fundo e plano secundário a cada 15 segundos. Diferencia das listas genéricas de prompt que circulam.

## Definition of Done

- `/editordevideosia` em dev, prompt liberado só após lead ou em localhost.
- Prompt idêntico ao original por `diff`. Índice das 11 seções na parte aberta.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-30** — Draft criado por @mestre — Story 055
- **2026-09-30** — Validada por @produto: **GO 10/10**. Recorte claro frente às páginas de editor existentes, prompt salvo em arquivo antes de virar código para permitir verificação por `diff`, e o corte correto do que é prompt e do que é instrução de uso tratado como AC. Draft → **Ready**.
- **2026-09-30** — Implementada por @desenvolvedor: `src/app/editordevideosia/page.tsx`, accent `#CAFF42`, LeadGate `source="editordevideosia-page"`. Prompt salvo antes em arquivo e embutido com escape programático.
- **2026-09-30** — QA por @qualidade: **PASS.**
  - **AC6 verificado por `diff`**: prompt **idêntico byte a byte** ao arquivo de origem — 14.949 caracteres, 170 linhas, mesma contagem confirmada no DOM renderizado.
  - **AC5 verificado**: o bloco copiável começa em "Atue como diretor de edição" e termina em "renderizado e verificado."; a instrução de uso e os marcadores INÍCIO/FIM DO PROMPT **não** entraram no texto copiável, apenas viraram conteúdo da página.
  - **AC3 verificado**: as 11 seções listadas na parte aberta, mais os três passos de uso.
  - **AC8 verificado**: cross-link para `/editordevideos` presente. Nenhuma menção a `/editordevideos2`, que segue não publicada.
  - Lint limpo, `npm run build` verde, rota `/editordevideosia` gerada.
  - **Nenhuma alteração** em `/editordevideos` ou `/editordevideos2` nesta story.

## File List

- `src/app/editordevideosia/page.tsx`
- `docs/stories/055-editordevideosia-page.md`
- **2026-10-01** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
