"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, PenLine, ClipboardPaste, MessageSquare } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#E879F9";

const PROMPT = `SIGA SEMPRE ESTE ESTILO DE ESCRITA:

* DEVE usar linguagem clara e simples.
* DEVE usar frases curtas e impactantes.
* DEVE usar voz ativa. Evite voz passiva.
* DEVE focar em insights práticos e acionáveis.
* DEVE usar listas com marcadores em posts de redes sociais.
* DEVE usar dados e exemplos específicos para sustentar afirmações sempre que possível.
* DEVE usar "você" e "seu/sua" para se dirigir diretamente ao leitor.
* DEVE variar o comprimento e a estrutura das frases naturalmente.
* DEVE preferir substantivos específicos, números, exemplos e ações em vez de linguagem abstrata.
* DEVE soar como uma pessoa com ponto de vista, não como um mecanismo neutro de resumo.
* EVITE usar travessões em qualquer parte da resposta. Use vírgulas, pontos, parênteses ou outra pontuação padrão.
* EVITE ponto e vírgula.
* EVITE construções como "não só X, mas também Y."
* EVITE construções como "Não é X. É Y."
* EVITE fórmulas repetitivas de contraste como "Enquanto X, Y" ao longo da resposta.
* EVITE metáforas e clichês.
* EVITE generalizações amplas.
* EVITE frases de abertura comuns como "Em conclusão," "Para finalizar," "O principal ponto," ou similares.
* EVITE avisos ou observações sobre o resultado. Entregue o que foi pedido.
* EVITE adjetivos e advérbios desnecessários.
* EVITE hashtags.
* EVITE markdown, como títulos com #, negrito com ** e links em colchetes.
* EVITE asteriscos para ênfase. Quando a lista de rede social pedir marcador, use hífen ou o caractere •.
* EVITE repetir a mesma ideia na introdução, no corpo e na conclusão.
* EVITE repetir a pergunta do usuário antes de responder.
* EVITE resumir sua própria resposta no final, a menos que solicitado.
* EVITE transições excessivas entre parágrafos ou marcadores.
* EVITE começar vários parágrafos com a mesma estrutura gramatical.
* EVITE fazer todos os parágrafos com tamanho parecido.
* EVITE fazer todas as frases com tamanho parecido.
* EVITE listas excessivamente simétricas em que cada item segue exatamente o mesmo padrão.
* EVITE grupos forçados de três, a menos que três itens realmente façam sentido.
* EVITE títulos e subtítulos excessivos.
* EVITE títulos genéricos como "Principais Pontos," "Por Que Isso Importa," "Benefícios," ou "Considerações Finais," a menos que solicitado.
* EVITE perguntas retóricas usadas como transição.
* EVITE transições artificialmente conversacionais como "Aqui está a questão," "É aqui que fica interessante," "Pense nisso," ou "Deixe isso te marcar."
* EVITE fragmentos dramáticos de uma linha inseridos apenas para dar ênfase.
* EVITE explicações parentéticas excessivas.
* EVITE qualificações e ressalvas excessivas.
* EVITE linguagem corporativa polida quando a linguagem comum já funciona.
* EVITE afirmações genéricas sem um exemplo concreto, motivo, número, pessoa, evento ou ação.
* EVITE repetir palavras ou expressões quando existe uma alternativa natural.
* EVITE variação artificial de vocabulário quando um termo repetido soaria mais natural.
* EVITE tratar os dois lados de uma questão como igualmente importantes quando as evidências pendem para um lado.
* EVITE encerrar seções com afirmações genéricas inspiracionais ou reflexivas.
* EVITE frases de preenchimento cujo único propósito é fazer a transição para o próximo ponto.
* EVITE explicar implicações óbvias.
* EVITE soar excessivamente completo, exaustivo, equilibrado ou higienizado.
* EVITE adicionar contexto que o leitor não precisa para entender a resposta.
* EVITE estas palavras:

"pode, apenas, muito, realmente, literalmente, na verdade, certamente, provavelmente, basicamente, poderia, talvez, aprofundar, embarcar, esclarecedor, estimado, lançar luz, criar, elaborar, imaginar, universo, revolucionário no jogo, desbloquear, descobrir, disparar, abismo, não está sozinho, em um mundo onde, revolucionar, disruptivo, utilizar, mergulhar fundo, tapeçaria, iluminar, revelar, fundamental, intrincado, elucidar, portanto, além disso, contudo, aproveitar, empolgante, inovador, de ponta, notável, isso, resta saber, vislumbre, navegar, panorama, marcante, testemunho, em resumo, em conclusão, ademais, impulsionar, disparada, se abriu, poderoso, questionamentos, em constante evolução"

IMPORTANTE:
Revise sua resposta e garanta que não haja travessões!
Se várias frases consecutivas tiverem comprimento ou estrutura parecidos, reescreva algumas delas.
Prefira variação natural sutil em vez de consistência estrutural perfeita`;

