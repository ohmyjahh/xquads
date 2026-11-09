# Story 083 - Página /open: lista dos 11 repositórios gratuitos do vídeo

**Status:** InReview (aguardando QA – Funis de isca)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-09
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

---

## Descrição

Pedido do Rafa (09/11/2026, por chat, com o vídeo `IMG5103-CAMPEAO-v2.MOV`): isca em `sowsales.com.br/xquads/open` com o link de todos os repositórios citados no vídeo "pare de pagar assinatura, todos têm versão gratuita no GitHub". A palavra para comentar é **Open** (dita no vídeo), por isso o slug `open`.

O visitante preenche o `LeadGate` padrão e só depois recebe a lista com os 11 links. Antes do formulário aparece só o título, o subtítulo e os nomes das ferramentas pagas que serão trocadas, sem nenhum link e sem nenhum aviso (regra do Rafa de 06/11).

### Mapa vídeo -> repositório (transcrição do áudio, conferido via API do GitHub em 09/11/2026)

| Fala no vídeo | Substitui | Repositório | Estrelas | Licença |
|---|---|---|---|---|
| Open Higgsfield | Higgsfield | github.com/wide-trace/open-higgsfield (site openhiggsfield.ai) | 5.537 | não declarada |
| Voice Studio | ElevenLabs | github.com/debpalash/VoiceStudio | 105.684 | AGPL-3.0 |
| Voice Studio (2ª opção, a pedido do Rafa) | ElevenLabs | github.com/jamiepine/voicebox | 60.239 | MIT |
| Open SEO | Semrush | github.com/every-app/open-seo | 27.003 | MIT |
| App Flowing (AppFlowy) | Notion | github.com/AppFlowy-IO/AppFlowy | 78.552 | AGPL-3.0 |
| Open Whisper (OpenWhispr) | Wispr Flow | github.com/OpenWhispr/openwhispr | 11.096 | MIT |
| Open Project | Asana | github.com/opf/openproject | 17.172 | GPL-3.0 |
| Cal.dye (Cal.diy) | Calendly | github.com/calcom/cal.diy | 49.836 | MIT |
| ChatWood (Chatwoot) | Intercom | github.com/chatwoot/chatwoot | 39.448 | outra |
| Cap | Loom | github.com/CapSoftware/Cap | 24.721 | outra |
| Artcraft (bônus) | Adobe | github.com/storytold/artcraft | 40.135 | Apache-2.0 |

Decisões do Rafa em 09/11 (chat): Open Higgsfield é o de 5 mil estrelas (`wide-trace`); "Cal.dye" é `cal.diy`; para ElevenLabs entram os dois, VoiceStudio e Voicebox (11 links no total, o segundo como "outra opção").

Estrelas e licenças são da API do GitHub na data acima e não aparecem na página, que não promete número nenhum.

### Verificação de sobreposição

`src/app/artcraft` já existe (isca só do ArtCraft e da família storytold). A nova página só linka o repositório do ArtCraft como bônus, sem copiar conteúdo. Não existia `src/app/open`.

### Acceptance Criteria

- [ ] AC1 rota `/open` renderiza sem erro de build e sem erro no console
- [ ] AC2 linguagem de quem não é desenvolvedor
- [ ] AC3 antes do gate: só título, subtítulo e nomes das ferramentas pagas; nenhum link de repositório e nenhum aviso
- [ ] AC4 lista atrás do `LeadGate` com `source="open-page"`
- [ ] AC5 formulário com os 5 campos
- [ ] AC6 os 11 links levam ao repositório da tabela e respondem 200
- [ ] AC7 em `localhost` aparece destravado, com a tarja "PRÉVIA LOCAL"
- [ ] AC8 `SalesCta` com `utmContent="open"` e assinatura `@rafa.grandi`
- [ ] AC9 sem travessão em nenhum texto

## Escopo

IN: `src/app/open/page.tsx`. OUT: componentes compartilhados, `/api/leads`, `next.config`, layout, outras páginas.

## Riscos

- Repositórios de terceiros podem mudar de nome ou sair do ar.

## Definition of Done

AC1 a AC9 ok, QA PASS, "pode subir" do Rafa, conferência em produção.

## File List

- `src/app/open/page.tsx`
- `docs/stories/083-open-page.md`

## Change Log

- 2026-11-09: story criada e página implementada (Diego).
- 2026-11-09: Rafa confirmou Higgsfield (5 mil estrelas) e Cal.diy e pediu Voicebox junto do VoiceStudio; página passa a ter 11 links.
- 2026-11-09: ajustes da QA (CONCERNS C1 e C2): gate e subtítulo deixam claro que o Voicebox é opção extra; "No lugar de" no lugar de "No lugar do(a)".
