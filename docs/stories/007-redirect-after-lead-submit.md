# Story 007 — Redirect automático após submit do LeadForm em todas as páginas

**Status:** Ready for Review
**Criado:** 2026-05-18
**Validado:** 2026-05-18
**Implementado:** 2026-05-18
**Autor:** @sm (River)
**Validado por:** @po (Pax) — Score 9/10
**Implementado por:** @dev (Dex)
**QA por:** @qa (Quinn) — PASS
**Prioridade:** Alta — afeta funil de conversão

---

## Contexto

Hoje, após o usuário preencher o `LeadForm` em qualquer página do xquads (copy de prompts, download de blueprint, etc.), o `onSuccess` callback dispara a ação contextual (copiar, baixar, fechar). Em `/downloads` (Story 004), o callback redireciona para `raxo.com.br/xquads` sem UTMs.

O usuário decidiu que **todas** as páginas devem redirecionar para a LP de vendas com UTMs **depois** do copy/download — para centralizar tráfego de captura no funil de vendas com atribuição de origem.

## Descrição

Centralizar o redirect no `LeadForm` (single source of truth). Após o submit bem-sucedido E após `onSuccess()` ser chamado, redirecionar automaticamente para a URL com UTMs após pequeno delay (~1.5s) para o usuário ver o feedback de sucesso.

Em `/downloads/page.tsx`, simplificar o callback `onSuccess` pra apenas fechar o form (sem redirect próprio) — o redirect global do LeadForm cuida do destino com UTMs.

## Decisão

| Item | Valor |
|------|-------|
| URL destino | `https://www.raxo.com.br/xquads?utm_source=instagram&utm_medium=organico&utm_campaign=xquads-isca-nov25&utm_content=stories-divulgacao` |
| Escopo | TODAS as páginas que usam LeadForm (downloads, carrossel, idvisual, imagemgpt, curriculo, viral, app, instagram, insta, estilo, arrow, compact, mcpmeta) |
| Timing | Redirect 1500ms após `onSuccess()` (deixa o copy/download acontecer e o usuário ver feedback) |
| Cleanup | `/downloads/page.tsx`: substituir `redirectToSales` por close-only callback |

## Acceptance Criteria

1. **AC1 — Redirect em página de copy**
   - **Dado** que o usuário está em `/carrossel` (ou qualquer página de prompt)
   - **Quando** ele preenche o LeadForm e submete com sucesso
   - **Então** o prompt é copiado pro clipboard (comportamento atual mantido)
   - **E** após ~1.5s, o navegador é redirecionado pra URL com UTMs

2. **AC2 — Redirect em página de download (`/viral`)**
   - **Dado** que o usuário clica em "Baixar .md" em `/viral` e preenche o form
   - **Quando** submete com sucesso
   - **Então** o arquivo é baixado (comportamento atual mantido)
   - **E** após ~1.5s, o navegador é redirecionado pra URL com UTMs

3. **AC3 — Redirect em `/downloads`**
   - **Dado** que o usuário clica em qualquer um dos 3 CTAs de `/downloads` (ZIP, GitHub xquads, GitHub aios-core)
   - **Quando** preenche o form
   - **Então** **não há mais 2 redirects competindo** — apenas o redirect global do LeadForm
   - **E** o redirect destino é a URL com UTMs (não a URL sem UTMs anterior)

4. **AC4 — Lead capturado e enviado**
   - **Dado** que o redirect acontece automaticamente
   - **Quando** a API `/api/leads` é chamada antes do redirect
   - **Então** o lead vai pro Sheets + GENE normalmente (dual-write da Story 001)
   - **E** o redirect só dispara DEPOIS do fetch completar (`res.ok`)

5. **AC5 — Feedback visual antes do redirect**
   - **Dado** o usuário submeteu o form
   - **Quando** o success state aparece ("Tudo certo!" / "Download iniciando!" / "Redirecionando...")
   - **Então** o usuário vê o feedback por pelo menos 800ms antes do `onSuccess()`
   - **E** após mais ~1500ms, o redirect acontece

