import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const dir = path.join(process.cwd(), 'public', 'agents');

  for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
    const filePath = path.join(dir, `${agentId}.${ext}`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ url: `${BASE_PATH}/agents/${agentId}.${ext}` });
    }
  }

  return NextResponse.json({ url: null });
}
