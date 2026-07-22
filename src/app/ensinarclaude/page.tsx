"use client";

import { useEffect, useState } from "react";
import {
  Check,
  CircleDot,
  Copy,
  ListChecks,
  Mic,
  MonitorPlay,
  Plus,
  Save,
  ShieldAlert,
  Sparkles,
  TestTube,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D97757";

const ROTEIRO = `Roteiro pra narrar enquanto voce grava (fale em voz alta, na ordem):

1. OBJETIVO
"O objetivo desta tarefa e [descreva o resultado final que voce quer, em uma frase]."

2. ENTRADAS
"Pra fazer isso, eu preciso de [os arquivos, dados ou informacoes que voce usa como ponto de partida]."

3. PASSO A PASSO
Enquanto executa, narre cada acao:
"Primeiro eu abro [x]. Depois eu clico em [y]. Agora eu [z], porque [motivo]."

4. REGRAS DE DECISAO
"Quando acontecer [situacao A], eu faco [acao]. Quando for [situacao B], eu faco [outra acao]."

5. EXCECOES
"Se aparecer [caso especial ou erro], eu [como voce contorna]."

6. VERIFICACAO DE QUALIDADE
"Antes de dar como pronto, eu confiro [o que voce checa pra garantir que ficou certo]."

7. FORMATO E DESTINO FINAL
"O resultado final fica no formato [x] e vai salvo em [onde]."`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#D97757]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function EnsinarClaudePage() {
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
          <MonitorPlay className="h-3.5 w-3.5" />
          Novidade no Claude Cowork
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Grave a sua tela e o Claude{" "}
          <span style={{ color: ACCENT }}>aprende a tarefa sozinho</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          O Claude Cowork agora aprende assistindo você. Você grava a tela fazendo
          uma tarefa, vai explicando em voz alta, e ele transforma isso numa skill
          que repete o processo quando você pedir. Sem escrever prompt, sem
          descrever passo por passo: você só mostra.
        </p>
      </div>

      {/* O que mudou */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>O que acabou de mudar</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Até ontem, ensinar uma tarefa repetitiva pro Claude era um exercício de
            escrever instrução: descrever cada passo, cada regra, cada exceção em
            texto. Funcionava, mas dava trabalho e sempre escapava algum detalhe
            que só existe na sua cabeça enquanto você faz.
          </p>
          <p>
            Agora é o contrário. Você faz a tarefa uma vez com a tela sendo gravada,
            fala o que está fazendo e por quê, e o Claude assiste. Ele capta a tela,
            os cliques e a sua narração e monta sozinho uma skill reutilizável. Da
            próxima vez, é só pedir pra ele rodar aquela skill. É a diferença entre
            escrever um manual e simplesmente mostrar como se faz.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "Você mostra",
              text: "Grava a tela fazendo a tarefa e narra as decisões, em vez de escrever instrução.",
            },
            {
              title: "O Claude aprende",
              text: "Ele capta tela, cliques e voz e transforma a demonstração numa skill estruturada.",
            },
            {
              title: "Repete sozinho",
              text: "Da próxima vez, você pede pra rodar aquela skill e ele refaz o processo.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
            >
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-[#888] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requisitos */}
      <section className="space-y-4">
        <SectionTitle icon={CircleDot}>O que você precisa</SectionTitle>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            <span className="font-semibold text-white">App desktop do Claude.</span>{" "}
            O recurso está no Claude Cowork, no aplicativo de computador. Não
            aparece na versão web nem no celular.
          </p>
          <p>
            <span className="font-semibold text-white">Plano Pro, Max ou Team.</span>{" "}
            O recurso de gravar skill está liberado para esses planos.
          </p>
          <p>
            <span className="font-semibold text-white">Uma tarefa repetitiva na cabeça.</span>{" "}
            Relatório que você monta toda semana, organização de arquivos,
            preenchimento de planilha: qualquer coisa que você repete vale a pena
            virar skill.
          </p>
        </div>
      </section>

      {/* Gate + conteudo */}
      {!unlocked ? (
        <LeadGate
          source="ensinarclaude-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o passo a passo completo"
          description="Insira seus dados para desbloquear o passo a passo de como gravar a skill, o roteiro do que narrar e o checklist de segurança."
          contentNote="Você vai liberar: onde achar o recurso e como gravar, o roteiro pronto do que falar durante a gravação, como testar a skill depois e o checklist do que nunca gravar."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Liberado. Abra o app do Claude no computador e siga o passo a passo.
          </div>

          {/* Passo a passo */}
          <section className="space-y-4">
            <SectionTitle icon={Plus}>Como gravar a sua primeira skill</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  n: "1",
                  title: "Abra o Claude Cowork no desktop",
                  text: "No app de computador, entre no Cowork e comece ou abra uma tarefa. Deixe atualizado, o recurso é novo.",
                },
                {
                  n: "2",
                  title: "Menu + e Record a skill",
                  text: "Clique no menu + e escolha Record a skill. É por ali que a gravação começa.",
                },
                {
                  n: "3",
                  title: "Faça a tarefa narrando",
                  text: "Execute o fluxo normalmente e vá falando em voz alta as escolhas, as regras e as exceções conforme trabalha. O Claude capta a tela, os cliques e a sua voz.",
                },
                {
                  n: "4",
                  title: "Encerre e deixe o Claude montar",
                  text: "Ao terminar, pare a gravação. O Claude transforma a demonstração numa skill estruturada, com os passos que você mostrou.",
                },
                {
                  n: "5",
                  title: "Revise, teste e salve",
                  text: "Confira a skill que ele gerou, ajuste o que precisar e teste antes de usar pra valer. Depois é só pedir pra ele rodar aquela skill quando precisar.",
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

          {/* Roteiro de narracao */}
          <section className="space-y-4">
            <SectionTitle icon={Mic}>O roteiro do que narrar</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              A qualidade da skill depende do que você fala durante a gravação. Uma
              demonstração muda quando você narra o objetivo, as regras e as
              exceções, e não só clica em silêncio. Use este roteiro como guia do
              que dizer, na ordem.
            </p>
            <PromptBlock code={ROTEIRO} copyLabel="Copiar roteiro" />
          </section>

          {/* Testar */}
          <section className="space-y-4">
            <SectionTitle icon={TestTube}>Como testar a skill depois</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Antes de confiar a tarefa pra ela, rode a skill em três situações
              diferentes. Se passar nas três, está pronta.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Um caso normal",
                  text: "Parecido com o que você gravou. Confirma que o básico funciona igual à demonstração.",
                },
                {
                  title: "Um caso difícil",
                  text: "Com informação conflitante ou fora do padrão. Mostra se as regras de decisão que você narrou foram entendidas.",
                },
                {
                  title: "Um caso fora do escopo",
                  text: "Algo que a skill não deveria fazer. O certo é ela recusar ou pedir orientação, não inventar.",
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

          {/* Seguranca */}
          <section
            className="rounded-2xl border p-6 space-y-3"
            style={{ borderColor: "#EF444455", backgroundColor: "#EF44440D" }}
          >
            <h2 className="flex items-center gap-2.5 text-lg font-bold text-white">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
              O que nunca gravar
            </h2>
            <p className="text-sm text-[#bbb] leading-relaxed">
              A gravação capta tudo que está na tela. Antes de começar, prepare o
              ambiente: feche email, chat e gerenciador de senhas, tire da tela
              qualquer token ou chave de API e use dados fictícios no lugar de dados
              reais de cliente. E não grave tarefas irreversíveis, como
              transferência bancária ou apagar arquivos, nem nada que dependa de uma
              senha ou de informação confidencial.
            </p>
          </section>

          {/* Ideias */}
          <section className="space-y-4">
            <SectionTitle icon={ListChecks}>Boas primeiras skills pra gravar</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "O relatório da semana",
                  text: "Aquele relatório que você monta toda segunda, sempre no mesmo formato, puxando dos mesmos lugares.",
                },
                {
                  title: "Organizar arquivos",
                  text: "Renomear, mover e arrumar os arquivos de um projeto seguindo a sua regra de sempre.",
                },
                {
                  title: "Preencher planilha",
                  text: "A rotina de jogar dados numa planilha padrão e aplicar as mesmas fórmulas e formatação.",
                },
                {
                  title: "Responder no padrão",
                  text: "Montar aquela resposta ou documento que segue sempre a mesma estrutura, trocando só os dados.",
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
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="ensinarclaude" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
