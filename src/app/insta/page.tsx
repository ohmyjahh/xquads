"use client";

import { Copy, Check, BarChart3 } from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";
import { SalesCta } from "@/components/sales-cta";

const PROMPT = `Acesse o Windsor.ai e conecte-se aos dados do meu perfil do Instagram. Com base nos dados disponiveis, gere um relatorio estrategico completo seguindo esta estrutura:

1. VISAO GERAL DO PERIODO
Periodo analisado, total de publicacoes, alcance acumulado, impressoes totais e variacao em relacao ao periodo anterior.

2. METRICAS DE CRESCIMENTO
Evolucao de seguidores, taxa de crescimento, perfil demografico do publico (se disponivel) e tendencia de curto prazo.

3. PERFORMANCE DE ENGAJAMENTO
Taxa de engajamento media, evolucao por periodo, comparativo entre formatos (Reels, carrosseis, imagens estaticas, stories) e benchmarks se disponiveis.

4. TOP CONTEUDOS
Liste os 5 posts com maior alcance e os 5 com maior engajamento. Para cada um: tipo de formato, data, metrica principal e hipotese do que gerou o desempenho.

5. CONTEUDOS DE BAIXO DESEMPENHO
Identifique padroes nos conteudos que tiveram desempenho abaixo da media. O que eles tem em comum?

6. ANALISE DE FORMATOS E HORARIOS
Qual formato performa melhor? Existe padrao de horario ou dia da semana com maior alcance ou engajamento?

7. DIAGNOSTICO GERAL
O que esta funcionando, o que esta travando o crescimento e qual e o maior gap entre potencial e resultado atual.

8. RECOMENDACOES PRIORITARIAS
3 a 5 acoes concretas e ordenadas por impacto potencial, com justificativa baseada nos dados.

9. ROTEIROS BASEADOS NOS TOP VIDEOS
Com base nos 3 videos de maior engajamento identificados na secao 4, escreva um roteiro completo para cada um seguindo o mesmo padrao de estrutura, gancho, desenvolvimento e CTA que gerou resultado. Cada roteiro deve ser original, mas replicar a logica e o formato do video de referencia — nao o conteudo. Indique no inicio de cada roteiro qual video serviu de base e por que aquele padrao foi escolhido.

Seja objetivo, baseie cada afirmacao nos dados do Windsor. Onde nao houver dados suficientes, indique a lacuna em vez de especular.`;

export default function InstaPage() {
  const { copied, showLeadForm, leadSource, copy, closeLeadForm } = useCopyWithLead("prompt-insta");

  const handleCopy = () => copy(PROMPT);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {showLeadForm && (
        <LeadForm
          onClose={closeLeadForm}
          source={leadSource}
          type="copy"
          onSuccess={closeLeadForm}
        />
      )}
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/20 px-4 py-1.5 text-xs font-medium text-[#E1306C]">
          <BarChart3 className="h-3.5 w-3.5" />
          Relatorio Estrategico via Windsor.ai
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Insta <span className="text-[#E1306C]">Report</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Conecte seus dados do Instagram via Windsor.ai e receba um relatorio
          completo com diagnostico, recomendacoes e roteiros baseados nos seus
          top videos.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Copie o prompt clicando no botao abaixo</li>
          <li>Cole em uma IA com acesso ao Windsor.ai (Claude com MCP, etc.)</li>
          <li>Garanta que o conector do Instagram ja esta autorizado no Windsor.ai</li>
          <li>
            A IA vai puxar os dados e entregar relatorio + roteiros em
            9 secoes
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
            className="inline-flex items-center gap-2 rounded-lg bg-[#E1306C] hover:bg-[#c42860] text-white text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
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

      {/* CTA */}
      <SalesCta utmContent="insta" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por{" "}
        <span className="text-[#E1306C]">@rafa.grandi</span>
      </p>
    </div>
  );
}
