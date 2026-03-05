export interface Agent {
  id: string;
  name: string;
  role: string;
  archetype: string;
  zodiacSymbol: string;
  element: string;
  color: string;
  colorHex: string;
  icon: string;
  traits: string[];
  communicationStyle: string;
  communicationDescription: string;
  archetypeAction: string;
  archetypeActionPhrase: string;
  energy: string;
  greetings: {
    level1: string;
    level2: string;
    level3: string;
  };
}

export interface Project {
  slug: string;
  name: string;
  path: string;
  stack: string[];
  exists: boolean;
  storyCount: number;
  storiesByStatus: Record<StoryStatus, number>;
  epics: EpicProgress[];
}

export interface EpicProgress {
  number: number;
  name: string;
  status: string;
  storyCount: number;
  storiesCompleted: number;
}

export type StoryStatus = 'Draft' | 'Ready' | 'InProgress' | 'InReview' | 'Done';

export interface Story {
  id: string;
  filename: string;
  title: string;
  epic: string;
  status: StoryStatus;
  priority: string;
  complexity: string;
  createdBy: string;
  date: string;
  tasksTotal: number;
  tasksDone: number;
  acceptanceCriteria: string[];
}

export interface WorkflowPhase {
  id: string;
  name: string;
  agent: string;
  action: string;
}

export interface Workflow {
  id: string;
  name: string;
  version: string;
  description: string;
  type: string;
  phases: WorkflowPhase[];
}

export interface DashboardOverview {
  totalAgents: number;
  totalProjects: number;
  totalWorkflows: number;
  storiesInProgress: number;
  storiesDone: number;
  totalStories: number;
}
