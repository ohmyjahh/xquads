# Story 106: Página /redesocial, o Claude postando um vídeo por dia (skill Motion Video Director)

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-25

---

## Descrição

Rafa gravou um reel (`Claude postar 1 video por dia.MOV`, 65 s) ensinando a fazer o Claude criar e postar um vídeo por
dia nas redes, usando a skill **Motion Video Director**.

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

Fatos conferidos no repositório em 25/11/2026 (`https://github.com/mattypark/Motion-graphics-skill`):

- **Instalação com o endereço certo.** Os comandos do README apontam para `Miftahul-Islam-Efaz/Motion-graphics-skill`,
  que hoje dá 404. A página usa **sempre `mattypark/Motion-graphics-skill`**: no Claude Code, "Instale esta skill:
  https://github.com/mattypark/Motion-graphics-skill"; alternativas equivalentes
  `npx skills add mattypark/Motion-graphics-skill` ou `/plugin marketplace add mattypark/Motion-graphics-skill` e
  `/plugin install motion-video-director@motion-graphics-skill`; manual: baixar o ZIP e copiar
  `skills/motion-video-director` para `~/.claude/skills/`. A página só apresenta os comandos, nenhum é executado pela
  equipe.
- **O que a skill faz:** motion graphics em código (Canvas, SVG, Three.js, GSAP), edição de vídeo bruto (cortes, zoom,
  legenda, B-roll, texto atrás da pessoa), roteiro de narração para ElevenLabs, design de som e render final em MP4
  9:16, 16:9 ou 1:1, tudo local, sem After Effects.
- **Requisitos:** Node.js 18+, ffmpeg/ffprobe, Playwright com Chrome headless; opcionais Python 3.10+ (faster-whisper,
  rembg, demucs) e chaves de ElevenLabs, Firecrawl, Freesound, Pexels, Pixabay, LottieFiles. A skill roda um
  "preflight" que confere o que falta e pergunta item por item.
- **Honestidade sobre "sem fazer nada".** A skill foi feita com etapas de aprovação: pede aprovação antes de
  renderizar qualquer vídeo e não monta cenas antes de receber o MP3 final da narração (gerado pela pessoa no
  ElevenLabs a partir do roteiro), a menos que a pessoa peça uma trilha-guia temporária. A página explica isso sem
  desmentir o Rafa de forma agressiva: "a skill pede a sua aprovação; para virar rotina, você deixa isso combinado na
  instrução", com duas saídas: vídeo sem narração (só motion e texto) ou narração deixada pronta numa pasta.
- **Login feito pela própria pessoa.** O navegador interno é o do Claude no app desktop (Claude Code). A pessoa faz o
  login na mão, dentro dele. Nunca senha no chat.
- **Rotina diária.** Postar todo dia exige uma tarefa agendada no Claude, e o vídeo não ensina isso. A página ensina,
  avisando que a rotina local roda com o computador ligado e o app aberto.
- **Briefing do conteúdo:** um molde com colchetes (nicho, público, formato, tom, frequência, o que nunca fazer),
  no estilo do TREINAMENTO da `/social`.
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

**AC6:** Toda instalação da skill na página usa o endereço `mattypark/Motion-graphics-skill`. `grep -in "Miftahul-Islam-Efaz" src/app/redesocial/page.tsx`
sem nenhum resultado em links ou comandos (a menção ao nome como crédito do autor, se existir, não pode ser um
endereço de instalação).

**AC7:** A página traz o link do repositório e as formas de instalação: o prompt "Instale esta skill" com o link, e as
alternativas `npx skills add`, `/plugin marketplace add` com `/plugin install` e a instalação manual, todas com o
endereço certo.

**AC8:** A página lista o que a skill faz e os requisitos (Node.js 18+, ffmpeg/ffprobe, Playwright com Chrome
headless; opcionais e chaves como opcionais) e explica que a skill roda um "preflight" que confere o que falta.

**AC9:** A página explica com honestidade que a skill pede aprovação antes de renderizar e depende da narração, e
ensina a deixar isso combinado na instrução da rotina, com as duas saídas (vídeo só com motion e texto, ou narração
pronta numa pasta), sem agressividade com o vídeo.

