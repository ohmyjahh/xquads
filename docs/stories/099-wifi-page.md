# Story 099 — Página /wifi: deixar o Wi-Fi mais rápido com o Claude Code

**Status:** Done
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-23

---

## Descrição

Rafa gravou um reel (IMG_5327.MOV, 2min41) contando que pediu ao Claude Code para diagnosticar
o Wi-Fi dele e a velocidade mais que dobrou em menos de 10 minutos. O CTA do vídeo é
**"comenta Wi-Fi que eu mando o link no direct"**, prometendo *"todos os prompts que eu utilizei
e um passo a passo de como fazer esse teste"*.

Esta página é a entrega desse CTA. Daí a rota `/wifi`, que é a palavra que ele pede no comentário.

### O que o vídeo diz (transcrito do áudio)

| Momento | Conteúdo |
|---|---|
| Abertura | "A velocidade dobrou em menos de 10 minutos" |
| Passo 1 | Entrar no Claude, selecionar o modo Code |
| Prompt 1 (dele) | *"Encontre o meu roteador e descubra o que pode estar deixando o meu Wi-Fi mais lento"* |
| Passo 2 | Informar a senha que está atrás do modem |
| O que ele faz | Procura aplicativos consumindo banda em segundo plano e checa se o Wi-Fi dos vizinhos está competindo |
| Passo 3 | Ele pergunta se pode corrigir; Rafa autoriza; roda o teste de novo — quase o dobro |
| Prompt 2 (dele) | *"Procure dentro do meu Wi-Fi qualquer dispositivo conectado e selecione apenas aqueles que você não reconhecer"* |
| Resultado | Dois dispositivos desconhecidos removidos; mais de duas vezes mais rápido |

### Tarefa pedida: melhorar os prompts

Rafa pediu explicitamente para **melhorar os prompts**. Os dois originais funcionam, mas são
curtos e deixam decisões em aberto. A página entrega versões melhores, mantendo a intenção:

1. **Diagnóstico** — acrescenta o sistema operacional, exige medição antes e depois em vez de
   achismo, pede a lista de problemas com a evidência de cada um, e proíbe mudar qualquer coisa
   sem autorização.
2. **Correção** (passo que no vídeo é só um "sim") — vira prompt próprio: aplicar da mudança mais
   reversível para a menos, explicando o que cada uma faz, medindo o resultado e avisando antes
   de qualquer coisa que derrube a rede.
3. **Dispositivos desconhecidos** — pede identificação por fabricante e **proíbe remover
   sozinho**: lista e deixa a decisão com a pessoa.

### Cuidado que a página precisa trazer

Três riscos reais, porque a pessoa vai mexer no roteador de casa:

- **Senha do roteador**: é a chave da rede. A página diz onde ela fica e que ela não deve ser
  compartilhada em print nem em chat público.
- **Configuração errada derruba a internet** da casa inteira, e quem mora junto sente.
- **"Dispositivo que não reconheço" engana**: TV, babá eletrônica, aspirador e lâmpada aparecem
  com nome estranho. Remover sem olhar tira da rede algo que é da casa.

É o mesmo princípio das Stories 072, 075 e 079: o que pode dar errado vem **antes** do gate.

---

## Acceptance Criteria

**AC1** — Existe a rota `/wifi` renderizando sem erro de build e sem erro próprio no console.

**AC2** — A promessa da página é a do vídeo, sem inflar: diagnóstico e ajuste, com o resultado
dele citado como experiência dele, não como garantia.

**AC3** — Os três cuidados (senha, risco de derrubar a rede, dispositivo "desconhecido") aparecem
**antes** do gate.

**AC4** — O passo a passo e os prompts ficam atrás do `LeadGate`, com `source="wifi-page"`.

**AC5** — São entregues **três** prompts melhorados, cada um com botão de copiar
(`try/catch` + aviso em falha).

**AC6** — Os prompts preservam a intenção dos originais do vídeo e nenhum deles autoriza o agente
a remover dispositivo por conta própria.

**AC7** — O formulário traz os cinco campos do padrão atual.

**AC8** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia.

**AC9** — `SalesCta` com `utmContent="wifi"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/wifi/page.tsx`

### OUT
- Alterar componentes compartilhados, `/api/leads`, layout
- Prometer número de velocidade — o resultado é o dele, não uma garantia
- Ensinar a invadir, destravar ou burlar rede de terceiros; tudo aqui é sobre a **própria** rede
- Instruções específicas de marca de roteador
- Mexer em página existente

---

## Complexidade

**P (2 pontos).** O trabalho é escrever bem os prompts.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Pessoa remover da rede um aparelho da própria casa | **Alta** | AC6: o prompt lista, não remove; aviso antes do gate |
| Pessoa derrubar a internet de casa | **Alta** | Prompt 2 manda começar pelo reversível e avisar antes do que corta a rede |
| Entender que serve para rede alheia | **Alta** | A página diz, em todos os prompts, "meu roteador", "minha rede" |
| Expectativa de dobrar a velocidade | Média | AC2: o resultado é relatado como experiência dele |
| Senha do roteador exposta | Média | Aviso explícito antes do gate |

---

## Definition of Done

- [x] Os 9 ACs conferidos
- [x] `lint` e `build` sem erro novo
- [x] Conferido no navegador, antes e depois do gate
- [x] Prévia mostrada ao Rafa
- [x] Aprovação explícita antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-23 | @mestre | Story criada a partir da transcrição do áudio do reel |
| 2026-11-23 | @qualidade | QA PASS 9/9 |
| 2026-11-23 | @devops | Publicado (`0453380`); rota responde 200 em produção. Status → Done |
