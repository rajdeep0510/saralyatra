import { Monument, Homestay, PreloadedTrip, Translations } from "../types";
import { regionalJsonMonuments } from "./placesLoader";

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
    tagline: "Universal Trip Planner for India",
    searchPlaceholder: "Search 100+ destinations across all states...",
    exploreTab: "Wonders & Stories",
    plannerTab: "Trip Planner",
    itineraryTab: "Itinerary & Live Map",
    homestaysTab: "Cultural & Nature Stays",
    transitTab: "Transit & Fares",
    heroBadge: "Universal Trip Architect • Pan-India Tourism",
    heroTitle: "Wonders of India",
    heroSub: "Plan smart journeys across majestic green valleys, royal desert citadels, sacred pilgrimage shrines, and ancient monuments — personalized for any state and duration.",
    natureTheme: "Nature & Scenic",
    spiritualTheme: "Spiritual & Sacred",
    heritageTheme: "Heritage & History",
    adventureTheme: "Adventure & Wildlife",
    allThemes: "All Themes",
    quickCircuit: "Curated Circuits",
    stateLabel: "State",
    allStates: "All States",
    allSites: "All Sites",
    iconic: "Iconic",
    hiddenGems: "Hidden Gems",
    showingPlaces: "Showing",
    destinations: "Destinations",
    resetFilters: "Reset All Filters",
    listenStory: "Listen Story",
    listenLore: "Listen Oral Lore & 360° Preview",
    stopNarration: "Stop Narration",
    virtualTour: "Launch 360° Virtual Preview Tour",
    unfoldedLore: "Unfolded Lore Parchment",
    audioPlaying: "Narration Playing...",
    oralHistoryFolklore: "Oral Folklore & Traditions",
    audioLanguage: "Audio Language",
    tamburaOn: "Tambura Drone ON",
    tamburaMuted: "Drone Muted",
    hiddenGem: "Hidden Gem",
    famousGem: "Iconic Attraction",
    culturalMatch: "Compatibility Match",
    hostDialect: "Host Dialect",
    dietarySafety: "Dietary Readiness",
    bookNow: "Reserve Stay",
    exploreTitle: "Wonders of India: All Themes & States",
    exploreSub: "Explore India's diverse landscapes, sacred shrines, and architectural gems. Click any spot to listen to authentic oral folklore or preview 360° virtual tours.",
    plannerTitle: "Trip Planner",
    plannerSub: "Configure your travel theme across Nature, Pilgrimage, Heritage, or Adventure. Complete Step 1 and proceed to unlock your live itinerary blueprint.",
    homestaysTitle: "Verified Community Lodging & Eco-Retreats",
    homestaysSub: "Stay in tea estate bungalows, desert havelis, and sacred river ashrams matching your diet and dialect.",
    confirmTrip: "Confirm Trip",
    cancelTrip: "Cancel Trip",
    tripConfirmed: "Trip Confirmed ✓",
    addPlace: "+ Add Place",
    editInPlanner: "Edit in Planner",
    print: "Print",
    pacing: "Pacing",
    viewDetails: "View Details",
    era: "Era / Highlight",
    state: "State",
    languages: "Languages",
    readStory: "Oral Folklore & Traditions",
    close: "Close",
    days: "Days",
    totalDistance: "Total Distance",
    travelTime: "Travel Time",
    monuments: "Attractions",
    startWizard: "Start Planner Wizard",
    previous: "Previous",
    next: "Next",
    generate: "Generate Custom Itinerary",
    rebuild: "Rebuild Itinerary",
    activeTrip: "Active Itinerary",
    savedTrips: "Saved Trips",
    noSavedTrips: "No Confirmed Trips Yet",
    noSavedTripsDesc: "Generate a custom itinerary in Trip Planner and click 'Confirm Trip' to save it here for easy access!",
    viewRoute: "View Route",
    natureLabel: "Scenic Stop",
    spiritualLabel: "Sacred Shrine",
    adventureLabel: "Wilderness",
    lunchLabel: "Regional Dining",
    hotelLabel: "Overnight Stay",
    monumentLabel: "Heritage Landmark"
  },
  hi: {
    brand: "सरल यात्रा",
    tagline: "भारत का संपूर्ण ट्रिप प्लानर",
    searchPlaceholder: "सभी राज्यों के 100+ स्थल खोजें...",
    exploreTab: "स्थल और कहानियाँ",
    plannerTab: "ट्रिप प्लानर",
    itineraryTab: "यात्रा मार्ग और मानचित्र",
    homestaysTab: "प्रामाणिक होमस्टे",
    transitTab: "किफायती यात्रा और किराया",
    heroBadge: "यात्रा वास्तुकार • संपूर्ण भारत पर्यटन",
    heroTitle: "भारत के अद्भुत स्थल",
    heroSub: "हरी-भरी घाटियों, शाही महलों, पवित्र तीर्थस्थलों और प्राचीन धरोहरों की सुखद यात्रा की योजना बनाएं — किसी भी राज्य और दिनों के लिए।",
    natureTheme: "प्रकृति एवं सौंदर्य",
    spiritualTheme: "आध्यात्मिक एवं पवित्र",
    heritageTheme: "ऐतिहासिक धरोहर",
    adventureTheme: "साहसिक एवं वन्यजीव",
    allThemes: "सभी विषय",
    quickCircuit: "प्रमुख यात्रा मार्ग",
    stateLabel: "राज्य",
    allStates: "सभी राज्य",
    allSites: "सभी स्थल",
    iconic: "प्रमुख स्थल",
    hiddenGems: "गुप्त रत्न",
    showingPlaces: "दिखाए जा रहे",
    destinations: "स्थल",
    resetFilters: "सभी फ़िल्टर रीसेट करें",
    listenStory: "कहानी सुनें",
    listenLore: "लोककथा सुनें एवं 360° टूर",
    stopNarration: "वाचन बंद करें",
    virtualTour: "360° वर्चुअल टूर शुरू करें",
    unfoldedLore: "प्रस्तुत लोककथा व इतिहास",
    audioPlaying: "वाचन चालू है...",
    oralHistoryFolklore: "मौखिक लोककथा एवं परंपराएँ",
    audioLanguage: "ऑडियो भाषा",
    tamburaOn: "तानपूरा ध्वनि चालू",
    tamburaMuted: "तानपूरा मौन",
    hiddenGem: "अनोखा स्थल",
    famousGem: "प्रसिद्ध आकर्षण",
    culturalMatch: "सांस्कृतिक अनुकूलता",
    hostDialect: "मेजबान की भाषा",
    dietarySafety: "भोजन सुरक्षा",
    bookNow: "होमस्टे बुक करें",
    exploreTitle: "भारत के अजूबे: सभी विषय और राज्य",
    exploreSub: "भारत के विविध परिदृश्यों और पवित्र मंदिरों की यात्रा करें। किसी भी स्थान की मौखिक लोककथा सुनने के लिए क्लिक करें।",
    plannerTitle: "ट्रिप प्लानर",
    plannerSub: "प्रकृति, तीर्थ, इतिहास या साहसिक यात्रा चुनें। अपना व्यक्तिगत यात्रा कार्यक्रम बनाएं।",
    homestaysTitle: "सत्यापित प्रामाणिक होमस्टे",
    homestaysSub: "अपनी भोजन परंपराओं और स्थानीय भाषा से मेल खाते सत्यापित होमस्टे में ठहरें।",
    confirmTrip: "यात्रा पक्की करें",
    cancelTrip: "यात्रा रद्द करें",
    tripConfirmed: "यात्रा सुरक्षित ✓",
    addPlace: "+ स्थान जोड़ें",
    editInPlanner: "प्लानर में सुधारें",
    print: "प्रिंट करें",
    pacing: "गति",
    viewDetails: "विवरण देखें",
    era: "काल / विशेषता",
    state: "राज्य",
    languages: "उपलब्ध भाषाएँ",
    readStory: "लोककथा व परंपराएँ",
    close: "बंद करें",
    days: "दिन",
    totalDistance: "कुल दूरी",
    travelTime: "यात्रा समय",
    monuments: "आकर्षण",
    startWizard: "विज़ार्ड शुरू करें",
    previous: "पिछला",
    next: "अगला",
    generate: "यात्रा योजना बनाएं",
    rebuild: "पुनः बनाएं",
    activeTrip: "सक्रिय यात्रा",
    savedTrips: "सहेजी गई यात्राएँ",
    noSavedTrips: "कोई यात्रा सहेजी नहीं गई",
    noSavedTripsDesc: "ट्रिप प्लानर में यात्रा बनाएं और 'यात्रा पक्की करें' पर क्लिक करें।",
    viewRoute: "मार्ग देखें",
    natureLabel: "प्राकृतिक स्थल",
    spiritualLabel: "पवित्र तीर्थ",
    adventureLabel: "साहसिक स्थल",
    lunchLabel: "क्षेत्रीय भोजन",
    hotelLabel: "रात्रि विश्राम",
    monumentLabel: "धरोहर स्मारक"
  },
  mr: {
    brand: "सरल यात्रा",
    tagline: "भारतासाठी प्रवास आणि पर्यटन नियोजक",
    searchPlaceholder: "सर्व राज्यांमधील १००+ ठिकाणे शोधा...",
    exploreTab: "अद्भूत ठिकाणे आणि कथा",
    plannerTab: "ट्रिप प्लॅनर",
    itineraryTab: "प्रवास योजना आणि नकाशा",
    homestaysTab: "प्रादेशिक होमस्टे",
    heroBadge: "प्रवास मार्गदर्शक • संपूर्ण भारत पर्यटन",
    heroTitle: "भारतातील आश्चर्यकारक ठिकाणे",
    heroSub: "हिरवेगार डोंगर, भव्य किल्ले, पवित्र तीर्थक्षेत्रे आणि प्राचीन मंदिरांची अविस्मरणीय सहल आयोजित करा — तुमच्या आवडीनुसार.",
    natureTheme: "निसर्ग आणि सौंदर्य",
    spiritualTheme: "आध्यात्मिक आणि पवित्र",
    heritageTheme: "ऐतिहासिक वारसा",
    adventureTheme: "साहस आणि वन्यजीव",
    allThemes: "सर्व प्रकार",
    quickCircuit: "लोकप्रिय यात्रा मार्ग",
    stateLabel: "राज्य",
    allStates: "सर्व राज्ये",
    allSites: "सर्व ठिकाणे",
    iconic: "प्रसिद्ध ठिकाणे",
    hiddenGems: "गुप्त रत्ने",
    showingPlaces: "दाखवत आहे",
    destinations: "ठिकाणे",
    resetFilters: "सर्व फिल्टर्स रीसेट करा",
    listenStory: "कथा ऐका",
    listenLore: "लोककथा ऐका आणि ३६०° टूर",
    stopNarration: "थांबवा",
    virtualTour: "३६०° व्हर्च्युअल टूर सुरू करा",
    unfoldedLore: "उलगडलेली लोककथा व वारसा",
    audioPlaying: "वाचन सुरू आहे...",
    oralHistoryFolklore: "मौखिक लोककथा आणि परंपरा",
    audioLanguage: "ऑडिओ भाषा",
    tamburaOn: "तानपुरा चालू",
    tamburaMuted: "तानपुरा बंद",
    hiddenGem: "अप्रतिम गुप्त ठिकाण",
    famousGem: "प्रसिद्ध आकर्षण",
    culturalMatch: "सुसंगतता प्रमाण",
    hostDialect: "स्थानिक भाषा",
    dietarySafety: "आहार खात्री",
    bookNow: "होमस्टे बुक करा",
    exploreTitle: "भारतातील आश्चर्यकारक ठिकाणे शोधा",
    exploreSub: "निसर्ग सौंदर्य, पवित्र तीर्थक्षेत्रे आणि ऐतिहासिक वारसा तुमच्या मातृभाषेत अनुभवा.",
    plannerTitle: "ट्रिप प्लॅनर",
    plannerSub: "कोणत्याही भारतीय राज्यासाठी सानुकूल प्रवास योजना तयार करा.",
    homestaysTitle: "प्रमाणित प्रादेशिक होमस्टे",
    homestaysSub: "तुमच्या आहाराच्या गरजा आणि भाषेशी सुसंगत असलेल्या स्थानिक यजमानांसोबत राहा.",
    confirmTrip: "यात्रा निश्चित करा",
    cancelTrip: "यात्रा रद्द करा",
    tripConfirmed: "यात्रा जतन केली ✓",
    addPlace: "+ ठिकाण जोडा",
    editInPlanner: "प्लॅनरमध्ये बदला",
    print: "प्रिंट करा",
    pacing: "गती",
    viewDetails: "तपशील पहा",
    era: "वैशिष्ट्य",
    state: "राज्य",
    languages: "उपलब्ध भाषा",
    readStory: "लोककथा आणि इतिहास",
    close: "बंद करा",
    days: "दिवस",
    totalDistance: "एकूण अंतर",
    travelTime: "प्रवासाचा वेळ",
    monuments: "ठिकाणे",
    startWizard: "विझार्ड सुरू करा",
    previous: "मागे",
    next: "पुढे",
    generate: "यात्रा तयार करा",
    rebuild: "पुन्हा तयार करा",
    activeTrip: "सक्रिय प्रवास योजना",
    savedTrips: "जतन केलेल्या यात्रा",
    noSavedTrips: "अद्याप कोणतीही यात्रा नाही",
    noSavedTripsDesc: "ट्रिप प्लॅनरमध्ये यात्रा तयार करा आणि 'यात्रा निश्चित करा' वर क्लिक करा.",
    viewRoute: "मार्ग पहा",
    natureLabel: "निसर्गरम्य ठिकाण",
    spiritualLabel: "पवित्र तीर्थ",
    adventureLabel: "साहसी ठिकाण",
    lunchLabel: "प्रादेशिक भोजन",
    hotelLabel: "रात्रीची विश्रांती",
    monumentLabel: "ऐतिहासिक वारसा"
  },
  gu: {
    brand: "સરળ યાત્રા",
    tagline: "સમગ્ર ભારત માટે સ્માર્ટ યાત્રા પ્લાનર",
    searchPlaceholder: "બધા રાજ્યોના ૧૦૦+ સ્થળો શોધો...",
    exploreTab: "અદ્ભુત સ્થળો અને વાર્તાઓ",
    plannerTab: "ટ્રિપ પ્લાનર",
    itineraryTab: "યાત્રા માર્ગ અને નકશો",
    homestaysTab: "પ્રામાણિક હોમસ્ટે",
    heroBadge: "યાત્રા આર્કિટેક્ટ • ભારત દર્શન",
    heroTitle: "ભારતના અદ્ભુત સ્થળો",
    heroSub: "લીલીછમ ખીણો, રજવાડી કિલ્લાઓ, પવિત્ર યાત્રાધામો અને પ્રાચીન વારસાની સ્માર્ટ યાત્રાનું આયોજન કરો.",
    natureTheme: "કુદરતી સૌંદર્ય",
    spiritualTheme: "આધ્યાત્મિક અને પવિત્ર",
    heritageTheme: "ઐતિહાસિક વારસો",
    adventureTheme: "સાહસ અને વન્યજીવ",
    allThemes: "બધા વિષયો",
    quickCircuit: "લોકપ્રિય યાત્રા માર્ગ",
    stateLabel: "રાજ્ય",
    allStates: "બધા રાજ્યો",
    allSites: "બધા સ્થળો",
    iconic: "પ્રખ્યાત સ્થળો",
    hiddenGems: "ગુપ્ત રત્નો",
    showingPlaces: "દર્શાવેલ",
    destinations: "સ્થળો",
    resetFilters: "બધા ફિલ્ટર્સ રીસેટ કરો",
    listenStory: "વાર્તા સાંભળો",
    listenLore: "લોકવાર્તા સાંભળો અને ૩૬૦° ટૂર",
    stopNarration: "વાંચન બંધ કરો",
    virtualTour: "૩૬૦° વર્ચ્યુઅલ ટૂર",
    unfoldedLore: "લોકવાર્તા અને વારસો",
    audioPlaying: "વાંચન ચાલુ છે...",
    oralHistoryFolklore: "મૌખિક લોકવાર્તાઓ અને પરંપરાઓ",
    audioLanguage: "ઓડિયો ભાષા",
    tamburaOn: "તાનપુરો ચાલુ",
    tamburaMuted: "તાનપુરો મૌન",
    hiddenGem: "અદભુત સ્થળ",
    famousGem: "મુખ્ય આકર્ષણ",
    culturalMatch: "સાંસ્કૃતિક સુમેળ",
    hostDialect: "યજમાનની ભાષા",
    dietarySafety: "આહાર સુરક્ષા",
    bookNow: "હોમસ્ટે બુક કરો",
    exploreTitle: "ભારતના આશ્ચર્યો: તમામ રાજ્યો અને વિષયો",
    exploreSub: "ભારતના કુદરતી સૌંદર્ય અને પવિત્ર મંદિરોનો તમારી માતૃભાષામાં અનુભવ કરો.",
    plannerTitle: "ટ્રિપ પ્લાનર",
    plannerSub: "તમારી પસંદગીના રાજ્ય અને દિવસો અનુસાર કસ્ટમ યાત્રા પ્લાન બનાવો.",
    homestaysTitle: "પ્રમાણિત હોમસ્ટે અને નેચર રીટ્રીટ",
    homestaysSub: "તમારા શુદ્ધ આહાર અને ભાષાને અનુકૂળ સ્થાનિક યજમાનો સાથે રહો.",
    confirmTrip: "યાત્રા કન્ફર્મ કરો",
    cancelTrip: "યાત્રા રદ કરો",
    tripConfirmed: "યાત્રા સચવાઈ ✓",
    addPlace: "+ સ્થળ ઉમેરો",
    editInPlanner: "પ્લાનરમાં સુધારો",
    print: "પ્રિન્ટ કરો",
    pacing: "ગતિ",
    viewDetails: "વિગત જુઓ",
    era: "વિશેષતા",
    state: "રાજ્ય",
    languages: "ઉપલબ્ધ ભાષાઓ",
    readStory: "લોકકથા અને ઇતિહાસ",
    close: "બંધ કરો",
    days: "દિવસો",
    totalDistance: "કુલ અંતર",
    travelTime: "મુસાફરીનો સમય",
    monuments: "સ્થળો",
    startWizard: "વિઝાર્ડ શરૂ કરો",
    previous: "પાછળ",
    next: "આગળ",
    generate: "યાત્રા તૈયાર કરો",
    rebuild: "ફરીથી બનાવો",
    activeTrip: "સક્રિય યાત્રા",
    savedTrips: "સેવ કરેલી યાત્રાઓ",
    noSavedTrips: "હજી સુધી કોઈ યાત્રા સેવ નથી",
    noSavedTripsDesc: "ટ્રિપ પ્લાનરમાં યાત્રા બનાવો અને 'યાત્રા કન્ફર્મ કરો' પર ક્લિક કરો.",
    viewRoute: "માર્ગ જુઓ",
    natureLabel: "કુદરતી સ્થળ",
    spiritualLabel: "પવિત્ર યાત્રાધામ",
    adventureLabel: "સાહસિક સ્થળ",
    lunchLabel: "પ્રાદેશિક ભોજન",
    hotelLabel: "રાત્રિ રોકાણ",
    monumentLabel: "ઐતિહાસિક સ્થળ"
  },
  bn: {
    brand: "সরল যাত্রা",
    tagline: "ভারতের জন্য সর্বজনীন ভ্রমণ পরিকল্পনাকারী",
    searchPlaceholder: "সব রাজ্যের ১০০+ পর্যটন কেন্দ্র খুঁজুন...",
    exploreTab: "দর্শনীয় স্থান ও লোকগাথা",
    plannerTab: "ট্রিপ প্ল্যানার",
    itineraryTab: "ভ্রমণসূচি ও লাইভ মানচিত্র",
    homestaysTab: "ঐতিহ্যবাহী হোমস্টে",
    heroBadge: "ভ্রমণ স্থপতি • সর্বভারতীয় পর্যটন",
    heroTitle: "ভারতের দর্শনীয় বিস্ময়",
    heroSub: "পাহাড়, রাজকীয় দুর্গ, পবিত্র তীর্থক্ষেত্র এবং প্রাচীন ঐতিহ্যের এক নিখুঁত ও আরামদায়ক ভ্রমণ পরিকল্পনা করুন।",
    natureTheme: "প্রকৃতি ও মনোরম দৃশ্য",
    spiritualTheme: "আধ্যাত্মিক ও পবিত্র",
    heritageTheme: "ঐতিহ্য ও ইতিহাস",
    adventureTheme: "অ্যাডভেঞ্চার ও বন্যপ্রাণী",
    allThemes: "সব বিষয়",
    quickCircuit: "জনপ্রিয় ভ্রমণ পথ",
    stateLabel: "রাজ্য",
    allStates: "সকল রাজ্য",
    allSites: "সব স্থান",
    iconic: "বিখ্যাত স্থান",
    hiddenGems: "লুকানো রত্ন",
    showingPlaces: "প্রদর্শিত হচ্ছে",
    destinations: "স্থান",
    resetFilters: "সব ফিল্টার রিসেট করুন",
    listenStory: "কাহিনী শুনুন",
    listenLore: "লোকগাথা শুনুন ও ৩৬০° ট্যুর",
    stopNarration: "থামুন",
    virtualTour: "৩৬০° ভার্চুয়াল ট্যুর",
    unfoldedLore: "উন্মোচিত লোকগাথা ও ঐতিহ্য",
    audioPlaying: "পাঠ চলছে...",
    oralHistoryFolklore: "মৌখিক লোকগাথা ও সংস্কৃতি",
    audioLanguage: "অডিও ভাষা",
    tamburaOn: "তানপুরা চালু",
    tamburaMuted: "তানপুরা নিঃশব্দ",
    hiddenGem: "লুকানো রত্ন",
    famousGem: "বিখ্যাত আকর্ষণ",
    culturalMatch: "সামঞ্জস্যের স্কোর",
    hostDialect: "আঞ্চলিক ভাষা",
    dietarySafety: "খাদ্য সুরক্ষা ও নিয়ম",
    bookNow: "বুক করুন",
    exploreTitle: "ভারতের সৌন্দর্য ও রূপকথা আবিষ্কার করুন",
    exploreSub: "প্রাকৃতিক উপত্যকা, পবিত্র তীর্থস্থান এবং প্রাচীন ঐতিহ্যবাহী স্থানগুলো আপনার মাতৃভাষায় অন্বেষণ করুন।",
    plannerTitle: "ট্রিপ প্ল্যানার",
    plannerSub: "ভারতের যেকোনো রাজ্যের জন্য নিজস্ব পছন্দ অনুযায়ী ভ্রমণসূচি তৈরি করুন।",
    homestaysTitle: "যাচাইকৃত আঞ্চলিক হোমস্টে",
    homestaysSub: "আপনার খাদ্য সংস্কৃতি ও ভাষার সাথে মানানসই স্থানীয় মেহমানদারদের সাথে থাকুন।",
    confirmTrip: "ভ্রমণ নিশ্চিত করুন",
    cancelTrip: "ভ্রমণ বাতিল করুন",
    tripConfirmed: "ভ্রমণ সংরক্ষিত ✓",
    addPlace: "+ স্থান যোগ করুন",
    editInPlanner: "প্ল্যানারে পরিবর্তন করুন",
    print: "প্রিন্ট করুন",
    pacing: "গতি",
    viewDetails: "বিস্তারিত দেখুন",
    era: "ঐতিহাসিক কাল",
    state: "রাজ্য",
    languages: "উপলব্ধ ভাষা",
    readStory: "কাহিনী পড়ুন",
    close: "বন্ধ করুন",
    days: "দিন",
    totalDistance: "মোট দূরত্ব",
    travelTime: "যাত্রার সময়",
    monuments: "দর্শনীয় স্থান",
    startWizard: "উইজার্ড শুরু করুন",
    previous: "পূর্ববর্তী",
    next: "পরবর্তী",
    generate: "ভ্রমণসূচি তৈরি করুন",
    rebuild: "পুনরায় হিসাব করুন",
    activeTrip: "সক্রিয় ভ্রমণসূচি",
    savedTrips: "সংরক্ষিত ভ্রমণসমূহ",
    noSavedTrips: "কোনো ভ্রমণ সংরক্ষিত নেই",
    noSavedTripsDesc: "ট্রিপ প্ল্যানারে ভ্রমণ তৈরি করুন এবং 'ভ্রমণ নিশ্চিত করুন' বাটনে চাপুন।",
    viewRoute: "পথ দেখুন",
    natureLabel: "প্রাকৃতিক স্থান",
    spiritualLabel: "পবিত্র তীর্থ",
    adventureLabel: "অ্যাডভেঞ্চার স্থান",
    lunchLabel: "আঞ্চলিক আহার",
    hotelLabel: "রাতের বিশ্রাম",
    monumentLabel: "ঐতিহাসিক নিদর্শন"
  },
  ta: {
    brand: "சரல் யாத்ரா",
    tagline: "இந்தியாவிற்கான முழுமையான பயணத் திட்டம்",
    searchPlaceholder: "அனைத்து மாநில இடங்களையும் தேடுங்கள்...",
    exploreTab: "அதிசயங்களும் கதைகளும்",
    plannerTab: "பயணத் திட்டம்",
    itineraryTab: "பயணப்பாதை & வரைபடம்",
    homestaysTab: "பாரம்பரிய தங்குமிடங்கள்",
    heroBadge: "பயண வழிகாட்டி • இந்திய சுற்றுலா",
    heroTitle: "இந்தியாவின் அற்புதங்கள்",
    heroSub: "இயற்கை எழில் கொஞ்சும் மலைகள், ராஜ அரண்மனைகள் மற்றும் புனித கோயில்களை உங்கள் விருப்பத்திற்கேற்ப திட்டமிடுங்கள்.",
    natureTheme: "இயற்கை எழில்",
    spiritualTheme: "ஆன்மீகம் & புனிதம்",
    heritageTheme: "வரலாற்றுச் சிறப்பு",
    adventureTheme: "சாகசம் & வனவிலங்கு",
    allThemes: "அனைத்து வகைகள்",
    quickCircuit: "பிரபலமான பாதைகள்",
    stateLabel: "மாநிலம்",
    allStates: "அனைத்து மாநிலங்கள்",
    allSites: "அனைத்து இடங்கள்",
    iconic: "பிரபலமான இடங்கள்",
    hiddenGems: "மறைக்கப்பட்ட ரத்தினங்கள்",
    showingPlaces: "காட்டப்படும் இடங்கள்",
    destinations: "இடங்கள்",
    resetFilters: "வடிப்பான்களை மீட்டமைக்கவும்",
    listenStory: "கதை கேளுங்கள்",
    listenLore: "நாட்டுப்புறக் கதை & 360° பார்வை",
    stopNarration: "நிறுத்து",
    virtualTour: "360° மெய்நிகர் பயணம்",
    unfoldedLore: "மரபுசார் கதை ஏடு",
    audioPlaying: "ஆடியோ ஒலிக்கிறது...",
    oralHistoryFolklore: "வாய்மொழி நாட்டுப்புறக் கதைகள்",
    audioLanguage: "ஆடியோ மொழி",
    tamburaOn: "தம்பூரா இயங்குகிறது",
    tamburaMuted: "தம்பூரா முடக்கப்பட்டது",
    hiddenGem: "மறைக்கப்பட்ட ரத்தினம்",
    famousGem: "பிரபலமான ஈர்ப்பு",
    culturalMatch: "பொருத்தத்தின் அளவு",
    hostDialect: "உள்ளூர் மொழி",
    dietarySafety: "உணவுப் பாதுகாப்பு",
    bookNow: "முன்பதிவு செய்",
    exploreTitle: "இந்தியாவின் அதிசயங்களை அறியுங்கள்",
    exploreSub: "இந்தியாவின் கலாச்சாரம் மற்றும் அழகிய இடங்களை உங்கள் சொந்த மொழியில் அனுபவியுங்கள்.",
    plannerTitle: "பயணத் திட்டம்",
    plannerSub: "எந்தவொரு இந்திய மாநிலத்திற்கும் ஏற்றவாறு தனிப்பயனாக்கப்பட்ட பயணத்திட்டத்தை உருவாக்குங்கள்.",
    homestaysTitle: "சான்றளிக்கப்பட்ட பாரம்பரிய தங்குமிடங்கள்",
    homestaysSub: "உங்கள் உணவுப் பழக்கம் மற்றும் தாய்மொழிக்கு ஏற்ற உள்ளூர் இல்லங்களில் தங்குங்கள்.",
    confirmTrip: "பயணத்தை உறுதிசெய்",
    cancelTrip: "பயணத்தை ரத்து செய்",
    tripConfirmed: "பயணம் சேமிக்கப்பட்டது ✓",
    addPlace: "+ இடம் சேர்",
    editInPlanner: "திட்டத்தில் மாற்று",
    print: "அச்சிடுக",
    pacing: "வேகம்",
    viewDetails: "விவரங்களை காண்க",
    era: "காலம்",
    state: "மாநிலம்",
    languages: "மொழிகள்",
    readStory: "கதை வாசிக்கவும்",
    close: "மூடு",
    days: "நாட்கள்",
    totalDistance: "மொத்த தூரம்",
    travelTime: "பயண நேரம்",
    monuments: "இடங்கள்",
    startWizard: "வழிகாட்டியைத் தொடங்கு",
    previous: "முந்தைய",
    next: "அடுத்தது",
    generate: "பயணத்தை உருவாக்கு",
    rebuild: "மீண்டும் உருவாக்கு",
    activeTrip: "செயலில் உள்ள பயணம்",
    savedTrips: "சேமிக்கப்பட்ட பயணங்கள்",
    noSavedTrips: "பயணங்கள் எதுவும் சேமிக்கப்படவில்லை",
    noSavedTripsDesc: "பயணத் திட்டத்தில் புதிய பயணத்தை உருவாக்கி 'பயணத்தை உறுதிசெய்' என்பதை அழுத்தவும்.",
    viewRoute: "பாதை காண்க",
    natureLabel: "இயற்கை இடம்",
    spiritualLabel: "புனித தலம்",
    adventureLabel: "சாகச இடம்",
    lunchLabel: "உள்ளூர் உணவு",
    hotelLabel: "இரவு தங்குமிடம்",
    monumentLabel: "பாரம்பரிய தலம்"
  }
};

