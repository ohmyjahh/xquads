"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Gauge,
  ArrowUpRight,
  Star,
  Monitor,
  KeyRound,
  Smartphone,
  Apple,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#C084FC";
const REPO = "https://github.com/vinzdg/codenotch";

const COBERTURA = ["Claude Code", "Cursor", "Codex", "Antigravity"];

const MOSTRA = [
  {
    titulo: "Quanto da cota você já queimou",
    texto: "Um anel por assistente, com a porcentagem consumida da janela atual.",
  },
  {
    titulo: "Quando o limite reseta",
    texto: "Passe o mouse e veja as janelas de limite e o horário em que elas viram.",
  },
  {
    titulo: "Se ele ainda está trabalhando",
    texto: "Mostra se o agente segue processando, se terminou ou se está esperando você responder.",
  },
];

const INSTALACAO = [
  {
    icone: Apple,
    nome: "Mac",
    texto: "Download do .dmg, assinado e notarizado. Depois de instalado, ele se atualiza sozinho. É o caminho principal do projeto.",
  },
  {
    icone: Monitor,
    nome: "Windows",
    texto: "Existe um porte em Rust, com os mesmos provedores. O instalador não é assinado, então o SmartScreen bloqueia na primeira execução: clique em Mais informações e depois em Executar assim mesmo.",
  },
  {
    icone: Smartphone,
    nome: "Celular",
    texto: "Um aplicativo para iOS e Android espelha as mesmas porcentagens. O pareamento é por QR code e só funciona com o computador na mesma rede Wi-Fi.",
  },
];

export default function ContadorPage() {
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
          <Gauge className="h-4 w-4" />
          Medidor de cota
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Pare de descobrir que a <span style={{ color: ACCENT }}>cota acabou</span> no pior
          momento
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Uma tarja fina na borda da tela mostra o tanto que você já gastou em cada assistente de
          código, e quando o limite reseta. Some quando você não precisa dela.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">O que a tarja mostra</h2>
        <div className="space-y-2">
          {MOSTRA.map((m) => (
            <article key={m.titulo} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
              <h3 className="font-semibold">{m.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{m.texto}</p>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#777]">Acompanha:</span>
          {COBERTURA.map((c) => (
            <span
              key={c}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{ borderColor: `${ACCENT}33`, color: ACCENT }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Antes de baixar</h2>
        <article className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
          <Monitor className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          <div className="min-w-0">
            <h3 className="font-semibold">É programa de computador, não site</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              O projeto nasceu para Mac e é lá que ele está mais redondo. Existe um porte para
              Windows, mas o instalador não é assinado e o SmartScreen vai reclamar na primeira
              vez. Não roda no celular sozinho: o aplicativo de telefone só espelha o que o
              computador já mostra.
            </p>
          </div>
        </article>
        <article className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
          <KeyRound className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          <div className="min-w-0">
            <h3 className="font-semibold">Ele lê a sua sessão local para saber a cota</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              Para calcular quanto sobrou, o app consulta o que os assistentes já guardam na sua
              máquina: o uso em cache do Claude Desktop, o comando de uso do próprio Claude Code, o
              token no keychain e a sessão local do Cursor. Nada disso exige login novo, e o código
              é aberto sob licença MIT, então dá para conferir o que ele faz.
            </p>
          </div>
        </article>
      </section>

      {!unlocked ? (
        <LeadGate
          source="contador-page"
          accent={ACCENT}
          buttonTextColor="#1e0b2e"
          title="Receba o acesso ao projeto"
          description="Preencha seus dados para liberar o repositório e os caminhos de instalação."
          contentNote="Você vai liberar: o repositório oficial, o caminho de instalação em cada sistema e como parear o aplicativo de celular."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-xl border p-5 transition-opacity hover:opacity-90"
            style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}14` }}
          >
            <div className="min-w-0">
              <p className="font-semibold" style={{ color: ACCENT }}>
                Abrir o CodeNotch no GitHub
              </p>
              <p className="mt-1 text-sm text-[#999]">
                github.com/vinzdg/codenotch · download e documentação
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          </a>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Por onde instalar</h2>
            <div className="space-y-2">
              {INSTALACAO.map((i) => (
                <article
                  key={i.nome}
                  className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
                >
                  <i.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  <div className="min-w-0">
                    <h3 className="font-semibold">{i.nome}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#999]">{i.texto}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#777]">
              Se o Mac disser que o aplicativo está danificado, na maioria das vezes é a quarentena
              do sistema, não download corrompido. O próprio repositório explica como liberar.
            </p>
          </section>
        </div>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">CodeNotch</h2>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
          >
            <Star className="h-3 w-3" />
            1.840 estrelas
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">MIT</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#666]">
          Projeto novo: nasceu em 5 de setembro de 2026 e juntou essas estrelas em menos de duas
          semanas, com atualizações diárias. Cresce rápido, e por isso pode mudar rápido também.
          Números conferidos em 17 de setembro de 2026.
        </p>
      </section>

      <SalesCta utmContent="contador" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
