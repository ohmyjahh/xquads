"use client";

import { useEffect, useState } from "react";
import {
  Download,
  FileText,
  Lightbulb,
  Rocket,
  Sparkles,
  Store,
  Wrench,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D1FF02";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PDF = `${BASE}/downloads/do-zero-ao-primeiro-usuario.pdf`;

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
      <Icon className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
      {children}
    </h2>
  );
}

export default function AppDoZeroPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (hasCapturedLead()) setUnlocked(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{
            color: ACCENT,
            backgroundColor: `${ACCENT}1A`,
            border: `1px solid ${ACCENT}33`,
          }}
        >
          <Rocket className="h-3.5 w-3.5" />
          Palestra Do Zero ao Primeiro Usuário
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Baixe a apresentação{" "}
          <span style={{ color: ACCENT }}>Do Zero ao Primeiro Usuário</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          A apresentação completa da palestra: como construir e lançar um app com
          IA e transformar em uma fonte de renda recorrente. Da ideia aos primeiros
          usuários que pagam, tudo que eu mostrei no palco, pra você levar pra casa.
        </p>
      </div>

      {/* O que tem */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>O caminho inverso, em quatro blocos</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            A maior parte das pessoas trava antes de chegar no que importa: colocar
            o app na frente de alguém que paga. Nesta palestra eu faço o caminho
            inverso do lançamento, do fim pro começo, pra você não parar no meio. É
            o mesmo processo que transforma uma ideia parada numa fonte de renda.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: Lightbulb,
              title: "1. Ideia",
              text: "O problema que já existe e a dor que alguém paga pra resolver. Ideia boa nasce de incômodo repetido, não de inspiração.",
            },
            {
              icon: Wrench,
              title: "2. Ferramentas",
              text: "O que usar pra construir sem escrever código do zero. A IA tirou as semanas de trabalho braçal entre a ideia e a primeira tela.",
            },
            {
              icon: FileText,
              title: "3. Estrutura",
              text: "Como o app fica de pé: produto, cobrança e entrega. É onde a maioria para, e por isso não fatura.",
            },
            {
              icon: Store,
              title: "4. Canais de venda",
              text: "Onde estão os primeiros usuários e como eles chegam até você. É aqui que mora a renda recorrente.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2"
            >
              <item.icon className="h-5 w-5" style={{ color: ACCENT }} />
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-[#888] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gate + download */}
      {!unlocked ? (
        <LeadGate
          source="appdozero-page"
          accent={ACCENT}
          buttonTextColor="#121214"
          title="Libere o download da apresentação"
          description="Insira seus dados para desbloquear o PDF completo da palestra Do Zero ao Primeiro Usuário."
          contentNote="Você vai liberar: a apresentação completa em PDF, com todos os slides da palestra, pra rever com calma e aplicar no seu projeto."
          buttonLabel="Liberar o download"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <section className="space-y-5">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Liberado. Baixe a apresentação completa abaixo.
          </div>

          <a
            href={PDF}
            download
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: ACCENT,
              color: "#121214",
              boxShadow: `0 10px 30px -8px ${ACCENT}80`,
            }}
          >
            <Download className="h-5 w-5 shrink-0" />
            Baixar a apresentação em PDF
          </a>
          <p className="text-center text-xs text-[#666]">
            Do Zero ao Primeiro Usuário, apresentação completa da palestra.
          </p>
        </section>
      )}

      {/* CTA */}
      <SalesCta utmContent="appdozero" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
