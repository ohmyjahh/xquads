"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Download,
  FileText,
  Globe,
  Instagram,
  ListVideo,
  Mic,
  Package,
  Sparkles,
  Terminal,
  Wand2,
  Workflow,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D1FF02";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const PROMPT_1 = `Quero que voce entre no Instagram e busque pelos perfis que eu
indicar.

Perfis: [COLOQUE AQUI OS @ DOS PERFIS]

Em cada perfil, va na aba de Reels e selecione todos os videos que
passaram de 40.000 visualizacoes. Monte uma lista unica com todos
os links, um embaixo do outro.

Regras: inclua apenas Reels acima de 40.000 views. Nao invente; se
nao conseguir confirmar as visualizacoes de um Reel, deixe ele de
fora. Entregue so a lista de links, pronta pro proximo passo.`;

const PROMPT_2 = `Agora quero que voce assista cada um dos videos da lista e faca a
transcricao do roteiro de cada um.

Transcreva a narracao falada palavra por palavra, exatamente como e
dita. Nao resuma, nao corrija a linguagem e nao adicione nada.
Preserve o jeito oral e informal da fala.

Junte tudo num arquivo unico, com todas as transcricoes uma embaixo
da outra, identificando de qual video e cada uma:

---
VIDEO [n] | [link]
[transcricao fiel, do inicio ao fim]
---

Se algum video nao tiver como transcrever, marque como "sem
transcricao" e siga para o proximo.`;

const PROMPT_3 = `Agora analise em profundidade todos os roteiros transcritos e
construa um framework de roteiros virais a partir deles.

PARTE 1 - DIAGNOSTICO. Compare todos os roteiros e me mostre os
padroes que se repetem entre os que mais viralizaram:
- Tipos de hook usados na abertura, e quais deram mais views
- A estrutura do roteiro do inicio ao fim (as partes, na ordem)
- Tamanho medio: numero de palavras e de caracteres
- Temas e angulos mais recorrentes
- Estilo de escrita e de fala: pessoa, tom e tipo de frase
- Formato e frequencia dos CTAs: o que pedem e como pedem
- Palavras, frases e formulas que mais se repetem

PARTE 2 - FRAMEWORK. Com base no diagnostico, monte um framework
claro e reutilizavel: a estrutura bloco a bloco, o que cada bloco
precisa ter, os limites de tamanho e um checklist de viralizacao.

PARTE 3 - GERADOR. Crie um prompt pronto que eu possa reutilizar:
eu coloco apenas um tema, ou anexo prints de uma novidade, e ele
gera um roteiro viral novo seguindo o framework que voce desenhou,
no mesmo fluxo, formato e estilo dos que viralizaram.

Nao invente dados: baseie o framework somente no que aparece nas
transcricoes.`;

const PROMPT_4 = `Agora transforme esse framework numa skill reutilizavel, para eu
instalar e usar sempre que quiser criar um roteiro.

Empacote tudo que voce montou (o diagnostico, a estrutura bloco a
bloco, o checklist e o gerador) em dois formatos:

1. Para o Claude Code: um arquivo SKILL.md com um cabecalho no topo
   (name, description e quando usar) seguido das instrucoes que o
   modelo deve seguir pra gerar o roteiro. Se a referencia detalhada
   ficar grande, separe num segundo arquivo (reference.md).

2. Para o Claude Web ou ChatGPT: um bloco de instrucoes pronto pra
   colar nas instrucoes de um Project, ou no inicio de uma conversa,
   que faca a IA gerar o roteiro no padrao a partir de um tema ou de
   prints.

Em ambos, deixe claro: como usar, o que entra (um tema ou prints) e
o que sai (o roteiro pronto no formato do framework).`;

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
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

