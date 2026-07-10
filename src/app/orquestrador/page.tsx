"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Network,
  Workflow,
  MessageSquareQuote,
  TrendingDown,
  Terminal,
  Code2,
  Lightbulb,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#CC785C";

const SUBAGENT_MD = `---
name: executor
description: Worker para tarefas pesadas de execucao. Use para pesquisas em arquivos, leitura de codigo, implementacoes e qualquer trabalho que consome muitos tokens.
model: sonnet
---

Voce e um executor focado. Receba a tarefa do orquestrador,
execute com precisao e retorne apenas um resumo curto e
objetivo do resultado. Nao tome decisoes de arquitetura:
se encontrar uma ambiguidade, descreva e devolva a decisao
para o orquestrador.`;

const CLAUDE_MD_SNIPPET = `## Orquestracao de modelos

- Voce (modelo principal) atua como ORQUESTRADOR: planeja,
  divide o trabalho e delega.
- Todo trabalho pesado (ler muitos arquivos, pesquisar,
  implementar) deve ser delegado ao subagente "executor".
- Dispare subagentes em paralelo quando as tarefas forem
  independentes.
- Voce so executa diretamente tarefas curtas de decisao
  ou revisao final.`;

const ADVISOR_CODE = `import anthropic

client = anthropic.Anthropic()

response = client.beta.messages.create(
    model="claude-sonnet-5",        # EXECUTOR: roda o loop, gera a maioria dos tokens
    max_tokens=16000,
    betas=["advisor-tool-2026-03-01"],
    tools=[
        {
            "type": "advisor_20260301",
            "name": "advisor",
            "model": "claude-fable-5"   # ADVISOR: consultado sob demanda
        },
        # ... suas outras tools aqui
    ],
    messages=[
        {"role": "user", "content": "Refatore o modulo de pagamentos..."}
    ],
)`;

const ORCHESTRATOR_CODE = `import anthropic

client = anthropic.Anthropic()

# 1. Crie o worker (executor barato, criado UMA vez e reutilizado)
worker = client.beta.agents.create(
    name="Worker",
    model="claude-sonnet-5",
    system="Voce executa subtarefas com precisao e devolve resumos curtos.",
    tools=[{"type": "agent_toolset_20260401"}],
)

# 2. Crie o orquestrador com o worker no roster
orquestrador = client.beta.agents.create(
    name="Orquestrador",
    model="claude-fable-5",
    system=(
        "Voce planeja e delega. Divida a tarefa em subtarefas "
        "independentes, distribua para os workers em paralelo "
        "e sintetize os resultados."
    ),
    tools=[{"type": "agent_toolset_20260401"}],
    multiagent={
        "type": "coordinator",
        "agents": [worker.id],   # pode gerar varias copias do worker
    },
)

# 3. Rode uma sessao (cada execucao referencia os agentes por ID)
session = client.beta.sessions.create(
    agent=orquestrador.id,
    environment_id=environment_id,
)`;

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#CC785C]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  );
}

function CodeBlock({ code, copyLabel }: { code: string; copyLabel: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <CopyButton text={code} label={copyLabel} />
      </div>
      <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4 overflow-x-auto">
        <pre className="text-[13px] text-[#ccc] font-mono leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
      <Icon className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
      {children}
    </h2>
  );
}

