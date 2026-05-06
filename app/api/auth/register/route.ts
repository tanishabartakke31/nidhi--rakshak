import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      phoneNumber,
      fullName,
      userType = 'account_holder',
      dateOfBirth,
      aadhaarNumber,
      panNumber,
      address,
      city,
      state,
      pincode,
    } = body

    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Create user in Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        email,
        phone_number: phoneNumber,
        full_name: fullName,
        user_type: userType,
        date_of_birth: dateOfBirth,
        aadhaar_number: aadhaarNumber,
        pan_number: panNumber,
        address,
        city,
        state,
        pincode,
        inactivity_threshold_days: 30,
        last_activity_timestamp: new Date(),
        is_active: true,
      })

    if (profileError) {
      // Clean up the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(user.id)
      return NextResponse.json(
        { error: `Profile creation failed: ${profileError.message}` },
        { status: 500 }
      )
    }

    // Log account creation
    await supabase.from('activity_logs').insert({
      user_id: user.id,
      activity_type: 'account_created',
      description: 'Account created via registration',
      ip_address: request.headers.get('x-forwarded-for') || '0.0.0.0',
      device_info: request.headers.get('user-agent') || 'Unknown',
    })

    return NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
