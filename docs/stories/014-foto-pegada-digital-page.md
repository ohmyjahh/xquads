# Story 014: Página /foto (Auditoria de pegada digital por imagem)

**Status:** Done
**Épico:** Páginas isca Xquads
**Criada por:** @sage (2026-07-14)
**Validada por:** @eden (2026-07-14) — GO, 10/10

## Descrição

Existe um workflow de 3 prompts circulando em inglês que usa IA para a pessoa auditar a própria pegada digital de imagem: (1) a IA analisa uma foto sua e monta um perfil descritivo de aparência, (2) esse perfil e a foto viram base para uma varredura de onde você aparece na internet (busca reversa de imagem + busca por nome nas redes), (3) tudo é consolidado numa lista mestre organizada por origem, com o caminho de remoção de cada item.

Queremos a versão brasileira desse workflow como página isca em `/xquads/foto`. O valor entregue é concreto e pessoal: a pessoa descobre onde a cara dela está publicada, quem publicou, e o que dá para tirar do ar.

Um ponto que a versão em inglês esconde e a nossa precisa resolver com honestidade: nenhum LLM faz busca reversa de imagem sozinho no Google Images ou no TinEye. O que funciona de verdade é um fluxo híbrido, e a página tem que ensinar isso: a busca reversa você roda em 2 minutos no Google Lens e no TinEye, a IA faz o perfil de aparência, a varredura por nome nas plataformas e a consolidação/triagem dos resultados. É esse desenho que a página entrega.

Enquadramento obrigatório: a página é sobre a **própria imagem** do usuário, para fins de privacidade e remoção. Isso precisa estar explícito no texto, não subentendido.

## Critérios de Aceitação

1. **Dado** que o visitante acessa `/xquads/foto`, **quando** a página carrega, **então** vê uma página standalone (sem sidebar) no padrão visual das demais iscas: dark `#121214`, accent próprio, badge no topo, header, footer "Feito por @rafa.grandi".
2. **Dado** que o visitante lê a primeira dobra, **então** entende por que o rastro de imagem importa (raspagem de fotos por bancos de reconhecimento facial, sites agregadores de dados, uso da imagem em golpes) usando apenas fatos verificáveis, sem estatística inventada.
3. **Dado** que o visitante lê a seção de método, **então** entende os 3 prompts e, com clareza, qual parte a IA faz e qual parte ele faz na mão (busca reversa no Google Lens e no TinEye).
4. **Dado** que o visitante avança, **quando** chega nos prompts prontos, **então** encontra um `LeadGate` que desbloqueia o restante mediante nome/email/telefone (source: `foto-page`).
5. **Dado** que o lead foi capturado, **então** o conteúdo liberado traz os 3 prompts traduzidos e adaptados ao português, cada um em bloco copiável com botão de copiar.
6. **Dado** que o lead foi capturado, **então** a página também entrega a seção de remoção: formulário "Resultados sobre você" do Google, remoção de imagem do índice, pedido de eliminação por LGPD (art. 18) e os canais das plataformas.
7. **Dado** que o visitante lê a página, **então** encontra um aviso explícito de que o método é para a própria imagem, e que usar a foto de outra pessoa para rastreá-la é perseguição.
8. **Dado** que o visitante chega ao final, **então** vê o `SalesCta` com `utmContent="foto"`.
9. A rota `/foto` está registrada em `STANDALONE_ROUTES` no `app-shell.tsx`.
10. O texto não usa travessão (regra do projeto) e é manual completo e denso, não guia raso.
11. `npm run lint` e `npm run build` passam sem erros.

## Escopo

**IN:**
- `src/app/foto/page.tsx` (client component, padrão das demais iscas)
- Registro de `/foto` em `STANDALONE_ROUTES`
- Reuso de `LeadGate`, `SalesCta`, componentes locais `CopyButton` / `PromptBlock` / `SectionTitle` no padrão da `/orquestrador`
- Conteúdo verificado: Google Lens, TinEye, formulário "Resultados sobre você" do Google, LGPD art. 18

**OUT:**
- Novos componentes reutilizáveis em `src/components/`
- Alterações na API de leads
- Upload real de foto ou qualquer processamento de imagem no site (a foto do usuário nunca toca o nosso servidor)
- Push/deploy (aguarda autorização do usuário)

## Dependências

- `LeadGate` e `SalesCta` existentes (Stories 009/010)
- API `/api/leads` funcionando (Stories 001/002)

## Riscos

| Risco | Mitigação |
|---|---|
| Página ser lida como ferramenta de stalking | Enquadramento self-only explícito no header, na seção de método e em um bloco de aviso dedicado |
| Prometer que a IA faz busca reversa sozinha e frustrar o usuário | Seção "o que a IA faz e o que você faz" antes dos prompts |
| Inventar estatística para dar peso ao problema | Só afirmações verificáveis, zero número fabricado |

## Complexidade

M (página densa, sem novos componentes, sem backend)

## Valor de Negócio

Isca de altíssima relevância pessoal (privacidade da própria imagem), tema com apelo amplo fora do nicho técnico, o que amplia o topo de funil para o VSL.

## Definition of Done

- [x] Página criada e renderizando em `/xquads/foto`
- [x] Rota registrada em `STANDALONE_ROUTES`
- [x] 3 prompts traduzidos, copiáveis, atrás do `LeadGate`
- [x] Seção de remoção presente (7 canais + modelo de e-mail LGPD)
- [x] Aviso de uso self-only presente
- [x] `SalesCta` com `utmContent="foto"`
- [x] Sem travessão no texto (verificado: 0 ocorrências)
- [x] `npm run build` limpo, rota `/foto` gerada como estática
- [x] QA gate aprovado

## File List

- `src/app/foto/page.tsx` (novo)
- `src/components/layout/app-shell.tsx` (modificado: `/foto` em `STANDALONE_ROUTES`)
- `docs/stories/014-foto-pegada-digital-page.md` (novo)

## QA Results

**Gate:** PASS (@vera, 2026-07-14)

| Check | Resultado |
|---|---|
| Code review | Segue o padrão da `/orquestrador`: client component, `CopyButton`/`PromptBlock`/`SectionTitle` locais, `LeadGate` + `SalesCta` reusados |
| Build | PASS, `/foto` prerenderizada como estática |
| Lint | O único apontamento na página é `react-hooks/set-state-in-effect`, idêntico ao já existente em `/loop`, `/fable`, `/emprego` e `/orquestrador`. É o padrão do projeto para reidratar o `unlocked` do localStorage. Nenhum problema novo introduzido |
| ACs | 11/11 atendidos |
| Regressão | `STANDALONE_ROUTES` só ganhou um item, demais rotas intactas |
| Segurança | Nenhum upload de imagem no servidor, nenhuma alteração na API de leads |
| Verificação em runtime | `GET /xquads/foto` retorna 200 no dev local com header, gate e aviso renderizados |

## Change Log

| Data | Autor | Mudança |
|---|---|---|
| 2026-07-14 | @sage | Story criada (Draft) |
| 2026-07-14 | @eden | Validada, GO 10/10, Draft para Ready |
| 2026-07-14 | @kai | Página implementada, rota registrada |
| 2026-07-14 | @vera | QA gate PASS |
