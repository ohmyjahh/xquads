"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

const PROMPT = `Using this portrait, create a comprehensive diagram-first personal color
and style analysis. Structure the output as a visual reference card with
labeled sections. Keep text minimal — use labels, tags, and short descriptors
only. No paragraphs.

Include the following sections:

1. SKIN UNDERTONE — warm / cool / neutral + hex swatch
2. SEASONAL COLOR PALETTE — identify the season (Spring / Summer / Autumn /
   Winter) with a visual swatch grid of 8–12 best colors
3. COLORS TO AVOID — 4–6 swatches with brief reason tags
   (e.g. "washes out", "clashes")
4. CLOTHING COLOR COMPARISONS — side-by-side visual showing the subject's
   coloring against: best neutrals, best accent colors, worst choices
5. STYLE ARCHETYPE — 2–3 style keywords (e.g. "Classic · Minimal · Editorial")
   with a moodboard-style layout suggestion
6. PATTERN & TEXTURE GUIDANCE — which patterns and fabrics enhance vs.
   overwhelm (e.g. fine stripes ✓ / busy florals ✗)
7. METALS & ACCESSORIES — gold vs. silver vs. rose gold recommendation
   + best contrast level for accessories
8. HAIR & MAKEUP TONES — complementary tones for hair color and lip/eye
   makeup, shown as swatches

Design the output as a clean, structured visual layout —
like a professional colorist's reference sheet.`;

export default function EstiloPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EA8049]/10 border border-[#EA8049]/20 px-4 py-1.5 text-xs font-medium text-[#EA8049]">
          <Sparkles className="h-3.5 w-3.5" />
          Análise de Cor & Estilo
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Estilo <span className="text-[#EA8049]">Pessoal</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Copie o prompt abaixo, envie junto com um retrato seu para a IA, e
          ela vai gerar uma cartela de cores sazonal, arquétipo de estilo,
          metais ideais e guia completo de paleta — em formato visual.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>
            Copie o prompt clicando no botão abaixo
          </li>
          <li>
            Abra a IA de sua preferência (Claude, ChatGPT, Gemini, etc.)
          </li>
          <li>
            Cole o prompt e envie um retrato seu (foto frontal, boa iluminação)
          </li>
          <li>
            A IA vai retornar uma análise visual completa de cor e estilo
          </li>
        </ol>
      </div>

      {/* Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Prompt
          </h2>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg bg-[#EA8049] hover:bg-[#d4703d] text-white text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar prompt
              </>
            )}
          </button>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 max-h-[500px] overflow-y-auto">
          <pre className="text-sm text-[#ccc] whitespace-pre-wrap font-mono leading-relaxed">
            {PROMPT}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por{" "}
        <span className="text-[#EA8049]">@rafa.grandi</span>
      </p>
    </div>
  );
}
