"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { LINK_DA_CAMPANHA } from "@/lib/blackbox-campanha";

const DEADLINE = new Date("2026-11-27T00:00:00-03:00").getTime();

// Paleta invertida da Black Box (chamadas destacadas da página, que usa âmbar).
// Contraste WCAG (fundo creme #EFE6D6): INK 16:1, BODY 9.8:1, SOFT 6.5:1.
// Etiqueta: texto INK sobre CORAL 8:1. Botão: CREAM sobre INK 16:1.
const INK = "#0E0904";
const INK_HOVER = "#2B2219";
const CREAM = "#EFE6D6";
const CREAM_HOVER = "#FFF6E8";
const CORAL = "#F08A6C";
const ON_DARK_MUTED = "#B9AD9B";
const OVERLAY = "rgba(6,4,1,0.86)";
const TAG_TEXT = "BLACK BOX IA · SEXTA, 27/11";
const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F08A6C]";

/**
 * NOTA SOBRE O `slug`: os componentes públicos ainda recebem `slug`, mas ele não entra
 * mais na URL — a marcação da campanha é fixa. Ele permanece na assinatura de propósito:
 * é o ponto por onde se volta a rastrear a página de origem, se o dono quiser recuperar
 * essa informação (hoje o utm_content é "INSTAGRAM" para todas). Remover agora mexeria
 * nas 9 páginas -bf já publicadas sem ganho nenhum.
 */

/**
 * Destino do clique: LINK_DA_CAMPANHA, em src/lib/blackbox-campanha.ts.
 * Os UTMs são fixos para toda a campanha (definidos pelo dono em 23/11/2026),
 * por isso o link não varia mais por página.
 */

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

