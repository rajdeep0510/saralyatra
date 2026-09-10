export interface LocalScamWarning {
  id: string;
  title: string;
  location: string;
  alertLevel: "High" | "Moderate" | "Watch";
  category: "Transport" | "Guides & Entry" | "Shopping & Gemstones" | "Temples & Rituals";
  howItWorks: string;
  howToAvoid: string;
  officialFairRate?: string;
}

export interface StateSafetyProfile {
  state: string;
  soloFemaleSafetyRating: number; // e.g. 9.4 out of 10
  safetyTier: "Very Safe (Tier 1)" | "Safe (Tier 2)" | "Moderate (Stay Vigilant)";
  nightTravelIndex: string; // "Well Lit & Safe until 11:30 PM"
  policePresence: string; // "Active 24/7 Tourist Police Patrols"
  emergencyNumbers: {
    nationalEmergency: string;
    touristPolice: string;
    womenHelpline: string;
    ambulance: string;
    highwayPatrol: string;
  };
  keyHospitals: {
    name: string;
    location: string;
    type: "24/7 Multi-Specialty Government" | "NABH Accredited Private";
    phone: string;
  }[];
  scams: LocalScamWarning[];
  safetyTips: string[];
}

export const SAFETY_DATABASE: Record<string, StateSafetyProfile> = {
  kerala: {
    state: "Kerala",
    soloFemaleSafetyRating: 9.6,
    safetyTier: "Very Safe (Tier 1)",
    nightTravelIndex: "Safe in urban/tourist hubs till 11:00 PM; public transit safe",
    policePresence: "Active Kerala Pink Police & Tourism Police at all railway/ferry stations",
    emergencyNumbers: {
      nationalEmergency: "112",
      touristPolice: "0471-2320112",
      womenHelpline: "1091 / 181",
      ambulance: "108",
      highwayPatrol: "1033"
    },
    keyHospitals: [
      { name: "Government General Hospital Ernakulam", location: "Hospital Road, Kochi", type: "24/7 Multi-Specialty Government", phone: "0484-2361251" },
      { name: "Munnar Government Tribal Hospital", location: "Devikulam, Munnar", type: "24/7 Multi-Specialty Government", phone: "04865-264228" },
      { name: "General Hospital Alappuzha", location: "Iron Bridge, Alleppey", type: "24/7 Multi-Specialty Government", phone: "0477-2253324" }
    ],
    scams: [
      {
        id: "ker-scam-1",
        title: "Unlicensed Ayurvedic Spa & Spice Touts",
        location: "Munnar & Fort Kochi",
        alertLevel: "Moderate",
        category: "Shopping & Gemstones",
        howItWorks: "Drivers offer to take you to 'Govt Subsidized Herbal Gardens' where low-grade oils are sold at 10x prices.",
        howToAvoid: "Buy spices and Ayurvedic treatments only from registered DTPC (District Tourism Promotion Council) or Spices Board outlets.",
        officialFairRate: "Authentic spice packets cost ₹80 - ₹250 at Govt Spices Board counters."
      },
      {
        id: "ker-scam-2",
        title: "Unauthorized Shikara & Houseboat Mid-Lake Extra Charges",
        location: "Alleppey Punnamada Jetty",
        alertLevel: "Moderate",
        category: "Transport",
        howItWorks: "Touts at parking lots quote low boat rates, but demand extra for AC or stopping at hidden village fee checkpoints.",
        howToAvoid: "Book directly through DTPC Prepaid Shikara counter or verified homestay hosts with all-inclusive written receipts.",
        officialFairRate: "Prepaid Government Shikara: ₹600 - ₹900/hr (standard 4-person boat)."
      }
    ],
    safetyTips: [
      "Kerala Pink Police patrol teams in pink vehicles are stationed near bus stands, beaches, and tourist spots specifically for women safety.",
      "Use the prepaid auto-rickshaw booths at Kochi South & North Railway stations to avoid tariff disputes.",
      "Government Water Metro in Kochi is safe, air-conditioned, and equipped with CCTV cameras."
    ]
  },

  rajasthan: {
    state: "Rajasthan",
    soloFemaleSafetyRating: 8.9,
    safetyTier: "Safe (Tier 2)",
    nightTravelIndex: "Old City market areas safe till 10:00 PM; use registered cabs after dark",
    policePresence: "Dedicated Rajasthan Tourist Police Squad in khaki and royal blue pagris",
    emergencyNumbers: {
      nationalEmergency: "112",
      touristPolice: "0141-2601728 (Jaipur)",
      womenHelpline: "1090",
      ambulance: "108",
      highwayPatrol: "1033"
    },
    keyHospitals: [
      { name: "SMS Government Medical College & Hospital", location: "JLN Marg, Jaipur", type: "24/7 Multi-Specialty Government", phone: "0141-2560291" },
      { name: "Mahatma Gandhi Hospital Jodhpur", location: "Sojati Gate, Jodhpur", type: "24/7 Multi-Specialty Government", phone: "0291-2434375" },
      { name: "Maharana Bhupal Govt Hospital Udaipur", location: "Court Circle, Udaipur", type: "24/7 Multi-Specialty Government", phone: "0294-2528811" }
    ],
    scams: [
      {
        id: "raj-scam-1",
        title: "Fake Government Lapidary & Gemstone Export Scam",
        location: "Jaipur Johari Bazaar & Amber Road",
        alertLevel: "High",
        category: "Shopping & Gemstones",
        howItWorks: "Friendly locals or auto drivers claim you can carry gemstones duty-free to your home city for resale at 500% profit.",
        howToAvoid: "Never buy gems with promises of postal export or investment resale. All genuine precious stones come with GIA/IGI laboratory certificates.",
        officialFairRate: "Buy handicrafts from Rajasthan Govt 'Rajasthali' emporium."
      },
      {
        id: "raj-scam-2",
        title: "Unauthorized Monument Guides & Spurious Ticket Touts",
        location: "Amber Fort & City Palace",
        alertLevel: "Moderate",
        category: "Guides & Entry",
        howItWorks: "Men in badges claim the main palace ticket counter is closed or queues take 2 hours, offering overpriced 'VIP backdoor entries'.",
        howToAvoid: "Official ASI and Department of Archaeology tickets have QR codes and are sold only at authorized counters or on ASI portals.",
        officialFairRate: "Official ASI Composite Ticket: ₹100 for Indian citizens (covers 8 monuments)."
      }
    ],
    safetyTips: [
      "Rajasthan Tourist Police assist travelers at Amber, Hawa Mahal, and Jaisalmer Fort—approach them for rate arbitration.",
      "In desert camel safaris in Jaisalmer (Sam dunes), verify that drinking water, sunset viewing, and return jeep transit are included upfront.",
      "Prefer app-based cabs (Uber/Ola) or prepaid government airport booths over street hailing late at night."
    ]
  },

  "uttar pradesh": {
    state: "Uttar Pradesh",
    soloFemaleSafetyRating: 8.7,
    safetyTier: "Safe (Tier 2)",
    nightTravelIndex: "Ghats & Temple Corridors safe & bustling with pilgrims till 11:00 PM",
    policePresence: "UP Tourism Police booths at Taj Mahal (Agra) & Kashi Vishwanath Corridor (Varanasi)",
    emergencyNumbers: {
      nationalEmergency: "112",
      touristPolice: "0542-2508077 (Varanasi) / 0562-2421204 (Agra)",
      womenHelpline: "1090",
      ambulance: "108",
      highwayPatrol: "1033"
    },
    keyHospitals: [
      { name: "Sir Sunderlal Hospital (BHU IMS)", location: "BHU Campus, Varanasi", type: "24/7 Multi-Specialty Government", phone: "0542-2369291" },
      { name: "SN Medical College & Hospital", location: "Hospital Road, Agra", type: "24/7 Multi-Specialty Government", phone: "0562-2260353" },
      { name: "KGMU Trauma Centre", location: "Chowk, Lucknow", type: "24/7 Multi-Specialty Government", phone: "0522-2257540" }
    ],
    scams: [
      {
        id: "up-scam-1",
        title: "Varanasi Manikarnika 'Wood Donation' Scam",
        location: "Manikarnika & Harishchandra Ghats, Varanasi",
        alertLevel: "High",
        category: "Temples & Rituals",
        howItWorks: "Self-proclaimed caretakers lead tourists to building rooftops to watch cremation ceremonies and aggressively demand ₹2,000 - ₹5,000 as 'sacred sandalwood charity'.",
        howToAvoid: "Respectful viewing from public ghat walkways or river boats is free. Never hand cash to informal individuals asking for wood donations.",
        officialFairRate: "Free public viewing. Direct donations should only be made at registered temple trusts."
      },
      {
        id: "up-scam-2",
        title: "Agra Marble Inlay & False 'Taj Artisan Family' Workshops",
        location: "Fatehabad Road, Agra",
        alertLevel: "Moderate",
        category: "Shopping & Gemstones",
        howItWorks: "Tourists are brought to marble shops claimed to be run by direct descendants of Taj Mahal architects, selling soapstone dyed as Makrana marble.",
        howToAvoid: "True Makrana marble is translucent under a torch beam; soapstone scratches with a coin. Buy from UP Government 'Gangotri' emporium.",
        officialFairRate: "UP Govt Certified Souvenirs: ₹150 - ₹1,200 with standard billing."
      }
    ],
    safetyTips: [
      "In Varanasi, Government Approved Boatmen wear badges and have fixed rates displayed on DTPC boards along Dashashwamedh Ghat.",
      "The newly developed Kashi Vishwanath Corridor is heavily monitored with 400+ CCTV cameras and dedicated assistance desks.",
      "At the Taj Mahal, entry is through automated barcode turnstiles; no informal individual can skip queues."
    ]
  },

  gujarat: {
    state: "Gujarat",
    soloFemaleSafetyRating: 9.7,
    safetyTier: "Very Safe (Tier 1)",
    nightTravelIndex: "One of the safest states in India; night markets active until 01:00 AM",
    policePresence: "Gujarat Tourist Police & SHE Teams at all pilgrim circuits and heritage stepwells",
    emergencyNumbers: {
      nationalEmergency: "112",
      touristPolice: "079-23250100",
      womenHelpline: "181 (Abhayam Women Helpline)",
      ambulance: "108",
      highwayPatrol: "1033"
    },
    keyHospitals: [
      { name: "Civil Hospital Ahmedabad (Asia's Largest)", location: "Asarwa, Ahmedabad", type: "24/7 Multi-Specialty Government", phone: "079-22680074" },
      { name: "General Hospital Patan (Near Rani ki Vav)", location: "Subhash Chowk, Patan", type: "24/7 Multi-Specialty Government", phone: "02766-220033" },
      { name: "G.K. General Hospital Bhuj (Kutch)", location: "Lotus Colony, Bhuj", type: "24/7 Multi-Specialty Government", phone: "02832-246417" }
    ],
    scams: [
      {
        id: "guj-scam-1",
        title: "Counterfeit Patola Silk & White Rann Permit Intermediaries",
        location: "Patan & Bhirandiyara (Kutch)",
        alertLevel: "Watch",
        category: "Shopping & Gemstones",
        howItWorks: "Machine-printed synthetic sarees are sold as authentic double-ikat GI-tagged Patan Patola costing lakhs.",
        howToAvoid: "Authentic double-ikat Patola is identical on both sides and sold by the Salvi artisan master weavers directly with GI-tag seals.",
        officialFairRate: "Single-ikat starting at ₹3,000; GI master double-ikat from certified heritage weaver looms."
      }
    ],
    safetyTips: [
      "Gujarat 'Abhayam 181' is an award-winning 24/7 dedicated rescue and counselling helpline for women with immediate vehicle dispatch.",
      "White Desert permits can be generated in 2 minutes on the official Gujarat Tourism online portal (no middleman required).",
      "Auto-rickshaws in major cities (Ahmedabad, Vadodara) run reliably on meters."
    ]
  }
};