function PromptBlock({ code, copyLabel }: { code: string; copyLabel: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <CopyButton text={code} label={copyLabel} />
      </div>
      <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4 overflow-x-auto">
        <pre className="text-[13px] text-[#ccc] font-mono leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
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

function SkillCard({
  icon: Icon,
  tag,
  title,
  text,
  href,
  fileLabel,
}: {
  icon: React.ElementType;
  tag: string;
  title: string;
  text: string;
  href: string;
  fileLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-[#2a2a2e] bg-[#161618] p-5 sm:p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${ACCENT}1A` }}
        >
          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
        </div>
        <div className="space-y-0.5">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: ACCENT }}
          >
            {tag}
          </p>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-[#999] leading-relaxed">{text}</p>
      <a
        href={href}
        download
        className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold px-4 py-2.5 transition-opacity hover:opacity-90 cursor-pointer"
        style={{ backgroundColor: ACCENT, color: "#121214" }}
      >
        <Download className="h-4 w-4" />
        {fileLabel}
      </a>
    </div>
  );
}

export default function FrameworkViralPage() {
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
          <Sparkles className="h-3.5 w-3.5" />
          Engenharia reversa de virais
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Transforme os Reels que{" "}
          <span style={{ color: ACCENT }}>já viralizaram</span> em um framework
          de roteiros seus
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Um método de quatro prompts para a IA analisar os Reels de maior
          desempenho de qualquer perfil, transcrever tudo, montar um framework e
          virar uma skill: você digita um tema, ela escreve o roteiro no mesmo
          padrão que já provou funcionar.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Workflow}>
          Viral não é sorte, é padrão repetível
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Todo perfil que vive de conteúdo tem um punhado de Reels que estouram
            e um monte que passa batido. A diferença quase nunca é o tema, é a
            estrutura: o jeito que o hook abre, a ordem do passo a passo, o
            momento da prova, o CTA no fim. Esse padrão está escondido nos vídeos
            que já deram certo, esperando alguém ler nas entrelinhas.
          </p>
          <p>
            É exatamente isso que a IA faz bem. Você aponta os perfis de
            referência, ela reúne os Reels de maior desempenho, transcreve os
            roteiros e faz a engenharia reversa do que se repete entre os que
            viralizaram. No fim, você não fica com uma pilha de transcrições, fica
            com um framework: um molde que gera roteiro novo sobre qualquer tema,
            no mesmo formato que já funciona.
          </p>
        </div>
      </section>

      {/* O metodo */}
      <section className="space-y-4">
        <SectionTitle icon={ListVideo}>O método em quatro prompts</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              icon: Instagram,
              title: "Reunir os virais",
              text: "A IA busca nos perfis de referência os Reels que passaram de 40 mil views e monta a lista de links. Esse é o seu material bruto, só o que já provou desempenho.",
            },
            {
              n: "2",
              icon: Mic,
              title: "Transcrever tudo",
              text: "Cada Reel vira texto num arquivo único. É aqui que os roteiros ficam lado a lado, prontos pra serem comparados.",
            },
            {
              n: "3",
              icon: Wand2,
              title: "Montar o framework",
              text: "A IA analisa hook, tamanho, temas, formato, estilo e CTA de todos e destila num framework que gera roteiro novo a partir de um tema ou de prints.",
            },
            {
              n: "4",
              icon: Package,
              title: "Virar skill",
              text: "O framework pronto é empacotado como uma skill reutilizável, pra Claude Code ou Claude Web. A partir daí é só passar um tema ou prints e ela cospe o roteiro no padrão.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {step.n}
              </div>
              <div className="space-y-1.5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <step.icon className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {step.title}
                </p>
                <p className="text-sm text-[#999] leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline tecnico */}
      <section className="space-y-4">
        <SectionTitle icon={Terminal}>
          Como a IA transcreve de verdade
        </SectionTitle>
        <p className="text-[15px] text-[#aaa] leading-relaxed">
          Vale saber o caminho real, porque nenhuma IA assiste um Reel sozinha por
          mágica. Por baixo, o processo de cada vídeo é sempre o mesmo: baixar o
          Reel, extrair o áudio e rodar a transcrição. Três ferramentas gratuitas
          resolvem tudo, e rodam na sua própria máquina.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "yt-dlp",
              text: "Baixa o vídeo do Reel a partir do link. É o baixador que faltava na ponta.",
            },
            {
              title: "ffmpeg",
              text: "Extrai o áudio do vídeo baixado, deixando pronto pra transcrição.",
            },
            {
              title: "whisper",
              text: "Transcreve o áudio em texto. Roda local, funciona offline e sem custo de API.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
            >
              <p className="text-sm font-mono font-semibold" style={{ color: ACCENT }}>
                {item.title}
              </p>
              <p className="text-sm text-[#888] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">O pulo do gato</p>
          <p className="text-sm text-[#999] leading-relaxed">
            Antes de processar a lista inteira, valide a pipeline com 1 Reel só:
            baixar, extrair o áudio e transcrever. Se o primeiro sair certo, é só
            repetir pra todos. Testar com um antes economiza horas de retrabalho.
          </p>
        </div>
      </section>

      {/* Gate + conteudo */}
      {!unlocked ? (
        <LeadGate
          source="frameworkviral-page"
          accent={ACCENT}
          buttonTextColor="#121214"
          title="Libere o método e a skill pronta"
          description="Insira seus dados para desbloquear os quatro prompts e baixar a skill roteiro-viral pronta, nas versões Claude Code e Claude Web."
          contentNote="Você vai liberar: os quatro prompts do método e o download da skill roteiro-viral (framework RG-1, engenharia reversa de 55 Reels) nas versões Claude Code e Claude Web."
          buttonLabel="Liberar o framework"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Liberado. Use os prompts ou baixe a skill pronta logo abaixo.
          </div>

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={Instagram}>Prompt 1: reunir os virais</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Troque o campo pelos @ dos perfis de referência. Funciona melhor com
              perfis do seu nicho, porque o padrão que viralizou pra eles tende a
              viralizar pra você.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={Mic}>Prompt 2: transcrever tudo</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com a lista em mãos, peça a transcrição de todos num arquivo único.
              Se a IA não conseguir assistir os vídeos direto, use o caminho
              técnico de cima (yt-dlp, ffmpeg e whisper) e cole as transcrições
              prontas de volta no chat.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={Wand2}>Prompt 3: montar o framework</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Aqui a mágica acontece. A IA lê tudo que se repete entre os virais e
              transforma num framework reutilizável. A partir daí, você só joga um
              tema ou uns prints e ela escreve o roteiro no mesmo padrão.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>

          {/* Prompt 4 */}
          <section className="space-y-4">
            <SectionTitle icon={Package}>
              Prompt 4: transformar em skill
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Para fechar, peça pra IA empacotar o framework como uma skill
              reutilizável, em dois formatos: um SKILL.md pro Claude Code e um
              bloco de instruções pro Claude Web. Assim você para de refazer o
              processo e passa a só chamar a skill com um tema.
            </p>
            <PromptBlock code={PROMPT_4} copyLabel="Copiar prompt 4" />
          </section>

          {/* Skill pronta */}
          <section className="space-y-4">
            <SectionTitle icon={Download}>
              Ou pule direto pra skill pronta
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              O prompt 4 gera a sua própria skill. Se você não quiser fazer todo o
              processo, eu já fiz: a skill roteiro-viral é o framework RG-1,
              construído pela engenharia reversa de 55 Reels de IA com mais de 40
              mil views cada. Baixe na versão que você usa, ela gera o roteiro a
              partir de um tema ou de prints.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <SkillCard
                icon={Terminal}
                tag="Claude Code"
                title="Skill instalável"
                text="Descompacte e coloque a pasta em ~/.claude/skills/. O Claude Code passa a gerar roteiros no padrão sozinho. Inclui SKILL.md, o framework completo e o passo a passo de instalação."
                href={`${BASE}/downloads/roteiro-viral-claude-code.zip`}
                fileLabel="Baixar .zip (Claude Code)"
              />
              <SkillCard
                icon={Globe}
                tag="Claude Web"
                title="Instruções de Project"
                text="Sem instalar nada. Cole as instruções num Project do claude.ai (ou no chat) e mande o tema. Serve também pra ChatGPT. Inclui o arquivo de instruções e o como usar."
                href={`${BASE}/downloads/roteiro-viral-claude-web.zip`}
                fileLabel="Baixar .zip (Claude Web)"
              />
            </div>
            <div className="flex items-start gap-2 text-[13px] text-[#777] leading-relaxed">
              <FileText className="h-4 w-4 shrink-0 mt-0.5" />
              As duas versões seguem o mesmo framework. A de Claude Code roda
              automática dentro do terminal; a de Claude Web você cola e usa no
              navegador.
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="frameworkviral" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
