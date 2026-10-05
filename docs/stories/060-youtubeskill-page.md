# Story 060 — Página /youtubeskill (11 skills do Claude para rodar canal no YouTube)

**Status:** Done

## Descrição

Nova página isca standalone em `/youtubeskill` (produção: `www.sowsales.com.br/xquads/youtubeskill`),
distribuindo o repositório `Jakeschincariol/youtube-agent-skill`: onze skills do Claude que cobrem
o ciclo de um canal, do roteiro à leitura de retenção.

`source = "youtubeskill-page"`.

## Repositório verificado (05/10/2026)

| Item | Valor |
|---|---|
| Repositório | `Jakeschincariol/youtube-agent-skill` |
| Estrelas | 519 |
| Forks | 109 |
| Licença | MIT |
| Linguagem | Python |
| Criado | 16/09/2026 |
| Último push | **16/09/2026**, o mesmo dia da criação |
| Arquivado | Não |
| URL | HTTP 200 |

**Observação registrada:** não houve commit depois do lançamento, três semanas atrás. Pode ser um
pacote publicado pronto, não necessariamente abandono, mas a data de checagem fica visível na página
para o leitor julgar.

## Os onze comandos

`/yt-script` · `/yt-package` · `/yt-edit` · `/yt-comment` · `/yt-plan` · `/yt-viral` ·
`/yt-retention` · `/yt-shorts` · `/yt-seo` · `/yt-chapters` · `/yt-audit`

Seis deles vêm com ferramentas em Python 3 puro, sem dependências: pontuação de gancho, linter de
título e thumbnail, lista de decisões de edição, capítulos validados, leitura de retenção e
detecção de outliers por múltiplo da própria mediana do canal.

## Três fatos que o próprio autor declara, e que vão para a página

1. **Nada é publicado automaticamente.** "These skills write. You upload." O autor diz que a API do
   YouTube permitiria publicar com OAuth, mas que não foi construído assim de propósito. É um ponto
   favorável: diferencia de pacotes que prometem rodar canal sozinhos.
2. **O `hookscore.py` é heurística, não preditor.** Calibrado contra 74 ganchos reais. O autor
   explicita isso, e a página não deve vender como previsão de viralização.
3. **Sem Claude Code, perde-se as seis ferramentas Python**, que é "a maior parte do sentido" de
   três das skills. Funciona colando o `SKILL.md` num chat, mas reduzido.

## Critérios de Aceite

- **AC1** — Rota `/youtubeskill` (`src/app/youtubeskill/page.tsx`) standalone.
- **AC2** — Accent `#FF0000`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o que é, o fato de ser gratuito e MIT, e os três fatos declarados pelo autor.
- **AC4** — Parte gated: os onze comandos, o link do repositório e as formas de instalar.
- **AC5** — **Nenhuma promessa de viralização.** O pontuador de gancho é apresentado como heurística, como o autor declara.
- **AC6** — A página destaca o passo do `voice.md`, que o autor aponta como o de maior impacto no resultado.
- **AC7** — Link externo com `target="_blank"` e `rel="noopener noreferrer"`, atrás do gate.
- **AC8** — Números do repositório datados, com a data de checagem visível.
- **AC9** — Lead `source="youtubeskill-page"`, bypass só em localhost, `SalesCta` com `utmContent="youtubeskill"`.
- **AC10** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, onze comandos, instalação, link do repositório.
**OUT:** prometer publicação automática no YouTube; vender o pontuador como preditor; tutorial de
instalação do Claude Code.

## Riscos

- **R1 (médio)** — Repositório sem commit desde o lançamento. *Mitigação:* AC8, com as datas visíveis.
- **R2 (médio)** — Leitor esperar automação de publicação. *Mitigação:* AC3, com o ponto na parte aberta.
- **R3 (baixo)** — Expectativa de previsão de viralização. *Mitigação:* AC5.

## Complexidade

**S (pequena).** Página de distribuição no padrão consolidado.

## Valor de negócio

Encaixe direto com o público do Xquads, que já consome skills do Claude e produz conteúdo. Conversa
com `/roteiroviral`, `/editordevideosia` e as páginas de agentes.

## Definition of Done

- `/youtubeskill` em dev, comandos e link liberados só após lead ou em localhost.
- Os três fatos do autor na parte aberta. Datas visíveis.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-10-05** — Draft criado por @mestre — Story 060
- **2026-10-05** — Validada por @produto: **GO 10/10**. Repositório verificado por API antes de virar conteúdo, e as três ressalvas que o próprio autor publica foram tratadas como critério, em vez de omitidas para engordar a promessa. Draft → **Ready**.
- **2026-10-05** — Implementada por @desenvolvedor: `src/app/youtubeskill/page.tsx`, accent `#FF0000`, LeadGate `source="youtubeskill-page"`.
- **2026-10-05** — QA por @qualidade: **PASS.**
  - **AC4 verificado**: os 11 comandos renderizados, conferidos um a um contra o README do repositório.
  - **AC3 verificado**: os três fatos declarados pelo autor presentes na parte aberta.
  - **AC5 verificado por varredura**: nenhuma promessa de viralização, previsão de views ou garantia de resultado no texto.
  - **AC6 verificado**: o passo do `voice.md` em destaque próprio.
  - **AC7 verificado**: único link externo é o repositório, com `rel="noopener noreferrer"`, atrás do gate.
  - **AC8 verificado**: data de publicação do repositório e data de checagem visíveis, incluindo a observação de que não houve atualização desde o lançamento.
  - Lint limpo, `npm run build` verde, rota `/youtubeskill` gerada.

## File List

- `src/app/youtubeskill/page.tsx`
- `docs/stories/060-youtubeskill-page.md`
- **2026-10-05** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
