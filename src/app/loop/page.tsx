"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  Lock,
  Repeat,
  Infinity as InfinityIcon,
} from "lucide-react";
import { hasCapturedLead, markLeadCaptured } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const PROMPT_SPEC = `Crie uma skill no Claude Code chamada "spec".

Quando eu executar /spec, entreviste-me sobre o recurso ou aplicativo que quero construir. Faça uma pergunta específica por vez até entender completamente o objetivo, os requisitos indispensáveis, as restrições e o que significa "concluído". Não comece a construir.

Quando tiver informações suficientes, escreva uma especificação clara e detalhada e salve-a em specs/<nome>.md. A especificação deve incluir: o objetivo, os requisitos exatos, os casos extremos a serem tratados e uma definição concreta de "concluído" para que alguém possa verificar a construção.`;

const PROMPT_BUILD = `Crie uma skill no Claude Code chamada "build".

Ao executar o comando /build, leia a especificação em specs/<nome>.md e construa exatamente o que ela descreve. Não adicione funcionalidades, não refatore código irrelevante e não invente requisitos que não estejam na especificação. Ao concluir, liste os requisitos da especificação que você atendeu para que a etapa de revisão possa verificá-los.`;

const PROMPT_REVIEW = `Crie uma skill no Claude Code chamada "review".

Ao executar /review, compare a build atual com o arquivo specs/<nome>.md. Analise requisito por requisito e liste todas as lacunas, bugs ou itens faltantes, especificando o item exato da especificação em que cada um falha. Se algo falhar, escreva as correções específicas necessárias e as retorne para que /build possa implementá-las. A build só deve ser aprovada quando todos os requisitos da especificação forem totalmente atendidos.`;

const PROMPT_RUN_LOOP = `Execute os comandos /build e /review: construa a partir da especificação, revise a construção em relação à especificação, corrija quaisquer falhas e repita até que a revisão seja aprovada sem problemas. Continue por conta própria até que seja aprovada.`;

const PROMPT_PLAN_OPTIMIZER = `curl -fsSL https://seangeng.com/plan-optimizer-skill.zip -o /tmp/plan-optimizer-skill.zip && unzip -o /tmp/plan-optimizer-skill.zip -d ~/.claude/skills/ && rm /tmp/plan-optimizer-skill.zip`;

const PROMPT_ONE_PARAGRAPH = `Após terminar, avalie seu próprio trabalho de 0 a 100 usando uma rubrica clara que você deverá elaborar previamente. Liste os pontos mais fracos e explique por que eles resultaram em perda de pontos. Reescreva o texto corrigindo os principais pontos fracos, mantendo os aspectos que obtiveram boa pontuação. Repita o processo até que a pontuação pare de melhorar significativamente. Em seguida, apresente a melhor versão e a trajetória da pontuação.`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-[#EA8049] uppercase tracking-[0.2em]">
      {children}
    </p>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-[#EA8049] hover:bg-[#c5603a] text-white text-xs font-medium px-3 py-1.5 transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar
          </>
        )}
      </button>
      <pre className="text-[13px] text-[#ccc] whitespace-pre-wrap font-mono leading-relaxed pt-8 sm:pt-0 sm:pr-24">
        {code}
      </pre>
    </div>
  );
}

function LeadGate({ onUnlock }: { onUnlock: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${base}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, downloadName: "loop-page" }),
      });

      if (!res.ok) throw new Error("Erro ao salvar dados");

      markLeadCaptured();
      onUnlock();
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#EA8049]/30 bg-gradient-to-br from-[#EA8049]/10 via-[#1a1a1e] to-[#1a1a1e] p-6 sm:p-10 text-center space-y-5">
      <Eyebrow>Desbloqueie a construção</Eyebrow>
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        Receba as 3 instruções
      </h2>
      <p className="text-[15px] text-[#999] max-w-lg mx-auto leading-relaxed">
        Insira seus dados para desbloquear as três habilidades de copiar e
        colar, os passos para executar o loop e a habilidade em modo fácil.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 text-left">
        <input
          type="text"
          required
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#EA8049] transition-colors"
        />
        <input
          type="email"
          required
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#EA8049] transition-colors"
        />
        <input
          type="tel"
          required
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#EA8049] transition-colors"
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA8049] hover:bg-[#c5603a] text-white text-base font-semibold px-6 py-3.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Desbloqueando...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Desbloqueie o loop
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-[#555]">
        Sem spam. Seus dados não serão compartilhados com terceiros.
      </p>
      <p className="text-[13px] text-[#888] max-w-md mx-auto leading-relaxed">
        Conteúdo: instruções para{" "}
        <code className="font-mono text-[#EA8049]">/spec</code>,{" "}
        <code className="font-mono text-[#EA8049]">/build</code> e{" "}
        <code className="font-mono text-[#EA8049]">/review</code>, os passos
        para executar o loop e a habilidade gratuita de otimização de planos.
      </p>
    </div>
  );
}

