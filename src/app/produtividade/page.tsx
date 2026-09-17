"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Check, Copy, Search, Zap } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#818CF8";

const CODES: [string, string, string, string][] = [
  // Estudo
  ["/mindmap", "mapa mental", "Abre o conteúdo em ramos, do conceito central para as pontas.", "Estudo"],
  ["/sketchnote", "sketchnote", "Resumo visual com blocos, setas e ícones, do jeito que se anota à mão.", "Estudo"],
  ["/flashcards", "flashcards", "Cartões de pergunta e resposta prontos para memorização espaçada.", "Estudo"],
  ["/resumo", "resumo executivo", "Só o que sobrevive ao corte: as ideias que mudam alguma coisa.", "Estudo"],
  ["/questoes", "banco de questões", "Perguntas de prova com gabarito e explicação de cada alternativa.", "Estudo"],
  ["/feynman", "explicação para leigo", "Reescreve sem jargão, como se explicasse para quem nunca viu o assunto.", "Estudo"],
  ["/cronograma", "cronograma de estudo", "Divide o material em sessões, com o que cai em cada dia.", "Estudo"],
  ["/revisao", "plano de revisão", "Calendário de revisão espaçada para o conteúdo não escapar.", "Estudo"],
  ["/glossario", "glossário", "Os termos técnicos do material com definição curta e exemplo.", "Estudo"],
  ["/linhadotempo", "linha do tempo", "Coloca fatos, datas e causas em ordem.", "Estudo"],
  ["/comparativo", "quadro comparativo", "Tabela contrastando os conceitos que costumam ser confundidos.", "Estudo"],
  ["/simulado", "simulado", "Prova completa com tempo sugerido e correção comentada.", "Estudo"],

  // Escrita
  ["/reescreve", "reescrita mais clara", "Mesmo conteúdo, frases curtas e sem enrolação.", "Escrita"],
  ["/encurta", "versão curta", "Corta pela metade mantendo o argumento em pé.", "Escrita"],
  ["/email", "e-mail profissional", "Transforma a anotação solta em mensagem pronta para enviar.", "Escrita"],
  ["/post", "post para rede social", "Adapta o conteúdo ao ritmo e ao tamanho do feed.", "Escrita"],
  ["/roteiro", "roteiro de vídeo", "Estrutura em gancho, desenvolvimento e fechamento com chamada.", "Escrita"],
  ["/tom", "ajuste de tom", "Mesma mensagem no registro que você pedir: formal, direto ou próximo.", "Escrita"],
  ["/titulos", "opções de título", "Dez variações testáveis, cada uma com um ângulo diferente.", "Escrita"],
  ["/revisor", "revisão de texto", "Aponta erro, repetição, frase truncada e trecho confuso.", "Escrita"],

  // Reunião
  ["/ata", "ata de reunião", "Registro formal do que foi tratado, na ordem em que aconteceu.", "Reunião"],
  ["/acoes", "lista de ações", "O que ficou combinado, com responsável e prazo de cada item.", "Reunião"],
  ["/follow", "e-mail de follow-up", "Resumo e próximos passos prontos para mandar a quem participou.", "Reunião"],
  ["/pauta", "pauta de reunião", "Agenda com tempo por tópico e o objetivo de cada bloco.", "Reunião"],
  ["/decisoes", "registro de decisões", "Isola o que foi decidido, por quem e com base em quê.", "Reunião"],
  ["/transcricao", "transcrição organizada", "Limpa os vícios de fala e separa a conversa por assunto.", "Reunião"],

  // Análise
  ["/swot", "matriz SWOT", "Forças, fraquezas, oportunidades e ameaças tiradas do próprio material.", "Análise"],
  ["/planilha", "planilha estruturada", "Converte dado solto em tabela com colunas que fazem sentido.", "Análise"],
  ["/grafico", "sugestão de gráfico", "Indica qual visualização conta a história desses dados.", "Análise"],
  ["/contrato", "leitura de contrato", "Destaca cláusula de risco, prazo, multa e renovação automática.", "Análise"],
  ["/riscos", "mapa de riscos", "O que pode dar errado, com chance de acontecer e impacto.", "Análise"],
  ["/numeros", "extração de números", "Puxa todo dado numérico do material e organiza em tabela.", "Análise"],
  ["/checklist", "checklist de conferência", "Vira lista verificável, item por item, sem pular etapa.", "Análise"],
  ["/critica", "crítica construtiva", "Aponta os pontos fracos e o que fazer com cada um.", "Análise"],

  // Planejamento
  ["/okr", "OKR", "Objetivo com resultados-chave que dá para medir no fim do período.", "Planejamento"],
  ["/roadmap", "roadmap", "Sequência de entregas por período, com o que depende do quê.", "Planejamento"],
  ["/sprint", "plano de sprint", "Quebra o trabalho em ciclo curto com entrega no fim.", "Planejamento"],
  ["/brief", "briefing de projeto", "Documento de partida com contexto, objetivo e restrição.", "Planejamento"],
  ["/orcamento", "orçamento estimado", "Custo por item, com o que é fixo e o que varia.", "Planejamento"],
  ["/processo", "passo a passo", "Transforma o jeito bagunçado de fazer em procedimento repetível.", "Planejamento"],
  ["/prioridade", "matriz de prioridade", "Ordena por urgência e importância, e diz o que cortar.", "Planejamento"],
  ["/metas", "desdobramento de metas", "Quebra a meta grande em etapas do tamanho de uma semana.", "Planejamento"],

  // Organização
  ["/notas", "notas organizadas", "Anotação bagunçada vira tópico, subtópico e pendência.", "Organização"],
  ["/tarefas", "lista de tarefas", "Extrai tudo que virou tarefa e separa por contexto.", "Organização"],
  ["/agenda", "bloco de agenda", "Distribui as tarefas nos horários da semana, com folga real.", "Organização"],
  ["/pastas", "estrutura de pastas", "Propõe a organização de arquivos e onde cada coisa mora.", "Organização"],
  ["/indice", "índice navegável", "Sumário do material com o que tem em cada parte.", "Organização"],
  ["/tags", "etiquetas", "Marcadores para catalogar e reencontrar o material depois.", "Organização"],
  ["/diario", "registro do dia", "Formata o dia em entrada de diário de trabalho.", "Organização"],
  ["/semana", "retrospectiva da semana", "O que andou, o que travou e o que entra na próxima.", "Organização"],
];

