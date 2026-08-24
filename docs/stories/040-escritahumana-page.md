# Story 040 — Página /escritahumana (prompt único de estilo de escrita, gated por lead)

**Status:** Done

## Descrição

Nova página isca standalone em `/escritahumana` (produção:
`www.sowsales.com.br/xquads/escritahumana`), no padrão das demais iscas do Xquads.

Entrega UM prompt único, longo, pronto para colar no ChatGPT ou no Claude. O prompt
define um estilo de escrita permanente (regras DEVE / EVITE + lista de palavras
banidas) para que as respostas da IA parem de soar como texto de máquina.

Diferença em relação à `/humano` (já publicada): a `/humano` entrega uma sequência de
três prompts que constrói uma skill no Claude Code, para quem usa terminal. Esta
página entrega um bloco só, para colar em instruções personalizadas do ChatGPT ou
em Project/Style do Claude. Público mais amplo, atrito zero. As duas se cruzam no
tema e devem se referenciar, não competir.

`source = "escritahumana-page"`.

## Critérios de Aceite

- **AC1** — Rota `/escritahumana` (`src/app/escritahumana/page.tsx`) renderiza standalone (sem sidebar/header), conforme regra por exclusão do dashboard em `app-shell.tsx`.
- **AC2** — Accent `#E879F9`, layout e tipografia no padrão das iscas, footer `@rafa.grandi`.
- **AC3** — Conteúdo livre (antes do gate): o que o prompt resolve, onde colar (ChatGPT instruções personalizadas, Claude Project/Style), e um antes/depois curto mostrando a diferença na prática.
- **AC4** — Conteúdo gated: o prompt completo e íntegro, fiel ao texto enviado pelo usuário, salvo os dois ajustes de adaptação ao português autorizados pelo dono em 24/08 (ver Change Log). Nenhum corte ou reescrita além desses.
- **AC5** — Botão de copiar entrega o prompt inteiro para a área de transferência, com confirmação visual de cópia.
- **AC6** — Lead com `source="escritahumana-page"`; desbloqueio via `hasCapturedLead()` / `xquads_lead_captured`.
- **AC7** — Bypass do gate somente em localhost (`useSyncExternalStore` no padrão da `/codigossecretos`), com faixa indicando prévia local.
- **AC8** — `SalesCta` com `utmContent="escritahumana"`.
- **AC9** — `npm run build` verde e rota gerada.

## Escopo

**IN:** página nova, conteúdo editorial de apoio, prompt fiel, cópia para clipboard.
**OUT:** alterar `LeadGate`, `SalesCta`, hooks ou API de leads; alterar a `/humano`;
editar o conteúdo do prompt; push/deploy sem autorização explícita.

## Riscos

- **R1 (médio)** — O prompt lista "que" entre as palavras a evitar. Em português "que" é
  palavra funcional obrigatória (conjunção e pronome relativo). Provável resíduo de tradução
  de "that", removível em inglês. Se a IA obedecer ao pé da letra, a saída quebra.
  *Mitigação:* publicar o prompt fiel (decisão do dono) e registrar a observação para o usuário decidir.
- **R2 (baixo)** — "EVITE markdown" e "EVITE asteriscos" convivem com "DEVE usar listas com
  marcadores em posts de redes sociais". Tensão real, resolvível com marcador simples.
  *Mitigação:* mesma de R1, decisão do usuário.
- **R3 (baixo)** — Sobreposição temática com `/humano` pode confundir quem chega pelos dois links.
  *Mitigação:* AC3 explicita a diferença de uso.

## Complexidade

**S (pequena).** Página estática no padrão já consolidado, sem backend novo.

## Valor de negócio

Isca de topo com atrito baixíssimo: o visitante cola um bloco e vê o resultado na
primeira resposta. Tema com procura alta (texto de IA sendo reconhecido como texto de IA)
e alcance maior que a `/humano`, que exige Claude Code.

## Dependências

- `LeadGate` (`src/components/lead-gate.tsx`) — existente
- `SalesCta` (`src/components/sales-cta.tsx`) — existente
- `hasCapturedLead` (`src/hooks/use-copy-with-lead.ts`) — existente
- Roteamento standalone em `app-shell.tsx` — já resolvido na Story 039

## Definition of Done

- `/escritahumana` renderiza em dev, prompt liberado só após lead (ou localhost).
- Cópia do prompt funciona e entrega o texto íntegro.
- `npm run build` verde.
- Mostrado ao usuário antes de qualquer push.

## Change Log

