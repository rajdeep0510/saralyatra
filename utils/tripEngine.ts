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
 * Calculates straight-line distance in km between two monuments.
 */
export function getMonumentDistance(m1: Monument, m2: Monument): number {
  if (m1.coordinates && m2.coordinates) {
    return getDistanceKm(m1.coordinates.lat, m1.coordinates.lng, m2.coordinates.lat, m2.coordinates.lng);
  }
  return m1.state.toLowerCase() === m2.state.toLowerCase() ? 30 : 250;
}

/**
 * Optimizes a list of monuments into a continuous, non-backtracking travel corridor
 * using Greedy Nearest-Neighbor and 2-Opt local search refinement.
 * This guarantees that nearby places in the same city/district are visited together,
 * and travel between days progresses sequentially along the shortest geographic path.
 */
export function optimizeRouteCorridor(places: Monument[]): Monument[] {
  if (places.length <= 2) return [...places];

  const unvisited = [...places];

  // Start with the most prominent / iconic anchor attraction, or the first item
  const startIdx = unvisited.findIndex((p) => !p.isOffbeat);
  const startPlace = startIdx >= 0 ? unvisited.splice(startIdx, 1)[0] : unvisited.shift()!;

  const orderedRoute: Monument[] = [startPlace];
  let current = startPlace;

  // Step 1: Nearest-Neighbor sequential chaining
  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = getMonumentDistance(current, unvisited[i]);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = i;
      }
    }

    const nextPlace = unvisited.splice(nearestIdx, 1)[0];
    orderedRoute.push(nextPlace);
    current = nextPlace;
  }

  // Step 2: 2-Opt refinement to eliminate any route twists or backtracking
  const calculateTotalDist = (route: Monument[]): number => {
    let sum = 0;
    for (let i = 0; i < route.length - 1; i++) {
      sum += getMonumentDistance(route[i], route[i + 1]);
    }
    return sum;
  };

  let best = [...orderedRoute];
  let improved = true;
  let iterations = 0;

  while (improved && iterations < 50) {
    improved = false;
    iterations++;
    for (let i = 1; i < best.length - 1; i++) {
      for (let k = i + 1; k < best.length; k++) {
        const candidate = [
          ...best.slice(0, i),
          ...best.slice(i, k + 1).reverse(),
          ...best.slice(k + 1)
        ];
        if (calculateTotalDist(candidate) < calculateTotalDist(best)) {
          best = candidate;
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  return best;
}

/**
 * Dynamically synthesizes a customized multi-day trip itinerary
 * from a pool of 100+ destinations based on user preferences and calendar start dates.
 * Places are grouped by geographic proximity so that nearby attractions are visited on the same day
 * and the journey progresses linearly along an efficient geographic corridor without backtracking.
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

  // 2. Separate into iconic and offbeat gems and build a strictly unique pool
  const iconic = matched.filter((d) => !d.isOffbeat);
  const offbeat = matched.filter((d) => d.isOffbeat);

  const rawCandidatePool: Monument[] = [];
  const addedIds = new Set<string>();

  for (const item of iconic) {
    if (!addedIds.has(item.id)) {
      rawCandidatePool.push(item);
      addedIds.add(item.id);
    }
  }
  for (const item of offbeat) {
    if (!addedIds.has(item.id)) {
      rawCandidatePool.push(item);
      addedIds.add(item.id);
    }
  }
  for (const item of matched) {
    if (!addedIds.has(item.id)) {
      rawCandidatePool.push(item);
      addedIds.add(item.id);
    }
  }

  // 3. Optimize the entire selected pool into a non-backtracking geographic corridor
  const optimizedCorridor = optimizeRouteCorridor(rawCandidatePool);

  // Calculate actual realistic days: each day requires at least 1 unique primary destination
  const maxPossibleDays = region === "All India"
    ? duration
    : Math.max(1, Math.min(duration, optimizedCorridor.length > 0 ? Math.min(duration, optimizedCorridor.length) : duration));

  const actualDaysCount = Math.max(1, Math.min(duration, maxPossibleDays));

  let placesPerDay = 2;
  if (pacing === "Relaxed") placesPerDay = 1;
  else if (pacing === "Intensive") placesPerDay = 3;

  // If unique places pool is limited, adjust placesPerDay so each place gets adequate time
  if (optimizedCorridor.length <= actualDaysCount) {
    placesPerDay = 1;
  }

  // 4. Dietary meals mapping
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

  // Curated supplemental regional cultural activities for afternoons when places are limited
  const supplementalActivities = [
    {
      title: "Traditional Crafts & Artisan Bazaar Heritage Walk",
      desc: "Explore local handlooms, pottery, brassware, and regional spice markets with local artisans.",
      duration: "1.5 hours",
      type: "heritage" as const
    },
    {
      title: "Sunset Viewpoint & Landscape Photography Session",
      desc: "Scenic panorama vantage point capturing golden hour over historic skyline and landscapes.",
      duration: "1.5 hours",
      type: "nature" as const
    },
    {
      title: "Evening Cultural Folk Music & Tea Tasting Trail",
      desc: "Sample regional spiced teas, local sweets, and experience traditional instrumental performances.",
      duration: "1.5 hours",
      type: "heritage" as const
    },
    {
      title: "Sacred Riverbank / Temple Lamp Offering (Deepotsav)",
      desc: "Peaceful evening spiritual chants and floating lamp ritual along holy waters.",
      duration: "1.5 hours",
      type: "spiritual" as const
    }
  ];

  // 5. Distribute geographically clustered attractions across sequential days
  const itinerary: ItineraryDay[] = [];
  let placeIdx = 0;

  // Base date object for calendar calculations
  const startDateObj = dates ? new Date(dates) : new Date();

  for (let dayNum = 1; dayNum <= actualDaysCount; dayNum++) {
    const stops: ItineraryStop[] = [];

    // Formatted date string for Day X
    let dayDateLabel = `Day ${dayNum}`;
    if (!isNaN(startDateObj.getTime())) {
      const currentDayDate = new Date(startDateObj);
      currentDayDate.setDate(startDateObj.getDate() + (dayNum - 1));
      dayDateLabel = currentDayDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    }

    // Morning primary attraction from current corridor cluster (09:30 AM)
    const morningPlace = optimizedCorridor[placeIdx % optimizedCorridor.length];
    placeIdx++;

    if (morningPlace) {
      stops.push({
        id: `day-${dayNum}-stop-1`,
        time: "09:30 AM",
        type: morningPlace.category,
        title: morningPlace.name,
        desc: morningPlace.folklore[language] || morningPlace.folklore.en || `Explore ${morningPlace.name}.`,
        monumentId: morningPlace.id,
        duration: "2.5 hours",
        lat: morningPlace.coordinates?.lat,
        lng: morningPlace.coordinates?.lng
      });
    }

    // Midday Lunch Stop (01:00 PM) - Placed in the immediate local vicinity of morning stop
    stops.push({
      id: `day-${dayNum}-lunch`,
      time: "01:00 PM",
      type: "lunch",
      title: `${selectedLunch.title} (${morningPlace?.name ? morningPlace.name.split(" ")[0] : region})`,
      desc: selectedLunch.desc,
      duration: "1.5 hours",
      lat: morningPlace?.coordinates?.lat ? morningPlace.coordinates.lat - 0.003 : undefined,
      lng: morningPlace?.coordinates?.lng ? morningPlace.coordinates.lng + 0.003 : undefined
    });

    // Afternoon attraction (03:30 PM) - Takes the next nearby stop in the same cluster along the corridor
    let lastVisitedPlace = morningPlace;
    if (placesPerDay >= 2 && placeIdx < optimizedCorridor.length) {
      const afternoonPlace = optimizedCorridor[placeIdx];
      placeIdx++;
      lastVisitedPlace = afternoonPlace;

      stops.push({
        id: `day-${dayNum}-stop-2`,
        time: "03:30 PM",
        type: afternoonPlace.category,
        title: afternoonPlace.name,
        desc: afternoonPlace.folklore[language] || afternoonPlace.folklore.en || `Visit ${afternoonPlace.name}.`,
        monumentId: afternoonPlace.id,
        duration: "2 hours",
        lat: afternoonPlace.coordinates?.lat,
        lng: afternoonPlace.coordinates?.lng
      });
    } else if (placesPerDay >= 2 || optimizedCorridor.length <= actualDaysCount) {
      // Add a unique local cultural activity within this day's cluster
      const activity = supplementalActivities[(dayNum - 1) % supplementalActivities.length];
      stops.push({
        id: `day-${dayNum}-activity`,
        time: "03:30 PM",
        type: activity.type,
        title: `${activity.title} (${morningPlace?.name ? morningPlace.name.split(" ")[0] : region})`,
        desc: activity.desc,
        duration: activity.duration,
        lat: morningPlace?.coordinates?.lat ? morningPlace.coordinates.lat + 0.003 : undefined,
        lng: morningPlace?.coordinates?.lng ? morningPlace.coordinates.lng - 0.003 : undefined
      });
    }

    // Additional Evening highlight for Intensive pacing (06:00 PM)
    if (placesPerDay >= 3 && placeIdx < optimizedCorridor.length) {
      const eveningPlace = optimizedCorridor[placeIdx];
      placeIdx++;
      lastVisitedPlace = eveningPlace;

      stops.push({
        id: `day-${dayNum}-stop-3`,
        time: "06:00 PM",
        type: eveningPlace.category,
        title: eveningPlace.name,
        desc: eveningPlace.folklore[language] || eveningPlace.folklore.en || `Explore ${eveningPlace.name}.`,
        monumentId: eveningPlace.id,
        duration: "1.5 hours",
        lat: eveningPlace.coordinates?.lat,
        lng: eveningPlace.coordinates?.lng
      });
    }

    // Evening Overnight Rest / Homestay (08:00 PM) - Placed directly at the day's final destination hub
    stops.push({
      id: `day-${dayNum}-hotel`,
      time: "08:00 PM",
      type: "hotel",
      title: `Verified Regional Retreat & Overnight Rest (${lastVisitedPlace?.name ? lastVisitedPlace.name.split(" ")[0] : region})`,
      desc: `Evening relaxation, local dining, and comfortable overnight stay close to tomorrow's journey route.`,
      duration: "Overnight",
      lat: lastVisitedPlace?.coordinates?.lat ? lastVisitedPlace.coordinates.lat + 0.002 : undefined,
      lng: lastVisitedPlace?.coordinates?.lng ? lastVisitedPlace.coordinates.lng + 0.002 : undefined
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
      interests,
      departureCity: prefs.departureCity || "Ahmedabad"
    },
    itinerary
  };
}
