import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  const totalStories = project.storyCount;
  const doneStories = project.storiesByStatus.Done;
  const progress = totalStories > 0 ? Math.round((doneStories / totalStories) * 100) : 0;

  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="border-[#2A2A2E] bg-[#1A1A1D] transition-all duration-200 hover:border-[#EA8049]/30 hover:shadow-lg hover:shadow-black/20 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">{project.name}</h3>
            {!project.exists && (
              <Badge variant="secondary" className="bg-red-900/30 text-red-400 text-xs border border-red-800/30">
                Nao Encontrado
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-[#262629] text-[#888] text-xs border border-[#2A2A2E]"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#888]">{totalStories} historias</span>
            <span className="text-[#eee] font-medium">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#262629] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#3BA856] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-3 text-xs">
            <span className="text-[#FBBF24]">{project.storiesByStatus.InProgress} em progresso</span>
            <span className="text-[#3BA856]">{doneStories} concluidas</span>
            <span className="text-[#666]">{project.storiesByStatus.Draft} rascunho</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
