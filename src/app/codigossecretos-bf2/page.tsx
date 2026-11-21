"use client";

import { Fragment, useMemo, useState } from "react";
import { Check, Copy, Search, Sparkles, Terminal } from "lucide-react";
import {
  BlackBoxBlock,
  BlackBoxPromos,
  BlackBoxTopBar,
  type BlackBoxBlockVariant,
} from "@/components/black-box-promos";

const SLUG = "codigossecretos-bf2";
const ACCENT = "#D9962B";
const CREAM = "#EFE6D6";
const MUTED = "#B9AD9B";
const CARD = "#15100A";
const LINE = "rgba(239,230,214,0.12)";
const CODES = [
  ["/blueprint","Blueprint técnico","Prancha técnica com vistas, medidas, anotações e traço azul.","Design"],
  ["/professionalshowcase","Ensaio profissional","Shooting profissional com luz de estúdio e acabamento editorial.","Retrato"],
  ["/3dbillboard","Outdoor 3D","Produto ou personagem saltando de um billboard anamórfico urbano.","Publicidade"],
  ["/metaads","Criativo para Meta Ads","Anúncio com hierarquia de oferta, produto e área segura para copy.","Publicidade"],
  ["/producthero","Hero de produto","Imagem principal premium para landing page.","Produto"],
  ["/packshot","Packshot de estúdio","Produto isolado com luz comercial e sombra controlada.","Produto"],
  ["/floatingproduct","Produto flutuante","Produto suspenso com objetos e partículas ao redor.","Produto"],
  ["/explodedview","Vista explodida","Peças internas separadas para explicar a construção.","Design"],
  ["/cutaway","Corte interno","Interior de objeto ou mecanismo com corte técnico realista.","Design"],
  ["/xray","Raio-X visual","Camadas internas com estética translúcida de raio-X.","Design"],
  ["/appmockup","Mockup de aplicativo","Telas de app em smartphones premium.","Mockup"],
  ["/webmockup","Mockup de site","Interface em notebook e desktop com profundidade.","Mockup"],
  ["/packaging","Design de embalagem","Embalagem alinhada ao posicionamento e público.","Branding"],
  ["/labeldesign","Rótulo de produto","Rótulo marcante aplicado a garrafa, pote ou caixa.","Branding"],
  ["/brandboard","Prancha de marca","Logo, paleta, tipografia e aplicações organizados.","Branding"],
  ["/logogrid","Construção de logo","Logo sobre grid, proporções e lógica de construção.","Branding"],
  ["/mascot","Mascote de marca","Personagem proprietário com poses e expressões.","Branding"],
  ["/socialpost","Post para redes sociais","Peça quadrada clara e pronta para o feed.","Social"],
  ["/carouselcover","Capa de carrossel","Headline curta, elemento forte e leitura mobile.","Social"],
  ["/reelcover","Capa de Reels","Thumbnail vertical com título grande e contraste.","Social"],
  ["/youtubethumbnail","Thumbnail do YouTube","Miniatura emocional com curiosidade visual.","Social"],
  ["/storypromo","Story promocional","Oferta vertical com benefício, prova e CTA.","Social"],
  ["/beforeafter","Antes e depois","Transformação em duas cenas coerentes.","Publicidade"],
  ["/testimonial","Card de depoimento","Prova social com retrato e citação curta.","Publicidade"],
  ["/offerstack","Pilha de oferta","Produto, bônus e entregáveis com valor percebido.","Publicidade"],
  ["/launchposter","Pôster de lançamento","Anúncio cinematográfico para produto ou evento.","Publicidade"],
  ["/storefront","Fachada de loja","Identidade visual aplicada em fachada realista.","Ambiente"],
  ["/boothdesign","Estande de evento","Estande com marca, circulação e experiência.","Ambiente"],
  ["/interiorconcept","Conceito de interior","Ambiente completo por estilo, material e função.","Ambiente"],
  ["/workspace","Workspace aspiracional","Mesa de trabalho organizada e desejável.","Ambiente"],
  ["/isometricroom","Sala isométrica","Ambiente em diorama isométrico detalhado.","3D"],
  ["/clayrender","Render em clay","Cena em modelo 3D monocromático.","3D"],
  ["/toyfigure","Action figure","Pessoa como boneco com acessórios e embalagem.","3D"],
  ["/miniworld","Mundo em miniatura","Pequeno universo dentro de objeto ou caixa.","3D"],
  ["/glassmorphism","Cena de vidro","Materiais translúcidos e estética glassmorphism.","3D"],
  ["/editorialportrait","Retrato editorial","Retrato de revista com styling sofisticado.","Retrato"],
  ["/corporateportrait","Retrato corporativo","Foto confiável para LinkedIn e site.","Retrato"],
  ["/cinematicportrait","Retrato cinematográfico","Pessoa como personagem de filme.","Retrato"],
  ["/fashioncampaign","Campanha de moda","Ensaio fashion com conceito e locação.","Retrato"],
  ["/cinematic","Cena cinematográfica","Plano aberto com a pessoa dentro do ambiente, luz dramática e clima de filme.","Retrato"],
  ["/pixar","Personagem de animação","Pessoa virando personagem 3D de estúdio de animação, com traço arredondado e olhar expressivo.","Retrato"],
  ["/poster","Pôster de protagonista","Pessoa como estrela do cartaz, com título grande e composição de pôster.","Retrato"],
  ["/avatar","Avatar de perfil","Versão estilizada do rosto para foto de perfil, legível em tamanho pequeno.","Retrato"],
  ["/characterturnaround","Ficha de personagem","Frente, lado e costas com figurino.","Design"],
  ["/infographic","Infográfico visual","Dados convertidos em narrativa gráfica.","Design"],
  ["/timeline","Linha do tempo","Evolução histórica em composição contínua.","Design"],
  ["/processmap","Mapa de processo","Etapas e decisões em fluxo visual.","Design"],
  ["/comparison","Comparativo visual","Opções comparadas por critérios e vantagens.","Design"],
  ["/bookcover","Capa de livro","Capa conceitual com título e gênero.","Editorial"],
  ["/magazinecover","Capa de revista","Tema ou pessoa em capa com chamadas.","Editorial"],
  ["/albumcover","Capa de álbum","Identidade musical alinhada ao gênero.","Editorial"],
  ["/movieposter","Pôster de filme","Cartaz com protagonista e atmosfera.","Editorial"],
  ["/menuvisual","Cardápio visual","Pratos e preços com leitura rápida.","Editorial"],
  ["/productscene","Produto em contexto","Produto em cena que demonstra uso e benefício.","Produto"],
] as const;

