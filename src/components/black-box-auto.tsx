"use client";

/**
 * Monta as duas peças da Black Box em todas as páginas, sem editar página a página.
 * Vive no layout raiz. Liga e desliga por `src/lib/blackbox-campanha.ts`.
 *
 * Três decisões que vieram de problemas reais (Story 103):
 *
 * 1. A faixa NÃO usa <picture>. O navegador resolve a fonte no instante em que insere o
 *    <img>; renderizada por portal num nó criado à mão, a ordem de inserção do React fazia
 *    o <img> chegar sem fonte e a imagem não carregava em telas >= 768px. Aqui a arte é
 *    escolhida em JavaScript pela largura e vai num <img> simples.
 *
 * 2. A faixa entra DEPOIS do formulário, não depois da dobra: é lá que o dono quer, e em
 *    muitas páginas a dobra cai antes do formulário. Sem formulário, volta para a dobra.
 *
 * 3. O pop-up usa `somenteTempo`: uma aparição por página. O componente tem três gatilhos
 *    (tempo, rolagem, saída) e os três juntos faziam o pop-up voltar duas vezes depois de
 *    fechado — aceitável nas páginas dedicadas -bf, demais nas 107.
 */

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { BlackBoxPromos } from "@/components/black-box-promos";
import {
  campanhaNoAr,
  rotaRecebeCampanha,
  slugDaRota,
  LINK_DA_CAMPANHA,
  SEGUNDOS_ATE_O_POPUP,
} from "@/lib/blackbox-campanha";

const MARCA = "data-bb-faixa";
const ART_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ART_ALT = "Black Box IA — sexta, 27/11. A maior Black da história da inteligência artificial.";

/** Onde a faixa entra: depois do formulário; sem formulário, depois da primeira dobra. */
function criarPontoDeInsercao(): HTMLElement | null {
  const existente = document.querySelector<HTMLElement>(`[${MARCA}]`);
  if (existente) return existente;

  const main = document.querySelector("main") ?? document.body;

  // 1ª escolha: logo depois do formulário que a pessoa precisa preencher.
  const form = main.querySelector("form");
  let depoisDeste: HTMLElement | null = null;

  if (form) {
    // sobe até o bloco que embrulha o formulário, para a faixa não cair dentro do cartão
    let bloco: HTMLElement = form;
    while (
      bloco.parentElement &&
      bloco.parentElement !== main &&
      bloco.parentElement.children.length < 2
    ) {
      bloco = bloco.parentElement;
    }
    depoisDeste = bloco.parentElement === main ? bloco : (bloco.parentElement ?? bloco);
  }

  // 2ª escolha: o primeiro bloco cujo fim passa da dobra.
  if (!depoisDeste) {
    const candidatos = Array.from(
      main.querySelectorAll<HTMLElement>(":scope > div, :scope > div > div")
    );
    const container =
      candidatos.filter((el) => el.children.length >= 2).sort((a, b) => b.children.length - a.children.length)[0] ??
      null;
    if (!container) return null;

    const dobra = window.innerHeight;
    const topo = container.getBoundingClientRect().top + window.scrollY;
    for (const filho of Array.from(container.children) as HTMLElement[]) {
      const fim = filho.getBoundingClientRect().bottom + window.scrollY - topo;
      depoisDeste = filho;
      if (fim >= dobra) break;
    }
    if (!depoisDeste) depoisDeste = container.lastElementChild as HTMLElement | null;
  }

  if (!depoisDeste) return null;

  const alvo = document.createElement("div");
  alvo.setAttribute(MARCA, "");
  depoisDeste.insertAdjacentElement("afterend", alvo);
  return alvo;
}

function Faixa() {
  const [alvo, setAlvo] = useState<HTMLElement | null>(null);
  const [larga, setLarga] = useState(true);

  useEffect(() => {
    const medir = () => setLarga(window.innerWidth >= 768);
    medir();
    window.addEventListener("resize", medir);
    const t = window.setTimeout(() => setAlvo(criarPontoDeInsercao()), 600);
    return () => {
      window.removeEventListener("resize", medir);
      window.clearTimeout(t);
      document.querySelectorAll(`[${MARCA}]`).forEach((n) => n.remove());
    };
  }, []);

  if (!alvo) return null;

  const arte = larga
    ? `${ART_BASE}/blackbox/01-revelacao-desktop.webp`
    : `${ART_BASE}/blackbox/01-revelacao-mobile.webp`;

  return createPortal(
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <a
        href={LINK_DA_CAMPANHA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ART_ALT}
        className="block overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#0E0904", boxShadow: "0 0 0 2px #F08A6C, 0 24px 60px -24px rgba(0,0,0,0.9)" }}
      >
        {/* <img> simples de propósito: ver a nota 1 no topo do arquivo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={arte}
          alt={ART_ALT}
          width={larga ? 1600 : 1080}
          height={larga ? 600 : 1350}
          className="block h-auto w-full"
        />
      </a>
    </div>,
    alvo
  );
}

export function BlackBoxAuto() {
  const pathname = usePathname() || "";

  const podeMostrar = useSyncExternalStore(
    () => () => {},
    () => campanhaNoAr(),
    () => false
  );

  if (!podeMostrar || !rotaRecebeCampanha(pathname)) return null;

  return (
    <div key={pathname}>
      <BlackBoxPromos slug={slugDaRota(pathname)} delayMs={SEGUNDOS_ATE_O_POPUP} somenteTempo />
      <Faixa />
    </div>
  );
}
