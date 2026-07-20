"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Camera,
  Check,
  Clock,
  Copy,
  DollarSign,
  Lightbulb,
  Megaphone,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#10B981";

const PROMPT_1 = `Voce e um especialista em avaliacao e revenda de produtos usados.
Vou te enviar fotos de varios itens que quero vender. Analise cada
item, um por um, e para cada um me entregue:

- O que e: nome, marca e modelo, se der pra identificar pela foto
- Estado de conservacao aparente: novo, seminovo, usado ou com
  marcas de uso
- Valor aproximado do produto novo hoje
- Faixa realista de revenda de usado, considerando o estado
- O preco que voce recomenda anunciar para vender rapido sem deixar
  dinheiro na mesa

Use precos reais do mercado brasileiro como referencia (OLX,
Facebook Marketplace, Mercado Livre). Se nao tiver certeza do
modelo, diga o que precisa pra confirmar em vez de chutar. Organize
a resposta em uma lista, item por item.`;

const PROMPT_2 = `Agora, para cada item que voce avaliou, escreva um anuncio pronto
para publicar no Facebook Marketplace. Para cada anuncio, entregue:

- TITULO: curto e chamativo, com a marca, o modelo e a palavra que
  as pessoas usam pra buscar esse produto
- DESCRICAO: completa e honesta, com o estado de conservacao, o que
  acompanha o item, tempo de uso e o motivo da venda. Tom simpatico
  e confiavel, sem exagero
- PRECO: o valor exato de publicacao
- CATEGORIA e CONDICAO sugeridas para marcar no Marketplace

Deixe cada anuncio separado e pronto para copiar e colar.`;

const PROMPT_3 = `Agora abra o seu proprio navegador e publique esses anuncios no
Facebook Marketplace pra mim, usando as fotos que enviei e os
anuncios que voce acabou de escrever. Para cada item:

1. Crie um novo anuncio no Marketplace
2. Suba as fotos correspondentes
3. Preencha titulo, descricao, preco, categoria e condicao com o
   que voce escreveu
4. Defina a localizacao para a minha cidade
5. Publique

Comece por um item so e me mostre como ficou antes de publicar,
pra eu confirmar. Depois que eu aprovar, siga com o resto, um de
cada vez, e me avise o status de cada publicacao (publicado, com
erro ou aguardando).`;

const PROMPT_4 = `Agora crie uma tarefa agendada que rode a cada 24 horas para
cuidar das vendas por mim. Nessa rotina, voce deve:

- Verificar as mensagens novas de interessados em cada anuncio
- Responder de forma educada e rapida, tirando duvidas sobre o item
- Negociar quando pedirem desconto, sem aceitar de primeira e sempre
  fazendo uma contraproposta
- Nunca fechar abaixo do preco minimo que eu definir para cada item
- Priorizar quem demonstra intencao real de compra e ja combinar a
  retirada ou o envio

No fim de cada rodada, me mande um resumo: quem falou, quais ofertas
surgiram e o que ficou pendente da minha decisao.

Meus precos minimos por item: [DEFINA AQUI O MINIMO DE CADA ITEM]`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#10B981]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function VendasGptPage() {
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
          <DollarSign className="h-3.5 w-3.5" />
          Dinheiro parado em casa
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Faça o ChatGPT{" "}
          <span style={{ color: ACCENT }}>vender as suas tralhas</span> paradas
          pra você
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Você tira foto do que quer vender, e o ChatGPT faz o resto: precifica
          com dados de mercado, escreve os anúncios, publica no Facebook
          Marketplace sozinho e ainda negocia com os compradores. Tudo com quatro
          prompts.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>
          O que estava dando dinheiro pra poeira
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Todo mundo tem uma gaveta, um armário ou um canto do quarto cheio de
            coisa boa parada: o celular antigo, o videogame que ninguém usa, a
            bicicleta, o console, aquela bolsa. Junto, isso é fácil de virar uns
            bons reais, mas ninguém vende porque dá preguiça de fotografar,
            precificar, escrever anúncio e ficar respondendo comprador.
          </p>
          <p>
            É justamente essa preguiça que o ChatGPT resolve. No modo agente, ele
            não só te diz por quanto vender, ele abre o próprio navegador, publica
            os anúncios e ainda responde os interessados. Você tira as fotos e ele
            toca o resto. Os quatro prompts abaixo são o passo a passo exato.
          </p>
        </div>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>O que você precisa antes</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Camera,
              title: "Fotos dos itens",
              text: "Tire uma ou duas fotos de cada coisa que quer vender, com boa luz. Pode juntar tudo num álbum só.",
            },
            {
              icon: Bot,
              title: "ChatGPT no modo agente",
              text: "Os passos 3 e 4 usam o modo que abre o navegador (o 'Work' lá em cima). Precisa de um plano do ChatGPT que tenha o agente.",
            },
            {
              icon: Store,
              title: "Conta no Marketplace",
              text: "Uma conta no Facebook logada, já que é onde o ChatGPT vai publicar os anúncios pra você.",
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

      {/* Aviso */}
      <section
        className="rounded-2xl border p-6 space-y-3"
        style={{ borderColor: "#EAB30855", backgroundColor: "#EAB3080D" }}
      >
        <h2 className="flex items-center gap-2.5 text-lg font-bold text-white">
          <ShieldAlert className="h-5 w-5 shrink-0 text-yellow-500" />
          Confira antes de publicar
        </h2>
        <p className="text-sm text-[#bbb] leading-relaxed">
          O modo agente do ChatGPT ainda está evoluindo, então nem sempre publica
          de primeira, e às vezes erra um passo. Antes de deixar ele publicar,
          leia os anúncios e os preços que ele montou. E na negociação, defina um
          preço mínimo, pra ele nunca aceitar menos do que você quer receber.
        </p>
      </section>

      {/* Gate + prompts */}
      {!unlocked ? (
        <LeadGate
          source="vendasgpt-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere os quatro prompts de venda"
          description="Insira seus dados para desbloquear os quatro prompts prontos: precificar, anunciar, publicar e negociar."
          contentNote="Você vai liberar: o prompt de precificação com dados de mercado, o de escrever os anúncios, o que publica no Marketplace sozinho e o bônus que negocia com os compradores."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <ShoppingBag className="h-4 w-4" />
            Prompts liberados. Suba as fotos e use um de cada vez, no mesmo chat.
          </div>

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={DollarSign}>Prompt 1: precificar</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Abra uma conversa nova, selecione o modo agente (Work) lá em cima,
              faça o upload das fotos de tudo que quer vender e cole o prompt.
              Guarde essa conversa: os outros três prompts vão no mesmo chat.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={Megaphone}>Prompt 2: escrever os anúncios</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com os preços na mesa, peça os anúncios prontos. Ele devolve título,
              descrição e preço de cada item, no ponto pra publicar.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={Store}>Prompt 3: publicar sozinho</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Aqui vem o truque. Peça pra ele abrir o próprio navegador e publicar
              no Facebook Marketplace. Acompanhe a primeira publicação pra
              conferir se ficou do jeito certo antes de soltar as próximas.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>

          {/* Prompt 4 */}
          <section className="space-y-4">
            <SectionTitle icon={Clock}>Prompt 4: negociar (bônus)</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Para fechar, coloque ele pra trabalhar sozinho: uma tarefa que roda
              todo dia respondendo os interessados e negociando. Defina o preço
              mínimo pra ele nunca vender abaixo do que você aceita.
            </p>
            <PromptBlock code={PROMPT_4} copyLabel="Copiar prompt 4" />
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="vendasgpt" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
