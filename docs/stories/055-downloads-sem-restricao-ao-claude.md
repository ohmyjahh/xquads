# Story 002 — Remover as mensagens que dizem que o Xquads é só para o Claude

**Epic:** Distribuição do Xquads
**Status:** Done
**Criada em:** 2026-09-29
**Agente criador:** @mestre
**Depende de:** [Story 001](001-portabilidade-universal-agent-skills.md) (Done)

---

## Descrição

A Story 001 tornou o Xquads instalável em qualquer cliente compatível com Agent Skills,
e o repositório foi publicado. Mas a **documentação voltada ao aluno continuou dizendo que
o produto é do Claude Code**. Alunos que usam Codex estão relatando que aparece uma mensagem
restringindo o uso ao Claude.

Levantamento do que o aluno efetivamente lê:

| Onde | O que diz | Impacto |
|---|---|---|
| Site, `/downloads` | "Pre-requisitos: Node.js 18+, Git, **Claude Code (Anthropic CLI)**" | Direto: parece requisito obrigatório |
| Site, `/downloads` | Passos: baixar ZIP, extrair, "copiar a pasta squads/ para o seu projeto aios-core" | Fluxo que não existe mais; não menciona `install.sh` |
| Site, `/downloads` | Lista de squads incompleta (faltam Copy Master, Marketing Squad, Xquads Chief) | Subvende o pacote |
| Repo, `xquads/README.md` | Instalação por `cp -r ... ~/.claude/commands/` e "Requisitos: squads instalados em `~/.claude/commands/`" | Ensina o caminho que só funciona no Claude Code |
| Repo, `claude-code-mastery/README.md` | 8 ocorrências de ativação por `/AIOS:agents:<agente>` | Sintaxe exclusiva do Claude Code |

O README principal e os 15 `SKILL.md` já estão corretos desde a Story 001 — o problema ficou
nos arquivos que ela não tocou.

## Valor de negócio

Alunos de Codex estão bloqueados por documentação, não por tecnologia: o produto já funciona
para eles desde 27/09. Cada dia com a mensagem no ar é aluno desistindo de algo que já está
pronto e gerando suporte desnecessário.

## Critérios de aceite

- **AC1** — A página `/downloads` não apresenta nenhum cliente de IA como pré-requisito.
  Os pré-requisitos passam a ser apenas o que é de fato necessário (Git), e a página nomeia
  explicitamente os clientes compatíveis.
- **AC2** — Os passos de instalação em `/downloads` refletem o fluxo real: o comando único do
  `install.sh`, e não o fluxo extinto de ZIP + copiar pasta para `aios-core`.
- **AC3** — A lista de squads em `/downloads` está completa e bate com o repositório (15).
- **AC4** — `xquads/README.md` ensina a instalação universal; a instalação por
  `~/.claude/commands/` aparece apenas rotulada como alternativa legada do Claude Code.
- **AC5** — `claude-code-mastery/README.md` apresenta a ativação de forma agnóstica; a
  sintaxe `/AIOS:agents:x` aparece só como alternativa legada.
- **AC6** — Nenhum arquivo do repositório ou página do site apresenta um cliente de IA como
  requisito para usar o Xquads, verificado por varredura automatizada.
- **AC7** — A verificação do AC6 entra na suíte `scripts/testar.sh`, para não regredir.
- **AC8** — Os 40 testes existentes continuam passando; build do site passa.

## Escopo

### IN
- `~/Desktop/Projetos/xquads/src/app/downloads/page.tsx` — pré-requisitos, passos e lista
- `~/xquads-squads/xquads/README.md`
- `~/xquads-squads/claude-code-mastery/README.md`
- Nova verificação em `~/xquads-squads/scripts/testar.sh`

### OUT
- Reescrever os READMEs dos outros 13 squads (não têm seção de instalação nem restrição)
- Recriar o ZIP de download (o botão hoje leva a formulário de lead + VSL; mudar isso é
  decisão comercial, não de documentação)
- Alterar o conteúdo técnico do squad `claude-code-mastery` (é sobre ferramentas de agente
  por assunto, o que é legítimo)
- Sincronizar `~/Desktop/Projetos/xquads/squads/` com o repo instalável (story separada)
- Deploy do site sem autorização explícita

## Dependências

- Story 001 (Done e publicada em `4d04da3`)

## Complexidade

**P** — quatro arquivos, alterações de texto e uma verificação nova. Sem lógica de negócio.

## Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Aluno de Claude Code achar que perdeu o caminho antigo | Média | Manter a instalação legada documentada, rotulada como tal |
| Build do site quebrar por edição no TSX | Baixa | Rodar `npm run build` e o lint antes de subir |
| Sobrar alguma menção não mapeada | Média | AC6 com varredura automatizada, não inspeção manual |
| Dois repos divergirem de novo | Média | Verificação na suíte, que roda no repo dos squads |

## Critérios de Done

- [x] AC1 a AC8 verificados
- [x] `bash scripts/testar.sh` passa
- [x] `npm run build` e `npm run lint` passam no site
- [x] Varredura confirma zero menções a cliente como requisito
- [x] Nada subiu sem autorização explícita do dono

## QA Results

**Gate:** PASS · **Agente:** @qualidade · **Data:** 2026-09-29

| # | Check | Resultado |
|---|---|---|
| 1 | Code review | OK — mudanças de texto e um bloco JSX novo; lint limpo no arquivo tocado |
| 2 | Testes | OK — suíte de 40 para 46 asserções, todas passando |
| 3 | Critérios de aceite | OK — AC1 a AC8 verificados |
| 4 | Regressões | OK — zero `SKILL.md`, zero personas e zero mudanças no `install.sh`. Lint do site: 56 problemas antes, 56 depois, nenhum no arquivo editado |
| 5 | Performance | N/A — sem impacto |
| 6 | Segurança | OK — link externo com `rel="noopener noreferrer"`; nenhum dado novo coletado |
| 7 | Documentação | OK — é o objeto da story |

### Verificação visual

Página renderizada em desktop e mobile (375x812). O comando de instalação passou a quebrar
linha em vez de exigir scroll horizontal: no desktop ele aparecia cortado em `instal` e o
aluno não percebia que faltava texto.

### Correção extra, dentro do espírito do AC3

O bloco "O que está incluso" dizia "96+ Agentes". Corrigido para 183, que é a contagem real.

### Observações que ficam registradas

- O botão continua dizendo "Baixar Xquads (ZIP)" mas leva a um formulário de lead e depois
  à VSL — não baixa arquivo nenhum. Está no OUT desta story porque é decisão comercial
  deliberada (o redirect foi introduzido de propósito), não um defeito de documentação.
- O card do AIOS Core ainda ensina `npx aios-core install`, um fluxo diferente do dos
  squads. Fora do escopo aqui.

## Change Log

| Data | Agente | Ação |
|---|---|---|
| 2026-09-29 | @mestre | Story criada (Draft) |
| 2026-09-29 | @produto | Validação 10/10 — GO. Draft -> Ready |
| 2026-09-29 | @desenvolvedor | 4 arquivos corrigidos em 2 repos. Suíte 40 -> 46 |
| 2026-09-29 | @qualidade | QA gate PASS (7/7, AC 8/8). Ready -> Done |
