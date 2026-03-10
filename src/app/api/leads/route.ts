import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, phone, downloadName } = await req.json();

  if (!email || !phone) {
    return NextResponse.json({ error: 'Email e telefone obrigatorios' }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;

  if (!webhookUrl) {
    // Se não configurou ainda, só loga e libera o download
    console.log('Lead (sem webhook):', { email, phone, downloadName });
    return NextResponse.json({ ok: true });
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        phone,
        download: downloadName,
        date: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      }),
    });
  } catch (err) {
    // Não bloqueia o download se o webhook falhar
    console.error('Webhook error:', err);
  }

  return NextResponse.json({ ok: true });
}
