# Story 094 - Página /reunioes: como usar o Claude nas reuniões (passo a passo)

**Status:** InReview (re-checagem da QA em 13/11, sha `f73348687059`; prévia, não publicada)
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

**Decisão registrada:** o pedido diz que todo passo tem de vir do artigo. O artigo do claude.com não detalha a interface e manda, ele mesmo, buscar a configuração no Help Center. Por isso o passo a passo usa os nomes de menu do Help Center, citado na página como fonte e com data. Onde os dois divergem em redação, vale o artigo: "beta nos planos Team e Enterprise" e "um administrador pode desligar" no Team. Nada de preço por assento, data de saída do beta ou número de usuários: nenhuma das duas fontes traz isso, então a página não afirma.

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
- Preço por assento, data de saída do beta, limite de participantes, suporte a Zoom/Teams com data.
- Que o recurso está disponível em plano individual (Pro/Max): nenhuma das fontes diz isso, então não aparece.
- Integrações com Gong, Attention, Granola, Fireflies.ai, Otter e Plaud: o artigo diz que a Anthropic está trabalhando com eles e que "em breve" dá para enviar a transcrição. Ficou fora da página para não virar promessa com data.

### Acceptance Criteria
- [ ] AC1 rota `/reunioes` sem erro de build nem de console
- [ ] AC2 linguagem de quem não é especialista, com nome de menu em inglês entre aspas quando é do produto
- [ ] AC3 antes do gate: só a linha de conferência, o selo, título, subtítulo, 6 cards de conteúdo e o formulário; nenhum alerta, requisito, custo, plano, plataforma nem bloco amarelo
- [ ] AC4 `LeadGate` com `source="reunioes-page"` e os 5 campos; `utm_content=reunioes`
- [ ] AC5 bloco de alerta é o 1º item do conteúdo liberado e traz plano, plataforma, organizações sem acesso, custo, dados salvos, aviso de transcrição, convidado de fora, quem vê o quê e duração
- [ ] AC6 passo a passo numerado, de 12 passos, na ordem antes, conexão, durante e depois
- [ ] AC7 botão "Ler o artigo oficial" aponta para https://claude.com/resources/articles/claude-meetings com target _blank e rel noopener noreferrer
- [ ] AC8 todo fato tem fonte com data; dicas que não vêm das fontes estão marcadas como "Recomendação nossa"
- [ ] AC9 nenhuma afirmação sobre preço por assento, data de saída do beta ou plataforma que as fontes não tragam
- [ ] AC10 links externos respondem 200
- [ ] AC11 localhost destravado com "PRÉVIA LOCAL"
- [ ] AC12 `SalesCta` e assinatura `@rafa.grandi`
- [ ] AC13 sem travessão em nenhum texto

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
