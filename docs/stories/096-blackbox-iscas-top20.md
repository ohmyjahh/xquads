# Story 096: Iscas Black Box IA dos vídeos do TOP20

Status: InReview (local, sem deploy)
Branch: feat/blackbox-iscas
Mapa: /Users/rafa/OpenBot/Shared/projetos/instagram/top10/MAPA-PAGINAS.md

## Escopo
Cópia `-bf` da isca de cada vídeo (sem LeadGate, sem /api/leads, noindex, BlackBoxTopBar + 3 BlackBoxBlock + BlackBoxPromos, CTAs com utm_content = slug). Originais intocadas. Duas páginas novas (sem original).

## Páginas
produtividade-bf, codigossecretos-bf2, familia-bf, emprego-bf, claudelinkedin-bf, insta-bf, downloads-bf a downloads-bf8 (componente compartilhado downloads-bf-content), vendedor24h-bf (nova), playcanvas-bf (nova). Modelo: codigossecretos-bf (story 095).

## Checklist
- [x] Cópias criadas e testadas a 390 e 1440 (0 POST, console limpo, sem rolagem horizontal)
- [x] tsc e eslint 0
- [ ] QA em lotes
- [ ] Rafa aprova; deploy só com "pode subir"

## Notas
- Na cópia de downloads os botões abrem direto o ZIP e os repositórios públicos que a original já cita (a original só abria o formulário).
- Modal de 60% passou a dizer "metade da página" (componente compartilhado).
