'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Activity {
  id: string;
  action: string;
  description: string;
  created_at: string;
}

export function ActivityCard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data: authData } = await supabase.auth.getSession();
        const userId = authData.session?.user.id;

        if (!userId) return;

        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (action: string) => {
    const icons: { [key: string]: string } = {
      login: '🔑',
      asset_added: '💰',
      nominee_added: '👤',
      document_uploaded: '📄',
      settings_updated: '⚙️',
      inactivity_set: '⏱️',
    };
    return icons[action] || '📝';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Your last activities
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No activities yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-start gap-3 pb-3 ${
                index !== activities.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="text-lg">{getActivityIcon(activity.action)}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.action.replace(/_/g, ' ').toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {formatDate(activity.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:underline font-medium">
          View All Activities →
        </button>
      </div>
    </Card>
  );
}
