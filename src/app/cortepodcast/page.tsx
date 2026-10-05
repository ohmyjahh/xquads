"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Scissors, Search, FolderOpen, Send, Eye, Terminal } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FDE047";

const PROMPT_ESTUDO = `Vou te mandar cortes de podcast que viralizaram. Estude todos e me devolva um manual do que faz esses cortes funcionarem.

Para cada corte, analise:
- O gancho: o que acontece nos 3 primeiros segundos e qual é a frase exata que abre
- O tema e o tipo de tensão que sustenta o corte: discordância, confissão, número que surpreende, opinião contra o senso comum
- A duração total e em que segundo está a virada
- A legenda: tamanho, posição, se destaca alguma palavra, se acompanha a fala palavra por palavra
- O ritmo de corte e o que muda de plano
- O que segura a pessoa depois dos 10 segundos
- Como termina: corte seco, conclusão fechada ou pergunta no ar

Depois junte tudo num padrão. Separe o que se repete na maioria do que apareceu em só um ou dois. Quero saber o que é regra e o que foi exceção.

Entregue no fim um checklist que eu possa usar para avaliar um corte novo antes de publicar, e salve em um arquivo chamado padroes-de-corte.md. Vou usar esse arquivo no próximo passo.

Se algum vídeo não abrir ou você não conseguir assistir de verdade, me diga qual foi, em vez de analisar pelo título ou pela legenda.`;

const PROMPT_EXTRACAO = `Agora vou te dar um episódio longo. Use o padroes-de-corte.md que você escreveu para achar, dentro dele, os trechos com mais chance de funcionar como corte.

Episódio: [COLE O LINK OU ANEXE O ARQUIVO]

O que fazer, nesta ordem:

1. Transcreva o episódio inteiro com marcação de tempo.

2. Encontre os trechos que se sustentam sozinhos, sem precisar que a pessoa tenha visto o resto. Procure: afirmação forte, discordância entre os participantes, história com começo e fim, número que surpreende, confissão, posição contra o senso comum.

3. Para cada candidato, me entregue: tempo de início e fim, a frase que abre, por que ele tem chance segundo o checklist, e uma nota de 0 a 10.

4. Me mostre essa lista antes de editar qualquer coisa. Eu escolho quais quero. Não edite tudo de uma vez.

5. Nos que eu aprovar: corte no tempo exato, formate em 9:16, coloque legenda sincronizada com a fala e corrija erro de transcrição de nome próprio e termo técnico.

6. Salve cada corte numa pasta chamada cortes/, com o nome do arquivo começando pela nota, para eu ver os melhores primeiro.

Não invente trecho que não existe no episódio. Se um corte bom ficar pela metade porque o episódio termina, me avise em vez de entregar cortado.`;

const PASSOS = [
  {
    n: "1",
    icone: Search,
    titulo: "Garimpe cortes que já viralizaram",
    texto: "Junte uma leva de cortes de podcast que foram bem, de preferência do mesmo tipo de conteúdo que você edita. Mande para a IA estudar o que eles têm em comum. Ela devolve um manual e um checklist.",
    temPrompt: true,
  },
  {
    n: "2",
    icone: Scissors,
    titulo: "Mande o episódio longo e peça os cortes",
    texto: "Com o manual na mão, a IA varre o episódio, aponta os trechos com mais chance e dá nota para cada um. Você escolhe quais quer, e só aí ela corta, formata em vertical e legenda.",
    temPrompt: true,
  },
  {
    n: "3",
    icone: Send,
    titulo: "Publique e leia o resultado",
    texto: "Essa parte é sua. Não tem prompt: tem método.",
    temPrompt: false,
  },
];

const PRE_REQUISITOS = [
  {
    icone: Eye,
    titulo: "A IA precisa conseguir assistir aos cortes",
    texto: "Link de rede social muitas vezes não abre para ela. Baixar o vídeo e anexar o arquivo funciona melhor que colar o endereço. O prompt manda avisar quando ela não conseguir abrir algum, em vez de inventar análise pelo título.",
  },
  {
    icone: Terminal,
    titulo: "Para receber os cortes em pasta, precisa de agente com acesso a arquivos",
    texto: "Claude Code, Codex ou Cursor. No chat comum do navegador você recebe a lista dos trechos com tempo e nota, o que já adianta bastante, mas o recorte e a legenda você faz no editor.",
  },
];

