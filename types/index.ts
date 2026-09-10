export type LanguageCode = "en" | "hi" | "gu" | "ta" | "mr" | "bn";

export type TripCategory = "all" | "heritage" | "nature" | "spiritual" | "adventure" | "culinary";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Monument {
  id: string;
  name: string;
  state: string;
  city?: string;
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
  openingTime?: string;
  closingTime?: string;
  recommendedDuration?: number;
  priority?: number;
  facilities?: Record<string, boolean | string | number | undefined>;
  ticketPrices?: Record<string, number | string | undefined>;
}

export interface CompatibilityScore {
  food: number;
  language: number;
  heritage: number;
  overall: number;
}

export type DietaryType = "pureVeg" | "jain" | "halal" | "any" | string;

export interface UserProfile {
  name: string;
  dietary: DietaryType;
  homeState: string;
  homeCity?: string;
  savedTrips?: PreloadedTrip[];
}

export interface InTripCommuteSegment {
  fromStop: string;
  toStop: string;
  distanceKm: number;
  estimatedMinutes: number;
  recommendedMode: "auto" | "cab" | "metro" | "ferry" | "walk" | "bus";
  modeName: string; // e.g. "Prepaid Auto", "Local App Taxi (Ola/Uber)", "Kochi Water Metro", "Heritage Tonga"
  estimatedFare: number;
  notes?: string;
}

export interface DailyCommuteSummary {
  dayNumber: number;
  totalDayKm: number;
  totalDayTransitMinutes: number;
  recommendedDailyTransit: string;
  estDailyCostPerPerson: number;
  segments: InTripCommuteSegment[];
}

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

export type ActivityType = "monument" | "nature" | "spiritual" | "adventure" | "lunch" | "hotel" | "transit" | string;

export interface ItineraryStop {
  id: string;
  time: string;
  type: ActivityType;
  title: string;
  desc: string;
  duration?: string;
  lat?: number;
  lng?: number;
  monumentId?: string;
  transitToNext?: {
    distanceKm: number;
    durationMins: number;
    mode: string;
    estFare: number;
  };
}

export interface ItineraryDay {
  day: number;
  date?: string;
  stops: ItineraryStop[];
  commuteSummary?: DailyCommuteSummary;
}

export interface TripStats {
  totalDistance: string;
  travelTime: string;
  monumentsCount: number;
}

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
    departureCity?: string;
  };
  itinerary: ItineraryDay[];
}

export interface FilterPreferences {
  category?: TripCategory;
  region: string;
  duration: number;
  dates: string;
  travelers: number;
  pacing: "Relaxed" | "Moderate" | "Intensive" | string;
  famousRatio: number;
  dietary: DietaryType;
  language: string;
  interests: string[];
  departureCity?: string;
}

export type TranslationMap = Record<string, string>;
export type Translations = Record<LanguageCode | string, TranslationMap>;
