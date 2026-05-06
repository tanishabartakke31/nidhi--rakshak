-- Create tables for Nidhi Rakshak application

-- Users table (extending Supabase auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  phone_number VARCHAR(20),
  user_type VARCHAR(50) NOT NULL, -- 'user' or 'nominee'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User profiles (for individual user details)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  nominee_count INT DEFAULT 0,
  inactivity_threshold_days INT DEFAULT 90,
  last_activity_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Nominees table
CREATE TABLE nominees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nominee_name VARCHAR(255) NOT NULL,
  nominee_email VARCHAR(255),
  nominee_phone VARCHAR(20),
  relationship VARCHAR(100),
  document_type VARCHAR(100), -- 'aadhar', 'pan', 'passport', etc.
  document_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Assets table
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  asset_type VARCHAR(100) NOT NULL, -- 'stocks', 'gold', 'bank_deposits', etc.
  account_name VARCHAR(255) NOT NULL,
  balance DECIMAL(15, 2) NOT NULL,
  account_number VARCHAR(50),
  institution_name VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Emergency Contacts table
CREATE TABLE emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  relationship VARCHAR(100),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity Logs table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  description TEXT,
  action_timestamp TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  device_info TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Safety Status table
CREATE TABLE safety_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_safe BOOLEAN DEFAULT TRUE,
  last_confirmed_at TIMESTAMP,
  confirmation_type VARCHAR(100), -- 'manual', 'biometric', etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(100), -- 'will', 'insurance', 'bank_details', etc.
  file_path VARCHAR(500),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominees ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user_profiles table
CREATE POLICY "Users can read their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for nominees table
CREATE POLICY "Users can read their own nominees" ON nominees
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nominees" ON nominees
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nominees" ON nominees
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nominees" ON nominees
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for assets table
CREATE POLICY "Users can read their own assets" ON assets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assets" ON assets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assets" ON assets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assets" ON assets
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for emergency_contacts table
CREATE POLICY "Users can read their own emergency contacts" ON emergency_contacts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own emergency contacts" ON emergency_contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emergency contacts" ON emergency_contacts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emergency contacts" ON emergency_contacts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for activity_logs table
CREATE POLICY "Users can read their own activity logs" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity logs" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for safety_status table
CREATE POLICY "Users can read their own safety status" ON safety_status
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own safety status" ON safety_status
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own safety status" ON safety_status
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for documents table
CREATE POLICY "Users can read their own documents" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" ON documents
  FOR DELETE USING (auth.uid() = user_id);
