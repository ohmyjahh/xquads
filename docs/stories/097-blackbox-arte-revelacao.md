# Story 097: Arte "Revelação" nos pop-ups e cards da Black Box

Status: InReview (local, sem deploy)
Branch: feat/blackbox-iscas
Pedido: Alfa/Rafa (21/11). Rafa escolheu a arte 01 Revelação (Renan, /Users/rafa/OpenBot/Shared/entregas/2026-11-21-blackbox-artes/).

## Escopo
- Pop-ups (6 s, 60% e saída no desktop) e os 3 cards inline passam a ser a imagem Revelação, inteira clicável para blackbox-cadastro com utm_content = slug; alt "Black Box IA, sexta 27/11: quero participar".
- Cards: 1080x1350 no mobile e 1600x600 no desktop (`<picture>`), lazy, caixa com proporção fixa (sem salto de layout). Pop-up sempre 1080x1350, com X, Esc e clique fora.
- Barra do topo e card de canto mantidos.
- Componente compartilhado `src/components/black-box-promos.tsx` (vale para as 9 páginas -bf). Arquivos: `public/blackbox/01-revelacao-{mobile,desktop}.webp`.

## Checklist
- [x] codigossecretos-bf testada a 390 e 1440 (0 POST, 0 erro, sem rolagem horizontal)
- [x] 8 demais páginas -bf testadas
- [ ] QA
- [ ] Rafa aprova; deploy só com "pode subir"