export default function CodigosSecretosBlackBox2Page() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState(false);
  const categories = ["Todos", ...Array.from(new Set(CODES.map((x) => x[3])))];
  const visible = useMemo(
    () =>
      CODES.filter(
        (x) =>
          (category === "Todos" || x[3] === category) &&
          x.join(" ").toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );
  // Cortes em ~1/3, metade e ~2/3 da lista, sempre em número par para não quebrar a grade de 2 colunas.
  const cut = (fraction: number) => Math.min(visible.length, Math.round((visible.length * fraction) / 2) * 2);
  const cuts = [0, cut(1 / 3), cut(1 / 2), cut(2 / 3), visible.length];
  const promoCards: BlackBoxBlockVariant[] = ["grupo", "desconto", "contagem"];

  const copy = async (item: (typeof CODES)[number]) => {
    const text = `${item[0]}\n\nCrie uma imagem de ${item[1].toLowerCase()} para [PRODUTO, PESSOA OU IDEIA]. ${item[2]} Use [CORES], formato [FORMATO], estilo [ESTILO] e inclua [TEXTO, SE HOUVER]. Faça até 3 perguntas se faltar informação.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(item[0]);
      setCopyError(false);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopyError(true);
    }
  };

  const card = (item: (typeof CODES)[number]) => (
    <article
      key={item[0]}
      className="flex min-h-52 flex-col rounded-xl border p-5 transition-colors"
      style={{ backgroundColor: CARD, borderColor: LINE }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(217,150,43,0.45)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = LINE)}
    >
      <div className="flex justify-between gap-2">
        <code className="text-sm font-semibold" style={{ color: ACCENT }}>
          {item[0]}
        </code>
        <span
          className="rounded-full px-2 py-1 text-[9px] font-mono"
          style={{ backgroundColor: "rgba(239,230,214,0.06)", color: MUTED }}
        >
          {item[3]}
        </span>
      </div>
      <h3 className="mt-7 text-lg font-semibold">{item[1]}</h3>
      <p className="mt-1 text-sm" style={{ color: MUTED }}>
        {item[2]}
      </p>
      <button
        type="button"
        onClick={() => copy(item)}
        className="mt-auto self-start rounded-md border px-3 py-2 text-xs font-semibold transition-colors"
        style={{
          borderColor: "rgba(217,150,43,0.35)",
          backgroundColor: "rgba(217,150,43,0.08)",
          color: ACCENT,
        }}
      >
        {copied === item[0] ? (
          <>
            <Check className="mr-1 inline h-3.5 w-3.5" /> Copiado
          </>
        ) : (
          <>
            <Copy className="mr-1 inline h-3.5 w-3.5" /> Copiar código
          </>
        )}
      </button>
    </article>
  );

  return (
    <div className="min-h-screen pb-36 md:pb-20" style={{ backgroundColor: "#0E0904", color: CREAM }}>
      <BlackBoxTopBar slug={SLUG} />

      <div className="mx-auto max-w-5xl space-y-12 px-4 pt-20">
        <header className="space-y-4 pt-4 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
            style={{ borderColor: "rgba(217,150,43,0.4)", backgroundColor: "rgba(217,150,43,0.1)", color: ACCENT }}
          >
            <Terminal className="h-3.5 w-3.5" />
            Biblioteca visual
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            <span style={{ color: ACCENT }}>+50 códigos</span> para criar imagens incríveis no ChatGPT
          </h1>
          <p className="mx-auto max-w-2xl" style={{ color: MUTED }}>
            Escolha um resultado, copie o código e complete com seu produto, pessoa ou ideia. Do
            blueprint ao outdoor 3D.
          </p>
          <div
            className="mx-auto max-w-xl rounded-xl border p-4 text-left font-mono text-xs"
            style={{ borderColor: LINE, backgroundColor: "#0A0703", color: MUTED }}
          >
            <span style={{ color: ACCENT }}>/blueprint</span> seu produto + detalhes → imagem técnica
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="h-5 w-5" style={{ color: ACCENT }} />
            Como usar
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["1", "Escolha o efeito", "Busque por anúncio, retrato, produto ou ambiente."],
              ["2", "Copie o código", "Cada item traz uma instrução pronta para personalizar."],
              ["3", "Adicione a referência", "Descreva produto, cores, formato e texto obrigatório."],
            ].map(([n, title, text]) => (
              <article
                key={n}
                className="rounded-xl border p-5"
                style={{ backgroundColor: CARD, borderColor: LINE }}
              >
                <b
                  className="mb-6 flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs"
                  style={{ backgroundColor: "rgba(217,150,43,0.12)", color: ACCENT }}
                >
                  {n}
                </b>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                  {text}
                </p>
              </article>
            ))}
          </div>
          <div
            className="border-l-2 p-4 text-sm"
            style={{ borderColor: ACCENT, backgroundColor: "rgba(217,150,43,0.06)", color: MUTED }}
          >
            <b style={{ color: ACCENT }}>Importante:</b> são atalhos-modelo para prompts e workflows,
            não comandos nativos universais sem configuração.
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Escolha o resultado
              </p>
              <h2 className="text-2xl font-bold">Biblioteca de códigos</h2>
            </div>
            <span className="font-mono text-xs" style={{ color: "rgba(239,230,214,0.5)" }}>
              {visible.length} códigos
            </span>
          </div>

          <div
            className="sticky top-14 z-30 space-y-2 rounded-xl border p-3 backdrop-blur"
            style={{ backgroundColor: "rgba(14,9,4,0.95)", borderColor: LINE }}
          >
            <label
              className="flex items-center gap-2 rounded-lg border px-3"
              style={{ backgroundColor: "#0A0703", borderColor: LINE }}
            >
              <Search className="h-4 w-4" style={{ color: "rgba(239,230,214,0.45)" }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque: anúncio, retrato, produto..."
                className="w-full bg-transparent py-3 text-sm outline-none"
                style={{ color: CREAM }}
              />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((x) => (
                <button
                  key={x}
                  type="button"
                  onClick={() => setCategory(x)}
                  className="whitespace-nowrap rounded-full border px-3 py-1.5 text-xs"
                  style={
                    category === x
                      ? { borderColor: "rgba(217,150,43,0.55)", backgroundColor: "rgba(217,150,43,0.12)", color: ACCENT }
                      : { borderColor: LINE, color: MUTED }
                  }
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          {copyError && (
            <p className="rounded-lg border px-3 py-2 text-xs" style={{ borderColor: "rgba(217,150,43,0.5)", color: ACCENT }}>
              Não deu para copiar automaticamente. Selecione o texto do código e copie manualmente.
            </p>
          )}

          {visible.length === 0 ? (
            <p className="rounded-xl border p-6 text-sm" style={{ borderColor: LINE, color: MUTED }}>
              Nenhum código com esse termo. Limpe a busca ou escolha outra categoria.
            </p>
          ) : (
            <div className="space-y-3">
              {cuts.slice(0, -1).map((start, i) => {
                const items = visible.slice(start, cuts[i + 1]);
                const variant = promoCards[i];
                return (
                  <Fragment key={start + "-" + i}>
                    {items.length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2">{items.map(card)}</div>
                    )}
                    {/* Card só entra depois de um trecho com códigos, para nunca empilhar dois cards seguidos. */}
                    {variant && items.length > 0 && (
                      <div className="py-6">
                        <BlackBoxBlock slug={SLUG} variant={variant} />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          )}
        </section>

        <p className="text-center text-xs" style={{ color: "rgba(239,230,214,0.45)" }}>
          Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
        </p>
      </div>

      <BlackBoxPromos slug={SLUG} />
    </div>
  );
}
