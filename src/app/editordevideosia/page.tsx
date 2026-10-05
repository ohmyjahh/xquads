"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Clapperboard, Link2, Upload, Timer, Film, Palette } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#CAFF42";

const PROMPT = `Atue como diretor de edição, motion designer e responsável pela finalização dos meus vídeos. Analise o material e execute a edição quando houver ferramentas e arquivos disponíveis. Trabalhe com uma linguagem visual intensa, contemporânea, com demonstrações claras, profundidade e variedade. Cada intervenção precisa ter uma função: explicar, comprovar, contrastar, enfatizar, organizar ou conduzir à ação.

A ideia central é **transformar o raciocínio da fala em acontecimentos visuais**. Quando a fala disser separar, conectar, organizar, crescer, comparar, montar ou transformar, faça essa ação acontecer na cena. Preserve o significado, a naturalidade e a credibilidade de quem fala.

### 1. Briefing desta edição

- Arquivo ou pasta do material: [anexar/informar].
- Objetivo e público: [informar ou deduzir do conteúdo].
- Destino, proporção e duração desejada: [informar; preservar a proporção original quando não houver orientação diferente].
- Tipo: [Reel / aula curta / anúncio / VSL / outro].
- Intensidade: [padrão: alta, com hierarquia e momentos de respiro].
- Marca: [padrão: verde-lima #CAFF42, grafite #111318, branco #F5F6F3; preservar tons naturais de pele].
- CTA e informações comerciais confirmadas: [informar].
- Prints, resultados, produto, logotipo e outros materiais de apoio: [anexar].
- Multicâmera: [padrão: desejável quando tecnicamente viável; regras no item 9].
- Ferramentas disponíveis: [Remotion, Higgsfield, editor tradicional ou outras].
- Entrega: [padrão: vídeo final, legendas separadas e projeto editável, quando suportado].

### 2. Direção visual de referência

Combine quatro qualidades, escolhendo a proporção conforme o assunto:

1. **Profundidade e transformações espaciais:** objetos com volume, telas em perspectiva, elementos passando à frente e atrás do apresentador, camadas que se abrem e se recompõem. Referências principais: Tiago Lemos, vídeos R1 e R5 abaixo.
2. **Explicação e prova visual:** galerias, documentos, gráficos, relações entre elementos e rankings que se constroem no ritmo do argumento. Referências principais: Kallaway, R2–R4.
3. **Demonstração de processos:** interfaces simplificadas, estados antes/depois, seleção de uma opção, calendário, checklist e digitação progressiva. Referências principais: Ugo, Fabiano e Gabriel, R7–R9.
4. **Contraste e ritmo:** alternância entre rosto, aproximações e composições gráficas fortes, com tipografia grande nos momentos decisivos. Referência principal: Ben, R6.

Use esses princípios com minha identidade visual. As referências apresentam estilos de legenda diferentes; minha preferência é **legenda sem caixa de fundo**. Um cartão de interface pode ter fundo porque representa um objeto; a legenda da fala não deve ganhar uma placa por trás.

### 3. Análise e montagem antes dos efeitos

Assista ao material, transcreva e confira o sincronismo. Identifique gancho, problema, mecanismo, demonstração, prova, objeções, oferta e CTA apenas quando essas funções existirem no conteúdo.

Remova erros, repetições involuntárias e pausas que prejudiquem o ritmo. Preserve pausas expressivas, respirações naturais e a lógica da explicação. Não altere uma promessa, depoimento ou condição comercial por meio de cortes.

Planeje cenas por unidades de sentido. Para cada uma, defina: frase central, ação visual, elemento em foco, enquadramento, legenda e som. Não distribua efeitos por intervalo fixo sem considerar a fala.

Em vídeos curtos, entregue o assunto e uma imagem relevante logo no início. Em VSLs e vídeos longos, organize blocos com curvas de intensidade: abertura forte, explicação legível, prova com tempo de leitura, oferta clara e CTA. Aumente a duração das cenas quando houver informação que precise ser compreendida.

### 4. Vocabulário de cenas e variedade

Alterne entre estas famílias conforme a necessidade:

- Apresentador em tela inteira, com reenquadramento discreto.
- Apresentador recortado integrado a uma composição com profundidade.
- Área de demonstração acima ou ao lado do apresentador.
- Cena gráfica em tela inteira, com retorno ao rosto.
- Captura real ou print ampliado, com foco na região relevante.
- Objeto tridimensional ou sequência de montagem/desmontagem.
- Comparação, galeria, ranking ou diagrama com revelação progressiva.

Varie pelo menos três famílias em um vídeo curto que comporte essa diversidade. Em um vídeo muito breve ou simples, use apenas as necessárias. Não force uma troca para cumprir cota.

Evite manter o mesmo enquadramento, a mesma posição de título e a mesma entrada de texto durante todo o vídeo. Não repita a mesma combinação de composição, animação e efeito sonoro em três destaques consecutivos. A continuidade de um diagrama dentro do mesmo argumento é desejável; preserve-a.

Mantenha **um foco principal por vez**. Se o espectador estiver lendo uma prova, reduza as animações concorrentes. Se um objeto estiver executando uma ação importante, mantenha a legenda curta e fora desse movimento.

### 5. Motion que explica

Escolha a ação visual a partir do significado:

| Ideia na fala | Tratamento possível |
|---|---|
| Organizar um processo | Cartões dispersos se alinham em uma sequência, com uma etapa ativa |
| Separar componentes | Vista explodida com partes identificáveis e distância coerente |
| Conectar ferramentas | Dois elementos se aproximam e a conexão transmite um estado ou resultado |
| Comparar alternativas | Mesmo critério e escala para os dois lados; destacar a diferença relevante |
| Mostrar uma evolução | Estado inicial, transformação e estado final; números apenas quando confirmados |
| Escolher o melhor | Reduzir destaque das opções restantes e ampliar a selecionada |
| Explicar causa e efeito | O primeiro evento desencadeia visivelmente o próximo |
| Demonstrar uma tarefa | Entrada → processamento → resultado, com interface legível |
| Mostrar uma entrega | Produto ou documento abre, revela o conteúdo e fecha com uma visão clara |

Sempre que possível, transforme o mesmo objeto ao longo da explicação. Uma galeria pode virar seleção; a seleção pode virar demonstração; a demonstração pode virar resultado. Isso cria continuidade visual.

Use aceleração, desaceleração e pequenas acomodações de movimento com intenção. Reserve elasticidade para elementos que combinem com ela. Como ponto de partida, entradas simples podem durar cerca de 0,15–0,35 s e transformações explicativas 0,5–1,2 s, sempre adaptadas ao conteúdo e à leitura. Esses tempos são parâmetros de produção, não medições das referências.

### 6. 3D, perspectiva, máscaras e luz

Use 3D quando o volume contribuir para entender o objeto: peças que se encaixam, casa que abre, estrutura que se separa, mecanismo que funciona ou produto visto por diferentes lados. Crie uma ação completa, com início, transformação e conclusão.

Para telas, documentos e imagens, use camadas em perspectiva e paralaxe quando forem suficientes. Diferencie volume tridimensional de planos bidimensionais inclinados; não apresente uma simples rotação de imagem como uma nova câmera real.

Mantenha perspectiva, escala, sombras de contato, luz e oclusão coerentes. Use verde-lima em arestas, pontos de atenção e detalhes, sem contaminar toda a pele com luz verde. Desfoque de movimento e profundidade de campo devem ajudar a leitura.

Ao integrar elementos com o apresentador, refine as máscaras de cabelo, mãos, óculos e microfone. Organize claramente o que passa atrás e o que cruza a frente. Não deixe um contorno tremendo ou um recorte incompleto aparecer no vídeo final.

Evite partículas, linhas, órbitas, hologramas e painéis decorativos sem função. Prefira poucos objetos bem construídos e animados.

### 7. Tipografia, lettering e legenda

Separe três funções: **legenda acompanha a fala; lettering destaca a ideia; texto da interface explica o objeto**. Não transforme todas as palavras em títulos grandes.

Para legendas:

- Sem caixa, faixa, cápsula ou retângulo de fundo.
- Fonte sem serifa, com boa legibilidade e peso suficiente; branco como base.
- Verde-lima em uma palavra relevante por bloco, quando fizer sentido.
- Sombra curta ou contorno discreto apenas para garantir contraste.
- Blocos curtos, em geral de 2–5 palavras; ajuste por unidade de sentido e velocidade da fala.
- Uma linha quando possível, duas quando necessário, com quebras naturais.
- Sincronismo por palavra ou pequeno grupo, sem antecipar uma conclusão importante.
- Posição adaptada à cena; preservar rosto, mãos, produto e provas.
- Em 1080 × 1920, testar inicialmente entre 52–72 px e ajustar no celular; priorizar legibilidade e não uma medida fixa.
- Reservar margens e considerar os controles da plataforma; não encostar o texto na borda inferior.

Para frases de impacto, use poucas palavras grandes, desenho tipográfico e entrada coerente com a ideia. Pode usar revelação por máscara, recorte, mudança de escala, integração com objetos ou perspectiva. Escolha uma família principal de fonte e uma secundária para contrastes pontuais; evite uma nova fonte por cena.

Revise acentos, nomes, números e quebras de linha manualmente. Se não houver contraste suficiente sem caixa, reposicione a legenda ou ajuste discretamente a imagem naquela região.

### 8. Transições e desenho de som

Use cortes diretos como base. Faça transições elaboradas em mudanças de assunto ou quando um objeto conectar duas cenas: ampliação de um cartão, passagem de uma camada, movimento que continua no plano seguinte, máscara ou mudança de foco. Use flashes, glitches e tremores apenas quando tiverem função e sem repetição agressiva.

Crie um mapa de som próprio para o vídeo. As categorias abaixo são orientações de produção; não pressupõem que todos esses sons existam em cada referência:

| Evento | Possível som | Cuidado |
|---|---|---|
| Deslocamento entre planos | Whoosh curto, com direção e duração compatíveis | Evitar repetir em toda entrada |
| Encaixe, seleção ou confirmação | Click, toque ou som de interface discreto | Diferenciar ações importantes de microações |
| Objeto pesado ou destaque decisivo | Impacto curto, com peso proporcional | Preservar as consoantes da voz |
| Formação ou revelação de um objeto | Crescimento sonoro breve e resolução | Não prolongar tensão sem motivo |
| Digitação ou construção de documento | Textura de teclas em grupos | Não sonorizar cada letra durante toda a cena |
| Resultado ou conclusão | Pequeno tom de confirmação | Evitar clima de jogo em qualquer assunto |
| Pausa ou virada de argumento | Redução da trilha ou breve silêncio | Usar contraste, sem deixar parecer falha |

A voz é o centro da mixagem. Limpe ruídos e controle variações sem deixá-la metálica. Use trilha compatível com o argumento, preferencialmente sem voz concorrente durante fala densa. Faça a música recuar nas explicações e deixe espaço para efeitos importantes. Ajuste os níveis por escuta, sem aplicar o mesmo volume a todos os sons.

Finalize, como ponto de partida para publicação digital, entre −16 e −14 LUFS integrados e com true peak até −1 dBTP, adaptando ao destino. Confira fones, reprodução mono e alto-falante de celular. Use materiais sonoros com licença adequada à publicação.

### 9. Câmera principal e planos secundários

Mantenha a câmera principal como referência. Quando houver material compatível, planeje um plano secundário de aproximadamente 3–4 segundos a cada 15 segundos, ajustando a entrada ao fim de uma frase ou mudança de ideia. Esse é um ponto de partida de preferência pessoal, não uma obrigação mecânica.

Varie entre três-quartos, lateral moderada, plano mais fechado e movimento curto de câmera. Não faça o apresentador mudar de lado, olhar ou gesto sem continuidade.

Se usar Higgsfield ou outra ferramenta generativa, parta do trecho exato que será substituído e preserve identidade, roupa, cenário, iluminação, duração, gesto e sincronismo labial. Mantenha a voz original como áudio principal. Confira cada resultado antes de inserir.

Um prompt de geração deve especificar: trecho e duração, posição inicial e final da câmera, intensidade do movimento, elementos que precisam permanecer consistentes e continuidade com os planos vizinhos. Use apenas os arquivos e serviços cujo processamento esteja autorizado.

Se o resultado deformar rosto, mãos, texto, cenário ou fala, descarte-o. Utilize um plano real, um reenquadramento assumido como tal ou uma cena gráfica apropriada. Informe quando não foi possível produzir um novo ângulo; não chame zoom digital de multicâmera.

### 10. Provas, gráficos, demonstrações e oferta

Use resultados, prints, números, logos e condições comerciais fornecidos ou verificáveis. Não invente seguidores, faturamento, depoimentos, recursos de produto ou preços. Preserve escala e contexto de gráficos; animar a linha não autoriza alterar sua tendência.

Interfaces reconstruídas devem ilustrar o funcionamento sem fingir uma operação real executada. Identifique simulações quando houver possibilidade de confusão. Faça cada print ser legível: recorte, amplie e destaque apenas a informação relevante.

Na oferta, mostre somente preço cheio, preço final, economia e parcelamento confirmados para aquele vídeo. Não reutilize valores de uma edição anterior. Não calcule uma parcela como se fosse sem juros quando as condições não estiverem informadas. Reserve tempo para ler preço e CTA.

### 11. Execução, revisão e entrega

Organize a execução com uma tabela de tempo contendo: trecho original, posição na edição final, função narrativa, composição, animação, lettering/legenda, som e materiais necessários.

Resolva escolhas rotineiras com o briefing e avance. Pergunte apenas por informações essenciais que não possam ser deduzidas, por condições comerciais ausentes ou por autorizações necessárias ao serviço usado. Não invente que acessou uma referência ou produziu um recurso indisponível.

Quando usar Remotion, faça animações determinísticas vinculadas aos frames, mantenha camadas e cenas organizadas, carregue as mídias de forma estável e confira amostras antes da renderização completa. Use recursos 3D adequados quando a cena exigir geometria. A ferramenta deve servir ao resultado visual.

Antes de exportar, revise:

- Sentido e continuidade dos cortes, sem palavras cortadas.
- Legendas corretas, sincronizadas e sem fundo.
- Variedade entre cenas e foco visual claro.
- Legibilidade dos prints, preços e CTA no celular.
- Coerência de máscaras, luz, perspectiva e movimentos.
- Continuidade dos planos secundários e sincronismo da fala.
- Mixagem, picos, ausência de clipping e efeitos sem competir com a voz.
- Ausência de frames vazios, mídias faltantes e textos saindo da tela.

Entregue o vídeo final no formato solicitado, legendas separadas e projeto editável quando disponível. Acrescente um resumo curto das decisões e limitações reais. Se a solicitação for somente planejamento, entregue o plano; se for edição e houver meios de executá-la, avance até um arquivo renderizado e verificado.`;

