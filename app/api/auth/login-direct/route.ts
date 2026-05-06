import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Create client with anon key for sign-in operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errorMessage = error.message || String(error);
      console.error('[v0] Login Error:', errorMessage);
      
      // Handle HTML response (server down)
      if (errorMessage.includes('<!DOCTYPE') || errorMessage.includes('Unexpected token')) {
        return NextResponse.json(
          { error: 'Authentication service is temporarily unavailable. Please try again in a few moments.' },
          { status: 503 }
        );
      }
      
      if (errorMessage.includes('Invalid login credentials')) {
        return NextResponse.json(
          { error: 'Invalid email or password. Please check your credentials.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    if (!data.session) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        user_metadata: data.user.user_metadata,
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
      message: 'Login successful',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[v0] Login Server Error:', errorMessage);
    
    // Handle JSON parse errors from HTML responses (server down)
    if (errorMessage.includes('Unexpected token') || errorMessage.includes('<!DOCTYPE')) {
      return NextResponse.json(
        { error: 'Authentication service is temporarily unavailable. Please try again in a few moments.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to login. Please try again.' },
      { status: 500 }
    );
  }
}
