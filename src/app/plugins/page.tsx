"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Database, Rocket, Brain, Users, Puzzle, Info } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#86EFAC";
const VENDAS_XQUADS =
  "https://www.raxo.com.br/vibecodingvsl?utm_source=xquads&utm_medium=pagina&utm_campaign=plugins";

const ITENS = [
  {
    icone: Database,
    nome: "Supabase",
    tipo: "plugin oficial",
    resolve: "O banco de dados do seu app. Com ele instalado, o agente cria tabela, escreve as regras de acesso e consulta os dados sem você sair do editor.",
    instalar: "No Claude Code, adicione o marketplace oficial da Anthropic e instale o plugin supabase. Depois rode /reload-plugins para ele acordar. Vem com o servidor MCP e as skills num pacote só. No Codex, o projeto oferece um instalador que detecta os agentes da máquina.",
  },
  {
    icone: Rocket,
    nome: "Vercel",
    tipo: "plugin oficial",
    resolve: "Botar no ar. Traz três agentes especialistas, um de arquitetura, um de deploy e um de performance, mais comandos para criar projeto, publicar, cuidar das variáveis de ambiente e ver o estado.",
    instalar: "No Claude Code: /plugin install vercel. Os comandos que entram são /bootstrap, /deploy, /env, /status e /marketplace. Atenção: hoje funciona no Claude Code e no Cursor; o suporte ao Codex está anunciado como futuro.",
  },
  {
    icone: Brain,
    nome: "claude-mem",
    tipo: "skill",
    resolve: "Memória entre sessões. Grava o que o agente fez, comprime e devolve o contexto relevante na conversa seguinte, então você para de reexplicar o projeto toda vez que abre o terminal.",
    instalar: "Funciona em Claude Code, Codex, Gemini, Copilot e outros. São quase 100 mil estrelas e licença Apache-2.0, com atualização no dia em que conferimos.",
  },
];

export default function PluginsPage() {
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
          PRÉVIA LOCAL · conteúdo aberto. Em produção, a instalação fica protegida.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Puzzle className="h-4 w-4" />
          Para quem programa com IA
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          As quatro extensões que mudam o{" "}
          <span style={{ color: ACCENT }}>seu vibe coding</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Banco de dados, publicação, memória entre sessões e um time de agentes. Cada uma resolve um
          pedaço que, sem ela, você faz na mão toda vez.
        </p>
      </header>

      <section
        className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
      >
        <p className="flex items-start gap-2 text-sm leading-relaxed text-[#999]">
          <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          <span>
            Duas são <strong>plugins</strong> e duas são <strong>skills</strong>. Plugin estende o
            programa; skill ensina o agente a fazer alguma coisa. Instalam de jeitos diferentes, e a
            página marca qual é qual.
          </span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que cada um resolve</h2>
        {ITENS.map((i, idx) => (
          <article
            key={i.nome}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
            >
              {idx + 1}
            </span>
            <div className="min-w-0">
              <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                <i.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {i.nome}
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-[#888]">
                  {i.tipo}
                </span>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{i.resolve}</p>
            </div>
          </article>
        ))}

        <article
          className="flex gap-4 rounded-xl border p-4"
          style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ backgroundColor: ACCENT, color: "#06240f" }}
          >
            4
          </span>
          <div className="min-w-0">
            <h3 className="flex flex-wrap items-center gap-2 font-semibold">
              <Users className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              Xquads
              <span
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
              >
                skill
              </span>
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#bbb]">
              Um time inteiro de agentes especialistas dentro do seu terminal: copy, tráfego, design,
              produto, dados, jurídico. Em vez de um assistente genérico, você chama quem entende do
              assunto.
            </p>
            <a
              href={VENDAS_XQUADS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT, color: "#06240f" }}
            >
              Conhecer o Xquads
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </article>
      </section>

      {!unlocked ? (
        <LeadGate
          source="plugins-page"
          accent={ACCENT}
          buttonTextColor="#06240f"
          title="Receba como instalar cada um"
          description="Preencha seus dados para liberar os comandos de instalação e o que observar em cada extensão."
          contentNote="Você vai liberar: o passo de instalação de cada um, em que agentes funcionam e o que conferir antes de instalar."
          buttonLabel="Liberar a instalação"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como instalar</h2>
            {ITENS.map((i) => (
              <article key={i.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
                <h3 className="font-semibold" style={{ color: ACCENT }}>
                  {i.nome}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{i.instalar}</p>
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Uma observação sobre o plugin da Vercel</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Em abril de 2026 ele recebeu crítica pública sobre coleta de dados: a forma de pedir
              consentimento era confusa. Quem levantou a questão publicou depois que os pontos foram
              corrigidos. Vale dar uma olhada nas opções de telemetria na hora de instalar, como
              aliás vale para qualquer extensão que roda com as suas permissões.
            </p>
          </section>

          <p className="text-xs text-[#666]">
            Informações conferidas em 12 de outubro de 2026. Extensão de agente muda rápido: confira o
            repositório de cada uma antes de instalar.
          </p>
        </div>
      )}

      <SalesCta utmContent="plugins" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