6. **AC6 — Sem regressão nas APIs**
   - **Dado** que o LeadForm é o único ponto de captura
   - **Quando** o redirect é adicionado
   - **Então** a chamada pra `/api/leads` continua igual (mesmo payload, mesmas envs)

## Escopo

### IN
- `src/components/downloads/lead-form.tsx`: adicionar constante `REDIRECT_URL` e disparar `window.location.href = REDIRECT_URL` após `onSuccess()`
- `src/app/downloads/page.tsx`: substituir os 3 `onSuccess={redirectToSales}` por callbacks que só fecham o form (`() => setActiveForm(null)`)
- Remover função `redirectToSales` e constante `SALES_URL` de `/downloads/page.tsx` (não mais usadas)

### OUT
- Permitir override de URL por página (over-engineering pra hoje — KISS)
- Variar UTMs por origem (uma URL única — pode evoluir depois)
- Mudar texto do success state ("Tudo certo!", etc.)
- Mexer nas outras 12 páginas que usam LeadForm (não precisam mudar — o redirect é no próprio componente)

## Dependências

- ✅ Story 001 (LeadForm + dual-write)
- ✅ Story 004 (callback de redirect em /downloads — será substituído pelo global)

## Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Race condition: redirect dispara antes do `onSuccess` completar (ex: copy ainda processando) | Médio | Delay de 1500ms após `onSuccess()` cobre uso normal de `navigator.clipboard` (que é síncrono) e `document.createElement('a').click()` (download) |
| Usuário fecha o modal antes do redirect | Baixo | `onClose` cancela o LeadForm. Redirect só acontece se passou pelo submit completo |
| Páginas com `type="github"` antigamente abriam aba nova (`window.open`) — agora redireciona na mesma | Baixo | Story 004 já mudou /downloads pra `window.location.href`. Outras páginas usam `type="copy"` ou `type="download"` — sem `window.open` |
| Cache de prod com lead-form antigo | Baixo | Vercel invalida cache em deploy |

## Complexidade

**Estimativa:** XS (extra small) — ~15 min
- 1 constante + ~3 linhas em `lead-form.tsx`
- 3 callback substitutions + 2 deletions em `/downloads/page.tsx`

## Notas de Implementação

### Mudança em `lead-form.tsx`

Adicionar constante no topo:
```ts
const REDIRECT_URL = 'https://www.raxo.com.br/xquads?utm_source=instagram&utm_medium=organico&utm_campaign=xquads-isca-nov25&utm_content=stories-divulgacao';
```

No handler `handleSubmit`, após o `setTimeout(() => onSuccess(), 800)`, adicionar:
```ts
setTimeout(() => {
  window.location.href = REDIRECT_URL;
}, 2300); // 800ms + 1500ms
```

Ou encadear:
```ts
setTimeout(() => {
  onSuccess();
  setTimeout(() => { window.location.href = REDIRECT_URL; }, 1500);
}, 800);
```

A segunda versão é mais clara.

### Mudança em `/downloads/page.tsx`

Substituir:
```tsx
onSuccess={redirectToSales}
```
por:
```tsx
onSuccess={() => setActiveForm(null)}
```

Remover funções/constantes não usadas (`SALES_URL`, `redirectToSales`).

## Definition of Done

- [ ] `lead-form.tsx` com redirect implementado
- [ ] `/downloads/page.tsx` simplificado (close-only callbacks)
- [ ] Build local passa
- [ ] Lint zero erros nos arquivos modificados
- [ ] Dev local testado (preencher form em 2-3 páginas distintas e confirmar redirect com UTMs)
- [ ] Commit + autorização do usuário pra push

## Change Log

- **2026-05-18** — Story criada por @sm (River). URL definida pelo usuário com UTMs (instagram/organico/xquads-isca-nov25/stories-divulgacao). Centralização no LeadForm pra single source of truth.
- **2026-05-18** — @po (Pax): GO 9/10. Draft → Ready.

## QA Results

_A ser preenchido por @qa após implementação_
