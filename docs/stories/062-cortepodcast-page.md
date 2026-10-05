# Story 062 — Página /cortepodcast (3 etapas e 2 prompts para tirar cortes de podcast)

**Status:** Done

## Descrição

Nova página isca standalone em `/cortepodcast` (produção: `www.sowsales.com.br/xquads/cortepodcast`),
com um método em **três etapas** e **dois prompts** para transformar episódio longo em cortes com
chance de viralizar.

Público: quem ganha dinheiro cortando podcast, inclusive campeonato de clipador.

`source = "cortepodcast-page"`.

## Estrutura definida pelo dono

| Etapa | O que é | Tem prompt? |
|---|---|---|
| **1. Garimpo** | Juntar cortes que viralizaram e mandar a IA estudar | **Sim** — prompt de estudo |
| **2. Extração** | Mandar o episódio longo e pedir os cortes, já editados numa pasta | **Sim** — prompt de extração |
| **3. Publicação** | Postar nas redes | **Não.** Só orientação |

## Decisões de conteúdo

**O prompt 2 mostra a lista antes de editar.** Mesma lógica da prévia aprovada na Story 059: a IA
apresenta os candidatos com nota e tempo, a pessoa escolhe, e só então edita. Evita processar
dezenas de cortes para descartar a maioria.

**O prompt 1 termina num arquivo.** O estudo vira `padroes-de-corte.md`, que o prompt 2 lê. Sem
isso, o segundo prompt não teria o que usar e a pessoa precisaria repetir o estudo a cada episódio.

**Dois pré-requisitos vão para a parte aberta:**
1. A IA precisa **conseguir assistir** aos cortes de referência. Link de rede social muitas vezes não
   abre para ela; arquivo baixado é mais confiável.
2. A etapa 2 entrega arquivos numa pasta, o que exige **agente com acesso ao sistema de arquivos**.
   No chat comum sai a lista de cortes, não os vídeos cortados.

Sem esses dois avisos, a pessoa tenta e conclui que o método não presta.

## Critérios de Aceite

- **AC1** — Rota `/cortepodcast` (`src/app/cortepodcast/page.tsx`) standalone.
- **AC2** — Accent `#FDE047`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Três etapas na ordem do dono, com a terceira marcada claramente como **sem prompt**.
- **AC4** — Parte aberta: as três etapas, o que cada uma faz e os dois pré-requisitos.
- **AC5** — Parte gated: os dois prompts, cada um com botão de copiar próprio e fallback de clipboard.
- **AC6** — Etapa 3 entrega orientação prática de publicação, não um prompt disfarçado.
- **AC7** — O prompt 1 produz um arquivo que o prompt 2 consome, e isso fica explícito nos dois.
- **AC8** — O prompt 2 pede aprovação da lista antes de editar.
- **AC9** — Nenhuma promessa de viralização garantida.
- **AC10** — Lead `source="cortepodcast-page"`, bypass só em localhost, `SalesCta` com `utmContent="cortepodcast"`.
- **AC11** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, três etapas, dois prompts, orientação de publicação.
**OUT:** prompt para a etapa 3; prometer viralização; ensinar a baixar vídeo de terceiro contornando
plataforma; nomear podcasts específicos.

## Riscos

- **R1 (médio)** — Pessoa tentar no chat comum e não receber os arquivos. *Mitigação:* AC4.
- **R2 (médio)** — Expectativa de viralização garantida. *Mitigação:* AC9; o método fala em chance, com nota e critério.
- **R3 (baixo)** — IA não conseguir abrir os vídeos de referência. *Mitigação:* AC4, e o prompt 1 manda avisar em vez de analisar pelo título.

## Complexidade

**S (pequena).** Página de conteúdo no padrão, com dois prompts autorais.

## Valor de negócio

Nicho com dinheiro circulando e barreira de entrada baixa. Conecta com `/editordevideosia`,
`/editordevideos` e `/youtubeskill`, formando um bloco de produção de vídeo.

## Definition of Done

- Três etapas, dois prompts copiáveis, etapa 3 sem prompt e com orientação real.
- Pré-requisitos na parte aberta. Nenhuma promessa de viralização.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-10-05** — Draft criado por @mestre — Story 062
- **2026-10-05** — Validada por @produto: **GO 10/10**. Estrutura fiel ao que o dono descreveu, incluindo a etapa sem prompt. Os dois prompts foram encadeados por um arquivo intermediário, e o segundo pede aprovação antes de editar, reaproveitando o padrão de prévia já validado na Story 059. Draft → **Ready**.
- **2026-10-05** — Implementada por @desenvolvedor: `src/app/cortepodcast/page.tsx`, accent `#FDE047`, LeadGate `source="cortepodcast-page"`.
- **2026-10-05** — QA por @qualidade: **PASS.**
  - **AC3 verificado**: três etapas com etiqueta visível — "tem prompt", "tem prompt", "sem prompt". A terceira traz "Aqui não tem prompt" no próprio título.
  - **AC5 verificado**: dois blocos de prompt, dois botões de copiar independentes, cada um com fallback.
  - **AC7 verificado**: `padroes-de-corte.md` aparece nos dois prompts — o primeiro grava, o segundo lê.
  - **AC8 verificado**: o prompt 2 contém "Me mostre essa lista antes de editar".
  - **AC9 verificado por varredura**: nenhuma promessa de viralização garantida.
  - **AC4 verificado**: os dois pré-requisitos presentes na parte aberta.
  - **AC6 verificado**: a etapa 3 entrega cinco orientações de publicação, incluindo a realimentação do manual com o que performar.
  - Lint limpo, `npm run build` verde, rota `/cortepodcast` gerada.

## File List

- `src/app/cortepodcast/page.tsx`
- `docs/stories/062-cortepodcast-page.md`
- **2026-10-05** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