const PUBLICACAO = [
  "Publique espaçado, não os sete de uma vez. Um por dia dá leitura do que funcionou; sete juntos competem entre si.",
  "O mesmo corte pode ir para Reels, TikTok e Shorts. São públicos diferentes e um corte morto num pode ir bem no outro.",
  "Teste a primeira linha. Se um corte foi mal, republique com outra abertura antes de descartar o trecho.",
  "Olhe a retenção dos 3 primeiros segundos, não só a visualização. É ali que se decide, e é ali que o checklist do passo 1 se prova certo ou errado.",
  "O que performar, volte para o manual e acrescente. Seu padrões-de-corte.md deve ficar melhor a cada mês.",
];

export default function CortePodcastPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copiado, setCopiado] = useState("");

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const copiar = async (id: string, texto: string) => {
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
    setCopiado(ok ? id : "erro");
    setTimeout(() => setCopiado(""), ok ? 2000 : 5000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, os prompts ficam protegidos.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Scissors className="h-4 w-4" />
          Método em 3 etapas
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          A IA estuda o que viralizou e tira os{" "}
          <span style={{ color: ACCENT }}>cortes do seu podcast</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Primeiro ela aprende o padrão dos cortes que deram certo. Depois varre o episódio inteiro,
          aponta os trechos com mais chance e entrega cortado e legendado.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Como funciona</h2>
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
              <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                <p.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {p.titulo}
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={
                    p.temPrompt
                      ? { backgroundColor: `${ACCENT}1A`, color: ACCENT }
                      : { backgroundColor: "rgba(255,255,255,0.06)", color: "#888" }
                  }
                >
                  {p.temPrompt ? "tem prompt" : "sem prompt"}
                </span>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Antes de começar</h2>
        {PRE_REQUISITOS.map((r) => (
          <article
            key={r.titulo}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <r.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
            <div className="min-w-0">
              <h3 className="font-semibold">{r.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{r.texto}</p>
            </div>
          </article>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="cortepodcast-page"
          accent={ACCENT}
          buttonTextColor="#2a2400"
          title="Receba os 2 prompts"
          description="Preencha seus dados para liberar o prompt de estudo e o de extração dos cortes."
          contentNote="Você vai liberar: o prompt que transforma os cortes virais num manual com checklist, e o que usa esse manual para varrer o seu episódio e entregar os cortes editados."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          {copiado === "erro" && (
            <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
              Seu navegador bloqueou a cópia. Selecione o texto e copie com Ctrl+C ou Cmd+C.
            </p>
          )}

          {[
            { id: "1", etapa: "Etapa 1", titulo: "Prompt do estudo", texto: PROMPT_ESTUDO },
            { id: "2", etapa: "Etapa 2", titulo: "Prompt da extração", texto: PROMPT_EXTRACAO },
          ].map((p) => (
            <section key={p.id} className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    {p.etapa}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">{p.titulo}</h2>
                </div>
                <button
                  onClick={() => copiar(p.id, p.texto)}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: ACCENT, color: "#2a2400" }}
                >
                  {copiado === p.id ? (
                    <>
                      <Check className="h-4 w-4" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copiar
                    </>
                  )}
                </button>
              </div>
              <pre className="select-all overflow-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 text-[13px] leading-relaxed text-[#ccc] whitespace-pre-wrap font-mono">
                {p.texto}
              </pre>
            </section>
          ))}

          <section
            className="rounded-xl border p-5"
            style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
          >
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: ACCENT }}>
              <FolderOpen className="h-5 w-5" />
              Etapa 3: publicar. Aqui não tem prompt
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
              Os cortes estão prontos na pasta. O que decide o resultado agora é como você publica.
            </p>
            <ul className="mt-4 space-y-2">
              {PUBLICACAO.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] px-4 py-3 text-sm leading-relaxed text-[#bbb]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <SalesCta utmContent="cortepodcast" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
