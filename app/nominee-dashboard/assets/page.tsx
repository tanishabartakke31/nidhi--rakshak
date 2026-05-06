'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NomineeSidebar } from '@/components/nominee/sidebar';
import { Logo } from '@/components/logo';
import { Menu, ArrowLeft } from 'lucide-react';

interface Asset {
  id: string;
  accountHolder: string;
  type: 'Bank' | 'Wallet' | 'Crypto';
  accountName: string;
  balance: string;
  lastUpdated: string;
}

export default function NomineeAssetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const [assets] = useState<Asset[]>([
    {
      id: '1',
      accountHolder: 'Tanisha Bartakke',
      type: 'Bank',
      accountName: 'ICICI Bank Account',
      balance: '₹5,00,000',
      lastUpdated: '2026-03-08',
    },
    {
      id: '2',
      accountHolder: 'Tanisha Bartakke',
      type: 'Wallet',
      accountName: 'PayTM Wallet',
      balance: '₹30,000',
      lastUpdated: '2026-03-08',
    },
    {
      id: '3',
      accountHolder: 'Tanisha Bartakke',
      type: 'Crypto',
      accountName: 'Bitcoin Holdings',
      balance: '0.5 BTC',
      lastUpdated: '2026-03-07',
    },
    {
      id: '4',
      accountHolder: 'Rajesh Kumar',
      type: 'Bank',
      accountName: 'HDFC Bank Account',
      balance: '₹12,50,000',
      lastUpdated: '2026-03-08',
    },
    {
      id: '5',
      accountHolder: 'Rajesh Kumar',
      type: 'Wallet',
      accountName: 'Google Pay Balance',
      balance: '₹15,500',
      lastUpdated: '2026-03-08',
    },
    {
      id: '6',
      accountHolder: 'Rajesh Kumar',
      type: 'Crypto',
      accountName: 'Ethereum Holdings',
      balance: '2.5 ETH',
      lastUpdated: '2026-03-06',
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <NomineeSidebar isOpen={sidebarOpen} currentPage="assets" />

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
                <h1 className="text-2xl font-bold">Digital Assets</h1>
                <p className="text-white/80 text-sm mt-1">View all assets under your care</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Digital Assets Under Your Care</h2>

            {assets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No assets available</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Array.from(new Set(assets.map((a) => a.accountHolder))).map((accountHolder) => (
                  <div key={accountHolder}>
                    <h3 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-border">
                      {accountHolder}
                    </h3>
                    <div className="space-y-2">
                      {assets
                        .filter((asset) => asset.accountHolder === accountHolder)
                        .map((asset) => (
                          <div
                            key={asset.id}
                            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {asset.type === 'Bank'
                                    ? '🏦'
                                    : asset.type === 'Wallet'
                                      ? '💰'
                                      : asset.type === 'Crypto'
                                        ? '₿'
                                        : '📊'}
                                </span>
                                <div>
                                  <p className="font-medium text-foreground">{asset.accountName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Type: <span className="font-semibold">{asset.type}</span> • Updated:{' '}
                                    {asset.lastUpdated}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">{asset.balance}</p>
                              <p className="text-xs text-muted-foreground">View only</p>
                            </div>
                          </div>
                        ))}
                    </div>
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
