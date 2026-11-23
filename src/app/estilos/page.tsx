"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Palette, Image as ImageIcon, Film, Wand2, Terminal } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F472B6";

const PROMPT_BASE = `SCENE (keep identical in every version):
Side view of a man in a white shirt driving a red convertible on a city road,
a street lamp and a city skyline behind him, vertical 9:16, car centered,
same framing, same camera, same proportions.

STYLE: [CÓDIGO] — cole aqui o código do estilo que você escolheu

ANIMATION:
Seamless 6-second loop. The car stays centered, wheels spin, the background
scrolls slowly to the left, the street lamp light flickers softly.`;

const CODIGOS = [
  { n: "01", nome: "Esboço Neon", codigo: "Glow Sketch — thin neon line art on pure black, warm amber and red glowing outlines, soft light cones under the street lamps, almost no fill" },
  { n: "02", nome: "Quadrinhos", codigo: "Comic Art — bold black ink outlines, flat bright colors, halftone dot shading, comic caption box at the top" },
  { n: "03", nome: "Estilo Lego", codigo: "Lego Style — everything built from glossy plastic toy bricks, minifigure driver, macro tilt-shift photo, studio light" },
  { n: "04", nome: "Pixel Art", codigo: "Pixel Art — 16-bit retro video game, limited palette, crisp pixels, game HUD with hearts and XP bar" },
  { n: "05", nome: "Lousa de Giz", codigo: "Chalkboard Style — white and pastel chalk drawing on a green school chalkboard with a wooden frame, chalk dust texture, hand-written title" },
  { n: "06", nome: "Estilo PS2", codigo: "PS2 Style — early-2000s console 3D, low-poly models, blurry low-res textures, slight jagged edges, saturated sky" },
  { n: "07", nome: "Vetor Flat", codigo: "Flat Vector — clean geometric shapes, no outlines, flat colors, navy night palette, floating infographic icons" },
  { n: "08", nome: "Traço Minimalista", codigo: "Minimal Line — single-weight white lines on black, no color, lots of negative space, one soft lamp glow" },
  { n: "09", nome: "Movimento CGI", codigo: "CGI Motion — cinematic realistic 3D render, night city, wet asphalt reflections, volumetric lamp light, teal and orange grade" },
  { n: "10", nome: "3D Explicativo", codigo: "Explainer 3D — soft rounded 3D shapes, clay-like materials, bright daylight, pastel sky, clean product-video look" },
];

function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [estado, setEstado] = useState<"parado" | "copiado" | "erro">("parado");
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setEstado("copiado");
    } catch {
      setEstado("erro");
    }
    setTimeout(() => setEstado("parado"), 3000);
  };
  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={copiar}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#F472B6]/50"
      >
        {estado === "copiado" ? (
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
      {estado === "erro" && (
        <span className="text-xs text-[#FCA5A5]">
          Seu navegador bloqueou a cópia. Selecione o texto e copie na mão.
        </span>
      )}
    </div>
  );
}

export default function EstilosPage() {
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
          <Palette className="h-4 w-4" />
          Os 10 códigos do vídeo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          A mesma cena,{" "}
          <span style={{ color: ACCENT }}>10 estilos completamente diferentes</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          O segredo é que a cena não muda: fica travada, palavra por palavra, e só o código de
          estilo é trocado. É por isso que as versões parecem a mesma animação em dez universos.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Antes de sair gerando</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <ImageIcon className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              Imagem parada primeiro, sempre
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              Gere o quadro parado, olhe, aprove. Só então anime. Animar antes de aprovar é
              queimar geração à toa — e animação custa bem mais caro que imagem.
            </p>
          </article>
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Terminal className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              Nem todo estilo vai na mesma ferramenta
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              Traço, vetor, pixel e lousa saem muito bem pedindo a animação direto ao Claude, em
              HTML ou SVG. Já <strong className="text-white">Lego, CGI e massinha</strong> pedem
              gerador de imagem ou de vídeo. Tentar massinha no Claude dá resultado ruim, e não é
              culpa do código.
            </p>
          </article>
        </div>
        <p className="text-sm leading-relaxed text-[#777]">
          Os códigos ficam em inglês de propósito: é assim que os modelos reconhecem o estilo. O
          nome em português serve para você se achar na lista.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="estilos-page"
          accent={ACCENT}
          buttonTextColor="#3d0a24"
          title="Receba os 10 códigos"
          description="Preencha seus dados para liberar o prompt-base e os códigos de estilo."
          contentNote="Você vai liberar: o prompt-base da cena e os 10 códigos de estilo, cada um pronto para copiar."
          buttonLabel="Liberar os códigos"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Wand2 className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />O prompt-base
            </h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Este bloco não muda. Troque apenas a linha do <code className="text-[#ccc]">STYLE</code>{" "}
              pelo código que você escolher na lista abaixo. Para gerar só a imagem parada, apague
              o bloco <code className="text-[#ccc]">ANIMATION</code> e use o resto.
            </p>
            <div className="space-y-2">
              <CopyButton text={PROMPT_BASE} label="Copiar prompt-base" />
              <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                  {PROMPT_BASE}
                </pre>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Film className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              Os 10 códigos
            </h2>
            {CODIGOS.map((c) => (
              <article key={c.n} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">
                    <span className="mr-2 font-mono text-sm" style={{ color: ACCENT }}>
                      {c.n}
                    </span>
                    {c.nome}
                  </h3>
                  <CopyButton text={c.codigo} />
                </div>
                <div className="mt-2 overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-3">
                  <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[#ccc]">
                    {c.codigo}
                  </pre>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Para o Claude animar direto</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Nos estilos de traço, vetor, pixel e lousa, dá para pular o gerador de vídeo e pedir
              assim: <span className="text-[#ccc]">&quot;Crie essa cena como animação em HTML ou SVG, em loop
              de 6 segundos, no estilo [cole o código]&quot;</span>. Sai leve, roda no navegador e você
              edita o resultado quantas vezes quiser.
            </p>
          </section>
        </div>
      )}

      <SalesCta utmContent="estilos" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
