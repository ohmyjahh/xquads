"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  Check,
  Copy,
  Lightbulb,
  ListChecks,
  PenLine,
  ScanSearch,
  Scale,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#4ADE80";

type Codigo = { cmd: string; pos: "início" | "fim"; desc: string };
type Grupo = { titulo: string; icon: React.ElementType; itens: Codigo[] };

const GRUPOS: Grupo[] = [
  {
    titulo: "Verdade e precisão",
    icon: BadgeCheck,
    itens: [
      { cmd: "/truth", pos: "início", desc: "A IA para de adivinhar e inventar. Só fala o que é verdade. Use quando não souber se a resposta é fato ou achismo." },
      { cmd: "/gaps", pos: "fim", desc: "Aponta tudo que você esqueceu de perguntar, mas deveria. Use quando o pedido parecer incompleto." },
      { cmd: "/sources", pos: "fim", desc: "Cita a fonte de cada afirmação. Use quando precisar checar de onde veio a informação." },
      { cmd: "/assumptions", pos: "fim", desc: "Lista as suposições que a IA fez pra te responder. Use pra ver o que ela deu como certo sem você pedir." },
      { cmd: "/confidence", pos: "fim", desc: "Diz o nível de confiança de cada parte da resposta. Use pra saber no que confiar e no que desconfiar." },
    ],
  },
  {
    titulo: "Pensamento crítico",
    icon: Scale,
    itens: [
      { cmd: "/pushback", pos: "fim", desc: "A IA para de concordar com tudo e contesta suas ideias de verdade. Use quando quiser teste de realidade, não um sim fácil." },
      { cmd: "/steelman", pos: "fim", desc: "Monta a versão mais forte do argumento contrário. Use pra testar se a sua tese aguenta." },
      { cmd: "/devil", pos: "fim", desc: "Assume o advogado do diabo. Use quando estiver confiante demais numa ideia." },
      { cmd: "/redteam", pos: "fim", desc: "Ataca o seu plano procurando tudo que pode dar errado. Use antes de uma decisão de risco." },
      { cmd: "/counter", pos: "fim", desc: "Traz o contra-argumento mais forte à sua posição. Use pra enxergar o outro lado." },
      { cmd: "/socratic", pos: "início", desc: "Em vez de responder, te faz as perguntas certas. Use quando quiser pensar junto e chegar sozinho." },
    ],
  },
  {
    titulo: "Planejamento e execução",
    icon: Target,
    itens: [
      { cmd: "/blueprint", pos: "fim", desc: "Devolve o plano completo, passo a passo, pra chegar num objetivo. Use quando tiver a meta mas não o caminho." },
      { cmd: "/roadmap", pos: "fim", desc: "Organiza em fases com marcos e prazos. Use pra planejar algo maior ao longo do tempo." },
      { cmd: "/steps", pos: "início", desc: "Transforma qualquer coisa em passos numerados. Use quando quiser um passo a passo direto." },
      { cmd: "/checklist", pos: "fim", desc: "Vira uma checklist acionável. Use quando for executar e não quiser esquecer nada." },
      { cmd: "/nextaction", pos: "fim", desc: "Diz só o próximo passo mais importante. Use quando estiver travado sem saber por onde começar." },
    ],
  },
  {
    titulo: "Análise e decisão",
    icon: ScanSearch,
    itens: [
      { cmd: "/rank", pos: "início", desc: "Compara todas as opções umas contra as outras e diz a melhor. Use quando tiver que decidir entre alternativas." },
      { cmd: "/tradeoffs", pos: "fim", desc: "Mostra os prós e contras de cada opção. Use quando a decisão envolver perde e ganha." },
      { cmd: "/swot", pos: "início", desc: "Monta forças, fraquezas, oportunidades e ameaças. Use pra avaliar uma ideia, produto ou negócio." },
      { cmd: "/pareto", pos: "fim", desc: "Aponta os 20% que trazem 80% do resultado. Use quando quiser focar no que realmente importa." },
      { cmd: "/premortem", pos: "fim", desc: "Imagina que o projeto fracassou e diz por quê. Use antes de começar, pra evitar o desastre." },
    ],
  },
  {
    titulo: "Escrita e reescrita",
    icon: PenLine,
    itens: [
      { cmd: "/pro", pos: "início", desc: "Reescreve em tom profissional. Use pra deixar um texto mais formal." },
      { cmd: "/casual", pos: "início", desc: "Reescreve num tom leve e humano. Use pra deixar mais informal e próximo." },
      { cmd: "/fix", pos: "início", desc: "Corrige gramática e clareza sem mudar o sentido. Use pra uma revisão rápida." },
      { cmd: "/human", pos: "início", desc: "Tira a cara de IA do texto. Use quando ficou robótico ou genérico demais." },
      { cmd: "/remix", pos: "início", desc: "Dá 5 variações do mesmo texto. Use quando quiser opções pra escolher." },
      { cmd: "/expand", pos: "início", desc: "Desenvolve e aprofunda o texto. Use quando ficou curto ou raso demais." },
      { cmd: "/shorten", pos: "início", desc: "Corta pela metade sem perder o essencial. Use quando ficou longo demais." },
      { cmd: "/hook", pos: "início", desc: "Cria ganchos de abertura fortes. Use pra começar um post, e-mail ou vídeo." },
    ],
  },
  {
    titulo: "Resumo e clareza",
    icon: BookOpen,
    itens: [
      { cmd: "/tldr", pos: "início", desc: "Resume em poucas linhas só o que importa. Use pra textos longos." },
      { cmd: "/eli5", pos: "início", desc: "Explica como se você tivesse 5 anos. Use quando o assunto for complexo." },
      { cmd: "/simplify", pos: "início", desc: "Reescreve em linguagem simples sem perder o sentido. Use pra descomplicar." },
      { cmd: "/keypoints", pos: "fim", desc: "Extrai só os pontos principais em tópicos. Use pra bater o olho e entender." },
      { cmd: "/firstprinciples", pos: "início", desc: "Explica do zero, pelos fundamentos. Use quando quiser entender de verdade, não decorar." },
      { cmd: "/analogy", pos: "fim", desc: "Explica com uma analogia do dia a dia. Use quando o conceito for abstrato." },
    ],
  },
  {
    titulo: "Aprofundar",
    icon: Lightbulb,
    itens: [
      { cmd: "/why5", pos: "fim", desc: "Pergunta por quê cinco vezes até achar a raiz. Use pra chegar na causa real de um problema." },
      { cmd: "/example", pos: "fim", desc: "Dá exemplos concretos do que explicou. Use quando a resposta ficou teórica demais." },
      { cmd: "/teach", pos: "início", desc: "Te ensina o assunto como um professor, com exercícios. Use pra aprender algo novo do zero." },
    ],
  },
];

