"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  GraduationCap,
  Image as ImageIcon,
  Lightbulb,
  NotebookPen,
  PenLine,
  Sparkles,
  StickyNote,
  Workflow,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D1FF02";

// Comandos curtos (a pessoa cola direto no ChatGPT)
const CMD_1 = "/gerarimagemescritaamao";
const CMD_2 = "/ensinovisual";
const CMD_3 = "/stickynotes";

// Prompts completos (versao densa, contexto amplo)
const PROMPT_1 = `Crie uma imagem no estilo de anotacoes de caderno feitas a mao sobre o tema: [ESCREVA AQUI O TEMA].

Estilo visual:
- Aparencia de pagina de caderno, com letra manuscrita legivel, como se um bom aluno tivesse resumido a materia a mao
- Um titulo grande no topo, escrito a mao e destacado
- Divida o conteudo em blocos e caixas desenhadas a mao
- Use setas curvas ligando as ideias que se conectam
- Destaque as palavras-chave com marca-texto (amarelo, verde, rosa)
- Coloque pequenos icones e desenhos simples ao lado dos topicos para ajudar a memoria
- Use no maximo 3 cores de caneta alem do preto, para nao poluir

Conteudo:
- Explique o tema de forma clara e resumida, do basico ao mais avancado
- Organize em: o que e, por que importa, como funciona e um exemplo pratico
- Cada topico curto e direto, do jeito que cabe numa anotacao

O objetivo e que essa imagem funcione como um resumo de estudo: a pessoa bate o olho e entende a materia inteira. Capriche na organizacao visual.`;

const PROMPT_2 = `Crie uma imagem no estilo de aula visual desenhada a mao sobre o tema: [ESCREVA AQUI O TEMA].

Junte anotacao manuscrita com recursos visuais de ensino:
- Letra a mao legivel, com titulo grande no topo
- Um diagrama ou fluxograma mostrando como as partes do tema se conectam, com caixas e setas
- Pelo menos um grafico simples desenhado a mao (linha do tempo, piramide, ciclo ou barras) quando fizer sentido para o tema
- Um mapa mental curto ligando o conceito central aos seus ramos
- Marca-texto nas palavras-chave e icones simples ao lado dos topicos
- No maximo 3 cores alem do preto

Conteudo:
- Explique o tema como um professor explicaria no quadro: do conceito geral para os detalhes
- Mostre relacoes de causa e efeito, etapas de um processo ou comparacoes, usando os diagramas
- Termine com um resumo de uma linha do que e mais importante lembrar

O objetivo e ensinar pelo visual: quem olhar a imagem deve entender nao so os conceitos, mas como eles se encaixam. Priorize a clareza dos diagramas.`;

const PROMPT_3 = `Crie uma imagem com varias notas adesivas (post-its) coladas, cada uma com um topico principal sobre o tema: [ESCREVA AQUI O TEMA].

Estilo visual:
- Varios post-its de cores diferentes (amarelo, verde, rosa, azul), levemente tortos e sobrepostos, como num mural de estudo
- Texto manuscrito legivel dentro de cada nota
- Cada post-it traz um unico topico ou conceito, com um titulo curto em destaque e uma explicacao de uma ou duas linhas
- Pequenos icones ou simbolos a mao em alguns post-its
- Um post-it de cor diferente no canto funcionando como resumo ou dica final

Conteudo:
- Quebre a materia nos seus topicos essenciais, um por nota
- Comece pelos conceitos base e va para os mais avancados
- Cada nota deve ser autossuficiente, para a pessoa consultar rapido sem precisar de contexto
- Foque no que realmente cai em prova ou no que e mais usado na pratica

O objetivo e criar um painel de revisao rapida: a pessoa bate o olho nos post-its e relembra os pontos principais da materia.`;

