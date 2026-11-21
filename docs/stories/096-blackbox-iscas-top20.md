# Story 096: Iscas Black Box IA dos vídeos do TOP20

Status: InReview (local, sem deploy)
Branch: feat/blackbox-iscas
Mapa: /Users/rafa/OpenBot/Shared/projetos/instagram/top10/MAPA-PAGINAS.md

## Escopo
Cópia `-bf` da isca de cada vídeo (sem LeadGate, sem /api/leads, noindex, BlackBoxTopBar + 3 BlackBoxBlock + BlackBoxPromos, CTAs com utm_content = slug). Originais intocadas. Duas páginas novas (sem original).

## Páginas
produtividade-bf, codigossecretos-bf2, familia-bf, emprego-bf, claudelinkedin-bf, insta-bf, vendedor24h-bf (nova), playcanvas-bf (nova). Modelo: codigossecretos-bf (story 095).

## Checklist
- [x] Cópias criadas e testadas a 390 e 1440 (0 POST, console limpo, sem rolagem horizontal)
- [x] tsc e eslint 0
- [ ] QA em lotes
- [ ] Rafa aprova; deploy só com "pode subir"

## Notas

- Modal de 60% passou a dizer "metade da página" (componente compartilhado).

## Decisão do Rafa (21/11)
- "Comenta IA" vai para a página de vendas do Xquads (raxo.com.br/xquads); a captura é só o funil do ManyChat. As cópias downloads-bf a downloads-bf8 (commit efb5d0e) e o componente downloads-bf-content foram removidos da branch. Os vídeos #4, #9, #10, #13, #16, #17, #18 e #20 não têm página -bf.
