"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Languages,
  Captions,
  Laptop,
  Monitor,
  Terminal,
  Smartphone,
  Mic,
  Keyboard,
  ShieldCheck,
  Gift,
  KeyRound,
  Code2,
  Globe,
  Download,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#22D3EE";
const ACCENT_TEXT = "#04222a";

const REPO = "https://github.com/wquguru/cicada";
const SITE = "https://cicada.indaloop.app";
const DOWNLOAD = "https://cicada.indaloop.app/en/download/";
const RELEASES = "https://github.com/wquguru/cicada/releases/latest";

const AVISO =
  "Baixe só do GitHub ou do site oficial (o Cicada não tem moeda, token nem NFT) e avise os participantes de que a reunião está sendo transcrita.";

const LINKS = [
  {
    icone: Code2,
    titulo: "Repositório no GitHub",
    texto: "O código aberto, a documentação e o histórico do projeto.",
    url: REPO,
    rotulo: "github.com/wquguru/cicada",
  },
  {
    icone: Globe,
    titulo: "Site oficial",
    texto: "A página do projeto, com as explicações do próprio autor.",
    url: SITE,
    rotulo: "cicada.indaloop.app",
  },
  {
    icone: Download,
    titulo: "Página de download",
    texto: "Os instaladores por sistema, direto da fonte oficial.",
    url: DOWNLOAD,
    rotulo: "cicada.indaloop.app/en/download",
  },
  {
    icone: Download,
    titulo: "Versões publicadas (releases)",
    texto: "A versão mais recente, publicada no próprio GitHub.",
    url: RELEASES,
    rotulo: "github.com/wquguru/cicada/releases/latest",
  },
];

const PLATAFORMAS = [
  {
    destaque: true,
    icone: Laptop,
    titulo: "Mac (o caminho mais simples)",
    selo: "macOS 14.4 ou mais novo",
    passos: [
      "Baixe o instalador do Mac na página de download oficial e abra o app.",
      "No Mac com Apple silicon e macOS 14.4 a 15, ligue o Ditado em Ajustes do Sistema > Teclado e adicione os idiomas que você vai usar. No macOS 26 isso não é necessário.",
      "Para a interpretação (a sua voz traduzida dentro da chamada), o app instala o microfone virtual BlackHole 2ch e pede a senha de administrador do Mac uma única vez.",
      "No Mac Intel, o app funciona com uma chave de serviço de IA (veja a seção sobre o que é grátis).",
    ],
  },
  {
    destaque: false,
    icone: Monitor,
    titulo: "Windows",
    selo: "Windows 10 (2004) ou mais novo, x64 ou ARM64",
    passos: [
      "Baixe o instalador do Windows na página de download oficial.",
      "O instalador não é assinado, então o SmartScreen pode bloquear. Se acontecer, clique em Mais informações e depois em Executar assim mesmo, depois de conferir que o arquivo veio do site ou do GitHub oficial.",
      "Para a interpretação, o app usa o VB-Cable como microfone virtual, e o guia dentro do próprio app ensina a configurar.",
      "No Windows é preciso uma chave de serviço de IA.",
    ],
  },
  {
    destaque: false,
    icone: Terminal,
    titulo: "Linux",
    selo: "Ubuntu 22.04 ou 24.04",
    passos: [
      "Baixe o pacote do Linux na página de download oficial.",
      "O microfone virtual para a interpretação é configurado de forma automática.",
      "No Linux é preciso uma chave de serviço de IA.",
    ],
  },
  {
    destaque: false,
    icone: Smartphone,
    titulo: "Android (celular)",
    selo: "Android 10 ou mais novo",
    passos: [
      "Baixe o app na página de download oficial.",
      "Os apps de chamada bloqueiam a captura do áudio no celular. Coloque a chamada no viva-voz e use o modo In person (presencial) do app.",
      "No Android é preciso uma chave de serviço de IA.",
    ],
  },
];

const FALA = ["inglês", "japonês", "chinês", "coreano", "espanhol", "francês", "alemão", "português (pt-BR)"];
const TRADUCAO = [
  "chinês (simplificado e tradicional)",
  "inglês",
  "japonês",
  "coreano",
  "espanhol",
  "francês",
  "alemão",
  "português",
];

const PROMPT_AJUDA = `Quero instalar o Cicada, o app gratuito de tradução ao vivo para videochamada. Use só as fontes oficiais:
- Repositório: ${REPO}
- Site: ${SITE}
- Download: ${DOWNLOAD}

Meu sistema é [Mac com Apple silicon / Mac Intel / Windows / Linux / Android] e a versão é [informe a versão].
Eu uso [Google Meet / Zoom / outra ferramenta] nas chamadas.

Me guie passo a passo, uma etapa por vez:
1. Me diga qual instalador eu devo baixar e confirme que o link é o oficial.
2. Me diga se o meu sistema funciona sem chave ou se preciso de uma chave de serviço de IA.
3. Me ajude a configurar o microfone virtual e a escolhê-lo no app de chamada.
4. Me explique como usar a legenda ao vivo e a tecla de falar.

Não invente passos nem recursos: se algo não estiver na documentação oficial, me diga que não sei confirmar. Não me peça senha nem chave aqui no chat.`;

