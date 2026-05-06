'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/logo';
import { Plus, Trash2, Menu, AlertCircle, Clock, Users, ArrowLeft } from 'lucide-react';

interface Nominee {
  id: string;
  email: string;
}

interface EmergencyContact {
  id: string;
  email: string;
}

export default function InheritanceRulesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [inactivityDays, setInactivityDays] = useState(30);
  const [cooldownDays, setCooldownDays] = useState(7);
  const [nominees, setNominees] = useState<Nominee[]>([
    { id: '1', email: 'nominee@example.com' },
  ]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', email: 'emergency@example.com' },
  ]);
  const [newNomineeEmail, setNewNomineeEmail] = useState('');
  const [newEmergencyEmail, setNewEmergencyEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleAddNominee = () => {
    if (!newNomineeEmail) return;
    const newNominee: Nominee = {
      id: Date.now().toString(),
      email: newNomineeEmail,
    };
    setNominees([...nominees, newNominee]);
    setNewNomineeEmail('');
  };

  const handleRemoveNominee = (id: string) => {
    setNominees(nominees.filter(n => n.id !== id));
  };

  const handleAddEmergencyContact = () => {
    if (!newEmergencyEmail) return;
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      email: newEmergencyEmail,
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
    setNewEmergencyEmail('');
  };

  const handleRemoveEmergencyContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
  };

  const handleSaveRules = () => {
    setSuccessMessage('Inheritance rules saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} currentPage="inheritance-rules" />

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
                <h1 className="text-2xl font-bold">Inheritance Rules</h1>
                <p className="text-white/80 text-sm mt-1">Configure your inheritance protection</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto">

          {/* Success Message */}
          {successMessage && (
            <Card className="p-4 mb-6 bg-accent/10 border-2 border-accent">
              <p className="text-accent font-medium">{successMessage}</p>
            </Card>
          )}

          {/* Inactivity Settings */}
          <Card className="p-6 border-2 border-primary/20 mb-6">
            <h2 className="text-xl font-bold text-primary mb-6">Inactivity Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Inactivity Time (days)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={inactivityDays}
                  onChange={(e) => setInactivityDays(parseInt(e.target.value) || 1)}
                  className="bg-muted border-input text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Cool-down Time (days)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={cooldownDays}
                  onChange={(e) => setCooldownDays(parseInt(e.target.value) || 1)}
                  className="bg-muted border-input text-lg font-semibold"
                />
              </div>
            </div>

            <div className="p-4 bg-primary/5 border-l-4 border-l-primary rounded">
              <p className="text-sm text-foreground">
                <span className="font-semibold">What happens:</span> If you are inactive for <span className="font-bold text-primary">{inactivityDays} days</span>, emergency verification will start. Nominees will have <span className="font-bold text-primary">{cooldownDays} days</span> to verify before asset access is granted.
              </p>
            </div>
          </Card>

          {/* Nominees Section */}
          <Card className="p-6 border-2 border-primary/20 mb-6">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Add Nominee
            </h2>

            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter nominee email address"
                  value={newNomineeEmail}
                  onChange={(e) => setNewNomineeEmail(e.target.value)}
                  className="bg-muted border-input flex-1"
                />
                <Button
                  onClick={handleAddNominee}
                  className="bg-gradient-to-r from-secondary to-primary text-white font-medium px-6 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {nominees.length === 0 ? (
                <p className="text-muted-foreground text-sm">No nominees added yet.</p>
              ) : (
                nominees.map((nominee) => (
                  <div key={nominee.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <p className="text-foreground">{nominee.email}</p>
                    <button
                      onClick={() => handleRemoveNominee(nominee.id)}
                      className="p-1 hover:bg-destructive/20 rounded transition-colors text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Emergency Contacts Section */}
          <Card className="p-6 border-2 border-primary/20 mb-6">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Add Emergency Contact
            </h2>

            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter emergency contact email"
                  value={newEmergencyEmail}
                  onChange={(e) => setNewEmergencyEmail(e.target.value)}
                  className="bg-muted border-input flex-1"
                />
                <Button
                  onClick={handleAddEmergencyContact}
                  className="bg-gradient-to-r from-secondary to-primary text-white font-medium px-6 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {emergencyContacts.length === 0 ? (
                <p className="text-muted-foreground text-sm">No emergency contacts added yet.</p>
              ) : (
                emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <p className="text-foreground">{contact.email}</p>
                    <button
                      onClick={() => handleRemoveEmergencyContact(contact.id)}
                      className="p-1 hover:bg-destructive/20 rounded transition-colors text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSaveRules}
            className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-white font-bold text-lg hover:shadow-lg transition-shadow"
          >
            Save Inheritance Rules
          </Button>

          {/* Info Box */}
          <Card className="p-6 mt-6 border-2 border-accent/30 bg-accent/5">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-foreground mb-2">How your inheritance protection works:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your account is monitored for inactivity</li>
                  <li>• If inactive for {inactivityDays} days, emergency contacts are notified</li>
                  <li>• Nominees receive access requests for verification</li>
                  <li>• After {cooldownDays}-day verification period, access is granted if confirmed</li>
                  <li>• Click "I'm Active" on your dashboard to reset the timer</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-30 p-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        Menu
      </button>
    </div>
  );
}
