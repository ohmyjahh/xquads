"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Wand2, Terminal, Apple, ArrowUpRight, Clapperboard } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F97316";
const REPO = "https://github.com/ohmyjahh/efeitos-claude";
const RAW = "https://raw.githubusercontent.com/ohmyjahh/efeitos-claude/main/previews";

const INSTALAR =
  "git clone https://github.com/ohmyjahh/efeitos-claude ~/.claude/skills/efeito && bash ~/.claude/skills/efeito/setup.sh";

const DESTAQUES = [
  { arq: "glass-widgets", nome: "glass-widgets", texto: "Widgets de vidro fosco em volta da cabeça" },
  { arq: "documentary", nome: "documentary", texto: "P&B sobre magenta, com Follow virando Following" },
  { arq: "orbit", nome: "orbit", texto: "As capas dos seus reels girando em volta de você" },
  { arq: "spotlight", nome: "spotlight", texto: "Apaga a sala e acende um neon atrás da sua cabeça" },
  { arq: "kallaway-split", nome: "kallaway-split", texto: "Gráfico dos seus reels mais vistos em cima" },
  { arq: "rabbit-hole", nome: "rabbit-hole", texto: "Molduras infinitas voando por trás" },
];

const TODOS = [
  ["glass-widgets", "widgets de vidro em volta da cabeça"],
  ["documentary", "P&B sobre magenta, palavras carimbadas"],
  ["orbit", "capas dos seus reels girando"],
  ["kallaway-split", "gráfico dos 7 reels mais vistos"],
  ["spotlight", "neon aceso atrás da cabeça"],
  ["checklist", "cartão marcando cada etapa da edição"],
  ["timeline", "janela de editor renderizando"],
  ["lineup", "arco de 21 cards numerados"],
  ["shortcut-rain", "teclas de atalho caindo e quicando"],
  ["red-collage", "palavra vermelha gigante atrás"],
  ["comment-box", "campo de comentário digitando seu CTA"],
  ["cover-star", "capa de revista com seu nome"],
  ["headline-wall", "manchetes coladas atrás + selo de views"],
  ["phone-fan", "leque de 4 celulares com seus reels"],
  ["rabbit-hole", "molduras infinitas voando por trás"],
  ["pastel-word", "fundo lilás com palavra gigante atrás"],
  ["split-headline", "manchete palavra por palavra em cima"],
];

function CopyButton({ text }: { text: string }) {
  const [estado, setEstado] = useState<"parado" | "copiado" | "erro">("parado");
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setEstado("copiado");
    } catch {
      setEstado("erro");
    }
    setTimeout(() => setEstado("parado"), 3000);
  };
  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={copiar}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#F97316]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar comando
          </>
        )}
      </button>
      {estado === "erro" && (
        <span className="text-xs text-[#FCA5A5]">
          Seu navegador bloqueou a cópia. Selecione o texto abaixo e copie na mão.
        </span>
      )}
    </div>
  );
}

export default function EfeitosPage() {
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
          <Wand2 className="h-4 w-4" />
          17 efeitos, um comando cada
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Um clipe seu.{" "}
          <span style={{ color: ACCENT }}>17 edições completamente diferentes</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Você arrasta o vídeo no chat, digita o nome do efeito e recebe o arquivo pronto — com o
          seu áudio original e, se gravou no iPhone, com o HDR intacto. Sem abrir editor.
        </p>
      </header>

      <section className="space-y-3">
        <div className="overflow-hidden rounded-xl border border-[#2a2a2e] bg-[#1a1a1d]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${RAW}/catalogo.jpg`}
            alt="Catálogo com os 17 efeitos aplicados ao mesmo clipe"
            className="w-full"
          />
        </div>
        <p className="text-center text-sm text-[#777]">
          O mesmo clipe, passado pelos 17 efeitos.
        </p>
      </section>




      {!unlocked ? (
        <LeadGate
          source="efeitos-page"
          accent={ACCENT}
          buttonTextColor="#2b1403"
          title="Receba o acesso à skill"
          description="Preencha seus dados para liberar a instalação e os comandos."
          contentNote="Você vai liberar: o comando que instala tudo de uma vez, como usar no dia a dia e o repositório aberto."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Alguns de perto</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {DESTAQUES.map((d) => (
            <article
              key={d.arq}
              className="overflow-hidden rounded-xl border border-[#2a2a2e] bg-[#1a1a1d]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${RAW}/${d.arq}.jpg`}
                alt={`Efeito ${d.nome}`}
                loading="lazy"
                className="w-full"
              />
              <div className="p-3">
                <h3 className="font-mono text-sm font-semibold" style={{ color: ACCENT }}>
                  /efeito {d.nome}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#999]">{d.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Os 17</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {TODOS.map(([cmd, oque]) => (
            <div
              key={cmd}
              className="rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] px-3 py-2 text-sm"
            >
              <span className="font-mono font-semibold" style={{ color: ACCENT }}>
                {cmd}
              </span>
              <span className="text-[#888]"> — {oque}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que você precisa ter</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Terminal className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              Claude Code e três ferramentas
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              Claude Code instalado, mais Node 18 ou superior, ffmpeg e Python 3. O instalador
              resolve o resto sozinho.
            </p>
          </article>
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Apple className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              No Mac fica melhor
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              O recorte da pessoa usa um recurso do macOS. Fora dele a skill roda igual, mas os
              elementos ficam <strong className="text-white">na frente</strong> de você, em vez de
              atrás — e é atrás que está a graça de boa parte dos efeitos.
            </p>
          </article>
        </div>
      </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Instalar</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Um comando só, no terminal. Ele baixa a skill para dentro do Claude Code e prepara
              tudo.
            </p>
            <div className="space-y-2">
              <CopyButton text={INSTALAR} />
              <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                  {INSTALAR}
                </pre>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Usar</h2>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <p className="text-sm leading-relaxed text-[#999]">
                No Claude Code, digite o efeito e arraste o vídeo no chat:
              </p>
              <code className="mt-2 block rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-3 font-mono text-[13px] text-[#ccc]">
                /efeito spotlight
              </code>
              <p className="mt-3 text-sm leading-relaxed text-[#999]">
                Ou aponte o arquivo direto, sem arrastar:
              </p>
              <code className="mt-2 block rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-3 font-mono text-[13px] text-[#ccc]">
                /efeito orbit ~/Downloads/IMG_1234.MOV
              </code>
              <p className="mt-3 text-sm leading-relaxed text-[#999]">
                Esqueceu os nomes? <span className="font-mono text-[#ccc]">/efeito lista</span>{" "}
                mostra o catálogo inteiro. Na primeira vez ele pergunta seu nome e seu @, que
                aparecem dentro de alguns efeitos.
              </p>
            </article>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#2b1403", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            <Clapperboard className="h-5 w-5 shrink-0" />
            Abrir o repositório
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-4 text-center text-xs text-[#777]">
            github.com/ohmyjahh/efeitos-claude · MIT · conferido em 26 de outubro de 2026
          </p>
        </div>
      )}

      <SalesCta utmContent="efeitos" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
