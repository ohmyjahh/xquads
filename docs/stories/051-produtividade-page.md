# Story 051 — Página /produtividade (50 códigos de produtividade)

**Status:** Done

## Descrição

Nova página isca standalone em `/produtividade` (produção: `www.sowsales.com.br/xquads/produtividade`),
irmã da `/codigossecretos`. Mesma mecânica de biblioteca de códigos com busca, filtro por categoria
e cópia, mas com outro propósito.

Enquanto a `/codigossecretos` **gera imagem**, esta **transforma material em entregável**: a pessoa
anexa a foto de um livro, uma gravação de reunião ou um documento, escreve o código e recebe o
formato pronto. Exemplos dados pelo dono: `/mindmap` para mapa mental, `/sketchnote` para resumo
visual, `/flashcards` para cartões de estudo.

`source = "produtividade-page"`.

## Critérios de Aceite

- **AC1** — Rota `/produtividade` (`src/app/produtividade/page.tsx`) standalone.
- **AC2** — Accent `#818CF8`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — **50 códigos** distribuídos em 6 categorias, com busca e filtro, no padrão da `/codigossecretos`.
- **AC4** — Os três códigos citados pelo dono (`/mindmap`, `/sketchnote`, `/flashcards`) estão presentes.
- **AC5** — Botão de copiar monta um prompt completo, com campo para o material de entrada, campo para o formato de saída e instrução de perguntar antes de começar quando faltar informação.
- **AC6** — Nome de cada código encaixa naturalmente na frase montada pelo prompt. Verificação obrigatória item a item, como na Story 042, onde "3D" virou "3d" na frase.
- **AC7** — Nenhum código duplicado, e nenhum que colida com a biblioteca da `/codigossecretos`.
- **AC8** — Contador da biblioteca derivado do array, nunca escrito à mão.
- **AC9** — Lead `source="produtividade-page"`, bypass só em localhost, `SalesCta` com `utmContent="produtividade"`.
- **AC10** — `npm run build` verde e lint limpo.

## Categorias

| Categoria | Códigos | Exemplos |
|---|---|---|
| Estudo | 12 | `/mindmap`, `/sketchnote`, `/flashcards`, `/feynman` |
| Escrita | 8 | `/reescreve`, `/encurta`, `/titulos` |
| Reunião | 6 | `/ata`, `/acoes`, `/follow` |
| Análise | 8 | `/swot`, `/contrato`, `/riscos` |
| Planejamento | 8 | `/okr`, `/roadmap`, `/sprint` |
| Organização | 8 | `/tarefas`, `/agenda`, `/semana` |

## Decisão sobre a contagem

A `/codigossecretos` usa **"+50 códigos"** no título, por decisão do dono em 27/08, para que
inclusões futuras não exijam editar copy. Esta página entrega **exatamente 50**, então o título diz
50. Trocar para "+50" com 50 itens seria impreciso; a mudança fica disponível caso o dono prefira
padronizar. O contador dentro da biblioteca é dinâmico nos dois casos.

## Escopo

**IN:** página nova, 50 códigos, busca, filtro e cópia.
**OUT:** alterar a `/codigossecretos`; prometer que funciona em qualquer modelo sem anexo;
duplicar código já existente na página irmã.

## Riscos

- **R1 (médio)** — Código cujo nome não encaixa na frase do prompt, gerando texto torto. *Mitigação:* AC6 com verificação programática.
- **R2 (baixo)** — Sobreposição com a `/codigossecretos`. *Mitigação:* AC7 e propósitos distintos, geração de imagem contra transformação de material.

## Complexidade

**S (pequena).** Reaproveita o padrão da página irmã.

## Valor de negócio

A `/codigossecretos` funciona e o formato é validado. Esta amplia o mesmo mecanismo para um público
maior: estudante, quem faz reunião o dia inteiro e quem precisa organizar material. Menos nichado
que geração de imagem.

## Definition of Done

- 50 códigos em 6 categorias, busca e filtro funcionando, prompt conferido item a item.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-17** — Draft criado por @mestre — Story 051
- **2026-09-17** — Validada por @produto: **GO 9/10**. Formato já validado pela página irmã, escopo claro e AC de verificação da frase herdado de um erro real da Story 042. Desconto por depender de curadoria autoral dos 50 códigos, que só se prova no uso. Draft → **Ready**.
- **2026-09-17** — Implementada por @desenvolvedor: `src/app/produtividade/page.tsx`, accent `#818CF8`, LeadGate `source="produtividade-page"`.
- **2026-09-17** — QA por @qualidade: **PASS com 1 correção aplicada.**
  - **Correção (média) — AC6.** O template original montava `Faça um ${nome}`, e a concordância quebrava em feminino e plural: "Faça um flashcards", "Faça um matriz SWOT", "Faça um planilha estruturada", "Faça um sugestão de gráfico". Mesmo tipo de defeito da Story 042, onde `toLowerCase()` transformou "3D" em "3d". Corrigido com construção neutra, `A partir do material abaixo, entregue: ${nome}.`, que dispensa artigo. **As 50 frases foram geradas e lidas uma a uma** após a correção: todas saem naturais.
  - **AC3 e AC8 verificados**: 50 cards renderizados, contador dinâmico exibindo 50, 6 categorias mais "Todos" nos filtros.
  - **AC4 verificado**: `/mindmap`, `/sketchnote` e `/flashcards` presentes.
  - **AC7 verificado programaticamente**: nenhum código duplicado dentro da página e **nenhuma colisão** com a biblioteca da `/codigossecretos`.
  - Distribuição: Estudo 12, Escrita 8, Reunião 6, Análise 8, Planejamento 8, Organização 8.
  - Lint limpo, `npm run build` verde, rota `/produtividade` gerada.

## File List

- `src/app/produtividade/page.tsx`
- `docs/stories/051-produtividade-page.md`
- **2026-09-17** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-09-17** — Publicada. `/xquads/produtividade` responde 200, LeadGate ativo, os 50 códigos protegidos (nenhum card no DOM antes do lead), o passo a passo de uso e o exemplo `/mindmap` visíveis sem preencher formulário. Auto-deploy do Vercel disparou pelo push.
