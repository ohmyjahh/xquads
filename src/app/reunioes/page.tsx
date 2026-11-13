"use client";

import { useState, useSyncExternalStore } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  MessagesSquare,
  Video,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D97757";
const CONFERIDO = "13/11/2026, às 08h53 (horário de Brasília)";
const ARTIGO = "https://claude.com/resources/articles/claude-meetings";
const HELP_CENTER = "https://support.claude.com/en/articles/18325154-use-claude-meetings";
/* O link curto /en/articles/18325154 responde 301; aqui vai a URL final, para o QA ver 200. */

const ENTREGAS = [
  { icone: ClipboardList, nome: "O que preparar", texto: "O aviso para o time, o plano em que o recurso está e o que o administrador da conta precisa liberar." },
  { icone: CalendarClock, nome: "Como colocar o Claude na chamada", texto: "Conectar a agenda, adicionar o Claude em uma reunião e a opção de ele entrar sozinho." },
  { icone: MessagesSquare, nome: "Como usar durante a reunião", texto: "Perguntar em voz alta ou no chat, pedir documento e whiteboard, aprovar ferramentas e pausar." },
  { icone: CheckCircle2, nome: "Como usar depois", texto: "Onde ficam as notas, o resumo e os action items, e como voltar às reuniões passadas." },
  { icone: Video, nome: "Dicas de uso", texto: "O que é público na chamada, o que fica interno e os cuidados que o próprio artigo pede." },
  { icone: BookOpen, nome: "O artigo oficial", texto: "O botão para ler o texto da Anthropic na íntegra, sem resumo no meio." },
];

const ALERTAS = [
  "Claude Meetings está em beta e está sendo liberado nos planos Team e Enterprise, no Claude e no Claude Desktop. Enquanto está em beta, não está disponível para algumas organizações, incluindo as com retenção zero de dados (ZDR), configuração pronta para HIPAA ou chaves de criptografia gerenciadas pelo cliente (CMEK).",
  "Por enquanto, só no Google Meet. A Anthropic diz que o suporte a outras plataformas de vídeo vem em breve.",
  "No plano Team o recurso já vem ligado e um administrador (owner) pode desligar. No Enterprise ele vem desligado e um administrador precisa ligar, para toda a organização ou só para parte dela.",
  "Custo: durante o beta, as notas, as transcrições e as respostas que não usam as ferramentas conectadas estão incluídas nos planos Team e Enterprise. Documentos e whiteboards feitos numa reunião são grátis até 10 de fevereiro de 2027. Usar as ferramentas conectadas conta no seu uso e pode gerar cobrança para a organização.",
  "O que ele guarda: o Claude entra como participante e avisa no chat. Ele salva transcrição, resumo e descrições de tela, não áudio.",
  "Antes de adicionar o Claude ou ligar o auto-join, confirme que todo mundo na chamada está de acordo com ser transcrito.",
  "Convidado de fora: no plano Team, o Claude pode entrar em chamadas com convidado de fora por padrão, e um administrador (owner) pode desligar isso; no Enterprise, um administrador precisa liberar primeiro. Quando não está liberado, ele fica fora da chamada e sai se alguém de fora entrar no meio, inclusive o robô de notas de outra empresa. Quando está liberado, ele avisa no chat, mas não responde ali; o que os convidados falam entra nas notas e na transcrição, e os convidados não recebem a página da reunião nem o e-mail de recap. Cada pessoa também tem a própria opção em Settings > Capabilities > Meetings.",
  "Quem vê o quê: o que o Claude posta no chat do Meet aparece para todos na chamada. O chat da página da reunião é interno à organização. Pessoas da organização no convite veem e editam o que ele fez, e a página pode ser compartilhada com outras pessoas da organização.",
  "Tempo: o Claude pode ficar até 8 horas na chamada e avisa antes de sair.",
];

type Passo = { quando: "Antes" | "Na conexão" | "Durante" | "Depois"; titulo: string; texto: string };

