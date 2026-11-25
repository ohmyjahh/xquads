# Story 106: Página /redesocial, o Claude postando um vídeo por dia (coleção Awesome Opus 5.5 Videos)

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-25

---

## Descrição

Rafa gravou um reel (`Claude postar 1 video por dia.MOV`, 65 s) ensinando a fazer o Claude criar e postar um vídeo por
dia nas redes, usando uma skill que ensina o Claude a criar animações e modelar vídeos de outras pessoas.

**Revisão do dono (25/11/2026):** o repositório certo não é o `mattypark/Motion-graphics-skill`, é
`https://github.com/yihui-dev/awesome-opus5-5-videos` ("Awesome Opus 5.5 Videos"). Esse repositório **não é uma skill
instalável**: é uma coleção de 703 prompts de vídeos feitos com o Claude Opus 5.5. A página passa a dizer isso com
clareza e a entregar, no passo 1, um prompt que manda o Claude baixar a coleção e montar uma skill própria a partir
dela.

O CTA é **"comenta rede social que eu mando o link pelo direct"**, daí a rota `/redesocial`.

### O que o vídeo diz (transcrito do áudio; "Cloud" = Claude, "S-Skill" = "essa skill", "rede vizinha" = TikTok)

> "Eu vou te ensinar como fazer o Claude postar um vídeo por dia sem você precisar fazer absolutamente nada. E o
> melhor é que tu consegue configurar tudo isso em menos de 5 minutos. O primeiro passo é só instalar essa skill que
> tá aparecendo aqui. Tu vai entrar no teu Claude e colocar 'Instale essa skill' e colar esse link. Essa skill
> basicamente ensina o Claude como ele faz pra criar animações e modelar vídeos de outras pessoas. O segundo passo é
> você precisa conectar o Claude no teu Instagram. Agora fala mais ou menos assim: 'Claude, abre o teu navegador
> interno que eu preciso logar no meu Instagram.' Tu coloca o teu login e tua senha e a partir de agora ele tem
> acesso a tuas redes sociais. Faz isso com todas as redes sociais que tu quer que ele publique. Seja Instagram,
> TikTok, YouTube Shorts, LinkedIn, enfim. E por fim tu vai explicar pra ele qual tipo de conteúdo que tu quer que
> ele produza. Vou te dar uma dica bônus, tá? Crie um Instagram fantasma, que é um Instagram que tu só vai seguir os
> teus concorrentes, e tu pede pra ele ficar estudando o que essa galera tá produzindo, pegando os vídeos virais e
> modelando pro teu nicho. E aqui vem o pulo do gato. Com o passar do tempo, quando ele for postando os teus
> conteúdos, ele consegue aprender como que tá dando certo e modelar pros novos vídeos. Se tu quer que eu te mande
> essa skill e um passo a passo de como fazer isso nas tuas redes sociais, comenta aqui embaixo, rede social, que eu
> te mando o link pelo direct."

### Os passos do vídeo

1. Instalar a skill (pedir ao Claude "Instale essa skill" e colar o link)
2. Conectar as redes: pedir ao Claude para abrir o navegador interno e fazer o login (Instagram, TikTok, YouTube
   Shorts, LinkedIn)
3. Explicar ao Claude o tipo de conteúdo que ele deve produzir
4. Bônus: Instagram "fantasma" que só segue concorrentes, para o Claude estudar o que viraliza e modelar para o nicho
5. Com o tempo, o Claude aprende com o que dá certo nos próprios posts e modela os próximos vídeos

### Onde a página vai além do vídeo

Fatos conferidos no repositório em 25/11/2026 (`https://github.com/yihui-dev/awesome-opus5-5-videos`, ver BRIEF,
seção "REVISÃO DO DONO"):

- **O que é.** "Awesome Opus 5.5 Videos", autor yihui-dev, licença MIT, 16.486 estrelas, criado em 27/09/2026, lista
  atualizada em 12/10/2026. Coleção de **703 prompts** (pasta `prompts/`, um `.md` por vídeo, e `data/videos.json`),
  418 com remake ao vivo no Skillry (`https://skillry.dev/ai-videos/opus-5-5`, link opcional). 100 destacados no README
  por categoria: Motion graphics (58), Explainers (16), 3D scenes (14), Games & interactive (12), mais "Latest prompts"
  (30). Cada arquivo traz título, autor, link do post original, categoria e o bloco "Prompt".
