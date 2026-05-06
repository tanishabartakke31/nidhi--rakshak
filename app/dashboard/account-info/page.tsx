'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/logo';
import { Menu, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface AccountInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  memberSince: string;
  status: string;
}

export default function AccountInfoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const [accountInfo] = useState<AccountInfo>({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    dateOfBirth: '1985-05-15',
    memberSince: '2025-01-15',
    status: 'Active',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} currentPage="assets" />

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
                <h1 className="text-2xl font-bold">Account Information</h1>
                <p className="text-white/80 text-sm mt-1">View and manage your account details</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Account Information</h2>
            <p className="text-muted-foreground">Your personal details and account status</p>
          </div>

          {/* Main Account Card */}
          <Card className="p-8 mb-6 border-2 border-primary/20">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                <p className="text-2xl font-bold text-foreground">{accountInfo.name}</p>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Account Status</p>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                  {accountInfo.status}
                </span>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-foreground mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{accountInfo.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium text-foreground">{accountInfo.phone}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">{accountInfo.address}</p>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium text-foreground">{accountInfo.dateOfBirth}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-foreground mb-4">Account Activity</h3>
                
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">{accountInfo.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-2 border-primary"
            >
              Back
            </Button>
            <Button className="bg-gradient-to-r from-secondary to-primary text-white">
              Edit Profile
            </Button>
          </div>
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
