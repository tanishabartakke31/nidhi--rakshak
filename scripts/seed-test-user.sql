-- Seed test user for Nidhi Rakshak
-- Email: tanisha.bartakke@gmail.com
-- Password: 123456 (will be hashed by Supabase Auth)

-- First, create the user in Supabase Auth
-- Note: This needs to be done through Supabase Auth API or console

-- Create user profile for test user
INSERT INTO user_profiles (
  id,
  email,
  phone_number,
  full_name,
  user_type,
  date_of_birth,
  aadhaar_number,
  pan_number,
  address,
  city,
  state,
  pincode,
  inactivity_threshold_days,
  last_activity_timestamp,
  is_active,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'tanisha.bartakke@gmail.com' LIMIT 1),
  'tanisha.bartakke@gmail.com',
  '+91-9999999999',
  'Tanisha Bartakke',
  'account_holder',
  '1990-01-15',
  '123456789012',
  'ABCDE1234F',
  '123 Government Street',
  'New Delhi',
  'Delhi',
  '110001',
  30,
  NOW(),
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Log the initial account creation
INSERT INTO activity_logs (
  user_id,
  activity_type,
  description,
  ip_address,
  device_info,
  created_at
)
SELECT 
  id,
  'account_created',
  'Account created and initialized',
  '0.0.0.0',
  'System - Seed',
  NOW()
FROM auth.users 
WHERE email = 'tanisha.bartakke@gmail.com'
LIMIT 1;
