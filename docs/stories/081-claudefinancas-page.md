# Story 081 - Página /claudefinancas: Claude Financeiro Pessoal (novidade de 05/11/2026)

**Status:** Done (QA PASS em `6d372a7`; lead de teste conferido em produção)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-06
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

---

## Descrição

Pedido do Rafa (06/11/2026, por chat): isca nova em `sowsales.com.br/xquads/claudefinancas` para o vídeo sobre o Personal Finance do Claude, a novidade de finanças pessoais anunciada pela Anthropic. O material a entregar é o link do artigo oficial:

`https://claude.com/resources/articles/introducing-personal-finance-in-claude`

O visitante preenche o `LeadGate` padrão e só depois recebe o resumo em português do anúncio e o link do artigo oficial, mais o link da central de ajuda do Claude.

### Verificação da fonte (conferida em 06/11/2026)

| Item | Valor conferido |
|---|---|
| Artigo | Introducing Personal Finance in Claude, publicado em 05/11/2026, 5 min de leitura |
| Status | Beta, começando a sair naquela semana |
| Países | Estados Unidos |
| Planos | Pro, Max e Ultra (pagos) |
| Acesso | Somente leitura, via Plaid, autorizado pelo próprio usuário no site do banco |
| Dados visíveis | Nome do banco, nome e tipo da conta, 4 últimos dígitos, saldo, limite e até 2 anos de transações, só das contas conectadas |
| Treino de modelo | Conversas na área de finanças não são usadas para treinar modelos |
| O que não faz | Não move, não gerencia e não investe dinheiro; não é recomendação de investimento; pode errar |
| Central de ajuda | `https://support.claude.com/en/articles/18185620-use-personal-finance-with-claude` |

Nenhum número, preço ou requisito foi inventado. Os valores em dólar que aparecem na página são os exemplos fictícios do próprio anúncio, identificados como exemplo.

### Verificação de sobreposição

`src/app/claudefinancas` não existia. As páginas de tema Claude no projeto (`/claude`, `/claudelinkedin`, `/agenteclaude`, `/ensinarclaude`, `/cursosclaude`, `/efeitos`) tratam de outros assuntos. Nenhuma fala de finanças pessoais. Sem duplicação.

### Decisões de copy (minhas, para o Rafa aprovar na prévia)

- Título e subtítulo no padrão das outras iscas, em linguagem de quem não é desenvolvedor. Cor `ACCENT` `#4ADE80`.
- Como a ferramenta é beta e só existe nos Estados Unidos, os avisos de disponibilidade (país, planos, Plaid com bancos de lá, artigo em inglês e o aviso de que não é recomendação de investimento) ficam **depois do gate**, no conteúdo liberado, por decisão do Rafa em 06/11. Antes do gate a página fala do produto, sem o bloco de país. A página não promete uso no Brasil.
- Depois do gate: 3 passos de configuração, o que a ferramenta ainda não faz, botão para o artigo oficial e link da central de ajuda, com a data de conferência.
- Sem oferta nova: o fim da página é o `SalesCta` padrão (`utm_content=claudefinancas`).

### Pontos para o Rafa saber

1. A isca entrega o link, mas hoje a novidade não está disponível no Brasil: a página diz isso com clareza antes do gate. Quem quer só o link, preenche o formulário e recebe.
2. O artigo é em inglês. A página entrega o resumo em português junto com o link, para o leitor entender antes de abrir.
3. A disponibilidade é por país e por plano: quando a Anthropic mudar isso, a página precisa de uma story de atualização.

---

## Acceptance Criteria

- AC1 rota `/claudefinancas` renderiza sem erro de build e sem erro no console
- AC2 linguagem de quem não é desenvolvedor
- AC3 avisos de disponibilidade (beta, só EUA, planos pagos, artigo em inglês) no conteúdo liberado, depois do gate, por decisão do Rafa
- AC4 conteúdo liberado atrás do `LeadGate` com `source="claudefinancas-page"`
- AC5 formulário com os 5 campos do padrão (nome, e-mail, telefone, área de atuação, faturamento mensal)
- AC6 link do artigo oficial e da central de ajuda corretos e respondendo
- AC7 em `localhost` aparece destravado, com a tarja "PRÉVIA LOCAL"
- AC8 `SalesCta` com `utmContent="claudefinancas"` e assinatura `@rafa.grandi`
- AC9 sem travessão em nenhum texto da página
- AC10 nenhum fato, número ou requisito sem fonte no artigo oficial

## Escopo

**IN:** `src/app/claudefinancas/page.tsx`, esta story.
**OUT:** `LeadGate`, `SalesCta`, `/api/leads`, layout, pixel, `next.config`, outras páginas.

## Riscos

- Novidade em beta e por região: se a Anthropic liberar o Brasil, a página fica desatualizada e precisa de story de ajuste.
- Teste de lead ponta a ponta só em produção (as variáveis do webhook não existem em local).
- **Risco aceito pelo Rafa (06/11):** o aviso de disponibilidade fica só no conteúdo liberado. Quem está no Brasil descobre que a ferramenta não está disponível aqui apenas depois de deixar os dados no formulário.

## Definition of Done

AC1 a AC10, QA independente PASS, "pode subir" do Rafa, validado em produção.

## Change Log

- 2026-11-06: story criada e página implementada em local (Diego).
- 2026-11-06: ajuste pedido pelo Rafa: o bloco de disponibilidade saiu de antes do gate e passou para o conteúdo liberado, logo depois do formulário. Conferido em local e publicado, com o "pode subir" do Rafa no mesmo dia.
- 2026-11-06: conferido em produção (deploy `xquads-fm3tbwqci`): com o gate ativo não aparece nenhuma menção ao Brasil; com lead já capturado no navegador (`xquads_lead_captured=1`) o bloco aparece logo antes dos passos, com os dois links corretos e console limpo. Envio de lead real pendente.
- 2026-11-06: QA CONCERNS aplicada: (1) o item sobre países virou "o anúncio não fala de outros países nem de data para chegar ao Brasil", no lugar da afirmação sobre bancos dos EUA; (2) "sem você notar" saiu do card de comparação; (3) "não tem instalação" saiu do passo 1. Republicada no mesmo dia.
- 2026-11-06: segunda revisão da QA: título do bloco virou "Disponibilidade: ainda não funciona no Brasil" (era "Antes de tudo: ...", que ficava estranho depois do gate) e o risco aceito pelo Rafa ficou registrado em Riscos.
- 2026-11-06: lead de teste em produção, com o ok do Rafa e dado fictício: nome "Teste Diego isca claudefinancas", e-mail `diego.teste+claudefinancas@example.com`, telefone (11) 99999-0000, área Tecnologia e desenvolvimento, faturamento de R$ 0 a R$ 20 mil. POST `/xquads/api/leads` 200, página destravou. Linha conferida na planilha de leads do Xquads, aba Workshop: 06/11/2026 09:40:50, origem `claudefinancas-page`, com telefone normalizado `5511999990000`. GENE CRM: sem erro nem aviso no log de produção no mesmo minuto (o log registraria falha de webhook). Story fechada como Done; QA PASS no commit `6d372a7`.

## File List

- `src/app/claudefinancas/page.tsx` (novo)
- `docs/stories/081-claudefinancas-page.md` (novo)
