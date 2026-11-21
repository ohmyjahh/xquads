"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, X } from "lucide-react";

const DEADLINE = new Date("2026-11-27T00:00:00-03:00").getTime();
const BLACK = "#0E0904";
const CREAM = "#EFE6D6";
const MUTED = "#B9AD9B";
const AMBER = "#D9962B";
const AMBER_HOVER = "#E8A63C";

export function blackBoxUrl(slug: string) {
  return `https://rafagrandi.com.br/blackbox-cadastro?utm_source=instagram&utm_medium=isca&utm_campaign=blackbox&utm_content=${slug}`;
}

type CountdownLeft = { days: string; hours: string; minutes: string; seconds: string };
type Left = CountdownLeft | null;

function useCountdown(): Left {
  const [left, setLeft] = useState<Left>(null);
  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, DEADLINE - Date.now());
      const s = Math.floor(ms / 1000);
      setLeft({
        days: String(Math.floor(s / 86400)).padStart(2, "0"),
        hours: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
        seconds: String(s % 60).padStart(2, "0"),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return left;
}

const PLACEHOLDER: CountdownLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };

function Countdown({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  const left = useCountdown() ?? PLACEHOLDER;
  const parts = [
    ["DIAS", left.days],
    ["HORAS", left.hours],
    ["MIN", left.minutes],
    ["SEG", left.seconds],
  ];
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      {parts.map(([label, value]) => (
        <div key={label} className="text-center">
          <div
            className={`font-mono font-bold tabular-nums ${compact ? "text-sm" : "text-2xl sm:text-3xl"}`}
            style={{ color: dark ? BLACK : CREAM }}
          >
            {value}
          </div>
          <div
            className={`font-mono uppercase ${compact ? "text-[8px]" : "text-[10px]"} tracking-widest`}
            style={{ color: dark ? "rgba(14,9,4,0.7)" : MUTED }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Cta({ slug, label, size = "md" }: { slug: string; label: string; size?: "sm" | "md" }) {
  return (
    <a
      href={blackBoxUrl(slug)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors ${
        size === "sm" ? "px-3 py-2 text-xs" : "px-5 py-3.5 text-sm sm:text-base"
      }`}
      style={{ backgroundColor: AMBER, color: BLACK }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = AMBER_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = AMBER)}
    >
      {label}
      <ArrowRight className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </a>
  );
}

function CloseButton({ onClick, light = false }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Fechar"
      className="rounded-md p-1.5 transition-colors"
      style={{ color: light ? "rgba(14,9,4,0.65)" : MUTED }}
    >
      <X className="h-5 w-5" />
    </button>
  );
}

function PromoModal({
  open,
  onClose,
  slug,
  eyebrow,
  title,
  body,
}: {
  open: boolean;
  onClose: () => void;
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(6,4,1,0.82)" }}
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-md rounded-2xl border p-6 sm:p-8"
        style={{ backgroundColor: "#14100A", borderColor: "rgba(217,150,43,0.45)", color: CREAM }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-3 top-3">
          <CloseButton onClick={onClose} />
        </div>
        <p
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ backgroundColor: "rgba(217,150,43,0.16)", color: AMBER }}
        >
          <Clock className="h-3 w-3" />
          {eyebrow}
        </p>
        <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
          {body}
        </p>
        <div className="mt-5 rounded-xl border p-3" style={{ borderColor: "rgba(239,230,214,0.14)" }}>
          <Countdown />
        </div>
        <div className="mt-5">
          <Cta slug={slug} label="QUERO PARTICIPAR DA BLACK BOX" />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed" style={{ color: MUTED }}>
          O desconto é exclusivo para quem estiver no Grupo Secreto.
        </p>
      </div>
    </div>
  );
}

export function BlackBoxPromos({ slug }: { slug: string }) {
  const [modal, setModal] = useState<"time" | "scroll" | "exit" | null>(null);
  const [corner, setCorner] = useState(false);
  const seen = useRef({ time: false, scroll: false, exit: false });
  const isOpen = useRef(false);

  useEffect(() => {
    isOpen.current = modal !== null;
  }, [modal]);

  const close = useCallback(() => setModal(null), []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (seen.current.time || isOpen.current) return;
      seen.current.time = true;
      setModal("time");
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;

      if (window.innerWidth < 768) {
        if (ratio > 0.1) setCorner(true);
      }

      if (!seen.current.scroll && ratio >= 0.6) {
        seen.current.scroll = true;
        if (!isOpen.current) setModal("scroll");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return;
      if (seen.current.exit || isOpen.current) return;
      seen.current.exit = true;
      setModal("exit");
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  return (
    <>
      <PromoModal
        open={modal !== null}
        onClose={close}
        slug={slug}
        eyebrow="Black Box IA · sexta, 27/11"
        title={
          modal === "exit"
            ? "Antes de fechar: a Black Box abre sexta, 27/11"
            : modal === "scroll"
              ? "Você já viu metade da biblioteca"
              : "A maior Black da história da inteligência artificial"
        }
        body={
          modal === "exit"
            ? "O maior desconto já feito fica no Grupo Secreto. Entre agora para receber o acesso no dia 27/11."
            : modal === "scroll"
              ? "Sexta, 27/11, o Rafa abre a caixa preta da IA. O maior desconto já feito é só para quem estiver no Grupo Secreto."
              : "Sexta, 27/11, o Rafa abre a caixa preta da IA e libera o maior desconto já feito. Entre no Grupo Secreto para receber o acesso."
        }
      />

      {corner && modal === null && (
        <div
          className="fixed bottom-3 left-3 right-3 z-50 rounded-xl border p-3 shadow-2xl md:hidden"
          style={{ backgroundColor: "#14100A", borderColor: "rgba(217,150,43,0.45)", color: CREAM }}
        >
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: AMBER }}>
                Black Box IA · sexta, 27/11
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug">
                O maior desconto já feito, só no Grupo Secreto.
              </p>
              <div className="mt-2">
                <Cta slug={slug} label="QUERO PARTICIPAR" size="sm" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCorner(false)}
              aria-label="Fechar"
              className="rounded-md p-1"
              style={{ color: MUTED }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function BlackBoxTopBar({ slug }: { slug: string }) {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 border-b"
      style={{ backgroundColor: BLACK, borderColor: "rgba(217,150,43,0.45)", color: CREAM }}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
        <p className="min-w-0 flex-1 text-[10px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-xs sm:tracking-[0.14em]">
          Black Box IA <span style={{ color: AMBER }}>·</span> sexta, 27/11
        </p>
        <div className="hidden sm:block">
          <Countdown compact />
        </div>
        <Cta slug={slug} label="QUERO PARTICIPAR" size="sm" />
      </div>
    </div>
  );
}

export function BlackBoxBlock({ slug }: { slug: string }) {
  return (
    <section
      className="rounded-2xl border p-6 sm:p-8"
      style={{ backgroundColor: "#14100A", borderColor: "rgba(217,150,43,0.45)", color: CREAM }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: AMBER }}>
        Black Box IA · sexta, 27/11
      </p>
      <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
        A maior Black da história da inteligência artificial
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: MUTED }}>
        Sexta, 27/11, o Rafa abre a caixa preta da IA com o maior desconto já feito. O desconto é
        exclusivo para quem estiver no Grupo Secreto.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Cta slug={slug} label="QUERO PARTICIPAR DA BLACK BOX" />
        <Countdown compact />
      </div>
    </section>
  );
}
