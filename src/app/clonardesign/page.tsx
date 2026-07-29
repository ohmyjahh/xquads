"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Plug,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#7D2AE8";

const PROMPT_1 = `Recrie a imagem em anexo de forma identica, como uma copia
fiel. Mantenha exatamente, sem alterar nada:

- A composicao, o enquadramento e as proporcoes
- Todas as cores, gradientes e texturas
- Cada texto com a mesma fonte, peso, tamanho e cor
- Os elementos 3D, com as mesmas formas e volumes
- As sombras, a iluminacao e os reflexos
- A posicao exata de cada elemento e a hierarquia visual

Nao adicione, nao remova, nao troque e nao redesenhe nada. O
resultado tem que ser indistinguivel do original.`;

const PROMPT_2 = `@canva transforme esta arte em um design totalmente editavel no
Canva.

Separe cada elemento em uma camada propria e independente:
- Cada texto como texto editavel, mantendo fonte, cor e tamanho
- Cada imagem, forma, icone e ilustracao como objeto separado
- O fundo como uma camada a parte

O objetivo e que eu consiga selecionar e alterar qualquer
elemento de forma isolada, sem afetar os outros. Preserve o
layout, as cores e as fontes originais.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#7D2AE8]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function ClonarDesignPage() {
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
          <Wand2 className="h-3.5 w-3.5" />
          Design com IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Clone{" "}
          <span style={{ color: ACCENT }}>qualquer design</span> e abra ele
          editável no Canva
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Viu uma arte, um post ou um criativo que você gostou? Tira um print, o
          ChatGPT recria idêntico e manda direto pro Canva com cada elemento
          separado, pronto pra você trocar o texto, a cor e o que quiser. Dois
          prompts e um design que era de outra pessoa vira seu.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Pare de criar do zero</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Referência boa não falta: todo dia você esbarra num criativo que
            converte, num post bem diagramado, numa capa que chama atenção. O
            problema sempre foi transformar aquilo em algo editável. Refazer na mão
            leva horas e quase nunca fica igual.
          </p>
          <p>
            Com esse método, você pula essa parte. O ChatGPT recria a arte pixel a
            pixel a partir do print e, com o Canva conectado, entrega o arquivo com
            os elementos soltos, cada texto e cada forma numa camada. Aí é só
            adaptar pra sua marca e usar. Referência vira template em minutos.
          </p>
        </div>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>Como funciona</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              icon: Upload,
              title: "Anexe o design que quer clonar",
              text: "Um print nítido da arte, do criativo ou do post que você quer replicar. Quanto melhor a imagem, mais fiel fica a cópia.",
            },
            {
              n: "2",
              icon: ImageIcon,
              title: "O ChatGPT recria idêntico",
              text: "Com o primeiro prompt, ele reconstrói a imagem exatamente igual: cores, textos, fontes, elementos 3D e iluminação.",
            },
            {
              n: "3",
              icon: Plug,
              title: "Conecte o Canva no ChatGPT",
              text: "Ative o app do Canva dentro do ChatGPT. Depois é só chamar com @canva na hora de mandar a arte pra lá.",
            },
            {
              n: "4",
              icon: Layers,
              title: "Vira design editável",
              text: "Com o segundo prompt, o Canva abre a arte com cada elemento em camada separada, pronta pra você editar o que quiser.",
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
            Uma conta no ChatGPT que gere imagem e o app do Canva conectado a ela.
            Use o método com referências pra se inspirar e criar a sua própria
            versão, não pra copiar a marca registrada de alguém.
          </p>
        </div>
      </section>

      {/* Gate + prompts */}
      {!unlocked ? (
        <LeadGate
          source="clonardesign-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere os dois prompts"
          description="Insira seus dados para desbloquear o prompt que recria o design e o que abre ele editável no Canva."
          contentNote="Você vai liberar: o prompt de recriação fiel da arte, o passo de conectar o Canva no ChatGPT e o prompt que transforma tudo em um design editável."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Prompts liberados. Use os dois na mesma conversa, na ordem.
          </div>

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={ImageIcon}>Prompt 1: recriar o design</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Abra uma conversa nova no ChatGPT, anexe o print do design e cole o
              prompt. Ele vai recriar a arte idêntica. Se algum detalhe sair
              diferente, peça pra ajustar aquele ponto específico.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Passo do Canva */}
          <section className="space-y-4">
            <SectionTitle icon={Plug}>Antes do prompt 2: conecte o Canva</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Pra mandar a arte pro Canva, o ChatGPT precisa do app do Canva
              conectado. Faça isso uma vez e fica valendo.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Adicione o app do Canva no ChatGPT",
                  text: "Nas opções do ChatGPT, procure por apps ou conectores e ative o Canva. Faça login na sua conta do Canva quando ele pedir.",
                },
                {
                  title: "Ative com @canva",
                  text: "Na mesma conversa, comece a mensagem escrevendo @canva. É assim que o ChatGPT sabe que vai usar o Canva naquele comando.",
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

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={Layers}>Prompt 2: abrir editável no Canva</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com o Canva conectado, na mesma conversa, cole o prompt abaixo. Ele
              manda a arte pro Canva com cada elemento separado. A partir daí é só
              editar o que quiser direto por lá.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="clonardesign" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
