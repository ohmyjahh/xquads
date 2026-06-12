"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { markLeadCaptured } from "@/hooks/use-copy-with-lead";

interface LeadGateProps {
  /** Identifica a origem do lead no /api/leads */
  source: string;
  /** Cor accent da página (hex) */
  accent?: string;
  /** Título do card */
  title?: string;
  /** Texto de apoio abaixo do título */
  description?: string;
  /** Descrição do conteúdo que será liberado (linha final) */
  contentNote?: string;
  /** Texto do botão */
  buttonLabel?: string;
  /** Chamado após lead salvo com sucesso */
  onUnlock: () => void;
}

export function LeadGate({
  source,
  accent = "#EA8049",
  title = "Receba o conteúdo completo",
  description = "Insira seus dados para desbloquear o restante da página.",
  contentNote,
  buttonLabel = "Desbloquear",
  onUnlock,
}: LeadGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${base}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, downloadName: source }),
      });

      if (!res.ok) throw new Error("Erro ao salvar dados");

      markLeadCaptured();
      onUnlock();
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl border bg-gradient-to-br via-[#1a1a1e] to-[#1a1a1e] p-6 sm:p-10 text-center space-y-5"
      style={{
        borderColor: `${accent}4D`,
        backgroundImage: `linear-gradient(to bottom right, ${accent}1A, #1a1a1e, #1a1a1e)`,
      }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: accent }}
      >
        Desbloqueie a construção
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        {title}
      </h2>
      <p className="text-[15px] text-[#999] max-w-lg mx-auto leading-relaxed">
        {description}
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 text-left">
        <input
          type="text"
          required
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none transition-colors"
        />
        <input
          type="email"
          required
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none transition-colors"
        />
        <input
          type="tel"
          required
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg bg-[#121214] border border-[#2A2A2E] px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none transition-colors"
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-white text-base font-semibold px-6 py-3.5 transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          style={{ backgroundColor: accent }}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Desbloqueando...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              {buttonLabel}
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-[#555]">
        Sem spam. Seus dados não serão compartilhados com terceiros.
      </p>
      {contentNote && (
        <p className="text-[13px] text-[#888] max-w-md mx-auto leading-relaxed">
          {contentNote}
        </p>
      )}
    </div>
  );
}
