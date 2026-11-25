"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Clapperboard,
  Download,
  Play,
  LogIn,
  PenLine,
  Ghost,
  CalendarClock,
  LineChart,
  AlertTriangle,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F472B6";
const ACCENT_TEXT = "#2a0a1a";

const REPO = "https://github.com/yihui-dev/awesome-opus5-5-videos";
const REPO_TXT = "github.com/yihui-dev/awesome-opus5-5-videos";
const SKILLRY = "https://skillry.dev/ai-videos/opus-5-5";

const AVISO =
  "Automatizar publicação pode ir contra os termos das plataformas, então comece devagar e revise os primeiros vídeos.";

const PROMPT_CRIAR_SKILL = `Baixe a coleção ${REPO} para uma pasta do meu computador e, com ela, crie uma skill minha chamada video-por-dia.

A coleção tem 703 prompts de vídeos feitos com o Claude Opus 5.5, um arquivo .md por vídeo na pasta prompts/. Cada vídeo foi feito escrevendo a animação como código (HTML, Canvas, SVG, Three.js).

A skill que você vai criar deve, a cada vídeo que eu pedir:
1. Buscar na pasta prompts/ os prompts mais parecidos com o tema do vídeo.
2. Adaptar esses prompts ao meu nicho e ao formato vertical 9:16, usando só a estrutura e a ideia deles, nunca copiando o conteúdo de outro criador.
3. Gerar a animação num único arquivo HTML.
4. Gravar a página em MP4.

Regras:
- Se algum prompt estiver incompleto ou em outro idioma (como chinês), me avise, traduza o que for preciso e não use um prompt incompleto sem me dizer.
- Se faltar alguma ferramenta para gravar a página em MP4, me explique para que ela serve e pergunte se eu quero instalar. Não instale nada sem a minha resposta.
- Não me peça senha nem chave aqui no chat.

Quando terminar, me diga onde a skill ficou salva e como eu a chamo.`;

const PROMPT_TESTE = `Teste a skill video-por-dia com um prompt da coleção. Escolha um prompt da pasta prompts/ que combine com o meu nicho [nicho]. Se ele estiver em outro idioma, traduza antes de usar. Gere a animação num único arquivo HTML em formato vertical 9:16, grave a página em MP4 e me mostre o vídeo pronto antes de seguir para qualquer outra coisa. Se algo falhar ou faltar ferramenta, me explique e pergunte antes de instalar. Não me peça senha nem chave aqui no chat.`;

const PROMPT_LOGIN = `Abra o seu navegador interno na página de login do [Instagram / TikTok / YouTube / LinkedIn]. Eu vou fazer o login na mão, dentro dele. Não vou colar senha, código nem chave aqui no chat, e você não deve me pedir. Quando a janela de login estiver aberta, espere eu terminar e me avise que a sessão ficou ativa.`;

const BRIEFING = `Você produz e publica um vídeo curto por dia para a minha conta, usando a skill video-por-dia, criada a partir da coleção de prompts de vídeos. Siga este briefing.

QUEM SOU EU
- Nicho: [descreva em uma frase o assunto da conta]
- Público: [quem assiste: profissão, momento, o que quer resolver]
- Redes onde publicar: [Instagram / TikTok / YouTube Shorts / LinkedIn]

O QUE PRODUZIR
- Formato: [9:16, 16:9 ou 1:1] com [duração, por exemplo 20 a 40 segundos]
- Tipo de vídeo: animação e texto na tela, sem narração
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
Se o login cair, se faltar arquivo, se der erro na gravação do vídeo ou se você não tiver certeza de que o conteúdo está correto. É melhor parar do que publicar errado.`;

const PROMPT_FANTASMA = `Use a conta [@conta-fantasma], que eu já deixei logada no navegador interno. Ela só segue concorrentes meus, então olhe apenas o feed dela. Todo [dia / semana], separe os [5] vídeos com mais engajamento e, para cada um, descreva só a ESTRUTURA: o gancho dos primeiros segundos, o ritmo, o formato, a duração e como termina. Depois proponha como aplicar a mesma estrutura ao meu nicho [nicho], com tema e texto meus. Nunca baixe, copie nem poste o vídeo de outra pessoa. Não curta, não comente e não siga ninguém por conta própria.`;

const PROMPT_ROTINA = `Crie uma tarefa agendada que roda todo dia às [horário]. A cada execução, use a skill video-por-dia, que você criou a partir da coleção de prompts, para produzir um vídeo seguindo o briefing de conteúdo que eu te passei e publicar nas redes que conectei.

COMBINADOS PARA RODAR SEM ME PERGUNTAR
- Aprovação: eu aprovo de antemão todo vídeo que seguir o briefing e o formato [9:16 / 16:9 / 1:1]. Pode gravar o MP4 sem pedir confirmação a cada vídeo.
- Vídeo: sem narração, só animação e texto na tela.
- Primeiros dias: nos primeiros [7] dias, NÃO publique. Salve o vídeo pronto em [pasta de revisão] e me avise para eu revisar. Só publique sozinho depois que eu escrever "pode publicar sozinho".

SE ALGO FALHAR
Se o login cair, se faltar arquivo ou se a gravação do vídeo der erro, pare e me avise. Não tente contornar e nunca me peça senha no chat.

REGRA FIXA
Use só a estrutura dos vídeos de referência e dos prompts da coleção. Nunca baixe nem poste vídeo de outra pessoa.`;

