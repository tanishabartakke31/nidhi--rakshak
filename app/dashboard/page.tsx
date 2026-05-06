'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/logo';
import { Menu, CheckCircle, Clock, Users, Shield, Plus, Settings, Phone, Activity, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'assets' | 'inheritance' | 'emergency' | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    router.push('/');
  };

  const openModal = (type: 'assets' | 'inheritance' | 'emergency') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} currentPage="dashboard" />

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
                <h1 className="text-2xl font-bold">Account Dashboard</h1>
                <p className="text-white/80 text-sm mt-1">Manage your assets and inheritance protection</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary">Account Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your assets and inheritance protection</p>
          </div>

          {/* Status Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Status Card */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <h3 className="text-2xl font-bold text-primary">Active</h3>
                  </div>
                </div>
              </div>
            </Card>

            {/* Last Activity Card */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Last Activity</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Today</h3>
                </div>
              </div>
            </Card>

            {/* Inheritance Rule Card */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Inheritance Rule</p>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">30 Days</h3>
                </div>
              </div>
            </Card>
          </div>

          {/* Inheritance Status */}
          <Card className="p-6 border-2 border-accent/30 bg-accent/5 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Inheritance Status</h3>
                  <p className="text-muted-foreground text-sm">Your inheritance protection is <span className="font-semibold text-accent">SAFE</span></p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last checked today</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Add / View Assets */}
            <Button
              onClick={() => router.push('/dashboard/assets')}
              className="h-16 bg-gradient-to-r from-secondary to-primary text-white font-semibold text-base hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add / View Assets
            </Button>

            {/* Set Inheritance Rules */}
            <Button
              onClick={() => router.push('/dashboard/inheritance-rules')}
              className="h-16 bg-gradient-to-r from-secondary to-primary text-white font-semibold text-base hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Set Inheritance Rules
            </Button>

            {/* Emergency Contact */}
            <Button
              onClick={() => openModal('emergency')}
              className="h-16 bg-gradient-to-r from-secondary to-primary text-white font-semibold text-base hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Emergency Contact
            </Button>

            {/* I'm Active - Highlighted Button */}
            <Button
              className="h-16 bg-accent text-white font-bold text-base hover:shadow-lg transition-shadow flex items-center justify-center gap-2 md:col-span-2 lg:col-span-1"
            >
              <CheckCircle className="w-5 h-5" />
              I'm Active
            </Button>

            {/* View Logs */}
            <Button
              onClick={() => router.push('/dashboard/activity-logs')}
              variant="outline"
              className="h-16 border-2 border-primary text-primary font-semibold text-base hover:bg-primary/10 flex items-center justify-center gap-2"
            >
              <Activity className="w-5 h-5" />
              View Logs
            </Button>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => router.push('/dashboard/assets')}
              className="p-6 border-2 border-primary/20 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors text-left"
            >
              <Plus className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-bold text-foreground">Assets</h3>
              <p className="text-sm text-muted-foreground mt-2">View all digital assets</p>
            </button>

            <button
              onClick={() => router.push('/dashboard/documents')}
              className="p-6 border-2 border-primary/20 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors text-left"
            >
              <Settings className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-bold text-foreground">Documents</h3>
              <p className="text-sm text-muted-foreground mt-2">Access important documents</p>
            </button>

            <button
              onClick={() => router.push('/dashboard/account-info')}
              className="p-6 border-2 border-primary/20 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors text-left"
            >
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-bold text-foreground">Account Info</h3>
              <p className="text-sm text-muted-foreground mt-2">View your account details</p>
            </button>
          </div>

          {/* Security Notice */}
          <Card className="p-6 border-l-4 border-l-primary bg-primary/5">
            <div className="flex items-start gap-4">
              <LogOut className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-2">Security Notice</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your account secure by regularly checking your activity logs, updating your emergency contacts, and confirming your active status monthly.
                </p>
              </div>
            </div>
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
