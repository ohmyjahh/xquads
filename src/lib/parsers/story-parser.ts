import fs from 'fs';
import path from 'path';
import type { Story, StoryStatus } from '@/lib/types';

const VALID_STATUSES: StoryStatus[] = ['Draft', 'Ready', 'InProgress', 'InReview', 'Done'];

function extractField(content: string, field: string): string {
  const patterns = [
    new RegExp(`\\*\\*${field}\\*\\*:\\s*(.+)`, 'i'),
    new RegExp(`\\*\\*${field}\\*\\*\\s*:\\s*(.+)`, 'i'),
    new RegExp(`${field}:\\s*(.+)`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return match[1].trim();
  }
  return '';
}

function parseStatus(raw: string): StoryStatus {
  const cleaned = raw.replace(/[*`]/g, '').trim();
  const found = VALID_STATUSES.find(
    (s) => s.toLowerCase() === cleaned.toLowerCase()
  );
  return found || 'Draft';
}

function countCheckboxes(content: string): { total: number; done: number } {
  const all = content.match(/- \[[ x]\]/g) || [];
  const checked = content.match(/- \[x\]/gi) || [];
  return { total: all.length, done: checked.length };
}

function extractAcceptanceCriteria(content: string): string[] {
  const criteria: string[] = [];
  const acRegex = /### AC\d+[:\s]+(.+)/g;
  let match;
  while ((match = acRegex.exec(content)) !== null) {
    criteria.push(match[1].trim());
  }
  return criteria;
}

export function parseStories(projectPath: string): Story[] {
  const storiesDir = path.join(projectPath, 'docs', 'stories');
  if (!fs.existsSync(storiesDir)) return [];

  const files = fs.readdirSync(storiesDir).filter(
    (f) => f.endsWith('.md') && !f.startsWith('README') && !f.startsWith('_')
  );

  return files.map((filename) => {
    const content = fs.readFileSync(path.join(storiesDir, filename), 'utf-8');
    const title = content.match(/^#\s+(.+)/m)?.[1]?.replace(/^Story\s+[\d.]+\s*[-–—]\s*/, '') || filename;
    const epicMatch = filename.match(/^(\d+)\./);
    const epic = extractField(content, 'Epic') || (epicMatch ? `Epic ${epicMatch[1]}` : 'Unknown');
    const status = parseStatus(extractField(content, 'Status'));
    const priority = extractField(content, 'Priority') || 'MEDIUM';
    const complexity = extractField(content, 'Complexity') || '';
    const createdBy = extractField(content, 'Created by') || '';
    const date = extractField(content, 'Date') || '';
    const { total, done } = countCheckboxes(content);
    const ac = extractAcceptanceCriteria(content);
    const id = filename.replace('.story.md', '').replace('.md', '');

    return {
      id,
      filename,
      title: title.substring(0, 100),
      epic,
      status,
      priority,
      complexity,
      createdBy,
      date,
      tasksTotal: total,
      tasksDone: done,
      acceptanceCriteria: ac,
    };
  });
}
