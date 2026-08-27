# Story 041 — Página /strix (acesso ao repositório do Strix, link magnet gated por lead)

**Status:** Done

## Descrição

Nova página isca standalone em `/strix` (produção: `www.sowsales.com.br/xquads/strix`),
no formato **link magnet** (mesmo padrão da `/livroskill` e da `/marcadagua`): o conteúdo
de contexto fica aberto, e o gate libera o link do repositório mais os comandos.

Alvo: `github.com/usestrix/strix`. Ferramenta open source de pentest com agentes de IA,
que roda a aplicação, encontra vulnerabilidades e valida cada achado com prova de conceito
real, em vez de devolver alerta de scanner estático.

Diferença em relação à `/appseguro` (já publicada): a `/appseguro` entrega um prompt de
auditoria defensiva que a pessoa cola numa IA e lê o resultado. Esta página entrega uma
ferramenta que executa de verdade, com Docker e chave de LLM. Uma é leitura de código, a
outra é teste dinâmico. As duas devem se referenciar.

`source = "strix-page"`.

## Enquadramento (obrigatório)

O README do projeto traz aviso de **uso autorizado apenas**: rodar somente contra sistemas
próprios ou com permissão escrita explícita, dentro do escopo acordado, porque teste não
autorizado é ilegal na maioria das jurisdições. A página **reproduz esse aviso em posição
visível**, não em rodapé escondido, e posiciona a ferramenta no uso que o próprio projeto
declara: achar e corrigir falhas do seu próprio app antes de publicar.

A página **não** ensina a atacar alvo de terceiros, não sugere contornar proteção e não usa
enquadramento de invasão.

## Fatos confirmados (GitHub API + README, 27/08/2026)

- Repositório `usestrix/strix`, licença Apache-2.0, linguagem Python.
- 58.694 estrelas e 6.404 forks na consulta de 27/08/2026.
- Criado em 05/08/2025; último push em 27/08/2026.
- Site oficial `strix.ai`; documentação em `docs.strix.ai`; plataforma em `app.strix.ai`.
- Pacote PyPI `strix-agent`.
- Pré-requisitos: Docker rodando e uma chave de API de LLM (OpenAI, Anthropic, Google e outros).
- Instalação oficial: `curl -sSL https://strix.ai/install | bash`.
- Primeiro scan: `strix --target ./app-directory`. Resultados em `strix_runs/<run-name>`.
- Aceita também repositório (`https://github.com/org/repo`), app publicado (`https://your-app.com`) e contrato de API (OpenAPI, Swagger, Postman).
- `strix view` abre painel local em `127.0.0.1`, com link tokenizado; os dados não saem da máquina.
- Instalação como skills de agente: `npx skills add usestrix/strix` (nove skills).
- Cobre OWASP Top 10 e além: IDOR, escalada de privilégio, SQL e NoSQL injection, command injection, SSTI, SSRF, XXE, desserialização insegura, RCE, XSS, prototype pollution, CSRF, falhas de lógica de negócio, ataques a JWT e sessão, problemas de nuvem e de API.

## Critérios de Aceite

- **AC1** — Rota `/strix` (`src/app/strix/page.tsx`) renderiza standalone, sem sidebar nem header.
- **AC2** — Accent `#F97316`, layout no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo aberto: o que a ferramenta faz, no que difere de scanner comum, e o que é preciso ter antes de rodar (Docker e chave de LLM).
- **AC4** — Aviso de uso autorizado visível na parte aberta da página, antes do gate, com o teor do aviso oficial do projeto.
- **AC5** — Conteúdo gated: link do repositório, comandos de instalação e de primeiro scan, e as formas de apontar alvo.
- **AC6** — Todo comando copiável, com fallback de cópia e aviso quando o navegador bloquear (mesma correção aplicada na Story 040).
- **AC7** — Números de estrelas e forks datados na página ("em agosto de 2026"), para não envelhecerem como fato absoluto.
- **AC8** — Lead com `source="strix-page"`; desbloqueio via `hasCapturedLead()`; bypass só em localhost.
- **AC9** — `SalesCta` com `utmContent="strix"` e referência cruzada para `/appseguro`.
- **AC10** — `npm run build` verde, lint limpo no arquivo novo.

## Escopo

