import { NextRequest, NextResponse } from 'next/server';

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  downloadName?: string;
}

function normalizePhoneBR(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  // Numero brasileiro nacional tem 10 (fixo) ou 11 (celular) digitos.
  // Com prefixo pais 55, fica 12 ou 13. Se ja >= 12 e comeca com 55, ja tem prefixo.
  // Caso contrario, prepend 55 (cobre DDD 55 de Santa Maria-RS que ficaria 11 digitos).
  if (digits.length >= 12 && digits.startsWith('55')) {
    return digits;
  }
  return `55${digits}`;
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

    const normalizedPhone = normalizePhoneBR(phone);
    if (normalizedPhone.length < 12) {
      return NextResponse.json({ error: 'Telefone invalido' }, { status: 400 });
    }

    const payload: LeadPayload = { name, email, phone: normalizedPhone, downloadName };

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
