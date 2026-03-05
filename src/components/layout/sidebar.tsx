'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Users, FolderKanban, GitBranch, Shield } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/squads', label: 'Squads', icon: Shield },
  { href: '/agents', label: 'Agentes', icon: Users },
  { href: '/projects', label: 'Projetos', icon: FolderKanban },
  { href: '/workflows', label: 'Workflows', icon: GitBranch },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 flex-col bg-[#141416] border-r border-[#262629]">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#EA8049] to-[#c5603a]">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-tight">AIOS</h1>
          <p className="text-[10px] text-[#666] leading-none">Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 pt-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
                isActive
                  ? 'bg-[#EA8049]/10 text-[#EA8049]'
                  : 'text-[#888] hover:bg-[#1E1E21] hover:text-[#ccc]'
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4">
        <p className="text-[10px] text-[#444]">Synkra AIOS v4.0</p>
      </div>
    </aside>
  );
}
