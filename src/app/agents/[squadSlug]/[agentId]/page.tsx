import { findAgent } from '@/lib/parsers/squad-parser';
import { AgentBio } from '@/components/agents/agent-bio';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

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

export default async function AgentBioPage({
  params,
}: {
  params: Promise<{ squadSlug: string; agentId: string }>;
}) {
  const { squadSlug, agentId } = await params;
  const result = findAgent(squadSlug, agentId);

  if (!result) notFound();

  const { agent, squad } = result;
  const color = SQUAD_COLORS[squad.slug] || '#666';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/agents"
        className="inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-[#EA8049] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar para Agentes
      </Link>

      <AgentBio agent={agent} squadName={squad.shortTitle} squadColor={color} />
    </div>
  );
}
