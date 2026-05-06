'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

interface NomineeSidebarProps {
  isOpen: boolean;
  currentPage: 'dashboard' | 'assets' | 'documents' | 'account-holders';
}

export function NomineeSidebar({ isOpen, currentPage }: NomineeSidebarProps) {
  const router = useRouter();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/nominee-dashboard' },
    { id: 'assets', label: 'Assets', path: '/nominee-dashboard/assets' },
    { id: 'documents', label: 'Documents', path: '/nominee-dashboard/documents' },
    { id: 'account-holders', label: 'Account Holders', path: '/nominee-dashboard/account-holders' },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden shadow-lg z-40`}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-primary">NIDHI RAKSHAK</h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Nominee Portal</p>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              console.log("[v0] Navigating to:", item.path);
              router.push(item.path);
            }}
            type="button"
            className={`w-full px-4 py-2 rounded-lg transition-colors text-left block cursor-pointer ${
              currentPage === item.id
                ? 'bg-sidebar-primary/20'
                : 'hover:bg-sidebar-accent/20'
            }`}
          >
            <p
              className={`text-sm ${
                currentPage === item.id
                  ? 'font-medium text-sidebar-primary'
                  : 'text-sidebar-foreground/80'
              }`}
            >
              {item.label}
            </p>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-4 right-4 space-y-2">
        <Button
          onClick={() => router.push('/dashboard')}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary text-white hover:shadow-lg transition-shadow"
        >
          <User className="w-4 h-4" />
          View as Account Holder
        </Button>

        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/20"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
