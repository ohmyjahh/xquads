"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Github,
  Layers,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F59E0B";
const LINK = "https://github.com/virgiliojr94/book-to-skill";
const INSTALL = "git clone https://github.com/virgiliojr94/book-to-skill.git ~/.claude/skills/book-to-skill";

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

function InstallCopy() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
      <code className="text-[13px] font-mono text-[#ccc] overflow-x-auto">{INSTALL}</code>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#F59E0B]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer shrink-0"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar
          </>
        )}
      </button>
    </div>
  );
}

export default function LivroSkillPage() {
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
          <BookOpen className="h-3.5 w-3.5" />
          Ferramenta open-source
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Transforme{" "}
          <span style={{ color: ACCENT }}>qualquer livro técnico</span> numa skill
          do Claude
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          O book-to-skill pega o PDF de um livro e transforma numa skill que o
          Claude Code consulta enquanto você trabalha. Em vez de guardar um PDF que
          você nunca mais abre, o conhecimento do livro vira uma ferramenta que a
          IA carrega na hora certa, sem inventar nada.
        </p>
      </div>

      {/* O que e */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Do PDF parado à skill que trabalha</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Todo mundo tem uma pasta cheia de livro técnico em PDF que baixou e
            nunca releu. O conhecimento está ali, mas parado. Jogar o livro inteiro
            no chat da IA também não resolve: gasta um absurdo de token e ela acaba
            se perdendo no meio de tanta página.
          </p>
          <p>
            O book-to-skill resolve isso. Ele lê o livro, extrai a estrutura de
            verdade (capítulos, frameworks, padrões, glossário) e monta uma skill
            que o Claude carrega só o capítulo que importa na hora que precisa. O
            conhecimento do livro fica disponível enquanto você constrói, de um
            jeito preciso e barato.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: BookOpen,
              title: "Vários formatos",
              text: "Converte PDF, EPUB, DOCX, TXT, Markdown, HTML e mais. Joga o arquivo e ele processa.",
            },
            {
              icon: Wand2,
              title: "Extrai a estrutura",
              text: "Não é resumo raso: puxa os capítulos, os frameworks, os padrões e o glossário do livro.",
            },
            {
              icon: Layers,
              title: "Carrega sob demanda",
              text: "Cada capítulo vira um arquivo leve que a IA carrega só quando o assunto aparece.",
            },
            {
              icon: Zap,
              title: "Muito mais barato",
              text: "De 24 a 51 vezes menos tokens do que jogar o livro inteiro no contexto da IA.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2"
            >
              <item.icon className="h-5 w-5" style={{ color: ACCENT }} />
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-[#888] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gate + link */}
      {!unlocked ? (
        <LeadGate
          source="livroskill-page"
          accent={ACCENT}
          buttonTextColor="#3d2600"
          title="Libere o acesso ao book-to-skill"
          description="Insira seus dados para desbloquear o link do repositório e o comando de instalação."
          contentNote="Você vai liberar: o link oficial do book-to-skill no GitHub, com o comando de instalação e toda a documentação."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <section className="space-y-5">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Acesso liberado. Abra o repositório e siga o passo a passo.
          </div>

          {/* Botao de link destacado */}
          <a
            href={LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: ACCENT,
              boxShadow: `0 10px 30px -8px ${ACCENT}80`,
            }}
          >
            <Github className="h-5 w-5 shrink-0" />
            Abrir o book-to-skill no GitHub
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Instalacao rapida */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Instalação rápida (Claude Code)</p>
            <p className="text-sm text-[#999] leading-relaxed">
              Rode o comando abaixo pra instalar a skill direto na sua pasta do
              Claude Code. Depois é só apontar pro seu livro com{" "}
              <code className="text-[#ccc] font-mono text-[13px]">
                book-to-skill seu-livro.pdf
              </code>
              .
            </p>
            <InstallCopy />
          </div>
        </section>
      )}

      {/* CTA */}
      <SalesCta utmContent="livroskill" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
