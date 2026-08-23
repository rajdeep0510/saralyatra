# Data Models, Types & Datasets

This document details all TypeScript types, interfaces, and mock datasets defined in [types/index.ts](file:///Users/rajdeepvala/code/projects/saralyatra/types/index.ts) and [data/mockData.ts](file:///Users/rajdeepvala/code/projects/saralyatra/data/mockData.ts).

---

## 1. Core TypeScript Interfaces

### `Monument`
Represents an attraction, natural site, temple, or historical monument.

```typescript
export interface Monument {
  id: string;
  name: string;
  state: string;
  era?: string;
  category: "heritage" | "nature" | "spiritual" | "adventure";
  subCategory?: string;
  isOffbeat: boolean;
  imageUrl: string;
  images?: string[];
  panoramaUrl: string;
  folklore: {
    en: string;
    hi?: string;
    gu?: string;
    ta?: string;
    mr?: string;
    bn?: string;
    [key: string]: string | undefined;
  };
  languagesAvailable: LanguageCode[];
  coordinates: Coordinates;
}
```

---

### `PreloadedTrip` & `ItineraryDay` & `ItineraryStop`
Defines a complete multi-day journey with chronological stops and stats.

```typescript
export interface PreloadedTrip {
  id?: string;
  title: string;
  category?: TripCategory;
  region?: string;
  duration?: number;
  pacing?: string;
  siteMix?: string;
  stats: TripStats;
  culturalFilter?: {
    category?: TripCategory;
    dietary: DietaryType;
    language: string;
    interests: string[];
  };
  itinerary: ItineraryDay[];
}

export interface ItineraryDay {
  day: number;
  date?: string;
  stops: ItineraryStop[];
}

export interface ItineraryStop {
  id: string;
  time: string;
  type: ActivityType; // "heritage" | "nature" | "spiritual" | "adventure" | "lunch" | "hotel" | "transit"
  title: string;
  desc: string;
  duration?: string;
  lat?: number;
  lng?: number;
  monumentId?: string;
}

export interface TripStats {
  totalDistance: string;
  travelTime: string;
  monumentsCount: number;
}
```

---

### `UserProfile` & `FilterPreferences`
Defines traveler identity, preferences, and saved journeys.

```typescript
export interface UserProfile {
  name: string;
  dietary: DietaryType; // "pureVeg" | "jain" | "halal" | "any"
  homeState: string;
  savedTrips?: PreloadedTrip[];
}

export interface FilterPreferences {
  category?: TripCategory;
  region: string;
  duration: number;
  dates: string;
  travelers: number;
  pacing: "Relaxed" | "Moderate" | "Intensive" | string;
  famousRatio: number; // 0 to 100
  dietary: DietaryType;
  language: string;
  interests: string[];
}
```

---

### `Homestay` & `CompatibilityScore`
Defines regional eco-retreats, heritage properties, and scoring metrics.

```typescript
export interface Homestay {
  id: string;
  name: string;
  category?: "heritage" | "nature" | "spiritual" | "adventure" | "eco";
  hostName: string;
  hostOrigin: string;
  languagesSpoken: string[];
  foodSpecialty: string;
  dietaryReady: DietaryType;
  pricePerNight: number;
  about: string;
  compatibilityScore?: CompatibilityScore;
}

export interface CompatibilityScore {
  food: number;      // 40% weight
  language: number;  // 30% weight
  heritage: number;  // 30% weight
  overall: number;   // Composite 100-point score
}
```

---

## 2. Mock Datasets Structure (`data/mockData.ts`)

- **`monuments`**: Comprehensive database of Pan-India cultural, natural, and spiritual landmarks categorized with geographic coordinates (`lat`, `lng`), high-resolution photo galleries, 360° panoramas, and multilingual folklore.
- **`preloadedTrips`**: Verified curated demonstration trips:
  - `kerala`: 3-Day Tropical Nature & Backwaters Journey
  - `rajasthan`: 3-Day Royal Fortresses & Desert Heritage
  - `varanasi`: 3-Day Sacred Ghats & Spiritual Awakening
  - `hampi`: 3-Day Ancient Ruins & Boulder Adventures
- **`homestays`**: Verified community retreats (tea bungalows in Munnar, desert havelis in Jaisalmer, ghat-side Vedic ashrams in Varanasi, Coffee plantations in Coorg).
- **`indianStates`**: Standard list of 28 States and 8 Union Territories grouped by geographic zone (North, South, East, West, Central, North-East).
- **`translations`**: Localized translation keys across English, Hindi, Gujarati, Tamil, Marathi, and Bengali.
