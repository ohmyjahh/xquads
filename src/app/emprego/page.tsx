"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Briefcase,
  ScanSearch,
  FileText,
  Bot,
  Send,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { SalesCta } from "@/components/sales-cta";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";

const ACCENT = "#10B981";

const PROMPT_CARGOS = `Atue como um recrutador sênior. Com base no meu currículo (em anexo), liste os 20 cargos para os quais sou mais qualificado e as palavras-chave exatas que os sistemas ATS procuram em cada um.

Para cada cargo, mostre:
- Nome do cargo
- Por que sou um bom encaixe (1 linha)
- 8 a 10 palavras-chave que o ATS busca`;

const PROMPT_CURRICULO = `Reescreva meu currículo em um modelo mestre que eu possa adaptar instantaneamente para qualquer vaga.

Use a fórmula XYZ do Google ("Realizei X, medido por Y, fazendo Z") em todas as conquistas.

Remova todos os sinais de alerta (red flags) que um gerente de contratação detecta em menos de 10 segundos: lacunas não explicadas, descrições genéricas, verbos fracos e excesso de texto.

Entregue um currículo de 1 página, escaneável, com espaços marcados onde eu devo encaixar as palavras-chave de cada vaga.`;

const PROMPT_AGENTE = `Ative o modo agente.

Vá ao LinkedIn e ao Indeed e encontre todas as vagas correspondentes a esses cargos, postadas nos últimos 7 dias.

Crie uma planilha com, para cada vaga:
- Link da vaga
- Pontuação de compatibilidade (0 a 100) com o meu perfil
- Uma versão do meu currículo personalizada para aquela descrição específica

Ordene da maior para a menor compatibilidade.`;

const PROMPT_CANDIDATURA = `Candidate-se às vagas com maior pontuação de compatibilidade da planilha.

Personalize cada candidatura com base na descrição do cargo: ajuste o currículo às palavras-chave da vaga e escreva uma mensagem de apresentação curta e específica para cada uma.

Registre na planilha o status de cada candidatura (enviada, pendente, erro) para eu acompanhar.`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-[0.2em]"
      style={{ color: ACCENT }}
    >
      {children}
    </p>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md text-white text-xs font-medium px-3 py-1.5 transition-opacity hover:opacity-90 cursor-pointer"
        style={{ backgroundColor: ACCENT }}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar
          </>
        )}
      </button>
      <pre className="text-[13px] text-[#ccc] whitespace-pre-wrap font-mono leading-relaxed pt-8 sm:pt-0 sm:pr-24">
        {code}
      </pre>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-[#10B981]/5 border border-[#10B981]/15 p-4">
      <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
      <p className="text-sm text-[#bbb] leading-relaxed">{children}</p>
    </div>
  );
}