- **Não é uma skill pronta.** Sem `SKILL.md`, sem plugin. A página diz isso com clareza e explica que o prompt do passo
  1 é o que transforma a coleção em skill.
- **Passo 1 honesto, na lógica do vídeo ("instale essa skill e cole o link").** Prompt copiável que manda o Claude
  baixar a coleção numa pasta e montar uma skill própria da pessoa que, a cada vídeo: busca na coleção os prompts
  parecidos com o tema, adapta ao nicho e ao formato vertical, gera a animação num único HTML e grava a página em MP4.
  A página só apresenta o prompt e o link; nenhum comando é executado pela equipe.
- **Passo de teste** com um prompt da coleção (substitui o antigo preflight): a pessoa confere que o fluxo funciona
  antes de ligar a rotina.
- **Limites da coleção.** Alguns criadores publicaram só parte do prompt ou só descreveram o resultado, e há prompts em
  outros idiomas (ex.: `prompts/btcup99-311469.md` em chinês). A página orienta o Claude a avisar e traduzir/adaptar.
- **Créditos.** Cada vídeo e prompt pertence ao criador (linkado em cada entrada). Reforça a regra: modelar é usar a
  estrutura, nunca repostar o vídeo de outra pessoa.
- **Login feito pela própria pessoa.** O navegador interno é o do Claude no app desktop (Claude Code). A pessoa faz o
  login na mão, dentro dele. Nunca senha no chat.
- **Rotina diária.** Postar todo dia exige uma tarefa agendada no Claude, e o vídeo não ensina isso. A página ensina,
  avisando que a rotina local roda com o computador ligado e o app aberto. O prompt da rotina cita a skill criada no
  passo 1 e a coleção, e mantém a trava dos 7 dias de revisão.
- **Briefing do conteúdo:** um molde com colchetes (nicho, público, formato, tom, frequência, o que nunca fazer),
  no estilo do TREINAMENTO da `/social`, citando a skill do passo 1 e a coleção.
- **"Modelar" é estrutura.** Gancho, ritmo e formato do que viraliza, nunca baixar e repostar o vídeo de outra pessoa
  (direito autoral, denúncia, queda de alcance).
- **Aprender com os resultados:** um prompt para o Claude revisar o desempenho dos próprios posts e ajustar os
  próximos.
- **Prompts copiáveis por passo.**

### O aviso único antes do gate

**Um só, curto, em uma linha**, no padrão da Story 104. Conteúdo sugerido: automatizar publicação pode ir contra os
termos das plataformas, então comece devagar e revise os primeiros vídeos. O dev pode ajustar a redação, mantendo uma
linha só.

---

## Acceptance Criteria

**AC1:** Existe a rota `/redesocial` renderizando sem erro próprio no console.

**AC2:** O conteúdo liberado fica atrás do `LeadGate`, com `source="redesocial-page"`.

**AC3:** O formulário traz os cinco campos do padrão atual do `LeadGate`.

**AC4:** Em `localhost` o conteúdo aparece destravado, com a tarja "PRÉVIA LOCAL".

**AC5:** Um único aviso curto, de uma linha (termos das plataformas e começar devagar), aparece antes do gate, sem
outros avisos soltos antes do formulário.

**AC6:** O único repositório citado na página é `yihui-dev/awesome-opus5-5-videos`. Os termos `mattypark`, `Miftahul`,
`Motion Video Director`, `npx skills`, `/plugin` e `ElevenLabs` não aparecem mais. Verificável por
`grep -inE "mattypark|Miftahul|Motion Video Director|npx skills|/plugin|ElevenLabs" src/app/redesocial/page.tsx` sem
nenhum resultado.

**AC7:** A página diz com clareza que o repositório é uma coleção de 703 prompts de vídeos feitos com o Claude Opus 5.5
e não uma skill pronta, e que o prompt do passo 1 é o que transforma a coleção em skill.

**AC8:** O passo 1 entrega um prompt copiável que manda o Claude baixar a coleção e montar uma skill própria a partir
dela: buscar prompts parecidos com o tema, adaptar ao nicho e ao formato vertical, gerar um HTML único e gravar a página
em MP4.

**AC9:** Há um passo de teste com um prompt da coleção (no lugar do antigo preflight), copiável, para a pessoa conferir
o fluxo antes de ligar a rotina.

