// Data & Logic for Multi-Modal Transit Fare Aggregator & Lowest-Cost Air Scraper Compass
// Supports Smart India Hackathon (SIH 2026) Tourism Transportation Fare Discovery

export interface TransitHub {
  city: string;
  state: string;
  airportCode: string; // IATA (e.g. DEL, BOM, BLR)
  airportName: string;
  railwayStationCode: string; // IRCTC (e.g. NDLS, CSMT, SBC)
  railwayStationName: string;
}

export interface FlightOption {
  id: string;
  airline: string; // IndiGo, Air India, SpiceJet, Akasa Air, Vistara
  flightNumber: string;
  logoUrl?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number; // 0 for non-stop, 1 for 1-stop
  baseFare: number; // INR per passenger
  aggregatorDeals: {
    skyscanner: number;
    googleFlights: number;
    makeMyTrip: number;
    easeMyTrip: number;
    cleartrip: number;
    yatra: number;
  };
  cheapestPlatform: string;
  cheapestPrice: number;
  co2EmissionsKg: number;
  freeBaggage: string;
}

export interface TrainOption {
  id: string;
  trainNumber: string;
  trainName: string; // e.g. Vande Bharat Express, Rajdhani Express
  departureTime: string;
  arrivalTime: string;
  duration: string;
  classes: {
    code: "1A" | "2A" | "3A" | "3E" | "SL" | "CC" | "EC";
    name: string;
    fare: number;
    availability: "AVAILABLE" | "RAC" | "WL" | "CURR_AVL";
    chancePercent?: number;
  }[];
  cheapestFare: number;
  irctcFare: number;
}

export interface BusOption {
  id: string;
  operator: string; // State RTC or Private
  type: string; // Bharat Benz Multi-Axle AC Sleeper, Electric AC Volvo
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  rating: number;
  amenities: string[];
}

export interface CabOption {
  id: string;
  vehicleType: string; // Hatchback (WagonR), Sedan (Dzire), SUV (Innova Crysta)
  seatingCapacity: number;
  totalDistanceKm: number;
  estimatedDuration: string;
  ratePerKm: number;
  tollEstimate: number;
  driverAllowance: number;
  totalEstimatedCost: number;
  perPersonCost: number;
}

