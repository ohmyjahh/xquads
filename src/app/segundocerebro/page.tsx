"use client";

import { useEffect, useState } from "react";
import {
  BookMarked,
  BrainCircuit,
  Check,
  Copy,
  FolderTree,
  Lightbulb,
  RefreshCw,
  Save,
  Sparkles,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#A855F7";

const PROMPT = `Criei uma pasta-cofre no Obsidian chamada SEGUNDO CÉREBRO e quero
que ela funcione como memória de longo prazo para tudo que eu faço
em qualquer projeto via Codex ou Claude Code, sem eu nunca precisar
pedir para ler ou registrar nada. Isso precisa ser 100% automático,
em dois momentos:

1. ANTES DE QUALQUER TAREFA NOVA (leitura automática)
Antes de começar a executar qualquer atividade em qualquer projeto,
você precisa:
- Ler os índices do cofre primeiro (não o cofre inteiro, para não
  estourar contexto)
- Identificar temas, decisões, padrões ou stacks já usados que sejam
  relacionados àquela tarefa, mesmo que tenham sido registrados em
  outro projeto
- Aplicar esse contexto na execução, sem eu precisar explicar de novo
  algo que já expliquei antes
- Se encontrar uma preferência ou decisão conflitante com o que estou
  pedindo agora, me avisar antes de executar, não simplesmente
  sobrescrever silenciosamente

2. DEPOIS DE QUALQUER ENTREGA (registro automático)
Ao final de qualquer execução, você precisa registrar
automaticamente, sem eu pedir:
- Padrões técnicos ou de código que funcionaram (ou que eu rejeitei
  e por quê)
- Decisões tomadas e o raciocínio por trás delas
- Preferências minhas (estilo, ferramentas, forma de trabalhar),
  inclusive atualizando um registro antigo se eu mudar de ideia sobre
  algo
- Projetos e o status/contexto de cada um
- Stack técnica usada em cada projeto
- Aprendizados gerais que podem valer para outros projetos futuros

3. ESTRUTURA DO COFRE
Organize com pastas e cores para cada categoria acima (padrões,
decisões, preferências, projetos, stack, aprendizados), com um índice
mestre que linka tudo, e índices por projeto. Evite duplicar
informação: se algo já existe, atualize em vez de criar nota nova.
Use links internos do Obsidian para conectar temas relacionados entre
projetos diferentes.

4. REGRA INEGOCIÁVEL
Eu nunca vou pedir para você consultar o segundo cérebro ou para
registrar algo nele. Isso é comportamento padrão, automático, em toda
tarefa, sem exceção.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#A855F7]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function SegundoCerebroPage() {
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
          <BrainCircuit className="h-3.5 w-3.5" />
          Memória de longo prazo pra IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Dê ao Claude e ao Codex um{" "}
          <span style={{ color: ACCENT }}>segundo cérebro</span> que nunca esquece
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Um prompt que transforma uma pasta do Obsidian numa memória automática:
          a IA lê o seu contexto antes de cada tarefa e registra tudo que aprendeu
          depois, sozinha. Você para de repetir as mesmas coisas em todo projeto.
        </p>
      </div>

      {/* O problema */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>A IA esquece tudo a cada conversa</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            O Claude Code e o Codex são geniais, mas têm amnésia. Toda conversa
            nova começa do zero: você explica de novo o seu estilo, a stack do
            projeto, as decisões que já tinha tomado, o que você odeia e o que já
            deu errado. É retrabalho puro, e a IA volta a cometer erros que você já
            tinha corrigido semana passada.
          </p>
          <p>
            Esse prompt resolve isso de vez. Ele instala uma rotina fixa: antes de
            qualquer tarefa a IA lê a memória, e depois de qualquer entrega ela
            registra o que aprendeu. Tudo guardado no Obsidian, conectado entre
            projetos. Quanto mais você usa, mais ela te conhece.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="space-y-4">
        <SectionTitle icon={RefreshCw}>Como funciona o ciclo</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: BookMarked,
              title: "Lê antes",
              text: "Antes de cada tarefa, a IA consulta os índices do cofre e traz o contexto relacionado, mesmo que tenha vindo de outro projeto.",
            },
            {
              icon: Save,
              title: "Registra depois",
              text: "No fim de cada entrega, ela grava sozinha os padrões, decisões, preferências, stack e aprendizados, sem você pedir.",
            },
            {
              icon: FolderTree,
              title: "Organiza sozinha",
              text: "Tudo em pastas por categoria, com índice mestre e links internos do Obsidian, atualizando o que já existe em vez de duplicar.",
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

      {/* O que precisa */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>O que você precisa</SectionTitle>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            <span className="font-semibold text-white">O Obsidian instalado.</span>{" "}
            Crie uma pasta (um vault ou uma pasta dentro dele) chamada SEGUNDO
            CÉREBRO. É onde a memória vai viver.
          </p>
          <p>
            <span className="font-semibold text-white">Claude Code ou Codex com acesso a essa pasta.</span>{" "}
            O agente precisa conseguir ler e escrever arquivos na pasta do Obsidian,
            seja porque ela está dentro do projeto ou por um conector de arquivos.
          </p>
          <p>
            <span className="font-semibold text-white">Colar o prompt uma vez.</span>{" "}
            Rode o prompt no início e, de preferência, salve essas instruções num
            arquivo de regras do agente (por exemplo um CLAUDE.md), pra valer em
            toda conversa sem você colar de novo.
          </p>
        </div>
      </section>

      {/* Gate + prompt */}
      {!unlocked ? (
        <LeadGate
          source="segundocerebro-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o prompt do segundo cérebro"
          description="Insira seus dados para desbloquear o prompt completo que transforma o Obsidian na memória automática da sua IA."
          contentNote="Você vai liberar: o prompt master pronto pra copiar, que faz o Claude Code ou o Codex ler o seu contexto antes de cada tarefa e registrar tudo depois, de forma automática."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <BrainCircuit className="h-4 w-4" />
            Prompt liberado. Cole no seu agente e salve nas regras dele.
          </div>
          <SectionTitle icon={BrainCircuit}>O prompt do segundo cérebro</SectionTitle>
          <p className="text-[15px] text-[#aaa] leading-relaxed">
            Copie e cole no Claude Code ou no Codex, com a pasta do Obsidian
            acessível. Pra ficar automático de verdade, guarde essas instruções no
            arquivo de regras do seu agente, assim ela vale em toda tarefa sem você
            precisar pedir.
          </p>
          <PromptBlock code={PROMPT} copyLabel="Copiar prompt" />
        </section>
      )}

      {/* CTA */}
      <SalesCta utmContent="segundocerebro" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
