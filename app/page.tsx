'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login-direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Store user data in localStorage for session persistence
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('session', JSON.stringify(data.session));
      }

      router.push('/select-user-type');
    } catch (err) {
      console.error('[v0] Login fetch error:', err);
      setError('Failed to login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="p-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Image
              src="/nidhi-rakshak-logo.png"
              alt="Nidhi Rakshak Logo"
              width={140}
              height={120}
              className="w-auto h-auto"
              priority
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">NIDHI RAKSHAK</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Secure today, safeguard tomorrow
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email / Mobile Number
              </label>
              <Input
                type="email"
                placeholder="Enter your email or mobile"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-muted border-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="bg-muted border-input"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-medium text-base hover:shadow-lg transition-shadow"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Forgot Password?
            </Link>
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              New User? Register
            </Link>
          </div>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            <p className="mb-2">🔒 Government-Certified Security</p>
            <p>Your financial data is protected with industry-leading encryption.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
