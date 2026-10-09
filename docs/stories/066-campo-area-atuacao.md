# Story 066 — Campo "área de atuação" no formulário de captura

**Status:** Done

## Descrição

Acrescentar uma quarta pergunta aos formulários de lead: **qual sua área de atuação**, num menu de
seleção. Hoje são três campos (nome, e-mail, telefone) e o dado chega ao Google Sheets e ao GENE.

Prioridade declarada pelo dono: **a planilha é o que importa**; o GENE é secundário e ele não está
mais usando.

## A parte que o código não resolve sozinho

O destino final é um **Google Apps Script** publicado como webhook, fora deste repositório. O que
acontece com um campo novo depende de como aquele script está escrito:

| Como o script monta a linha | O que acontece com o campo novo |
|---|---|
| `appendRow([name, email, phone, download, date])`, posicional | O campo chega no JSON e é **ignorado**. Nada quebra, mas nada aparece |
| Lê as chaves do objeto e casa com o cabeçalho | Pode já funcionar ao adicionar a coluna |

Ou seja: a alteração no repositório **coleta e envia** o dado; fazer ele **aparecer na planilha**
exige ajustar o script e criar a coluna. Isso é do lado do dono, e será comunicado com destaque.

## Por que nada quebra, em qualquer ordem

As duas pontas são retrocompatíveis, o que elimina a necessidade de janela de manutenção:

- **Se o código subir antes do script:** o payload passa a ter um campo a mais. Um script posicional ignora campos que não conhece. Os leads continuam chegando com os quatro dados de sempre.
- **Se o script mudar antes do código:** a coluna nova fica em branco até o deploy. Nenhum lead se perde.
- **Leads antigos:** não são tocados. A coluna fica vazia para eles, o que é o esperado.

## Decisões do dono

- Campo **obrigatório**.
- Aplicado nos **dois** componentes: `LeadGate` (51 páginas) e `LeadForm` (16 páginas), para a coluna não nascer irregular.

## Observação sobre a lista de opções

O dono citou "marketing, saúde, jurídico, empreendedor/autônomo, funcionário". Vale registrar que
isso mistura **dois eixos**: setor de atuação (marketing, saúde, jurídico) e vínculo de trabalho
(empreendedor, funcionário). Uma pessoa pode ser as duas coisas: advogada e autônoma.

Manter os dois eixos numa lista só foi a escolha, por ser o que o dono pediu e por manter um campo
único, de atrito baixo. Separar em dois campos daria dado mais limpo, ao custo de uma pergunta a
mais. Fica registrado para decisão futura.

## Critérios de Aceite

- **AC1** — Campo de seleção "Qual sua área de atuação?" no `LeadGate` e no `LeadForm`.
- **AC2** — Campo **obrigatório** no formulário; o envio não acontece sem ele.
- **AC3** — As opções ficam num **arquivo único compartilhado**, não duplicadas nos dois componentes.
- **AC4** — A rota `/api/leads` aceita o campo `area` e o repassa ao Google Sheets.
- **AC5** — **A rota continua aceitando requisição sem `area`**, respondendo 200. Retrocompatibilidade é obrigatória: qualquer chamada antiga precisa seguir funcionando.
- **AC6** — O campo também vai ao GENE, sem quebrar o payload atual.
- **AC7** — O campo enviado ao Sheets é sempre string, nunca `undefined`, para o script não receber tipo inesperado.
- **AC8** — Visual do campo igual ao dos outros três, respeitando a cor de destaque de cada página.
- **AC9** — Nenhuma alteração nos 67 arquivos de página. A mudança fica nos dois componentes e na rota.
- **AC10** — `npm run build` verde e lint limpo.

## Escopo

**IN:** os dois componentes de formulário, a rota de API e o arquivo de opções.
**OUT:** alterar o Apps Script (fora do repositório); mexer nas páginas; remover o GENE do fluxo.

## Riscos

- **R1 (alto)** — O campo ser coletado e não aparecer na planilha, por falta do ajuste no script. *Mitigação:* comunicar ao dono com destaque, com o trecho de script pronto.
- **R2 (médio)** — Campo obrigatório reduzir conversão. *Mitigação:* menu de seleção em vez de texto livre, que é o formato de menor atrito.
- **R3 (baixo)** — Quebrar chamadas existentes. *Mitigação:* AC5.

## Complexidade

**S (pequena).** Três arquivos alterados, um criado.

