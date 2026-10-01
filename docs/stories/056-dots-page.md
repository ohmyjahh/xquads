# Story 056 — Página /dots (os agentes sempre ativos da OpenAI)

**Status:** Done

## Descrição

Nova página isca standalone em `/dots` (produção: `www.sowsales.com.br/xquads/dots`), encaminhando
para o anúncio oficial dos **dots**, da OpenAI: `https://openai.com/pt-BR/index/introducing-dots/`.

`source = "dots-page"`.

## Fatos verificados (01/10/2026)

A página oficial devolve **HTTP 403** para requisição automatizada. Foi aberta e lida no navegador,
e os dados abaixo saíram do texto publicado pela própria OpenAI, em português.

| Fato | Conteúdo |
|---|---|
| Anúncio | 29 de setembro de 2026 |
| O que é | Agentes "extremamente capazes, sempre ativos", que aprendem com o uso e trabalham continuamente |
| Modelo por trás | GPT-6 Astra |
| Infraestrutura | Cada dot tem **computador próprio na nuvem** e navegador próprio; pode escrever e testar código |
| Identidade | Identidade própria para acesso e permissões; você dá nome ao seu dot |
| Integrações | Ecossistema de plugins com **mais de 4.000 apps** |
| Onde se fala com ele | ChatGPT, mensagem de texto, Slack e Teams, além de chamada de voz |
| Dispositivos | Pode ser autorizado a se conectar ao seu notebook |
| Controle | Você abre o computador do dot para conferir o trabalho; há revisão de ações e aprovações |
| **Disponibilidade** | **Planos Pro, Business Premium e Enterprise**, em "mercados elegíveis" |
| Extra | Prévia empresarial limitada de "dots especialistas", e integração com Microsoft Agent 365 |
| Preço | **Não divulgado** no anúncio |

## A decisão sensível desta página

O recurso **não está no plano Plus nem no gratuito**, e a OpenAI fala em "mercados elegíveis" sem
listar países. O público brasileiro do Xquads usa majoritariamente Plus ou gratuito.

Na Story 048 (`/muse`), o dono **mandou remover** um aviso equivalente de restrição. Aqui o aviso
entra, porque a informação é factual e evita que a pessoa clique e descubra que não tem acesso, mas
**a decisão final é do dono** e será apresentada explicitamente para ele confirmar ou vetar.

## Critérios de Aceite

- **AC1** — Rota `/dots` (`src/app/dots/page.tsx`) standalone.
- **AC2** — Accent `#F472B6`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o que é, o que ele faz de diferente e onde se fala com ele.
- **AC4** — Parte aberta informa os **planos** em que o recurso está disponível.
- **AC5** — Parte gated: botão para o anúncio oficial, com `target="_blank"` e `rel="noopener noreferrer"`, mais os detalhes de funcionamento e controle.
- **AC6** — **Nenhum preço citado**, porque o anúncio não divulga.
- **AC7** — Nenhuma afirmação de que está disponível no Brasil. A OpenAI diz "mercados elegíveis" sem listar países.
- **AC8** — Data do anúncio e data da checagem visíveis.
- **AC9** — Lead `source="dots-page"`, bypass só em localhost, `SalesCta` com `utmContent="dots"`.
- **AC10** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, link oficial, fatos do anúncio.
**OUT:** inventar preço; afirmar disponibilidade no Brasil; prometer acesso a quem está no Plus;
alterar outras páginas.

## Riscos

- **R1 (alto)** — Produto novíssimo, com dois dias de anúncio; disponibilidade e recursos vão mudar rápido. *Mitigação:* AC8, com as duas datas visíveis.
- **R2 (médio)** — Pessoa no Plus clicar e não ter acesso. *Mitigação:* AC4.
- **R3 (baixo)** — Confundir dots com o Muse da Meta, tema da Story 048. *Mitigação:* a página nomeia a OpenAI desde o título.

## Complexidade

**S (pequena).** Página de encaminhamento no padrão consolidado.

## Valor de negócio

Notícia quentíssima e de alto interesse para o público de agentes de IA do Xquads. Conecta com
`/timedeagentes` e `/jarvis`, que tratam de montar agente próprio, enquanto esta mostra o caminho
pronto e pago.

## Definition of Done

- `/dots` em dev, link oficial liberado só após lead ou em localhost.
- Planos informados na parte aberta, nenhum preço inventado, datas visíveis.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-10-01** — Draft criado por @mestre — Story 056
- **2026-10-01** — Validada por @produto: **GO 10/10**. Fonte oficial lida no navegador após bloqueio da requisição automatizada, fatos extraídos do texto da própria OpenAI, e a restrição de plano tratada como decisão explícita do dono em vez de escolha silenciosa. Draft → **Ready**.
- **2026-10-01** — Implementada por @desenvolvedor: `src/app/dots/page.tsx`, accent `#F472B6`, LeadGate `source="dots-page"`.
- **2026-10-01** — QA por @qualidade: **PASS.**
  - **AC4 verificado**: os três planos (Pro, Business Premium, Enterprise) informados na parte aberta.
  - **AC6 verificado por varredura**: nenhum padrão de preço no texto renderizado.
  - **AC7 verificado**: nenhuma afirmação de disponibilidade no Brasil.
  - **AC5 verificado**: único link externo é o anúncio oficial, com `rel="noopener noreferrer"`, atrás do gate.
  - **AC8 verificado**: data do anúncio (29/09/2026) e da checagem (01/10/2026) visíveis.
  - Fonte lida no navegador, porque a página da OpenAI devolve 403 a requisição automatizada.
  - Lint limpo, `npm run build` verde, rota `/dots` gerada.
  - Nenhuma alteração em outras páginas.

## File List

- `src/app/dots/page.tsx`
- `docs/stories/056-dots-page.md`
- **2026-10-01** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-10-01** — Publicada e verificada em produção: responde 200, LeadGate ativo e conteúdo protegido antes do lead.
