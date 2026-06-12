"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Plug,
  Sparkles,
  Image as ImageIcon,
  Video,
  UserCircle2,
  ListChecks,
  Terminal,
  Monitor,
  Lightbulb,
  Palette,
  LayoutDashboard,
  Wand2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { SalesCta } from "@/components/sales-cta";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";

const ACCENT = "#8B5CF6";

const CMD_CLAUDE_CODE = `claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp`;

const MCP_URL = `https://mcp.higgsfield.ai/mcp`;

const PROMPT_MOODBOARD = `Usando o Higgsfield, gere 4 imagens de referência visual para a identidade do meu projeto.

Contexto do projeto: [descreva seu projeto, ex: aplicativo de agendamento para barbearias]
Sensação que quero passar: [ex: moderno, masculino, premium]
Cores de base: [ex: preto, dourado e off-white]

Gere 4 direções diferentes: uma minimalista, uma editorial, uma vibrante e uma dark. Para cada uma, descreva em uma frase o conceito antes de gerar. Formato: landscape_16_9, alta qualidade.`;

const PROMPT_TELAS = `Vamos desenhar as telas do meu projeto usando o Higgsfield.

Projeto: [nome e descrição em uma frase]
Telas que preciso: [ex: tela de login, dashboard principal, tela de perfil]
Direção visual escolhida: [cole aqui a descrição da direção que você aprovou no moodboard]

Para cada tela, gere um mockup de interface em alta fidelidade, formato portrait_9_16 (mobile) ou landscape_16_9 (desktop). Mostre uma tela por vez e aguarde minha aprovação antes de ir para a próxima. Se eu pedir ajustes, gere uma nova versão mantendo o restante consistente.`;

const PROMPT_HERO = `Gere a hero image do site do meu projeto usando o Higgsfield.

Projeto: [descrição]
Estilo: [ex: 3D abstrato, fotografia de produto, ilustração flat]
Texto que vai por cima: [ex: headline à esquerda, então deixe a área esquerda mais limpa]
Formato: landscape_16_9, alta qualidade.

Gere 3 variações com composições diferentes para eu escolher.`;

const PROMPT_PERSONAGEM = `Quero criar um personagem/mascote consistente para a minha marca usando o Higgsfield.

1. Primeiro, gere 4 propostas de personagem com base nesta descrição: [descreva o personagem, ex: robô simpático laranja, estilo Pixar]
2. Quando eu escolher uma, use o create_character para treinar o personagem com as imagens aprovadas
3. Depois de treinado, gere o personagem em 5 situações diferentes: [ex: acenando, no computador, comemorando, pensando, apontando]

Assim eu consigo usar o mesmo personagem em todo o site, posts e apresentações.`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-[0.2em]"
      style={{ color: ACCENT }}
    >
      {children}
    </p>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md text-white text-xs font-medium px-3 py-1.5 transition-colors cursor-pointer hover:opacity-90"
        style={{ backgroundColor: ACCENT }}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copiar
          </>
        )}
      </button>
      <pre className="text-[13px] text-[#ccc] whitespace-pre-wrap font-mono leading-relaxed pt-8 sm:pt-0 sm:pr-24">
        {code}
      </pre>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/15 p-4">
      <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
      <p className="text-sm text-[#bbb] leading-relaxed">{children}</p>
    </div>
  );
}

