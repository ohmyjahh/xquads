# Story 068 — Página /promptsdevideo (853 prompts de vídeos feitos com Opus 5.5)

**Status:** Done

## Descrição

Nova página isca standalone em `/promptsdevideo` (produção:
`www.sowsales.com.br/xquads/promptsdevideo`), distribuindo `yihui-dev/awesome-opus5-5-videos`:
uma coleção de vídeos virais feitos com Claude Opus 5.5, cada um acompanhado do prompt que o gerou.

`source = "promptsdevideo-page"`.

## Ajuste ao enunciado: não é edição de vídeo

O dono descreveu como material "pros seus vídeos saírem muito melhores quando forem editados com IA".
A verificação mostra que o repositório é outra coisa, e a página precisa refletir isso:

> "Every video here was made by asking Claude Opus 5.5 to write the animation as code
> (HTML, Canvas, SVG, Three.js and friends)."

São vídeos **gerados por código**, não gravações editadas. As categorias confirmam: motion graphics,
explainers, cenas 3D e jogos interativos. Nenhuma trata de cortar, legendar ou finalizar uma gravação.

**A conexão com edição existe, mas é outra:** é daqui que saem as inserções, aberturas e explicações
animadas que entram numa edição. Por isso a página se posiciona como complemento das páginas de
editor já publicadas, e não como substituto delas. Prometer "edite seu vídeo com isso" entregaria
frustração.

## Repositório verificado (12/10/2026)

| Item | Valor |
|---|---|
| Repositório | `yihui-dev/awesome-opus5-5-videos` |
| Estrelas | 4.426 |
| Forks | 467 |
| Licença | MIT |
| Criado | 27/09/2026 |
| Último push | **12/10/2026**, o mesmo dia da checagem |

**853 prompts** no diretório `prompts/` e em `data/videos.json`; 523 deles com recriação ao vivo.
100 destacados no README, um por prompt distinto. A atualização do próprio dia da checagem
acrescentou 10 vídeos e 330 prompts.

## O que há dentro

| Categoria | Quantidade destacada |
|---|---|
| Motion graphics | 58 |
| Explainers | 16 |
| Cenas 3D | 14 |
| Jogos e interativos | 12 |

Cada entrada traz a tecnologia usada (Canvas, SVG, GSAP, Three.js), o link para o post original do
criador e o arquivo do prompt.

## Ponto de transparência

O repositório é mantido por quem opera o **Skillry**, site onde cada vídeo aparece ao lado de uma
recriação ao vivo. Os links do README carregam parâmetros de campanha. Não há problema nisso — o
material é MIT e os prompts estão no próprio GitHub, sem precisar do site —, mas a página registra
que o acervo é gratuito e que o site é do autor.

## Critérios de Aceite

- **AC1** — Rota `/promptsdevideo` (`src/app/promptsdevideo/page.tsx`) standalone.
- **AC2** — Accent `#C4B5FD`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o que é, **que gera animação por código e não edita gravação**, e as categorias.
- **AC4** — **Nenhuma promessa de que edita o vídeo da pessoa.** O posicionamento é de material para inserções e peças animadas.
- **AC5** — Parte gated: os números do acervo, como usar um prompt e o link do repositório.
- **AC6** — A página registra que os prompts estão no GitHub, de graça, sem depender do site do autor.
- **AC7** — Cross-link para `/editordevideosia`, que trata da edição propriamente dita.
- **AC8** — Link externo com `target="_blank"` e `rel="noopener noreferrer"`, atrás do gate.
- **AC9** — Números datados, por ser um acervo que cresce toda semana.
- **AC10** — Lead `source="promptsdevideo-page"`, bypass só em localhost, `SalesCta` com `utmContent="promptsdevideo"`.
- **AC11** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (alto)** — Pessoa esperar um editor de vídeo e receber prompts de animação. *Mitigação:* AC3 e AC4.
- **R2 (médio)** — Acervo cresce rápido e os números envelhecem. *Mitigação:* AC9.
- **R3 (baixo)** — Parecer propaganda do Skillry. *Mitigação:* AC6.

## Complexidade

**S (pequena).**

## Valor de negócio

Encaixa no bloco de produção de vídeo do Xquads, que já tem três páginas de editor, e atende quem
precisa de peça animada sem saber motion design. Material gratuito, de autor ativo, em alta.

## Change Log

- **2026-10-12** — Draft criado por @mestre — Story 068
- **2026-10-12** — Validada por @produto: **GO 10/10**. A leitura do README corrigiu o enquadramento antes de virar promessa de página: o acervo gera animação por código e não edita gravação, e isso vira critério de aceite em vez de detalhe. A relação comercial do autor com o site foi registrada em vez de omitida. Draft → **Ready**.
- **2026-10-12** — Implementada por @desenvolvedor: `src/app/promptsdevideo/page.tsx`, accent `#C4B5FD`, LeadGate `source="promptsdevideo-page"`.
- **2026-10-12** — QA por @qualidade: **PASS.**
  - **AC3 e AC4 verificados**: o bloco "escreve a animação como código" e a frase "Não é um editor" aparecem na parte aberta, antes do gate.
  - **AC5 verificado**: as quatro categorias renderizadas com as quantidades.
  - **AC7 verificado**: cross-link para `/editordevideosia` presente.
  - **AC9 verificado**: data de checagem visível, com a observação de que o acervo cresceu no próprio dia.
  - Lint limpo, `npm run build` verde, rota gerada.

## File List

- `src/app/promptsdevideo/page.tsx`
- `docs/stories/068-promptsdevideo-page.md`
- **2026-10-12** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
