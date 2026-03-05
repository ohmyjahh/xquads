import fs from 'fs';
import { getProjects } from '@/lib/config.server';
import { parseStories } from '@/lib/parsers/story-parser';
import { parseProgress } from '@/lib/parsers/progress-parser';
import { ProjectCard } from '@/components/projects/project-card';
import type { Project, StoryStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function ProjectsPage() {
  const projects: Project[] = getProjects().map((p) => {
    const exists = fs.existsSync(p.path);
    if (!exists) {
      return {
        slug: p.slug,
        name: p.name,
        path: p.path,
        stack: [...p.stack],
        exists: false,
        storyCount: 0,
        storiesByStatus: { Draft: 0, Ready: 0, InProgress: 0, InReview: 0, Done: 0 },
        epics: [],
      };
    }
    const stories = parseStories(p.path);
    const epics = parseProgress(p.path);
    const storiesByStatus: Record<StoryStatus, number> = {
      Draft: 0, Ready: 0, InProgress: 0, InReview: 0, Done: 0,
    };
    for (const s of stories) {
      storiesByStatus[s.status] = (storiesByStatus[s.status] || 0) + 1;
    }
    return {
      slug: p.slug,
      name: p.name,
      path: p.path,
      stack: [...p.stack],
      exists,
      storyCount: stories.length,
      storiesByStatus,
      epics,
    };
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#A3A3A8]">
        {projects.length} projetos registrados
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
