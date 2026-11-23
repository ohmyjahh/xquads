# Story 103 — Black Box: imagem quebrada, pop-up repetido e posição da faixa

**Status:** Ready
**Tipo:** Correção — produção
**Severidade:** ALTA (a imagem quebrada está no ar nas 107 páginas)
**Criada em:** 2026-11-23

---

## Os três pontos levantados pelo dono

### 1. A imagem da faixa não aparece (BUG, está em produção)

Reproduzido em local **e em produção**, com janela de 2201px:

```
faixa:  naturalWidth = 0   (não carrega, nem ao entrar na tela)
pop-up: naturalWidth = 1080 (carrega normal)
```

Os dois arquivos existem e respondem 200; carregados isoladamente em `new Image()`, abrem
(desktop com 1600px). Então não é caminho nem arquivo.

**Causa:** a faixa usa `<picture>` com `<source media="(min-width: 768px)">`. O navegador escolhe
a fonte no instante em que insere o `<img>`; renderizada por `createPortal` num nó criado à mão,
a ordem de inserção do React faz o `<img>` chegar sem a fonte resolvida. O pop-up não sofre disso
porque é renderizado com `desktopWide={false}`, ou seja, sem `<source>`.

**Por que passou no QA anterior:** a Story 101 verificou que a faixa **existia** (contagem de
nós), não que a **imagem dela carregava**. Falha de critério minha, não do código de teste.

**Correção:** na faixa automática, escolher a arte pela largura da janela em JavaScript e
renderizar `<img>` simples, sem `<picture>`. O `RevelacaoArt` das 9 páginas `-bf` fica intacto —
lá funciona, porque não passa por portal.

### 2. O pop-up aparece mais de uma vez na mesma página (BUG)

O dono relatou: fecha, usa um pouco, aparece de novo; fecha, aparece de novo.

Confirmado no código: `BlackBoxPromos` tem **três gatilhos independentes** — tempo (3 s),
rolagem (60% da página) e intenção de saída. Cada um abre uma vez, então são **até três
aparições na mesma página**.

Isso foi desenhado para as 9 páginas `-bf`, que são páginas dedicadas de campanha. Em 107
páginas onde a pessoa veio pegar um prompt, insistir três vezes atrapalha — inclusive a captação
de lead, que é o ativo.

**Correção:** no automático, só o gatilho de tempo. Uma aparição por página, como o dono pediu
quando decidiu a frequência. As `-bf` seguem com os três.

### 3. A faixa deve ficar abaixo do formulário (mudança pedida)

Hoje ela entra depois da primeira dobra, que em muitas páginas cai **antes** do formulário.
O dono quer a faixa **depois** do formulário que a pessoa precisa preencher.

**Correção:** procurar o formulário na página e inserir logo depois dele. Sem formulário
(páginas que usam o modal de copiar), mantém-se o critério da dobra.

---

## Acceptance Criteria

**AC1** — A imagem da faixa carrega em telas de 768px ou mais (`naturalWidth > 0`).

**AC2** — A imagem da faixa carrega também abaixo de 768px.

**AC3** — O pop-up automático aparece **uma única vez por página**, mesmo rolando a página
inteira e movendo o cursor para fora da janela.

**AC4** — As 9 páginas `-bf` mantêm o comportamento que já tinham.

**AC5** — A faixa é inserida **depois do formulário** nas páginas que têm formulário.

**AC6** — Em página sem formulário, a faixa continua entrando depois da primeira dobra.

**AC7** — Continua existindo **uma única** faixa por página.

**AC8** — `lint` e `build` sem erro novo.

---

## Escopo

### IN
- `src/components/black-box-auto.tsx` — posição da faixa e imagem própria
- `src/components/black-box-promos.tsx` — permitir limitar aos gatilhos de tempo

### OUT
- Alterar a arte, o texto ou o link
- Mudar o comportamento das 9 páginas `-bf`
- Mexer em `LeadGate`, `LeadForm`, `/api/leads` ou nas páginas

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Corrigir a imagem e quebrar as `-bf` | Alta | A faixa automática passa a ter imagem própria; `RevelacaoArt` não é tocado |
| Faixa não achar o formulário e sumir | Alta | AC6: sem formulário, volta ao critério da dobra |
| Continuar aparecendo mais de uma vez | Alta | AC3 testado rolando a página e simulando saída do cursor |
| **Verificar presença em vez de funcionamento** | **Alta** | Lição da 101: medir `naturalWidth`, não a contagem de nós |

---

## Definition of Done

- [ ] Os 8 ACs conferidos
- [ ] Imagem medida por `naturalWidth` em tela larga e estreita
- [ ] Pop-up testado com rolagem completa + saída do cursor
- [ ] `lint` e `build` sem erro novo
- [ ] Publicado e validado em produção pelo navegador

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-23 | @mestre | Story criada: 2 bugs encontrados em produção + 1 mudança de posição |
