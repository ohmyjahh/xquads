"use client";

import { useState } from "react";
import { Copy, Check, ScanEye } from "lucide-react";

const PROMPT = `Atue como um especialista em análise visual e visão computacional.

Sua tarefa é examinar detalhadamente a imagem em anexo e extrair todas as suas características fundamentais. Faça uma varredura completa da cena, prestando atenção em cores, iluminação, composição, estilo artístico e sujeitos presentes.

Após a análise, você deve gerar a sua resposta exclusivamente no formato JSON, sem textos adicionais antes ou depois do código. O JSON deve seguir rigorosamente a estrutura abaixo:

{
  "analise_da_imagem": {
    "estilo_visual": "Descreva o estilo (ex: fotorrealismo, pintura a óleo, pixel art, cyberpunk, fotografia macro, etc.)",
    "paleta_de_cores": [
      "Liste as 3 a 5 cores predominantes ou o tom geral da imagem"
    ],
    "iluminacao_e_atmosfera": "Descreva como é a luz (natural, artificial, sombras duras, neon) e o clima/mood da imagem (sombrio, alegre, misterioso)",
    "formato_e_composicao": "Descreva o enquadramento (ex: close-up, plano aberto, paisagem, retrato) e a organização dos elementos",
    "elementos_principais": [
      "Liste os objetos, cenários ou itens inanimados de maior destaque"
    ],
    "personagens": [
      {
        "tipo": "Humano, animal, criatura, robô, etc.",
        "descricao_fisica": "Roupas, expressões, características físicas",
        "acao": "O que o personagem está fazendo?"
      }
    ],
    "descricao_detalhada": "Um parágrafo completo e coeso descrevendo a imagem como um todo, ideal para ser usado como prompt em uma IA geradora de imagens (Midjourney, DALL-E, etc.)."
  }
}

Regra estrita: Retorne apenas o bloco JSON válido. Se não houver personagens na imagem, retorne a lista "personagens" vazia [].`;

export default function ImagemGPTPage() {
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
          <ScanEye className="h-3.5 w-3.5" />
          Analisador de Imagens
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Imagem <span className="text-[#EA8049]">GPT</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Copie o prompt abaixo, cole na IA junto com uma imagem, e ela vai
          analisar e retornar um JSON completo com estilo, cores, personagens
          e descricao detalhada.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>
            Copie o prompt clicando no botao abaixo
          </li>
          <li>
            Abra a IA de sua preferencia (Claude, ChatGPT, etc.)
          </li>
          <li>
            Cole o prompt e anexe a imagem que quer analisar
          </li>
          <li>
            A IA vai retornar um JSON com estilo, paleta, personagens e prompt
            pronto para Midjourney/DALL-E
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
