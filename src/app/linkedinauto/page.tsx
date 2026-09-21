"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Repeat, Terminal, TriangleAlert } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#60A5FA";

const PROMPTS = [
  {
    n: "1",
    titulo: "Mapear quem importa no seu nicho",
    quando: "Uma vez só, no começo",
    texto: `Busque no LinkedIn os 10 perfis mais relevantes do mundo no segmento de [SEU NICHO], misturando pessoas e empresas.

Critério de escolha, nesta ordem: quem publica com frequência sobre o tema, quem gera discussão de verdade nos comentários e quem é citado por outros do setor. Número de seguidores é o último critério de desempate, não o primeiro.

Para cada um, me entregue:
- Nome e se é pessoa ou empresa
- A URL do perfil
- Sobre o que costuma publicar
- Com que frequência publica

Salve essa lista num arquivo chamado perfis-referencia.md, porque vou usar ela todos os dias nos próximos passos.

Se não achar 10 que cumpram o critério, me entregue menos e diga por quê. Prefiro 6 bons a 10 com enchimento.`,
  },
  {
    n: "2",
    titulo: "Varrer as últimas 24 horas",
    quando: "Todo dia, antes de escrever",
    texto: `Agora faça a varredura do dia sobre o segmento de [SEU NICHO].

Duas frentes:
1. As principais notícias de mercado mundial do setor nas últimas 24 horas.
2. O que os perfis do arquivo perfis-referencia.md publicaram nas últimas 24 horas. Se eu ainda não tiver o arquivo, use estes: [COLE OS PERFIS AQUI]

Para cada item que encontrar, registre o título, a fonte, o link e a data. Não use nada que você não conseguiu abrir e confirmar: se não tem link, não entra.

Depois selecione os 2 melhores temas. Um tema é bom quando: mexe com quem trabalha no setor, ainda não foi repetido à exaustão, e dá margem para eu ter uma posição própria em vez de só noticiar.

Entregue um resumo de 5 a 8 linhas de cada tema, com o link da fonte e por que você escolheu ele.

Se o dia estiver fraco e não houver dois temas que cumpram o critério, me diga isso com todas as letras e entregue só o que prestar. Não invente relevância para preencher a cota.`,
  },
  {
    n: "3",
    titulo: "Escrever e publicar",
    quando: "Todo dia, depois da varredura",
    texto: `Transforme os dois resumos em dois artigos para o meu LinkedIn.

Estrutura de cada artigo:
- Abertura que entrega o ponto principal nas duas primeiras linhas, porque é o que aparece antes do "ver mais"
- Desenvolvimento com o fato e o contexto, citando a fonte com o link
- Minha posição sobre o assunto, que é o que diferencia de repostar notícia
- Fechamento com uma pergunta ou provocação que dê vontade de comentar

Entre 200 e 400 palavras cada, em português, linguagem direta, sem hashtag e sem emoji.

Sobre imagem: crie uma imagem própria (um card com a frase central, um gráfico simples com o dado da notícia) ou publique sem imagem. Não capture print da matéria de terceiro, porque o conteúdo é de quem publicou. O crédito à fonte vai no corpo do texto, com o link.

Publicação: abra o LinkedIn, clique em "Começar publicação", escreva o texto e publique.

Nos primeiros 7 dias, me mostre o texto final antes de publicar e espere meu OK. Depois desse período, pode publicar direto sem me perguntar.

Se aparecer captcha, pedido de verificação, ou a publicação falhar: pare, não tente de novo em seguida, e me avise o que aconteceu.

No fim, registre num arquivo linkedin-log.md o que foi publicado, a que horas e o link de cada post.

Rotina: faça isso todos os dias nos horários [COLE OS HORÁRIOS AQUI]. Transforme tudo o que combinamos numa tarefa programada diária.`,
  },
];

const AVISOS = [
  {
    icone: Terminal,
    titulo: "Precisa de um agente que controla o navegador",
    texto: "O terceiro prompt manda abrir o LinkedIn e publicar. Isso exige agente com acesso ao navegador. Colado no chat comum, você recebe o texto pronto e publica você mesmo.",
  },
  {
    icone: TriangleAlert,
    titulo: "Texto de IA sem revisão queima seu nome",
    texto: "O LinkedIn já tem denúncia de conteúdo gerado por IA, e seu perfil é profissional. Por isso o prompt 3 pede aprovação nos primeiros 7 dias antes de soltar sozinho.",
  },
];

export default function LinkedinAutoPage() {
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
          <Repeat className="h-4 w-4" />
          Rotina diária
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Seu LinkedIn publicando{" "}
          <span style={{ color: ACCENT }}>todo dia</span>, sem você escrever
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Três prompts encadeados que mapeiam quem importa no seu nicho, varrem as notícias das
          últimas 24 horas e viram dois artigos publicados no seu perfil.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        {PROMPTS.map((p) => (
          <article key={p.n} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
              style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
            >
              {p.n}
            </span>
            <h2 className="mt-3 font-semibold">{p.titulo}</h2>
            <p className="mt-1 text-xs" style={{ color: ACCENT }}>
              {p.quando}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Antes de começar</h2>
        <div className="space-y-2">
          {AVISOS.map((a) => (
            <article
              key={a.titulo}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
            >
              <a.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              <div className="min-w-0">
                <h3 className="font-semibold">{a.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{a.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="linkedinauto-page"
          accent={ACCENT}
          buttonTextColor="#06203f"
          title="Receba os 3 prompts completos"
          description="Preencha seus dados para liberar a sequência inteira, com cada prompt pronto para copiar."
          contentNote="Você vai liberar: o prompt de mapeamento, o de varredura diária e o de redação e publicação, com as regras que impedem a IA de inventar notícia."
          buttonLabel="Liberar os 3 prompts"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          {copiado === "erro" && (
            <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
              Seu navegador bloqueou a cópia. Selecione o texto e copie com Ctrl+C ou Cmd+C.
            </p>
          )}
          {PROMPTS.map((p) => (
            <section key={p.n} className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    Prompt {p.n} · {p.quando}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">{p.titulo}</h2>
                </div>
                <button
                  onClick={() => copiar(p.n, p.texto)}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: ACCENT, color: "#06203f" }}
                >
                  {copiado === p.n ? (
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
          <p className="text-sm leading-relaxed text-[#777]">
            Troque os trechos entre colchetes pelo seu nicho, pelos perfis e pelos horários. O
            prompt 1 você roda uma vez. Os prompts 2 e 3 viram a rotina diária.
          </p>
        </div>
      )}

      <SalesCta utmContent="linkedinauto" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
