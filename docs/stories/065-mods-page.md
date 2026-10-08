# Story 065 — Página /mods (o que são os Mods do Claude Code)

**Status:** Done

## Descrição

Nova página isca standalone em `/mods` (produção: `www.sowsales.com.br/xquads/mods`), explicando os
**Mods** do Claude Code e encaminhando para a documentação oficial.

`source = "mods-page"`.

## Verificação contra o vídeo do dono

O dono citou três capacidades no vídeo dele. Todas **confirmadas na documentação oficial**:

| O que o dono falou | O que a documentação diz |
|---|---|
| "chats conversam entre si" | Um mod pode "send a message to another of your sessions" |
| "mudança do layout do app" | Um mod desenha painéis e faixas, e **redesenha a própria interface** do Claude Code: a linha de uma chamada de ferramenta, o spinner, as caixas de diálogo |
| "mudança de modelos de forma automática" | Um mod pode "send one request to a different model" |

Fonte: `code.claude.com/docs/en/plugins/mods/overview`.

## O que é, em uma frase

Um mod é um plugin feito de funções em JavaScript ou TypeScript que rodam **dentro** do Claude Code.
Quando acontece um evento — uma chamada de ferramenta, um prompt enviado, um pedaço da tela sendo
desenhado — o Claude Code chama a função, que pode observar, alterar ou assumir o evento.

## Fatos verificados (08/10/2026)

- Funcionam no **terminal** e na **aba Code do aplicativo de desktop**. No VS Code e em sessão na nuvem os hooks rodam, mas nada é desenhado.
- Versão mínima: terminal **2.1.287**, desktop **2.1.286**.
- **Ligados por padrão.**
- Instalação como plugin: `/plugin install nome@marketplace`.
- Dá para pedir ao próprio Claude que escreva um mod.
- Alguns recursos nativos do Claude Code já são mods, como o `/diff`.
- A Anthropic publica mods de exemplo: `token-weather` (previsão do uso da janela de contexto), `blast-radius` (segura comando perigoso como `rm -rf` e mostra o que mudaria) e `replay-theater` (passo a passo das edições do último turno).

## O ponto que domina esta página: segurança

A documentação oficial é explícita, e a página **tem de carregar isso com o mesmo peso**:

> Um mod é código que roda com as suas permissões, dentro do Claude Code.

O que um mod instalado consegue: ler e escrever arquivos onde seu usuário alcança, iniciar programas,
fazer requisições de rede, **ler variáveis de ambiente e arquivos de configuração, incluindo chave de
API**, ver todo prompt e toda chamada de ferramenta, reescrever prompt ou chamada, **aprovar uma
chamada sem perguntar**, e gastar o seu uso chamando modelo na sua conta.

**Mods não são isolados em sandbox.** A documentação recomenda instalar apenas de autor e marketplace
confiáveis, e ensina a inspecionar antes: `claude plugin validate ./nome-do-mod` lista os eventos que
ele trata e o que ele pede para fazer.

## Critérios de Aceite

- **AC1** — Rota `/mods` (`src/app/mods/page.tsx`) standalone.
- **AC2** — Accent `#FF9A62`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o que é um mod e as três capacidades que o dono citou no vídeo.
- **AC4** — **O aviso de segurança fica na parte ABERTA**, não atrás do lead. Instalar mod de origem duvidosa é risco real, e a informação não pode custar um cadastro.
- **AC5** — A página ensina o comando de inspeção antes de instalar.
- **AC6** — Parte gated: link para a documentação oficial, mods de exemplo da Anthropic, versões mínimas e como instalar.
- **AC7** — Link externo com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC8** — Data da checagem visível.
- **AC9** — Lead `source="mods-page"`, bypass só em localhost, `SalesCta` com `utmContent="mods"`.
- **AC10** — `npm run build` verde e lint limpo.

## Riscos

- **R1 (alto)** — Leitor instalar mod de origem desconhecida e expor chave de API e arquivos. *Mitigação:* AC4 e AC5, com o aviso aberto.
- **R2 (baixo)** — Recurso novo, documentação em movimento. *Mitigação:* AC8.

## Complexidade

**S (pequena).**

## Change Log

- **2026-10-08** — Draft criado por @mestre — Story 065
- **2026-10-08** — Validada por @produto: **GO 10/10**. As três capacidades citadas pelo dono foram conferidas uma a uma na documentação oficial antes de virarem conteúdo, e o aviso de segurança, que a própria Anthropic destaca, foi colocado na parte aberta em vez de servir como recompensa de lead. Draft → **Ready**.
- **2026-10-08** — Implementada e verificada: **PASS.** As três capacidades citadas pelo dono presentes; **aviso de segurança posicionado antes do LeadGate**, confirmado por índice no texto renderizado; comando `claude plugin validate` presente; menção explícita a chave de API e à ausência de sandbox. Lint limpo, build verde.

## File List
- `src/app/mods/page.tsx`
- `docs/stories/065-mods-page.md`
- **2026-10-08** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
