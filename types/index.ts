export type LanguageCode = "en" | "hi" | "gu" | "ta";

export type TripCategory = "all" | "heritage" | "nature" | "spiritual" | "adventure" | "culinary";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Monument {
  id: string;
  name: string;
  state: string;
  era?: string;
  category: "heritage" | "nature" | "spiritual" | "adventure";
  subCategory?: string;
  isOffbeat: boolean;
  imageUrl: string;
  panoramaUrl: string;
  folklore: {
    en: string;
    hi?: string;
    gu?: string;
    ta?: string;
    [key: string]: string | undefined;
  };
  languagesAvailable: LanguageCode[];
  coordinates: Coordinates;
}

export interface CompatibilityScore {
  food: number;
  language: number;
  heritage: number;
  overall: number;
}

export type DietaryType = "pureVeg" | "jain" | "halal" | "any" | string;

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
}

export interface ItineraryDay {
  day: number;
  date?: string;
  stops: ItineraryStop[];
}

export interface TripStats {
  totalDistance: string;
  travelTime: string;
  monumentsCount: number;
}

export interface PreloadedTrip {
  id?: string;
  title: string;
  category?: "heritage" | "nature" | "spiritual" | "adventure";
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
}

export type TranslationMap = Record<string, string>;
export type Translations = Record<LanguageCode | string, TranslationMap>;
