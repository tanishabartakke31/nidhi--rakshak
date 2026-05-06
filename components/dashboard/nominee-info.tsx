'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Nominee {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  created_at: string;
}

export function NomineeInfo() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const { data: authData } = await supabase.auth.getSession();
        const userId = authData.session?.user.id;

        if (!userId) return;

        const { data, error } = await supabase
          .from('nominees')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNominees(data || []);
      } catch (error) {
        console.error('Error fetching nominees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-xl font-bold text-foreground">Nominees</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {nominees.length} nominee{nominees.length !== 1 ? 's' : ''} added
            </p>
          </div>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-secondary to-primary text-white h-10">
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : nominees.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No nominees added yet</p>
          <p className="text-xs text-muted-foreground mb-4">
            Add nominees to ensure your assets are protected
          </p>
          <Button className="bg-gradient-to-r from-secondary to-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add First Nominee
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {nominees.map((nominee) => (
            <div
              key={nominee.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold flex items-center justify-center">
                  {getInitials(nominee.name)}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{nominee.name}</p>
                  <p className="text-xs text-muted-foreground">{nominee.relationship}</p>
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>{nominee.email}</p>
                <p>{nominee.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