const PROMPT_APRENDER = `Revise os vídeos que você publicou nos últimos [7] dias nas minhas redes. Abra o painel de cada rede no navegador interno (já estou logado) e anote, de cada vídeo, as métricas que estiverem visíveis: [visualizações, retenção, curtidas, comentários, compartilhamentos]. Me diga o que os de melhor desempenho têm em comum (gancho, tema, duração, formato). Com base só nesses números, proponha ajustes para os próximos vídeos e, se eu aprovar, atualize o briefing. Não invente número que você não conseguiu ler e me diga o que ficou sem dado.`;

type Bloco = { rotulo: string; botao: string; texto: string };

const CATEGORIAS = [
  "Motion graphics",
  "Explainers (vídeos explicativos)",
  "Cenas 3D",
  "Jogos e interativos",
];

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
    titulo: "Transforme a coleção numa skill sua",
    texto:
      "A coleção não é uma skill pronta, é uma pasta de prompts. Este prompt manda o Claude baixá-la e criar uma skill própria, que a cada vídeo escolhe os prompts mais parecidos com o seu tema e grava o resultado em MP4.",
    blocos: [{ rotulo: "Prompt para criar a sua skill", botao: "Copiar o prompt", texto: PROMPT_CRIAR_SKILL }],
  },
  {
    n: "2",
    icone: Play,
    titulo: "Teste com um prompt da coleção",
    texto:
      "Antes de ligar a rotina, confira que o fluxo funciona: o Claude pega um prompt da coleção, gera o HTML, grava o MP4 e mostra o vídeo para você.",
    blocos: [{ rotulo: "Prompt de teste", botao: "Copiar o prompt", texto: PROMPT_TESTE }],
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
      "Para publicar todo dia, é preciso uma tarefa agendada no Claude. O vídeo não detalha esse passo. O prompt abaixo deixa combinada a aprovação e a trava de revisão dos primeiros dias.",
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
          Com uma coleção de 703 prompts de vídeos feitos com o Claude Opus 5.5, você monta uma
          skill sua que cria animações, e com uma rotina agendada o Claude pode publicar nas suas
          redes. Aqui está o repositório certo e um prompt pronto para cada passo.
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
          title="Receba a coleção e o passo a passo"
          description="Preencha seus dados para liberar o link da coleção, os sete passos e os prompts."
          contentNote="Você vai liberar: o link da coleção de prompts, o prompt que cria a sua skill, os sete passos, o molde de briefing e os prompts da rotina diária, prontos para copiar."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-12">
          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Clapperboard className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
              A coleção: Awesome Opus 5.5 Videos
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              <strong className="text-white">É uma coleção de prompts, não uma skill pronta.</strong>{" "}
              O repositório <span className="font-mono text-[13px] text-[#ccc]">yihui-dev/awesome-opus5-5-videos</span>{" "}
              reúne 703 prompts de vídeos virais feitos com o Claude Opus 5.5. Em todos eles, a
              animação foi escrita como código (HTML, Canvas, SVG, Three.js). O prompt do passo 1 é
              o que transforma a coleção numa skill sua.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#999]">
              {CATEGORIAS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-[#999]">
              A licença é MIT, e cada vídeo e cada prompt pertence ao seu criador. Alguns prompts
              estão incompletos ou em outro idioma, como o chinês, e o prompt do passo 1 já manda o
              Claude avisar e traduzir.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 break-all text-sm font-semibold underline underline-offset-4"
                style={{ color: ACCENT }}
              >
                {REPO_TXT}
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
              <a
                href={SKILLRY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 break-all text-sm text-[#999] underline underline-offset-4"
              >
                Opcional: ver os vídeos no Skillry (skillry.dev/ai-videos/opus-5-5)
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </div>
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

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Antes de liberar o piloto automático</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#999]">
              Revise os primeiros vídeos você mesmo. O prompt da rotina já manda salvar na pasta de
              revisão nos primeiros dias, sem publicar. Quando o resultado estiver do jeito que você
              quer, aí sim libere a publicação sozinha. A página não promete alcance, seguidores nem
              vendas: o que a sua skill entrega depende do seu briefing e da sua revisão.
            </p>
          </section>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: ACCENT, color: ACCENT_TEXT, boxShadow: `0 10px 36px ${ACCENT}40` }}
          >
            Abrir a coleção no GitHub
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <p className="-mt-8 text-center text-xs text-[#777]">
            {REPO_TXT} · conferido em 25 de novembro de 2026
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