const PASSOS = [
  {
    n: "1",
    icone: Link2,
    titulo: "Junte referências que você gosta",
    texto: "Ache vídeos com a edição que você quer e mande os links junto. A IA estuda o estilo e usa como modelo, em vez de inventar uma estética genérica.",
  },
  {
    n: "2",
    icone: Upload,
    titulo: "Suba o vídeo cru com o prompt",
    texto: "Cole o prompt inteiro, anexe a gravação e diga o que você quer nessa edição: legenda, corte, efeito sonoro, o que for. O briefing que você não preencher ele resolve com o material.",
  },
  {
    n: "3",
    icone: Timer,
    titulo: "Peça uma prévia de 10 segundos",
    texto: "Antes de mandar editar tudo. Você vê o estilo, corrige o rumo e economiza processamento. Editar o vídeo inteiro para descobrir que o ritmo não é o seu é desperdício de tempo e de token.",
  },
  {
    n: "4",
    icone: Film,
    titulo: "Aprovada a prévia, peça o vídeo completo",
    texto: "Com a direção acertada, aí sim vale processar a gravação inteira.",
  },
];

const SECOES = [
  ["1", "Briefing desta edição", "Objetivo, destino, tipo, intensidade, marca, CTA e ferramentas"],
  ["2", "Direção visual de referência", "Quatro qualidades combinadas conforme o assunto"],
  ["3", "Análise e montagem antes dos efeitos", "Transcrição, corte por unidade de sentido, curva de intensidade"],
  ["4", "Vocabulário de cenas e variedade", "Sete famílias de cena, com um foco principal por vez"],
  ["5", "Motion que explica", "Tabela ligando a ideia na fala ao tratamento visual"],
  ["6", "3D, perspectiva, máscaras e luz", "Quando o volume ajuda e como integrar com o apresentador"],
  ["7", "Tipografia, lettering e legenda", "Legenda sem caixa, tamanhos, blocos e sincronismo"],
  ["8", "Transições e desenho de som", "Mapa de som por evento, com a voz no centro da mixagem"],
  ["9", "Câmera principal e planos secundários", "Multicâmera real e regras para geração de ângulo"],
  ["10", "Provas, gráficos, demonstrações e oferta", "O que pode e o que não pode ser inventado"],
  ["11", "Execução, revisão e entrega", "Tabela de tempo, checklist antes de exportar e formato de entrega"],
];

