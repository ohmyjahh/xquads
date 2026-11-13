# Story 094 - Página /reunioes: como usar o Claude nas reuniões (passo a passo)

**Status:** Done (PASS da QA na prévia e em produção em 13/11, sha `1d04580e…`, commit `8c66a80` publicado)
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-13
**Implementa:** Diego (dev de funil). **QA:** QA – Funis de isca (quem implementa não aprova).

## Descrição

Pedido do Alfa (13/11/2026), com as palavras do Rafa: "Preciso que crie uma página isca para mandar para esse artigo. Deve ter um passo a passo de como usar e o link do artigo: https://claude.com/resources/articles/claude-meetings".

Slug `reunioes`. Em prévia local em `http://localhost:3001/xquads/reunioes`. `source="reunioes-page"`, `utm_content=reunioes`. Publicação autorizada por este pedido (o Rafa quer mandar o link), depois do PASS da QA. Sem teste de envio de lead.

### Fontes e o que veio de cada uma

| Fonte | Lida em | O que a página usa dela |
|---|---|---|
| Anthropic, "Introducing Claude Meetings" (https://claude.com/resources/articles/claude-meetings), artigo datado de **12/11/2026** | 13/11/2026, 08h53 | Todos os fatos do produto: o que o Claude faz na chamada (participante visível, acompanha a conversa, adianta trabalho), perguntas em voz alta ou no chat, resposta por escrito por padrão, uso de ferramentas conectadas com permissão, documentos e whiteboards ao vivo, notas e action items, beta nos planos Team e Enterprise, outras plataformas em breve, Google Meet, bloqueio por ZDR/HIPAA/CMEK, o que é salvo (transcrição, resumo, descrições de tela, não áudio), aviso no chat, comportamento com convidados de fora, quem vê e edita a página da reunião, custo e gratuidade dos artefatos até 10/02/2027, e a recomendação de avisar o time sobre a transcrição. O artigo diz que os passos de configuração estão no Help Center e aponta o link. |
| Help Center da Anthropic, "Use Claude Meetings" (https://support.claude.com/en/articles/18325154-use-claude-meetings, redireciona para `/use-claude-meetings`), **atualizado em 13/11/2026** | 13/11/2026, 08h53 | Apenas os nomes de menu e de botão do passo a passo: Meetings no Claude, conexão do Google Calendar, "Add Claude", `Settings > Capabilities > Meetings > Auto-join` (todas as reuniões ou todas menos as de um a um), o Claude entrar sem pedir e o host poder recusar, "Claude, faça um doc" / "Claude, faça um whiteboard", slides, o tile ao vivo, pausar e retomar pela página, "Remove Claude", limite de 8 horas com aviso, link da página da reunião postado no chat, recap por e-mail para quem está no convite e agenda de reuniões passadas e futuras. |
| Fireflies.ai, site e página de planos (https://fireflies.ai/ e https://fireflies.ai/pricing) | 13/11/2026 | A segunda ferramenta da página: o que ela faz (grava, transcreve e resume, com notas, decisões e action items), o plano grátis de US$ 0 sem prazo, transcrição ilimitada com o auto-join ligado, 400 minutos de armazenamento, créditos de IA limitados no grátis, mais de 100 idiomas, apps de desktop e celular e extensão do Chrome, e o suporte a Google Meet, Zoom e Microsoft Teams. |
| Central de ajuda do Fireflies.ai, "Learn about web and video conferencing platforms supported by Fireflies" (https://guide.fireflies.ai/articles/5365127863-web-video-conference-platforms-supported), atualizado há 6 meses | 13/11/2026 | Que as integrações de videoconferência já vêm ligadas quando a conta é criada e que o Fireflies entra, grava e transcreve Google Meet, Zoom e Microsoft Teams. |
| Central de ajuda do Fireflies.ai, "How to create a Fireflies account", "Pre-Meeting Setup" e "What's included in the Fireflies Free plan" | 13/11/2026 | O cadastro com conta Google ou Microsoft (Outlook), a mesma do calendário, sem instalar nada; transcrição em mais de 100 idiomas e o plano grátis com 400 minutos de armazenamento. O "Pre-Meeting Setup" diz que, por padrão, o Fred entra em todas as reuniões com link, mas a página não usa esse padrão: usa o menu real do auto-join e a regra da transcrição ilimitada. |
| Central de ajuda do Fireflies.ai, "Unlock Unlimited Transcriptions on the Fireflies Free Plan" (https://guide.fireflies.ai/articles/8632872350-unlock-unlimited-transcriptions-on-the-fireflies-free-plan, atualizado há 2 meses) | 13/11/2026 | O caminho real do menu (`Settings`, janela `Meeting Settings`, botão `Auto-join calendar meetings` e a lista de opções), a regra de que a transcrição ilimitada só vale com o auto-join ligado e fora da opção de convite, o piso de 3 transcrições sem auto-join e a data de 01/09/2026 para contas novas. |

**Decisão registrada:** o pedido diz que todo passo tem de vir do artigo. O artigo do claude.com não detalha a interface e manda, ele mesmo, buscar a configuração no Help Center. Por isso o passo a passo usa os nomes de menu do Help Center, citado na página como fonte e com data. Onde os dois divergem em redação, vale o artigo: "beta nos planos Team e Enterprise" e "um administrador pode desligar" no Team. Nada de preço por assento, data de saída do beta ou número de usuários: nenhuma das duas fontes traz isso, então a página não afirma.

**Ajuste de 13/11 (palavras do Rafa):** "pode retirar o 'leia antes de usar'; além disso coloque uma segunda opção de ferramenta de IA para transcrição etc. Para a pessoa também conhecer". O bloco amarelo saiu inteiro. O que era impeditivo ficou numa frase no 1º passo: beta nos planos Team e Enterprise, só no Google Meet. A segunda ferramenta é o Fireflies.ai, escolhido entre Fireflies, tl;dv e Otter por ter plano grátis sem prazo e funcionar em Google Meet, Zoom e Microsoft Teams, tudo lido nas fontes oficiais dele em 13/11/2026.

## Verificação da fonte

| Fato | Como está na página | Fonte |
|---|---|---|
| O que é | O Claude entra na chamada como participante visível, acompanha a conversa e adianta trabalho durante a reunião | Artigo |
| Beta e planos | Está em beta, sendo liberado nos planos Team e Enterprise, no Claude e no Claude Desktop | Artigo e Help Center |
| Plataforma | Só Google Meet; outras plataformas em breve | Artigo e Help Center |
| Organizações sem acesso | ZDR, configuração pronta para HIPAA, CMEK | Artigo e Help Center |
| Quem liga | Team vem ligado e um administrador (owner) desliga; Enterprise vem desligado e um administrador liga para toda a organização ou parte | Artigo e Help Center |
| Perguntas | Em voz alta dizendo "Claude" ou no chat do Meet; resposta por escrito por padrão; o que posta no chat do Meet é visível para todos | Artigo e Help Center |
| Ferramentas conectadas | Usa as de cada pessoa com a permissão dela, pergunta na primeira vez e o sim vale para as próximas; em voz alta confirma quem fala a cada pedido; pedido de aprovação no chat do Meet e, se precisar confirmar a conta, na página da reunião | Artigo e Help Center |
| Artefatos | Documentos, whiteboards e outros artefatos (o Help Center inclui slides), anexados à página da reunião | Artigo e Help Center |
| Pausar, sair, duração | Tile mostra o estado; pausar pedindo para parar de ouvir ou pela página; sair pedindo ou por "Remove Claude"; até 8 horas com aviso antes | Help Center |
| Depois | Página da reunião com notas, resumo, action items, transcrição e artefatos; quem está no convite vê, edita e recebe e-mail com o link; agenda lista reuniões passadas e futuras; chat comum responde sobre reuniões passadas | Artigo e Help Center |
| Convidados de fora | No Team o Claude pode entrar em chamadas com convidado de fora por padrão e um administrador (owner) desliga; no Enterprise um administrador libera primeiro. Sem liberação, fica fora e sai se alguém de fora entrar no meio (inclusive robô de notas de outra empresa); com liberação, avisa no chat, não responde ali, o que os convidados falam entra nas notas e os convidados não recebem a página nem o e-mail de recap. Cada pessoa tem a própria opção em Settings > Capabilities > Meetings | Artigo (padrão de fora) e Help Center (padrão por plano, sem página nem recap para convidado) |
| Dados | Transcrição, resumo e descrições de tela, não áudio | Artigo e Help Center |
| Custo | Notas, transcrições e respostas sem ferramenta conectada incluídas nos planos Team e Enterprise; artefatos grátis até 10/02/2027; ferramenta conectada conta no uso e pode gerar cobrança | Artigo e Help Center |
| Diferença de redação | Artigo diz "admin", Help Center diz "owner"; a página usa "um administrador (owner)". Artigo não fala de slides nem de limite de 8 horas; a página atribui esses dois ao guia do Help Center | Registro desta story |

### O que a página NÃO afirma
- Preço por assento, data de saída do beta, limite de participantes, suporte a Zoom/Teams com data (para o Claude).
- Que o recurso está disponível em plano individual (Pro/Max): nenhuma das fontes diz isso, então não aparece.
- Integrações do Claude com Gong, Attention, Granola, Fireflies.ai, Otter e Plaud: o artigo diz que a Anthropic está trabalhando com eles e que "em breve" dá para enviar a transcrição. Ficou fora da página para não virar promessa com data. O Fireflies.ai aparece na página como ferramenta independente, com o site dele como fonte, e não como integração do Claude.
- Preço dos planos pagos do Fireflies.ai, fidelidade, prazo de teste, qualidade de resumo em português e qualquer promessa de resultado: o site não deixa claro ou não é fato verificável, então a página não afirma. O valor citado é só o do plano grátis (US$ 0, sem prazo), que está na página de planos.

### Acceptance Criteria
- [x] AC1 rota `/reunioes` sem erro de build nem de console
- [x] AC2 linguagem de quem não é especialista, com nome de menu em inglês entre aspas quando é do produto
- [x] AC3 antes do gate: só a linha de conferência, o selo, título, subtítulo, 6 cards de conteúdo e o formulário; nenhum alerta, requisito, custo, plano, plataforma nem bloco amarelo
- [x] AC4 `LeadGate` com `source="reunioes-page"` e os 5 campos; `utm_content=reunioes`
- [x] AC5 sem bloco de alerta (decisão do Rafa em 13/11); o 1º passo diz, numa frase, que o recurso é beta nos planos Team e Enterprise e só funciona no Google Meet
- [x] AC6 passo a passo numerado, de 12 passos, na ordem antes, conexão, durante e depois
- [x] AC7 botão "Ler o artigo oficial" aponta para https://claude.com/resources/articles/claude-meetings com target _blank e rel noopener noreferrer
- [x] AC8 todo fato tem fonte com data; dicas que não vêm das fontes estão marcadas como "Recomendação nossa"
- [x] AC9 nenhuma afirmação sobre preço por assento, data de saída do beta ou plataforma que as fontes não tragam
- [x] AC10 links externos respondem 200
- [x] AC11 localhost destravado com "PRÉVIA LOCAL"
- [x] AC12 `SalesCta` e assinatura `@rafa.grandi`
- [x] AC13 sem travessão em nenhum texto
- [x] AC14 depois do passo a passo, seção "Outra opção: Fireflies.ai" com o que ela faz, o plano grátis, 4 passos de como começar, botão para o site oficial com target _blank e rel noopener noreferrer, e as fontes com data; sem preço de plano pago, sem afiliado e sem promessa

## Escopo
IN: `src/app/reunioes/page.tsx`, `docs/stories/094-reunioes-page.md`.
OUT: componentes compartilhados, `/api/leads`, `next.config`, layout, outras páginas, automações.

## Segurança
Página estática de conteúdo: sem rota nova, sem segredo, sem chamada de API além do `LeadGate` já existente. Nenhum dado pessoal novo é coletado. Sem `dangerouslySetInnerHTML`. Links externos com `rel="noopener noreferrer"`.

## Riscos
- O Help Center muda nomes de menu com facilidade; a página fica desatualizada se a interface mudar. Carimbo de leitura no topo e nas fontes.
- O recurso está em beta: preço e disponibilidade podem mudar sem aviso.
- Divergência de redação entre artigo (admin) e Help Center (owner), tratada como "administrador (owner)".

## DoD
AC1 a AC13, PASS da QA, publicação por caminho, conferência de 200 no ar e aviso ao Alfa com a URL.

## File List
- `src/app/reunioes/page.tsx`
- `docs/stories/094-reunioes-page.md`

## Change Log
- 2026-11-13: story criada e página implementada. Artigo e Help Center lidos às 08h53. Passo a passo de 12 passos, 9 alertas, 7 dicas (2 marcadas como recomendação nossa). Em prévia local, não publicada.
- 2026-11-13: ajustes da QA (CONCERNS no sha `726c8bc3ce06`). R1: o 7º alerta e a 4ª dica diziam que o Claude fica fora de chamadas com convidado de fora por padrão, o que é o texto do artigo; o Help Center de 13/11 detalha por plano (Team: pode entrar por padrão, owner desliga; Enterprise: owner libera primeiro) e diz que convidado não recebe a página nem o recap. Alerta reescrito e dica ajustada, com a opção individual em Settings > Capabilities > Meetings. R2: passo 9 agora diz que o pedido de aprovação aparece no chat do Meet "quando possível". R3: `contentNote` do formulário não cita mais requisitos e custos antes do gate, virou "os passos numerados, o que preparar antes e as dicas de uso". Arquivo e story voltam para a QA com sha novo.
- 2026-11-13: **PASS da QA no sha `f73348687059`** e publicação. Commit `cb3bd9d` (só `src/app/reunioes/page.tsx` e esta story), push em `main`, deploy da Vercel. Conferido em `https://www.sowsales.com.br/xquads/reunioes`: 200, gate fechado com 3 inputs e 2 selects, sem termo de alerta e sem tarja de prévia no HTML público, CTA `utm_content=reunioes` apontando para `raxo.com.br/vibecodingvsl`, 390 px sem rolagem horizontal, console sem erro da página (as únicas falhas de rede são os scripts do pixel da Meta, do layout). Sem teste de envio de lead, por regra do Rafa.
- 2026-11-13: **ajuste do Rafa, via Alfa.** Saiu o bloco "Leia antes de usar" inteiro (alerta, lista e o amarelo). O 1º passo passou a dizer, numa frase, que o recurso é beta nos planos Team e Enterprise e só funciona no Google Meet, e o 2º passo ficou só com quem liga o recurso. Entrou a seção "Outra opção: Fireflies.ai" depois do bloco do Claude, com o que a ferramenta faz, o plano grátis (US$ 0, sem prazo, transcrição ilimitada com auto-join, 400 minutos de armazenamento, créditos de IA limitados), 4 passos de como começar, botão para o site oficial e as fontes do Fireflies.ai com data. O `contentNote` do formulário cita a segunda ferramenta. Arquivo com sha novo, volta para a QA; página publicada antes segue no ar até o PASS.
- 2026-11-13: **F1 da QA (CONCERNS no sha `1a5ca8aa…`).** O 2º passo do Fireflies citava um menu que não existe ("Settings > Meeting Settings > Auto-Join Preferences") e sugeria "só por convite" sem avisar que essa opção não dá transcrição ilimitada no grátis. Trocado pelo caminho real do artigo 8632872350: `Settings`, janela `Meeting Settings`, botão `Auto-join calendar meetings` e a lista (todas com link de vídeo, só as que você organiza, só com colegas, só quando convida fred@fireflies.ai), com a regra do grátis: ilimitado só com auto-join ligado e fora da opção de convite, senão 3 transcrições, para contas criadas a partir de 01/09/2026. O parágrafo do plano recebeu a mesma ressalva e o artigo entrou nas Fontes. O cadastro com Google ou Microsoft (Outlook) foi conferido no artigo "How to create a Fireflies account". Arquivo com sha novo de volta para a QA.
- 2026-11-13: **PASS da QA no sha `1d04580e…`** e publicação. Commit só com `src/app/reunioes/page.tsx` e esta story. O ajuste opcional da QA na linha da fonte ("artigo de 2 meses atrás") não foi aplicado para o arquivo publicado continuar idêntico ao sha aprovado. Story fica InReview até o PASS de produção.
- 2026-11-13: **PASS de produção da QA** na versão com Fireflies (commit `8c66a80`, página com sha `1d04580e…`, igual ao aprovado). Story fechada como Done. O ajuste opcional da linha da fonte não foi feito, para não mudar o arquivo publicado; se for feito, volta para uma checagem curta da QA.