**AC10:** O passo de conectar as redes manda a pessoa fazer o login ela mesma no navegador interno do Claude, e a
página afirma que nunca se cola senha no chat. Cobre Instagram, TikTok, YouTube Shorts e LinkedIn.

**AC11:** A página ensina a rotina diária (tarefa agendada) que o vídeo não detalha, com prompt copiável e o aviso de
que a rotina local depende do computador ligado e do app aberto.

**AC12:** A página entrega um molde de briefing de conteúdo com colchetes (nicho, público, formato, tom, frequência,
o que nunca fazer), pronto para copiar.

**AC13:** A dica do Instagram fantasma aparece, e a página define "modelar" como usar a estrutura (gancho, ritmo,
formato) e deixa explícito que nunca se baixa nem reposta o vídeo de outra pessoa.

**AC14:** A página inclui o passo de aprender com os resultados dos próprios posts, com prompt copiável, e a
recomendação de revisar os primeiros vídeos antes de liberar o piloto automático (a trava dos 7 dias fica no prompt da
rotina).

**AC15:** Há prompts copiáveis por passo, cada um com botão de copiar com `try/catch` e aviso visível em caso de
falha, como em `/social`.

**AC16:** Zero travessão (—) em todo o texto e nos prompts da página. Verificável por `grep -n "—" src/app/redesocial/page.tsx`
sem nenhum resultado.

**AC17:** A página não promete resultado (alcance, seguidores, vendas) e não ensina a burlar limites ou detecção das
plataformas.

**AC18:** `SalesCta` com `utmContent="redesocial"` e assinatura `@rafa.grandi`.

**AC19:** O briefing de conteúdo (AC12) e o prompt da rotina (AC11) citam a skill criada no passo 1 e a coleção, e não
citam mais nenhuma skill externa.

**AC20:** Os fatos da coleção batem com o BRIEF: 703 prompts, categorias (Motion graphics, Explainers, 3D scenes, Games
& interactive), licença MIT, créditos aos criadores de cada vídeo e link opcional do Skillry
(`https://skillry.dev/ai-videos/opus-5-5`). Nada além disso é afirmado sobre a coleção, e a página avisa que há prompts
incompletos ou em outros idiomas.

---

## Escopo

### IN
- `src/app/redesocial/page.tsx`

### OUT
- Alterar componentes compartilhados (`LeadGate`, `SalesCta`, hooks), `/api/leads`, layout ou `app-shell.tsx`
- Alterar o pop-up, a faixa ou a campanha Black Box
- Ensinar a burlar limites, detecção ou termos das plataformas (proxy, conta falsa, evasão)
- Baixar e repostar vídeo de outra pessoa
- Pedir ou aceitar senha no chat
- Prometer resultado
- Executar comandos ou baixar a coleção (a página só apresenta o link e os prompts)
- Commit ou push (só com pedido explícito do Rafa)

---

## Complexidade

**M (3 pontos).** Reescrita de conteúdo em arquivo único já existente: troca da instalação por um prompt que monta a
skill a partir da coleção, passo de teste, rotina diária e molde de briefing ajustados.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Pessoa achar que o repositório é uma skill pronta e instalável | **Alta** | AC7: a página diz que é uma coleção de prompts e que o passo 1 monta a skill |
| Pessoa digitar senha no chat | **Alta** | AC10: login feito na mão no navegador interno |
| Conta restringida por automação ou por repostar vídeo alheio | **Alta** | AC5, AC13, AC17: aviso único, "modelar" é estrutura, OUT proíbe evasão |
| Prompts da coleção em outros idiomas ou incompletos | Média | AC20: a página avisa; o prompt do passo 1 manda o Claude sinalizar, traduzir e adaptar, e não usar prompt incompleto sem avisar |
| Direitos dos criadores dos vídeos da coleção | Média | AC13 e AC20: créditos aos criadores, modelar é só estrutura, nunca baixar nem repostar vídeo alheio |
| Rotina não rodar por computador desligado | Média | AC11: dito na seção da rotina |
| Resquício da skill antiga na página | Média | AC6: grep obrigatório na DoD |
| Prompts com travessão | Média | AC16: grep obrigatório na DoD |
| Piloto automático postar algo ruim | Média | AC14: revisar os primeiros vídeos antes de liberar |

---

