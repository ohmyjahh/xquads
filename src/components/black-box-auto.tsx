"use client";

/**
 * Monta as duas peças da Black Box em todas as páginas, sem editar página a página.
 *
 * Vive no layout raiz. Liga e desliga por `src/lib/blackbox-campanha.ts`.
 *
 * Duas coisas que não acontecem sozinhas e por isso estão tratadas aqui:
 *
 * 1. No App Router, o layout NÃO remonta ao navegar entre páginas. Sem observar a rota,
 *    o pop-up apareceria uma vez por sessão, não uma por página. O `key` com o pathname
 *    força a remontagem, que é o que rearma o temporizador.
 *
 * 2. Metade das páginas não usa <header> nem o container padrão. Por isso a faixa não é
 *    inserida "depois do primeiro bloco": ela entra depois do primeiro bloco cujo fim
 *    passa da altura da janela — a dobra de verdade, que independe da marcação.
 */

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { BlackBoxPromos, BlackBoxBlock } from "@/components/black-box-promos";
import {
  campanhaNoAr,
  rotaRecebeCampanha,
  slugDaRota,
  SEGUNDOS_ATE_O_POPUP,
} from "@/lib/blackbox-campanha";

/** Marca o nó inserido, para nunca duplicar. */
const MARCA = "data-bb-faixa";

/** Acha onde a primeira dobra termina e devolve um nó pronto para receber a faixa. */
function criarPontoDeInsercao(): HTMLElement | null {
  const existente = document.querySelector<HTMLElement>(`[${MARCA}]`);
  if (existente) return existente;

  // O container de conteúdo: o maior bloco com filhos diretos que valha percorrer.
  const main = document.querySelector("main") ?? document.body;
  const candidatos = Array.from(main.querySelectorAll<HTMLElement>(":scope > div, :scope > div > div"));
  const container =
    candidatos
      .filter((el) => el.children.length >= 2)
      .sort((a, b) => b.children.length - a.children.length)[0] ?? null;
  if (!container) return null;

  const dobra = window.innerHeight;
  const topoDoContainer = container.getBoundingClientRect().top + window.scrollY;

  let depoisDeste: HTMLElement | null = null;
  for (const filho of Array.from(container.children) as HTMLElement[]) {
    const fim = filho.getBoundingClientRect().bottom + window.scrollY - topoDoContainer;
    depoisDeste = filho;
    if (fim >= dobra) break;
  }
  // Página curta: nenhum bloco passou da dobra — a faixa vai para o fim do conteúdo.
  if (!depoisDeste) depoisDeste = container.lastElementChild as HTMLElement | null;
  if (!depoisDeste) return null;

  const alvo = document.createElement("div");
  alvo.setAttribute(MARCA, "");
  depoisDeste.insertAdjacentElement("afterend", alvo);
  return alvo;
}

function Faixa({ slug }: { slug: string }) {
  const [alvo, setAlvo] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Espera o conteúdo pintar para medir a dobra com a altura real.
    const t = window.setTimeout(() => setAlvo(criarPontoDeInsercao()), 600);
    return () => {
      window.clearTimeout(t);
      document.querySelectorAll(`[${MARCA}]`).forEach((n) => n.remove());
    };
  }, [slug]);

  if (!alvo) return null;
  return createPortal(
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <BlackBoxBlock slug={slug} variant="desconto" />
    </div>,
    alvo
  );
}

export function BlackBoxAuto() {
  const pathname = usePathname() || "";

  // A decisão depende da hora atual, então é tomada no cliente: no servidor devolve
  // false, o que evita divergência de hidratação e impede que o build congele a resposta.
  const podeMostrar = useSyncExternalStore(
    () => () => {},
    () => campanhaNoAr(),
    () => false
  );

  if (!podeMostrar || !rotaRecebeCampanha(pathname)) return null;

  const slug = slugDaRota(pathname);

  // O key com o pathname é o que faz o pop-up reaparecer a cada página.
  return (
    <div key={pathname}>
      <BlackBoxPromos slug={slug} delayMs={SEGUNDOS_ATE_O_POPUP} />
      <Faixa slug={slug} />
    </div>
  );
}
