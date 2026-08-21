import { Monument, Homestay, PreloadedTrip, Translations } from "../types";

export interface StateInfo {
  id: string;
  name: string;
  zone: "North" | "South" | "West" | "East" | "Central" | "North-East";
  popularAttractions: string[];
}

export const indianStates: StateInfo[] = [
  // NORTH
  { id: "Himachal Pradesh", name: "Himachal Pradesh", zone: "North", popularAttractions: ["Manali", "Spiti", "Shimla", "Dharamshala"] },
  { id: "Uttarakhand", name: "Uttarakhand", zone: "North", popularAttractions: ["Rishikesh", "Kedarnath", "Valley of Flowers", "Nainital"] },
  { id: "Ladakh", name: "Ladakh", zone: "North", popularAttractions: ["Pangong Tso", "Nubra Valley", "Thiksey Monastery"] },
  { id: "Jammu & Kashmir", name: "Jammu & Kashmir", zone: "North", popularAttractions: ["Gulmarg", "Pahalgam", "Dal Lake", "Vaishno Devi"] },
  { id: "Punjab", name: "Punjab", zone: "North", popularAttractions: ["Golden Temple", "Wagah Border"] },
  { id: "Delhi", name: "Delhi", zone: "North", popularAttractions: ["Qutub Minar", "Red Fort", "Humayun's Tomb"] },
  
  // SOUTH
  { id: "Kerala", name: "Kerala", zone: "South", popularAttractions: ["Munnar", "Alleppey", "Wayanad", "Varkala"] },
  { id: "Karnataka", name: "Karnataka", zone: "South", popularAttractions: ["Hampi", "Coorg", "Mysore", "Gokarna", "Chikmagalur"] },
  { id: "Tamil Nadu", name: "Tamil Nadu", zone: "South", popularAttractions: ["Madurai", "Rameswaram", "Ooty", "Mahabalipuram", "Kanyakumari"] },
  { id: "Andhra Pradesh", name: "Andhra Pradesh", zone: "South", popularAttractions: ["Tirupati", "Araku Valley", "Gandikota"] },
  { id: "Telangana", name: "Telangana", zone: "South", popularAttractions: ["Hyderabad", "Warangal"] },

  // WEST
  { id: "Rajasthan", name: "Rajasthan", zone: "West", popularAttractions: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar"] },
  { id: "Gujarat", name: "Gujarat", zone: "West", popularAttractions: ["Rann of Kutch", "Rani ki Vav", "Gir National Park", "Somnath", "Dwarka"] },
  { id: "Maharashtra", name: "Maharashtra", zone: "West", popularAttractions: ["Ajanta & Ellora", "Mahabaleshwar", "Lonavala", "Tadoba"] },
  { id: "Goa", name: "Goa", zone: "West", popularAttractions: ["Dudhsagar Falls", "Old Goa Churches", "Palolem Beach"] },

  // CENTRAL
  { id: "Madhya Pradesh", name: "Madhya Pradesh", zone: "Central", popularAttractions: ["Khajuraho", "Kanha & Bandhavgarh", "Ujjain", "Bhimbetka"] },
  { id: "Uttar Pradesh", name: "Uttar Pradesh", zone: "Central", popularAttractions: ["Varanasi", "Taj Mahal Agra", "Ayodhya", "Sarnath", "Vrindavan"] },
  { id: "Chhattisgarh", name: "Chhattisgarh", zone: "Central", popularAttractions: ["Chitrakote Falls", "Bastar"] },

  // EAST
  { id: "Odisha", name: "Odisha", zone: "East", popularAttractions: ["Puri Jagannath", "Konark Sun Temple", "Chilika Lake"] },
  { id: "West Bengal", name: "West Bengal", zone: "East", popularAttractions: ["Darjeeling", "Sundarbans", "Kolkata Heritage"] },
  { id: "Bihar", name: "Bihar", zone: "East", popularAttractions: ["Bodh Gaya", "Nalanda"] },
  { id: "Sikkim", name: "Sikkim", zone: "East", popularAttractions: ["Gangtok", "Gurudongmar Lake", "Pelling"] },

  // NORTH-EAST
  { id: "Meghalaya", name: "Meghalaya", zone: "North-East", popularAttractions: ["Living Root Bridges", "Cherrapunji", "Dawki River"] },
  { id: "Assam", name: "Assam", zone: "North-East", popularAttractions: ["Kaziranga National Park", "Majuli Island"] },
  { id: "Arunachal Pradesh", name: "Arunachal Pradesh", zone: "North-East", popularAttractions: ["Tawang Monastery", "Ziro Valley"] }
];

export const translations: Translations = {
  en: {
    brand: "Saral Yatra",
    tagline: "Universal AI Trip Planner for India",
    searchPlaceholder: "Search 100+ destinations across all states...",
    exploreTab: "Wonders & Stories",
    plannerTab: "AI Trip Planner",
    itineraryTab: "Itinerary & Live Map",
    homestaysTab: "Cultural & Nature Stays",
    listenStory: "Listen to Story",
    stopNarration: "Stop Narration",
    virtualTour: "360° Virtual Tour",
    hiddenGem: "Hidden Gem",
    famousGem: "Iconic Attraction",
    culturalMatch: "Compatibility Match",
    hostDialect: "Host Dialect",
    dietarySafety: "Dietary Readiness",
    bookNow: "Reserve Stay",
    exploreTitle: "Discover India's Wonders",
    exploreSub: "Explore majestic nature, sacred shrines, ancient heritage, and regional lore in your preferred dialect.",
    plannerTitle: "Universal AI Trip Planner",
    plannerSub: "Generate customized journeys for any Indian state with custom duration, pacing, and dietary profiling.",
    homestaysTitle: "Verified Regional & Nature Stays",
    homestaysSub: "Stay with verified hosts matching your dietary traditions, native dialects, and environmental preferences.",
    viewDetails: "View Details",
    era: "Era / Highlight",
    state: "State",
    languages: "Languages",
    readStory: "Read Lore & Highlights",
    close: "Close",
    days: "Days",
    totalDistance: "Total Distance",
    travelTime: "Travel Time",
    monuments: "Attractions",
    startWizard: "Start AI Wizard",
    previous: "Previous",
    next: "Next",
    generate: "Generate Custom Itinerary",
    rebuild: "Rebuild Itinerary",
    activeTrip: "Active Itinerary"
  },
  hi: {
    brand: "सरल यात्रा",
    tagline: "भारत का संपूर्ण एआई ट्रिप प्लानर",
    searchPlaceholder: "सभी राज्यों के 100+ स्थल खोजें...",
    exploreTab: "स्थल और कहानियाँ",
    plannerTab: "एआई ट्रिप प्लानर",
    itineraryTab: "यात्रा मार्ग और मानचित्र",
    homestaysTab: "प्रामाणिक होमस्टे",
    listenStory: "कहानियाँ सुनें",
    stopNarration: "वाचन बंद करें",
    virtualTour: "360° वर्चुअल टूर",
    hiddenGem: "छिपा हुआ खजाना",
    famousGem: "प्रमुख आकर्षण",
    culturalMatch: "अनुकूलता मिलान",
    hostDialect: "मेजबान की भाषा",
    dietarySafety: "भोजन की तैयारी",
    bookNow: "आरक्षित करें",
    exploreTitle: "भारत के अद्भुत स्थलों की खोज करें",
    exploreSub: "अपनी पसंदीदा भाषा में प्रकृति, तीर्थ, धरोहर और लोककथाओं का अनुभव करें।",
    plannerTitle: "यूनिवर्सल एआई ट्रिप प्लानर",
    plannerSub: "किसी भी राज्य के लिए अनुकूलित यात्रा तैयार करें।",
    homestaysTitle: "सत्यापित होमस्टे और फार्मस्टे",
    homestaysSub: "अपनी भाषा और भोजन परंपराओं से मेल खाने वाले सत्यापित मेजबानों के साथ ठहरें।",
    viewDetails: "विवरण देखें",
    era: "विशेषता",
    state: "राज्य",
    languages: "भाषाएँ",
    readStory: "विवरण और इतिहास पढ़ें",
    close: "बंद करें",
    days: "दिन",
    totalDistance: "कुल दूरी",
    travelTime: "यात्रा समय",
    monuments: "आकर्षण",
    startWizard: "एआई विज़ार्ड शुरू करें",
    previous: "पिछला",
    next: "अगला",
    generate: "यात्रा तैयार करें",
    rebuild: "मार्ग फिर से बनाएं",
    activeTrip: "सक्रिय यात्रा"
  },
  gu: {
    brand: "સરળ યાત્રા",
    tagline: "ભારત માટે સર્વગ્રાહી સ્માર્ટ ટ્રિપ પ્લાનર",
    searchPlaceholder: "ભારતના તમામ રાજ્યોના સ્થળો શોધો...",
    exploreTab: "અદ્ભુત સ્થળો અને વાર્તાઓ",
    plannerTab: "એઆઈ ટ્રિપ પ્લાનર",
    itineraryTab: "પ્રવાસ માર્ગ અને નકશો",
    homestaysTab: "સાંસ્કૃતિક હોમસ્ટે",
    listenStory: "વાર્તા સાંભળો",
    stopNarration: "વાંચન બંધ કરો",
    virtualTour: "360° વર્ચ્યુઅલ ટૂર",
    hiddenGem: "છુપાયેલું રત્ન",
    famousGem: "ખ્યાતનામ સ્થળ",
    culturalMatch: "મેળ ટકાવારી",
    hostDialect: "યજમાનની બોલી",
    dietarySafety: "ભોજન સુવિધા",
    bookNow: "હોમસ્ટે બુક કરો",
    exploreTitle: "ભારતના વૈવિધ્યસભર સ્થળો જાણો",
    exploreSub: "કુદરતી સૌંદર્ય, તીર્થસ્થાનો અને ઐતિહાસિક વારસાની માહિતી તમારી ભાષામાં મેળવો.",
    plannerTitle: "યૂનિવર્સલ એઆઈ પ્લાનર",
    plannerSub: "કોઈપણ રાજ્ય માટે કસ્ટમ પ્રવાસ પ્લાન કરો.",
    homestaysTitle: "પ્રમાણિત પ્રાદેશિક હોમસ્ટે",
    homestaysSub: "તમારી ભોજન પરંપરા અને ભાષા અનુસાર અનુકૂળ યજમાનો સાથે રહો.",
    viewDetails: "વિગત જુઓ",
    era: "વિશેષતા",
    state: "રાજ્ય",
    languages: "ભાષાઓ",
    readStory: "માહિતી અને વાર્તા વાંચો",
    close: "બંધ કરો",
    days: "દિવસો",
    totalDistance: "કુલ અંતર",
    travelTime: "મુસાફરી સમય",
    monuments: "સ્થળો",
    startWizard: "એઆઈ વિઝાર્ડ શરૂ કરો",
    previous: "પાછળ",
    next: "આગળ",
    generate: "યાત્રા બનાવો",
    rebuild: "ફરી ગણતરી કરો",
    activeTrip: "સક્રિય પ્રવાસ"
  },
  ta: {
    brand: "சரல் யாத்ரா",
    tagline: "இந்தியாவிற்கான பல்துறை ஸ்மார்ட் பயண திட்டமிடுபவர்",
    searchPlaceholder: "அனைத்து மாநிலங்களின் இடங்களையும் தேடுங்கள்...",
    exploreTab: "இடங்கள் & கதைகள்",
    plannerTab: "ஏஐ பயணத் திட்டம்",
    itineraryTab: "பயணத் திட்டம் & வரைபடம்",
    homestaysTab: "ஹோம்ஸ்டேக்கள்",
    listenStory: "கதை கேளுங்கள்",
    stopNarration: "வாசிப்பை நிறுத்து",
    virtualTour: "360° மெய்நிகர் பயணம்",
    hiddenGem: "மறைக்கப்பட்ட ரத்தினம்",
    famousGem: "பிரபலமான இடம்",
    culturalMatch: "பொருத்த சதவீதம்",
    hostDialect: "புரவலர் மொழி",
    dietarySafety: "உணவுத் தயார்நிலை",
    bookNow: "முன்பதிவு செய்",
    exploreTitle: "இந்தியாவின் அதிசயங்களைக் கண்டறியுங்கள்",
    exploreSub: "இயற்கை வனப்பு, ஆன்மீக தலங்கள், வரலாற்று எச்சங்களை உங்கள் மொழியில் அனுபவியுங்கள்.",
    plannerTitle: "ஏஐ பயணத் திட்டமிடுபவர்",
    plannerSub: "எந்தவொரு மாநிலத்திற்கும் தனிப்பயனாக்கப்பட்ட பயணத்தை உருவாக்குங்கள்.",
    homestaysTitle: "உண்மையான ஹோம்ஸ்டேக்கள்",
    homestaysSub: "உங்கள் மொழி, உணவுப் பழக்கத்திற்கு ஏற்ற புரவலர்களுடன் தங்குங்கள்.",
    viewDetails: "விவரங்களைக் காண்க",
    era: "சிறப்பம்சம்",
    state: "மாநிலம்",
    languages: "மொழிகள்",
    readStory: "விவரங்கள் படிக்க",
    close: "மூடு",
    days: "நாட்கள்",
    totalDistance: "மொத்த தூரம்",
    travelTime: "பயண நேரம்",
    monuments: "இடங்கள்",
    startWizard: "ஏஐ வழிகாட்டியைத் தொடங்கு",
    previous: "முந்தைய",
    next: "அடுத்தது",
    generate: "பயணத்தை உருவாக்கு",
    rebuild: "மீண்டும் உருவாக்கு",
    activeTrip: "செயலில் உள்ள பயணம்"
  },
  mr: {
    brand: "सरल यात्रा",
    tagline: "भारतासाठी स्मार्ट प्रवास आणि पर्यटन नियोजक",
    searchPlaceholder: "सर्व राज्यांमधील १००+ ठिकाणे शोधा...",
    exploreTab: "अद्भूत ठिकाणे आणि कथा",
    plannerTab: "एआय ट्रिप प्लॅनर",
    itineraryTab: "प्रवास योजना आणि नकाशा",
    homestaysTab: "प्रादेशिक होमस्टे",
    listenStory: "कथा ऐका",
    stopNarration: "थांबवा",
    virtualTour: "३६०° व्हर्च्युअल टूर",
    hiddenGem: "अप्रतिम गुप्त ठिकाण",
    famousGem: "प्रसिद्ध आकर्षण",
    culturalMatch: "सुसंगतता प्रमाण",
    hostDialect: "स्थानिक भाषा",
    dietarySafety: "आहार खात्री",
    bookNow: "होमस्टे बुक करा",
    exploreTitle: "भारतातील आश्चर्यकारक ठिकाणे शोधा",
    exploreSub: "निसर्ग सौंदर्य, पवित्र तीर्थक्षेत्रे आणि ऐतिहासिक वारसा तुमच्या भाषेत अनुभवा.",
    plannerTitle: "एआय ट्रिप प्लॅनर",
    plannerSub: "कोणत्याही भारतीय राज्यासाठी सानुकूल प्रवास योजना तयार करा.",
    homestaysTitle: "प्रमाणित प्रादेशिक होमस्टे",
    homestaysSub: "तुमच्या आहाराच्या गरजा आणि भाषेशी सुसंगत असलेल्या स्थानिक यजमानांसोबत राहा.",
    viewDetails: "तपशील पहा",
    era: "वैशिष्ट्य",
    state: "राज्य",
    languages: "उपलब्ध भाषा",
    readStory: "माहिती व कथा वाचा",
    close: "बंद करा",
    days: "दिवस",
    totalDistance: "एकूण अंतर",
    travelTime: "प्रवासाचा वेळ",
    monuments: "ठिकाणे",
    startWizard: "एआय विझार्ड सुरू करा",
    previous: "मागे",
    next: "पुढे",
    generate: "यात्रा तयार करा",
    rebuild: "पुन्हा तयार करा",
    activeTrip: "सक्रिय प्रवास योजना"
  },
  bn: {
    brand: "সরল যাত্রা",
    tagline: "ভারতের জন্য সর্বজনীন এআই ভ্রমণ পরিকল্পনাকারী",
    searchPlaceholder: "সব রাজ্যের ১০০+ পর্যটন কেন্দ্র খুঁজুন...",
    exploreTab: "দর্শনীয় স্থান ও লোকগাথা",
    plannerTab: "এআই ট্রিপ প্ল্যানার",
    itineraryTab: "ভ্রমণসূচি ও লাইভ মানচিত্র",
    homestaysTab: "ঐতিহ্যবাহী হোমস্টে",
    listenStory: "কাহিনী শুনুন",
    stopNarration: "থামুন",
    virtualTour: "৩৬০° ভার্চুয়াল ট্যুর",
    hiddenGem: "লুকানো রত্ন",
    famousGem: "বিখ্যাত আকর্ষণ",
    culturalMatch: "সামঞ্জস্যের স্কোর",
    hostDialect: "আঞ্চলিক ভাষা",
    dietarySafety: "খাদ্য সুরক্ষা ও নিয়ম",
    bookNow: "বুক করুন",
    exploreTitle: "ভারতের সৌন্দর্য ও রূপকথা আবিষ্কার করুন",
    exploreSub: "প্রাকৃতিক উপত্যকা, পবিত্র তীর্থস্থান এবং প্রাচীন ঐতিহ্যবাহী স্থানগুলো আপনার মাতৃভাষায় অন্বেষণ করুন।",
    plannerTitle: "এআই ট্রিপ প্ল্যানার",
    plannerSub: "ভারতের যেকোনো রাজ্যের জন্য নিজস্ব পছন্দ অনুযায়ী ভ্রমণসূচি তৈরি করুন।",
    homestaysTitle: "যাচাইকৃত আঞ্চলিক হোমস্টে",
    homestaysSub: "আপনার খাদ্য সংস্কৃতি ও ভাষার সাথে মানানসই স্থানীয় মেহমানদারদের সাথে থাকুন।",
    viewDetails: "বিস্তারিত দেখুন",
    era: "ঐতিহাসিক কাল",
    state: "রাজ্য",
    languages: "ভাষা",
    readStory: "কাহিনী পড়ুন",
    close: "বন্ধ করুন",
    days: "দিন",
    totalDistance: "মোট দূরত্ব",
    travelTime: "যাত্রার সময়",
    monuments: "দর্শনীয় স্থান",
    startWizard: "এআই উইজার্ড শুরু করুন",
    previous: "পূর্ববর্তী",
    next: "পরবর্তী",
    generate: "ভ্রমণসূচি তৈরি করুন",
    rebuild: "পুনরায় হিসাব করুন",
    activeTrip: "সক্রিয় ভ্রমণসূচি"
  }
};

export const monuments: Monument[] = [
  // 1. KERALA (NATURE & BACKWATERS)
  {
    id: "munnar_tea",
    name: "Munnar Tea Valleys & Mattupetty",
    state: "Kerala",
    era: "Western Ghats Biosphere",
    category: "nature",
    subCategory: "Misty Tea Plantations & Lakes",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 10.0889, lng: 77.0595 },
    folklore: {
      en: "Perched at 1,600m in the Western Ghats, Munnar's undulating emerald hills were historically known as the 'High Range'. Home to the endangered Nilgiri Tahr and the blooming Neelakurinji flower which covers hills in violet once every 12 years.",
      hi: "पश्चिमी घाट में 1,600 मीटर की ऊंचाई पर स्थित मुन्नार की हरी-भरी पहाड़ियां प्राकृतिक सुंदरता का स्वर्ग हैं। यहाँ दुर्लभ नीलगिरि तहर और 12 साल में खिलने वाला नीलकुरिंजी फूल पाया जाता है।",
      ta: "மேற்குத் தொடர்ச்சி மலையில் 1,600 மீட்டர் உயரத்தில் அமைந்துள்ள மூணாறின் தேயிலைத் தோட்டங்கள் இயற்கை எழில் கொஞ்சும் பகுதியாகும்."
    }
  },
  {
    id: "alleppey_backwaters",
    name: "Alleppey Backwaters & Vembanad",
    state: "Kerala",
    era: "Venice of the East Ecosystem",
    category: "nature",
    subCategory: "Tropical Lagoons & Canals",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 9.4981, lng: 76.3388 },
    folklore: {
      en: "A mesmerizing network of interconnected brackish lagoons, rivers, and canals fringed by swaying coconut palms. Traditional Kettuvallam houseboats gently cruise through serene waters where local villagers sustain centuries-old paddy farming below sea level.",
      hi: "नारियल के पेड़ों से घिरी झीलों, नहरों और नदियों का अद्भुत प्राकृतिक नेटवर्क। पारंपरिक हाउसबोट शांत पानी में तैरती हैं।"
    }
  },
  {
    id: "athirappilly_falls",
    name: "Athirappilly Waterfalls",
    state: "Kerala",
    era: "Sholayar Rainforest Reserve",
    category: "nature",
    subCategory: "The Niagara of India",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 10.2851, lng: 76.5698 },
    folklore: {
      en: "Surging down from a height of 80 feet, Athirappilly is India's most dramatic waterfall. Flowing through the dense riparian forests of the Anamudi range, it is home to four endangered hornbill species.",
      hi: "80 फीट की ऊंचाई से गिरता अतिरापिल्ली भारत का सबसे भव्य जलप्रपात है।"
    }
  },

  // 2. RAJASTHAN (ROYAL HERITAGE & DESERT)
  {
    id: "amber_fort",
    name: "Amber Palace & Sheesh Mahal",
    state: "Rajasthan",
    era: "Kachwaha Rajput Dynasty (16th Century)",
    category: "heritage",
    subCategory: "Hilltop Rajput Fortress",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu"],
    coordinates: { lat: 26.9855, lng: 75.8513 },
    folklore: {
      en: "Perched high on the Aravalli hills overlooking Maota Lake. Famous for its Sheesh Mahal (Mirror Palace) where a single candle flame reflects across thousands of Belgian glass mirrors to illuminate the entire royal chamber.",
      hi: "आमेर का किला अपने शीश महल के लिए प्रसिद्ध है, जहाँ एक मोमबत्ती की रोशनी हजारों बेल्जियम शीशों में परावर्तित होकर पूरे कक्ष को रोशन कर देती है।"
    }
  },
  {
    id: "jaisalmer_fort",
    name: "Jaisalmer Living Fort (Sonar Qila)",
    state: "Rajasthan",
    era: "Bhati Rajput Dynasty (1156 AD)",
    category: "heritage",
    subCategory: "Golden Sandstone Living Citadel",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu"],
    coordinates: { lat: 26.9124, lng: 70.9127 },
    folklore: {
      en: "One of the few fully functioning living forts in the world, where one-fourth of the old city's population still resides within golden sandstone walls that glow in the Thar desert sunlight.",
      hi: "थार मरुस्थल के बीच स्थित सोनार किला दुनिया के दुर्लभ जीवित किलों में से एक है।"
    }
  },
  {
    id: "sam_sand_dunes",
    name: "Sam Sand Dunes & Desert Safari",
    state: "Rajasthan",
    era: "Great Thar Desert Ecosystem",
    category: "adventure",
    subCategory: "Sunset Camel Trek & Folk Dunes",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu"],
    coordinates: { lat: 26.8306, lng: 70.5100 },
    folklore: {
      en: "Miles of sweeping, wind-carved golden dunes in the Thar desert. Famous for sunset camel safaris and vibrant Kalbelia gypsy folk dance performances under starlit desert skies.",
      hi: "थार मरुस्थल के रेतीले टीले, जहाँ सूर्यास्त के समय ऊंट की सवारी और कालबेलिया लोक नृत्य का मनमोहक अनुभव होता है।"
    }
  },

  // 3. HIMACHAL PRADESH (HIMALAYAN NATURE & ADVENTURE)
  {
    id: "spiti_valley",
    name: "Spiti Valley & Key Monastery",
    state: "Himachal Pradesh",
    era: "11th Century Tibetan Buddhist Monastery",
    category: "adventure",
    subCategory: "High Altitude Cold Desert",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi"],
    coordinates: { lat: 32.2965, lng: 78.0125 },
    folklore: {
      en: "Known as the 'Middle Land' between India and Tibet. Key Monastery sits atop a conical hill at 4,166m, holding ancient thangkas, manuscripts, and spiritual meditation caves amidst stark Himalayan peaks.",
      hi: "भारत और तिब्बत के बीच स्थित स्पीति घाटी में 4,166 मीटर की ऊंचाई पर की मठ ध्यान और शांति का अद्भुत केंद्र है।"
    }
  },
  {
    id: "solang_valley",
    name: "Solang Valley & Rohtang Pass",
    state: "Himachal Pradesh",
    era: "Pir Panjal Alpine Range",
    category: "nature",
    subCategory: "Snow Peaks, Meadows & Paragliding",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi"],
    coordinates: { lat: 32.3166, lng: 77.1581 },
    folklore: {
      en: "Surrounded by snow-capped peaks and cedar forests, Solang Valley offers exhilarating paragliding, skiing, and sweeping views of the Beas Kund glacier valley.",
      hi: "बर्फ से ढकी चोटियों और देवदार के जंगलों से घिरी सोलांग घाटी रोमांचक साहसिक खेलों के लिए जानी जाती है।"
    }
  },

  // 4. UTTARAKHAND (SPIRITUAL & HIMALAYAN)
  {
    id: "rishikesh_triveni",
    name: "Rishikesh Triveni Ghat & Ganga Aarti",
    state: "Uttarakhand",
    era: "Yoga Capital of the World",
    category: "spiritual",
    subCategory: "Holy Ganga Aarti & Yoga Ashrams",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu"],
    coordinates: { lat: 30.1033, lng: 78.2948 },
    folklore: {
      en: "Where the sacred Ganges emerges from the Himalayas into the plains. Pilgrims gather at Triveni Ghat at dusk for the soul-stirring Maha Aarti, chanting mantras as floating oil lamps drift down emerald waters.",
      hi: "ऋषिकेश में त्रिवेणी घाट पर होने वाली गंगा आरती और योग आश्रम आत्मिक शांति का दिव्य अनुभव कराते हैं।"
    }
  },
  {
    id: "valley_of_flowers",
    name: "Valley of Flowers National Park",
    state: "Uttarakhand",
    era: "UNESCO Biosphere Reserve",
    category: "nature",
    subCategory: "Endemic Alpine Blossom Meadow",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi"],
    coordinates: { lat: 30.7280, lng: 79.6053 },
    folklore: {
      en: "A high-altitude Himalayan valley nestled at 3,600m that bursts into a kaleidoscope of over 500 species of wild alpine flowers including the mythical Brahma Kamal during monsoon.",
      hi: "हिमालय की गोद में बसी फूलों की घाटी में 500 से अधिक दुर्लभ जंगली फूलों की प्रजातियाँ खिलती हैं।"
    }
  },

  // 5. UTTAR PRADESH (SPIRITUAL & HERITAGE)
  {
    id: "kashi_vishwanath",
    name: "Kashi Vishwanath & Ganga Ghats",
    state: "Uttar Pradesh",
    era: "Eternal Sacred City of Shiva",
    category: "spiritual",
    subCategory: "Maha Jyotirlinga & Evening Aarti",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu", "ta"],
    coordinates: { lat: 25.3109, lng: 83.0107 },
    folklore: {
      en: "Varanasi (Kashi) is believed to be one of the oldest continuously inhabited cities in human history. The golden spire of Kashi Vishwanath shines over the sacred Ganges alongside the grand Maha Aarti at Dashashwamedh Ghat.",
      hi: "भगवान शिव के त्रिशूल पर बसी काशी विश्व की सबसे प्राचीन जीवित आध्यात्मिक नगरी है।"
    }
  },
  {
    id: "sarnath_deer_park",
    name: "Sarnath Dhamek Stupa & Deer Park",
    state: "Uttar Pradesh",
    era: "Mauryan Empire (Ashoka Era)",
    category: "spiritual",
    subCategory: "Birthplace of the Dharma Wheel",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1599818981295-a22ff5070ce4?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu", "ta"],
    coordinates: { lat: 25.3811, lng: 83.0214 },
    folklore: {
      en: "Just 10 km from Varanasi, Sarnath is the sacred Deer Park where Gautama Buddha gave his first sermon after attaining enlightenment, setting in motion the Wheel of Dharma.",
      hi: "सारनाथ वह पावन स्थल है जहाँ भगवान बुद्ध ने ज्ञान प्राप्ति के बाद अपना पहला उपदेश दिया था।"
    }
  },

  // 6. GUJARAT (STEPWELLS & SOLAR HERITAGE)
  {
    id: "ranikivav",
    name: "Rani ki Vav",
    state: "Gujarat",
    era: "Solanki Dynasty (11th Century)",
    category: "heritage",
    subCategory: "UNESCO Subterranean Stepwell",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1626014303757-6ec664279216?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu", "ta"],
    coordinates: { lat: 23.8589, lng: 72.1017 },
    folklore: {
      en: "Built by Queen Udayamati in memory of King Bhimdev I. Resembling an inverted temple honoring water, it has seven levels of stairs with over 500 principal sculptures.",
      hi: "रानी की वाव का निर्माण रानी उदयमती ने करवाया था। यह 7 मंजिला उल्टे मंदिर के समान बावड़ी है।"
    }
  },
  {
    id: "modherasun",
    name: "Modhera Sun Temple",
    state: "Gujarat",
    era: "Solanki Dynasty (11th Century)",
    category: "heritage",
    subCategory: "Astronomical Solar Temple",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "gu", "ta"],
    coordinates: { lat: 23.5835, lng: 72.1330 },
    folklore: {
      en: "Dedicated to the Sun God Surya on the banks of Pushpavati River. Built so that equinox solar rays struck the deity's gemmed crown directly. Features the stunning Surya Kunda stepped tank.",
      hi: "पुष्पावती नदी के तट पर स्थित सूर्य मंदिर में 108 छोटे मंदिरों वाला सूर्यकुंड बना है।"
    }
  },

  // 7. KARNATAKA (RUINS & WILDLIFE)
  {
    id: "virupaksha",
    name: "Virupaksha Temple",
    state: "Karnataka",
    era: "Vijayanagara Empire (7th Century)",
    category: "heritage",
    subCategory: "Oldest Living Shiva Temple",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1600100398055-124e57517984?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 15.3358, lng: 76.4564 },
    folklore: {
      en: "Continuously active since the 7th century, featuring a 49-meter Gopuram. Known for its pinhole camera inverted shadow effect and sacred Tungabhadra riverfront architecture.",
      hi: "7वीं शताब्दी से लगातार सक्रिय विरूपाक्ष मंदिर अपने 49 मीटर ऊंचे गोपुरम के लिए प्रसिद्ध है।"
    }
  },
  {
    id: "stonechariot",
    name: "Stone Chariot & Vittala Complex",
    state: "Karnataka",
    era: "Vijayanagara Empire (16th Century)",
    category: "heritage",
    subCategory: "Musical Pillars & Monolith Shrine",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1608958416710-bb2bb4debd59?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 15.3428, lng: 76.4772 },
    folklore: {
      en: "Iconic granite shrine dedicated to Garuda. Surrounding hall features 56 musical pillars that produce musical notes (swaras) when tapped gently.",
      hi: "हम्पी का प्रसिद्ध पत्थर का रथ गरुड़ को समर्पित है। इसमें 56 संगीतमय स्तंभ हैं।"
    }
  },
  {
    id: "daroji_sloth_bear",
    name: "Daroji Sloth Bear Sanctuary",
    state: "Karnataka",
    era: "Deccan Bouldered Wilderness",
    category: "adventure",
    subCategory: "Wild Bear Tracking & Safari",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 15.2678, lng: 76.5411 },
    folklore: {
      en: "Spread across rugged granite boulders, Daroji is Asia's first exclusive sloth bear sanctuary. Watch wild bears foraging on cliff sides from watchtowers.",
      hi: "ग्रेनाइट चट्टानों के बीच बसा दरोजी एशिया का पहला भालू संरक्षण क्षेत्र है।"
    }
  },

  // 8. MEGHALAYA (NORTH-EAST RAINFORESTS)
  {
    id: "living_root_bridges",
    name: "Nongriat Double Decker Living Root Bridge",
    state: "Meghalaya",
    era: "Indigenous Khasi Bio-Engineering",
    category: "nature",
    subCategory: "Living Ficus Tree Bio-Bridges",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1566833928988-d522132d74d9?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi"],
    coordinates: { lat: 25.2476, lng: 91.6738 },
    folklore: {
      en: "Grown over generations by the indigenous Khasi tribe using the aerial roots of Ficus elastica trees across roaring jungle streams. These living bridges grow stronger with time and can support dozens of people.",
      hi: "खासी जनजाति द्वारा जीवित पेड़ों की जड़ों से बनाए गए ये अद्भुत प्राकृतिक पुल समय के साथ और अधिक मजबूत होते हैं।"
    }
  },
  {
    id: "dawki_river",
    name: "Umngot River & Crystal Waters (Dawki)",
    state: "Meghalaya",
    era: "Indo-Bangladesh Border Waterways",
    category: "nature",
    subCategory: "Glass-Transparent River Waters",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi"],
    coordinates: { lat: 25.1878, lng: 92.0163 },
    folklore: {
      en: "Famous for emerald crystal-clear waters where traditional wooden boats appear to float on glass as riverbeds and pebbles are visible metres below the surface.",
      hi: "उमंगोट नदी का पानी इतना पारदर्शी और साफ है कि नावें हवा में तैरती हुई प्रतीत होती हैं।"
    }
  },

  // 9. TAMIL NADU (TEMPLE ARCHITECTURE)
  {
    id: "madurai_meenakshi",
    name: "Madurai Meenakshi Amman Temple",
    state: "Tamil Nadu",
    era: "Pandya & Nayakar Dynasties (1600 AD)",
    category: "spiritual",
    subCategory: "14 Towering Dravidian Gopurams",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 9.9195, lng: 78.1193 },
    folklore: {
      en: "Dedicated to Goddess Meenakshi (Parvati) and Lord Sundareswarar. The temple complex has 14 monumental gateway towers adorned with thousands of colorful sculpted deities and celestial beings.",
      hi: "मदुरै का मीनाक्षी अम्मन मंदिर द्रविड़ वास्तुकला का अनुपम उदाहरण है, जिसमें 14 विशाल बहुरंगी गोपुरम हैं।",
      ta: "மதுரை மீனாட்சி அம்மன் கோயில் 14 வானுயர்ந்த வண்ணமயமான கோபுரங்களுடன் அமைந்துள்ள தமிழ்நாட்டின் ஆன்மீகப் பெருமையாகும்."
    }
  },
  {
    id: "rameswaram_corridor",
    name: "Ramanathaswamy Temple & Longest Corridor",
    state: "Tamil Nadu",
    era: "Sethupathy Dynasty (12th Century)",
    category: "spiritual",
    subCategory: "Char Dham & 1,200 Pillared Hall",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi", "ta"],
    coordinates: { lat: 9.2881, lng: 79.3174 },
    folklore: {
      en: "Located on Pamban Island, this sacred Char Dham temple has the world's longest pillared corridor stretching over 1,200 meters with intricately sculpted sandstone pillars.",
      hi: "रामेश्वरम का रामनाथस्वामी मंदिर 1,200 मीटर लंबे दुनिया के सबसे बड़े स्तंभ गलियारे के लिए विख्यात है।"
    }
  },

  // 10. GOA (COASTAL & WATERFALLS)
  {
    id: "dudhsagar_falls",
    name: "Dudhsagar Waterfalls & Bhagwan Mahaveer Sanctuary",
    state: "Goa",
    era: "Western Ghats Mandovi River Basin",
    category: "nature",
    subCategory: "Four-Tiered Sea of Milk Cascade",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    languagesAvailable: ["en", "hi"],
    coordinates: { lat: 15.3144, lng: 74.3143 },
    folklore: {
      en: "Surging down 310 meters through dense Western Ghats jungle, Dudhsagar literally means 'Sea of Milk' as frothy white waters cascade over railway arches in the rainforest.",
      hi: "दूधसागर जलप्रपात 310 मीटर की ऊंचाई से गिरता है, जिसका सफेद झागदार पानी दूध की धारा जैसा दिखता है।"
    }
  }
];

