'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState<'email' | 'details'>('email');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('account_holder');
  const router = useRouter();

  const handleProceedToDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }

    setStep('details');
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register-direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          phone,
          firstName,
          lastName,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === 'email_exists' || data.error.includes('already exists')) {
          setError('Account with this email already exists. Please log in instead.');
          setTimeout(() => {
            router.push('/');
          }, 2000);
          setLoading(false);
          return;
        }
        
        setError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Success - redirect with delay to show confirmation message
      setTimeout(() => {
        router.push('/select-user-type');
      }, 2000);
    } catch (err) {
      setError('Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary">Create Account</h1>
              <p className="text-xs text-muted-foreground">
                Step {step === 'email' ? '1' : '2'} of 2
              </p>
            </div>
          </div>

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleProceedToDetails} className="space-y-4">
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
                  Mobile Number (Optional)
                </label>
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-medium"
              >
                Next
              </Button>
            </form>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="bg-muted border-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="bg-muted border-input"
                  required
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
                className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-medium"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setError('');
                }}
                className="w-full text-sm text-primary hover:underline"
              >
                Back to email
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
