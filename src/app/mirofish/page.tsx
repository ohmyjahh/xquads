"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Network,
  Users,
  Sparkles,
  FileText,
  MessagesSquare,
  Terminal,
  Bot,
  AlertTriangle,
  ArrowUpRight,
  Github,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#38BDF8";
const REPO = "https://github.com/666ghj/MiroFish";
const DEMO = "https://666ghj.github.io/mirofish-demo/";

const RECURSOS = [
  {
    icone: Network,
    nome: "Monta um mundo paralelo",
    texto:
      "Você entrega material de origem (uma notícia, um relatório, um rascunho de política) e ele extrai as informações e constrói um grafo de relações com os personagens envolvidos.",
  },
  {
    icone: Users,
    nome: "Milhares de agentes com personalidade",
    texto:
      "Cada agente tem memória longa, jeito de agir e história própria. Eles conversam entre si e evoluem socialmente dentro da simulação.",
  },
  {
    icone: Sparkles,
    nome: "Você mexe nas variáveis",
    texto:
      "Do ponto de vista de quem observa de cima, dá para injetar acontecimentos e ver como o cenário reage, rodada após rodada.",
  },
  {
    icone: FileText,
    nome: "Devolve relatório e mundo interativo",
    texto:
      "No fim sobra um relatório detalhado da previsão e o próprio mundo simulado, aberto para você explorar e continuar mexendo.",
  },
  {
    icone: MessagesSquare,
    nome: "Conversa com os agentes",
    texto:
      "Dá para perguntar para qualquer personagem da simulação e para o agente que escreve o relatório, tudo dentro do ambiente.",
  },
  {
    icone: Bot,
    nome: "Motor aberto",
    texto:
      "O projeto é aberto no GitHub, usa o motor de simulação OASIS (do time CAMEL-AI) e tem apoio da Shanda Group.",
  },
];

const REQUISITOS = [
  "Não é um programa com instalador: você baixa o código e roda no terminal.",
  "Precisa de Node.js 18 ou mais novo, Python 3.11 ou 3.12 e do gerenciador uv instalado.",
  "Precisa de uma chave de API de modelo de linguagem. O projeto sugere o Qwen-plus, da Alibaba, e avisa que o consumo é alto: comece com simulações de menos de 40 rodadas.",
  "Precisa também de uma conta no Zep Cloud, que guarda a memória dos agentes. Tem cota grátis mensal que o projeto diz bastar para uso simples.",
  "A documentação está em inglês, com versão em chinês.",
  "Tudo roda na sua máquina: o site abre em localhost:3000 e a API em localhost:5001.",
];

const PASSOS = [
  {
    n: "1",
    titulo: "Instale os pré-requisitos",
    texto:
      "Node.js 18 ou mais novo, Python entre 3.11 e 3.12 e o uv. Confira com node -v, python --version e uv --version antes de seguir.",
  },
  {
    n: "2",
    titulo: "Baixe o projeto",
    texto: "Clone o repositório e entre na pasta do MiroFish.",
    comando: "git clone https://github.com/666ghj/MiroFish.git\ncd MiroFish",
  },
  {
    n: "3",
    titulo: "Preencha as chaves",
    texto:
      "Copie o arquivo de exemplo e edite o .env com a chave do modelo de linguagem (mais o endereço e o nome do modelo) e a chave do Zep Cloud.",
    comando: "cp .env.example .env",
    extra: [
      "LLM_API_KEY: a sua chave do provedor de modelo.",
      "LLM_BASE_URL: https://dashscope.aliyuncs.com/compatible-mode/v1 se for usar o Qwen-plus pela Alibaba.",
      "LLM_MODEL_NAME: qwen-plus, no mesmo caso.",
      "ZEP_API_KEY: a chave do Zep Cloud.",
    ],
  },
  {
    n: "4",
    titulo: "Instale as dependências",
    texto:
      "Um comando instala tudo: raiz, frontend e backend (ele cria o ambiente Python sozinho).",
    comando: "npm run setup:all",
  },
  {
    n: "5",
    titulo: "Suba o projeto",
    texto:
      "Sobe frontend e backend juntos. Se preferir separar, use npm run frontend e npm run backend em terminais diferentes.",
    comando: "npm run dev",
  },
  {
    n: "6",
    titulo: "Abra e simule",
    texto:
      "Acesse http://localhost:3000, envie o material semente, descreva em linguagem natural o que quer prever e acompanhe a simulação até o relatório.",
  },
];

