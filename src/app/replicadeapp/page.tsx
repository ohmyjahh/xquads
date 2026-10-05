"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Layers, Scale, Globe, Gavel } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#0EA5E9";
const REPO = "https://github.com/Jakeschincariol/replica-skill";

const COMANDOS: [string, string, string][] = [
  ["1", "/replica-recon", "Faz a engenharia reversa: telas, fluxos, componentes e modelo de dados, a partir de páginas públicas, capturas e da sua própria conta."],
  ["2", "/replica-architect", "Planeja a stack, o banco e a API da sua versão."],
  ["3", "/replica-design", "Remonta o sistema de design em tokens: cor, tipografia, espaçamento e componentes, com os seus próprios arquivos."],
  ["4", "/replica-build", "Constrói tela por tela a partir do mapa do recon."],
  ["5", "/replica-backend", "Login, banco, pagamento e integrações."],
  ["6", "/replica-test", "Passa por todos os fluxos procurando bug, e registra por gravidade."],
  ["7", "/replica-diff", "Compara a sua versão com a original e dá uma nota de paridade, dizendo o que falta."],
  ["8", "/replica-entrepreneur", "Lê o que os usuários do app reclamam nas avaliações reais e transforma em correção e ângulo de posicionamento."],
  ["9", "/replica-brand", "Dá nome e marca próprios à sua versão, com checagem de marca registrada."],
  ["10", "/replica-launch", "Página de vendas, preço e ficha para loja de aplicativo."],
  ["11", "/replica-deploy", "Põe no ar no seu domínio."],
];

const LIMITES = [
  {
    icone: Scale,
    titulo: "Reconstrói o que o app faz, nunca o que ele tem",
    texto: "Funcionalidade e padrão de navegação são o alvo. Código-fonte, logo, marca, textos e conteúdo do outro não entram. As próprias skills são escritas para respeitar essa linha.",
  },
  {
    icone: Globe,
    titulo: "Só fonte pública e a sua própria conta",
    texto: "Nada de raspar atrás de login, entrar na conta de outra pessoa ou furar paywall. Catálogo e acervo de um serviço também não se copiam: dá para refazer a função de playlist, não o conteúdo dela.",
  },
  {
    icone: Gavel,
    titulo: "Se for vender, confira antes",
    texto: "O autor recomenda rodar a checagem de marca registrada, ler os termos do que você usou e falar com um advogado quando houver dinheiro envolvido. Palavras dele: isto não é orientação jurídica.",
  },
];

export default function ReplicaDeAppPage() {
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
          PRÉVIA LOCAL · conteúdo aberto. Em produção, os comandos ficam protegidos.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Layers className="h-4 w-4" />
          11 skills, grátis e open source
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Pegue um app que funciona e construa{" "}
          <span style={{ color: ACCENT }}>a sua versão dele</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Onze skills que mapeiam como um aplicativo funciona, reconstroem tela por tela, testam,
          comparam com o original e colocam no ar com marca própria. Uma delas lê as reclamações dos
          usuários do app e transforma no seu diferencial.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">replica-skill</h2>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
          >
            447 estrelas
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">MIT</span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#888]">
            sem chave de API
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#999]">
          As ferramentas rodam em Python 3.8 ou mais novo, sem nada para instalar além dele.
        </p>
        <p className="mt-3 text-xs text-[#666]">
          Publicado em 3 de outubro de 2026 e conferido em 5 de outubro de 2026. Juntou 447 estrelas
          em dois dias.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Onde fica a linha</h2>
        <p className="text-sm text-[#888]">
          Essa parte importa mais que os comandos. Leia antes de começar.
        </p>
        {LIMITES.map((l) => (
          <article
            key={l.titulo}
            className="flex gap-4 rounded-xl border p-4"
            style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}0A` }}
          >
            <l.icone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
            <div className="min-w-0">
              <h3 className="font-semibold">{l.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#bbb]">{l.texto}</p>
            </div>
          </article>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="replicadeapp-page"
          accent={ACCENT}
          buttonTextColor="#032030"
          title="Receba os 11 comandos e o repositório"
          description="Preencha seus dados para liberar a sequência completa, na ordem de execução, e o link do projeto."
          contentNote="Você vai liberar: os 11 comandos do mapeamento ao deploy, com o que cada um entrega, mais o repositório oficial."
          buttonLabel="Liberar os comandos"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Os onze, na ordem</h2>
            <p className="text-sm text-[#888]">
              Rode em sequência. Cada um lê o que o anterior escreveu, numa pasta do seu projeto.
            </p>
            <div className="space-y-2">
              {COMANDOS.map(([n, cmd, oque]) => (
                <article
                  key={cmd}
                  className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    {n}
                  </span>
                  <div className="min-w-0">
                    <code className="text-sm font-semibold" style={{ color: ACCENT }}>
                      {cmd}
                    </code>
                    <p className="mt-1 text-sm leading-relaxed text-[#999]">{oque}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#777]">
              Quanto tempo leva depende do que você escolheu reconstruir. O próprio projeto diz que
              uma agenda de reuniões é questão de semanas, e que uma planilha de verdade não é.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: "#032030", boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir o repositório
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-6 text-center text-xs text-[#777]">
            github.com/Jakeschincariol/replica-skill · instruções de instalação no README
          </p>
        </div>
      )}

      <SalesCta utmContent="replicadeapp" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
