import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const agentId = formData.get('agentId') as string | null;

  if (!file || !agentId) {
    return NextResponse.json({ error: 'Arquivo e agentId obrigatorios' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
  if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    return NextResponse.json({ error: 'Formato invalido. Use jpg, png ou webp' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${agentId}.${ext}`;
  const dir = path.join(process.cwd(), 'public', 'agents');

  // Remove old photo if different extension
  for (const oldExt of ['jpg', 'jpeg', 'png', 'webp']) {
    const oldPath = path.join(dir, `${agentId}.${oldExt}`);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  fs.writeFileSync(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/agents/${filename}` });
}
