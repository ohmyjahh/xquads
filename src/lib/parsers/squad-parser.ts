import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { AIOS_CORE_PATH } from '@/lib/config';

export interface SquadAgent {
  filename: string;
  id: string;
  name: string;
  title: string;
  activationCommand: string;
  squadSlug: string;
  icon: string;
  role: string;
  identity: string;
  focus: string;
  style: string;
  tone: string;
  greeting: string;
  whenToUse: string;
  archetype: string;
  realPerson: boolean;
  born: string;
  died: string;
}

export interface SquadTask {
  filename: string;
  id: string;
  name: string;
}

export interface SquadWorkflowStep {
  agent: string;
  action: string;
  creates: string;
}

export interface SquadWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  type: string;
  estimatedDuration: string;
  steps: SquadWorkflowStep[];
}

export interface Squad {
  slug: string;
  name: string;
  shortTitle: string;
  version: string;
  description: string;
  slashPrefix: string;
  tags: string[];
  agents: SquadAgent[];
  tasks: SquadTask[];
  workflows: SquadWorkflow[];
  checklists: string[];
  routingMatrix: Record<string, { primary: string; secondary: string; triggers: string[] }>;
}

const SQUADS_PATH = path.join(AIOS_CORE_PATH, 'squads');

function parseAgentFile(squadDir: string, filename: string, slashPrefix: string, squadSlug: string): SquadAgent {
  const id = filename.replace(/\.md$/, '');
  let name = id;
  let title = id;
  let icon = '';
  let role = '';
  let identity = '';
  let focus = '';
  let style = '';
  let tone = '';
  let greeting = '';
  let whenToUse = '';
  let archetype = '';
  let realPerson = false;
  let born = '';
  let died = '';

  const filePath = path.join(squadDir, 'agents', filename);
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)/m);
      if (titleMatch) {
        name = titleMatch[1].trim();
        title = name;
      }

      const yamlBlock = content.match(/```ya?ml\n([\s\S]*?)```/);
      if (yamlBlock) {
        const data = YAML.parse(yamlBlock[1]);
        if (data?.agent) {
          name = data.agent.name || name;
          title = data.agent.title || title;
          icon = data.agent.icon || '';
          whenToUse = data.agent.whenToUse || '';
        }
        if (data?.persona_profile) {
          archetype = data.persona_profile.archetype || '';
          realPerson = data.persona_profile.real_person === true;
          born = data.persona_profile.born || '';
          died = data.persona_profile.died || '';
          if (data.persona_profile.communication) {
            tone = data.persona_profile.communication.tone || '';
            greeting = data.persona_profile.communication.greeting || '';
          }
        }
        if (data?.persona) {
          role = data.persona.role || '';
          identity = data.persona.identity || '';
          style = data.persona.style || '';
          focus = data.persona.focus || '';
        }
      } else {
        const nameMatch = content.match(/name:\s*["']?(.+?)["']?\s*$/m);
        if (nameMatch) name = nameMatch[1].trim();
      }
    } catch {
      // use defaults
    }
  }

  return {
    filename,
    id,
    name,
    title,
    activationCommand: `/${slashPrefix}:agents:${id}`,
    squadSlug,
    icon,
    role,
    identity,
    focus,
    style,
    tone,
    greeting,
    whenToUse,
    archetype,
    realPerson,
    born,
    died,
  };
}

function parseWorkflowFile(squadDir: string, filename: string): SquadWorkflow | null {
  const filePath = path.join(squadDir, 'workflows', filename);
  if (!fs.existsSync(filePath)) return null;

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = YAML.parse(content);
    const wf = data?.workflow;
    if (!wf) return null;

    const steps: SquadWorkflowStep[] = [];
    if (wf.sequence && Array.isArray(wf.sequence)) {
      for (const step of wf.sequence) {
        steps.push({
          agent: step.agent || '',
          action: step.action || '',
          creates: step.creates || '',
        });
      }
    }

    return {
      id: wf.id || filename.replace(/\.ya?ml$/, ''),
      name: wf.name || filename.replace(/\.ya?ml$/, ''),
      description: (wf.description || '').trim(),
      trigger: wf.trigger || '',
      type: wf.type || 'sequential',
      estimatedDuration: wf.estimated_duration || '',
      steps,
    };
  } catch {
    return null;
  }
}

export function parseSquads(): Squad[] {
  if (!fs.existsSync(SQUADS_PATH)) return [];

  const dirs = fs.readdirSync(SQUADS_PATH).filter((d) => {
    const manifestPath = path.join(SQUADS_PATH, d, 'squad.yaml');
    return fs.existsSync(manifestPath);
  });

  return dirs
    .map((dir) => {
      try {
        const squadDir = path.join(SQUADS_PATH, dir);
        const manifestPath = path.join(squadDir, 'squad.yaml');
        const content = fs.readFileSync(manifestPath, 'utf-8');
        const data = YAML.parse(content);

        const slashPrefix = data.slashPrefix || data.name || dir;
        const components = data.components || {};

        const agentFiles: string[] = components.agents || [];
        const taskFiles: string[] = components.tasks || [];
        const workflowFiles: string[] = components.workflows || [];
        const checklistFiles: string[] = components.checklists || [];

        const agents = agentFiles.map((f: string) => parseAgentFile(squadDir, f, slashPrefix, dir));

        const tasks: SquadTask[] = taskFiles.map((f: string) => ({
          filename: f,
          id: f.replace(/\.md$/, ''),
          name: f.replace(/\.md$/, '').replace(/-/g, ' '),
        }));

        const workflows = workflowFiles
          .map((f: string) => parseWorkflowFile(squadDir, f))
          .filter((w): w is SquadWorkflow => w !== null);

        const routingMatrix: Squad['routingMatrix'] = {};
        if (data.routing_matrix) {
          for (const [key, val] of Object.entries(data.routing_matrix)) {
            const v = val as { primary?: string; secondary?: string; triggers?: string[] };
            routingMatrix[key] = {
              primary: v.primary || '',
              secondary: v.secondary || '',
              triggers: v.triggers || [],
            };
          }
        }

        return {
          slug: dir,
          name: data.name || dir,
          shortTitle: data['short-title'] || data.name || dir,
          version: data.version || '1.0.0',
          description: (data.description || '').trim(),
          slashPrefix,
          tags: data.tags || [],
          agents,
          tasks,
          workflows,
          checklists: checklistFiles,
          routingMatrix,
        };
      } catch {
        return null;
      }
    })
    .filter((s): s is Squad => s !== null)
    .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
}

export function parseSquadBySlug(slug: string): Squad | null {
  const squads = parseSquads();
  return squads.find((s) => s.slug === slug) || null;
}

export function findAgent(squadSlug: string, agentId: string): { agent: SquadAgent; squad: Squad } | null {
  const squad = parseSquadBySlug(squadSlug);
  if (!squad) return null;
  const agent = squad.agents.find((a) => a.id === agentId);
  if (!agent) return null;
  return { agent, squad };
}