const PASSOS: Passo[] = [
  {
    quando: "Antes",
    titulo: "Combine com o time que a chamada vai ser transcrita",
    texto:
      "O próprio artigo pede isso antes de qualquer coisa: confirme que todos na chamada estão de acordo com ser transcritos. O Claude salva transcrição, resumo e descrições de tela, não áudio.",
  },
  {
    quando: "Antes",
    titulo: "Confirme o plano e quem libera",
    texto:
      "O recurso está em beta nos planos Team e Enterprise. No Team já vem ligado; no Enterprise, um administrador (owner) precisa ligar, para a organização toda ou só para parte dela. Se a conta não é sua, vale perguntar para quem administra o Claude da empresa.",
  },
  {
    quando: "Na conexão",
    titulo: "Abra Meetings no Claude e conecte o Google Calendar",
    texto:
      "A conexão da agenda é feita em Meetings, dentro do Claude. Depende de um administrador (owner) já ter liberado o Google Calendar para a organização.",
  },
  {
    quando: "Na conexão",
    titulo: "Escolha a reunião e clique em Add Claude",
    texto:
      "A agenda em Meetings mostra suas próximas reuniões: selecione a reunião e clique em \"Add Claude\". O outro caminho é o auto-join, em Settings > Capabilities > Meetings > Auto-join, onde você escolhe entrar em todas as reuniões ou em todas menos as de um a um. Administrador não liga isso por você.",
  },
  {
    quando: "Durante",
    titulo: "Deixe o Claude entrar",
    texto:
      "Ele normalmente entra sem pedir. Se a chamada pedir aprovação, o host libera. Se o host recusar, o Claude não tenta de novo naquela reunião, a menos que alguém adicione outra vez.",
  },
  {
    quando: "Durante",
    titulo: "Pergunte dizendo \"Claude\" ou digite no chat do Meet",
    texto:
      "O artigo mostra os dois caminhos: falar em voz alta ou escrever no chat. Por padrão a resposta vem por escrito, no chat do Meet, e tudo o que ele posta ali aparece para todos na chamada.",
  },
  {
    quando: "Durante",
    titulo: "Peça o que você quer construir",
    texto:
      "Frases como \"Claude, faça um doc\" ou \"Claude, faça um whiteboard\" funcionam. Qualquer pessoa do time pode pedir, quantas vezes quiser, e cada item fica anexado à página da reunião. O artigo cita documentos, whiteboards e outros artefatos, e o guia do Help Center inclui slides.",
  },
  {
    quando: "Durante",
    titulo: "Aprove o que ele pedir antes de usar uma ferramenta",
    texto:
      "O Claude usa as ferramentas conectadas de cada pessoa com a permissão dela: pergunta na primeira vez e o sim vale para as próximas. Quando o pedido é em voz alta, por enquanto ele confirma cada vez quem está falando. Quando precisa de aprovação, o pedido aparece no chat do Meet quando possível; se precisar confirmar a conta do Claude, aparece na página da reunião.",
  },
  {
    quando: "Durante",
    titulo: "Acompanhe, pause ou mande sair",
    texto:
      "O tile do Claude na chamada mostra o que ele está fazendo naquele momento. Para pausar, peça para ele parar de ouvir ou use a página da reunião; para retomar, a página. Para sair, peça ou use \"Remove Claude\". Ele pode ficar até 8 horas e avisa antes de sair.",
  },
  {
    quando: "Depois",
    titulo: "Peça um recap antes de encerrar",
    texto:
      "O exemplo do artigo é o time pedindo ao Claude um recap para compartilhar antes do fim da chamada. Depois, a página da reunião tem as notas, o resumo, os action items, a transcrição e tudo o que foi feito ali.",
  },
  {
    quando: "Depois",
    titulo: "Abra a página da reunião",
    texto:
      "O link é o que o Claude posta no chat do Meet quando entra. A página tem a transcrição ao vivo, o chat e o que ele fez. Quem é da organização e está no convite vê, edita e recebe um e-mail com o link.",
  },
  {
    quando: "Depois",
    titulo: "Volte às reuniões e pergunte sobre elas",
    texto:
      "A agenda em Meetings lista reuniões passadas e futuras, então dá para voltar a qualquer reunião em que o Claude entrou ou adicionar o Claude à próxima. Num chat comum, dá para perguntar ao Claude sobre reuniões passadas que você tem acesso.",
  },
];

