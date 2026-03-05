import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Workflow } from '@/lib/types';

export function WorkflowDiagram({ workflow }: { workflow: Workflow }) {
  return (
    <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white">{workflow.name}</h3>
            <p className="text-sm text-[#666]">{workflow.id}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-[#262629] text-[#888] text-xs border border-[#2A2A2E]">
              v{workflow.version}
            </Badge>
            <Badge variant="secondary" className="bg-[#262629] text-[#888] text-xs border border-[#2A2A2E]">
              {workflow.type}
            </Badge>
          </div>
        </div>
        {workflow.description && (
          <p className="text-sm text-[#888] mt-2">{workflow.description}</p>
        )}
      </CardHeader>
      <CardContent>
        {workflow.phases.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {workflow.phases.map((phase, i) => (
              <div key={phase.id} className="flex items-center gap-2 shrink-0">
                <div className="rounded-xl border border-[#2A2A2E] bg-[#262629] px-4 py-3 min-w-[140px]">
                  <p className="text-xs font-mono text-[#F07652] mb-1">
                    {phase.agent ? `@${phase.agent}` : `Etapa ${i + 1}`}
                  </p>
                  <p className="text-sm text-[#eee]">{phase.name}</p>
                </div>
                {i < workflow.phases.length - 1 && (
                  <span className="text-[#F07652] text-lg shrink-0">&#8594;</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#666] italic">Nenhuma fase definida</p>
        )}
      </CardContent>
    </Card>
  );
}