function CopyButton({ text, rotulo }: { text: string; rotulo: string }) {
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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#22D3EE]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            {rotulo}
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

export default function VideochamadaPage() {
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
          <Languages className="h-4 w-4" />O passo a passo do vídeo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Traduza a voz e a legenda{" "}
          <span style={{ color: ACCENT }}>em qualquer videochamada</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          O Cicada é um repositório gratuito, lançado em novembro de 2026, com mais de 3 mil
          estrelas no GitHub. Ele mostra a legenda bilíngue do que o outro lado fala e, quando
          você fala, interpreta a sua voz dentro da chamada.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] px-5 py-4">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-[#999]">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          {AVISO}
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="videochamada-page"
          accent={ACCENT}
          buttonTextColor={ACCENT_TEXT}
          title="Receba o passo a passo"
          description="Preencha seus dados para liberar os links oficiais e a instalação por sistema."
          contentNote="Você vai liberar: os links oficiais do Cicada, o que é grátis e o que pede chave, a instalação por sistema, como usar na chamada, o microfone virtual e os idiomas confirmados."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Os links oficiais</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Baixe sempre por aqui. Perfil ou site com outro nome, ou que fale em moeda, token ou
              NFT, não é o projeto.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {LINKS.map((l) => (
                <article key={l.url} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <l.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    {l.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#999]">{l.texto}</p>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 break-all text-sm font-semibold underline underline-offset-4"
                    style={{ color: ACCENT }}
                  >
                    {l.rotulo}
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">O que é grátis e o que pede chave</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <article
                className="rounded-xl border p-5"
                style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}
              >
                <h3 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
                  <Gift className="h-5 w-5 shrink-0" />
                  De graça, sem chave
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
                  No <strong className="text-white">Mac com Apple silicon</strong>: legenda, tradução,
                  registro da reunião e interpretação funcionam sem chave. A voz da interpretação usa
                  as vozes do próprio macOS.
                </p>
              </article>
              <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <KeyRound className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  Pede chave
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#999]">
                  <li>
                    Vozes naturais, clonar a própria voz, notas ao vivo e tradução de voz em um passo
                    (chave da Ling).
                  </li>
                  <li>
                    Mac Intel, Windows, Linux e Android: chave de um serviço de IA (Ling, OpenRouter,
                    ZenMux, OpenAI ou compatível).
                  </li>
                </ul>
              </article>
            </div>
            <p className="text-sm leading-relaxed text-[#999]">
              A Ling é o serviço de IA do Ant Group e dá ¥10 de crédito grátis por mês, o que o
              projeto estima em 10 a 50 horas de uso. Clonar a própria voz usa uma gravação sua de 8
              a 30 segundos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Instalação por sistema</h2>
            {PLATAFORMAS.map((p) => (
              <article
                key={p.titulo}
                className="rounded-xl border p-5"
                style={
                  p.destaque
                    ? { borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }
                    : { borderColor: "#2a2a2e", backgroundColor: "#1a1a1d" }
                }
              >
                <h3 className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                  <p.icone className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  {p.titulo}
                  <span className="text-xs font-normal text-[#777]">{p.selo}</span>
                </h3>
                <ol className="mt-3 space-y-2">
                  {p.passos.map((t, i) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed text-[#bbb]">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">{t}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Como usar dentro da chamada</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Captions className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  Legenda bilíngue ao vivo
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#999]">
                  O app escuta o áudio do computador e mostra o que o outro lado fala, com a tradução
                  escrita na parte de baixo da tela. Funciona com Meet, Zoom, Teams, Webex, Discord e
                  Telegram, e também com YouTube, lives e podcasts. Não entra nenhum robô na reunião.
                </p>
              </article>
              <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Keyboard className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  Interpretação: segure a tecla e fale
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#999]">
                  Segure a tecla de falar (Option direito no Mac, Ctrl direito no Windows, configurável)
                  enquanto você fala. O outro lado ouve a sua voz traduzida dentro da chamada. No Mac
                  existe ainda o modo mãos livres, opcional.
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Mic className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              O microfone virtual
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              É ele que leva a sua voz traduzida para dentro da chamada. No Mac, o app instala o
              BlackHole 2ch (pede a senha de administrador uma vez). No Windows, usa o VB-Cable, e o
              guia do app ensina. No Linux, é automático. Depois, nas configurações de áudio do
              Google Meet, do Zoom ou da ferramenta que você usa, escolha esse microfone virtual como
              o microfone da chamada.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Languages className="h-6 w-6 shrink-0" style={{ color: ACCENT }} />
              Os idiomas confirmados
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="font-semibold">Fala reconhecida</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#999]">{FALA.join(", ")}.</p>
              </article>
              <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="font-semibold">Tradução para</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#999]">{TRADUCAO.join(", ")}.</p>
              </article>
            </div>
            <p className="text-sm leading-relaxed text-[#999]">
              Lista conferida no código do app para Mac em 25 de novembro de 2026. Árabe e russo,
              citados no vídeo, não estão nessa lista. A qualidade da tradução depende do idioma, do
              áudio e do serviço usado, então teste antes de uma reunião importante.
            </p>
          </section>

          <section
            className="rounded-xl border p-5"
            style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}
          >
            <h2 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
              <ShieldCheck className="h-5 w-5 shrink-0" />
              Privacidade
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
              No Mac com Apple silicon, o áudio não sai do computador: só o texto reconhecido vai para
              a tradução. Gravações e registros ficam no seu aparelho. O app grava e transcreve a
              reunião, então avise quem está na chamada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Peça ajuda ao Claude na instalação</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Se travar em algum passo, cole isto no seu Claude e troque o que está entre colchetes
              pela sua realidade. Ele guia a instalação sem sair das fontes oficiais.
            </p>
            <div className="space-y-2">
              <CopyButton text={PROMPT_AJUDA} rotulo="Copiar o prompt de ajuda" />
              <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                  {PROMPT_AJUDA}
                </pre>
              </div>
            </div>
          </section>

          <a
            href={DOWNLOAD}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: ACCENT_TEXT, boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o download oficial do Cicada
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-8 text-center text-xs text-[#777]">
            github.com/wquguru/cicada · Apache-2.0 · conferido em 25 de novembro de 2026
          </p>
        </div>
      )}

      <SalesCta utmContent="videochamada" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
