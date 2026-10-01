"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Sparkles,
  MonitorSmartphone,
  BrainCircuit,
  ShieldCheck,
  Plug,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F472B6";
const CRIAR = "https://chatgpt.com/dots";
const ANUNCIO = "https://openai.com/pt-BR/index/introducing-dots/";

const DIFERENCAS = [
  {
    icone: BrainCircuit,
    titulo: "Ele tem o próprio computador",
    texto: "Cada dot roda numa máquina na nuvem, com navegador próprio. Escreve e testa código quando a tarefa pede, e você pode abrir esse computador para conferir o que ele fez.",
  },
  {
    icone: Sparkles,
    titulo: "Trabalha sem você pedir de novo",
    texto: "Assume um projeto e toca adiante enquanto cuida de outros. Aprende seus padrões com o tempo e entrega do seu jeito, em vez de esperar instrução a cada passo.",
  },
  {
    icone: Plug,
    titulo: "Conecta em mais de 4 mil aplicativos",
    texto: "Pelo ecossistema de plugins. Pode também ser autorizado a usar os seus dispositivos, como o notebook.",
  },
  {
    icone: MonitorSmartphone,
    titulo: "Você fala com ele onde já trabalha",
    texto: "ChatGPT, mensagem de texto, Slack ou Teams. Quando precisa discutir melhor, dá para fazer uma chamada de voz.",
  },
];

export default function DotsPage() {
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
          Anunciado em 29 de setembro
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          A OpenAI lançou os <span style={{ color: ACCENT }}>dots</span>: agentes que trabalham o
          dia inteiro por você
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Não é um chat que responde quando você pergunta. É um agente com computador próprio, que
          assume projetos, aprende como você gosta das coisas e segue trabalhando enquanto você faz
          outra coisa.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que muda em relação ao ChatGPT</h2>
        <div className="space-y-2">
          {DIFERENCAS.map((d) => (
            <article
              key={d.titulo}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
            >
              <d.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              <div className="min-w-0">
                <h3 className="font-semibold">{d.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{d.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="dots-page"
          accent={ACCENT}
          buttonTextColor="#3d0a26"
          title="Receba o acesso ao anúncio"
          description="Preencha seus dados para liberar o link oficial e o resumo do que a OpenAI prometeu."
          contentNote="Você vai liberar: o anúncio completo da OpenAI, em português, mais o que já se sabe sobre controle, permissões e a prévia para empresas."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <a
              href={CRIAR}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
              style={{
                backgroundColor: ACCENT,
                color: "#3d0a26",
                boxShadow: `0 10px 36px ${ACCENT}45`,
              }}
            >
              Crie os seus DOTS
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </a>
            <p className="text-center text-xs text-[#777]">
              Abre no ChatGPT ·{" "}
              <a
                href={ANUNCIO}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[#aaa]"
              >
                ler o anúncio oficial da OpenAI
              </a>
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <ShieldCheck className="h-5 w-5" style={{ color: ACCENT }} />
              Quem manda continua sendo você
            </h2>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Identidade e permissões próprias</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                O dot entra como entraria um funcionário novo: tem identidade própria para acesso, e
                você define até onde ele pode ir.
              </p>
            </article>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Revisão de ações e aprovações</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                Ele prepara e espera seu aval no que importa. Num dos exemplos da OpenAI, o dot
                percebeu uma fatura esquecida, montou e só enviou depois da aprovação.
              </p>
            </article>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Para empresas, há uma prévia limitada</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                São os dots especialistas, com identidade e responsabilidades definidas dentro da
                organização, incluindo integração com o Microsoft Agent 365.
              </p>
            </article>
          </section>

          <p className="text-xs leading-relaxed text-[#666]">
            Informações retiradas do anúncio oficial da OpenAI, publicado em 29 de setembro de 2026 e
            conferido em 1º de outubro de 2026. Produto recém-lançado: planos, disponibilidade e
            recursos devem mudar nas próximas semanas.
          </p>
        </div>
      )}

      <SalesCta utmContent="dots" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