const ONDE_COLAR = [
  {
    titulo: "ChatGPT",
    caminho: "Configurações, Personalização, Instruções personalizadas",
    detalhe: "Cole no campo de como o ChatGPT deve responder. Vale para todas as conversas novas.",
  },
  {
    titulo: "Claude",
    caminho: "Settings, Profile ou dentro de um Project",
    detalhe: "No Project, cole nas instruções. Só as conversas daquele Project seguem o estilo.",
  },
  {
    titulo: "Uma conversa só",
    caminho: "Primeira mensagem do chat",
    detalhe: "Cole e escreva o pedido embaixo. Serve para testar antes de fixar.",
  },
];

const ANTES = `Em um mundo onde a comunicação digital está em constante evolução, é fundamental compreender que o e-mail marketing continua sendo uma ferramenta poderosa. Não se trata apenas de enviar mensagens, mas sim de construir relacionamentos duradouros com sua audiência. Vamos mergulhar fundo nas estratégias que podem revolucionar seus resultados.`;

const DEPOIS = `E-mail continua vendendo mais do que rede social, e o motivo é chato: você é dono da lista. Nenhuma mudança de algoritmo derruba seu alcance da noite para o dia.

Comece pelo assunto. Escreva dois, dispare cada um para 10% da base, mande o vencedor para o resto.

Quando a abertura cai e o clique se mantém, o problema está no assunto. Quando a abertura sobe e ninguém clica, está na oferta.`;

export default function EscritaHumanaPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const storedLead = useSyncExternalStore(
    () => () => {},
    () => hasCapturedLead(),
    () => false
  );
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const copyPrompt = async () => {
    const legacyCopy = () => {
      const field = document.createElement("textarea");
      field.value = PROMPT;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "0";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(field);
      return ok;
    };

    let ok = false;
    try {
      if (!navigator.clipboard) throw new Error("clipboard indisponível");
      await navigator.clipboard.writeText(PROMPT);
      ok = true;
    } catch {
      ok = legacyCopy();
    }

    if (!ok) {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 6000);
      return;
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o prompt fica protegido pelo formulário.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <PenLine className="h-4 w-4" />
          Prompt de estilo
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O prompt que tira a{" "}
          <span style={{ color: ACCENT }}>cara de robô</span> do ChatGPT e do Claude
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Cole uma vez nas instruções. A IA para de abrir com &quot;em um mundo onde&quot;,
          para de encher de travessão e passa a escrever como gente.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">A diferença</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#666]">
              Sem o prompt
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#8a8a8a]">{ANTES}</p>
          </article>
          <article
            className="rounded-xl border bg-[#1a1a1d] p-5"
            style={{ borderColor: `${ACCENT}4D` }}
          >
            <p
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: ACCENT }}
            >
              Com o prompt
            </p>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#ddd]">
              {DEPOIS}
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <ClipboardPaste className="h-5 w-5" style={{ color: ACCENT }} />
          Onde colar
        </h2>
        <div className="space-y-3">
          {ONDE_COLAR.map((item) => (
            <article
              key={item.titulo}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold">{item.titulo}</h3>
                <code className="text-xs font-mono text-[#777]">{item.caminho}</code>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#999]">{item.detalhe}</p>
            </article>
          ))}
        </div>
        <p className="text-sm text-[#777] leading-relaxed">
          Depois de colar, peça qualquer texto normalmente. Se a resposta escapar do estilo,
          responda &quot;reescreve seguindo as regras de estilo&quot; e ela volta ao padrão.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="escritahumana-page"
          accent={ACCENT}
          buttonTextColor="#2a0a2e"
          title="Receba o prompt completo"
          description="Preencha seus dados para liberar o prompt inteiro, pronto para copiar."
          buttonLabel="Liberar o prompt"
          contentNote="São 50 regras de estilo mais a lista de palavras que entregam a IA."
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
                Copie e cole
              </p>
              <h2 className="text-2xl font-bold tracking-tight">O prompt</h2>
            </div>
            <button
              onClick={copyPrompt}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: ACCENT, color: "#2a0a2e" }}
            >
              {copied ? (
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
          {copyFailed && (
            <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
              Seu navegador bloqueou a cópia automática. Selecione o texto abaixo e copie
              com Ctrl+C (ou Cmd+C no Mac).
            </p>
          )}
          <pre className="max-h-[28rem] select-all overflow-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 text-[13px] leading-relaxed text-[#ccc] whitespace-pre-wrap font-mono">
            {PROMPT}
          </pre>
        </section>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="h-4 w-4" style={{ color: ACCENT }} />
          Usa Claude Code no terminal?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Este prompt resolve o chat. Para o Claude Code, existe a versão em skill, que
          aciona sozinha toda vez que ele escreve algo. Está em{" "}
          <a
            href="/xquads/humano"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/humano
          </a>
          .
        </p>
      </section>

      <SalesCta utmContent="escritahumana" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
