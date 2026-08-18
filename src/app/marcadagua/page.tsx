"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Copy,
  ExternalLink,
  Eye,
  FileSearch,
  Github,
  Globe,
  Scale,
  Sparkles,
  Stamp,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#3B82F6";
const REPO = "https://github.com/guillaumemeyer/watermarks-remover";

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

export default function MarcaDaguaPage() {
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
          <Stamp className="h-3.5 w-3.5" />
          Novidade no mundo da IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Agora o Claude assina tudo que escreve com uma{" "}
          <span style={{ color: ACCENT }}>marca d&apos;água invisível</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          A Anthropic passou a marcar todo texto gerado pelo Claude com um sinal
          invisível a olho nu, que viaja junto quando você copia o texto. Aqui está
          o que é, como funciona e o que já surgiu em torno disso, direto ao ponto.
        </p>
      </div>

      {/* O que aconteceu */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>O que a Anthropic anunciou</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Em agosto de 2026, a Anthropic passou a embutir uma marca d&apos;água
            invisível em todo texto gerado pelos modelos do Claude lançados a partir
            de 2 de agosto. Não é um selo visível nem um aviso: é um padrão
            estatístico escondido dentro da própria escrita. A medida vale no mundo
            todo, não só na Europa.
          </p>
          <p>
            O gatilho é o Artigo 50 do EU AI Act, que passou a valer em 2 de agosto
            de 2026 e exige que sistemas de IA generativa marquem os seus resultados
            de forma legível por máquina, texto incluído. A Anthropic entra na mesma
            linha que OpenAI e Google já vinham seguindo.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="space-y-4">
        <SectionTitle icon={Eye}>Como funciona a marca d&apos;água</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: FileSearch,
              title: "Escondida na escrita",
              text: "Ela enviesa de leve a escolha de palavras do Claude. Num texto suficientemente longo, esse padrão fica detectável por quem tem a chave de leitura.",
            },
            {
              icon: Copy,
              title: "Viaja com o texto",
              text: "Se você copia e cola o texto em outro lugar, o sinal vai junto. Não é metadado no arquivo, está na própria redação.",
            },
            {
              icon: Globe,
              title: "Em quase todo lugar",
              text: "Vale na API, no claude.ai, no Claude Code, no Cowork e no Claude acessado via AWS, Google Cloud e Microsoft Foundry.",
            },
            {
              icon: Scale,
              title: "Indica processamento",
              text: "Segundo a Anthropic, a marca sinaliza que o texto passou pelo Claude, ou seja, indica processamento, não autoria.",
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
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          <p className="text-sm text-[#999] leading-relaxed">
            A própria Anthropic aponta os limites do método: o sinal pode se perder
            quando o texto é muito editado, parafraseado, traduzido ou misturado com
            outra escrita, e textos curtos podem não ter conteúdo suficiente pra
            carregar a marca de forma confiável.
          </p>
        </div>
      </section>

      {/* A ferramenta */}
      <section className="space-y-4">
        <SectionTitle icon={Github}>O repositório da ferramenta no GitHub</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Assim que a novidade saiu, apareceram projetos open source em torno do
            tema. Um dos mais comentados é o{" "}
            <span className="text-white font-medium">Watermarks Remover</span>,
            criado por Guillaume Meyer e publicado no GitHub, que se propõe a
            reescrever os padrões de texto associados à marca. O projeto é aberto,
            então dá pra ver o código e a documentação por conta própria no botão
            abaixo.
          </p>
        </div>
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: ACCENT,
            boxShadow: `0 10px 30px -8px ${ACCENT}80`,
          }}
        >
          <Github className="h-5 w-5 shrink-0" />
          Acessar o repositório no GitHub
          <ExternalLink className="h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="text-center text-xs text-[#666]">
          Abre em nova aba, em github.com/guillaumemeyer/watermarks-remover
        </p>
      </section>

      {/* Gate + fatos */}
      {!unlocked ? (
        <LeadGate
          source="marcadagua-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o resumo completo"
          description="Insira seus dados para desbloquear o resumo dos pontos-chave dessa novidade, em fatos diretos."
          contentNote="Você vai liberar: os pontos-chave da marca d'água do Claude reunidos, do que ela indica ao seu comportamento e ao contexto regulatório, em fatos objetivos."
          buttonLabel="Liberar o resumo"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Resumo liberado.
          </div>

          <section className="space-y-4">
            <SectionTitle icon={Scale}>Os pontos-chave, em fatos</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  title: "O que a marca indica",
                  text: "Que o texto foi processado por um modelo do Claude. Segundo a Anthropic, ela aponta origem, não autoria nem intenção de quem publicou.",
                },
                {
                  title: "Quando entrou em vigor",
                  text: "Nos modelos do Claude lançados a partir de 2 de agosto de 2026, aplicada globalmente, junto com o início da vigência do Artigo 50 do EU AI Act.",
                },
                {
                  title: "Como ela se comporta",
                  text: "Fica no padrão de escolha de palavras e viaja com o texto copiado. A Anthropic afirma que o sinal pode enfraquecer com edição pesada, paráfrase, tradução ou textos curtos.",
                },
                {
                  title: "O contexto regulatório",
                  text: "Marcação de conteúdo de IA legível por máquina é o que o EU AI Act passou a exigir. Setores como o acadêmico e o jurídico também vêm criando as próprias regras sobre declarar o uso de IA.",
                },
                {
                  title: "Sobre detecção em geral",
                  text: "Detectores de IA erram nos dois sentidos, com falso positivo em texto humano e falso negativo em texto de máquina. A marca d'água é mais um sinal técnico nesse cenário.",
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
            <p className="text-[13px] text-[#777] leading-relaxed">
              Tema novo e ainda em movimento: o anúncio é de agosto de 2026 e as
              regras podem evoluir. Para decisões que dependam disso, confira sempre
              as fontes oficiais da Anthropic e do EU AI Act.
            </p>
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="marcadagua" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
