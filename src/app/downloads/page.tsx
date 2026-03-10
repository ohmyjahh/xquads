'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Github, Package, Terminal, FolderOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { LeadForm } from '@/components/downloads/lead-form';

const INSTALL_STEPS_SQUADS = [
  { step: 1, text: 'Clique no botao abaixo para baixar o arquivo ZIP' },
  { step: 2, text: 'Extraia o ZIP em uma pasta no seu computador' },
  { step: 3, text: 'Copie a pasta "squads/" para dentro do seu projeto aios-core' },
  { step: 4, text: 'Pronto! Os agentes, workflows e tasks estarao disponiveis' },
];

const INSTALL_STEPS_REPO = [
  { step: 1, cmd: 'git clone https://github.com/SynkraAI/aios-core.git', desc: 'Clone o repositorio' },
  { step: 2, cmd: 'cd aios-core', desc: 'Entre na pasta do projeto' },
  { step: 3, cmd: 'npm install', desc: 'Instale as dependencias' },
  { step: 4, cmd: 'npx aios-core install', desc: 'Execute o instalador do AIOS' },
];

export default function DownloadsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {showForm && (
        <LeadForm
          onClose={() => setShowForm(false)}
          downloadUrl={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/downloads/aios-squads.zip`}
          downloadName="aios-squads"
        />
      )}

      <div>
        <h1 className="text-2xl font-bold text-white">Downloads</h1>
        <p className="text-sm text-[#888] mt-1">
          Baixe os agentes e instale o Synkra AIOS no seu ambiente
        </p>
      </div>

      {/* Card 1: ZIP dos Squads */}
      <Card className="border-[#2A2A2E] bg-[#1A1A1D] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#EA8049] to-[#F07652]" />
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EA8049]/10 shrink-0">
              <Package className="h-6 w-6 text-[#EA8049]" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-white">Pacote de Squads</h2>
              <p className="text-sm text-[#888] mt-1">
                Todos os 12 squads com agentes, workflows, tasks e configuracoes prontos para uso.
                Inclui Advisory Board, Brand, Copy, Cybersecurity, Data, Design, Hormozi, Movement, Storytelling, Traffic Masters, C-Level e Claude Code Mastery.
              </p>

              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-medium text-[#ccc] flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-[#EA8049]" />
                  O que esta incluso
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: '96+ Agentes', desc: 'Personas completas' },
                    { label: 'Workflows', desc: 'Fluxos automatizados' },
                    { label: 'Tasks', desc: 'Tarefas executaveis' },
                    { label: 'Configs', desc: 'Pronto para usar' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-[#262629] border border-[#2A2A2E] p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-[#666] mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-medium text-[#ccc] flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#EA8049]" />
                  Como instalar
                </h3>
                <div className="space-y-2">
                  {INSTALL_STEPS_SQUADS.map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EA8049]/10 text-[#EA8049] text-xs font-bold shrink-0 mt-0.5">
                        {s.step}
                      </span>
                      <p className="text-sm text-[#ccc]">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#EA8049] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d0703f] transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Baixar Squads (ZIP)
                </button>
                <a
                  href="https://github.com/ohmyjahh/xquads-squads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1E1E21] border border-[#2A2A2E] px-5 py-2.5 text-sm font-medium text-[#ccc] hover:border-[#EA8049]/30 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Ver no GitHub
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Repositorio GitHub */}
      <Card className="border-[#2A2A2E] bg-[#1A1A1D] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]" />
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/10 shrink-0">
              <Github className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-white">Synkra AIOS Core</h2>
              <p className="text-sm text-[#888] mt-1">
                Repositorio completo do framework AIOS. Inclui o core do sistema, CLI, orquestracao de agentes,
                sistema de squads, templates, e toda a infraestrutura para desenvolvimento orientado por IA.
              </p>

              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-medium text-[#ccc] flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#8B5CF6]" />
                  Como instalar
                </h3>
                <div className="space-y-2.5">
                  {INSTALL_STEPS_REPO.map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-bold shrink-0 mt-0.5">
                        {s.step}
                      </span>
                      <div>
                        <p className="text-sm text-[#ccc]">{s.desc}</p>
                        <code className="mt-1 block rounded-md bg-[#0D0D0F] border border-[#2A2A2E] px-3 py-1.5 text-xs text-[#EA8049] font-mono">
                          {s.cmd}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 p-4 rounded-lg bg-[#262629] border border-[#2A2A2E]">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3BA856]" />
                  <p className="text-sm font-medium text-white">Pre-requisitos</p>
                </div>
                <ul className="space-y-1">
                  {['Node.js 18+', 'Git', 'Claude Code (Anthropic CLI)'].map((req) => (
                    <li key={req} className="flex items-center gap-2 text-sm text-[#888]">
                      <ArrowRight className="h-3 w-3 text-[#3BA856]" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <a
                  href="https://github.com/SynkraAI/aios-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#7C3AED] transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Acessar Repositorio no GitHub
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
