"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Clapperboard,
  Camera,
  Sparkles,
  Boxes,
  Code2,
  MonitorPlay,
  Layers,
  Terminal,
  Eye,
  ShieldAlert,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#2DD4BF";
const REPO = "https://github.com/JuneYaooo/rea-video";
const README_PT = "https://github.com/JuneYaooo/rea-video/blob/main/i18n/README_pt.md";

const PEDIDO = "Instale https://github.com/JuneYaooo/rea-video e depois analise este vídeo: /caminho/do/video.mp4";
const PLUGIN_CLAUDE = `claude plugin marketplace add JuneYaooo/rea-video
claude plugin install rea-video@rea-video`;

const TIPOS = [
  { icone: Camera, nome: "Filmado de verdade", texto: "Diz quantas câmeras, de onde filmaram, o enquadramento, os movimentos, a iluminação e a correção de cor." },
  { icone: Sparkles, nome: "Gerado por IA", texto: "Aponta a evidência de que é IA e devolve um prompt reverso para cada plano, além de sugerir qual modelo usar." },
  { icone: Boxes, nome: "3D e animação", texto: "Identifica se vale gerar com modelo de vídeo ou renderizar de verdade em 3D." },
  { icone: Code2, nome: "Feito em código", texto: "Tipografia animada, gráficos, cards. Entrega texto, layout e tempo de cada movimento, pronto para refazer em Remotion." },
  { icone: MonitorPlay, nome: "Gravação de tela", texto: "Separa o que é material que você vai ter de gravar por conta própria." },
  { icone: Layers, nome: "Misturado", texto: "Personagem de IA com interface em código e captura real? Ele julga plano por plano e remonta na linha do tempo original." },
];

const ALEM = [
  "Legendas e textos: início e fim de cada linha, com cor e contorno — exporta SRT e ASS",
  "Stickers, emoji e tela dentro de tela: onde ficam e quanto tempo duram",
  "Edição: onde estão os cortes, em que velocidade e se batem no ritmo da música",
  "Áudio: voz humana ou de IA, música de biblioteca ou gerada, BPM e onde cai cada efeito",
  "A lista do que você vai precisar providenciar: gravações, prints, fotos do produto",
];

function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#2DD4BF]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            {label}
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

function Bloco({ code }: { code: string }) {
  return (
    <div className="mt-2 space-y-2">
      <CopyButton text={code} />
      <div className="overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-3">
        <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">{code}</pre>
      </div>
    </div>
  );
}

export default function ReaVideoPage() {
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
          <Clapperboard className="h-4 w-4" />
          12 mil estrelas no GitHub
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Viu um vídeo que funcionou?{" "}
          <span style={{ color: ACCENT }}>Descubra plano a plano como ele foi feito</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Você entrega o arquivo e recebe a dissecação: o que foi filmado, o que é IA e o que é
          código — corte por corte, com o caminho para refazer cada pedaço.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que ele consegue separar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIPOS.map((t) => (
            <article key={t.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <t.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {t.nome}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{t.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">E ainda entrega, do mesmo vídeo</h2>
        <ul className="mt-3 space-y-2">
          {ALEM.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-[#999]">
              <span style={{ color: ACCENT }}>·</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que você precisa ter</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Terminal className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              Um agente que roda comando
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              Claude Code ou Codex, mais ffmpeg e Python 3.10 ou superior.{" "}
              <strong className="text-white">Não é um aplicativo com botão</strong>: quem nunca
              abriu um terminal vai tropeçar na instalação.
            </p>
          </article>
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Eye className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              Modelo com visão, se quiser o melhor
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">
              Funciona sem. Ligando um modelo que enxerga vídeo, ele acerta mais na hora de dizer
              o que é IA e passa a devolver um prompt reverso para cada plano.
            </p>
          </article>
        </div>
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: "#EF444466", backgroundColor: "#EF44440F" }}
      >
        <h2 className="flex items-center gap-2 font-semibold text-[#FCA5A5]">
          <ShieldAlert className="h-5 w-5" />
          Cuidado com golpe usando o nome do projeto
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          O próprio autor abre a documentação avisando: ele{" "}
          <strong className="text-white">não lançou nenhuma criptomoeda</strong>, e qualquer token
          com o nome do projeto é golpe de terceiros. Projeto com 12 mil estrelas atrai esse tipo
          de coisa. Baixe só pelo repositório oficial.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="reavideo-page"
          accent={ACCENT}
          buttonTextColor="#04302b"
          title="Receba o acesso à ferramenta"
          description="Preencha seus dados para liberar a instalação e como pedir a análise."
          contentNote="Você vai liberar: as duas formas de instalar, o pedido pronto para colar no agente, o que sai no fim e o repositório oficial."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como usar</h2>

            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">
                <span style={{ color: ACCENT }}>Jeito 1.</span> Só pedir
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                No Claude Code ou no Codex, cole a frase abaixo trocando o caminho pelo seu
                arquivo. O agente instala sozinho, aprende o fluxo e roda a análise inteira.
              </p>
              <Bloco code={PEDIDO} />
            </article>

            <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="font-semibold">
                <span style={{ color: ACCENT }}>Jeito 2.</span> Instalar como plugin
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">
                Deixa a habilidade sempre disponível no seu agente, sem precisar pedir a
                instalação toda vez.
              </p>
              <Bloco code={PLUGIN_CLAUDE} />
            </article>
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FileText className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />O que sai no fim
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Dois arquivos, cada um para um leitor. Um <strong className="text-white">relatório</strong>{" "}
              em HTML ou PDF, feito para você ler e entender como o vídeo foi montado. E um{" "}
              <strong className="text-white">VIDEO.md</strong>, escrito em camadas para a sua IA
              ler só a parte que a pergunta precisa — o que gasta muito menos contexto na hora de
              refazer o vídeo com ela.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#04302b", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o repositório
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-4 text-center text-xs text-[#777]">
            github.com/JuneYaooo/rea-video · Apache 2.0 · conferido em 23 de novembro de 2026
          </p>

          <a
            href={README_PT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border px-6 py-4 font-semibold transition-colors hover:bg-[#1a1a1d]"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            Ler a documentação em português
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      )}

      <SalesCta utmContent="reavideo" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
