# Story 063 — Página /artcraft (os apps criativos reconstruídos em código aberto)

**Status:** Done

## Descrição

Nova página isca standalone em `/artcraft` (produção: `www.sowsales.com.br/xquads/artcraft`),
distribuindo a organização `storytold` (ArtCraft): reimplementações **clean-room**, em Rust puro e
código aberto, dos principais aplicativos criativos e de escritório.

`source = "artcraft-page"`.

## Duas correções ao enunciado do pedido

O dono descreveu como "clonou todos os apps da Adobe e disponibilizou de graça". A verificação mostra
dois ajustes necessários, ambos a favor da precisão:

1. **Não é só Adobe.** A organização cobre também Microsoft Office (Word, Excel, PowerPoint),
   AutoCAD e Pro Tools, da Avid.
2. **Não são clones prontos para substituir os originais.** Os próprios repositórios se declaram em
   estágio inicial: `photocraft` está marcado como **early alpha**, `filmcraft` como "young and
   moving fast", `vectorcraft` como "in active development". Vender como "Photoshop grátis pronto
   para usar" seria entregar frustração.

## Repositórios verificados (08/10/2026)

Organização `storytold`, nome público **ArtCraft**, 41 repositórios, site `getartcraft.com`.

| Repositório | Reimplementa | Estrelas |
|---|---|---|
| `photocraft` | Adobe Photoshop | 23.994 |
| `artcraft` | motor próprio de criação | 6.738 |
| `lightcraft` | Adobe Lightroom | 4.652 |
| `filmcraft` | Adobe Premiere Pro | 4.616 |
| `pdfcraft` | Adobe Acrobat | 3.816 |
| `vectorcraft` | Adobe Illustrator | 3.275 |
| `effectcraft` | — (sem descrição pública) | 2.375 |
| `designcraft` | — (sem descrição pública) | 1.417 |
| `wordcraft` | Microsoft Word | 639 |
| `cadcraft` | AutoCAD | 562 |
| `soundcraft` | Avid Pro Tools | 398 |
| `gridcraft` | Microsoft Excel | 381 |
| `deckcraft` | Microsoft PowerPoint | 334 |

Licença Apache-2.0 na maioria; o `photocraft` declara MIT ou Apache-2.0. Tudo em Rust, nativo para
macOS, Windows, Linux, FreeBSD e web.

**`effectcraft` e `designcraft` não têm descrição pública.** A suposição natural seria After Effects
e InDesign, mas isso **não será afirmado na página**, por não estar declarado pelo projeto.

## Critérios de Aceite

- **AC1** — Rota `/artcraft` (`src/app/artcraft/page.tsx`) standalone.
- **AC2** — Accent `#FB923C`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o que é o projeto, que é clean-room e aberto, e **o estágio real de maturidade**.
- **AC4** — **Nenhuma promessa de substituição imediata do Adobe.** O estágio inicial é informado antes do lead.
- **AC5** — Parte gated: a lista dos aplicativos com o que cada um reimplementa, e o link da organização.
- **AC6** — `effectcraft` e `designcraft` aparecem **sem atribuir** um software-alvo que o projeto não declara.
- **AC7** — A página registra que o escopo vai além da Adobe.
- **AC8** — Link externo com `target="_blank"` e `rel="noopener noreferrer"`, atrás do gate.
- **AC9** — Números e data de checagem visíveis.
- **AC10** — Lead `source="artcraft-page"`, bypass só em localhost, `SalesCta` com `utmContent="artcraft"`.
- **AC11** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (alto)** — Pessoa baixar esperando Photoshop completo e desistir. *Mitigação:* AC3 e AC4.
- **R2 (médio)** — Atribuir software-alvo errado a um repositório. *Mitigação:* AC6.
- **R3 (baixo)** — Projeto em movimento rápido, números envelhecem. *Mitigação:* AC9.

## Complexidade

**S (pequena).**

## Change Log

- **2026-10-08** — Draft criado por @mestre — Story 063
- **2026-10-08** — Validada por @produto: **GO 10/10**. A verificação corrigiu duas imprecisões do enunciado antes de virarem conteúdo publicado, e o estágio inicial dos projetos foi tratado como critério em vez de detalhe. Draft → **Ready**.
- **2026-10-08** — Implementada e verificada: **PASS.** Treze aplicativos na lista; alerta de estágio inicial presente; nenhuma promessa de substituir Adobe; `EffectCraft` e `DesignCraft` marcados como "o projeto não declara o alvo"; Word, AutoCAD e Pro Tools citados, mostrando que o escopo passa da Adobe; data visível. Lint limpo, build verde.

## File List
- `src/app/artcraft/page.tsx`
- `docs/stories/063-artcraft-page.md`
- **2026-10-08** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