function CopyButton({
  text,
  label,
  variant = "ghost",
}: {
  text: string;
  label: string;
  variant?: "ghost" | "solid";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (variant === "solid") {
    return (
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold px-4 py-2.5 transition-opacity hover:opacity-90 cursor-pointer"
        style={{ backgroundColor: ACCENT, color: "#121214" }}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            {label}
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#D1FF02]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
    >
      {copied ? (
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
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
      <Icon className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
      {children}
    </h2>
  );
}

function PromptCard({
  n,
  icon: Icon,
  title,
  command,
  howto,
  prompt,
}: {
  n: string;
  icon: React.ElementType;
  title: string;
  command: string;
  howto: string;
  prompt: string;
}) {
  return (
    <section className="rounded-2xl border border-[#2a2a2e] bg-[#161618] p-5 sm:p-6 space-y-5">
      <div className="flex items-start gap-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          {n}
        </div>
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-lg font-bold text-white">
            <Icon className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            {title}
          </h3>
          <p className="text-sm text-[#999] leading-relaxed">{howto}</p>
        </div>
      </div>

      {/* Opcao 1: comando curto */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#777]">
          Opção rápida: cole o comando
        </p>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-3">
          <code
            className="text-sm font-mono font-semibold px-1"
            style={{ color: ACCENT }}
          >
            {command}
          </code>
          <div className="ml-auto">
            <CopyButton text={command} label="Copiar comando" variant="solid" />
          </div>
        </div>
        <p className="text-xs text-[#777] leading-relaxed">
          Cole o comando no ChatGPT e, na mesma linha ou na de baixo, escreva o
          tema que você quer estudar.
        </p>
      </div>

      {/* Opcao 2: prompt completo */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#777]">
            Opção completa: prompt detalhado
          </p>
          <CopyButton text={prompt} label="Copiar prompt" />
        </div>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4 overflow-x-auto">
          <pre className="text-[13px] text-[#ccc] font-mono leading-relaxed whitespace-pre-wrap">
            {prompt}
          </pre>
        </div>
      </div>
    </section>
  );
}

export default function EstudoGptPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (hasCapturedLead()) setUnlocked(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{
            color: ACCENT,
            backgroundColor: `${ACCENT}1A`,
            border: `1px solid ${ACCENT}33`,
          }}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          Estudo com IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Transforme qualquer matéria em{" "}
          <span style={{ color: ACCENT }}>anotações visuais</span> com o ChatGPT
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Três prompts prontos que fazem o ChatGPT desenhar a matéria pra você:
          resumo de caderno escrito à mão, aula com diagramas e gráficos, e um
          mural de post-its pra revisão rápida. Você escolhe o tema, a IA
          desenha.
        </p>
      </div>

      {/* Por que estudar com imagem */}
      <section className="space-y-4">
        <SectionTitle icon={BookOpen}>Por que estudar pela imagem funciona</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            O cérebro guarda imagem melhor do que texto corrido. Uma matéria
            organizada em blocos, com setas ligando as ideias e cores separando
            o que importa, gruda de um jeito que a página cheia de parágrafo não
            consegue. É o mesmo motivo pelo qual um bom resumo à mão vale mais
            que reler o capítulo inteiro três vezes.
          </p>
          <p>
            O ChatGPT hoje desenha. Você descreve o tema e ele devolve uma imagem
            que parece anotação de caderno, aula no quadro ou mural de post-its.
            O problema é que quase ninguém sabe pedir isso do jeito certo, e o
            resultado sai genérico. Os três prompts abaixo já vêm com as
            instruções de estilo prontas, pra imagem sair organizada e útil de
            verdade.
          </p>
        </div>
      </section>

      {/* Os tres prompts (previa sem revelar) */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Os três prompts</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: NotebookPen,
              title: "Resumo à mão",
              text: "Vira a matéria numa página de caderno escrita à mão, com setas, caixas e marca-texto nos pontos principais.",
            },
            {
              icon: Workflow,
              title: "Ensino visual",
              text: "Acrescenta gráficos, diagramas e fluxogramas pra você enxergar como as partes do tema se conectam.",
            },
            {
              icon: StickyNote,
              title: "Sticky notes",
              text: "Monta um mural de post-its, um tópico por nota, pra consulta e revisão rápida antes da prova.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2"
            >
              <item.icon className="h-5 w-5" style={{ color: ACCENT }} />
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-[#888] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>Como usar</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              title: "Escolha o prompt",
              text: "Decida se quer o resumo de caderno, a aula com diagramas ou o mural de post-its. Dá pra usar os três sobre o mesmo tema.",
            },
            {
              n: "2",
              title: "Cole no ChatGPT e diga o tema",
              text: "Use o comando curto pra ir direto ao ponto, ou o prompt completo pra um resultado mais rico. Troque o campo do tema pelo assunto que você quer estudar.",
            },
            {
              n: "3",
              title: "Peça ajustes",
              text: "Se a imagem sair confusa ou faltar algo, peça pra reorganizar, aumentar a letra ou destacar outro ponto. A IA refaz na hora.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {step.n}
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-white">{step.title}</p>
                <p className="text-sm text-[#999] leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">O que você precisa</p>
          <p className="text-sm text-[#999] leading-relaxed">
            Uma conta no ChatGPT que gere imagem. Funciona melhor com temas
            específicos: em vez de "biologia", peça "o ciclo de Krebs" ou "as
            fases da mitose". Quanto mais focado o tema, mais organizada a imagem.
          </p>
        </div>
      </section>

      {/* Gate + prompts */}
      {!unlocked ? (
        <LeadGate
          source="estudogpt-page"
          accent={ACCENT}
          buttonTextColor="#121214"
          title="Libere os três prompts de estudo"
          description="Insira seus dados para desbloquear os três prompts prontos, com o comando curto e a versão completa de cada um."
          contentNote="Você vai liberar: o prompt de resumo à mão, o de ensino visual com diagramas e o de sticky notes, cada um com o comando rápido e o prompt detalhado pra copiar."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <ImageIcon className="h-4 w-4" />
            Prompts liberados. Copie e use no ChatGPT.
          </div>

          <PromptCard
            n="1"
            icon={PenLine}
            title="Resumo escrito à mão"
            command={CMD_1}
            howto="Faz o ChatGPT desenhar a matéria como uma anotação de caderno: letra à mão, setas, caixas e marca-texto nos pontos principais."
            prompt={PROMPT_1}
          />

          <PromptCard
            n="2"
            icon={Workflow}
            title="Ensino visual com diagramas"
            command={CMD_2}
            howto="Além da escrita à mão, acrescenta gráficos, diagramas e fluxogramas pra mostrar como as partes do tema se conectam."
            prompt={PROMPT_2}
          />

          <PromptCard
            n="3"
            icon={StickyNote}
            title="Sticky notes de revisão"
            command={CMD_3}
            howto="Monta um mural de post-its, um tópico por nota, pra você consultar e revisar rápido o que é mais importante."
            prompt={PROMPT_3}
          />
        </div>
      )}

      {/* CTA */}
      <SalesCta utmContent="estudogpt" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
