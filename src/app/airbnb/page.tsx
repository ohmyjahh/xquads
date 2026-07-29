"use client";

import { useEffect, useState } from "react";
import {
  Camera,
  Check,
  Clapperboard,
  Copy,
  DollarSign,
  Film,
  Handshake,
  Home,
  Lightbulb,
  Play,
  Upload,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FF5A5F";

const PROMPT = `Create a realistic, cinematic landscape walkthrough video using the uploaded Airbnb listing photos as exact references. Preserve the real layout, furniture, décor, colors, lighting, windows, appliances, and outdoor features exactly as shown, without adding, removing, or redesigning anything.

Start with the strongest exterior or entrance shot, then move naturally through the entry, living room, kitchen, dining area, bedrooms, bathrooms, amenities, and outdoor spaces, ending on the best hero view.

Use smooth eye-level camera movement, slow push-ins, subtle pans, doorway transitions, and wide-angle reveals, so it feels like a professionally filmed real-estate tour, with consistent lighting and seamless transitions between every room.

Keep every room faithful to its reference photo. Do not add people, text, watermarks, or any furniture that is not in the photos.

Style: 4K, high-end render quality, warm and inviting, realistic real-estate cinematography.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#FF5A5F]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function AirbnbPage() {
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
          <Home className="h-3.5 w-3.5" />
          Renda extra com IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Transforme fotos de{" "}
          <span style={{ color: ACCENT }}>anúncios do Airbnb</span> em tours de
          vídeo pra vender
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Você printa as fotos de um imóvel no Airbnb, a IA monta um tour
          cinematográfico do lugar como se tivesse sido filmado por uma produtora,
          e você oferece esse vídeo pro anfitrião. Um prompt, e você tem um serviço
          pra vender.
        </p>
      </div>

      {/* A oportunidade */}
      <section className="space-y-4">
        <SectionTitle icon={DollarSign}>Por que isso vira dinheiro</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Todo anúncio de Airbnb vive de foto parada. Quem aluga sabe que vídeo
            converte muito mais: mostra o espaço de verdade, passa a sensação de
            estar lá e faz o imóvel se destacar na busca. Só que contratar uma
            produtora pra filmar cada imóvel é caro e trabalhoso, então quase
            ninguém tem.
          </p>
          <p>
            É aí que entra a brecha. Com as fotos que já estão no anúncio, a IA
            monta um tour em vídeo que parece filmado de verdade, sem precisar ir
            até o local. Você faz em minutos e oferece pro anfitrião, que ganha um
            material que valoriza o anúncio dele. Um serviço simples de entregar e
            fácil de cobrar.
          </p>
        </div>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>Como fazer o vídeo</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              icon: Camera,
              title: "Printe as fotos do anúncio",
              text: "Escolha um imóvel no Airbnb e salve as melhores fotos: fachada, sala, cozinha, quartos, banheiros e área externa. Quanto mais ângulos, mais completo fica o tour.",
            },
            {
              n: "2",
              icon: Play,
              title: "Abra uma IA de vídeo",
              text: "Use uma ferramenta de imagem-para-vídeo que aceite imagens de referência: Google Flow (Veo), Sora, Kling, Runway ou Higgsfield. Todas servem.",
            },
            {
              n: "3",
              icon: Upload,
              title: "Suba as fotos e cole o prompt",
              text: "Anexe as fotos do imóvel como referência e cole o prompt abaixo. Ele instrui a IA a respeitar o layout real e montar o tour na ordem certa.",
            },
            {
              n: "4",
              icon: Clapperboard,
              title: "Gere, revise e ofereça",
              text: "Gere o vídeo, confira se ficou fiel ao imóvel e refaça se precisar. Depois é só chegar no anfitrião com o tour pronto na mão.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
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
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">Por que o prompt é em inglês</p>
          <p className="text-sm text-[#999] leading-relaxed">
            As IAs de vídeo entendem instrução visual bem melhor em inglês, então o
            prompt fica no idioma original. Você não precisa mudar nada: é só subir
            as fotos e colar.
          </p>
        </div>
      </section>

      {/* Gate + prompt */}
      {!unlocked ? (
        <LeadGate
          source="airbnb-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o prompt do tour"
          description="Insira seus dados para desbloquear o prompt completo do tour cinematográfico e as dicas de como vender pro anfitrião."
          contentNote="Você vai liberar: o prompt pronto pra copiar e usar em qualquer IA de vídeo, mais o passo a passo de como abordar o anfitrião e cobrar pelo serviço."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Film className="h-4 w-4" />
            Prompt liberado. Suba as fotos do imóvel e cole na IA de vídeo.
          </div>

          {/* Prompt */}
          <section className="space-y-4">
            <SectionTitle icon={Clapperboard}>O prompt do tour</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Copie o prompt, suba as fotos do imóvel como referência e gere. As
              regras de fidelidade, ordem dos ambientes e movimento de câmera já
              estão prontas. Não precisa mudar nada.
            </p>
            <PromptBlock code={PROMPT} copyLabel="Copiar prompt" />
          </section>

          {/* Como vender */}
          <section className="space-y-4">
            <SectionTitle icon={Handshake}>Como vender pro anfitrião</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              O vídeo pronto é o seu melhor argumento. Faça um primeiro tour de
              graça, mostre pro dono e deixe o resultado falar.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Entregue a amostra pronta",
                  text: "Em vez de oferecer um serviço no vazio, mande o tour já feito do imóvel dele. Ver o próprio espaço em vídeo cinematográfico convence sozinho.",
                },
                {
                  title: "Mostre o ganho, não o preço",
                  text: "Fale que o vídeo aumenta as visualizações e as reservas do anúncio. O anfitrião não compra o vídeo, compra mais ocupação.",
                },
                {
                  title: "Cobre por vídeo ou por pacote",
                  text: "Um valor por tour avulso, ou um pacote mensal pra quem tem vários imóveis. Quem gerencia várias propriedades é o melhor cliente.",
                },
                {
                  title: "Escale pro nicho",
                  text: "O mesmo processo serve pra imobiliária, corretor e aluguel por temporada. Achou um formato que funciona, replica pra vários donos.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-[#999] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="airbnb" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
