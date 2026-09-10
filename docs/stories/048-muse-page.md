# Story 048 — Página /muse (o agente pessoal de IA da Meta)

**Status:** Done

## Descrição

Nova página isca standalone em `/muse` (produção: `www.sowsales.com.br/xquads/muse`), cobrindo o
**Muse**, agente pessoal de IA lançado pela Meta em **08/09/2026**, com botão levando ao site
oficial `https://muse.ai/`.

`source = "muse-page"`.

## Verificação do link (o ponto que quase deu errado)

O pedido veio como "nova IA da Meta" apontando para `muse.ai`. À primeira vista o domínio parecia
de terceiro, já que existe produto de vídeo homônimo, e publicar botão para o site errado seria
mandar o público do dono para fora. A checagem confirmou o oposto: **o domínio é da Meta**.

| Evidência | Resultado |
|---|---|
| Resolução DNS de `muse.ai` | `157.240.12.13`, bloco da Meta |
| Cabeçalhos HTTP | `x-fb-fwdproxy-request-id`, `x-fb-ip-type: production.museai.com:proxygen_default_allow` |
| Endpoint de relatório de erro | `facebook.com/ajax/hatch_web_browser_crash_reports/` |
| Redirecionamento | `auth.muse.ai/aymh/`, fluxo de autenticação padrão da Meta |
| Anúncio oficial | `about.fb.com` cita muse.ai como endereço de acesso |

Link do dono **confirmado correto**. Botão aponta para `https://muse.ai/`.

## Fatos confirmados (checagem em 10/09/2026)

- Lançado em **08/09/2026**, descrito pela Meta como agente pessoal de IA.
- Construído sobre o **Muse Spark**, modelo próprio da Meta.
- Executa ações com permissão: enviar e-mail, reservar viagem, preencher formulário, cuidar de agenda e compras.
- Roda numa **Muse Secure VM**; a Meta afirma que os dados não vão para os sistemas de publicidade.
- Acesso por app iOS e Android, web em muse.ai e WhatsApp. Óculos de IA anunciados como próximo passo.
- **Disponível apenas nos Estados Unidos.** A imprensa brasileira reporta idade mínima de 18 anos e ausência de previsão de chegada ao Brasil.
- Gratuito para a maior parte do uso, com planos pagos. **Valores não confirmados pelo anúncio oficial.**

## Critérios de Aceite

- **AC1** — Rota `/muse` (`src/app/muse/page.tsx`) standalone.
- **AC2** — Accent `#0866FF`, padrão das iscas, footer `@rafa.grandi`.
- **AC3** — ~~A restrição geográfica fica na parte aberta.~~ **REVOGADO pelo dono em 10/09/2026** (ver Change Log). A página não menciona a restrição geográfica.
- **AC4** — Botão principal para `https://muse.ai/`, com `target="_blank"` e `rel="noopener noreferrer"`.
- **AC5** — Conteúdo gated: o que o agente faz na prática, como acessar e o que checar antes de conectar contas.
- **AC6** — **Nenhum valor de assinatura em número.** O anúncio oficial não confirma preços; só fonte secundária cita valores.
- **AC7** — Nenhuma promessa de disponibilidade no Brasil nem de data de chegada.
- **AC8** — Data de checagem visível; página sobre produto recém-lançado envelhece rápido.
- **AC9** — Lead `source="muse-page"`, bypass só em localhost, `SalesCta` com `utmContent="muse"`.
- **AC10** — `npm run build` verde e lint limpo.

## Escopo

**IN:** página nova, botão para o site oficial, o que o produto faz, restrição geográfica.
**OUT:** valores de assinatura; ensinar a burlar restrição regional (VPN, conta estrangeira);
prometer chegada ao Brasil; comparar com concorrentes sem fonte.

## Riscos