export default function LoopPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (hasCapturedLead()) setUnlocked(true);
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    setJustUnlocked(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* ============ HERO ============ */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EA8049]/10 border border-[#EA8049]/20 px-4 py-1.5 text-xs font-medium text-[#EA8049]">
          <InfinityIcon className="h-3.5 w-3.5" />
          Claude Code · Loops
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Crie um loop que corrija{" "}
          <span className="text-[#EA8049]">o próprio trabalho</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Três pequenas habilidades transformam o Claude Code em um ciclo: ele
          especifica sua ideia, constrói, revisa a própria construção em
          relação à especificação e corrige as falhas até ser aprovada sem
          problemas. Veja abaixo os três comandos para copiar e colar.
        </p>
      </div>

      {/* Diagrama */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 sm:p-8">
        <p className="text-center text-[10px] font-semibold text-[#EA8049] uppercase tracking-[0.2em] mb-4">
          Repita até limpar
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-sm">
          <span className="rounded-lg border border-[#EA8049]/40 text-[#EA8049] px-3 py-1.5">
            /spec
          </span>
          <ArrowRight className="h-4 w-4 text-[#555]" />
          <span className="rounded-lg border border-[#3a3a3e] text-[#ccc] px-3 py-1.5">
            /build
          </span>
          <Repeat className="h-4 w-4 text-[#555]" />
          <span className="rounded-lg border border-[#3a3a3e] text-[#ccc] px-3 py-1.5">
            /review
          </span>
          <ArrowRight className="h-4 w-4 text-[#555]" />
          <span className="rounded-lg border border-[#3BA856]/40 text-[#3BA856] px-3 py-1.5">
            feito
          </span>
        </div>
      </div>

      {/* ============ O QUE É UM LOOP ============ */}
      <div className="space-y-4">
        <Eyebrow>Primeiro, o que é um loop?</Eyebrow>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Um prompt único é um palpite. Um loop é um sistema.
        </h2>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Um prompt é uma resposta única: você pergunta, o Claude responde e
            você aceita a resposta. Um{" "}
            <strong className="text-[#EA8049] font-semibold">loop</strong> é um
            ciclo: o modelo realiza o trabalho, avalia a própria saída em
            relação a um padrão, corrige as partes problemáticas e repete o
            processo até que esteja correto.
          </p>
          <p>
            Isso supera os comandos individuais porque avaliar e reescrever são
            ações diferentes. Forçar o Claude a criticar o próprio trabalho
            antes de reescrevê-lo transforma a edição às cegas em uma busca
            direcionada, com um objetivo claro. E como os modelos atuais
            conseguem rodar por horas sem travar, o ciclo continua sozinho até
            a tarefa ser concluída.
          </p>
        </div>
      </div>

      {/* ============ GATE ============ */}
      {!unlocked ? (
        <LeadGate onUnlock={handleUnlock} />
      ) : (
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 text-center space-y-2">
          <Eyebrow>Desbloqueie a construção</Eyebrow>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {justUnlocked ? "Acesso liberado!" : "Receba as 3 instruções"}
          </h2>
          <p className="text-sm font-semibold text-[#3BA856]">
            Desbloqueado. Tudo está abaixo 👇
          </p>
        </div>
      )}

      {/* ============ CONTEÚDO DESBLOQUEADO ============ */}
      {unlocked && (
        <>
          {/* Etapa 1 */}
          <div className="space-y-5">
            <Eyebrow>Etapa 1 · Instale as habilidades</Eyebrow>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Cole estes códigos no Claude Code.
            </h2>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Cada comando instala uma habilidade. Execute os três uma vez e
              você terá <code className="font-mono text-[#EA8049]">/spec</code>
              , <code className="font-mono text-[#EA8049]">/build</code> e{" "}
              <code className="font-mono text-[#EA8049]">/review</code>{" "}
              instalados.
            </p>

            {/* /spec */}
            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md bg-[#EA8049]/10 text-[#EA8049] text-xs font-mono font-bold px-2 py-1">
                    01
                  </span>
                  <span className="font-mono font-bold text-white">/spec</span>
                </div>
                <p className="text-xs text-[#666]">
                  Transforma sua ideia em um plano.
                </p>
              </div>
              <p className="text-sm text-[#999] leading-relaxed">
                Ele faz uma entrevista com você até compreender completamente o
                que você deseja, e então redige uma especificação detalhada
                para guiar a construção.
              </p>
              <CodeBlock code={PROMPT_SPEC} />
            </div>

            {/* /build */}
            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md bg-[#EA8049]/10 text-[#EA8049] text-xs font-mono font-bold px-2 py-1">
                    02
                  </span>
                  <span className="font-mono font-bold text-white">/build</span>
                </div>
                <p className="text-xs text-[#666]">
                  Constrói diretamente a partir da especificação.
                </p>
              </div>
              <p className="text-sm text-[#999] leading-relaxed">
                Lê a especificação e constrói exatamente o que está escrito.
                Sem recursos extras, sem escopo indefinido, sem palpites.
              </p>
              <CodeBlock code={PROMPT_BUILD} />
            </div>

            {/* /review */}
            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md bg-[#EA8049]/10 text-[#EA8049] text-xs font-mono font-bold px-2 py-1">
                    03
                  </span>
                  <span className="font-mono font-bold text-white">
                    /review
                  </span>
                </div>
                <p className="text-xs text-[#666]">
                  Avalia a construção e devolve as reprovações.
                </p>
              </div>
              <p className="text-sm text-[#999] leading-relaxed">
                Verifica a construção em relação à especificação linha por
                linha, lista todas as lacunas e envia as correções de volta
                para o /build.
              </p>
              <CodeBlock code={PROMPT_REVIEW} />
            </div>
          </div>

          {/* Passo 2 */}
          <div className="space-y-5">
            <Eyebrow>Passo 2 · Execute</Eyebrow>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Aponte o loop para a sua ideia.
            </h2>

            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 flex items-start gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EA8049]/10 text-[#EA8049] text-xs font-bold shrink-0">
                1
              </span>
              <p className="text-sm text-[#999] leading-relaxed">
                Execute o comando{" "}
                <code className="font-mono text-[#EA8049]">/spec</code> uma vez
                e responda às perguntas. Ele transformará sua ideia em uma
                especificação detalhada.
              </p>
            </div>

            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EA8049]/10 text-[#EA8049] text-xs font-bold shrink-0">
                  2
                </span>
                <p className="text-sm text-[#999] leading-relaxed">
                  Em seguida, cole isto para iniciar o loop:
                </p>
              </div>
              <CodeBlock code={PROMPT_RUN_LOOP} />
            </div>

            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 flex items-start gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EA8049]/10 text-[#EA8049] text-xs font-bold shrink-0">
                3
              </span>
              <p className="text-sm text-[#999] leading-relaxed">
                Deixe rodando: o Claude cria, revisa o próprio trabalho,
                corrige o que falha e repete o processo até que a revisão seja
                aprovada.
              </p>
            </div>
          </div>

          {/* Modo fácil */}
          <div className="space-y-5">
            <Eyebrow>Modo fácil</Eyebrow>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ou instale um loop que já vem configurado.
            </h2>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Quer sentir a sensação de um loop em 30 segundos? Instale a skill
              gratuita{" "}
              <code className="font-mono text-[#EA8049]">plan-optimizer</code>{" "}
              (ideia de @goodalexander, empacotada por @seangeng). Forneça
              qualquer plano a ela e ela o avaliará, criticará e reescreverá
              até que não seja mais possível melhorá-lo. Um único comando:
            </p>
            <CodeBlock code={PROMPT_PLAN_OPTIMIZER} />
          </div>

          {/* Sem instalação */}
          <div className="space-y-5">
            <Eyebrow>Sem instalação</Eyebrow>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              O loop de um parágrafo
            </h2>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Cole este código após qualquer tarefa e o Claude executará um
              loop com base na própria saída. Funciona com escrita,
              planejamento, código, qualquer coisa que exija um padrão de
              qualidade.
            </p>
            <CodeBlock code={PROMPT_ONE_PARAGRAPH} />
          </div>

          {/* Fechamento */}
          <div className="text-center space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Isso é um loop.
            </h2>
            <p className="text-[15px] text-[#aaa] max-w-md mx-auto leading-relaxed">
              Pare de ficar de babá de instruções. Crie um sistema que faça as
              instruções por você e deixe-o funcionar.
            </p>
          </div>
        </>
      )}

      {/* ============ CTA FINAL ============ */}
      <SalesCta utmContent="isca-loop" />

      {/* ============ FOOTER ============ */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span className="text-[#EA8049]">@rafa.grandi</span>
      </p>
    </div>
  );
}
