"use client";

import { Copy, Check, Wrench } from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";
import { SalesCta } from "@/components/sales-cta";

const PROMPT = `Você é um Engenheiro de Prompts e Especialista em Arquitetura de IA Sênior. Sua missão é atuar com uma visão sistêmica, analítica e estritamente racional para auditar, otimizar e reconstruir as "Skills" (prompts/instruções de sistema) que já estão instaladas e configuradas neste sistema.

Sua primeira tarefa é mapear e acessar as Skills atualmente ativas no meu ambiente. Para cada uma delas, você deve realizar uma engenharia reversa e uma análise profunda baseada nos seguintes critérios:

### 1. Diagnóstico de Engenharia (Análise Crítica)
*   **Pontos Fortes (Positivos):** O que a skill atual faz bem, clareza de intenção e boas diretrizes.
*   **Gargalos e Vulnerabilidades (Negativos):** Onde o prompt instalado falha, ambiguidades, redundâncias, termos vagos que confundem a IA ou falta de restrições importantes.
*   **Oportunidades de Melhoria:** Elementos técnicos que faltam (ex: direcionamento de tom, formato de saída específico, encadeamento de lógica, exemplos de pouca probabilidade/few-shot, ou variáveis de contexto).

### 2. A Reconstrução (A Versão Otimizada)
Recrie cada Skill do zero utilizando as melhores práticas de Prompt Engineering (como delimitação clara de blocos por Markdown, definição cirúrgica de papel/persona, regras de restrição estritas e clareza de objetivos).

Garanta que a nova versão:
1. Maximize a precisão e a utilidade prática dos resultados.
2. Elimine alucinações ou respostas genéricas.
3. Seja modular e fácil de atualizar para que eu possa reinstalá-la de forma otimizada.

---

Por favor, confirme que você compreendeu o seu papel de Engenheiro de Skills e que possui acesso às instruções/skills instaladas no sistema. Assim que confirmar, liste as skills que você identificou para começarmos o processo de otimização uma por uma.`;

export default function SkillsPage() {
  const { copied, showLeadForm, leadSource, copy, closeLeadForm } =
    useCopyWithLead("prompt-skills");

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
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EA8049]/10 border border-[#EA8049]/20 px-4 py-1.5 text-xs font-medium text-[#EA8049]">
          <Wrench className="h-3.5 w-3.5" />
          Engenheiro de Skills
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Otimize suas <span className="text-[#EA8049]">Skills</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Copie o prompt abaixo, cole na sua IA e transforme-a em um Engenheiro
          de Prompts Sênior que audita, diagnostica e reconstrói cada skill
          instalada — deixando tudo mais preciso e sem respostas genéricas.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Copie o prompt clicando no botão abaixo</li>
          <li>
            Cole em uma IA que tenha acesso às suas skills/instruções (ex: Claude
            ou ChatGPT com skills configuradas)
          </li>
          <li>
            A IA confirma o papel e lista as skills que identificou no seu
            ambiente
          </li>
          <li>
            Otimize uma por uma: diagnóstico crítico + versão reconstruída,
            pronta para reinstalar
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

      {/* CTA */}
      <SalesCta utmContent="skills" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span className="text-[#EA8049]">@rafa.grandi</span>
      </p>
    </div>
  );
}