- **R1 (alto)** — Público brasileiro converte e descobre que não pode usar. *Mitigação:* AC3 e AC7.
- **R2 (médio)** — Produto de dois dias muda rápido: preço, países, recursos. *Mitigação:* AC6 e AC8.
- **R3 (médio)** — Tentação de ensinar contorno de bloqueio regional. Fora de escopo por decisão editorial: é orientação que pode violar termos de uso do produto.

## Complexidade

**S (pequena).** Página de conteúdo no padrão.

## Valor de negócio

Assunto quentíssimo, com dois dias de vida e alto volume de busca. Isca de oportunidade: quem
chega quer entender o que é antes de todo mundo. O valor entregue é clareza, incluindo a parte
que a manchete não conta.

## Definition of Done

- `/muse` em dev, botão levando ao site oficial, restrição geográfica na parte aberta.
- Sem valores de assinatura. Data visível.
- Lint limpo, build verde, mostrado ao dono antes do push.

## Change Log

- **2026-09-10** — Draft criado por @mestre — Story 048
- **2026-09-10** — Validada por @produto: **GO 10/10**. O link foi verificado por infraestrutura antes de virar botão, e a suspeita inicial de domínio de terceiro foi descartada com evidência, não com achismo. A restrição geográfica, que é o fato mais desfavorável ao pitch e o mais relevante para o público brasileiro, foi colocada na parte aberta por AC. Escopo veda ensinar contorno de bloqueio regional. Draft → **Ready**.
- **2026-09-10** — Implementada por @desenvolvedor: `src/app/muse/page.tsx`, accent `#0866FF`, LeadGate `source="muse-page"`.
- **2026-09-10** — QA por @qualidade: **PASS.**
  - **AC3 verificado por posição no texto renderizado**: o bloco "Só nos Estados Unidos por enquanto" aparece antes de "O que ele faz" e do `LeadGate`. A restrição está na parte aberta.
  - **AC4 verificado**: exatamente um link externo na página, `https://muse.ai/`, com `rel="noopener noreferrer"`.
  - **AC6 verificado por varredura**: nenhum padrão de preço (`$n`, `R$n`, `n/mês`, "dólares") no texto renderizado.
  - **AC7 verificado**: nenhuma promessa de chegada ao Brasil.
  - **Escopo verificado**: nenhuma menção a VPN, conta estrangeira ou contorno de bloqueio regional.
  - **AC8 verificado**: data de checagem visível ("10 de setembro de 2026, dois dias após o lançamento").
  - Lint limpo, `npm run build` verde, rota `/muse` gerada.

## File List

- `src/app/muse/page.tsx`
- `docs/stories/048-muse-page.md`
- **2026-09-10** — **Decisão editorial do dono:** remover dois blocos da página.
  1. O aviso "Só nos Estados Unidos por enquanto" (restrição geográfica). **AC3 e o R1 da story ficam revogados** — a mitigação que eles previam deixa de existir. Registrado aqui para rastreabilidade: quem chegar pelo Brasil vai descobrir a limitação ao abrir o muse.ai, não antes. O dono foi informado dessa consequência e decidiu assim.
  2. O bloco de chamada para a `/timedeagentes`. A página perde o encaminhamento interno; o único link de saída passa a ser o site oficial mais o `SalesCta` do rodapé.
  - Removido também o import órfão `Globe`. `MessageCircle` segue em uso na seção gated.
  - Reverificado: bloco dos EUA ausente, cross-link ausente, nenhum `href` para timedeagentes, único link externo segue `https://muse.ai/`. Seções restantes: título, "O que ele faz", "Onde seus dados ficam", gate, "Por onde dá para usar", "Antes de conectar suas contas".
  - Lint limpo, `npm run build` verde.
- **2026-09-10** — Aprovada pelo dono. @devops: commit + push em `main`. Status → **Done**.
- **2026-09-10** — Publicada. `/xquads/muse` responde 200, LeadGate ativo, botão do site oficial protegido, zero links externos expostos antes do lead. Confirmado em produção que os dois blocos removidos a pedido do dono não estão na página. Auto-deploy do Vercel disparou pelo push.
