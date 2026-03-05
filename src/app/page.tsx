import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { parseSquads } from '@/lib/parsers/squad-parser';
import { parseWorkflows } from '@/lib/parsers/workflow-parser';
import { parseStories } from '@/lib/parsers/story-parser';
import { getProjects } from '@/lib/config.server';
import fs from 'fs';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const SQUAD_COLORS: Record<string, string> = {
  'brand-squad': '#E91E63',
  'copy-squad': '#FF9800',
  'hormozi-squad': '#F44336',
  'traffic-masters': '#3B82F6',
  'design-squad': '#8B5CF6',
  'storytelling': '#06B6D4',
  'advisory-board': '#6B7280',
  'cybersecurity': '#10B981',
  'movement': '#F97316',
  'data-squad': '#6366F1',
  'c-level-squad': '#92400E',
};

export default function HomePage() {
  const squads = parseSquads();
  const workflows = parseWorkflows();
  const PROJECTS = getProjects();

  const totalAgents = squads.reduce((acc, s) => acc + s.agents.length, 0);
  const totalSquadWorkflows = squads.reduce((acc, s) => acc + s.workflows.length, 0);

  let totalStories = 0;
  let storiesInProgress = 0;
  let storiesDone = 0;
  const projectData: Array<{
    slug: string;
    name: string;
    exists: boolean;
    storyCount: number;
    doneCount: number;
    inProgressCount: number;
  }> = [];

  for (const p of PROJECTS) {
    const exists = fs.existsSync(p.path);
    if (!exists) {
      projectData.push({ slug: p.slug, name: p.name, exists, storyCount: 0, doneCount: 0, inProgressCount: 0 });
      continue;
    }
    const stories = parseStories(p.path);
    const done = stories.filter((s) => s.status === 'Done').length;
    const inProg = stories.filter((s) => s.status === 'InProgress').length;
    totalStories += stories.length;
    storiesDone += done;
    storiesInProgress += inProg;
    projectData.push({
      slug: p.slug,
      name: p.name,
      exists,
      storyCount: stories.length,
      doneCount: done,
      inProgressCount: inProg,
    });
  }

  const stats = [
    { label: 'Squads', value: squads.length, color: 'text-[#F07652]', href: '/squads' },
    { label: 'Agentes', value: totalAgents, color: 'text-[#3BA856]', href: '/squads' },
    { label: 'Projetos', value: PROJECTS.length, color: 'text-[#eee]', href: '/projects' },
    { label: 'Workflows', value: workflows.length + totalSquadWorkflows, color: 'text-[#8B5CF6]', href: '/workflows' },
    { label: 'Em Progresso', value: storiesInProgress, color: 'text-[#FBBF24]', href: null },
    { label: 'Concluidas', value: storiesDone, color: 'text-[#3BA856]', href: null },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => {
          const content = (
            <Card className="border-[#2A2A2E] bg-[#1A1A1D] hover:border-[#EA8049]/30 transition-all duration-200 hover:shadow-lg hover:shadow-[#EA8049]/5">
              <CardContent className="p-4 text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-[#888] mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href}>{content}</Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      {/* Squads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Squads</h3>
          <Link href="/squads" className="text-xs text-[#F07652] hover:text-[#EA8049] transition-colors font-medium">
            Ver todos &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {squads.map((squad) => (
            <Link key={squad.slug} href={`/squads/${squad.slug}`}>
              <Card
                className="border-[#2A2A2E] bg-[#1A1A1D] hover:border-[#EA8049]/30 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-black/20"
                style={{ borderTopColor: SQUAD_COLORS[squad.slug] || '#666', borderTopWidth: '3px' }}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-semibold text-[#eee] truncate">{squad.shortTitle}</p>
                  <p className="text-xs text-[#888] mt-1">{squad.agents.length} agentes</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Projetos */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Projetos</h3>
        <div className="space-y-2">
          {projectData.map((p) => {
            const progress = p.storyCount > 0 ? Math.round((p.doneCount / p.storyCount) * 100) : 0;
            return (
              <Link key={p.slug} href={`/projects/${p.slug}`}>
                <Card className="border-[#2A2A2E] bg-[#1A1A1D] hover:border-[#EA8049]/30 transition-all duration-200 cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-[#eee] truncate">{p.name}</h4>
                        {!p.exists && (
                          <Badge variant="secondary" className="bg-red-900/30 text-red-400 text-xs shrink-0 border border-red-800/30">
                            Nao Encontrado
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-[#888] mt-0.5">
                        {p.storyCount} historias &middot;{' '}
                        <span className="text-[#FBBF24]">{p.inProgressCount} em progresso</span> &middot;{' '}
                        <span className="text-[#3BA856]">{p.doneCount} concluidas</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-32 h-2 rounded-full bg-[#262629] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#3BA856] transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[#888] w-10 text-right">
                        {progress}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
