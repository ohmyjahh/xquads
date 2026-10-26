# Story 076 — Quinto campo do formulário: faturamento mensal

**Status:** Done
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-10-26

---

## Descrição

Acrescentar um quinto campo aos formulários de captura: **"Qual o seu faturamento mensal?"**,
em menu de seleção, em **todas** as páginas. Hoje são quatro campos: nome, e-mail, telefone e
área de atuação (este último adicionado pela Story 066).

Prioridade do dono, reafirmada desde a 066: **a planilha do Google Sheets é o que importa.**
Ela recebe lead o tempo todo e não pode parar.

### Decisões do dono (coletadas antes de implementar)

| Decisão | Escolha |
|---|---|
| Faixas | 0–20k, 20–50k, 50–100k, 100–500k, acima de 500k |
| Obrigatoriedade | **Obrigatório, sem saída** — igual aos outros quatro |
| Alcance | Todas as páginas, nos dois componentes |
| Período | **Mensal** — enfatizado por ele; precisa estar claro no rótulo |

A primeira faixa começa em **zero**, o que dispensa uma opção "ainda não faturo": quem não
fatura está contemplado, e isso evita que Estudante e Funcionário (opções do campo de área)
fiquem sem resposta verdadeira.

---

## O que o código não resolve sozinho

O destino final é um **Google Apps Script** fora deste repositório, que monta a linha por
posição:

```javascript
sheet.appendRow([data.date, data.email, data.phone, data.download, data.area, data.name]);
```

O código deste repositório **coleta e envia**. Para o dado **aparecer na planilha**, o dono
precisa criar a coluna e acrescentar `data.faturamento` ao final desse `appendRow`. Isso será
entregue pronto, com destaque.

## Por que nada cai, em qualquer ordem de publicação

| Cenário | O que acontece |
|---|---|
| Código sobe antes do script | O payload ganha uma chave a mais. Script posicional ignora o que não conhece. Leads seguem chegando com os seis dados de hoje |
| Script muda antes do código | A coluna nova fica em branco até o deploy. Nenhum lead se perde |
| Leads antigos | Não são tocados; a coluna fica vazia para eles |

Mesmo raciocínio validado na Story 066, que subiu sem incidente.

## A regra crítica, herdada da 066

A ordem das chaves do payload do Sheets é **histórica**. Campo novo entra **no fim**, nunca no
meio — entrar no meio desloca `download` e `date` e embaralha a planilha. O comentário está no
código e deve continuar lá.

## Coordenação com a Story 071

A Story 071 (3º destino, CRM da RAXO Labs) está **pronta e parada** na branch
`feat/071-terceiro-destino-raxo-labs` e **também altera `api/leads/route.ts`**. Se esta story
mexer na rota sem tratar aquilo, a 071 subiria depois sem o campo novo no terceiro destino.

**Tratamento:** implementar na `main` e, no mesmo trabalho, aplicar o campo também na branch da
071, para que ela já suba completa quando for autorizada.

---

## Acceptance Criteria

**AC1** — Campo de seleção "Qual o seu faturamento mensal?" presente no `LeadGate` e no
`LeadForm`, posicionado após o campo de área de atuação.

**AC2** — Campo **obrigatório**: o envio não acontece sem ele, nos dois componentes.

**AC3** — As faixas ficam num **arquivo único compartilhado**, nunca duplicadas nos componentes.

**AC4** — As faixas são exatamente as cinco escolhidas pelo dono, e o rótulo deixa claro que o
período é **mensal**.

**AC5** — A rota `/api/leads` aceita `faturamento` e o repassa ao Google Sheets **como última
chave do payload**.

**AC6** — O campo é **opcional no tipo TypeScript**, para que chamadas sem ele continuem válidas
(retrocompatibilidade).

**AC7** — As cinco chaves históricas do payload do Sheets permanecem na mesma ordem, e `area`
continua antes de `faturamento`.

**AC8** — Um lead enviado **sem** o campo continua sendo aceito e gravado, sem erro.

**AC9** — A rota continua respondendo `{ok:true}` com webhook fora do ar, como hoje.

**AC10** — O campo é aplicado também na branch da Story 071, no terceiro destino.

**AC11** — Nenhum lead de teste chega à planilha de produção durante a validação.

---

## Escopo

### IN
- `src/lib/faturamento.ts` (novo)
- `src/components/lead-gate.tsx`
- `src/components/downloads/lead-form.tsx`
- `src/app/api/leads/route.ts`
- A mesma alteração aplicada na branch `feat/071-terceiro-destino-raxo-labs`

### OUT
- Alterar as páginas uma a uma — os componentes são compartilhados
- Mudar o campo de área de atuação ou qualquer campo existente
- Validar faturamento no servidor além do que o formulário já exige
- Alterar o Apps Script (está fora do repositório; é do dono)
- Publicar a Story 071, que segue aguardando autorização separada

---

## Dependências

- Story 066 (campo de área) — publicada, é a base deste trabalho
- Nenhuma dependência nova de pacote

---

## Complexidade

