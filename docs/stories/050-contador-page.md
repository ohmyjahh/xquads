# Story 050 — Página /contador (CodeNotch, medidor de cota dos assistentes de código)

**Status:** Done

## Descrição

Nova página isca standalone em `/contador` (produção: `www.sowsales.com.br/xquads/contador`),
no formato **link magnet**: o acesso ao repositório `https://github.com/vinzdg/codenotch` fica
atrás do lead.

O CodeNotch fixa uma tarja preta na borda da tela mostrando **quanto da cota de uso** de cada
assistente de código já foi consumida, e se ele ainda está trabalhando, terminou ou está esperando
resposta. Cobre Claude Code, Cursor, Codex e Antigravity.

O problema que resolve é concreto e conhecido de quem usa esses assistentes o dia inteiro:
descobrir que a cota acabou só quando ela acaba, no meio de uma tarefa.

`source = "contador-page"`.

## Repositório verificado (checagem em 17/09/2026)

| Item | Valor |
|---|---|
| Repositório | `vinzdg/codenotch` |
| Descrição | App de macOS que fixa os limites de uso de Claude Code, Cursor, Codex e Antigravity na borda da tela |
| Estrelas | 1.840 |
| Forks | 281 |
| Licença | MIT |
| Linguagem | Swift, com porte Windows em Rust/Tauri |
| Criado | 05/09/2026 |
| Último push | 17/09/2026, no mesmo dia da checagem |
| Arquivado | Não |
| URL | HTTP 200 |

**1.840 estrelas em 12 dias de existência.** Tração forte para um projeto tão novo.

## Fatos apurados no README oficial

- Instalação por download: `.dmg` no Mac, assinado e notarizado, com atualização automática.
- **Existe porte para Windows** (Rust/Tauri 2, mesmos provedores). O instalador **não é assinado**, então o SmartScreen bloqueia na primeira execução e exige "Mais informações" e "Executar assim mesmo".
- Builds de preview não são notarizados e o macOS os coloca em quarentena, exigindo comando manual para liberar.
- **App de celular** (iOS e Android) espelha as mesmas porcentagens, pareado por QR code, funcionando só na mesma rede Wi-Fi. O projeto afirma que o celular lê apenas o que a tarja já mostra, nunca tokens nem credenciais.
- **Como ele lê a cota:** cache de uso do Claude Desktop, o `/usage` do próprio Claude Code, e o token OAuth no keychain de login. No Cursor, a sessão local em SQLite ou o login no keychain.

## Critérios de Aceite

- **AC1** — Rota `/contador` (`src/app/contador/page.tsx`) standalone.
- **AC2** — Accent `#C084FC`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Parte aberta: o problema que o app resolve, o que a tarja mostra e quais assistentes cobre.
- **AC4** — **Parte aberta declara que é aplicativo de desktop**, com Mac como caminho principal e Windows como porte cujo instalador não é assinado. O público do Xquads não é só de Mac.
- **AC5** — **Parte aberta declara como ele lê a cota**: sessão local e keychain dos assistentes já instalados. Um app que acessa keychain merece ser apresentado com clareza, não descoberto depois.
- **AC6** — Conteúdo gated: repositório, caminhos de instalação por sistema e o app de celular.
- **AC7** — Link externo apenas para o repositório, com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC8** — **Nenhuma versão mínima de macOS citada.** O README se contradiz: o selo diz uma versão e o texto em prosa diz outra. Sem fonte única confiável, o número fica de fora.
- **AC9** — Números do repositório datados; projeto com 12 dias muda rápido.
- **AC10** — Lead `source="contador-page"`, bypass só em localhost, `SalesCta` com `utmContent="contador"`.
- **AC11** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, botão para o repositório, o que o app faz e como ele obtém os dados.
**OUT:** tutorial de build a partir do código-fonte; citar versão mínima de sistema enquanto a
fonte se contradiz; prometer que funciona com qualquer assistente além dos quatro cobertos.

## Riscos

- **R1 (médio)** — Usuário de Windows converte e encontra instalador não assinado com alerta do SmartScreen. *Mitigação:* AC4 avisa antes do lead.
- **R2 (médio)** — Projeto com 12 dias de vida: recursos, provedores e instalação podem mudar. *Mitigação:* AC9.
- **R3 (baixo)** — Desconforto legítimo com um app que lê keychain. *Mitigação:* AC5 apresenta na parte aberta, deixando a pessoa decidir informada.

## Complexidade

**S (pequena).** Link magnet no padrão já consolidado.

## Valor de negócio

Isca de utilidade imediata para quem já usa assistente de código pago e vive esbarrando no limite.
Público altamente qualificado e adjacente ao das páginas `/timedeagentes`, `/editordevideos` e
`/jarvis`.

## Definition of Done

- `/contador` em dev, repositório liberado só após lead ou em localhost.
- Restrição de plataforma e origem dos dados na parte aberta.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-17** — Draft criado por @mestre — Story 050. Repositório e README verificados.
- **2026-09-17** — Validada por @produto: **GO 10/10**. Repositório conferido por API antes de virar botão; os dois fatos capazes de frustrar quem converte (ser app de desktop com porte Windows não assinado, e ler keychain para apurar a cota) foram levados para a parte aberta; a divergência de versão mínima dentro do próprio README foi detectada e resolvida por omissão em vez de escolha arbitrária. Draft → **Ready**.
- **2026-09-17** — Implementada por @desenvolvedor: `src/app/contador/page.tsx`, accent `#C084FC`, LeadGate `source="contador-page"`.
- **2026-09-17** — QA por @qualidade: **PASS.**
  - **AC4 verificado**: o aviso "é programa de computador, não site" renderiza na parte aberta, com o alerta do SmartScreen para o porte Windows.
  - **AC5 verificado**: o aviso de que o app lê a sessão local e o keychain está na parte aberta, com a contrapartida honesta de que o código é aberto sob MIT.
  - **AC7 verificado**: único link externo é `https://github.com/vinzdg/codenotch`, atrás do gate, com `rel="noopener noreferrer"`.
  - **AC8 verificado por regex**: nenhuma versão de macOS citada na página. O README traz um selo com uma versão e prosa com outra; sem fonte única, o número ficou de fora.
  - Os quatro assistentes cobertos aparecem nomeados; estrelas e data de checagem visíveis.
  - Lint limpo, `npm run build` verde, rota `/contador` gerada.

## File List

- `src/app/contador/page.tsx`
- `docs/stories/050-contador-page.md`
- **2026-09-17** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
