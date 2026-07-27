"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  FileText,
  Github,
  Images,
  Mic,
  Sparkles,
  Table,
  Zap,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#14B8A6";
const LINK = "https://github.com/microsoft/markitdown";
const INSTALL = "pip install 'markitdown[all]'";

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
      <code className="text-sm font-mono text-[#ccc]">{INSTALL}</code>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#14B8A6]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer shrink-0"
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

export default function MarkItDownPage() {
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
          <FileText className="h-3.5 w-3.5" />
          Ferramenta open-source da Microsoft
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Transforme{" "}
          <span style={{ color: ACCENT }}>qualquer arquivo em Markdown</span> pronto
          pra IA
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          O MarkItDown é um utilitário gratuito da Microsoft que converte PDF,
          Word, Excel, PowerPoint, imagem e até áudio em Markdown limpo. É o
          formato que a IA entende melhor e que gasta menos tokens, perfeito pra
          jogar documento dentro do ChatGPT ou do Claude sem virar bagunça.
        </p>
      </div>

      {/* O que e */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Por que isso importa</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Quando você joga um PDF ou uma planilha direto na IA, muita coisa se
            perde: a estrutura quebra, as tabelas viram sopa de letrinha e você
            queima um monte de token à toa. O MarkItDown resolve isso convertendo o
            arquivo pra Markdown antes, preservando títulos, listas, tabelas e
            links do jeito que a IA lê melhor.
          </p>
          <p>
            É gratuito, open-source, roda no seu computador e converte praticamente
            tudo. Depois de instalar, transformar um documento é um comando só.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: FileText,
              title: "Documentos",
              text: "PDF, Word, PowerPoint e Excel viram Markdown com títulos, listas e tabelas preservados.",
            },
            {
              icon: Images,
              title: "Imagens",
              text: "Extrai texto de imagens com OCR e lê os metadados, transformando em texto aproveitável.",
            },
            {
              icon: Mic,
              title: "Áudio",
              text: "Transcreve arquivos de áudio, então até uma reunião gravada vira texto pra IA analisar.",
            },
            {
              icon: Table,
              title: "Web e dados",
              text: "HTML, links do YouTube, CSV, JSON, XML, ZIP e EPub também entram na conversão.",
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
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 flex items-start gap-3">
          <Zap className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          <p className="text-sm text-[#999] leading-relaxed">
            Markdown é o formato mais eficiente em tokens que existe. Converter
            antes de mandar pra IA deixa a resposta melhor e a conta mais barata.
          </p>
        </div>
      </section>

      {/* Gate + link */}
      {!unlocked ? (
        <LeadGate
          source="markitdown-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o acesso ao MarkItDown"
          description="Insira seus dados para desbloquear o link do repositório e o comando de instalação."
          contentNote="Você vai liberar: o link oficial do MarkItDown no GitHub, com o comando de instalação e toda a documentação."
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
            Abrir o MarkItDown no GitHub
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Instalacao rapida */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Instalação rápida</p>
            <p className="text-sm text-[#999] leading-relaxed">
              Com o Python instalado, rode o comando abaixo. Depois é só apontar pro
              seu arquivo com{" "}
              <code className="text-[#ccc] font-mono text-[13px]">
                markitdown arquivo.pdf -o saida.md
              </code>
              .
            </p>
            <InstallCopy />
          </div>
        </section>
      )}

      {/* CTA */}
      <SalesCta utmContent="markitdown" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
