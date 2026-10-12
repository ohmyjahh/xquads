# Story 070 — Página /engenhariareversa (REA, engenharia reversa com agentes)

**Status:** Done

## Descrição

Nova página isca standalone em `/engenhariareversa` (produção:
`www.sowsales.com.br/xquads/engenhariareversa`), distribuindo `morluto/rea`.

`source = "engenhariareversa-page"`.

## Repositório verificado (12/10/2026)

| Item | Valor |
|---|---|
| Repositório | `morluto/rea` — "REA: Reverse Engineer Anything" |
| Estrelas | **138.818** |
| Forks | 31.510 |
| Licença | MIT |
| Linguagem | TypeScript |
| Último push | 12/10/2026, o mesmo dia da checagem |
| Instalação | `npx rea-agents setup` |

Um dos maiores repositórios já cobertos nesta série.

## O que faz

Conecta o agente a ferramentas de inspeção de **binários nativos, aplicações JavaScript e Electron,
assemblies .NET e sites**. A análise roda **localmente**, e cada conclusão vem com a evidência e as
limitações que a sustentam. Pode usar Hopper, Ghidra ou IDA quando já instalados; análise estática
de JavaScript dispensa engine nativa.

## O ponto que domina esta página

Engenharia reversa de binário é assunto mais sensível que o da Story 061 (`/replicadeapp`). Lá, o
projeto se limitava a refazer funcionalidade em clean-room, sem tocar no produto alheio. Aqui, a
ferramenta **inspeciona o programa de terceiro diretamente**.

Isso esbarra em contrato e lei, e varia por país e por produto: licença de uso que proíbe a prática,
normas sobre proteção de medidas técnicas, e no Brasil a lei de software, que admite hipóteses
específicas. **A página não dá parecer jurídico** e não vai tentar resumir legislação.

O que a página faz:
- Descreve o propósito declarado pelo projeto: entender como um recurso funciona e construir a sua própria versão.
- Registra que análise de binário de terceiro **pode esbarrar na licença do produto** e que isso muda conforme o caso.
- Recomenda consultar advogado antes de usar em contexto comercial.
- **Não ensina a contornar proteção, licenciamento ou DRM**, e não nomeia alvos.

## Critérios de Aceite

- **AC1** — Rota `/engenhariareversa` (`src/app/engenhariareversa/page.tsx`) standalone.
- **AC2** — Accent `#FCA5A5`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o que é, o que consegue analisar e **o alerta de uso responsável**.
- **AC4** — O alerta jurídico fica **antes do gate**, não como recompensa de lead.
- **AC5** — Parte gated: o que dá para analisar em detalhe, como instalar e o link do repositório.
- **AC6** — **Nenhuma instrução de contornar proteção, licença ou DRM.** Nenhum alvo nomeado.
- **AC7** — A página não emite opinião jurídica própria; recomenda advogado para uso comercial.
- **AC8** — Link externo com `target="_blank"` e `rel="noopener noreferrer"`, atrás do gate.
- **AC9** — Cross-link para `/replicadeapp`, que trata de reconstruir sem inspecionar binário.
- **AC10** — Números e data visíveis.
- **AC11** — Lead `source="engenhariareversa-page"`, bypass só em localhost, `SalesCta` com `utmContent="engenhariareversa"`.
- **AC12** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (alto)** — Leitor usar contra produto de terceiro e ter problema contratual. *Mitigação:* AC3, AC4 e AC7.
- **R2 (médio)** — A página parecer que autoriza ou orienta juridicamente. *Mitigação:* AC7.
- **R3 (baixo)** — Expectativa de ferramenta simples; exige Hopper, Ghidra ou IDA para binário nativo. *Mitigação:* registrado na parte gated.

## Complexidade

**S (pequena), com atenção redobrada ao texto.**

## Change Log

- **2026-10-12** — Draft criado por @mestre — Story 070
- **2026-10-12** — Validada por @produto: **GO 10/10**. O tema é mais sensível que o da Story 061 e a story reconhece isso explicitamente, elevando o cuidado em vez de repetir a fórmula anterior. O alerta vai para a parte aberta e a página se abstém de opinar sobre direito. Draft → **Ready**.
- **2026-10-12** — Implementada e verificada: **PASS.** Bloco "Onde esse assunto fica sério" na parte aberta, antes do gate; frase "não é orientação jurídica" presente; cross-link para `/replicadeapp`; **varredura por termos de contorno de proteção (crack, burlar licença, pirataria) retornou zero ocorrências**; nenhum alvo nomeado. Lint limpo, build verde.

## File List
- `src/app/engenhariareversa/page.tsx`
- `docs/stories/070-engenhariareversa-page.md`
- **2026-10-12** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-10-12** — Publicada e verificada em produção: responde 200.
