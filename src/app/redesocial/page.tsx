"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Clapperboard,
  Download,
  LogIn,
  PenLine,
  Ghost,
  CalendarClock,
  LineChart,
  Wrench,
  AlertTriangle,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F472B6";
const ACCENT_TEXT = "#2a0a1a";

const REPO = "https://github.com/mattypark/Motion-graphics-skill";
const SKILL_ID = "mattypark/Motion-graphics-skill";

const AVISO =
  "Automatizar publicação pode ir contra os termos das plataformas, então comece devagar e revise os primeiros vídeos.";

const PROMPT_INSTALAR = `Instale esta skill: ${REPO}`;

const CMD_NPX = `npx skills add ${SKILL_ID}`;

const CMD_PLUGIN = `/plugin marketplace add ${SKILL_ID}
/plugin install motion-video-director@motion-graphics-skill`;

const PROMPT_PREFLIGHT = `Rode o preflight da skill Motion Video Director e me diga, item por item, o que já está instalado e o que falta (Node.js, ffmpeg, Playwright e os opcionais). Para cada item que falta, me explique para que serve e pergunte se eu quero instalar. Não instale nada sem a minha resposta e não me peça senha nem chave aqui no chat.`;

const PROMPT_LOGIN = `Abra o seu navegador interno na página de login do [Instagram / TikTok / YouTube / LinkedIn]. Eu vou fazer o login na mão, dentro dele. Não vou colar senha, código nem chave aqui no chat, e você não deve me pedir. Quando a janela de login estiver aberta, espere eu terminar e me avise que a sessão ficou ativa.`;

const BRIEFING = `Você produz e publica um vídeo curto por dia para a minha conta, usando a skill Motion Video Director. Siga este briefing.

QUEM SOU EU
- Nicho: [descreva em uma frase o assunto da conta]
- Público: [quem assiste: profissão, momento, o que quer resolver]
- Redes onde publicar: [Instagram / TikTok / YouTube Shorts / LinkedIn]

O QUE PRODUZIR
- Formato: [9:16, 16:9 ou 1:1] com [duração, por exemplo 20 a 40 segundos]
- Tipo de vídeo: [só motion e texto / com narração / com vídeo bruto meu]
- Tom: [direto, didático, bem-humorado, técnico]
- Frequência: [1 vídeo por dia / 3 por semana]
- Temas que quero cobrir: [3 a 5 temas]

COMO ABRIR CADA VÍDEO
Os primeiros segundos precisam dar um motivo para a pessoa continuar assistindo: uma pergunta, um número real ou uma promessa que o vídeo cumpre. Sem enrolação.

O QUE VOCÊ NUNCA FAZ
- Não baixa nem reposta vídeo de outra pessoa. Referência serve só para estudar estrutura.
- Não inventa dado, número, resultado nem depoimento.
- Não promete ganho ("você vai faturar X", "vai viralizar").
- Não publica sobre [assuntos que eu não quero tocar].
- Não pede senha no chat.

QUANDO PARAR E ME AVISAR
Se o login cair, se faltar arquivo, se der erro no render ou se você não tiver certeza de que o conteúdo está correto. É melhor parar do que publicar errado.`;

const PROMPT_FANTASMA = `Use a conta [@conta-fantasma], que eu já deixei logada no navegador interno. Ela só segue concorrentes meus, então olhe apenas o feed dela. Todo [dia / semana], separe os [5] vídeos com mais engajamento e, para cada um, descreva só a ESTRUTURA: o gancho dos primeiros segundos, o ritmo, o formato, a duração e como termina. Depois proponha como aplicar a mesma estrutura ao meu nicho [nicho], com tema e texto meus. Nunca baixe, copie nem poste o vídeo de outra pessoa. Não curta, não comente e não siga ninguém por conta própria.`;

