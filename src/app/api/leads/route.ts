import { NextRequest, NextResponse } from 'next/server';

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  downloadName?: string;
}

async function postToSheets(payload: LeadPayload) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK;
  if (!url) {
    console.warn('GOOGLE_SHEETS_WEBHOOK not set, skipping Sheets write');
    return;
  }

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      download: payload.downloadName ?? 'xquads',
      date: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    }),
  });
}

async function postToGene(payload: LeadPayload) {
  const url = process.env.GENE_WEBHOOK_URL;
  if (!url) {
    console.warn('GENE_WEBHOOK_URL not set, skipping GENE write');
    return;
  }

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, downloadName } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Nome, email e telefone obrigatorios' },
        { status: 400 }
      );
    }

    const payload: LeadPayload = { name, email, phone, downloadName };

    const [sheetsResult, geneResult] = await Promise.allSettled([
      postToSheets(payload),
      postToGene(payload),
    ]);

    if (sheetsResult.status === 'rejected') {
      console.error('Sheets webhook failed:', sheetsResult.reason);
    }
    if (geneResult.status === 'rejected') {
      console.error('GENE webhook failed:', geneResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('API /leads error:', err);
    return NextResponse.json({ ok: true });
  }
}
