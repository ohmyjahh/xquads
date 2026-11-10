"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Repeat2,
  ArrowUpRight,
  Copy,
  AlertTriangle,
  CheckCircle2,
  Film,
  Shirt,
  Package,
  User,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F472B6";
const REPLICATE = "https://replicate.com/bytedance/seedance-2.0";
const HIGGSFIELD = "https://higgsfield.ai/seedance/2.0";

const O_QUE_FAZ = [
  {
    icone: User,
    nome: "Troca o personagem",
    texto: "Você sobe um vídeo que já existe e pede outro personagem no lugar, sem regravar a cena.",
  },
  {
    icone: Shirt,
    nome: "Troca a roupa",
    texto: "Mesma cena, mesmo movimento, outra roupa a partir de uma imagem de referência.",
  },
  {
    icone: Package,
    nome: "Troca um objeto",
    texto: "Tira o objeto do vídeo e coloca outro no lugar, mantendo o resto igual.",
  },
  {
    icone: Film,
    nome: "Mantém a câmera e o movimento",
    texto:
      "Segundo a página do modelo, a edição preserva o movimento original e o trabalho de câmera enquanto aplica a mudança.",
  },
];

const PROMPTS = [
  {
    titulo: "Trocar a pessoa",
    texto:
      "Replace the person in [Video1] with the character from [Image1]. Keep all original actions, the same framing and the same camera movement. Only the person changes: the background, the lighting and the timing stay exactly as in [Video1].",
  },
  {
    titulo: "Trocar a roupa",
    texto:
      "Change the outfit of the person in [Video1] to the outfit shown in [Image1], keeping all original motion, framing and camera movement.",
  },
  {
    titulo: "Trocar um objeto",
    texto:
      "Replace the object in [Video1] with the object from [Image1], keeping all original motion, framing and camera movement.",
  },
];

const LIMITES = [
  "O vídeo de entrada precisa ter de 2 a 15 segundos. Se o seu clipe for maior, corte em pedaços e emende depois.",
  "O modelo aceita de 1 a 3 vídeos de referência e até 9 imagens por geração.",
  "Rosto humano real costuma ser barrado: a página do modelo no Wiro diz que a ByteDance não aceita imagem nem vídeo de referência com rosto humano real no Seedance 2.0. Para trocar a pessoa, use personagem estilizado, ilustração ou 3D, tanto no vídeo quanto na imagem.",
  "Os exemplos da documentação estão em inglês, por isso os prompts abaixo estão em inglês. Copie como estão.",
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

export default function TrocaPage() {
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
          <Repeat2 className="h-4 w-4" />
          Prompt pronto · Seedance 2.0
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O prompt da troca:{" "}
          <span style={{ color: ACCENT }}>mude a pessoa do vídeo sem regravar</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Você pega um clipe que já existe e pede outra pessoa, outra roupa ou outro objeto. Aqui
          estão os prompts prontos e a regra de escrita que faz a edição funcionar.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que você consegue trocar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {O_QUE_FAZ.map((r) => (
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
          source="troca-page"
          accent={ACCENT}
          buttonTextColor="#500724"
          title="Receba os prompts da troca"
          description="Preencha seus dados para liberar os 3 prompts, a regra de escrita e onde rodar."
          contentNote="Você vai liberar: os 3 prompts prontos para copiar (pessoa, roupa e objeto), a regra que faz a edição pegar e os links para rodar."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section
            className="rounded-xl border p-5"
            style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}
          >
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Antes de testar: os limites do modelo
            </h2>
            <ul className="mt-3 space-y-2">
              {LIMITES.map((l) => (
                <li key={l} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">A regra de escrita</h2>
            <article className="space-y-2 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
              {[
                "Chame o vídeo de [Video1] e a imagem de [Image1] no prompt. A documentação do modelo usa esses marcadores.",
                "Diga o que muda (a pessoa, a roupa, o objeto) e diga também o que fica igual: ações, enquadramento e câmera.",
                "Use verbos de edição como replace e change. Um guia de terceiros conta que, se a edição volta como uma cena nova, vale tirar a palavra reference do prompt.",
              ].map((t) => (
                <p key={t} className="flex gap-2 text-sm leading-relaxed text-[#bbb]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  <span>{t}</span>
                </p>
              ))}
            </article>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Os 3 prompts</h2>
            {PROMPTS.map((p) => (
              <article key={p.titulo} className="space-y-3 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="font-semibold">{p.titulo}</h3>
                <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                  <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                    {p.texto}
                  </pre>
                </div>
                <CopyButton text={p.texto} label="Copiar prompt" />
              </article>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Onde rodar</h2>
            <a
              href={REPLICATE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4 transition-colors hover:border-[#3a3a3e]"
            >
              <span className="min-w-0">
                <span className="block font-semibold">Seedance 2.0 na Replicate</span>
                <span className="block text-sm text-[#999]">
                  Playground e API do modelo, com os marcadores [Video1] e [Image1].
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#888]" />
            </a>
            <a
              href={HIGGSFIELD}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4 transition-colors hover:border-[#3a3a3e]"
            >
              <span className="min-w-0">
                <span className="block font-semibold">Seedance 2.0 no site da Higgsfield</span>
                <span className="block text-sm text-[#999]">
                  Página do modelo na Higgsfield.
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#888]" />
            </a>
            <p className="text-center text-xs text-[#777]">
              Informações conferidas em 10 de novembro de 2026
            </p>
          </section>
        </div>
      )}

      <SalesCta utmContent="troca" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