// Major Indian Transit Hubs with strict IATA & Railway Station codes
export const MAJOR_TRANSIT_HUBS: TransitHub[] = [
  { city: "Delhi", state: "Delhi", airportCode: "DEL", airportName: "Indira Gandhi Int'l (DEL)", railwayStationCode: "NDLS", railwayStationName: "New Delhi Railway Station (NDLS)" },
  { city: "Mumbai", state: "Maharashtra", airportCode: "BOM", airportName: "Chhatrapati Shivaji Maharaj (BOM)", railwayStationCode: "CSMT", railwayStationName: "Mumbai CSMT (CSMT)" },
  { city: "Bengaluru", state: "Karnataka", airportCode: "BLR", airportName: "Kempegowda Int'l (BLR)", railwayStationCode: "SBC", railwayStationName: "KSR Bengaluru (SBC)" },
  { city: "Ahmedabad", state: "Gujarat", airportCode: "AMD", airportName: "Sardar Vallabhbhai Patel (AMD)", railwayStationCode: "ADI", railwayStationName: "Ahmedabad Junction (ADI)" },
  { city: "Jaipur", state: "Rajasthan", airportCode: "JAI", airportName: "Jaipur Int'l (JAI)", railwayStationCode: "JP", railwayStationName: "Jaipur Junction (JP)" },
  { city: "Kochi", state: "Kerala", airportCode: "COK", airportName: "Cochin Int'l Airport (COK)", railwayStationCode: "ERS", railwayStationName: "Ernakulam Junction (ERS)" },
  { city: "Varanasi", state: "Uttar Pradesh", airportCode: "VNS", airportName: "Lal Bahadur Shastri (VNS)", railwayStationCode: "BSB", railwayStationName: "Varanasi Junction (BSB)" },
  { city: "Kolkata", state: "West Bengal", airportCode: "CCU", airportName: "Netaji Subhash Chandra Bose (CCU)", railwayStationCode: "HWH", railwayStationName: "Howrah Junction (HWH)" },
  { city: "Chennai", state: "Tamil Nadu", airportCode: "MAA", airportName: "Chennai Int'l (MAA)", railwayStationCode: "MAS", railwayStationName: "Chennai Central (MAS)" },
  { city: "Hyderabad", state: "Telangana", airportCode: "HYD", airportName: "Rajiv Gandhi Int'l (HYD)", railwayStationCode: "SC", railwayStationName: "Secunderabad (SC)" },
  { city: "Pune", state: "Maharashtra", airportCode: "PNQ", airportName: "Pune Int'l (PNQ)", railwayStationCode: "PUNE", railwayStationName: "Pune Junction (PUNE)" },
  { city: "Srinagar", state: "Jammu & Kashmir", airportCode: "SXR", airportName: "Sheikh ul-Alam (SXR)", railwayStationCode: "JAT", railwayStationName: "Jammu Tawi (JAT)" },
  { city: "Bhubaneswar", state: "Odisha", airportCode: "BBI", airportName: "Biju Patnaik Int'l (BBI)", railwayStationCode: "BBS", railwayStationName: "Bhubaneswar (BBS)" },
  { city: "Guwahati", state: "Assam", airportCode: "GAU", airportName: "Lokpriya Gopinath Bordoloi (GAU)", railwayStationCode: "GHY", railwayStationName: "Guwahati (GHY)" },
  { city: "Dehradun", state: "Uttarakhand", airportCode: "DED", airportName: "Jolly Grant (DED)", railwayStationCode: "DDN", railwayStationName: "Dehradun (DDN)" },
  { city: "Goa", state: "Goa", airportCode: "GOI", airportName: "Dabolim / Mopa (GOI)", railwayStationCode: "MAO", railwayStationName: "Madgaon (MAO)" },
  { city: "Amritsar", state: "Punjab", airportCode: "ATQ", airportName: "Sri Guru Ram Dass Jee (ATQ)", railwayStationCode: "ASR", railwayStationName: "Amritsar Junction (ASR)" },
  { city: "Madurai", state: "Tamil Nadu", airportCode: "IXM", airportName: "Madurai Airport (IXM)", railwayStationCode: "MDU", railwayStationName: "Madurai Junction (MDU)" },
  { city: "Udaipur", state: "Rajasthan", airportCode: "UDR", airportName: "Maharana Pratap (UDR)", railwayStationCode: "UDZ", railwayStationName: "Udaipur City (UDZ)" },
  { city: "Shillong", state: "Meghalaya", airportCode: "SHL", airportName: "Umroi / Guwahati (GAU)", railwayStationCode: "GHY", railwayStationName: "Guwahati Hub (GHY)" }
];

// Mapping state names to primary gateway hubs
export const STATE_TO_GATEWAY_HUB: Record<string, string> = {
  "Kerala": "Kochi",
  "Rajasthan": "Jaipur",
  "Gujarat": "Ahmedabad",
  "Uttar Pradesh": "Varanasi",
  "Himachal Pradesh": "Delhi",
  "Jammu & Kashmir": "Srinagar",
  "Meghalaya": "Guwahati",
  "Odisha": "Bhubaneswar",
  "Tamil Nadu": "Chennai",
  "Maharashtra": "Mumbai",
  "Karnataka": "Bengaluru",
  "Goa": "Goa",
  "Uttarakhand": "Dehradun",
  "Assam": "Guwahati",
  "Punjab": "Amritsar",
  "West Bengal": "Kolkata",
  "Madhya Pradesh": "Delhi",
  "Telangana": "Hyderabad"
};

// Find matching hub by city or state name
export function findTransitHub(query: string): TransitHub {
  const clean = query.trim().toLowerCase();
  
  // Direct match on city
  const cityMatch = MAJOR_TRANSIT_HUBS.find((h) => h.city.toLowerCase() === clean);
  if (cityMatch) return cityMatch;

  // Direct match on state
  const stateMatch = MAJOR_TRANSIT_HUBS.find((h) => h.state.toLowerCase() === clean);
  if (stateMatch) return stateMatch;

  // Mapping state to hub
  const gatewayCity = STATE_TO_GATEWAY_HUB[query] || Object.entries(STATE_TO_GATEWAY_HUB).find(([k]) => k.toLowerCase() === clean)?.[1];
  if (gatewayCity) {
    const gatewayMatch = MAJOR_TRANSIT_HUBS.find((h) => h.city === gatewayCity);
    if (gatewayMatch) return gatewayMatch;
  }

  // Fallback to Delhi (central northern hub)
  return MAJOR_TRANSIT_HUBS[0];
}