const PROMPT_ROTINA = `Crie uma tarefa agendada que roda todo dia às [horário]. A cada execução, use a skill Motion Video Director para produzir um vídeo seguindo o briefing de conteúdo que eu te passei e publicar nas redes que conectei.

COMBINADOS PARA RODAR SEM ME PERGUNTAR
- Aprovação: eu aprovo de antemão todo vídeo que seguir o briefing e o formato [9:16 / 16:9 / 1:1]. Pode renderizar sem pedir confirmação a cada vídeo.
- Narração: use esta saída: [A: faça o vídeo sem narração, só com motion e texto na tela] ou [B: use o MP3 de narração que eu deixar pronto na pasta [caminho da pasta]; se a pasta estiver vazia, não publique e me avise].
- Primeiros dias: nos primeiros [7] dias, NÃO publique. Salve o vídeo pronto em [pasta de revisão] e me avise para eu revisar. Só publique sozinho depois que eu escrever "pode publicar sozinho".

SE ALGO FALHAR
Se o login cair, se faltar arquivo ou se o render der erro, pare e me avise. Não tente contornar e nunca me peça senha no chat.

REGRA FIXA
Use só a estrutura dos vídeos de referência. Nunca baixe nem poste vídeo de outra pessoa.`;

const PROMPT_APRENDER = `Revise os vídeos que você publicou nos últimos [7] dias nas minhas redes. Abra o painel de cada rede no navegador interno (já estou logado) e anote, de cada vídeo, as métricas que estiverem visíveis: [visualizações, retenção, curtidas, comentários, compartilhamentos]. Me diga o que os de melhor desempenho têm em comum (gancho, tema, duração, formato). Com base só nesses números, proponha ajustes para os próximos vídeos e, se eu aprovar, atualize o briefing. Não invente número que você não conseguiu ler e me diga o que ficou sem dado.`;

type Bloco = { rotulo: string; botao: string; texto: string };

const PASSOS: {
  n: string;
  icone: typeof Download;
  titulo: string;
  texto: string;
  blocos?: Bloco[];
}[] = [
  {
    n: "1",
    icone: Download,
    titulo: "Instale a skill",
    texto:
      "No Claude Code, peça para ele instalar a skill e cole o link do repositório. Se preferir outro caminho, as alternativas abaixo fazem a mesma coisa. Todas usam o endereço mattypark/Motion-graphics-skill.",
    blocos: [
      { rotulo: "Pedindo ao Claude (o caminho do vídeo)", botao: "Copiar o prompt", texto: PROMPT_INSTALAR },
      { rotulo: "Pelo terminal", botao: "Copiar o comando", texto: CMD_NPX },
      { rotulo: "Pelo plugin, dentro do Claude Code", botao: "Copiar os comandos", texto: CMD_PLUGIN },
    ],
  },
  {
    n: "2",
    icone: Wrench,
    titulo: "Deixe o Claude conferir o que falta",
    texto:
      "A skill tem um preflight: ele confere o que já está na máquina e pergunta item por item o que falta. Você decide o que instalar.",
    blocos: [{ rotulo: "Prompt do preflight", botao: "Copiar o prompt", texto: PROMPT_PREFLIGHT }],
  },
  {
    n: "3",
    icone: LogIn,
    titulo: "Conecte as suas redes, com o login na sua mão",
    texto:
      "Peça para o Claude abrir o navegador interno dele (o do app desktop, o Claude Code) e faça o login você mesmo, dentro dele. Repita para cada rede onde quer publicar: Instagram, TikTok, YouTube Shorts e LinkedIn. Nunca cole senha no chat.",
    blocos: [{ rotulo: "Prompt de login (um por rede)", botao: "Copiar o prompt", texto: PROMPT_LOGIN }],
  },
  {
    n: "4",
    icone: PenLine,
    titulo: "Explique o conteúdo que ele deve produzir",
    texto:
      "Este é o passo que decide a qualidade. Sem briefing, o vídeo sai genérico. Preencha os colchetes com a sua realidade: o que está entre colchetes é justamente o que nenhuma IA adivinha sobre a sua conta.",
    blocos: [{ rotulo: "Molde de briefing", botao: "Copiar o briefing", texto: BRIEFING }],
  },
  {
    n: "5",
    icone: Ghost,
    titulo: "Bônus: o Instagram fantasma",
    texto:
      "Crie uma conta separada em que você só segue concorrentes. Peça ao Claude para estudar o que eles publicam e trazer a estrutura do que está funcionando, para você aplicar ao seu nicho.",
    blocos: [{ rotulo: "Prompt do estudo de concorrentes", botao: "Copiar o prompt", texto: PROMPT_FANTASMA }],
  },
  {
    n: "6",
    icone: CalendarClock,
    titulo: "Transforme em rotina diária",
    texto:
      "Para publicar todo dia, é preciso uma tarefa agendada no Claude. O vídeo não detalha esse passo, e é nele que você deixa combinada a aprovação e a narração (veja a seção sobre isso logo abaixo).",
    blocos: [{ rotulo: "Prompt da rotina diária", botao: "Copiar o prompt", texto: PROMPT_ROTINA }],
  },
  {
    n: "7",
    icone: LineChart,
    titulo: "Faça ele aprender com os seus posts",
    texto:
      "Com o tempo, o Claude pode olhar o desempenho do que já foi publicado e ajustar os próximos vídeos. Antes de liberar o piloto automático, revise você mesmo os primeiros vídeos.",
    blocos: [{ rotulo: "Prompt de revisão dos resultados", botao: "Copiar o prompt", texto: PROMPT_APRENDER }],
  },
];

