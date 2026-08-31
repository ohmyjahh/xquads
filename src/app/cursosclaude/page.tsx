"use client";

import { useState, useSyncExternalStore } from "react";
import {
  GraduationCap,
  ArrowUpRight,
  BadgeCheck,
  Languages,
  Wallet,
  Users,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F97316";
const CATALOGO = "https://anthropic.skilljar.com/";

const VERDADES = [
  {
    icone: Wallet,
    titulo: "É grátis mesmo",
    texto: "Todo curso abre com botão de registro marcado como FREE. Sem cartão, sem teste que vira cobrança.",
  },
  {
    icone: BadgeCheck,
    titulo: "Dá certificado",
    texto: "Cada curso concluído emite certificado, e ele entra no seu LinkedIn como credencial.",
  },
  {
    icone: Languages,
    titulo: "Está em inglês",
    texto: "Todo o material é em inglês, sem versão em português. Legenda automática do navegador resolve a maior parte.",
  },
];

const NIVEIS = [
  {
    n: "1",
    titulo: "Entender",
    para: "Você nunca passou do chat básico.",
    cursos: [
      "Claude 101",
      "AI Fluency: Framework & Foundations",
      "AI Capabilities and Limitations",
    ],
  },
  {
    n: "2",
    titulo: "Usar no trabalho",
    para: "Você já usa e quer tirar trabalho das costas.",
    cursos: [
      "Claude Code 101",
      "Introduction to Claude Cowork",
      "Introduction to agent skills",
    ],
  },
  {
    n: "3",
    titulo: "Construir",
    para: "Você quer montar suas próprias ferramentas.",
    cursos: [
      "Claude Code in Action",
      "Introduction to subagents",
      "Building with the Claude API",
      "Introduction to Model Context Protocol",
      "Model Context Protocol: Advanced Topics",
      "Claude Platform 101",
    ],
  },
];

const PERFIS: { titulo: string; cursos: string[]; trilha?: string }[] = [
  {
    titulo: "Educação",
    cursos: [
      "AI Fluency for educators",
      "Teaching AI Fluency",
      "AI Fluency for students",
    ],
    trilha: "AI Fluency for pK-12 Educators",
  },
  {
    titulo: "Negócio",
    cursos: ["AI Fluency for Small Businesses", "AI Fluency for nonprofits"],
  },
  {
    titulo: "Criação e produto",
    cursos: ["AI Fluency for Creative Work", "AI Fluency for Builders"],
  },
  {
    titulo: "Nuvem e empresa",
    cursos: ["Claude with Amazon Bedrock", "Claude on Google Cloud"],
  },
];

const TOTAL =
  NIVEIS.reduce((n, x) => n + x.cursos.length, 0) +
  PERFIS.reduce((n, x) => n + x.cursos.length, 0);

export default function CursosClaudePage() {
  const [formUnlocked, setFormUnlocked] = useState(false);

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

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, a trilha fica protegida.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <GraduationCap className="h-4 w-4" />
          Formação oficial
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          A Anthropic tem <span style={{ color: ACCENT }}>{TOTAL} cursos grátis</span> sobre
          Claude, com certificado
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Quem fez o Claude ensina a usar o Claude. O problema é que a plataforma joga os {TOTAL}
          {" "}numa lista só, sem dizer por onde começar. Aqui está a ordem.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        {VERDADES.map((v) => (
          <article
            key={v.titulo}
            className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
          >
            <v.icone className="h-5 w-5" style={{ color: ACCENT }} />
            <h2 className="mt-3 font-semibold">{v.titulo}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">{v.texto}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Por que a ordem importa</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          O catálogo mistura curso de introdução com material de API e protocolo de agente, sem
          nível declarado. Quem começa pelo primeiro da lista costuma cair num conteúdo técnico
          demais e abandonar achando que o problema é ele. A trilha abaixo separa por onde você
          está hoje, não por assunto.
        </p>
        <p className="mt-3 text-xs text-[#666]">
          Cadastro no Skilljar, não precisa de conta Anthropic. Catálogo conferido em agosto de
          2026 e em crescimento, então pode haver curso novo além destes.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="cursosclaude-page"
          accent={ACCENT}
          buttonTextColor="#2a1000"
          title="Receba a trilha na ordem certa"
          description="Preencha seus dados para liberar a sequência dos três níveis e o recorte por perfil."
          contentNote={`Você vai liberar: os ${TOTAL} cursos organizados em três níveis, mais a seleção por área, com o nome exato de cada um para localizar no catálogo.`}
          buttonLabel="Liberar a trilha"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">A trilha, em três níveis</h2>
            {NIVEIS.map((nivel) => (
              <article
                key={nivel.n}
                className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    {nivel.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{nivel.titulo}</h3>
                    <p className="text-sm text-[#888]">{nivel.para}</p>
                  </div>
                </div>
                <ol className="mt-4 space-y-2">
                  {nivel.cursos.map((c, i) => (
                    <li
                      key={c}
                      className="flex gap-3 rounded-lg border border-[#2a2a2e] bg-[#0e0e10] px-4 py-3"
                    >
                      <span className="font-mono text-xs text-[#555]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm">{c}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Users className="h-5 w-5" style={{ color: ACCENT }} />
              Se você tem uma área
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {PERFIS.map((p) => (
                <article
                  key={p.titulo}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
                >
                  <h3 className="font-semibold">{p.titulo}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {p.cursos.map((c) => (
                      <li key={c} className="text-sm leading-relaxed text-[#999]">
                        {c}
                      </li>
                    ))}
                  </ul>
                  {p.trilha && (
                    <p className="mt-3 border-t border-[#2a2a2e] pt-3 text-xs text-[#777]">
                      Existe ainda a trilha <span className="text-[#999]">{p.trilha}</span>,
                      que agrupa vários destes cursos numa sequência só.
                    </p>
                  )}
                </article>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#777]">
              Os nomes estão em inglês de propósito, iguais ao catálogo. Copie o título e busque
              na plataforma para cair no curso certo.
            </p>
          </section>

          <a
            href={CATALOGO}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl border p-5 transition-opacity hover:opacity-90"
            style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
          >
            <div>
              <p className="font-semibold" style={{ color: ACCENT }}>
                Abrir a Anthropic Academy
              </p>
              <p className="mt-1 text-sm text-[#999]">
                anthropic.skilljar.com · cadastro grátis com e-mail
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          </a>
        </div>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Antes de começar pelo curso</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Se você ainda não entendeu a diferença entre usar o Claude no chat, nos Projetos e no
          terminal, comece pelo guia dos três níveis em{" "}
          <a
            href="/xquads/claude"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/claude
          </a>
          . Em português e em dez minutos.
        </p>
      </section>

      <SalesCta utmContent="cursosclaude" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
