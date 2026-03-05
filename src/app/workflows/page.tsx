import { parseWorkflows } from '@/lib/parsers/workflow-parser';
import { parseSquads } from '@/lib/parsers/squad-parser';
import { WorkflowDiagram } from '@/components/workflows/workflow-diagram';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/squads/copy-button';
import { ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CORE_WORKFLOW_NAMES: Record<string, string> = {
  'story-development-cycle': 'Ciclo de Desenvolvimento de Story',
  'qa-loop': 'Loop de QA',
  'spec-pipeline': 'Pipeline de Especificacao',
  'epic-orchestration': 'Orquestracao de Epic',
  'brownfield-discovery': 'Descoberta Brownfield',
  'brownfield-fullstack': 'Brownfield Fullstack',
  'brownfield-service': 'Brownfield Service',
  'brownfield-ui': 'Brownfield UI',
  'greenfield-fullstack': 'Greenfield Fullstack',
  'greenfield-service': 'Greenfield Service',
  'greenfield-ui': 'Greenfield UI',
  'development-cycle': 'Ciclo de Desenvolvimento',
  'auto-worktree': 'Worktree Automatico',
  'design-system-build-quality': 'Qualidade do Design System',
};

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

export default function WorkflowsPage() {
  const coreWorkflows = parseWorkflows();
  const squads = parseSquads();

  const totalSquadWfs = squads.reduce((acc, s) => acc + s.workflows.length, 0);

  return (
    <div className="space-y-8">
      <p className="text-sm text-[#888]">
        {coreWorkflows.length} workflows do framework + {totalSquadWfs} workflows de squads
      </p>

      {/* Core Workflows */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full bg-[#EA8049]" />
          <h3 className="text-base font-semibold text-white">Framework AIOS</h3>
          <Badge variant="secondary" className="bg-[#1E1E21] text-[#888] text-[11px] border border-[#2A2A2E]">
            {coreWorkflows.length} workflows
          </Badge>
        </div>
        <div className="space-y-3">
          {coreWorkflows.map((workflow) => {
            const translatedName = CORE_WORKFLOW_NAMES[workflow.id] || workflow.name;
            return (
              <WorkflowDiagram
                key={workflow.id}
                workflow={{ ...workflow, name: translatedName }}
              />
            );
          })}
        </div>
      </div>

      {/* Squad Workflows */}
      {squads.filter((s) => s.workflows.length > 0).map((squad) => (
        <div key={squad.slug}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: SQUAD_COLORS[squad.slug] || '#666' }} />
            <h3 className="text-base font-semibold text-white">{squad.shortTitle}</h3>
            <Badge variant="secondary" className="bg-[#1E1E21] text-[#888] text-[11px] border border-[#2A2A2E]">
              {squad.workflows.length} workflows
            </Badge>
          </div>
          <div className="space-y-3">
            {squad.workflows.map((wf) => (
              <Card key={wf.id} className="border-[#2A2A2E] bg-[#1A1A1D]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white">{wf.name}</h3>
                      <p className="text-xs text-[#666]">{wf.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {wf.estimatedDuration && (
                        <Badge variant="secondary" className="bg-[#262629] text-[#888] text-xs border border-[#2A2A2E]">
                          {wf.estimatedDuration}
                        </Badge>
                      )}
                      {wf.trigger && (
                        <CopyButton text={wf.trigger} className="bg-[#F07652]/10 text-[#F07652] border border-[#F07652]/20" />
                      )}
                    </div>
                  </div>
                  {wf.description && (
                    <p className="text-sm text-[#888] mt-2">{wf.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  {wf.steps.length > 0 ? (
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {wf.steps.map((step, i) => (
                        <div key={`${step.agent}-${step.action}`} className="flex items-center gap-2 shrink-0">
                          <div className="rounded-xl border border-[#2A2A2E] bg-[#262629] px-4 py-3 min-w-[140px]">
                            <p className="text-xs font-mono text-[#F07652] mb-1">@{step.agent}</p>
                            <p className="text-sm text-[#eee]">{step.action}</p>
                            {step.creates && (
                              <p className="text-[10px] text-[#666] mt-1">
                                <ChevronRight className="h-2.5 w-2.5 inline" /> {step.creates}
                              </p>
                            )}
                          </div>
                          {i < wf.steps.length - 1 && (
                            <span className="text-[#F07652] text-lg shrink-0">&#8594;</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#666] italic">Nenhum passo definido</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
