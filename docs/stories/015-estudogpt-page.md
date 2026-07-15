# Story 015 — Página /estudogpt (3 prompts de estudo visual, gated por lead)

**Status:** Done (aguardando autorização de push/deploy)

## Descrição

Criar uma nova página isca standalone em `/estudogpt` seguindo o padrão das
demais páginas de conteúdo do Xquads (produção: `www.sowsales.com.br/xquads/estudogpt`).

A página ensina o visitante a transformar o ChatGPT numa ferramenta de estudo
visual, entregando três prompts prontos. Cada prompt tem duas formas de uso:

1. **Comando curto** — o slug que a pessoa cola direto no ChatGPT
2. **Prompt completo (contexto amplo)** — versão densa e detalhada que eu escrevo,
   para quem quer um resultado mais rico

Os três prompts:

| Comando curto | Objetivo |
|---|---|
| `/gerarimagemescritaamao` | ChatGPT gera uma imagem estilo anotação de caderno, escrita à mão, com setas, caixas e vários formatos, sobre o tema de estudo escolhido |
| `/ensinovisual` | Imagem manuscrita acrescida de gráficos, diagramas e fluxogramas, para um ensino ainda mais eficaz |
| `/stickynotes` | Conjunto de notas adesivas (post-its) com os principais tópicos da matéria, para consulta rápida |

O acesso aos prompts (comando curto e prompt completo) só é liberado depois que
o visitante informa **nome, email e telefone** no `LeadGate`. O lead é gravado
via `/api/leads` (dual-write Google Sheets + GENE CRM), como nas demais páginas.

## Critérios de Aceite

- **AC1** — Existe a rota `/estudogpt` (`src/app/estudogpt/page.tsx`) renderizada
  em modo standalone (sem sidebar), com o slug adicionado em `STANDALONE_ROUTES`
  no `app-shell.tsx`.
- **AC2** — A página tem accent Acid Lime `#D1FF02` e segue o layout visual das
  demais iscas (fundo `#121214`, header centralizado com badge, seções, footer
  `@rafa.grandi`).
- **AC3** — Há conteúdo educacional livre (acima do gate) explicando o método e
  o que cada um dos três prompts faz, sem revelar os prompts.
- **AC4** — Os três prompts (comando curto + prompt completo) ficam ocultos atrás
  do `LeadGate` e só aparecem após o envio de nome + email + telefone.
- **AC5** — Cada um dos três prompts oferece **dois botões de copiar**: um para o
  comando curto e outro para o prompt completo.
- **AC6** — O lead é enviado para `/api/leads` com `source = "estudogpt-page"`.
- **AC7** — O desbloqueio persiste via flag `xquads_lead_captured` (localStorage),
  compartilhada com as outras páginas (`hasCapturedLead`).
- **AC8** — A página termina com o `SalesCta` usando `utmContent="estudogpt"`.
- **AC9** — `npm run build` passa sem erros de tipo/lint.

## Escopo

**IN:**
- Nova página `src/app/estudogpt/page.tsx`
- Registro do slug em `STANDALONE_ROUTES` (`src/components/layout/app-shell.tsx`)
- Redação dos três prompts completos (contexto amplo) e dos três comandos curtos
- Conteúdo educacional da página

**OUT:**
- Alterações na API `/api/leads` (reaproveitada como está)
- Alterações nos componentes `LeadGate`, `SalesCta`, hooks (reaproveitados)
- Configuração de GPT/Projeto customizado no ChatGPT (fora do site)
- Deploy/push (só após autorização explícita do dono)

## Dependências

- Componentes existentes: `LeadGate`, `SalesCta`, `hasCapturedLead` (todos prontos)
- API `/api/leads` (Story 001/002, Done)
- Padrão de página estabelecido em `/foto` (Story 014)

## Complexidade

**S (pequena).** Uma página nova seguindo padrão consolidado, sem mudança de
infra nem de API. O esforço maior é a redação dos três prompts.

## Riscos

- **R1** — Prompt de geração de imagem no ChatGPT pode variar de qualidade entre
  modelos (GPT-4o/image). Mitigação: prompt completo com instruções de estilo
  explícitas (traço manuscrito, setas, layout de caderno).
- **R2** — `git add -A` arrasta arquivos soltos do repo. Mitigação: adicionar
  apenas `src/app/estudogpt/page.tsx`, `src/components/layout/app-shell.tsx` e
  esta story.

## Definition of Done

- Rota `/estudogpt` funcionando em dev (`npm run dev`)
- Os três prompts liberados só após lead
- `npm run build` verde
- Story marcada como Done após QA PASS
- Push/deploy somente após autorização do dono

## File List

- `src/app/estudogpt/page.tsx` (novo) — página completa com os 3 prompts gated
- `src/components/layout/app-shell.tsx` (editado) — slug `/estudogpt` em `STANDALONE_ROUTES`
- `src/components/lead-gate.tsx` (editado) — prop opcional `buttonTextColor` (default `#ffffff`, retrocompatível)
- `docs/stories/015-estudogpt-page.md` (novo) — esta story

## QA Results

- **Veredito:** PASS
- **Build:** `npm run build` compilou com sucesso; `/estudogpt` gerada como rota estática
- **ACs:** AC1–AC9 atendidos
- **Concern (não-bloqueante):** `buttonTextColor` estende componente compartilhado `LeadGate`; mudança retrocompatível por default, sem impacto nas demais páginas

## Change Log

- Draft criado por @mestre — Story 015
- Validada por @produto: GO 10/10, Draft → Ready
- Implementada por @desenvolvedor: página + rota + extensão do LeadGate; build verde
- QA por @qualidade: PASS; Ready → InProgress → InReview → Done (aguardando push)
