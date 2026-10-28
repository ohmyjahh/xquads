"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Users,
  MessagesSquare,
  FolderCog,
  Globe,
  ListOrdered,
  HardDrive,
  Laptop,
  Monitor,
  Terminal,
  Smartphone,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#C084FC";
const SITE = "https://openbot.run/";

const RECURSOS = [
  {
    icone: MessagesSquare,
    nome: "Eles conversam entre si",
    texto:
      "Um agente pede ajuda ao outro, passa a tarefa adiante e revisa o que o colega fez. Você acompanha a conversa como quem lê um grupo de trabalho.",
  },
  {
    icone: FolderCog,
    nome: "Cada um com a sua função",
    texto:
      "Todo agente tem nome, instruções próprias e a sua pasta. Você monta o time conforme o trabalho aparece.",
  },
  {
    icone: Globe,
    nome: "Navegador embutido",
    texto:
      "Os agentes abrem páginas, leem o que está lá e clicam nas coisas, dentro do próprio programa.",
  },
  {
    icone: ListOrdered,
    nome: "Fila de tarefas",
    texto:
      "Dá para mandar mais trabalho enquanto o agente está ocupado. As mensagens entram numa fila que você pausa, retoma ou cancela.",
  },
  {
    icone: HardDrive,
    nome: "Fica tudo na sua máquina",
    texto:
      "Conversas, arquivos e pastas de trabalho ficam no computador que roda o programa, não no servidor de quem fez.",
  },
  {
    icone: Users,
    nome: "Troca o motor, mantém o agente",
    texto:
      "Mudou de ideia sobre qual IA usar? O agente mantém a pasta e o histórico. Quando um plano bate o limite, ele pode passar para outro.",
  },
];

const PLATAFORMAS = [
  { icone: Laptop, nome: "Mac", req: "macOS 13 ou mais novo", nota: "Só em Mac com chip Apple (M1 em diante). Mac com Intel não roda." },
  { icone: Monitor, nome: "Windows", req: "Windows 10 ou mais novo", nota: "Versão 64 bits." },
  { icone: Terminal, nome: "Linux", req: "64 bits", nota: "Distribuído como AppImage." },
  { icone: Smartphone, nome: "Celular", req: "iPhone e Android", nota: "Os aplicativos conectam ao seu computador. Eles não rodam os agentes sozinhos." },
];

const PASSOS = [
  {
    n: "1",
    titulo: "Baixe e instale",
    texto:
      "No site, escolha o seu sistema e baixe. É um programa de computador comum: instala e abre, sem terminal e sem configuração de servidor.",
  },
  {
    n: "2",
    titulo: "Conecte a IA que você já paga",
    texto:
      "Na primeira abertura você escolhe de onde vem a inteligência: a sua assinatura do ChatGPT, do Claude, do Gemini ou do Grok. Quem prefere não depender de assinatura pode apontar para um modelo rodando na própria máquina.",
  },
  {
    n: "3",
    titulo: "Crie o primeiro agente",
    texto:
      "Dê um nome, escreva o que ele faz e aponte a pasta onde ele trabalha. Essas instruções são o que separa um agente útil de um que devolve resposta genérica — trate como a descrição da vaga.",
  },
  {
    n: "4",
    titulo: "Dê uma tarefa de verdade",
    texto:
      "Comece por algo que você faria à mão em meia hora e que dá para conferir no fim: organizar uma pasta, ler uns documentos e resumir, preencher uma planilha. Enquanto ele trabalha, você já pode deixar a próxima tarefa na fila.",
  },
  {
    n: "5",
    titulo: "Só então monte o time",
    texto:
      "Com um agente funcionando, crie o segundo com outra função e deixe que eles dividam o trabalho. É aqui que a coisa fica diferente de usar o chat: um faz, o outro confere.",
  },
];

export default function OpenBotPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o acesso fica protegido.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Users className="h-4 w-4" />
          O programa é de graça
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Um time de agentes de IA{" "}
          <span style={{ color: ACCENT }}>trabalhando dentro do seu computador</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Não é mais uma janela de chat. São vários agentes, cada um com a sua função, que
          conversam entre si, passam tarefa um para o outro e usam a assinatura de IA que você já
          paga.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que ele faz</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {RECURSOS.map((r) => (
            <article key={r.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <r.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {r.nome}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{r.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}
      >
        <h2 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
          <KeyRound className="h-5 w-5" />
          De graça, mas você traz a inteligência
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          O programa não cobra nada e não tem recurso trancado. Mas ele{" "}
          <strong className="text-white">não vem com a IA dentro</strong>: ele usa a assinatura
          que você já tem — ChatGPT, Claude, Gemini ou Grok — ou um modelo rodando na sua própria
          máquina.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#bbb]">
          Se você não tem nenhum plano pago nem modelo local, vai instalar e não vai conseguir
          usar. Vale conferir isso antes de baixar.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Onde ele roda</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PLATAFORMAS.map((p) => (
            <article key={p.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <p.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {p.nome}
              </h3>
              <p className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>
                {p.req}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.nota}</p>
            </article>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="openbot-page"
          accent={ACCENT}
          buttonTextColor="#2a0f3d"
          title="Receba o passo a passo"
          description="Preencha seus dados para liberar as cinco etapas e o link para instalar."
          contentNote="Você vai liberar: o passo a passo do primeiro agente até o time montado, e o link oficial para baixar."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como começar</h2>
            {PASSOS.map((p) => (
              <article
                key={p.n}
                className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold"
                  style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                >
                  {p.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
                </div>
              </article>
            ))}
          </section>

          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#2a0f3d", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Ir para o site e instalar
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-4 text-center text-xs text-[#777]">
            openbot.run · Mac, Windows e Linux na mesma página · conferido em 28 de outubro de 2026
          </p>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Um conselho antes de criar dez agentes</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              A vontade é montar o time inteiro na primeira noite. Comece com um, numa tarefa que
              você sabe conferir, e só cresça depois que ele entregar algo certo. Time grande de
              agentes mal instruídos gera trabalho em vez de tirar.
            </p>
          </section>
        </div>
      )}

      <SalesCta utmContent="openbot" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
