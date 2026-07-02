"use client";

import { Github, Copy, Check } from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";

const REPO_URL = "https://github.com/coreyhaines31/marketingskills";

export function RepoCard() {
  const { copied, showLeadForm, leadSource, copy, closeLeadForm } =
    useCopyWithLead("github-marketing-skills");

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

      <div className="rounded-2xl border border-[#2a2a2e] bg-gradient-to-br from-[#141416] to-[#1a1a1e] p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D97757]/10 border border-[#D97757]/20">
            <Github className="h-6 w-6 text-[#D97757]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#666]">
              GitHub
            </p>
            <p className="text-lg font-semibold text-white break-words">
              coreyhaines31/marketingskills
            </p>
            <p className="mt-2 text-sm text-[#999] leading-relaxed">
              Coleção com mais de 60 skills de marketing em Markdown, pensadas
              para dar ao Claude workflows e conhecimento especializado em cada
              tarefa. Compatível com Claude, Claude Code e outros agentes que
              seguem a especificação de Agent Skills.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#2a2a2e] bg-[#121214] px-3 py-2.5">
              <code className="min-w-0 flex-1 truncate text-[13px] text-[#bbb]">
                {REPO_URL}
              </code>
              <button
                type="button"
                onClick={() => copy(REPO_URL)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#D97757] px-3 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copiar link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