const TOTAL = GRUPOS.reduce((n, g) => n + g.itens.length, 0);

function CmdRow({ item }: { item: Codigo }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-4 space-y-2">
      <div className="flex items-center gap-3">
        <code className="text-sm font-mono font-bold" style={{ color: ACCENT }}>
          {item.cmd}
        </code>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#666] border border-[#2a2a2e] rounded px-1.5 py-0.5">
          {item.pos === "início" ? "no início" : "no fim"}
        </span>
        <button
          onClick={handleCopy}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#121214] hover:border-[#4ADE80]/60 text-xs font-medium text-[#ccc] px-2.5 py-1 transition-colors cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copiar
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-[#999] leading-relaxed">{item.desc}</p>
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

export default function CodigosGptPage() {
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
            border: `1px solid ${ACCENT}55`,
          }}
        >
          <Terminal className="h-3.5 w-3.5" />
          Códigos secretos do ChatGPT
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {TOTAL} <span style={{ color: ACCENT }}>códigos secretos</span> do ChatGPT
          que colocam você à frente de 99%
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          São comandos curtos que você joga no prompt e mudam completamente a
          resposta da IA: fazem ela parar de inventar, montar planos, achar seus
          pontos cegos, comparar opções, reescrever e contestar as suas ideias.
          Copia, cola e usa.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Por que isso muda o jogo</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            A maioria das pessoas usa o ChatGPT no modo mais raso: pergunta e aceita
            a primeira resposta. Sem direção, a IA tende a concordar com você,
            arredondar a verdade e devolver o óbvio. Esses códigos tiram ela desse
            piloto automático e mandam ela responder do jeito que você precisa.
          </p>
          <p>
            Um detalhe honesto: o <code className="font-mono text-[#ccc]">/</code> não
            ativa nada escondido dentro do ChatGPT. Ele é um atalho, uma palavra que
            faz a IA entender rápido o papel, o formato e a profundidade que você
            quer. Simples assim, e funciona.
          </p>
        </div>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={ListChecks}>Como usar</SectionTitle>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            Copie o código e cole junto do seu pedido, na posição indicada em cada
            um: alguns vão <span className="font-semibold text-white">no início</span>{" "}
            do prompt, outros <span className="font-semibold text-white">no fim</span>.
          </p>
          <p>
            Dá pra combinar mais de um no mesmo pedido (ex:{" "}
            <code className="font-mono text-[#ccc]">/truth</code> no início e{" "}
            <code className="font-mono text-[#ccc]">/gaps</code> no fim). Se a IA
            ignorar, é porque o prompt ficou longo ou confuso demais: deixe o pedido
            mais direto e o código pega.
          </p>
        </div>
      </section>

      {/* Gate + codigos */}
      {!unlocked ? (
        <LeadGate
          source="codigosgpt-page"
          accent={ACCENT}
          buttonTextColor="#052e16"
          title={`Libere os ${TOTAL} códigos secretos`}
          description="Insira seus dados para desbloquear a lista completa de códigos, organizada por categoria."
          contentNote={`Você vai liberar os ${TOTAL} códigos separados em 7 categorias: verdade, pensamento crítico, planejamento, decisão, escrita, resumo e aprofundamento. Todos prontos pra copiar.`}
          buttonLabel="Liberar os códigos"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <div className="space-y-10">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <ListChecks className="h-4 w-4" />
            {TOTAL} códigos liberados. Copie e use no ChatGPT.
          </div>
          {GRUPOS.map((grupo) => (
            <section key={grupo.titulo} className="space-y-4">
              <SectionTitle icon={grupo.icon}>{grupo.titulo}</SectionTitle>
              <div className="space-y-3">
                {grupo.itens.map((item) => (
                  <CmdRow key={item.cmd} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* CTA */}
      <SalesCta utmContent="codigosgpt" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
