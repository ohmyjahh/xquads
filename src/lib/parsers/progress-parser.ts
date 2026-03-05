import fs from 'fs';
import path from 'path';
import type { EpicProgress } from '@/lib/types';

export function parseProgress(projectPath: string): EpicProgress[] {
  const progressFile = path.join(projectPath, 'docs', 'PROJECT-PROGRESS.md');
  if (!fs.existsSync(progressFile)) return [];

  const content = fs.readFileSync(progressFile, 'utf-8');
  const epics: EpicProgress[] = [];

  // Match table rows: | N | Name | Status | Count |
  const tableRowRegex = /\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(\d+)?\s*\|/g;
  let match;
  while ((match = tableRowRegex.exec(content)) !== null) {
    const num = parseInt(match[1]);
    if (isNaN(num)) continue;
    epics.push({
      number: num,
      name: match[2].trim().replace(/\*\*/g, ''),
      status: match[3].trim().replace(/\*\*/g, ''),
      storyCount: parseInt(match[4]) || 0,
      storiesCompleted: match[3].toLowerCase().includes('completo') ? parseInt(match[4]) || 0 : 0,
    });
  }

  // Fallback: match "Epic N:" or "## Epic N" lines
  if (epics.length === 0) {
    const epicLineRegex = /(?:##?\s*)?Epic\s+(\d+)[:\s-]+(.+?)(?:\s*[-–—]\s*(.+))?$/gim;
    while ((match = epicLineRegex.exec(content)) !== null) {
      const status = match[3]?.trim() || match[2].trim();
      const name = match[3] ? match[2].trim() : `Epic ${match[1]}`;
      epics.push({
        number: parseInt(match[1]),
        name,
        status,
        storyCount: 0,
        storiesCompleted: status.toLowerCase().includes('completo') ? 1 : 0,
      });
    }
  }

  return epics;
}
