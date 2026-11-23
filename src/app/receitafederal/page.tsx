"use client";

import { useState, useSyncExternalStore } from "react";
import { Landmark, FileCode2, Calculator, FileText, Terminal, Scale, BadgeCheck, ArrowUpRight } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#4ADE80";
const ORG = "https://github.com/ReceitaFederal";
const NOTICIA =
  "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/novembro/receita-federal-publica-primeiro-codigo-fonte-aberto-no-github-e-amplia-transparencia-da-reforma-tributaria";

const REPOS = [
  {
    icone: Calculator,
    nome: "calculadora-rtc-regime-regular",
    estrelas: "996",
    lang: "Java",
    texto:
      "O principal. Calcula CBS, IBS e Imposto Seletivo nas operações do regime geral, consulta as tabelas oficiais e ainda gera e valida os grupos de tributação dos documentos fiscais eletrônicos.",
    url: "https://github.com/ReceitaFederal/calculadora-rtc-regime-regular",
  },
  {
    icone: FileCode2,
    nome: "calculadora-rtc-simples-nacional",
    estrelas: "733",
    lang: "Java",
    texto: "A mesma conta, para quem está no Simples Nacional.",
    url: "https://github.com/ReceitaFederal/calculadora-rtc-simples-nacional",
  },
  {
    icone: FileText,
    nome: "calculadora-rtc-gerador-danfse",
    estrelas: "593",
    lang: "Go",
    texto: "Gera o DANFSe, o documento auxiliar da nota fiscal de serviço eletrônica.",
    url: "https://github.com/ReceitaFederal/calculadora-rtc-gerador-danfse",
  },
];

export default function ReceitaFederalPage() {
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
          <Landmark className="h-4 w-4" />
          Primeira vez na história
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          A Receita Federal abriu o código{" "}
          <span style={{ color: ACCENT }}>que calcula o seu imposto</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          As calculadoras da Reforma Tributária — CBS, IBS e Imposto Seletivo — estão no GitHub,
          de graça, para qualquer um ler, rodar e conferir. É a primeira vez que o órgão publica
          código-fonte aberto.
        </p>
      </header>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}
      >
        <h2 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
          <BadgeCheck className="h-5 w-5" />
          Sim, é oficial — e dá para conferir
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          Vale desconfiar de perfil no GitHub com nome de órgão público, porque qualquer um cria
          um. Neste caso a confirmação vem do próprio governo: a{" "}
          <a href={NOTICIA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: ACCENT }}>
            notícia publicada no gov.br
          </a>{" "}
          lista os três repositórios, e a abertura foi formalizada pela Portaria Cotec nº 342, de
          12 de novembro de 2026. O trabalho é da Receita Federal com o Serpro, sob licença MIT.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Por que isso importa</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="font-semibold">Se você faz sistema</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              Você passa a ter a implementação de referência da regra, em vez de interpretar a lei
              no escuro e torcer para o seu cálculo bater com o do governo.
            </p>
          </article>
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="font-semibold">Se você tem empresa</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              A conta que vai definir o seu imposto deixou de ser caixa-preta. Dá para rodar o
              cálculo oficial e comparar com o que o seu sistema está cobrando.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Terminal className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          É código, não é aplicativo com tela
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          As calculadoras são APIs: sobem na sua máquina e respondem a chamadas, sem interface
          para clicar. As duas principais pedem Java 25 (o Maven vem junto, pelo wrapper). Se
          você não desenvolve, isso aqui é material para passar ao seu time de tecnologia ou ao
          seu contador — não é um site onde você digita um valor.
        </p>
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: "#EF444466", backgroundColor: "#EF44440F" }}
      >
        <h2 className="flex items-center gap-2 font-semibold text-[#FCA5A5]">
          <Scale className="h-5 w-5" />
          Isto não é orientação tributária
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          Esta página só aponta onde está o código oficial e diz o que ele faz. Não somos
          contadores e não damos orientação fiscal. Rodar a calculadora não substitui a apuração
          da sua empresa: qualquer decisão sobre imposto se confirma com o seu contador.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="receitafederal-page"
          accent={ACCENT}
          buttonTextColor="#04210f"
          title="Receba o acesso aos repositórios"
          description="Preencha seus dados para liberar os três links oficiais."
          contentNote="Você vai liberar: os três repositórios publicados pela Receita Federal, com o que cada um faz, e o link da notícia oficial."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Os três repositórios</h2>
          {REPOS.map((r) => (
            <article key={r.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
              <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                <r.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                <span className="font-mono text-sm">{r.nome}</span>
                <span className="text-xs text-[#777]">
                  {r.estrelas} ⭐ · {r.lang}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#999]">{r.texto}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
                style={{ color: ACCENT }}
              >
                Abrir no GitHub
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </article>
          ))}

          <a
            href={ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#04210f", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Ver tudo no GitHub da Receita
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-2 text-center text-xs text-[#777]">
            github.com/ReceitaFederal · MIT · conferido em 23 de novembro de 2026
          </p>
        </div>
      )}

      <SalesCta utmContent="receitafederal" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
