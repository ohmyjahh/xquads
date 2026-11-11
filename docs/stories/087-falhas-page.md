# Story 087 - Página /falhas: 7 falhas de segurança para checar antes de publicar um app, com teste e correção

**Status:** InReview (QA PASS em 11/11 na versão publicada; falta conferência de produção da QA; teste de cadastro dispensado pelo Rafa)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-10
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

## Descrição

Pedido do Alfa (10/11/2026) para o time do Instagram: isca do vídeo "FALHAS" (`projetos/instagram/roteiros/2026-11-10-falhas-app-ia.md`, seção 5). Palavra do vídeo: FALHAS. Slug `falhas` (o briefing sugeria `falhas-app-ia`; o Alfa pediu `falhas`). Livre em `src/app`. Número 087.

Depois do formulário a pessoa recebe: alertas, 7 falhas (o que é, como testar, como corrigir, fonte), o checklist de 10 itens (com botão de copiar) e as notícias recentes com link.

### Verificação da fonte (conferida em 10/11/2026)

| Item | Valor conferido | Fonte |
|---|---|---|
| Chave no navegador | só variáveis com prefixo `NEXT_PUBLIC_` vão para o navegador, embutidas no JavaScript no build; as outras ficam só no servidor | nextjs.org/docs/app/guides/environment-variables |
| Banco aberto | Supabase: ligar RLS em toda tabela de schema exposto; sem RLS a tabela fica legível e gravável por qualquer role com grant; `service_role` ignora RLS e deve ficar só no servidor | supabase.com/docs/guides/database/postgres/row-level-security |
| Acesso a dado alheio | OWASP Top 10:2025 A01 Broken Access Control: trocar parâmetro de URL para outra conta, forçar URL de admin, controle só no front; prevenção: negar por padrão, checar dono do registro no servidor | top10.owasp.org/2025 (A01) |
| Upload | limite de tamanho, validar tipo real (Content-Type pode ser forjado), nome gerado pela aplicação, guardar fora da raiz web, só usuário autorizado | OWASP File Upload Cheat Sheet |
| Consulta | defesa primária: queries parametrizadas; concatenar valor não confiável anula a proteção | OWASP SQL Injection Prevention Cheat Sheet |
| Webhook | verificar o header `Stripe-Signature` com o segredo `whsec_`; exige o corpo bruto | docs.stripe.com/webhooks |
| Dependência | OWASP A03:2025 Software Supply Chain Failures (alteração maliciosa em dependências e ferramentas); `npm audit` pede relatório de vulnerabilidades conhecidas | top10.owasp.org/2025 (A03) e docs.npmjs.com |
| Binance | BBC: roubo recorde de US$ 6,3 bi; hackers usaram entrevistas de emprego falsas e uma ferramenta de IA interna comprometida; downloads de software malicioso nos computadores de engenheiros | bbc.com/news/articles/ck5ynwz9gy67o (lido) |
| Banco de sangue (França) | BBC e CNN Brasil: câmaras frias de bolsas de sangue afetadas; EFS: sem perda de produtos sanguíneos; CNN: limites de temperatura "elevados a níveis muito altos" | bbc.co.uk/news/articles/c8vgxyvz6y9ro e cnnbrasil.com.br (lidos) |
| FGC | Folha/C-Level (5/11): acesso a nome, CPF, e-mail e data de nascimento; sem informação do número de afetados; nenhuma perda financeira registrada | c-level.folha.uol.com.br (lido) |

**Fora da página de propósito (sem fonte):**
- "De −30 °C para 110 °C": as fontes lidas não trazem esses números (CNN fala em 50 ºC em outro ataque). Não usei temperatura.
- Atribuição do roubo da Binance (FBI, Coreia do Norte) e "ferramenta de desenvolvimento adulterada": vêm da Reuters, que bloqueou a leitura. Não usei.
- "Segundo a Binance, o roubo durou quase 4 horas", "maior roubo de cripto da história" como fato próprio: só a BBC "record" foi usada.
- Qualquer número de afetados do FGC.
- "Quase todo app feito com IA tem": sem fonte; o título virou "7 falhas para checar".

### Escolhas de copy

- **Regra do Rafa (CONTEXTO, 10/11):** nenhum alerta antes do formulário. Antes do gate: título, subtítulo, os nomes das 7 falhas e o formulário. Os alertas abrem o conteúdo liberado.
- As notícias entram só depois do formulário, com a frase de que não são sobre apps feitos com IA, só mostram o tamanho do risco.
- Os testes e correções são orientação geral baseada nas fontes; a página diz que não substitui auditoria profissional e que o teste é só no que é seu.
- Cor `#F87171`.

### Verificação de sobreposição
Já existe `/appseguro` (prompt master que audita a segurança do app vibe codado, 11 categorias de risco, no ar). A `/falhas` é outra entrega (lista de 7 falhas com teste e correção e checklist de 10 itens, não um prompt de auditoria), mas o tema é parente. Não alterei `/appseguro`. Decisão de manter as duas é do Rafa.

### Acceptance Criteria

- [ ] AC1 rota `/falhas` sem erro de build nem de console
- [ ] AC2 linguagem de quem não é desenvolvedor
- [ ] AC3 antes do gate: só selo, título, subtítulo, nomes das 7 falhas e o formulário; nenhum alerta, aviso, bloco amarelo, notícia ou teste
- [ ] AC4 conteúdo atrás do `LeadGate` com `source="falhas-page"` e 5 campos
- [ ] AC5 depois do gate, o primeiro bloco é o alerta
- [ ] AC6 7 falhas, cada uma com o que é, como testar, como corrigir e link da fonte
- [ ] AC7 checklist de 10 itens com botão de copiar (try/catch com aviso de falha)
- [ ] AC8 cada fato bate com a tabela da fonte; nenhum número sem fonte (temperatura, número de afetados, atribuição)
- [ ] AC9 links externos respondem 200 (exceto qualquer bloqueio de robô, registrado)
- [ ] AC10 em `localhost` aparece destravada, com "PRÉVIA LOCAL"
- [ ] AC11 `SalesCta` com `utmContent="falhas"` e assinatura `@rafa.grandi`
- [ ] AC12 sem travessão

## Escopo
IN: `src/app/falhas/page.tsx`. OUT: componentes compartilhados, `/api/leads`, config, layout, outras páginas (inclui `/appseguro`).

## Riscos
- Tema parente de `/appseguro`.
- Orientação de segurança geral; não substitui auditoria.
- Testes e correções não rodados em app real.

## DoD
AC1 a AC12, QA PASS, OK do Rafa via Alfa, ordem página, ManyChat, post.

## File List
- `src/app/falhas/page.tsx`
- `docs/stories/087-falhas-page.md`

## Change Log
- 2026-11-10: story criada e página implementada (Diego). Não publicada.
- 2026-11-11: QA – Funis de isca deu PASS (laudo `qa-falhas-2026-11-11.md`). Publicada com o OK do Rafa (via Alfa) para o post das 15h. Teste de cadastro dispensado pelo Rafa.
