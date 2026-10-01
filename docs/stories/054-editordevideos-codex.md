# Story 054 — Página /editordevideos2 (o mesmo prompt, agora dentro do ChatGPT)

**Status:** Done

## Descrição

Nova página isca standalone em `/editordevideos2` (produção:
`www.sowsales.com.br/xquads/editordevideos2`), com o **mesmo Prompt Mestre Editor V3** da Story 047,
mas por um caminho muito mais curto: o **plugin oficial do Remotion para o Codex**, instalável dentro
do próprio ChatGPT.

`source = "editordevideos2-page"`.

## Correção de rumo (21/09/2026)

A primeira leitura do pedido foi **errada**: entendi "refaça essa página" como reescrever a
`/editordevideos` no lugar. O dono corrigiu — a página original continua como está, e o caminho do
ChatGPT vira **página nova**.

A `/editordevideos` foi restaurada ao estado publicado com `git checkout` e conferida: aviso
original, pré-requisitos de terminal e pipeline de cinco etapas todos de volta, e nenhum resíduo do
passo a passo do ChatGPT. Nenhuma alteração pendente nela.

## As duas páginas, lado a lado

| | `/editordevideos` (Story 047) | `/editordevideos2` (esta) |
|---|---|---|
| Caminho | Agente de terminal | Plugin dentro do ChatGPT |
| Pré-requisitos | FFmpeg, Whisper, Node, Remotion à mão | Instalar um plugin |
| Público | Quem já tem ambiente montado | Quem assina ChatGPT |
| Prompt | O mesmo | O mesmo |

As duas devem se referenciar: são o mesmo destino por estradas diferentes.

## Fatos verificados (21/09/2026)

| Fato | Fonte |
|---|---|
| ChatGPT Work lançado em 09/07/2026, com modo próprio no aplicativo | Cobertura de imprensa |
| Diretório com mais de 1.400 plugins, instalação pelo modo Work | Cobertura de imprensa |
| Plugin chama-se **"Remotion"**; instala em Plugins → buscar → instalar | Documentação oficial do Remotion |
| Após instalar, recomenda-se **novo chat** e digitar `$remotion` no prompt | Documentação oficial do Remotion |
| O plugin traz as **Remotion Agent Skills**: criar projeto, legendar, renderizar | Documentação oficial do Remotion |
| Existem plugins equivalentes para Claude Code, Cursor, Copilot e Kimi | Documentação oficial do Remotion |
| Codex disponível em todos os planos, inclusive gratuito, com limites por plano | Cobertura de imprensa |
| Remotion é gratuito para uso individual elegível; empresa exige licença paga | Documentação de licenciamento do Remotion |

## Critérios de Aceite

- **AC1** — Rota **nova** `/editordevideos2` (`src/app/editordevideos2/page.tsx`), com `source="editordevideos2-page"` e `utmContent="editordevideos2"`. A `/editordevideos` **não pode ser tocada**.
- **AC2** — Parte aberta com os **6 passos** na ordem dada pelo dono: entrar no ChatGPT, modo Work, Plugins, buscar Remotion, instalar, subir o vídeo com o prompt.
- **AC3** — Cada passo enriquecido com o detalhe da documentação oficial, sem contrariar a sequência do dono.
- **AC4** — A página nova **não repete** o aviso "não roda colando no chat", que é verdadeiro na página original e falso nesta.
- **AC5** — Parte aberta informa: o plugin vive no **aplicativo de computador** do ChatGPT, e o Remotion é gratuito para uso individual mas cobra licença de empresa.
- **AC6** — Parte aberta menciona os plugins equivalentes para Claude Code e Cursor, **e faz cross-link para a `/editordevideos`**, que é a rota de quem prefere terminal.
- **AC7** — Prompt mantido **íntegro**, idêntico ao arquivo original, verificado por `diff`.
- **AC8** — Cópia com fallback de clipboard preservada.
- **AC9** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, 6 passos, observações, prompt íntegro, cross-link para a original.
**OUT:** **alterar a `/editordevideos` de qualquer forma**; mudar o texto do prompt; inventar preço de
licença; afirmar que funciona no ChatGPT do navegador, o que a documentação do plugin não sustenta.

## Riscos