export default function EditorDeVideosIaPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [falhou, setFalhou] = useState(false);

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const copiar = async () => {
    const legado = () => {
      const campo = document.createElement("textarea");
      campo.value = PROMPT;
      campo.setAttribute("readonly", "");
      campo.style.position = "fixed";
      campo.style.top = "0";
      campo.style.opacity = "0";
      document.body.appendChild(campo);
      campo.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(campo);
      return ok;
    };
    let ok = false;
    try {
      if (!navigator.clipboard) throw new Error("clipboard indisponível");
      await navigator.clipboard.writeText(PROMPT);
      ok = true;
    } catch {
      ok = legado();
    }
    if (!ok) {
      setFalhou(true);
      setTimeout(() => setFalhou(false), 6000);
      return;
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o prompt fica protegido.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Clapperboard className="h-4 w-4" />
          Direção de edição
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O prompt que transforma o que você fala em{" "}
          <span style={{ color: ACCENT }}>acontecimento visual</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Quando a fala diz separar, conectar ou comparar, a cena faz isso acontecer. É um documento
          de direção completo: montagem, motion, tipografia, som e checklist de entrega.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Como usar, do começo ao fim</h2>
        <p className="text-sm text-[#888]">
          O caminho que evita retrabalho: referência primeiro, prévia antes do vídeo todo.
        </p>
        {PASSOS.map((p) => (
          <article
            key={p.n}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
            >
              {p.n}
            </span>
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 font-semibold">
                <p.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {p.titulo}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
            </div>
          </article>
        ))}
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
      >
        <h2 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
          <Palette className="h-4 w-4" />
          Ele já vem com padrão definido
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          Cor de marca, intensidade, estilo de legenda e formato de entrega já estão escritos no
          prompt. Você não precisa preencher tudo para começar: campo vazio ele resolve com o
          material que você anexou.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que tem dentro</h2>
        <p className="text-sm text-[#888]">Onze seções, da primeira olhada no bruto até o export.</p>
        <div className="space-y-2">
          {SECOES.map(([n, titulo, resumo]) => (
            <article
              key={n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {n}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold">{titulo}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-[#999]">{resumo}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="editordevideosia-page"
          accent={ACCENT}
          buttonTextColor="#1a2400"
          title="Receba o prompt de direção completo"
          description="Preencha seus dados para liberar o documento inteiro, pronto para colar junto com o seu vídeo."
          contentNote="São 11 seções de direção: briefing, referência visual, montagem, vocabulário de cenas, motion, 3D, tipografia, som, multicâmera, provas e checklist de entrega."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Cole junto com o vídeo
              </p>
              <h2 className="text-2xl font-bold tracking-tight">O prompt mestre</h2>
            </div>
            <button
              onClick={copiar}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: ACCENT, color: "#1a2400" }}
            >
              {copiado ? (
                <>
                  <Check className="h-4 w-4" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copiar prompt
                </>
              )}
            </button>
          </div>
          {falhou && (
            <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
              Seu navegador bloqueou a cópia. Selecione o texto abaixo e copie com Ctrl+C ou Cmd+C.
            </p>
          )}
          <pre className="max-h-[32rem] select-all overflow-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 text-[12.5px] leading-relaxed text-[#ccc] whitespace-pre-wrap font-mono">
            {PROMPT}
          </pre>
        </section>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Quer a parte técnica também?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Este prompt trata das decisões de direção. Para o pipeline que executa, com FFmpeg, Whisper
          e Remotion, existe outro em{" "}
          <a
            href="/xquads/editordevideos"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/editordevideos
          </a>
          . Os dois se completam.
        </p>
      </section>

      <SalesCta utmContent="editordevideosia" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