const AVISO_USO = [
  "O custo do modelo de linguagem é por uso. Uma simulação longa pode sair cara, então comece com menos de 40 rodadas e material pequeno.",
  "A qualidade da previsão depende do material que você envia.",
  "É um projeto de código aberto. Se der erro, procure nas issues do repositório ou no Discord do projeto.",
];

function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");

  async function copiar() {
    try {
      await navigator.clipboard.writeText(text);
      setState("ok");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={copiar}
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
        style={{ borderColor: `${ACCENT}66`, color: ACCENT }}
      >
        <Copy className="h-3.5 w-3.5" />
        {state === "ok" ? "Copiado" : state === "error" ? "Não copiou, selecione o texto" : "Copiar comando"}
      </button>
    </div>
  );
}

export default function MiroFishPage() {
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
          <Network className="h-4 w-4" />
          Projeto aberto · simulação com milhares de agentes
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O MiroFish monta um mundo paralelo{" "}
          <span style={{ color: ACCENT }}>e simula o futuro dentro dele</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          É um motor de previsão com vários agentes de IA. Você envia material do mundo real,
          descreve o que quer prever e ele cria um cenário com milhares de personagens que
          conversam, se organizam e evoluem. No fim, devolve um relatório e o mundo simulado
          aberto para você explorar.
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

      {!unlocked ? (
        <LeadGate
          source="mirofish-page"
          accent={ACCENT}
          buttonTextColor="#082f49"
          title="Receba o passo a passo e o link do repositório"
          description="Preencha seus dados para liberar os 6 passos da instalação, o link do GitHub e o da demonstração oficial."
          contentNote="Você vai liberar: o passo a passo completo (inclusive a opção com Docker), o link do repositório no GitHub e o link da demonstração pronta."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section
            className="rounded-xl border p-5"
            style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}
          >
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Antes de instalar: o que você vai precisar
            </h2>
            <ul className="mt-3 space-y-2">
              {REQUISITOS.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Passo a passo para rodar</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Caminho recomendado pelo projeto: rodar a partir do código. São seis passos, todos
              no terminal.
            </p>
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
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="text-sm leading-relaxed text-[#999]">{p.texto}</p>
                  {p.extra && (
                    <ul className="space-y-1">
                      {p.extra.map((e) => (
                        <li key={e} className="flex min-w-0 gap-2 text-sm leading-relaxed text-[#bbb]">
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: ACCENT }}
                          />
                          <span className="min-w-0 break-words">{e}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.comando && (
                    <div className="space-y-2">
                      <pre className="overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#121214] p-3 text-xs leading-relaxed text-[#ddd]">
                        <code>{p.comando}</code>
                      </pre>
                      <CopyButton text={p.comando} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Terminal className="h-4 w-4" style={{ color: ACCENT }} />
              Opção com Docker
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Se você já usa Docker, faça os passos 2 e 3 (baixar o projeto e preencher o .env) e
              rode o comando abaixo no lugar dos passos 4 e 5. Ele baixa a imagem pronta e sobe os
              dois serviços nas portas 3000 (site) e 5001 (API).
            </p>
            <div className="mt-3 space-y-2">
              <pre className="overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#121214] p-3 text-xs leading-relaxed text-[#ddd]">
                <code>docker compose up -d</code>
              </pre>
              <CopyButton text="docker compose up -d" />
            </div>
          </section>

          <section
            className="rounded-xl border p-5"
            style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}
          >
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Três coisas antes de gastar crédito
            </h2>
            <ul className="mt-3 space-y-2">
              {AVISO_USO.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="space-y-3">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT, color: "#082f49", boxShadow: `0 10px 36px ${ACCENT}40` }}
            >
              <Github className="h-5 w-5 shrink-0" />
              Abrir o repositório no GitHub
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </a>
            <a
              href={DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] px-6 py-4 text-sm font-semibold text-[#bbb] transition-colors hover:text-white"
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              Ver a demonstração pronta, sem instalar nada
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
            <p className="text-center text-xs text-[#777]">
              github.com/666ghj/MiroFish · conferido em 6 de novembro de 2026
            </p>
          </div>
        </div>
      )}

      <SalesCta utmContent="mirofish" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
