import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, phone, downloadName } = await req.json();

    if (!email || !phone) {
      return NextResponse.json({ error: 'Email e telefone obrigatorios' }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          email,
          phone,
          download: downloadName ?? 'xquads',
          date: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        }),
      }).catch((err) => console.error('Webhook error:', err));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('API /leads error:', err);
    // Mesmo com erro interno, libera o download
    return NextResponse.json({ ok: true });
  }
}