export const homestays: Homestay[] = [
  {
    id: "kerala_nature_stay",
    name: "Cloud Valley Tea Plantation Retreat",
    category: "nature",
    hostName: "Mathew & Annie Varghese",
    hostOrigin: "Kerala (Munnar)",
    languagesSpoken: ["Malayalam", "Tamil", "English", "Hindi"],
    foodSpecialty: "Kerala Sadya, Appam with Stew, Fresh Cardamom Tea",
    dietaryReady: "pureVeg",
    pricePerNight: 3400,
    compatibilityScore: {
      food: 95,
      language: 90,
      heritage: 98,
      overall: 96
    },
    about: "A private eco-villa nestled inside a 40-acre organic tea estate. Mathew conducts morning birdwatching walks and estate tours."
  },
  {
    id: "varanasi_spiritual_stay",
    name: "Ganga Kinare Vedic Ashram & Homestay",
    category: "spiritual",
    hostName: "Pandit Ramashankar Tripathi",
    hostOrigin: "Uttar Pradesh (Varanasi)",
    languagesSpoken: ["Hindi", "Sanskrit", "English", "Gujarati"],
    foodSpecialty: "Satvik Pure Veg (No onion, garlic), Banarasi Thali",
    dietaryReady: "pureVeg",
    pricePerNight: 2400,
    compatibilityScore: {
      food: 100,
      language: 95,
      heritage: 95,
      overall: 98
    },
    about: "Overlooking the sacred Ganges ghats with private terrace for morning yoga, meditation, and direct guidance on rituals."
  },
  {
    id: "rajasthan_haveli_stay",
    name: "Rawla Heritage Haveli & Desert Camp",
    category: "heritage",
    hostName: "Rana Digvijay Singh",
    hostOrigin: "Rajasthan (Jaipur/Jaisalmer)",
    languagesSpoken: ["Hindi", "English", "Marwari"],
    foodSpecialty: "Dal Baati Churma, Gatte ki Sabzi, Ker Sangri",
    dietaryReady: "pureVeg",
    pricePerNight: 3100,
    compatibilityScore: {
      food: 95,
      language: 90,
      heritage: 98,
      overall: 96
    },
    about: "Restored 200-year-old carved sandstone mansion with evening courtyard folk music and pure vegetarian dining."
  },
  {
    id: "himachal_apple_stay",
    name: "Cedar Whispers Apple Orchard Cottage",
    category: "nature",
    hostName: "Sunil & Meenakshi Thakur",
    hostOrigin: "Himachal Pradesh (Manali)",
    languagesSpoken: ["Hindi", "English", "Punjabi"],
    foodSpecialty: "Himachali Dham, Siddu, Fresh Apple Cider",
    dietaryReady: "pureVeg",
    pricePerNight: 2600,
    compatibilityScore: {
      food: 95,
      language: 90,
      heritage: 92,
      overall: 94
    },
    about: "Wooden chalet surrounded by snow peaks and apple orchards with wood-burning fireplace and organic meals."
  },
  {
    id: "guj_veg_house",
    name: "Heritage Pol Haveli Homestay",
    category: "heritage",
    hostName: "Daxaben Patel",
    hostOrigin: "Gujarat (Ahmedabad)",
    languagesSpoken: ["Gujarati", "Hindi", "English"],
    foodSpecialty: "Authentic Gujarati Thali (Khandvi, Dhokla, Undhiyu)",
    dietaryReady: "pureVeg",
    pricePerNight: 2800,
    compatibilityScore: {
      food: 100,
      language: 95,
      heritage: 90,
      overall: 96
    },
    about: "A restored 150-year-old wooden Haveli in Ahmedabad's UNESCO old city with daily cooking workshops on separate vegetarian kitchens."
  },
  {
    id: "karnataka_veg_house",
    name: "Kishkindha Heritage Farmstay",
    category: "adventure",
    hostName: "Mallikarjuna Hegde",
    hostOrigin: "Karnataka (Anegundi)",
    languagesSpoken: ["Kannada", "Tamil", "English", "Hindi"],
    foodSpecialty: "Traditional South Indian Jolada Roti meals",
    dietaryReady: "pureVeg",
    pricePerNight: 2200,
    compatibilityScore: {
      food: 95,
      language: 85,
      heritage: 98,
      overall: 93
    },
    about: "Nestled among banana plantations on the Tungabhadra river with red oxide floors and personal folklore tours."
  }
];

