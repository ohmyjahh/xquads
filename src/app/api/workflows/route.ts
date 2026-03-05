import { NextResponse } from 'next/server';
import { parseWorkflows } from '@/lib/parsers/workflow-parser';

export const dynamic = 'force-dynamic';

export async function GET() {
  const workflows = parseWorkflows();
  return NextResponse.json(workflows);
}
