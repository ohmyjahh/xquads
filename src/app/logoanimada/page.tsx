"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Clapperboard,
  Copy,
  ExternalLink,
  Film,
  Lightbulb,
  Palette,
  Play,
  Sparkles,
  Upload,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#EC4899";

const PROMPT = `Generate a professional, high-end 4K motion graphics logo animation for a company in the following niche: [INSERIR NICHE AQUI].

Core Constraints:
Identity Integrity: Animate the provided logo image exactly as it is.

No Extra Text: Strictly NO AI-generated words, slogans, or extra text. If the logo has text, keep it. If it doesn't, NO text should appear.

Contextual Animation: Before animating, identify 3 visual metaphors/elements associated with the specified niche (e.g., if automotive, use metallic textures/speed lines; if coffee, use steam/beans). Integrate these elements fluidly into the logo reveal.

Motion Quality: High-end motion design, smooth easing curves, professional motion blur, and a sophisticated color palette matching the niche standards.

Final Reveal: The animation must end with the logo perfectly centered and static.

Style: Cinematic 4K, modern, minimalist, high-end render quality.`;

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#EC4899]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  );
}

function PromptBlock({ code, copyLabel }: { code: string; copyLabel: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <CopyButton text={code} label={copyLabel} />
      </div>
      <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4 overflow-x-auto">
        <pre className="text-[13px] text-[#ccc] font-mono leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      </div>
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

export default function LogoAnimadaPage() {
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
            border: `1px solid ${ACCENT}33`,
          }}
        >
          <Film className="h-3.5 w-3.5" />
          Logo em movimento
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Transforme o seu logo numa{" "}
          <span style={{ color: ACCENT }}>animação cinematográfica</span> em 4K
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Um único prompt que faz a IA animar o seu logo em motion graphics de
          nível de agência: reveal suave, motion blur profissional e elementos
          visuais do seu nicho, terminando com o logo centralizado. Você troca o
          nicho, sobe o seu logo, e pronto.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>
          Um logo parado versus um logo que se move
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Abertura de vídeo, story, tela de carregamento do site, assinatura no
            fim de um Reel: em todo lugar que hoje entra um logo estático, um logo
            animado passa uma impressão de marca muito maior. É o tipo de coisa
            que agência de motion cobra caro pra entregar, e que levava dias entre
            briefing, render e ajuste.
          </p>
          <p>
            Agora uma IA de imagem-para-vídeo faz isso em minutos. O segredo está
            no prompt: ele instrui a IA a preservar o seu logo exatamente como é,
            sem inventar texto, e a puxar elementos visuais do seu nicho pro
            reveal. O resultado é uma animação que parece feita sob medida, não um
            efeito genérico.
          </p>
        </div>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>Como usar</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              icon: Upload,
              title: "Tenha o seu logo em imagem",
              text: "Um PNG com fundo transparente funciona melhor. Quanto mais limpo o arquivo, mais fiel fica a animação.",
            },
            {
              n: "2",
              icon: Play,
              title: "Abra o Google Flow",
              text: "O Google Flow é o estúdio de vídeo do Google Labs e é o que a gente usa pra animar. Anexe o seu logo como imagem de referência. Outras ferramentas de imagem-para-vídeo também funcionam (Runway, Kling, Higgsfield).",
            },
            {
              n: "3",
              icon: Palette,
              title: "Cole o prompt e troque o nicho",
              text: "Substitua [INSERIR NICHE AQUI] pelo seu segmento (ex: cafeteria, automotivo, advocacia). É isso que faz a IA escolher os elementos visuais certos.",
            },
            {
              n: "4",
              icon: Clapperboard,
              title: "Gere e refine",
              text: "Se o reveal sair rápido demais ou o elemento do nicho pesar, peça pra suavizar ou reduzir. Gere 2 ou 3 versões e fique com a melhor.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {step.n}
              </div>
              <div className="space-y-1.5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <step.icon className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {step.title}
                </p>
                <p className="text-sm text-[#999] leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <a
          href="https://labs.google/fx/tools/flow"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: ACCENT,
            boxShadow: `0 10px 30px -8px ${ACCENT}80`,
          }}
        >
          <Play className="h-5 w-5 shrink-0 fill-current" />
          Abrir o Google Flow
          <ExternalLink className="h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="text-center text-xs text-[#666]">
          Abre em nova aba, em labs.google/fx/tools/flow
        </p>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">Por que o prompt é em inglês</p>
          <p className="text-sm text-[#999] leading-relaxed">
            As IAs de vídeo entendem instrução visual bem melhor em inglês, então o
            prompt fica no idioma original. A única coisa que você mexe é o nicho,
            em [INSERIR NICHE AQUI]. O resto pode deixar como está.
          </p>
        </div>
      </section>

      {/* Gate + prompt */}
      {!unlocked ? (
        <LeadGate
          source="logoanimada-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o prompt da logo animada"
          description="Insira seus dados para desbloquear o prompt completo da animação de logo em 4K."
          contentNote="Você vai liberar: o prompt pronto pra copiar e usar em qualquer IA de imagem-para-vídeo, mais a dica de como adaptar ao seu nicho."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Film className="h-4 w-4" />
            Prompt liberado. Anexe o seu logo e cole na IA de vídeo.
          </div>
          <SectionTitle icon={Clapperboard}>O prompt da logo animada</SectionTitle>
          <p className="text-[15px] text-[#aaa] leading-relaxed">
            Copie o prompt abaixo, troque [INSERIR NICHE AQUI] pelo seu segmento e
            cole na IA de vídeo com o seu logo anexado. Não precisa mudar mais
            nada: as regras de identidade, motion e reveal já estão prontas.
          </p>
          <PromptBlock code={PROMPT} copyLabel="Copiar prompt" />
        </section>
      )}

      {/* CTA */}
      <SalesCta utmContent="logoanimada" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
