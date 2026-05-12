# Story 004 — Remover download gratuito e redirecionar para LP de vendas

**Status:** Ready for Review
**Criado:** 2026-05-12
**Validado:** 2026-05-12
**Implementado:** 2026-05-12
**Autor:** @sm (River)
**Validado por:** @po (Pax) — Score 9/10
**Implementado por:** @dev (Dex)
**QA por:** @qa (Quinn) — PASS
**Prioridade:** Alta — decisão de monetização

---

## Contexto

Hoje, em `sowsales.com.br/xquads/downloads`, o usuário pode:
1. Baixar o ZIP completo dos squads (`public/downloads/xquads.zip` → servido em `/xquads/downloads/xquads.zip`)
2. Acessar o repo GitHub `ohmyjahh/xquads-squads`
3. Acessar o repo GitHub `SynkraAI/aios-core`

Tudo gratuitamente após captura de lead. O usuário decidiu **monetizar** o produto via página de vendas (`www.raxo.com.br/xquads`) e quer:
- Manter a captura de lead (continuam preenchendo nome/email/telefone)
- Após captura, **redirecionar para a LP de vendas** em vez de liberar download/repo
- Fechar 100% a possibilidade de download gratuito (incluindo URLs diretas)

## Descrição

Modificar os 3 callbacks `onSuccess` no `src/app/downloads/page.tsx` para que, após o `LeadForm` ser submetido com sucesso, o usuário seja redirecionado para `https://www.raxo.com.br/xquads` em vez de baixar o ZIP ou abrir o GitHub. Também remover o ZIP do `public/` para evitar acesso via URL direta.

## Acceptance Criteria

1. **AC1 — Botão "Baixar Xquads (ZIP)" redireciona para LP de vendas**
   - **Dado** que o usuário está em `/xquads/downloads`
   - **Quando** clica em "Baixar Xquads (ZIP)" e preenche o LeadForm
   - **Então** após submit bem-sucedido, é redirecionado para `https://www.raxo.com.br/xquads`
   - **E** nenhum download é disparado

2. **AC2 — Botão "Ver no GitHub" (xquads-squads) redireciona**
   - **Dado** que o usuário clica em "Ver no GitHub"
   - **Quando** preenche o LeadForm com sucesso
   - **Então** é redirecionado para `https://www.raxo.com.br/xquads`
   - **E** o repo GitHub não é aberto

3. **AC3 — Botão "Acessar Repositorio" (aios-core) redireciona**
   - **Dado** que o usuário clica em "Acessar Repositorio no GitHub"
   - **Quando** preenche o LeadForm com sucesso
   - **Então** é redirecionado para `https://www.raxo.com.br/xquads`

4. **AC4 — URL direta do ZIP retorna 404**
   - **Dado** que o ZIP foi removido de `public/downloads/`
   - **Quando** o usuário acessa `https://www.sowsales.com.br/xquads/downloads/xquads.zip`
   - **Então** o servidor retorna 404 (arquivo não existe)

5. **AC5 — Source identificação preservada para tracking**
   - **Dado** que o usuário clica em qualquer um dos 3 botões
   - **Quando** o LeadForm submete pra `/api/leads`
   - **Então** o campo `source` continua identificando a origem: `xquads-zip`, `github-xquads-squads`, ou `github-aios-core`
   - **Importante:** isso permite saber pelo painel GENE/Sheets qual CTA performou melhor

6. **AC6 — Lead form continua funcionando**
   - **Dado** que o usuário preenche nome/email/telefone
   - **Quando** submete
   - **Então** os dados vão pro Sheets e GENE (dual-write da Story 001) + redirect

## Escopo

### IN
- Atualizar 3 `onSuccess` em `src/app/downloads/page.tsx` para redirect `window.location.href = 'https://www.raxo.com.br/xquads'`
- Remover função `triggerDownload` (não usada mais)
- Remover função `openUrl` se não tiver mais uso após mudanças (verificar)
- Deletar `public/downloads/xquads.zip` (fechar brecha de URL direta)
- Manter copy dos botões intacto ("Baixar Xquads (ZIP)", "Ver no GitHub", "Acessar Repositorio no GitHub")

