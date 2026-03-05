import fs from 'fs';
import YAML from 'yaml';
import { AIOS_PERSONAS_PATH } from '@/lib/config';
import type { Agent } from '@/lib/types';

interface PersonaYaml {
  agents: Array<{
    id: string;
    name: string;
    role: string;
    archetype: string;
    zodiac_symbol: string;
    element: string;
    color: string;
    color_hex: string;
    icon: string;
    traits: string[];
    communication_style: string;
    communication_description: string;
    archetypal_action: string;
    archetypal_action_phrase: string;
    energy: string;
    greetings: {
      level_1: string;
      level_2: string;
      level_3: string;
    };
  }>;
}

export function parseAgents(): Agent[] {
  try {
    const content = fs.readFileSync(AIOS_PERSONAS_PATH, 'utf-8');
    const data = YAML.parse(content) as PersonaYaml;

    return data.agents.map((a) => ({
      id: a.id,
      name: a.name,
      role: a.role,
      archetype: a.archetype,
      zodiacSymbol: a.zodiac_symbol,
      element: a.element,
      color: a.color,
      colorHex: a.color_hex,
      icon: a.icon,
      traits: a.traits,
      communicationStyle: a.communication_style,
      communicationDescription: a.communication_description,
      archetypeAction: a.archetypal_action,
      archetypeActionPhrase: a.archetypal_action_phrase,
      energy: a.energy,
      greetings: {
        level1: a.greetings.level_1,
        level2: a.greetings.level_2,
        level3: a.greetings.level_3,
      },
    }));
  } catch (error) {
    console.error('Failed to parse agents:', error);
    return [];
  }
}
