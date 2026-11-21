"use client";

import { ArrowUpRight, Box, Github } from "lucide-react";
import { BlackBoxBlock, BlackBoxPromos, BlackBoxTopBar } from "@/components/black-box-promos";

const SLUG = "playcanvas-bf";
const ACCENT = "#D9962B";
const MUTED = "#B9AD9B";
const CARD = "#15100A";
const LINE = "rgba(239,230,214,0.12)";

// Repositórios conferidos na API do GitHub em 21/11/2026 (todos públicos, licença MIT, não arquivados).
const REPOS: [string, string, string][] = [
  ["engine", "Motor gráfico open source para web, com WebGPU e WebGL2.", "https://github.com/playcanvas/engine"],
  ["editor", "Editor visual no navegador para criar apps WebGL, WebGPU e WebXR.", "https://github.com/playcanvas/editor"],
  ["supersplat", "Editor de 3D Gaussian Splat.", "https://github.com/playcanvas/supersplat"],
  ["model-viewer", "Visualizador de modelos 3D em glTF e 3D Gaussian Splats.", "https://github.com/playcanvas/model-viewer"],
  ["web-components", "Web Components para montar apps gráficos de forma declarativa.", "https://github.com/playcanvas/web-components"],
  ["react", "Crie apps 3D com React.", "https://github.com/playcanvas/react"],
  ["create-playcanvas", "Cria rapidamente a estrutura de um projeto PlayCanvas.", "https://github.com/playcanvas/create-playcanvas"],
];

export default function PlayCanvasBlackBoxPage() {
  return (
    <div className="min-h-screen pb-36 md:pb-20" style={{ backgroundColor: "#121214", color: "#FAFAFA" }}>
      <BlackBoxTopBar slug={SLUG} />

      <div className="mx-auto max-w-3xl space-y-8 px-4 pt-20">
        <header className="space-y-3 pt-4 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
            style={{ borderColor: "rgba(217,150,43,0.4)", backgroundColor: "rgba(217,150,43,0.1)", color: ACCENT }}
          >
            <Github className="h-3.5 w-3.5" />
            Código aberto no GitHub
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Os repositórios do <span style={{ color: ACCENT }}>PlayCanvas</span>
          </h1>
          <p className="mx-auto max-w-xl leading-relaxed" style={{ color: MUTED }}>
            A empresa britânica PlayCanvas tem dezenas de ferramentas de código aberto no GitHub. Aqui estão os links dos repositórios
            principais.
          </p>
        </header>

        <section className="space-y-3 rounded-xl border p-5" style={{ backgroundColor: CARD, borderColor: LINE }}>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Box className="h-5 w-5" style={{ color: ACCENT }} />O caso do vídeo
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
            No vídeo, um empreendedor usou o Claude e os repositórios de código aberto do PlayCanvas para criar um sistema em que,
            só com o celular, dá para fazer o 3D completo de uma residência, espaço ou ambiente, facilitando a venda dos imóveis.
          </p>
        </section>

        <BlackBoxBlock slug={SLUG} variant="grupo" />

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Repositórios</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {REPOS.map(([name, desc, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-32 flex-col rounded-xl border p-5 transition-colors hover:border-[#D9962B]/50"
                style={{ backgroundColor: CARD, borderColor: LINE }}
              >
                <code className="flex items-center justify-between text-sm font-semibold" style={{ color: ACCENT }}>
                  playcanvas/{name}
                  <ArrowUpRight className="h-4 w-4" />
                </code>
                <p className="mt-2 text-sm" style={{ color: MUTED }}>
                  {desc}
                </p>
              </a>
            ))}
          </div>
          <a
            href="https://github.com/playcanvas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold underline"
            style={{ color: ACCENT }}
          >
            Ver todos os repositórios no GitHub <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

        <BlackBoxBlock slug={SLUG} variant="desconto" />

        <section className="rounded-xl border p-5 text-sm" style={{ borderColor: LINE, color: MUTED }}>
          Os repositórios acima são públicos, com licença MIT, conferidos no GitHub em 21/11/2026. Confira a licença de cada projeto
          antes de usar em um produto seu.
        </section>

        <BlackBoxBlock slug={SLUG} variant="contagem" />

        <p className="text-center text-xs" style={{ color: "rgba(250,250,250,0.45)" }}>
          Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
        </p>
      </div>

      <BlackBoxPromos slug={SLUG} />
    </div>
  );
}
