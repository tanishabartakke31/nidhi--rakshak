'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { NomineeSidebar } from '@/components/nominee/sidebar';
import {
  AlertCircle,
  LogOut,
  Menu,
  Shield,
  FileText,
  Users,
  TrendingUp,
  UserCog,
} from 'lucide-react';

interface Asset {
  id: string;
  accountHolder: string;
  type: 'Bank' | 'Wallet' | 'Crypto';
  accountName: string;
  balance: string;
  lastUpdated: string;
}

interface Account {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

interface Document {
  id: string;
  accountHolder: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  size: string;
}

export default function NomineeDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSafe, setIsSafe] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
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

  const handleSafetyStatus = (safe: boolean) => {
    setIsSafe(safe);
    if (safe) {
      setStatusMessage('Status updated: You are marked as safe ✓');
    } else {
      setStatusMessage('Alert sent: Help will be contacted ⚠️');
    }
    // Clear message after 3 seconds
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <NomineeSidebar isOpen={sidebarOpen} currentPage="dashboard" />

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
                <h1 className="text-2xl font-bold">Nominee Dashboard</h1>
                <p className="text-white/80 text-sm mt-1">Access granted to protected accounts</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Welcome, Nominee</h2>
            <p className="text-muted-foreground mt-2">
              You are listed as a nominee on protected accounts
            </p>
          </div>

          {/* Safety Alert */}
          <Card className="mb-6 border-secondary/30 bg-secondary/5 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <Shield className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Are you safe?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    The account holder has set up inactivity protection. Report your safety status when needed.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSafetyStatus(true)}
                  variant={isSafe === true ? 'default' : 'outline'}
                  className={
                    isSafe === true
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'border-border'
                  }
                >
                  I'm Safe
                </Button>
                <Button
                  onClick={() => handleSafetyStatus(false)}
                  variant={isSafe === false ? 'default' : 'outline'}
                  className={
                    isSafe === false
                      ? 'bg-destructive hover:bg-destructive/90 text-white'
                      : 'border-border'
                  }
                >
                  Need Help
                </Button>
              </div>
            </div>
          </Card>

          {/* Status Message */}
          {statusMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
              <p className="font-medium">{statusMessage}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Protected Accounts</p>
                  <p className="text-3xl font-bold text-primary mt-2">{accounts.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Assets Under Care</p>
                  <p className="text-3xl font-bold text-secondary mt-2">3</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents</p>
                  <p className="text-3xl font-bold text-primary mt-2">5</p>
                </div>
                <FileText className="w-8 h-8 text-primary/20" />
              </div>
            </Card>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
            <Button 
              onClick={() => router.push('/nominee-dashboard/assets')}
              variant="outline"
              className="p-6 h-auto border-2 border-primary/20 hover:border-primary/40 hover:bg-accent/5 transition-colors flex flex-col items-start justify-start overflow-hidden"
            >
              <TrendingUp className="w-8 h-8 text-primary mb-3 flex-shrink-0" />
              <h3 className="text-xl font-bold text-foreground text-left break-words">Assets</h3>
              <p className="text-sm text-muted-foreground mt-2 text-left break-words line-clamp-2">View all digital assets</p>
            </Button>

            <Button 
              onClick={() => router.push('/nominee-dashboard/documents')}
              variant="outline"
              className="p-6 h-auto border-2 border-primary/20 hover:border-primary/40 hover:bg-accent/5 transition-colors flex flex-col items-start justify-start overflow-hidden"
            >
              <FileText className="w-8 h-8 text-primary mb-3 flex-shrink-0" />
              <h3 className="text-xl font-bold text-foreground text-left break-words">Documents</h3>
              <p className="text-sm text-muted-foreground mt-2 text-left break-words line-clamp-2">Access important documents</p>
            </Button>

            <Button 
              onClick={() => router.push('/nominee-dashboard/account-holders')}
              variant="outline"
              className="p-6 h-auto border-2 border-primary/20 hover:border-primary/40 hover:bg-accent/5 transition-colors flex flex-col items-start justify-start overflow-hidden"
            >
              <Users className="w-8 h-8 text-primary mb-3 flex-shrink-0" />
              <h3 className="text-xl font-bold text-foreground text-left break-words">Account Holders</h3>
              <p className="text-sm text-muted-foreground mt-2 text-left break-words line-clamp-2">View account holders</p>
            </Button>
          </div>

          {/* Security Notice */}
          <Card className="mt-8 p-6 border-l-4 border-l-primary bg-primary/5">
            <h4 className="font-bold text-foreground mb-2">Security & Restrictions</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>You can only view and download assets - no modifications allowed</li>
              <li>All your actions are logged for audit purposes</li>
              <li>Access is only granted if inactivity is confirmed</li>
              <li>Your activity will be recorded for legal compliance</li>
            </ul>
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
