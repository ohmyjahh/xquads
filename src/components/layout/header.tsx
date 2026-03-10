'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

const TITLES: Record<string, string> = {
  '/': 'Visao Geral',
  '/squads': 'Catalogo de Squads',
  '/agents': 'Todos os Agentes',
  '/projects': 'Projetos',
  '/workflows': 'Workflows',
};

const SUBTITLES: Record<string, string> = {
  '/': 'Resumo do seu ecossistema AIOS',
  '/squads': 'Navegue e ative seus squads de agentes',
  '/agents': 'Todos os agentes disponiveis para ativacao',
  '/projects': 'Seus projetos de desenvolvimento',
  '/workflows': 'Fluxos de trabalho automatizados',
};

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  let title = TITLES[pathname];
  let subtitle = SUBTITLES[pathname];
  if (!title && pathname.startsWith('/projects/')) title = 'Detalhe do Projeto';
  if (!title && pathname.startsWith('/squads/')) title = 'Detalhe do Squad';
  title = title || 'AIOS Dashboard';

  return (
    <header className="border-b border-[#262629] bg-[#121214] px-4 md:px-6 py-4 flex items-center gap-3">
      {/* Hamburger — só mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-[#666] hover:text-white transition-colors p-1 -ml-1"
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-bold text-white leading-tight">{title}</h2>
        {subtitle && <p className="text-xs md:text-sm text-[#666] mt-0.5">{subtitle}</p>}
      </div>
    </header>
  );
}
