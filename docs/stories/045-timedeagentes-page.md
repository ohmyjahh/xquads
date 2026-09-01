# Story 045 — Página /timedeagentes (5 passos para montar um time de agentes autônomos com Hermes)

**Status:** Done

## Descrição

Nova página isca standalone em `/timedeagentes` (produção: `www.sowsales.com.br/xquads/timedeagentes`),
em formato de passo a passo com **5 etapas**, definidas pelo dono, para sair do zero até ter um
agente autônomo rodando e respondendo no WhatsApp.

A ferramenta central é o **Hermes Agent**, da Nous Research: agente autônomo open source em Python,
com learning loop e gateway de mensagens próprio. Encaixa nos 5 passos pedidos, em especial o
passo 3, que corresponde ao mecanismo real de aprendizado da ferramenta e não a uma metáfora.

`source = "timedeagentes-page"`.

## Fatos confirmados (checagem em 01/09/2026)

| Fato | Fonte |
|---|---|
| Hermes Agent é da **Nous Research**, MIT, escrito em Python | README oficial do repositório |
| Repositório: `github.com/NousResearch/hermes-agent` | Busca e README |
| Instalação: `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash` | README oficial |
| Windows: `iex (irm https://hermes-agent.nousresearch.com/install.ps1)` | README oficial |
| Comandos de setup: `hermes setup`, `hermes model`, `hermes tools` | README oficial |
| Gateway: `hermes gateway setup`, `hermes gateway start` | README oficial |
| Roda em Linux, macOS, WSL2, Termux (Android) e Windows em beta | README oficial |
| Python 3.11+ | README oficial |
| Canais: Telegram, Discord, Slack, WhatsApp, Signal, CLI | README oficial |
| **Dois adapters de WhatsApp**: Baileys (não oficial, via WhatsApp Web) e Cloud API (oficial da Meta) | Doc de mensageria |
| Pareamento por DM: `hermes pairing approve whatsapp <CÓDIGO>` | Doc de mensageria |
| Learning loop: cria skills a partir do uso, guarda memória entre sessões e busca conversas passadas | README oficial |

### O que NÃO foi confirmado e por isso não vira instrução na página

- **Passo a passo do QR code do WhatsApp.** Nem o README nem a página de mensageria detalham o
  pareamento inicial. A página descreve a escolha do adapter e manda para a doc oficial no detalhe.
- **Comandos de subagente.** O README cita "spawn isolated subagents for parallel workstreams" como
  capacidade, sem comandos. O passo 4 trata do conceito e da especialização por skill, sem inventar sintaxe.
- **Divergência de URL de instalação.** Artigos de terceiros citam um instalador em
  `raw.githubusercontent.com/.../scripts/install.sh`. O README oficial usa
  `hermes-agent.nousresearch.com/install.sh`. A página segue o README, que é fonte primária.

## Critérios de Aceite

- **AC1** — Rota `/timedeagentes` (`src/app/timedeagentes/page.tsx`) standalone.
- **AC2** — Accent `#FACC15`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Cinco passos na ordem definida pelo dono, com os títulos que ele deu.
- **AC4** — Conteúdo aberto: os cinco passos nomeados, o passo 1 inteiro (escolha da casa) e os avisos de risco.
- **AC5** — Conteúdo gated: comandos dos passos 2 a 5, com blocos copiáveis.
- **AC6** — Todo comando reproduzido **exatamente** como no README oficial. Nenhum comando inventado ou deduzido.
- **AC7** — **Avisos na parte ABERTA**, antes do lead: (a) `curl | bash` executa script remoto com privilégios do usuário; (b) o adapter Baileys é ponte não oficial e conecta o número pessoal por fora da API da Meta; (c) agente autônomo com acesso a mensagem lê e responde sozinho.
- **AC8** — Onde a documentação oficial não detalha (QR do WhatsApp, sintaxe de subagente), a página **diz que não detalha** e aponta para a doc, em vez de preencher a lacuna com suposição.
- **AC9** — Link externo só para repositório oficial e doc oficial, com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC10** — Lead `source="timedeagentes-page"`, bypass só em localhost, `SalesCta` com `utmContent="timedeagentes"`.
- **AC11** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, 5 passos, comandos oficiais, avisos de risco.
**OUT:** inventar passo de QR code ou sintaxe de subagente; prometer que o WhatsApp pessoal não
corre risco; tutorial de contratação de VPS específica; link de afiliado; push sem autorização.