- **R1 (médio)** — Interface do ChatGPT muda e os passos desatualizam. *Mitigação:* data de checagem visível.
- **R2 (médio)** — Pessoa usa comercialmente sem saber da licença do Remotion. *Mitigação:* AC5.
- **R3 (baixo)** — Quem já usava a versão de terminal se sente órfão. *Mitigação:* AC6.
- **R4 (baixo)** — Perder o prompt ao copiá-lo para a página nova. *Mitigação:* AC7 com `diff`.
- **R5 (médio)** — As duas páginas confundirem quem chega. *Mitigação:* AC6, com cada uma apontando para a outra.

## Complexidade

**S (pequena).** Reescrita de conteúdo, com o prompt preservado.

## Valor de negócio

Amplia muito o público da isca: sai de "quem tem terminal montado" para "quem assina ChatGPT". O
prompt, que é o ativo real, continua o mesmo.

## Definition of Done

- `/editordevideos` com os 6 passos, aviso antigo removido, prompt idêntico ao original.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-21** — Draft criado por @mestre — Story 054
- **2026-09-21** — Validada por @produto: **GO 10/10**. O caminho descrito pelo dono foi confirmado em fonte oficial antes de virar passo a passo, e a verificação expôs que o aviso central da página atual ficou factualmente errado, o que justifica a reescrita por si só. Rota e chaves de rastreio preservadas. Draft → **Ready**.
- **2026-09-21** — Implementada por @desenvolvedor. Página reescrita preservando o bloco `PROMPT` por extração programática, em vez de redigitá-lo.
- **2026-09-21** — QA por @qualidade: **PASS.**
  - **AC7 verificado por `diff`**: prompt **idêntico byte a byte** ao arquivo original (`19.364` caracteres, 210 linhas). Confirmado também no DOM renderizado, mesma contagem.
  - **Nota de método**: a primeira tentativa de extrair o bloco cortou em 1.056 caracteres, porque o delimitador `` `; `` aparece dentro do próprio prompt como crase escapada. Corrigido usando o marcador da constante seguinte. Sem essa conferência, a página teria ido ao ar com 5% do prompt.
  - **AC1 verificado**: rota mantida, `source="editordevideos-page"` e `utmContent="editordevideos"` intactos.
  - **AC2 verificado**: os 6 passos renderizados na ordem exata dada pelo dono.
  - **AC4 verificado**: nenhuma ocorrência de "não roda colando no chat" no arquivo.
  - **AC5 e AC6 verificados**: licença do Remotion com remissão a remotion.pro, e alternativas para Claude Code e Cursor presentes.
  - Data de checagem visível. Lint limpo, `npm run build` verde.

## File List

- `src/app/editordevideos/page.tsx`
- `docs/stories/054-editordevideos-codex.md`
- **2026-09-21** — **Correção de rumo pelo dono:** não era para substituir a página existente, e sim criar uma nova. A `/editordevideos` foi restaurada ao estado publicado e conferida. Story reorientada: AC1, AC4, AC6 e escopo reescritos; risco R5 acrescentado.
- **2026-09-21** — Implementada por @desenvolvedor: `src/app/editordevideos2/page.tsx`. Prompt copiado da página original por extração programática, não redigitado. Cross-link acrescentado nas duas direções — única alteração feita na `/editordevideos`, de 16 linhas, verificada por `git diff --stat`.
- **2026-09-21** — QA por @qualidade: **PASS.**
  - **AC7 verificado nas duas páginas**: o prompt é idêntico byte a byte ao arquivo original em `/editordevideos` e em `/editordevideos2` (19.364 caracteres cada, confirmado também no DOM renderizado).
  - **AC1 verificado**: rota nova criada; a original conserva seu aviso "Isso não roda colando no chat", seus pré-requisitos de terminal e o pipeline de cinco etapas.
  - **AC2 verificado**: os 6 passos na ordem dada pelo dono.
  - **AC6 verificado**: `/editordevideos2` aponta para `/editordevideos` e vice-versa.
  - Lint limpo nas duas, `npm run build` verde, ambas as rotas geradas.

## File List

- `src/app/editordevideos2/page.tsx` (novo)
- `src/app/editordevideos/page.tsx` (apenas o bloco de cross-link)
- `docs/stories/054-editordevideos-codex.md`
- **2026-10-01** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-10-01** — Publicada e verificada em produção: responde 200, LeadGate ativo e conteúdo protegido antes do lead.