/** Contagem regressiva. `onDark`: dígitos creme soltos (barra do topo). `boxes`: caixas pretas sobre creme. */
function Countdown({ variant, size = "md" }: { variant: "onDark" | "boxes"; size?: "sm" | "md" | "lg" }) {
  const left = useCountdown() ?? PLACEHOLDER;
  const parts = [
    ["DIAS", left.days],
    ["HORAS", left.hours],
    ["MIN", left.minutes],
    ["SEG", left.seconds],
  ] as const;

  if (variant === "onDark") {
    return (
      <div className="flex items-center gap-2" aria-label="Contagem regressiva para sexta, 27/11">
        {parts.map(([label, value]) => (
          <div key={label} className="text-center">
            <div className="font-mono text-sm font-bold tabular-nums" style={{ color: CREAM }}>
              {value}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest" style={{ color: ON_DARK_MUTED }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const digit = size === "lg" ? "text-3xl sm:text-5xl" : size === "sm" ? "text-base" : "text-2xl sm:text-3xl";
  const box = size === "lg" ? "min-w-[4.25rem] px-2 py-3 sm:min-w-[6rem] sm:py-4" : size === "sm" ? "min-w-[2.75rem] px-1.5 py-1.5" : "min-w-[3.5rem] px-2 py-2.5 sm:min-w-[4.25rem]";
  return (
    <div
      className={`flex items-stretch ${size === "lg" ? "gap-2 sm:gap-3" : "gap-1.5 sm:gap-2"}`}
      aria-label="Contagem regressiva para sexta, 27/11"
    >
      {parts.map(([label, value]) => (
        <div key={label} className={`rounded-lg text-center ${box}`} style={{ backgroundColor: INK }}>
          <div className={`font-mono font-bold leading-none tabular-nums ${digit}`} style={{ color: CREAM }}>
            {value}
          </div>
          <div
            className={`mt-1 font-mono uppercase tracking-widest ${size === "sm" ? "text-[8px]" : "text-[10px]"}`}
            style={{ color: ON_DARK_MUTED }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Cta({
  label,
  size = "md",
  tone = "ink",
  full = false,
  className = "",
}: {
  label: string;
  size?: "sm" | "md";
  tone?: "ink" | "cream";
  full?: boolean;
  className?: string;
}) {
  const bg = tone === "ink" ? INK : CREAM;
  const bgHover = tone === "ink" ? INK_HOVER : CREAM_HOVER;
  const fg = tone === "ink" ? CREAM : INK;
  return (
    <a
      href={LINK_DA_CAMPANHA}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg text-center font-extrabold transition-colors ${FOCUS_RING} ${
        size === "sm" ? "px-3 py-2 text-xs" : "px-3 py-3.5 text-[13px] sm:px-5 sm:text-base"
      } ${full ? "w-full" : ""} ${className}`}
      style={{ backgroundColor: bg, color: fg }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bgHover)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bg)}
    >
      {label}
      <ArrowRight className={size === "sm" ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0"} />
    </a>
  );
}

const ART_ALT = "Black Box IA, sexta 27/11: quero participar";
const ART_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Arte "Revelação" inteira clicável. 1080x1350 no mobile, 1600x600 no desktop; caixa com proporção fixa (sem salto de layout). */
function RevelacaoArt({
  lazy = true,
  desktopWide = true,
  className = "",
}: {
  lazy?: boolean;
  desktopWide?: boolean;
  className?: string;
}) {
  return (
    <a
      href={LINK_DA_CAMPANHA}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ART_ALT}
      className={`block overflow-hidden rounded-2xl ${FOCUS_RING} ${className}`}
      style={{ backgroundColor: INK, boxShadow: `0 0 0 2px ${CORAL}, 0 24px 60px -24px rgba(0,0,0,0.9)` }}
    >
      <div className={`relative w-full aspect-[1080/1350] ${desktopWide ? "md:aspect-[1600/600]" : ""}`}>
        <picture>
          {desktopWide && (
            <source media="(min-width: 768px)" srcSet={`${ART_BASE}/blackbox/01-revelacao-desktop.webp`} width={1600} height={600} />
          )}
          <img
            src={`${ART_BASE}/blackbox/01-revelacao-mobile.webp`}
            alt={ART_ALT}
            width={1080}
            height={1350}
            loading={lazy ? "lazy" : "eager"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      </div>
    </a>
  );
}

function PromoModal({
  open,
  onClose,
  slug,
}: {
  open: boolean;
  onClose: () => void;
  slug: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: OVERLAY }}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ART_ALT}
        tabIndex={-1}
        className="relative outline-none w-full"
        style={{ maxWidth: "min(26rem, calc((100vh - 2rem) * 0.8))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <RevelacaoArt lazy={false} desktopWide={false} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full ${FOCUS_RING}`}
          style={{ backgroundColor: "rgba(14,9,4,0.85)", color: CREAM, boxShadow: `0 0 0 1px ${CORAL}` }}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function BlackBoxPromos({ slug, delayMs = 6000 }: { slug: string; delayMs?: number }) {
  const [modal, setModal] = useState<"time" | "scroll" | "exit" | null>(null);
  const [corner, setCorner] = useState(false);
  const cornerDismissed = useRef(false);
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
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;

      if (window.innerWidth < 768) {
        if (ratio > 0.1 && !cornerDismissed.current) setCorner(true);
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
      <PromoModal open={modal !== null} onClose={close} slug={slug} />

      {corner && modal === null && (
        <aside
          aria-label="Black Box IA"
          className="fixed bottom-3 left-3 right-3 z-50 rounded-xl p-3 md:hidden"
          style={{ backgroundColor: CREAM, color: INK, boxShadow: `0 0 0 2px ${CORAL}, 0 18px 40px -10px rgba(0,0,0,0.85)` }}
        >
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p
                className="inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em]"
                style={{ backgroundColor: CORAL, color: INK }}
              >
                {TAG_TEXT}
              </p>
              <p className="mt-1.5 text-sm font-bold leading-snug">
                O maior desconto já feito, só no Grupo Secreto.
              </p>
              <div className="mt-2">
                <Cta label="QUERO PARTICIPAR" size="sm" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                cornerDismissed.current = true;
                setCorner(false);
              }}
              aria-label="Fechar"
              className={`rounded-md p-1 ${FOCUS_RING}`}
              style={{ color: INK }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

export function BlackBoxTopBar({ slug }: { slug: string }) {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 border-b"
      style={{ backgroundColor: INK, borderColor: CORAL, color: CREAM }}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
        <p className="min-w-0 flex-1 text-[10px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-xs sm:tracking-[0.14em]">
          Black Box IA <span style={{ color: CORAL }}>·</span>{" "}
          <span style={{ color: CORAL }}>sexta, 27/11</span>
        </p>
        <div className="hidden sm:block">
          <Countdown variant="onDark" />
        </div>
        <Cta label="QUERO PARTICIPAR" size="sm" tone="cream" />
      </div>
    </div>
  );
}

export type BlackBoxBlockVariant = "grupo" | "desconto" | "contagem";

/** Card da Black Box no meio do conteúdo: a arte Revelação clicável (a variante fica só como marcador para teste). */
export function BlackBoxBlock({ slug, variant = "desconto" }: { slug: string; variant?: BlackBoxBlockVariant }) {
  return (
    <section aria-label="Black Box IA" data-bb-card={variant}>
      <RevelacaoArt />
    </section>
  );
}