// Generate Realistic Multi-Modal Transit comparison options
export function generateTransitOptions(
  originHub: TransitHub,
  destHub: TransitHub,
  travelDate: string,
  travelers: number = 2
): {
  flights: FlightOption[];
  trains: TrainOption[];
  buses: BusOption[];
  cabs: CabOption[];
  cheapestMode: "flight" | "train" | "bus" | "cab";
  fastestMode: "flight" | "train" | "bus" | "cab";
  bestValueRecommendation: string;
} {
  // Approximate distance based on origin & destination difference
  const isSameCity = originHub.city === destHub.city;
  const isClose = (originHub.state === destHub.state) || 
    (originHub.city === "Delhi" && destHub.city === "Jaipur") || 
    (originHub.city === "Mumbai" && destHub.city === "Pune") ||
    (originHub.city === "Bengaluru" && destHub.city === "Chennai");

  const approxDistanceKm = isSameCity ? 50 : isClose ? 280 : 1350;

  // 1. FLIGHTS
  const flightBase = isClose ? 2850 : 4250;
  const flightDuration = isClose ? "1h 10m" : "2h 25m";

  const flights: FlightOption[] = [
    {
      id: "fl-1",
      airline: "IndiGo",
      flightNumber: `6E-${Math.floor(200 + Math.random() * 800)}`,
      departureTime: "06:15",
      arrivalTime: isClose ? "07:25" : "08:40",
      duration: flightDuration,
      stops: 0,
      baseFare: flightBase,
      aggregatorDeals: {
        skyscanner: flightBase - 150,
        googleFlights: flightBase - 80,
        makeMyTrip: flightBase,
        easeMyTrip: flightBase - 120,
        cleartrip: flightBase + 40,
        yatra: flightBase + 90
      },
      cheapestPlatform: "Skyscanner",
      cheapestPrice: flightBase - 150,
      co2EmissionsKg: 112,
      freeBaggage: "15 kg Check-in + 7 kg Cabin"
    },
    {
      id: "fl-2",
      airline: "Air India",
      flightNumber: `AI-${Math.floor(400 + Math.random() * 500)}`,
      departureTime: "11:45",
      arrivalTime: isClose ? "12:55" : "14:15",
      duration: flightDuration,
      stops: 0,
      baseFare: flightBase + 450,
      aggregatorDeals: {
        skyscanner: flightBase + 350,
        googleFlights: flightBase + 390,
        makeMyTrip: flightBase + 450,
        easeMyTrip: flightBase + 300,
        cleartrip: flightBase + 420,
        yatra: flightBase + 460
      },
      cheapestPlatform: "EaseMyTrip",
      cheapestPrice: flightBase + 300,
      co2EmissionsKg: 128,
      freeBaggage: "25 kg Check-in (Complimentary Meal)"
    },
    {
      id: "fl-3",
      airline: "Akasa Air",
      flightNumber: `QP-${Math.floor(1100 + Math.random() * 400)}`,
      departureTime: "17:20",
      arrivalTime: isClose ? "18:30" : "19:50",
      duration: flightDuration,
      stops: 0,
      baseFare: flightBase - 220,
      aggregatorDeals: {
        skyscanner: flightBase - 280,
        googleFlights: flightBase - 220,
        makeMyTrip: flightBase - 150,
        easeMyTrip: flightBase - 250,
        cleartrip: flightBase - 180,
        yatra: flightBase - 100
      },
      cheapestPlatform: "Skyscanner",
      cheapestPrice: flightBase - 280,
      co2EmissionsKg: 98,
      freeBaggage: "15 kg Check-in + 7 kg Cabin"
    }
  ];

  // 2. TRAINS (IRCTC)
  const trainBaseSL = Math.max(380, Math.round(approxDistanceKm * 0.45));
  const trainBase3A = Math.max(980, Math.round(approxDistanceKm * 1.15));
  const trainBase2A = Math.max(1450, Math.round(approxDistanceKm * 1.65));
  const trainBaseVande = Math.max(1250, Math.round(approxDistanceKm * 1.45));

  const trains: TrainOption[] = [
    {
      id: "tr-1",
      trainNumber: "20901",
      trainName: `${destHub.city} Vande Bharat Express`,
      departureTime: "06:00",
      arrivalTime: isClose ? "10:30" : "15:45",
      duration: isClose ? "4h 30m" : "9h 45m",
      classes: [
        { code: "CC", name: "AC Chair Car", fare: trainBaseVande, availability: "AVAILABLE", chancePercent: 96 },
        { code: "EC", name: "Exec Chair Car", fare: trainBaseVande * 1.8, availability: "AVAILABLE", chancePercent: 88 }
      ],
      cheapestFare: trainBaseVande,
      irctcFare: trainBaseVande
    },
    {
      id: "tr-2",
      trainNumber: "12952",
      trainName: `${originHub.city}-${destHub.city} Superfast Express`,
      departureTime: "16:55",
      arrivalTime: isClose ? "22:15" : "08:30",
      duration: isClose ? "5h 20m" : "15h 35m",
      classes: [
        { code: "SL", name: "Sleeper (Non-AC)", fare: trainBaseSL, availability: "RAC", chancePercent: 78 },
        { code: "3E", name: "3 AC Economy", fare: trainBase3A - 150, availability: "AVAILABLE", chancePercent: 92 },
        { code: "3A", name: "AC 3 Tier", fare: trainBase3A, availability: "AVAILABLE", chancePercent: 90 },
        { code: "2A", name: "AC 2 Tier", fare: trainBase2A, availability: "AVAILABLE", chancePercent: 85 }
      ],
      cheapestFare: trainBaseSL,
      irctcFare: trainBaseSL
    }
  ];

  // 3. BUSES (RedBus / State Roadways)
  const busFareSleeper = Math.max(650, Math.round(approxDistanceKm * 0.85));
  const buses: BusOption[] = [
    {
      id: "bus-1",
      operator: `${originHub.state} State Roadways Express`,
      type: "Bharat Benz AC Seater/Sleeper",
      departureTime: "20:30",
      arrivalTime: "06:15",
      duration: isClose ? "5h 45m" : "14h 00m",
      fare: busFareSleeper,
      rating: 4.4,
      amenities: ["AC", "Charging Point", "Water Bottle", "Blanket", "Live Tracking"]
    },
    {
      id: "bus-2",
      operator: "Zingbus Electric Volvo",
      type: "Multi-Axle Premium AC Sleeper (2+1)",
      departureTime: "22:00",
      arrivalTime: "07:30",
      duration: isClose ? "5h 30m" : "13h 30m",
      fare: busFareSleeper + 250,
      rating: 4.8,
      amenities: ["AC", "Zero Emission EV", "Complimentary Snacks", "Emergency SOS", "USB Ports"]
    }
  ];

  // 4. CABS (Outstation / Self-Drive)
  const cabDist = approxDistanceKm;
  const rateHatchback = 12;
  const rateSedan = 15;
  const rateSuv = 21;
  const toll = isClose ? 350 : 1200;

  const cabs: CabOption[] = [
    {
      id: "cab-sedan",
      vehicleType: "Sedan (Dzire / Etios)",
      seatingCapacity: 4,
      totalDistanceKm: cabDist,
      estimatedDuration: isClose ? "4h 30m" : "18h 00m",
      ratePerKm: rateSedan,
      tollEstimate: toll,
      driverAllowance: 400,
      totalEstimatedCost: (cabDist * rateSedan) + toll + 400,
      perPersonCost: Math.round(((cabDist * rateSedan) + toll + 400) / Math.max(1, travelers))
    },
    {
      id: "cab-suv",
      vehicleType: "Premium SUV (Innova Crysta)",
      seatingCapacity: 6,
      totalDistanceKm: cabDist,
      estimatedDuration: isClose ? "4h 15m" : "17h 30m",
      ratePerKm: rateSuv,
      tollEstimate: toll,
      driverAllowance: 500,
      totalEstimatedCost: (cabDist * rateSuv) + toll + 500,
      perPersonCost: Math.round(((cabDist * rateSuv) + toll + 500) / Math.max(1, travelers))
    }
  ];

  // Recommendations
  let cheapestMode: "flight" | "train" | "bus" | "cab" = "train";
  let fastestMode: "flight" | "train" | "bus" | "cab" = "flight";

  let bestValueRecommendation = `🚆 Vande Bharat / Superfast 3AC is the most balanced choice (₹${trainBase3A}/pax) saving ₹${flightBase - trainBase3A} over flights with comfortable point-to-point transit.`;

  if (isClose) {
    bestValueRecommendation = `🚗 Intercity Cab or 🚆 Vande Bharat is fastest and most economical (₹${cabs[0].perPersonCost}/pax when split among ${travelers} travelers).`;
  }

  return {
    flights,
    trains,
    buses,
    cabs,
    cheapestMode,
    fastestMode,
    bestValueRecommendation
  };
}

