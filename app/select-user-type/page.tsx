'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';

export default function SelectUserTypePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSelectUserType = async (userType: 'user' | 'nominee') => {
    setLoading(true);
    setError('');

    try {
      // Pure UI/UX demo - just navigate
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      router.push(userType === 'user' ? '/dashboard' : '/nominee-dashboard');
    } catch (err) {
      console.log('[v0] Navigation error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Choose Your Role
            </h1>
            <p className="text-muted-foreground text-lg">
              Select how you'd like to use Nidhi Rakshak
            </p>
          </div>

          {/* User Type Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* User Card */}
            <Card
              className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors cursor-pointer flex flex-col"
              onClick={() => handleSelectUserType('user')}
            >
              <div className="p-8 text-center flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">Account Holder</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Manage your assets, set up nominees, and safeguard your financial future
                </p>
                <div className="space-y-2 text-left mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> Manage Assets
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> Set Inactivity Timer
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> Add Nominees
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> Emergency Contacts
                  </div>
                </div>
                <Button
                  onClick={() => handleSelectUserType('user')}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-medium mt-auto"
                >
                  {loading ? 'Processing...' : 'Continue as Account Holder'}
                </Button>
              </div>
            </Card>

            {/* Nominee Card */}
            <Card
              className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors cursor-pointer flex flex-col"
              onClick={() => handleSelectUserType('nominee')}
            >
              <div className="p-8 text-center flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">Nominee</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Access and manage assets when activated, view documents and account information
                </p>
                <div className="space-y-2 text-left mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> View Assets
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> Access Documents
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> View Account Info
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary">✓</span> Receive Notifications
                  </div>
                </div>
                <Button
                  onClick={() => handleSelectUserType('nominee')}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-medium mt-auto"
                >
                  {loading ? 'Processing...' : 'Continue as Nominee'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-muted rounded-lg border border-border text-center text-xs text-muted-foreground">
            <p className="mb-1">🔒 Your choice can be changed anytime in settings</p>
            <p>Both roles are protected with government-grade security</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
