"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Bot,
  ArrowUpRight,
  Copy,
  AlertTriangle,
  MessageCircle,
  CalendarCheck,
  FileText,
  ListOrdered,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#2DD4BF";

const RECEBE = [
  {
    icone: ListOrdered,
    nome: "O fluxo em 4 etapas",
    texto: "Da mensagem da paciente à consulta confirmada: o que entra e o que sai de cada etapa.",
  },
  {
    icone: Bot,
    nome: "O prompt do agente",
    texto: "Pronto para copiar: tom de voz, regras e quando passar a conversa para uma pessoa da equipe.",
  },
  {
    icone: CalendarCheck,
    nome: "A agenda de verdade",
    texto: "Como consultar os horários livres antes de oferecer, para o agente não inventar horário.",
  },
  {
    icone: MessageCircle,
    nome: "As mensagens prontas",
    texto: "Confirmação, endereço com localização, lembrete antes da consulta e aviso para a equipe.",
  },
];

const ALERTAS = [
  "O agente não faz diagnóstico nem substitui a avaliação do dentista. Dor forte, sangramento, trauma ou qualquer urgência vai para uma pessoa da equipe: o prompt abaixo já traz essa regra.",
  "Dado de saúde é dado pessoal sensível pela LGPD (art. 5º, II). Antes de usar com pacientes de verdade, combine com a clínica o consentimento e onde os dados ficam guardados, e consulte um profissional de direito se tiver dúvida.",
  "No WhatsApp Business, a empresa só pode mandar mensagem livre dentro de uma janela de 24 horas, que abre quando a paciente escreve. Fora dela, só template de mensagem aprovado. O lembrete de véspera costuma cair fora da janela, então precisa ser um template.",
  "Este material é um modelo para você adaptar e testar. Não foi usado em uma clínica real. Troque horários, endereço e regras pelos da clínica e teste com mensagens de mentira antes de ligar com pacientes.",
];

const ETAPAS = [
  {
    n: "1",
    titulo: "Receber a mensagem",
    entra: "A paciente escreve ou manda um áudio no WhatsApp da clínica.",
    sai: "A sua automação recebe o aviso (webhook) do WhatsApp Business Platform, com o texto ou o áudio.",
  },
  {
    n: "2",
    titulo: "Transcrever o áudio",
    entra: "O arquivo de áudio, se a mensagem for um áudio.",
    sai: "O texto do que a paciente disse. Mensagens de texto pulam esta etapa.",
  },
  {
    n: "3",
    titulo: "Decidir e consultar a agenda",
    entra: "O texto da paciente e o prompt do agente.",
    sai: "Se for urgência, a conversa vai para a equipe. Se não, a automação consulta os horários livres na agenda (no Google Agenda, o método freeBusy devolve os períodos ocupados entre dois horários) e o agente oferece até dois.",
  },
  {
    n: "4",
    titulo: "Confirmar e responder",
    entra: "O horário que a paciente escolheu, o nome e o telefone.",
    sai: "A automação cria a consulta na agenda (no Google Agenda, o método events.insert pede início e fim) e o agente manda a confirmação com o endereço e a localização.",
  },
];

const PROMPT = `Você é a assistente de agendamento da [NOME DA CLÍNICA], uma clínica odontológica. Você conversa com pacientes pelo WhatsApp.

SEU PAPEL
- Marcar, confirmar e remarcar consultas na agenda da clínica.
- Responder dúvidas simples: endereço, horário de funcionamento e como chegar.

TOM
- Português do Brasil, educada, calorosa e curta. Frases de uma ou duas linhas.
- Trate a pessoa pelo primeiro nome depois que ela se apresentar.

COMO AGENDAR
1. Pergunte o nome completo e o motivo da consulta (avaliação, limpeza, retorno etc.).
2. Consulte a agenda usando a ferramenta de horários livres. Só ofereça horários que a ferramenta devolveu. Nunca invente horário.
3. Ofereça no máximo dois horários.
4. Quando a paciente escolher, confirme o nome, o telefone e o horário em uma mensagem só e peça um "ok".
5. Depois do "ok", use a ferramenta de criar consulta e mande a mensagem de confirmação com o endereço e o link da localização.

DADOS DA CLÍNICA
- Endereço: [ENDEREÇO COMPLETO]
- Localização: [LINK DO MAPA]
- Horário de funcionamento: [DIAS E HORÁRIOS]
- Duração padrão da consulta: [DURAÇÃO]
- Telefone da recepção: [TELEFONE]

O QUE VOCÊ NÃO FAZ
- Você não faz diagnóstico, não indica remédio e não diz o que a pessoa tem. Se perguntarem, diga que quem avalia é o dentista, na consulta.
- Você não fala de preço, de plano ou de desconto. Se perguntarem, diga que a equipe responde e passe o telefone da recepção.
- Você não inventa informação. Se não souber, diga que vai chamar a equipe.

URGÊNCIA
- Se a pessoa falar de dor forte, sangramento, inchaço no rosto, dente quebrado ou batida na boca, não tente resolver e não prometa horário.
- Responda com calma que vai avisar a equipe agora, passe o telefone da recepção, e marque a conversa como URGENTE para um humano assumir.

DADOS PESSOAIS
- Peça só o que precisa para marcar: nome e telefone.
- Nunca peça documento, número de cartão ou senha.`;

