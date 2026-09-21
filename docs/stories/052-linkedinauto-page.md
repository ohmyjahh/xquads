# Story 052 — Página /linkedinauto (3 prompts de automação diária de conteúdo no LinkedIn)

**Status:** Done

## Descrição

Nova página isca standalone em `/linkedinauto` (produção: `www.sowsales.com.br/xquads/linkedinauto`),
com uma sequência de **3 prompts encadeados** que monta uma rotina diária: mapear os perfis de
referência do nicho, varrer notícias e publicações das últimas 24 horas, e transformar os dois
melhores temas em artigos publicados no perfil da pessoa.

`source = "linkedinauto-page"`.

## Posição frente às páginas irmãs

| Página | Recorte |
|---|---|
| `/linkedin` (Story 022) | Método de 5 prompts para escrever post, com skill para download |
| `/claudelinkedin` (Story 029) | Candidatura em massa a vagas |
| **`/linkedinauto`** (esta) | **Rotina diária automatizada de conteúdo: pesquisa, redação e publicação** |

Sem sobreposição: a `/linkedin` ensina a escrever, esta monta a esteira que roda sozinha.

## Fatos verificados (21/09/2026)

- O LinkedIn bloqueia centenas de milhares de tentativas automatizadas por dia e **reduz o alcance** do conteúdo quando identifica automação.
- Velocidade sobre-humana e repetição de padrão acionam os sistemas de detecção.
- A plataforma lançou mecanismo de denúncia de conteúdo gerado por IA.
- Violação grave, sobretudo scraping em massa, pode levar à perda da conta.

**Leitura honesta para a página:** publicar dois artigos por dia no próprio perfil é atividade de
volume baixo e natureza diferente de comentar em massa ou raspar dados. O risco existe e cresce com
volume e velocidade. A página informa sem alarmismo e sem prometer impunidade.

## Critérios de Aceite

- **AC1** — Rota `/linkedinauto` (`src/app/linkedinauto/page.tsx`) standalone.
- **AC2** — Accent `#60A5FA`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte **aberta**: o que a rotina faz e a exigência de agente com controle de navegador. ~~Aviso sobre a política de automação do LinkedIn.~~ **Esse aviso foi removido por decisão do dono em 21/09/2026** (ver Change Log).
- **AC4** — Parte **gated**: os 3 prompts, cada um com botão de copiar próprio e fallback de clipboard.
- **AC5** — Prompts melhorados a partir do original do dono, com autorização explícita ("Pode melhorar os prompts"). Cada melhoria deve corresponder a um problema concreto do original, registrado na story.
- **AC6** — Os placeholders que dependem da pessoa (`[SEU NICHO]`, `[PERFIS]`, `[HORÁRIOS]`) permanecem, porque não há como preenchê-los de antemão.
- **AC7** — **Nenhuma instrução de capturar print de matéria de terceiro.** O original pedia "um print da notícia"; reproduzir matéria alheia em publicação própria é problema de direito autoral. Substituído por imagem própria com link da fonte creditado.
- **AC8** — O prompt 3 inclui janela de revisão antes da publicação automática, em vez de publicar às cegas desde o primeiro dia.
- **AC9** — Lead `source="linkedinauto-page"`, bypass só em localhost, `SalesCta` com `utmContent="linkedinauto"`.
- **AC10** — `npm run build` verde e lint limpo.

## Melhorias aplicadas aos prompts

| Prompt | Problema no original | Correção |
|---|---|---|
| 1 | "principais perfis" sem critério | Define critério de seleção e exige a URL de cada perfil, para o prompt 2 conseguir usar |
| 1 | Resultado se perde entre sessões | Manda salvar a lista em arquivo |
| 2 | "os 2 melhores temas" sem régua | Define o que torna um tema bom: relevância, ineditismo e potencial de opinião |
| 2 | Sem exigência de fonte | Exige link e data de cada item, e proíbe usar o que não conseguir confirmar |
| 2 | Não trata dia sem notícia relevante | Instrui a dizer que não há tema bom em vez de inventar |
| 3 | Publica sem revisão desde o dia 1 | Mostra o texto para aprovação nos primeiros 7 dias, depois publica direto |
| 3 | "print da notícia" | Imagem própria, com link da fonte creditado no corpo |
| 3 | Sem estrutura nem tamanho de artigo | Define abertura, desenvolvimento, posição pessoal e fechamento, com faixa de tamanho |
| 3 | Sem tratamento de falha | Instrui a parar e avisar se aparecer captcha, verificação ou erro de publicação |
| 3 | Sem registro | Pede log do que foi publicado, com link do post |

