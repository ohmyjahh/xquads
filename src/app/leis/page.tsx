"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Scale,
  Landmark,
  MapPin,
  Gavel,
  FileCode2,
  AlertTriangle,
  ArrowUpRight,
  HardDrive,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FBBF24";
const REPO = "https://github.com/ctresb/leis";

const CLONE_RASO = "git clone --depth 1 https://github.com/ctresb/leis.git";
const CLONE_PARCIAL = `git clone --depth 1 --filter=blob:none --sparse https://github.com/ctresb/leis.git
cd leis
git sparse-checkout set federal/leis-ordinarias`;

const ACERVO = [
  {
    icone: Landmark,
    nome: "Federal",
    texto: "A Constituição e as leis federais desde 1822: ordinárias, complementares, delegadas e decretos-lei.",
  },
  {
    icone: MapPin,
    nome: "Estadual e municipal",
    texto: "As 26 constituições estaduais, a Lei Orgânica do DF e a legislação das unidades da federação, organizadas por UF.",
  },
  {
    icone: Gavel,
    nome: "Reguladores e jurisprudência",
    texto: "Atos de órgãos como CONTRAN, ANVISA e Receita, súmulas e temas vinculantes dos tribunais, e tratados internalizados.",
  },
  {
    icone: FileCode2,
    nome: "Tudo em Markdown",
    texto: "Texto simples, sem PDF escaneado e sem portal travando. É por isso que um agente consegue ler.",
  },
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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#FBBF24]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar
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

function Comando({ code }: { code: string }) {
  return (
    <div className="mt-2 space-y-2">
      <CopyButton text={code} />
      <div className="overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-3">
        <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
          {code}
        </pre>
      </div>
    </div>
  );
}

export default function LeisPage() {
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
          <Scale className="h-4 w-4" />
          323 mil normas
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Toda a legislação brasileira{" "}
          <span style={{ color: ACCENT }}>num formato que a IA consegue ler</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Alguém converteu 323.849 normas de fontes oficiais para texto simples e colocou de graça
          no GitHub. Cada arquivo tem tipo, número, data, ementa e o link da origem — pronto para
          virar a base de consulta de um agente.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que tem lá dentro</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACERVO.map((a) => (
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
          Detalhe de quem caprichou: o histórico do projeto tem uma norma por commit, em ordem
          cronológica de 1822 até hoje, cada uma assinada por quem a promulgou.
        </p>
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: "#EF444466", backgroundColor: "#EF44440F" }}
      >
        <h2 className="flex items-center gap-2 font-semibold text-[#FCA5A5]">
          <AlertTriangle className="h-5 w-5" />
          Leia isto antes de usar em qualquer coisa séria
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          O próprio autor avisa, e o aviso é importante: esse material tem caráter informativo e{" "}
          <strong className="text-white">não substitui a publicação no Diário Oficial</strong>. Os
          textos vieram de conversão automática, e parte deles de leitura de documento escaneado,
          então podem ter erro.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#bbb]">
          Cada arquivo traz o link da fonte oficial no cabeçalho. Antes de citar qualquer norma em
          petição, contrato, parecer ou conteúdo publicado, abra a fonte e confira lá. Serve para
          pesquisar, montar base e prototipar — não serve como referência final.
        </p>
      </section>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <HardDrive className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          São quase 4 GB
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          A maior parte desse peso é o histórico, com mais de 323 mil commits. Dá para pegar só o
          que interessa e baixar uma fração disso — libere o acesso abaixo que eu mostro como.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="leis-page"
          accent={ACCENT}
          buttonTextColor="#2e2206"
          title="Receba o acesso ao acervo"
          description="Preencha seus dados para liberar o repositório e as formas de baixar."
          contentNote="Você vai liberar: o repositório oficial, três formas de pegar o acervo (da mais leve à completa) e o formato dos arquivos."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Três formas de pegar</h2>

            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">
                <span style={{ color: ACCENT }}>1.</span> Sem baixar nada
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                Navegue pelas pastas direto no GitHub e abra o arquivo da norma que você quer. Para
                consulta pontual, é o suficiente — e custa zero.
              </p>
            </article>

            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">
                <span style={{ color: ACCENT }}>2.</span> Só o acervo, sem o histórico
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                O <code className="text-[#ccc]">--depth 1</code> traz os arquivos como estão hoje e
                dispensa os 323 mil commits, que são a maior parte do peso.
              </p>
              <Comando code={CLONE_RASO} />
            </article>

            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">
                <span style={{ color: ACCENT }}>3.</span> Só a parte que você precisa
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                Baixa apenas a pasta que você escolher. No exemplo, as leis federais ordinárias:
                16.784 arquivos, cerca de 960 MB — contra os quase 4 GB do repositório inteiro.
                Troque o caminho da última linha pelo que você precisa, como{" "}
                <code className="text-[#ccc]">estaduais/SP</code>, e baixa menos ainda.
              </p>
              <Comando code={CLONE_PARCIAL} />
            </article>
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Por que isso funciona bem com IA</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Cada arquivo começa com um cabeçalho de dados antes do texto: título, tipo, número,
              data, ementa, situação, se foi revogada e o endereço da fonte oficial. Seu agente
              consegue filtrar por esses campos antes de ler o texto inteiro, o que torna a busca
              viável mesmo num acervo desse tamanho.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#2e2206", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o repositório
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-4 text-center text-xs text-[#777]">
            github.com/ctresb/leis · MIT, por João Davi · conferido em 26 de outubro de 2026
          </p>
        </div>
      )}

      <SalesCta utmContent="leis" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
