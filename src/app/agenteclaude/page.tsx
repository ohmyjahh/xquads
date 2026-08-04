"use client";

import { useEffect, useState } from "react";
import {
  Captions,
  Check,
  Copy,
  FileSpreadsheet,
  FileStack,
  FileText,
  FolderPlus,
  IdCard,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  ListChecks,
  Presentation,
  Repeat,
  Sparkles,
  Workflow,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D97757";

const TEMPLATE = `IDENTIDADE

Voce e o [NOME DO AGENTE], o especialista em [FUNCAO / SETOR] da
[NOME DA EMPRESA].

- Como voce atua: [ex: analitico e direto / criativo e informal]
- Como gosta de ser chamado: [NOME / apelido]
- Personalidade e tom de voz: [3 a 5 adjetivos]
- O que voce NUNCA faz: [limites e regras do agente]

Sua unica funcao e [descreva a atividade que ele domina]. Voce
usa como base os arquivos de memoria deste projeto e nunca inventa
informacao que nao esteja neles. Se faltar algum dado, pergunte.

WORKFLOW

Sempre que eu te acionar, siga este fluxo:

1. Antes de comecar, me pergunte: [o que voce precisa saber de mim
   pra fazer o trabalho, ex: qual o tema, qual o cliente, qual o
   prazo]
2. Consulte os arquivos de memoria relevantes pra tarefa
3. Execute a atividade seguindo este passo a passo: [passo 1, passo
   2, passo 3...]
4. Antes de entregar, confira: [o que voce valida pra garantir a
   qualidade]
5. Me entregue no formato: [ex: texto pronto, lista, tabela,
   documento] e me diga o que ficou pendente da minha decisao.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#D97757]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function AgenteClaudePage() {
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
          <Layers className="h-3.5 w-3.5" />
          Agentes no Claude
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Crie{" "}
          <span style={{ color: ACCENT }}>agentes treinados</span> no Claude pra
          cada função da sua empresa
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Dá pra montar dentro do Claude um agente especialista em cada setor:
          copywriter, atendimento, comercial, o que você precisar. Você treina uma
          vez, com contexto, identidade e workflow, e depois é só chamar. Cria
          quantos quiser, um pra cada atividade.
        </p>
      </div>

      {/* O que muda */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>De um chat genérico a um time de especialistas</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Usar o Claude no modo cru é como ter um funcionário genial que chega
            todo dia sem memória: você precisa explicar tudo de novo a cada
            conversa. Ele é inteligente, mas não conhece a sua empresa, o seu
            produto nem o seu jeito de trabalhar.
          </p>
          <p>
            Um agente treinado resolve isso. Dentro de um Projeto do Claude, você dá
            a ele a memória da empresa, uma identidade e um jeito fixo de trabalhar.
            A partir daí, ele vira um especialista naquela função, que já sabe o
            contexto e entrega no padrão. E você pode ter vários, um pra cada tarefa.
          </p>
        </div>
      </section>

      {/* Os 3 pilares */}
      <section className="space-y-4">
        <SectionTitle icon={Layers}>Os 3 pilares de um agente</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: FileStack,
              title: "Contexto",
              text: "A memória do agente: o que é a empresa, o que vende, quem é o público e como executar cada atividade. Vai nos arquivos do Projeto.",
            },
            {
              icon: IdCard,
              title: "Identidade",
              text: "Quem é o agente: como atua, como quer ser chamado, a personalidade e o tom. Vai nas instruções do Projeto.",
            },
            {
              icon: Workflow,
              title: "Workflow",
              text: "Como ele trabalha: o que pergunta antes, o passo a passo, o que recebe e o que entrega. Também nas instruções.",
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

      {/* Gate + conteudo */}
      {!unlocked ? (
        <LeadGate
          source="agenteclaude-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o passo a passo completo"
          description="Insira seus dados para desbloquear o passo a passo de como montar o agente, o template de instruções e a lista de arquivos de memória."
          contentNote="Você vai liberar: o passo a passo dentro do Claude, o template pronto de identidade e workflow pra colar nas instruções, e o checklist dos arquivos de memória que o agente precisa."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Liberado. Abra o Claude e siga o passo a passo pra montar o seu agente.
          </div>

          {/* Passo a passo */}
          <section className="space-y-4">
            <SectionTitle icon={FolderPlus}>Como montar o agente, passo a passo</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  n: "1",
                  title: "Crie um Projeto no Claude",
                  text: "No Claude, clique no menu Projetos e crie um novo. Dê a ele o nome do seu agente (ex: Copywriter da [empresa], Atendente da [empresa]).",
                },
                {
                  n: "2",
                  title: "Suba os arquivos de memória (Contexto)",
                  text: "Na área de arquivos do projeto, suba tudo que o agente precisa saber: o que é a empresa, o que vende, os serviços, o público-alvo, as atividades dele e como executar cada uma.",
                },
                {
                  n: "3",
                  title: "Escreva a Identidade nas instruções",
                  text: "No campo de instruções do projeto, defina quem é o agente: como ele atua, como quer ser chamado, a personalidade e o tom de voz.",
                },
                {
                  n: "4",
                  title: "Adicione o Workflow nas instruções",
                  text: "Ainda nas instruções, descreva como ele trabalha: o que precisa te perguntar antes, o passo a passo de atuação, o que recebe de você e o que entrega no fim.",
                },
                {
                  n: "5",
                  title: "Teste e replique",
                  text: "Converse com o agente, veja se ele responde no padrão e ajuste os arquivos ou as instruções se precisar. Depois é só criar outro Projeto pra cada nova função.",
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
          </section>

          {/* Template */}
          <section className="space-y-4">
            <SectionTitle icon={IdCard}>Template de instruções (identidade + workflow)</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Este é o esqueleto pronto pra colar no campo de instruções do Projeto.
              Preencha os campos entre colchetes com a realidade do seu agente e da
              sua empresa.
            </p>
            <PromptBlock code={TEMPLATE} copyLabel="Copiar template" />
          </section>

          {/* Checklist de arquivos */}
          <section className="space-y-4">
            <SectionTitle icon={ListChecks}>Os arquivos de memória que você precisa</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              O agente é tão bom quanto a memória que você dá pra ele. Suba estes
              arquivos no Projeto (podem ser documentos separados ou um só, bem
              organizado):
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "A empresa",
                  text: "O que é o negócio, a missão, o posicionamento e o que diferencia vocês da concorrência.",
                },
                {
                  title: "Produtos e serviços",
                  text: "O que vocês vendem, com preços, condições e os detalhes que o agente precisa dominar.",
                },
                {
                  title: "Público-alvo",
                  text: "Quem é o cliente, as dores, os desejos e a linguagem que fala com ele.",
                },
                {
                  title: "As atividades do agente",
                  text: "A lista do que ele é responsável e, pra cada tarefa, o passo a passo de como executar do jeito certo.",
                },
                {
                  title: "Exemplos e padrões",
                  text: "Modelos do que dá certo: textos, respostas, formatos aprovados que servem de referência de qualidade.",
                },
                {
                  title: "Regras e limites",
                  text: "O que ele pode e o que nunca deve fazer, tom proibido, informações sensíveis a proteger.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-[#999] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Formatos de arquivo */}
          <section className="space-y-4">
            <SectionTitle icon={FileStack}>Formatos que valem a pena subir</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              O Claude lê vários tipos de arquivo. Não precisa transformar tudo em
              texto puro: aproveite o material que a sua empresa já tem, em qualquer
              um destes formatos.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: FileText,
                  title: "Documentos (PDF, DOCX, TXT, MD)",
                  text: "Manuais, propostas, contratos, políticas internas, apostilas. A base de conhecimento mais direta do agente.",
                },
                {
                  icon: FileSpreadsheet,
                  title: "Planilhas (CSV, XLSX)",
                  text: "Tabela de preços, catálogo de produtos, lista de serviços, dados de clientes. Tudo que é estruturado em linhas e colunas.",
                },
                {
                  icon: Captions,
                  title: "Transcrições",
                  text: "Reuniões, aulas, calls de vendas e podcasts transcritos em texto. É o que ensina o agente a falar do seu jeito. Áudio e vídeo você transcreve antes de subir.",
                },
                {
                  icon: Presentation,
                  title: "Apresentações",
                  text: "Pitch deck, apresentação institucional, treinamentos em slides. Salve como PDF pra subir.",
                },
                {
                  icon: ImageIcon,
                  title: "Imagens e prints",
                  text: "Identidade visual, exemplos de layout, prints de conversas modelo, tabelas em imagem. O Claude enxerga e usa como referência.",
                },
                {
                  icon: FileText,
                  title: "Exemplos aprovados",
                  text: "Posts, e-mails, roteiros e respostas que já deram certo, salvos em texto. Viram o padrão de qualidade que ele imita.",
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
            <div className="flex items-start gap-2 text-[13px] text-[#777] leading-relaxed">
              <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
              Prefira arquivos organizados e sem lixo: um PDF limpo vale mais que dez
              documentos bagunçados. Nomes claros ajudam o agente a achar a
              informação certa mais rápido.
            </div>
          </section>

          {/* Dica final */}
          <section className="space-y-4">
            <SectionTitle icon={Repeat}>Monte um time inteiro</SectionTitle>
            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 flex items-start gap-3">
              <Lightbulb className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              <p className="text-sm text-[#999] leading-relaxed">
                Um Projeto por função. Faça um agente por vez, do jeito certo, e vá
                somando: um pra copy, um pro atendimento, um pro comercial, um pra
                social. Em pouco tempo você tem um time inteiro de especialistas,
                cada um treinado numa parte do seu negócio.
              </p>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="agenteclaude" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
