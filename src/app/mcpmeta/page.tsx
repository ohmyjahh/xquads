"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Facebook,
  BookOpen,
  BarChart3,
  Settings2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";
import { SalesCta } from "@/components/sales-cta";

const MCP_URL = "https://mcp.facebook.com/ads";

const PROMPTS = [
  "Liste todas as minhas contas de anuncios do Facebook conectadas",
  "Mostre as campanhas ativas e o gasto dos ultimos 7 dias",
  "Qual campanha teve o melhor ROAS no ultimo mes? Me de insights para otimizacao",
  "Compare o desempenho dos meus ad sets por publico e recomende realocacao de verba",
  "Analise os criativos com mais cliques e sugira melhorias no copy e CTA",
];

const CAPABILITIES = [
  {
    tag: "Leitura",
    title: "Ver contas e campanhas",
    desc: "Lista ad accounts, campanhas ativas, status e metricas gerais.",
    icon: BookOpen,
    color: "#1877F2",
  },
  {
    tag: "Analise",
    title: "Analisar performance",
    desc: "CTR, CPM, ROAS, alcance e gasto por periodo, ad set ou criativo.",
    icon: BarChart3,
    color: "#3BA856",
  },
  {
    tag: "Gestao",
    title: "Gerenciar campanhas",
    desc: "Alteracoes exigem confirmacao explicita antes de serem aplicadas.",
    icon: Settings2,
    color: "#FBBF24",
  },
  {
    tag: "Criacao",
    title: "Criar anuncios",
    desc: "Suporte a creative testing simples e A/B com multiplos headlines.",
    icon: Sparkles,
    color: "#8B5CF6",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Abra Personalizar > Conectores",
    desc: "No claude.ai, clique em Personalizar e em seguida em Conectores.",
  },
  {
    n: 2,
    title: 'Adicionar conector personalizado',
    desc: 'Clique no "+" e selecione "Adicionar conector personalizado".',
  },
  {
    n: 3,
    title: "Preencha nome e URL",
    desc: "Nome: Facebook  ·  URL do servidor MCP (copie abaixo).",
  },
  {
    n: 4,
    title: "Vincule sua conta no Meta Ads",
    desc: "Autentique via OAuth — o servidor MCP cuida do resto. Pronto, pode usar.",
  },
];

export default function McpMetaPage() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);
  const { showLeadForm, leadSource, copy, closeLeadForm } = useCopyWithLead("mcpmeta-url");

  const copyUrl = async () => {
    await copy(MCP_URL, "mcpmeta-url");
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const copyPrompt = async (text: string, idx: number) => {
    await copy(text, `mcpmeta-prompt-${idx}`);
    setCopiedPromptIdx(idx);
    setTimeout(() => setCopiedPromptIdx(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-10">
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
        <div className="inline-flex items-center gap-2 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 px-4 py-1.5 text-xs font-medium text-[#1877F2]">
          <Facebook className="h-3.5 w-3.5" />
          MCP · Meta Ads
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Facebook Ads <span className="text-[#1877F2]">MCP</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Controle suas campanhas do Meta Ads via linguagem natural no Claude.
        </p>
      </div>

      {/* O que e */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          O que e
        </h2>
        <p className="text-sm text-[#bbb] leading-relaxed">
          O <span className="text-white font-medium">MCP (Model Context Protocol) do Facebook Ads</span> conecta
          o Claude diretamente a sua conta de anuncios Meta, permitindo consultar
          dados, analisar performance e gerenciar campanhas sem acessar o
          Gerenciador de Anuncios.
        </p>
      </div>

      {/* Como ativar */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como ativar
        </h2>

        <div className="space-y-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] text-sm font-semibold">
                {s.n}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-[#999] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* URL copiavel */}
        <div className="rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/5 p-4 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-wider text-[#1877F2] font-semibold mb-1">
                URL do servidor MCP
              </p>
              <code className="block text-sm sm:text-base text-white font-mono truncate">
                {MCP_URL}
              </code>
            </div>
            <button
              onClick={copyUrl}
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#1877F2] hover:bg-[#1565d8] text-white text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
            >
              {copiedUrl ? (
                <>
                  <Check className="h-4 w-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* O que voce pode fazer */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          O que voce pode fazer
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${c.color}15` }}
                >
                  <c.icon className="h-4 w-4" style={{ color: c.color }} />
                </div>
                <span
                  className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${c.color}15`, color: c.color }}
                >
                  {c.tag}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white">{c.title}</h3>
              <p className="text-xs text-[#888] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prompts uteis */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Prompts uteis para comecar
        </h2>
        <div className="space-y-2">
          {PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => copyPrompt(p, idx)}
              className="w-full text-left rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#1877F2]/40 hover:bg-[#1a1a1e]/80 p-4 flex items-center gap-3 transition-colors cursor-pointer group"
            >
              <span className="flex-1 text-sm text-[#ccc] group-hover:text-white transition-colors">
                {p}
              </span>
              {copiedPromptIdx === idx ? (
                <Check className="h-4 w-4 shrink-0 text-[#3BA856]" />
              ) : (
                <Copy className="h-4 w-4 shrink-0 text-[#666] group-hover:text-[#1877F2] transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Importante saber */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Importante saber
        </h2>

        <div className="rounded-xl border border-[#3BA856]/30 bg-[#3BA856]/5 p-4 flex gap-3">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[#3BA856] mt-0.5" />
          <p className="text-sm text-[#bbb] leading-relaxed">
            Toda alteracao nas campanhas exige{" "}
            <span className="text-white font-medium">confirmacao explicita sua</span>{" "}
            antes de ser executada.
          </p>
        </div>

        <div className="rounded-xl border border-[#FBBF24]/30 bg-[#FBBF24]/5 p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-[#FBBF24] mt-0.5" />
          <p className="text-sm text-[#bbb] leading-relaxed">
            O token de acesso Meta pode expirar. Se a conexao falhar, reconecte
            nas configuracoes.
          </p>
        </div>

        <div className="rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/5 p-4 flex gap-3">
          <Info className="h-5 w-5 shrink-0 text-[#1877F2] mt-0.5" />
          <p className="text-sm text-[#bbb] leading-relaxed">
            Funciona com Facebook, Instagram e todas as plataformas Meta Ads em
            uma mesma conta.
          </p>
        </div>
      </div>

      {/* CTA */}
      <SalesCta utmContent="mcpmeta" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span className="text-[#1877F2]">@rafa.grandi</span>
      </p>
    </div>
  );
}
