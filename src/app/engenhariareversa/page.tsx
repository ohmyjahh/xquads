"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Microscope, Scale, FileSearch, Binary, Globe } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FCA5A5";
const REPO = "https://github.com/morluto/rea";

const ANALISA = [
  { icone: Binary, nome: "Binários nativos", texto: "O programa compilado, sem o código-fonte. Usa Hopper, Ghidra ou IDA quando você já tem algum instalado." },
  { icone: FileSearch, nome: "Aplicações JavaScript e Electron", texto: "Boa parte dos aplicativos de desktop de hoje. A análise estática aqui não precisa de nenhuma ferramenta pesada." },
  { icone: Microscope, nome: "Assemblies .NET", texto: "O que roda na plataforma da Microsoft." },
  { icone: Globe, nome: "Sites", texto: "Como uma página entrega determinado comportamento." },
];

export default function EngenhariaReversaPage() {
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
          <Microscope className="h-4 w-4" />
          138 mil estrelas no GitHub
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Viu um recurso que você queria ter?{" "}
          <span style={{ color: ACCENT }}>Peça ao agente para entender como ele funciona</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          O REA liga o seu agente a ferramentas de análise e explica o funcionamento de um recurso,
          mostrando a evidência de cada conclusão e também onde a análise não chegou.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que ele consegue abrir</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ANALISA.map((a) => (
            <article key={a.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <a.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {a.nome}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{a.texto}</p>
            </article>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[#777]">
          A análise roda na sua máquina, e cada resposta vem acompanhada da evidência que a sustenta
          e das limitações do que foi possível ver.
        </p>
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: "#EF444466", backgroundColor: "#EF44440F" }}
      >
        <h2 className="flex items-center gap-2 font-semibold text-[#FCA5A5]">
          <Scale className="h-5 w-5" />
          Onde esse assunto fica sério
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          Analisar um programa de outra empresa não é a mesma coisa que estudar um projeto aberto. A
          licença de uso de muitos produtos proíbe essa prática, e as regras mudam conforme o país e
          conforme o produto. Isso vale mesmo quando a sua intenção é só aprender.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#bbb]">
          Não somos advogados e esta página não é orientação jurídica. Se o que você vai construir
          tem dinheiro envolvido, converse com um antes, e leia os termos daquilo que pretende
          analisar.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="engenhariareversa-page"
          accent={ACCENT}
          buttonTextColor="#2e0b0b"
          title="Receba o acesso ao projeto"
          description="Preencha seus dados para liberar o repositório e o que você precisa ter instalado."
          contentNote="Você vai liberar: o repositório oficial, o comando de instalação e os pré-requisitos para cada tipo de análise."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Para começar</h2>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Um comando instala</h3>
              <code className="mt-2 block rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-3 font-mono text-[13px] text-[#ccc]">
                npx rea-agents setup
              </code>
              <p className="mt-2 text-sm leading-relaxed text-[#999]">
                Ele registra a ferramenta no seu agente e instala as instruções de trabalho junto.
              </p>
            </article>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Para binário nativo, precisa de uma engine</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                Hopper, Ghidra ou IDA. Se você já tem uma delas, ele aproveita; o instalador também
                oferece colocar o Hopper, com a sua autorização. Já para analisar JavaScript, não
                precisa de nada disso.
              </p>
            </article>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#2e0b0b", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o repositório
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-4 text-center text-xs text-[#777]">
            github.com/morluto/rea · MIT · conferido em 12 de outubro de 2026
          </p>
        </div>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Quer só refazer a funcionalidade?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Existe um caminho que não envolve abrir o programa de ninguém: reconstruir o que o
          aplicativo faz a partir do que é público, em{" "}
          <a
            href="/xquads/replicadeapp"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/replicadeapp
          </a>
          . Para a maioria dos casos, é o suficiente e evita a discussão inteira.
        </p>
      </section>

      <SalesCta utmContent="engenhariareversa" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