**AC10:** O passo de conectar as redes manda a pessoa fazer o login ela mesma no navegador interno do Claude, e a
página afirma que nunca se cola senha no chat. Cobre Instagram, TikTok, YouTube Shorts e LinkedIn.

**AC11:** A página ensina a rotina diária (tarefa agendada) que o vídeo não detalha, com prompt copiável e o aviso de
que a rotina local depende do computador ligado e do app aberto.

**AC12:** A página entrega um molde de briefing de conteúdo com colchetes (nicho, público, formato, tom, frequência,
o que nunca fazer), pronto para copiar.

**AC13:** A dica do Instagram fantasma aparece, e a página define "modelar" como usar a estrutura (gancho, ritmo,
formato) e deixa explícito que nunca se baixa nem reposta o vídeo de outra pessoa.

**AC14:** A página inclui o passo de aprender com os resultados dos próprios posts, com prompt copiável, e a
recomendação de revisar os primeiros vídeos antes de liberar o piloto automático.

**AC15:** Há prompts copiáveis por passo, cada um com botão de copiar com `try/catch` e aviso visível em caso de
falha, como em `/social`.

**AC16:** Zero travessão (—) em todo o texto e nos prompts da página. Verificável por `grep -n "—" src/app/redesocial/page.tsx`
sem nenhum resultado.

**AC17:** A página não promete resultado (alcance, seguidores, vendas) e não ensina a burlar limites ou detecção das
plataformas.

**AC18:** `SalesCta` com `utmContent="redesocial"` e assinatura `@rafa.grandi`.

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
- Executar os comandos de instalação (a página só os apresenta)
- Commit ou push (só com pedido explícito do Rafa)

---

## Complexidade

**M (3 pontos).** Mais passos e prompts que as páginas anteriores: instalação com quatro formas, rotina diária,
molde de briefing, honestidade sobre aprovação e narração.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Comando de instalação do README dar 404 (`Miftahul-Islam-Efaz`) | **Alta** | AC6: somente `mattypark/Motion-graphics-skill` |
| Pessoa digitar senha no chat | **Alta** | AC10: login feito na mão no navegador interno |
| Conta restringida por automação ou por repostar vídeo alheio | **Alta** | AC5, AC13, AC17: aviso único, "modelar" é estrutura, OUT proíbe evasão |
| Expectativa de "zero esforço" (a skill pede aprovação e narração) | **Alta** | AC9: explicado com honestidade e como combinar na rotina |
| Rotina não rodar por computador desligado | Média | AC11: dito na seção da rotina |
| Skill sem licença declarada | Média | A página só linka o repositório; não redistribui nem reempacota |
| Prompts de instalação ou de rotina com travessão | Média | AC16: grep obrigatório na DoD |
| Piloto automático postar algo ruim | Média | AC14: revisar os primeiros vídeos antes de liberar |

---

## Definition of Done

- [x] Os 18 ACs conferidos
- [x] `grep -n "—" src/app/redesocial/page.tsx` sem resultado
- [x] `grep -in "Miftahul-Islam-Efaz" src/app/redesocial/page.tsx` sem endereço de instalação
- [x] `lint` e `tsc` sem erro novo (build não executado pelo dev)
- [ ] Conferido no navegador (`http://localhost:3001/xquads/redesocial`), antes e depois do gate
- [x] Nenhum arquivo fora de `src/app/redesocial/page.tsx` alterado
- [ ] Prévia mostrada ao Rafa
- [ ] Aprovação explícita antes de qualquer commit ou push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-25 | @mestre | Story criada a partir da transcrição do reel e dos fatos conferidos no repositório da skill |
| 2026-11-25 | @produto | Validada 10/10, GO, sem alteração de texto. Skill sem licença: sem AC, só link (risco registrado). Status Draft para Ready |

---

## Dev Agent Record

### File List
- `src/app/redesocial/page.tsx` (novo)

### Dev Notes
- Molde: `/social` (CopyButton, gate, prévia local) e `/receitafederal` (cartões de link, botão de destino).
- Accent próprio: `#F472B6` (rosa), texto escuro `#2a0a1a` nos botões.
- Verificações: eslint sem erro; `tsc --noEmit` sem erro nos dois arquivos; grep de travessão vazio.
- Pendentes para o orquestrador: conferência no navegador antes/depois do gate, prévia ao Rafa, aprovação antes de commit/push.

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