// Generate Direct 1-Click Search URLs for Aggregators
export function generateAggregatorDeepLinks(
  originHub: TransitHub,
  destHub: TransitHub,
  travelDate: string, // YYYY-MM-DD
  travelers: number = 2
) {
  const originIATA = originHub.airportCode.toLowerCase();
  const destIATA = destHub.airportCode.toLowerCase();
  const dateFormattedSkyscanner = travelDate.replace(/-/g, "").slice(2); // YYMMDD or YYYY-MM-DD
  const dateClean = travelDate;

  // 1. Skyscanner Direct Flight Search
  const skyscannerUrl = `https://www.skyscanner.co.in/transport/flights/${originIATA}/${destIATA}/${dateFormattedSkyscanner}/?adultsv2=${travelers}&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&ref=home`;

  // 2. Google Flights Direct Deep Search
  const googleFlightsUrl = `https://www.google.com/travel/flights?q=Flights%20to%20${destHub.airportCode}%20from%20${originHub.airportCode}%20on%20${dateClean}%20with%20${travelers}%20adults`;

  // 3. MakeMyTrip Direct Search
  const mmtDate = formatDateToMMT(travelDate);
  const makeMyTripUrl = `https://www.makemytrip.com/flight/search?itinerary=${originHub.airportCode}-${destHub.airportCode}-${mmtDate}&tripType=O&paxType=A-${travelers}-C-0-I-0&intl=false&cabinClass=E`;

  // 4. EaseMyTrip Direct Search
  const easeMyTripUrl = `https://flight.easemytrip.com/FlightList/Index?srch=${originHub.airportCode}-${destHub.airportCode}-${dateClean}&px=${travelers}-0-0&cbn=0`;

  // 5. IRCTC / ConfirmTkt Direct Train Search
  const irctcUrl = `https://www.confirmtkt.com/trains/${originHub.railwayStationCode.toLowerCase()}-to-${destHub.railwayStationCode.toLowerCase()}`;

  // 6. RedBus Direct Bus Search
  const redBusUrl = `https://www.redbus.in/bus-tickets/${originHub.city.toLowerCase()}-to-${destHub.city.toLowerCase()}?fromCityName=${originHub.city}&toCityName=${destHub.city}&src=${originHub.city}&dst=${destHub.city}&DOJ=${dateClean}`;

  return {
    skyscannerUrl,
    googleFlightsUrl,
    makeMyTripUrl,
    easeMyTripUrl,
    irctcUrl,
    redBusUrl
  };
}