// Fallback Pan-India Safety Profile
export const DEFAULT_PAN_INDIA_SAFETY: StateSafetyProfile = {
  state: "National Bharat Tourism Directory",
  soloFemaleSafetyRating: 9.1,
  safetyTier: "Safe (Tier 2)",
  nightTravelIndex: "Travel in well-lit areas; use official app taxis after 10:30 PM",
  policePresence: "State Police, GRP (Railway Police) & Tourism Assistance Counters",
  emergencyNumbers: {
    nationalEmergency: "112 (All-in-One Police, Fire, Ambulance)",
    touristPolice: "1363 (Ministry of Tourism Multi-lingual Helpline)",
    womenHelpline: "1090 / 1091 / 181",
    ambulance: "108",
    highwayPatrol: "1033 (NHAI Emergency)"
  },
  keyHospitals: [
    { name: "AIIMS (All India Institute of Medical Sciences)", location: "Capital / Regional Medical Hubs", type: "24/7 Multi-Specialty Government", phone: "011-26588500" },
    { name: "Government District Civil Hospital", location: "District Headquarters", type: "24/7 Multi-Specialty Government", phone: "108 (Direct Ambulance Dispatch)" }
  ],
  scams: [
    {
      id: "pan-scam-1",
      title: "Closed Monument / Fake Ticket Office Diversion",
      location: "Major tourist gateway stations & fort approaches",
      alertLevel: "Moderate",
      category: "Guides & Entry",
      howItWorks: "Drivers tell you that the monument you are visiting is closed for a festival/VIP visit, offering to take you to a shopping emporium instead.",
      howToAvoid: "Check opening hours on official ASI / State Tourism websites. UNESCO monuments in India are open every day except standard closures (e.g. Taj Mahal on Fridays).",
      officialFairRate: "ASI monument entries: ₹25 - ₹100 for Indian nationals, available at official counters."
    },
    {
      id: "pan-scam-2",
      title: "Unmetered Auto & Overpriced Luggage Surcharge",
      location: "Railway stations and interstate bus terminals",
      alertLevel: "Moderate",
      category: "Transport",
      howItWorks: "Drivers refuse to use the meter and quote arbitrary tourist rates 3x higher, adding steep extra baggage fees upon arrival.",
      howToAvoid: "Always board from the Government Prepaid Auto/Taxi Booth situated inside the railway station campus or book via Ola/Uber.",
      officialFairRate: "Standard government auto rates: ₹15-20 per km with prepaid receipt."
    }
  ],
  safetyTips: [
    "Dial 112 from any mobile phone (even without SIM card balance) for immediate GPS-tracked emergency response.",
    "Save the 24/7 Ministry of Tourism Multi-lingual Infoline: 1363 (supports Hindi, English, and 10 foreign languages).",
    "Keep offline digital copies of your passport/Aadhaar and booking vouchers in your Saral Yatra Emergency Pass."
  ]
};

// Helper: Get state safety profile by trip region
export function getStateSafetyProfile(regionName?: string): StateSafetyProfile {
  if (!regionName) return DEFAULT_PAN_INDIA_SAFETY;
  const reg = regionName.toLowerCase();

  for (const [key, profile] of Object.entries(SAFETY_DATABASE)) {
    if (reg.includes(key) || profile.state.toLowerCase().includes(reg)) {
      return profile;
    }
  }

  return {
    ...DEFAULT_PAN_INDIA_SAFETY,
    state: regionName
  };
}
