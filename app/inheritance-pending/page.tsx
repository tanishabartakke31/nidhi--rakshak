'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, LogOut, Clock, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function InheritancePendingPage() {
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const router = useRouter();

  // Calculate remaining days (demo: 7 days cool-down)
  const daysRemaining = 7;
  const daysElapsed = 0;

  const handleCancelInheritance = async () => {
    setCancelLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push('/');
  };

  const handleLogout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-destructive text-white p-6 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inheritance Protocol Active</h1>
            <p className="text-white/80 text-sm mt-1">Cool-down Period In Effect</p>
          </div>
          <Image
            src="/nidhi-rakshak-logo.png"
            alt="Nidhi Rakshak"
            width={60}
            height={50}
            className="w-auto h-auto"
          />
        </div>
      </header>

      <main className="p-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="w-full max-w-2xl p-8 border-2 border-destructive/30 bg-destructive/5">
          {/* Status Alert */}
          <div className="mb-8 p-6 bg-destructive/10 border border-destructive/30 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-destructive mb-2">
                  🟠 Inheritance Pending
                </h2>
                <p className="text-muted-foreground">
                  No response received from emergency contact. The inheritance protocol has been activated with a cool-down period.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline / Counter */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 border-2 border-destructive/20 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-destructive" />
                <p className="text-sm font-semibold text-muted-foreground">Days Remaining</p>
              </div>
              <p className="text-4xl font-bold text-destructive">{daysRemaining}</p>
              <p className="text-xs text-muted-foreground mt-2">Before nominee access is granted</p>
            </Card>

            <Card className="p-6 border-2 border-destructive/20 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-muted-foreground">Status</p>
              </div>
              <p className="text-2xl font-bold text-destructive">In Cool-Down</p>
              <p className="text-xs text-muted-foreground mt-2">Day {daysElapsed} of {daysRemaining}</p>
            </Card>
          </div>

          {/* Warning Box */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg mb-8 space-y-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-3">Important Notice</p>
                <p className="text-muted-foreground font-semibold text-base mb-3">
                  User can still cancel by logging in.
                </p>
                <p className="text-muted-foreground text-sm">
                  If the account holder logs in during this period, they can immediately cancel the inheritance protocol and reset the inactivity timer. This prevents unintended asset transfers.
                </p>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="p-4 bg-muted/50 rounded-lg mb-8 text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">Timeline:</p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>Days 1-7: Cool-down period (user can cancel)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>Day 8: Nominee gains read-only access to assets</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>Day 30: Full inheritance verification begins</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleCancelInheritance}
              disabled={cancelLoading}
              className="w-full h-12 bg-accent text-white font-bold hover:shadow-lg"
            >
              {cancelLoading ? 'Logging in...' : 'Cancel Inheritance & Login'}
            </Button>
            <Button
              onClick={handleLogout}
              disabled={loading}
              variant="outline"
              className="w-full h-12 border-2 border-primary text-primary font-semibold hover:bg-primary/10 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {loading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground text-center">
            <p className="mb-2">🔒 This is a critical period in the account protection system</p>
            <p>All actions during this period are logged and auditable for security and compliance.</p>
          </div>
        </Card>
      </main>
    </div>
  );
}