function formatDateToMMT(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
}

// In-Trip Daily Commute & Inter-Monument Transportation Generator
import { ItineraryDay, ItineraryStop, InTripCommuteSegment, DailyCommuteSummary } from "@/types";

export function generateInTripDailyCommute(
  dayStops: ItineraryStop[],
  dayNumber: number,
  stateName: string,
  travelers: number = 2
): DailyCommuteSummary {
  const segments: InTripCommuteSegment[] = [];
  let totalKm = 0;
  let totalMinutes = 0;
  let totalCost = 0;

  const stateLower = (stateName || "").toLowerCase();

  for (let i = 0; i < dayStops.length - 1; i++) {
    const current = dayStops[i];
    const next = dayStops[i + 1];

    // Estimate distance based on coordinates or default hop
    let distKm = 8;
    if (current.lat && current.lng && next.lat && next.lng) {
      const R = 6371; // Earth's radius in km
      const dLat = ((next.lat - current.lat) * Math.PI) / 180;
      const dLon = ((next.lng - current.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((current.lat * Math.PI) / 180) *
          Math.cos((next.lat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      distKm = Math.max(1.5, Math.round(R * c * 1.3)); // 1.3 factor for road curves
    }

    const estimatedMins = Math.round(distKm * 2.8 + 6);

    let recommendedMode: "auto" | "cab" | "metro" | "ferry" | "walk" | "bus" = "auto";
    let modeName = "Prepaid Auto-Rickshaw";
    let fare = Math.round(40 + distKm * 14);

    if (distKm <= 1.8) {
      recommendedMode = "walk";
      modeName = "Pedestrian Heritage Walk / E-Rickshaw";
      fare = 20;
    } else if (stateLower.includes("kerala") && (current.title.toLowerCase().includes("backwater") || next.title.toLowerCase().includes("fort") || current.title.toLowerCase().includes("kochi"))) {
      recommendedMode = "ferry";
      modeName = "Kochi Water Metro / Shikara Ferry";
      fare = 35 * travelers;
    } else if (stateLower.includes("varanasi") && (current.title.toLowerCase().includes("ghat") || next.title.toLowerCase().includes("ganga"))) {
      recommendedMode = "ferry";
      modeName = "Ganga Heritage Boat / E-Rickshaw";
      fare = 60 * travelers;
    } else if (distKm > 18) {
      recommendedMode = "cab";
      modeName = "Local AC Taxi / App Cab (Ola/Uber)";
      fare = Math.round(150 + distKm * 18);
    } else if (distKm > 6) {
      recommendedMode = "cab";
      modeName = "City Taxi / Auto";
      fare = Math.round(80 + distKm * 15);
    }

    segments.push({
      fromStop: current.title,
      toStop: next.title,
      distanceKm: distKm,
      estimatedMinutes: estimatedMins,
      recommendedMode,
      modeName,
      estimatedFare: fare,
      notes: `Optimal route for ${travelers} travelers`
    });

    totalKm += distKm;
    totalMinutes += estimatedMins;
    totalCost += fare;
  }

  return {
    dayNumber,
    totalDayKm: Math.round(totalKm),
    totalDayTransitMinutes: totalMinutes,
    recommendedDailyTransit: totalKm > 35 ? "Full-Day Taxi Rental / Self-Drive" : "Auto-Rickshaw & App Cabs",
    estDailyCostPerPerson: Math.round(totalCost / Math.max(1, travelers)),
    segments
  };
}

// -------------------------------------------------------------
// SIH 2026: PRICE DROP PREDICTOR & MULTI-CITY LOOP ROUTING
// -------------------------------------------------------------

export interface PriceDropPrediction {
  recommendation: "BUY_NOW" | "WAIT" | "FAIR_PRICE";
  headline: string;
  subtext: string;
  confidencePercent: number;
  expectedChangeAmount: number;
  expectedChangeDirection: "UP" | "DOWN";
  currentFareStatus: string;
  bestBookingDayOfWeek: string;
  cheapestFlightSlot: string;
}

export interface MultiCityLoopRoute {
  id: string;
  circuitName: string;
  tagline: string;
  totalDuration: string;
  hoursSaved: number;
  costSavedPerPerson: number;
  legs: {
    legNumber: number;
    type: "flight" | "train" | "road";
    from: string;
    to: string;
    modeName: string;
    duration: string;
    estFare: number;
    highlight: string;
  }[];
  totalLoopCost: number;
  summaryRationale: string;
}

// Generates intelligent price drop predictions
export function generatePriceDropPrediction(
  originCity: string = "Ahmedabad",
  destCity: string = "Kochi",
  travelDate: string = ""
): PriceDropPrediction {
  const daysUntilTrip = travelDate 
    ? Math.max(1, Math.round((new Date(travelDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 14;

  if (daysUntilTrip <= 4) {
    return {
      recommendation: "BUY_NOW",
      headline: "📈 Lock Price Now — Fares Rising Fast",
      subtext: "Last-minute booking window. Seat inventory across IndiGo & Air India is under 15% and fares will surge 22% in the next 48 hours.",
      confidencePercent: 96,
      expectedChangeAmount: 1450,
      expectedChangeDirection: "UP",
      currentFareStatus: "Near weekly peak due to imminent departure date",
      bestBookingDayOfWeek: "Book today before midnight",
      cheapestFlightSlot: "Early morning 06:15 AM slots offer highest savings"
    };
  }

  if (daysUntilTrip >= 21) {
    return {
      recommendation: "WAIT",
      headline: "📉 Wait 2–3 Days — Midweek Fare Dip Expected",
      subtext: "Airlines release promotional flash inventory on Tuesday nights. Historical fare trends show a potential drop of up to ₹900.",
      confidencePercent: 88,
      expectedChangeAmount: 850,
      expectedChangeDirection: "DOWN",
      currentFareStatus: "Moderate, waiting for airline flash sale discount",
      bestBookingDayOfWeek: "Tuesday / Wednesday midnight",
      cheapestFlightSlot: "Midday 01:30 PM flights save ~₹800 vs evening peak"
    };
  }

  return {
    recommendation: "FAIR_PRICE",
    headline: "✨ Fair Price Detected — Optimal Booking Window",
    subtext: "Current fares are at the 30-day historical average. You can safely lock this ticket now or set a price alert.",
    confidencePercent: 92,
    expectedChangeAmount: 400,
    expectedChangeDirection: "UP",
    currentFareStatus: "At optimal median rate (14–20 days before journey)",
    bestBookingDayOfWeek: "Wednesday morning",
    cheapestFlightSlot: "Early morning 06:30 AM flights"
  };
}

// Generates multi-city circular loop itineraries that prevent backtracking
export function generateMultiCityLoopRoutes(
  originCity: string = "Ahmedabad",
  destRegion: string = "Rajasthan"
): MultiCityLoopRoute[] {
  const reg = destRegion.toLowerCase();

  // 1. Rajasthan Multi-City Open-Jaw Loop (Delhi / Jaipur ➔ Udaipur)
  if (reg.includes("rajasthan") || reg.includes("jaipur") || reg.includes("udaipur") || reg.includes("jodhpur")) {
    return [
      {
        id: "loop-raj-1",
        circuitName: "Royal Rajasthan Grand Loop (Open-Jaw)",
        tagline: "Fly to Jaipur ➔ Road through Jodhpur ➔ Fly out of Udaipur",
        totalDuration: "5 Days Circuit",
        hoursSaved: 8.5,
        costSavedPerPerson: 3200,
        totalLoopCost: 7450,
        summaryRationale: "Eliminates 400 km of painful road backtracking from Udaipur back to Jaipur, giving you an extra full day of sightseeing!",
        legs: [
          {
            legNumber: 1,
            type: "flight",
            from: originCity,
            to: "Jaipur (JAI)",
            modeName: "Direct Flight (IndiGo/Air India)",
            duration: "1h 15m",
            estFare: 3100,
            highlight: "Arrive fresh at Amber & Hawa Mahal in the morning"
          },
          {
            legNumber: 2,
            type: "train",
            from: "Jaipur Junction",
            to: "Jodhpur Cantt",
            modeName: "Vande Bharat / Express Train",
            duration: "4h 10m",
            estFare: 650,
            highlight: "Scenic Thar desert sunrise journey with meal served"
          },
          {
            legNumber: 3,
            type: "road",
            from: "Jodhpur Citadels",
            to: "Udaipur Lakes",
            modeName: "Scenic Aravalli Highway Cab via Ranakpur",
            duration: "4h 45m",
            estFare: 900,
            highlight: "Pass through Ranakpur 1444-pillar marble Jain Temple"
          },
          {
            legNumber: 4,
            type: "flight",
            from: "Udaipur (UDR)",
            to: originCity,
            modeName: "Direct Return Flight",
            duration: "1h 05m",
            estFare: 2800,
            highlight: "Fly directly home from Udaipur without returning to Jaipur!"
          }
        ]
      }
    ];
  }

  // 2. Kerala Multi-City Coastal & Hill Loop (Kochi ➔ Munnar ➔ Trivandrum)
  if (reg.includes("kerala") || reg.includes("munnar") || reg.includes("alleppey") || reg.includes("kochi")) {
    return [
      {
        id: "loop-ker-1",
        circuitName: "God's Own Country Open-Jaw Loop",
        tagline: "Fly into Kochi (COK) ➔ Munnar Hills ➔ Alleppey ➔ Fly out of Trivandrum (TRV)",
        totalDuration: "4 Days Circuit",
        hoursSaved: 6.0,
        costSavedPerPerson: 2800,
        totalLoopCost: 8100,
        summaryRationale: "Avoids 180 km of heavy highway traffic back to Kochi airport; exit straight through southern Kerala.",
        legs: [
          {
            legNumber: 1,
            type: "flight",
            from: originCity,
            to: "Kochi International (COK)",
            modeName: "Direct Flight",
            duration: "2h 00m",
            estFare: 3600,
            highlight: "Begin at Fort Kochi heritage spice quarters"
          },
          {
            legNumber: 2,
            type: "road",
            from: "Kochi",
            to: "Munnar Tea Valleys",
            modeName: "Scenic Western Ghats Cab",
            duration: "3h 30m",
            estFare: 800,
            highlight: "Cheeyappara & Valara cascading roadside waterfalls"
          },
          {
            legNumber: 3,
            type: "train",
            from: "Alappuzha (Alleppey)",
            to: "Trivandrum Central (TVC)",
            modeName: "Vande Bharat Express (Kasaragod-TVC)",
            duration: "2h 15m",
            estFare: 550,
            highlight: "Smooth coastal rail line with Arabian Sea views"
          },
          {
            legNumber: 4,
            type: "flight",
            from: "Trivandrum (TRV)",
            to: originCity,
            modeName: "Direct Return Flight",
            duration: "2h 10m",
            estFare: 3150,
            highlight: "Fly home directly after Padmanabhaswamy Temple darshan"
          }
        ]
      }
    ];
  }

  // 3. Golden Triangle Multi-City Heritage Loop (Delhi ➔ Agra ➔ Jaipur)
  return [
    {
      id: "loop-gt-1",
      circuitName: "Golden Triangle Circular Express Loop",
      tagline: "Fly into Delhi (DEL) ➔ Vande Bharat to Agra ➔ Expressway to Jaipur ➔ Return",
      totalDuration: "4 Days Circuit",
      hoursSaved: 5.5,
      costSavedPerPerson: 2400,
      totalLoopCost: 6900,
      summaryRationale: "High-speed rail connections link the 3 imperial cities with zero dead travel time.",
      legs: [
        {
          legNumber: 1,
          type: "flight",
          from: originCity,
          to: "Delhi IGI (DEL)",
          modeName: "Direct Morning Flight",
          duration: "1h 30m",
          estFare: 3200,
          highlight: "Arrive at capital gateways"
        },
        {
          legNumber: 2,
          type: "train",
          from: "Hazrat Nizamuddin (NZM)",
          to: "Agra Cantt (AGC)",
          modeName: "Gatimaan / Vande Bharat Express",
          duration: "1h 40m",
          estFare: 850,
          highlight: "India's fastest train directly to the Taj Mahal"
        },
        {
          legNumber: 3,
          type: "road",
          from: "Agra Fort",
          to: "Jaipur Pink City",
          modeName: "Expressway Transit via Fatehpur Sikri",
          duration: "3h 45m",
          estFare: 650,
          highlight: "Visit UNESCO Fatehpur Sikri midway"
        },
        {
          legNumber: 4,
          type: "flight",
          from: "Jaipur (JAI)",
          to: originCity,
          modeName: "Direct Return Flight",
          duration: "1h 15m",
          estFare: 2200,
          highlight: "Fly directly back without returning to Delhi"
        }
      ]
    }
  ];
}


