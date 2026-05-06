'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface InactivitySetting {
  id: string;
  inactivity_days: number;
  enabled: boolean;
  created_at: string;
}

export default function InactivitySettingsPage() {
  const [setting, setSetting] = useState<InactivitySetting | null>(null);
  const [inactivityDays, setInactivityDays] = useState('30');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastActiveCheckIn, setLastActiveCheckIn] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/');
        return;
      }
      fetchSettings();
    };
    checkAuth();
  }, [router]);

  const fetchSettings = async () => {
    try {
      const { data: authData } = await supabase.auth.getSession();
      const userId = authData.session?.user.id;

      if (!userId) return;

      // Fetch inactivity setting
      const { data: settingData } = await supabase
        .from('inactivity_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (settingData) {
        setSetting(settingData);
        setInactivityDays(settingData.inactivity_days.toString());
        setEnabled(settingData.enabled);
      }

      // Fetch last active check-in
      const { data: activityData } = await supabase
        .from('activity_logs')
        .select('created_at')
        .eq('user_id', userId)
        .eq('action', 'login')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (activityData) {
        setLastActiveCheckIn(activityData.created_at);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);

    try {
      const { data: authData } = await supabase.auth.getSession();
      const userId = authData.session?.user.id;

      if (!userId) return;

      if (setting) {
        const { error } = await supabase
          .from('inactivity_settings')
          .update({
            inactivity_days: parseInt(inactivityDays),
            enabled: enabled,
          })
          .eq('id', setting.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('inactivity_settings')
          .insert([
            {
              user_id: userId,
              inactivity_days: parseInt(inactivityDays),
              enabled: enabled,
            },
          ]);

        if (error) throw error;
      }

      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReportActive = async () => {
    try {
      const { data: authData } = await supabase.auth.getSession();
      const userId = authData.session?.user.id;

      if (!userId) return;

      const { error } = await supabase.from('activity_logs').insert([
        {
          user_id: userId,
          action: 'active_check_in',
          description: 'User confirmed they are active',
        },
      ]);

      if (error) throw error;

      setLastActiveCheckIn(new Date().toISOString());
    } catch (error) {
      console.error('Error reporting activity:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Inactivity Protection
          </h1>
          <p className="text-muted-foreground">
            Set up automatic protection if you don't log in for a period of time
          </p>
        </div>

        {/* Alert */}
        <Card className="mb-6 border-primary/30 bg-primary/5 p-4">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">
                How It Works
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                If you don't log in for the set number of days, your nominees will be notified and can access your assets. You can confirm your activity anytime to reset the timer.
              </p>
            </div>
          </div>
        </Card>

        {/* Settings Card */}
        <Card className="mb-6 p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Inactivity Settings
          </h2>

          <div className="space-y-6">
            {/* Enable/Disable */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">
                  Inactivity Protection
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Enable automatic protection
                </p>
              </div>
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  enabled ? 'bg-primary' : 'bg-muted-foreground/20'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    enabled ? 'translate-x-6' : ''
                  }`}
                ></div>
              </button>
            </div>

            {/* Days Input */}
            {enabled && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Set Inactivity Period (Days)
                </label>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    min="7"
                    max="365"
                    value={inactivityDays}
                    onChange={(e) => setInactivityDays(e.target.value)}
                    className="w-32"
                  />
                  <div className="flex-1 p-3 bg-muted rounded-lg flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-2" />
                    <p className="text-sm text-foreground">
                      Nominees will be notified after{' '}
                      <strong>{inactivityDays} days</strong> of inactivity
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-gradient-to-r from-secondary to-primary text-white"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Activity Status */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Activity Status
          </h2>

          <div className="space-y-4">
            {/* Last Active */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Last Active</p>
                  <p className="text-sm text-muted-foreground">
                    {lastActiveCheckIn
                      ? formatDate(lastActiveCheckIn)
                      : 'No activity recorded'}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Button */}
            <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                Confirm that you're active now. This will reset your inactivity timer.
              </p>
              <Button
                onClick={handleReportActive}
                className="gap-2 bg-gradient-to-r from-green-500 to-primary text-white"
              >
                <CheckCircle2 className="w-4 h-4" />
                I'm Active Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
