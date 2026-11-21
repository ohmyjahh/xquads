# Story 095 - Página-modelo isca Black Box IA (/codigossecretos-bf)

**Status:** InReview (aguarda QA – Funis de isca e o OK do Rafa; nada publicado)
**Epic:** Task force Black Box IA (Black Friday, sexta 27/11/2026)
**Criada em:** 2026-11-21
**Implementa:** Diego. **QA:** QA – Funis de isca.

## Descrição

Pedido do Alfa (21/11/2026): modelo de página duplicada, para o Rafa aprovar antes de replicar nas outras 9 iscas dos Reels mais virais. Cada isca manda para https://rafagrandi.com.br/blackbox-cadastro com `utm_source=instagram&utm_medium=isca&utm_campaign=blackbox&utm_content=<slug>`.

Original: `/codigossecretos` (intocada). Cópia: `/codigossecretos-bf` (slug `codigossecretos-bf`), com `robots: noindex, nofollow` no layout.

## Critérios de aceite

- [x] AC1 Sem LeadGate e sem chamada a /api/leads: os 54 códigos abertos direto.
- [x] AC2 Barra fixa "BLACK BOX IA · SEXTA, 27/11" com contagem regressiva até 27/11 00:00 (-03:00).
- [x] AC3 Modal aos ~6 s; modal ao passar de 60% da página; saída (exit-intent) só no desktop; card flutuante no canto só no mobile; bloco no meio do conteúdo.
- [x] AC4 Todos fecháveis (X, clique fora, Esc nos modais); nenhum esconde o conteúdo de forma permanente; cada modal abre uma vez.
- [x] AC5 Visual da Black Box (fundo preto, texto creme, âmbar, Archivo), CTA "QUERO PARTICIPAR DA BLACK BOX", copy "maior desconto já feito" e "Grupo Secreto", sem preço.
- [x] AC6 Componente reutilizável `src/components/black-box-promos.tsx` (`BlackBoxTopBar`, `BlackBoxPromos`, `BlackBoxBlock`, `blackBoxUrl(slug)`), só recebe o slug.
- [x] AC7 Prints a 390 e 1440 px em `Shared/projetos/instagram/top10/modelo-pagina/`.

## File List

- `src/components/black-box-promos.tsx` (novo)
- `src/app/codigossecretos-bf/page.tsx` (novo)
- `src/app/codigossecretos-bf/layout.tsx` (novo)
- `docs/stories/095-blackbox-isca-modelo.md`

## Verificação local

tsc 0, eslint 0, 0 travessão. Prévia em `http://localhost:3001/xquads/codigossecretos-bf`: sem POST, console limpo, sem rolagem horizontal, 1 URL de CTA com utm_content=codigossecretos-bf.

## Change Log

- 2026-11-21: criada e implementada; enviada à QA.
