"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  FileCode,
  FileDown,
  Globe,
  Layers,
  Linkedin,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#0A66C2";

const PROMPT_1 = `Abra o seu navegador local e entre no LinkedIn. Confirme que a
minha conta esta logada, porque nos proximos passos voce vai
navegar por perfis e analisar publicacoes.`;

const PROMPT_2 = `Agora faca uma busca no LinkedIn e encontre os 10 perfis mais
relevantes do mundo sobre inteligencia artificial.

Priorize perfis com grande audiencia e alto engajamento, que
publicam com consistencia sobre IA. Monte uma lista com, para
cada perfil:
- Nome e o link do perfil
- Numero aproximado de seguidores
- Em uma linha, sobre o que ele fala

Nao invente perfis nem numeros: use so o que voce conseguir
confirmar no LinkedIn.`;

const PROMPT_3 = `Faca uma analise detalhada do perfil de cada um desses 10 usuarios,
olhando as publicacoes recentes de cada um. Para cada perfil,
avalie:
- Estilo de comunicacao e tom de voz
- Formato dos posts (texto, carrossel, video, imagem)
- Profundidade do conteudo
- Frequencia de publicacao
- Posicionamento (a tese que ele defende)
- Tamanho medio dos textos e estrutura do gancho

Com base em tudo que se repete entre eles, crie um blueprint com
todos os pilares e caracteristicas de um LinkedIn forte, que traga
muito resultado. Entregue como um arquivo .md organizado por
secoes.`;

const PROMPT_4 = `Agora transforme esse blueprint em uma skill que sera usada para
criar as minhas publicacoes do LinkedIn.

A skill deve:
- Separar as publicacoes por categorias (com o objetivo e a
  estrutura de cada uma)
- Definir um workflow de funcionamento, do tema ao post pronto
  (posicionamento, escolha da categoria, gancho, rascunho, refino,
  entrega)
- Guardar o meu posicionamento como fonte de verdade, pra manter
  todos os posts consistentes

Entregue no formato de skill: um SKILL.md com o cabecalho (nome,
descricao e quando usar) e as instrucoes, mais os arquivos de
referencia que fizerem sentido.`;

