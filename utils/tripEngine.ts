import { Monument, PreloadedTrip, FilterPreferences, ItineraryDay, ItineraryStop } from "@/types";

/**
 * Calculates straight-line distance in km between two lat/lng coordinates
 */
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Recalculates stats for an itinerary
 */
export function recalculateTripStats(itinerary: ItineraryDay[]): { totalDistance: string; travelTime: string; monumentsCount: number } {
  let totalDistanceKm = 0;
  let lastLat: number | null = null;
  let lastLng: number | null = null;
  let monumentsCount = 0;

  for (const day of itinerary) {
    for (const stop of day.stops) {
      if (stop.lat && stop.lng) {
        if (lastLat !== null && lastLng !== null) {
          totalDistanceKm += getDistanceKm(lastLat, lastLng, stop.lat, stop.lng);
        }
        lastLat = stop.lat;
        lastLng = stop.lng;
      }
      if (stop.type === "monument" || stop.type === "nature" || stop.type === "spiritual" || stop.type === "adventure") {
        monumentsCount++;
      }
    }
  }

  const duration = itinerary.length;
  const displayDistance = totalDistanceKm > 0 ? `${totalDistanceKm + (duration * 20)} km` : `${duration * 60} km`;
  const estimatedHours = Math.max(2, Math.round((totalDistanceKm / 40) + duration));

  return {
    totalDistance: displayDistance,
    travelTime: `${estimatedHours} hours total driving`,
    monumentsCount
  };
}

/**
 * Removes a stop from a specific day in the itinerary and recalculates stats
 */
export function removeDestinationFromTrip(
  trip: PreloadedTrip,
  dayNumber: number,
  stopId: string
): PreloadedTrip {
  const updatedDays = trip.itinerary.map((dayGroup) => {
    if (dayGroup.day !== dayNumber) return dayGroup;
    return {
      ...dayGroup,
      stops: dayGroup.stops.filter((s) => s.id !== stopId)
    };
  });

  const newStats = recalculateTripStats(updatedDays);

  return {
    ...trip,
    stats: newStats,
    itinerary: updatedDays
  };
}

/**
 * Adds a new destination monument to a specific day in the itinerary and recalculates stats
 */
export function addDestinationToTrip(
  trip: PreloadedTrip,
  dayNumber: number,
  monument: Monument
): PreloadedTrip {
  const updatedDays = trip.itinerary.map((dayGroup) => {
    if (dayGroup.day !== dayNumber) return dayGroup;

    // Calculate timing for newly added destination
    const existingStops = dayGroup.stops;
    const count = existingStops.length;
    const newTime = count <= 2 ? "11:30 AM" : count <= 4 ? "04:30 PM" : "06:30 PM";

    const newStop: ItineraryStop = {
      id: `custom-${monument.id}-${Date.now()}`,
      time: newTime,
      type: monument.category,
      title: monument.name,
      desc: monument.folklore.en || `Explore ${monument.name} in ${monument.state}.`,
      monumentId: monument.id,
      duration: "2 hours",
      lat: monument.coordinates?.lat,
      lng: monument.coordinates?.lng
    };

    // Insert before the last hotel/stay wrap stop if present
    const lastStop = existingStops[existingStops.length - 1];
    let newStopsList: ItineraryStop[] = [];
    if (lastStop && lastStop.type === "hotel") {
      newStopsList = [...existingStops.slice(0, -1), newStop, lastStop];
    } else {
      newStopsList = [...existingStops, newStop];
    }

    return {
      ...dayGroup,
      stops: newStopsList
    };
  });

  const newStats = recalculateTripStats(updatedDays);

  return {
    ...trip,
    stats: newStats,
    itinerary: updatedDays
  };
}

/**
 * Dynamically synthesizes a customized multi-day trip itinerary
 * from a pool of 100+ destinations based on user preferences and calendar start dates.
 */
