# Story 100 — Página /receitafederal: a Receita abriu o código da Reforma Tributária

**Status:** InReview
**Epic:** Páginas de conteúdo + captura de leads (Xquads)
**Criada em:** 2026-11-23

---

## Descrição

Rafa pediu uma página mandando para `github.com/ReceitaFederal`. Ele passou a URL da
**organização**, não de um repositório — e lá existem três.

A Receita Federal publicou, em novembro de 2026, o código-fonte das calculadoras da Reforma
Tributária do Consumo (LC 214/2025): CBS, IBS e Imposto Seletivo. É a primeira vez que o órgão
abre código no GitHub.

### Verificação: a organização é mesmo oficial?

**Esta foi a parte crítica.** A organização `ReceitaFederal` **não é verificada** pelo GitHub,
não tem site, descrição nem localização preenchidos — tudo o que costuma indicar organização
falsa se passando por órgão público. Publicar uma página dizendo "oficial da Receita Federal"
sem confirmar seria grave.

Confirmado por **fonte independente e oficial**, lida em primeira mão:

| Evidência | Dado |
|---|---|
| Notícia no gov.br | "Receita Federal publica primeiro código-fonte aberto no GitHub e amplia transparência da Reforma Tributária", 16/11/2026 |
| Os três repositórios | Linkados **dentro da própria notícia do gov.br** (confirmado extraindo os links do HTML) |
| Ato formal | Portaria Cotec nº 342, de 12/11/2026 |
| Autoria | Trabalho conjunto entre Receita Federal e Serpro |
| Licença | MIT |

### Os três repositórios

| Repositório | ⭐ | Linguagem | O que é |
|---|---|---|---|
| `calculadora-rtc-regime-regular` | 996 | Java | API REST que calcula CBS, IBS e Imposto Seletivo no regime geral, gera e valida os grupos de tributação dos documentos fiscais |
| `calculadora-rtc-simples-nacional` | 733 | Java | A mesma conta para quem está no Simples Nacional |
| `calculadora-rtc-gerador-danfse` | 593 | Go | Gerador do DANFSe |

### Ângulo da página

O público do Xquads não é fiscalista. O que interessa não é a conta em si, e sim o fato de que
**a regra do imposto virou código aberto que qualquer um pode ler, rodar e conferir**: quem
desenvolve sistema tem a implementação de referência em vez de interpretar a lei no escuro, e
quem tem empresa consegue conferir o que o sistema dele cobra.

### Cuidado necessário

A página **não dá orientação tributária**. Ela aponta o código oficial e diz o que ele é.
Decisão sobre imposto é com contador — e isso precisa estar escrito, porque o assunto convida
a interpretação.

---

## Acceptance Criteria

**AC1** — Existe a rota `/receitafederal` renderizando sem erro de build e sem erro próprio no console.

**AC2** — Os três repositórios aparecem, cada um com o que faz e seu link.

**AC3** — A página informa que é oficial **e mostra a prova**: link para a notícia do gov.br e a
Portaria Cotec nº 342/2026.

**AC4** — A página diz explicitamente que **não é orientação tributária** e que decisão de
imposto se confirma com contador.

**AC5** — O requisito técnico (Java 25 para as calculadoras; é API, não aplicativo com tela)
aparece **antes** do gate.

**AC6** — O conteúdo liberado fica atrás do `LeadGate`, com `source="receitafederal-page"`.

**AC7** — O formulário traz os cinco campos do padrão atual.

**AC8** — Em `localhost` o conteúdo aparece destravado, com a tarja de prévia.

**AC9** — Licença MIT e data da conferência informadas.

**AC10** — `SalesCta` com `utmContent="receitafederal"` e assinatura `@rafa.grandi`.

---

## Escopo

### IN
- `src/app/receitafederal/page.tsx`

### OUT
- Qualquer orientação sobre como calcular, recolher ou economizar imposto
- Explicar a Reforma Tributária ou interpretar a LC 214/2025
- Alterar componentes compartilhados, `/api/leads` ou layout
- Usar brasão, logotipo ou identidade visual do governo — a página aponta para o material, não se apresenta como ele
- Mexer em página existente

---

## Complexidade

**P (2 pontos).** O trabalho foi a verificação da autenticidade.

---

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Afirmar "oficial" sobre organização não verificada | **Crítica** | Confirmado na notícia do gov.br, links extraídos do HTML da própria página oficial |
| Página ser lida como orientação fiscal | **Alta** | AC4, com todas as letras |
| Parecer página do governo | **Alta** | OUT proíbe brasão e identidade; assinatura do Rafa no rodapé, como nas demais |
| Pessoa esperar um aplicativo com tela | Média | AC5: é API, requisito antes do gate |
| Repositórios mudarem (projeto novo, de novembro) | Média | Data da conferência no rodapé |

---

## Definition of Done

- [x] Os 10 ACs conferidos
- [x] `lint` e `build` sem erro novo
- [x] Os quatro links testados (3 repositórios + notícia do gov.br)
- [x] Conferido no navegador, antes e depois do gate
- [ ] Aprovação explícita antes de qualquer push

---

## Change Log

| Data | Autor | Alteração |
|---|---|---|
| 2026-11-23 | @mestre | Story criada; autenticidade confirmada na notícia oficial do gov.br |
| 2026-11-23 | @produto | Validação 10/10 (GO) |
| 2026-11-23 | @qualidade | QA PASS 10/10. Autenticidade confirmada na notícia do gov.br (links extraídos do HTML oficial). 5/5 links testados, todos 200 |
