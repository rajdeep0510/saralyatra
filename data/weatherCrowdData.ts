import { PreloadedTrip, ItineraryDay, ItineraryStop } from "@/types";

export type WeatherCondition = 
  | "Sunny" 
  | "Clear" 
  | "Partly Cloudy" 
  | "Heavy Rain" 
  | "Moderate Rain" 
  | "Thunderstorm" 
  | "Heatwave" 
  | "Dense Fog" 
  | "Pleasant";

export type AQILevel = "Good" | "Moderate" | "Poor" | "Unhealthy" | "Severe";

export interface DayWeatherForecast {
  dayNumber: number;
  cityName: string;
  temperatureC: number;
  feelsLikeC: number;
  condition: WeatherCondition;
  iconEmoji: string;
  rainProbability: number; // 0 - 100%
  aqi: number; // e.g. 42, 120, 240
  aqiLevel: AQILevel;
  humidity: number;
  windKph: number;
  bestVisitingWindow: string; // e.g. "07:30 AM - 10:30 AM (Golden Hour)"
  peakHeatHour: string; // e.g. "12:30 PM - 03:30 PM"
  isAdverse: boolean;
  adverseType?: "rain" | "heat" | "aqi" | "crowd";
  adverseReason?: string;
  smartSwapSuggestion?: {
    originalStopTitle: string;
    suggestedAlternative: string;
    alternativeType: "indoor_museum" | "covered_palace" | "golden_hour_shift" | "cultural_workshop";
    reason: string;
    impact: string;
  };
  crowdDensity: {
    level: "Low (Peaceful)" | "Moderate" | "High (Peak)" | "Surge";
    percentage: number;
    peakRushHour: string;
    goldenHour: string;
    avgWaitTimeMinutes: number;
    recommendation: string;
  };
}

