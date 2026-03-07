import { NextResponse } from 'next/server';
import { parseAgents } from '@/lib/parsers/agent-parser';

export const revalidate = 60;

export async function GET() {
  const agents = parseAgents();
  return NextResponse.json(agents);
}
