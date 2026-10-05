# Story 059 — /editordevideosia ganha o passo a passo de uso antes do prompt

**Status:** Done

## Descrição

O dono pediu um passo a passo antes do prompt na `/editordevideosia` (Story 055), com quatro etapas
de fluxo de trabalho: estudar referências, subir o vídeo cru, pedir uma prévia curta e só então
mandar editar o vídeo inteiro.

## Decisão: fundir, não empilhar

A página **já tem** um bloco chamado "Como usar", com três passos mecânicos (copiar o prompt, anexar
o vídeo, preencher o briefing). Acrescentar um segundo bloco de passos deixaria a página com duas
listas numeradas concorrentes, logo na abertura, sem o leitor saber qual seguir.

Os dois tratam de coisas diferentes: o existente é sobre **operar o prompt**; o pedido é sobre o
**fluxo de trabalho da edição**. O segundo contém o primeiro — anexar o vídeo e colar o prompt são o
passo 2 do fluxo novo.

Por isso os três passos antigos foram absorvidos pelos quatro novos, em vez de conviverem. É uma
alteração além do pedido literal, apresentada explicitamente ao dono, que pode mandar restaurar o
bloco antigo.

## O passo que carrega a ideia mais útil

O passo 3, da prévia de 10 segundos, é o de maior valor prático: evita processar a gravação inteira
para descobrir que o ritmo não era o desejado. Ele recebe destaque de texto, não só de posição.

## Critérios de Aceite

- **AC1** — Quatro passos na ordem dada pelo dono: referências, vídeo cru com o prompt, prévia curta, vídeo completo.
- **AC2** — O bloco "Como usar" de três passos deixa de existir; seu conteúdo é absorvido pelo passo 2.
- **AC3** — Os passos ficam na **parte aberta**, antes do gate e antes do prompt.
- **AC4** — O passo da prévia explicita o motivo: conferir o estilo e evitar gasto desnecessário de processamento.
- **AC5** — O restante da página permanece: aviso de padrões prontos, índice das 11 seções, gate, prompt e cross-link.
- **AC6** — O prompt continua **idêntico** ao original, verificado por `diff`.
- **AC7** — `npm run build` verde e lint limpo.

## Escopo

**IN:** o bloco de passos da `/editordevideosia`.
**OUT:** alterar o prompt; mexer em `/editordevideos` ou `/editordevideos2`; mudar o gate.

## Riscos

- **R1 (baixo)** — Dono preferir os dois blocos separados. *Mitigação:* decisão apresentada de forma explícita, com oferta de reverter.
- **R2 (baixo)** — Import de ícone órfão após a troca. *Mitigação:* verificação no QA.

## Complexidade

**XS.** Troca de um array de conteúdo e seu cabeçalho.

## Definition of Done

- Quatro passos na parte aberta, bloco antigo absorvido, prompt intacto.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-10-05** — Draft criado por @mestre — Story 059
- **2026-10-05** — Validada por @produto: **GO 9/10**. O pedido expôs uma colisão com um bloco existente, resolvida por fusão em vez de empilhamento, com a decisão registrada e reversível. Desconto por ser ajuste sem valor de negócio próprio. Draft → **Ready**.
- **2026-10-05** — Implementada por @desenvolvedor e verificada por @qualidade: **PASS.**
  - **AC1 verificado**: os quatro passos renderizados na ordem do dono — referências, vídeo cru com o prompt, prévia de 10 segundos, vídeo completo.
  - **AC2 verificado**: o bloco "Como usar" de três passos não existe mais; "Copie o prompt inteiro" foi absorvido pelo passo 2.
  - **AC3 verificado**: os passos abrem a página, antes do gate.
  - **AC4 verificado**: o passo 3 cita explicitamente a economia de tempo e de token.
  - **AC5 verificado**: aviso de padrões prontos, índice das 11 seções, gate, prompt e cross-link todos preservados.
  - **AC6 verificado**: prompt comparado com a versão do último commit publicado — **14.949 caracteres idênticos**. O arquivo de referência do scratchpad havia sido perdido com a troca de sessão, então a comparação usou `git show HEAD` como fonte, que é a versão no ar.
  - Imports conferidos um a um após a troca de ícones; nenhum órfão.
  - Lint limpo, `npm run build` verde.
  - **Nota de ambiente**: o `~/.claude/launch.json` foi novamente substituído por outra sessão, desta vez por `funil-raxo-static:8777`. A configuração existente foi preservada e a do xquads re-adicionada na porta 3002. Segunda ocorrência do mesmo problema (a primeira na Story 047).

## File List

- `src/app/editordevideosia/page.tsx`
- `docs/stories/059-editordevideosia-passo-a-passo.md`
- **2026-10-05** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-10-05** — Publicada e verificada em produção: os quatro passos renderizados na ordem correta, bloco antigo ausente, índice das 11 seções preservado, LeadGate ativo e prompt protegido.
  - **Falso alarme durante a verificação**: a primeira checagem acusou gate inativo e prompt exposto. A causa era a flag `xquads_lead_captured` que a própria sessão havia gravado no localStorage em verificações anteriores, nas Stories 057 e 058. Após remover a flag e recarregar, o gate voltou a aparecer normalmente. Nenhum problema real na página.
