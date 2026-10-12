"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Film, Code2, Boxes, Gamepad2, BookOpen, Sparkles } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#C4B5FD";
const REPO = "https://github.com/yihui-dev/awesome-opus5-5-videos";

const CATEGORIAS = [
  { icone: Sparkles, nome: "Motion graphics", qtd: "58", texto: "Tipografia animada, transições, peças gráficas em movimento." },
  { icone: BookOpen, nome: "Explainers", qtd: "16", texto: "Aquelas animações que explicam um conceito passo a passo." },
  { icone: Boxes, nome: "Cenas 3D", qtd: "14", texto: "Objetos com volume, câmera andando pelo espaço." },
  { icone: Gamepad2, nome: "Jogos e interativos", qtd: "12", texto: "Coisas que respondem ao clique, não só rodam sozinhas." },
];

const COMO = [
  ["1", "Escolha um vídeo que você gostaria de ter feito", "São 100 destacados no repositório, cada um com a tecnologia que usou: Canvas, SVG, GSAP ou Three.js."],
  ["2", "Abra o prompt dele", "Cada entrada aponta para um arquivo com o texto exato que o criador usou, e para o post original."],
  ["3", "Cole no seu agente e troque o conteúdo", "O prompt vira seu quando você substitui tema, cores e textos. A estrutura da animação é o que você está aproveitando."],
];

export default function PromptsDeVideoPage() {
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
          <Film className="h-4 w-4" />
          853 prompts, grátis e MIT
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Alguém juntou os vídeos que{" "}
          <span style={{ color: ACCENT }}>viralizaram feitos com IA</span> e os prompts de cada um
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Você vê a animação pronta, abre o prompt que a gerou, troca o conteúdo pelo seu e roda. Sem
          precisar saber motion design.
        </p>
      </header>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
      >
        <h2 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
          <Code2 className="h-4 w-4" />
          Entenda o que isso é, para não esperar outra coisa
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          Aqui a IA <strong>escreve a animação como código</strong> e o código vira vídeo. Não é um
          editor: não corta a sua gravação, não legenda, não trata áudio. O que sai daqui são as
          peças animadas que você <em>coloca dentro</em> de um vídeo: a abertura, a explicação no
          meio, o gráfico que ilustra o número, a cena 3D do produto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que tem no acervo</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIAS.map((c) => (
            <article key={c.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <div className="flex items-center gap-2">
                <c.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                <h3 className="font-semibold">{c.nome}</h3>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  {c.qtd}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#999]">{c.texto}</p>
            </article>
          ))}
        </div>
        <p className="text-xs text-[#666]">
          Números conferidos em 12 de outubro de 2026. O acervo cresce toda semana: só no dia da
          checagem entraram 10 vídeos e 330 prompts novos.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="promptsdevideo-page"
          accent={ACCENT}
          buttonTextColor="#1e1333"
          title="Receba o acervo completo"
          description="Preencha seus dados para liberar o repositório e o passo a passo de como usar um prompt."
          contentNote="Você vai liberar: os 853 prompts, o repositório oficial e como adaptar um prompt para o seu conteúdo."
          buttonLabel="Liberar o acervo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como usar um prompt</h2>
            {COMO.map(([n, titulo, texto]) => (
              <article
                key={n}
                className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  {n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold">{titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{texto}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Os prompts são gratuitos e ficam no GitHub</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              O repositório é mantido por quem toca o Skillry, um site que mostra cada vídeo ao lado
              de uma recriação ao vivo. O site é bom para assistir, mas você não precisa dele: os 853
              prompts estão no próprio repositório, em arquivos de texto, sob licença MIT.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#1e1333", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o acervo no GitHub
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-6 text-center text-xs text-[#777]">
            github.com/yihui-dev/awesome-opus5-5-videos · prompts na pasta prompts/
          </p>
        </div>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">E para editar o vídeo em si?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Essa parte é outra. O prompt de direção de edição, que trata de corte, legenda, ritmo e som
          da sua gravação, está em{" "}
          <a
            href="/xquads/editordevideosia"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/editordevideosia
          </a>
          . Os dois se completam: lá você edita, aqui você cria o que entra no meio.
        </p>
      </section>

      <SalesCta utmContent="promptsdevideo" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
