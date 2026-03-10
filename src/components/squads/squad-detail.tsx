'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from './copy-button';
import { AgentAvatar } from '@/components/agents/agent-avatar';
import type { Squad } from '@/lib/parsers/squad-parser';
import { Users, ListChecks, GitBranch, Route, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Tab = 'agents' | 'workflows' | 'tasks' | 'routing';

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

export function SquadDetail({ squad }: { squad: Squad }) {
  const [activeTab, setActiveTab] = useState<Tab>('agents');
  const color = SQUAD_COLORS[squad.slug] || '#666';
  const hasRouting = Object.keys(squad.routingMatrix).length > 0;

  const tabs: { id: Tab; label: string; icon: typeof Users; count: number }[] = [
    { id: 'agents', label: 'Agentes', icon: Users, count: squad.agents.length },
    { id: 'workflows', label: 'Workflows', icon: GitBranch, count: squad.workflows.length },
    { id: 'tasks', label: 'Tarefas', icon: ListChecks, count: squad.tasks.length },
    ...(hasRouting
      ? [{ id: 'routing' as Tab, label: 'Roteamento', icon: Route, count: Object.keys(squad.routingMatrix).length }]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full" style={{ backgroundColor: color }} />
            <h1 className="text-xl md:text-2xl font-bold text-white">{squad.shortTitle}</h1>
            <Badge variant="secondary" className="bg-[#262629] text-[#888] border border-[#2A2A2E]">v{squad.version}</Badge>
          </div>
          <p className="text-sm text-[#888] max-w-2xl">{squad.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {squad.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-[#262629] text-[#666] text-xs border border-[#2A2A2E]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3 text-center shrink-0">
          <div className="rounded-xl bg-[#1A1A1D] border border-[#2A2A2E] px-3 md:px-5 py-3">
            <p className="text-xl md:text-2xl font-bold text-[#F07652]">{squad.agents.length}</p>
            <p className="text-[10px] text-[#888] uppercase tracking-wider">Agentes</p>
          </div>
          <div className="rounded-xl bg-[#1A1A1D] border border-[#2A2A2E] px-3 md:px-5 py-3">
            <p className="text-xl md:text-2xl font-bold text-[#8B5CF6]">{squad.tasks.length}</p>
            <p className="text-[10px] text-[#888] uppercase tracking-wider">Tarefas</p>
          </div>
          <div className="rounded-xl bg-[#1A1A1D] border border-[#2A2A2E] px-3 md:px-5 py-3">
            <p className="text-xl md:text-2xl font-bold text-[#FBBF24]">{squad.workflows.length}</p>
            <p className="text-[10px] text-[#888] uppercase tracking-wider">Workflows</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#2A2A2E] pb-px overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-t-xl ${
              activeTab === tab.id
                ? 'bg-[#1A1A1D] text-[#F07652] border border-[#2A2A2E] border-b-[#121214]'
                : 'text-[#888] hover:text-[#eee] hover:bg-[#1A1A1D]/50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <span className="ml-1 text-xs text-[#666]">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'agents' && (
        <div className="space-y-2">
          <p className="text-xs text-[#888] mb-4">
            Clique no card para ver a bio do agente, ou copie o comando para ativar no Claude Code.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {squad.agents.map((agent) => (
              <Link key={agent.id} href={`/agents/${squad.slug}/${agent.id}`}>
                <Card className="border-[#2A2A2E] bg-[#1A1A1D] hover:border-[#EA8049]/30 hover:bg-[#1E1E21] transition-all cursor-pointer h-full"
                  style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
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
      )}

      {activeTab === 'workflows' && (
        <div className="space-y-4">
          <p className="text-xs text-[#888] mb-4">
            Ative o chief do squad primeiro, depois execute o workflow com o comando de gatilho.
          </p>
          {squad.workflows.length === 0 ? (
            <p className="text-sm text-[#666] italic">Nenhum workflow definido</p>
          ) : (
            squad.workflows.map((wf) => (
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
            ))
          )}
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-2">
          <p className="text-xs text-[#888] mb-4">
            Tarefas executadas pelos agentes durante workflows. Use <code className="text-[#F07652] bg-[#F07652]/10 px-1 rounded">*nome-da-tarefa</code> apos ativar um agente.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {squad.tasks.map((task) => (
              <Card key={task.id} className="border-[#2A2A2E] bg-[#1A1A1D] hover:border-[#EA8049]/30 transition-all duration-200">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#eee] truncate">{task.name}</p>
                    <p className="text-[10px] text-[#666] font-mono">{task.filename}</p>
                  </div>
                  <CopyButton text={`*${task.id}`} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'routing' && hasRouting && (
        <div className="space-y-2">
          <p className="text-xs text-[#888] mb-4">
            A matriz de roteamento determina qual agente e acionado para cada tipo de desafio.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[#2A2A2E]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1A1A1D]">
                  <th className="text-left py-3 px-4 text-[#888] font-medium border-b border-[#2A2A2E]">Desafio</th>
                  <th className="text-left py-3 px-4 text-[#888] font-medium border-b border-[#2A2A2E]">Primario</th>
                  <th className="text-left py-3 px-4 text-[#888] font-medium border-b border-[#2A2A2E]">Secundario</th>
                  <th className="text-left py-3 px-4 text-[#888] font-medium border-b border-[#2A2A2E]">Gatilhos</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(squad.routingMatrix).map(([key, val]) => (
                  <tr key={key} className="border-b border-[#2A2A2E]/50 hover:bg-[#1A1A1D]/50 transition-colors">
                    <td className="py-2.5 px-4 text-[#eee] font-medium capitalize">{key.replace(/_/g, ' ')}</td>
                    <td className="py-2.5 px-4">
                      <CopyButton
                        text={`/${squad.slashPrefix}:agents:${val.primary}`}
                        className="bg-[#F07652]/10 text-[#F07652] border border-[#F07652]/20"
                      />
                    </td>
                    <td className="py-2.5 px-4">
                      <CopyButton
                        text={`/${squad.slashPrefix}:agents:${val.secondary}`}
                        className="bg-[#262629] text-[#888] border border-[#2A2A2E]"
                      />
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {val.triggers.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary" className="bg-[#262629] text-[#666] text-[10px] border border-[#2A2A2E]">
                            {t}
                          </Badge>
                        ))}
                        {val.triggers.length > 3 && (
                          <Badge variant="secondary" className="bg-[#262629] text-[#666] text-[10px] border border-[#2A2A2E]">
                            +{val.triggers.length - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
