import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    // Update last activity
    await supabase
      .from('user_profiles')
      .update({ last_activity_timestamp: new Date().toISOString() })
      .eq('id', data.user.id);

    // Log login activity
    await supabase.from('activity_logs').insert({
      user_id: data.user.id,
      activity_type: 'login',
      description: 'User logged in',
      ip_address: request.headers.get('x-forwarded-for') || '0.0.0.0',
      device_info: request.headers.get('user-agent') || 'Unknown',
    });

    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: data.user.id,
          email: data.user.email,
          role: profile?.role,
          fullName: profile?.full_name,
        },
        session: data.session,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
