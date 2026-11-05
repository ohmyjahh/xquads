"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Terminal, Download, Film, Sparkles } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#22D3EE";

const PROMPT = `Quero montar no meu computador um kit de edição de vídeo com IA. Instale e configure tudo abaixo para mim.
Se você consegue rodar comandos no meu computador (Claude Code, Codex), faça direto.
Se não consegue (ex.: ChatGPT no navegador), me passe um comando por vez e espere eu confirmar antes do próximo.

Antes de começar:
- Descubra meu sistema (macOS, Windows ou Linux) e o processador.
- Veja o que já está instalado para não instalar duas vezes.
- Use só ferramentas gratuitas e me avise antes de qualquer coisa que peça senha de administrador.

1. BASE
- macOS: Xcode Command Line Tools + Homebrew. Windows: winget.
- Git, Node.js LTS e Python 3.11 ou mais novo.

2. VÍDEO E DOWNLOAD
- ffmpeg e ffprobe. Confira se têm o encoder libx265 (e, no Mac, o hevc_videotoolbox).
- yt-dlp, para baixar referências do YouTube e do Instagram pelo link.
  Se o Instagram pedir login, use --cookies-from-browser chrome.

3. TRANSCRIÇÃO E ANÁLISE
- openai-whisper (pip) com o modelo "large-v3-turbo".
  Baixe o modelo agora, transcrevendo um áudio de teste de 5 segundos com tempo por palavra.
- Pillow e NumPy (pip).
- Opcional: demucs (separa voz e música de uma referência).

4. VISÃO (achar o rosto, recortar a pessoa do fundo, ler texto da tela)
- macOS: crie 3 programinhas de linha de comando em Swift, usando o framework Vision da Apple, numa pasta ~/edicao-ia/tools:
  - facepos: recebe imagens e devolve em JSON a caixa do rosto (cx, cy, w, h normalizados).
  - personmask: recebe um vídeo e gera a máscara da pessoa quadro a quadro (VNGeneratePersonSegmentationRequest).
  - ocr: recebe imagens e devolve o texto com posição e confiança (VNRecognizeTextRequest).
  Compile e teste cada um com uma imagem ou vídeo de exemplo.
- Windows/Linux: no lugar deles, instale MediaPipe (rosto + segmentação de pessoa) e EasyOCR.

5. MOTION (REMOTION)
- Crie ~/edicao-ia/motion com um projeto Remotion em branco, em TypeScript (npx create-video@latest).
- Instale @remotion/google-fonts, @remotion/paths e simple-icons (logos oficiais de marcas).
- Rode "npx remotion browser ensure" e renderize um vídeo de teste de 3 segundos para provar que funciona.

6. Objetivo FINAL
Após tudo instalado e garantindo que todas as ferramentas estão funcionando, eu quero que você retire a maior quantidade de cortes e clipes para as redes sociais.

Corte no formato retrato, que seja viral, então eu preciso de cortes chamativos, coisas engraçadas e etcétera. Eles devem ter:
- 1 fluxo rápido
- Cortes secos
- Tirando o corte de respiração
- Legendas chamativas (podem ser legendas grandes, neon, que aparece, some, tem movimento e etcétera)

Estude cortes virais e me entregue em um estilo de edição parecido.`;

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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#22D3EE]/50"
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

const O_QUE_INSTALA = [
  "Base do computador: Git, Node.js e Python",
  "Vídeo e download: ffmpeg e yt-dlp",
  "Transcrição com tempo por palavra: Whisper",
  "Visão: achar o rosto, recortar a pessoa e ler texto da tela",
  "Motion: um projeto Remotion pronto, com um vídeo de teste",
  "No fim, ele corta o seu vídeo em clipes verticais para as redes",
];

const COMO_USAR = [
  {
    n: "1",
    icone: Terminal,
    titulo: "Abra o Claude Code ou o Codex",
    texto:
      "Eles rodam os comandos direto no seu computador. Se você só tem o ChatGPT no navegador, sem problema: o prompt manda ele passar um comando por vez e esperar você confirmar.",
  },
  {
    n: "2",
    icone: Download,
    titulo: "Cole o prompt abaixo",
    texto:
      "Ele descobre o seu sistema, vê o que você já tem instalado e usa só ferramentas gratuitas. Antes de qualquer coisa que peça senha de administrador, ele avisa.",
  },
  {
    n: "3",
    icone: Film,
    titulo: "Passe o vídeo que você quer cortar",
    texto:
      "Com tudo instalado e testado, o último item do prompt pede os cortes em formato retrato, com cortes secos, sem respiração e com legendas chamativas.",
  },
];

export default function GtaPage() {
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
          <Sparkles className="h-4 w-4" />
          Prompt pronto para colar
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Monte um kit de edição de vídeo{" "}
          <span style={{ color: ACCENT }}>com IA no seu computador</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Um único prompt para colar no Claude Code, no Codex ou no ChatGPT. Ele instala e testa as
          ferramentas e, no fim, corta o seu vídeo em clipes para as redes sociais.
        </p>
      </header>

      <section className="space-y-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
        <h2 className="text-lg font-semibold">O que o prompt instala e faz</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-[#999]">
          {O_QUE_INSTALA.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              {item}
            </li>
          ))}
        </ul>
        <p
          className="rounded-lg px-3 py-2 text-sm leading-relaxed"
          style={{ backgroundColor: `${ACCENT}14`, color: "#bbb" }}
        >
          Ele instala programas no seu computador, funciona em macOS, Windows e Linux e avisa antes de
          pedir a senha de administrador.
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="gta-page"
          accent={ACCENT}
          buttonTextColor="#062a30"
          title="Receba o prompt do kit de edição"
          description="Preencha seus dados para liberar o prompt completo, com botão de copiar."
          contentNote="Você vai liberar: o prompt completo do kit de edição de vídeo, pronto para colar no Claude Code, no Codex ou no ChatGPT."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-4">
          {COMO_USAR.map((p) => (
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
                {p.n === "2" && (
                  <div className="mt-3 space-y-2">
                    <CopyButton text={PROMPT} />
                    <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
                      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
                        {PROMPT}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <SalesCta utmContent="gta" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
