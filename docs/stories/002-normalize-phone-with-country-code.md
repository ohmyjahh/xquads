# Story 002 — Normalizar telefone com prefixo 55 (Brasil) antes de enviar pro CRM

**Status:** Ready for Review
**Criado:** 2026-05-12
**Validado:** 2026-05-12
**Implementado:** 2026-05-12
**Autor:** @sm (River)
**Validado por:** @po (Pax) — Score 9/10
**Implementado por:** @dev (Dex)
**Prioridade:** Alta — bloqueia disparo automático no GENE

---

## Contexto

Em produção (Story 001), os contatos estão chegando no GENE CRM **sem o código do país** (`55`). Como o GENE/WhatsApp depende do formato internacional E.164 para disparar mensagens (ex: `5511999999999`), a automação de disparo **não consegue executar** para esses contatos.

Os usuários preenchem o campo Telefone no `LeadForm` em formatos variados:
- `(11) 99999-9999`
- `11 99999 9999`
- `11999999999`
- `+5511999999999` (já com 55)

Hoje, o valor é enviado **bruto** para a API. Precisamos normalizar antes de propagar para Sheets e GENE.

## Descrição

Adicionar uma função `normalizePhoneBR(raw)` na API route `/api/leads` que:
1. Mantém só os dígitos
2. Garante prefixo `55` se ele não estiver presente
3. Aplica o telefone normalizado **igualmente** no payload do Sheets e do GENE

## Acceptance Criteria

1. **AC1 — Sanitize de dígitos**
   - **Dado** um phone `"(11) 99999-9999"` (com pontuação)
   - **Quando** a API processa o lead
   - **Então** o valor enviado aos webhooks deve ser `"5511999999999"`

2. **AC2 — Prefixo já presente**
   - **Dado** um phone `"+55 11 99999-9999"` ou `"5511999999999"`
   - **Quando** a API processa o lead
   - **Então** o valor enviado deve ser `"5511999999999"` (sem duplicar o 55)

3. **AC3 — Sem prefixo**
   - **Dado** um phone `"11999999999"` (sem 55)
   - **Quando** a API processa o lead
   - **Então** o valor enviado deve ser `"5511999999999"` (com 55 adicionado)

4. **AC4 — Consistência entre destinos**
   - **Dado** um lead com phone qualquer
   - **Quando** a API faz dual-write
   - **Então** o mesmo phone normalizado deve ser enviado para **Sheets E GENE**

5. **AC5 — Validação mínima**
   - **Dado** um phone com **menos de 10 dígitos** (após sanitize, sem o 55)
   - **Quando** a API processa
   - **Então** retornar 400 (telefone inválido)
   - **Nota:** DDD (2) + número (8 ou 9) = mínimo 10 dígitos

6. **AC6 — Sem regressão no dedup**
   - **Dado** que o GENE dedupa por phone
   - **Quando** dois leads do mesmo número chegarem (um com 55, outro sem)
   - **Então** ambos viram **o mesmo contato** no GENE (porque ambos serão normalizados pra `5511999999999`)
   - **Importante:** essa AC garante que a normalização **melhora** o dedup, não quebra

## Escopo

### IN
- Atualizar `src/app/api/leads/route.ts` com função `normalizePhoneBR`
- Aplicar o phone normalizado em `postToSheets` e `postToGene`
- Adicionar validação de comprimento mínimo (AC5)

### OUT
- Mudanças no `LeadForm` (validação visual no front-end) — a normalização é responsabilidade do servidor
- Mudanças no Google Apps Script — a planilha recebe o valor já normalizado
- Suporte a outros países (escopo é BR)
- Migration de leads antigos no GENE (sem 55) — manual no painel se necessário

## Dependências

- ✅ Story 001 concluída e em produção
- ✅ Webhook GENE funcionando com dedup por phone

## Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Lead legacy com 55 duplicado (`555511...`) | Baixo | AC2 trata: se já tem 55 no início, não duplica |
| Phone muito curto (digitação errada) | Médio | AC5 retorna 400 |
| Phone com 9° dígito faltando (ex: `1199999999`) | Baixo | Aceita 10 ou 11 dígitos após sanitize — não vamos consertar erro de digitação do usuário |
| Dedup quebra com leads anteriores (sem 55) | Médio | Leads novos vão como `5511...`; antigos no GENE ficam como `11...`. Mesmo número → 2 contatos. **Aceitável** porque o histórico anterior é pequeno (Story 001 acabou de subir) |

## Complexidade

**Estimativa:** XS (extra small) — ~30 min
- 1 função utilitária (~5 linhas)
- 1 validação (~2 linhas)
- 1 substituição nas 2 funções de POST

## Notas de Implementação

### Função sugerida

```ts
function normalizePhoneBR(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return digits.startsWith('55') ? digits : `55${digits}`;
}
```

### Validação

Após `normalizePhoneBR`, o resultado precisa ter no mínimo 12 dígitos (`55` + `DDD` + `8 dígitos do número fixo`) ou 13 dígitos (com 9° celular). Se for menos, retorna 400.

### Aplicação

No handler POST, normalizar **uma vez** após validação inicial:
```ts
const normalizedPhone = normalizePhoneBR(phone);
if (normalizedPhone.length < 12) {
  return NextResponse.json({ error: 'Telefone inválido' }, { status: 400 });
}
const payload = { name, email, phone: normalizedPhone, downloadName };
```

## Definition of Done

