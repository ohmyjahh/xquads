"use client";

import { useState } from "react";
import { Copy, Check, Instagram } from "lucide-react";

const PROMPT = `Voce e um estrategista senior de social media especializado em posicionamento digital, com experiencia em contas do nicho de [SEU NICHO — ex: IA, tecnologia, empreendedorismo]. Sua missao e fazer uma auditoria completa do meu Instagram e construir uma estrategia personalizada de crescimento e monetizacao.

Meu perfil: @[seu_@]
Link: https://instagram.com/[seu_@]
Bio atual: [cole sua bio]
Numero de seguidores: [numero]
Objetivo principal: [ex: gerar leads para meu SaaS / vender mentoria / crescer audiencia / autoridade no nicho de IA]
Nicho declarado: [ex: IA aplicada a negocios]

---

Etapa 1 — Diagnostico

Analise meu perfil e me devolva:

- Posicionamento atual percebido — o que alguem entende sobre mim nos primeiros 5 segundos no perfil?
- Pilares de conteudo identificados — quais temas eu realmente cubro hoje (com % aproximado de cada um)?
- Formatos dominantes — Reels, carrosseis, stories, fotos? Qual performa melhor?
- Tom de voz e identidade visual — consistencia, pontos fortes e ruidos.
- Persona / publico-alvo real — quem esta sendo atraido hoje (idade, profissao, dores, desejos, nivel de maturidade no tema).
- Gaps criticos — o que esta faltando para o objetivo que declarei.

---

Etapa 2 — Publico-alvo ideal

Defina meu ICP (Ideal Customer Profile) com:

- Demografia + psicografia
- 3 dores principais
- 3 desejos/aspiracoes
- Objecoes comuns ao que eu ofereco
- Onde essa pessoa ja consome conteudo hoje (concorrentes/referencias)

---

Etapa 3 — Estrategia personalizada (proximos 90 dias)

Entregue:

- Novo posicionamento sugerido + nova bio reescrita (3 versoes).
- 4 a 5 pilares de conteudo com % de distribuicao e objetivo de cada um (atrair / nutrir / converter / autoridade).
- Mix de formatos ideal por semana.
- Calendario modelo de 1 semana com 7 ideias de post prontas (titulo, formato, gancho de abertura, CTA).
- 5 ganchos virais adaptados ao meu nicho.
- Funil de conversao ligando Instagram → meu objetivo final.
- 3 KPIs que eu devo acompanhar semanalmente.

---

Etapa 4 — Quick wins

Liste 5 acoes que posso executar nas proximas 48h para destravar crescimento imediato.

---

Formato da resposta: estruturada por etapa, direta, sem floreios. Pode usar tabelas quando fizer sentido. Se faltar alguma informacao critica, me pergunte antes de comecar.`;

export default function InstagramPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/20 px-4 py-1.5 text-xs font-medium text-[#E1306C]">
          <Instagram className="h-3.5 w-3.5" />
          Auditoria + Estrategia
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Instagram <span className="text-[#E1306C]">Audit</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Copie o prompt abaixo, cole na IA junto com as informacoes do seu
          perfil, e ela vai gerar uma auditoria completa + estrategia de 90 dias.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Copie o prompt clicando no botao abaixo</li>
          <li>Preencha os campos entre [colchetes] com seus dados</li>
          <li>Cole na IA de sua preferencia (Claude, ChatGPT, etc.)</li>
          <li>
            A IA vai analisar seu perfil e entregar diagnostico + estrategia
            completa
          </li>
        </ol>
      </div>

      {/* Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Prompt
          </h2>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg bg-[#E1306C] hover:bg-[#c42860] text-white text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar prompt
              </>
            )}
          </button>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 max-h-[500px] overflow-y-auto">
          <pre className="text-sm text-[#ccc] whitespace-pre-wrap font-mono leading-relaxed">
            {PROMPT}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por{" "}
        <span className="text-[#E1306C]">@rafa.grandi</span>
      </p>
    </div>
  );
}