export const preloadedTrips: Record<string, PreloadedTrip> = {
  kerala: {
    id: "kerala-nature",
    title: "3-Day Kerala Nature & Backwaters Retreat",
    category: "nature",
    region: "Kerala",
    duration: 3,
    pacing: "Relaxed",
    siteMix: "80% Scenic Nature / 20% Cultural",
    culturalFilter: {
      category: "nature",
      dietary: "pureVeg",
      language: "Tamil",
      interests: ["Nature", "Scenic", "Waterfalls"]
    },
    stats: {
      totalDistance: "210 km",
      travelTime: "5 hours total driving",
      monumentsCount: 3
    },
    itinerary: [
      {
        day: 1,
        stops: [
          {
            id: "ker-1",
            time: "09:00 AM",
            type: "nature",
            title: "Munnar Tea Valleys & Mattupetty Dam",
            desc: "Wander through rolling emerald tea estates and enjoy boating in Mattupetty lake.",
            monumentId: "munnar_tea",
            duration: "3.5 hours",
            lat: 10.0889,
            lng: 77.0595
          },
          {
            id: "ker-2",
            time: "01:00 PM",
            type: "lunch",
            title: "Traditional Plantain Leaf Lunch",
            desc: "Fresh organic Kerala Sadya with red rice, avial, and coconut stew.",
            duration: "1.5 hours",
            lat: 10.0800,
            lng: 77.0600
          }
        ]
      },
      {
        day: 2,
        stops: [
          {
            id: "ker-4",
            time: "09:00 AM",
            type: "nature",
            title: "Athirappilly Waterfalls",
            desc: "Marvel at India's most dramatic 80ft cascade surrounded by hornbill forests.",
            monumentId: "athirappilly_falls",
            duration: "3 hours",
            lat: 10.2851,
            lng: 76.5698
          },
          {
            id: "ker-5",
            time: "01:30 PM",
            type: "lunch",
            title: "Riverside Spice Garden Lunch",
            desc: "Traditional spice-infused meal on the Chalakudy riverbank.",
            duration: "1.5 hours",
            lat: 10.2800,
            lng: 76.5600
          }
        ]
      },
      {
        day: 3,
        stops: [
          {
            id: "ker-6",
            time: "10:00 AM",
            type: "nature",
            title: "Alleppey Backwaters Cruise",
            desc: "Private traditional Kettuvallam boat ride through serene palm-fringed lagoons.",
            monumentId: "alleppey_backwaters",
            duration: "4 hours",
            lat: 9.4981,
            lng: 76.3388
          },
          {
            id: "ker-7",
            time: "03:00 PM",
            type: "hotel",
            title: "Cloud Valley Eco-Retreat Wrap",
            desc: "Farewell cardamom tea with hosts Mathew & Annie.",
            duration: "1 hour",
            lat: 9.5000,
            lng: 76.3400
          }
        ]
      }
    ]
  },
  rajasthan: {
    id: "rajasthan-royal",
    title: "3-Day Royal Forts & Desert Dunes Circuit",
    category: "heritage",
    region: "Rajasthan",
    duration: 3,
    pacing: "Moderate",
    siteMix: "70% Royal Heritage / 30% Desert Adventure",
    culturalFilter: {
      category: "heritage",
      dietary: "pureVeg",
      language: "Hindi",
      interests: ["Forts", "Palaces", "Desert"]
    },
    stats: {
      totalDistance: "330 km",
      travelTime: "6 hours total driving",
      monumentsCount: 3
    },
    itinerary: [
      {
        day: 1,
        stops: [
          {
            id: "raj-1",
            time: "09:30 AM",
            type: "heritage",
            title: "Amber Palace & Sheesh Mahal",
            desc: "Explore the mirror palace and ramparts overlooking Maota Lake.",
            monumentId: "amber_fort",
            duration: "3 hours",
            lat: 26.9855,
            lng: 75.8513
          },
          {
            id: "raj-2",
            time: "01:30 PM",
            type: "lunch",
            title: "Royal Rajasthani Thali Lunch",
            desc: "Dal Baati Churma, Gatte ki Sabzi, and sweet Ghevar.",
            duration: "1.5 hours",
            lat: 26.9800,
            lng: 75.8500
          }
        ]
      },
      {
        day: 2,
        stops: [
          {
            id: "raj-3",
            time: "10:00 AM",
            type: "heritage",
            title: "Jaisalmer Living Fort (Sonar Qila)",
            desc: "Wander through centuries-old golden sandstone havelis and Jain temples.",
            monumentId: "jaisalmer_fort",
            duration: "3 hours",
            lat: 26.9124,
            lng: 70.9127
          }
        ]
      },
      {
        day: 3,
        stops: [
          {
            id: "raj-4",
            time: "04:00 PM",
            type: "adventure",
            title: "Sam Sand Dunes Sunset Safari",
            desc: "Camel safari and starlit Kalbelia folk performances across golden sand dunes.",
            monumentId: "sam_sand_dunes",
            duration: "4 hours",
            lat: 26.8306,
            lng: 70.5100
          }
        ]
      }
    ]
  },
  varanasi: {
    id: "varanasi-spiritual",
    title: "3-Day Divine Kashi & Sarnath Pilgrimage",
    category: "spiritual",
    region: "Uttar Pradesh",
    duration: 3,
    pacing: "Moderate",
    siteMix: "90% Sacred Shrines / 10% Heritage",
    culturalFilter: {
      category: "spiritual",
      dietary: "pureVeg",
      language: "Hindi",
      interests: ["Spiritual", "Pilgrimage", "Rituals"]
    },
    stats: {
      totalDistance: "35 km",
      travelTime: "1.5 hours total transit",
      monumentsCount: 2
    },
    itinerary: [
      {
        day: 1,
        stops: [
          {
            id: "var-1",
            time: "06:00 AM",
            type: "spiritual",
            title: "Ganga Sunrise Boat Ride & Kashi Vishwanath Darshan",
            desc: "Witness morning chants, rituals, and golden spire of Kashi Vishwanath.",
            monumentId: "kashi_vishwanath",
            duration: "3.5 hours",
            lat: 25.3109,
            lng: 83.0107
          },
          {
            id: "var-3",
            time: "06:30 PM",
            type: "spiritual",
            title: "Grand Evening Ganga Maha Aarti",
            desc: "Behold the brass lamps and Vedic chanting at Dashashwamedh Ghat.",
            duration: "2 hours",
            lat: 25.3050,
            lng: 83.0100
          }
        ]
      },
      {
        day: 2,
        stops: [
          {
            id: "var-4",
            time: "09:30 AM",
            type: "spiritual",
            title: "Sarnath Dhamek Stupa & Deer Park",
            desc: "Meditate where Buddha gave his first sermon turning the Dharma wheel.",
            monumentId: "sarnath_deer_park",
            duration: "3 hours",
            lat: 25.3811,
            lng: 83.0214
          }
        ]
      },
      {
        day: 3,
        stops: [
          {
            id: "var-7",
            time: "02:00 PM",
            type: "hotel",
            title: "Vedic Ashram Blessing & Wrap",
            desc: "Farewell blessings with Pandit Ramashankar Tripathi.",
            duration: "1 hour",
            lat: 25.3100,
            lng: 83.0100
          }
        ]
      }
    ]
  }
};
