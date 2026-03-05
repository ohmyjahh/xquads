import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Agent } from '@/lib/types';

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Card
      className="border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700"
      style={{ borderTopColor: agent.colorHex, borderTopWidth: '3px' }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{agent.icon}</span>
          <div>
            <h3 className="font-bold text-white">{agent.name}</h3>
            <p className="text-sm text-zinc-400">
              @{agent.id} &middot; {agent.role}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>{agent.zodiacSymbol} {agent.archetype}</span>
          <span>&middot;</span>
          <span>{agent.element}</span>
        </div>
        <p className="text-sm text-zinc-400">{agent.communicationDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {agent.traits.map((trait) => (
            <Badge
              key={trait}
              variant="secondary"
              className="bg-zinc-800 text-zinc-300 text-xs"
            >
              {trait}
            </Badge>
          ))}
        </div>
        <p className="text-xs italic text-zinc-600">{agent.energy}</p>
      </CardContent>
    </Card>
  );
}