export default function OrquestradorPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (hasCapturedLead()) setUnlocked(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{
            color: ACCENT,
            backgroundColor: `${ACCENT}1A`,
            border: `1px solid ${ACCENT}33`,
          }}
        >
          <Network className="h-3.5 w-3.5" />
          Claude 5 na pratica
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Fable 5 Orquestrador +{" "}
          <span style={{ color: ACCENT }}>Sonnet 5 Executor</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          A Anthropic revelou como combinar os dois modelos do Claude 5 para
          ter quase toda a inteligencia do Fable 5 pagando metade do preco.
          Aqui voce entende o padrao e configura o seu em minutos.
        </p>
      </div>

      {/* O anuncio */}
      <section className="space-y-4">
        <SectionTitle icon={MessageSquareQuote}>
          O que a Anthropic anunciou
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Em julho de 2026 o perfil oficial @ClaudeDevs publicou uma thread
            que passou de 5 milhoes de visualizacoes mostrando os padroes de
            orquestracao que os proprios times da Anthropic usam com o Claude
            5. A logica e simples: o <strong className="text-white">Fable 5</strong>{" "}
            e o modelo mais inteligente da familia, mas custa{" "}
            <strong className="text-white">$10 de entrada e $50 de saida</strong>{" "}
            por milhao de tokens. O{" "}
            <strong className="text-white">Sonnet 5</strong> entrega quase o
            mesmo nivel em execucao de codigo e pesquisa, custando{" "}
            <strong className="text-white">$3 e $15</strong>.
          </p>
          <p>
            Em vez de escolher um ou outro, voce combina os dois: o Fable 5
            pensa, planeja e supervisiona. O Sonnet 5 executa o trabalho
            pesado, que e onde a grande massa de tokens e gasta. Resultado: a
            maior parte da conta e cobrada na tarifa do modelo barato, e a
            inteligencia do modelo caro entra so onde faz diferenca.
          </p>
        </div>

        {/* Numeros */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: ACCENT }}
            >
              BrowseComp (pesquisa web)
            </p>
            <p className="text-2xl font-bold text-white">
              96% da performance
            </p>
            <p className="text-sm text-[#888] leading-relaxed">
              a 46% do preco. Fable 5 orquestrando workers Sonnet 5 marcou
              86,8% de acuracia por $18,53 por problema. O Fable 5 sozinho:
              90,8% por $40,56.
            </p>
          </div>
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: ACCENT }}
            >
              SWE-bench Pro (codigo)
            </p>
            <p className="text-2xl font-bold text-white">
              ~92% do score
            </p>
            <p className="text-sm text-[#888] leading-relaxed">
              a ~63% do preco. Sonnet 5 executando com o Fable 5 como advisor,
              chamado cerca de 1 vez por tarefa apenas para dar direcao.
            </p>
          </div>
        </div>

        {/* Tabela benchmark */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2a2a2e]">
            <p className="text-sm font-semibold text-white">
              BrowseComp, custo por problema (dados da Anthropic)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#666] text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Configuracao</th>
                  <th className="px-5 py-3 font-medium">Acuracia</th>
                  <th className="px-5 py-3 font-medium">Custo</th>
                </tr>
              </thead>
              <tbody className="text-[#aaa]">
                <tr className="border-t border-[#2a2a2e]">
                  <td className="px-5 py-3">Tudo Sonnet 5</td>
                  <td className="px-5 py-3">77,8%</td>
                  <td className="px-5 py-3">$16,01</td>
                </tr>
                <tr
                  className="border-t border-[#2a2a2e]"
                  style={{ backgroundColor: `${ACCENT}0D` }}
                >
                  <td className="px-5 py-3 font-semibold text-white">
                    Fable 5 lead + Sonnet 5 workers
                  </td>
                  <td className="px-5 py-3 font-semibold text-white">86,8%</td>
                  <td className="px-5 py-3 font-semibold text-white">$18,53</td>
                </tr>
                <tr className="border-t border-[#2a2a2e]">
                  <td className="px-5 py-3">Tudo Fable 5</td>
                  <td className="px-5 py-3">90,8%</td>
                  <td className="px-5 py-3">$40,56</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Os dois padroes */}
      <section className="space-y-4">
        <SectionTitle icon={Workflow}>Os dois padroes</SectionTitle>
        <div className="space-y-4">
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
            <p className="text-base font-semibold text-white">
              1. Orquestrador: o Fable 5 comanda
            </p>
            <p className="text-sm text-[#999] leading-relaxed">
              O Fable 5 roda o loop principal. Ele recebe a tarefa, monta o
              plano, quebra em subtarefas e dispara workers Sonnet 5 em
              paralelo (fan out). Cada worker executa a sua parte, devolve um
              resumo, e o Fable 5 sintetiza tudo. Como os workers e que
              queimam tokens lendo arquivos e pesquisando, a maior parte da
              conta sai na tarifa do Sonnet 5.
            </p>
            <div className="rounded-lg bg-[#0e0e10] border border-[#2a2a2e] p-4 overflow-x-auto">
              <pre className="text-xs text-[#888] font-mono leading-relaxed whitespace-pre">
{`  [Fable 5]  Orquestrador (planeja)
     |
     |  fan out
     |------------> [Sonnet 5]  Worker 1 (executa)
     |------------> [Sonnet 5]  Worker 2 (executa)
     |------------> [Sonnet 5]  Worker 3 (executa)
     |
  sintetiza os resultados e responde`}
              </pre>
            </div>
            <p className="text-xs text-[#666]">
              Melhor para: pesquisa profunda, auditorias, tarefas que se
              dividem em partes independentes.
            </p>
          </div>

          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
            <p className="text-base font-semibold text-white">
              2. Advisor: o Sonnet 5 executa e consulta
            </p>
            <p className="text-sm text-[#999] leading-relaxed">
              Aqui o barato roda o loop: o Sonnet 5 e o executor e trabalha em
              todos os turnos. O Fable 5 vira uma tool que o executor chama
              quando trava em algo dificil, tipicamente 1 vez por tarefa, so
              para receber direcao estrategica. Quase 100% dos tokens sao
              cobrados na tarifa do executor.
            </p>
            <div className="rounded-lg bg-[#0e0e10] border border-[#2a2a2e] p-4 overflow-x-auto">
              <pre className="text-xs text-[#888] font-mono leading-relaxed whitespace-pre">
{`  [Sonnet 5]  Executor (roda todo turno)
     |
     |  tool call (quando precisa)
     |------------> [Fable 5]  Advisor (sob demanda)
     |<------------ devolve orientacao
     |
  continua executando com a direcao certa`}
              </pre>
            </div>
            <p className="text-xs text-[#666]">
              Melhor para: agentes de codigo, pipelines de execucao continua,
              alto volume com custo controlado.
            </p>
          </div>
        </div>
      </section>

      {/* Por que importa */}
      <section className="space-y-4">
        <SectionTitle icon={TrendingDown}>
          Por que isso muda o jogo
        </SectionTitle>
        <div className="space-y-3 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Ate agora a conversa sobre modelos era binaria: ou voce paga caro
            pelo topo de linha, ou aceita um modelo mediano para economizar. A
            orquestracao multi-modelo quebra essa escolha. Voce monta um
            sistema onde cada token e gasto no modelo certo para aquele
            momento, igual a uma equipe de verdade: o arquiteto senior nao
            escreve todo o codigo, ele revisa e direciona quem executa.
          </p>
          <p>
            E o mais importante: isso nao e teoria de paper. E o padrao que a
            propria Anthropic documentou, testou em benchmark publico e usa
            internamente. Quem trabalha com agentes de IA (ou vende projetos
            construidos com eles) e ignora isso esta literalmente pagando o
            dobro pelo mesmo resultado.
          </p>
        </div>
      </section>

      {/* Gate */}
      {!unlocked ? (
        <LeadGate
          source="orquestrador-page"
          accent={ACCENT}
          title="Desbloqueie o passo a passo completo"
          description="Insira seus dados para liberar a configuracao do padrao Orquestrador + Executor no Claude Code e na API, com os arquivos prontos para copiar."
          contentNote="Voce vai liberar: subagente executor pronto, instrucoes de orquestracao para o CLAUDE.md, codigo do padrao Advisor e do padrao Orquestrador na API."
          buttonLabel="Liberar passo a passo"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          {/* Passo a passo: Claude Code */}
          <section className="space-y-5">
            <SectionTitle icon={Terminal}>
              Passo a passo no Claude Code
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              No Claude Code o padrao Orquestrador ja e nativo: o modelo
              principal da sessao delega para subagentes, e cada subagente
              pode rodar em um modelo diferente. Voce so precisa configurar.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  Passo 1: coloque o Fable 5 no comando
                </p>
                <p className="text-sm text-[#999] leading-relaxed">
                  Dentro do Claude Code, rode <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">/model</code>{" "}
                  e selecione o Fable 5 como modelo da sessao. Ele sera o
                  orquestrador: planeja, decide e supervisiona. Se preferir,
                  inicie direto do terminal com{" "}
                  <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">
                    claude --model claude-fable-5
                  </code>
                </p>
              </div>

              <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  Passo 2: crie o subagente executor em Sonnet 5
                </p>
                <p className="text-sm text-[#999] leading-relaxed">
                  Crie o arquivo{" "}
                  <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">
                    .claude/agents/executor.md
                  </code>{" "}
                  no seu projeto. O campo{" "}
                  <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">
                    model: sonnet
                  </code>{" "}
                  no frontmatter garante que todo trabalho delegado a ele
                  rode no Sonnet 5, na tarifa barata:
                </p>
                <CodeBlock code={SUBAGENT_MD} copyLabel="Copiar subagente" />
              </div>

              <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  Passo 3: ensine o orquestrador a delegar
                </p>
                <p className="text-sm text-[#999] leading-relaxed">
                  Adicione ao{" "}
                  <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">
                    CLAUDE.md
                  </code>{" "}
                  do projeto uma regra de delegacao. Sem isso o orquestrador
                  tende a fazer tudo sozinho (e ai voce paga tarifa de Fable 5
                  em trabalho de worker):
                </p>
                <CodeBlock
                  code={CLAUDE_MD_SNIPPET}
                  copyLabel="Copiar instrucoes"
                />
              </div>

              <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  Passo 4: use e acompanhe
                </p>
                <p className="text-sm text-[#999] leading-relaxed">
                  Peca uma tarefa grande normalmente ("audite a seguranca
                  desse projeto", "pesquise e compare essas 5 bibliotecas").
                  Voce vai ver o Fable 5 montar o plano e despachar os
                  executores em paralelo. Cada subagente roda com contexto
                  proprio, entao o orquestrador recebe so os resumos e o seu
                  contexto principal fica limpo. Custo baixo, velocidade alta
                  e o cerebro caro focado no que importa.
                </p>
              </div>
            </div>
          </section>

          {/* Passo a passo: API */}
          <section className="space-y-5">
            <SectionTitle icon={Code2}>
              Passo a passo na API (para quem constroi produto)
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Se voce esta construindo um agente proprio, os dois padroes
              tambem existem na API da Anthropic. Os exemplos abaixo usam o
              SDK Python, mas o formato e o mesmo em TypeScript.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  Padrao Advisor: uma tool na sua request (beta)
                </p>
                <p className="text-sm text-[#999] leading-relaxed">
                  O executor e o modelo da request. O advisor e declarado como
                  tool do tipo{" "}
                  <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">
                    advisor_20260301
                  </code>
                  , e o proprio modelo decide quando consultar. Requer o
                  header beta{" "}
                  <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">
                    advisor-tool-2026-03-01
                  </code>
                  :
                </p>
                <CodeBlock code={ADVISOR_CODE} copyLabel="Copiar codigo" />
              </div>

              <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  Padrao Orquestrador: Managed Agents multiagente (beta)
                </p>
                <p className="text-sm text-[#999] leading-relaxed">
                  Nos Claude Managed Agents, voce cria o worker e o
                  orquestrador como agentes persistentes e liga os dois pelo
                  campo{" "}
                  <code className="text-[#ccc] bg-[#0e0e10] px-1.5 py-0.5 rounded text-xs">
                    multiagent
                  </code>
                  . O orquestrador pode disparar varias copias do worker em
                  paralelo, cada uma com seu proprio contexto:
                </p>
                <CodeBlock code={ORCHESTRATOR_CODE} copyLabel="Copiar codigo" />
                <p className="text-xs text-[#666] leading-relaxed">
                  Ambas as features estao em beta: a sintaxe pode evoluir.
                  Referencia oficial: platform.claude.com/docs (secoes Managed
                  Agents e Tool Use). O cookbook da Anthropic no GitHub tem os
                  exemplos completos dos benchmarks.
                </p>
              </div>
            </div>
          </section>

          {/* Dicas finais */}
          <section className="space-y-4">
            <SectionTitle icon={Lightbulb}>
              3 regras para nao errar
            </SectionTitle>
            <div className="space-y-3">
              {[
                {
                  title: "O caro decide, o barato executa",
                  text: "Nunca deixe o Fable 5 lendo 50 arquivos ou raspando paginas. Esse e trabalho de worker. O orquestrador deve receber resumos, nunca dados brutos.",
                },
                {
                  title: "Subtarefas independentes, sempre em paralelo",
                  text: "O ganho de velocidade vem do fan out. Se as subtarefas dependem uma da outra, repense a divisao antes de delegar em cadeia.",
                },
                {
                  title: "Comece pelo Advisor se o caso for codigo",
                  text: "Para agentes de programacao, o padrao Advisor e mais simples de adotar e ja entrega ~92% do resultado. O Orquestrador brilha em pesquisa e tarefas amplas.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#999] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="orquestrador" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