### OUT
- Tornar repos GitHub privados (responsabilidade do usuário, fora do código)
- Mudar copy dos botões (ele não pediu — pode ser story futura)
- Remover a página `/downloads` (continua existindo, só muda comportamento)
- Remover link "Downloads" do sidebar (continua válido — só muda destino do callback)

## Decisão sobre os repos GitHub

Os repos `ohmyjahh/xquads-squads` e `SynkraAI/aios-core` continuam **públicos no GitHub**. Se o usuário quiser fechar 100% o acesso gratuito, precisa torná-los privados pelo painel do GitHub. **Esta story remove só os caminhos óbvios via LP.** Fica avisado no Change Log.

## Dependências

- ✅ Story 001 (LeadForm + dual-write Sheets/GENE)
- ✅ Página `/downloads` existente

## Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| ZIP deletado fica perdido | Médio | Está no git history — `git checkout HEAD^ -- public/downloads/xquads.zip` se precisar |
| Lead capturado mas redirect falha | Baixo | `window.location.href` é confiável; se browser bloquear, lead já foi pro Sheets/GENE de qualquer forma |
| Pessoas com link antigo do GitHub ainda acessam | Médio | Repos continuam públicos. Solução só via painel GitHub (fora do escopo) |
| Cache do navegador mantém o ZIP | Baixo | Após remoção, o file não está mais no servidor — cache nunca renova |

## Complexidade

**Estimativa:** XS (extra small) — ~15 min
- 3 callback substitutions
- 1 file delete (`public/downloads/xquads.zip`)
- Possível limpeza de funções não usadas

## Notas de Implementação

### Substituição dos callbacks

De:
```tsx
onSuccess={() => triggerDownload('/xquads/downloads/xquads.zip')}
onSuccess={() => openUrl('https://github.com/ohmyjahh/xquads-squads')}
onSuccess={() => openUrl('https://github.com/SynkraAI/aios-core')}
```

Para:
```tsx
onSuccess={() => { window.location.href = 'https://www.raxo.com.br/xquads'; }}
```
(3 vezes)

### Constante recomendada

Pra DRY:
```ts
const SALES_URL = 'https://www.raxo.com.br/xquads';
const redirectToSales = () => { window.location.href = SALES_URL; };
```

### Limpeza pós-substituição

- `triggerDownload()` → remover (não tem mais caller)
- `openUrl()` → remover se não tiver mais caller
- ZIP → `rm public/downloads/xquads.zip`

## Definition of Done

- [ ] 3 callbacks atualizados em `downloads/page.tsx`
- [ ] Funções não usadas removidas (`triggerDownload`, `openUrl` se aplicável)
- [ ] ZIP removido do `public/downloads/`
- [ ] Build local passa
- [ ] Lint passa
- [ ] Teste manual local: clicar nos 3 botões → preencher form → confirmar redirect (sem download)
- [ ] URL direta `/xquads/downloads/xquads.zip` retorna 404 localmente
- [ ] Commit com mensagem `feat: redirecionar downloads para LP de vendas raxo.com.br`
- [ ] Usuário autorizou push

## File List (preenchido por @dev)

_A ser preenchido durante implementação_

## Change Log

- **2026-05-12** — Story criada por @sm (River). Decisões:
  - Redirect para `https://www.raxo.com.br/xquads` em todos os 3 CTAs
  - Source de tracking preservado (importante pra saber qual CTA converte mais)
  - ZIP deletado do `public/` pra fechar brecha de URL direta
  - Copy dos botões mantido — usuário não pediu pra mudar
  - **Aviso ao usuário:** repos GitHub continuam públicos. Para fechar 100% o acesso, torná-los privados no painel do GitHub (fora do escopo).

## QA Results

_A ser preenchido por @qa após implementação_
