"use client";

import {
  Copy,
  Check,
  Mic,
  Brain,
  AudioLines,
  Database,
  FileText,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";
import { SalesCta } from "@/components/sales-cta";

const PROMPT = `# BRIEFING: Aplicativo de Clonagem de Voz

Você é um engenheiro full-stack sênior especializado em construir aplicativos com IA. Sua tarefa é criar um **aplicativo web simples de clonagem de voz**: o usuário faz uma pergunta (por texto ou áudio) e recebe a resposta **na voz clonada** de uma pessoa específica, com a personalidade e o conhecimento dela.

## O QUE O APP FAZ

1. O usuário digita (ou fala) uma pergunta no app.
2. O app envia a pergunta para o ChatGPT, que já tem acesso a um **arquivo de base de conhecimento** (a personalidade, o jeito de falar e as informações da pessoa que estamos clonando).
3. O ChatGPT gera a resposta em texto, no tom e no estilo daquela pessoa.
4. O app envia esse texto para o Eleven Labs, que devolve o **áudio na voz clonada**.
5. O app toca o áudio para o usuário e salva a conversa no banco de dados.

## ARQUITETURA (siga exatamente este fluxo)

- **App / Frontend** — a interface onde a pessoa conversa. É o centro que orquestra tudo.
- **App → ChatGPT (via API)** — gera a resposta em texto. Alimentado pelo **arquivo de base de conhecimento**.
- **App → Eleven Labs (via API)** — transforma o texto da resposta em voz clonada.
- **App → Banco de dados (via API)** — guarda o histórico de conversas e os dados do usuário.

## STACK SUGERIDA

- **Frontend:** React + Vite (ou Next.js). Interface limpa, mobile-first, com um campo de pergunta, um botão de enviar e um player de áudio.
- **IA (cérebro):** OpenAI API (ChatGPT) — modelo de chat com um *system prompt* que injeta a base de conhecimento da pessoa.
- **Voz:** Eleven Labs API — usar o endpoint de Text-to-Speech com o \`voice_id\` da voz clonada.
- **Banco de dados:** Supabase — tabela de conversas (pergunta, resposta, áudio_url, timestamp) e autenticação simples.

## FUNCIONALIDADES MÍNIMAS

1. Campo de texto para a pergunta + botão "Perguntar".
2. Chamada ao ChatGPT com o system prompt contendo a base de conhecimento.
3. Chamada ao Eleven Labs com o texto retornado, tocando o áudio automaticamente.
4. Player de áudio com play/pause.
5. Histórico das últimas conversas persistido no Supabase.
6. Estados de carregamento ("pensando...", "gerando voz...") e tratamento de erro.

## CONFIGURAÇÃO (variáveis de ambiente)

- \`OPENAI_API_KEY\` — chave da OpenAI
- \`ELEVENLABS_API_KEY\` — chave do Eleven Labs
- \`ELEVENLABS_VOICE_ID\` — id da voz clonada
- \`SUPABASE_URL\` e \`SUPABASE_ANON_KEY\` — credenciais do Supabase

⚠️ As chamadas às APIs de IA e voz devem passar por uma rota de backend (API route / serverless), **nunca expondo as chaves no frontend**.

## BASE DE CONHECIMENTO

Deixe um arquivo \`base-de-conhecimento.md\` separado e bem comentado, onde eu vou colar:
- Quem é a pessoa (bio, tom de voz, forma de falar, bordões)
- Assuntos que ela domina
- Como ela responde (curta/longa, formal/informal, com humor, etc.)

Esse conteúdo deve ser injetado no *system prompt* do ChatGPT.

## FORMATO DE ENTREGA

- Código completo e funcional, organizado em arquivos.
- Um \`README.md\` com o passo a passo: como pegar cada chave de API (OpenAI, Eleven Labs, Supabase), onde colar, e como rodar o projeto localmente.
- Comentários em português explicando cada parte importante.
- Interface em português brasileiro.

Comece explicando em poucas linhas como o app vai funcionar e qual arquivo faz o quê. Depois entregue o código completo.`;

const FLOW_NODES = [
  {
    icon: Brain,
    title: "ChatGPT",
    role: "O cérebro",
    desc: "Gera a resposta em texto, com a personalidade e o conhecimento da pessoa.",
    color: "#3BA856",
  },
  {
    icon: AudioLines,
    title: "Eleven Labs",
    role: "A voz",
    desc: "Transforma o texto da resposta na voz clonada da pessoa.",
    color: "#8B5CF6",
  },
  {
    icon: Database,
    title: "Supabase",
    role: "Banco de dados",
    desc: "Guarda o histórico de conversas e os dados do usuário.",
    color: "#3BA856",
  },
];

const TOOLS = [
  {
    icon: LayoutTemplate,
    name: "App / Frontend",
    tag: "A interface",
    desc: "Onde a pessoa conversa. Pode ser construído com Lovable, v0, Claude ou React puro. É o centro que conecta tudo.",
  },
  {
    icon: Brain,
    name: "ChatGPT",
    tag: "Inteligência",
    desc: "A API da OpenAI gera as respostas em texto, alimentada pela base de conhecimento da pessoa.",
  },
  {
    icon: AudioLines,
    name: "Eleven Labs",
    tag: "Voz",
    desc: "Clona a voz da pessoa e transforma qualquer texto em áudio idêntico ao dela.",
  },
  {
    icon: Database,
    name: "Supabase",
    tag: "Banco de dados",
    desc: "Armazena o histórico das conversas, os áudios gerados e a autenticação dos usuários.",
  },
  {
    icon: FileText,
    name: "Base de conhecimento",
    tag: "A alma",
    desc: "Um arquivo com o jeito de falar, os assuntos e a personalidade da pessoa. É o que faz o clone soar real.",
  },
];

export default function VirginiaPage() {
  const { copied, showLeadForm, leadSource, copy, closeLeadForm } =
    useCopyWithLead("prompt-virginia");

  const handleCopy = () => copy(PROMPT);

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
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EA8049]/10 border border-[#EA8049]/20 px-4 py-1.5 text-xs font-medium text-[#EA8049]">
          <Mic className="h-3.5 w-3.5" />
          App de Clonagem de Voz
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Clone a sua <span className="text-[#EA8049]">Voz</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Aprenda a montar um aplicativo simples que responde qualquer pergunta
          na sua própria voz — com a sua personalidade e o seu conhecimento.
          Sem saber programar.
        </p>
      </div>

      {/* Como funciona (arquitetura) */}
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-white">Como o app funciona</h2>
          <p className="text-sm text-[#888]">
            São só 4 peças conversando entre si por API.
          </p>
        </div>

        {/* Diagrama */}
        <div className="rounded-2xl border border-[#2a2a2e] bg-[#141416] p-5 sm:p-8 space-y-6">
          {/* Nó central */}
          <div className="flex justify-center">
            <div className="w-full sm:w-2/3 rounded-xl border border-[#EA8049]/40 bg-[#EA8049]/10 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-[#EA8049] font-semibold">
                <LayoutTemplate className="h-4 w-4" />
                App / Frontend
              </div>
              <p className="text-xs text-[#999] mt-1">
                A pessoa faz a pergunta aqui
              </p>
            </div>
          </div>

          {/* Conector */}
          <div className="flex justify-center">
            <span className="text-[11px] font-mono text-[#EA8049] border border-[#EA8049]/30 rounded-full px-3 py-0.5">
              chamadas via API ↓
            </span>
          </div>

          {/* Nós filhos */}
          <div className="grid gap-3 sm:grid-cols-3">
            {FLOW_NODES.map((n) => (
              <div
                key={n.title}
                className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-4 space-y-2"
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${n.color}18` }}
                >
                  <n.icon className="h-5 w-5" style={{ color: n.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  <p className="text-[11px] uppercase tracking-wider text-[#666]">
                    {n.role}
                  </p>
                </div>
                <p className="text-xs text-[#888] leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>

          {/* Base de conhecimento -> ChatGPT */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-[#999] border-t border-[#2a2a2e] pt-5">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a1a1e] border border-[#2a2a2e] px-3 py-1.5">
              <FileText className="h-3.5 w-3.5 text-[#FBBF24]" />
              Arquivo de base de conhecimento
            </span>
            <ArrowRight className="h-4 w-4 text-[#EA8049]" />
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a1a1e] border border-[#2a2a2e] px-3 py-1.5">
              <Brain className="h-3.5 w-3.5 text-[#3BA856]" />
              alimenta o ChatGPT
            </span>
          </div>
        </div>
      </div>

      {/* Ferramentas */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-white">
            As ferramentas que você vai usar
          </h2>
          <p className="text-sm text-[#888]">
            Todas têm plano gratuito ou barato para começar.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-4 flex gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EA8049]/10">
                <t.icon className="h-5 w-5 text-[#EA8049]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <span className="text-[10px] uppercase tracking-wider text-[#EA8049] bg-[#EA8049]/10 rounded px-1.5 py-0.5">
                    {t.tag}
                  </span>
                </div>
                <p className="text-xs text-[#888] leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Como usar o prompt */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Copie o prompt abaixo clicando no botão</li>
          <li>Cole em uma IA que constrói apps (Lovable, v0, Claude ou ChatGPT)</li>
          <li>
            A IA entrega o código completo do app + um passo a passo de como pegar
            cada chave de API
          </li>
          <li>
            Crie sua voz no Eleven Labs, monte sua base de conhecimento e conecte
            tudo
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
      <SalesCta utmContent="virginia" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span className="text-[#EA8049]">@rafa.grandi</span>
      </p>
    </div>
  );
}
