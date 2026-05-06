'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle, Eye, Download, Lock } from 'lucide-react';
import Image from 'next/image';

export default function NomineeAccessPage() {
  const [step, setStep] = useState<'verification' | 'access'>('verification');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setStep('access');
    setLoading(false);
  };

  if (step === 'verification') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-white p-6 shadow-lg">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Nominee Secure Login</h1>
              <p className="text-white/80 text-sm mt-1">Asset Access Verification</p>
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
          <Card className="w-full max-w-md p-8 border-2 border-primary/20">
            <div className="text-center mb-8">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-2">Verify Identity</h2>
              <p className="text-muted-foreground">Secure access to digital assets</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-muted border-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  One-Time Access Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  disabled={loading}
                  maxLength={6}
                  className="bg-muted border-input text-center text-xl tracking-widest"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-semibold"
              >
                {loading ? 'Verifying...' : 'Verify Identity'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">Security Note:</p>
              <p>This access is temporary and read-only. You cannot modify or delete any assets. All access is logged and auditable.</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // Access Granted Screen
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-accent text-white p-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Asset Access Granted</h1>
            <p className="text-white/80 text-sm mt-1">Viewing Tanisha's Digital Assets</p>
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

      <main className="p-6 max-w-5xl mx-auto">
        {/* Welcome Message */}
        <Card className="mb-8 p-6 bg-accent/5 border border-accent/30">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-accent" />
            <h2 className="text-xl font-bold text-foreground">
              Access granted to Tanisha's digital assets.
            </h2>
          </div>
          <p className="text-muted-foreground">
            You have been granted temporary read-only access to the asset information. You can view details and download documents but cannot make modifications.
          </p>
        </Card>

        {/* Assets List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Digital Assets</h3>
          <div className="space-y-3">
            {/* Asset 1 */}
            <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    Bank Account
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">HDFC Bank - Savings Account</p>
                  <p className="text-lg font-bold text-primary mt-2">₹5,00,000</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Asset 2 */}
            <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    Digital Wallet
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">PayTM / Apple Pay Balance</p>
                  <p className="text-lg font-bold text-primary mt-2">₹30,000</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Asset 3 */}
            <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    Cryptocurrency
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Bitcoin Holdings</p>
                  <p className="text-lg font-bold text-primary mt-2">0.5 BTC</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Documents</h3>
          <div className="space-y-3">
            <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Bank Statement - December 2025</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF • 2.4 MB</p>
                </div>
                <Button
                  size="sm"
                  className="bg-primary text-white hover:shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>

            <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Asset List & Details</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF • 1.2 MB</p>
                </div>
                <Button
                  size="sm"
                  className="bg-primary text-white hover:shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>

            <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Crypto Wallet Keys (Encrypted)</p>
                  <p className="text-sm text-muted-foreground mt-1">Secure • Encrypted Document</p>
                </div>
                <Button
                  size="sm"
                  className="bg-primary text-white hover:shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Important Notes */}
        <Card className="p-6 border-l-4 border-l-primary bg-primary/5">
          <div className="flex gap-4">
            <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-foreground mb-2">Access Restrictions</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>This is read-only access. You cannot modify or delete assets.</li>
                <li>All your actions are logged for security and audit purposes.</li>
                <li>This access is temporary and may be revoked by the system.</li>
                <li>Handle sensitive documents with care and security.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => router.push('/')}
            className="px-8 bg-gradient-to-r from-secondary to-primary text-white font-semibold"
          >
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
}
