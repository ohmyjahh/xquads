"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Blocks,
  MessagesSquare,
  LayoutDashboard,
  Shuffle,
  ShieldAlert,
  Search,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FF9A62";
const DOCS = "https://code.claude.com/docs/en/plugins/mods/overview";

const CAPACIDADES = [
  {
    icone: MessagesSquare,
    titulo: "Suas sessões conversam entre si",
    texto: "Um mod pode mandar mensagem de uma sessão para outra do Claude Code. Uma janela avisa a outra, e o que você está rodando num lugar reage ao que aconteceu no outro.",
  },
  {
    icone: LayoutDashboard,
    titulo: "A interface vira sua",
    texto: "Dá para desenhar painel ao lado da conversa e faixa acima do campo de texto, com aba, botão e campo. E dá para redesenhar o que o próprio Claude Code mostra: a linha de cada ferramenta, o indicador de carregamento, as caixas de pergunta.",
  },
  {
    icone: Shuffle,
    titulo: "Troca o modelo no meio do caminho",
    texto: "Um mod consegue interceptar o pedido antes dele sair e mandar aquela requisição específica para outro modelo. Tarefa simples vai para o barato, tarefa difícil para o forte, sem você escolher na mão.",
  },
];

const EXEMPLOS: [string, string][] = [
  ["token-weather", "Desenha uma previsão de quanto da janela de contexto você já gastou, acima do campo de texto."],
  ["blast-radius", "Segura comando perigoso, tipo um rm -rf ou um push forçado, mostra o que ele mudaria e dá os botões de seguir ou cancelar."],
  ["replay-theater", "Acrescenta um /replay que passa, uma a uma, pelas edições de arquivo que o Claude fez no último turno."],
];

export default function ModsPage() {
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
          <Blocks className="h-4 w-4" />
          Mods do Claude Code
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Agora dá para <span style={{ color: ACCENT }}>modificar o Claude</span> por dentro
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Um mod é um plugin que roda dentro do Claude Code. Quando acontece alguma coisa, uma
          chamada de ferramenta, um prompt enviado, um pedaço da tela sendo desenhado, ele é chamado
          e pode observar, mudar ou assumir aquilo.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Três coisas que eles fazem</h2>
        {CAPACIDADES.map((c) => (
          <article
            key={c.titulo}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <c.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
            <div className="min-w-0">
              <h3 className="font-semibold">{c.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{c.texto}</p>
            </div>
          </article>
        ))}
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: "#EF444466", backgroundColor: "#EF44440F" }}
      >
        <h2 className="flex items-center gap-2 font-semibold text-[#FCA5A5]">
          <ShieldAlert className="h-5 w-5" />
          Leia isto antes de instalar qualquer mod
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          Um mod é código que roda com as suas permissões, dentro do Claude Code. Depois de
          instalado, ele consegue ler e gravar arquivos onde seu usuário alcança, abrir programas,
          acessar a rede, <strong>ler suas variáveis de ambiente e arquivos de configuração,
          inclusive chave de API</strong>, enxergar cada prompt que você manda, reescrever o que você
          digitou, <strong>aprovar uma ação sem te perguntar</strong> e gastar o seu plano chamando
          modelo.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#bbb]">
          A própria Anthropic avisa: mods não ficam isolados em sandbox. Instale só de autor em quem
          você confia.
        </p>
        <div className="mt-4 rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-[#999]">
            <Search className="h-3.5 w-3.5" />
            Dá para auditar antes de instalar
          </p>
          <code className="mt-2 block font-mono text-[13px] text-[#ccc]">
            claude plugin validate ./nome-do-mod
          </code>
          <p className="mt-2 text-xs text-[#777]">
            Lista os eventos que ele intercepta e o que ele pede para fazer, sem executar nada.
          </p>
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="mods-page"
          accent={ACCENT}
          buttonTextColor="#2a1200"
          title="Receba a documentação e os exemplos"
          description="Preencha seus dados para liberar o link oficial, os mods de exemplo da Anthropic e como instalar."
          contentNote="Você vai liberar: a documentação oficial, três mods prontos publicados pela Anthropic, as versões mínimas e o comando de instalação."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Três mods prontos da Anthropic</h2>
            <p className="text-sm text-[#888]">
              Publicados como exemplo, com o código aberto para você ler antes de rodar.
            </p>
            {EXEMPLOS.map(([nome, oque]) => (
              <article key={nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
                <code className="text-sm font-semibold" style={{ color: ACCENT }}>
                  {nome}
                </code>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{oque}</p>
              </article>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como começar</h2>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Confira a versão</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                No terminal precisa da 2.1.287 ou mais nova; no aplicativo de desktop, 2.1.286. Os
                mods já vêm ligados por padrão.
              </p>
            </article>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Instale como plugin</h3>
              <code className="mt-2 block rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-3 font-mono text-[13px] text-[#ccc]">
                /plugin install nome@marketplace
              </code>
            </article>
            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">Ou peça um ao próprio Claude</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                Descreva numa sessão o que você quer que apareça na tela, e ele escreve o mod. Alguns
                recursos nativos do Claude Code já são mods, como o /diff.
              </p>
            </article>
          </section>

          <a
            href={DOCS}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#2a1200", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Ler a documentação oficial
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-6 text-center text-xs text-[#777]">
            code.claude.com · documentação da Anthropic, conferida em 8 de outubro de 2026
          </p>
        </div>
      )}

      <SalesCta utmContent="mods" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
