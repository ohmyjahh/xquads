import {
  MessageSquare,
  Briefcase,
  Code2,
  Plug,
  Sparkles,
  ArrowRight,
  FileText,
  FolderOpen,
  Repeat,
  Globe,
  Rocket,
} from "lucide-react";

const SALES_URL =
  "https://www.raxo.com.br/vibecodingvsl?utm_source=instagram&utm_medium=organico&utm_campaign=xquads-isca-nov25&utm_content=guia-claude";

export const metadata = {
  title: "Guia Claude — Os 3 níveis | Xquads",
  description:
    "Guia prático dos 3 níveis do Claude: Web, Cowork e Code. Entenda quando usar cada um, como ativar conectores e como usar as skills.",
};

export default function ClaudeGuidePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#D97757]/10 border border-[#D97757]/20 px-4 py-1.5 text-xs font-medium text-[#D97757]">
          <Sparkles className="h-3.5 w-3.5" />
          Guia Prático
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Os 3 níveis do <span className="text-[#D97757]">Claude</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Web, Cowork e Code — entenda de uma vez por todas qual é a diferença
          entre eles, quando usar cada um e como destravar conectores e skills.
        </p>
      </div>

      {/* Primeiro parágrafo */}
      <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
        <p>
          O Claude não é uma ferramenta só — são <strong className="text-white">3 níveis
          diferentes de uso</strong>, cada um feito para um tipo de trabalho. A maioria
          das pessoas conhece apenas o chat e para por aí. Mas é justamente nos
          outros dois níveis que está o maior potencial: automatizar tarefas
          repetitivas do dia a dia e criar aplicativos e sistemas completos sem
          precisar ser programador. Neste guia você vai entender exatamente o que
          cada nível faz e como começar a usar hoje.
        </p>
      </div>

      {/* CTA GRANDE */}
      <div className="rounded-2xl border border-[#D97757]/30 bg-gradient-to-br from-[#D97757]/15 via-[#1a1a1e] to-[#1a1a1e] p-6 sm:p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#D97757]/15 px-3 py-1 text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
          <Rocket className="h-3.5 w-3.5" />
          Nova possibilidade no mercado
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          Está surgindo uma nova fonte de renda: usar IA para criar projetos —
          para a sua empresa ou para vender para outras
        </h2>
        <p className="text-sm text-[#999] max-w-lg mx-auto leading-relaxed">
          Pessoas sem nenhuma base em programação estão criando sistemas, painéis
          e automações com IA e cobrando por isso. Se você quer conhecer esse
          caminho, clica aqui embaixo.
        </p>
        <a
          href={SALES_URL}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D97757] hover:bg-[#c5603a] text-white text-base font-semibold px-8 py-4 transition-colors"
        >
          Quero conhecer
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>

      {/* Os 3 níveis */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Os 3 níveis
        </h2>

        {/* Nível 1 — Claude Web */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97757]/10">
              <MessageSquare className="h-5 w-5 text-[#D97757]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
                Nível 1
              </p>
              <h3 className="text-lg font-bold text-white">Claude Web</h3>
            </div>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            É a porta de entrada: o chat que você acessa pelo navegador ou pelo
            app. Aqui você conversa com a IA, tira dúvidas, escreve textos,
            resume documentos e analisa arquivos.
          </p>
          <ul className="text-sm text-[#999] space-y-2">
            <li className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Aceita PDFs, imagens e planilhas</strong> —
                arrasta o arquivo pra conversa e pede análise, resumo ou extração de dados
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Globe className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Ideal para o dia a dia</strong> — e-mails,
                propostas, estudos, brainstorms e qualquer tarefa de texto
              </span>
            </li>
          </ul>
          <p className="text-xs text-[#666]">
            Para quem está começando: domine esse nível primeiro.
          </p>
        </div>

        {/* Nível 2 — Claude Cowork */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97757]/10">
              <Briefcase className="h-5 w-5 text-[#D97757]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
                Nível 2
              </p>
              <h3 className="text-lg font-bold text-white">Claude Cowork</h3>
            </div>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            Aqui o Claude deixa de ser um chat e vira um colega de trabalho. Ele
            se conecta às suas ferramentas e executa tarefas de verdade dentro
            delas — não só responde perguntas.
          </p>
          <ul className="text-sm text-[#999] space-y-2">
            <li className="flex items-start gap-2">
              <Plug className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Conectores</strong> — liga o Claude ao
                Gmail, Canva, Notion e outras ferramentas que você já usa
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FolderOpen className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Trabalha em pastas e subpastas</strong> —
                organiza projetos, lê e cria arquivos dentro delas
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Repeat className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Automações</strong> — tarefas repetitivas
                (relatórios, organização de e-mails, atualização de documentos)
                viram rotinas que ele executa por você
              </span>
            </li>
          </ul>
          <p className="text-xs text-[#666]">
            É o nível que mais economiza tempo no trabalho do dia a dia.
          </p>
        </div>

        {/* Nível 3 — Claude Code */}
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97757]/10">
              <Code2 className="h-5 w-5 text-[#D97757]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
                Nível 3
              </p>
              <h3 className="text-lg font-bold text-white">Claude Code</h3>
            </div>
          </div>
          <p className="text-sm text-[#999] leading-relaxed">
            O nível mais avançado — e o mais poderoso. O Claude Code serve para
            <strong className="text-[#ccc]"> criar códigos, aplicativos e sistemas completos</strong>.
            Você descreve o que quer em português e ele escreve, testa e corrige
            o código sozinho.
          </p>
          <ul className="text-sm text-[#999] space-y-2">
            <li className="flex items-start gap-2">
              <Code2 className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Sites, sistemas e apps</strong> — landing
                pages, dashboards, CRMs, automações e produtos digitais inteiros
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Rocket className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Sem precisar ser programador</strong> — é
                aqui que nasce o &quot;vibe coding&quot;: você dirige, a IA constrói
              </span>
            </li>
          </ul>
          <p className="text-xs text-[#666]">
            É o nível que abre a porta para criar projetos para a sua empresa —
            ou para vender para outras.
          </p>
        </div>
      </div>

      {/* Como usar os conectores */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Plug className="h-4 w-4 text-[#D97757]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Como usar os conectores
          </h2>
        </div>
        <p className="text-sm text-[#999] leading-relaxed">
          Conectores são as pontes entre o Claude e as ferramentas que você já
          usa. Com eles ativados, você pode pedir coisas como &quot;resume os
          e-mails de hoje&quot; ou &quot;cria uma página no Notion com esse conteúdo&quot;.
        </p>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Abra as configurações do Claude e procure por <strong className="text-[#ccc]">Conectores</strong> (Connectors)</li>
          <li>Escolha a ferramenta — Gmail, Canva, Notion, Google Drive, Calendar...</li>
          <li>Autorize o acesso com a sua conta (login único, leva segundos)</li>
          <li>Pronto: agora é só pedir em linguagem natural — o Claude acessa e executa direto na ferramenta</li>
        </ol>
        <p className="text-xs text-[#666]">
          Dica: comece conectando o Gmail. Pedir um resumo dos e-mails não lidos
          do dia é o jeito mais rápido de sentir o poder dos conectores.
        </p>
      </div>

      {/* Como usar as skills */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#D97757]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Como usar as habilidades (skills)
          </h2>
        </div>
        <p className="text-sm text-[#999] leading-relaxed">
          Skills são pacotes de instruções que ensinam o Claude a executar uma
          tarefa específica do seu jeito — um padrão de proposta comercial, um
          formato de post, um processo da sua empresa. Em vez de explicar tudo a
          cada conversa, você ensina uma vez e reaproveita sempre.
        </p>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Acesse a área de <strong className="text-[#ccc]">Skills</strong> (Capacidades) nas configurações do Claude</li>
          <li>Ative as skills prontas que fizerem sentido (criação de documentos, planilhas, apresentações...)</li>
          <li>Para algo específico do seu negócio, crie a sua: descreva o passo a passo, o tom e exemplos do resultado esperado</li>
          <li>Na conversa, é automático — o Claude identifica quando usar a skill e aplica sozinho</li>
        </ol>
        <p className="text-xs text-[#666]">
          Dica: pense nas skills como funcionários treinados. Quanto melhor o
          treinamento (instruções + exemplos), melhor a entrega.
        </p>
      </div>

      {/* CTA final */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 text-center space-y-3">
        <h2 className="text-lg font-bold text-white">
          Quer aprender a criar projetos com IA na prática?
        </h2>
        <p className="text-sm text-[#999] max-w-md mx-auto">
          Do zero ao primeiro sistema funcionando — mesmo sem nunca ter
          programado.
        </p>
        <a
          href={SALES_URL}
          className="inline-flex items-center gap-2 rounded-lg bg-[#D97757] hover:bg-[#c5603a] text-white text-sm font-semibold px-6 py-3 transition-colors"
        >
          Conhecer agora
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span className="text-[#D97757]">@rafa.grandi</span>
      </p>
    </div>
  );
}
