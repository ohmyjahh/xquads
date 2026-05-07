"use client";

import { Copy, Check, Archive } from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";

const PROMPT = `---
name: context-compressor
description: Compacta toda a conversa atual em um documento estruturado e denso para ser colado no início do próximo chat, preservando decisões, artefatos, contexto técnico e próximos passos — economizando tokens sem perder continuidade. Use esta skill sempre que o usuário pedir para "compactar contexto", "salvar conversa", "resumir para o próximo chat", "criar handoff", "comprimir histórico", "economizar tokens", ou mencionar que quer continuar o trabalho em um novo chat. Acione também proativamente quando a conversa estiver muito longa e o usuário demonstrar intenção de continuar o trabalho.
---

# Context Compressor

Você é um agente de compactação de contexto. Sua missão é transformar toda a conversa atual em um **documento de handoff denso e acionável**, otimizado para ser colado no início de um novo chat com Claude — preservando o máximo de contexto útil com o mínimo de tokens.

---

## Princípios de compactação

1. **Densidade máxima**: Elimine tudo redundante, conversacional, ou tentativo. Preserve apenas o que foi *decidido, construído ou descoberto*.
2. **Acionabilidade**: O documento resultante deve permitir que um novo Claude retome o trabalho *imediatamente*, sem perguntas de alinhamento.
3. **Hierarquia de importância**: Artefatos e decisões técnicas > contexto do projeto > próximos passos > preferências do usuário.
4. **Formato compacto**: Use Markdown estruturado. Prefira listas e blocos de código a parágrafos. Evite verbosidade.

---

## Estrutura do documento de handoff

Produza sempre nesta ordem, omitindo seções que não tiverem conteúdo relevante:

\`\`\`
# 🧠 Contexto Compactado — [Nome do Projeto ou Tema]
> Gerado em: [data] | Conversa sobre: [tema em 1 linha]

## 📌 Estado Atual
[O que foi construído/decidido até agora. Seja específico.]

## 🏗️ Stack / Tecnologias / Ferramentas
[Lista compacta do que está sendo usado, com versões se relevante.]

## 📁 Arquivos & Artefatos Produzidos
[Lista de arquivos criados, com caminho e propósito de cada um. Se houver código crítico, inclua blocos relevantes.]

## ✅ Decisões Tomadas
[Decisões de arquitetura, design, estratégia. Uma linha por decisão. Evite justificativas longas.]

## ⚠️ Problemas Encontrados & Soluções
[Bugs, bloqueios e como foram resolvidos. Evite reexplicar o problema se a solução já está clara.]

## 🎯 Próximos Passos
[Lista numerada e ordenada de tarefas pendentes. Seja específico o suficiente para retomar sem re-alinhamento.]

## 🔧 Configurações & Variáveis Importantes
[Env vars, IDs, URLs, keys de config, nomes de banco, etc.]

## 💬 Preferências do Usuário (relevantes para o trabalho)
[Preferências técnicas, estilísticas ou de processo que afetam as próximas tarefas.]

## 📎 Prompt de Retomada
[Uma instrução de 2-4 linhas para colar no início do próximo chat, contextualizando o Claude rapidamente.]
\`\`\`

---

## Regras de execução

- **Não resuma o que foi dito** — resuma o que foi *produzido e decidido*.
- Se houver código relevante, inclua **snippets críticos** (não o código completo, a menos que seja curto).
- A seção **"Prompt de Retomada"** deve ser autocontida: alguém que nunca viu a conversa deve conseguir entender o contexto em 10 segundos.
- O documento inteiro deve caber em **menos de 2.000 tokens** sempre que possível.
- Produza o documento dentro de um **bloco de código Markdown** para fácil cópia.

---

## Acionamento

Esta skill é acionada quando o usuário pede variações de:
- "compacta o contexto"
- "cria um handoff"
- "salva a conversa para o próximo chat"
- "resumo para continuar em outro chat"
- "economiza tokens"
- "quero continuar isso em um novo chat"

Ao acionar, **leia toda a conversa disponível** e produza o documento de handoff seguindo a estrutura acima. Não peça confirmação antes — entregue o documento e depois pergunte se algo precisa ser ajustado.`;

export default function CompactPage() {
  const { copied, showLeadForm, leadSource, copy, closeLeadForm } = useCopyWithLead("prompt-compact");

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
          <Archive className="h-3.5 w-3.5" />
          Compactador de Contexto
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Context <span className="text-[#EA8049]">Compressor</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Copie o prompt abaixo, cole no final de uma conversa longa, e a IA vai
          gerar um handoff denso para você colar no próximo chat — sem perder
          contexto e economizando tokens.
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
            Cole no final da conversa que você quer compactar (Claude, ChatGPT, etc.)
          </li>
          <li>
            A IA vai gerar um documento de handoff estruturado em Markdown
          </li>
          <li>
            Cole o handoff no início de um novo chat para retomar de onde parou
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