// Sensor knowledge base for diverse Indian travel destinations
export function getDayWeatherAndCrowd(
  regionName: string = "kerala",
  dayNumber: number = 1
): DayWeatherForecast {
  const reg = regionName.toLowerCase();

  // 1. Kerala & South Green Valleys (Simulates Rain Alert on Day 2)
  if (reg.includes("kerala") || reg.includes("munnar") || reg.includes("alleppey") || reg.includes("kochi")) {
    if (dayNumber === 2) {
      return {
        dayNumber,
        cityName: "Munnar Tea Hills",
        temperatureC: 22,
        feelsLikeC: 21,
        condition: "Heavy Rain",
        iconEmoji: "⛈️",
        rainProbability: 85,
        aqi: 28,
        aqiLevel: "Good",
        humidity: 92,
        windKph: 18,
        bestVisitingWindow: "07:00 AM - 09:30 AM",
        peakHeatHour: "None (Overcast)",
        isAdverse: true,
        adverseType: "rain",
        adverseReason: "Heavy monsoon shower forecasted from 11:30 AM to 03:30 PM.",
        smartSwapSuggestion: {
          originalStopTitle: "High Altitude Tea Plantation Trek",
          suggestedAlternative: "Tata Tea Heritage Museum & Indoor Fermentation Factory",
          alternativeType: "indoor_museum",
          reason: "Avoids open hillside trail slippery hazard during peak rainfall.",
          impact: "100% dry indoor experiential tea tasting & historical film screening."
        },
        crowdDensity: {
          level: "Moderate",
          percentage: 45,
          peakRushHour: "12:00 PM - 02:00 PM",
          goldenHour: "08:00 AM - 10:00 AM",
          avgWaitTimeMinutes: 15,
          recommendation: "Indoor museum exhibits have covered verandas with zero rain disruption."
        }
      };
    }

    return {
      dayNumber,
      cityName: dayNumber === 1 ? "Kochi Fort" : "Alleppey Backwaters",
      temperatureC: 27,
      feelsLikeC: 29,
      condition: "Pleasant",
      iconEmoji: "⛅",
      rainProbability: 15,
      aqi: 34,
      aqiLevel: "Good",
      humidity: 78,
      windKph: 12,
      bestVisitingWindow: "08:00 AM - 11:00 AM & 04:00 PM - 06:30 PM",
      peakHeatHour: "01:00 PM - 03:00 PM",
      isAdverse: false,
      crowdDensity: {
        level: "Low (Peaceful)",
        percentage: 30,
        peakRushHour: "02:00 PM - 04:00 PM",
        goldenHour: "07:30 AM - 09:30 AM",
        avgWaitTimeMinutes: 8,
        recommendation: "Ideal backwater boating conditions with soft breeze."
      }
    };
  }

  // 2. Rajasthan (Jaipur, Jodhpur, Udaipur) (Simulates Afternoon Heatwave on Day 2)
  if (reg.includes("rajasthan") || reg.includes("jaipur") || reg.includes("jodhpur") || reg.includes("jaisalmer") || reg.includes("udaipur")) {
    if (dayNumber === 2) {
      return {
        dayNumber,
        cityName: "Jaipur Citadels",
        temperatureC: 38,
        feelsLikeC: 41,
        condition: "Heatwave",
        iconEmoji: "☀️",
        rainProbability: 0,
        aqi: 115,
        aqiLevel: "Moderate",
        humidity: 28,
        windKph: 14,
        bestVisitingWindow: "06:30 AM - 09:30 AM & 05:00 PM - 07:00 PM",
        peakHeatHour: "12:00 PM - 03:45 PM (Intense Solar Index 9)",
        isAdverse: true,
        adverseType: "heat",
        adverseReason: "High midday solar radiation on open stone ramparts (>40°C on exposed sandstone).",
        smartSwapSuggestion: {
          originalStopTitle: "Midday Open Ramparts Fort Trek",
          suggestedAlternative: "City Palace Royal Armoury & Air-Cooled Miniature Painting Gallery",
          alternativeType: "covered_palace",
          reason: "Midday heat makes exposed battlements exhausting for families.",
          impact: "Saves 3 hours of harsh sun exposure while exploring royal treasures in shade."
        },
        crowdDensity: {
          level: "High (Peak)",
          percentage: 78,
          peakRushHour: "11:00 AM - 02:30 PM",
          goldenHour: "07:00 AM - 09:00 AM",
          avgWaitTimeMinutes: 40,
          recommendation: "Early morning 7 AM entry avoids both tour bus queues and midday heat."
        }
      };
    }

    return {
      dayNumber,
      cityName: "Amber & Nahargarh Foothills",
      temperatureC: 31,
      feelsLikeC: 32,
      condition: "Clear",
      iconEmoji: "🌤️",
      rainProbability: 0,
      aqi: 95,
      aqiLevel: "Moderate",
      humidity: 35,
      windKph: 10,
      bestVisitingWindow: "07:00 AM - 10:30 AM",
      peakHeatHour: "01:00 PM - 03:00 PM",
      isAdverse: false,
      crowdDensity: {
        level: "Moderate",
        percentage: 50,
        peakRushHour: "01:00 PM - 03:30 PM",
        goldenHour: "07:00 AM - 09:00 AM",
        avgWaitTimeMinutes: 18,
        recommendation: "Sunset view at Nahargarh Fort recommended around 05:45 PM."
      }
    };
  }

  // 3. Varanasi / Kashi (Spiritual Pilgrimage) (Simulates High Crowd Surge on Day 1)
  if (reg.includes("varanasi") || reg.includes("kashi") || reg.includes("spiritual") || reg.includes("ganga") || reg.includes("puri")) {
    return {
      dayNumber,
      cityName: "Kashi Ghats & Sanctum",
      temperatureC: 28,
      feelsLikeC: 30,
      condition: "Pleasant",
      iconEmoji: "🪔",
      rainProbability: 5,
      aqi: 140,
      aqiLevel: "Moderate",
      humidity: 62,
      windKph: 8,
      bestVisitingWindow: "05:30 AM - 08:30 AM (Subah-e-Banaras)",
      peakHeatHour: "12:30 PM - 02:30 PM",
      isAdverse: dayNumber === 1,
      adverseType: "crowd",
      adverseReason: "Major pilgrimage festival crowd surge expected at temple corridor between 10:30 AM and 01:30 PM.",
      smartSwapSuggestion: {
        originalStopTitle: "Midday Main Temple Queue",
        suggestedAlternative: "Sunrise Boat Heritage Ride & Peaceful Morning Ghat Darshan",
        alternativeType: "golden_hour_shift",
        reason: "Midday queue exceeds 75 minutes. Sunrise slot has under 12 minutes wait.",
        impact: "Saves 1 hour waiting in queue and catches divine golden morning light."
      },
      crowdDensity: {
        level: dayNumber === 1 ? "Surge" : "Moderate",
        percentage: dayNumber === 1 ? 88 : 55,
        peakRushHour: "10:30 AM - 01:30 PM & 06:30 PM - 08:00 PM",
        goldenHour: "05:30 AM - 07:30 AM",
        avgWaitTimeMinutes: dayNumber === 1 ? 65 : 20,
        recommendation: "Book VIP Sugam Darshan or arrive before 06:30 AM."
      }
    };
  }

  // 4. Gujarat (Heritage & Stepwells)
  if (reg.includes("gujarat") || reg.includes("ahmedabad") || reg.includes("somnath") || reg.includes("rann")) {
    return {
      dayNumber,
      cityName: "Patan & Modhera",
      temperatureC: 32,
      feelsLikeC: 33,
      condition: "Sunny",
      iconEmoji: "☀️",
      rainProbability: 0,
      aqi: 65,
      aqiLevel: "Moderate",
      humidity: 40,
      windKph: 12,
      bestVisitingWindow: "08:00 AM - 11:00 AM",
      peakHeatHour: "01:00 PM - 03:30 PM",
      isAdverse: false,
      crowdDensity: {
        level: "Low (Peaceful)",
        percentage: 35,
        peakRushHour: "12:00 PM - 02:00 PM",
        goldenHour: "08:00 AM - 10:00 AM",
        avgWaitTimeMinutes: 10,
        recommendation: "Subterranean stepwells (Rani ki Vav) remain naturally 5°C cooler inside."
      }
    };
  }

  // 5. Default Pan-Bharat Sensor Forecast
  return {
    dayNumber,
    cityName: regionName,
    temperatureC: 26,
    feelsLikeC: 27,
    condition: "Clear",
    iconEmoji: "🌤️",
    rainProbability: 10,
    aqi: 48,
    aqiLevel: "Good",
    humidity: 55,
    windKph: 11,
    bestVisitingWindow: "08:00 AM - 11:30 AM",
    peakHeatHour: "01:00 PM - 03:00 PM",
    isAdverse: false,
    crowdDensity: {
      level: "Moderate",
      percentage: 45,
      peakRushHour: "12:00 PM - 02:30 PM",
      goldenHour: "07:30 AM - 09:30 AM",
      avgWaitTimeMinutes: 15,
      recommendation: "Optimal touring conditions across all scheduled sights."
    }
  };
}

