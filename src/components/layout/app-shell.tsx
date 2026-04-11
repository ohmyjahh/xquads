'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Header } from './header';

const STANDALONE_ROUTES = ['/carrossel', '/instagram'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = pathname.replace(basePath, '') || '/';

  if (STANDALONE_ROUTES.includes(cleanPath)) {
    return (
      <div className="min-h-screen bg-[#121214]">
        <main className="p-4 md:p-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#121214]">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar desktop: sempre visível | mobile: drawer */}
      <div
        className={[
          'fixed inset-y-0 left-0 z-50 md:relative md:flex md:translate-x-0 transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
