# Story 061 — Página /replicadeapp (11 skills do Claude para reconstruir um app)

**Status:** Done

## Descrição

Nova página isca standalone em `/replicadeapp` (produção: `www.sowsales.com.br/xquads/replicadeapp`),
distribuindo o repositório `Jakeschincariol/replica-skill`: onze skills que vão da engenharia reversa
de um aplicativo até a publicação da sua própria versão no ar.

`source = "replicadeapp-page"`.

Mesmo autor da Story 060 (`youtube-agent-skill`), o que permite cross-link entre as duas páginas.

## Repositório verificado (05/10/2026)

| Item | Valor |
|---|---|
| Repositório | `Jakeschincariol/replica-skill` |
| Estrelas | 447 |
| Forks | 38 |
| Licença | MIT |
| Linguagem | Python (3.8+, sem dependências) |
| Criado | 03/10/2026 |
| Último push | 03/10/2026 |
| URL | HTTP 200 |

**447 estrelas em dois dias.** Repositório recém-publicado, em tração forte.

## O ponto que domina esta página: o enquadramento legal

"Clonar qualquer app" é um tema que, mal enquadrado, induz o leitor a violar direito de terceiro. O
autor trata isso de frente, e a página **tem de carregar a mesma clareza**, não só o lado animador.

O que o próprio README estabelece:

- **Reconstrói o que o app faz, nunca o que ele possui.** Funcionalidade e padrões de UX, estilo
  clean-room. Nunca o código-fonte, os assets proprietários, o logo, a marca, a copy ou APIs privadas.
- **Só fontes públicas e a sua própria conta.** Não raspa atrás de login, não contraria os termos do
  site, não entra na conta de outra pessoa, não passa paywall.
- **Catálogo e conteúdo não se clonam.** Dá para reconstruir playlists e compartilhamento; o acervo
  do serviço, não.
- **Sem promessa de clone perfeito.** Depende da complexidade; o `/replica-diff` dá uma nota real.
- **O Entrepreneur não inventa nada.** Sem review, citação ou número fabricado; cada afirmação com
  link e tamanho de amostra declarado.
- **Confira antes de vender.** Checagem de marca, leitura dos termos e advogado quando houver
  dinheiro envolvido. O autor escreve: "This is not legal advice."

## Os onze comandos, na ordem de execução

`recon → architect → design → build → backend → test → diff → entrepreneur → brand → launch → deploy`

Cada skill lê o que a anterior escreveu, numa pasta `replica/` dentro do projeto.

## Critérios de Aceite

- **AC1** — Rota `/replicadeapp` (`src/app/replicadeapp/page.tsx`) standalone.
- **AC2** — Accent `#0EA5E9`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — **A distinção "o que o app faz" contra "o que o app possui" aparece na parte ABERTA**, não escondida atrás do lead. É a informação que evita que alguém se meta em encrenca.
- **AC4** — Parte aberta também registra: só fontes públicas e conta própria, e a recomendação de checagem de marca e advogado antes de vender.
- **AC5** — Parte gated: os onze comandos na ordem de execução e o link do repositório.
- **AC6** — **Nenhuma promessa de clone perfeito** nem de resultado comercial.
- **AC7** — A página **não** sugere clonar nenhum aplicativo específico, para não dirigir o leitor contra um alvo nomeado.
- **AC8** — Link externo com `target="_blank"` e `rel="noopener noreferrer"`, atrás do gate.
- **AC9** — Números do repositório datados. ~~Cross-link para `/youtubeskill`.~~ **O cross-link foi removido a pedido do dono em 05/10/2026**, antes da publicação.
- **AC10** — Lead `source="replicadeapp-page"`, bypass só em localhost, `SalesCta` com `utmContent="replicadeapp"`.
- **AC11** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, onze comandos, enquadramento legal, link do repositório.
**OUT:** nomear aplicativos-alvo; prometer clone idêntico; dar orientação jurídica própria; sugerir
contornar termos de uso, login ou paywall.

## Riscos

- **R1 (alto)** — Leitor entender que pode copiar um produto inteiro e vender. *Mitigação:* AC3, AC4 e AC6, com a distinção na parte aberta.
- **R2 (médio)** — A página parecer que dá orientação jurídica. *Mitigação:* reproduzir a recomendação do autor de consultar advogado, sem opinar.
- **R3 (baixo)** — Repositório muito novo, com dois dias. *Mitigação:* AC9, com as datas visíveis.

## Complexidade

**S (pequena).** Página de distribuição no padrão, com atenção redobrada ao texto.

## Valor de negócio

Tema de altíssimo apelo para o público de vibe coding do Xquads, que já consome `/appdozero`,
`/appseguro` e `/jarvis`. Entregue com o enquadramento correto, diferencia de conteúdo que trata o
assunto de forma irresponsável.

## Definition of Done

- `/replicadeapp` em dev, comandos e link liberados só após lead ou em localhost.
- Distinção legal na parte aberta, nenhum app nomeado, nenhuma promessa de clone perfeito.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-10-05** — Draft criado por @mestre — Story 061
- **2026-10-05** — Validada por @produto: **GO 10/10**. O tema exige enquadramento, e a story o trata como critério de aceite em vez de bom senso: a distinção entre função e propriedade vai para a parte aberta, nenhum alvo é nomeado e a recomendação de advogado é reproduzida do autor sem a página opinar. Draft → **Ready**.
- **2026-10-05** — Implementada por @desenvolvedor: `src/app/replicadeapp/page.tsx`, accent `#0EA5E9`, LeadGate `source="replicadeapp-page"`.
- **2026-10-05** — QA por @qualidade: **PASS.**
  - **AC3 verificado por posição**: o bloco "Onde fica a linha" aparece **antes** do LeadGate no texto renderizado.
  - **AC4 verificado**: os três limites presentes — função contra propriedade, só fonte pública e conta própria, e checagem antes de vender.
  - **AC6 verificado por varredura**: nenhuma ocorrência de "clone perfeito", "idêntico ao original" ou "cópia exata".
  - **AC7 verificado por varredura**: nenhum aplicativo nomeado na página.
  - **AC2 (da seção legal) verificado**: a frase "isto não é orientação jurídica" está presente, atribuída ao autor.
  - **AC5 verificado**: os 11 comandos na ordem de execução.
  - **AC8 e AC9 verificados**: único link externo é o repositório, com `rel="noopener noreferrer"`, atrás do gate; cross-link para `/youtubeskill` presente; datas visíveis.
  - Lint limpo, `npm run build` verde, rota `/replicadeapp` gerada.

## File List

- `src/app/replicadeapp/page.tsx`
- `docs/stories/061-replicadeapp-page.md`
- **2026-10-05** — **Pedido do dono antes da publicação:** remover o bloco "Do mesmo autor", que apontava para a `/youtubeskill`. Removido junto com o import órfão `Youtube`. A página passa a ter um único link, o do repositório. Lint limpo, build verde.
- **2026-10-05** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
