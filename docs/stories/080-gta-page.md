# Story 080 - Página /gta: kit de edição de vídeo com IA no computador

**Status:** InReview (QA PASS do Gabriel e "pode subir" do Rafa em 05/11; aguardando validação em produção)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-05
**Implementa:** Diego (dev de funil). **QA:** Alfa ou Gabriel (quem implementa não aprova).

---

## Descrição

Pedido do Rafa (05/11/2026, via Alfa): isca nova em `sowsales.com.br/xquads/gta`. O visitante preenche o `LeadGate` padrão e só depois o prompt é liberado, com botão de copiar. Tema: kit de edição de vídeo com IA no computador (prompt para colar no Claude Code, Codex ou ChatGPT).

O texto do prompt veio do Rafa e é usado **integral**. Ele corrigiu só o erro de ditado do item 6 ("Estude cortes virais e me entregue em um estilo de edição parecido"). Nenhuma outra palavra foi alterada.

### Verificação de sobreposição

`src/app/gta` não existia. Páginas próximas: `/editordevideos`, `/editordevideosia` (prompt mestre de edição), `/videosanimados`, `/promptsdevideo`. Nenhuma instala um kit de ferramentas nem entrega cortes verticais; sem duplicação.

### Decisões de copy (minhas, para o Rafa aprovar na prévia)

- Título, subtítulo e botão no padrão das outras iscas. Cor `ACCENT` `#22D3EE`.
- Antes do gate: lista "o que o prompt instala e faz" e o aviso "instala programas no seu computador, funciona em macOS, Windows e Linux e avisa antes de pedir a senha de administrador". Tudo extraído do próprio prompt, nada de fonte externa.
- Depois do gate: 3 passos curtos (abrir a ferramenta, colar o prompt, passar o vídeo) + prompt com botão de copiar.
- Sem oferta nova: o fim da página é o `SalesCta` padrão (`utm_content=gta`).

### Pontos para o Rafa saber (não alterei o prompt)

1. O item 2 manda usar `--cookies-from-browser chrome` quando o Instagram pedir login: o `yt-dlp` lê os cookies do navegador da pessoa. Baixar vídeo do Instagram pode ir contra os termos da plataforma.
2. Os programas em Swift (item 4) só valem no macOS; o próprio prompt cobre Windows/Linux com MediaPipe e EasyOCR.
3. Não verifiquei versões nem a existência de cada ferramenta na fonte oficial: o conteúdo é do Rafa, usado como veio.

---

## Acceptance Criteria

- AC1 rota `/gta` renderiza sem erro de build e sem erro no console
- AC2 linguagem de quem não é desenvolvedor
- AC3 avisos eliminatórios (instala programas, senha de administrador, sistemas) antes do gate
- AC4 prompt atrás do `LeadGate` com `source="gta-page"`
- AC5 formulário com os 5 campos do padrão (nome, e-mail, telefone, área de atuação, faturamento mensal)
- AC6 prompt liberado idêntico ao texto do Rafa
- AC7 em `localhost` aparece destravado, com a tarja "PRÉVIA LOCAL"
- AC8 `SalesCta` com `utmContent="gta"` e assinatura `@rafa.grandi`
- AC9 sem travessão em nenhum texto da página
- AC10 botão de copiar com `try/catch` e aviso visível de falha

## Escopo

**IN:** `src/app/gta/page.tsx`, esta story.
**OUT:** `LeadGate`, `SalesCta`, `/api/leads`, layout, pixel, `next.config`, outras páginas.

## Riscos

- Prompt longo que instala software: risco é do uso, não da página; aviso está antes do gate.
- Teste de lead ponta a ponta só em produção (as variáveis do webhook não existem em local).

## Definition of Done

AC1 a AC10, QA independente PASS, "pode subir" do Rafa, validado em produção.

## Change Log

- 2026-11-05: story criada e página implementada local (Diego).
- 2026-11-05: QA PASS independente (Gabriel) e "pode subir" do Rafa; publicada (Diego).

## File List

- `src/app/gta/page.tsx` (novo)
- `docs/stories/080-gta-page.md` (novo)
