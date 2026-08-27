"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  PenLine,
  Image as ImageIcon,
  Clapperboard,
  Blocks,
  Workflow,
  MessagesSquare,
  Compass,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#06B6D4";

type Ferramenta = {
  nome: string;
  tipo: "Grátis" | "Freemium" | "Pago" | "Open source";
  texto: string;
  url: string;
};

type Categoria = {
  id: string;
  titulo: string;
  icone: typeof PenLine;
  resumo: string;
  atalho: string;
  ferramentas: Ferramenta[];
};

const CATEGORIAS: Categoria[] = [
  {
    id: "texto",
    titulo: "Escrever e pesquisar",
    icone: PenLine,
    resumo: "Onde você conversa, escreve, revisa e estuda.",
    atalho: "ChatGPT, se for uma só",
    ferramentas: [
      {
        nome: "ChatGPT",
        tipo: "Freemium",
        texto: "O mais equilibrado para o dia a dia. Faz um pouco de tudo bem.",
        url: "https://chatgpt.com",
      },
      {
        nome: "Claude",
        tipo: "Freemium",
        texto: "Escreve com mais capricho e aguenta documento longo sem se perder.",
        url: "https://claude.ai",
      },
      {
        nome: "Gemini",
        tipo: "Freemium",
        texto: "Vive dentro do Gmail, do Docs e do Drive. Prático se você já usa Google.",
        url: "https://gemini.google.com",
      },
      {
        nome: "Perplexity",
        tipo: "Freemium",
        texto: "Busca na web e mostra a fonte de cada frase. Bom quando o dado precisa ser checável.",
        url: "https://www.perplexity.ai",
      },
      {
        nome: "NotebookLM",
        tipo: "Grátis",
        texto: "Responde só com base nos arquivos que você subir. Evita invenção.",
        url: "https://notebooklm.google.com",
      },
    ],
  },
  {
    id: "imagem",
    titulo: "Criar imagem",
    icone: ImageIcon,
    resumo: "Post, thumbnail, foto de produto, logo, mockup.",
    atalho: "Nano Banana, no Gemini",
    ferramentas: [
      {
        nome: "Nano Banana Pro",
        tipo: "Grátis",
        texto: "Modelo de imagem do Google, dentro do Gemini. Hoje é o melhor em escrever texto legível na imagem.",
        url: "https://gemini.google.com",
      },
      {
        nome: "ChatGPT",
        tipo: "Freemium",
        texto: "Gera e vai ajustando na mesma conversa, sem precisar reescrever o pedido inteiro.",
        url: "https://chatgpt.com",
      },
      {
        nome: "Freepik",
        tipo: "Freemium",
        texto: "Junta dezenas de modelos numa interface só, com banco de imagem e editor do lado.",
        url: "https://www.freepik.com",
      },
      {
        nome: "Midjourney",
        tipo: "Pago",
        texto: "Estética própria e reconhecível. Escolha de quem quer imagem com assinatura visual.",
        url: "https://www.midjourney.com",
      },
      {
        nome: "Ideogram",
        tipo: "Freemium",
        texto: "Especialista em tipografia, cartaz e logo.",
        url: "https://ideogram.ai",
      },
    ],
  },
  {
    id: "video",
    titulo: "Criar vídeo",
    icone: Clapperboard,
    resumo: "Do clipe gerado do zero até o corte para Reels.",
    atalho: "Google Flow, para começar",
    ferramentas: [
      {
        nome: "Higgsfield",
        tipo: "Pago",
        texto: "Reúne Sora, Veo e Kling numa assinatura só, com controle de câmera e movimento.",
        url: "https://higgsfield.ai",
      },
      {
        nome: "Google Flow",
        tipo: "Freemium",
        texto: "Casa do Veo, dentro do Google Labs. Gera o vídeo já com áudio.",
        url: "https://labs.google/flow",
      },
      {
        nome: "Sora",
        tipo: "Freemium",
        texto: "Da OpenAI. Forte no acabamento cinematográfico.",
        url: "https://sora.com",
      },
      {
        nome: "Kling",
        tipo: "Freemium",
        texto: "Segura o mesmo personagem entre cenas diferentes, o calcanhar da maioria.",
        url: "https://www.klingai.com",
      },
      {
        nome: "Runway",
        tipo: "Freemium",
        texto: "Rápido e cheio de ferramenta de edição em volta da geração.",
        url: "https://runwayml.com",
      },
      {
        nome: "CapCut",
        tipo: "Freemium",
        texto: "A parte chata: cortar, legendar e adaptar para o formato vertical.",
        url: "https://www.capcut.com",
      },
    ],
  },
  {
    id: "app",
    titulo: "Criar seu próprio app",
    icone: Blocks,
    resumo: "Você descreve, a IA constrói e publica.",
    atalho: "Lovable, se você não programa",
    ferramentas: [
      {
        nome: "Claude Code",
        tipo: "Pago",
        texto: "Roda no terminal e constrói projeto inteiro, lendo e editando seus arquivos.",
        url: "https://claude.com/claude-code",
      },
      {
        nome: "Lovable",
        tipo: "Freemium",
        texto: "Você descreve o app e ele monta tela, banco e publicação. O caminho mais curto para quem não programa.",
        url: "https://lovable.dev",
      },
      {
        nome: "Codex",
        tipo: "Pago",
        texto: "Agente de código da OpenAI, para delegar tarefa dentro do seu repositório.",
        url: "https://openai.com/codex",
      },
      {
        nome: "Cursor",
        tipo: "Freemium",
        texto: "Editor de código com IA embutida. Meio do caminho entre programar e pedir.",
        url: "https://cursor.com",
      },
      {
        nome: "Replit",
        tipo: "Freemium",
        texto: "Escreve, roda e publica no navegador, sem instalar nada.",
        url: "https://replit.com",
      },
      {
        nome: "Bolt e v0",
        tipo: "Freemium",
        texto: "Protótipo de interface em minutos. Bons para testar a ideia antes de investir nela.",
        url: "https://bolt.new",
      },
    ],
  },
  {
    id: "automacao",
    titulo: "Automatizar processo",
    icone: Workflow,
    resumo: "Ligar sistemas e deixar a tarefa rodando sozinha.",
    atalho: "n8n, se quiser controle",
    ferramentas: [
      {
        nome: "n8n",
        tipo: "Open source",
        texto: "O mais poderoso dos três e o único que você pode rodar no seu servidor. Hoje é a melhor base para montar agente de IA.",
        url: "https://n8n.io",
      },
      {
        nome: "Make",
        tipo: "Freemium",
        texto: "Fluxo visual com lógica boa. Meio termo entre facilidade e controle.",
        url: "https://www.make.com",
      },
      {
        nome: "Zapier",
        tipo: "Freemium",
        texto: "O mais fácil e o que conecta mais aplicativos. Resolve o simples em minutos.",
        url: "https://zapier.com",
      },
    ],
  },
  {
    id: "atendimento",
    titulo: "Atender cliente",
    icone: MessagesSquare,
    resumo: "WhatsApp, Instagram e o time falando com quem compra.",
    atalho: "ManyChat, para começar",
    ferramentas: [
      {
        nome: "ManyChat",
        tipo: "Freemium",
        texto: "Automação de direct no Instagram e de WhatsApp, com pegada de marketing e captura de lead.",
        url: "https://manychat.com",
      },
      {
        nome: "Evolution API",
        tipo: "Open source",
        texto: "O conector de WhatsApp mais usado no Brasil. É o que liga o Zap a qualquer outra ferramenta desta lista.",
        url: "https://doc.evolution-api.com",
      },
      {
        nome: "Typebot",
        tipo: "Open source",
        texto: "Monta o fluxo de conversa arrastando bloco, sem programar.",
        url: "https://typebot.io",
      },
      {
        nome: "Chatwoot",
        tipo: "Open source",
        texto: "Central de atendimento de verdade: vários canais e vários atendentes na mesma caixa.",
        url: "https://www.chatwoot.com",
      },
      {
        nome: "Botpress",
        tipo: "Freemium",
        texto: "Agente que interpreta a intenção do cliente em vez de empurrar menu de opções.",
        url: "https://botpress.com",
      },
    ],
  },
];

