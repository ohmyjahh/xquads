"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Server,
  Download,
  GraduationCap,
  UsersRound,
  Zap,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FACC15";
const REPO = "https://github.com/NousResearch/hermes-agent";
const DOC_MSG = "https://hermes-agent.nousresearch.com/docs/user-guide/messaging";

const PASSOS = [
  { n: 1, icone: Server, titulo: "Encontre uma casa para o seu agente" },
  { n: 2, icone: Download, titulo: "Instale o Hermes" },
  { n: 3, icone: GraduationCap, titulo: "Ensine o que você faz" },
  { n: 4, icone: UsersRound, titulo: "Crie os seus agentes" },
  { n: 5, icone: Zap, titulo: "Automatize suas tarefas" },
];

const CASAS = [
  {
    titulo: "O computador que você já tem",
    texto: "Serve para testar hoje. O agente só existe enquanto a máquina estiver ligada e acordada.",
    tag: "Grátis",
  },
  {
    titulo: "Uma VPS",
    texto: "Um computador alugado que nunca desliga. É a escolha de quem quer o agente respondendo às 3 da manhã.",
    tag: "Recomendado",
  },
  {
    titulo: "Um Raspberry Pi",
    texto: "Fica na sua casa, gasta pouca energia e não tem mensalidade. Exige mais paciência para configurar.",
    tag: "Alternativa",
  },
];

const AVISOS = [
  {
    titulo: "A instalação roda um script da internet",
    texto: "A linha com curl baixa um arquivo e executa na sua máquina com as suas permissões. É como o projeto distribui, e vale saber o que a linha faz antes de colar.",
  },
  {
    titulo: "O WhatsApp tem dois caminhos, e um deles é por fora",
    texto: "O adapter Baileys conecta pelo WhatsApp Web, fora da API oficial da Meta. Ponte não oficial é risco para o número. Existe também o Cloud API, que é o caminho oficial. Para testar, use um chip separado.",
  },
  {
    titulo: "Ele lê e responde sozinho",
    texto: "Agente autônomo com acesso às suas mensagens vai ler o que chega e responder sem perguntar. Comece com poucas pessoas liberadas.",
  },
];

const BLOCOS: { passo: number; titulo: string; texto: string; cmd?: string; nota?: string }[] = [
  {
    passo: 2,
    titulo: "Instalar",
    texto: "Linux, macOS, WSL2 ou Termux no Android. Precisa de Python 3.11 ou mais novo.",
    cmd: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash",
  },
  {
    passo: 2,
    titulo: "Instalar no Windows",
    texto: "No PowerShell, sem WSL. O suporte nativo ainda está em beta.",
    cmd: "iex (irm https://hermes-agent.nousresearch.com/install.ps1)",
  },
  {
    passo: 2,
    titulo: "Abrir pela primeira vez",
    texto: "Recarrega o terminal e inicia a conversa com o agente.",
    cmd: "source ~/.bashrc\nhermes",
    nota: "Se você usa zsh, troque por source ~/.zshrc",
  },
  {
    passo: 2,
    titulo: "Configurar",
    texto: "O assistente pergunta o essencial. Depois você escolhe o provedor de modelo e quais ferramentas ficam ativas.",
    cmd: "hermes setup\nhermes model\nhermes tools",
  },
  {
    passo: 2,
    titulo: "Ligar o gateway e conectar o WhatsApp",
    texto: "O gateway é o processo que liga o agente aos canais de mensagem. No setup você escolhe entre o adapter Baileys e o Cloud API oficial.",
    cmd: "hermes gateway setup\nhermes gateway start",
    nota: "A documentação oficial não detalha o pareamento inicial do WhatsApp. Siga o que o próprio hermes gateway setup pedir na tela e confira a doc de mensageria.",
  },
  {
    passo: 2,
    titulo: "Liberar quem pode falar com ele",
    texto: "Quem manda mensagem pela primeira vez recebe um código. Você aprova pelo terminal. Sem isso, o agente não responde a estranhos.",
    cmd: "hermes pairing approve whatsapp XKGH5N7P",
    nota: "Troque XKGH5N7P pelo código que aparecer para você.",
  },
];

