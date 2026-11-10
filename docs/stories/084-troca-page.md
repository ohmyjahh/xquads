# Story 084 - Página /troca: prompts de troca de pessoa, roupa e objeto em vídeo (Seedance 2.0)

**Status:** Done (QA PASS em produção, commit `b3f1a10`, deploy `xquads-4vyzd0vr2`; teste de lead dispensado pelo Rafa em 10/11)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-10
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

## Descrição

Pedido do Alfa (10/11/2026) para o time do Instagram: isca do vídeo "SWAP" (`projetos/instagram/roteiros/2026-11-10-swap-ia.md`, seção 5). Palavra do vídeo: TROCA. Slug `troca` (o briefing sugeria `swap-ia`; o Alfa pediu `troca`, que também é a palavra do CTA). Livre em `src/app`.

### Verificação da fonte (conferida em 10/11/2026)

| Item | Valor conferido | Fonte |
|---|---|---|
| Edição de vídeo | "Provide a reference video and describe changes: replace an object, change a background, or alter the style. The model preserves the original motion and camera work" | replicate.com/bytedance/seedance-2.0 |
| Marcadores | `[Image1]`, `[Video1]`, `[Audio1]` (sem espaço; o briefing escrevia `[Video 1]`, corrigi pela fonte) | Replicate |
| Exemplo de prompt | "Replace the perfume in [Video1] with the face cream from [Image1], keeping all original motion." | Replicate |
| Limites | até 9 imagens, 3 vídeos e 3 áudios; vídeo de entrada de 2 a 15 s | Replicate e wiro.ai/models/bytedance/seedance-2-0-reference |
| Rosto | Wiro: "The provider may sometimes reject human faces". Guia de terceiros: política do ByteDance rejeita rosto humano fotorrealista, inclusive o do usuário | wiro.ai e lzyprompt.com (secundária) |
| Verbo de edição | guia de terceiros: "replace/continue" indica edição; se volta cena nova, tirar a palavra "reference" | lzyprompt.com (secundária) |
| Onde rodar | Replicate (existe) e Higgsfield MCP (higgsfield.ai/mcp, 200). Seedance aparece na central de ajuda da Higgsfield | páginas acima |

**A confirmar (fora da página):** qual ferramenta o @cindiezhu usou no original. A página não afirma isso.
Frase do roteiro "ninguém percebe que foi gerado" não foi usada (efeito, não medição).

### Escolhas de copy

- Prompts em inglês, no formato dos exemplos da fonte, com aviso dentro da página.
- Antes do gate: título, subtítulo e o que dá para trocar. Os limites (2 a 15 s, rosto) ficam depois do gate (regra do Rafa de 06/11).
- Cor `#F472B6` (nenhuma outra isca usa).

### Verificação de sobreposição

Nenhuma isca de troca de pessoa em vídeo. Próximas: `/editordevideosia`, `/videosanimados`, `/promptsdevideo`; não tratam de edição de vídeo existente com Seedance. Sem duplicação.

### Acceptance Criteria

- [x] AC1 rota `/troca` renderiza sem erro de build nem de console
- [x] AC2 linguagem de quem não é desenvolvedor
- [x] AC3 antes do gate: só título, subtítulo e "o que você consegue trocar"; nenhum prompt, limite ou aviso
- [x] AC4 conteúdo atrás do `LeadGate` com `source="troca-page"` e 5 campos
- [x] AC5 3 prompts com botão de copiar (try/catch com aviso de falha), marcadores `[Video1]` e `[Image1]`
- [x] AC6 limites e política de rosto conforme a tabela da fonte, sem afirmar o que a fonte não diz
- [x] AC7 links da Replicate e da Higgsfield respondem 200
- [x] AC8 em `localhost` aparece destravada, com "PRÉVIA LOCAL"
- [x] AC9 `SalesCta` com `utmContent="troca"` e assinatura `@rafa.grandi`
- [x] AC10 sem travessão

## Escopo
IN: `src/app/troca/page.tsx`. OUT: componentes compartilhados, `/api/leads`, config, outras páginas.

## Riscos
Fontes secundárias na política de rosto; modelo e política podem mudar.

## DoD
AC1 a AC10, QA PASS, OK do Rafa (via Alfa), ordem do Rafa: página aprovada, depois funil no ManyChat, depois post.

## File List
- `src/app/troca/page.tsx`
- `docs/stories/084-troca-page.md`

## Change Log
- 2026-11-10: story criada e página implementada (Diego). Não publicada.
- 2026-11-10: ajustes da QA (CONCERNS T1 e T2): limite de rosto no texto do Wiro ("ByteDance não aceita imagem nem vídeo de referência com rosto humano real no Seedance 2.0", use personagem estilizado, ilustração ou 3D); card "Troca a pessoa" virou "Troca o personagem"; link de "Onde rodar" trocado para higgsfield.ai/seedance/2.0 (200), sem afirmar que roda pelo MCP.
- 2026-11-10: publicada com o "pode subir" do Rafa (via Alfa). Commit `b3f1a10`, deploy `xquads-4vyzd0vr2`. Conferido em produção pelo Diego: 200, HTML sem nenhum termo de alerta antes do gate, 5 campos, `utm_content` correto, 390 px sem overflow, console limpo. Teste de lead (planilha + GENE CRM) dispensado pelo Rafa em 10/11: o caminho de captura desta origem não foi provado em produção.
- 2026-11-10: QA – Funis de isca deu PASS em produção (laudo `qa-troca-jogo-2026-11-10.md`, seção Produção). Story fechada como Done com a ressalva do teste de lead dispensado pelo Rafa.
