"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Github, Gift } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#4ADE80";

type Item = {
  paga: string;
  gratis: string;
  para: string;
  url: string;
  bonus?: boolean;
  alternativa?: boolean;
};

const ITENS: Item[] = [
  {
    paga: "Higgsfield",
    gratis: "Open Higgsfield",
    para: "Gerar imagem e vídeo com IA em um estúdio só",
    url: "https://github.com/wide-trace/open-higgsfield",
  },
  {
    paga: "ElevenLabs",
    gratis: "Voice Studio",
    para: "Clonar voz e criar locução, rodando no seu computador",
    url: "https://github.com/debpalash/VoiceStudio",
  },
  {
    paga: "ElevenLabs",
    gratis: "Voicebox",
    para: "Clonar voz, ditar e criar áudio, também no seu computador",
    url: "https://github.com/jamiepine/voicebox",
    alternativa: true,
  },
  {
    paga: "Semrush",
    gratis: "Open SEO",
    para: "Pesquisa de palavras-chave e análise de SEO",
    url: "https://github.com/every-app/open-seo",
  },
  {
    paga: "Notion",
    gratis: "AppFlowy",
    para: "Notas, documentos e projetos em um só lugar",
    url: "https://github.com/AppFlowy-IO/AppFlowy",
  },
  {
    paga: "Wispr Flow",
    gratis: "OpenWhispr",
    para: "Ditar por voz e transformar em texto",
    url: "https://github.com/OpenWhispr/openwhispr",
  },
  {
    paga: "Asana",
    gratis: "OpenProject",
    para: "Gerenciar projetos e tarefas do time",
    url: "https://github.com/opf/openproject",
  },
  {
    paga: "Calendly",
    gratis: "Cal.diy (Cal.com)",
    para: "Agendamento online de reuniões",
    url: "https://github.com/calcom/cal.diy",
  },
  {
    paga: "Intercom",
    gratis: "Chatwoot",
    para: "Atendimento por chat, e-mail e redes sociais",
    url: "https://github.com/chatwoot/chatwoot",
  },
  {
    paga: "Loom",
    gratis: "Cap",
    para: "Gravar a tela e compartilhar o vídeo por link",
    url: "https://github.com/CapSoftware/Cap",
  },
  {
    paga: "Adobe",
    gratis: "ArtCraft",
    para: "Criação e edição visual, de imagem a vídeo",
    url: "https://github.com/storytold/artcraft",
    bonus: true,
  },
];

export default function OpenPage() {
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
          <Gift className="h-4 w-4" />
          11 projetos gratuitos no GitHub
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Pare de pagar assinatura{" "}
          <span style={{ color: ACCENT }}>por esses sistemas</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Todos os projetos que eu citei no vídeo, mais uma opção extra para o ElevenLabs, com o link de cada um. Cada ferramenta paga
          tem uma versão aberta e gratuita no GitHub.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que você troca</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(ITENS.map((i) => i.paga))).map((paga) => (
            <span
              key={paga}
              className="rounded-full border border-[#2a2a2e] bg-[#1a1a1d] px-4 py-2 text-sm text-[#ccc]"
            >
              {paga}
            </span>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="open-page"
          accent={ACCENT}
          buttonTextColor="#052e16"
          title="Receba a lista completa com os links"
          description="Preencha seus dados para liberar os links dos projetos do vídeo e uma opção extra."
          contentNote="Você vai liberar: o link de cada projeto no GitHub, ao lado da ferramenta paga que ele substitui."
          buttonLabel="Liberar os links"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Os links</h2>
          {ITENS.map((i) => (
            <a
              key={i.url}
              href={i.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4 transition-colors hover:border-[#3a3a3e]"
            >
              <Github className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[#888]">
                  {i.bonus ? "Bônus · no lugar de " : i.alternativa ? "Outra opção no lugar de " : "No lugar de "}
                  {i.paga}
                </p>
                <p className="font-semibold">{i.gratis}</p>
                <p className="text-sm leading-relaxed text-[#999]">{i.para}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#888]" />
            </a>
          ))}
          <p className="pt-2 text-center text-xs text-[#777]">
            Links conferidos em 9 de novembro de 2026
          </p>
        </section>
      )}

      <SalesCta utmContent="open" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
