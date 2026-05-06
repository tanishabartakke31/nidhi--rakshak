'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function EmergencyContactConfirmedPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReturnHome = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white p-6 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Verification Confirmed</h1>
            <p className="text-white/80 text-sm mt-1">Account Protection System</p>
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
        <Card className="w-full max-w-xl p-8 border-2 border-accent/30 bg-accent/5">
          {/* Success State */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Verification Confirmed
            </h2>
            <p className="text-muted-foreground text-lg">
              Account holder is safe
            </p>
          </div>

          {/* Status Details */}
          <div className="space-y-3 mb-8">
            <div className="p-4 bg-white border border-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="font-bold text-foreground flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Active - Inactivity Alert Resolved
              </p>
            </div>
            <div className="p-4 bg-white border border-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Verified By</p>
              <p className="font-bold text-foreground">Emergency Contact</p>
            </div>
            <div className="p-4 bg-white border border-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Action Taken</p>
              <p className="font-bold text-foreground">Inactivity Timer Reset</p>
            </div>
          </div>

          {/* Info Message */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-2">What happens next:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>The inactivity alert has been canceled</li>
                  <li>The account holder has been notified of your response</li>
                  <li>Normal account operations resume</li>
                  <li>The inactivity timer resets to 30 days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleReturnHome}
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-semibold"
          >
            {loading ? 'Redirecting...' : 'Return to Home'}
          </Button>

          {/* Log Entry */}
          <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground text-center">
            <p>✓ Response logged and verified</p>
            <p>✓ All actions are auditable and secure</p>
          </div>
        </Card>
      </main>
    </div>
  );
}
