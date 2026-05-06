'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';

export default function EmergencyContactPage() {
  const [response, setResponse] = useState<'safe' | 'no-response' | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResponse = async (isSafe: boolean) => {
    setLoading(true);
    setResponse(isSafe ? 'safe' : 'no-response');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (isSafe) {
      // Account holder is safe - reset inactivity
      setTimeout(() => {
        router.push('/emergency-contact/confirmed');
      }, 1000);
    } else {
      // No response - trigger inheritance pending
      setTimeout(() => {
        router.push('/inheritance-pending');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white p-6 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Emergency Verification</h1>
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
        <Card className="w-full max-w-xl p-8 border-2 border-primary/20">
          {/* Alert Section */}
          <div className="mb-8 p-6 bg-destructive/10 border border-destructive/30 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  ⚠️ Tanisha has been inactive for 30 days
                </h2>
                <p className="text-muted-foreground">
                  The account holder has not logged in for the past 30 days. As a trusted emergency contact, we need your verification to proceed.
                </p>
              </div>
            </div>
          </div>

          {/* Main Question */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-3">
              Is she safe?
            </h3>
            <p className="text-muted-foreground">
              Your response will help us determine the next steps in protecting this account's digital assets.
            </p>
          </div>

          {/* Response Buttons */}
          {response === null ? (
            <div className="space-y-4">
              <Button
                onClick={() => handleResponse(true)}
                disabled={loading}
                className="w-full h-14 bg-accent text-white font-bold text-base hover:shadow-lg transition-all"
              >
                {loading && response === 'safe' ? (
                  'Processing...'
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    YES, she is fine
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleResponse(false)}
                disabled={loading}
                className="w-full h-14 bg-destructive text-white font-bold text-base hover:shadow-lg transition-all"
              >
                {loading && response === 'no-response' ? (
                  'Processing...'
                ) : (
                  <>
                    <Clock className="w-5 h-5 mr-2" />
                    No response
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <div className="flex justify-center mb-3">
                {response === 'safe' ? (
                  <CheckCircle className="w-8 h-8 text-accent" />
                ) : (
                  <Clock className="w-8 h-8 text-destructive" />
                )}
              </div>
              <p className="text-muted-foreground">
                {response === 'safe'
                  ? 'Response recorded. Redirecting...'
                  : 'No response recorded. Triggering inheritance protocol...'}
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">How this works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your response helps verify the account holder's safety</li>
              <li>If confirmed safe, the account returns to normal status</li>
              <li>If no response, inheritance protocol begins with a 7-day cool-down period</li>
              <li>All responses are logged and auditable</li>
            </ul>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 border-l-4 border-l-primary bg-primary/5 rounded text-sm">
            <p className="font-semibold text-foreground mb-2">🔒 Security Notice</p>
            <p className="text-muted-foreground">
              This verification request is time-sensitive. Your response is critical to the account protection system. Do not share this page with anyone else.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
