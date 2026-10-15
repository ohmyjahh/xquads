# Story 072 — Página /gravacao: Recordly, gravação de tela profissional

**Status:** Ready
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-14

---

## Descrição

Rafa pediu uma página nova para distribuir o repositório `github.com/webadderallorg/recordly`,
na rota `/gravacao`, com o tema "gravação de tela de forma profissional".

O Recordly é um gravador de tela e editor open-source (AGPL 3.0) para macOS, Windows e Linux.
O diferencial dele é entregar, dentro do próprio app e de graça, o acabamento que normalmente
exige um motion designer ou uma ferramenta paga: zoom automático baseado na atividade do cursor,
cursor suavizado com desfoque de movimento, moldura estilizada com fundo/sombra/cantos
arredondados e bolha de webcam reativa ao zoom.

O público do Xquads grava demonstração de produto, aula e conteúdo. A dor real é que a gravação
crua fica amadora e o acabamento custa tempo de edição. A página precisa nomear essa dor e
entregar o caminho curto: baixar, gravar, exportar.

### Verificação da fonte (feita antes desta story)

| Item | Resultado |
|---|---|
| Repositório existe | Sim — 33.720 estrelas, TypeScript/Electron |
| Projeto vivo | Sim — commits em 14/10/2026, PR #1121, 5+ contribuidores |
| Release com binário | v1.4.0 (08/09/2026): `.dmg` ARM/x64, `.exe` Windows, `.AppImage` Linux |
| Downloads reais | 25.654 no `.dmg` ARM, 69.295 no `.exe` Windows |
| Licença | AGPL 3.0 (o GitHub marca NOASSERTION porque o arquivo é `LICENSE.md`) |
| Site oficial | `recordly.dev` — aberto no navegador, carrega e oferece download |
| Marketplace de extensões | **FORA DO AR** — `marketplace.recordly.dev` devolve erro 525 (falha de SSL) |

---

## Acceptance Criteria

**AC1** — Existe a rota `/gravacao` renderizando sem erro de build e sem erro no console.

**AC2** — A página explica o que o Recordly resolve em linguagem de quem grava conteúdo,
sem jargão de desenvolvedor e sem traduzir o README.

**AC3** — Os recursos de acabamento (zoom automático, cursor, moldura, webcam, linha do tempo,
exportação em MP4 e GIF) aparecem de forma escaneável.

**AC4** — Os requisitos de sistema estão visíveis **antes** do gate, porque são eliminatórios:
macOS 14+, Windows 10 build 19041+, Linux moderno. Quem não atende não deve gastar um lead.

**AC5** — O conteúdo liberado (link do repositório, página de releases e o passo a passo de
gravar) fica atrás do `LeadGate` compartilhado, com `source="gravacao-page"`.

**AC6** — O formulário traz os quatro campos do padrão atual, incluindo "Qual sua área de atuação?".

**AC7** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia local.

**AC8** — A página **não** linka o marketplace de extensões, que está fora do ar.

**AC9** — A licença AGPL 3.0 é informada junto do link, com a data da conferência.

**AC10** — `SalesCta` presente com `utmContent="gravacao"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/gravacao/page.tsx`
- Uso dos componentes já existentes: `LeadGate`, `SalesCta`, `hasCapturedLead`

### OUT
- Qualquer alteração em `LeadGate`, `SalesCta`, `/api/leads` ou no layout
- Menção ou link ao marketplace de extensões
- Tutorial de edição avançada — a página entrega a ferramenta, não um curso
- Comparação nominal com produto pago concorrente
- Mexer em qualquer página existente

---

## Dependências

- `LeadGate` (`src/components/lead-gate.tsx`) — já com o campo de área (Story 066)
- `SalesCta` (`src/components/sales-cta.tsx`)
- `hasCapturedLead` (`src/hooks/use-copy-with-lead.ts`)

Nenhuma dependência nova. Nenhum pacote a instalar.

---

## Complexidade

**P (2 pontos).** Página estática seguindo um padrão já repetido 30+ vezes no projeto.
O trabalho real foi a verificação da fonte, já concluída.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Linkar o marketplace, que está fora do ar | Alta | AC8 proíbe. Verificado no navegador: erro 525 |
| Pessoa em macOS 13 ou Windows antigo baixar e não rodar | Média | AC4: requisitos antes do gate, não depois |
| Projeto novo (criado em março/2026) mudar de rumo | Baixa | Data de conferência no rodapé do link |
| Usuário em Linux esperar paridade | Baixa | Dizer na página que no Linux a captura é mais simples e não esconde o cursor |
| Falso negativo na validação por `curl` (conteúdo atrás do gate) | Média | Validar abrindo no navegador, como nas stories 058/059 |

---

## Definition of Done

- [ ] Rota `/gravacao` compila e responde em local
- [ ] Todos os 10 ACs conferidos
- [ ] `npm run lint` sem erro novo
- [ ] `npm run build` passando
- [ ] Prévia aberta no navegador e mostrada ao Rafa
- [ ] Aprovação explícita do Rafa antes de qualquer push
- [ ] Após publicar: rota responde 200 em produção e o gate funciona

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-14 | @mestre | Story criada com verificação de fonte anexada |
| 2026-10-14 | @produto | Validação 10/10 (GO). Status Draft → Ready |
