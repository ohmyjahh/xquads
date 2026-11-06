# Story 082 - Página /mirofish: passo a passo de instalação do MiroFish

**Status:** InReview (prévia em local feita; aguardando QA e "pode subir" do Rafa)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-06
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

---

## Descrição

Pedido do Rafa (06/11/2026, por chat): isca nova em `sowsales.com.br/xquads/mirofish` para o vídeo sobre o MiroFish, um motor de simulação com vários agentes de IA. O material a entregar é o passo a passo de como instalar e rodar, mais o link do repositório oficial:

`https://github.com/666ghj/MiroFish`

O visitante preenche o `LeadGate` padrão e só depois recebe os seis passos de instalação, a opção com Docker, o link do repositório e o link da demonstração oficial (`https://666ghj.github.io/mirofish-demo/`).

### Verificação da fonte (conferida em 06/11/2026)

Fonte única: o `README.md` do repositório oficial (branch `main`), lido na data acima. Repositório e demo respondem 200.

| Item | Valor conferido |
|---|---|
| O que é | Motor de inteligência de enxame para previsão; constrói um mundo paralelo com agentes e simula o cenário |
| Fluxo | Material de origem vira grafo de relações, milhares de agentes com memória e personalidade simulam, sai relatório e mundo interativo |
| Motor | OASIS (time CAMEL-AI), conforme a descrição do projeto |
| Apoio | Shanda Group (logo no topo do README) |
| Node.js | 18 ou mais novo |
| Python | maior ou igual a 3.11 e menor ou igual a 3.12 |
| Gerenciador Python | uv, versão mais recente |
| Variáveis obrigatórias | `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`, `ZEP_API_KEY` |
| Modelo sugerido | Qwen-plus, pela plataforma Bailian (Alibaba) |
| Aviso de custo | Consumo alto; o README recomenda simulações com menos de 40 rodadas |
| Zep Cloud | Cota grátis mensal descrita como suficiente para uso simples |
| Instalação | `npm run setup:all` (raiz, frontend e backend, cria o ambiente Python) |
| Subir | `npm run dev`; alternativas `npm run backend` e `npm run frontend` |
| Portas | 3000 (frontend) e 5001 (API) |
| Docker | `cp .env.example .env`, depois `docker compose up -d`; baixa a imagem e mapeia as mesmas portas |
| Licença | GNU Affero General Public License v3.0 (AGPL-3.0), conferida na API do GitHub |
| Comunidade | Badge de Discord no README (`http://discord.gg/ePf5aPaHnA`, respondendo 200) e canal QQ |
| Documentação | README em inglês, com versão em chinês |

Nenhuma versão, requisito, porta ou comando foi inventado. O passo de `git clone` é o único item derivado: o README começa a instalação assumindo que o código já está na máquina, então a página mostra o clone a partir da URL do próprio repositório.

### Verificação de sobreposição

`src/app/mirofish` não existia. Nenhuma outra isca do projeto fala de MiroFish, simulação multiagente ou do repositório `666ghj/MiroFish`. Sem duplicação.

### Decisões de copy (minhas, para o Rafa aprovar na prévia)

- Tom de tutorial para quem não é desenvolvedor, mas sem esconder que o caminho é terminal, chaves de API e custo.
- Cor `ACCENT` `#38BDF8`, que nenhuma outra isca usa.
- O bloco âmbar de pré-requisitos fica **depois do gate**, abrindo o conteúdo liberado: antes do formulário a página só apresenta o que a ferramenta faz. Decisão do Rafa em 06/11: nenhum alerta antes de a pessoa deixar os dados.
- Comandos com botão de copiar, um por passo. O botão trata falha de clipboard e avisa em vez de fingir que copiou.
- Sem promessa de resultado: a página não diz quanto custa uma simulação nem garante qualidade da previsão, porque o README não informa preço.
- Fim da página: `SalesCta` padrão (`utm_content=mirofish`) e assinatura `@rafa.grandi`.

### Pontos para o Rafa saber

1. É uma isca de tutorial, não de novidade fechada: o leitor sai com o que precisa para rodar, e o gargalo real é ter chave de LLM com crédito e conta no Zep.
2. O README é em inglês. A página traduz o essencial, mas quem for depurar erro vai cair em inglês e nas issues do repositório.
3. Custo é o risco de experiência: se o vídeo prometer simulação longa, alguém vai gastar crédito. A página repete o aviso das 40 rodadas.

