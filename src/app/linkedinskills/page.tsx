"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Linkedin, ShieldCheck, CreditCard, Eye } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#0077B5";
const REPO = "https://github.com/sergebulaev/linkedin-skills";

const SKILLS: [string, string][] = [
  ["Post Writer", "Escreve o post usando 20 fórmulas de gancho, escolhidas pelo objetivo de engajamento."],
  ["Comment Drafter", "Escreve um comentário em qualquer post, a partir da URL dele."],
  ["Reply Handler", "Responde comentários, e varre a thread inteira filtrando os que não valem resposta."],
  ["Post Audit", "Confere o rascunho contra as regras do algoritmo e os padrões de detecção de IA antes de publicar."],
  ["Humanizer", "Tira as marcas de texto gerado por IA: vocabulário denunciador, frases de efeito empilhadas, sinceridade encenada."],
  ["Hook Extractor", "Faz engenharia reversa do gancho de um post viral e devolve o molde em branco para você preencher."],
  ["Content Planner", "Monta sete dias com tema, formato, gancho, horário e em quais posts comentar."],
  ["Engagement Monitor", "Acompanha quem respondeu e agrupa quem curtiu e comentou por tipo de interesse."],
  ["Profile Optimizer", "Reescreve headline, Sobre, Destaques e Experiência."],
  ["Employee Advocacy", "Monta o programa de LinkedIn do time: lançamento, cadência e governança de marca."],
  ["Repurposer", "Transforma conteúdo de outra plataforma em post nativo do LinkedIn."],
  ["Interviewer", "Entrevista você e guarda as respostas num banco de histórias que todas as outras skills leem."],
];

const PONTOS = [
  {
    icone: CreditCard,
    titulo: "Precisa de plano pago do Claude",
    texto: "Pro, Max, Team ou Enterprise, com execução de código ligada. Está escrito no próprio projeto. No plano gratuito não instala.",
  },
  {
    icone: ShieldCheck,
    titulo: "Nada é publicado sem o seu aval",
    texto: "As skills escrevem e param. A publicação é sua, sempre. Não existe modo que posta sozinho.",
  },
  {
    icone: Eye,
    titulo: "O humanizador não promete enganar detector",
    texto: "O autor escreve, com todas as letras, que nenhuma edição consegue isso de forma confiável. O que ele faz é tirar os vícios que um leitor humano percebe.",
  },
];

export default function LinkedinSkillsPage() {
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
          PRÉVIA LOCAL · conteúdo aberto. Em produção, a lista fica protegida.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Linkedin className="h-4 w-4" />
          12 skills, grátis e MIT
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Doze skills que escrevem o seu{" "}
          <span style={{ color: ACCENT }}>LinkedIn na sua voz</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Você instala uma vez e elas ficam disponíveis. Escrevem post, comentário e resposta, montam
          o plano da semana e tiram as marcas de texto de IA antes de você publicar.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">linkedin-skills</h2>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
          >
            4.336 estrelas
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">MIT</span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">
            Claude Code e Codex
          </span>
        </div>
        <p className="mt-3 text-xs text-[#666]">
          Conferido em 8 de outubro de 2026. Último commit do projeto foi no dia anterior, então está
          em manutenção ativa.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que esperar, sem exagero</h2>
        {PONTOS.map((p) => (
          <article
            key={p.titulo}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <p.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
            <div className="min-w-0">
              <h3 className="font-semibold">{p.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
            </div>
          </article>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="linkedinskills-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Receba as 12 skills e o repositório"
          description="Preencha seus dados para liberar a lista completa e o link do projeto."
          contentNote="Você vai liberar: as 12 skills com o que cada uma faz, mais o repositório com as instruções de instalação para Claude Code, Codex e aplicativo de desktop."
          buttonLabel="Liberar as skills"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">As doze</h2>
            <div className="space-y-2">
              {SKILLS.map(([nome, oque]) => (
                <article key={nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
                  <h3 className="font-semibold" style={{ color: ACCENT }}>
                    {nome}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{oque}</p>
                </article>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#777]">
              A Interviewer é a única que funciona para quem nunca postou: ela entrevista você e monta
              o banco de histórias que as outras onze consultam.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#ffffff", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o repositório
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-6 text-center text-xs text-[#777]">
            github.com/sergebulaev/linkedin-skills · instalação no README
          </p>
        </div>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Prefere prompt a instalação?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Se você não quer instalar nada, existe a rotina com três prompts que você cola no agente,
          em{" "}
          <a
            href="/xquads/linkedinauto"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/linkedinauto
          </a>
          . Resolve o mesmo problema por outro caminho.
        </p>
      </section>

      <SalesCta utmContent="linkedinskills" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
