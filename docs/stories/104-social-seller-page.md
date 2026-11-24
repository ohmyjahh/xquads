# Story 104 — Página /social: o vendedor de IA que responde os directs

**Status:** Done
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-24

---

## Descrição

Rafa gravou um reel (`social-seller-openbot.MOV`, 71 s) ensinando a montar um **social seller**:
um agente de IA que responde os directs do Instagram e conduz a conversa de venda, usando o
OpenBot com a assinatura de IA que a pessoa já paga.

O CTA é **"comenta social que eu mando o link pelo direct"** — daí a rota `/social`.

### O passo a passo do vídeo (transcrito do áudio)

1. Ter uma assinatura (Claude ou ChatGPT) e o OpenBot, que é gratuito
2. Instalar o OpenBot e conectar a assinatura
3. Criar um agente novo: o social seller
4. **Treinar** o agente: o que faz, que perguntas faz, quem é o público, como aborda —
   *"literalmente fazer um treinamento de um vendedor"*
5. Dar acesso ao Instagram: pedir para abrir o navegador interno e fazer o login
6. Criar rotinas: 9h, 12h, 15h e 19h, cada uma com uma bateria de conversas
7. Follow-up em 2, 5, 9, 15 e 30 dias para reativar quem não respondeu

### Onde a página vai além do vídeo

O passo 4 é o que decide se funciona, e no vídeo ele é apenas *"ensina o que ele tem que
fazer"*. A página entrega um **molde de treinamento** pronto para a pessoa preencher: quem é o
público, o que oferece, as perguntas de qualificação, o tom, o que nunca fazer e quando passar
a conversa para um humano.

### Os avisos que precisam vir antes do gate

Três coisas concretas, que decidem se a pessoa perde ou não a conta:

1. **Automatizar direct vai contra os termos de uso da Meta.** A conta pode ser restringida ou
   bloqueada. Não é opinião: está nos termos da plataforma, e quem vai fazer precisa saber antes.
2. **Volume e ritmo derrubam conta.** Disparar muita mensagem em pouco tempo é o padrão que a
   plataforma detecta. Começar devagar é o que separa um teste de uma conta bloqueada.
3. **O computador precisa ficar ligado.** As rotinas de 9h, 12h, 15h e 19h rodam na máquina da
   pessoa; com o computador desligado, nada acontece. O vídeo não menciona isso.

Mesmo padrão das Stories 072, 075, 079 e 099: o que é eliminatório ou arriscado vem antes do
formulário, não depois.

### Relação com a `/openbot`

A `/openbot` (Story 079) apresenta a ferramenta. Esta aqui é um **uso específico** dela. A página
deve apontar para a `/openbot` para quem ainda não instalou, em vez de repetir a instalação.

---

## Acceptance Criteria

**AC1** — Existe a rota `/social` renderizando sem erro próprio no console.

**AC2** — O passo a passo cobre as 7 etapas do vídeo, na ordem.

**AC3** — Um aviso curto (termos da Meta + volume) aparece **antes** do gate, em uma linha.

**AC4** — O molde de treinamento do vendedor é entregue pronto para copiar, com botão de copiar
(`try/catch` + aviso em falha).

**AC5** — As rotinas e a régua de follow-up (2, 5, 9, 15, 30 dias) aparecem como no vídeo.

**AC6** — O conteúdo liberado fica atrás do `LeadGate`, com `source="social-page"`.

**AC7** — O formulário traz os cinco campos do padrão atual.

**AC8** — Há link para a `/openbot` para quem ainda não instalou.

**AC9** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia.

**AC10** — `SalesCta` com `utmContent="social"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/social/page.tsx`

### OUT
- Ensinar a burlar limite, usar proxy, criar conta falsa ou evitar detecção da plataforma
- Repetir a instalação do OpenBot — a `/openbot` já faz
- Prometer resultado de vendas
- Alterar componentes compartilhados, `/api/leads` ou layout

---

## Complexidade

**P (2 pontos).** O conteúdo veio do vídeo; o trabalho é o molde de treinamento e os avisos.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Pessoa ter a conta do Instagram restringida | **Alta** | AC3: termos e volume ditos antes do gate |
| Montar tudo e nada rodar (computador desligado) | **Alta** | AC3: dito antes do gate |
| Virar manual de spam | **Alta** | OUT proíbe evasão; o molde inclui "o que nunca fazer" e quando passar para humano |
| Expectativa de venda automática | Média | A página fala em conduzir conversa, não em faturamento garantido |

---

## Definition of Done

- [x] Os 10 ACs conferidos
- [x] `lint` e `build` sem erro novo
- [x] Conferido no navegador, antes e depois do gate
- [x] Prévia mostrada ao Rafa
- [x] Aprovação explícita antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-24 | @mestre | Story criada a partir da transcrição do áudio do reel |
| 2026-11-24 | @produto | Validação 10/10 (GO) |
| 2026-11-24 | @desenvolvedor | Página implementada |
| 2026-11-24 | @qualidade | QA PASS 10/10 |

## QA Results

**Verdict: PASS** — 10/10.

**Antes do gate:** os três avisos presentes (termos da Meta, volume, computador ligado) ✅,
5 campos ✅, passos e treinamento escondidos ✅.

**Depois do gate:** 6/6 passos ✅, treinamento com as seções "o que nunca faz" e "quando passar
para mim" ✅, régua 2-5-9-15-30 ✅, 2 links para a `/openbot` ✅, botão de copiar ✅.

A faixa da Black Box aparece normalmente na página nova, sem configuração.
| 2026-11-24 | @produto | **Revisão do dono:** os três avisos viram um só, curto e leve. O do computador ligado sai: o OpenBot permite rodar em servidor, então a ressalva estava errada para quem usa essa opção |
| 2026-11-24 | @desenvolvedor | Aviso reduzido a uma linha; ícones sem uso removidos; lint e build limpos |
| 2026-11-24 | @qualidade | Conferido: o texto novo está presente, os dois avisos antigos saíram, conteúdo segue atrás do gate |
| 2026-11-24 | @devops | Publicado (`87076e0`), no ar em ~48 s |
| 2026-11-24 | @qualidade | **Validado em produção:** aviso único presente, os dois antigos fora, 5 campos, gate ativo, faixa da campanha carregando (1600px). Status → Done |
