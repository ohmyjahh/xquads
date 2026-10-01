# Story 057 — Ajustes na /dots: remover aviso de planos e destacar o botão

**Status:** Done

## Descrição

Dois ajustes pedidos pelo dono na página `/dots` (Story 056), publicada em 01/10/2026.

## Ajuste 1 — Remover o bloco de aviso de planos

O bloco "Antes de criar expectativa: não está em todos os planos" sai da parte aberta.

**AC4 da Story 056 fica revogado**, e com ele a mitigação do risco R2 daquela story. Registrado para
rastreabilidade: a página deixa de informar que o recurso só existe nos planos Pro, Business Premium
e Enterprise. Quem está no Plus ou no gratuito vai descobrir ao abrir o anúncio.

Mesma decisão já tomada pelo dono na Story 048 (`/muse`), onde o aviso de restrição também foi
removido a pedido dele.

## Ajuste 2 — Destacar o botão de acesso

**Diagnóstico:** o link do anúncio foi construído com o mesmo formato dos cards de conteúdo — borda
e fundo em baixa opacidade da cor de destaque, retângulo largo, texto alinhado à esquerda. Ao lado
dos cards de "Quem manda continua sendo você", que usam `border-[#2a2a2e] bg-[#1a1a1d]`, ele lê como
mais um bloco informativo, e não como a ação principal da página.

**Correção:** transformar em botão de verdade, com fundo sólido na cor de destaque, texto escuro,
centralizado, maior e com sombra colorida. Contraste de preenchimento, não só de borda.

## Critérios de Aceite

- **AC1** — O bloco de planos não existe mais na página.
- **AC2** — O link do anúncio tem **fundo sólido** na cor de destaque, não fundo translúcido.
- **AC3** — O botão fica **visualmente distinto** de qualquer card de conteúdo da página: nenhum outro elemento usa fundo sólido na cor de destaque.
- **AC4** — A informação de contexto (domínio, idioma) sai de dentro do botão e vira legenda abaixo, para o botão ficar com uma mensagem só.
- **AC5** — Atributos de segurança preservados: `target="_blank"` e `rel="noopener noreferrer"`.
- **AC6** — Nada mais da página é alterado, e nenhuma outra página é tocada.
- **AC7** — `npm run build` verde e lint limpo.

## Escopo

**IN:** remoção do bloco de planos e redesenho do botão na `/dots`.
**OUT:** alterar o link de destino; mexer no LeadGate; tocar em qualquer outra página.

## Riscos

- **R1 (médio)** — Sem o aviso, pessoa sem plano elegível clica e não consegue usar. *Mitigação:* nenhuma. Decisão consciente do dono, registrada acima.
- **R2 (baixo)** — Import de ícone órfão após a remoção. *Mitigação:* verificação no QA.

## Complexidade

**XS.** Remoção de um bloco e troca de classes de um elemento.

## Definition of Done

- Bloco removido, botão com fundo sólido e destacado dos cards.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-10-01** — Draft criado por @mestre — Story 057
- **2026-10-01** — Validada por @produto: **GO 9/10**. Ajustes pequenos e bem delimitados, com o diagnóstico do botão apontando a causa concreta (mesma linguagem visual dos cards de conteúdo) em vez de "deixar mais bonito". Revogação do AC4 da Story 056 registrada. Desconto por ser ajuste sem valor de negócio próprio. Draft → **Ready**.
- **2026-10-01** — Implementada por @desenvolvedor. Bloco de planos removido e botão redesenhado.
- **2026-10-01** — QA por @qualidade: **PASS.**
  - **AC1 verificado**: nenhuma ocorrência de "Business Premium" no texto renderizado.
  - **AC2 e AC3 verificados por estilo computado**: o botão tem fundo sólido `rgb(244, 114, 182)`, texto `rgb(61, 10, 38)` e sombra colorida; **todos** os cards da página usam `rgb(26, 26, 29)`. O botão é o único elemento com fundo sólido na cor de destaque.
  - **AC4 verificado**: a legenda com domínio e idioma saiu de dentro do botão e virou texto abaixo.
  - **AC5 verificado**: `target="_blank"` e `rel="noopener noreferrer"` preservados.
  - **AC6 verificado**: nenhuma outra página alterada.
  - Imports órfãos checados após a remoção; nenhum sobrou.
  - Lint limpo, `npm run build` verde.
  - **AC4 da Story 056 marcado como revogado** no arquivo daquela story.

## File List

- `src/app/dots/page.tsx`
- `docs/stories/057-dots-ajustes.md`
- `docs/stories/056-dots-page.md` (marcação do AC revogado)
- **2026-10-01** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-10-01** — Publicada e verificada em produção. Sem lead: aviso de planos ausente, LeadGate ativo, botão protegido. Com o gate destravado: botão com fundo sólido `rgb(244, 114, 182)` contra `rgb(26, 26, 29)` de todos os cards, destino correto para o anúncio da OpenAI. Auto-deploy do Vercel disparou pelo push.
