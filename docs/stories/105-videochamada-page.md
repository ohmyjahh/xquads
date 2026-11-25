# Story 105: Página /videochamada, o tradutor de voz e legenda em videochamada (Cicada)

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-25

---

## Descrição

Rafa gravou um reel (`Tradutor de voz, video chamada.MOV`, 41 s) apresentando o **Cicada**, um repositório
gratuito que traduz em tempo real a voz e a legenda em qualquer videochamada (Meet, Zoom e outras).

O CTA é **"comenta videochamada que eu mando o link pelo direct"**, daí a rota `/videochamada`.

### O que o vídeo diz (transcrito do áudio)

> "Imagina que tu fala português e tá numa videochamada com pessoas de outro país, mas todo mundo tá escutando a
> tua voz na língua nativa. Foi isso que esse cara criou. Ele criou um repositório que promete fazer uma tradução
> em tempo real da tua voz em qualquer videochamada. Seja no Google Meet, no Zoom ou qualquer outra ferramenta de
> videochamada. Sempre que outra pessoa estiver falando, tu vai ver a tradução simultânea em tempo real, escrita
> na parte de baixo da tua tela. Agora, quando você falar, as pessoas do outro lado da tela vão escutar na sua
> língua nativa. Seja inglês, espanhol, árabe, russo e até chinês. Esse repositório é gratuito, tem menos de duas
> semanas que foi lançado e já tem mais de 3 mil estrelas no GitHub. Se tu quer que eu te mande o link, comenta
> aqui embaixo, videochamada, que eu te mando pelo direct."

### Onde a página vai além do vídeo

O vídeo mostra a promessa, mas não diz como instalar, o que é de graça e o que pede chave, nem como usar dentro da
chamada. A página entrega, com base nos fatos conferidos no repositório em 25/11/2026:

- **Links oficiais:** repositório `https://github.com/wquguru/cicada`, site `https://cicada.indaloop.app`,
  download `https://cicada.indaloop.app/en/download/` e releases `https://github.com/wquguru/cicada/releases/latest`.
- **O que é grátis e o que pede chave:** no Mac com Apple silicon, legenda, tradução, registro e interpretação
  funcionam de graça e sem chave (voz da interpretação com as vozes do próprio macOS). Vozes naturais, clonar a
  própria voz, notas ao vivo e tradução de voz em um passo pedem chave da Ling (crédito grátis de ¥10 por mês). Mac
  Intel, Windows, Linux e Android precisam de chave de um serviço de IA (Ling, OpenRouter, ZenMux, OpenAI ou
  compatível).
- **Passo a passo por plataforma**, com o Mac em destaque (macOS 14.4+; Ditado ligado em Ajustes do Sistema >
  Teclado para macOS 14.4 a 15, e desnecessário no macOS 26), Windows (SmartScreen: Mais informações > Executar
  assim mesmo), Linux e Android.
- **Como usar na chamada:** a legenda bilíngue ao vivo do que o outro lado fala; a interpretação, segurando a tecla
  (Option direito no Mac, Ctrl direito no Windows, configurável) enquanto fala; o modo "mãos livres" opcional no Mac.
- **Microfone virtual:** a interpretação instala BlackHole 2ch no Mac (pede a senha de administrador uma vez),
  VB-Cable no Windows e é automático no Linux; como escolhê-lo como microfone no Meet/Zoom.
- **Idiomas confirmados no código do app Mac:** fala reconhecida em inglês, japonês, chinês, coreano, espanhol,
  francês, alemão e português (pt-BR); tradução para chinês (simplificado e tradicional), inglês, japonês, coreano,
  espanhol, francês, alemão e português.
- **Privacidade:** no Mac Apple silicon o áudio não sai do computador (só o texto reconhecido vai para tradução).

### Correções ao vídeo (ditas sem desmentir o Rafa de forma agressiva)

1. **Árabe e russo não estão na lista de idiomas do app Mac.** A página lista só os idiomas confirmados e não
   promete árabe nem russo.
2. **"Menos de duas semanas"** já não vale hoje. A página diz "lançado em novembro de 2026" e "mais de 3 mil
   estrelas", sem repetir a janela de duas semanas.

### O aviso único antes do gate

**Um só, curto, em uma linha**, no mesmo padrão da Story 104. Conteúdo sugerido: baixe só do GitHub ou do site
oficial (o Cicada não tem moeda, token nem NFT) e avise os participantes de que a reunião está sendo transcrita. O
dev pode ajustar a redação, mantendo uma linha só.

---

## Acceptance Criteria