export default function EmpregoPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (hasCapturedLead()) setUnlocked(true);
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    setJustUnlocked(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* ============ HEADER ============ */}
      <div className="text-center space-y-3">
        <div
          className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 px-4 py-1.5 text-xs font-medium"
          style={{ color: ACCENT }}
        >
          <Briefcase className="h-3.5 w-3.5" />
          IA aplicada a carreira
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          A IA se candidatou a{" "}
          <span style={{ color: ACCENT }}>500 empregos</span> por mim
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          12 entrevistas em 24 horas. Esta é a sequência exata de comandos que
          transforma a IA em um assistente de candidaturas que trabalha
          enquanto você dorme.
        </p>
      </div>

      {/* ============ GANCHO (livre) ============ */}
      <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
        <p>
          O que acontece quando você pede para a IA se candidatar a 500 empregos
          por você? Eu testei: <strong className="text-white">12 entrevistas em
          24 horas</strong>. O segredo não é um prompt mágico, é uma sequência.
          Primeiro a IA descobre para quais cargos você é mais qualificado,
          depois reescreve seu currículo para passar pelos filtros automáticos,
          aí entra no modo agente, varre LinkedIn e Indeed atrás das vagas e,
          por fim, se candidata em massa personalizando cada uma. Abaixo estão
          os 4 comandos, na ordem, para você copiar e colar.
        </p>
      </div>

      {/* ============ GATE ============ */}
      {!unlocked ? (
        <LeadGate
          source="emprego-page"
          accent={ACCENT}
          title="Receba os 4 comandos completos"
          description="Insira seus dados para desbloquear a sequência exata de prompts que faz a IA se candidatar às vagas por você."
          contentNote="Conteúdo: prompt de cargos + ATS, currículo modelo mestre (fórmula XYZ), comando do modo agente e candidatura automatizada."
          buttonLabel="Desbloquear os comandos"
          onUnlock={handleUnlock}
        />
      ) : (
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 text-center space-y-2">
          <Eyebrow>Acesso liberado</Eyebrow>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {justUnlocked ? "Acesso liberado!" : "Receba os 4 comandos"}
          </h2>
          <p className="text-sm font-semibold text-[#3BA856]">
            Desbloqueado. Tudo está abaixo 👇
          </p>
        </div>
      )}

      {/* ============ CONTEÚDO DESBLOQUEADO ============ */}
      {unlocked && (
        <>
          <div className="space-y-4">
            <Eyebrow>Como usar</Eyebrow>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              A sequência completa, passo a passo
            </h2>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Faça tudo no mesmo chat, na ordem abaixo. Comece subindo o seu
              currículo (PDF) na conversa e então cole o primeiro comando. Cada
              passo usa o resultado do anterior.
            </p>
          </div>

          {/* Passo 1 */}
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="rounded-md bg-[#10B981]/10 text-xs font-mono font-bold px-2 py-1"
                style={{ color: ACCENT }}
              >
                01
              </span>
              <div className="flex items-center gap-2">
                <ScanSearch className="h-4 w-4" style={{ color: ACCENT }} />
                <h3 className="font-bold text-white">
                  Descubra seus cargos e as palavras-chave do ATS
                </h3>
              </div>
            </div>
            <p className="text-sm text-[#999] leading-relaxed">
              Suba seu currículo em PDF na conversa e cole o comando. A IA assume
              o papel de recrutador sênior e revela os 20 cargos onde você tem
              mais chance, junto das palavras exatas que os robôs de triagem
              (ATS) procuram.
            </p>
            <CodeBlock code={PROMPT_CARGOS} />
          </div>

          {/* Passo 2 */}
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="rounded-md bg-[#10B981]/10 text-xs font-mono font-bold px-2 py-1"
                style={{ color: ACCENT }}
              >
                02
              </span>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" style={{ color: ACCENT }} />
                <h3 className="font-bold text-white">
                  Reescreva o currículo em um modelo mestre
                </h3>
              </div>
            </div>
            <p className="text-sm text-[#999] leading-relaxed">
              No mesmo chat, peça a reescrita. A IA aplica a fórmula XYZ do Google
              em cada conquista e remove os sinais de alerta que fazem um
              recrutador descartar o currículo em menos de 10 segundos.
            </p>
            <CodeBlock code={PROMPT_CURRICULO} />
          </div>

          {/* CTA do meio */}
          <SalesCta
            utmContent="emprego-meio"
            eyebrow="Antes de continuar"
            headline="Antes de continuar, você precisa saber disso..."
            description="Usar IA para conseguir emprego é só a ponta do iceberg. As mesmas ferramentas que se candidatam por você podem criar projetos, sistemas e automações que você vende para empresas. É uma nova fonte de renda, e quem domina isso primeiro larga na frente. Clica aqui pra conhecer."
            buttonLabel="Quero conhecer"
          />

          {/* Passo 3 */}
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="rounded-md bg-[#10B981]/10 text-xs font-mono font-bold px-2 py-1"
                style={{ color: ACCENT }}
              >
                03
              </span>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" style={{ color: ACCENT }} />
                <h3 className="font-bold text-white">
                  Ative o modo agente e encontre as vagas
                </h3>
              </div>
            </div>
            <p className="text-sm text-[#999] leading-relaxed">
              Aqui está o truque: clique no sinal de mais, ative o modo agente e
              mande a IA varrer LinkedIn e Indeed. Ela monta uma planilha com o
              link de cada vaga, a pontuação de compatibilidade e um currículo
              personalizado para cada uma.
            </p>
            <CodeBlock code={PROMPT_AGENTE} />
          </div>

          {/* Passo 4 */}
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="rounded-md bg-[#10B981]/10 text-xs font-mono font-bold px-2 py-1"
                style={{ color: ACCENT }}
              >
                04
              </span>
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" style={{ color: ACCENT }} />
                <h3 className="font-bold text-white">
                  Candidate-se em massa, personalizando cada uma
                </h3>
              </div>
            </div>
            <p className="text-sm text-[#999] leading-relaxed">
              A parte mais impressionante: a IA sai e se candidata às vagas com
              maior compatibilidade, adaptando cada candidatura à descrição do
              cargo. Ela trabalha enquanto você faz outra coisa.
            </p>
            <CodeBlock code={PROMPT_CANDIDATURA} />
          </div>

          {/* Avisos */}
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[#FBBF24]" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Antes de disparar tudo
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-[#999]">
              <li className="flex items-start gap-2">
                <span className="text-[#FBBF24] shrink-0">•</span>
                <span>
                  <strong className="text-[#ccc]">Comece com poucas vagas.</strong>{" "}
                  Rode o passo 4 com 5 a 10 candidaturas primeiro, revise o que a
                  IA enviou e só então aumente o volume.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FBBF24] shrink-0">•</span>
                <span>
                  <strong className="text-[#ccc]">O modo agente é do ChatGPT.</strong>{" "}
                  Os passos 1 e 2 funcionam em qualquer IA; a navegação
                  automática (passos 3 e 4) exige uma ferramenta com modo agente
                  ativo.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FBBF24] shrink-0">•</span>
                <span>
                  <strong className="text-[#ccc]">Confira antes de enviar.</strong>{" "}
                  Peça para a IA listar as candidaturas para sua aprovação antes
                  de submeter, evitando aplicar em vagas que não fazem sentido.
                </span>
              </li>
            </ul>
          </div>

          <Tip>
            O pulo do gato está no passo 1: quanto mais específicas as
            palavras-chave que a IA extrair do ATS, mais alto seu currículo
            ranqueia na triagem automática. Não pule essa etapa para ir direto
            às candidaturas.
          </Tip>
        </>
      )}

      {/* ============ CTA FINAL ============ */}
      <SalesCta utmContent="emprego" />

      {/* ============ FOOTER ============ */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
