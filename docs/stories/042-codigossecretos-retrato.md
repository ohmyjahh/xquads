# Story 042 — Quatro códigos novos em Retrato na /codigossecretos

**Status:** Done

## Descrição

Ampliar a biblioteca da `/codigossecretos` com quatro códigos pedidos pelo dono, todos na
categoria **Retrato**: `cinematic`, `pixar`, `poster`, `avatar`. A página passa de 50 para
54 códigos, e Retrato passa de 5 para 9 itens, virando a segunda maior categoria.

## Critérios de Aceite

- **AC1** — Quatro entradas novas no array `CODES`, categoria `Retrato`: `/cinematic`, `/pixar`, `/poster`, `/avatar`.
- **AC2** — Nome de cada código funciona na frase montada pelo botão de copiar ("Crie uma imagem de {nome em minúsculas} para [PRODUTO, PESSOA OU IDEIA]").
- **AC3** — Textos visíveis passam a usar **"+50 códigos"** em vez de número exato (decisão do dono, 27/08), para que futuras inclusões não exijam edição de copy. Na faixa de prévia local o número sai da frase, porque "os +50 códigos ficam protegidos" leria mal. O contador da biblioteca continua dinâmico (`{visible.length}`) e mostra o total real.
- **AC4** — `source` e `utmContent` **permanecem** `50-codigos-chatgpt`. São chaves de rastreio dos leads já capturados; renomear quebraria a série histórica.
- **AC5** — `/cinematic` recebe recorte distinto do `/cinematicportrait` existente, para não virar item duplicado na mesma categoria.
- **AC6** — Nenhum código existente removido, renomeado ou reclassificado.
- **AC7** — `npm run build` verde e lint limpo.

## Decisões de conteúdo

- **`/cinematic` vs `/cinematicportrait`** — o existente descreve "pessoa como personagem de filme", em plano fechado. O novo fica com o still de cena: plano aberto, pessoa dentro do ambiente, luz e clima narrativo. Recortes diferentes, sem sobreposição.
- **`/pixar`** — o código mantém o nome pedido, porque é o atalho que a pessoa vai digitar. O nome e a descrição do card evitam cravar o estúdio, já que prompt citando marca de estúdio costuma ser recusado pelos geradores de imagem. O resultado entregue é o mesmo.
- **`/poster`** — recorte de pôster com a pessoa como protagonista. Não colide com `/movieposter` (Editorial, capa de filme como peça gráfica) nem com `/launchposter` (Publicidade, anúncio de lançamento de produto).

## Escopo

**IN:** quatro entradas novas e os quatro textos de contagem.
**OUT:** reorganizar categorias existentes (proposta separada, recusada pelo dono nesta rodada);
alterar `source`/`utmContent`; mexer em qualquer outro código da biblioteca.

## Riscos

- **R1 (baixo)** — Contagem visível e contagem real saírem de sincronia. *Mitigação:* AC3 mais verificação por contagem programática no QA.
- **R2 (baixo)** — Sobreposição percebida entre `/cinematic` e `/cinematicportrait`. *Mitigação:* AC5.

## Complexidade

**XS.** Alteração de dados e quatro strings.

## Definition of Done

- 54 códigos na biblioteca, 9 em Retrato, contagem visível conferindo com a real.
- Build verde. Mostrado ao dono antes do push.

## Change Log

- **2026-08-27** — Draft criado por @mestre — Story 042
- **2026-08-27** — Validada por @produto: **GO 9/10**. Escopo mínimo e bem delimitado, ACs verificáveis por contagem, decisões de conteúdo justificadas, chave de rastreio preservada. Único desconto: story sem seção de valor de negócio explícita, aceitável em alteração XS a pedido direto do dono. Draft → **Ready**.
- **2026-08-27** — Implementada por @desenvolvedor. Quatro entradas novas em Retrato, inseridas após `/fashioncampaign`.
- **2026-08-27** — Mudança de rumo do dono durante a execução: em vez de "54 códigos", os textos visíveis passam a "+50 códigos". Aplicado antes do commit.
- **2026-08-27** — Ajuste em `/pixar`: o nome era "Personagem de animação 3D", e o `toLowerCase()` do botão de copiar gerava "personagem de animação 3d" na frase. Renomeado para "Personagem de animação", com o 3D movido para a descrição.
- **2026-08-27** — QA por @qualidade: **PASS.**
  - Biblioteca com **54 códigos**, Retrato com **9**, os quatro novos presentes e filtráveis.
  - Contador dinâmico da biblioteca exibe 54 e acompanha sozinho as próximas inclusões.
  - `h1` com "+50 códigos"; `source` e `utmContent` intactos em `50-codigos-chatgpt` (AC4).
  - Frase montada pelo botão de copiar conferida nos quatro: sai natural em todos.
  - Nenhum código existente alterado; os 10 filtros de categoria seguem os mesmos.
  - Lint limpo, `npm run build` verde.

## File List

- `src/app/codigossecretos/page.tsx`
- `docs/stories/042-codigossecretos-retrato.md`
- **2026-08-27** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-08-27** — Publicada junto com a Story 043. "+50 códigos" confirmado no HTML de produção da `/codigossecretos`.
