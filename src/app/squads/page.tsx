import { parseSquads } from '@/lib/parsers/squad-parser';
import { SquadCard } from '@/components/squads/squad-card';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function SquadsPage() {
  const squads = parseSquads();

  const totalAgents = squads.reduce((acc, s) => acc + s.agents.length, 0);
  const totalTasks = squads.reduce((acc, s) => acc + s.tasks.length, 0);
  const totalWorkflows = squads.reduce((acc, s) => acc + s.workflows.length, 0);

  return (
    <div className="space-y-6">
      <p className="text-sm text-[#888]">
        {squads.length} squads disponiveis com {totalAgents} agentes, {totalTasks} tarefas e {totalWorkflows} workflows
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#F07652]">{squads.length}</p>
            <p className="text-xs text-[#888] mt-1">Squads</p>
          </CardContent>
        </Card>
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#3BA856]">{totalAgents}</p>
            <p className="text-xs text-[#888] mt-1">Agentes</p>
          </CardContent>
        </Card>
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#8B5CF6]">{totalTasks}</p>
            <p className="text-xs text-[#888] mt-1">Tarefas</p>
          </CardContent>
        </Card>
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-[#FBBF24]">{totalWorkflows}</p>
            <p className="text-xs text-[#888] mt-1">Workflows</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {squads.map((squad) => (
          <SquadCard key={squad.slug} squad={squad} />
        ))}
      </div>
    </div>
  );
}
