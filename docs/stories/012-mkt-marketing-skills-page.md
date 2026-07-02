# Story 012 — Página `/mkt` com repositório de Marketing Skills + manual de instalação

**Status:** Ready for Review
**Criado:** 2026-07-02
**Autor:** @sm
**Validado por:** @po
**Implementado por:** @dev
**Prioridade:** Média — conteúdo educativo (isca de conteúdo, divulgado por link)

---

## Contexto

Criar uma página `/mkt` (servida em `sowsales.com.br/xquads/mkt`) que apresenta o repositório open-source de skills de marketing `coreyhaines31/marketingskills` e ensina, passo a passo, como instalar uma skill dentro do Claude web (claude.ai). Segue o mesmo padrão das páginas standalone existentes (`/claude`, `/loop`, `/idvisual`): página fora da sidebar, dark, com CTA para a página de vendas.

## Descrição

Criar `src/app/mkt/page.tsx` standalone com duas partes principais:

1. **Parte 1 — O repositório**
   - Hero com título + subtítulo
   - Card destacando o projeto `github.com/coreyhaines31/marketingskills` com link e botão para abrir o repositório
   - Breve explicação do que é (60+ skills de marketing: copywriting, SEO, ads, CRO, e-mail, etc.)
2. **CTA de vendas** — componente `SalesCta` com `utmContent="guia-mkt"`
3. **Parte 2 — Manual passo a passo** de como instalar uma skill no Claude web, dividido em blocos numerados:
   - Passo 1 — Baixar a skill do GitHub (baixar ZIP do repo, extrair, isolar a pasta da skill desejada e compactá-la em `.zip` — a pasta precisa conter o `SKILL.md`)
   - Passo 2 — Ativar execução de código no Claude: **Settings > Capabilities > Code execution and file creation**
   - Passo 3 — Fazer upload: **Customize > Skills > botão "+" > "+ Create skill" > "Upload a skill"** e enviar o `.zip`
   - Passo 4 — Ativar/desativar a skill pelo toggle em **Customize > Skills**
   - Nota de pré-requisito: skills customizadas exigem plano Pro/Max/Team/Enterprise
   - Nota de segurança: instalar skills apenas de fontes confiáveis
4. **Footer** — @rafa.grandi

## Decisões registradas

| Item | Valor |
|------|-------|
| Rota | `/mkt` (servida em `sowsales.com.br/xquads/mkt`) |
| Cor accent | `#D97757` (coral Claude, consistente com `/claude`) |
| Repo divulgado | `https://github.com/coreyhaines31/marketingskills` |
| CTA | componente `SalesCta`, `utmContent="guia-mkt"` |
| Sidebar | NÃO adicionar (página standalone, divulgada por link) |
| Lead capture | Não há (CTA leva direto à página de vendas) |
| Fonte do processo de instalação | support.claude.com — Use skills in Claude |

## Acceptance Criteria

1. **AC1** — Rota `/mkt` acessível e renderiza a página completa, sem sidebar (standalone)
2. **AC2** — O card do repositório exibe o link `github.com/coreyhaines31/marketingskills` com um botão **Copiar link**. Ao copiar, o link vai para o clipboard e abre um modal de captura (nome, e-mail, telefone); após o envio a pessoa é redirecionada para a página de vendas
3. **AC3** — `SalesCta` presente entre as duas partes, com `utmContent="guia-mkt"`
4. **AC4** — Parte 2 apresenta o manual com passos numerados. Passo de adicionar no Claude usa a ordem exata em PT-BR: **Personalizar > Habilidades > Adicionar > Upload de arquivo**
5. **AC5** — Notas de pré-requisito (plano Pro/Max) e segurança (fontes confiáveis) presentes
6. **AC6** — Visual consistente com o design system (dark, cards `#1a1a1e`, bordas `#2a2a2e`, accent `#D97757`)
7. **AC7** — `npm run build` passa sem erros

## Lead gate (revisão pós-implementação)

- O card não tem botão de ir ao GitHub. Em vez disso, exibe o link do repo com botão **Copiar link**.
- Reuso total do padrão existente: hook `useCopyWithLead` + `LeadForm` com `type="copy"` (mesmo de `/idvisual`). Nenhum componente compartilhado foi modificado.
- Fluxo: copiar link → clipboard → modal (nome, e-mail, telefone) → lead gravado via `POST /api/leads` (dual-write Sheets + GENE CRM), `source="github-marketing-skills"` → redireciona para a página de vendas.
- `useCopyWithLead` só abre o modal na primeira captura (flag em `localStorage`); em cópias seguintes apenas copia.
- Card interativo isolado em `src/app/mkt/repo-card.tsx` (client component), mantendo a página como server component com `metadata`.

## File List

- `src/app/mkt/page.tsx` (novo)
- `src/app/mkt/repo-card.tsx` (novo — client component: card com copiar-link + lead gate)
- `src/components/layout/app-shell.tsx` (modificado — `/mkt` em `STANDALONE_ROUTES`)
- `docs/stories/012-mkt-marketing-skills-page.md` (este arquivo)