export default function TimeDeAgentesPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copiado, setCopiado] = useState("");

  const storedLead = useSyncExternalStore(
    () => () => {},
    () => hasCapturedLead(),
    () => false
  );
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const copiar = async (chave: string, texto: string) => {
    const legado = () => {
      const campo = document.createElement("textarea");
      campo.value = texto;
      campo.setAttribute("readonly", "");
      campo.style.position = "fixed";
      campo.style.opacity = "0";
      document.body.appendChild(campo);
      campo.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(campo);
      return ok;
    };

    let ok = false;
    try {
      if (!navigator.clipboard) throw new Error("indisponível");
      await navigator.clipboard.writeText(texto);
      ok = true;
    } catch {
      ok = legado();
    }
    if (!ok) {
      setCopiado("erro");
      setTimeout(() => setCopiado(""), 5000);
      return;
    }
    setCopiado(chave);
    setTimeout(() => setCopiado(""), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, os comandos ficam protegidos.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <UsersRound className="h-4 w-4" />
          Passo a passo
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Monte seu time de <span style={{ color: ACCENT }}>agentes autônomos</span> em 5 passos
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Um agente que mora num servidor seu, aprende como você trabalha e atende no seu WhatsApp.
          Open source, com os comandos oficiais conferidos um a um.
        </p>
      </header>

      <section className="space-y-2">
        {PASSOS.map((p) => (
          <div
            key={p.n}
            className="flex items-center gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] px-5 py-4"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
            >
              {p.n}
            </span>
            <p.icone className="h-4 w-4 shrink-0 text-[#666]" />
            <p className="font-medium">{p.titulo}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <p
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: ACCENT }}
          >
            Passo 1
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Encontre uma casa para o seu agente
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#999]">
            Agente autônomo não vive no navegador. Ele precisa de uma máquina ligada para continuar
            trabalhando enquanto você dorme. Essa é a única decisão do passo 1, e ela define se o
            seu time trabalha 8 horas ou 24.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {CASAS.map((c) => (
            <article
              key={c.titulo}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
            >
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {c.tag}
              </span>
              <h3 className="mt-3 font-semibold">{c.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{c.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <ShieldAlert className="h-5 w-5" style={{ color: ACCENT }} />
          Leia antes de começar
        </h2>
        {AVISOS.map((a) => (
          <article
            key={a.titulo}
            className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
          >
            <h3 className="font-semibold">{a.titulo}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">{a.texto}</p>
          </article>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="timedeagentes-page"
          accent={ACCENT}
          buttonTextColor="#2a2000"
          title="Receba os passos 2 a 5"
          description="Preencha seus dados para liberar os comandos de instalação, a conexão com o WhatsApp e o resto do caminho."
          contentNote="Você vai liberar: os comandos oficiais do Hermes, como conectar o WhatsApp com aprovação de contato, e como transformar o que você faz em habilidade do agente."
          buttonLabel="Liberar os comandos"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-10">
          <section className="space-y-4">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Passo 2
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Instale o Hermes</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#999]">
                O Hermes Agent é da Nous Research, open source com licença MIT, escrito em Python.
                Os comandos abaixo saíram do repositório oficial, conferidos em setembro de 2026.
              </p>
            </div>
            {BLOCOS.filter((b) => b.passo === 2).map((b) => (
              <article
                key={b.titulo}
                className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{b.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#999]">{b.texto}</p>
                  </div>
                  {b.cmd && (
                    <button
                      onClick={() => copiar(b.titulo, b.cmd as string)}
                      className="shrink-0 rounded-md border px-3 py-1.5 text-xs transition-opacity hover:opacity-80 cursor-pointer"
                      style={{
                        borderColor: `${ACCENT}33`,
                        backgroundColor: `${ACCENT}0D`,
                        color: ACCENT,
                      }}
                    >
                      {copiado === b.titulo ? (
                        <>
                          <Check className="inline h-3.5 w-3.5" /> Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="inline h-3.5 w-3.5" /> Copiar
                        </>
                      )}
                    </button>
                  )}
                </div>
                {b.cmd && (
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-4 text-[13px] font-mono text-[#ccc] select-all">
                    {b.cmd}
                  </pre>
                )}
                {b.nota && <p className="mt-2 text-xs text-[#777]">{b.nota}</p>}
              </article>
            ))}
            {copiado === "erro" && (
              <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
                Seu navegador bloqueou a cópia. Selecione o comando e copie com Ctrl+C ou Cmd+C.
              </p>
            )}
          </section>

          <section className="space-y-3">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Passo 3
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Ensine o que você faz</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#999]">
              Aqui está a parte que diferencia o Hermes de um chatbot comum. Ele tem um ciclo de
              aprendizado: cria habilidades a partir do que vocês fazem juntos, melhora essas
              habilidades conforme usa, guarda o que aprendeu entre uma sessão e outra e consulta
              conversas antigas quando precisa.
            </p>
            <p className="text-sm leading-relaxed text-[#999]">
              Na prática o treino é conversa. Você conta como faz o orçamento, como responde um
              cliente parado, como monta a legenda do post. Ele vira habilidade. Quanto mais
              específico for o seu jeito, menos genérica fica a resposta dele.
            </p>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
              <h3 className="font-semibold">Ver o que ele já sabe</h3>
              <p className="mt-1 text-sm text-[#999]">
                Dentro da conversa com o agente, este comando lista as habilidades disponíveis.
              </p>
              <pre className="mt-3 rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-4 text-[13px] font-mono text-[#ccc] select-all">
                /skills
              </pre>
            </article>
          </section>

          <section className="space-y-3">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Passo 4
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Crie os seus agentes</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#999]">
              Time não é um agente fazendo tudo. É um por frente: um que cuida do atendimento, um
              que organiza a agenda, um que escreve. No Hermes isso acontece de duas formas. A
              primeira é por habilidade: cada rotina que você ensinou no passo 3 vira uma
              especialidade que ele aciona sozinho quando o assunto aparece.
            </p>
            <p className="text-sm leading-relaxed text-[#999]">
              A segunda é por subagente. O projeto descreve a capacidade de abrir subagentes
              isolados para trabalhos em paralelo, mas a documentação atual não publica a sintaxe
              desses comandos. Em vez de chutar, prefiro te mandar para a fonte: confira no
              repositório, que é onde isso vai aparecer primeiro.
            </p>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border p-5 transition-opacity hover:opacity-90"
              style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
            >
              <div className="min-w-0">
                <p className="font-semibold" style={{ color: ACCENT }}>
                  Repositório oficial do Hermes Agent
                </p>
                <p className="mt-1 truncate text-sm text-[#999]">
                  github.com/NousResearch/hermes-agent
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
            </a>
          </section>

          <section className="space-y-3">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Passo 5
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Automatize suas tarefas</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#999]">
              Com o gateway no ar, o WhatsApp vira o seu painel. Você manda a tarefa por mensagem,
              de onde estiver, e ele executa no servidor. Sem abrir terminal, sem estar na frente
              do computador.
            </p>
            <p className="text-sm leading-relaxed text-[#999]">
              Comece por uma rotina chata e de baixo risco, do tipo que você faria em dez minutos e
              não teria prejuízo se saísse torto. Confira o resultado por uns dias. Só depois passe
              o que fala com cliente. A ordem importa: agente que erra cedo numa tarefa pequena te
              ensina onde ele precisa de limite.
            </p>
            <a
              href={DOC_MSG}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5 transition-colors hover:border-[#FACC15]/40"
            >
              <div className="min-w-0">
                <p className="font-semibold">Documentação de mensageria</p>
                <p className="mt-1 text-sm text-[#999]">
                  Detalhe de cada canal, incluindo os dois adapters de WhatsApp.
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#555]" />
            </a>
          </section>
        </div>
      )}

      <SalesCta utmContent="timedeagentes" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
