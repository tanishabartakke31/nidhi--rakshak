import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json();

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Missing userId or email' },
        { status: 400 }
      );
    }

    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('[v0] Error checking profile:', checkError);
      return NextResponse.json(
        { error: 'Failed to check profile' },
        { status: 400 }
      );
    }

    // If profile doesn't exist, create it
    if (!existingProfile) {
      const { data: newProfile, error: insertError } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: userId,
            email: email,
            user_type: null,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error('[v0] Error creating profile:', insertError);
        return NextResponse.json(
          { error: 'Failed to create profile' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        profile: newProfile,
        message: 'Profile created successfully',
      });
    }

    return NextResponse.json({
      success: true,
      profile: existingProfile,
      message: 'Profile already exists',
    });
  } catch (error) {
    console.error('[v0] Setup profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
