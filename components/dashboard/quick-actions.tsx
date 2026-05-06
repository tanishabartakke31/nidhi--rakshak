'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Clock,
  AlertCircle,
  FileText,
  CheckCircle2,
} from 'lucide-react';

const actions = [
  {
    icon: Plus,
    label: 'Add Asset',
    description: 'Add new asset',
    color: 'text-blue-600',
  },
  {
    icon: Clock,
    label: 'Set Inactivity',
    description: 'Configure protection',
    color: 'text-orange-600',
  },
  {
    icon: AlertCircle,
    label: 'Emergency Contact',
    description: 'Add contact info',
    color: 'text-red-600',
  },
  {
    icon: FileText,
    label: 'View Documents',
    description: 'Access files',
    color: 'text-green-600',
  },
  {
    icon: CheckCircle2,
    label: 'I am Active',
    description: 'Confirm activity',
    color: 'text-green-600',
  },
];

export function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 bg-muted hover:bg-muted/80 border-border text-foreground"
            >
              <Icon className={`w-5 h-5 ${action.color}`} />
              <div className="text-left">
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Status Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Account Status</span>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Inactivity Timer</span>
            <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded">
              Not Set
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
