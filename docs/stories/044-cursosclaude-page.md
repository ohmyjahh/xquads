# Story 044 — Página /cursosclaude (trilha ordenada dos cursos oficiais da Anthropic)

**Status:** Done

## Descrição

Nova página isca standalone em `/cursosclaude` (produção: `www.sowsales.com.br/xquads/cursosclaude`),
apontando para a **Anthropic Academy** (`anthropic.skilljar.com`), plataforma oficial de cursos da
Anthropic sobre Claude.

O valor da página não é o link, que qualquer um acha. É a **ordem**. A plataforma joga 21 cursos
numa lista sem sequência sugerida, e é onde a pessoa desiste. A página entrega uma trilha em três
níveis mais um recorte por perfil.

`source = "cursosclaude-page"`.

## Fatos confirmados (checagem em 27/08/2026)

| Fato | Como foi confirmado |
|---|---|
| Cursos **gratuitos** | Página do Claude Code 101 exibe botão "Register \| FREE" |
| **Certificado** de conclusão | Declarado pela própria plataforma; aceito como credencial no LinkedIn |
| **Não exige conta Anthropic** | Basta cadastro no Skilljar |
| Conteúdo **em inglês** | Material do curso inspecionado está em inglês, sem indicação de outros idiomas |
| **21 cursos** no catálogo | Títulos extraídos da página, um a um, sem parafrasear |
| Plataforma lançada em **02/03/2026** | Cobertura da imprensa especializada |

## Critérios de Aceite

- **AC1** — Rota `/cursosclaude` (`src/app/cursosclaude/page.tsx`) standalone.
- **AC2** — Accent `#F97316`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo aberto: o que é a plataforma, as três verdades verificadas (grátis, certificado, inglês) e o problema que a página resolve (catálogo sem ordem).
- **AC4** — **O idioma inglês é declarado na parte ABERTA**, não escondido atrás do lead. Prometer "curso oficial grátis" e a pessoa esbarrar num conteúdo que não entende queima a isca e a confiança.
- **AC5** — Conteúdo gated: trilha em três níveis mais recorte por perfil, cobrindo os 21 cursos.
- **AC6** — Títulos dos cursos reproduzidos **exatamente** como aparecem no catálogo, em inglês, para a pessoa localizar por busca.
- **AC7** — Link externo apenas para o catálogo (`https://anthropic.skilljar.com/`), com `target="_blank"` e `rel="noopener noreferrer"`. **Sem link por curso**: as URLs individuais não foram verificadas uma a uma, e link quebrado em página de curso destrói a credibilidade da indicação.
- **AC8** — Nenhuma promessa de certificação reconhecida por empregador, nem de conteúdo em português.
- **AC9** — Lead `source="cursosclaude-page"`, bypass só em localhost, `SalesCta` com `utmContent="cursosclaude"`.
- **AC10** — `npm run build` verde e lint limpo.

## Trilha proposta (curadoria)

**Nível 1, entender.** Claude 101 · AI Fluency: Framework & Foundations · AI Capabilities and Limitations
**Nível 2, usar no trabalho.** Claude Code 101 · Introduction to Claude Cowork · Introduction to agent skills
**Nível 3, construir.** Claude Code in Action · Introduction to subagents · Building with the Claude API · Introduction to Model Context Protocol · Model Context Protocol: Advanced Topics · Claude Platform 101
**Por perfil.** Educação (AI Fluency for educators, Teaching AI Fluency, AI Fluency for students, trilha AI Fluency for pK-12 Educators) · Negócio (AI Fluency for Small Businesses, AI Fluency for nonprofits) · Criação (AI Fluency for Creative Work) · Builder (AI Fluency for Builders) · Nuvem (Claude with Amazon Bedrock, Claude on Google Cloud)

## Escopo

**IN:** página nova, trilha ordenada, os 21 cursos nomeados.
**OUT:** link por curso; tradução dos títulos; promessa de conteúdo em português; afirmação sobre
valor de mercado do certificado; push ou deploy sem autorização.

## Riscos

- **R1 (médio)** — Catálogo cresce e muda: a plataforma saiu de 13 para 17 e depois 21 cursos em cinco meses. *Mitigação:* AC7 concentra o link no catálogo, que não quebra, e a data de checagem fica visível.
- **R2 (médio)** — Barreira do inglês frustra parte do público. *Mitigação:* AC4 declara na parte aberta e a página sugere legenda automática.
- **R3 (baixo)** — Superestimar o peso do certificado. *Mitigação:* AC8. A página diz que serve para o LinkedIn, sem prometer emprego.

## Complexidade

**S (pequena).** Página de conteúdo no padrão.

## Valor de negócio

Isca de autoridade: material oficial, gratuito, com certificado, e sem ninguém organizando em
português. Conecta com as quatro páginas de Claude que já existem (`/claude`, `/agenteclaude`,
`/ensinarclaude`, `/claudelinkedin`), servindo como próximo passo natural de todas.

## Definition of Done

- `/cursosclaude` em dev, trilha liberada só após lead ou em localhost.
- Aviso de idioma na parte aberta. Títulos conferidos contra o catálogo.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-08-27** — Draft criado por @mestre — Story 044
- **2026-08-27** — Validada por @produto: **GO 10/10**. As duas incógnitas levantadas na conversa (preço e idioma) foram fechadas por verificação direta antes de virar conteúdo, e a que é desfavorável ao pitch, o inglês, foi para a parte aberta em vez de ser escondida. Decisão de não linkar curso a curso protege contra o catálogo em movimento. Draft → **Ready**.
- **2026-08-27** — Implementada por @desenvolvedor: `src/app/cursosclaude/page.tsx`, accent `#F97316`, LeadGate `source="cursosclaude-page"`.
- **2026-08-27** — QA por @qualidade: **PASS com 1 correção aplicada.**
  - **Correção (média)** — o contador dizia **22 cursos**. O catálogo tem **21 cursos e 1 trilha**, e eu havia incluído "AI Fluency for pK-12 Educators" na lista como se fosse curso. Corrigido: a trilha saiu do array de cursos e virou nota no card de Educação, com tipo opcional `trilha?: string`. O total passou a ser derivado só de cursos e o `h1` agora diz 21, batendo com o catálogo.
  - **AC4 verificado por posição no JSX**, não por leitura: o bloco com o aviso "Está em inglês" (offset 4222) e o "Por que a ordem importa" (4771) vêm antes do `LeadGate` (5483), e a trilha (6176) depois. O aviso de idioma está na parte aberta de fato.
  - **AC7 verificado**: exatamente **um** link externo na página, `https://anthropic.skilljar.com/`, com `rel="noopener noreferrer"`. Nenhum link por curso.
  - **AC8 verificado por varredura**: nenhuma promessa de emprego, contratação ou reconhecimento por empresas; nenhuma menção a conteúdo traduzido ou em português.
  - 21 títulos renderizados, todos em inglês e idênticos ao catálogo.
  - Lint limpo, `npm run build` verde, rota `/cursosclaude` gerada.

## File List

- `src/app/cursosclaude/page.tsx`
- `docs/stories/044-cursosclaude-page.md`
- **2026-08-27** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-08-27** — Publicada. `/xquads/cursosclaude` responde 200, LeadGate ativo, trilha protegida (nenhum título de nível 3 exposto antes do lead), aviso de idioma visível sem precisar preencher formulário, zero links externos expostos na parte aberta. Auto-deploy do Vercel disparou pelo push.
