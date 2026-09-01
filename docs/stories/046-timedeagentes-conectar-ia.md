# Story 046 — Passo 2 da /timedeagentes ganha a etapa de conectar uma IA

**Status:** Done

## Descrição

O passo 2 da `/timedeagentes` ensina a instalar o Hermes e ligar o WhatsApp, mas passa por cima de
um pré-requisito: **o Hermes não pensa sozinho**. Ele é o corpo, e precisa de um modelo de linguagem
conectado para funcionar. Quem seguir a página como está instala, liga o gateway e descobre a
dependência só quando o agente não responde.

Adiciona ao passo 2 uma etapa de conexão do provedor de IA, com os quatro caminhos citados pelo dono
(Nous, Anthropic, DeepSeek e Ollama) e os comandos oficiais de cada um.

## Termos do pedido decodificados

| Como veio | O que é | Confirmação |
|---|---|---|
| "UNA" | **Nous Portal** | Provedor do próprio time que faz o Hermes; um login cobre 300+ modelos |
| "Iantropic" | **Anthropic** | Provedor nativo, com API key ou OAuth |
| "Olama" | **Ollama** | Modelo local, conectado como endpoint customizado |
| DeepSeek | **DeepSeek** | Provedor nativo |

Os quatro constam da lista oficial de provedores do Hermes, que hoje passa de 40 nomes.

## Critérios de Aceite

- **AC1** — Nova etapa dentro do **passo 2**, posicionada entre a configuração e o gateway, que é a ordem real: instalar, dar cérebro, ligar no WhatsApp.
- **AC2** — Os quatro caminhos aparecem com o que diferencia cada um, não como lista de nomes.
- **AC3** — Comandos reproduzidos **exatamente** da documentação oficial. Nenhum deduzido.
- **AC4** — O requisito de RAM do Ollama local é declarado. Rodar modelo local sem hardware é a frustração mais previsível deste passo.
- **AC5** — **Nenhum nome de modelo da Anthropic citado.** A doc do Hermes traz um identificador de versão que não confere com a linha atual de modelos, e um nome errado quebra o comando de quem copia. O caminho fica no comando de autenticação, que não depende de versão.
- **AC6** — Nenhuma alteração nos passos 1, 3, 4 e 5, nem nos avisos da parte aberta.
- **AC7** — `npm run build` verde e lint limpo.

## Escopo

**IN:** etapa nova no passo 2 e os quatro caminhos de provedor.
**OUT:** tutorial de instalação do Ollama em si; comparação de preço entre provedores; citar nome de modelo com versão; alterar o restante da página.

## Riscos

- **R1 (médio)** — Leitor tenta rodar Ollama local sem RAM e conclui que a ferramenta não presta. *Mitigação:* AC4.
- **R2 (baixo)** — Identificador de modelo envelhece entre versões. *Mitigação:* AC5 evita citar qualquer um.

## Complexidade

**XS.** Um bloco de conteúdo em página existente.

## Definition of Done

- Etapa visível dentro do passo 2, com os quatro caminhos e comandos conferidos.
- Build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-01** — Draft criado por @mestre — Story 046
- **2026-09-01** — Validada por @produto: **GO 9/10**. Corrige uma lacuna real que deixaria o leitor travado no meio do passo 2; os quatro provedores foram confirmados na lista oficial antes de entrar; a decisão de não citar identificador de modelo protege contra o erro mais provável de copiar e colar. Desconto por ser ajuste sem valor de negócio próprio, herdado da Story 045. Draft → **Ready**.
- **2026-09-01** — Implementada por @desenvolvedor. Etapa "Antes de seguir: o Hermes não pensa sozinho" mais os quatro provedores, inseridos entre a configuração e o gateway.
- **2026-09-01** — QA por @qualidade: **PASS.**
  - **AC1 verificado por posição no texto renderizado**: Configurar (2363) → aviso do cérebro (2559) → Nous Portal (2803) → Anthropic (3055) → DeepSeek (3270) → Ollama (3500) → Ligar o gateway (4044). A ordem lógica está correta.
  - **AC3 auditado**: os 9 itens da documentação oficial (comandos, endpoint do Ollama e caminho do arquivo de chaves) conferidos um a um contra o arquivo.
  - **AC4 verificado**: o requisito de 24 GB de RAM aparece no card do Ollama.
  - **AC5 verificado por regex**: nenhum identificador `claude-*-N` na página. A doc do Hermes cita um que não confere com a linha atual de modelos, e copiá-lo entregaria um comando que falha.
  - **AC6 verificado**: passos 3, 4 e 5 intactos; avisos da parte aberta inalterados.
  - Grafias conferidas no DOM: Nous Portal, Anthropic, DeepSeek e Ollama.
  - Lint limpo, `npm run build` verde.
  - Observação de processo: dois screenshots intermediários mostraram área vazia, o que levantou suspeita de quebra de layout. Investigado por medição de altura dos elementos: nenhum elemento anômalo. Era artefato de captura durante rolagem suave, confirmado por screenshot com a página parada.

## File List

- `src/app/timedeagentes/page.tsx`
- `docs/stories/046-timedeagentes-conectar-ia.md`
- **2026-09-01** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-09-01** — Publicada. Deploy `xquads-ky021ydnp` no ar.
  - Verificação inicial por `curl` deu falso negativo: o conteúdo novo fica atrás do gate e não existe no HTML servido, só no bundle. Confirmado de duas formas: a string presente no chunk `4674dd8311360d9c.js` em produção, e a página aberta no navegador com o gate destravado.
  - Com o gate aberto em produção: etapa nova visível, quatro provedores presentes, ordem correta (Configurar → aviso do cérebro → Nous → Anthropic → DeepSeek → Ollama → gateway), requisito de RAM declarado, passos 3 a 5 intactos.
