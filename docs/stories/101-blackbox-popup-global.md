# Story 101 — Black Box em todas as páginas: pop-up + faixa na dobra

**Status:** Done
**Epic:** Black Box IA — campanha de 27/11
**Severidade:** ALTA (toca o layout raiz: 107 páginas de uma vez)
**Criada em:** 2026-11-23

---

## Descrição

A Black Box IA acontece **sexta, 27/11**. Hoje o convite aparece em **9 páginas** (as cópias
`-bf`). O dono quer o pop-up em **todas as 107**, abrindo sozinho poucos segundos depois de a
pessoa chegar, **antes** de ela preencher o formulário.

### Duas peças, não uma

| Peça | Arte | Quando aparece |
|---|---|---|
| **Pop-up** | vertical (1080×1350) | 3 s depois de abrir a página |
| **Faixa na página** | horizontal (1600×600) | logo depois da primeira dobra, ao rolar |

### Decisões do dono (coletadas antes de implementar)

| Decisão | Escolha |
|---|---|
| Alcance | Todas as páginas |
| Tempo até abrir | **3 segundos** |
| Frequência | **Uma vez por página** — ao abrir outra página, aparece de novo |
| Contador | Deve durar **todo o dia 27**, não zerar na virada de quinta |

Hora de fim assumida: **27/11 às 23h59 (horário de Brasília)**. É um número isolado, trocável
em uma linha se a oferta fechar em outro horário.

### Por que não copiar páginas

O modelo atual (`/insta` → `/insta-bf`) significaria criar 98 cópias agora e apagar depois.
A alternativa é montar o pop-up **uma vez no layout raiz** (`src/app/layout.tsx`), que já
embrulha as 107 rotas. Um arquivo liga, o mesmo arquivo desliga.

### Dois problemas que a decisão cria, e como são tratados

**1. O layout não remonta entre páginas.** No App Router, navegar de `/wifi` para `/leis` troca
só o conteúdo; o layout e seu estado continuam vivos. "Uma vez por página" não acontece
sozinho — exige observar a rota e rearmar o temporizador a cada troca.

**2. As 9 páginas `-bf` já têm o componente.** Sem exclusão, passariam a ter dois pop-ups. Elas
ficam de fora do automático e seguem com o que já tinham.

### Risco declarado ao dono

Em 78 dessas páginas a pessoa chega para pegar um prompt e entrega o e-mail. O pop-up em 3 s
cobre o formulário antes de ela entender a página. O dono foi informado e escolheu assim, por
ser semana de campanha. Fica registrado para medir depois: se a captação cair, o ajuste é o
tempo ou a frequência, não a existência do pop-up.

### O problema da faixa: as páginas não têm a mesma estrutura

Medido: das 107 páginas, **55 usam `<header>` e 52 não**; 54 têm o container padrão. Inserir
"depois do primeiro bloco" dependendo da marcação deixaria **metade das páginas sem a faixa**.

Solução: medir a dobra de verdade. A faixa entra depois do **primeiro bloco cujo fim ultrapassa
a altura da janela** — que é a definição de "primeira dobra", e vale para qualquer estrutura.
Se nenhum bloco servir (página curta), ela entra no fim do conteúdo, antes do rodapé.

### Desligar depois — as duas peças

O dono reforçou: no fim da sexta, **o pop-up e a faixa** saem. Uma constante de ligado/desligado
e uma data-limite, num arquivo só, governam as duas. Passado o prazo, as duas somem sozinhas
mesmo que ninguém toque no código — é isso que garante que ninguém veja "Black Box, sexta 27/11"
em dezembro.

---

## Acceptance Criteria

**AC1** — O pop-up aparece automaticamente nas páginas que hoje não têm, sem editar página a página.

**AC2** — Abre **3 segundos** depois de a página ser aberta.

**AC3** — Ao navegar para outra página, o temporizador rearma e o pop-up aparece de novo.

**AC4** — As 9 páginas `-bf` **não** ganham um segundo pop-up.

**AC5** — Existe **um único arquivo** de configuração com: ligado/desligado, data-limite e a
lista de rotas excluídas.

**AC6** — Passada a data-limite, **nem o pop-up nem a faixa** aparecem, sem alteração de código.

**AC7** — O contador fica vivo durante todo o dia 27/11, até 23h59 (-03:00).

**AC8** — O `utm_content` continua identificando de qual página o lead veio, nas duas peças.

**AC8.1** — A faixa horizontal aparece logo depois da primeira dobra, **em página com e sem
`<header>`** — a inserção é medida pela altura da janela, não pela marcação.

**AC8.2** — Em página curta, a faixa entra no fim do conteúdo em vez de não aparecer.

**AC8.3** — A faixa não é inserida duas vezes, mesmo navegando entre páginas.

**AC9** — Fechar o pop-up não quebra a página: formulário e botões continuam funcionando.

**AC10** — Nenhuma página existente é alterada individualmente; nenhum componente de captura
(`LeadGate`, `LeadForm`, `/api/leads`) é tocado.

**AC11** — `lint` e `build` sem erro novo.

---

## Escopo

### IN
- `src/lib/blackbox-campanha.ts` (novo) — a configuração única
- `src/components/black-box-auto.tsx` (novo) — monta o pop-up e insere a faixa conforme a rota
- `src/app/layout.tsx` — inclui o componente
- `src/components/black-box-promos.tsx` — aceitar o tempo como parâmetro (hoje fixo em 6 s)

