"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Gift,
  Github,
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#6366F1";
const LINK = "https://github.com/diegosouzapw/OmniRoute";
const INSTALL = "npm install -g omniroute";

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
        className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#6366F1]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer shrink-0"
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

export default function OmniRoutePage() {
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
          <Network className="h-3.5 w-3.5" />
          Ferramenta open-source
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Um só endpoint pra{" "}
          <span style={{ color: ACCENT }}>290+ modelos de IA</span>, com token
          grátis todo mês
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          O OmniRoute é um gateway de IA gratuito e open-source que roda na sua
          máquina. Ele conecta o Claude Code, o Cursor e o Cline a centenas de
          provedores de uma vez, escolhe o melhor modelo automaticamente e ainda
          comprime tokens pra você gastar muito menos.
        </p>
      </div>

      {/* O que e */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>O que é o OmniRoute</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Pensa num roteador inteligente que fica entre você e todos os modelos
            de IA que existem. Em vez de configurar chave por chave, provedor por
            provedor, você aponta a sua ferramenta pra um único endereço local e o
            OmniRoute resolve o resto: escolhe o modelo, troca de provedor quando
            um cai e nunca te deixa na mão por causa de limite.
          </p>
          <p>
            E o melhor: roda 100% no seu computador, sem telemetria, com as suas
            credenciais criptografadas. É de graça e o código é aberto.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: Network,
              title: "Roteamento inteligente",
              text: "19 estratégias de roteamento com fallback automático entre 290+ provedores. Ele escolhe o melhor modelo disponível em tempo real.",
            },
            {
              icon: Zap,
              title: "Economia de tokens",
              text: "Compressão automática que economiza de 15% a 95% dos tokens, com uma média perto de 89% no stack padrão.",
            },
            {
              icon: Gift,
              title: "Tokens grátis todo mês",
              text: "Acesso a mais de 40 provedores com tier gratuito, somando mais de 1,5 bilhão de tokens grátis por mês.",
            },
            {
              icon: ShieldCheck,
              title: "Local e privado",
              text: "Roda no seu hardware, credenciais criptografadas em AES-256 e sem telemetria por padrão.",
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
          source="omniroute-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o acesso ao OmniRoute"
          description="Insira seus dados para desbloquear o link do repositório e o comando de instalação."
          contentNote="Você vai liberar: o link oficial do OmniRoute no GitHub, com o passo a passo de instalação e toda a documentação."
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
            Abrir o OmniRoute no GitHub
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Instalacao rapida */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Instalação rápida</p>
            <p className="text-sm text-[#999] leading-relaxed">
              Com o Node.js instalado, rode o comando abaixo. Depois é só abrir o
              painel em localhost e conectar as suas ferramentas.
            </p>
            <InstallCopy />
          </div>
        </section>
      )}

      {/* CTA */}
      <SalesCta utmContent="omniroute" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
