"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarRange,
  Check,
  Copy,
  Download,
  Instagram,
  Lightbulb,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#E1306C";

const PROMPT_1 = `Abra o seu navegador e entre no Instagram. Confirme que a minha
conta está logada, porque nos próximos passos você vai analisar o
meu perfil e o dos meus concorrentes.`;

const PROMPT_2 = `Entre no menu de insights do meu perfil e faça uma análise
completa dele. Levante e organize:
- Número de seguidores e como vem crescendo
- Taxa de engajamento média
- Curtidas, comentários, salvamentos e compartilhamentos
- Os principais horários e dias em que a minha audiência está ativa
- Quais conteúdos que eu postei deram mais engajamento, e o que eles
  têm em comum (formato, tema, gancho, formato de legenda)

Monte um relatório completo com esses dados e, no fim, aponte os
padrões do que funciona pra mim.`;

const PROMPT_3 = `Agora entre no perfil dos meus principais concorrentes e faça uma
análise completa dos conteúdos que deram mais engajamento em cada
um. Para cada perfil, me diga:
- Os posts de melhor desempenho e por que funcionaram
- Formatos, temas e ganchos que se repetem
- Frequência de postagem e horários
- O que eles fazem que eu ainda não faço

Perfis dos concorrentes:
[COLE AQUI OS LINKS OU @ DOS CONCORRENTES]`;

const PROMPT_4 = `Com base em tudo que a gente levantou (a análise do meu perfil e a
análise dos meus concorrentes), crie uma programação de conteúdo
pra mim para os próximos 15 dias.

Considere:
- [QUANTIDADE] posts no feed por semana
- Os stories que eu devo postar por dia

Para cada dia, entregue:
- O formato (reel, carrossel, imagem, story)
- O tema e o ângulo do conteúdo
- Um gancho de abertura pronto
- O melhor horário pra postar, com base nos meus insights

Priorize o que os meus dados e os dos concorrentes mostraram que
mais engaja.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#E1306C]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function ImaDeSeguidoresPage() {
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
          <Instagram className="h-3.5 w-3.5" />
          Crescimento no Instagram
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Transforme o Claude no seu{" "}
          <span style={{ color: ACCENT }}>ímã de seguidores</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          O Claude entra no seu Instagram, lê os seus insights, estuda os seus
          concorrentes e monta uma programação de conteúdo de 15 dias baseada no
          que realmente engaja. Você para de postar no achismo e começa a postar
          com dados.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Pare de postar no escuro</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            A maioria das pessoas posta no feeling: publica o que acha bonito, na
            hora que dá, e torce pra viralizar. Enquanto isso, a resposta de o que
            funciona está escrita nos próprios insights e nos perfis que já crescem
            no seu nicho. O problema é o trabalho de garimpar e cruzar tudo isso.
          </p>
          <p>
            É esse trabalho que o Claude faz. Com o navegador dele, ele entra no seu
            perfil, lê os números, estuda os concorrentes e transforma tudo num
            plano de conteúdo pronto: o que postar, em que formato, com qual gancho
            e a que horas. Você só grava e publica.
          </p>
        </div>
      </section>

      {/* O que precisa */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>O que você precisa</SectionTitle>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            <span className="font-semibold text-white">O app do Claude no computador.</span>{" "}
            O modo que abre o navegador e navega sozinho fica no aplicativo de
            desktop.
          </p>
          <p>
            <span className="font-semibold text-white">Sua conta do Instagram logada.</span>{" "}
            Você entra na sua conta quando o Claude abrir o site. O login é seu e
            manual.
          </p>
          <p>
            <span className="font-semibold text-white">Os perfis dos concorrentes.</span>{" "}
            Separe 2 ou 3 perfis do seu nicho que já crescem, pra usar de referência.
          </p>
        </div>
      </section>

      {/* Gate + conteudo */}
      {!unlocked ? (
        <LeadGate
          source="imadeseguidores-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere a sequência completa"
          description="Insira seus dados para desbloquear os prompts que fazem o Claude analisar o seu Instagram e montar o seu plano de conteúdo."
          contentNote="Você vai liberar: o passo pra ativar o modo navegador do Claude e os quatro prompts, da análise do seu perfil e dos concorrentes até a programação de conteúdo de 15 dias."
          buttonLabel="Liberar a sequência"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Liberado. Faça o setup e depois rode os prompts na ordem, na mesma conversa.
          </div>

          {/* Setup */}
          <section className="space-y-4">
            <SectionTitle icon={Download}>Antes: prepare o Claude</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  n: "1",
                  icon: Download,
                  title: "Baixe o app do Claude",
                  text: "Instale o aplicativo do Claude no seu computador. É nele que fica o modo que navega sozinho.",
                },
                {
                  n: "2",
                  icon: Terminal,
                  title: "Ative o modo code",
                  text: "Dentro do Claude, ative o modo code lá em cima. É o que dá pra ele abrir o navegador e mexer no Instagram por você.",
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

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={Instagram}>Prompt 1: entrar no Instagram</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Cole o prompt e o Claude abre o Instagram. Quando o site abrir, faça
              login na sua conta. Mantenha essa conversa aberta: os próximos prompts
              vão no mesmo fio.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 flex items-start gap-3">
              <Instagram className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              <p className="text-sm text-[#999] leading-relaxed">
                Se a sua conta não estiver logada quando o Instagram abrir, é só
                fazer o login você mesmo, na hora, dentro do navegador do Claude.
                Digite o seu usuário e a senha ali normalmente e siga em frente. O
                login é seu e manual: nunca coloque a sua senha do Instagram dentro
                do prompt.
              </p>
            </div>
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={BarChart3}>Prompt 2: analisar o seu perfil</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Agora peça a análise dos seus insights. O Claude lê os seus números e
              monta o relatório do que já funciona pra você.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>Prompt 3: analisar os concorrentes</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Troque o campo pelos perfis de referência do seu nicho. O Claude
              estuda o que dá certo pra eles e acha o que você ainda não faz.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>

          {/* Prompt 4 */}
          <section className="space-y-4">
            <SectionTitle icon={CalendarRange}>
              Prompt 4: a programação de 15 dias
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Para fechar, peça o plano. Preencha quantos posts você quer por semana
              e o Claude monta o calendário completo, cruzando os seus dados com os
              dos concorrentes.
            </p>
            <PromptBlock code={PROMPT_4} copyLabel="Copiar prompt 4" />
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="imadeseguidores" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
