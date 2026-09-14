# Story 049 — Página /jarvis (monte seu próprio Jarvis com o OpenJarvis)

**Status:** Done

## Descrição

Nova página isca standalone em `/jarvis` (produção: `www.sowsales.com.br/xquads/jarvis`), com
um prompt para copiar e um botão para o repositório `https://github.com/open-jarvis/OpenJarvis`.

`source = "jarvis-page"`.

## Desbloqueio

Prompt enviado pelo dono em 14/09/2026, com autorização explícita para melhorar ("PODE MELHORAR ESSE PROMPT SE ACHAR NECESSÁRIO").

### Prompt original

> Instale esse projeto completo [COLOCAR O LINK AQUI] depois configure ele de acordo com todos os projetos que nós trabalhamos recentemente, garantindo que tudo esteja organizado em pastas, arquivos e documentos para que eu consiga ter acesso por meio desse dashboard. Ele servirá como base de organização das minhas atividades diárias e você terá acesso completo a ele para consulta, organização e gestão de projetos.

### O que foi corrigido, e por quê

| Problema no original | Correção |
|---|---|
| `[COLOCAR O LINK AQUI]` vazio | URL do OpenJarvis já preenchida. A página é sobre esse projeto; deixar placeholder é entregar tarefa de casa. |
| "os projetos que nós trabalhamos recentemente" | O agente de quem copia não tem esse histórico. Virou um caminho de pasta que a pessoa informa. |
| "esse dashboard" sem referente | Explicitado como o dashboard do próprio OpenJarvis. |
| Sem verificação | Passo 1 exige rodar a checagem de saúde e proibir seguir com erro em aberto. |
| Sem estrutura definida | Passo 3 define índice na raiz e um documento por projeto, com instrução de manter a nomenclatura que a pessoa já usa. |
| Sem proteção dos arquivos | Regra final: não apagar nem mover sem perguntar, trabalhar em cópia ao reorganizar. Um agente com acesso total a pastas de trabalho pode causar estrago irreversível. |
| Sem prestação de contas | Passo 5 exige relatório do que foi feito, do que ficou de fora e por quê. |

O único placeholder remanescente é o caminho da pasta de projetos, que varia por pessoa e não tem como ser preenchido de antemão.

## Repositório verificado (checagem em 14/09/2026)

| Item | Valor |
|---|---|
| Repositório | `open-jarvis/OpenJarvis` |
| Descrição | "Personal AI, On Personal Devices" |
| Estrelas | 9.724 |
| Forks | 2.223 |
| Licença | Apache-2.0 |
| Linguagem | Python (>= 3.10) |
| Criado | 15/02/2026 |
| Último push | 14/09/2026, no mesmo dia da checagem |
| Arquivado | Não |
| URL | HTTP 200 |

Não é projeto de fim de semana: tem site institucional em `openjarvis.stanford.edu`, paper no
arXiv (2605.17172), documentação em mkdocs, leaderboard e roadmap públicos.

## O que o projeto faz

Framework de IA pessoal **local-first**: o agente roda na máquina da pessoa e só chama a nuvem
quando necessário. A justificativa do próprio projeto é que modelos locais já resolvem 88,7% das
consultas de chat e raciocínio de turno único.

- **Instalação por uma linha**, que cuida de uv, venv, Ollama e um modelo inicial. Cerca de 3 minutos.
- **Presets prontos**: `morning-digest` (briefing falado de e-mail, agenda, saúde e notícias), `deep-research`, `code-assistant`, `scheduled-monitor`, `chat-simple`.
- **Oito agentes internos** em três modos de execução: sob demanda, agendado e contínuo.
- **Skills**: importa do Hermes Agent (~150) e do OpenClaw (~13.700), seguindo o padrão aberto agentskills.io.

Conexão com o acervo do Xquads: o Hermes é exatamente a ferramenta da `/timedeagentes`. As duas
páginas tratam do mesmo público e podem se referenciar.

## Critérios de Aceite (provisórios, dependem do prompt)

