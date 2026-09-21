# Story 053 — Página /codigosgithub (códigos secretos de domínio do GitHub)

**Status:** Done

## Descrição

Nova página isca standalone em `/codigosgithub` (produção: `www.sowsales.com.br/xquads/codigosgithub`),
com os "códigos secretos" do GitHub: trocar `github.com` na URL de um repositório por outro domínio
e receber uma ferramenta diferente sobre o mesmo repositório. Trocar por `gitdiagram.com` devolve um
diagrama da arquitetura; por `gitingest.com`, o repositório inteiro virado texto para colar numa IA.

`source = "codigosgithub-page"`.

Slug escolhido porque `/codigossecretos` já existe e trata de geração de imagem no ChatGPT.

## Verificação: por que ela dominou esta story

Lista de truques de URL é o tipo de conteúdo que apodrece rápido, porque são serviços pequenos e
gratuitos que saem do ar. **Cada domínio foi aberto no navegador com um repositório real
(`facebook/react`) e teve o conteúdo lido**, em vez de confiar no código HTTP.

Isso pegou uma armadilha real: **`openrepowiki.xyz` responde HTTP 200, mas o domínio está à venda no
GoDaddy por US$ 699**. Aparece em listas de truques publicadas na web e teria entrado na página se a
verificação parasse no status code.

| Descartado | Motivo |
|---|---|
| `openrepowiki.xyz` | Domínio expirado, página de venda do GoDaddy |
| `talktogithub.com` | Navegação bloqueada no ambiente; **não verificado, logo não publicado** |

## Códigos verificados

### Funcionam direto, sem login (10)

| Troque por | O que devolve |
|---|---|
| `gitdiagram.com` | Diagrama interativo da arquitetura |
| `gitingest.com` | Repositório inteiro em texto, pronto para colar numa IA |
| `deepwiki.com` | Documentação do projeto gerada por IA |
| `github1s.com` | O repositório aberto num VS Code dentro do navegador |
| `gitmcp.io` | Servidor MCP daquele repositório |
| `githubbox.com` | Projeto rodando no CodeSandbox |
| `github.gg` | Análise do código, com scorecard e vulnerabilidades |
| `gitsummarize.com` | Resumo técnico do projeto |
| `zread.ai` | Leitura guiada do código |
| `githubtracker.com` | Atividade do repositório ao longo do tempo |

### Funcionam, mas pedem login (3)

`uithub.com` (código como prompt), `gitpodcast.com` (podcast sobre o repositório), `gitmvp.com` (análise).

### Formato diferente, não é substituição pura (4)

`github.dev` (troca só o final `.com` por `.dev`), `star-history.com/#owner/repo`,
`gitpod.io/#https://github.com/owner/repo`, `github.githistory.xyz/owner/repo/blob/...`.

**Total publicável: 17.**

## Critérios de Aceite

- **AC1** — Rota `/codigosgithub` (`src/app/codigosgithub/page.tsx`) standalone.
- **AC2** — Accent `#34D399`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Os 17 códigos separados em três grupos: direto, pede login e formato diferente.
- **AC4** — **Os que exigem login vêm marcados.** Mandar a pessoa para um login inesperado queima a lista inteira.
- **AC5** — Campo onde a pessoa cola a URL de um repositório; os códigos viram links clicáveis já com o caminho preenchido. Sem URL colada, mostram o formato genérico.
- **AC6** — Todo link externo com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC7** — Nenhum domínio não verificado na página. Data da checagem visível.
- **AC8** — Lead `source="codigosgithub-page"`, bypass só em localhost, `SalesCta` com `utmContent="codigosgithub"`.
- **AC9** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, 17 códigos verificados, montador de link.
**OUT:** publicar domínio não verificado; prometer que os serviços continuarão no ar; alterar a `/codigossecretos`.

## Riscos

- **R1 (alto)** — Serviço sai do ar e o link morre. *Mitigação:* AC7 com data visível, e a própria natureza da página, que ensina o padrão de substituição, não só a lista.
- **R2 (médio)** — Login inesperado frustra. *Mitigação:* AC4.
- **R3 (baixo)** — Confusão com a `/codigossecretos`. *Mitigação:* slug e tema distintos.

## Complexidade

**S (pequena).** Página de conteúdo com um montador de link simples.

## Valor de negócio

Conteúdo de alto compartilhamento: "truque escondido" tem apelo imediato e o público de vibe coding
do Xquads usa GitHub todo dia. Combina com `/strix`, `/contador` e `/jarvis`, que falam ao mesmo perfil.

## Definition of Done

- 17 códigos na página, agrupados, com os de login marcados.
- Montador de link funcionando. Nenhum domínio não verificado.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-21** — Draft criado por @mestre — Story 053
- **2026-09-21** — Validada por @produto: **GO 10/10**. A verificação foi feita abrindo cada domínio com repositório real, e não por status HTTP, o que eliminou um domínio expirado que circula em listas publicadas. O que não pôde ser verificado ficou de fora em vez de entrar com ressalva. Draft → **Ready**.
- **2026-09-21** — Implementada por @desenvolvedor: `src/app/codigosgithub/page.tsx`, accent `#34D399`, LeadGate `source="codigosgithub-page"`.
- **2026-09-21** — QA por @qualidade: **PASS.**
  - **AC5 verificado com 5 entradas diferentes**, digitadas no campo e conferido o link resultante: URL completa (`https://github.com/open-jarvis/OpenJarvis`), URL sem protocolo, URL terminada em `.git` (o sufixo é removido), formato curto `owner/repo`, e texto inválido (volta ao genérico `owner/repo` sem quebrar).
  - **AC6 verificado**: 13 links externos, **todos** com `rel="noopener noreferrer"`.
  - **AC3 e AC4 verificados**: três grupos renderizados, e os três de login com a etiqueta "pede login".
  - **AC7 verificado**: só entraram domínios abertos e lidos no navegador; `openrepowiki.xyz` (domínio à venda) e `talktogithub.com` (não verificado) ficaram de fora. Data da checagem visível no rodapé do conteúdo.
  - Lint limpo, `npm run build` verde, rota `/codigosgithub` gerada.

## File List

- `src/app/codigosgithub/page.tsx`
- `docs/stories/053-codigosgithub-page.md`
- **2026-09-21** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-09-21** — Publicada. `/xquads/codigosgithub` responde 200, LeadGate ativo, os 17 códigos e o montador de links protegidos (zero âncoras externas e nenhum campo de entrada no DOM antes do lead), exemplo da substituição visível na parte aberta. Auto-deploy do Vercel disparou pelo push.
