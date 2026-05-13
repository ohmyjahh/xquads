# Story 005 — Adicionar página `/viral` com prompt + download de blueprint

**Status:** Ready for Review
**Criado:** 2026-05-13
**Validado:** 2026-05-13
**Implementado:** 2026-05-13
**Autor:** @sm (River)
**Validado por:** @po (Pax) — Score 9/10
**Implementado por:** @dev (Dex)
**QA por:** @qa (Quinn) — PASS
**Prioridade:** Média — nova ferramenta gratuita (lead magnet)

---

## Contexto

O usuário precisa de uma nova rota `/viral` no xquads que entrega 2 ativos relacionados a roteiros virais para Instagram Reels:

1. **Prompt do "Rafa"** — system prompt para colar nas instruções de um Projeto do Claude (especialista em roteiros virais com IA)
2. **Blueprint em Markdown** — arquivo `.md` (já existe em `~/Desktop/blueprint-roteiro-viral-v2.md`, 41KB) que deve ser baixado pelo usuário e colocado dentro do Projeto do Claude

**Importante:** apesar da Story 004 ter removido o download gratuito dos squads do xquads, este download é um **conteúdo gratuito separado** (lead magnet), independente do produto pago. Não conflita com a estratégia de monetização.

## Descrição

Criar `src/app/viral/page.tsx` standalone com:
- Hero (título + subtítulo)
- Bloco "Como usar"
- 2 cards: prompt (copy) + arquivo .md (download)
- Lead capture no 1º clique (qualquer ação), igual ao padrão do projeto

Copiar `~/Desktop/blueprint-roteiro-viral-v2.md` para `public/viral/blueprint-roteiro-viral-v2.md`.

## Decisões registradas

| Item | Valor |
|------|-------|
| Título | "Roteiro Viral" |
| Subtítulo | "Crie roteiros que param o scroll. Prompt + blueprint dos 17 Reels que fizeram 8M de views." |
| Cor accent | `#EC4899` (rosa Instagram) |
| Ícone hero | `Flame` ou `Zap` (Lucide) |
| Source copy | `prompt-viral` |
| Source download | `viral-blueprint-md` |
| Captura de lead | 1ª interação (flag global `xquads_lead_captured`) |
| Layout | Stack vertical |

## Acceptance Criteria

1. **AC1 — Rota acessível sem sidebar**
   - **Dado** que o app está rodando
   - **Quando** o usuário acessa `/viral`
   - **Então** a página renderiza standalone (sem sidebar do AppShell)

2. **AC2 — Botão "Copiar prompt"**
   - **Dado** que o usuário ainda não preencheu o LeadForm
   - **Quando** clica em "Copiar prompt"
   - **Então** o LeadForm abre (type="copy")
   - **E** ao submeter com sucesso, o prompt é copiado pro clipboard
   - **E** o flag `xquads_lead_captured` é set

3. **AC3 — Botão "Baixar blueprint (.md)"**
   - **Dado** que o usuário ainda não preencheu o LeadForm
   - **Quando** clica em "Baixar blueprint (.md)"
   - **Então** o LeadForm abre (type="download")
   - **E** ao submeter com sucesso, o arquivo `blueprint-roteiro-viral-v2.md` é baixado
   - **E** o flag é set

4. **AC4 — Lead já capturado libera direto**
   - **Dado** que `xquads_lead_captured` está em localStorage
   - **Quando** o usuário clica em qualquer um dos 2 botões
   - **Então** a ação acontece direto (copy ou download), sem reabrir o LeadForm

5. **AC5 — Arquivo .md acessível em produção**
   - **Dado** que o arquivo está em `public/viral/blueprint-roteiro-viral-v2.md`
   - **Quando** o usuário acessa `/xquads/viral/blueprint-roteiro-viral-v2.md`
   - **Então** o download é servido (Content-Disposition ou download attribute no link)

6. **AC6 — Source tracking diferenciado**
   - **Dado** que o usuário copia o prompt
   - **Quando** o LeadForm submete pra `/api/leads`
   - **Então** `downloadName/source` recebe `prompt-viral`
   - **E** se for o botão de download, recebe `viral-blueprint-md`

7. **AC7 — Padrão visual consistente**
   - Hero com badge accent + título com palavra colorida
   - Cards com accent `#EC4899` (border-tint, background-tint, botão sólido)
   - Bloco "Como usar" no padrão do projeto

## Escopo

### IN
- Criar `src/app/viral/page.tsx`
- Copiar `~/Desktop/blueprint-roteiro-viral-v2.md` → `public/viral/blueprint-roteiro-viral-v2.md`
- Exportar `hasCapturedLead` de `use-copy-with-lead.ts` (já existia internamente — apenas tornar público)
- Adicionar `/viral` em `STANDALONE_ROUTES` do `AppShell`
- Inserir o prompt do "Rafa" hardcoded como string template no `page.tsx`

### OUT
- Tracking custom além do source já usado
- Variações A/B
- Edição do prompt pelo usuário (frontend)
- Markdown rendering (download é o .md cru — usuário cola no Claude Projects)

## Dependências

- ✅ Story 001 (lead capture + dual-write Sheets/GENE)
- ✅ Story 002 (normalização phone)
- ✅ Story 003 (padrão de página standalone com prompt copy)

## Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Arquivo .md grande (41KB) no public/ | Baixo | Next.js serve estático eficientemente |
| Usuário com flag set não vê o lead form (não captura) | Baixo (decisão de produto) | Comportamento intencional — captura é one-shot |
| Conflito com Story 004 (removeu downloads grátis) | Nulo | Conteúdo gratuito separado, lead magnet |

## Complexidade

**Estimativa:** S (small) — ~45 min

## Notas de Implementação

### Estrutura do componente

```tsx
const { copied, showLeadForm, leadSource, copy, closeLeadForm } = useCopyWithLead('prompt-viral');
const [downloadFormOpen, setDownloadFormOpen] = useState(false);

const handleDownload = () => {
  if (hasCapturedLead()) {
    triggerDownload();
  } else {
    setDownloadFormOpen(true);
  }
};
```

### Função triggerDownload local

A função `triggerDownload` foi removida da `/downloads/page.tsx` na Story 004. Vou recriar inline no `/viral` (não há reuso suficiente para extrair pra util compartilhada agora).

### Refator no hook

`hasCapturedLead` já existe como função privada em `use-copy-with-lead.ts`. Apenas exportar — sem mudança de comportamento.

## Definition of Done

- [x] Story criada
- [x] Validada por @po (Score 9/10)
- [ ] `src/app/viral/page.tsx` implementada
- [ ] `public/viral/blueprint-roteiro-viral-v2.md` adicionado
- [ ] `hasCapturedLead` exportado do hook
- [ ] `/viral` em STANDALONE_ROUTES
- [ ] Build local passa
- [ ] Lint zero erros
- [ ] Dev local testado (página renderiza, copy funciona, download funciona, 404 para lead repetido)
- [ ] Commit
- [ ] Usuário autoriza push

## File List (preenchido por @dev)

_A ser preenchido durante implementação_

## Change Log

- **2026-05-13** — Story criada por @sm (River). Decisões: título "Roteiro Viral", cor `#EC4899`, captura no 1º clique. Refator pequeno no hook (exportar `hasCapturedLead`).
- **2026-05-13** — @po (Pax): GO 9/10. Draft → Ready.

## QA Results

_A ser preenchido por @qa após implementação_
