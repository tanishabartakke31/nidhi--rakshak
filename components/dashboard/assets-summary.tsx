'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Asset {
  id: string;
  asset_type: string;
  account_name: string;
  balance: number;
  created_at: string;
}

export function AssetsSummary() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data: authData } = await supabase.auth.getSession();
        const userId = authData.session?.user.id;

        if (!userId) return;

        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setAssets(data || []);
        const total = (data || []).reduce((sum, asset) => sum + asset.balance, 0);
        setTotalBalance(total);
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const getAssetIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      stocks: '📈',
      gold: '🪙',
      bank_deposits: '🏦',
      real_estate: '🏠',
    };
    return icons[type] || '💰';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Your Assets</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all your financial assets
          </p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-secondary to-primary text-white">
          <Plus className="w-4 h-4" />
          Add Asset
        </Button>
      </div>

      {/* Total Balance */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <p className="text-sm text-muted-foreground mb-1">Total Assets Value</p>
        <h4 className="text-3xl font-bold text-primary">
          ₹{totalBalance.toLocaleString()}
        </h4>
      </div>

      {/* Assets List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No assets added yet</p>
          <Button className="bg-gradient-to-r from-secondary to-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Asset
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{getAssetIcon(asset.asset_type)}</div>
                <div>
                  <p className="font-medium text-foreground">{asset.account_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {asset.asset_type.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">₹{asset.balance.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-secondary" />
                  Updated today
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