export default function ProdutividadePage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copiado, setCopiado] = useState("");
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const categorias = useMemo(
    () => ["Todos", ...Array.from(new Set(CODES.map((c) => c[3])))],
    []
  );

  const visiveis = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CODES.filter(
      (c) =>
        (categoria === "Todos" || c[3] === categoria) &&
        (!q || `${c[0]} ${c[1]} ${c[2]} ${c[3]}`.toLowerCase().includes(q))
    );
  }, [query, categoria]);

  const montarPrompt = (item: (typeof CODES)[number]) =>
    `${item[0]}\n\nA partir do material abaixo, entregue: ${item[1]}.\n${item[2]}\n\nMaterial: [COLE O TEXTO, ANEXE A FOTO OU O ARQUIVO]\nFormato de saída: [COMO VOCÊ QUER RECEBER]\n\nSe faltar informação para fazer bem feito, me faça até 3 perguntas antes de começar.`;

  const copiar = async (item: (typeof CODES)[number]) => {
    const texto = montarPrompt(item);
    const legado = () => {
      const campo = document.createElement("textarea");
      campo.value = texto;
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
      await navigator.clipboard.writeText(texto);
      ok = true;
    } catch {
      ok = legado();
    }
    setCopiado(ok ? item[0] : "erro");
    setTimeout(() => setCopiado(""), ok ? 1800 : 5000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, os códigos ficam protegidos.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Zap className="h-4 w-4" />
          Biblioteca de produtividade
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          <span style={{ color: ACCENT }}>50 códigos</span> que transformam qualquer material em
          algo pronto
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Fotografe a página do livro, jogue a gravação da reunião ou cole o documento. Escreva o
          código e receba no formato que você precisa.
        </p>
        <div className="mx-auto max-w-xl rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4 text-left font-mono text-xs text-[#aaa]">
          <span style={{ color: ACCENT }}>/mindmap</span> foto do capítulo → mapa mental do conteúdo
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          ["1", "Anexe o material", "Foto, PDF, áudio, link ou texto colado."],
          ["2", "Escreva o código", "Cada um entrega um formato diferente."],
          ["3", "Diga como quer", "Tabela, lista, documento ou cartões."],
        ].map(([n, titulo, texto]) => (
          <article key={n} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
              style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
            >
              {n}
            </span>
            <h2 className="mt-3 font-semibold">{titulo}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#999]">{texto}</p>
          </article>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="produtividade-page"
          accent={ACCENT}
          buttonTextColor="#11132e"
          title="Receba os 50 códigos completos"
          description="Preencha seus dados para liberar a busca, os filtros e todos os códigos."
          contentNote="Você vai liberar: 50 códigos em 6 categorias, cada um com o prompt pronto para colar."
          buttonLabel="Desbloquear os 50 códigos"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Escolha o formato
              </p>
              <h2 className="text-2xl font-bold">Biblioteca de códigos</h2>
            </div>
            <span className="text-xs font-mono text-[#666]">{visiveis.length} códigos</span>
          </div>

          <div className="sticky top-2 z-10 space-y-2 rounded-xl border border-[#2a2a2e] bg-[#121214]/95 p-3 backdrop-blur">
            <label className="flex items-center gap-2 rounded-lg border border-[#2a2a2e] bg-[#0e0e10] px-3">
              <Search className="h-4 w-4 text-[#666]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque: reunião, estudo, contrato..."
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </label>
            <div className="flex gap-2 overflow-x-auto">
              {categorias.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoria(c)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    categoria === c ? "" : "border-[#2a2a2e] text-[#777]"
                  }`}
                  style={
                    categoria === c
                      ? {
                          borderColor: `${ACCENT}80`,
                          backgroundColor: `${ACCENT}1A`,
                          color: ACCENT,
                        }
                      : undefined
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {copiado === "erro" && (
            <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
              Seu navegador bloqueou a cópia. Toque no código e copie manualmente.
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {visiveis.map((item) => (
              <article
                key={item[0]}
                className="flex min-h-48 flex-col rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5 transition-colors hover:border-[#818CF8]/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <code className="text-sm font-semibold" style={{ color: ACCENT }}>
                    {item[0]}
                  </code>
                  <span className="rounded-full bg-white/5 px-2 py-1 text-[9px] font-mono text-[#666]">
                    {item[3]}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold capitalize">{item[1]}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{item[2]}</p>
                <button
                  onClick={() => copiar(item)}
                  className="mt-auto self-start rounded-md border px-3 py-2 text-xs transition-opacity hover:opacity-80 cursor-pointer"
                  style={{
                    borderColor: `${ACCENT}33`,
                    backgroundColor: `${ACCENT}0D`,
                    color: ACCENT,
                  }}
                >
                  {copiado === item[0] ? (
                    <>
                      <Check className="inline h-3.5 w-3.5" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="inline h-3.5 w-3.5" /> Copiar código
                    </>
                  )}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      <SalesCta utmContent="produtividade" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
