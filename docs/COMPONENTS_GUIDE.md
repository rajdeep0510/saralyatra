# Components & Subsystems Guide

This document details all interactive UI components and subsystems in **Saral Yatra**.

---

## 1. Discovery Components (`components/discovery/`)

### 🎙️ [AudioNarrator.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/discovery/AudioNarrator.tsx)
Provides interactive spoken folklore narration with an ambient classical Indian musical backdrop.

- **Web Audio API Tanpura Drone Synthesizer**:
  - Synthesizes 4 harmonic oscillator voices based on classical Indian Sa-Pa tuning ($C_3$ root at $130.81\text{ Hz}$, $G_3$ fifth at $196\text{ Hz}$, $C_4$ octave at $261.63\text{ Hz}$).
  - Uses lowpass biquad filters and subtle LFO tremolo modulation for an authentic acoustic string resonance.
  - Can be toggled on/off independently of the narrator.

- **Dual-Engine Speech Synthesis**:
  1. **Primary Engine**: Web Speech API (`window.speechSynthesis`). Automatically filters browser voices matching the active language code (`en-IN`, `hi-IN`, `gu-IN`, `ta-IN`, `mr-IN`, `bn-IN`).
  2. **Sentence Segmentation**: Text is split into manageable phrases to prevent browser speech synthesis timeouts on long folklore passages.
  3. **Fallback Engine**: If browser voices are unavailable, streams high-clarity vernacular MP3 audio from `/api/tts?text=...&lang=...`.
  4. **Pacing Controls**: Speed slider ($0.75\times$, $1.0\times$, $1.25\times$, $1.5\times$).

---

### 🖼️ [HeritageCard.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/discovery/HeritageCard.tsx)
The primary attraction card used in the Wonders Gallery.

- Displays high-resolution photography with smooth hover zoom.
- Category tag (Heritage, Nature, Spiritual, Adventure) and historical era pill.
- Vernacular audio availability indicator.
- Action buttons:
  - **"360° View"**: Opens `PanoramaViewerModal`.
  - **"Explore Story"**: Opens `HeritageDetailsView` with in-depth folklore.

---

### 🌐 [LanguageSelector.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/discovery/LanguageSelector.tsx)
Standalone vernacular language picker supporting 6 Indic dialects with localized native scripts:
- `en` (English)
- `hi` (हिन्दी)
- `mr` (मराठी)
- `gu` (ગુજરાતી)
- `bn` (বাংলা)
- `ta` (தமிழ்)

---

### 🌀 [PanoramaViewerModal.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/discovery/PanoramaViewerModal.tsx)
Full-screen modal displaying interactive 360° photo spheres.
- Includes virtual compass bearing, location details, and closing animation.

---

## 2. Planner Components (`components/planner/`)

### 🗺️ [MapRouteVisualizer.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/MapRouteVisualizer.tsx)
Interactive geographic route visualizer built on top of **Leaflet.js** and **OpenStreetMap**.

- **Marker Numbering & Styling**: Custom circular SVG marker pins dynamically colored by activity type (Orange for Heritage, Emerald for Nature, Amber for Spiritual, Cyan for Adventure, Rose for Meals).
- **Curved Route Polylines**: Renders highway curvature using Bezier spline calculation.
- **Auto-Bounding**: Whenever active stops or days change, automatically calculates coordinate bounds and smoothly fits the viewport.
- **Stop Interactivity**: Clicking any map pin highlights the corresponding stop in the day timeline and centers the map.

---

### ⏱️ [ItineraryTimeline.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/ItineraryTimeline.tsx) & [ActivitySlot.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/ActivitySlot.tsx)
The day-by-day vertical timeline for the active trip.

- Groups activities into clean day collapsible containers.
- Each `ActivitySlot` displays:
  - Chronological time badge (e.g. `09:30 AM`).
  - Activity icon and title.
  - Duration estimate (e.g. `2 hours`).
  - Narrative description.
  - Action buttons to inspect folklore details or remove stop from the plan.
- Includes an **"Add Destination"** button per day to open `AddDestinationModal`.

---

### 🪄 [PreferenceWizard.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/PreferenceWizard.tsx)
Multi-step form wizard powering the AI Trip Planner.

- **Step 1**: Target State & Region selector (all 36 Indian States & UTs) + Duration picker (1 to 7+ days).
- **Step 2**: Trip theme, pacing level (*Relaxed*, *Moderate*, *Intensive*), and Famous vs. Offbeat ratio slider.
- **Step 3**: Dietary profile (*Pure Veg*, *Jain*, *Halal*, *Any*), language preference, and transit mode.
- Validates selections and generates dynamic itineraries in real-time.

---

### ➕ [AddDestinationModal.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/planner/AddDestinationModal.tsx)
Search and insert Pan-India attractions into any selected day of an active itinerary.
- Displays attraction cards with state badges and tags.
- Prevents duplicate additions.

---

## 3. Homestay Components (`components/homestays/`)

### 🏡 [HomestayCard.tsx](file:///Users/rajdeepvala/code/projects/saralyatra/components/homestays/HomestayCard.tsx)
Presents culturally matched eco-retreats, heritage havelis, and farmstays.

- **Compatibility Score Meter**: Displays composite percentage match based on dietary alignment, languages spoken by host, and heritage score.
- **Host Profile**: Displays host name, origin, and spoken dialects.
- **Food Specialties**: Highlights culinary specialty (e.g., Satvik Gujarati thali, Keralite Sadhya, Chettinad cuisine).
- **Nightly Price**: Formatted in Indian Rupees (`₹X,XXX / night`).