export function generateDynamicItinerary(
  prefs: FilterPreferences,
  allDestinations: Monument[]
): PreloadedTrip {
  const {
    category = "all",
    region = "All India",
    duration = 3,
    dates = "",
    pacing = "Moderate",
    famousRatio = 60,
    dietary = "pureVeg",
    language = "Hindi",
    interests = []
  } = prefs;

  // 1. Filter destinations matching region/state and category
  let matched = allDestinations.filter((dest) => {
    const regionLower = region.toLowerCase();
    const matchesRegion =
      region === "All India" ||
      dest.state.toLowerCase().includes(regionLower) ||
      dest.name.toLowerCase().includes(regionLower);

    const matchesCategory =
      category === "all" || dest.category === category;

    return matchesRegion && matchesCategory;
  });

  if (matched.length === 0) {
    matched = allDestinations.filter((dest) =>
      region === "All India" ? true : dest.state.toLowerCase().includes(region.toLowerCase())
    );
  }
  if (matched.length === 0) {
    matched = allDestinations;
  }

  // 2. Separate into iconic and offbeat gems based on famousRatio
  const iconic = matched.filter((d) => !d.isOffbeat);
  const offbeat = matched.filter((d) => d.isOffbeat);

  let placesPerDay = 2;
  if (pacing === "Relaxed") placesPerDay = 1;
  else if (pacing === "Intensive") placesPerDay = 3;

  const totalPlacesNeeded = Math.max(1, duration * placesPerDay);

  const targetIconic = Math.round(totalPlacesNeeded * (famousRatio / 100));
  const selectedPlaces: Monument[] = [];
  const pickedIds = new Set<string>();

  for (const item of iconic) {
    if (selectedPlaces.length < targetIconic && !pickedIds.has(item.id)) {
      selectedPlaces.push(item);
      pickedIds.add(item.id);
    }
  }

  for (const item of offbeat) {
    if (selectedPlaces.length < totalPlacesNeeded && !pickedIds.has(item.id)) {
      selectedPlaces.push(item);
      pickedIds.add(item.id);
    }
  }

  for (const item of matched) {
    if (selectedPlaces.length < totalPlacesNeeded && !pickedIds.has(item.id)) {
      selectedPlaces.push(item);
      pickedIds.add(item.id);
    }
  }

  let fillIdx = 0;
  while (selectedPlaces.length < totalPlacesNeeded && matched.length > 0) {
    selectedPlaces.push(matched[fillIdx % matched.length]);
    fillIdx++;
  }

  // 3. Dietary meals mapping
  const dietaryLunchMap: Record<string, { title: string; desc: string }> = {
    jain: {
      title: "Verified Jain Satvik Thali Lunch",
      desc: "Freshly prepared dining with zero onion, garlic, or root vegetables in a designated kitchen."
    },
    pureVeg: {
      title: "100% Pure Vegetarian Regional Feast",
      desc: "Authentic local delicacies prepared with seasonal ingredients at a verified pure veg partner."
    },
    halal: {
      title: "Verified Halal Specialty Dining",
      desc: "Authentic regional culinary experience compliant with Halal dietary standards."
    },
    any: {
      title: "Regional Heritage Culinary Experience",
      desc: "Taste signature local dishes and authentic seasonal recipes."
    }
  };

  const selectedLunch = dietaryLunchMap[dietary] || dietaryLunchMap.pureVeg;

  // 4. Distribute into days with calendar date formatting
  const itinerary: ItineraryDay[] = [];
  let placeCounter = 0;

  // Base date object for calendar calculations
  const startDateObj = dates ? new Date(dates) : new Date();

  for (let dayNum = 1; dayNum <= duration; dayNum++) {
    const stops: ItineraryStop[] = [];

    // Formatted date string for Day X
    let dayDateLabel = `Day ${dayNum}`;
    if (!isNaN(startDateObj.getTime())) {
      const currentDayDate = new Date(startDateObj);
      currentDayDate.setDate(startDateObj.getDate() + (dayNum - 1));
      dayDateLabel = currentDayDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    }

    // Morning attraction (09:30 AM)
    const morningPlace = selectedPlaces[placeCounter % selectedPlaces.length];
    placeCounter++;

    if (morningPlace) {
      stops.push({
        id: `day-${dayNum}-stop-1`,
        time: "09:30 AM",
        type: morningPlace.category,
        title: morningPlace.name,
        desc: morningPlace.folklore[language] || morningPlace.folklore.en,
        monumentId: morningPlace.id,
        duration: "2.5 hours",
        lat: morningPlace.coordinates?.lat,
        lng: morningPlace.coordinates?.lng
      });
    }

    // Midday Lunch Stop (01:00 PM)
    stops.push({
      id: `day-${dayNum}-lunch`,
      time: "01:00 PM",
      type: "lunch",
      title: `${selectedLunch.title} (${dayDateLabel})`,
      desc: selectedLunch.desc,
      duration: "1.5 hours",
      lat: morningPlace?.coordinates?.lat ? morningPlace.coordinates.lat - 0.005 : undefined,
      lng: morningPlace?.coordinates?.lng ? morningPlace.coordinates.lng + 0.005 : undefined
    });

    // Afternoon attraction for Moderate/Intensive
    if (placesPerDay >= 2) {
      const afternoonPlace = selectedPlaces[placeCounter % selectedPlaces.length];
      placeCounter++;

      if (afternoonPlace) {
        stops.push({
          id: `day-${dayNum}-stop-2`,
          time: "03:30 PM",
          type: afternoonPlace.category,
          title: afternoonPlace.name,
          desc: afternoonPlace.folklore[language] || afternoonPlace.folklore.en,
          monumentId: afternoonPlace.id,
          duration: "2 hours",
          lat: afternoonPlace.coordinates?.lat,
          lng: afternoonPlace.coordinates?.lng
        });
      }
    }

    // Additional Evening highlight for Intensive pacing
    if (placesPerDay >= 3) {
      const eveningPlace = selectedPlaces[placeCounter % selectedPlaces.length];
      placeCounter++;

      if (eveningPlace) {
        stops.push({
          id: `day-${dayNum}-stop-3`,
          time: "06:00 PM",
          type: eveningPlace.category,
          title: eveningPlace.name,
          desc: eveningPlace.folklore[language] || eveningPlace.folklore.en,
          monumentId: eveningPlace.id,
          duration: "1.5 hours",
          lat: eveningPlace.coordinates?.lat,
          lng: eveningPlace.coordinates?.lng
        });
      }
    }

    // Evening Checkpoint / Homestay wrap
    stops.push({
      id: `day-${dayNum}-hotel`,
      time: "08:00 PM",
      type: "hotel",
      title: `Verified Regional Retreat & Overnight Rest (${dayDateLabel})`,
      desc: `Evening relaxation, dinner, and cultural exchange with local hosts.`,
      duration: "Overnight",
      lat: morningPlace?.coordinates?.lat ? morningPlace.coordinates.lat + 0.003 : undefined,
      lng: morningPlace?.coordinates?.lng ? morningPlace.coordinates.lng + 0.003 : undefined
    });

    itinerary.push({
      day: dayNum,
      date: dayDateLabel,
      stops
    });
  }

  const categoryTitleMap: Record<string, string> = {
    nature: "Nature & Scenic Retreat",
    spiritual: "Sacred Pilgrimage Yatra",
    heritage: "Heritage & Cultural Circuit",
    adventure: "Wilderness & Adventure Trail",
    all: "Custom Grand Experience"
  };

  const titleTheme = categoryTitleMap[category] || "Custom Journey";
  const stats = recalculateTripStats(itinerary);

  return {
    id: `custom-trip-${Date.now()}`,
    title: `${duration}-Day ${region} ${titleTheme}`,
    category: category !== "all" ? category : undefined,
    region,
    duration,
    pacing,
    siteMix: `${famousRatio}% Iconic / ${100 - famousRatio}% Offbeat`,
    stats,
    culturalFilter: {
      category,
      dietary,
      language,
      interests
    },
    itinerary
  };
}
