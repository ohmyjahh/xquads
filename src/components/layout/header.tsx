'use client';

import { usePathname } from 'next/navigation';

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

export function Header() {
  const pathname = usePathname();

  let title = TITLES[pathname];
  let subtitle = SUBTITLES[pathname];
  if (!title && pathname.startsWith('/projects/')) {
    title = 'Detalhe do Projeto';
  }
  if (!title && pathname.startsWith('/squads/')) {
    title = 'Detalhe do Squad';
  }
  title = title || 'AIOS Dashboard';

  return (
    <header className="border-b border-[#262629] bg-[#121214] px-6 py-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-sm text-[#666] mt-0.5">{subtitle}</p>}
    </header>
  );
}
