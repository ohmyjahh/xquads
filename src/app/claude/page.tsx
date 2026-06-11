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
  Rocket,
  CheckCircle2,
  Lightbulb,
  Mail,
  Calendar,
  PenTool,
  Database,
  HardDrive,
  Terminal,
  Layers,
  HelpCircle,
} from "lucide-react";

const SALES_URL =
  "https://www.raxo.com.br/vibecodingvsl?utm_source=instagram&utm_medium=organico&utm_campaign=xquads-isca-nov25&utm_content=guia-claude";

export const metadata = {
  title: "Manual Claude: os 3 níveis | Xquads",
  description:
    "Manual completo dos 3 níveis do Claude: Web, Cowork e Code. Aprenda quando usar cada um, como ativar conectores, como usar skills e exemplos práticos de uso.",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
      {children}
    </h2>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-[#D97757]/5 border border-[#D97757]/15 p-4">
      <Lightbulb className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
      <p className="text-sm text-[#bbb] leading-relaxed">{children}</p>
    </div>
  );
}

export default function ClaudeGuidePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* ============ HEADER ============ */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#D97757]/10 border border-[#D97757]/20 px-4 py-1.5 text-xs font-medium text-[#D97757]">
          <Sparkles className="h-3.5 w-3.5" />
          Manual Completo
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Os 3 níveis do <span className="text-[#D97757]">Claude</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          O manual definitivo para entender o Claude Web, o Claude Cowork e o
          Claude Code. O que cada um faz, quando usar, como configurar
          conectores e skills, e exemplos práticos para aplicar hoje.
        </p>
      </div>

      {/* ============ INTRODUÇÃO ============ */}
      <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
        <p>
          A maioria das pessoas usa apenas 10% do que o Claude oferece. Abrem o
          chat, fazem uma pergunta, copiam a resposta e fecham. O que pouca
          gente sabe é que o Claude funciona em{" "}
          <strong className="text-white">3 níveis de profundidade</strong>: o
          chat que todo mundo conhece, um modo de trabalho que se conecta às
          suas ferramentas e executa tarefas sozinho, e um nível avançado capaz
          de construir aplicativos e sistemas completos do zero. Cada nível
          serve para um tipo de trabalho, e saber qual usar em cada situação é
          o que separa quem brinca com IA de quem realmente produz com ela.
        </p>
      </div>

      {/* ============ CTA GRANDE ============ */}
      <div className="rounded-2xl border border-[#D97757]/30 bg-gradient-to-br from-[#D97757]/15 via-[#1a1a1e] to-[#1a1a1e] p-6 sm:p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#D97757]/15 px-3 py-1 text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
          <Rocket className="h-3.5 w-3.5" />
          Nova possibilidade no mercado
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          Está surgindo uma nova fonte de renda: usar inteligência artificial
          para criar projetos, seja para a sua empresa ou para vender para
          outras
        </h2>
        <p className="text-sm text-[#999] max-w-lg mx-auto leading-relaxed">
          Pessoas sem nenhuma base em programação estão criando sistemas,
          painéis e automações com IA e cobrando caro por isso. O mercado está
          pagando por quem sabe transformar IA em resultado. Se você quer
          conhecer esse caminho, clica no botão aqui embaixo.
        </p>
        <a
          href={SALES_URL}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D97757] hover:bg-[#c5603a] text-white text-base font-semibold px-8 py-4 transition-colors"
        >
          Quero conhecer
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>

      {/* ============ VISÃO GERAL ============ */}
      <div className="space-y-4">
        <SectionTitle>Antes de começar: o que é o Claude?</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            O Claude é a inteligência artificial criada pela Anthropic, uma das
            empresas de IA mais avançadas do mundo. Ele compete de igual para
            igual com o ChatGPT e, em muitas tarefas, principalmente escrita,
            análise de documentos e programação, é considerado superior por
            grande parte dos usuários profissionais.
          </p>
          <p>
            O que muda entre os 3 níveis não é a inteligência. O cérebro é o
            mesmo. O que muda é o{" "}
            <strong className="text-white">nível de acesso e autonomia</strong>{" "}
            que você dá para ele: no primeiro nível ele só conversa, no segundo
            ele trabalha dentro das suas ferramentas, e no terceiro ele constrói
            sistemas inteiros no seu computador.
          </p>
        </div>

        {/* Tabela resumo */}
        <div className="rounded-xl border border-[#2a2a2e] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a1e] text-left">
                <th className="px-4 py-3 text-[#888] font-medium">Nível</th>
                <th className="px-4 py-3 text-[#888] font-medium">Para quê</th>
                <th className="px-4 py-3 text-[#888] font-medium hidden sm:table-cell">
                  Onde roda
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2e]">
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  1. Web
                </td>
                <td className="px-4 py-3 text-[#999]">
                  Conversar, escrever, analisar PDFs e arquivos
                </td>
                <td className="px-4 py-3 text-[#999] hidden sm:table-cell">
                  Navegador e app
                </td>
              </tr>
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  2. Cowork
                </td>
                <td className="px-4 py-3 text-[#999]">
                  Executar tarefas nas suas ferramentas e automatizar rotinas
                </td>
                <td className="px-4 py-3 text-[#999] hidden sm:table-cell">
                  App desktop
                </td>
              </tr>
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  3. Code
                </td>
                <td className="px-4 py-3 text-[#999]">
                  Criar códigos, aplicativos e sistemas completos
                </td>
                <td className="px-4 py-3 text-[#999] hidden sm:table-cell">
                  Terminal e VS Code
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ NÍVEL 1: CLAUDE WEB ============ */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D97757]/10 border border-[#D97757]/20">
            <MessageSquare className="h-6 w-6 text-[#D97757]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
              Nível 1
            </p>
            <SectionTitle>Claude Web</SectionTitle>
          </div>
        </div>

        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            É a porta de entrada. Você acessa pelo navegador em claude.ai ou
            pelo aplicativo no celular, escreve o que precisa e ele responde.
            Parece simples, e é, mas dentro desse chat existe muito mais do que
            perguntas e respostas.
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            O que você consegue fazer no Web
          </h3>
          <ul className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Analisar PDFs e documentos.</strong>{" "}
                Arraste um contrato, relatório, planilha ou apresentação para a
                conversa e peça resumo, análise de riscos, extração de dados ou
                comparação entre versões. Ele lê documentos de centenas de
                páginas em segundos.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PenTool className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Escrever qualquer coisa.</strong>{" "}
                E-mails, propostas comerciais, posts, roteiros, contratos,
                descrições de produto. Quanto mais contexto você der (público,
                objetivo, tom de voz), melhor o resultado.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Criar artifacts.</strong> Peça
                uma landing page, um dashboard, um infográfico ou uma
                apresentação e ele gera o resultado visual na hora, dentro da
                própria conversa, pronto para você ver funcionando.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Organizar Projetos.</strong>{" "}
                Crie um Projeto, suba arquivos de referência e defina
                instruções fixas. Todas as conversas dentro daquele Projeto já
                nascem sabendo o contexto do seu negócio, sem você precisar
                explicar tudo de novo a cada chat.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Exemplos práticos de uso
          </h3>
          <ul className="space-y-2 text-sm text-[#999]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Analisa esse contrato e me aponta as cláusulas que podem
                me prejudicar&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Transforma essa planilha de vendas em um relatório
                executivo com os 5 principais insights&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Escreve 10 variações desse anúncio, cada uma com um gatilho
                mental diferente&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Cria um dashboard visual com esses números do meu
                faturamento&quot;
              </span>
            </li>
          </ul>
        </div>

        <Tip>
          Domine os Projetos antes de qualquer coisa. Criar um Projeto com as
          informações do seu negócio (o que você vende, para quem, seu tom de
          voz) multiplica a qualidade de todas as respostas. É a diferença
          entre um estagiário no primeiro dia e um funcionário que já conhece a
          empresa.
        </Tip>
      </div>

      {/* ============ NÍVEL 2: CLAUDE COWORK ============ */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D97757]/10 border border-[#D97757]/20">
            <Briefcase className="h-6 w-6 text-[#D97757]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
              Nível 2
            </p>
            <SectionTitle>Claude Cowork</SectionTitle>
          </div>
        </div>

        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Aqui a coisa muda de patamar. O Cowork transforma o Claude em um
            colega de trabalho de verdade: em vez de só responder perguntas,
            ele <strong className="text-white">entra nas suas ferramentas e executa as tarefas</strong>.
            Lê seus e-mails, cria páginas no Notion, monta designs no Canva,
            organiza arquivos em pastas e repete processos quantas vezes for
            preciso.
          </p>
          <p>
            A lógica é simples: você delega como delegaria para um assistente.
            Descreve a tarefa, ele abre as ferramentas necessárias, faz o
            trabalho e te mostra o resultado pronto.
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Os 3 superpoderes do Cowork
          </h3>
          <ul className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <Plug className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Conectores.</strong> São as
                pontes entre o Claude e as ferramentas que você já usa: Gmail,
                Canva, Notion, Google Drive, Google Agenda e muitas outras. Com
                o conector ativo, ele acessa e trabalha direto na ferramenta,
                sem você precisar copiar e colar nada.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FolderOpen className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Trabalho em pastas e subpastas.</strong>{" "}
                Você aponta uma pasta do seu computador e ele lê, organiza,
                renomeia e cria arquivos dentro dela. Quer organizar 200 fotos
                por data e evento? Renomear dezenas de contratos seguindo um
                padrão? Ele faz.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Repeat className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Automação de tarefas repetitivas.</strong>{" "}
                Aquele processo chato que você faz toda semana (montar
                relatório, responder os mesmos e-mails, atualizar planilha)
                vira uma instrução salva. Você pede uma vez, ele repete sempre
                que precisar, do mesmo jeito.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Exemplos práticos de uso
          </h3>
          <ul className="space-y-2 text-sm text-[#999]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Lê os e-mails não respondidos da semana e prepara um
                rascunho de resposta para cada um&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Pega esse documento de briefing e cria a estrutura
                completa do projeto no Notion&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Organiza essa pasta de notas fiscais por mês e cria uma
                planilha resumo com os valores&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                &quot;Toda segunda-feira, monta o relatório de vendas no padrão
                que eu te ensinei&quot;
              </span>
            </li>
          </ul>
        </div>

        <Tip>
          Comece pequeno: escolha UMA tarefa repetitiva que te toma 30 minutos
          por semana e delega para o Cowork. Quando ela estiver rodando bem,
          adicione a próxima. Em um mês você terá um assistente cuidando de
          várias rotinas do seu negócio.
        </Tip>
      </div>

      {/* ============ NÍVEL 3: CLAUDE CODE ============ */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D97757]/10 border border-[#D97757]/20">
            <Code2 className="h-6 w-6 text-[#D97757]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#D97757] uppercase tracking-wider">
              Nível 3
            </p>
            <SectionTitle>Claude Code</SectionTitle>
          </div>
        </div>

        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            O nível mais poderoso de todos. O Claude Code serve para{" "}
            <strong className="text-white">criar códigos, aplicativos e sistemas completos</strong>.
            Ele roda no seu computador, tem acesso aos arquivos do projeto e
            trabalha como um programador sênior: escreve o código, testa,
            encontra os erros, corrige e continua até funcionar.
          </p>
          <p>
            E aqui está o detalhe que mudou o jogo: você não precisa saber
            programar. Você descreve em português o que quer construir
            (&quot;quero um sistema de agendamento para minha clínica, com
            cadastro de pacientes e lembrete por WhatsApp&quot;) e ele
            constrói. É isso que o mercado está chamando de vibe coding: você
            dirige com ideias, a IA constrói com código.
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            O que dá para construir
          </h3>
          <ul className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <Rocket className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Sites e landing pages</strong>{" "}
                profissionais, com formulário de captura, integração com
                pagamento e publicação na internet
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Database className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Sistemas internos</strong> como
                CRMs, painéis de controle, gestão de estoque, controle
                financeiro e agendamento
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Terminal className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Automações avançadas</strong>{" "}
                que conectam ferramentas, processam dados e rodam sozinhas em
                segundo plano
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Produtos digitais completos</strong>{" "}
                como aplicativos web, áreas de membros, marketplaces e
                ferramentas SaaS
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Como funciona na prática
          </h3>
          <ol className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                1
              </span>
              <span>
                Você instala o Claude Code no computador (funciona no terminal
                ou dentro do VS Code, e a instalação leva poucos minutos)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                2
              </span>
              <span>
                Descreve o que quer construir, em português mesmo, com o máximo
                de detalhes sobre o resultado esperado
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                3
              </span>
              <span>
                Ele planeja, escreve o código, testa e corrige os erros
                sozinho, te mostrando o progresso a cada etapa
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                4
              </span>
              <span>
                Você revisa o resultado funcionando, pede ajustes e publica.
                Sistemas que antes custavam dezenas de milhares de reais com
                uma software house saem em dias, não meses
              </span>
            </li>
          </ol>
        </div>

        <Tip>
          O Claude Code é exatamente a ferramenta usada para criar os projetos
          que estão gerando essa nova fonte de renda no mercado. Quem domina
          esse nível consegue entregar sistemas para empresas locais, criar os
          próprios produtos digitais ou economizar muito dinheiro construindo
          internamente o que antes era terceirizado.
        </Tip>
      </div>

      {/* ============ CONECTORES ============ */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D97757]/10 border border-[#D97757]/20">
            <Plug className="h-6 w-6 text-[#D97757]" />
          </div>
          <SectionTitle>Guia: como usar os conectores</SectionTitle>
        </div>

        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Os conectores merecem uma seção própria porque são o recurso mais
            subestimado do Claude. Sem eles, você fica copiando e colando
            informação entre ferramentas. Com eles, o Claude vira o centro de
            comando de tudo: pede em uma frase e ele resolve onde for preciso.
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Conectores mais úteis
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-[#141416] border border-[#2a2a2e] p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D97757]" />
                <p className="text-sm font-semibold text-white">Gmail</p>
              </div>
              <p className="text-xs text-[#888] leading-relaxed">
                Resumir e-mails, encontrar mensagens antigas, preparar
                rascunhos de resposta e identificar o que precisa de atenção
              </p>
            </div>
            <div className="rounded-lg bg-[#141416] border border-[#2a2a2e] p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <PenTool className="h-4 w-4 text-[#D97757]" />
                <p className="text-sm font-semibold text-white">Canva</p>
              </div>
              <p className="text-xs text-[#888] leading-relaxed">
                Criar designs, posts e apresentações direto na sua conta,
                usando seus templates e identidade visual
              </p>
            </div>
            <div className="rounded-lg bg-[#141416] border border-[#2a2a2e] p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-[#D97757]" />
                <p className="text-sm font-semibold text-white">Notion</p>
              </div>
              <p className="text-xs text-[#888] leading-relaxed">
                Criar páginas, organizar bases de dados, documentar processos e
                manter sua central de conhecimento atualizada
              </p>
            </div>
            <div className="rounded-lg bg-[#141416] border border-[#2a2a2e] p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-[#D97757]" />
                <p className="text-sm font-semibold text-white">Google Drive</p>
              </div>
              <p className="text-xs text-[#888] leading-relaxed">
                Buscar documentos, ler arquivos e cruzar informações entre
                planilhas e docs sem abrir nada manualmente
              </p>
            </div>
            <div className="rounded-lg bg-[#141416] border border-[#2a2a2e] p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#D97757]" />
                <p className="text-sm font-semibold text-white">Google Agenda</p>
              </div>
              <p className="text-xs text-[#888] leading-relaxed">
                Consultar compromissos, criar eventos, sugerir horários livres
                e organizar sua semana
              </p>
            </div>
            <div className="rounded-lg bg-[#141416] border border-[#2a2a2e] p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Plug className="h-4 w-4 text-[#D97757]" />
                <p className="text-sm font-semibold text-white">E muitos outros</p>
              </div>
              <p className="text-xs text-[#888] leading-relaxed">
                Figma, Slack, Asana, Stripe, Zapier... a lista de conectores
                cresce todo mês
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Passo a passo para ativar
          </h3>
          <ol className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                1
              </span>
              <span>
                No Claude, abra <strong className="text-[#ccc]">Configurações</strong>{" "}
                e procure a seção{" "}
                <strong className="text-[#ccc]">Conectores</strong> (Connectors)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                2
              </span>
              <span>
                Clique na ferramenta que quer conectar e autorize o acesso com
                a sua conta (é um login único, igual entrar com Google em
                qualquer site)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                3
              </span>
              <span>
                Volte para a conversa e peça normalmente: &quot;busca no meu
                Drive a proposta do cliente X e resume os pontos principais&quot;
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                4
              </span>
              <span>
                O Claude acessa a ferramenta, executa e te traz o resultado na
                conversa. Na primeira vez ele pede sua confirmação antes de
                agir, depois o fluxo fica natural
              </span>
            </li>
          </ol>
        </div>

        <Tip>
          Ative o Gmail primeiro. Pedir &quot;resume os e-mails não lidos de
          hoje e me diz quais precisam de resposta urgente&quot; é o jeito mais
          rápido de sentir na pele o poder dos conectores. Depois disso você
          não volta mais ao modo antigo.
        </Tip>
      </div>

      {/* ============ SKILLS ============ */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D97757]/10 border border-[#D97757]/20">
            <Sparkles className="h-6 w-6 text-[#D97757]" />
          </div>
          <SectionTitle>Guia: como usar as habilidades (skills)</SectionTitle>
        </div>

        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Skills são pacotes de conhecimento que ensinam o Claude a executar
            uma tarefa específica do seu jeito. Pense assim: o Claude já é
            inteligente, mas ele não conhece os SEUS processos. A skill é o
            manual de treinamento que você entrega uma única vez, e a partir
            dali ele executa aquele trabalho sempre no mesmo padrão.
          </p>
          <p>
            Existem skills prontas (criação de documentos Word, planilhas
            Excel, apresentações em PowerPoint, PDFs) e skills que você mesmo
            cria para o seu negócio: seu modelo de proposta comercial, seu
            formato de post, seu processo de atendimento, seu padrão de
            relatório.
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Passo a passo para usar
          </h3>
          <ol className="space-y-3 text-sm text-[#999]">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                1
              </span>
              <span>
                Nas configurações do Claude, abra a seção{" "}
                <strong className="text-[#ccc]">Capacidades</strong> (ou
                Skills) e veja a lista das habilidades disponíveis
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                2
              </span>
              <span>
                Ative as que fazem sentido para o seu trabalho. As de
                documentos (Word, Excel, PowerPoint) são as mais usadas no dia
                a dia de qualquer negócio
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                3
              </span>
              <span>
                Para criar a sua: descreva o passo a passo da tarefa, o tom, as
                regras do que fazer e do que evitar, e inclua um ou dois
                exemplos de resultado ideal
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-bold shrink-0">
                4
              </span>
              <span>
                Na conversa, não precisa fazer nada especial: o Claude
                identifica sozinho quando a skill se aplica e usa
                automaticamente
              </span>
            </li>
          </ol>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-6 space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Exemplos de skills que valem ouro
          </h3>
          <ul className="space-y-2 text-sm text-[#999]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Proposta comercial:</strong>{" "}
                estrutura, precificação e tom da sua empresa. Você só informa o
                cliente e o escopo, a proposta sai pronta
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Conteúdo para redes:</strong>{" "}
                seus formatos de post, ganchos que funcionam com seu público e
                regras da sua marca
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3BA856] mt-0.5 shrink-0" />
              <span>
                <strong className="text-[#ccc]">Relatório semanal:</strong> o
                padrão exato do documento que você entrega para cliente ou
                diretoria, sempre no mesmo formato
              </span>
            </li>
          </ul>
        </div>

        <Tip>
          Pense nas skills como funcionários treinados: quanto melhor o
          treinamento (instruções claras + exemplos reais), melhor a entrega.
          Uma skill bem escrita economiza horas de retrabalho toda semana.
        </Tip>
      </div>

      {/* ============ QUAL NÍVEL USAR ============ */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D97757]/10 border border-[#D97757]/20">
            <HelpCircle className="h-6 w-6 text-[#D97757]" />
          </div>
          <SectionTitle>Qual nível usar em cada situação?</SectionTitle>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a1e] text-left">
                <th className="px-4 py-3 text-[#888] font-medium">
                  Se você quer...
                </th>
                <th className="px-4 py-3 text-[#888] font-medium whitespace-nowrap">
                  Use
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2e]">
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-[#999]">
                  Tirar dúvidas, escrever textos, analisar um PDF
                </td>
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  Web
                </td>
              </tr>
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-[#999]">
                  Responder e-mails, criar páginas no Notion, montar design no
                  Canva
                </td>
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  Cowork
                </td>
              </tr>
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-[#999]">
                  Organizar pastas de arquivos e automatizar rotinas semanais
                </td>
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  Cowork
                </td>
              </tr>
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-[#999]">
                  Criar um site, sistema, aplicativo ou produto digital
                </td>
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  Code
                </td>
              </tr>
              <tr className="bg-[#141416]">
                <td className="px-4 py-3 text-[#999]">
                  Construir projetos para vender para outras empresas
                </td>
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                  Code
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            O caminho natural é evoluir de nível conforme a necessidade cresce:
            comece dominando o Web no dia a dia, ative o Cowork para
            automatizar suas rotinas e, quando estiver pronto para construir
            de verdade, o Code é onde está a maior oportunidade.
          </p>
        </div>
      </div>

      {/* ============ CTA FINAL ============ */}
      <div className="rounded-2xl border border-[#D97757]/30 bg-gradient-to-br from-[#D97757]/15 via-[#1a1a1e] to-[#1a1a1e] p-6 sm:p-8 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          Quer aprender a criar projetos com IA na prática?
        </h2>
        <p className="text-sm text-[#999] max-w-lg mx-auto leading-relaxed">
          Do zero ao primeiro sistema funcionando, mesmo sem nunca ter escrito
          uma linha de código. Conheça o método que está formando a primeira
          geração de criadores de projetos com IA do Brasil.
        </p>
        <a
          href={SALES_URL}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D97757] hover:bg-[#c5603a] text-white text-base font-semibold px-8 py-4 transition-colors"
        >
          Conhecer agora
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>

      {/* ============ FOOTER ============ */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span className="text-[#D97757]">@rafa.grandi</span>
      </p>
    </div>
  );
}