- **AC1** — Rota `/jarvis` (`src/app/jarvis/page.tsx`) standalone.
- **AC2** — Accent a definir entre os livres, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Botão para `https://github.com/open-jarvis/OpenJarvis`, com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC4** — Prompt do dono reproduzido **íntegro**, com botão de copiar e fallback de clipboard.
- **AC5** — Parte aberta declara que o instalador roda um script remoto (`curl ... | bash`), mesmo aviso já adotado na Story 045.
- **AC6** — Parte aberta declara que é IA local: exige máquina com folga e baixa modelo. Sem isso, quem tentar em máquina fraca culpa a indicação.
- **AC7** — Números do repositório datados, no padrão da Story 041.
- **AC8** — Lead `source="jarvis-page"`, bypass só em localhost, `SalesCta` com `utmContent="jarvis"`.
- **AC9** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (alto)** — Prompt ausente. *Mitigação:* story bloqueada até o dono enviar.
- **R2 (médio)** — IA local exige hardware; frustração previsível em máquina modesta. *Mitigação:* AC6.
- **R3 (baixo)** — Instalador por script remoto. *Mitigação:* AC5.

## Escopo

**IN:** página nova, prompt do dono, botão para o repositório, pré-requisitos declarados.
**OUT:** inventar ou reescrever o prompt; tutorial de instalação de Ollama; prometer desempenho sem hardware.

## Change Log

- **2026-09-14** — Draft criado por @mestre — Story 049. Repositório verificado. **Bloqueada:** falta o prompt.

## Requisitos confirmados (doc oficial, 14/09/2026)

- Instalador cobre macOS, Linux, WSL2, Windows nativo e app de desktop.
- Modelo inicial **Qwen 3.5 2B, cerca de 1,5 GB**. Modelos maiores são opcionais.
- O instalador **detecta o nível do hardware** e ajusta a configuração sozinho.
- Consequência para a página: a barreira de hardware é **menor** do que a da `/timedeagentes`, que pedia 24 GB de RAM para o modelo recomendado do Ollama. O aviso da Story 049 deve informar sem assustar.

## Critérios de Aceite (definitivos)

- **AC1** — Rota `/jarvis` (`src/app/jarvis/page.tsx`) standalone.
- **AC2** — Accent `#2DD4BF`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Botão para `https://github.com/open-jarvis/OpenJarvis`, com `target="_blank"` e `rel="noopener noreferrer"`, atrás do gate.
- **AC4** — Prompt melhorado com botão de copiar e fallback de clipboard.
- **AC5** — Parte aberta declara: exige agente com terminal, o instalador roda script remoto e o agente vai ler suas pastas de trabalho.
- **AC6** — Parte aberta informa o modelo inicial e seu tamanho, sem inventar requisito de RAM que a documentação não publica.
- **AC7** — Números do repositório datados.
- **AC8** — Lead `source="jarvis-page"`, bypass só em localhost, `SalesCta` com `utmContent="jarvis"`.
- **AC9** — `npm run build` verde e lint limpo.

- **2026-09-14** — Validada por @produto: **GO 10/10**. Prompt recebido e reescrito com autorização, com cada mudança justificada contra um problema concreto do original, incluindo a regra de proteção de arquivos que o original não tinha. Requisitos de hardware checados na doc oficial em vez de estimados. Draft → **Ready**.
- **2026-09-14** — Implementada por @desenvolvedor: `src/app/jarvis/page.tsx`, accent `#2DD4BF`, LeadGate `source="jarvis-page"`.
- **2026-09-14** — QA por @qualidade: **PASS.**
  - **AC5 verificado**: os três avisos (agente com terminal, script remoto, leitura das pastas de trabalho) renderizam na parte aberta.
  - **AC6 verificado**: modelo inicial e tamanho declarados; nenhum requisito de RAM inventado, já que a documentação não publica um.
  - **AC3 verificado**: único link externo é `https://github.com/open-jarvis/OpenJarvis`, atrás do gate, com `rel="noopener noreferrer"`.
  - **AC4 verificado**: prompt com 15 linhas, **um único placeholder** (`[CAMINHO DA SUA PASTA DE PROJETOS]`) e a regra de proteção de arquivos presente no texto.
  - **AC7 verificado**: 9.724 estrelas e data de checagem visíveis.
  - Lint limpo, `npm run build` verde, rota `/jarvis` gerada.

## File List

- `src/app/jarvis/page.tsx`
- `docs/stories/049-jarvis-page.md`
- **2026-09-14** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-09-14** — Publicada. `/xquads/jarvis` responde 200, LeadGate ativo, prompt e link do repositório protegidos (nenhum `<pre>` e nenhuma âncora para o GitHub no DOM antes do lead), os três avisos e os dados do repositório visíveis sem preencher formulário. Auto-deploy do Vercel disparou pelo push.