**IN:** página nova, conteúdo de contexto, aviso de uso autorizado, link e comandos oficiais.
**OUT:** alterar `LeadGate`, `SalesCta`, hooks ou API; alterar `/appseguro`; hospedar cópia
do código do Strix; ensinar uso contra alvo de terceiros; push ou deploy sem autorização.

## Riscos

- **R1 (alto, mitigado)** — Ferramenta de segurança ofensiva pode ser lida como convite a atacar terceiros.
  *Mitigação:* AC4, enquadramento em alvo próprio e ausência de qualquer instrução de evasão.
- **R2 (médio)** — Comando oficial de instalação é `curl | bash`, que executa script remoto.
  *Mitigação:* apresentar junto o pré-requisito e a alternativa por PyPI, e atribuir o comando à fonte oficial.
- **R3 (baixo)** — Contagem de estrelas envelhece rápido. *Mitigação:* AC7, número datado.
- **R4 (baixo)** — O deploy automático do Vercel está fora do ar desde 24/08 (ver Story 040).
  *Mitigação:* publicar pelo mesmo contorno de árvore limpa, se ainda não tiver sido religado.

## Complexidade

**S (pequena).** Página no padrão link magnet já consolidado.

## Valor de negócio

Tema quente e repositório com tração alta, o que facilita o gancho de conteúdo. Público
cruza com o das iscas de vibe coding: quem gera app com IA precisa testar o que publicou.
Conecta com a `/appseguro`, que já converte no mesmo assunto.

## Dependências

- `LeadGate`, `SalesCta`, `hasCapturedLead` — todos existentes
- Roteamento standalone por exclusão do dashboard — resolvido na Story 039

## Definition of Done

- `/strix` renderiza em dev, link e comandos liberados só após lead ou em localhost.
- Aviso de uso autorizado visível antes do gate.
- Lint limpo, `npm run build` verde.
- Mostrado ao usuário antes de qualquer push.

## Change Log

- **2026-08-27** — Draft criado por @mestre — Story 041
- **2026-08-27** — Validada por @produto: **GO 10/10**. Título claro; descrição delimita a fronteira com a `/appseguro` (prompt de leitura vs ferramenta de execução), o que evita canibalização; 10 ACs testáveis; fatos todos rastreados à API do GitHub e ao README, sem invenção; enquadramento de segurança tratado como seção própria e como AC bloqueante, não como nota de rodapé; escopo IN/OUT explícito quanto ao que a página não vai ensinar; 4 riscos com mitigação, incluindo o deploy quebrado herdado da Story 040; dependências já existentes, nada novo a construir. Draft → **Ready**.
- **2026-08-27** — Implementada por @desenvolvedor: `src/app/strix/page.tsx`, accent `#F97316`, LeadGate `source="strix-page"`, 6 blocos de comando copiáveis com o fallback da Story 040, cross-link para `/appseguro`.
- **2026-08-27** — QA por @qualidade: **PASS.**
  - **Fatos conferidos contra a fonte** — estrelas (58.694) e licença (Apache-2.0) via API do GitHub na data; todos os 7 comandos e identificadores citados (`curl -sSL https://strix.ai/install | bash`, `strix --target ./app-directory`, `strix view`, `npx skills add usestrix/strix`, `strix-agent`, `STRIX_LLM`, `strix_runs`) conferidos com `grep -F` no README oficial. Nenhum comando inventado.
  - **AC4 verificado no DOM** — o aviso de uso autorizado aparece na posição 356 do texto, contra 1927 do link do repositório. Vem antes do gate, como exigido.
  - **AC6 verificado** — clique no botão de copiar com clipboard bloqueado aciona o fallback e exibe o aviso; blocos com `select-all`.
  - **AC7 verificado** — número de estrelas datado como "em agosto de 2026".
  - **Riscos R1 e R2 tratados no conteúdo** — enquadramento em alvo próprio no título, no texto e no bloco de aviso; o `curl | bash` aparece atribuído à fonte oficial, com ressalva sobre executar script remoto e com a alternativa PyPI ao lado.
  - Lint limpo no arquivo novo, `npm run build` verde, rota `/strix` gerada.

## File List

- `src/app/strix/page.tsx`
- `docs/stories/041-strix-page.md`
- **2026-08-27** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
