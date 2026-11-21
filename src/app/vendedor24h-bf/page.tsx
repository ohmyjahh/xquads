"use client";

import { useState } from "react";
import { Check, Copy, KeyRound, MessageCircle, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { BlackBoxBlock, BlackBoxPromos, BlackBoxTopBar } from "@/components/black-box-promos";

const SLUG = "vendedor24h-bf";
const ACCENT = "#D9962B";
const MUTED = "#B9AD9B";
const CARD = "#15100A";
const LINE = "rgba(239,230,214,0.12)";

const STEPS = [
  {
    icon: KeyRound,
    title: "Crie a chave de API na Anthropic",
    text: "Entre no site da Anthropic, clique em API Keys e depois em Create Key. Copie o código que aparecer.",
  },
  {
    icon: MessageCircle,
    title: "Cole a chave no ManyChat",
    text: "No ManyChat, abra Configurações, desça até Integrações, procure pelo Claude e cole a chave de API ali.",
  },
  {
    icon: Sparkles,
    title: "Ensine o Claude a responder",
    text: "Dentro do ManyChat, explique para o Claude como ele deve responder as mensagens. Use o modelo abaixo como ponto de partida.",
  },
];

const MODEL = `Você é o atendente do [NOME DO NEGÓCIO] no Instagram. Responda os directs em português, de forma curta, simpática e direta.

O que eu vendo: [PRODUTO OU SERVIÇO].
Para quem é: [PÚBLICO].
Preço e condições: [PREÇO E FORMAS DE PAGAMENTO].
Link para comprar ou agendar: [LINK].

Como responder:
- Cumprimente pelo nome quando souber.
- Tire a dúvida da pessoa e, em seguida, convide para o próximo passo: [PRÓXIMO PASSO].
- Se a pessoa perguntar algo que não está acima, diga que vai chamar um humano e não invente informação.
- Não prometa resultado que eu não prometi.`;

export default function Vendedor24hBlackBoxPage() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MODEL);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div className="min-h-screen pb-36 md:pb-20" style={{ backgroundColor: "#121214", color: "#FAFAFA" }}>
      <BlackBoxTopBar slug={SLUG} />

      <div className="mx-auto max-w-3xl space-y-8 px-4 pt-20">
        <header className="space-y-3 pt-4 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
            style={{ borderColor: "rgba(217,150,43,0.4)", backgroundColor: "rgba(217,150,43,0.1)", color: ACCENT }}
          >
            <Terminal className="h-3.5 w-3.5" />
            Claude + ManyChat
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Um <span style={{ color: ACCENT }}>vendedor 24 horas</span> respondendo os directs do seu Instagram
          </h1>
          <p className="mx-auto max-w-xl leading-relaxed" style={{ color: MUTED }}>
            Conecte o Claude ao ManyChat em 3 passos e ensine a ele como responder as mensagens.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Passo a passo</h2>
          {STEPS.slice(0, 2).map((s, i) => (
            <article key={s.title} className="flex gap-4 rounded-xl border p-5" style={{ backgroundColor: CARD, borderColor: LINE }}>
              <b
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs"
                style={{ backgroundColor: "rgba(217,150,43,0.12)", color: ACCENT }}
              >
                {i + 1}
              </b>
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <s.icon className="h-4 w-4" style={{ color: ACCENT }} />
                  {s.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                  {s.text}
                </p>
              </div>
            </article>
          ))}
        </section>

        <BlackBoxBlock slug={SLUG} variant="grupo" />

        <section className="space-y-3">
          <article className="flex gap-4 rounded-xl border p-5" style={{ backgroundColor: CARD, borderColor: LINE }}>
            <b
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs"
              style={{ backgroundColor: "rgba(217,150,43,0.12)", color: ACCENT }}
            >
              3
            </b>
            <div>
              <h3 className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4" style={{ color: ACCENT }} />
                {STEPS[2].title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>
                {STEPS[2].text}
              </p>
            </div>
          </article>

          <div className="rounded-xl border p-5" style={{ backgroundColor: CARD, borderColor: LINE }}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">Modelo de instruções de atendimento</h3>
              <button
                type="button"
                onClick={copy}
                className="shrink-0 rounded-md border px-3 py-2 text-xs font-semibold"
                style={{ borderColor: "rgba(217,150,43,0.35)", backgroundColor: "rgba(217,150,43,0.08)", color: ACCENT }}
              >
                {copied ? (
                  <>
                    <Check className="mr-1 inline h-3.5 w-3.5" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 inline h-3.5 w-3.5" /> Copiar modelo
                  </>
                )}
              </button>
            </div>
            <p className="mt-1 text-xs" style={{ color: MUTED }}>
              Troque tudo o que está entre colchetes pelos dados reais do seu negócio.
            </p>
            {copyError && (
              <p className="mt-2 text-xs" style={{ color: ACCENT }}>
                Não deu para copiar automaticamente. Selecione o texto e copie manualmente.
              </p>
            )}
            <pre className="mt-3 whitespace-pre-wrap break-words rounded-lg border p-4 font-mono text-xs leading-relaxed" style={{ borderColor: LINE, backgroundColor: "#0A0703", color: "#d8d2c6" }}>
              {MODEL}
            </pre>
          </div>
        </section>

        <BlackBoxBlock slug={SLUG} variant="desconto" />

        <section
          className="flex gap-3 border-l-2 p-4 text-sm"
          style={{ borderColor: ACCENT, backgroundColor: "rgba(217,150,43,0.06)", color: MUTED }}
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          <div>
            <b style={{ color: ACCENT }}>Cuidados:</b> nunca compartilhe a sua chave de API com ninguém. A chave de API é cobrada por uso, à parte da assinatura do Claude. Teste as respostas com
            uma conta sua antes de ligar para os clientes.
          </div>
        </section>

        <BlackBoxBlock slug={SLUG} variant="contagem" />

        <p className="text-center text-xs" style={{ color: "rgba(250,250,250,0.45)" }}>
          Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
        </p>
      </div>

      <BlackBoxPromos slug={SLUG} />
    </div>
  );
}