## Definition of Done

- [x] Os 20 ACs conferidos
- [x] `grep -n "—" src/app/redesocial/page.tsx` sem resultado
- [x] `grep -inE "mattypark|Miftahul|Motion Video Director|npx skills|/plugin|ElevenLabs" src/app/redesocial/page.tsx` sem resultado
- [x] `lint` e `tsc` sem erro novo
- [ ] Conferido no navegador (`http://localhost:3001/xquads/redesocial`), antes e depois do gate
- [x] Nenhum arquivo fora de `src/app/redesocial/page.tsx` alterado
- [ ] Publicado (Rafa autorizou o push desta revisão em 25/11/2026) e validado em produção

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-25 | @mestre | Story criada a partir da transcrição do reel e dos fatos conferidos no repositório da skill |
| 2026-11-25 | @produto | Validada 10/10, GO, sem alteração de texto. Skill sem licença: sem AC, só link (risco registrado). Status Draft para Ready |
| 2026-11-25 | @produto | **Revisão do dono:** o repositório certo não é o `mattypark/Motion-graphics-skill`, é `yihui-dev/awesome-opus5-5-videos`. Ele é uma coleção de 703 prompts de vídeos feitos com o Claude Opus 5.5 (MIT), não uma skill instalável. Descrição, "além do vídeo", ACs 6 a 9 (reescritos), AC19 e AC20 (novos), Riscos e DoD atualizados. Rafa autorizou publicar. Status Done para Ready |
| 2026-11-25 | @produto | Checklist de 10 pontos sobre a versão revisada: 10/10, GO. Status mantido em Ready. Próximo: @desenvolvedor, depois @qualidade, @devops e validação em produção na mesma story |
| 2026-11-25 | @qualidade | QA gate da revisão (coleção yihui-dev): APPROVED com notas (0 CRITICAL/HIGH/MEDIUM, 3 LOW). Lint e build ok. Status mantido em InReview |

---

## Dev Agent Record

### File List
- `src/app/redesocial/page.tsx` (novo; reescrito na revisão do dono de 25/11/2026)

### Dev Notes
- Molde: `/social` (CopyButton, gate, prévia local) e `/receitafederal` (cartões de link, botão de destino).
- Accent próprio: `#F472B6` (rosa), texto escuro `#2a0a1a` nos botões.
- Verificações: eslint sem erro; `tsc --noEmit` sem erro nos dois arquivos; grep de travessão vazio.
- Pendentes para o orquestrador: conferência no navegador antes/depois do gate, prévia ao Rafa, aprovação antes de commit/push.

### Dev Notes (revisão do dono, 25/11/2026)
- Página reescrita para a coleção `yihui-dev/awesome-opus5-5-videos`. Sai tudo da skill antiga; entram o bloco "A coleção", o passo 1 (prompt que cria a skill `video-por-dia`) e o passo 2 (teste), no lugar do preflight. Seção de aprovação/narração removida.
- [AUTO-DECISION] nome da skill criada → `video-por-dia` (reason: briefing, rotina e teste precisam citar um nome estável).
- [AUTO-DECISION] contagens por categoria e estrelas não afirmadas (reason: só 703 e os nomes das categorias eram necessários; menos risco de desatualizar).
- Verificações: grep dos termos antigos vazio; grep de travessão vazio; `yihui-dev/awesome-opus5-5-videos` com 3 ocorrências; eslint e `tsc --noEmit` sem erro.
- Pendente: conferência no navegador antes/depois do gate (orquestrador), QA e push.

### Change Log (dev)
| Data | Autor | Alteração |
|---|---|---|
| 2026-11-25 | @desenvolvedor | Página implementada. Status Ready para InReview |
| 2026-11-25 | @qualidade | QA gate: CONCERNS (0 CRITICAL/HIGH/MEDIUM, achados LOW). Status mantido em InReview |

---

## QA Results

**Revisor:** @qualidade (Quinn) · **Data:** 2026-11-25 · **Veredito:** CONCERNS (aprovável, sem achado CRITICAL/HIGH/MEDIUM). Status permanece InReview até a conferência no navegador e o OK do Rafa.

### Verificações automáticas
- `npx eslint` nas duas páginas: sem erros nem avisos.
- `npm run build`: passou (exit 0); rotas `/videochamada` e `/redesocial` presentes na lista.
- `grep -n "—"` (travessão) nas duas páginas: vazio. Sem meia-risca (–) também.

