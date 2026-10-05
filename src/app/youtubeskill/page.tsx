"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Youtube, Upload, Gauge, Terminal, Mic } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FF0000";
const REPO = "https://github.com/Jakeschincariol/youtube-agent-skill";

const COMANDOS: [string, string][] = [
  ["/yt-script", "Uma ideia vira roteiro. Cinco ganchos tirados de 21 fórmulas, pontuados, e o texto falado com os pontos de retenção marcados."],
  ["/yt-package", "Título e thumbnail avaliados como um par só, checando corte de texto, repetição e vagueza."],
  ["/yt-edit", "A transcrição vira lista de decisões de edição: silêncio morto, vícios de fala e repetições, com tempo marcado."],
  ["/yt-comment", "Os comentários separados em quatro pilhas, com respostas na sua voz. Diz qual fixar."],
  ["/yt-plan", "Uma semana que cabe nas horas que você tem. Um vídeo âncora, um barato e três Shorts."],
  ["/yt-viral", "O que está funcionando no seu nicho, ordenado pelo múltiplo sobre a mediana do próprio canal, não pelo tamanho dele."],
  ["/yt-retention", "Seu relatório de retenção lido a sério: onde vazou o gancho, onde despencou e o que mudar."],
  ["/yt-shorts", "Os Shorts que já existem dentro de um vídeo longo, cada um com primeira linha nova."],
  ["/yt-seo", "A descrição, as tags que valem a pena e as três buscas que esse vídeo deveria ganhar."],
  ["/yt-chapters", "Capítulos a partir da transcrição, validados contra as regras do YouTube para renderizarem de verdade."],
  ["/yt-audit", "O canal inteiro analisado, terminando em UMA correção em vez de vinte."],
];

const FATOS = [
  {
    icone: Upload,
    titulo: "Ele escreve, você publica",
    texto: "Nada sobe no seu canal sozinho. O autor diz que daria para publicar via API do YouTube, mas não construiu assim de propósito: cada skill termina num bloco que você copia e numa pergunta, publica ou muda?",
  },
  {
    icone: Gauge,
    titulo: "A nota do gancho é palpite calibrado, não previsão",
    texto: "O pontuador foi ajustado contra 74 ganchos reais de vídeos curtos. O próprio autor chama de heurística. Serve para comparar duas versões suas, não para prever view.",
  },
  {
    icone: Terminal,
    titulo: "Sem Claude Code você perde metade",
    texto: "Seis das skills vêm com ferramentas em Python puro, e são elas que fazem o trabalho pesado. Dá para colar o arquivo da skill num chat comum e funciona reduzido.",
  },
];

export default function YoutubeSkillPage() {
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
          PRÉVIA LOCAL · conteúdo aberto. Em produção, os comandos ficam protegidos.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Youtube className="h-4 w-4" />
          11 skills, grátis e open source
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Um time de <span style={{ color: ACCENT }}>11 agentes</span> para cuidar do seu canal no
          YouTube
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Do roteiro com gancho pontuado até a leitura do relatório de retenção, que diz o segundo
          exato em que as pessoas foram embora e o que você estava falando ali.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">youtube-agent-skill</h2>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
          >
            519 estrelas
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">MIT</span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">
            sem cadastro
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#999]">
          Não pede chave de API, não conecta em conta nenhuma e não cobra. Seis das onze skills vêm
          com ferramentas em Python 3 puro, sem dependência nenhuma para instalar.
        </p>
        <p className="mt-3 text-xs text-[#666]">
          Repositório publicado em 16 de setembro de 2026 e conferido em 5 de outubro de 2026. Até a
          checagem, não houve atualização desde o lançamento.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que esperar, sem exagero</h2>
        {FATOS.map((f) => (
          <article
            key={f.titulo}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <f.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
            <div className="min-w-0">
              <h3 className="font-semibold">{f.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{f.texto}</p>
            </div>
          </article>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="youtubeskill-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Receba os 11 comandos e o repositório"
          description="Preencha seus dados para liberar a lista completa, o link do projeto e as três formas de instalar."
          contentNote="Você vai liberar: os 11 comandos com o que cada um faz, o repositório oficial e o passo que o autor diz ser o mais importante de todos."
          buttonLabel="Liberar os comandos"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Os onze comandos</h2>
            <div className="space-y-2">
              {COMANDOS.map(([cmd, oque]) => (
                <article
                  key={cmd}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
                >
                  <code className="text-sm font-semibold" style={{ color: ACCENT }}>
                    {cmd}
                  </code>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{oque}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="rounded-xl border p-5"
            style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
          >
            <h2 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
              <Mic className="h-4 w-4" />
              Gaste dez minutos no voice.md antes de qualquer coisa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
              É o arquivo onde você descreve como você fala. Todas as onze skills leem ele, e é o que
              separa um roteiro que parece seu de um roteiro genérico. Se tiver preguiça de escrever,
              mande três vídeos seus para o Claude e peça para ele montar o arquivo a partir deles.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#ffffff", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o repositório
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-6 text-center text-xs text-[#777]">
            github.com/Jakeschincariol/youtube-agent-skill · instruções de instalação no README
          </p>
        </div>
      )}

      <SalesCta utmContent="youtubeskill" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