## Escopo

**IN:** página nova, 3 prompts melhorados, avisos na parte aberta.
**OUT:** ferramenta de automação própria; contornar detecção do LinkedIn; prometer que a conta não
será restringida; instruir reprodução de conteúdo de terceiro.

## Riscos

- **R1 (alto)** — Pessoa automatiza em volume e tem alcance reduzido ou conta restringida. *Mitigação:* AC3, com a nuance de volume explicada.
- **R2 (médio)** — Artigo publicado sem revisão sai errado no perfil profissional. *Mitigação:* AC8.
- **R3 (médio)** — Print de matéria de terceiro gera problema de direito autoral. *Mitigação:* AC7.
- **R4 (baixo)** — Não roda no chat comum. *Mitigação:* AC3.

## Complexidade

**S (pequena).** Página de conteúdo no padrão já consolidado.

## Valor de negócio

Tema de procura alta e público qualificado: quem quer presença no LinkedIn sem escrever todo dia.
Conecta com `/linkedin` e `/claudelinkedin`, formando um trio sobre a mesma plataforma.

## Definition of Done

- `/linkedinauto` em dev, 3 prompts liberados só após lead ou em localhost.
- Avisos na parte aberta. Nenhuma instrução de print de matéria alheia.
- Lint limpo, build verde, prompts mostrados ao dono para conferência antes do push.

## Change Log

- **2026-09-21** — Draft criado por @mestre — Story 052
- **2026-09-21** — Validada por @produto: **GO 10/10**. Recorte distinto das duas páginas de LinkedIn existentes, política da plataforma verificada em fonte antes de virar aviso, e as dez melhorias de prompt rastreadas a problemas concretos do original. Os dois pontos que o dono não pediu mas que protegem o resultado, janela de revisão e substituição do print, estão como AC e serão apresentados explicitamente. Draft → **Ready**.
- **2026-09-21** — Implementada por @desenvolvedor: `src/app/linkedinauto/page.tsx`, accent `#60A5FA`, LeadGate `source="linkedinauto-page"`.
- **2026-09-21** — QA por @qualidade: **PASS.**
  - **AC4 verificado**: 3 blocos de prompt renderizados, 3 botões de copiar independentes, cada um com fallback de clipboard.
  - **AC3 verificado**: os três avisos (agente com navegador, política de automação, texto sem revisão) na parte aberta.
  - **AC6 verificado**: exatamente 3 placeholders, todos dependentes da pessoa — `[SEU NICHO]`, `[COLE OS PERFIS AQUI]`, `[COLE OS HORÁRIOS AQUI]`.
  - **AC7 verificado**: nenhuma instrução de capturar print de matéria; o prompt 3 instrui explicitamente a **não** fazer isso e a creditar a fonte por link.
  - **AC8 verificado**: janela de aprovação dos primeiros 7 dias presente no prompt 3.
  - Lint limpo, `npm run build` verde, rota `/linkedinauto` gerada.

## File List

- `src/app/linkedinauto/page.tsx`
- `docs/stories/052-linkedinauto-page.md`
- **2026-09-21** — **Decisão editorial do dono:** remover o card "O LinkedIn restringe automação" da parte aberta. **AC3 fica parcialmente revogado e o R1 perde sua mitigação** — registrado aqui para rastreabilidade: a página não informa mais que a plataforma reduz o alcance de conteúdo automatizado. Os outros dois avisos, agente com navegador e revisão antes de publicar, permanecem. Import órfão `ShieldAlert` removido. Lint limpo, build verde.
- **2026-09-21** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
