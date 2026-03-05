'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KANBAN_COLUMNS } from '@/lib/config';
import type { Story, StoryStatus } from '@/lib/types';

const COLUMN_COLORS: Record<string, string> = {
  Draft: '#666',
  Ready: '#3B82F6',
  InProgress: '#FBBF24',
  InReview: '#8B5CF6',
  Done: '#3BA856',
};

const COLUMN_LABELS: Record<string, string> = {
  Draft: 'Rascunho',
  Ready: 'Pronto',
  InProgress: 'Em Progresso',
  InReview: 'Em Revisao',
  Done: 'Concluido',
};

export function StoryKanban({ slug }: { slug: string }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [epicFilter, setEpicFilter] = useState<string>('all');

  useEffect(() => {
    fetch(`/api/projects/${slug}/stories`)
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="text-[#888] py-8 text-center">Carregando historias...</div>;
  }

  const epics = Array.from(new Set(stories.map((s) => s.epic))).sort();
  const filtered = epicFilter === 'all' ? stories : stories.filter((s) => s.epic === epicFilter);

  const grouped = KANBAN_COLUMNS.reduce(
    (acc, col) => {
      acc[col] = filtered.filter((s) => s.status === col);
      return acc;
    },
    {} as Record<StoryStatus, Story[]>
  );

  return (
    <div className="space-y-4">
      {epics.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setEpicFilter('all')}
            className={`rounded-lg px-3 py-1 text-xs transition-all duration-200 ${
              epicFilter === 'all'
                ? 'bg-[#F07652] text-white'
                : 'bg-[#1A1A1D] text-[#888] border border-[#2A2A2E] hover:border-[#EA8049]/30'
            }`}
          >
            Todas
          </button>
          {epics.map((epic) => (
            <button
              key={epic}
              onClick={() => setEpicFilter(epic)}
              className={`rounded-lg px-3 py-1 text-xs transition-all duration-200 ${
                epicFilter === epic
                  ? 'bg-[#F07652] text-white'
                  : 'bg-[#1A1A1D] text-[#888] border border-[#2A2A2E] hover:border-[#EA8049]/30'
              }`}
            >
              {epic}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-5 gap-3">
        {KANBAN_COLUMNS.map((col) => (
          <div key={col} className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLUMN_COLORS[col] }} />
                <h4 className="text-sm font-medium text-[#eee]">{COLUMN_LABELS[col] || col}</h4>
              </div>
              <Badge variant="secondary" className="bg-[#262629] text-[#888] text-xs border border-[#2A2A2E]">
                {grouped[col].length}
              </Badge>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {grouped[col].map((story) => (
                <Card
                  key={story.id}
                  className="border-[#2A2A2E] bg-[#1A1A1D] border-t-2"
                  style={{ borderTopColor: COLUMN_COLORS[col] }}
                >
                  <CardContent className="p-3 space-y-2">
                    <p className="text-xs font-mono text-[#666]">{story.id}</p>
                    <p className="text-sm text-[#eee] leading-tight">
                      {story.title}
                    </p>
                    {story.tasksTotal > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-[#262629] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#3BA856]"
                            style={{
                              width: `${Math.round((story.tasksDone / story.tasksTotal) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-[#888]">
                          {story.tasksDone}/{story.tasksTotal}
                        </span>
                      </div>
                    )}
                    {story.createdBy && (
                      <p className="text-xs text-[#666]">{story.createdBy}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