### ACs
AC1 renderiza (build ok) · AC2 `LeadGate source="redesocial-page"` linhas 268-277 · AC3 cinco campos do componente compartilhado · AC4 tarja linhas 233-240 · AC5 AVISO linhas 29-30 e 260-265 · AC6 só `mattypark/Motion-graphics-skill` (linhas 26-27); "Miftahul Islam Efaz" aparece só como crédito, sem endereço (linhas 311-315) · AC7 instalação linhas 32-37 e 100-107, manual linhas 342-348 · AC8 linhas 158-164 e 285-299, preflight linhas 39 e 108-115 · AC9 linhas 72-77 e 375-399 (duas saídas) · AC10 linhas 41, 116-123 e 349-355 · AC11 linhas 72-83 e 364-369 · AC12 BRIEFING linhas 43-68 · AC13 linhas 70 e 356-363 · AC14 linhas 85, 148-155 e 401-409 · AC15 CopyButton linhas 166-202 por bloco · AC16 zero travessão · AC17 sem promessa de resultado e sem evasão · AC18 linhas 427-430. Todos cumpridos.

### Padrão /social
`useSyncExternalStore` (lead salvo e prévia local por hostname), `LeadGate` com `source` certo e `buttonTextColor` escuro legível, `SalesCta` com `utmContent` certo, assinatura @rafa.grandi, CopyButton com try/catch e aviso de falha, `rel="noopener noreferrer"` em todos os links externos, aviso único de uma linha antes do gate, conteúdo só dentro do gate (prévia aberta só em localhost/127.0.0.1).

### Achados
- LOW, `src/app/redesocial/page.tsx:366-367`: "o vídeo daquele dia não sai" é consequência lógica do BRIEF, não literal. Mantém.
- LOW, linhas 395-396: "o Claude usa o que encontrar" é vago; o prompt (linha 76) já define o comportamento certo (pasta vazia = não publica).
- LOW, linhas 311-315: a nota sobre o 404 do endereço do README pode ficar desatualizada se o autor corrigir; aceitável, o rodapé traz a data de conferência.
- LOW, linhas 421-423: texto #777 pequeno, contraste baixo (padrão herdado).
- Decisão (a), prompt da rotina manda não publicar nos 7 primeiros dias e só publicar após "pode publicar sozinho" (linha 77): FICA. Cumpre o AC14, mitiga o risco de termos das plataformas e de piloto automático ruim, o [7] é editável e a seção das linhas 402-408 explica o porquê.
- Segurança: nenhum prompt pede senha (linhas 39, 41, 65 e 80 proíbem); instalação só com mattypark; nenhum comando executado.
- Fidelidade: requisitos, nome da skill, formatos e caminhos batem com o BRIEF; nenhuma promessa de resultado.
| 2026-11-25 | @raxos (orquestrador) | Conferido em Chrome headless (390 px e 1280 px): status 200, zero erro de console, zero travessão no texto renderizado, gate presente fora do localhost, prévia aberta no localhost, pop-up e faixa da Black Box entrando sozinhos, botão de copiar copiando, sem rolagem lateral. Aguardando o OK do Rafa |
| 2026-11-25 | @devops | Publicado (b94e27b) |
| 2026-11-25 | @desenvolvedor | Revisão do dono implementada (coleção yihui-dev, passos 1 e 2 novos). Status Ready para InReview |
| 2026-11-25 | @qualidade | **Validado em produção:** `curl` em https://www.sowsales.com.br/xquads/redesocial devolve 200 (18645 bytes), formulário com nome, e-mail e telefone presente, e `Instale esta skill` ausente do HTML servido (inclusive do payload RSC), ou seja, conteúdo protegido não vaza antes do cadastro. Somado à evidência do orquestrador em Chrome headless (390 px e 1280 px: gate, pop-up e faixa da Black Box, zero travessão, zero erro de console, sem rolagem lateral). Status → Done |

### QA Results: revisão do dono (coleção yihui-dev/awesome-opus5-5-videos)

**Revisor:** @qualidade (Quinn) · **Data:** 2026-11-25 · **Veredito:** APPROVED com notas (sem achado CRITICAL, HIGH ou MEDIUM). Status permanece InReview. Esta seção acrescenta o histórico; o gate anterior (acima) refere-se à versão da skill antiga e está superado.

