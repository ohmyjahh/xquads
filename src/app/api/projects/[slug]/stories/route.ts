import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/config.server';
import { parseStories } from '@/lib/parsers/story-parser';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const stories = parseStories(project.path);
  return NextResponse.json(stories);
}