// 1-Click Smart Rescheduler Engine: Updates itinerary to swap adverse weather/crowd stops
export function applySmartWeatherCrowdReschedule(
  trip: PreloadedTrip,
  targetDayNumber: number
): { updatedTrip: PreloadedTrip; appliedChangesDescription: string } {
  const updatedItinerary = trip.itinerary.map((day) => {
    if (day.day !== targetDayNumber) return day;

    const forecast = getDayWeatherAndCrowd(trip.region || "kerala", targetDayNumber);

    // If no adverse condition, return day untouched
    if (!forecast.isAdverse || !forecast.smartSwapSuggestion) {
      return day;
    }

    const swap = forecast.smartSwapSuggestion;

    // Transform stops for this day:
    const updatedStops: ItineraryStop[] = day.stops.map((stop) => {
      // If stop matches outdoor/midday activity, replace with indoor/golden hour equivalent
      if (
        stop.title.toLowerCase().includes("trek") ||
        stop.title.toLowerCase().includes("hike") ||
        stop.title.toLowerCase().includes("rampart") ||
        stop.title.toLowerCase().includes("queue") ||
        stop.type === "nature" ||
        stop.time.includes("12:") ||
        stop.time.includes("01:")
      ) {
        return {
          ...stop,
          title: `🛡️ ${swap.suggestedAlternative}`,
          desc: `${swap.reason} — ${swap.impact}`,
          type: swap.alternativeType === "indoor_museum" ? "heritage" : stop.type
        };
      }
      return stop;
    });

    return {
      ...day,
      stops: updatedStops
    };
  });

  const forecast = getDayWeatherAndCrowd(trip.region || "kerala", targetDayNumber);
  const changeSummary = forecast.smartSwapSuggestion
    ? `Rescheduled Day ${targetDayNumber}: Swapped '${forecast.smartSwapSuggestion.originalStopTitle}' with '${forecast.smartSwapSuggestion.suggestedAlternative}' to protect against ${forecast.condition} (${forecast.rainProbability > 50 ? `${forecast.rainProbability}% Rain` : `${forecast.temperatureC}°C Midday Heat`}).`
    : `Optimized Day ${targetDayNumber} schedule for golden hour timings.`;

  return {
    updatedTrip: {
      ...trip,
      itinerary: updatedItinerary
    },
    appliedChangesDescription: changeSummary
  };
}