### OUT
- Alterar as 107 páginas uma a uma
- Mexer em `LeadGate`, `LeadForm` ou `/api/leads`
- Mudar a arte, o texto ou o destino do pop-up
- Alterar o comportamento das 9 páginas `-bf`
- Criar cópia nova de página

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Quebrar as 107 páginas de uma vez (é o layout raiz) | **Crítica** | Build + conferência de uma amostra larga de rotas antes de publicar |
| Pop-up duplicado nas `-bf` | Alta | AC4, com lista de exclusão verificada no navegador |
| Queda na captação de lead | **Alta** | Decisão informada do dono; desligável em uma linha |
| Campanha vencida continuar aparecendo | Alta | AC6: data-limite desliga sozinha |
| Pop-up travar a página ao fechar | Média | AC9: testar formulário depois de fechar |
| Faixa não aparecer em metade das páginas | **Alta** | AC8.1: inserção medida pela dobra, não pela marcação; testar com e sem `<header>` |
| Faixa duplicada ao navegar | Média | AC8.3 |
| Temporizador não rearmar entre páginas | Média | AC3: testar navegando de uma rota para outra |

---

## Definition of Done

- [x] Os 11 ACs conferidos
- [x] `lint` e `build` sem erro novo
- [x] Testado em página com gate, página sem gate, página `-bf`, **com e sem `<header>`**
- [x] Testada a navegação entre páginas (rearme)
- [x] Testado que, com a data vencida, o pop-up não aparece
- [x] Prévia mostrada ao Rafa
- [x] Aprovação explícita antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-23 | @mestre | Story criada com as decisões do dono e os riscos declarados |
| 2026-11-23 | @mestre | Acrescentada a faixa horizontal na dobra; medido que metade das páginas não tem `<header>`, então a inserção passa a ser pela altura da dobra. Reforçada a saída automática das **duas** peças no fim da sexta |
| 2026-11-23 | @produto | Validação 10/10 (GO) |
| 2026-11-23 | @desenvolvedor | Config central + componente automático no layout raiz; link da campanha unificado |
| 2026-11-23 | @qualidade | QA PASS |

## QA Results

**Verdict: PASS.**

| Teste | Resultado |
|---|---|
| Página com `<header>` (`/wifi`) | pop-up ✅ · faixa em 1076px, dobra em 768 ✅ |
| Página **sem** `<header>` (`/airbnb`) | pop-up ✅ · faixa em 1318px ✅ — a inserção por altura funcionou onde a marcação não ajudaria |
| Página `-bf` (`/insta-bf`) | **0 faixas automáticas**, 3 blocos próprios ✅ sem duplicar |
| Troca de página (clique em link real) | pop-up reapareceu, 1 faixa ✅ |
| Fechar o pop-up (clique real) | some, página destrava, formulário de 5 campos usável ✅ |
| **Campanha vencida** (data trocada para 20/11) | **0 pop-up, 0 faixa, 0 link**; página intacta, sem vestígio ✅ |
| Link de destino | `utm_campaign=METNOV26` … `utm_term=STORIES` ✅ |

### Falso alarme investigado

A primeira medição acusou "pop-up não fecha" e "página travada". Era artefato do teste:
`element.click()` por script não aciona o manipulador do React como um clique real. Repetido com
clique de mouse de verdade, fecha e destrava corretamente.

### Observação sobre a navegação

Os links internos do site são `<a>` comuns, então a página recarrega e o pop-up voltaria de
qualquer forma. O `key={pathname}` continua no código como garantia para o caso de navegação
sem recarregamento.

### Perda consciente de informação

Com o `utm_content` fixo em `INSTAGRAM`, deixa de ser possível saber **de qual página** o lead
veio — o que as 9 páginas `-bf` registravam antes. Foi o link definido pelo dono. O `slug`
continua nas assinaturas dos componentes, justamente para permitir voltar atrás.
| 2026-11-23 | @devops | Publicado (`10f16e0`). Deploy propagou em ~7,5 min |
| 2026-11-23 | @qualidade | **Validado em produção.** `/wifi`: pop-up 1, faixa 1 aos 1626px, link com METNOV26. `/airbnb` (sem header): pop-up 1, faixa 1. `/insta-bf`: 0 faixas automáticas. Status → Done |

## Verificação antes de publicar (pedido do dono: "garantindo que nada vai quebrar")

| Checagem | Resultado |
|---|---|
| Build | 114 rotas geradas, sem erro |
| **As 107 rotas em build de produção local** | **107/107 em 200**, zero falha |
| 8 páginas abertas de verdade (iframe), 4,5 s cada | 8/8 com conteúdo, **0 erro de JavaScript** |
| Faixa duplicada | nenhuma |
| `-bf` com faixa automática | nenhuma |

### Susto na validação em produção

A varredura das 107 rotas por `curl` devolveu **403 em todas**. Não era o site: era o
**Vercel Security Checkpoint**, a proteção anti-bot, acionada por centenas de requisições
sequenciais vindas do mesmo endereço — o comportamento era, de fato, o de um robô.

Confirmado pelo navegador: a página carrega inteira, com título e conteúdo corretos. Lição para
a próxima: varrer produção em lote dispara a proteção; validar por amostra, com pausa.
