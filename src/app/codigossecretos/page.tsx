"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Check, Copy, Search, Sparkles, Terminal } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#A3E635";
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

export default function CodigosSecretosPage() {
  const [formUnlocked,setFormUnlocked]=useState(false);
  const review=useSyncExternalStore(()=>()=>{},()=>["localhost","127.0.0.1"].includes(window.location.hostname),()=>false);
  const storedLead=useSyncExternalStore((notify)=>{window.addEventListener("storage",notify);return()=>window.removeEventListener("storage",notify)},hasCapturedLead,()=>false);
  const unlocked=review||storedLead||formUnlocked;
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("Todos"); const [copied,setCopied]=useState("");
  const categories=["Todos",...Array.from(new Set(CODES.map(x=>x[3])))];
  const visible=useMemo(()=>CODES.filter(x=>(category==="Todos"||x[3]===category)&&x.join(" ").toLowerCase().includes(query.toLowerCase())),[query,category]);
  const copy=async(item:typeof CODES[number])=>{const text=`${item[0]}\n\nCrie uma imagem de ${item[1].toLowerCase()} para [PRODUTO, PESSOA OU IDEIA]. ${item[2]} Use [CORES], formato [FORMATO], estilo [ESTILO] e inclua [TEXTO, SE HOUVER]. Faça até 3 perguntas se faltar informação.`;await navigator.clipboard.writeText(text);setCopied(item[0]);setTimeout(()=>setCopied(""),1800)};
  return <div className="max-w-5xl mx-auto py-8 px-4 space-y-12">
    {review&&<div className="sticky top-2 z-20 rounded-lg bg-[#A3E635] text-[#17200b] text-center text-[10px] font-mono font-semibold px-3 py-2">PRÉVIA LOCAL · conteúdo aberto. Em produção, os códigos ficam protegidos pelo formulário.</div>}
    <header className="text-center space-y-4"><div className="inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] px-4 py-1.5 text-xs font-medium"><Terminal className="h-3.5 w-3.5"/>Biblioteca visual</div><h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight"><span className="text-[#A3E635]">+50 códigos</span> para criar imagens incríveis no ChatGPT</h1><p className="text-[#888] max-w-2xl mx-auto">Escolha um resultado, copie o código e complete com seu produto, pessoa ou ideia. Do blueprint ao outdoor 3D.</p><div className="max-w-xl mx-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4 text-left font-mono text-xs text-[#aaa]"><span className="text-[#A3E635]">/blueprint</span> seu produto + detalhes → imagem técnica</div></header>
    <section className="space-y-4"><h2 className="flex items-center gap-2 text-2xl font-bold"><Sparkles className="h-5 w-5 text-[#A3E635]"/>Como usar</h2><div className="grid sm:grid-cols-3 gap-3">{[["1","Escolha o efeito","Busque por anúncio, retrato, produto ou ambiente."],["2","Copie o código","Cada item traz uma instrução pronta para personalizar."],["3","Adicione a referência","Descreva produto, cores, formato e texto obrigatório."]].map(x=><article key={x[0]} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"><b className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A3E635]/10 text-[#A3E635] font-mono text-xs mb-6">{x[0]}</b><h3 className="font-semibold">{x[1]}</h3><p className="text-sm text-[#999] mt-1">{x[2]}</p></article>)}</div><div className="border-l-2 border-[#A3E635] bg-[#A3E635]/5 p-4 text-sm text-[#999]"><b className="text-[#A3E635]">Importante:</b> são atalhos-modelo para prompts e workflows, não comandos nativos universais sem configuração.</div></section>
    {!unlocked?<LeadGate source="50-codigos-chatgpt" accent={ACCENT} buttonTextColor="#17200b" title="Receba os +50 códigos completos" description="Preencha seus dados para liberar a busca, os filtros e todos os códigos." buttonLabel="Desbloquear os +50 códigos" onUnlock={()=>setFormUnlocked(true)}/>:<section className="space-y-4"><div className="flex items-end justify-between"><div><p className="text-[10px] font-mono text-[#A3E635] uppercase tracking-widest">Escolha o resultado</p><h2 className="text-2xl font-bold">Biblioteca de códigos</h2></div><span className="text-xs font-mono text-[#666]">{visible.length} códigos</span></div><div className="sticky top-2 z-10 rounded-xl border border-[#2a2a2e] bg-[#121214]/95 backdrop-blur p-3 space-y-2"><label className="flex items-center gap-2 rounded-lg border border-[#2a2a2e] bg-[#0e0e10] px-3"><Search className="h-4 w-4 text-[#666]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busque: anúncio, retrato, produto..." className="w-full bg-transparent py-3 text-sm outline-none"/></label><div className="flex gap-2 overflow-x-auto">{categories.map(x=><button key={x} onClick={()=>setCategory(x)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${category===x?"border-[#A3E635]/50 bg-[#A3E635]/10 text-[#A3E635]":"border-[#2a2a2e] text-[#777]"}`}>{x}</button>)}</div></div><div className="grid sm:grid-cols-2 gap-3">{visible.map(item=><article key={item[0]} className="flex min-h-52 flex-col rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5 hover:border-[#A3E635]/30 transition-colors"><div className="flex justify-between"><code className="text-sm font-semibold text-[#A3E635]">{item[0]}</code><span className="rounded-full bg-white/5 px-2 py-1 text-[9px] font-mono text-[#666]">{item[3]}</span></div><h3 className="mt-7 font-semibold text-lg">{item[1]}</h3><p className="text-sm text-[#999] mt-1">{item[2]}</p><button onClick={()=>copy(item)} className="mt-auto self-start rounded-md border border-[#A3E635]/20 bg-[#A3E635]/5 text-[#A3E635] px-3 py-2 text-xs">{copied===item[0]?<><Check className="inline h-3.5 w-3.5"/> Copiado</>:<><Copy className="inline h-3.5 w-3.5"/> Copiar código</>}</button></article>)}</div></section>}
    <SalesCta utmContent="50-codigos-chatgpt"/><p className="text-center text-xs text-[#555]">Feito por <span className="text-[#A3E635]">@rafa.grandi</span></p>
  </div>;
}