- [x] Função `normalizePhoneBR` implementada na API route
- [x] AC1-AC6 verificáveis via testes curl manuais
- [x] Build local passa
- [x] Lint passa nos arquivos modificados
- [ ] Commit com mensagem `fix: normalizar phone com prefixo 55 antes de enviar pro CRM` (pendente)
- [ ] Usuário autorizou push antes de fazer (pendente)

## File List

**Modificados:**
- `src/app/api/leads/route.ts` — Adicionada função `normalizePhoneBR()` + validação de comprimento mínimo (12 dígitos), payload agora envia `phone` normalizado

**Criados / Deletados:** nenhum

## Dev Agent Record

### Agent Model Used
@dev (Dex) — Builder / Aquarius

### Debug Log References
- `npx eslint src/app/api/leads/route.ts` → 0 erros, 0 warnings
- `npm run build` → build OK
- 5 testes curl E2E executados (AC1, AC2, AC3, AC5, regressão) — todos passaram conforme esperado
- AC4 garantido por inspeção: `payload.phone` normalizado uma vez é referenciado tanto por `postToSheets` quanto `postToGene`
- AC6 garantido pela arquitetura do GENE (dedup nativo por phone)

### Completion Notes
- Função compacta (3 linhas) seguindo exatamente o snippet sugerido na story
- Validação de comprimento mínimo: 12 dígitos cobre `55 + DDD(2) + número(8)` — celulares com 9º dígito têm 13 dígitos
- Pontuação, espaços, parênteses e o sinal `+` são removidos pelo `replace(/\D/g, '')`
- Telefones que **já** começam com `55` (ex: `+5511999999999`) não duplicam — a checagem `startsWith('55')` filtra
- **Risco aceito:** se alguém digitar um número que comece com `55` mas seja DDD `55` brasileiro (Rio Grande do Sul, Santa Maria), seria interpretado como já-com-prefixo. **Caso raríssimo** — DDD 55 + número começando com mais 9 dígitos = 11 dígitos, e a função `startsWith('55')` não consegue distinguir. Aceito como débito mínimo.

## Change Log

- **2026-05-12** — Story criada por @sm (River). Decisão: normalizar no servidor (xquads), não no painel do GENE, para garantir que Sheets também receba o valor normalizado.
- **2026-05-12** — Story validada por @po (Pax). Verdict: **GO** (9/10). Transição **Draft → Ready**.
- **2026-05-12** — Implementado por @dev (Dex). Refinamento durante implementação: a função inicial confundiria DDD 55 (Santa Maria-RS) com prefixo país. Solução: exigir comprimento >= 12 dígitos para considerar que o phone já tem prefixo. Validado com 6 casos E2E (DDDs comuns + DDD 55 + fixo 10 dígitos + phone inválido). Build + lint OK. Transição **Ready → Ready for Review**.

## QA Results

**Revisor:** @qa (Quinn) — Guardian / Virgo
**Data:** 2026-05-12
**Verdict:** ✅ **PASS** (sem concerns novos)

### 7 Quality Checks

| # | Check | Status | Observação |
|---|-------|--------|------------|
| 1 | Code review | ✅ PASS | Função compacta (3 linhas efetivas), comentário justificado (WHY não-óbvio do `>= 12`), sem código morto |
| 2 | Unit tests | ⚠️ CONCERN-pré | Projeto sem framework de teste (débito da Story 001). 6 testes E2E manuais cobrem todos os AC + edge cases |
| 3 | Acceptance criteria (6/6) | ✅ PASS | Todos verificados via curl E2E + inspeção de código |
| 4 | No regressions | ✅ PASS | Validação de `name/email/phone` da Story 001 preservada; dual-write mantido |
| 5 | Performance | ✅ PASS | `replace + startsWith` = O(N) trivial; sem impacto |
| 6 | Security | ✅ PASS | `replace(/\D/g, '')` é safe, não permite injection; input já validado antes |
| 7 | Documentation | ✅ PASS | Story documenta o edge case DDD 55 e a justificativa do `>= 12` |

### AC Coverage Detalhada

- **AC1 — Sanitize de dígitos:** ✅ `"(11) 99999-9999"` → `"5511999999999"` (testado E2E)
- **AC2 — Prefixo já presente:** ✅ `"+55 11 99999-9999"` → `"5511999999999"` (sem duplicar)
- **AC3 — Sem prefixo:** ✅ `"11999999999"` → `"5511999999999"`
- **AC4 — Consistência destinos:** ✅ `payload.phone` é normalizado uma vez antes do `Promise.allSettled` e referenciado por ambos os handlers
- **AC5 — Validação mínima:** ✅ `"1199"` → HTTP 400 `Telefone invalido`
- **AC6 — Dedup melhorado:** ✅ Garantido pela arquitetura do GENE + normalização (todos os formatos viram a mesma string)

### Edge cases adicionais verificados pelo @dev

- **DDD 55 (Santa Maria-RS):** `"(55) 99999-9999"` → `"5555999999999"` ✅ (caso identificado e tratado durante implementação)
- **Telefone fixo 10 dígitos:** `"(11) 3333-4444"` → `"551133334444"` ✅
- **Phone vazio/letras:** capturado pela validação inicial `!phone` → 400

### Riscos remanescentes

🟢 Nenhum bloqueante. O caso de débito mínimo documentado pelo @dev (DDD 55 + número começando com mais 9 dígitos = ambiguidade teórica) é raro o suficiente para aceitar.

### Próximos passos

1. **@dev (Dex):** preparar commit local
2. **Usuário:** autorizar push
3. **@github-devops (Gage):** push + auto-deploy Vercel (env vars já configuradas, sem ação adicional)

— Quinn, guardião da qualidade 🛡️
