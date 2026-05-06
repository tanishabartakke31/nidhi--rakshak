'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NomineeSidebar } from '@/components/nominee/sidebar';
import { Logo } from '@/components/logo';
import { Menu, ArrowLeft, Users } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export default function NomineeAccountHoldersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const [accounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Tanisha Bartakke',
      email: 'tanisha.bartakke@gmail.com',
      status: 'active',
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      status: 'active',
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <NomineeSidebar isOpen={sidebarOpen} currentPage="account-holders" />

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-primary text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Account Holders</h1>
                <p className="text-white/80 text-sm mt-1">View account holders you are a nominee for</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl mx-auto">
          <Button
            onClick={() => router.push('/nominee-dashboard')}
            variant="outline"
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Account Holders</h2>

            {accounts.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No account holders</p>
              </div>
            ) : (
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.email}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        account.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {account.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-30 p-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
}
