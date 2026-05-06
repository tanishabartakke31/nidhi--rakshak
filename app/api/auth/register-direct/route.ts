import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Create client with anon key for standard signup operations
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
    const { email, password, phone, firstName, lastName, role } = await request.json();

    // Debug: Log environment variables
    console.log('[v0] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('[v0] Supabase Key available:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[v0] Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Missing Supabase credentials.' },
        { status: 500 }
      );
    }

    // Sign up user with standard Supabase signUp method
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName || '',
          last_name: lastName || '',
          phone_number: phone || '',
          role: role || 'account_holder',
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    });

    if (authError) {
      const errorMessage = authError.message || String(authError);
      console.error('[v0] Auth Error:', errorMessage);

      // Handle HTML response (server down)
      if (errorMessage.includes('<!DOCTYPE') || errorMessage.includes('Unexpected token')) {
        return NextResponse.json(
          {
            error: 'Authentication service is temporarily unavailable. Please try again in a few moments.',
            code: 'service_unavailable',
          },
          { status: 503 }
        );
      }

      if (errorMessage.includes('already registered') || 
          errorMessage.includes('User already registered') ||
          errorMessage.includes('email_exists') ||
          errorMessage.includes('already been registered')) {
        return NextResponse.json(
          {
            error: 'Account with this email already exists. Please log in instead.',
            code: 'email_exists',
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        user_metadata: authData.user?.user_metadata,
      },
      message: authData.user?.identities?.length === 0 
        ? 'Account created! Please check your email to confirm your account.'
        : 'Account created successfully',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[v0] Registration Error:', errorMessage);
    
    // Handle JSON parse errors from HTML responses (server down)
    if (errorMessage.includes('Unexpected token') || errorMessage.includes('<!DOCTYPE')) {
      return NextResponse.json(
        { error: 'Authentication service is temporarily unavailable. Please try again in a few moments.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