---

## Acceptance Criteria

- AC1 rota `/mirofish` renderiza sem erro de build e sem erro no console
- AC2 linguagem de quem não é desenvolvedor, sem esconder que precisa de terminal
- AC3 pré-requisitos e avisos eliminatórios (Node, Python, uv, chave de LLM com custo, conta Zep, localhost) no conteúdo liberado, depois do gate
- AC4 conteúdo liberado atrás do `LeadGate` com `source="mirofish-page"`
- AC5 formulário com os 5 campos do padrão (nome, e-mail, telefone, área de atuação, faturamento mensal)
- AC6 seis passos de instalação mais opção Docker, com comandos copiáveis
- AC7 links do repositório e da demonstração corretos e respondendo
- AC8 em `localhost` aparece destravado, com a tarja "PRÉVIA LOCAL"
- AC9 `SalesCta` com `utmContent="mirofish"` e assinatura `@rafa.grandi`
- AC10 sem travessão em nenhum texto da página
- AC11 nenhuma versão, requisito, porta ou comando sem fonte no README oficial
- AC12 login automático de lead já capturado no navegador (comportamento padrão do molde)

## Escopo

**IN:** `src/app/mirofish/page.tsx`, esta story.
**OUT:** `LeadGate`, `SalesCta`, `/api/leads`, layout, pixel, `next.config`, outras páginas.

## Riscos

- Projeto de terceiro: se o README mudar (versão de Python, comando de setup, portas), a página fica desatualizada e precisa de story de ajuste. A data de conferência está impressa na página.
- Custo do modelo é do usuário: a página avisa, mas não controla. Quem ignorar o aviso das 40 rodadas pode gastar mais do que esperava.
- Teste de lead ponta a ponta só em produção (as variáveis do webhook não existem em local).
- **Risco aceito pelo Rafa (06/11):** quem não tem terminal ou não quer pagar consumo de modelo descobre isso só depois de preencher o formulário, porque o bloco de pré-requisitos fica no conteúdo liberado.

## Definition of Done

AC1 a AC12, QA independente PASS, "pode subir" do Rafa, validado em produção.

---

## Change Log

- 2026-11-06: story criada e página implementada em local (Diego). Fontes conferidas no README oficial na mesma data.
- 2026-11-06: checagens em local: `npx tsc --noEmit` e `npx eslint src/app/mirofish/page.tsx` sem erro, `npm run build` com `/mirofish` pré-renderizada, nenhum travessão nos dois arquivos. Ajuste feito na prévia: a URL do `LLM_BASE_URL` estourava a largura no mobile (17 px de rolagem horizontal); resolvido com `min-w-0` e `break-words` nos itens da lista do passo 3. Depois do ajuste a página fecha exatamente em 390 px.
- 2026-11-06: prévia conferida em local com o dev server na porta 3001: destravado em `localhost` com a tarja e sem gate, gate ativo em `192.168.0.5` (3 campos de texto e 2 seleções, nenhum passo vazando), envio vazio barrado pelo navegador sem POST em `/api/leads`, botão de copiar devolvendo "Copiado" com o comando certo na área de transferência, console limpo nas quatro telas. Prints em `/Users/rafa/OpenBot/Shared/dev/prints-mirofish/`.
- 2026-11-06: QA CONCERNS aplicada nos dois pontos pedidos. (1) O bloco do Docker agora manda fazer os passos 2 e 3 e rodar o comando no lugar dos passos 4 e 5, deixando claro que precisa do repositório clonado e do `.env` preenchido (AC6). (2) Os avisos de uso perderam as afirmações sem lastro: "Texto raso gera simulação rasa" virou "A qualidade da previsão depende do material que você envia", e o aviso de erro agora cita issues e o Discord do projeto, sem falar em ausência de suporte oficial (AC11). Licença AGPL-3.0 e Discord conferidos na API do GitHub e no README antes de citar.

- 2026-11-06: ordem corrigida a pedido do Rafa: o bloco "Antes de instalar: o que você vai precisar" saiu de antes do gate e passou a abrir o conteúdo liberado, logo depois do formulário. Antes do gate a página só apresenta o que a ferramenta faz. Risco aceito registrado em Riscos. Conferido em local e publicado com o "pode subir" do Rafa na sequência.

## File List
- `src/app/mirofish/page.tsx` (novo)
- `docs/stories/082-mirofish-page.md` (novo)
