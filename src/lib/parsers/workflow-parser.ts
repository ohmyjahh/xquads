import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { AIOS_WORKFLOWS_PATH } from '@/lib/config';
import type { Workflow, WorkflowPhase } from '@/lib/types';

interface WorkflowYaml {
  workflow?: {
    id?: string;
    name?: string;
    version?: string;
    description?: string;
    type?: string;
    phases?: Array<Record<string, string>>;
    sequence?: Array<{
      step?: string;
      id?: string;
      phase?: number;
      agent?: string;
      action?: string;
    }>;
  };
}

export function parseWorkflows(): Workflow[] {
  if (!fs.existsSync(AIOS_WORKFLOWS_PATH)) return [];

  const files = fs.readdirSync(AIOS_WORKFLOWS_PATH).filter(
    (f) => f.endsWith('.yaml') || f.endsWith('.yml')
  );

  return files
    .map((filename) => {
      try {
        const content = fs.readFileSync(
          path.join(AIOS_WORKFLOWS_PATH, filename),
          'utf-8'
        );
        const data = YAML.parse(content) as WorkflowYaml;
        const wf = data?.workflow;
        if (!wf) return null;

        const phases: WorkflowPhase[] = [];

        if (wf.sequence) {
          for (const step of wf.sequence) {
            phases.push({
              id: step.id || step.step || '',
              name: step.step || step.action || '',
              agent: step.agent || '',
              action: step.action || '',
            });
          }
        } else if (wf.phases) {
          for (const phase of wf.phases) {
            const [key, value] = Object.entries(phase)[0] || [];
            if (key) {
              phases.push({
                id: key,
                name: String(value),
                agent: '',
                action: String(value),
              });
            }
          }
        }

        return {
          id: wf.id || filename.replace(/\.ya?ml$/, ''),
          name: wf.name || filename.replace(/\.ya?ml$/, ''),
          version: wf.version || '1.0',
          description: wf.description || '',
          type: wf.type || 'generic',
          phases,
        };
      } catch {
        return null;
      }
    })
    .filter((w): w is Workflow => w !== null);
}
