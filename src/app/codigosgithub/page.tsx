"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Github, Lock, Sparkles } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#34D399";

type Codigo = { dominio: string; entrega: string; login?: boolean };

const DIRETO: Codigo[] = [
  { dominio: "gitdiagram.com", entrega: "Diagrama interativo da arquitetura do projeto." },
  { dominio: "gitingest.com", entrega: "O repositório inteiro virado texto, pronto para colar numa IA." },
  { dominio: "deepwiki.com", entrega: "Documentação do projeto gerada por IA, navegável." },
  { dominio: "github1s.com", entrega: "O código aberto num VS Code dentro do navegador." },
  { dominio: "gitmcp.io", entrega: "Um servidor MCP daquele repositório, para plugar no seu agente." },
  { dominio: "githubbox.com", entrega: "O projeto rodando no CodeSandbox, sem instalar nada." },
  { dominio: "github.gg", entrega: "Análise do código com scorecard e vulnerabilidades." },
  { dominio: "gitsummarize.com", entrega: "Resumo técnico do que o projeto faz e como." },
  { dominio: "zread.ai", entrega: "Leitura guiada do código, por onde começar a entender." },
  { dominio: "githubtracker.com", entrega: "A atividade do repositório ao longo do tempo." },
];

const COM_LOGIN: Codigo[] = [
  { dominio: "uithub.com", entrega: "Código formatado como prompt, otimizado para LLM.", login: true },
  { dominio: "gitpodcast.com", entrega: "Um podcast explicando o repositório.", login: true },
  { dominio: "gitmvp.com", entrega: "Análise do repositório com IA.", login: true },
];

const OUTROS = [
  { formato: "github.dev/owner/repo", entrega: "VS Code oficial do GitHub. Aqui você troca só o .com por .dev, ou aperta a tecla ponto dentro do repositório." },
  { formato: "star-history.com/#owner/repo", entrega: "O histórico de estrelas em gráfico. Repare na cerquilha antes do caminho." },
  { formato: "gitpod.io/#https://github.com/owner/repo", entrega: "Ambiente de desenvolvimento na nuvem. A URL do GitHub vai inteira depois da cerquilha." },
  { formato: "github.githistory.xyz/owner/repo/blob/...", entrega: "A evolução de um arquivo ao longo dos commits. Funciona no caminho de um arquivo, não do repositório." },
];

export default function CodigosGithubPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const caminho = useMemo(() => {
    const m = repoUrl.trim().match(/github\.com\/([^/\s?#]+\/[^/\s?#]+)/i);
    if (m) return m[1].replace(/\.git$/, "");
    const direto = repoUrl.trim().match(/^([\w.-]+\/[\w.-]+)$/);
    return direto ? direto[1] : "";
  }, [repoUrl]);

  const alvo = caminho || "owner/repo";

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
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
          <Github className="h-4 w-4" />
          Códigos secretos
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Troque uma palavra na URL do GitHub e o{" "}
          <span style={{ color: ACCENT }}>repositório vira outra coisa</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Você está num repositório, troca <span className="font-mono">github.com</span> por outro
          domínio e recebe um diagrama, uma documentação inteira ou o código pronto para colar numa
          IA. Mesmo caminho depois da barra.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 font-mono text-xs sm:text-sm">
        <p className="text-[#666]">github.com/facebook/react</p>
        <p className="mt-2">
          <span style={{ color: ACCENT }}>gitdiagram.com</span>
          <span className="text-[#888]">/facebook/react</span>
          <span className="ml-2 text-[#555]">→ o diagrama do projeto</span>
        </p>
        <p className="mt-1">
          <span style={{ color: ACCENT }}>gitingest.com</span>
          <span className="text-[#888]">/facebook/react</span>
          <span className="ml-2 text-[#555]">→ o código todo em texto</span>
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="codigosgithub-page"
          accent={ACCENT}
          buttonTextColor="#032b1e"
          title="Receba os 17 códigos"
          description="Preencha seus dados para liberar a lista completa e o montador de links."
          contentNote="Você vai liberar: 17 códigos testados um a um, com aviso de quais pedem login, mais um campo onde você cola seu repositório e recebe todos os links prontos."
          buttonLabel="Liberar os códigos"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-10">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Sparkles className="h-5 w-5" style={{ color: ACCENT }} />
              Cole um repositório e receba os links prontos
            </h2>
            <input
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/facebook/react"
              className="w-full rounded-lg border border-[#2a2a2e] bg-[#0e0e10] px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-[#34D399]/50"
            />
            <p className="text-xs text-[#666]">
              {caminho
                ? `Detectado: ${caminho}. Os links abaixo já estão apontando para ele.`
                : "Sem nada colado, os links abaixo mostram o formato genérico."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Funcionam direto</h2>
            <p className="text-sm text-[#888]">Sem cadastro, sem login. Abre e usa.</p>
            <div className="space-y-2">
              {DIRETO.map((c) => (
                <a
                  key={c.dominio}
                  href={`https://${c.dominio}/${alvo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4 transition-colors hover:border-[#34D399]/40"
                >
                  <div className="min-w-0 flex-1">
                    <code className="text-sm font-semibold" style={{ color: ACCENT }}>
                      {c.dominio}
                    </code>
                    <p className="mt-1 text-sm leading-relaxed text-[#999]">{c.entrega}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#555] transition-colors group-hover:text-[#34D399]" />
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Lock className="h-5 w-5" style={{ color: ACCENT }} />
              Funcionam, mas pedem login
            </h2>
            <p className="text-sm text-[#888]">
              Entregam bem, só exigem entrar com a conta do GitHub antes.
            </p>
            <div className="space-y-2">
              {COM_LOGIN.map((c) => (
                <a
                  key={c.dominio}
                  href={`https://${c.dominio}/${alvo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4 transition-colors hover:border-[#34D399]/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="text-sm font-semibold" style={{ color: ACCENT }}>
                        {c.dominio}
                      </code>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-[#888]">
                        pede login
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#999]">{c.entrega}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#555] transition-colors group-hover:text-[#34D399]" />
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Os que fogem do padrão</h2>
            <p className="text-sm text-[#888]">
              Estes não são substituição simples. Repare no formato de cada um.
            </p>
            <div className="space-y-2">
              {OUTROS.map((o) => (
                <article
                  key={o.formato}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
                >
                  <code className="block break-all text-sm font-semibold" style={{ color: ACCENT }}>
                    {o.formato}
                  </code>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{o.entrega}</p>
                </article>
              ))}
            </div>
          </section>

          <p className="text-xs leading-relaxed text-[#666]">
            Todos os domínios foram abertos e conferidos com um repositório real em 21 de setembro de
            2026. São serviços independentes e gratuitos, então algum pode sair do ar. O padrão de
            substituição continua valendo mesmo quando um cai.
          </p>
        </div>
      )}

      <SalesCta utmContent="codigosgithub" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