const DICAS = [
  "Ele não grava áudio. O que fica salvo é transcrição, resumo e descrição de tela, então o material é texto, não uma gravação da conversa.",
  "Chat do Meet é público para a chamada. Se a pergunta for sensível, use o chat da página da reunião, que é interno à organização e os convidados de fora não veem.",
  "Pergunta em voz alta exige confirmação de quem falou. Se precisar de velocidade, escrever no chat evita essa etapa.",
  "Reunião com convidado de fora: no Team o padrão é o Claude poder entrar, e o administrador pode desligar; no Enterprise alguém precisa liberar. Se não estiver liberado, ele fica fora e sai se o convidado entrar no meio.",
  "Peça o documento durante a conversa: quem está no convite pode editar o que ele escreveu enquanto a reunião continua, e é aí que o material fica pronto de verdade.",
  "Recomendação nossa: releia as notas antes de compartilhar a página, porque o resumo é gerado a partir do que foi falado, inclusive de fala ambígua.",
  "Recomendação nossa: use o auto-join só se você quiser o Claude em toda reunião. Em conversa de um a um, a opção de deixar de fora as reuniões de um a um existe justamente para isso.",
];

const FONTES = [
  { nome: "Anthropic: Introducing Claude Meetings (artigo de 12/11/2026)", url: ARTIGO },
  { nome: "Help Center da Anthropic: Use Claude Meetings (atualizado em 13/11/2026)", url: HELP_CENTER },
];

export default function ReunioesPage() {
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
        <div className="rounded-xl px-4 py-3 text-center text-xs font-mono" style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}>
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o acesso fica protegido.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-mono text-[#999]">
          <BookOpen className="h-3.5 w-3.5" />
          Passo a passo conferido em {CONFERIDO}
        </p>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium" style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}>
            <Video className="h-4 w-4" />
            Claude nas reuniões · passo a passo
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          Use o Claude nas suas reuniões:{" "}
          <span style={{ color: ACCENT }}>ele entra na chamada, anota e monta o documento</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          O Claude pode entrar na sua chamada de vídeo como um participante visível, acompanhar a
          conversa e adiantar trabalho enquanto vocês falam. Aqui está o que preparar, como colocar
          ele na reunião, o que pedir durante e onde ficam as notas depois.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que tem no passo a passo</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ENTREGAS.map((r) => (
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
          source="reunioes-page"
          accent={ACCENT}
          buttonTextColor="#1a0f0a"
          title="Receba o passo a passo do Claude nas reuniões"
          description="Preencha seus dados para liberar o passo a passo completo, do aviso ao time até as notas depois da chamada."
          contentNote="Você vai liberar: os passos numerados, o que preparar antes e as dicas de uso."
          buttonLabel="Liberar o passo a passo"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section className="rounded-xl border p-5" style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}>
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Leia antes de usar
            </h2>
            <ul className="mt-3 space-y-2">
              {ALERTAS.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">O passo a passo</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Doze passos, na ordem em que a coisa acontece. Nomes de menu e de botão estão como
              aparecem no produto em inglês.
            </p>
            <ol className="space-y-3">
              {PASSOS.map((p, i) => (
                <li key={p.titulo} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                      style={{ backgroundColor: `${ACCENT}1F`, color: ACCENT }}
                    >
                      {i + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#777]">{p.quando}</p>
                      <h3 className="font-semibold leading-snug">{p.titulo}</h3>
                      <p className="text-sm leading-relaxed text-[#bbb]">{p.texto}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Dicas de uso</h2>
            <article className="space-y-2 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
              {DICAS.map((t) => (
                <p key={t} className="flex gap-3 text-sm leading-relaxed text-[#bbb]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <span>{t}</span>
                </p>
              ))}
            </article>
          </section>

          <section className="space-y-3">
            <a
              href={ARTIGO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT, color: "#1a0f0a" }}
            >
              Ler o artigo oficial
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
            <a
              href={HELP_CENTER}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] px-6 py-3 text-sm font-semibold text-[#bbb] transition-colors hover:text-white"
            >
              Ver as instruções de configuração no Help Center
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
            <p className="text-xs leading-relaxed text-[#777]">
              O artigo oficial manda buscar os passos de configuração no Help Center, que é a fonte
              dos nomes de menu usados aqui.
            </p>
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="text-lg font-semibold">Fontes</h2>
            <ul className="mt-3 space-y-2">
              {FONTES.map((f) => (
                <li key={f.url}>
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-sm leading-relaxed text-[#bbb] hover:text-white">
                    <span>{f.nome}</span>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[#777]">Fontes lidas em {CONFERIDO}</p>
          </section>
        </div>
      )}

      <SalesCta utmContent="reunioes" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
