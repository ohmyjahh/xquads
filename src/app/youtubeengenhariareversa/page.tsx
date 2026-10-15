"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F87171";
const AULA = "https://www.youtube.com/watch?v=EFilkTPJgV4";

export default function YoutubeEngenhariaReversaPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  // Só quem acabou de preencher o formulário é levada direto para a aula.
  // Quem já tinha lead salvo, e a revisão em local, ficam com o botão.
  useEffect(() => {
    if (!formUnlocked || review) return;
    const t = setTimeout(() => {
      window.location.href = AULA;
    }, 1200);
    return () => clearTimeout(t);
  }, [formUnlocked, review]);

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto e sem redirecionamento. Em produção, o acesso fica
          protegido e o envio leva direto para a aula.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Play className="h-4 w-4" />
          Aula em vídeo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Como usar o Claude para fazer{" "}
          <span style={{ color: ACCENT }}>engenharia reversa de qualquer app</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Viu um recurso que você queria ter no seu produto? Nesta aula eu mostro, na prática,
          como pedir ao Claude para entender como aquilo funciona.
        </p>
      </header>

      {!unlocked ? (
        <LeadGate
          source="youtube-engenharia-reversa"
          accent={ACCENT}
          buttonTextColor="#2e0b0b"
          title="Receba o acesso à aula"
          description="Preencha seus dados e eu te levo direto para o vídeo."
          contentNote="Você vai direto para a aula completa no YouTube, de graça."
          buttonLabel="Assistir à aula"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-4">
          {formUnlocked && !review && (
            <p className="text-center text-sm" style={{ color: ACCENT }}>
              Pronto. Levando você para a aula…
            </p>
          )}
          <a
            href={AULA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#2e0b0b", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            <Play className="h-5 w-5 shrink-0" />
            Assistir à aula agora
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="text-center text-xs text-[#777]">
            Se a página não abrir sozinha, é só clicar no botão acima.
          </p>
        </div>
      )}

      <SalesCta utmContent="youtubeengenhariareversa" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
