-- ==============================================================================
-- SARALYATRA SUPABASE SCHEMA (ACCOUNTS & SAVED TRIPS ONLY)
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. USER PROFILES TABLE (Linked to auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dietary_preference TEXT DEFAULT 'pureVeg',
  home_state TEXT DEFAULT 'Gujarat',
  preferred_language VARCHAR(10) DEFAULT 'en',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. SAVED TRIPS TABLE (Stores complete saved itinerary JSON)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS saved_trips (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  region TEXT,
  category TEXT,
  duration_days INTEGER DEFAULT 3,
  trip_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_trips ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only manage their own profile
CREATE POLICY "Users can read own profile" ON user_profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Saved Trips: Users can only view, create, update, or delete their own trips
CREATE POLICY "Users can view own saved trips" ON saved_trips 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save own trips" ON saved_trips 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved trips" ON saved_trips 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved trips" ON saved_trips 
  FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile trigger on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name, dietary_preference, home_state)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'dietary_preference', 'pureVeg'),
    COALESCE(new.raw_user_meta_data->>'home_state', 'Gujarat')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically populate profile when a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