const MENSAGENS = [
  {
    titulo: "Confirmação da consulta",
    texto: `Pronto, [NOME]! Sua consulta está confirmada:
📅 [DIA E HORA]
🦷 [MOTIVO]
📍 [NOME DA CLÍNICA], [ENDEREÇO]

Se precisar remarcar, é só responder aqui.`,
  },
  {
    titulo: "Endereço com localização",
    texto: `Segue como chegar na [NOME DA CLÍNICA]:
📍 [ENDEREÇO COMPLETO]
🗺️ [LINK DO MAPA]
🕘 Funcionamos [DIAS E HORÁRIOS].`,
  },
  {
    titulo: "Lembrete de véspera (template aprovado)",
    texto: `Olá, [NOME]! Lembrando da sua consulta amanhã, [DIA], às [HORA], na [NOME DA CLÍNICA]. Você consegue vir? Responda SIM para confirmar ou REMARCAR para escolher outro horário.`,
  },
  {
    titulo: "Aviso de urgência para a equipe",
    texto: `URGENTE: paciente [NOME], telefone [TELEFONE], relatou "[TRECHO DA MENSAGEM]". O agente não fez triagem nem prometeu horário. Favor assumir a conversa.`,
  },
];

const FONTES = [
  {
    nome: "WhatsApp Business Platform: janela de atendimento e mensagens de serviço",
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages.md",
  },
  {
    nome: "WhatsApp Business Platform: templates de mensagem",
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview.md",
  },
  {
    nome: "Google Calendar API: freebusy.query",
    url: "https://developers.google.com/calendar/api/v3/reference/freebusy/query",
  },
  {
    nome: "Google Calendar API: events.insert",
    url: "https://developers.google.com/calendar/api/v3/reference/events/insert",
  },
  {
    nome: "LGPD (Lei 13.709/2018): art. 5º e art. 11",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
  },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");

  async function copiar() {
    try {
      await navigator.clipboard.writeText(text);
      setState("ok");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
      style={{ borderColor: `${ACCENT}66`, color: ACCENT }}
    >
      <Copy className="h-3.5 w-3.5" />
      {state === "ok" ? "Copiado" : state === "error" ? "Não copiou, selecione o texto" : label}
    </button>
  );
}

export default function AgendaPage() {
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
          <Bot className="h-4 w-4" />
          Agente de IA · WhatsApp da clínica
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O agente que agenda no WhatsApp da clínica{" "}
          <span style={{ color: ACCENT }}>enquanto ela está fechada</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          O fluxo em 4 etapas, o prompt e as mensagens prontas para montar um agente de IA que
          atende a paciente, oferece horários da agenda e confirma a consulta.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que você recebe</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {RECEBE.map((r) => (
            <article key={r.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <r.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {r.nome}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{r.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="agenda-page"
          accent={ACCENT}
          buttonTextColor="#042f2e"
          title="Receba o fluxo, o prompt e as mensagens"
          description="Preencha seus dados para liberar o fluxo em 4 etapas, o prompt do agente e as mensagens prontas."
          contentNote="Você vai liberar: o fluxo, o prompt para copiar e os textos das mensagens."
          buttonLabel="Liberar o material"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section
            className="rounded-xl border p-5"
            style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}
          >
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Leia antes de montar
            </h2>
            <ul className="mt-3 space-y-2">
              {ALERTAS.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">O fluxo em 4 etapas</h2>
            {ETAPAS.map((e) => (
              <article
                key={e.n}
                className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold"
                  style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                >
                  {e.n}
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="text-lg font-semibold">{e.titulo}</h3>
                  <p className="text-sm leading-relaxed text-[#999]">
                    <span className="font-semibold text-[#bbb]">Entra: </span>
                    {e.entra}
                  </p>
                  <p className="text-sm leading-relaxed text-[#999]">
                    <span className="font-semibold text-[#bbb]">Sai: </span>
                    {e.sai}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <FileText className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              O prompt do agente
            </h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Troque tudo o que está entre colchetes pelos dados da clínica. Escrito a partir das
              etapas acima; não é um arquivo do vídeo.
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                {PROMPT}
              </pre>
            </div>
            <CopyButton text={PROMPT} label="Copiar prompt" />
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">As mensagens prontas</h2>
            {MENSAGENS.map((m) => (
              <article key={m.titulo} className="space-y-3 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="font-semibold">{m.titulo}</h3>
                <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                  <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                    {m.texto}
                  </pre>
                </div>
                <CopyButton text={m.texto} label="Copiar mensagem" />
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Fontes</h2>
            <ul className="mt-3 space-y-2">
              {FONTES.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1 text-sm leading-relaxed text-[#bbb] hover:text-white"
                  >
                    <span>{f.nome}</span>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[#777]">Informações conferidas em 10 de novembro de 2026</p>
          </section>
        </div>
      )}

      <SalesCta utmContent="agenda" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
