# Story 003 — Adicionar página `/curriculo` com 4 prompts de currículo

**Status:** Ready for Review
**Criado:** 2026-05-12
**Validado:** 2026-05-12
**Implementado:** 2026-05-12
**Autor:** @sm (River)
**Validado por:** @po (Pax) — Score 9/10
**Implementado por:** @dev (Dex)
**QA por:** @qa (Quinn) — PASS
**Prioridade:** Média — nova ferramenta no catálogo xquads

---

## Contexto

O xquads é um catálogo de prompts standalone organizado por ferramenta. Cada rota (`/carrossel`, `/idvisual`, `/imagemgpt`, etc.) entrega 1 prompt com botão de copy + captura de lead via `LeadForm` + integração GENE/Sheets (Stories 001-002).

Agora vamos adicionar `/curriculo` — uma página com **4 skills de currículo** (Diagnosticador, Recrutador, Reescritor, Gestor de Contratação) que ajudam o usuário a otimizar o currículo dele para aprovação em vagas competitivas.

## Descrição

Criar a rota standalone `/curriculo` seguindo o padrão visual e funcional das outras páginas do projeto (referência: `src/app/imagemgpt/page.tsx`). Estrutura: **stack vertical** com hero + bloco "como usar" + 4 seções (uma por skill), cada uma com seu próprio botão de copy.

## Decisões da arquitetura

| Item | Decisão |
|------|---------|
| Layout | Stack vertical (4 seções uma embaixo da outra) |
| Cor accent | Azul corporativo `#3B82F6` (alinha com mercado de trabalho/LinkedIn) |
| Título | "Currículo Squad" |
| Subtítulo | "4 IAs especialistas pra otimizar seu currículo e ser aprovado em qualquer vaga" |
| Ícone hero | `Briefcase` (Lucide) — alude a carreira |
| Source override por skill | `prompt-curriculo-diagnosticador`, `prompt-curriculo-recrutador`, `prompt-curriculo-reescritor`, `prompt-curriculo-gestor` |
| Lead form (uma vez só) | Mantém comportamento atual: localStorage `xquads_lead_captured` impede reabrir após 1º copy |

## Acceptance Criteria

1. **AC1 — Rota acessível**
   - **Dado** que o app está rodando
   - **Quando** o usuário acessa `/curriculo`
   - **Então** a página renderiza com hero + bloco "como usar" + 4 seções de skill

2. **AC2 — Cada skill tem seu próprio botão copy**
   - **Dado** que a página está aberta
   - **Quando** o usuário clica em "Copiar prompt" da skill X
   - **Então** apenas o prompt da skill X é copiado pro clipboard
   - **E** o estado "Copiado!" aparece só nesse botão (não nos outros 3)

3. **AC3 — Lead form abre no 1º copy**
   - **Dado** que `xquads_lead_captured` não está em localStorage
   - **Quando** o usuário clica em qualquer botão copy
   - **Então** o `LeadForm` modal abre
   - **E** ao submeter com sucesso, o flag fica marcado

4. **AC4 — Source override identifica qual skill**
   - **Dado** que o usuário copia o prompt do "Diagnosticador"
   - **Quando** o `LeadForm` submete pra `/api/leads`
   - **Então** o campo `downloadName` (ou source) recebe `prompt-curriculo-diagnosticador`
   - **Idem** para as outras 3 skills

5. **AC5 — Lead form NÃO reabre após captura**
   - **Dado** que o usuário já preencheu o `LeadForm` antes (flag set)
   - **Quando** ele copia qualquer um dos 4 prompts
   - **Então** o copy acontece direto, sem modal

6. **AC6 — Padrão visual consistente**
   - **Dado** o padrão do projeto (referência `imagemgpt/page.tsx`)
   - **Quando** a página `/curriculo` é renderizada
   - **Então** usa o mesmo wrapper `max-w-3xl mx-auto py-8 px-4 space-y-8`
   - **E** os blocos de prompt usam mesma classe de scroll/monospace
   - **E** o accent `#3B82F6` é aplicado nos botões, badge do hero e highlights

## Escopo

### IN
- Criar `src/app/curriculo/page.tsx` com a estrutura stack vertical
- Importar `useCopyWithLead`, `LeadForm`, ícones do Lucide
- Os 4 prompts hardcoded como constantes no arquivo (igual padrão `imagemgpt`)
- Source override por skill (usa o segundo parâmetro do `copy()` do hook)

