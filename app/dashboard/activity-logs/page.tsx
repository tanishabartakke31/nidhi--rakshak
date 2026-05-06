'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/logo';
import { Menu, Filter, Download } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'login' | 'inactivity' | 'alert' | 'access' | 'system';
  action: string;
  details: string;
  status: 'success' | 'pending' | 'warning';
}

export default function ActivityLogsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filterType, setFilterType] = useState<string | null>(null);
  const router = useRouter();

  const logs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2026-01-25 10:30 AM',
      type: 'login',
      action: 'User logged in',
      details: 'Account holder logged in from IP: 192.168.1.100',
      status: 'success',
    },
    {
      id: '2',
      timestamp: '2026-01-24 08:15 AM',
      type: 'inactivity',
      action: 'Inactivity alert triggered',
      details: 'No activity detected for 30 days. Emergency contact notification sent.',
      status: 'warning',
    },
    {
      id: '3',
      timestamp: '2026-01-24 08:16 AM',
      type: 'alert',
      action: 'Emergency contact notified',
      details: 'Email sent to emergency contact: contact@example.com',
      status: 'success',
    },
    {
      id: '4',
      timestamp: '2026-01-24 02:45 PM',
      type: 'system',
      action: 'Emergency contact responded',
      details: '"No response" selected. Inheritance protocol activated.',
      status: 'warning',
    },
    {
      id: '5',
      timestamp: '2026-01-24 02:46 PM',
      type: 'alert',
      action: 'Inheritance pending activated',
      details: '7-day cool-down period started. Nominee notified.',
      status: 'warning',
    },
    {
      id: '6',
      timestamp: '2026-01-25 03:20 PM',
      type: 'access',
      action: 'Nominee access granted',
      details: 'Nominee logged in and accessed digital assets.',
      status: 'success',
    },
    {
      id: '7',
      timestamp: '2026-01-25 03:22 PM',
      type: 'access',
      action: 'Asset viewed',
      details: 'Nominee viewed Bank Account details (₹5,00,000)',
      status: 'success',
    },
    {
      id: '8',
      timestamp: '2026-01-25 03:25 PM',
      type: 'access',
      action: 'Document downloaded',
      details: 'Nominee downloaded Bank Statement PDF',
      status: 'success',
    },
  ];

  const filteredLogs = filterType ? logs.filter(log => log.type === filterType) : logs;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-accent';
      case 'warning':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      login: '🔐',
      inactivity: '⏳',
      alert: '🚨',
      access: '👤',
      system: '⚙️',
    };
    return icons[type] || '•';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} currentPage="activity-logs" />

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
                <h1 className="text-2xl font-bold">Activity Logs & Audit Trail</h1>
                <p className="text-white/80 text-sm mt-1">Complete record of all system events and actions</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-6xl mx-auto">
          {/* Description */}
          <Card className="mb-8 p-6 bg-primary/5 border border-primary/20">
            <h2 className="text-lg font-bold text-foreground mb-3">Security & Compliance</h2>
            <p className="text-muted-foreground">
              This audit trail logs all critical events including login attempts, inactivity alerts, emergency contact responses, nominee access, and document downloads. Every action is timestamped and cannot be modified, ensuring complete transparency and regulatory compliance.
            </p>
          </Card>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={filterType === null ? 'default' : 'outline'}
              onClick={() => setFilterType(null)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              All Events
            </Button>
            <Button
              variant={filterType === 'login' ? 'default' : 'outline'}
              onClick={() => setFilterType('login')}
            >
              🔐 Login
            </Button>
            <Button
              variant={filterType === 'inactivity' ? 'default' : 'outline'}
              onClick={() => setFilterType('inactivity')}
            >
              ⏳ Inactivity
            </Button>
            <Button
              variant={filterType === 'alert' ? 'default' : 'outline'}
              onClick={() => setFilterType('alert')}
            >
              🚨 Alerts
            </Button>
            <Button
              variant={filterType === 'access' ? 'default' : 'outline'}
              onClick={() => setFilterType('access')}
            >
              👤 Access
            </Button>
            <Button
              variant={filterType === 'system' ? 'default' : 'outline'}
              onClick={() => setFilterType('system')}
            >
              ⚙️ System
            </Button>
          </div>

          {/* Export Button */}
          <div className="mb-8 flex justify-end">
            <Button className="bg-accent text-white flex items-center gap-2 hover:shadow-lg">
              <Download className="w-4 h-4" />
              Export Audit Trail
            </Button>
          </div>

          {/* Logs Timeline */}
          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <p>No logs found for this filter.</p>
              </Card>
            ) : (
              filteredLogs.map((log, index) => (
                <Card
                  key={log.id}
                  className={`p-6 border-l-4 border-l-primary/20 hover:shadow-md transition-shadow ${
                    index === 0 ? 'border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{getTypeIcon(log.type)}</span>
                        <h3 className="text-lg font-bold text-foreground">{log.action}</h3>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(log.status)} bg-${getStatusColor(log.status)}/10`}>
                          {log.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{log.details}</p>
                      <p className="text-xs text-muted-foreground/60 font-mono">
                        {log.timestamp}
                      </p>
                    </div>
                    {index === 0 && (
                      <div className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded">
                        LATEST
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Summary Stats */}
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            <Card className="p-4 text-center border-2 border-primary/20">
              <p className="text-3xl font-bold text-primary">{logs.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Events</p>
            </Card>
            <Card className="p-4 text-center border-2 border-accent/20">
              <p className="text-3xl font-bold text-accent">{logs.filter(l => l.status === 'success').length}</p>
              <p className="text-sm text-muted-foreground mt-1">Successful Actions</p>
            </Card>
            <Card className="p-4 text-center border-2 border-destructive/20">
              <p className="text-3xl font-bold text-destructive">{logs.filter(l => l.status === 'warning').length}</p>
              <p className="text-sm text-muted-foreground mt-1">Alerts/Warnings</p>
            </Card>
            <Card className="p-4 text-center border-2 border-primary/20">
              <p className="text-3xl font-bold text-primary">{logs.filter(l => l.type === 'access').length}</p>
              <p className="text-sm text-muted-foreground mt-1">Access Events</p>
            </Card>
          </div>

          {/* Security Notice */}
          <Card className="mt-8 p-6 border-l-4 border-l-primary bg-primary/5">
            <h4 className="font-bold text-foreground mb-2">🔒 Audit Trail Security</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>All events are immutable and cannot be deleted or modified</li>
              <li>Timestamps are server-generated for accuracy</li>
              <li>All sensitive actions require verification</li>
              <li>This trail is admissible as legal evidence</li>
              <li>Complies with data protection and inheritance regulations</li>
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