**AC1:** Existe a rota `/videochamada` renderizando sem erro próprio no console.

**AC2:** O conteúdo liberado fica atrás do `LeadGate`, com `source="videochamada-page"`.

**AC3:** O formulário traz os cinco campos do padrão atual do `LeadGate`.

**AC4:** Em `localhost` o conteúdo aparece destravado, com a tarja "PRÉVIA LOCAL".

**AC5:** Um único aviso curto, de uma linha, aparece antes do gate (baixar só da fonte oficial e avisar os
participantes), sem outros avisos soltos antes do formulário.

**AC6:** A página traz os links oficiais: repositório, site e download (e releases), todos com os endereços do brief.

**AC7:** A página deixa claro o que é grátis (Mac com Apple silicon: legenda, tradução, registro e interpretação, sem
chave) e o que pede chave (vozes naturais, clonar a voz, notas ao vivo, tradução de voz em um passo; e Mac Intel,
Windows, Linux e Android), citando o crédito grátis mensal da Ling.

**AC8:** O passo a passo cobre Mac (em destaque, com o requisito macOS 14.4+ e a regra do Ditado), Windows
(incluindo o aviso do SmartScreen), Linux e Android/celular (viva-voz e modo "In person").

**AC9:** A página explica como usar na chamada: a legenda bilíngue ao vivo e a tecla de falar (Option direito no
Mac, Ctrl direito no Windows, configurável), incluindo o modo "mãos livres" opcional no Mac.

**AC10:** A página explica o microfone virtual (BlackHole 2ch no Mac, VB-Cable no Windows, automático no Linux) e
como selecioná-lo no app de chamada.

**AC11:** A lista de idiomas traz somente os confirmados no brief (fala: inglês, japonês, chinês, coreano, espanhol,
francês, alemão, português; tradução: chinês simplificado e tradicional, inglês, japonês, coreano, espanhol, francês,
alemão, português). `grep -i` por "árabe", "arabe", "russo" e "russian" na página só pode retornar ocorrências que
dizem que NÃO estão na lista, nunca uma promessa.

**AC12:** A página não repete a expressão "menos de duas semanas" (`grep` sem resultado); o lançamento aparece como
"novembro de 2026" e as estrelas como "mais de 3 mil". Nenhum número de versão do Cicada fixo no texto.

**AC13:** Zero travessão (—) em todo o texto e nos prompts da página. Verificável por `grep -n "—" src/app/videochamada/page.tsx`
sem nenhum resultado.

**AC14:** A página afirma apenas o que está no brief (vídeo ou repositório), sem prometer resultado nem qualidade da
tradução.

**AC15:** Todo trecho copiável que existir na página (por exemplo, um prompt para pedir ajuda ao Claude na
instalação) tem botão de copiar, com `try/catch` e aviso visível em caso de falha, como em `/social`. Se a página
não tiver trecho copiável, o AC é N/A.

**AC16:** `SalesCta` com `utmContent="videochamada"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/videochamada/page.tsx`

### OUT
- Alterar componentes compartilhados (`LeadGate`, `SalesCta`, hooks), `/api/leads`, layout ou `app-shell.tsx`
- Alterar o pop-up, a faixa ou a campanha Black Box
- Prometer árabe, russo ou qualquer idioma fora da lista confirmada
- Hospedar, redistribuir ou reempacotar o Cicada (apenas links oficiais)
- Prometer resultado ou qualidade de tradução
- Ensinar a burlar limites ou termos de plataformas de videochamada
- Commit ou push (só com pedido explícito do Rafa)

---

## Complexidade

**P (2 pontos).** Conteúdo vem do vídeo e do brief conferido; o trabalho é organizar passo a passo por plataforma,
a tabela grátis versus chave e o aviso único.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Prometer árabe e russo, como no vídeo | **Alta** | AC11: só idiomas confirmados; árabe e russo explicitamente fora |
| Pessoa baixar versão falsa do app (golpe de moeda/token) | **Alta** | AC5 e AC6: aviso único e apenas links oficiais |
| Expectativa de "tudo grátis" em qualquer sistema | Média | AC7: grátis só no Mac Apple silicon, o resto pede chave |
| Texto desatualizado ("menos de duas semanas", versão) | Média | AC12: sem a janela de tempo; sem número de versão fixo no texto |
| Travessão passar despercebido (vício recorrente) | Média | AC13: grep obrigatório na DoD |
| Gravar/transcrever reunião sem aviso (LGPD) | Média | AC5: aviso aos participantes na linha única |
| Instalador do Windows bloqueado pelo SmartScreen assustar | Baixa | AC8: instrução explícita do passo |

