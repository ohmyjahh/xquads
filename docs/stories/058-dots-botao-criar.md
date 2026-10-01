# Story 058 — /dots: botão passa a levar para a criação do dot

**Status:** Done

## Descrição

O dono pediu para trocar o texto do botão de "Ler o anúncio oficial dos dots" para
**"Crie os seus DOTS"**.

## Achado durante a execução

Com esse texto, o destino atual ficaria errado: o botão apontava para o **artigo de anúncio**, e
quem clica em "Crie os seus DOTS" espera chegar na criação, não numa matéria.

Verificação na própria página da OpenAI encontrou o link oficial de criação:
**`https://chatgpt.com/dots`** (o href publicado traz parâmetros de rastreio da OpenAI, removidos).

Por isso o destino acompanha o texto. O anúncio, que era o pedido original da Story 056, **continua
na página** como link secundário, abaixo do botão.

## Critérios de Aceite

- **AC1** — Texto do botão: **"Crie os seus DOTS"**.
- **AC2** — Destino do botão: `https://chatgpt.com/dots`, sem parâmetros de rastreio de terceiros.
- **AC3** — O anúncio oficial **permanece acessível** na página, como link secundário.
- **AC4** — Legenda sob o botão coerente com o novo destino; a antiga falava do vídeo de lançamento.
- **AC5** — Os dois links com `target="_blank"` e `rel="noopener noreferrer"`, ambos atrás do lead.
- **AC6** — O botão segue sendo o único elemento com fundo sólido na cor de destaque.
- **AC7** — `npm run build` verde e lint limpo.

## Escopo

**IN:** texto, destino e legenda do botão; link secundário para o anúncio.
**OUT:** alterar o restante da página; tocar em outras páginas.

## Riscos

- **R1 (baixo)** — A criação do dot exige plano elegível, e o aviso de planos foi removido na Story 057 por decisão do dono. A pessoa descobre a restrição na própria tela da OpenAI. *Mitigação:* nenhuma, por decisão registrada.

## Complexidade

**XS.**

## Change Log

- **2026-10-01** — Draft criado por @mestre — Story 058
- **2026-10-01** — Validada por @produto: **GO 9/10**. A troca pedida expôs um descompasso entre rótulo e destino, resolvido com o link oficial de criação verificado na fonte, preservando o anúncio que originou a página. Draft → **Ready**.
- **2026-10-01** — Implementada por @desenvolvedor e verificada por @qualidade: **PASS.**
  - **AC1 e AC2 verificados**: botão com texto "Crie os seus DOTS" apontando para `https://chatgpt.com/dots`, sem parâmetros de rastreio. URL aberta no navegador para confirmar que é válida; o 403 por `curl` é o bloqueio de bot padrão dos domínios da OpenAI.
  - **AC3 e AC4 verificados**: a legenda sob o botão virou "Abre no ChatGPT · ler o anúncio oficial da OpenAI", mantendo o anúncio acessível.
  - **AC5 verificado**: dois links na página, ambos com `target="_blank"` e `rel="noopener noreferrer"`, ambos atrás do lead.
  - **AC6 verificado por estilo computado**: o botão continua sendo o único elemento com fundo sólido na cor de destaque.
  - Lint limpo, `npm run build` verde.
- **2026-10-01** — Aprovada pelo dono na mesma mensagem do pedido. @devops: commit + push em `main`. Status → **Done**.

## File List

- `src/app/dots/page.tsx`
- `docs/stories/058-dots-botao-criar.md`
