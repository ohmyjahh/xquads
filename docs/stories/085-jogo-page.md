# Story 085 - Página /jogo: 5 pedidos para montar um jogo 3D com o Claude Fable 5.2 e o Higgsfield

**Status:** InReview (aguardando QA – Funis de isca)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-10
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

## Descrição

Pedido do Alfa (10/11/2026) para o time do Instagram: isca do vídeo "Fable 3D" (`projetos/instagram/roteiros/2026-11-10-fable-3d.md`, seção 5). Palavra: JOGO. Slug `jogo` (o briefing sugeria `fable-3d`; o Alfa pediu `jogo`). Livre em `src/app`.

### Verificação da fonte (conferida em 10/11/2026)

| Item | Valor conferido | Fonte |
|---|---|---|
| Lançamento | Claude Fable 5.2 e Mythos 5.2, 9/11/2026 | anthropic.com/claude-fable-and-mythos-5-2 |
| Velocidade | "up to 30% faster than Claude Fable 5.1" | mesma |
| Preço da API | US$ 8 / US$ 40 por milhão de tokens (não usado na página) | mesma e anthropic.com/claude/fable |
| URL do conector | `https://mcp.higgsfield.ai/mcp`; conexão por OAuth, sem chave de API | central de ajuda Higgsfield |
| Créditos no MCP | "MCP always uses credits", mesmo com acesso ilimitado na web | central de ajuda Higgsfield |
| Exemplos com Fable 5.2 | página do MCP lista fluxos "Video Games", Three.js, "Build a dragon-riding game" | higgsfield.ai/mcp |
| Teste de 3 dias | 3 dias, cartão necessário, vira assinatura se não cancelar | fontes secundárias (mydealz e artigo do Pasquale Pillitteri, via busca e leitura); NÃO está na página oficial lida |

**Não entrou na página** (não confirmado em fonte oficial): "ilimitado" no teste, preço do Ultra em euros, 40% de desconto, "1 milhão de tokens" de contexto, caminho de menu "Configurações → Conectores", "2 a 15 s". O aviso de cartão e renovação está escrito como "segundo as fontes que conferi" e manda confirmar na tela de ativação.

### Escolhas de copy

- **Regra do Rafa (06/11):** nenhum aviso antes do formulário. O pedido do Alfa ("deixar claro que o teste pede cartão e vira assinatura") está no PRIMEIRO bloco depois do gate, em destaque, antes dos passos. Antes do gate não há menção ao teste grátis nem ao cartão. Título mudou de "3 dias grátis" para não prometer grátis antes do aviso.
- Os 5 prompts foram escritos por mim a partir da lista do briefing (modelo 3D, cenário, personagem, mecânicas, multiplayer) e do que a página do MCP mostra. Não são texto do vídeo; o Rafa aprova na prévia.
- Sem promessa de "jogo pronto em um pedido": a página diz que o resultado depende de plano e créditos.
- Cor `#A78BFA`.

### Verificação de sobreposição
Nenhuma isca de jogo 3D ou Higgsfield. Sem duplicação.

### Acceptance Criteria

- [ ] AC1 rota `/jogo` sem erro de build nem de console
- [ ] AC2 linguagem de quem não é desenvolvedor
- [ ] AC3 antes do gate: só título, subtítulo e as 5 etapas; nada de teste grátis, cartão, custo ou aviso
- [ ] AC4 conteúdo atrás do `LeadGate` com `source="jogo-page"` e 5 campos
- [ ] AC5 primeiro bloco liberado deixa claro: pede cartão, vira assinatura se não cancelar, confira a tela de ativação
- [ ] AC6 5 pedidos com botão de copiar (try/catch) e botão do endereço do conector
- [ ] AC7 cada fato do bloco "Sobre o Fable 5.2" bate com a Anthropic; nada da lista "não entrou"
- [ ] AC8 links (Higgsfield MCP, anúncio da Anthropic) respondem 200
- [ ] AC9 em `localhost` aparece destravada, com "PRÉVIA LOCAL"
- [ ] AC10 `SalesCta` com `utmContent="jogo"` e assinatura `@rafa.grandi`
- [ ] AC11 sem travessão

## Escopo
IN: `src/app/jogo/page.tsx`. OUT: componentes compartilhados, `/api/leads`, config, outras páginas.

## Riscos
Condições do teste mudam (fonte só secundária); aviso redigido com ressalva. Prompts não testados de ponta a ponta (não rodei o Higgsfield).

## DoD
AC1 a AC11, QA PASS, OK do Rafa via Alfa, e a ordem página, ManyChat, post.

## File List
- `src/app/jogo/page.tsx`
- `docs/stories/085-jogo-page.md`

## Change Log
- 2026-11-10: story criada e página implementada (Diego). Não publicada.
- 2026-11-10: ajustes da QA (CONCERNS J1, J2, J3): pedidos reescritos para o chat do Claude (artifact em HTML com Three.js; sem pasta nem servidor; o Pedido 5 virou dois jogadores na mesma tela, WASD e setas; o multiplayer online fica fora porque pede ambiente que rode servidor); bloco de aviso com ressalva "segundo as fontes que conferi (a página oficial não detalha)" e título "Leia antes de ativar"; passo 1 manda ver se o teste ainda existe; título "Os 5 pedidos que montam um jogo 3D" e nota de que os pedidos não são o original do vídeo.
