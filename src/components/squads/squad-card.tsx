import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Squad } from '@/lib/parsers/squad-parser';

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

export function SquadCard({ squad }: { squad: Squad }) {
  const color = SQUAD_COLORS[squad.slug] || '#666';

  return (
    <Link href={`/squads/${squad.slug}`}>
      <Card
        className="border-[#2A2A2E] bg-[#1A1A1D] transition-all duration-200 hover:border-[#EA8049]/30 hover:shadow-lg hover:shadow-black/20 cursor-pointer h-full"
        style={{ borderTopColor: color, borderTopWidth: '3px' }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#eee] text-lg">{squad.shortTitle}</h3>
            <Badge variant="secondary" className="bg-[#262629] text-[#888] text-xs border border-[#2A2A2E]">
              v{squad.version}
            </Badge>
          </div>
          <p className="text-sm text-[#888] line-clamp-2">{squad.description}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-[#262629] p-2">
              <p className="text-lg font-bold text-[#F07652]">{squad.agents.length}</p>
              <p className="text-[10px] text-[#888] uppercase tracking-wider">Agentes</p>
            </div>
            <div className="rounded-xl bg-[#262629] p-2">
              <p className="text-lg font-bold text-[#8B5CF6]">{squad.tasks.length}</p>
              <p className="text-[10px] text-[#888] uppercase tracking-wider">Tarefas</p>
            </div>
            <div className="rounded-xl bg-[#262629] p-2">
              <p className="text-lg font-bold text-[#FBBF24]">{squad.workflows.length}</p>
              <p className="text-[10px] text-[#888] uppercase tracking-wider">Workflows</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {squad.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-[#262629] text-[#888] text-[10px] border border-[#2A2A2E]">
                {tag}
              </Badge>
            ))}
            {squad.tags.length > 4 && (
              <Badge variant="secondary" className="bg-[#262629] text-[#666] text-[10px] border border-[#2A2A2E]">
                +{squad.tags.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
