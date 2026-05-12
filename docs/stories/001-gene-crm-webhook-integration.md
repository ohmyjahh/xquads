# Story 001 — Integração Webhook GENE CRM nos formulários Xquads

**Status:** Ready for Review
**Criado:** 2026-05-11
**Validado:** 2026-05-11
**Implementado:** 2026-05-11
**Autor:** @sm (River)
**Validado por:** @po (Pax) — Score 9/10
**Implementado por:** @dev (Dex)
**Prioridade:** Alta

---

## Contexto

Hoje, quando um usuário preenche o formulário de captura (email + telefone) em qualquer ferramenta do xquads (carrossel, idvisual, instagram, mcpmeta, etc.), o lead é enviado apenas para uma planilha Google Sheets via webhook (`GOOGLE_SHEETS_WEBHOOK`).

Queremos que esses leads também entrem **em tempo real** num pipeline novo do GENE CRM, com a tag automática **PROMPT**, para disparar automação de mensagem comercial. O GENE já está configurado:

- **URL do webhook:** `https://api.genecrm.com.br/webhook/leads/364d80eb-51fa-4fca-a664-3ef800eda9e4`
- **Tag automática:** `PROMPT` (configurada no webhook)
- **Dedup nativo:** validado — o GENE reconhece contato existente por `phone` e retorna o mesmo registro (não duplica)
- **Payload esperado:** `{ name, phone, email }` — `phone` obrigatório

## Descrição

Implementar **dual-write** na API route `/api/leads`: continuar enviando o lead para o Google Sheets (backup/auditoria) **e em paralelo** enviar para o webhook do GENE CRM. Adicionar campo "Nome" no formulário de captura para atender ao schema do GENE.

## Acceptance Criteria

1. **AC1 — Campo Nome no formulário**
   - **Dado** que o usuário abre o `LeadForm` em qualquer ferramenta
   - **Quando** o modal aparecer
   - **Então** deve haver um campo "Nome completo" obrigatório, posicionado **antes** do email
   - **E** o campo deve seguir o mesmo estilo visual dos campos existentes (mesmo padding, border, accent color por tipo)

2. **AC2 — Validação cliente**
   - **Dado** que o usuário tenta submeter sem preencher o Nome
   - **Quando** clicar no botão de submit
   - **Então** o navegador deve bloquear o submit (via `required` HTML5)

3. **AC3 — Payload atualizado da API**
   - **Dado** que o form é submetido com `name`, `email`, `phone`, `downloadName`
   - **Quando** a API `/api/leads` for chamada
   - **Então** deve retornar 400 se `name`, `email` ou `phone` estiverem faltando

4. **AC4 — Dual-write Sheets + GENE**
   - **Dado** que a API recebe um lead válido
   - **Quando** processar a requisição
   - **Então** deve disparar dois fetches em paralelo (via `Promise.allSettled`):
     - POST para `GOOGLE_SHEETS_WEBHOOK` (formato atual + campo `name` adicionado)
     - POST para `GENE_WEBHOOK_URL` com body `{ name, phone, email }`
   - **E** ambos devem usar `await` (regra crítica Vercel serverless)

5. **AC5 — Resiliência**
   - **Dado** que um dos webhooks (Sheets OU GENE) falhe
   - **Quando** isso ocorrer
   - **Então** a API deve **continuar retornando 200** para o cliente (não bloquear o download/redirect)
   - **E** o erro deve ser logado no `console.error`

6. **AC6 — Env var configurável**
   - **Dado** que `GENE_WEBHOOK_URL` não esteja definida
   - **Quando** a API processar um lead
   - **Então** deve pular o envio pro GENE silenciosamente (igual ao comportamento atual do Sheets)
   - **E** logar warning indicando que a env var está faltando

7. **AC7 — Sem regressão na planilha**
   - **Dado** que a planilha Google Sheets atual tem colunas `date | email | phone | download`
   - **Quando** o novo payload chegar com `name`
   - **Então** o Google Apps Script deve receber o `name` e adicionar como nova coluna (ou ser ignorado se script não for atualizado — sem quebrar o append)

## Escopo

### IN
- Adicionar campo "Nome" no `src/components/downloads/lead-form.tsx`
- Atualizar tipos TypeScript do payload no form
- Atualizar `src/app/api/leads/route.ts` para:
  - Validar `name`
  - Fazer dual-write Sheets + GENE em paralelo
  - Adicionar env var `GENE_WEBHOOK_URL`
- Atualizar `.env.example` com a nova env var
- Testar end-to-end localmente (com curl ou pelo form)

### OUT
- Mudanças no Google Apps Script da planilha (será feito pelo usuário se quiser nova coluna)
- Adicionar dedup adicional (Vercel KV, Redis, etc.) — GENE já dedupa
- Modificar `use-copy-with-lead.ts` (lógica de localStorage permanece igual)
- Criar UI de admin/dashboard para visualizar leads
- Configurar pipeline ou automação no GENE (responsabilidade do usuário no painel)

