# Story 086 - Página /agenda: agente de IA que agenda consultas no WhatsApp de clínica odontológica

**Status:** Done (QA PASS em produção, commit `b1ad871`, deploy `xquads-9bkyjq0nb`; teste de cadastro dispensado pelo Rafa, captura da origem `agenda-page` não provada em produção; observação O1 opcional pendente)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-10
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

## Descrição

Pedido do Alfa (10/11/2026) para o time do Instagram: isca do vídeo "AGENDA" (`projetos/instagram/roteiros/2026-11-10-agente-clinica.md`, seção 5). Palavra do vídeo: AGENDA. Slug `agenda` (o briefing sugeria `agente-clinica`; o Alfa pediu `agenda` se livre). Livre em `src/app`. Número 086; o `/cortes` (parado) pegará o próximo.

O visitante preenche o `LeadGate` e só depois recebe: alertas, fluxo em 4 etapas, prompt do agente, mensagens prontas e as fontes.

### Verificação da fonte (conferida em 10/11/2026)

| Item | Valor conferido | Fonte |
|---|---|---|
| Janela de atendimento | cronômetro de 24 h que começa quando o usuário envia mensagem ou liga; nova mensagem reinicia; fora dela "you can only send pre-approved template messages" | Meta, `whatsapp/messages/send-messages` |
| Templates | "Template messages are the only type of message that can be sent to WhatsApp users outside of a customer service window" | Meta, `whatsapp/templates/overview` |
| Dentro da janela | pode enviar texto, áudio, documento, endereço, localização, botões etc. | Meta, `send-messages` |
| Áudio recebido | existe referência de webhook para "audio messages" | Meta, índice `llms.txt` (página do webhook não lida) |
| Horários livres | `freebusy.query`: `POST /calendar/v3/freeBusy`, `timeMin`, `timeMax`, `items`; devolve `busy` por agenda | developers.google.com/calendar |
| Criar consulta | `events.insert`: `POST /calendars/{id}/events`, `start` e `end` obrigatórios, escopos `calendar` ou `calendar.events` | developers.google.com/calendar |
| Dado de saúde | LGPD art. 5º, II: "dado referente à saúde" é dado pessoal sensível; art. 11 limita o tratamento | planalto.gov.br, Lei 13.709/2018 |

**Fora da página de propósito:**
- "Até R$ 3 mil": é fala do criador do vídeo, não há fonte de preço de mercado. Nenhum valor na página.
- "41 segundos", "3 pacientes novas", "menos falta, agenda mais cheia": efeitos mostrados em demo, sem medição. Nenhuma promessa de resultado.
- Mariana Souza, Dra. Ana Lima: nomes fictícios da demo.
- Regra de IA em WhatsApp Business: não conferi a política de uso de chatbots de IA da Meta. Está na lista de lacunas.

### Escolhas de copy

- **Regra do Rafa (CONTEXTO, 10/11):** nenhum alerta antes do formulário. Os alertas abrem o conteúdo liberado. Antes do gate: título, subtítulo, os 4 cards do que a pessoa recebe e o formulário. Nada de "o que ele não faz" antes do gate.
- O prompt do agente e as mensagens são **texto meu**, montado a partir do briefing (fluxo, regra de urgência para humano, sem diagnóstico). Não é arquivo do vídeo. O Rafa aprova na prévia.
- Urgência: o agente não faz triagem nem promete horário; avisa a equipe e passa o telefone da recepção (regra do Alfa: "urgência vai para humano").
- Lembrete de 24 h: marcado como template aprovado, por causa da regra de janela.
- Cor `#2DD4BF`.

### Verificação de sobreposição
Nenhuma isca de clínica, agenda ou WhatsApp. `/airbnb`, `/vendasgpt` são de outro tema. Sem duplicação.

### Acceptance Criteria

- [x] AC1 rota `/agenda` sem erro de build nem de console
- [x] AC2 linguagem de quem não é desenvolvedor
- [x] AC3 antes do gate: só selo, título, subtítulo, os 4 cards e o formulário; nenhum alerta, aviso, bloco amarelo, prompt ou mensagem
- [x] AC4 conteúdo atrás do `LeadGate` com `source="agenda-page"` e 5 campos
- [x] AC5 depois do gate, o primeiro bloco é o alerta (sem diagnóstico, urgência para humano, LGPD, janela de 24 h)
- [x] AC6 fluxo em 4 etapas, prompt do agente e 4 mensagens com botão de copiar (try/catch com aviso de falha)
- [x] AC7 cada fato bate com a tabela da fonte; nenhum valor em reais, nenhum resultado prometido
- [x] AC8 links das fontes respondem 200
- [x] AC9 em `localhost` aparece destravada, com "PRÉVIA LOCAL"
- [x] AC10 `SalesCta` com `utmContent="agenda"` e assinatura `@rafa.grandi`
- [x] AC11 sem travessão

## Escopo
IN: `src/app/agenda/page.tsx`. OUT: componentes compartilhados, `/api/leads`, config, layout, outras páginas.

## Riscos
- Conteúdo de saúde: o texto não substitui avaliação clínica nem orientação jurídica (LGPD).
- Política da Meta para chatbots de IA no WhatsApp Business: pela imprensa (TechCrunch, citado pela QA), desde 15/01/2026 os termos do WhatsApp Business barram assistentes de IA de uso geral, e bots de atendimento da própria empresa seguem permitidos. Os termos oficiais NÃO foram lidos.
- Prompt e mensagens não testados em clínica real nem rodados em ferramenta de agente.

## DoD
AC1 a AC11, QA PASS, OK do Rafa via Alfa, ordem página, ManyChat, post.

## File List
- `src/app/agenda/page.tsx`
- `docs/stories/086-agenda-page.md`

## Change Log
- 2026-11-10: story criada e página implementada (Diego). Não publicada.
- 2026-11-11: QA – Funis de isca deu PASS (laudo `qa-agenda-2026-11-11.md`). Publicada com o OK do Rafa (via Alfa). Teste de cadastro dispensado pelo Rafa em 11/11. Observação O1 da QA (baixa) PENDENTE, exige delta de página e nova revisão: o prompt pede "o motivo da consulta" mas DADOS PESSOAIS diz "só nome e telefone"; sugestão: "nome, telefone e o tipo de consulta (avaliação, limpeza, retorno). Não peça detalhes de sintomas além do que a pessoa contar." Observação O2 registrada acima.
- 2026-11-11: QA – Funis de isca deu PASS em produção (laudo `qa-agenda-2026-11-11.md`, seção Produção). Story fechada como Done. Ressalva: teste de cadastro dispensado pelo Rafa; a captura de `agenda-page` (planilha e GENE CRM) não foi provada em produção. O1 é delta opcional, só com pedido do Alfa e nova revisão da QA.
