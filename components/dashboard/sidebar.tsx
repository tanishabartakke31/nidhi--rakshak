'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentPage: 'dashboard' | 'assets' | 'emergency-contacts' | 'activity-logs' | 'inheritance-rules';
}

export function DashboardSidebar({ isOpen, currentPage }: SidebarProps) {
  const router = useRouter();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'assets', label: 'Assets', path: '/dashboard/assets' },
    { id: 'inheritance-rules', label: 'Inheritance Rules', path: '/dashboard/inheritance-rules' },
    { id: 'emergency-contacts', label: 'Emergency Contacts', path: '/dashboard/emergency-contacts' },
    { id: 'activity-logs', label: 'Activity Logs', path: '/dashboard/activity-logs' },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden shadow-lg z-40`}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-primary">NIDHI RAKSHAK</h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Secure today, safeguard tomorrow</p>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`w-full px-4 py-2 rounded-lg cursor-pointer transition-colors text-left ${
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
          onClick={() => router.push('/nominee-dashboard')}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary text-white hover:shadow-lg transition-shadow"
        >
          <User className="w-4 h-4" />
          View as Nominee
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