## Dependências

- ✅ Webhook GENE criado e funcional (URL: `https://api.genecrm.com.br/webhook/leads/364d80eb-51fa-4fca-a664-3ef800eda9e4`)
- ✅ Tag PROMPT configurada no webhook
- ✅ Dedup validado (testes 1-4 executados)
- ⏳ Pipeline novo no GENE (usuário está finalizando — não bloqueia o desenvolvimento)
- ⏳ Automação de disparo (usuário está finalizando — não bloqueia o desenvolvimento)

## Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Falha de rede no GENE atrasa resposta da API | Médio (UX) | `Promise.allSettled` em paralelo + timeout implícito do fetch |
| Adicionar campo Nome aumenta fricção e diminui conversão | Médio (negócio) | A11n aceita — risco aceito pelo usuário |
| `GENE_WEBHOOK_URL` não configurada em produção | Alto | AC6 garante fallback silencioso + log; documentar no `.env.example` |
| Vercel encerrar função antes do fetch (cold start) | Alto | `await` obrigatório nos dois fetches (regra já conhecida) |

## Complexidade

**Estimativa:** S (small) — 2-3 horas de implementação
- 1 arquivo de form com 1 input novo
- 1 API route com lógica de dual-write
- 1 env var nova

## Notas de Implementação

### Arquivos a modificar
- `src/components/downloads/lead-form.tsx` — adicionar input Nome + estado
- `src/app/api/leads/route.ts` — dual-write
- `.env.example` — adicionar `GENE_WEBHOOK_URL`

### Estrutura esperada da API route
```ts
const [sheetsResult, geneResult] = await Promise.allSettled([
  postToSheets({ name, email, phone, downloadName }),
  postToGene({ name, phone, email }),
]);

if (sheetsResult.status === 'rejected') console.error('Sheets failed:', sheetsResult.reason);
if (geneResult.status === 'rejected') console.error('GENE failed:', geneResult.reason);

return NextResponse.json({ ok: true });
```

### Env var no Vercel
Adicionar manualmente após deploy:
```
GENE_WEBHOOK_URL=https://api.genecrm.com.br/webhook/leads/364d80eb-51fa-4fca-a664-3ef800eda9e4
```

## Definition of Done

- [x] Campo Nome adicionado e funcionando no `LeadForm`
- [x] API route validando `name` + dual-write Sheets/GENE
- [x] Env var `GENE_WEBHOOK_URL` documentada em `.env.example`
- [ ] Teste end-to-end manual: form submetido → lead aparece no Sheets E no GENE (pendente — depende de env var configurada no Vercel)
- [x] Lead duplicado (mesmo phone) não vira contato novo no GENE (dedup OK — validado via curl nos testes 1-4)
- [x] Build local passa: `npm run build`
- [x] Lint passa nos arquivos modificados: `npx eslint src/app/api/leads/route.ts src/components/downloads/lead-form.tsx`
- [ ] Commit com mensagem `feat: integrate GENE CRM webhook on lead capture` (pendente — aguardando autorização do usuário)
- [ ] Usuário autorizou push antes de fazer (regra crítica)

## File List

**Modificados:**
- `src/app/api/leads/route.ts` — Adicionado dual-write (Sheets + GENE) com `Promise.allSettled`, validação de `name`, extração para funções `postToSheets()` e `postToGene()`
- `src/components/downloads/lead-form.tsx` — Adicionado campo "Nome completo" (required) antes do email; estado `name`; payload do fetch atualizado
- `.env.example` — Documentadas `GOOGLE_SHEETS_WEBHOOK` e `GENE_WEBHOOK_URL`

**Criados:**
- Nenhum

**Deletados:**
- Nenhum

## Dev Agent Record

### Agent Model Used
@dev (Dex) — Builder / Aquarius

### Debug Log References
- `npx eslint src/app/api/leads/route.ts src/components/downloads/lead-form.tsx` → 0 erros, 0 warnings
- `npm run build` → build OK; `/api/leads` listada como dynamic route (ƒ); aviso de `aios-core/docs/agents/persona-definitions.yaml` é pré-existente, não relacionado
- `npm run lint` (full) → 13 erros pré-existentes em arquivos fora do escopo (arrow, idvisual, layout, header, validate-setup.js); zero erro nos arquivos da story

### Completion Notes
- Dual-write implementado com `Promise.allSettled` para garantir que falha de um webhook não bloqueie o outro nem a resposta 200 ao cliente
- Função `postToSheets()` pula silenciosamente se `GOOGLE_SHEETS_WEBHOOK` faltar (mantém comportamento anterior) + warning
- Função `postToGene()` mesmo padrão
- Resposta da API sempre 200 quando o payload é válido (mesmo com falha downstream) — AC5 atendido
- Campo Nome posicionado antes do email no form, com mesmo padrão visual (border, padding, accent color)
- Env var `GOOGLE_SHEETS_WEBHOOK` agora também documentada (estava implícita no código)
- **Pendência usuário:** adicionar `GENE_WEBHOOK_URL=https://api.genecrm.com.br/webhook/leads/364d80eb-51fa-4fca-a664-3ef800eda9e4` no Vercel antes do deploy

