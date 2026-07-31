"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  FileText,
  Globe,
  ListChecks,
  LogIn,
  Rocket,
  Search,
  ShieldAlert,
  Sparkles,
  UserSearch,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D97757";

const PROMPT_CARGOS = `Atue como um recrutador senior. Com base no meu curriculo
(em anexo), liste os 20 cargos para os quais sou mais qualificado
e as palavras-chave exatas que os sistemas ATS procuram em cada um.

Para cada cargo, mostre:
- Nome do cargo
- Por que sou um bom encaixe (1 linha)
- 8 a 10 palavras-chave que o ATS busca`;

const PROMPT_CURRICULO = `Reescreva meu curriculo em um modelo mestre que eu possa
adaptar instantaneamente para qualquer uma dessas vagas.

Use a formula XYZ do Google ("Realizei X, medido por Y, fazendo Z")
em todas as conquistas. Remova todos os sinais de alerta (red flags)
que um gerente de contratacao ou um sistema ATS encontrariam:
lacunas nao explicadas, descricoes genericas, verbos fracos e
excesso de texto.

Entregue um curriculo de 1 pagina, escaneavel, com espacos marcados
onde eu devo encaixar as palavras-chave de cada vaga.`;

const PROMPT_VAGAS = `Agora, dentro do LinkedIn, encontre todas as vagas que
correspondam aos cargos que voce listou, postadas nos ultimos 7
dias.

Crie uma lista completa com, para cada vaga:
- O link direto da vaga
- Uma pontuacao de compatibilidade de 0 a 100 com o meu perfil
- Uma versao do meu curriculo personalizada para a descricao
  especifica daquela vaga

Ordene da maior para a menor pontuacao de compatibilidade.`;

const PROMPT_CANDIDATURA = `Se candidate nas 500 vagas que mais fazem sentido para mim,
comecando pelas de maior compatibilidade.

Personalize cada candidatura com base na descricao da vaga: ajuste
o curriculo as palavras-chave dela e escreva uma mensagem de
apresentacao curta e especifica. Ao final, me envie um relatorio
completo para eu acompanhar, com o status de cada candidatura
(enviada, pendente ou com erro).`;

const PROMPT_FALLBACK = `Agora, dentro de cada uma das vagas da lista, faca o seguinte,
uma de cada vez:
1. Clique na vaga para abri-la
2. Procure o botao Candidatar-se e clique nele
3. Anexe a versao do meu curriculo personalizada para aquela vaga
4. Preencha o que for necessario e envie a candidatura
5. Registre o status (enviada, pendente ou erro) e passe para a
   proxima vaga

Repita esse processo para as vagas de maior compatibilidade, uma
apos a outra, ate concluir a lista.`;

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