## Riscos

- **R1 (alto)** — Leitor conecta o WhatsApp pessoal pelo Baileys e perde o número. *Mitigação:* AC7. O aviso fica na parte aberta e a página recomenda número separado para teste.
- **R2 (médio)** — `curl | bash` normalizado sem contexto. *Mitigação:* AC7 explica o que a linha faz.
- **R3 (médio)** — Projeto novo, em movimento rápido: comando muda de versão para versão. *Mitigação:* data de checagem visível e link para o repositório, que é o que não quebra.
- **R4 (baixo)** — Passo 4 frustrar quem esperava comando pronto de subagente. *Mitigação:* AC8 é explícito sobre o que a doc cobre.

## Complexidade

**M (média).** Página de conteúdo, porém com material técnico que exige fidelidade à fonte.

## Valor de negócio

Cruza com o público de vibe coding do Xquads e com a `/ferramentas`, entregando a camada que falta:
o que fazer depois de conhecer as ferramentas. Formato passo a passo tem retenção melhor que lista.

## Definition of Done

- `/timedeagentes` em dev, comandos liberados só após lead ou em localhost.
- Todo comando conferido contra o README. Avisos na parte aberta.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-01** — Draft criado por @mestre — Story 045
- **2026-09-01** — Validada por @produto: **GO 10/10**. A ferramenta citada por voz foi identificada e verificada na fonte primária antes de virar tutorial; comandos vêm do README, não de artigo de terceiro, e a divergência de URL entre as duas fontes foi resolvida a favor do oficial; as duas lacunas da documentação estão declaradas em vez de preenchidas por suposição; os riscos de conectar WhatsApp pessoal e de rodar instalador remoto ficam antes do lead. Draft → **Ready**.
- **2026-09-01** — Implementada por @desenvolvedor: `src/app/timedeagentes/page.tsx`, accent `#FACC15`, LeadGate `source="timedeagentes-page"`.
- **2026-09-01** — QA por @qualidade: **PASS.**
  - **AC6 auditado por comparação automática**: os 11 comandos oficiais extraídos do README foram conferidos um a um contra o arquivo, todos presentes e idênticos. A varredura inversa (comando na página que não conste da lista oficial) não achou nenhum; o único alerta foi falso positivo, a frase corrida "o que o próprio `hermes gateway setup` pedir na tela".
  - **AC7 verificado no DOM**: os três avisos (script remoto, Baileys fora da API da Meta, agente lê e responde sozinho) estão renderizados na parte aberta, antes do LeadGate.
  - **AC8 verificado**: a página declara textualmente que a documentação não detalha o pareamento do WhatsApp e que não publica a sintaxe de subagente.
  - **AC9 verificado**: exatamente dois links externos, repositório oficial e doc de mensageria, ambos com `rel="noopener noreferrer"`.
  - Cinco passos renderizados com os títulos dados pelo dono; data de checagem visível.
  - Cópia de comando com fallback `execCommand` e aviso de falha, no padrão da `/escritahumana`.
  - Lint limpo, `npm run build` verde, rota `/timedeagentes` gerada.
- **2026-09-01** — Incidente de ambiente (fora do escopo da story): `~/.claude/launch.json` foi sobrescrito por outra sessão e perdeu a entrada do xquads, fazendo o preview subir o dev server do CRM Sow Sales na porta 3000. Servidor parado assim que identificado e a entrada do xquads restaurada sem remover a do CRM. Nenhum arquivo dos dois projetos foi tocado.

## File List

- `src/app/timedeagentes/page.tsx`
- `docs/stories/045-timedeagentes-page.md`
- **2026-09-01** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
