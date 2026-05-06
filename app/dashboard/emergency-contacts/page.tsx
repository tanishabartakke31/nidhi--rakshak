'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/logo';
import { AlertCircle, Plus, X, Phone, Mail, Menu } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
}

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@example.com',
      relationship: 'Brother',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
  });
  const router = useRouter();

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        ...formData,
      };
      setContacts([newContact, ...contacts]);
      setFormData({ name: '', phone: '', email: '', relationship: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} currentPage="emergency-contacts" />

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
                <h1 className="text-2xl font-bold">Emergency Contacts</h1>
                <p className="text-white/80 text-sm mt-1">Trusted people to notify in case of inactivity</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl mx-auto">
          {/* Alert */}
          <Card className="mb-6 border-secondary/30 bg-secondary/5 p-4">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Security Notice</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Emergency contacts will receive notifications about your account inactivity. Make sure you trust these contacts with access to your financial information.
                </p>
              </div>
            </div>
          </Card>

          {/* Add Contact Form */}
          {showForm && (
            <Card className="mb-6 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Add Emergency Contact</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1 hover:bg-muted rounded-lg"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <form onSubmit={handleAddContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Relationship</label>
                  <Input
                    type="text"
                    placeholder="e.g., Family, Friend, Lawyer"
                    value={formData.relationship}
                    onChange={(e) =>
                      setFormData({ ...formData, relationship: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-secondary to-primary text-white"
                  >
                    {loading ? 'Adding...' : 'Add Contact'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border-border"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Contacts List */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Your Contacts ({contacts.length})
              </h2>
              {!showForm && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="gap-2 bg-gradient-to-r from-secondary to-primary text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </Button>
              )}
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <Phone className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No emergency contacts added yet</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="gap-2 bg-gradient-to-r from-secondary to-primary text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                      <div className="flex gap-4 mt-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {contact.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
