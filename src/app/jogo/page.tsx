"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Gamepad2,
  ArrowUpRight,
  Copy,
  AlertTriangle,
  Box,
  Mountain,
  User,
  Swords,
  Users,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#A78BFA";
const HIGGSFIELD = "https://higgsfield.ai/mcp";
const ANTHROPIC = "https://www.anthropic.com/claude-fable-and-mythos-5-2";
const CONECTOR = "https://mcp.higgsfield.ai/mcp";

const ETAPAS = [
  {
    icone: Box,
    nome: "1. O primeiro modelo 3D",
    texto: "Um dinossauro 3D estilizado, numa cena que abre aqui mesmo no chat.",
  },
  {
    icone: Mountain,
    nome: "2. O cenário",
    texto: "Floresta ao amanhecer, com névoa, luz e terreno.",
  },
  {
    icone: User,
    nome: "3. O personagem",
    texto: "Um personagem controlável, com câmera e movimento.",
  },
  {
    icone: Swords,
    nome: "4. As mecânicas",
    texto: "Coleta de recursos, crafting, caça e construção de base.",
  },
  {
    icone: Users,
    nome: "5. Dois jogadores",
    texto: "Dois jogadores no mesmo mundo, na mesma tela.",
  },
];

const PROMPTS = [
  {
    titulo: "Pedido 1: o primeiro modelo 3D",
    texto: `Vamos criar um jogo 3D com Three.js. Monte tudo como um artifact em HTML, que eu abro aqui mesmo no chat.
Nesta etapa faça só a base:
- Use o conector do Higgsfield para gerar imagens de referência de um dinossauro estilizado (não fotorrealista).
- Monte a cena com um modelo 3D simples desse dinossauro, feito em código.
Quando eu conseguir ver o dinossauro na tela, pare e espere eu aprovar. Se algo der erro, leia o erro, corrija e continue.`,
  },
  {
    titulo: "Pedido 2: o cenário",
    texto: `Aprovado. Agora o cenário: uma floresta ao amanhecer, com névoa baixa, luz rasante, terreno com relevo, árvores e pedras.
Use o Higgsfield para gerar imagens de referência do ambiente antes de montar. Mantenha o dinossauro da etapa anterior na cena, no mesmo artifact.
Pare quando eu conseguir passear com a câmera pelo cenário e espere meu ok.`,
  },
  {
    titulo: "Pedido 3: o personagem",
    texto: `Aprovado. Agora o personagem controlável: um explorador estilizado, com movimento por teclado (andar, correr, pular), câmera em terceira pessoa e colisão com o terreno.
Pare quando eu conseguir andar pelo mundo e espere meu ok.`,
  },
  {
    titulo: "Pedido 4: as mecânicas",
    texto: `Aprovado. Agora as mecânicas, uma por vez, testando cada uma antes da próxima:
1. Coletar recursos (madeira e pedra) e guardar num inventário.
2. Crafting simples: ferramentas e armas com receitas curtas.
3. Caça: um animal que se move pelo mapa e pode ser caçado.
4. Construção de base: colocar peças no terreno.
Me mostre uma lista do que ficou funcionando e do que ficou faltando.`,
  },
  {
    titulo: "Pedido 5: dois jogadores",
    texto: `Aprovado. Por último, dois jogadores no mesmo mundo, na mesma tela: o jogador 1 anda com WASD e o jogador 2 com as setas.
Liste os problemas que você encontrou e o que ainda não está pronto.`,
  },
];