export default function FablePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (hasCapturedLead()) setUnlocked(true);
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    setJustUnlocked(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* ============ HEADER ============ */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-4 py-1.5 text-xs font-medium" style={{ color: ACCENT }}>
          <Wand2 className="h-3.5 w-3.5" />
          Manual Completo
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Claude + <span style={{ color: ACCENT }}>Higgsfield MCP</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Conecte o Claude ao Higgsfield e transforme seu chat em um estúdio de
          criação: telas, design, identidade visual, imagens e vídeos dos seus
          projetos, tudo gerado por comando de texto.
        </p>
      </div>

      {/* ============ INTRODUÇÃO ============ */}
      <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
        <p>
          Criar um projeto não é só código: é tela, é design, é identidade
          visual. E essa sempre foi a parte que travava quem não é designer.
          Com o MCP do Higgsfield conectado ao Claude, isso muda: você descreve
          o que quer em português, e o Claude escolhe o modelo certo, gera as
          imagens, refina com você e entrega o material pronto. Neste manual
          você vai conectar os dois em menos de 2 minutos e criar seus
          primeiros projetos visuais na prática.
        </p>
      </div>

      {/* ============ O QUE É ============ */}
      <div className="space-y-4">
        <Eyebrow>Antes de começar</Eyebrow>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          O que é MCP e o que é o Higgsfield?
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Plug className="h-4 w-4" style={{ color: ACCENT }} />
              <h3 className="text-sm font-semibold text-white">MCP</h3>
            </div>
            <p className="text-sm text-[#999] leading-relaxed">
              O Model Context Protocol é o padrão que conecta o Claude a
              ferramentas externas. Pense nele como uma tomada universal: você
              pluga um serviço e o Claude ganha os poderes daquele serviço
              dentro da conversa.
            </p>
          </div>
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: ACCENT }} />
              <h3 className="text-sm font-semibold text-white">Higgsfield</h3>
            </div>
            <p className="text-sm text-[#999] leading-relaxed">
              Plataforma de geração de imagem e vídeo com IA que reúne mais de
              30 modelos em um lugar só: Nano Banana Pro, GPT Image, Flux,
              Soul, Veo, Kling, Seedance e outros. Imagens em até 4K e vídeos
              cinemáticos.
            </p>
          </div>
        </div>
        <p className="text-[15px] text-[#aaa] leading-relaxed">
          Juntando os dois: o Claude vira o diretor de arte que entende seu
          projeto, e o Higgsfield vira a mão que desenha. Você só precisa de
          uma conta no{" "}
          <a
            href="https://higgsfield.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
            style={{ color: ACCENT }}
          >
            higgsfield.ai
          </a>{" "}
          (o plano gratuito já vem com créditos mensais para testar) e de uma
          conta no Claude.
        </p>
      </div>

      {/* ============ GATE ============ */}
      {!unlocked ? (
        <LeadGate
          source="fable-page"
          accent={ACCENT}
          title="Receba o manual completo"
          description="Insira seus dados para desbloquear o passo a passo de conexão, os 4 projetos práticos com prompts prontos e as dicas de refinamento."
          contentNote="Conteúdo: conexão no Claude Web/Desktop e Claude Code, prompts de moodboard, telas, hero image e personagem consistente."
          buttonLabel="Desbloquear o manual"
          onUnlock={handleUnlock}
        />
      ) : (
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 text-center space-y-2">
          <Eyebrow>Desbloqueie a construção</Eyebrow>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {justUnlocked ? "Acesso liberado!" : "Receba o manual completo"}
          </h2>
          <p className="text-sm font-semibold text-[#3BA856]">
            Desbloqueado. Tudo está abaixo 👇
          </p>
        </div>
      )}

      {/* ============ CONTEÚDO DESBLOQUEADO ============ */}
      {unlocked && (
        <>
      {/* ============ COMO CONECTAR ============ */}
      <div className="space-y-5">
        <Eyebrow>Passo 1 · Conexão</Eyebrow>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Como conectar o Claude ao Higgsfield
        </h2>
        <p className="text-[15px] text-[#aaa] leading-relaxed">
          Existem dois caminhos, dependendo de onde você usa o Claude. Os dois
          levam menos de 2 minutos e não precisam de API key: a autenticação é
          feita com login normal na sua conta Higgsfield.
        </p>

        {/* Claude Web/Desktop */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" style={{ color: ACCENT }} />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Opção A: Claude Web e Desktop (conectores)
            </h3>
          </div>
          <ol className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-xs font-bold shrink-0" style={{ color: ACCENT }}>
                1
              </span>
              <span>
                No claude.ai, abra{" "}
                <strong className="text-[#ccc]">Configurações → Conectores</strong>{" "}
                (Settings → Connectors)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-xs font-bold shrink-0" style={{ color: ACCENT }}>
                2
              </span>
              <span>
                Clique em{" "}
                <strong className="text-[#ccc]">Adicionar conector personalizado</strong>{" "}
                (Add custom connector) e dê o nome{" "}
                <strong className="text-[#ccc]">Higgsfield</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-xs font-bold shrink-0" style={{ color: ACCENT }}>
                3
              </span>
              <span>Cole a URL do servidor MCP no campo indicado:</span>
            </li>
          </ol>
          <CodeBlock code={MCP_URL} />
          <ol className="space-y-3 text-sm text-[#999]" start={4}>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-xs font-bold shrink-0" style={{ color: ACCENT }}>
                4
              </span>
              <span>
                Clique em <strong className="text-[#ccc]">Adicionar → Conectar</strong>{" "}
                e faça login na sua conta Higgsfield quando o navegador abrir
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-xs font-bold shrink-0" style={{ color: ACCENT }}>
                5
              </span>
              <span>
                Pronto. Abra qualquer conversa e peça uma imagem para testar a
                conexão
              </span>
            </li>
          </ol>
        </div>

        {/* Claude Code */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" style={{ color: ACCENT }} />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Opção B: Claude Code (terminal)
            </h3>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            Se você usa o Claude Code (o nível 3 que mostramos no{" "}
            <a href="/claude" className="underline hover:text-white transition-colors" style={{ color: ACCENT }}>
              guia dos 3 níveis
            </a>
            ), basta um único comando no terminal:
          </p>
          <CodeBlock code={CMD_CLAUDE_CODE} />
          <ul className="space-y-2 text-sm text-[#999]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                Na primeira utilização, o navegador abre para você fazer login
                na conta Higgsfield (OAuth, sem API key)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                Verifique se conectou com{" "}
                <code className="font-mono" style={{ color: ACCENT }}>
                  claude mcp list
                </code>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                O <code className="font-mono" style={{ color: ACCENT }}>--scope user</code>{" "}
                deixa o Higgsfield disponível em todos os seus projetos
              </span>
            </li>
          </ul>
        </div>

        {/* Ferramentas */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            O que o Claude ganha com a conexão
          </h3>
          <ul className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <ImageIcon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span>
                <strong className="text-[#ccc]">Gerar imagens</strong> em até
                4K, em qualquer proporção, escolhendo entre os melhores modelos
                do mercado
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Video className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span>
                <strong className="text-[#ccc]">Gerar vídeos</strong>{" "}
                cinemáticos de até 15 segundos com modelos como Veo, Kling e
                Seedance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span>
                <strong className="text-[#ccc]">Treinar personagens</strong>{" "}
                para manter o mesmo rosto ou mascote consistente em todas as
                gerações
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ListChecks className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span>
                <strong className="text-[#ccc]">Acompanhar as gerações</strong>{" "}
                direto na conversa, sem precisar abrir o site do Higgsfield
              </span>
            </li>
          </ul>
          <p className="text-xs text-[#666]">
            As gerações consomem os créditos do seu plano Higgsfield, igual ao
            uso normal da plataforma.
          </p>
        </div>
      </div>

      {/* ============ MANUAL: PRIMEIROS PROJETOS ============ */}
      <div className="space-y-5">
        <Eyebrow>Passo 2 · Mão na massa</Eyebrow>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Seus primeiros projetos com o MCP
        </h2>
        <p className="text-[15px] text-[#aaa] leading-relaxed">
          Agora vem a parte boa. Abaixo estão 4 projetos práticos, na ordem
          certa para quem está começando. Cada um tem um prompt pronto para
          copiar: cole na conversa, preencha os colchetes com as informações do
          seu projeto e deixe o Claude trabalhar.
        </p>

        {/* Projeto 1 */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#8B5CF6]/10 text-xs font-mono font-bold px-2 py-1" style={{ color: ACCENT }}>
              01
            </span>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" style={{ color: ACCENT }} />
              <h3 className="font-bold text-white">
                Direção de arte do projeto (moodboard)
              </h3>
            </div>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            Todo projeto começa aqui. Antes de desenhar qualquer tela, você
            precisa decidir a cara do projeto: cores, clima, estilo. Este
            prompt gera 4 direções visuais diferentes para você escolher. A
            direção aprovada vira a referência de tudo que vem depois.
          </p>
          <CodeBlock code={PROMPT_MOODBOARD} />
        </div>

        {/* Projeto 2 */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#8B5CF6]/10 text-xs font-mono font-bold px-2 py-1" style={{ color: ACCENT }}>
              02
            </span>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" style={{ color: ACCENT }} />
              <h3 className="font-bold text-white">
                Telas do seu app ou site (mockups)
              </h3>
            </div>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            Com a direção visual definida, é hora de gerar as telas. O segredo
            é trabalhar uma tela por vez, aprovando antes de seguir, para
            manter tudo consistente. Esses mockups servem de referência
            visual: depois você entrega para o Claude Code construir as telas
            de verdade.
          </p>
          <CodeBlock code={PROMPT_TELAS} />
        </div>

        {/* Projeto 3 */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#8B5CF6]/10 text-xs font-mono font-bold px-2 py-1" style={{ color: ACCENT }}>
              03
            </span>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" style={{ color: ACCENT }} />
              <h3 className="font-bold text-white">
                Hero image e assets do site
              </h3>
            </div>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            A imagem principal do site é o que segura a atenção nos primeiros
            segundos. Peça variações, escolha a melhor e use o mesmo processo
            para banners, ícones, fundos e imagens de seção.
          </p>
          <CodeBlock code={PROMPT_HERO} />
        </div>

        {/* Projeto 4 */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#8B5CF6]/10 text-xs font-mono font-bold px-2 py-1" style={{ color: ACCENT }}>
              04
            </span>
            <div className="flex items-center gap-2">
              <UserCircle2 className="h-4 w-4" style={{ color: ACCENT }} />
              <h3 className="font-bold text-white">
                Personagem consistente da marca
              </h3>
            </div>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            O recurso mais impressionante do Higgsfield: treinar um personagem
            uma vez e usá-lo para sempre, com o mesmo rosto, em qualquer cena.
            Perfeito para mascote de marca, avatar de conteúdo ou personagens
            de apresentação.
          </p>
          <CodeBlock code={PROMPT_PERSONAGEM} />
        </div>
      </div>

      {/* ============ DICAS ============ */}
      <div className="space-y-5">
        <Eyebrow>Passo 3 · Refinamento</Eyebrow>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Dicas para resultados profissionais
        </h2>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Anatomia de um bom prompt visual
          </h3>
          <p className="text-sm text-[#999] leading-relaxed">
            Quanto mais específico, melhor o resultado. Um prompt visual
            completo responde 5 perguntas:
          </p>
          <ul className="space-y-2 text-sm text-[#999]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Composição</strong> — como a
                cena é enquadrada (close, plano aberto, vista de cima)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Sujeito</strong> — o que
                aparece, com atributos específicos (cores, materiais, idade,
                roupa)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Iluminação</strong> — direção
                e clima da luz (luz quente lateral, neon, luz natural de
                janela)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Estética</strong> — o estilo
                final (editorial de revista, 3D estilo Pixar, foto com grain
                35mm)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Formato</strong> — proporção
                da imagem (16:9 para sites, 9:16 para stories, 1:1 para feed)
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#FBBF24]" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Se algo der errado
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-[#999]">
            <li className="flex items-start gap-2">
              <span className="text-[#FBBF24] shrink-0">•</span>
              <span>
                <strong className="text-[#ccc]">Conector desconectou:</strong>{" "}
                volte em Configurações → Conectores e reconecte (no Claude
                Code, digite{" "}
                <code className="font-mono" style={{ color: ACCENT }}>/mcp</code>{" "}
                e reautentique)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FBBF24] shrink-0">•</span>
              <span>
                <strong className="text-[#ccc]">Vídeo demorando:</strong> é
                normal, vídeos levam de 45 a 90 segundos para renderizar
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FBBF24] shrink-0">•</span>
              <span>
                <strong className="text-[#ccc]">Imagem saiu errada:</strong>{" "}
                não recomece do zero. Diga o que manter e o que mudar: &quot;mantém a
                composição, só troca o fundo para azul escuro&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FBBF24] shrink-0">•</span>
              <span>
                <strong className="text-[#ccc]">Créditos acabando:</strong>{" "}
                use modelos leves (como Nano Banana) para iterar e os pesados
                só na versão final
              </span>
            </li>
          </ul>
        </div>

        <Tip>
          O fluxo que mais economiza tempo: gere os mockups das telas com o
          Higgsfield (Projeto 02), salve as imagens aprovadas em uma pasta do
          projeto e peça para o Claude Code construir as telas reais usando os
          mockups como referência. Design e código no mesmo fluxo, sem
          contratar ninguém.
        </Tip>
      </div>
        </>
      )}

      {/* ============ CTA FINAL ============ */}
      <SalesCta utmContent="fable" />

      {/* ============ FOOTER ============ */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
