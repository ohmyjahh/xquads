"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Palette, Hammer, Scale, Cpu } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FB923C";
const ORG = "https://github.com/storytold";

const APPS: [string, string, string][] = [
  ["PhotoCraft", "Adobe Photoshop", "23.994"],
  ["ArtCraft", "motor próprio de criação", "6.738"],
  ["LightCraft", "Adobe Lightroom", "4.652"],
  ["FilmCraft", "Adobe Premiere Pro", "4.616"],
  ["PDFCraft", "Adobe Acrobat", "3.816"],
  ["VectorCraft", "Adobe Illustrator", "3.275"],
  ["EffectCraft", "o projeto não declara o alvo", "2.375"],
  ["DesignCraft", "o projeto não declara o alvo", "1.417"],
  ["WordCraft", "Microsoft Word", "639"],
  ["CADCraft", "AutoCAD", "562"],
  ["SoundCraft", "Avid Pro Tools", "398"],
  ["GridCraft", "Microsoft Excel", "381"],
  ["DeckCraft", "Microsoft PowerPoint", "334"],
];

const PONTOS = [
  {
    icone: Scale,
    titulo: "Reconstrução limpa, não cópia",
    texto: "Os projetos se declaram reimplementações clean-room: refazem o que o programa faz, partindo do zero, sem usar o código do original. Licença aberta, Apache-2.0 na maioria.",
  },
  {
    icone: Cpu,
    titulo: "Tudo em Rust, nativo e offline",
    texto: "Roda em macOS, Windows, Linux, FreeBSD e no navegador. O PhotoCraft abre arquivo PSD de verdade, com camadas, máscaras e estilos.",
  },
  {
    icone: Hammer,
    titulo: "Ainda é cedo, e eles mesmos dizem isso",
    texto: "O PhotoCraft está marcado como alpha inicial. O FilmCraft se descreve como jovem e mudando rápido, o VectorCraft como em desenvolvimento ativo. Vale acompanhar e testar, não cancelar a assinatura do que você usa para trabalhar hoje.",
  },
];

export default function ArtCraftPage() {
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
          PRÉVIA LOCAL · conteúdo aberto. Em produção, a lista fica protegida.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Palette className="h-4 w-4" />
          Código aberto
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Alguém está reconstruindo o{" "}
          <span style={{ color: ACCENT }}>Photoshop, o Premiere e o Illustrator</span> de graça
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          E não para na Adobe: tem Word, Excel, PowerPoint, AutoCAD e Pro Tools também. Treze
          aplicativos refeitos do zero em Rust, de código aberto, rodando no seu computador.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Antes de criar expectativa</h2>
        {PONTOS.map((p) => (
          <article
            key={p.titulo}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <p.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
            <div className="min-w-0">
              <h3 className="font-semibold">{p.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
            </div>
          </article>
        ))}
        <p className="text-xs text-[#666]">
          Dados da organização conferidos em 8 de outubro de 2026. O PhotoCraft sozinho já passou de
          23 mil estrelas, então os números mudam rápido.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="artcraft-page"
          accent={ACCENT}
          buttonTextColor="#2a1400"
          title="Receba a lista completa"
          description="Preencha seus dados para liberar os treze aplicativos, o que cada um reconstrói e o link do projeto."
          contentNote="Você vai liberar: a lista dos treze com o programa que cada um reimplementa, mais o repositório da organização."
          buttonLabel="Liberar a lista"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Os treze</h2>
            <div className="space-y-2">
              {APPS.map(([nome, alvo, estrelas]) => (
                <article
                  key={nome}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold">{nome}</h3>
                    <p className="mt-0.5 text-sm text-[#999]">{alvo}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    {estrelas}★
                  </span>
                </article>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#777]">
              Dois deles não dizem publicamente qual programa reconstroem. Dá para supor pelo nome,
              mas como o projeto não declara, aqui também não.
            </p>
          </section>

          <a
            href={ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#2a1400", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Ver os projetos no GitHub
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-6 text-center text-xs text-[#777]">
            github.com/storytold · 41 repositórios, instalação no README de cada um
          </p>
        </div>
      )}

      <SalesCta utmContent="artcraft" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
