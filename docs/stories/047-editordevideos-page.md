# Story 047 — Página /editordevideos (prompt mestre de edição de vídeo por código)

**Status:** Done

## Descrição

Nova página isca standalone em `/editordevideos` (produção: `www.sowsales.com.br/xquads/editordevideos`),
entregando o **Prompt Mestre Editor V3**: um documento que instrui uma IA com acesso ao terminal a
pegar um vídeo cru de câmera e devolver um Reels vertical 1080x1920 editado, com cortes, legendas
sincronizadas, punch-ins, motion graphics, SFX medidos e end card.

Pipeline do prompt: FFmpeg (análise e áudio) + Whisper (transcrição com timestamp por palavra) +
Remotion (montagem visual e render). Nada de editor gráfico.

`source = "editordevideos-page"`.

## O risco central desta página

O prompt **não funciona colado no chat do ChatGPT ou do Claude**. Ele pressupõe um agente que executa
comandos, lê e escreve arquivos e roda render local. Quem colar no chat comum recebe uma explicação
do que seria feito, não um vídeo.

Além disso exige instalação prévia: FFmpeg, Whisper (Python), Node 18+ e um projeto Remotion.

Isca que entrega frustração garantida não é isca, é dano de reputação. Por isso os pré-requisitos e a
exigência de agente com terminal ficam na **parte aberta**, antes do formulário, no mesmo padrão
adotado na Story 044 (aviso de idioma) e na Story 045 (avisos de risco).

## Critérios de Aceite

- **AC1** — Rota `/editordevideos` (`src/app/editordevideos/page.tsx`) standalone.
- **AC2** — Accent `#FB7185`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte **aberta**: o que entra e o que sai, a exigência de agente com terminal, os quatro pré-requisitos de instalação e o resumo do pipeline em 5 etapas.
- **AC4** — Parte **gated**: o prompt completo, íntegro, com botão de copiar.
- **AC5** — Prompt reproduzido **byte a byte** a partir do arquivo enviado pelo dono, sem cortes, resumos ou reescritas. Verificação por `diff`.
- **AC6** — Cópia com fallback de clipboard e aviso visível em caso de falha, no padrão da Story 040.
- **AC7** — Nenhuma promessa de "vídeo pronto em um clique" nem de que funciona sem instalar nada.
- **AC8** — Lead `source="editordevideos-page"`, bypass só em localhost, `SalesCta` com `utmContent="editordevideos"`.
- **AC9** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, prompt íntegro, pré-requisitos declarados, resumo do pipeline.
**OUT:** tutorial de instalação de FFmpeg, Whisper ou Remotion; editar o conteúdo do prompt;
prometer resultado sem os pré-requisitos.

## Riscos

- **R1 (alto)** — Pessoa cola no chat comum e conclui que o prompt não presta. *Mitigação:* AC3 e AC7.
- **R2 (médio)** — Barreira técnica alta reduz conversão. *Mitigação:* aceita. Público qualificado vale mais que volume frustrado nesta isca.
- **R3 (baixo)** — O prompt contém crases e blocos de código que quebram template literal em JS. *Mitigação:* escape programático de `\``, `${` e `\\` na geração do arquivo, com verificação por `diff` depois.

## Complexidade

**S (pequena).** Página de conteúdo no padrão, com atenção ao escape do prompt.

## Valor de negócio

Isca de altíssima qualificação: quem executa esse pipeline já tem terminal, já usa agente e está a um
passo de comprar formação. Conecta com `/timedeagentes` e `/ferramentas`, que tratam do mesmo público.

## Definition of Done

- `/editordevideos` em dev, prompt liberado só após lead ou em localhost.
- Pré-requisitos na parte aberta. Prompt idêntico ao arquivo original por `diff`.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-09** — Draft criado por @mestre — Story 047
- **2026-09-09** — Validada por @produto: **GO 10/10**. O risco principal foi identificado antes de escrever a página e tratado por AC, não por bom senso: um prompt que exige terminal, entregue a um público que pode colar no chat, precisa avisar antes do lead, e não depois. Escopo veda tanto editar o prompt quanto prometer o que ele não faz. Draft → **Ready**.
- **2026-09-09** — Implementada por @desenvolvedor: `src/app/editordevideos/page.tsx`, accent `#FB7185`, LeadGate `source="editordevideos-page"`. Prompt gerado com escape programático de `\``, `${` e `\\`.
- **2026-09-09** — QA por @qualidade: **PASS.**
  - **AC5 verificado por `diff`**: o prompt foi extraído do arquivo gerado, desescapado na ordem inversa e comparado com `/Users/rafa/Downloads/PROMPTMESTREEDITORV3.md`. **Idêntico byte a byte** — 19.364 caracteres, 210 linhas. Confirmado também no DOM renderizado: mesmos 19.364 caracteres e 210 linhas.
  - **AC3/AC7 verificados por posição no JSX**: aviso "não roda colando no chat" (25472) e pré-requisitos (26085) vêm antes do `LeadGate` (27791); o prompt (28756) vem depois. Varredura por promessa indevida ("um clique", "sem instalar nada") não encontrou nenhuma.
  - Lint limpo, `npm run build` verde, rota gerada.
  - **Incidente de ambiente**: o `~/.claude/launch.json` havia sido substituído por outra sessão, e a porta 3001 passou a apontar para um Remotion Studio de outro projeto. O `preview_start` subiu o servidor errado, o que foi percebido pelo nome retornado (`remotion-studio-vsl`). A configuração existente foi **preservada** e a do xquads adicionada na porta **3002**, sem sobrescrever nada. Preview do xquads agora em `localhost:3002`.

## File List

- `src/app/editordevideos/page.tsx`
- `docs/stories/047-editordevideos-page.md`
- **2026-09-09** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-09-09** — Publicada. `/xquads/editordevideos` responde 200, LeadGate ativo, prompt protegido (nenhum bloco `<pre>` no DOM antes do lead), aviso "não roda colando no chat", os quatro pré-requisitos e o pipeline visíveis sem preencher formulário. Auto-deploy do Vercel disparou pelo push.