**Verificações automáticas** (`src/app/redesocial/page.tsx`)
- `npx eslint`: exit 0, sem erros nem avisos.
- `npm run build`: concluído e `/redesocial` listada como estática (`○`).
- `grep -n -i -E "mattypark|miftahul|motion video director|npx skills|/plugin|elevenlabs|preflight"`: vazio.
- `grep -n "—"` e `grep -n "–"`: vazios.
- "skill pronta" aparece só na negação (linhas 119 e 292).

**ACs (linha que cumpre)**
AC1 build ok, rota listada · AC2 `LeadGate source="redesocial-page"` 274-283 · AC3 cinco campos do `LeadGate` compartilhado · AC4 tarja 239-246 (hostname localhost/127.0.0.1, 230-234) · AC5 aviso único 30-31 e 266-271, sem outro aviso antes do formulário · AC6 só `REPO` (26-27), grep vazio · AC7 119, 292-296, 260-262 · AC8 prompt 33-48 (buscar em prompts/, adaptar a nicho e 9:16, HTML único, MP4), passo 1 em 114-121 · AC9 passo 2 em 122-129, prompt 50 · AC10 passo 3 (130-137), prompt 52, nota 355-361, quatro redes citadas · AC11 passo 6 (154-161), prompt 83-94, aviso computador ligado e app aberto 370-375 · AC12 BRIEFING 54-79 com colchetes (nicho, público, formato, tom, frequência, nunca fazer) · AC13 passo 5 (146-153), prompt 81, "modelar é estrutura" 362-369 · AC14 passo 7 (162-169), prompt 96, seção 381-389, trava de 7 dias no prompt (88) · AC15 `CopyButton` com try/catch e aviso de falha 172-208, `BlocoCopiavel` em todos os prompts · AC16 grep vazio · AC17 sem promessa de resultado (74, 386-387) e sem evasão · AC18 `SalesCta utmContent="redesocial"` 407, @rafa.grandi 409 · AC19 briefing 54 e rotina 83 citam `video-por-dia` e a coleção, nenhuma skill externa · AC20 703, categorias (100-105), MIT, créditos ao criador (304), Skillry (28, 319-327), aviso de incompletos e outro idioma (304-306 e 44). Todos cumpridos.

**Fidelidade ao brief:** 703 prompts, Opus 5.5, animação como código (HTML, Canvas, SVG, Three.js), pasta `prompts/`, MIT, créditos, incompletos e chinês, Skillry opcional: tudo consta do BRIEF. Estrelas, datas e contagens por categoria (58/16/14/12) não são afirmadas, corretamente. Nada sobre a skill antiga.

**Coerência dos prompts:** `video-por-dia` idêntico nas linhas 33, 50, 54 e 83. Rotina mantém a trava dos 7 dias (88) e "sem narração" (87); briefing também diz sem narração (63). Nenhum prompt pede senha; todos que tocam login ou instalação proíbem (46, 50, 52, 76, 91).

**Padrão:** `rel="noopener noreferrer"` em todos os 3 links externos (312, 322, 394), `useSyncExternalStore` para lead salvo e prévia, conteúdo liberado só dentro do gate.

**Achados**
- LOW, linha 262: "Aqui está o repositório certo" é eco da correção do dono, soa estranho para quem nunca viu a versão anterior. Sugestão: "Aqui estão a coleção e um prompt pronto para cada passo."
- LOW, linha 373: "o vídeo daquele dia não sai" é consequência lógica, não literal do BRIEF (já aceito no gate anterior).
- LOW, linhas 268-271 e DoD desta story: o bloco de QA anterior e as linhas de Change Log "Validado em produção ... Status → Done" ficaram misturados ao fim do arquivo e contradizem o Status InReview da revisão. Higiene de documento, sem efeito no código. Pendências reais de DoD: conferência no navegador da revisão e publicação.

| 2026-11-25 | @raxos (orquestrador) | Revisão conferida em Chrome headless (390 px e 1280 px): status 200, zero erro de console, zero termo da skill antiga e zero travessão no texto renderizado, link da coleção presente 4 vezes depois do gate e ausente antes dele, gate fora do localhost, 7 botões de copiar funcionando, sem rolagem lateral. Push autorizado pelo Rafa ("faça essa alteração e já pode subir") |
