# Routes, Views & Modals Guide

This document details all routes, corresponding views, and modal subsystems in **Saral Yatra**.

---

## 1. Route Breakdown

### 🏠 Route: `/` (Landing Entrance Portal)
- **Source File**: [app/page.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/app/page.tsx)
- **Main View**: [views/DashboardView.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/views/DashboardView.tsx)
- **Key Features**:
  - **Grand Hero Banner**: High-resolution India landscape image with museum-grade dark vignette overlay.
  - **Category Quick-Launches**: Direct shortcuts to theme filters (`Nature`, `Spiritual`, `Heritage`, `Adventure`).
  - **Curated Demo Action Chips**: One-click demo trip loaders for *Kerala (Nature)*, *Rajasthan (Heritage)*, *Kashi (Spiritual)*.
  - **Feature Gateway Cards**: 4 interactive cards directing to Wonders, AI Planner, Live Route Map, and Eco-Stays.

---

### 🏛️ Route: `/wonders` (Pan-India Wonders & Folklore Archive)
- **Source File**: [app/wonders/page.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/app/wonders/page.tsx)
- **Main View**: [views/WondersGalleryView.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/views/WondersGalleryView.tsx)
- **Key Features**:
  - **Multi-Dimensional Filters**: Filter by Theme (`All`, `Nature`, `Spiritual`, `Heritage`, `Adventure`), Indian State, and Experience Type (`Iconic` vs `Hidden Gems/Offbeat`).
  - **Search Integration**: Real-time filtering across attraction names, regions, and descriptions.
  - **Attraction Cards ([HeritageCard.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/discovery/HeritageCard.tsx))**:
    - High-quality image display with category badge and era tag.
    - Indic audio indicator badge showing available languages.
    - Quick actions: **360° Virtual Preview** and **Read Oral Lore & Audio Story**.

---

### 🧭 Route: `/planner` (AI Trip Planner Studio)
- **Source File**: [app/planner/page.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/app/planner/page.tsx)
- **Main View**: [views/TripPlannerView.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/views/TripPlannerView.tsx)
- **Component**: [components/planner/PreferenceWizard.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/PreferenceWizard.tsx)
- **Key Features**:
  - **Step 1: Region & Duration**: Choose from 28 Indian States & 8 Union Territories and duration (1 to 7+ days).
  - **Step 2: Pacing & Site Balance**: Pacing mode (*Relaxed* / *Moderate* / *Intensive*) and Famous vs. Offbeat ratio slider (0% to 100%).
  - **Step 3: Cultural Customs & Dietary**: Dietary profiles (*100% Pure Veg*, *Jain Satvik*, *Halal Certified*, *Any*), Primary language selection, and Transit preferences.
  - **Algorithmic Synthesis**: Clicking "Generate Dynamic Route" invokes `generateDynamicItinerary()` and transitions directly to `/itinerary`.
  - **Interactive FAQ**: Accordion answering queries on dynamic pricing, multi-language narration, satvik dining, and map accuracy.

---

### 🗺️ Route: `/itinerary` (Live Route Map & Timeline)
- **Source File**: [app/itinerary/page.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/app/itinerary/page.tsx)
- **Main View**: [views/ItineraryMapView.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/views/ItineraryMapView.tsx)
- **Components**:
  - [MapRouteVisualizer.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/MapRouteVisualizer.tsx): Interactive Leaflet map.
  - [ItineraryTimeline.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/ItineraryTimeline.tsx): Day-by-day stops and activities.
  - [ActivitySlot.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/ActivitySlot.tsx): Stop item with remove action, time badge, audio link.
  - [AddDestinationModal.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/AddDestinationModal.tsx): Modal to add any attraction from the database to any day.
- **Key Features**:
  - **Interactive Route Polylines**: Auto-zooming Leaflet map with colored route polylines and custom marker pins for each stop.
  - **Stop Removal & Addition**: Real-time itinerary modification with instant recalculation of total driving distance and time.
  - **Confirm & Save Trip**: Saves the trip into traveler profile, triggers a celebratory toast, and returns home.
  - **Discovery Hub Fallback**: If no active trip is planned, renders featured trip inspirations across India (Kerala, Rajasthan, Varanasi, Hampi, Himachal, Meghalaya) that can be loaded in one click.

---

### 🏡 Route: `/homestays` (Culturally Matched Homestays & Retreats)
- **Source File**: [app/homestays/page.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/app/homestays/page.tsx)
- **Component**: [components/homestays/HomestayCard.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/homestays/HomestayCard.tsx)
- **Key Features**:
  - **Cultural Compatibility Engine**: Dynamically scores homestays on a 100-point index based on:
    - **Food Compatibility (40%)**: Pure Veg / Jain Satvik / Halal readiness.
    - **Dialect / Language Compatibility (30%)**: Languages spoken by host matching user's selected language.
    - **Heritage Match (30%)**: Eco, retreat, or heritage property authenticity.
  - Cards highlight host background, specialty dishes, spoken languages, and nightly pricing in INR.

---

### 🔊 API Route: `/api/tts` (Server-Side Text-to-Speech)
- **Source File**: [app/api/tts/route.ts](file:///Users/rajdeepvala/code/projects/saralyatra/app/api/tts/route.ts)
- **Method**: `GET /api/tts?text=...&lang=...`
- **Purpose**: Serves as high-fidelity audio stream fallback when client browser SpeechSynthesis does not support specific Indic dialects (e.g. Gujarati, Tamil, Bengali).
- **Headers & Caching**: Streams `audio/mpeg` with `Cache-Control: public, max-age=86400, immutable`.

---

## 2. Modal Subsystems

### 1. 360° Virtual Preview Modal (`PanoramaViewerModal.tsx`)
- Displays full-screen interactive panoramic photo spheres using an iframe or 360 viewer.
- Includes compass orientation indicator, full-screen toggle, and description banner.

### 2. Full Heritage Oral Lore Modal (`HeritageDetailsView.tsx`)
- Multi-image photo gallery carousel with keyboard shortcut (`Esc` to close).
- Vernacular folklore stories in 6 Indian languages.
- In-depth architectural details, best visiting hours, and entry tips.
- Integrated **AudioNarrator** for spoken audio playback.

### 3. Add Destination Modal (`AddDestinationModal.tsx`)
- Search and filter Pan-India attractions to inject into specific days of an active itinerary.
- Prevents duplicate additions and immediately updates live distance metrics.

### 4. Traveler Profile & Saved Trips Popover (`Navbar.tsx`)
- **Profile Tab**: Edit traveler name, dietary preference (`Pure Veg`, `Jain Satvik`, `Halal`, `Any`), and home state.
- **Saved Trips Tab**: List of all confirmed trips with total days, distance, and one-click "View Route" restore or delete actions.