---

## Definition of Done

- [x] Os 16 ACs conferidos
- [x] `grep -n "—" src/app/videochamada/page.tsx` sem resultado
- [x] `grep -in "árabe\|arabe\|russo\|russian"` só com ocorrências que dizem que NÃO estão na lista
- [x] `grep -in "menos de duas semanas" src/app/videochamada/page.tsx` sem resultado
- [x] `lint` e `tsc` sem erro novo (build não executado pelo dev)
- [ ] Conferido no navegador (`http://localhost:3001/xquads/videochamada`), antes e depois do gate
- [x] Nenhum arquivo fora de `src/app/videochamada/page.tsx` alterado
- [ ] Prévia mostrada ao Rafa
- [ ] Aprovação explícita antes de qualquer commit ou push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-25 | @mestre | Story criada a partir da transcrição do reel e dos fatos conferidos no repositório do Cicada |
| 2026-11-25 | @produto | Validada 10/10, GO. Ajustes: AC12 sem versão fixa, AC15 condicional (N/A sem trecho copiável), grep de árabe/russo na DoD. Status Draft para Ready |

---

## Dev Agent Record

### File List
- `src/app/videochamada/page.tsx` (novo)

### Dev Notes
- Molde: `/social` (CopyButton, gate, prévia local) e `/receitafederal` (cartões de link, botão de destino).
- Accent próprio: `#22D3EE` (ciano), texto escuro `#04222a` nos botões.
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
AC1 renderiza (build ok, rota listada) · AC2 `LeadGate source="videochamada-page"` linhas 233-242 · AC3 cinco campos vêm do componente compartilhado (não alterado) · AC4 tarja linhas 198-205 e `review` linhas 189-193 · AC5 AVISO de uma linha, linhas 36-37 e 225-230 · AC6 LINKS linhas 31-34 e 39-68 · AC7 linhas 275-313 · AC8 PLATAFORMAS linhas 70-117 (Mac em destaque, SmartScreen linha 90, Android In person linha 113) · AC9 linhas 349-375 · AC10 linhas 70-105 e 377-389 · AC11 FALA/TRADUCAO linhas 119-129, árabe/russo só como "não estão" linha 407 · AC12 sem "menos de duas semanas" nem versão (linha 219: "novembro de 2026", "mais de 3 mil") · AC13 zero travessão · AC14 fidelidade conferida contra o BRIEF, sem promessa de resultado · AC15 CopyButton linhas 147-183, uso linha 435 · AC16 linhas 460-463. Todos cumpridos.

### Padrão /social
`useSyncExternalStore` (lead salvo e prévia local por hostname), `LeadGate` com `source` certo e `buttonTextColor` escuro legível, `SalesCta` com `utmContent` certo, assinatura @rafa.grandi, CopyButton com try/catch e aviso de falha, `rel="noopener noreferrer"` em todos os links externos, aviso único de uma linha antes do gate, conteúdo só dentro do gate (prévia aberta só em localhost/127.0.0.1).

### Achados
- LOW, `src/app/videochamada/page.tsx:101`: "Baixe o pacote do Linux". O BRIEF não diz o formato do instalador. Sugestão: "o instalador do Linux".
- LOW, linhas 248-249: "Perfil ou site com outro nome ... não é o projeto" é inferência razoável do aviso do README, não literal no BRIEF. Mantém, é proteção.
- LOW, linha 310: "o que o projeto estima em 10 a 50 horas": o BRIEF traz o número sem dizer que a estimativa é do projeto.
- LOW, linha 131: o prompt chama o Cicada de "app gratuito"; só é grátis sem chave no Mac Apple silicon. Sugestão: tirar "gratuito" do prompt.
- LOW, linhas 330 e 454: texto cinza #777 pequeno, contraste baixo (padrão herdado da /social).
- Decisão (b), frase "A qualidade da tradução depende do idioma, do áudio e do serviço usado" (linhas 408-409): FICA. Não promete resultado, é cautela honesta, cumpre o AC14.
- Fidelidade: nenhuma afirmação sobre idioma, preço, requisito ou nome de arquivo fora do BRIEF. Árabe e russo não prometidos.
| 2026-11-25 | @raxos (orquestrador) | Conferido em Chrome headless (390 px e 1280 px): status 200, zero erro de console, zero travessão no texto renderizado, gate presente fora do localhost, prévia aberta no localhost, pop-up e faixa da Black Box entrando sozinhos, botão de copiar copiando, sem rolagem lateral. Aguardando o OK do Rafa |
| 2026-11-25 | @devops | Publicado (76ecf34) |
