# Story 067 — Campo "área de atuação" na /loop, que ficou de fora

**Status:** Done

## Descrição

A Story 066 acrescentou o campo de área aos dois componentes de formulário, atingindo 66 das 67
páginas. A **`/loop` ficou de fora**: ela não importa o componente, tem um `LeadGate` **local**,
declarado dentro do próprio `page.tsx`, com os próprios campos e a própria chamada à API.

Descoberto quando o dono perguntou se todas as páginas tinham sido atualizadas.

## Por que passou despercebido

A contagem inicial usou `grep "LeadGate"`, que casa tanto com o **import** do componente quanto com
a **declaração local** de uma função de mesmo nome. Os números corretos:

| Origem do formulário | Páginas |
|---|---|
| Importam `@/components/lead-gate` | 50 |
| Importam `components/downloads/lead-form` | 16 |
| **Formulário local, na própria página** | **1 — `/loop`** |

Confirmado em produção: o HTML da `/loop` não contém o campo.

## Decisão: migrar para o componente, não duplicar o campo

Duas saídas possíveis:

1. **Acrescentar o campo ao formulário local** — resolve agora, mas mantém duas implementações do mesmo formulário, que voltarão a divergir na próxima mudança.
2. **Trocar o formulário local pelo componente compartilhado** — resolve agora e elimina a causa.

Escolhida a opção 2. O formulário local não tem comportamento exclusivo: coleta os mesmos campos e
chama a mesma rota. Manter uma cópia só cria a próxima divergência.

## Critérios de Aceite

- **AC1** — A `/loop` passa a importar e usar `@/components/lead-gate`.
- **AC2** — O `LeadGate` local é **removido** do arquivo, junto com o estado e os handlers que só ele usava.
- **AC3** — O `source` enviado pela `/loop` é preservado, para não quebrar o rastreio de origem na planilha.
- **AC4** — A aparência segue a cor de destaque da página, como nas demais.
- **AC5** — O comportamento de desbloqueio da página continua idêntico.
- **AC6** — Depois desta story, **nenhuma** página do projeto tem formulário próprio.
- **AC7** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (médio)** — Perder o `source` da página e sujar o rastreio. *Mitigação:* AC3, com verificação do valor antes e depois.
- **R2 (baixo)** — O desbloqueio da página depender de algo do formulário local. *Mitigação:* AC5.

## Complexidade

**XS.**

## Change Log

- **2026-10-09** — Draft criado por @mestre — Story 067
- **2026-10-09** — Validada por @produto: **GO 10/10**. A falha foi encontrada por uma pergunta de verificação do dono, e a story ataca a causa, a duplicação do formulário, em vez de só remendar o sintoma. Draft → **Ready**.
- **2026-10-10** — Implementada por @desenvolvedor. O `LeadGate` local, de 3.957 caracteres, foi removido e a página passou a usar `@/components/lead-gate`. Imports que ficaram órfãos (`Loader2`, `Lock`, `markLeadCaptured`) removidos.
- **2026-10-10** — QA por @qualidade: **PASS.**
  - **AC1, AC2 e AC6 verificados**: a `/loop` importa o componente, o formulário local não existe mais, e a varredura confirma que **nenhuma página do projeto** chama a API por conta própria.
  - **AC3 verificado**: o `source` continua `loop-page`. Confirmado no payload capturado.
  - Campo presente no HTML servido, com as opções corretas, e o título do gate preservado ("Receba as 3 instruções").
  - Payload conferido contra o servidor que simula o Apps Script: ordem das chaves idêntica à das outras páginas, com `area` no fim.
  - **Erro de lint `set-state-in-effect` na página é pré-existente**, confirmado por comparação com a versão publicada (1 ocorrência antes, 1 depois). Não foi introduzido por esta story e não bloqueia o build.
  - `npm run build` verde.

## File List

- `src/app/loop/page.tsx`
- `docs/stories/067-loop-campo-area.md`
- **2026-10-12** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-10-12** — Publicada e verificada em produção: responde 200.