## Change Log

- **2026-05-11** — Story criada por @sm (River). Decisões registradas:
  - Dual-write Sheets + GENE em paralelo (não substituir)
  - Campo Nome adicionado no form (escolha do usuário entre 3 opções)
  - Dedup só no GENE (camada 1 do plano original)
  - Tag PROMPT configurada no webhook (não no payload)
- **2026-05-11** — Story validada por @po (Pax). Verdict: **GO** (9/10). Transição **Draft → Ready**. Observações não-bloqueantes:
  - Adicionar seção "Business Value" explícita em stories futuras
  - Considerar criar Epic guarda-chuva via `@pm *create-epic` quando houver mais integrações de CRM
- **2026-05-11** — Implementado por @dev (Dex). Transição **Ready → Ready for Review**. Build OK + lint zero nos arquivos modificados. Pendências: teste E2E manual (depende de env var no Vercel), commit + push (aguardando autorização do usuário).

## QA Results

**Revisor:** @qa (Quinn) — Guardian / Virgo
**Data:** 2026-05-11
**Verdict:** ✅ **PASS** com 2 CONCERNS não-bloqueantes

### 7 Quality Checks

| # | Check | Status | Observação |
|---|-------|--------|------------|
| 1 | Code review | ✅ PASS | Funções extraídas (`postToSheets`, `postToGene`), tipos TypeScript definidos, `Promise.allSettled` corretamente usado, padrão consistente |
| 2 | Unit tests | ⚠️ CONCERN | Projeto não tem framework de teste configurado (débito pré-existente). Não bloqueia esta story |
| 3 | Acceptance criteria (7/7) | ✅ PASS | Todos os 7 AC verificados — ver detalhamento abaixo |
| 4 | No regressions | ✅ PASS | Comportamento para `type='download'\|'github'\|'copy'` preservado; `markLeadCaptured()` mantido; API retorna 200 em fluxos válidos |
| 5 | Performance | ✅ PASS | `Promise.allSettled` em paralelo evita sequencialidade; sem N+1; cold start neutro |
| 6 | Security | ✅ PASS | Env vars server-side only (zero leak no client); validação no servidor; inputs sanitizados pelo React; sem SQL/XSS |
| 7 | Documentation | ⚠️ CONCERN | `.env.example` atualizado **mas está gitignored** (padrão `.env*` em `.gitignore`) — template não chega no repo |

### AC Coverage Detalhada

- **AC1 — Campo Nome no form:** ✅ Input "Nome completo" required adicionado antes do email, mesmo padrão visual (border, padding, accent color)
- **AC2 — Validação cliente:** ✅ `required` HTML5 bloqueia submit
- **AC3 — Payload + 400:** ✅ API valida name/email/phone, retorna 400 se faltar
- **AC4 — Dual-write paralelo:** ✅ `Promise.allSettled([postToSheets, postToGene])` com `await`
- **AC5 — Resiliência:** ✅ Falha de um webhook é logada via `console.error`, API retorna 200 normalmente
- **AC6 — Env var opcional:** ✅ `GENE_WEBHOOK_URL` ausente → `console.warn` + skip silencioso
- **AC7 — Sem regressão Sheets:** ✅ Campo `name` adicionado no payload do Sheets sem quebrar formato anterior

### Concerns (não-bloqueantes)

**CONCERN-001 — `.env.example` gitignored** (severidade: MEDIUM)
- **Issue:** `.gitignore` tem `.env*` que captura `.env.example`. O template documentado não vai pro repo.
- **Impacto:** Outros devs (ou o próprio usuário no futuro) não terão referência das env vars necessárias.
- **Recomendação:** Adicionar `!.env.example` no `.gitignore` antes do commit.
- **Bloqueia merge?** Não — mas deve ser corrigido junto com este commit para não virar débito.

**CONCERN-002 — Sem testes automatizados** (severidade: LOW)
- **Issue:** Projeto não tem framework de teste configurado.
- **Impacto:** Validação depende de teste manual + lint/build.
- **Recomendação:** Criar story futura para adicionar Vitest + testes da API route + form. Não bloqueia esta story.
- **Bloqueia merge?** Não — débito pré-existente.

### Sugestão para @dev antes do commit

Adicionar uma linha no `.gitignore`:
```
!.env.example
```

Isso garante que o template criado nesta story seja versionado.

### Próximos passos

1. **@dev (Dex):** corrigir CONCERN-001 (1 linha no .gitignore) — opcional mas recomendado
2. **@dev (Dex):** preparar commit local
3. **Usuário:** autorizar push + adicionar `GENE_WEBHOOK_URL` no Vercel
4. **@github-devops (Gage):** push para origin/main

— Quinn, guardião da qualidade 🛡️
