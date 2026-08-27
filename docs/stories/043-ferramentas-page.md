# Story 043 — Página /ferramentas (mapa das principais ferramentas de IA por objetivo)

**Status:** Done

## Descrição

Nova página isca standalone em `/ferramentas` (produção: `www.sowsales.com.br/xquads/ferramentas`),
organizando as principais ferramentas de IA em **6 categorias por objetivo**, não por tecnologia.
A pessoa chega sabendo o que quer fazer (escrever, gerar imagem, montar app) e sai com o nome, a
diferença entre as opções e o link de cada uma.

Categorias definidas pelo dono, com extras pesquisados e conferidos:

1. Texto e pesquisa
2. Imagem
3. Vídeo
4. Criar o próprio app
5. Automação
6. Atendimento ao cliente

`source = "ferramentas-page"`.

## Termos do pedido decodificados

O pedido chegou por voz e alguns nomes vieram foneticamente. Confirmados por pesquisa antes de entrar na página:

| Como veio | O que é | Confirmação |
|---|---|---|
| "Riggs Field" | **Higgsfield** | Agregador de modelos de vídeo, unicórnio avaliado em US$ 1,3 bi em 2026 |
| "Geminar" | **Gemini** | Assistente do Google |
| "Freepeek" | **Freepik** | Suíte criativa que reúne dezenas de modelos |
| "Maker" | **Make** | Plataforma de automação visual |

## Critérios de Aceite

- **AC1** — Rota `/ferramentas` (`src/app/ferramentas/page.tsx`) standalone, sem sidebar nem header.
- **AC2** — Accent `#06B6D4`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Seis categorias, cada ferramenta com nome, uma linha do que faz, rótulo de modelo comercial e link oficial.
- **AC4** — Conteúdo aberto: como usar a lista e uma escolha rápida com **uma** recomendação por categoria, para quem não quer comparar.
- **AC5** — Conteúdo gated: a lista completa das 30 ferramentas com as comparações.
- **AC6** — **Nenhum preço em número.** Só rótulo de modelo (Grátis, Freemium, Pago, Open source), porque valor muda por região e por plano e envelheceria a página em semanas.
- **AC7** — Data da checagem visível ("conferido em agosto de 2026"), já que a lista envelhece.
- **AC8** — Todo link com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC9** — Lead com `source="ferramentas-page"`, bypass só em localhost, `SalesCta` com `utmContent="ferramentas"`.
- **AC10** — `npm run build` verde e lint limpo.

## Verificação das fontes (27/08/2026)

- Todos os 30 domínios verificados: resolução DNS confirmada e resposta HTTP do servidor.
  Onze retornaram 403 por bloqueio anti-bot (Cloudflare e similares), o que confirma servidor
  ativo, não link morto. Nenhum NXDOMAIN e nenhum 404.
- Posicionamento de cada ferramenta apoiado em comparativos publicados em 2026, não em memória:
  Higgsfield como agregador multi-modelo; Veo com áudio nativo; Kling com consistência de
  personagem; Runway pela velocidade; n8n como o mais forte para agente e o único open source
  dos três de automação; Evolution API como o conector de WhatsApp mais usado no Brasil.

## Escopo

**IN:** página nova, 6 categorias, 30 ferramentas com link oficial.
**OUT:** preço em número; ranking absoluto de "melhor"; link de afiliado; alterar componentes
compartilhados; push ou deploy sem autorização.

## Riscos

- **R1 (alto)** — Lista de ferramentas envelhece rápido: produto muda de nome, some ou muda o modelo comercial.
  *Mitigação:* AC6 e AC7. Sem número de preço e com data visível, o desgaste fica lento e honesto.
- **R2 (médio)** — Recomendar "a melhor" vira opinião contestável e data mal.
  *Mitigação:* cada ferramenta descrita pelo que faz de diferente, e a escolha rápida apresentada como ponto de partida, não veredito.
- **R3 (baixo)** — Link quebrado passa impressão de página abandonada. *Mitigação:* verificação de DNS e HTTP registrada acima; revisar a cada trimestre.

## Complexidade

**S (pequena).** Página de conteúdo, sem lógica nova além do padrão já usado.

## Valor de negócio

Isca de topo com busca alta e vida longa: "quais ferramentas de IA usar" é dúvida de entrada de
todo mundo que está começando. Cobre as seis frentes que o público do Xquads já consome em
páginas separadas, funcionando como porta de entrada para as outras iscas.

## Dependências

`LeadGate`, `SalesCta`, `hasCapturedLead` — existentes.

## Definition of Done

- `/ferramentas` renderiza em dev, lista completa liberada só após lead ou em localhost.
- Nenhum preço em número; data de checagem visível.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-08-27** — Draft criado por @mestre — Story 043
- **2026-08-27** — Validada por @produto: **GO 10/10**. Categorias vêm do dono, extras rastreados a comparativos de 2026 e não a memória; termos ditados por voz decodificados e conferidos antes de virar conteúdo; decisão de não publicar preço protege a página do envelhecimento, que é o risco real deste formato; escopo veda link de afiliado e ranking absoluto. Draft → **Ready**.
- **2026-08-27** — Implementada por @desenvolvedor: `src/app/ferramentas/page.tsx`, accent `#06B6D4`, 6 categorias, 30 ferramentas, LeadGate `source="ferramentas-page"`.
- **2026-08-27** — QA por @qualidade: **PASS.**
  - 30 links renderizados, **todos** com `target="_blank"` e `rel="noopener noreferrer"` (AC8, zero exceções).
  - Varredura por padrão de preço no texto renderizado (`R$`, `US$`, `$n`, `n/mês`): **nenhuma ocorrência** (AC6).
  - Data de checagem e aviso de ausência de afiliado visíveis (AC7).
  - Seis categorias renderizadas na ordem definida; contagem do texto vem de `TOTAL` calculado do próprio array, então não há número escrito à mão para dessincronizar.
  - Lint limpo, `npm run build` verde, rota `/ferramentas` gerada.

## File List

- `src/app/ferramentas/page.tsx`
- `docs/stories/043-ferramentas-page.md`
- **2026-08-27** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-08-27** — Publicada. `/xquads/ferramentas` responde 200, LeadGate ativo, os 30 links protegidos (zero âncoras externas expostas antes do lead), atalho e data visíveis na parte aberta. Auto-deploy do Vercel disparou normalmente pelo push.
