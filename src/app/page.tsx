import { Card, CardContent } from '@/components/ui/card';
import { parseSquads } from '@/lib/parsers/squad-parser';
import Link from 'next/link';
import { Users, Workflow, ListChecks, Shield, Sparkles, Brain, Target, Zap, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default function HomePage() {
  const squads = parseSquads();
  const totalAgents = squads.reduce((acc, s) => acc + s.agents.length, 0);
  const totalWorkflows = squads.reduce((acc, s) => acc + s.workflows.length, 0);
  const totalTasks = squads.reduce((acc, s) => acc + s.tasks.length, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EA8049]/10 border border-[#EA8049]/20 px-4 py-1.5 text-xs font-medium text-[#EA8049]">
          <Sparkles className="h-3.5 w-3.5" />
          Squads de Agentes IA Especializados
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          X<span className="text-[#EA8049]">quads</span>
        </h1>
        <p className="text-lg text-[#888] max-w-2xl mx-auto leading-relaxed">
          As maiores mentes trabalhando para voce
        </p>
      </div>

      {/* Stats compactos */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Shield, label: 'Squads', value: squads.length, color: '#F07652' },
          { icon: Users, label: 'Agentes', value: totalAgents, color: '#3BA856' },
          { icon: Workflow, label: 'Workflows', value: totalWorkflows, color: '#8B5CF6' },
          { icon: ListChecks, label: 'Tasks', value: totalTasks, color: '#FBBF24' },
        ].map((s) => (
          <Card key={s.label} className="border-[#2A2A2E] bg-[#1A1A1D]">
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className="h-5 w-5 shrink-0" style={{ color: s.color }} />
              <div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-[11px] text-[#666]">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* O que e o Xquads */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">O que e o Xquads?</h2>
        <div className="space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            O <span className="text-white font-medium">Xquads</span> e um sistema de inteligencia artificial
            que organiza agentes especializados em squads tematicos. Cada squad reune as maiores referencias
            de uma area — copywriters lendarios, estrategistas de trafego, mestres de storytelling, consultores
            de branding, especialistas em cybersecurity e muito mais — todos transformados em agentes de IA
            prontos para trabalhar no seu projeto.
          </p>
          <p>
            Em vez de usar uma IA generica que sabe um pouco de tudo, voce ativa o especialista certo
            para cada situacao. Precisa de uma oferta irresistivel? O squad do Hormozi entra em acao.
            Precisa de copy que converte? Gary Halbert, Eugene Schwartz e David Ogilvy estao a um comando de distancia.
            Quer construir um movimento? O squad de Movement cria a arquitetura completa.
          </p>
        </div>
      </div>

      {/* Por que criamos */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Por que criamos isso?</h2>
        <div className="space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            A maioria das ferramentas de IA trata todos os problemas da mesma forma — com um modelo generico
            que nao entende o contexto do seu negocio. Nos acreditamos que a IA so se torna realmente poderosa
            quando ela e <span className="text-white font-medium">especializada, contextualizada e organizada</span>.
          </p>
          <p>
            Criamos o Xquads porque vimos que empreendedores e equipes precisam de mais do que respostas
            genericas. Eles precisam de consultores virtuais que pensem como os melhores do mundo em cada
            disciplina — com frameworks reais, metodologias comprovadas e a profundidade de quem dedicou
            a vida inteira a um campo.
          </p>
        </div>
      </div>

      {/* Pilares */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-white">Como funciona</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Brain,
              color: '#EA8049',
              title: 'Agentes Especializados',
              desc: 'Cada agente e uma persona de IA treinada com o conhecimento, estilo e frameworks de uma referencia real. Nao e um chatbot generico — e um especialista com personalidade, metodologia e foco definidos.',
            },
            {
              icon: Target,
              color: '#8B5CF6',
              title: 'Workflows Inteligentes',
              desc: 'Workflows conectam agentes em sequencias logicas. Um workflow de criacao de oferta, por exemplo, passa pelo estrategista, copywriter e especialista em pricing automaticamente, cada um contribuindo com sua expertise.',
            },
            {
              icon: Zap,
              color: '#FBBF24',
              title: 'Tasks Executaveis',
              desc: 'Tasks sao acoes concretas que os agentes executam — criar uma oferta, auditar um negocio, gerar hooks, montar um lancamento. Cada task tem inputs, outputs e criterios de qualidade definidos.',
            },
          ].map((pillar) => (
            <Card key={pillar.title} className="border-[#2A2A2E] bg-[#1A1A1D]">
              <CardContent className="p-5 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${pillar.color}15` }}>
                  <pillar.icon className="h-5 w-5" style={{ color: pillar.color }} />
                </div>
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{pillar.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-4">
        <Link
          href="/squads"
          className="inline-flex items-center gap-2 rounded-lg bg-[#EA8049] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d0703f] transition-colors"
        >
          Explorar Squads
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1E1E21] border border-[#2A2A2E] px-6 py-2.5 text-sm font-medium text-[#ccc] hover:border-[#EA8049]/30 hover:text-white transition-colors"
        >
          Ver Agentes
        </Link>
      </div>
    </div>
  );
}
