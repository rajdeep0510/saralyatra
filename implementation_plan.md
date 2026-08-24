# Supabase PostgreSQL Integration Plan for SaralYatra

This document outlines the complete architectural design and execution roadmap for migrating SaralYatra's static JSON datasets and local state to a **Supabase PostgreSQL** cloud backend.

---

## 1. Value-Added Data to Store in Supabase

Beyond basic place cards, moving to Supabase unlocks powerful real-time capabilities and structured relational data:

| Domain | Table Name | Key Purpose & Value |
| :--- | :--- | :--- |
| **Monuments & Wonders** | `places` | Master catalog of 180+ monuments, coordinates, categories, ticket pricing, and facility matrices. |
| **Multilingual Lore & Audio** | `place_narratives` | Dedicated translations (`en`, `hi`, `gu`, `ta`, `mr`, `bn`), audio narration URLs, and folklore texts. |
| **360° Panoramic Hotspots** | `panoramas_360` & `hotspots_360` | Dynamic 360 scene coordinates, cardinal headings, and interactive spatial annotation pins. |
| **Authentic Homestays** | `homestays` | Local village homestays, host dialect, culinary specialities, dietary readiness (Jain/Pure Veg), and night rates. |
| **User Profiles & Auth** | `user_profiles` | Links to Supabase Auth (`auth.users`), storing traveler origin, dietary needs, language preferences, and bucket lists. |
| **Personalized Itineraries** | `trips` & `itinerary_stops` | Cloud-synced itinerary generator outputs, confirmed bookings, route stops, and pacing. |
| **Bucket List & Bookmarks** | `user_bookmarks` | 1-click saved monuments with cross-device sync. |
| **Crowd & Weather Insights** | `crowd_forecasts` | Hourly congestion levels (Low/Moderate/High), best visiting windows, and local weather advisories. |
| **Traveler Community Reviews** | `reviews_ratings` | Verified traveler ratings (1–5), photo uploads, and community accessibility tips. |
| **Media Storage Buckets** | `Storage: tts-audio`, `Storage: 360-views` | Storing TTS MP3 narration audio files and high-res 360 panoramic equirectangular textures. |

---

## 2. Detailed Database Schema (PostgreSQL DDL)

```sql
-- Enable PostGIS for geospatial radius search & route sorting
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PLACES & HERITAGE MONUMENTS
-- ==============================================================================
CREATE TABLE places (
  id TEXT PRIMARY KEY, -- e.g., 'UT-BAD-001', 'GJ-SOM-001'
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  era TEXT,
  category TEXT NOT NULL CHECK (category IN ('heritage', 'nature', 'spiritual', 'adventure')),
  sub_category TEXT,
  is_offbeat BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 3,
  image_url TEXT NOT NULL,
  panorama_url TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  opening_time TEXT,
  closing_time TEXT,
  recommended_duration_mins INTEGER DEFAULT 120,
  ticket_prices JSONB DEFAULT '{"general": 0}'::jsonb,
  facilities JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. MULTILINGUAL NARRATIVES & AUDIO FOLKLORE
-- ==============================================================================
CREATE TABLE place_narratives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  place_id TEXT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL CHECK (language_code IN ('en', 'hi', 'gu', 'ta', 'mr', 'bn')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  history TEXT,
  audio_url TEXT, -- Link to Supabase Storage MP3 bucket
  audio_duration_secs INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(place_id, language_code)
);

-- ==============================================================================
-- 3. 360° VR HOTSPOTS & SCENES
-- ==============================================================================
CREATE TABLE hotspots_360 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  place_id TEXT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  heading DOUBLE PRECISION NOT NULL, -- 0 to 360 degrees
  pitch DOUBLE PRECISION NOT NULL,   -- -90 to 90 degrees
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_scene_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. HOMESTAYS & HOST NETWORK
-- ==============================================================================
CREATE TABLE homestays (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'heritage',
  host_name TEXT NOT NULL,
  host_origin TEXT NOT NULL,
  languages_spoken TEXT[] DEFAULT '{}',
  food_specialty TEXT NOT NULL,
  dietary_ready TEXT NOT NULL CHECK (dietary_ready IN ('pureVeg', 'jain', 'halal', 'any')),
  price_per_night NUMERIC(10, 2) NOT NULL,
  about TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  cover_image TEXT,
  rating NUMERIC(3, 2) DEFAULT 4.8,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. USER PROFILES & PREFERENCES
-- ==============================================================================
CREATE TABLE user_profiles (
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
-- 6. PERSONALIZED TRIPS & ITINERARY STOPS
-- ==============================================================================
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'all',
  region TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('draft', 'confirmed', 'completed', 'archived')),
  total_distance TEXT,
  travel_time TEXT,
  monuments_count INTEGER DEFAULT 0,
  cultural_filter JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE itinerary_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  stop_order INTEGER NOT NULL,
  time_slot TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  monument_id TEXT REFERENCES places(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. USER BOOKMARKS / BUCKET LIST
-- ==============================================================================
CREATE TABLE user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  place_id TEXT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, place_id)
);
```

---

## 3. Row Level Security (RLS) Policies

- **Public Data (`places`, `place_narratives`, `hotspots_360`, `homestays`)**:
  - `SELECT`: Open to `anon` and `authenticated` users.
  - `INSERT/UPDATE/DELETE`: Restricted to Service Role (Admin).
- **Private User Data (`user_profiles`, `trips`, `itinerary_stops`, `user_bookmarks`)**:
  - Travelers can only read, insert, and update rows where `user_id = auth.uid()`.

---

## 4. Proposed Implementation Steps

### Phase 1: Environment & Client Setup
1. Install Supabase SDK: `@supabase/supabase-js` and `@supabase/ssr`.
2. Create `lib/supabase/client.ts` (browser client) and `lib/supabase/server.ts` (Next.js server-side client).
3. Set environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Phase 2: Database Migration & Seeding Script
1. Create a script (`scripts/seedSupabase.ts`) to ingest all JSON files from `data/Place_data_json/`, `data/place_decription_json/`, `data/place_translations.json`, and `data/mockData.ts` and upload them to Supabase tables.

### Phase 3: Connect Frontend Views & TravelContext
1. Update `TravelContext.tsx` to read/write active trips and bookmarks to Supabase with instant offline fallback.
2. Update `/wonders` page to fetch places directly from Supabase with server-side caching (`revalidate: 3600`).
3. Update Itinerary and Homestays views to dynamically sync with Supabase tables.

---

## 5. Verification Plan

1. **Automated Seed Run**: Execute `npx tsx scripts/seedSupabase.ts` to populate 180+ places and translations.
2. **Read/Write Verification**:
   - Test loading `/wonders` with direct Supabase querying.
   - Test creating and saving an itinerary to the `trips` table.
   - Test toggling a bookmark and verifying row insertion in `user_bookmarks`.
3. **Build & Edge Runtime Validation**:
   - Run `npm run build` to confirm zero SSR hydration conflicts or build breakages.