**M (3 pontos).** O código é pequeno e já tem precedente, mas toca a rota que recebe **todos** os
leads de 76 pontos de captura. O peso está no teste, não na escrita.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Quebrar a gravação na planilha de produção | **Crítica** | AC7; ordem das chaves preservada; teste com servidor falso capturando o payload real |
| Campo entrar no meio do payload e embaralhar colunas | **Crítica** | AC5 e AC7; comentário no código mantido |
| Lead de teste poluir a planilha | Alta | AC11: webhooks apontados para localhost; `.env.local` não define os reais |
| Quinto campo obrigatório derrubar a conversão | Média | Decisão informada do dono; faixas largas e em menu, não digitação |
| Story 071 subir depois sem o campo | Média | AC10: aplicar também na branch dela |
| Chamada antiga sem o campo passar a falhar | Média | AC6 e AC8: campo opcional no tipo, teste específico |

---

## Definition of Done

- [x] Os 11 ACs conferidos
- [x] `npm run lint` sem erro novo
- [x] `npm run build` passando
- [x] Payload real capturado e conferido chave a chave, na ordem
- [x] Testado: com campo, sem campo, webhook fora do ar
- [x] Apps Script atualizado entregue ao dono
- [x] Prévia aberta no navegador e mostrada ao Rafa
- [x] Aprovação explícita do Rafa antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-10-26 | @mestre | Story criada após estudo da 066 e decisões do dono |
| 2026-10-26 | @produto | Validação 10/10 (GO). Status Draft → Ready |
| 2026-10-26 | @desenvolvedor | Campo implementado nos dois componentes, na rota e no 3º destino (branch da 071) |
| 2026-10-26 | @qualidade | QA PASS 11/11 |

## QA Results

**Verdict: PASS** — 11/11 ACs.

### A ordem do payload, capturada de verdade

Servidor local simulando o Apps Script, com `object_pairs_hook` preservando a ordem recebida:

```
name -> email -> phone -> download -> date -> area -> faturamento
```

Idêntica nas três capturas. O campo novo é o último, como manda a regra herdada da 066.

### Cenários executados contra a rota real

| # | Cenário | Resultado |
|---|---|---|
| 1 | Lead completo (5 campos) | ✅ `{ok:true}`, payload com `faturamento` preenchido |
| 2 | Lead **sem** faturamento (chamada antiga) | ✅ aceito, `faturamento: ''` |
| 3 | Lead **sem** área nem faturamento (legado) | ✅ aceito, ambos vazios |
| 4 | Webhook fora do ar | ✅ `{ok:true}` — comportamento de hoje preservado |
| 5 | JSON malformado | ✅ `{ok:true}` — comportamento de hoje preservado |
| 6 | Sem telefone | ✅ 400, como antes |

### A prova de que nada quebra na planilha

Simulando o `appendRow` **atual** (6 colunas) sobre os payloads capturados, as linhas saem
exatamente como hoje — o campo a mais é ignorado por um script posicional. Confirma que o código
pode subir antes do Apps Script sem perder nem embaralhar lead.

### Formulário, nos dois componentes

| Componente | Campos | Obrigatórios | Faixas |
|---|---|---|---|
| `LeadGate` (58 páginas) | 5, na ordem certa | todos | as 5 do dono |
| `LeadForm` (18 páginas) | 5, com rótulos | todos | as 5 do dono |

### AC10 — Story 071

Merge da `main` na branch sem conflito; `faturamento` acrescentado ao corpo próprio e assinado do
terceiro destino. **18/18 testes passando** — os 6 que falharam comparavam o corpo exato com
constante fixa e pegaram corretamente a chave nova; as fixtures foram atualizadas.

### AC11 — isolamento

Os webhooks apontaram para `127.0.0.1:4556` durante todo o teste. **Nenhum lead de teste chegou
à planilha de produção.** Servidor falso derrubado e capturas apagadas ao final.

### Débito reconfirmado (não corrigido, fora do escopo)

`useCopyWithLead` (`src/hooks/use-copy-with-lead.ts:22`) chama `navigator.clipboard.writeText`
**sem `try/catch`**. Se a cópia falhar, a função lança e `setShowLeadForm(true)` nunca roda: o
formulário não abre e **o lead se perde**, nas 18 páginas do `LeadForm`. Isso apareceu durante
este teste, travando a abertura do modal. Continua registrado, aguardando autorização.
| 2026-10-26 | @devops | Publicado (`d4f0f32`). Deploy no ar em ~20 s |
| 2026-10-26 | @qualidade | **Validado em produção.** Lead de teste: o navegador enviou `faturamento` e a rota respondeu 200. Dono confirmou que leads reais já chegam com o campo preenchido. Status → Done |

## Validação em produção

Com o `fetch` do navegador interceptado na página real:

```
enviado:   faturamento: "De R$ 100 mil a R$ 500 mil"
resposta:  200 {ok: true}
gate:      destravou
```

O dono confirmou em seguida que **leads reais já estão chegando preenchidos**, o que fecha o
ciclo: formulário → rota → Apps Script → planilha, com a coluna G gravando.

**Pendência operacional (do dono):** apagar a linha de teste
`TESTE CLAUDE - pode apagar` / `teste-faturamento@exemplo.invalido`.
