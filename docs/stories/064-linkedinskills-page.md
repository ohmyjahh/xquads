# Story 064 — Página /linkedinskills (skills de LinkedIn para Claude Code e Codex)

**Status:** Done

## Descrição

Nova página isca standalone em `/linkedinskills` (produção: `www.sowsales.com.br/xquads/linkedinskills`),
distribuindo `sergebulaev/linkedin-skills`.

`source = "linkedinskills-page"`.

## Correção ao enunciado: são 12, não 11

O dono pediu a página para "esses 11 agentes". O README do repositório, atualizado em 07/10/2026,
diz **"The 12 skills"** e a imagem de capa também fala em 12. O campo de descrição do repositório
ainda diz 11, provavelmente desatualizado. A página usa **12**, que é o número da fonte mais recente.

## Repositório verificado (08/10/2026)

| Item | Valor |
|---|---|
| Repositório | `sergebulaev/linkedin-skills` |
| Estrelas | 4.336 |
| Forks | 723 |
| Licença | MIT |
| Criado | 14/04/2026 |
| Último push | **07/10/2026**, um dia antes da checagem |

Projeto em manutenção ativa, diferente do caso da Story 060.

## Posição frente às páginas de LinkedIn existentes

| Página | Recorte |
|---|---|
| `/linkedin` (Story 022) | Método de 5 prompts para escrever post |
| `/claudelinkedin` (Story 029) | Candidatura em massa a vagas |
| `/linkedinauto` (Story 052) | Rotina diária de conteúdo com 3 prompts |
| **`/linkedinskills`** (esta) | **Pacote instalável de 12 skills**, com humanizador e banco de histórias |

A diferença frente à `/linkedinauto` é clara: lá são prompts que a pessoa cola; aqui é software que
se instala e fica disponível.

## As 12 skills

Post Writer · Comment Drafter · Reply Handler · Post Audit · Humanizer · Hook Extractor ·
Content Planner · Engagement Monitor · Profile Optimizer · Employee Advocacy · Repurposer · Interviewer

## Três pontos honestos que vão para a página

1. **Exige plano pago do Claude** (Pro, Max, Team ou Enterprise) com execução de código habilitada. Está escrito no próprio README.
2. **Nada é publicado sem aprovação.** O README diz que as skills redigem e esperam o aval antes de qualquer publicação.
3. **O Humanizer não promete vencer detector.** O próprio autor escreve que nenhuma edição consegue isso de forma confiável. A página não pode prometer o que a ferramenta recusa prometer.

## Critérios de Aceite

- **AC1** — Rota `/linkedinskills` (`src/app/linkedinskills/page.tsx`) standalone.
- **AC2** — Accent `#0077B5`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o que é, a exigência de plano pago e a aprovação antes de publicar.
- **AC4** — Parte gated: as 12 skills com o que cada uma faz, e o link do repositório.
- **AC5** — **Nenhuma promessa de burlar detector de IA**, em linha com o que o autor declara.
- **AC6** — A página diferencia esta solução da `/linkedinauto`, com cross-link.
- **AC7** — Link externo com `target="_blank"` e `rel="noopener noreferrer"`, atrás do gate.
- **AC8** — Números e datas visíveis.
- **AC9** — Lead `source="linkedinskills-page"`, bypass só em localhost, `SalesCta` com `utmContent="linkedinskills"`.
- **AC10** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (médio)** — Pessoa no plano gratuito tentar instalar. *Mitigação:* AC3.
- **R2 (médio)** — Expectativa de driblar detector de IA. *Mitigação:* AC5.
- **R3 (baixo)** — Quarta página de LinkedIn confundir. *Mitigação:* AC6.

## Complexidade

**S (pequena).**

## Change Log

- **2026-10-08** — Draft criado por @mestre — Story 064
- **2026-10-08** — Validada por @produto: **GO 10/10**. A contagem foi conferida na fonte e corrigida de 11 para 12 antes da publicação, e as três ressalvas do autor viraram critério. Draft → **Ready**.
- **2026-10-08** — Implementada e verificada: **PASS.** 12 skills renderizadas; exigência de plano pago na parte aberta; nenhuma promessa de burlar detector; cross-link para `/linkedinauto` presente. Lint limpo, build verde.

## File List
- `src/app/linkedinskills/page.tsx`
- `docs/stories/064-linkedinskills-page.md`
- **2026-10-08** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