const baseMonuments: Monument[] = [
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 10.0889, lng: 77.0595 },
    folklore: {
      en: "Perched at 1,600m in the Western Ghats, Munnar's undulating emerald hills were historically known as the 'High Range'. Home to the endangered Nilgiri Tahr and the blooming Neelakurinji flower which covers hills in violet once every 12 years.",
      hi: "पश्चिमी घाट में 1,600 मीटर की ऊंचाई पर स्थित मुन्नार की हरी-भरी पहाड़ियां प्राकृतिक सुंदरता का स्वर्ग हैं। यहाँ दुर्लभ नीलगिरि तहर और 12 साल में खिलने वाला नीलकुरिंजी फूल पाया जाता है।",
      mr: "पश्चिम घाटात १,६०० मीटर उंचीवर वसलेली मुन्नारची चहाची हिरवीगार कुरणे निसर्गाचे अप्रतिम वरदान आहेत. येथे दुर्मिळ निलगिरी तहर आणि १२ वर्षांतून एकदा फुलणारे जांभळे नीलकुरिंजी फूल आढळते.",
      gu: "પશ્ચિમ ઘાટમાં ૧,૬૦૦ મીટરની ઊંચાઈએ આવેલું મુન્નાર લીલાછમ ચાના બગીચાઓ માટે પ્રખ્યાત છે. અહીં ૧૨ વર્ષમાં એકવાર ખીલતું નીલકુરિંજી ફૂલ પહાડોને જાંબલી રંગથી ઢાંકી દે છે.",
      bn: "পশ্চিম ঘাটের ১,৬০০ মিটার উঁচুতে অবস্থিত মুন্নারের চা বাগানগুলো প্রকৃতির অপরূপ সৃষ্টি। এখানে বিরল নীলগিরি তাহর এবং প্রতি ১২ বছরে একবার ফোটা নীলকুরিঞ্জি ফুল পাহাড়কে বেগুনি রঙে ভরিয়ে তোলে।",
      ta: "மேற்குத் தொடர்ச்சி மலையில் 1,600 மீட்டர் உயரத்தில் அமைந்துள்ள மூணாறின் தேயிலைத் தோட்டங்கள் இயற்கை எழில் கொஞ்சும் பகுதியாகும். 12 ஆண்டுகளுக்கு ஒருமுறை மலரும் நீலக்குறிஞ்சி மலர் இங்கு புகழ்பெற்றது."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 9.4981, lng: 76.3388 },
    folklore: {
      en: "A mesmerizing network of interconnected brackish lagoons, rivers, and canals fringed by swaying coconut palms. Traditional Kettuvallam houseboats gently cruise through serene waters where local villagers sustain centuries-old paddy farming below sea level.",
      hi: "नारियल के पेड़ों से घिरी झीलों, नहरों और नदियों का अद्भुत प्राकृतिक नेटवर्क। पारंपरिक हाउसबोट शांत पानी में तैरती हैं जहाँ समुद्र तल से नीचे खेती की प्राचीन परंपरा जीवित है।",
      mr: "नारळाच्या बागांनी वेढलेले शांत कालवे आणि खाजण पाण्याचा हा निसर्गरम्य परिसर आहे. पारंपारिक केट्टुवल्लम हाऊसबोटमधून प्रवास करताना स्थानिक संस्कृती आणि निसर्गाचा अद्वितीय संगम अनुभवता येतो.",
      gu: "નાળિયેરના વૃક્ષોથી ઘેરાયેલા શાંત સરોવરો અને નહેરોનું સુંદર નેટવર્ક. પરંપરાગત હાઉસબોટમાં બેસીને અલેપ્પીના શાંત જળપ્રવાહની મુસાફરી જીવનનો યાદગાર લહાવો છે.",
      bn: "নারকেল গাছে ঘেরা শান্ত হ্রদ ও খালের অপরূপ প্রাকৃতিক দৃশ্য। ঐতিহ্যবাহী হাউসবোটে চড়ে ভেম্বানাদ হ্রদের জলে ভ্রমণ পর্যটকদের এক অবিস্মরণীয় শান্তি এনে দেয়।",
      ta: "தென்னை மரங்கள் சூழ்ந்த அமைதியான காயல் நீர்ப்பரப்பில் பாரம்பரிய ஹவுஸ்போட் படகில் பயணம் செய்வது அலப்பியின் தனித்துவமான இயற்கை அனுபவமாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 10.2851, lng: 76.5698 },
    folklore: {
      en: "Surging down from a height of 80 feet, Athirappilly is India's most dramatic waterfall. Flowing through the dense riparian forests of the Anamudi range, it is home to four endangered hornbill species.",
      hi: "80 फीट की ऊंचाई से गिरता अतिरापिल्ली भारत का सबसे भव्य जलप्रपात है, जिसे 'भारत का नियाग्रा' कहा जाता है। यह घना वर्षावन दुर्लभ पक्षियों का घर है।",
      mr: "८० फूट उंचीवरून कोसळणारा अतिरापिल्ली धबधबा 'भारताचा नायगारा' म्हणून ओळखला जातो. शोलायरच्या घनदाट जंगलातून वाहणारा हा जलप्रपात मन थक्क करणारा आहे.",
      gu: "૮૦ ફૂટની ઊંચાઈએથી ગર્જના કરતો અતિરાપિલ્લી ધોધ 'ભારતનો નાયગ્રા' ગણાય છે. ચારેબાજુ ગાઢ જંગલો અને કુદરતી વન્યજીવોનું રમણીય વાતાવરણ છે.",
      bn: "৮০ ফুট উঁচু থেকে তীব্র গতিতে আছড়ে পড়া আথিরাप्पিল্লি জলপ্রপাতকে 'ভারতের নায়াগ্রা' বলা হয়। ঘন রেইনফরেস্টের মাঝে এর সৌন্দর্য অসাধারণ।",
      ta: "80 அடி உயரத்திலிருந்து ஆர்ப்பரித்துக் கொட்டும் அதிரப்பள்ளி நீர்வீழ்ச்சி 'இந்தியாவின் நயாகரா' என்று போற்றப்படுகிறது."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 26.9855, lng: 75.8513 },
    folklore: {
      en: "Perched high on the Aravalli hills overlooking Maota Lake. Famous for its Sheesh Mahal (Mirror Palace) where a single candle flame reflects across thousands of Belgian glass mirrors to illuminate the entire royal chamber.",
      hi: "आमेर का किला अपने शीश महल के लिए प्रसिद्ध है, जहाँ एक मोमबत्ती की रोशनी हजारों बेल्जियम शीशों में परावर्तित होकर पूरे राजसी कक्ष को जगमगा देती है।",
      mr: "आमेरचा किल्ला अरावली पर्वतावर माओटा तलावाकाठी दिमाखात उभा आहे. येथील शीश महालात एकाच मेणबत्तीच्या प्रकाशाने हजारो काचांमधून संपूर्ण महाल लखलखून उठतो.",
      gu: "આમેર કિલ્લો તેના અદ્ભુત શીશ મહેલ માટે વિશ્વવિખ્યાત છે, જ્યાં એક મીણબત્તી પ્રગટાવતાં હજારો બેલ્જિયન કાચમાં તેનું પ્રતિબિંબ પડી આખો મહેલ ઝળહળી ઊઠે છે.",
      bn: "জয়পুরের অম্বর দুর্গ তার অপূর্ব শীশ মহলের জন্য বিখ্যাত। এখানে একটি মাত্র মোমবাতি জ্বালালে হাজারো আয়নার প্রতিফলনে পুরো রাজকীয় কক্ষ আলোকিত হয়ে ওঠে।",
      ta: "ஆம்பர் கோட்டையின் கண்ணாடி மாளிகையில் (ஷீஷ் மஹால்) ஒரே ஒரு மெழுகுவர்த்தி ஏற்றினால் ஆயிரக்கணக்கான கண்ணாடிகளில் பிரதிபலித்து முழு அறையையும் ஒளிரச் செய்யும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 26.9124, lng: 70.9127 },
    folklore: {
      en: "One of the few fully functioning living forts in the world, where one-fourth of the old city's population still resides within golden sandstone walls that glow in the Thar desert sunlight.",
      hi: "थार मरुस्थल के बीच स्थित सोनार किला दुनिया के दुर्लभ जीवित किलों में से एक है, जहाँ आज भी प्राचीन शहर की एक-चौथाई आबादी इन सुनहरी दीवारों के भीतर रहती है।",
      mr: "जैसलमेरचा 'सोनार किल्ला' हा जगातील अशा मोजक्या जिवंत किल्ल्यांपैकी आहे, जिथे आजही नागरिक पिढ्यानपिढ्या राहतात. पिवळ्या वाळूच्या दगडात बांधलेला हा किल्ला सोन्यासारखा चमकतो.",
      gu: "થાર રણમાં આવેલો જેસલમેરનો સોનાર કિલ્લો વિશ્વના દુર્લભ જીવંત કિલ્લાઓમાંનો એક છે, જ્યાં આજે પણ લોકો વસવાટ કરે છે. સૂર્યપ્રકાશમાં આ કિલ્લો સોનાની જેમ ચમકે છે.",
      bn: "জয়সলমীরের সোনার কেল্লা পৃথিবীর অন্যতম জীবন্ত দুর্গ। থর মরুভূমির সোনালী বালিপাথরে তৈরি এই দুর্গের ভেতরে আজও হাজার হাজার মানুষ বাস করেন।",
      ta: "ஜெய்சல்மேரின் தங்கக் கோட்டை இன்றும் மக்கள் வாழும் உலக அதிசயக் கோட்டைகளில் ஒன்றாகும். பாலைவன சூரிய ஒளியில் இது தங்கம் போல் ஜொலிக்கிறது."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 26.8306, lng: 70.5100 },
    folklore: {
      en: "Miles of sweeping, wind-carved golden dunes in the Thar desert. Famous for sunset camel safaris and vibrant Kalbelia gypsy folk dance performances under starlit desert skies.",
      hi: "थार मरुस्थल के रेतीले टीले, जहाँ सूर्यास्त के समय ऊंट की सवारी और तारों भरी रात में कालबेलिया लोक नृत्य का मनमोहक अनुभव होता है।",
      mr: "थारच्या वाळवंटातील वाऱ्याने कोरलेले सोनेरी वाळूचे ढिगारे. येथे सूर्यास्ताची उंटावरची सफर आणि रात्रीच्या वेळी कालबेलिया लोकनृत्य हा अविस्मरणीय अनुभव आहे.",
      gu: "જેસલમેરના સામ સેન્ડ ડ્યુન્સ રણ સફારી માટે જાણીતા છે. સૂર્યાસ્ત સમયે ઊંટ સવારી અને રાત્રે રાજસ્થાની લોકનૃત્યનું અદ્ભુત વાતાવરણ સર્જાય છે.",
      bn: "থর মরুভূমির ঢেউ খেলানো বালিয়াড়ি, যেখানে সূর্যাস্তের উটের সাফারি এবং তারার নিচে রাজস্থানী লোকনৃত্য এক জাদুকরী অনুভূতি তৈরি করে।",
      ta: "தார் பாலைவனத்தின் மணல் குன்றுகளில் மாலையில் ஒட்டக சவாரி செய்வதும் இரவில் கிராமிய நடனங்களை ரசிப்பதும் மறக்க முடியாத அனுபவமாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 32.2965, lng: 78.0125 },
    folklore: {
      en: "Known as the 'Middle Land' between India and Tibet. Key Monastery sits atop a conical hill at 4,166m, holding ancient thangkas, manuscripts, and spiritual meditation caves amidst stark Himalayan peaks.",
      hi: "भारत और तिब्बत के बीच स्थित स्पीति घाटी में 4,166 मीटर की ऊंचाई पर की मठ ध्यान और शांति का अद्भुत केंद्र है, जहाँ प्राचीन पांडुलिपियाँ सुरक्षित हैं।",
      mr: "भारत आणि तिबेटच्या सीमेवरील स्पीती खोऱ्यात ४,१६६ मीटर उंचीवर 'की मठ' वसलेला आहे. हिमालयाच्या बर्फाच्छादित शिखरांमध्ये हा मठ आध्यात्मिक शांततेचे प्रतीक आहे.",
      gu: "સ્પીતિ ઘાટીમાં ૪,૧૬૬ મીટરની ઊંચાઈએ સ્થિત કી મોનેસ્ટ્રી બૌદ્ધ સંસ્કૃતિ અને આધ્યાત્મિક શાંતિનું પવિત્ર કેન્દ્ર છે.",
      bn: "হিমালয়ের ৪,১৬৬ মিটার উঁচুতে অবস্থিত স্পিতি উপত্যকার কী মনেস্ট্রি তিব্বতি বৌদ্ধধর্ম ও প্রাচীন পাণ্ডুলিপির এক শান্ত স্বর্গরাজ্য।",
      ta: "4,166 மீட்டர் உயரத்தில் இமயமலையில் அமைந்துள்ள ஸ்பிதி பள்ளத்தாக்கின் கீ மடாலயம் ஆன்மீக அமைதியின் உறைவிடமாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 32.3166, lng: 77.1581 },
    folklore: {
      en: "Surrounded by snow-capped peaks and cedar forests, Solang Valley offers exhilarating paragliding, skiing, and sweeping views of the Beas Kund glacier valley.",
      hi: "बर्फ से ढकी चोटियों और देवदार के जंगलों से घिरी सोलांग घाटी रोमांचक पैराग्लाइडिंग और स्कीइंग खेलों के लिए विश्वभर में जानी जाती है।",
      mr: "बर्फाच्छादित शिखरे आणि देवदार वृक्षांनी वेढलेली सोलांग व्हॅली पॅराग्लायडिंग आणि स्कीईंगसारख्या साहसी खेळांसाठी प्रसिद्ध आहे.",
      gu: "હિમાચલની સોલાંગ વેલી બરફથી છવાયેલા પહાડો વચ્ચે પેરાગ્લાઈડિંગ અને સ્કીઈંગ જેવા રોમાંચક સાહસો માટે શ્રેષ્ઠ સ્થળ છે.",
      bn: "তুষারাবৃত পাহাড় ও দেবদারু বনে ঘেরা সোলাং উপত্যকা প্যারাগ্লাইডিং এবং বরফের রোমাঞ্চকর অভিজ্ঞতার জন্য বিখ্যাত।",
      ta: "பனி படர்ந்த இமயமலை சிகரங்களின் நடுவே அமைந்துள்ள சோலாங் பள்ளத்தாக்கு பாராகிளைடிங் மற்றும் பனி சறுக்கு விளையாட்டுகளுக்கு பெயர் பெற்றது."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 30.1033, lng: 78.2948 },
    folklore: {
      en: "Where the sacred Ganges emerges from the Himalayas into the plains. Pilgrims gather at Triveni Ghat at dusk for the soul-stirring Maha Aarti, chanting mantras as floating oil lamps drift down emerald waters.",
      hi: "ऋषिकेश में त्रिवेणी घाट पर होने वाली संध्या गंगा आरती में तैरते दीप और वैदिक मंत्रोच्चार मन को असीम शांति प्रदान करते हैं।",
      mr: "ऋषिकेशच्या त्रिवेणी घाटावर होणारी संध्याकाळची महाआरती आणि गंगेच्या पात्रात तरंगणारे हजारो दिवे आत्म्याला परमशांती देतात.",
      gu: "ઋષિકેશમાં ત્રિવેણી ઘાટ પર થતી ભવ્ય ગંગા આરતી અને ગંગાજીના વહેતા જળમાં તરતા દીવાઓ અલૌકિક આધ્યાત્મિક શાંતિ અર્પે છે.",
      bn: "হিমালয়ের কোল ঘেঁষে হৃষীকেশের ত্রিবেণী ঘাটে সন্ধ্যার গঙ্গা আরতি এবং প্রদীপের আলোয় গঙ্গাবক্ষে এক দিব্য অনুভূতির সৃষ্টি হয়।",
      ta: "ரிஷிகேஷ் திரிவேணி படித்துறையில் மாலையில் நடைபெறும் கங்கா ஆரத்தியும் மிதக்கும் தீபங்களும் மனதிற்கு அமைதியையும் பக்தியையும் தருகின்றன."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 30.7280, lng: 79.6053 },
    folklore: {
      en: "A high-altitude Himalayan valley nestled at 3,600m that bursts into a kaleidoscope of over 500 species of wild alpine flowers including the mythical Brahma Kamal during monsoon.",
      hi: "हिमालय की गोद में बसी फूलों की घाटी में 500 से अधिक दुर्लभ जंगली फूलों और पौराणिक ब्रह्मकमल की प्राकृतिक छटा देखने को मिलती है।",
      mr: "उत्तराखंडमधील ३,६०० मीटर उंचीवर असलेली ही व्हॅली पावसाळ्यात ५०० पेक्षा जास्त दुर्मिळ रानफुलांनी आणि ब्रह्मकमळाने बहरून जाते.",
      gu: "ઉત્તરાખંડની ફૂલોની ખીણમાં ૫૦૦થી વધુ જાતના દુર્લભ જંગલી ફૂલો અને પવિત્ર બ્રહ્મકમળ ખીલે છે, જે સ્વર્ગ જેવો અનુભવ કરાવે છે.",
      bn: "উত্তরাখণ্ডের ভ্যালি অফ ফ্লাওয়ার্সে বর্ষাকালে ৫০০টিরও বেশি প্রজাতির দুর্লভ বুনো ফুল এবং পৌরাণিক ব্রহ্মকমল প্রস্ফুটিত হয়।",
      ta: "இமயமலையில் 3,600 மீட்டர் உயரத்தில் 500க்கும் மேற்பட்ட வண்ணமயமான காட்டு மலர்களும் பிரம்ம கமலமும் பூத்துக் குலுங்கும் இயற்கை அற்புதம்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 25.3109, lng: 83.0107 },
    folklore: {
      en: "Varanasi (Kashi) is believed to be one of the oldest continuously inhabited cities in human history. The golden spire of Kashi Vishwanath shines over the sacred Ganges alongside the grand Maha Aarti at Dashashwamedh Ghat.",
      hi: "भगवान शिव के त्रिशूल पर बसी काशी विश्व की सबसे प्राचीन जीवित आध्यात्मिक नगरी है, जहाँ दशाश्वमेध घाट की संध्या महाआरती दिव्य है।",
      mr: "काशी ही जगातील सर्वात प्राचीन आध्यात्मिक नगरी मानली जाते. काशी विश्वनाथाचे सुवर्ण शिखर आणि दशाश्वमेध घाटावरील गंगा महाआरती भक्तांना मंत्रमुग्ध करते.",
      gu: "ભગવાન શિવની પવિત્ર નગરી કાશી વિશ્વનાથ અને દશાશ્વમેઘ ઘાટની સાંજની મહાઆરતી આધ્યાત્મિક મોક્ષનો અનુભવ કરાવે છે.",
      bn: "বারাণসী বিশ্বের প্রাচীনতম জীবন্ত আধ্যাত্মিক শহর। কাশি বিশ্বনাথের স্বর্ণ মন্দির এবং দশাশ্বমেধ ঘাটের সান্ধ্য গঙ্গা আরতি অত্যন্ত পবিত্র।",
      ta: "காசி விஸ்வநாதர் கோயிலும் தசாசுவமேத படித்துறையில் நடைபெறும் மாபெரும் கங்கா ஆரத்தியும் ஆன்மீக முக்தியின் திருத்தலமாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 25.3811, lng: 83.0214 },
    folklore: {
      en: "Just 10 km from Varanasi, Sarnath is the sacred Deer Park where Gautama Buddha gave his first sermon after attaining enlightenment, setting in motion the Wheel of Dharma.",
      hi: "सारनाथ वह पावन स्थल है जहाँ भगवान बुद्ध ने ज्ञान प्राप्ति के बाद अपना पहला उपदेश दिया था और धर्म चक्र प्रवर्तन किया था।",
      mr: "सारनाथ येथे भगवान बुद्धांनी ज्ञानप्राप्तीनंतर पहिला उपदेश दिला होता आणि धम्मचक्र प्रवर्तन सुरू केले होते.",
      gu: "સારનાથ એ પવિત્ર સ્થળ છે જ્યાં ભગવાન બુદ્ધે જ્ઞાનપ્રાપ્તિ પછી તેમનો પ્રથમ ઉપદેશ આપ્યો હતો.",
      bn: "সারনাথের মৃগদাবে ভগবান বুদ্ধ বোধিলাভের পর তাঁর প্রথম ধর্মোপদেশ দিয়েছিলেন এবং ধর্মচক্র প্রবর্তন করেছিলেন।",
      ta: "புத்த பெருமான் ஞானம் பெற்ற பிறகு தனது முதல் போதனையை நிகழ்த்திய புனித பூமி சாரநாத் ஆகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 23.8589, lng: 72.1017 },
    folklore: {
      en: "Built by Queen Udayamati in memory of King Bhimdev I. Resembling an inverted temple honoring water, it has seven levels of stairs with over 500 principal sculptures.",
      hi: "रानी की वाव का निर्माण रानी उदयमती ने अपने पति राजा भीमदेव प्रथम की स्मृति में करवाया था। यह 7 मंजिला जल मंदिर शिल्प कला का बेजोड़ नमूना है।",
      mr: "पाटणची 'राणी की वाव' ही भूगर्भातील सात मजली पायऱ्यांची विहीर आहे, ज्यामध्ये ५०० हून अधिक अप्रतिम शिल्पे कोरलेली आहेत.",
      gu: "પાટણની રાણકી વાવ રાણી ઉદયમતીએ રાજા ભીમદેવ પહેલાની યાદમાં બંધાવી હતી. ૭ માળની આ વાવ જળ મંદિર સમાન છે અને તેમાં ૫૦૦થી વધુ શિલ્પો છે.",
      bn: "রানি কি ভাব গুজরাটের পাটনে অবস্থিত একটি অনন্য ৭ তলা ভূগর্ভস্থ সিঁড়িযুক্ত কূপ, যা জল সংরক্ষণ ও ভাস্কর্য শিল্পের অপূর্ব নিদর্শন।",
      ta: "ராணி கி வாவ் என்பது 11 ஆம் நூற்றாண்டில் கட்டப்பட்ட 7 அடுக்கு நிலத்தடி படிக்கிணறு ஆகும். இதில் 500க்கும் மேற்பட்ட சிற்பங்கள் உள்ளன."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 23.5835, lng: 72.1330 },
    folklore: {
      en: "Dedicated to the Sun God Surya on the banks of Pushpavati River. Built so that equinox solar rays struck the deity's gemmed crown directly. Features the stunning Surya Kunda stepped tank.",
      hi: "पुष्पावती नदी के तट पर स्थित मोढेरा सूर्य मंदिर ऐसा निर्मित है कि विषुव के दिन सूर्य की पहली किरण सीधे गर्भगृह में मूर्ति पर पड़ती थी।",
      mr: "मोढेराचे सूर्य मंदिर खगोलशास्त्रीय दृष्टीने अत्यंत अचूक बांधलेले आहे. विषुववृत्ताच्या दिवशी सूर्यकिरण थेट मूर्तीवर पडत असत.",
      gu: "મોઢેરાનું સૂર્યમંદિર પુષ્પાવતી નદીના કિનારે આવેલું છે. અહીં સૂર્યકુંડ અને ૫૨ સ્તંભો પરની નકશીકામ સ્થાપત્યકળાની ઉત્કૃષ્ટ મિશાલ છે.",
      bn: "মোঢেরা সূর্য মন্দির এমনভাবে নির্মিত যে বিষুবের দিনে সূর্যের প্রথম রশ্মি সরাসরি গর্ভগৃহে সূর্যের বিগ্রহকে আলোকিত করত।",
      ta: "மோதேரா சூரியன் கோயில் சூரியக் கதிர்கள் நேரடியாக கருவறையில் விழும் வண்ணம் கட்டப்பட்ட வானியல் சிறப்புமிக்க கோயிலாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 15.3358, lng: 76.4564 },
    folklore: {
      en: "Continuously active since the 7th century, featuring a 49-meter Gopuram. Known for its pinhole camera inverted shadow effect and sacred Tungabhadra riverfront architecture.",
      hi: "7वीं शताब्दी से लगातार सक्रिय विरूपाक्ष मंदिर अपने 49 मीटर ऊंचे गोपुरम और पिनहोल कैमरा छाया प्रभाव के लिए विख्यात है।",
      mr: "हम्पीचे विरूपाक्ष मंदिर ७ व्या शतकापासून आजतागायत नित्यपूजेत सक्रिय आहे. तुंगभद्रा नदीकाठचा हा परिसर विजयनगर साम्राज्याचे वैभव दर्शवतो.",
      gu: "હમ્પીનું વિરૂપાક્ષ મંદિર ૭મી સદીથી અવિરત પૂજાતું શિવ મંદિર છે, જે તેના ૪૯ મીટર ઊંચા ગોપુરમ માટે પ્રખ્યાત છે.",
      bn: "হাম্পির বিরূপাক্ষ মন্দির ৭ম শতাব্দী থেকে অবিচ্ছিন্নভাবে পূজিত হয়ে আসছে। এর ৪৯ মিটার উঁচু গোপুরম বিজয়নগর সাম্রাজ্যের সাক্ষ্য বহন করে।",
      ta: "7 ஆம் நூற்றாண்டிலிருந்து தொடர்ந்து செயல்படும் விருபாக்ஷா கோயில் துங்கபத்ரா நதிக்கரையில் அமைந்துள்ள விஜயநகர பேரரசின் பெருமையாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 15.3428, lng: 76.4772 },
    folklore: {
      en: "Iconic granite shrine dedicated to Garuda. Surrounding hall features 56 musical pillars that produce musical notes (swaras) when tapped gently.",
      hi: "हम्पी का प्रसिद्ध पत्थर का रथ गरुड़ को समर्पित है। इसके विट्ठल मंदिर में 56 संगीतमय स्तंभ हैं जो थपथपाने पर सुर उत्पन्न करते हैं।",
      mr: "विठ्ठल मंदिरातील दगडी रथ आणि संगीत निर्माण करणारे ५६ संगीतमय खांब विजयनगरच्या स्थापत्यकलेचे आश्चर्य आहेत.",
      gu: "હમ્પીનો સુપ્રસિદ્ધ પથ્થરનો રથ અને સંગીતમય ૫૬ સ્તંભો જેમાંથી સૂર નીકળે છે તે સ્થાપત્યકળાની અજોડ કમાલ છે.",
      bn: "হাম্পির গ্রানাইট পাথরের রথ এবং ৫৬টি সংগীত স্তম্ভ, যেগুলোতে মৃদু আঘাত করলে সুর তৈরি হয়, প্রাচীন ভারতীয় প্রযুক্তির বিস্ময়।",
      ta: "ஹம்பியின் புகழ்பெற்ற கல் ரதமும் தட்டினால் இசைக்குறிப்புகளை எழுப்பும் 56 இசைத் தூண்களும் திராவிட கட்டிடக்கலையின் உச்சமாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 15.2678, lng: 76.5411 },
    folklore: {
      en: "Spread across rugged granite boulders, Daroji is Asia's first exclusive sloth bear sanctuary. Watch wild bears foraging on cliff sides from watchtowers.",
      hi: "ग्रेनाइट चट्टानों के बीच बसा दरोजी अभयारण्य एशिया का पहला भालू संरक्षण क्षेत्र है, जहाँ प्राकृतिक वातावरण में भालू विचरण करते हैं।",
      mr: "दरोजी हे आशियातील पहिले अस्वल अभयारण्य आहे, जिथे खडकाळ टेकड्यांवर अस्वल नैसर्गिक अधिवासात मुक्तपणे फिरतात.",
      gu: "ગ્રેનાઈટ પથ્થરો વચ્ચે આવેલું દરોજી રીંછ અભયારણ્ય એશિયાનું પ્રથમ વિશિષ્ટ રીંછ સંરક્ષણ ક્ષેત્ર છે.",
      bn: "দারোজি অভয়ারণ্য এশিয়ার প্রথম ভাল্লুক সংরক্ষণ কেন্দ্র, যেখানে পাথুরে পাহাড়ের গুহায় বন্য ভাল্লুকদের অবাধ বিচরণ দেখা যায়।",
      ta: "பாறை குன்றுகளுக்கு இடையே அமைந்துள்ள தரோஜி கரடி சரணாலயம் ஆசியாவின் முதல் பிரத்யேக கரடி சரணாலயமாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 25.2476, lng: 91.6738 },
    folklore: {
      en: "Grown over generations by the indigenous Khasi tribe using the aerial roots of Ficus elastica trees across roaring jungle streams. These living bridges grow stronger with time and can support dozens of people.",
      hi: "खासी जनजाति द्वारा जीवित पेड़ों की जड़ों से बनाए गए ये अद्भुत प्राकृतिक पुल समय के साथ और अधिक मजबूत होते जाते हैं।",
      mr: "मेघालयातील खासी जमातीने जिवंत झाडांच्या मुळांपासून तयार केलेले हे नैसर्गिक पूल शतकानुशतके मजबूत राहतात आणि निसर्गाचे आश्चर्य मानले जातात.",
      gu: "મેઘાલયના ખાસી આદિવાસીઓ દ્વારા ઝાડના જીવંત મૂળિયાંથી ગૂંથીને બનાવેલા આ પુલ સમય સાથે વધુ મજબૂત બને છે.",
      bn: "মেঘালয়ের খাসি উপজাতিরা ডুমুর গাছের জীবন্ত শিকড় দিয়ে এই ঝুলন্ত সেতু তৈরি করেছেন, যা সময়ের সাথে সাথে আরও শক্ত হয়।",
      ta: "மேகாலயாவின் காசி பழங்குடியினரால் மரத்தின் உயிருள்ள வேர்களைக் கொண்டு உருவாக்கப்பட்ட இந்த இயற்கை பாலங்கள் காலப்போக்கில் மேலும் பலமடைகின்றன."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 25.1878, lng: 92.0163 },
    folklore: {
      en: "Famous for emerald crystal-clear waters where traditional wooden boats appear to float on glass as riverbeds and pebbles are visible metres below the surface.",
      hi: "उमंगोट नदी का पानी इतना पारदर्शी और कांच जैसा साफ है कि नावें हवा में तैरती हुई प्रतीत होती हैं।",
      mr: "दावकी येथील उमंगोत नदीचे पाणी इतके स्वच्छ आणि पारदर्शक आहे की बोट हवेत तरंगत असल्याचा भास होतो.",
      gu: "દાવકીની ઉમંગોત નદીનું પાણી કાચ જેવું પારદર્શક છે જેથી નાવ જાણે હવામાં તરતી હોય તેવો અદ્ભુત ભાસ થાય છે.",
      bn: "ডাউকির উমঙ্গোট নদীর জল কাঁচের মতো স্বচ্ছ, যার ওপর নৌকা চালালে মনে হয় নৌকাটি যেন শূন্যে ভাসছে।",
      ta: "டாவ்கி உம்ங்கோட் நதியின் நீர் கண்ணாடி போல் தெளிவானது, இதில் படகுகள் அந்தரத்தில் மிதப்பது போல் தோன்றும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 9.9195, lng: 78.1193 },
    folklore: {
      en: "Dedicated to Goddess Meenakshi (Parvati) and Lord Sundareswarar. The temple complex has 14 monumental gateway towers adorned with thousands of colorful sculpted deities and celestial beings.",
      hi: "मदुरै का मीनाक्षी अम्मन मंदिर द्रविड़ वास्तुकला का अनुपम उदाहरण है, जिसमें 14 विशाल बहुरंगी गोपुरम और सहस्र स्तंभ मंडप हैं।",
      mr: "मदुराईचे मीनाक्षी अम्मन मंदिर हे १४ भव्य गोपुरांसह द्रविड स्थापत्यकलेचे वैभवशाली प्रतीक आहे.",
      gu: "મદુરાઈનું મીનાક્ષી અમ્મન મંદિર તેના ૧૪ રંગબેરંગી ઊંચા ગોપુરમ અને અદ્ભુત શિલ્પકળા માટે વિશ્વભરમાં પ્રખ્યાત છે.",
      bn: "মাদুরাইয়ের মীনাক্ষী আম্মান মন্দির ১৪টি সুবিশাল রঙিন গোপুরম নিয়ে গঠিত দ্রাবিড় স্থাপত্যের এক অনুপম নিদর্শন।",
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 9.2881, lng: 79.3174 },
    folklore: {
      en: "Located on Pamban Island, this sacred Char Dham temple has the world's longest pillared corridor stretching over 1,200 meters with intricately sculpted sandstone pillars.",
      hi: "रामेश्वरम का रामनाथस्वामी मंदिर 1,200 मीटर लंबे दुनिया के सबसे बड़े स्तंभ गलियारे और 22 पवित्र तीर्थ कुंडों के लिए विख्यात है।",
      mr: "रामेश्वरम येथील रामनाथस्वामी मंदिरात जगातील सर्वात लांब १,२०० मीटरचा भव्य स्तंभ कॉरिडोअर आहे.",
      gu: "રામેશ્વરમનું રામનાથસ્વામી મંદિર વિશ્વના સૌથી લાંબા ૧,૨૦૦ મીટર લાંબા થાંભલાવાળા કોરિડોર માટે જાણીતું પવિત્ર ચારધામ સ્થળ છે.",
      bn: "রামেশ্বরমের রামনাথস্বামী মন্দিরে বিশ্বের দীর্ঘতম ১,২০০ মিটারের স্তম্ভযুক্ত করিডোর রয়েছে যা ভাস্কর্যের অপূর্ব নিদর্শন।",
      ta: "ராமேஸ்வரம் ராமநாதசுவாமி கோயில் உலகின் மிக நீளமான 1,200 மீட்டர் தூண் தாழ்வாரத்தைக் கொண்ட புனித தலமாகும்."
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
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 15.3144, lng: 74.3143 },
    folklore: {
      en: "Surging down 310 meters through dense Western Ghats jungle, Dudhsagar literally means 'Sea of Milk' as frothy white waters cascade over railway arches in the rainforest.",
      hi: "दूधसागर जलप्रपात 310 मीटर की ऊंचाई से गिरता है, जिसका सफेद झागदार पानी दूध की धारा जैसा दिखता है।",
      mr: "३१० मीटर उंचीवरून कोसळणारा दूधसागर धबधबा पश्चिम घाटातील दाट जंगलात पांढऱ्या दुधासारखा फेसाळत वाहतो.",
      gu: "દૂધસાગર ધોધ ૩૧૦ મીટરની ઊંચાઈએથી દૂધની જેમ સફેદ ફીણ સાથે નીચે પડે છે, જે ગોવાના જંગલોનું અદ્ભુત આકર્ષણ છે.",
      bn: "দুধসাগর জলপ্রপাত ৩১০ মিটার উঁচু থেকে ঘন বনের ভেতর দিয়ে দুধের মতো সাদা ফেনার ধারায় নেমে আসে।",
      ta: "310 மீட்டர் உயரத்திலிருந்து காடுகளின் வழியே பால் போல் பொங்கி வழியும் தூத்சாகர் நீர்வீழ்ச்சி கோவாவின் இயற்கை அதிசயமாகும்."
    }
  },
  // 11. DELHI (IMPERIAL HERITAGE & ARCHITECTURE)
  {
    id: "qutub_minar",
    name: "Qutub Minar & Mehrauli Heritage Complex",
    state: "Delhi",
    era: "Mamluk Delhi Sultanate (1192 AD)",
    category: "heritage",
    subCategory: "UNESCO 73m Fluted Victory Minaret",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 28.5245, lng: 77.1855 },
    folklore: {
      en: "Standing at 72.5 meters, Qutub Minar is the world's tallest brick minaret. Nearby stands the 1,600-year-old rust-resistant Iron Pillar of Chandragupta II which has defied corrosion for centuries.",
      hi: "72.5 मीटर ऊंचा कुतुब मीनार दुनिया का सबसे ऊंचा ईंटों का मीनार है। पास ही 1600 साल पुराना लौह स्तंभ बिना जंग लगे प्राचीन भारतीय धातु विज्ञान का रहस्य समेटे खड़ा है।",
      mr: "७२.५ मीटर उंच कुतुब मिनार ही जगातील विटांची सर्वात उंच इमारत आहे. जवळच असलेला १६०० वर्षे जुना लोहस्तंभ आजही गंज न चढता उभा आहे.",
      gu: "૭૨.૫ મીટર ઊંચો કુતુબ મિનાર વિશ્વનો સૌથી ઊંચો ઈંટોનો મિનાર છે. નજીકમાં ૧૬૦૦ વર્ષ જૂનો લોહસ્તંભ કાટ લાગ્યા વિના અડીખમ ઊભો છે.",
      bn: "৭২.৫ মিটার উঁচু কুতুব মিনার পৃথিবীর সবচেয়ে উঁচু ইটের তৈরি মিনার। এর পাশেই রয়েছে মরিচাহীন ১৬০০ বছরের প্রাচীন লৌহস্তম্ভ।",
      ta: "72.5 மீட்டர் உயரமுள்ள குதுப் மினார் உலகின் மிக உயரமான செங்கல் கோபுரமாகும். இதன் அருகே துருப்பிடிக்காத 1600 ஆண்டுகள் பழமையான இரும்புத்தூண் உள்ளது."
    }
  },
  {
    id: "red_fort_delhi",
    name: "Red Fort & Chandni Chowk Heritage Bazaar",
    state: "Delhi",
    era: "Mughal Empire Shah Jahan (1638 AD)",
    category: "heritage",
    subCategory: "UNESCO Red Sandstone Citadel",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 28.6562, lng: 77.2410 },
    folklore: {
      en: "The grand seat of Mughal emperors built from red sandstone along the Yamuna River. Its Lahori Gate leads to the historic alleys and spice aromas of Old Delhi's Chandni Chowk.",
      hi: "लाल बलुआ पत्थर से बना लाल किला मुगल सम्राटों का भव्य सत्ता केंद्र था। इसका लाहौरी गेट पुरानी दिल्ली के ऐतिहासिक चांदनी चौक और मसालों की गलियों से जोड़ता है।",
      mr: "लाल वाळूच्या दगडात बांधलेला लाल किल्ला मुघल साम्राज्याचे भव्य केंद्र होता. येथूनच जुनी दिल्लीतील ऐतिहासिक चांदणी चौक सुरू होतो.",
      gu: "લાલ કિલ્લો મુઘલ શાસનનું મુખ્ય કેન્દ્ર હતો. તેના લાહોરી ગેટ પાસે જૂની દિલ્હીનો ઐતિહાસિક ચાંદની ચોક બજાર આવેલો છે.",
      bn: "লাল বেলেপাথরের তৈরি লাল কেল্লা মুঘল সাম্রাজ্যের প্রধান দুর্গ ছিল। এর সামনেই রয়েছে চাঁদনী চকের ঐতিহাসিক মসলার বাজার।",
      ta: "செங்கோட்டை முகலாய சாம்ராஜ்யத்தின் தலைசிறந்த கோட்டையாகும். இதன் அருகே புகழ்பெற்ற சாந்தினி சவுக் சந்தை அமைந்துள்ளது."
    }
  },
  {
    id: "humayun_tomb",
    name: "Humayun's Tomb & Sunder Nursery",
    state: "Delhi",
    era: "Early Mughal Architecture (1570 AD)",
    category: "heritage",
    subCategory: "UNESCO Garden Tomb Prototype",
    isOffbeat: true,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 28.5933, lng: 77.2507 },
    folklore: {
      en: "The first monumental garden-tomb in the Indian subcontinent and architectural precursor to the Taj Mahal. Surrounding Persian Charbagh water gardens create serene symmetry.",
      hi: "भारतीय उपमहाद्वीप का पहला चारबाग मकबरा, जिसने आगे चलकर ताजमहल की वास्तुकला को प्रेरित किया। इसके शांत बगीचे अत्यंत मनमोहक हैं।",
      mr: "हुमायूनचा मकबरा ही ताजमहालाची पूर्वगामी वास्तू मानली जाते. चारबाग पद्धतीचे सुंदर बगीचे या परिसराचे सौंदर्य वाढवतात.",
      gu: "હુમાયુનો મકબરો તાજમહલની સ્થાપત્ય કલાનો પ્રેરણાસ્રોત છે. ચારબાગ શૈલીના બગીચાઓ અહીં શાંતિ પ્રદાન કરે છે.",
      bn: "হুমায়ূনের সমাধি তাজমহলের নকশার প্রধান অনুপ্রেরণা ছিল। সুন্দর চারবাগ বাগানে ঘেরা এই স্মৃতিসৌধ এক পরম শান্তির স্থান।",
      ta: "ஹுமாயூன் கல்லறை தாஜ்மஹாலின் முன்னோடி வடிவமாகும். பாரசீக முறையில் அமைக்கப்பட்ட பூங்காக்கள் இதன் அழகைக் கூட்டுகின்றன."
    }
  },
  {
    id: "lotus_akshardham",
    name: "Akshardham & Lotus Temple",
    state: "Delhi",
    era: "Modern Sacred Marvels",
    category: "spiritual",
    subCategory: "Pink Sandstone Sanctum & Bahai Sanctuary",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1599818981295-a22ff5070ce4?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1599818981295-a22ff5070ce4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 28.6127, lng: 77.2773 },
    folklore: {
      en: "A monumental pink sandstone temple dedicated to Swaminarayan showcasing Indian art, traditions, and values with musical fountains, paired with the blooming white marble Lotus Temple.",
      hi: "गुलाबी बलुआ पत्थर से बना स्वामीनारायण अक्षरधाम मंदिर और श्वेत संगमरमर का लोटस टेंपल आधुनिक भारत के अद्भुत आध्यात्मिक प्रतीक हैं।",
      mr: "अक्षरधाम मंदिर आणि कमळाच्या आकाराचे लोटस टेंपल ही दिल्लीची आधुनिक आध्यात्मिक आश्चर्ये आहेत.",
      gu: "ગુલાબી પથ્થરોથી કંડારેલું ભવ્ય સ્વામિનારાયણ અક્ષરધામ મંદિર અને સફેદ કમળ આકારનું લોટસ ટેમ્પલ અદ્ભુત શાંતિ આપે છે.",
      bn: "গোলাপী বেলেপাথরে তৈরি অক্ষরধাম মন্দির এবং শ্বেতপাথরের পদ্মমন্দির দিল্লির অন্যতম সেরা আধ্যাত্মিক কেন্দ্র।",
      ta: "சுவாமிநாராயண் அக்ஷர்தாம் கோயிலும் தாமரை வடிவ லோட்டஸ் கோயிலும் நவீன இந்தியாவின் ஆன்மீக அற்புதங்களாகும்."
    }
  },

  // 12. PUNJAB (GOLDEN TEMPLE & SACRED SHRINES)
  {
    id: "golden_temple",
    name: "Sri Harmandir Sahib (Golden Temple)",
    state: "Punjab",
    era: "Sikh Gurus Period (1588 AD)",
    category: "spiritual",
    subCategory: "Golden Sanctum & Amrit Sarovar",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599818981295-a22ff5070ce4?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 31.6200, lng: 74.8765 },
    folklore: {
      en: "The holiest Gurdwara of Sikhism surrounded by the sacred Amrit Sarovar pool. Renowned for serving over 100,000 free meals daily in the world's largest community kitchen (Langar) with open doors to all humanity.",
      hi: "अमृत सरोवर के बीच स्थित स्वर्ण मंदिर सिख धर्म का सबसे पावन स्थल है। यहाँ का लंगर दुनिया का सबसे बड़ा सामुदायिक भोजनालय है जहाँ प्रतिदिन लाखों लोग भोजन करते हैं।",
      mr: "अमृत सरोवराच्या मध्यभागी वसलेले सुवर्ण मंदिर हे शिख धर्माचे पवित्र तीर्थस्थान असून येथे जगातील सर्वात मोठा लंगर चालवला जातो.",
      gu: "અમૃત સરોવર વચ્ચે આવેલું સ્વર્ણ મંદિર શિખ ધર્મનું પરમ પવિત્ર તીર્થ છે, જ્યાં વિશ્વનો સૌથી મોટો નિઃશુલ્ક લંગર ચાલે છે.",
      bn: "অমৃত সরোবরের মাঝে অবস্থিত স্বর্ণমন্দির শিখ ধর্মের পবিত্রতম তীর্থস্থান। এর মহালঙ্গরে প্রতিদিন লক্ষাধিক ভক্তকে বিনামূল্যে সেবা করা হয়।",
      ta: "அமிர்தசரஸ் பொற்கோயில் சீக்கியர்களின் புனித தலமாகும். இங்குள்ள உலகின் மிகப்பெரிய லங்கர் அன்னதான கூடம் அனைவருக்கும் உணவளிக்கிறது."
    }
  },
  {
    id: "wagah_border",
    name: "Wagah Border & Jallianwala Bagh",
    state: "Punjab",
    era: "National Pride & Freedom Struggle",
    category: "heritage",
    subCategory: "Beating Retreat & Historic Memorial",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 31.6047, lng: 74.5714 },
    folklore: {
      en: "Witness the electrifying daily Beating Retreat flag-lowering ceremony at the India-Pakistan border, coupled with the solemn historic memorial at Jallianwala Bagh.",
      hi: "भारत-पाकिस्तान सीमा पर वाघा बॉर्डर की देशभक्ति से भरी बीटिंग रिट्रीट सेरेमनी और जलियांवाला बाग का ऐतिहासिक स्मारक अमर बलिदान की गाथा सुनाते हैं।",
      mr: "वाघा सीमेवरील बीटिंग रिट्रीट सोहळा आणि जालियनवाला बागेचे ऐतिहासिक स्मारक राष्ट्रभक्तीची प्रेरणा देतात.",
      gu: "વાઘા બોર્ડર પર દરરોજ યોજાતી બીટિંગ રિટ્રીટ પરેડ અને જલિયાંવાલા બાગનું સ્મારક દેશભક્તિનો રોમાંચ જગાવે છે.",
      bn: "ওয়াঘা সীমান্তে প্রতিদিনের বিটিং রিট্রিট প্যারেড এবং জালিয়ানওয়ালাবাগের ঐতিহাসিক স্মৃতিসৌধ দেশপ্রেমের প্রতীক।",
      ta: "வாகா எல்லையில் நடைபெறும் கொடியிறக்கும் அணிவகுப்பும் ஜாலியன்வாலாபாக் நினைவிடமும் தேசபக்தியை ஊட்டும் வரலாற்று தலங்களாகும்."
    }
  },

  // 13. MAHARASHTRA (CAVES & HERITAGE)
  {
    id: "ajanta_ellora",
    name: "Ajanta & Ellora Rock-Cut Caves",
    state: "Maharashtra",
    era: "Rashtrakuta & Vakataka Dynasties (2nd BCE - 10th CE)",
    category: "heritage",
    subCategory: "UNESCO Kailasa Monolithic Temple",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1600100398055-124e57517984?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600100398055-124e57517984?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608958416710-bb2bb4debd59?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626014303757-6ec664279216?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 20.0268, lng: 75.1790 },
    folklore: {
      en: "Carved entirely out of a single basalt cliff face from top to bottom, Cave 16 (Kailasa Temple) in Ellora is the largest monolithic rock sculpture on Earth, featuring Buddhist, Hindu, and Jain sanctuaries.",
      hi: "एलोरा का कैलाश मंदिर एक ही विशाल चट्टान को ऊपर से नीचे तराश कर बनाया गया दुनिया का सबसे बड़ा एकाश्म मंदिर है।",
      mr: "एलोराचे कैलास मंदिर हे एकाच अखंड खडकातून वरून खाली कोरलेले जगातील सर्वात मोठे स्थापत्य आश्चर्य आहे.",
      gu: "ઈલોરાનું કૈલાસ મંદિર એક જ વિશાળ ખડકમાંથી કંડારાયેલું વિશ્વનું સૌથી મોટું એકાશ્મ શિલ્પ સ્થાપત્ય છે.",
      bn: "ইলোরার কৈলাশ মন্দির একটিমাত্র বিশালাকার পাথর কেটে উপর থেকে নিচে তৈরি করা পৃথিবীর বৃহত্তম স্থাপত্য।",
      ta: "எல்லோராவின் கைலாச கோயில் ஒரே பாறையை மேலிருந்து கீழாக செதுக்கி உருவாக்கப்பட்ட உலகின் மிகப்பெரிய ஒற்றைக்கல் கோயிலாகும்."
    }
  },

  // 14. ODISHA (COASTAL SUN TEMPLES)
  {
    id: "konark_sun",
    name: "Konark Sun Temple & Chandrabhaga Beach",
    state: "Odisha",
    era: "Eastern Ganga Dynasty (1250 AD)",
    category: "heritage",
    subCategory: "UNESCO Colossal Solar Chariot",
    isOffbeat: false,
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608958416710-bb2bb4debd59?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600100398055-124e57517984?auto=format&fit=crop&w=800&q=80"
    ],
    languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
    coordinates: { lat: 19.8876, lng: 86.0945 },
    folklore: {
      en: "Designed in the shape of Surya's colossal chariot with 24 carved stone wheels that function as precise sundials pulled by seven galloping horses.",
      hi: "सूर्य देव के 24 पहियों वाले विशाल रथ के रूप में निर्मित कोणार्क सूर्य मंदिर के पहिए आज भी सूर्य की रोशनी से सटीक समय बताते हैं।",
      mr: "कोणार्कचे सूर्य मंदिर हे २४ चाके आणि ७ घोड्यांच्या भव्य रथाच्या आकारात कोरलेले असून येथील चाके अचूक सूर्यघड्याळ म्हणून काम करतात.",
      gu: "કોણાર્કનું સૂર્ય મંદિર ૨૪ કલાત્મક પૈડાંવાળા ભવ્ય રથ સ્વરૂપે કંડારાયેલું છે જે સૂર્યના તડકાથી ચોક્કસ સમય દર્શાવે છે.",
      bn: "কোনোরকের সূর্য মন্দির সূর্যের ২৪ চাকার বিশাল রথের আকারে নির্মিত, যার পাথরের চাকাগুলো আজও নির্ভুল সময় দেখায়।",
      ta: "கோனார்க் சூரிய கோயில் 24 சக்கரங்கள் கொண்ட சூரியனின் தேர் வடிவில் செதுக்கப்பட்ட பிரம்மாண்ட கட்டிடக்கலை அற்புதமாகும்."
    }
  }
];

// Merge loaded regional JSON places with baseline curated monuments (deduplicated by ID)
const allMonumentsMap = new Map<string, Monument>();
for (const m of regionalJsonMonuments) {
  allMonumentsMap.set(m.id, m);
}
for (const m of baseMonuments) {
  allMonumentsMap.set(m.id, m);
}

export const monuments: Monument[] = Array.from(allMonumentsMap.values());

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
    id: "kerala",
    title: "3-Day Kerala Nature & Backwaters Circuit",
    category: "nature",
    region: "Kerala",
    duration: 3,
    pacing: "Relaxed",
    siteMix: "80% Nature / 20% Cultural",
    stats: {
      totalDistance: "210 km",
      travelTime: "5.5 hours total driving",
      monumentsCount: 4
    },
    culturalFilter: {
      category: "nature",
      dietary: "pureVeg",
      language: "Tamil",
      interests: ["Nature", "Backwaters", "Tea Plantations", "Waterfalls"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        stops: [
          {
            id: "k1",
            time: "09:30 AM",
            type: "nature",
            title: "Munnar Tea Valleys & Mattupetty",
            desc: "Morning walk through undulating emerald tea gardens and mist-covered reservoirs.",
            monumentId: "munnar_tea",
            duration: "3 hours",
            lat: 10.0889,
            lng: 77.0595
          },
          {
            id: "k1-transit",
            time: "01:00 PM",
            type: "lunch",
            title: "Traditional Kerala Sadya Lunch",
            desc: "Authentic feast served on banana leaf with parboiled red rice and coconut delicacies.",
            duration: "1.5 hours"
          },
          {
            id: "k2",
            time: "03:30 PM",
            type: "nature",
            title: "Athirappilly Waterfalls",
            desc: "Majestic sunset view of the 80-foot roaring cascades in the Sholayar rainforest.",
            monumentId: "athirappilly_falls",
            duration: "2.5 hours",
            lat: 10.2851,
            lng: 76.5698
          },
          {
            id: "k1-hotel",
            time: "07:30 PM",
            type: "hotel",
            title: "Cloud Valley Tea Estate Homestay",
            desc: "Overnight stay with organic cardamom tea tasting and host storytelling.",
            duration: "Overnight"
          }
        ]
      },
      {
        day: 2,
        date: "Day 2",
        stops: [
          {
            id: "k3",
            time: "10:00 AM",
            type: "nature",
            title: "Alleppey Backwaters & Vembanad",
            desc: "Private traditional Kettuvallam boat cruise gliding through tranquil village canals.",
            monumentId: "alleppey_backwaters",
            duration: "4 hours",
            lat: 9.4981,
            lng: 76.3388
          },
          {
            id: "k2-transit",
            time: "02:30 PM",
            type: "lunch",
            title: "Lakeside Pure Vegetarian Lunch",
            desc: "Fresh coconut water, steamed Appam with vegetable stew, and tapioca curry.",
            duration: "1.5 hours"
          },
          {
            id: "k2-hotel",
            time: "06:30 PM",
            type: "hotel",
            title: "Alleppey Heritage Water Villa",
            desc: "Relaxing evening watching sunset reflections on Vembanad lake.",
            duration: "Overnight"
          }
        ]
      },
      {
        day: 3,
        date: "Day 3",
        stops: [
          {
            id: "k4",
            time: "09:00 AM",
            type: "nature",
            title: "Marari Serene Beach & Coir Weaving",
            desc: "Quiet palm-fringed coast with demonstrations of sustainable village coir spinning.",
            duration: "3 hours",
            lat: 9.6000,
            lng: 76.3000
          },
          {
            id: "k3-transit",
            time: "01:30 PM",
            type: "lunch",
            title: "Spiced Kerala Payasam & Wrap",
            desc: "Celebratory dessert and regional herbal refreshments.",
            duration: "1 hour"
          }
        ]
      }
    ]
  },
  rajasthan: {
    id: "rajasthan",
    title: "3-Day Rajasthan Royal Forts & Desert Circuit",
    category: "heritage",
    region: "Rajasthan",
    duration: 3,
    pacing: "Moderate",
    siteMix: "70% Heritage / 30% Desert Adventure",
    stats: {
      totalDistance: "180 km",
      travelTime: "4.5 hours total driving",
      monumentsCount: 3
    },
    culturalFilter: {
      category: "heritage",
      dietary: "pureVeg",
      language: "Hindi",
      interests: ["Forts", "Palaces", "Desert Safari", "Folk Music"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        stops: [
          {
            id: "r1",
            time: "09:30 AM",
            type: "heritage",
            title: "Amber Palace & Sheesh Mahal",
            desc: "Exploration of the hill fort, grand Diwan-e-Aam, and thousand-mirror Sheesh Mahal.",
            monumentId: "amber_fort",
            duration: "3.5 hours",
            lat: 26.9855,
            lng: 75.8513
          },
          {
            id: "r1-lunch",
            time: "01:30 PM",
            type: "lunch",
            title: "Royal Rajasthani Thali (Dal Baati Churma)",
            desc: "100% Pure Veg feast with pure ghee delicacies and regional Ker Sangri.",
            duration: "1.5 hours"
          },
          {
            id: "r1-hotel",
            time: "06:00 PM",
            type: "hotel",
            title: "Rawla Heritage Haveli Rest",
            desc: "Evening sitar performance and courtyard dinner.",
            duration: "Overnight"
          }
        ]
      },
      {
        day: 2,
        date: "Day 2",
        stops: [
          {
            id: "r2",
            time: "10:00 AM",
            type: "heritage",
            title: "Jaisalmer Living Fort (Sonar Qila)",
            desc: "Walking tour of the ancient living citadel and intricately carved Jain temples.",
            monumentId: "jaisalmer_fort",
            duration: "3 hours",
            lat: 26.9124,
            lng: 70.9127
          },
          {
            id: "r2-lunch",
            time: "01:30 PM",
            type: "lunch",
            title: "Desert Spiced Gatte ki Sabzi Lunch",
            desc: "Traditional Marwari dishes with Bajra rotla and jaggery.",
            duration: "1.5 hours"
          },
          {
            id: "r3",
            time: "04:30 PM",
            type: "adventure",
            title: "Sam Sand Dunes & Desert Safari",
            desc: "Sunset camel trek over wind-swept golden dunes and Kalbelia folk dance.",
            monumentId: "sam_sand_dunes",
            duration: "3 hours",
            lat: 26.8306,
            lng: 70.5100
          }
        ]
      }
    ]
  },
  varanasi: {
    id: "varanasi",
    title: "3-Day Kashi & Sarnath Sacred Pilgrimage",
    category: "spiritual",
    region: "Uttar Pradesh",
    duration: 3,
    pacing: "Relaxed",
    siteMix: "80% Spiritual / 20% Heritage",
    stats: {
      totalDistance: "90 km",
      travelTime: "3 hours total driving",
      monumentsCount: 3
    },
    culturalFilter: {
      category: "spiritual",
      dietary: "jain",
      language: "Hindi",
      interests: ["Ghats", "Temples", "Aarti", "Buddhism"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        stops: [
          {
            id: "v1",
            time: "08:30 AM",
            type: "spiritual",
            title: "Kashi Vishwanath & Ganga Ghats",
            desc: "Sacred darshan at the Golden Temple and morning boat ride along 84 historic ghats.",
            monumentId: "kashi_vishwanath",
            duration: "3 hours",
            lat: 25.3109,
            lng: 83.0107
          },
          {
            id: "v1-lunch",
            time: "01:00 PM",
            type: "lunch",
            title: "Verified Jain Satvik Thali",
            desc: "No onion, garlic, or root vegetables prepared in clean separate temple kitchen.",
            duration: "1.5 hours"
          },
          {
            id: "v2",
            time: "06:00 PM",
            type: "spiritual",
            title: "Dashashwamedh Maha Aarti",
            desc: "Evening Ganga Aarti ceremony with rhythmic conch blasts and brass oil lamps.",
            duration: "2 hours",
            lat: 25.3050,
            lng: 83.0100
          }
        ]
      },
      {
        day: 2,
        date: "Day 2",
        stops: [
          {
            id: "v3",
            time: "09:30 AM",
            type: "spiritual",
            title: "Sarnath Dhamek Stupa & Deer Park",
            desc: "Walking the grounds where Buddha set in motion the Wheel of Dharma.",
            monumentId: "sarnath_deer_park",
            duration: "3 hours",
            lat: 25.3811,
            lng: 83.0214
          }
        ]
      }
    ]
  },
  hampi: {
    id: "hampi",
    title: "3-Day Hampi Boulder Valley & Ruins Trail",
    category: "adventure",
    region: "Karnataka",
    duration: 3,
    pacing: "Intensive",
    siteMix: "60% Heritage / 40% Adventure",
    stats: {
      totalDistance: "140 km",
      travelTime: "4 hours total driving",
      monumentsCount: 3
    },
    culturalFilter: {
      category: "adventure",
      dietary: "pureVeg",
      language: "English",
      interests: ["Ruins", "Boulders", "Temples", "Wildlife"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        stops: [
          {
            id: "h1",
            time: "09:00 AM",
            type: "heritage",
            title: "Virupaksha Temple",
            desc: "Sacred morning exploration of the 7th-century active temple complex.",
            monumentId: "virupaksha",
            duration: "2.5 hours",
            lat: 15.3358,
            lng: 76.4564
          },
          {
            id: "h2",
            time: "02:30 PM",
            type: "heritage",
            title: "Stone Chariot & Vittala Complex",
            desc: "Marveling at the iconic granite chariot and musical stone pillars.",
            monumentId: "stonechariot",
            duration: "3 hours",
            lat: 15.3428,
            lng: 76.4772
          }
        ]
      },
      {
        day: 2,
        date: "Day 2",
        stops: [
          {
            id: "h3",
            time: "03:00 PM",
            type: "adventure",
            title: "Daroji Sloth Bear Sanctuary",
            desc: "Tracking wild sloth bears and wildlife across boulder-strewn hillsides.",
            monumentId: "daroji_sloth_bear",
            duration: "3.5 hours",
            lat: 15.2678,
            lng: 76.5411
          }
        ]
      }
    ]
  },
  gujarat: {
    id: "gujarat",
    title: "3-Day Gujarat Heritage, Sacred Shrines & Stepwells",
    category: "heritage",
    region: "Gujarat",
    duration: 3,
    pacing: "Moderate",
    siteMix: "70% Sacred & Heritage / 30% Architecture",
    stats: {
      totalDistance: "380 km",
      travelTime: "7.5 hours total driving",
      monumentsCount: 4
    },
    culturalFilter: {
      category: "heritage",
      dietary: "pureVeg",
      language: "Gujarati",
      interests: ["Somnath Jyotirlinga", "Dwarkadhish", "Rani Ki Vav", "Sun Temple"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        stops: [
          {
            id: "gj1",
            time: "08:30 AM",
            type: "spiritual",
            title: "Shree Somnath Jyotirlinga Temple",
            desc: "First of the twelve sacred Jyotirlinga shrines facing the Arabian Sea.",
            monumentId: "GJ-SOM-001",
            duration: "2 hours",
            lat: 20.888,
            lng: 70.4012
          },
          {
            id: "gj1-lunch",
            time: "01:00 PM",
            type: "lunch",
            title: "Authentic Kathiyawadi & Gujarati Thali",
            desc: "Pure vegetarian traditional meal with bajra rotla, ringna no olo, and fresh chaas.",
            duration: "1 hour"
          }
        ]
      },
      {
        day: 2,
        date: "Day 2",
        stops: [
          {
            id: "gj2",
            time: "09:00 AM",
            type: "spiritual",
            title: "Shree Dwarkadhish Temple",
            desc: "Ancient Char Dham kingdom of Lord Krishna on the sacred Gomti river bank.",
            monumentId: "GJ-DWK-002",
            duration: "2.5 hours",
            lat: 22.2376,
            lng: 68.9678
          }
        ]
      },
      {
        day: 3,
        date: "Day 3",
        stops: [
          {
            id: "gj3",
            time: "10:00 AM",
            type: "heritage",
            title: "Rani Ki Vav Stepwell",
            desc: "UNESCO World Heritage subterranean stepwell with over 500 intricate sculptures.",
            monumentId: "GJ-PAT-014",
            duration: "2 hours",
            lat: 23.8589,
            lng: 72.1014
          }
        ]
      }
    ]
  },
  kashmir: {
    id: "kashmir",
    title: "3-Day Kashmir Valleys & Alpine Heritage Circuit",
    category: "nature",
    region: "Jammu & Kashmir",
    duration: 3,
    pacing: "Relaxed",
    siteMix: "80% Alpine Valleys / 20% Ancient Ruins",
    stats: {
      totalDistance: "190 km",
      travelTime: "4.5 hours total driving",
      monumentsCount: 3
    },
    culturalFilter: {
      category: "nature",
      dietary: "any",
      language: "Hindi",
      interests: ["Pari Mahal", "Martand Sun Temple", "Alpine Valleys", "Lakes"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        stops: [
          {
            id: "jk1",
            time: "09:30 AM",
            type: "heritage",
            title: "Pari Mahal",
            desc: "Six-terraced Mughal palace and historic astronomy observatory overlooking Dal Lake.",
            monumentId: "JK-KAS-003",
            duration: "1.5 hours",
            lat: 34.0867,
            lng: 74.8821
          }
        ]
      },
      {
        day: 2,
        date: "Day 2",
        stops: [
          {
            id: "jk2",
            time: "10:30 AM",
            type: "heritage",
            title: "Martand Sun Temple",
            desc: "Majestic 8th-century colonnaded stone temple ruins perched above Anantnag valley.",
            monumentId: "JK-KAS-001",
            duration: "1.5 hours",
            lat: 33.7431,
            lng: 75.2215
          }
        ]
      }
    ]
  },
  meghalaya: {
    id: "meghalaya",
    title: "3-Day Meghalaya Living Root Bridges & Sacred Groves",
    category: "nature",
    region: "Meghalaya",
    duration: 3,
    pacing: "Moderate",
    siteMix: "90% Rainforest & Waterfalls / 10% Tribal Lore",
    stats: {
      totalDistance: "160 km",
      travelTime: "4 hours total driving",
      monumentsCount: 3
    },
    culturalFilter: {
      category: "nature",
      dietary: "any",
      language: "English",
      interests: ["Living Root Bridge", "Mawphlang Sacred Grove", "Waterfalls", "Tribal Lore"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        stops: [
          {
            id: "ml1",
            time: "09:30 AM",
            type: "nature",
            title: "Mawphlang Sacred Grove",
            desc: "Centuries-old pristine ancient forest preserved by Khasi tribal customs and folklore.",
            monumentId: "ML-EKH-002",
            duration: "2 hours",
            lat: 25.4422,
            lng: 91.7511
          }
        ]
      },
      {
        day: 2,
        date: "Day 2",
        stops: [
          {
            id: "ml2",
            time: "08:00 AM",
            type: "adventure",
            title: "Double Decker Living Root Bridge",
            desc: "Iconic bio-engineered living ficus elastica root bridge in the rainforests of Nongriat.",
            monumentId: "ML-EKH-003",
            duration: "4 hours",
            lat: 25.2443,
            lng: 91.6669
          }
        ]
      }
    ]
  }
};
