"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Wifi, Search, Wrench, ShieldCheck, KeyRound, AlertTriangle, Plug } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#38BDF8";

const PROMPT_1 = `Você vai me ajudar a descobrir por que a MINHA rede Wi-Fi de casa está lenta. Estou no [Mac / Windows].

Antes de qualquer coisa, meça a velocidade atual e anote o número — vamos comparar no fim.

Depois investigue e me traga, em lista, o que está atrapalhando:

- programas e serviços rodando aqui no computador consumindo banda em segundo plano, com quanto cada um está usando
- o canal em que meu Wi-Fi está e quais canais as redes vizinhas ocupam, para ver se estão disputando o mesmo
- a qualidade do sinal onde eu estou, e se o problema é distância ou interferência
- se estou conectado em 2.4 GHz ou 5 GHz, e se faz sentido trocar

Para cada item, diga qual é a evidência: o número que você mediu ou o que você leu. Se for suposição, diga que é suposição.

Não altere nada ainda. Primeiro me mostre o diagnóstico e espere eu aprovar.`;

const PROMPT_2 = `Pode corrigir o que encontrou, seguindo estas regras:

1. Comece pelo que é mais fácil de desfazer (fechar programa, trocar de banda) e deixe por último o que mexe na configuração do roteador.
2. Antes de cada mudança, me diga em uma linha o que ela faz e o que acontece se der errado.
3. Qualquer coisa que vá derrubar a conexão da casa, mesmo por alguns segundos, me avise ANTES e espere eu confirmar.
4. Não mude a senha da rede, não troque o nome do Wi-Fi e não restaure o roteador para o padrão de fábrica.
5. Anote o que você alterou, para eu conseguir voltar atrás depois.

No fim, meça a velocidade de novo e compare com o número do começo.`;

const PROMPT_3 = `Agora liste TODOS os aparelhos conectados na minha rede Wi-Fi.

Para cada um, me diga:

- o nome que ele apresenta na rede
- o fabricante, identificado pelo endereço físico (MAC)
- há quanto tempo está conectado e se está usando banda agora

Separe em dois grupos: os que dá para identificar com segurança (celular, notebook, TV, console) e os que você não conseguiu identificar.

Importante: NÃO remova, não bloqueie e não altere nada. Vários aparelhos de casa aparecem com nome estranho — televisão, aspirador, lâmpada, câmera, babá eletrônica. Só me mostre a lista com o que você descobriu de cada um, que eu digo o que fazer.`;

const CUIDADOS = [
  {
    icone: KeyRound,
    nome: "A senha do roteador é a chave da casa",
    texto:
      "Ela costuma estar numa etiqueta atrás do aparelho, e não é a mesma do Wi-Fi. Use no seu computador e pronto: não mande em print, não cole em chat público nem em grupo.",
  },
  {
    icone: AlertTriangle,
    nome: "Configuração errada derruba a internet de todo mundo",
    texto:
      "Se tem mais gente em casa trabalhando ou estudando, faça num horário que não atrapalhe. O prompt de correção manda avisar antes de qualquer coisa que corte a conexão.",
  },
  {
    icone: Plug,
    nome: "\"Não reconheço esse aparelho\" engana",
    texto:
      "TV, aspirador, lâmpada inteligente e babá eletrônica aparecem com nome esquisito. Por isso o terceiro prompt manda listar e explicar, nunca remover sozinho — quem decide é você.",
  },
];

function CopyButton({ text }: { text: string }) {
  const [estado, setEstado] = useState<"parado" | "copiado" | "erro">("parado");
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setEstado("copiado");
    } catch {
      setEstado("erro");
    }
    setTimeout(() => setEstado("parado"), 3000);
  };
  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={copiar}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#38BDF8]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar prompt
          </>
        )}
      </button>
      {estado === "erro" && (
        <span className="text-xs text-[#FCA5A5]">
          Seu navegador bloqueou a cópia. Selecione o texto abaixo e copie na mão.
        </span>
      )}
    </div>
  );
}

const PASSOS = [
  {
    n: "1",
    icone: Search,
    titulo: "Diagnóstico: descobrir o que está travando",
    texto:
      "Abra o Claude, escolha o modo Code e cole o prompt abaixo. Ele vai pedir a senha do roteador — é a da etiqueta atrás do aparelho. A diferença para o prompt original: aqui ele mede a velocidade antes, mostra a evidência de cada problema e fica proibido de mexer em nada sem a sua autorização.",
    prompt: PROMPT_1,
  },
  {
    n: "2",
    icone: Wrench,
    titulo: "Correção: deixar ele arrumar, com regras",
    texto:
      "No vídeo esse passo foi só um \"sim\". Virou prompt próprio, porque é aqui que dá para quebrar alguma coisa. Ele aplica do mais reversível para o mais arriscado, avisa antes do que derruba a conexão e anota tudo para você voltar atrás.",
    prompt: PROMPT_2,
  },
  {
    n: "3",
    icone: ShieldCheck,
    titulo: "Privacidade: quem mais está na sua rede",
    texto:
      "O truque do fim do vídeo. A mudança importante: em vez de mandar selecionar o que ele não reconhece, aqui ele identifica o fabricante de cada aparelho e entrega a lista separada. Remover é decisão sua, depois de olhar.",
    prompt: PROMPT_3,
  },
];

export default function WifiPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o acesso fica protegido.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Wifi className="h-4 w-4" />
          Os prompts do vídeo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Pedi para o Claude consertar meu Wi-Fi.{" "}
          <span style={{ color: ACCENT }}>Ficou duas vezes mais rápido</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Ele achou os programas comendo banda em segundo plano, viu que o Wi-Fi dos vizinhos
          disputava o mesmo canal e ainda encontrou dois aparelhos na minha rede que eu não
          conhecia. Levou menos de dez minutos.
        </p>
        <p className="mx-auto max-w-xl text-sm text-[#777] leading-relaxed">
          Esse foi o meu resultado, na minha casa. O seu depende do seu roteador, do seu plano e
          de quantos vizinhos estão em volta — mas o diagnóstico vale para qualquer rede.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Antes de começar, três avisos</h2>
        <div className="space-y-3">
          {CUIDADOS.map((c) => (
            <article key={c.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <c.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {c.nome}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{c.texto}</p>
            </article>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[#777]">
          Tudo aqui é para a <strong className="text-[#999]">sua própria rede</strong>, aquela cujo
          roteador está na sua casa e cuja senha é sua.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="wifi-page"
          accent={ACCENT}
          buttonTextColor="#052330"
          title="Receba os três prompts"
          description="Preencha seus dados para liberar o passo a passo completo."
          contentNote="Você vai liberar: os três prompts prontos para copiar — diagnóstico, correção e lista de aparelhos — com o que mudou em cada um."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-4">
          {PASSOS.map((p) => (
            <article
              key={p.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold"
                style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
              >
                {p.n}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <p.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {p.titulo}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
                <div className="mt-3 space-y-2">
                  <CopyButton text={p.prompt} />
                  <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                    <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                      {p.prompt}
                    </pre>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Se a internet piorar depois</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Peça para ele desfazer a última alteração — por isso o segundo prompt manda anotar
              tudo que mudou. Se mesmo assim não voltar, desligar o roteador da tomada por trinta
              segundos resolve a maioria dos casos.
            </p>
          </section>
        </div>
      )}

      <SalesCta utmContent="wifi" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