const TOTAL = CATEGORIAS.reduce((n, c) => n + c.ferramentas.length, 0);

const CORES_TIPO: Record<Ferramenta["tipo"], string> = {
  "Grátis": "#4ADE80",
  Freemium: "#06B6D4",
  Pago: "#F59E0B",
  "Open source": "#A78BFA",
};

export default function FerramentasPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);

  const storedLead = useSyncExternalStore(
    () => () => {},
    () => hasCapturedLead(),
    () => false
  );
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
          PRÉVIA LOCAL · conteúdo aberto. Em produção, a lista completa fica protegida.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Compass className="h-4 w-4" />
          Mapa de ferramentas
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          As ferramentas de IA que <span style={{ color: ACCENT }}>valem o seu tempo</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          {TOTAL} ferramentas separadas por objetivo, não por tecnologia. Você chega sabendo o
          que quer fazer e sai sabendo qual abrir.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Como usar esta lista</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Ninguém precisa das {TOTAL}. Escolha uma por categoria, use por duas semanas e só
          troque quando ela travar no seu caminho. A maioria tem plano grátis suficiente para
          você decidir sem pagar nada. Onde aparece Pago, não existe versão gratuita que
          resolva de verdade.
        </p>
        <p className="mt-3 text-xs text-[#666]">
          Sem link de afiliado. Sem preço em número, porque valor muda por país e por plano.
          Lista conferida em agosto de 2026.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Se você quiser só uma de cada</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {CATEGORIAS.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-3 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] px-4 py-3"
            >
              <cat.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-[#666]">
                  {cat.titulo}
                </p>
                <p className="truncate text-sm font-medium">{cat.atalho}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="ferramentas-page"
          accent={ACCENT}
          buttonTextColor="#03212a"
          title="Receba o mapa completo"
          description="Preencha seus dados para liberar as ferramentas de cada categoria com link e comparação."
          contentNote={`Você vai liberar: ${TOTAL} ferramentas em 6 categorias, com o que cada uma faz de diferente e o link oficial.`}
          buttonLabel="Liberar as ferramentas"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-10">
          {CATEGORIAS.map((cat) => (
            <section key={cat.id} className="space-y-4">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                  <cat.icone className="h-5 w-5" style={{ color: ACCENT }} />
                  {cat.titulo}
                </h2>
                <p className="mt-1 text-sm text-[#888]">{cat.resumo}</p>
              </div>
              <div className="space-y-2">
                {cat.ferramentas.map((f) => (
                  <a
                    key={f.nome}
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4 transition-colors hover:border-[#06B6D4]/40"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{f.nome}</h3>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            backgroundColor: `${CORES_TIPO[f.tipo]}1A`,
                            color: CORES_TIPO[f.tipo],
                          }}
                        >
                          {f.tipo}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[#999]">{f.texto}</p>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#555] transition-colors group-hover:text-[#06B6D4]"
                    />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <SalesCta utmContent="ferramentas" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
