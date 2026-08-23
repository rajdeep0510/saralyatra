# Saral Yatra — Architecture & System Documentation

**Saral Yatra (सरल यात्रा)** is a Pan-India cultural tourism and smart itinerary planning platform. It curates India's monuments, nature valleys, spiritual sanctuaries, and heritage homestays into personalized journeys powered by algorithmic route generation, Indic voice narrators, 360° virtual previews, and cultural profiling (dietary, dialect, and pacing).

---

## 📚 Documentation Index

| Document | Description |
|---|---|
| [1. System Architecture](./ARCHITECTURE.md) | Next.js App Router architecture, global state management (`TravelContext`), client shell, layout hierarchy, and data flow. |
| [2. Routes & User Views](./ROUTES_AND_VIEWS.md) | Deep dive into every page (`/`, `/wonders`, `/planner`, `/itinerary`, `/homestays`, `/api/tts`) and modal workflow. |
| [3. Trip Engine & Algorithms](./TRIP_ENGINE_ALGORITHM.md) | Algorithmic itinerary generation, Haversine routing, famous-to-offbeat distribution, meal injection, and live stats recalculation. |
| [4. Components & UI Subsystems](./COMPONENTS_GUIDE.md) | Documentation for all component modules: Audio narrator & Tanpura drone synthesizer, Leaflet map visualizer, preference wizards, and cards. |
| [5. Data Models, Types & Translations](./DATA_MODELS_AND_TYPES.md) | TypeScript schemas, mock data dictionary, cultural taxonomy, and multi-language support (English, Hindi, Gujarati, Tamil, Marathi, Bengali). |

---

## 🚀 Tech Stack Overview

- **Framework**: Next.js (App Router, Webpack engine)
- **UI & Styling**: Tailwind CSS (v4), Vanilla CSS variables, Lucide React icons
- **State Management**: React 19 Context API (`TravelContext`) with `localStorage` client-side hydration & persistence
- **Mapping & Geolocation**: Leaflet.js, OpenStreetMap tiles, OSRM routing with Bezier curve highway interpolation
- **Audio & Speech**: Web Speech Synthesis API, Web Audio API (real-time harmonic Tanpura drone synthesizer), server-side TTS fallback API (`/api/tts`)
- **Type Safety**: TypeScript 5 with strict typings

---

## 🏛️ Project Directory Structure

```text
saralyatra/
├── app/
│   ├── api/
│   │   └── tts/
│   │       └── route.ts         # Server-side TTS endpoint
│   ├── homestays/
│   │   └── page.tsx             # Culturally matched homestays & retreats
│   ├── itinerary/
│   │   └── page.tsx             # Live route map & timeline editor
│   ├── planner/
│   │   └── page.tsx             # AI Trip Architect wizard
│   ├── wonders/
│   │   └── page.tsx             # Pan-India wonders & folklore archive
│   ├── globals.css              # Styling tokens & animations
│   ├── layout.tsx               # Root HTML shell & TravelProvider wrapper
│   └── page.tsx                 # Landing entrance portal
├── components/
│   ├── discovery/
│   │   ├── AudioNarrator.tsx    # Vernacular narrator & Tanpura drone
│   │   ├── HeritageCard.tsx     # Monument gallery card with 360 preview
│   │   ├── LanguageSelector.tsx # Language selector dropdown
│   │   └── PanoramaViewerModal.tsx # 360-degree virtual tour modal
│   ├── homestays/
│   │   └── HomestayCard.tsx     # Homestay card with compatibility scoring
│   ├── layout/
│   │   ├── ClientLayoutShell.tsx# Persistent navbar, footer, and modals
│   │   ├── Footer.tsx           # Global footer
│   │   └── Navbar.tsx           # Editorial navigation & profile drawer
│   └── planner/
│       ├── ActivitySlot.tsx     # Draggable timeline stop item
│       ├── AddDestinationModal.tsx # Add monument modal for days
│       ├── ItineraryTimeline.tsx# Day-by-day itinerary stops list
│       ├── MapRouteVisualizer.tsx # Leaflet route map with polylines
│       └── PreferenceWizard.tsx # Multi-step trip planner wizard
├── context/
│   └── TravelContext.tsx        # Global state, persistence & action helpers
├── data/
│   └── mockData.ts              # Curated pan-India dataset & translations
├── docs/                        # Architecture & system documentation
├── types/
│   ├── declarations.d.ts        # Module declarations (Leaflet, etc.)
│   └── index.ts                 # Core TypeScript interfaces
├── utils/
│   └── tripEngine.ts            # Dynamic itinerary & distance calculation
└── views/
    ├── DashboardView.tsx        # Hero landing & feature gateways
    ├── HeritageDetailsView.tsx  # Full editorial oral lore & story modal
    ├── ItineraryMapView.tsx     # Interactive map & itinerary dashboard
    ├── TripPlannerView.tsx      # Planner studio view
    └── WondersGalleryView.tsx   # Curated archive view
```