## Definition of Done

- Campo nos dois formulários, opções centralizadas, rota retrocompatível.
- Orientação de ajuste do Apps Script entregue ao dono.
- Lint limpo, build verde, mostrado em local antes do push.

## Change Log

- **2026-10-09** — Draft criado por @mestre — Story 066
- **2026-10-09** — Validada por @produto: **GO 10/10**. A story identifica que a entrega depende de uma alteração fora do repositório e trata isso como risco principal, em vez de assumir que o campo apareceria sozinho na planilha. Retrocompatibilidade virou critério explícito, e a análise de ordem de publicação mostra que não há janela de quebra. Draft → **Ready**.
- **2026-10-09** — Implementada por @desenvolvedor: `src/lib/areas-atuacao.ts` (novo), `lead-gate.tsx`, `lead-form.tsx` e `api/leads/route.ts`.
- **2026-10-09** — **Achado durante o teste, antes da publicação:** a primeira versão inseria `area` **entre** `phone` e `download` no payload do Sheets. Um Apps Script que monte a linha por posição (`Object.values`, ou iteração sobre as chaves) teria **deslocado as colunas**, jogando `download` e `date` para o lugar errado. Corrigido: `area` passou a ser a **última chave**, preservando a ordem histórica das cinco primeiras. Comentário no código registra o motivo, para ninguém reordenar depois.
- **2026-10-09** — QA por @qualidade: **PASS.** Oito testes executados contra um servidor que simula o Apps Script, capturando o payload real:
  | # | Cenário | Resultado |
  |---|---|---|
  | T1 | Lead com área | 200, payload completo |
  | T2 | **Lead sem o campo (chamada antiga)** | **200**, `area` vai como string vazia |
  | T3 | Área vazia | 200, `area: ''` |
  | T4 | Campos obrigatórios faltando | 400, mensagem correta |
  | T5 | Telefone inválido | 400, mensagem correta |
  | T6 | **Webhook fora do ar** | 200, erro registrado no log, rota não quebra |
  | T7 | JSON malformado | 200, erro capturado, rota não quebra |
  | T8 | Requisição após as falhas | 200, rota segue viva |
  - **Ordem das chaves idêntica nos 4 leads capturados**: `name, email, phone, download, date, area`.
  - `area` **nunca** chega como `undefined`; sempre string.
  - Formulário submetido de verdade no navegador, nos **dois** componentes: `LeadGate` (via `/cortepodcast`) e `LeadForm` (via `/downloads`). Os dois gravaram o payload correto.
  - Select obrigatório, 13 opções mais o placeholder, em ambos.
  - **Nenhuma página alterada.** A mudança ficou em 3 arquivos mais 1 criado.
  - Nenhum lead de teste foi para a planilha de produção: os webhooks apontaram para um servidor local durante todo o teste.
  - Lint limpo, `tsc --noEmit` limpo, `npm run build` verde.

## Achado colateral, fora do escopo

O hook `useCopyWithLead` (usado pelas 16 páginas do `LeadForm`) chama `navigator.clipboard.writeText` **sem tratamento**. Se a cópia falhar, a exceção interrompe a função e o `setShowLeadForm(true)` nunca roda: o formulário não abre e **o lead não é capturado**. Em produção o risco é baixo, porque o site é HTTPS e `navigator.clipboard` existe, mas uma permissão negada pelo navegador produz o mesmo efeito. Mesmo defeito já corrigido nas páginas novas, nas Stories 040 e 047. Fica registrado para story própria.

## File List

- `src/lib/areas-atuacao.ts` (novo)
- `src/components/lead-gate.tsx`
- `src/components/downloads/lead-form.tsx`
- `src/app/api/leads/route.ts`
- `docs/stories/066-campo-area-atuacao.md`
- **2026-10-09** — **Apps Script do dono inspecionado.** O script original gravava apenas quatro valores: `[data.date, data.email, data.phone, data.download]`. Descoberta relevante: **`data.name` nunca era gravado** — o nome do lead era coletado no formulário, trafegava pela API e era descartado no destino. A planilha também estava com a coluna D sem cabeçalho.
- **2026-10-09** — Dono optou pela versão que grava **seis** colunas: `[date, email, phone, download, area, name]`, criando os cabeçalhos `Origem` (D), `Área` (E) e `Nome` (F). Além do campo novo, isso recupera a captura do nome, que estava perdida.
- **2026-10-09** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
