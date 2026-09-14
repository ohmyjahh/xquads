"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Cpu,
  Terminal,
  TriangleAlert,
  ArrowUpRight,
  Star,
  FolderTree,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#2DD4BF";
const REPO = "https://github.com/open-jarvis/OpenJarvis";

const PROMPT = `Instale o OpenJarvis completo a partir de https://github.com/open-jarvis/OpenJarvis, seguindo a documentação oficial do projeto para o meu sistema operacional.

Depois da instalação:

1. Confirme que subiu de verdade. Rode a verificação de saúde do projeto e me diga o que está ativo e o que ficou pendente. Não siga para o próximo passo com erro em aberto.

2. Leia meus projetos em [CAMINHO DA SUA PASTA DE PROJETOS] e faça um levantamento do que existe: nome, objetivo, estado atual, o que está em andamento e o que está parado.

3. Organize tudo numa estrutura de pastas que eu consiga navegar sozinho, com um índice na raiz apontando para cada projeto. Para cada projeto, crie um documento com o resumo, as decisões já tomadas, os próximos passos e os pendentes. Use os nomes que eu já uso, não invente nomenclatura nova.

4. Configure o dashboard do OpenJarvis para ler essa estrutura, de forma que eu abra e veja meus projetos e o que preciso fazer hoje.

5. Me entregue um relatório final: o que foi instalado, onde ficou cada coisa, o que você organizou, o que não conseguiu fazer e por quê.

Regras: não apague nem mova nada sem me perguntar antes, e trabalhe em cópia quando for reorganizar. Pergunte só o que você não conseguir descobrir sozinho lendo os arquivos.`;

const AVISOS = [
  {
    icone: Terminal,
    titulo: "Precisa de um agente com terminal",
    texto: "Claude Code, Codex ou Cursor. O prompt manda instalar programa e organizar pastas, coisa que o chat do navegador não faz.",
  },
  {
    icone: TriangleAlert,
    titulo: "A instalação roda um script da internet",
    texto: "É como o projeto distribui, e vale saber o que a linha faz antes de rodar. Instalador oficial, com licença Apache-2.0.",
  },
  {
    icone: FolderTree,
    titulo: "Ele vai ler suas pastas de trabalho",
    texto: "É o ponto do prompt. Por isso a última regra proíbe apagar ou mover arquivo sem perguntar. Comece apontando para uma pasta, não para o computador inteiro.",
  },
];

const ENTREGAS = [
  "Um índice na raiz apontando para cada projeto seu",
  "Um documento por projeto: resumo, decisões tomadas, próximos passos e pendências",
  "O dashboard lendo essa estrutura, com o que fazer hoje na frente",
  "Um relatório do que foi feito, do que ficou de fora e por quê",
];

export default function JarvisPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [falhou, setFalhou] = useState(false);

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const copiar = async () => {
    const legado = () => {
      const campo = document.createElement("textarea");
      campo.value = PROMPT;
      campo.setAttribute("readonly", "");
      campo.style.position = "fixed";
      campo.style.top = "0";
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
      if (!navigator.clipboard) throw new Error("clipboard indisponível");
      await navigator.clipboard.writeText(PROMPT);
      ok = true;
    } catch {
      ok = legado();
    }
    if (!ok) {
      setFalhou(true);
      setTimeout(() => setFalhou(false), 6000);
      return;
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o prompt fica protegido.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Cpu className="h-4 w-4" />
          IA que roda na sua máquina
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Monte o seu <span style={{ color: ACCENT }}>Jarvis</span> e deixe ele organizar seus
          projetos
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Um assistente pessoal que mora no seu computador, lê suas pastas de trabalho e devolve
          tudo organizado num painel. Sem mandar seus arquivos para servidor de ninguém.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">OpenJarvis</h2>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
          >
            <Star className="h-3 w-3" />
            9.724 estrelas
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">
            Apache-2.0
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#999]">
          Projeto aberto de IA pessoal que nasceu em Stanford, com artigo publicado e documentação
          própria. A ideia é simples: o modelo roda no seu computador por padrão e só recorre à
          nuvem quando precisa. Já vem com agentes prontos, do briefing falado da manhã à pesquisa
          com citações.
        </p>
        <p className="mt-3 text-xs text-[#666]">
          O instalador detecta o nível do seu hardware e ajusta sozinho. O modelo inicial é leve,
          cerca de 1,5 GB; modelos maiores ficam opcionais. Funciona em macOS, Linux, Windows e
          WSL2. Números do repositório conferidos em 14 de setembro de 2026.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Antes de começar</h2>
        <div className="space-y-2">
          {AVISOS.map((a) => (
            <article
              key={a.titulo}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
            >
              <a.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              <div className="min-w-0">
                <h3 className="font-semibold">{a.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{a.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que você recebe no fim</h2>
        {ENTREGAS.map((e) => (
          <p
            key={e}
            className="rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] px-4 py-3 text-sm leading-relaxed text-[#bbb]"
          >
            {e}
          </p>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="jarvis-page"
          accent={ACCENT}
          buttonTextColor="#04241f"
          title="Receba o prompt e o projeto"
          description="Preencha seus dados para liberar o prompt pronto e o link do repositório oficial."
          contentNote="Você vai liberar: o prompt completo em cinco passos, com as regras que impedem o agente de mexer nos seus arquivos sem permissão, mais o repositório."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: ACCENT }}
                >
                  Cole no seu agente
                </p>
                <h2 className="text-2xl font-bold tracking-tight">O prompt</h2>
              </div>
              <button
                onClick={copiar}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: ACCENT, color: "#04241f" }}
              >
                {copiado ? (
                  <>
                    <Check className="h-4 w-4" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copiar prompt
                  </>
                )}
              </button>
            </div>
            {falhou && (
              <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
                Seu navegador bloqueou a cópia. Selecione o texto abaixo e copie com Ctrl+C ou
                Cmd+C.
              </p>
            )}
            <pre className="max-h-[30rem] select-all overflow-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 text-[13px] leading-relaxed text-[#ccc] whitespace-pre-wrap font-mono">
              {PROMPT}
            </pre>
            <p className="text-sm leading-relaxed text-[#777]">
              Troque o trecho entre colchetes pelo caminho da sua pasta de projetos. É a única
              coisa que você precisa preencher.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-xl border p-5 transition-opacity hover:opacity-90"
            style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}14` }}
          >
            <div>
              <p className="font-semibold" style={{ color: ACCENT }}>
                Abrir o OpenJarvis no GitHub
              </p>
              <p className="mt-1 text-sm text-[#999]">
                github.com/open-jarvis/OpenJarvis · instalação e documentação
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          </a>
        </div>
      )}

      <SalesCta utmContent="jarvis" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
