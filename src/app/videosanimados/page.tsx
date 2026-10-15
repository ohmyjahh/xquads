"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Mic, Instagram, Upload, Wand2, Sparkles } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#A78BFA";

const PROMPT = `Analise o vídeo do link que enviei e descreva o padrão de edição dele: ritmo dos cortes, tipo de animação, tipografia, paleta de cores, transições e como os elementos entram e saem da tela.

Depois ouça o áudio em anexo e trate a fala como trilha mestre do vídeo: nada aparece na tela antes de a fala pedir.

Com as duas coisas, crie um vídeo animado e profissional em motion design que:

- tenha exatamente a duração do áudio, sem sobra no fim
- siga o padrão de edição do vídeo de referência
- destaque na tela as palavras-chave que eu falo, no instante em que falo
- mantenha a mesma identidade visual do começo ao fim

Antes de produzir, me mostre o roteiro visual em texto: cada bloco com o trecho da fala, o tempo e o que aparece na tela. Vou aprovar antes de você gerar.`;

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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#A78BFA]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar prompt
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

const PASSOS = [
  {
    n: "1",
    icone: Mic,
    titulo: "Grave o áudio no celular",
    texto:
      "Abra o aplicativo de gravação de voz do seu celular e fale o que o vídeo vai dizer: a sua promoção, o que a sua empresa faz, o seu recado. Esse áudio é o vídeo. Tudo que vai aparecer na tela nasce dessa fala.",
    nota: null as string | null,
  },
  {
    n: "2",
    icone: Instagram,
    titulo: "Ache a referência no Instagram",
    texto:
      "Entre no Instagram e busque por motion. Role até achar um vídeo cujo estilo de edição você gosta e copie o link dele. Você não vai copiar o conteúdo, e sim o jeito de editar: o ritmo, as letras, as cores, o movimento.",
    nota: null as string | null,
  },
  {
    n: "3",
    icone: Upload,
    titulo: "Leve os dois para o Claude",
    texto:
      "Abra o Claude, suba a gravação do seu áudio e cole o link do vídeo que você escolheu.",
    nota: "Se ele não conseguir abrir o link do Instagram, salve o vídeo no celular e suba o arquivo no lugar do link. Funciona igual.",
  },
  {
    n: "4",
    icone: Wand2,
    titulo: "Peça com este prompt",
    texto:
      "Cole o prompt abaixo. Ele primeiro faz o Claude entender a referência, depois tratar a sua fala como trilha mestre, e só então produzir — passando o roteiro visual na sua frente antes de gerar.",
    nota: null as string | null,
  },
];

export default function VideosAnimadosPage() {
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
          <Sparkles className="h-4 w-4" />
          Passo a passo em 4 etapas
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Grave um áudio no celular.{" "}
          <span style={{ color: ACCENT }}>Receba um vídeo animado</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Sem abrir editor, sem saber motion design e sem aparecer na frente da câmera. Você fala,
          escolhe uma referência de estilo e a IA monta a animação em cima da sua voz.
        </p>
      </header>

      {!unlocked ? (
        <LeadGate
          source="videosanimados-page"
          accent={ACCENT}
          buttonTextColor="#1e1033"
          title="Receba o passo a passo"
          description="Preencha seus dados para liberar as quatro etapas e o prompt pronto."
          contentNote="Você vai liberar: as quatro etapas, da gravação no celular até a entrega, e o prompt completo para copiar e colar."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-4">
          {PASSOS.map((p) => (
            <article
              key={p.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold"
                style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
              >
                {p.n}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <p.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {p.titulo}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
                {p.nota && (
                  <p
                    className="mt-3 rounded-lg px-3 py-2 text-sm leading-relaxed"
                    style={{ backgroundColor: `${ACCENT}14`, color: "#bbb" }}
                  >
                    {p.nota}
                  </p>
                )}
                {p.n === "4" && (
                  <div className="mt-3 space-y-2">
                    <CopyButton text={PROMPT} />
                    <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                        {PROMPT}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <SalesCta utmContent="videosanimados" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
