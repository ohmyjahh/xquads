"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Mail,
  Plane,
  CalendarClock,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#0866FF";
const SITE = "https://muse.ai/";

const ACOES = [
  { icone: Mail, titulo: "Escreve e envia e-mail", texto: "Redige, responde e dispara pela sua conta, com a permissão que você der." },
  { icone: Plane, titulo: "Reserva viagem", texto: "Pesquisa, compara e fecha passagem e hospedagem." },
  { icone: CalendarClock, titulo: "Cuida da agenda", texto: "Marca compromisso, remarca e cobra o que ficou pendente." },
  { icone: ShoppingBag, titulo: "Compra e preenche formulário", texto: "Executa a burocracia repetitiva em sites e aplicativos." },
];

const ACESSOS = [
  { nome: "Aplicativo", texto: "iOS e Android, o caminho principal." },
  { nome: "Web", texto: "Direto no navegador, em muse.ai." },
  { nome: "WhatsApp", texto: "Conversa com o agente pelo mesmo lugar onde você já fala com todo mundo." },
  { nome: "Óculos de IA", texto: "Anunciado como próximo passo, ainda não disponível." },
];

export default function MusePage() {
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
          <Sparkles className="h-4 w-4" />
          Lançado em 8 de setembro
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O <span style={{ color: ACCENT }}>Muse</span> não responde pergunta. Ele faz a tarefa
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          A Meta lançou seu agente pessoal de IA. Em vez de te dar instruções do que fazer, ele
          entra nos seus aplicativos e executa, com a permissão que você conceder.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">O que ele faz</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACOES.map((a) => (
            <article key={a.titulo} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
              <a.icone className="h-5 w-5" style={{ color: ACCENT }} />
              <h3 className="mt-3 font-semibold">{a.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{a.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ShieldCheck className="h-4 w-4" style={{ color: ACCENT }} />
          Onde seus dados ficam
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          O agente roda dentro de uma máquina virtual isolada, a Muse Secure VM, e a Meta afirma
          que o que você conecta ali não alimenta os sistemas de publicidade dela. É a promessa da
          empresa, e vale ler os termos antes de conectar e-mail ou cartão.
        </p>
        <p className="mt-3 text-xs text-[#666]">
          Por baixo roda o Muse Spark, modelo próprio da Meta. Gratuito para a maior parte do uso,
          com planos pagos para quem for além. Informações conferidas em 10 de setembro de 2026,
          dois dias após o lançamento.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="muse-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Receba o acesso e o guia rápido"
          description="Preencha seus dados para liberar o link oficial, as formas de acesso e o que checar antes de conectar suas contas."
          contentNote="Você vai liberar: o endereço oficial da Meta, os quatro caminhos de acesso e a lista do que revisar antes de dar permissão ao agente."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-xl border p-5 transition-opacity hover:opacity-90"
            style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}14` }}
          >
            <div>
              <p className="font-semibold" style={{ color: ACCENT }}>
                Abrir o Muse
              </p>
              <p className="mt-1 text-sm text-[#999]">muse.ai · site oficial da Meta</p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          </a>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Por onde dá para usar</h2>
            <div className="space-y-2">
              {ACESSOS.map((a) => (
                <article
                  key={a.nome}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
                >
                  <h3 className="font-semibold">{a.nome}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{a.texto}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <MessageCircle className="h-5 w-5" style={{ color: ACCENT }} />
              Antes de conectar suas contas
            </h2>
            <div className="space-y-2">
              {[
                "Comece pelo que é reversível. Deixe o agente organizar agenda antes de deixar ele enviar e-mail no seu nome.",
                "Conceda uma permissão por vez e veja o que ele faz com ela. Agente que executa erra em silêncio quando ninguém confere.",
                "Não conecte pagamento no primeiro dia. Compra é a ação mais difícil de desfazer.",
                "Leia o que a Meta diz sobre uso dos dados. A promessa de isolamento é da empresa, não uma garantia externa.",
              ].map((t) => (
                <p
                  key={t}
                  className="rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] px-4 py-3 text-sm leading-relaxed text-[#bbb]"
                >
                  {t}
                </p>
              ))}
            </div>
          </section>
        </div>
      )}

      <SalesCta utmContent="muse" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
