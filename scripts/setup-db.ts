import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function setupDatabase() {
  try {
    console.log('Setting up Supabase database schema...');

    // Create user_profiles table
    const { error: profilesError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.user_profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL,
          full_name TEXT,
          phone_number TEXT,
          role TEXT DEFAULT 'account_holder',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_activity_timestamp TIMESTAMP
        );

        ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Users can view their own profile" ON public.user_profiles
          FOR SELECT USING (auth.uid() = id);

        CREATE POLICY "Users can update their own profile" ON public.user_profiles
          FOR UPDATE USING (auth.uid() = id);

        CREATE POLICY "Users can delete their own profile" ON public.user_profiles
          FOR DELETE USING (auth.uid() = id);

        CREATE TABLE IF NOT EXISTS public.activity_logs (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          activity_type TEXT NOT NULL,
          description TEXT,
          ip_address TEXT,
          device_info TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Users can view their own activity logs" ON public.activity_logs
          FOR SELECT USING (auth.uid() = user_id);

        CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
        CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at);
      `,
    });

    if (profilesError) {
      console.error('Error setting up profiles table:', profilesError);
    } else {
      console.log('✓ Database schema created successfully');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();
