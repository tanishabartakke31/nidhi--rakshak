'use client';

import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/logo';
import { Trash2, Plus, Menu, ArrowLeft, Wallet } from 'lucide-react';

interface Asset {
  id: string;
  type: 'bank' | 'wallet' | 'crypto';
  accountName: string;
  balance: string;
}

export default function AssetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', type: 'bank', accountName: 'Primary Bank Account', balance: '5,00,000' },
    { id: '2', type: 'wallet', accountName: 'Digital Wallet', balance: '30,000' },
    { id: '3', type: 'crypto', accountName: 'Bitcoin Holdings', balance: '0.5 BTC' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [assetType, setAssetType] = useState<'bank' | 'wallet' | 'crypto'>('bank');
  const [accountName, setAccountName] = useState('');
  const [balance, setBalance] = useState('');
  const router = useRouter();

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !balance) return;

    const newAsset: Asset = {
      id: Date.now().toString(),
      type: assetType,
      accountName,
      balance,
    };

    setAssets([...assets, newAsset]);
    setAccountName('');
    setBalance('');
    setShowForm(false);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return '🏦';
      case 'wallet':
        return '👛';
      case 'crypto':
        return '₿';
      default:
        return '💰';
    }
  };

  const getAssetLabel = (type: string) => {
    switch (type) {
      case 'bank':
        return 'Bank';
      case 'wallet':
        return 'Wallet';
      case 'crypto':
        return 'Crypto';
      default:
        return 'Asset';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} currentPage="assets" />

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
                <p className="text-white/80 text-sm mt-1">Add, view and manage your assets</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Digital Assets</h1>
              <p className="text-muted-foreground mt-1">Manage your financial assets securely</p>
            </div>
          </div>

          {/* Add Asset Form */}
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="mb-8 h-12 bg-gradient-to-r from-secondary to-primary text-white font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Asset
            </Button>
          ) : (
            <Card className="p-6 mb-8 border-2 border-primary/20">
              <h2 className="text-xl font-bold text-primary mb-4">Add Digital Asset</h2>
              <form onSubmit={handleAddAsset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Asset Type</label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as 'bank' | 'wallet' | 'crypto')}
                    className="w-full px-4 py-2 border border-input rounded-lg bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="bank">Bank Account</option>
                    <option value="wallet">Digital Wallet</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Account Name</label>
                  <Input
                    type="text"
                    placeholder="e.g., My Primary Bank Account"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="bg-muted border-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Balance</label>
                  <Input
                    type="text"
                    placeholder={assetType === 'crypto' ? 'e.g., 0.5 BTC' : 'e.g., 5,00,000'}
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="bg-muted border-input"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 h-10 bg-gradient-to-r from-secondary to-primary text-white font-medium"
                  >
                    Save Asset
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setAccountName('');
                      setBalance('');
                    }}
                    variant="outline"
                    className="flex-1 h-10 border-2 border-primary text-primary hover:bg-primary/10"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Assets List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Your Assets</h2>
            {assets.length === 0 ? (
              <Card className="p-8 text-center border-2 border-dashed border-muted">
                <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No assets added yet. Start by adding your first asset.</p>
              </Card>
            ) : (
              assets.map((asset) => (
                <Card
                  key={asset.id}
                  className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{getAssetIcon(asset.type)}</div>
                    <div>
                      <p className="text-sm text-muted-foreground">{getAssetLabel(asset.type)}</p>
                      <h3 className="text-lg font-semibold text-foreground">{asset.accountName}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{asset.balance}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="ml-4 p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-30 p-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        Menu
      </button>
    </div>
  );
}
