export interface ProjectConfig {
  slug: string;
  name: string;
  path: string;
  stack: string[];
}

import path from 'path';

export const AIOS_CORE_PATH = process.env.AIOS_CORE_PATH || path.join(process.cwd(), '.');
export const AIOS_AGENTS_PATH = `${AIOS_CORE_PATH}/.aios-core/development/agents`;
export const AIOS_WORKFLOWS_PATH = `${AIOS_CORE_PATH}/.aios-core/development/workflows`;
export const AIOS_PERSONAS_PATH = `${AIOS_CORE_PATH}/docs/agents/persona-definitions.yaml`;

export const STATUS_COLORS: Record<string, string> = {
  Draft: 'bg-zinc-600 text-zinc-200',
  Ready: 'bg-blue-600 text-blue-100',
  InProgress: 'bg-yellow-600 text-yellow-100',
  InReview: 'bg-purple-600 text-purple-100',
  Done: 'bg-green-600 text-green-100',
};

export const KANBAN_COLUMNS = ['Draft', 'Ready', 'InProgress', 'InReview', 'Done'] as const;
