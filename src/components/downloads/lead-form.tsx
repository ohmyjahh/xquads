'use client';

import { useState } from 'react';
import { Download, X, Loader2, CheckCircle2 } from 'lucide-react';

interface LeadFormProps {
  onClose: () => void;
  downloadUrl: string;
  downloadName: string;
}

export function LeadForm({ onClose, downloadUrl, downloadName }: LeadFormProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, downloadName }),
      });

      if (!res.ok) throw new Error('Erro ao salvar dados');

      setDone(true);

      // Inicia o download automaticamente
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = '';
        a.click();
      }, 800);

    } catch {
      setError('Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#1A1A1D] border border-[#2A2A2E] rounded-2xl shadow-2xl">

        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          {!done ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA8049]/10">
                  <Download className="h-5 w-5 text-[#EA8049]" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Quase lá!</h2>
                  <p className="text-xs text-[#666]">Preencha para liberar o download</p>
                </div>
              </div>

              <p className="text-sm text-[#888] mt-4 mb-5">
                Deixa seu e-mail e telefone — a gente pode te avisar quando sair novidades nos squads.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#888] mb-1.5">
                    E-mail <span className="text-[#EA8049]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#EA8049]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#888] mb-1.5">
                    Telefone / WhatsApp <span className="text-[#EA8049]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#EA8049]/50 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA8049] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d0703f] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Salvando...</>
                  ) : (
                    <><Download className="h-4 w-4" /> Liberar Download</>
                  )}
                </button>

                <p className="text-center text-[10px] text-[#444]">
                  Seus dados nao serao compartilhados com terceiros.
                </p>
              </form>
            </>
          ) : (
            // Estado de sucesso
            <div className="py-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3BA856]/10">
                  <CheckCircle2 className="h-8 w-8 text-[#3BA856]" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Download iniciando!</h2>
                <p className="text-sm text-[#888] mt-1">
                  O arquivo vai baixar automaticamente. Obrigado!
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-xs text-[#555] hover:text-white transition-colors"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