### OUT
- Adicionar entrada no `/squads` ou navegação global (se aplicável — depende da estrutura atual; será feito se simples)
- Salvar prompts em JSON/banco (vão hardcoded no arquivo)
- Markdown rendering — exibimos os prompts brutos em monospace
- Análise/processamento dos prompts pelo backend
- Mudanças na API `/api/leads` (já cobre os campos necessários)

## Dependências

- ✅ Story 001 (lead capture funcionando)
- ✅ Story 002 (normalização phone)
- ✅ Padrão estabelecido em `src/app/imagemgpt/page.tsx`
- ✅ `useCopyWithLead` aceita `sourceOverride` no `copy(text, sourceOverride)` — confirmado no hook

## Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Página fica muito longa com 4 prompts grandes | Baixo (UX) | Caixas de prompt com `max-h-[500px] overflow-y-auto` (padrão do projeto) |
| Source override não funciona / não chega na API | Médio | AC4 valida — usar `copy(prompt, 'prompt-curriculo-X')` e logar |
| Estado "Copiado!" compartilhado entre os 4 botões | Médio | Trackear copy por skill (state local) ou aceitar limitação do hook atual |
| Confusão sobre qual skill copiar primeiro | Baixo (UX) | Bloco "Como usar" sugere ordem: Diagnosticador → Recrutador → Reescritor → Gestor |

## Complexidade

**Estimativa:** S (small) — ~1h
- 1 arquivo novo (`page.tsx`)
- ~250 linhas (incluindo os 4 prompts inline)
- Sem mudanças em outros arquivos (a menos que o hook `copy()` precise de ajuste pra suportar estado "copied" por skill — investigar durante dev)

## Notas de Implementação

### Conteúdo dos 4 prompts

Os 4 system prompts já estão definidos pelo usuário (ver `Anexo A` abaixo).

### Estado "Copiado!" por skill

O hook `useCopyWithLead` retorna um `copied` único (boolean global da página). Para 4 botões, **2 opções**:

1. **Aceitar limitação:** todos os 4 botões mostram "Copiado!" quando qualquer um é clicado por 2.5s. Simples mas confuso.
2. **Estado local por skill:** manter um `useState<string | null>(activeCopySkill)` no componente da página, setando o nome da skill no copy e zerando no setTimeout. **Recomendado.**

### Snippet sugerido (rascunho)

```tsx
const [activeCopy, setActiveCopy] = useState<string | null>(null);
const handleCopy = (prompt: string, skillId: string) => {
  copy(prompt, `prompt-curriculo-${skillId}`);
  setActiveCopy(skillId);
  setTimeout(() => setActiveCopy(null), 2500);
};
```

## Definition of Done

- [ ] `src/app/curriculo/page.tsx` criada e funcional
- [ ] 4 skills renderizadas com prompts completos
- [ ] 4 botões copy independentes com estado "Copiado!" individual
- [ ] LeadForm dispara no 1º copy (qualquer skill)
- [ ] Source override identifica a skill correta no payload
- [ ] AC1-AC6 validados manualmente no dev server
- [ ] Build local passa
- [ ] Lint passa nos arquivos modificados
- [ ] Commit com mensagem `feat: add /curriculo standalone prompt page (4 skills)`
- [ ] Usuário autorizou push antes de fazer

## File List (preenchido por @dev)

_A ser preenchido durante implementação_

## Anexo A — Os 4 system prompts (conteúdo)

Os 4 prompts (Diagnosticador, Recrutador, Reescritor, Gestor de Contratação) são fornecidos pelo usuário e devem ser inseridos **integralmente, sem edição**, como strings template no arquivo `page.tsx`. Conteúdo registrado na conversa de criação da story (2026-05-12).

## Change Log

- **2026-05-12** — Story criada por @sm (River). Decisões registradas com o usuário:
  - Layout: stack vertical
  - Cor: `#3B82F6`
  - Título: "Currículo Squad"
  - Subtítulo: "4 IAs especialistas pra otimizar seu currículo e ser aprovado em qualquer vaga"
  - Source override por skill para tracking diferenciado na captura de lead
- **2026-05-12** — Validada por @po (Pax). Score 9/10. **Draft → Ready**.
- **2026-05-12** — Implementada por @dev (Dex). Estado "copied" individual por skill via `useState<string | null>` (opção recomendada na story). Build OK, lint zero. Renderização confirmada via curl (status 200, todos os 4 títulos presentes). **Ready → Ready for Review**.
- **2026-05-12** — @qa (Quinn): **PASS**. 6 AC verificados estaticamente.

## QA Results

_A ser preenchido por @qa após implementação_