- **2026-08-24** — Draft criado por @mestre — Story 040
- **2026-08-24** — Validada por @produto: **GO 10/10**. Título claro, descrição contextualiza a diferença frente à `/humano`, 9 ACs testáveis, escopo IN/OUT delimitado, dependências existentes mapeadas, complexidade S, valor de negócio explícito, 3 riscos documentados com mitigação, DoD objetivo, alinhada ao padrão das stories 032-039. Draft → **Ready**.
- **2026-08-24** — Implementada por @desenvolvedor: `src/app/escritahumana/page.tsx` (269 linhas), accent `#E879F9`, LeadGate `source="escritahumana-page"`, bypass em localhost, `SalesCta utmContent="escritahumana"`, referência cruzada para `/humano`.
- **2026-08-24** — QA por @qualidade: **PASS com 1 correção aplicada e 2 observações.**
  - **Correção (média)** — `copyPrompt` chamava `navigator.clipboard.writeText` sem tratamento. Se o navegador negasse a permissão, o clique não copiava e não avisava nada. Reproduzido no browser (`NotAllowedError`). Corrigido com fallback `document.execCommand("copy")`, aviso visível em caso de falha total e `select-all` no bloco do prompt.
  - **Correção (baixa)** — `contentNote` dizia "57 regras"; a contagem real é 50 (10 DEVE + 40 EVITE). Ajustado.
  - **Correção (baixa)** — o exemplo "com o prompt" citava estatística da Litmus (36:1 em 2024 vs Instagram orgânico) que não foi verificada em fonte. Reescrito sem alegação factual não confirmada.
  - **Verificado** — prompt idêntico ao enviado pelo usuário (`diff` byte a byte, 59 linhas, 4295 caracteres, zero travessões). Lint limpo no arquivo. `npm run build` verde, rota estática gerada.
  - **Débito técnico (baixo)** — as demais páginas do projeto (`/codigossecretos`, `/humano`, hook `useCopyWithLead`) têm a mesma chamada de clipboard sem tratamento. Fora do escopo desta story; vale uma story própria para o hook.

## File List

- `src/app/escritahumana/page.tsx`
- `docs/stories/040-escritahumana-page.md`
- **2026-08-24** — Ajustes no prompt autorizados pelo dono ("faça como achar melhor"), aplicados por @desenvolvedor. Dois pontos, ambos de adaptação ao português:
  1. **"que" removido da lista de palavras a evitar.** A lista parece traduzida de uma versão em inglês, onde "that" costuma ser supressível. Em português "que" é conjunção integrante e pronome relativo obrigatório; obedecer levaria o modelo a torcer a sintaxe para fugir de uma palavra inevitável. "pode" e "isso" foram mantidos: são evitáveis e o hedging é um tell legítimo de IA.
  2. **"EVITE markdown." e "EVITE asteriscos." especificados**, para remover a contradição com "DEVE usar listas com marcadores em posts de redes sociais". Agora: markdown proibido é título com `#`, negrito com `**` e link em colchetes; asterisco proibido é o de ênfase, com hífen ou `•` liberados como marcador de lista.
  - Sem mudança na contagem: seguem 50 regras (10 DEVE + 40 EVITE). Lint limpo, `npm run build` verde.
- **2026-08-24** — Aprovada pelo dono. @devops: commit + push em `main`, auto-deploy Vercel. Status → **Done**.

## Incidente de deploy (24/08)

O push de `5cfd8e4` chegou ao GitHub (confirmado via `gh api`, 11:57 UTC), mas o Vercel
**não criou build**. `vercel ls xquads` mostrava o último deploy com 3 dias (o da Story 039).
A URL ficou 404 por mais de 5 minutos, contra ~40s do deploy anterior. A integração Git do
projeto parou de disparar; religar exige o dashboard do Vercel.

**Contorno aplicado:** deploy a partir de árvore limpa, não do working tree.
`git archive 5cfd8e4` extraído para diretório temporário, `.vercel/project.json` copiado,
`vercel --prod` executado de lá. Resultado: `xquads-msf22lcxh`, alias `xquads.vercel.app`.

**Por que não `vercel --prod` da pasta do projeto:** o repositório não tem `.vercelignore`,
e `src/app/teste/`, `public/obrigado/` e `squads/` estão fora do `.gitignore`. Um deploy do
working tree teria publicado esses arquivos não aprovados. Confirmado após o deploy:
`/xquads/teste` e `/xquads/obrigado` retornam 404 em produção.

**Pendências para o dono:**
- Reconectar a integração Git do projeto `xquads` no dashboard do Vercel.
- Avaliar um `.vercelignore` (ou entradas no `.gitignore`) cobrindo `squads/` e rascunhos,
  para que um deploy manual futuro não vaze arquivo de trabalho.

- **2026-08-24** — Publicada. `/xquads/escritahumana` responde 200 em produção, LeadGate ativo,
  prompt protegido, sem faixa de prévia local. Regressão conferida: `/codigossecretos`,
  `/marcadagua` e `/humano` seguem em 200.
