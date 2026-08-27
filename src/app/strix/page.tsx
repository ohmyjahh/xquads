"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Github,
  ShieldAlert,
  Terminal,
  Bug,
  Boxes,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F97316";
const REPO = "https://github.com/usestrix/strix";

const O_QUE_FAZ = [
  {
    icone: Bug,
    titulo: "Ataca o alvo de verdade",
    texto:
      "Roda a aplicação, tenta explorar cada falha e só reporta o que conseguiu reproduzir. Scanner comum lê o código e chuta; o Strix precisa provar.",
  },
  {
    icone: Boxes,
    titulo: "Vários agentes ao mesmo tempo",
    texto:
      "Um time de agentes divide reconhecimento, exploração e validação, e troca achado entre si para encadear falhas que sozinhas passariam batido.",
  },
  {
    icone: Terminal,
    titulo: "Prova de conceito e correção",
    texto:
      "Cada achado vem com passo a passo de reprodução, classificação OWASP e nota CVSS. Ele também gera o patch sugerido e o relatório.",
  },
];

const COBERTURA = [
  "IDOR, escalada de privilégio e bypass de autenticação",
  "SQL injection, NoSQL injection, command injection e SSTI",
  "SSRF, XXE, desserialização insegura e RCE",
  "XSS armazenado, refletido e de DOM, prototype pollution, CSRF",
  "Falhas de lógica de negócio, race condition e manipulação de pagamento",
  "Ataques a JWT, fixação de sessão e problemas de API",
];

const COMANDOS = [
  {
    id: "instalar",
    titulo: "1. Instalar",
    codigo: "curl -sSL https://strix.ai/install | bash",
    nota: "Comando oficial do projeto. Ele baixa e executa o instalador do strix.ai, então rode com a atenção que qualquer script remoto merece. Se preferir, o pacote também está no PyPI como strix-agent.",
  },
  {
    id: "chave",
    titulo: "2. Apontar o modelo",
    codigo: 'export STRIX_LLM="openai/gpt-5.4"\nexport LLM_API_KEY="sua-chave-aqui"',
    nota: "Funciona com OpenAI, Anthropic, Google e outros provedores. A conta do modelo é sua, e o consumo de tokens vem no seu cartão.",
  },
  {
    id: "scan",
    titulo: "3. Rodar no seu projeto",
    codigo: "strix --target ./pasta-do-seu-app",
    nota: "Na primeira vez ele baixa a imagem Docker do sandbox. O resultado fica em strix_runs/<nome-da-execucao>.",
  },
  {
    id: "alvos",
    titulo: "4. Outros tipos de alvo",
    codigo:
      "strix --target https://github.com/sua-org/seu-repo\nstrix --target https://seu-app.com\nstrix --target ./openapi.yaml --target https://api.seu-app.com",
    nota: "Repositório, aplicação publicada ou contrato de API (OpenAPI, Swagger ou Postman). Sempre um alvo seu.",
  },
  {
    id: "painel",
    titulo: "5. Ver o resultado",
    codigo: "strix view",
    nota: "Sobe um painel local em 127.0.0.1 com link tokenizado, mostrando severidade, achados e o mapa dos agentes. Os dados ficam na sua máquina.",
  },
  {
    id: "skills",
    titulo: "Bônus: dentro do seu agente",
    codigo: "npx skills add usestrix/strix",
    nota: "Instala nove skills para Claude Code, Cursor, Codex e outros agentes compatíveis, incluindo rodar o scan, corrigir os achados e ligar a checagem no CI.",
  },
];

export default function StrixPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copied, setCopied] = useState("");
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

  const copyText = async (id: string, text: string) => {
    const legacyCopy = () => {
      const field = document.createElement("textarea");
      field.value = text;
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
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = legacyCopy();
    }

    if (!ok) {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 6000);
      return;
    }

    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o link e os comandos ficam protegidos.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Github className="h-4 w-4" />
          Repositório open source
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Um time de <span style={{ color: ACCENT }}>hackers de IA</span> testando o seu
          próprio app
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          O Strix roda o seu código, tenta invadir e entrega a prova de que a falha existe,
          com o patch pronto. É gratuito, tem licença Apache 2.0 e passou de 58 mil estrelas
          no GitHub em agosto de 2026.
        </p>
      </header>

      <section
        className="rounded-xl border p-5 sm:p-6"
        style={{ borderColor: "#EF444466", backgroundColor: "#EF44440F" }}
      >
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[#FCA5A5]">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          Leia antes de rodar
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#d4a5a5]">
          O Strix ataca de verdade o alvo que você apontar. Use somente em sistema que é seu
          ou para o qual você tem permissão escrita, dentro do escopo combinado. Testar
          sistema de terceiros sem autorização é crime na maioria dos países, inclusive aqui.
          O aviso é do próprio projeto, e a responsabilidade legal é de quem roda.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Por que ele é diferente</h2>
        <div className="space-y-3">
          {O_QUE_FAZ.map((item) => (
            <article
              key={item.titulo}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
            >
              <item.icone
                className="h-5 w-5 shrink-0 mt-0.5"
                style={{ color: ACCENT }}
              />
              <div>
                <h3 className="font-semibold">{item.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#999]">{item.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">O que ele procura</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {COBERTURA.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] px-4 py-3 text-sm text-[#bbb]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">O que você precisa ter antes</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Docker instalado e rodando, e uma chave de API de algum modelo (OpenAI, Anthropic,
          Google e outros são aceitos). O Strix em si não cobra nada. O custo que aparece é o
          dos tokens que os agentes consomem durante o teste, na sua conta do provedor.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="strix-page"
          accent={ACCENT}
          buttonTextColor="#2b1103"
          title="Libere o acesso ao Strix"
          description="Preencha seus dados para desbloquear o repositório e o passo a passo de instalação."
          contentNote="Você vai liberar: o link oficial no GitHub, os comandos de instalação e primeiro scan, e como apontar para código, app publicado ou API."
          buttonLabel="Liberar o repositório"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <section className="space-y-5">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Check className="h-4 w-4" />
            Acesso liberado. Comece pelo repositório e siga os comandos na ordem.
          </div>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px -8px ${ACCENT}80` }}
          >
            <Github className="h-5 w-5 shrink-0" />
            Abrir o Strix no GitHub
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>

          {copyFailed && (
            <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
              Seu navegador bloqueou a cópia automática. Selecione o comando e copie com
              Ctrl+C (ou Cmd+C no Mac).
            </p>
          )}

          <div className="space-y-3">
            {COMANDOS.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{item.titulo}</h3>
                  <button
                    onClick={() => copyText(item.id, item.codigo)}
                    className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-colors cursor-pointer"
                    style={{
                      borderColor: `${ACCENT}33`,
                      backgroundColor: `${ACCENT}0D`,
                      color: ACCENT,
                    }}
                  >
                    {copied === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copiar
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-3 select-all overflow-x-auto rounded-lg border border-[#2a2a2e] bg-[#0e0e10] p-4 text-[13px] leading-relaxed text-[#ccc] font-mono">
                  {item.codigo}
                </pre>
                <p className="mt-2 text-sm leading-relaxed text-[#888]">{item.nota}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">Prefere não instalar nada?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#999]">
          Tem uma versão mais leve do mesmo problema: um prompt de auditoria que você cola
          numa IA e roda em cima do seu código, sem Docker e sem chave de modelo. Está em{" "}
          <a
            href="/xquads/appseguro"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/appseguro
          </a>
          . O Strix vai bem mais fundo, mas o prompt resolve o básico antes de publicar.
        </p>
      </section>

      <SalesCta utmContent="strix" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
