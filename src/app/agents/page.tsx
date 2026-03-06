import { parseSquads } from '@/lib/parsers/squad-parser';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/squads/copy-button';
import { AgentAvatar } from '@/components/agents/agent-avatar';
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

export default function AgentsPage() {
  const squads = parseSquads();
  const totalAgents = squads.reduce((acc, s) => acc + s.agents.length, 0);

  return (
    <div className="space-y-8">
      <p className="text-sm text-[#888]">
        {totalAgents} agentes distribuidos em {squads.length} squads. Clique no card para ver a bio.
      </p>

      {squads.map((squad) => (
        <div key={squad.slug}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: SQUAD_COLORS[squad.slug] || '#666' }}
            />
            <Link href={`/squads/${squad.slug}`} className="hover:text-[#EA8049] transition-colors">
              <h3 className="text-base font-semibold text-white">{squad.shortTitle}</h3>
            </Link>
            <Badge variant="secondary" className="bg-[#1E1E21] text-[#888] text-[11px] border border-[#2A2A2E]">
              {squad.agents.length} agentes
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {squad.agents.map((agent) => (
              <Link key={agent.id} href={`/agents/${squad.slug}/${agent.id}`}>
                <Card
                  className="border-[#2A2A2E] bg-[#1A1A1D] hover:border-[#EA8049]/30 hover:bg-[#1E1E21] transition-all cursor-pointer h-full"
                  style={{ borderLeftColor: SQUAD_COLORS[squad.slug] || '#666', borderLeftWidth: '3px' }}
                >
                  <CardContent className="p-3 flex items-start gap-3">
                    <AgentAvatar agentId={agent.id} size={40} />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div>
                        <p className="text-sm font-medium text-[#eee]">{agent.name}</p>
                        <p className="text-[11px] text-[#666]">@{agent.id}</p>
                      </div>
                      <CopyButton text={agent.activationCommand} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