export default function ClaudeLinkedinPage() {
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
          <Rocket className="h-3.5 w-3.5" />
          Emprego com IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Faça o Claude se candidatar a{" "}
          <span style={{ color: ACCENT }}>500 vagas</span> no LinkedIn por você
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          O Claude ajusta o seu currículo, abre o próprio navegador, entra no
          LinkedIn, encontra as vagas que combinam com você e se candidata em
          massa, personalizando cada uma. Você entrega o currículo, ele faz o
          trabalho braçal de procurar e aplicar.
        </p>
      </div>

      {/* A oportunidade */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Enviar currículo virou trabalho de robô</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Procurar emprego hoje é um jogo de volume: pra conseguir umas poucas
            entrevistas, você precisa se candidatar a dezenas ou centenas de vagas,
            adaptando o currículo pra cada uma. É repetitivo, cansativo e é
            justamente o tipo de tarefa que faz a maioria desistir na metade.
          </p>
          <p>
            Esse é o serviço que o Claude assume. Com o navegador dele ligado, ele
            entra no LinkedIn, varre as vagas dos cargos certos, pontua a
            compatibilidade e se candidata por você, ajustando o currículo em cada
            candidatura. Você sai de algumas aplicações por dia pra centenas, sem
            perder a personalização.
          </p>
        </div>
      </section>

      {/* O que precisa */}
      <section className="space-y-4">
        <SectionTitle icon={ListChecks}>O que você precisa</SectionTitle>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            <span className="font-semibold text-white">O Claude com o navegador ligado.</span>{" "}
            Os passos de busca e candidatura usam o conector que dá ao Claude um
            navegador próprio. Sem ele, dá pra fazer os dois primeiros prompts, mas
            não a parte automática.
          </p>
          <p>
            <span className="font-semibold text-white">Seu currículo atual em arquivo.</span>{" "}
            Anexe no começo da conversa. É a base de tudo que vem depois.
          </p>
          <p>
            <span className="font-semibold text-white">Sua conta do LinkedIn.</span>{" "}
            Você loga na sua conta quando o Claude abrir o site. O login é seu e
            manual, o Claude só opera depois que você entrou.
          </p>
        </div>
      </section>

      {/* Gate + conteudo */}
      {!unlocked ? (
        <LeadGate
          source="claudelinkedin-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere a sequência completa"
          description="Insira seus dados para desbloquear os prompts que fazem o Claude buscar e se candidatar às vagas por você."
          contentNote="Você vai liberar: o prompt de cargos + ATS, o de currículo mestre (fórmula XYZ), o passo de abrir o LinkedIn, o de buscar as vagas, o de candidatura em massa e o plano B caso o Claude recuse."
          buttonLabel="Liberar a sequência"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Liberado. Faça na ordem, tudo na mesma conversa, com o currículo anexado.
          </div>

          {/* Passo 1 */}
          <section className="space-y-4">
            <SectionTitle icon={UserSearch}>Passo 1: os cargos e as palavras-chave</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Abra uma conversa nova no Claude, anexe o seu currículo e cole o
              prompt. Ele devolve os 20 cargos mais compatíveis com você e o que os
              sistemas de triagem procuram em cada um.
            </p>
            <PromptBlock code={PROMPT_CARGOS} copyLabel="Copiar prompt 1" />
          </section>

          {/* Passo 2 */}
          <section className="space-y-4">
            <SectionTitle icon={FileText}>Passo 2: o currículo mestre</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Na mesma conversa, peça a reescrita do currículo. Ele monta uma versão
              base, sem os erros que derrubam candidato na primeira triagem, pronta
              pra ser adaptada em cada vaga.
            </p>
            <PromptBlock code={PROMPT_CURRICULO} copyLabel="Copiar prompt 2" />
          </section>

          {/* Passo 3 */}
          <section className="space-y-4">
            <SectionTitle icon={LogIn}>Passo 3: abra o LinkedIn e faça login</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Este passo não é um prompt pra copiar, é uma ação. Peça pro Claude
              abrir o navegador dele e entrar no LinkedIn (por exemplo: "abra o seu
              navegador e entre no LinkedIn"). Quando o site abrir,{" "}
              <span className="text-white font-medium">
                faça login na sua conta você mesmo
              </span>
              . O Claude só continua depois que você já estiver logado.
            </p>
            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 flex items-start gap-3">
              <Globe className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              <p className="text-sm text-[#999] leading-relaxed">
                Precisa do navegador do Claude ligado. O login é sempre seu e
                manual: nunca passe a sua senha do LinkedIn dentro do prompt.
              </p>
            </div>
          </section>

          {/* Passo 4 */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>Passo 4: encontrar as vagas</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com você logado, cole o prompt abaixo. O Claude varre o LinkedIn atrás
              das vagas dos seus cargos e monta a lista com link, compatibilidade e
              um currículo já ajustado pra cada uma.
            </p>
            <PromptBlock code={PROMPT_VAGAS} copyLabel="Copiar prompt 4" />
          </section>

          {/* Passo 5 */}
          <section className="space-y-4">
            <SectionTitle icon={Rocket}>Passo 5: candidatar-se em massa</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Agora a parte que faz a diferença. Cole o prompt e o Claude começa a
              se candidatar pelas vagas de maior compatibilidade, personalizando
              cada uma e montando o relatório de acompanhamento.
            </p>
            <PromptBlock code={PROMPT_CANDIDATURA} copyLabel="Copiar prompt 5" />
          </section>

          {/* Fallback */}
          <section
            className="rounded-2xl border p-6 space-y-4"
            style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0D` }}
          >
            <h2 className="flex items-center gap-2.5 text-lg font-bold text-white">
              <ShieldAlert className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              Se o Claude disser que não pode fazer
            </h2>
            <p className="text-sm text-[#bbb] leading-relaxed">
              Às vezes o Claude trava na candidatura automática em massa. Se isso
              acontecer, não desista: em vez de pedir tudo de uma vez, dê o passo a
              passo manual pra ele repetir vaga por vaga. Cole este prompt no lugar:
            </p>
            <PromptBlock code={PROMPT_FALLBACK} copyLabel="Copiar plano B" />
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="claudelinkedin" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
