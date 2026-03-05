import 'server-only';
import fs from 'fs';
import path from 'path';
import type { ProjectConfig } from './config';

export function getProjects(): ProjectConfig[] {
  const configPath = path.join(process.cwd(), 'projects.json');
  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content) as ProjectConfig[];
  } catch {
    return [];
  }
}