const PASSOS = [
  {
    n: "1",
    titulo: "Abra a página do Higgsfield MCP",
    texto:
      "Entre em higgsfield.ai/mcp com a sua conta da Higgsfield e veja se o teste grátis ainda está disponível. Sem teste, o uso pelo MCP gasta créditos do seu plano.",
  },
  {
    n: "2",
    titulo: "Conecte no Claude",
    texto:
      "No Claude, adicione o Higgsfield como conector personalizado com o endereço abaixo e autorize pela sua conta. A conexão é por OAuth: não precisa de chave de API.",
    copiar: CONECTOR,
  },
  {
    n: "3",
    titulo: "Escolha o Fable 5.2 e cole os pedidos, um por vez",
    texto:
      "Selecione o Claude Fable 5.2 e cole o primeiro pedido abaixo. Só passe para o próximo depois de ver a etapa funcionando.",
  },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");

  async function copiar() {
    try {
      await navigator.clipboard.writeText(text);
      setState("ok");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
      style={{ borderColor: `${ACCENT}66`, color: ACCENT }}
    >
      <Copy className="h-3.5 w-3.5" />
      {state === "ok" ? "Copiado" : state === "error" ? "Não copiou, selecione o texto" : label}
    </button>
  );
}

export default function JogoPage() {
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
          <Gamepad2 className="h-4 w-4" />
          Claude Fable 5.2 · Higgsfield
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Os 5 pedidos que montam um jogo 3D{" "}
          <span style={{ color: ACCENT }}>com o Claude Fable 5.2</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Cinco pedidos em sequência, do primeiro modelo 3D ao jogo com dois jogadores, para colar no
          Claude com o Higgsfield conectado.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">As 5 etapas</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ETAPAS.map((r) => (
            <article key={r.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <r.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {r.nome}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{r.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="jogo-page"
          accent={ACCENT}
          buttonTextColor="#2e1065"
          title="Receba os 5 pedidos e o passo a passo"
          description="Preencha seus dados para liberar os pedidos do jogo e como conectar o Higgsfield ao Claude."
          contentNote="Você vai liberar: os 5 pedidos prontos para copiar e o passo a passo da conexão."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section
            className="rounded-xl border p-5"
            style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}
          >
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Leia antes de ativar
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                "Segundo as fontes que conferi (a página oficial não detalha), o teste grátis do Higgsfield MCP pede cartão e vira assinatura paga se você não cancelar antes do fim.",
                "Coloque um alarme no celular para cancelar antes de o teste terminar.",
                "Gerar pelo MCP sempre gasta créditos, mesmo em plano com acesso ilimitado no site da Higgsfield (é o que a central de ajuda deles diz).",
                "As condições do teste podem mudar. Confira os termos e o valor na tela de ativação, em higgsfield.ai/mcp, antes de colocar o cartão.",
              ].map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como conectar</h2>
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
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="text-sm leading-relaxed text-[#999]">{p.texto}</p>
                  {p.copiar && (
                    <div className="space-y-2">
                      <pre className="overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#121214] p-3 text-xs text-[#ddd]">
                        <code>{p.copiar}</code>
                      </pre>
                      <CopyButton text={p.copiar} label="Copiar endereço" />
                    </div>
                  )}
                </div>
              </article>
            ))}
            <a
              href={HIGGSFIELD}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT, color: "#2e1065" }}
            >
              Abrir a página do Higgsfield MCP
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Os 5 pedidos</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Montados a partir das etapas que o vídeo mostra; não são o pedido original do vídeo. O resultado depende do seu plano,
              dos seus créditos e do que o modelo entregar em cada etapa, então não espere o jogo
              pronto em um pedido só.
            </p>
            {PROMPTS.map((p) => (
              <article key={p.titulo} className="space-y-3 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                <h3 className="font-semibold">{p.titulo}</h3>
                <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                  <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                    {p.texto}
                  </pre>
                </div>
                <CopyButton text={p.texto} label="Copiar pedido" />
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Sobre o Fable 5.2</h2>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[#999]">
              <li>Lançado pela Anthropic em 9 de novembro de 2026.</li>
              <li>
                A Anthropic diz que ele gera respostas até 30% mais rápido que o Fable 5.1.
              </li>
              <li>
                Quem gera imagem e vídeo é o Higgsfield; o Claude escreve os pedidos e usa o
                conector.
              </li>
            </ul>
            <a
              href={ANTHROPIC}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: ACCENT }}
            >
              Ler o anúncio da Anthropic
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-[#777]">Informações conferidas em 10 de novembro de 2026</p>
          </section>
        </div>
      )}

      <SalesCta utmContent="jogo" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
