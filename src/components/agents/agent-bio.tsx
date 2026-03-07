'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/squads/copy-button';
import { AgentAvatar } from './agent-avatar';
import { AGENT_BIOS_PT } from '@/lib/data/agent-bios-pt';
import { AGENT_TRANSLATIONS_PT } from '@/lib/data/agent-translations-pt';
import type { SquadAgent } from '@/lib/parsers/squad-parser';
import { BookOpen, Target, MessageCircle, Sparkles, Calendar } from 'lucide-react';

interface AgentBioProps {
  agent: SquadAgent;
  squadName: string;
  squadColor: string;
}

export function AgentBio({ agent, squadName, squadColor }: AgentBioProps) {
  const bio = AGENT_BIOS_PT[agent.id];
  const t = AGENT_TRANSLATIONS_PT[agent.id];
  const title = t?.title || agent.role || agent.title;
  const archetype = t?.archetype || agent.archetype;
  const born = t?.born || agent.born;
  const died = t?.died || agent.died;
  const focus = t?.focus || agent.focus;
  const whenToUse = t?.whenToUse || agent.whenToUse;
  const greeting = t?.greeting || agent.greeting;

  return (
    <div className="space-y-5">
      {/* Hero Card */}
      <Card className="border-[#2A2A2E] bg-[#1A1A1D] overflow-hidden">
        <div className="h-1.5" style={{ backgroundColor: squadColor }} />
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <AgentAvatar agentId={agent.id} size={96} />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
                  <p className="text-sm text-[#888] mt-0.5">{title}</p>
                </div>
                {agent.icon && (
                  <span className="text-3xl shrink-0">{agent.icon}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge
                  variant="secondary"
                  className="text-xs border"
                  style={{
                    backgroundColor: `${squadColor}15`,
                    color: squadColor,
                    borderColor: `${squadColor}30`,
                  }}
                >
                  {squadName}
                </Badge>
                {archetype && (
                  <Badge variant="secondary" className="bg-[#262629] text-[#888] text-xs border border-[#2A2A2E]">
                    {archetype}
                  </Badge>
                )}
                {agent.realPerson && (
                  <Badge variant="secondary" className="bg-[#F07652]/10 text-[#F07652] text-xs border border-[#F07652]/20">
                    Pessoa Real
                  </Badge>
                )}
              </div>
              {(born || died) && (
                <div className="flex items-center gap-1.5 text-xs text-[#666] pt-0.5">
                  <Calendar className="h-3 w-3" />
                  {born && <span>{born}</span>}
                  {born && died && <span> — </span>}
                  {died && <span>{died}</span>}
                </div>
              )}
              <div className="pt-2">
                <CopyButton text={agent.activationCommand} className="bg-[#F07652]/10 text-[#F07652] border border-[#F07652]/20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio em Portugues */}
      {bio && (
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-[#EA8049]" />
              <h2 className="text-sm font-semibold text-white">Biografia</h2>
            </div>
            <div className="space-y-3">
              {bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-sm text-[#ccc] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Especialidades */}
      {focus && (
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-[#8B5CF6]" />
              <h2 className="text-sm font-semibold text-white">Especialidades</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {focus.split(',').map((f) => (
                <Badge key={f.trim()} variant="secondary" className="bg-[#262629] text-[#aaa] text-xs border border-[#2A2A2E] py-1">
                  {f.trim()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quando Usar */}
      {whenToUse && (
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#FBBF24]" />
              <h2 className="text-sm font-semibold text-white">Quando Usar</h2>
            </div>
            <ul className="space-y-1.5">
              {whenToUse.split('\n').filter(Boolean).map((line, i) => {
                const text = line.replace(/^[•\-\*]\s*/, '').replace(/^When\s+/i, '').trim();
                return (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#ccc] leading-relaxed">
                    <span className="text-[#FBBF24] mt-0.5 shrink-0">&#8226;</span>
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Saudacao */}
      {greeting && (
        <Card className="border-[#2A2A2E] bg-[#1A1A1D]">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-4 w-4 text-[#06B6D4]" />
              <h2 className="text-sm font-semibold text-white">Saudacao do Agente</h2>
            </div>
            <div className="rounded-xl bg-[#262629] border border-[#2A2A2E] p-4">
              <p className="text-sm text-[#ccc] leading-relaxed italic">&ldquo;{greeting}&rdquo;</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
