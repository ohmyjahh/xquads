'use client';

import { Check, Copy } from 'lucide-react';
import { useCopyWithLead } from '@/hooks/use-copy-with-lead';
import { LeadForm } from '@/components/downloads/lead-form';

interface CopyButtonProps {
  text: string;
  className?: string;
  /** Identificador que vai pra coluna `download` na planilha. Ex.: "agent-copy-squadSlug-agentId" */
  source?: string;
}

export function CopyButton({ text, className, source = 'agent-copy' }: CopyButtonProps) {
  const { copied, showLeadForm, leadSource, copy, closeLeadForm } = useCopyWithLead(source);

  const handleCopy = () => copy(text);

  return (
    <>
      {showLeadForm && (
        <LeadForm
          onClose={closeLeadForm}
          source={leadSource}
          type="copy"
          onSuccess={closeLeadForm}
        />
      )}
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
    </>
  );
}
