"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Video,
  ZoomIn,
  MousePointer2,
  Frame,
  UserSquare2,
  Scissors,
  FileDown,
  Laptop,
  Monitor,
  Terminal,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#60A5FA";
const REPO = "https://github.com/webadderallorg/recordly";
const RELEASES = "https://github.com/webadderallorg/recordly/releases";

const ACABAMENTO = [
  {
    icone: ZoomIn,
    nome: "Zoom que aparece sozinho",
    texto:
      "Ele percebe onde você clicou e sugere a aproximação naquele ponto. É o movimento que faz a demonstração parecer dirigida em vez de gravada.",
  },
  {
    icone: MousePointer2,
    nome: "Cursor que para de tremer",
    texto:
      "Suavização do caminho, desfoque de movimento e um pequeno salto no clique. O mouse deixa de ser o detalhe amador do vídeo.",
  },
  {
    icone: Frame,
    nome: "Moldura em volta da tela",
    texto:
      "Fundo de cor, gradiente, imagem ou desfoque, com cantos arredondados, sombra e margem. A gravação para de parecer um print em movimento.",
  },
  {
    icone: UserSquare2,
    nome: "Bolha de webcam",
    texto:
      "Seu rosto num círculo, com posição, tamanho, espelhamento e sombra no controle. Pode encolher junto quando o zoom entra.",
  },
  {
    icone: Scissors,
    nome: "Linha do tempo de verdade",
    texto:
      "Corte, trecho acelerado, trecho em câmera lenta, texto e imagem por cima, áudio extra. Arrastando, sem abrir editor nenhum.",
  },
  {
    icone: FileDown,
    nome: "Sai em MP4 ou GIF",
    texto:
      "Com escolha de qualidade, proporção e tamanho. O GIF tem controle de quadros por segundo e de repetição — serve para post e documentação.",
  },
];

const SISTEMAS = [
  { icone: Laptop, nome: "macOS", req: "14.0 Sonoma ou mais novo", nota: "Captura nativa, com áudio do sistema e microfone." },
  { icone: Monitor, nome: "Windows", req: "10 build 19041 ou mais novo", nota: "Captura e áudio nativos. Em build anterior, o cursor real pode aparecer na gravação." },
  { icone: Terminal, nome: "Linux", req: "Distribuição atual", nota: "Grava, mas é o mais simples dos três: não esconde o cursor, e o áudio do sistema costuma pedir PipeWire." },
];

const PASSOS = [
  { n: "1", titulo: "Escolha o que entra no quadro", texto: "Uma tela inteira ou só a janela de um programa. A janela costuma render um vídeo mais limpo, porque não mostra sua barra de tarefas nem o resto da área de trabalho." },
  { n: "2", titulo: "Decida o áudio antes de começar", texto: "Microfone, som do sistema, os dois ou nenhum. Trocar isso depois significa gravar de novo." },
  { n: "3", titulo: "Grave sem se preocupar com o acabamento", texto: "Não force movimento de mouse para \"mostrar\" as coisas, e não pare quando errar: corte depois. Clique onde você clicaria normalmente — é desses cliques que saem os zooms." },
  { n: "4", titulo: "No editor, revise o que ele sugeriu", texto: "As aproximações automáticas chegam prontas na linha do tempo. Apague a que atrapalha, mova a que ficou fora de hora e acelere os trechos de espera." },
  { n: "5", titulo: "Monte a moldura e exporte", texto: "Fundo, cantos, sombra e proporção conforme o lugar onde o vídeo vai ser publicado. MP4 para vídeo, GIF para post curto e documentação." },
];

export default function GravacaoPage() {
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
          <Video className="h-4 w-4" />
          33 mil estrelas no GitHub
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Sua gravação de tela não está feia.{" "}
          <span style={{ color: ACCENT }}>Está sem acabamento</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          O que separa a sua captura do vídeo bonito que você vê por aí é zoom na hora certa,
          cursor suave e uma moldura em volta. O Recordly faz isso dentro do próprio gravador,
          é aberto e não cobra nada.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O acabamento que ele aplica</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACABAMENTO.map((a) => (
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
          Tudo acontece na sua máquina, no mesmo programa em que você gravou. Não há upload da
          gravação para lugar nenhum, nem exportar para editar em outro lugar.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Antes de baixar, confira sua máquina</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {SISTEMAS.map((s) => (
            <article key={s.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <s.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {s.nome}
              </h3>
              <p className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>
                {s.req}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{s.nota}</p>
            </article>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[#777]">
          Se o seu sistema for mais antigo que isso, o programa até abre, mas a captura perde
          recurso. Vale conferir agora, e não depois de baixar quase 200 MB.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="gravacao-page"
          accent={ACCENT}
          buttonTextColor="#0b1e35"
          title="Receba o acesso ao programa"
          description="Preencha seus dados para liberar o download e o passo a passo de gravação."
          contentNote="Você vai liberar: o repositório oficial, a página de download para Mac, Windows e Linux, e as cinco etapas de uma gravação que já sai pronta."
          buttonLabel="Liberar o acesso"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como gravar para já sair pronto</h2>
            {PASSOS.map((p) => (
              <article
                key={p.n}
                className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold"
                  style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                >
                  {p.n}
                </span>
                <div>
                  <h3 className="font-semibold">{p.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
                </div>
              </article>
            ))}
          </section>

          <a
            href={RELEASES}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#0b1e35", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Baixar o programa
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-4 text-center text-xs text-[#777]">
            Mac com chip Apple ou Intel, Windows e Linux na mesma página. Baixe o arquivo do seu
            sistema.
          </p>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border px-6 py-4 font-semibold transition-colors hover:bg-[#1a1a1d]"
            style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
          >
            Ver o código no GitHub
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
          <p className="-mt-4 text-center text-xs text-[#777]">
            github.com/webadderallorg/recordly · AGPL 3.0 · conferido em 14 de outubro de 2026
          </p>
        </div>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Gravou. E agora, quem edita?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          O Recordly resolve o acabamento da própria tela. Quando o vídeo tem fala, corte e ritmo
          para montar, existe um prompt de direção de edição pronto em{" "}
          <a
            href="/xquads/editordevideosia"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/editordevideosia
          </a>
          . Um grava, o outro monta.
        </p>
      </section>

      <SalesCta utmContent="gravacao" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
