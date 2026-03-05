'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-all duration-200 hover:brightness-110 ${className || 'bg-[#262629] text-[#888] border border-[#2A2A2E] hover:border-[#EA8049]/30'}`}
      title="Clique para copiar"
    >
      {copied ? (
        <Check className="h-3 w-3 text-[#3BA856]" />
      ) : (
        <Copy className="h-3 w-3 opacity-50" />
      )}
      <span className="truncate max-w-[300px]">{text}</span>
    </button>
  );
}
