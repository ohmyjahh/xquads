import { getProjects } from '@/lib/config.server';
import { Badge } from '@/components/ui/badge';
import { StoryKanban } from '@/components/projects/story-kanban';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-white">{project.name}</h2>
        <div className="flex gap-1.5">
          {project.stack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-zinc-800 text-zinc-400 text-xs"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
      <p className="text-sm text-zinc-500 font-mono">{project.path}</p>
      <StoryKanban slug={slug} />
    </div>
  );
}
