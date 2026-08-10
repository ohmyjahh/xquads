"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Check,
  Copy,
  Crosshair,
  DollarSign,
  Image as ImageIcon,
  Lightbulb,
  MapPin,
  Megaphone,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#10A37F";

const CONTEXT_HINTS = `Descreva, em texto livre, quem você quer atingir com base no
que a pessoa está conversando no ChatGPT. Preencha e cole na caixa
de Context Hints do seu grupo de anúncios:

Quero atingir pessoas que estão [SITUAÇÃO OU INTENÇÃO, ex:
pesquisando como criar um site, comparando ferramentas de gestão,
querendo emagrecer, planejando uma viagem].

Elas costumam perguntar coisas como: "[EXEMPLO DE PERGUNTA REAL 1]",
"[EXEMPLO DE PERGUNTA 2]", "[EXEMPLO DE PERGUNTA 3]".

Meu produto/serviço resolve isso porque [O QUE VOCÊ ENTREGA E O
BENEFÍCIO PRINCIPAL].

Público ideal: [PERFIL, ex: pequenos empreendedores, mães, devs
iniciantes, donos de e-commerce].
NÃO quero aparecer para: [QUEM NÃO É SEU PÚBLICO, ex: quem só busca
solução gratuita, concorrentes, estudantes].`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#10A37F]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function GptAdsPage() {
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
          <Megaphone className="h-3.5 w-3.5" />
          Novidade da OpenAI
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Agora dá pra{" "}
          <span style={{ color: ACCENT }}>anunciar dentro do ChatGPT</span>. Veja
          como criar a sua campanha
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          A OpenAI abriu o ChatGPT Ads: uma plataforma self-serve pra colocar o seu
          anúncio na frente de quem está literalmente conversando com a IA sobre o
          que você vende. Quem chegar cedo pega o canal barato e sem concorrência.
        </p>
      </div>

      {/* O que e */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>Anúncio na hora exata da intenção</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            No Google você aparece pra quem digita uma palavra. No ChatGPT Ads você
            aparece pra quem está no meio de uma conversa contando o problema que
            tem, comparando opções e pedindo recomendação. É o momento de maior
            intenção que existe, e o seu anúncio entra ali, no fim da resposta,
            separado do texto da IA.
          </p>
          <p>
            E como é canal novo, ainda tem pouca gente disputando. O mesmo que
            aconteceu no início do Facebook e do Google Ads está acontecendo aqui:
            quem entende e testa primeiro compra atenção barata antes de todo mundo
            perceber.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="space-y-4">
        <SectionTitle icon={Target}>Como funciona, em resumo</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: Crosshair,
              title: "Segmentação por contexto",
              text: "Em vez de palavra-chave, você descreve em texto livre (os Context Hints) quem quer atingir, e a IA cruza com o que a pessoa está conversando.",
            },
            {
              icon: Users,
              title: "Quem vê os anúncios",
              text: "Só usuários dos planos Free e Go do ChatGPT. Quem paga Plus, Pro ou planos de empresa não vê anúncio. Nada para menores de 18.",
            },
            {
              icon: ImageIcon,
              title: "Formato do anúncio",
              text: "Nome da empresa, imagem, título e descrição, no fim da conversa. Tem também o carrossel de produtos, com vários itens num anúncio só.",
            },
            {
              icon: DollarSign,
              title: "Quanto custa",
              text: "Orçamento diário a partir de 25 dólares, ou de campanha a partir de 1 dólar. Você paga por clique, por mil impressões ou por conversão.",
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
          <MapPin className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
          <p className="text-sm text-[#999] leading-relaxed">
            No lançamento, os anúncios rodam em sete países (Estados Unidos, Canadá,
            Reino Unido, Austrália, Nova Zelândia, Japão e Coreia do Sul), com
            segmentação por país, região e área. O Brasil ainda não está na lista,
            mas dá pra já dominar o processo e anunciar pra esses mercados ou
            esperar a chegada por aqui.
          </p>
        </div>
      </section>

      {/* Gate + conteudo */}
      {!unlocked ? (
        <LeadGate
          source="gptads-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o passo a passo completo"
          description="Insira seus dados para desbloquear o passo a passo de como criar a sua campanha no ChatGPT Ads e o template de segmentação por contexto."
          contentNote="Você vai liberar: o passo a passo dentro do OpenAI Ads Manager, o template de Context Hints pronto pra preencher, como medir os resultados e os erros que queimam orçamento."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Liberado. Siga o passo a passo pra montar a sua primeira campanha.
          </div>

          {/* Passo a passo */}
          <section className="space-y-4">
            <SectionTitle icon={Rocket}>Como criar a sua campanha, passo a passo</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  n: "1",
                  title: "Acesse ads.openai.com e crie a conta de anúncios",
                  text: "Entre em ads.openai.com e faça login com a sua conta OpenAI. Preencha os dados da empresa (nome, endereço, registro), o cartão de pagamento e um favicon, que aparece no seu anúncio.",
                },
                {
                  n: "2",
                  title: "Crie a campanha e escolha o objetivo",
                  text: "Dentro do Ads Manager, crie uma nova campanha e defina o objetivo: cliques, impressões ou conversões. É ele que diz pra plataforma o que otimizar.",
                },
                {
                  n: "3",
                  title: "Defina orçamento e lance",
                  text: "Escolha orçamento diário (a partir de 25 dólares) ou de campanha (a partir de 1 dólar) e o tipo de lance: CPC (por clique), CPM (por mil impressões) ou por conversão. Comece baixo pra testar.",
                },
                {
                  n: "4",
                  title: "Escreva os Context Hints (a segmentação)",
                  text: "No grupo de anúncios, na caixa de Context Hints, descreva em texto livre quem você quer atingir e em que tipo de conversa. É o coração do ChatGPT Ads. Use o template abaixo.",
                },
                {
                  n: "5",
                  title: "Adicione a segmentação geográfica",
                  text: "Escolha os países e regiões onde quer aparecer, dentro dos disponíveis. Dá pra incluir e também excluir localidades.",
                },
                {
                  n: "6",
                  title: "Monte o criativo",
                  text: "Direto na plataforma, adicione a imagem, o título, a descrição e a URL de destino. Capriche no título: é o que decide se a pessoa clica ou ignora.",
                },
                {
                  n: "7",
                  title: "Instale o pixel e publique",
                  text: "Coloque o pixel de conversão do ChatGPT no seu site e use UTMs no link pra medir. Publique e acompanhe impressões, cliques, conversões, ROAS e CPC no painel, por campanha, grupo e anúncio.",
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

          {/* Template Context Hints */}
          <section className="space-y-4">
            <SectionTitle icon={Crosshair}>Template de Context Hints</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              A segmentação do ChatGPT Ads é um texto que você escreve, não uma
              lista de palavras-chave. Quanto melhor você descreve a intenção da
              conversa, melhor a IA acha o seu público. Preencha este template e
              cole na caixa de Context Hints.
            </p>
            <PromptBlock code={CONTEXT_HINTS} copyLabel="Copiar template" />
          </section>

          {/* Medir */}
          <section className="space-y-4">
            <SectionTitle icon={BarChart3}>Como medir se está dando certo</SectionTitle>
            <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
              <p>
                <span className="font-semibold text-white">Instale o pixel de conversão</span>{" "}
                do ChatGPT no seu site pra a plataforma saber quando um clique virou
                venda ou cadastro.
              </p>
              <p>
                <span className="font-semibold text-white">Use UTMs</span> no link do
                anúncio pra cruzar os dados com o Google Analytics e a sua própria
                ferramenta.
              </p>
              <p>
                <span className="font-semibold text-white">Acompanhe os números certos:</span>{" "}
                não olhe só cliques. Foque em conversões, ROAS e custo por conversão,
                que é o que diz se o anúncio dá lucro.
              </p>
            </div>
          </section>

          {/* Erros comuns */}
          <section className="space-y-4">
            <SectionTitle icon={Lightbulb}>Erros que queimam orçamento</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  title: "Context Hints genérico",
                  text: "Escrever algo vago como quero vender pra todo mundo faz o anúncio aparecer pra quem não compra. Seja específico na intenção e no perfil.",
                },
                {
                  title: "Começar com orçamento alto",
                  text: "Suba pouco no início, veja o que converte e só então escale. Testar caro é jogar dinheiro fora enquanto você ainda está aprendendo o canal.",
                },
                {
                  title: "Não medir conversão",
                  text: "Sem pixel e sem UTM, você não sabe o que deu lucro e otimiza no escuro. Configure a medição antes de publicar.",
                },
                {
                  title: "Título fraco",
                  text: "O anúncio é pequeno: nome, imagem, título e descrição. Se o título não fisga em uma linha, ninguém clica. Teste várias versões.",
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
              O ChatGPT Ads é bem novo (a OpenAI abriu em julho de 2026) e ainda
              está em expansão, então países, formatos e regras podem mudar.
              Confirme sempre os detalhes atuais dentro do próprio Ads Manager.
            </p>
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="gptads" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