const FAZ = [
  "Motion graphics em código (Canvas, SVG, Three.js, GSAP)",
  "Edição de vídeo bruto: cortes, zoom, legenda, B-roll e texto atrás da pessoa",
  "Roteiro de narração para o ElevenLabs",
  "Design de som",
  "Render final em MP4 nos formatos 9:16, 16:9 ou 1:1, tudo local, sem After Effects",
];

function CopyButton({ text, rotulo }: { text: string; rotulo: string }) {
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
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] px-3 py-1.5 text-xs font-medium text-[#ccc] transition-colors hover:border-[#F472B6]/50"
      >
        {estado === "copiado" ? (
          <>
            <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            {rotulo}
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

function BlocoCopiavel({ rotulo, botao, texto }: Bloco) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="pt-1.5 text-xs font-medium text-[#777]">{rotulo}</span>
        <CopyButton text={texto} rotulo={botao} />
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4">
        <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ccc]">
          {texto}
        </pre>
      </div>
    </div>
  );
}

export default function RedeSocialPage() {
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
          <Clapperboard className="h-4 w-4" />O passo a passo do vídeo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O Claude criando e postando{" "}
          <span style={{ color: ACCENT }}>um vídeo por dia</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Com a skill Motion Video Director, o Claude aprende a criar animações e a editar vídeo, e
          com uma rotina agendada ele pode publicar nas suas redes. Aqui está a instalação certa e
          um prompt pronto para cada passo.
        </p>
      </header>

      <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] px-5 py-4">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-[#999]">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          {AVISO}
        </p>
      </section>

      {!unlocked ? (
        <LeadGate
          source="redesocial-page"
          accent={ACCENT}
          buttonTextColor={ACCENT_TEXT}
          title="Receba a skill e o passo a passo"
          description="Preencha seus dados para liberar o link da skill, os sete passos e os prompts."
          contentNote="Você vai liberar: o link da skill com a instalação correta, os sete passos, o molde de briefing e os prompts da rotina diária, prontos para copiar."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-12">
          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Clapperboard className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              A skill Motion Video Director
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Ela transforma o agente (Claude Code, Codex, Cursor) numa produtora de vídeo. O que
              entra:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#999]">
              {FAZ.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-[#999]">
              <strong className="text-white">O que ela precisa:</strong> Node.js 18 ou mais novo,
              ffmpeg/ffprobe e Playwright com Chrome headless. São opcionais o Python 3.10 ou mais
              novo (faster-whisper, rembg, demucs) e as chaves do ElevenLabs, Firecrawl, Freesound,
              Pexels, Pixabay e LottieFiles. O preflight confere tudo isso por você (passo 2).
            </p>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 break-all text-sm font-semibold underline underline-offset-4"
              style={{ color: ACCENT }}
            >
              github.com/mattypark/Motion-graphics-skill
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
            <p className="mt-3 text-xs leading-relaxed text-[#777]">
              O autor creditado no manifesto da skill é Miftahul Islam Efaz. Os comandos de
              instalação do README apontam para outro endereço, que hoje não existe (erro 404), por
              isso esta página usa só o endereço acima. O repositório não declara licença: aqui só
              apontamos o link, sem redistribuir nada.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Como montar</h2>
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
                <div className="min-w-0 flex-1 space-y-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <p.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      {p.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
                  </div>
                  {p.blocos?.map((b) => (
                    <BlocoCopiavel key={b.rotulo} {...b} />
                  ))}
                  {p.n === "1" && (
                    <p className="text-sm leading-relaxed text-[#999]">
                      Instalação manual: baixe o ZIP do repositório e copie a pasta{" "}
                      <span className="font-mono text-[13px] text-[#ccc]">skills/motion-video-director</span>{" "}
                      para <span className="font-mono text-[13px] text-[#ccc]">~/.claude/skills/</span>.
                    </p>
                  )}
                  {p.n === "3" && (
                    <p className="flex items-start gap-2 text-sm leading-relaxed text-[#bbb]">
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      Senha, código de verificação e chaves nunca vão para o chat. Você digita direto
                      na janela de login.
                    </p>
                  )}
                  {p.n === "5" && (
                    <p className="text-sm leading-relaxed text-[#999]">
                      <strong className="text-white">Modelar é usar a estrutura</strong> (gancho,
                      ritmo e formato), com tema, texto e imagem seus. Baixar e repostar o vídeo de
                      outra pessoa é cópia: dá problema de direito autoral, denúncia e queda de
                      alcance.
                    </p>
                  )}
                  {p.n === "6" && (
                    <p className="text-sm leading-relaxed text-[#999]">
                      A rotina local só roda com o computador ligado e o app do Claude aberto. Se o
                      computador estiver desligado na hora, o vídeo daquele dia não sai.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </section>

          <section
            className="rounded-xl border p-5"
            style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}
          >
            <h2 className="font-semibold" style={{ color: ACCENT }}>
              Sem fazer nada? Quase: deixe a aprovação combinada
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
              A skill foi feita com etapas de aprovação. Ela pede a sua aprovação antes de renderizar
              qualquer vídeo e não monta as cenas antes de receber o MP3 final da narração (gerado
              por você no ElevenLabs a partir do roteiro), a menos que você peça uma trilha-guia
              temporária. Para virar rotina, você deixa isso combinado na instrução, e o prompt do
              passo 6 já faz isso. Você tem duas saídas:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#bbb]">
              <li>
                <strong className="text-white">Vídeo sem narração:</strong> só motion e texto na
                tela.
              </li>
              <li>
                <strong className="text-white">Narração pronta numa pasta:</strong> você deixa o MP3
                lá, e o Claude usa o que encontrar.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Antes de liberar o piloto automático</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Revise os primeiros vídeos você mesmo. O prompt da rotina já manda salvar na pasta de
              revisão nos primeiros dias, sem publicar. Quando o resultado estiver do jeito que você
              quer, aí sim libere a publicação sozinha. A página não promete alcance, seguidores nem
              vendas: o que a skill entrega depende do seu briefing e da sua revisão.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: ACCENT_TEXT, boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir a skill no GitHub
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-8 text-center text-xs text-[#777]">
            github.com/mattypark/Motion-graphics-skill · conferido em 25 de novembro de 2026
          </p>
        </div>
      )}

      <SalesCta utmContent="redesocial" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