const PROMPT_5 = `Agora crie um arquivo que eu possa baixar para usar essa mesma
skill no Claude Web.

Consolide tudo (as instrucoes da skill, as categorias, o blueprint
e o meu posicionamento) e adapte pra colar nas instrucoes de um
Project do claude.ai, ou no inicio de uma conversa. Deixe um passo
a passo curto de como usar la, e me entregue o arquivo pronto pra
baixar.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#0A66C2]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function LinkedinPage() {
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
            border: `1px solid ${ACCENT}55`,
          }}
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn com IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Faça a IA copiar os{" "}
          <span style={{ color: ACCENT }}>10 maiores perfis de IA</span> e virar a
          sua fábrica de posts
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Um método de cinco prompts: o Claude entra no LinkedIn, encontra as
          maiores referências mundiais em IA, faz engenharia reversa do que elas
          fazem e transforma isso numa skill que escreve os seus posts no mesmo
          padrão. No fim, você tem uma fábrica de conteúdo com a sua cara.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>
          Pare de começar do zero toda vez que for postar
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Quem cresce no LinkedIn não escreve por inspiração. Tem um padrão por
            trás: um jeito de abrir o post, uma estrutura que segura a leitura, uma
            tese que se repete, uma rotação entre tipos de conteúdo. Esse padrão
            está à vista nos perfis que já viralizam, só que ninguém para pra ler
            nas entrelinhas e transformar em método.
          </p>
          <p>
            É isso que os cinco prompts abaixo fazem. Você aponta o Claude pros
            maiores perfis de IA do mundo, ele disseca cada um, monta um blueprint
            do que funciona e vira uma skill que gera post novo sobre qualquer
            tema, no mesmo formato. E o quinto prompt ainda te entrega uma versão
            pra usar no Claude Web.
          </p>
        </div>
      </section>

      {/* O metodo */}
      <section className="space-y-4">
        <SectionTitle icon={Workflow}>O método em cinco prompts</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              icon: Linkedin,
              title: "Entrar no LinkedIn",
              text: "O Claude abre o navegador e entra no LinkedIn com a sua conta, pronto pra navegar e analisar perfis.",
            },
            {
              n: "2",
              icon: Search,
              title: "Achar as referências",
              text: "Ele busca e lista os 10 maiores perfis de IA do mundo, os que têm audiência e engajamento de verdade.",
            },
            {
              n: "3",
              icon: FileCode,
              title: "Montar o blueprint",
              text: "Analisa estilo, formato, profundidade, frequência e posicionamento de cada um e destila num blueprint .md dos pilares de um LinkedIn forte.",
            },
            {
              n: "4",
              icon: Layers,
              title: "Virar skill",
              text: "Transforma o blueprint numa skill com categorias de post e um workflow do tema ao post pronto, guardando o seu posicionamento.",
            },
            {
              n: "5",
              icon: Globe,
              title: "Levar pro Claude Web",
              text: "Gera um arquivo com a skill consolidada pra você usar também no navegador, num Project do claude.ai.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
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
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">O que você precisa</p>
          <p className="text-sm text-[#999] leading-relaxed">
            O Claude com o conector do navegador ligado (pros dois primeiros
            prompts, que entram no LinkedIn) e a sua conta do LinkedIn logada. Rode
            um prompt de cada vez, na mesma conversa, pra IA ir construindo em cima
            do passo anterior.
          </p>
        </div>
      </section>

      {/* Gate + prompts */}
      {!unlocked ? (
        <LeadGate
          source="linkedin-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere os cinco prompts"
          description="Insira seus dados para desbloquear a sequência exata que faz o Claude virar a sua fábrica de posts de LinkedIn."
          contentNote="Você vai liberar: os cinco prompts prontos, do que entra no LinkedIn ao que gera a sua skill de posts pro Claude Web, mais o passo a passo de como executar."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Prompts liberados. Rode um de cada vez, na mesma conversa.
          </div>

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={Linkedin}>Prompt 1: entrar no LinkedIn</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com o conector do navegador ligado, cole o prompt. O Claude abre o
              LinkedIn e se prepara pra analisar os perfis. Mantenha essa conversa
              aberta: os próximos quatro prompts vão no mesmo fio.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>Prompt 2: achar as referências</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Peça a lista dos 10 maiores perfis de IA. A regra de não inventar
              perfil nem número importa: confira os links antes de seguir.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={FileCode}>Prompt 3: montar o blueprint</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Agora a engenharia reversa. O Claude disseca cada perfil e destila os
              padrões num blueprint .md. Esse arquivo é a base de tudo que vem
              depois.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>

          {/* Prompt 4 */}
          <section className="space-y-4">
            <SectionTitle icon={Layers}>Prompt 4: virar skill</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              O blueprint vira uma skill de verdade: categorias de post e um
              workflow do tema ao post pronto. É aqui que ela passa a escrever com a
              sua cara, guardando o seu posicionamento como fonte de verdade.
            </p>
            <PromptBlock code={PROMPT_4} copyLabel="Copiar prompt 4" />
          </section>

          {/* Prompt 5 */}
          <section className="space-y-4">
            <SectionTitle icon={Globe}>Prompt 5: levar pro Claude Web</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Para fechar, peça o arquivo pra usar a skill no navegador. O Claude
              consolida tudo e te entrega pronto pra baixar e colar num Project do
              claude.ai.
            </p>
            <PromptBlock code={PROMPT_5} copyLabel="Copiar prompt 5" />
          </section>

          {/* nota final */}
          <div className="flex items-start gap-2 text-[13px] text-[#777] leading-relaxed">
            <FileDown className="h-4 w-4 shrink-0 mt-0.5" />
            O arquivo da sua skill é gerado pelo próprio prompt 5, dentro do Claude,
            com a análise dos perfis que você escolheu. Não tem download aqui: a
            skill sai personalizada pra você.
          </div>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="linkedin" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
