"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  MessageSquare,
  Download,
  UserPlus,
  GraduationCap,
  Instagram,
  Clock,
  Repeat,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#A3E635";

const TREINAMENTO = `Você é o vendedor da minha empresa no direct do Instagram. Fale como gente, não como robô.

QUEM SOMOS
- O que eu vendo: [descreva em uma frase]
- Para quem: [quem é o cliente — profissão, momento, o que ele já tentou]
- Faixa de preço: [valor ou "só falo de preço depois de entender a necessidade"]
- O que nos diferencia: [1 ou 2 coisas concretas, sem adjetivo vazio]

COMO ABRIR A CONVERSA
Nunca comece vendendo. Comece pelo que a pessoa mostrou interesse: o post que ela curtiu, o story que ela respondeu, a dúvida que ela mandou. Uma pergunta só, curta, que dê vontade de responder.

AS PERGUNTAS QUE VOCÊ PRECISA FAZER (uma por vez, nunca em lista)
1. [o que a pessoa está tentando resolver]
2. [há quanto tempo, o que já tentou]
3. [o que acontece se continuar como está]
4. [se a decisão é dela ou de mais alguém]

TOM
- Mensagens curtas, de uma a três linhas. Nada de textão.
- Uma pergunta por mensagem. Espere a resposta.
- Linguagem do dia a dia, sem palavra difícil e sem emoji em excesso.
- Se a pessoa demorar a responder, não cobre.

O QUE VOCÊ NUNCA FAZ
- Não manda a mesma mensagem copiada para todo mundo.
- Não insiste depois de um "não". Agradeça e encerre.
- Não inventa preço, prazo, resultado, garantia nem caso de cliente.
- Não promete número ("você vai faturar X").
- Não discute, não ironiza, não responde provocação.

QUANDO PASSAR PARA MIM
Me avise e pare de responder quando: a pessoa pedir para falar com humano, falar em fechar ou pagar, reclamar de algo sério, ou quando você não tiver certeza da resposta. É melhor parar do que inventar.`;

const PASSOS = [
  {
    n: "1",
    icone: Download,
    titulo: "Instale o OpenBot e conecte a sua IA",
    texto:
      "O programa é gratuito. A inteligência vem da assinatura que você já paga — Claude ou ChatGPT. Se ainda não instalou, o passo a passo está na página do OpenBot, ali embaixo.",
  },
  {
    n: "2",
    icone: UserPlus,
    titulo: "Crie o agente vendedor",
    texto:
      "Um agente novo, só para isso, com nome próprio e pasta própria. Não aproveite um agente que você já usa para outra coisa: a instrução de um atrapalha a do outro.",
  },
  {
    n: "3",
    icone: GraduationCap,
    titulo: "Treine ele como você treinaria um vendedor",
    texto:
      "Este é o passo que decide tudo. Agente sem treino responde genérico e a pessoa percebe na primeira mensagem. Abaixo tem um molde pronto: preencha os colchetes com a sua realidade e cole nas instruções dele.",
  },
  {
    n: "4",
    icone: Instagram,
    titulo: "Dê acesso ao seu Instagram",
    texto:
      "Peça para ele abrir o navegador interno do OpenBot e faça o login você mesmo, na sua mão. A sessão fica no seu computador.",
  },
  {
    n: "5",
    icone: Clock,
    titulo: "Monte as rotinas do dia",
    texto:
      "No vídeo eu uso quatro: 9h, meio-dia, 15h e 19h. Em cada uma ele entra, puxa conversa e responde quem respondeu. Comece com uma só por dia na primeira semana.",
  },
  {
    n: "6",
    icone: Repeat,
    titulo: "Configure o follow-up",
    texto:
      "É aqui que está o dinheiro que todo mundo deixa na mesa. Quem não respondeu entra numa régua: 2, 5, 9, 15 e 30 dias. Cada toque com um ângulo diferente, nunca o mesmo texto repetido.",
  },
];

const AVISO =
  "Automatizar direct vai contra os termos da Meta, então não trabalhe um volume muito grande por dia. Comece devagar e vá aumentando.";

function CopyButton({ text }: { text: string }) {
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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#A3E635]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar o treinamento
          </>
        )}
      </button>
      {estado === "erro" && (
        <span className="text-xs text-[#FCA5A5]">
          Seu navegador bloqueou a cópia. Selecione o texto abaixo e copie na mão.
        </span>
      )}
    </div>
  );
}

export default function SocialPage() {
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
          <MessageSquare className="h-4 w-4" />O passo a passo do vídeo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Um vendedor de IA{" "}
          <span style={{ color: ACCENT }}>respondendo os seus directs</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Ele puxa conversa, faz as perguntas certas, qualifica quem tem interesse de verdade e
          volta para quem sumiu. O programa é de graça: a inteligência vem da assinatura que você
          já paga.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] px-5 py-4">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-[#999]">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          {AVISO}
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="social-page"
          accent={ACCENT}
          buttonTextColor="#15200a"
          title="Receba o passo a passo"
          description="Preencha seus dados para liberar as seis etapas e o treinamento do vendedor."
          contentNote="Você vai liberar: as seis etapas, o molde de treinamento do vendedor pronto para copiar e a régua de follow-up."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Como montar</h2>
            {PASSOS.map((p) => (
              <article
                key={p.n}
                className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold"
                  style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                >
                  {p.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <p.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    {p.titulo}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">O treinamento do vendedor</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Cole isto nas instruções do agente e troque o que está entre colchetes pela sua
              realidade. Quanto mais específico, menos ele parece robô — o que está entre
              colchetes é justamente o que nenhuma IA adivinha sobre o seu negócio.
            </p>
            <div className="space-y-2">
              <CopyButton text={TREINAMENTO} />
              <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                  {TREINAMENTO}
                </pre>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">A régua de follow-up</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Quem não respondeu entra em <strong className="text-white">2, 5, 9, 15 e 30 dias</strong>.
              A regra que faz isso funcionar em vez de irritar: cada toque com um ângulo novo —
              uma dúvida comum, um caso parecido com o dela, uma pergunta curta. Nunca o mesmo
              texto de novo. E ao primeiro &quot;não tenho interesse&quot;, a régua acaba ali.
            </p>
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Ainda não tem o OpenBot?</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              A instalação e o primeiro agente estão explicados em{" "}
              <a
                href="/xquads/openbot"
                className="underline underline-offset-4"
                style={{ color: ACCENT }}
              >
                sowsales.com.br/xquads/openbot
              </a>
              . Monte um agente simples primeiro, veja funcionando, e só então faça o vendedor.
            </p>
          </section>

          <a
            href="/xquads/openbot"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#15200a", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Ver como instalar o OpenBot
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
        </div>
      )}

      <SalesCta utmContent="social" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
