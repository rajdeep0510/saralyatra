import { Monument, Homestay, PreloadedTrip, Translations } from "../types";

export const translations: Translations = {
  en: {
    brand: "Saral Yatra",
    tagline: "Smart Multi-Category Trip Planner for India",
    searchPlaceholder: "Search nature spots, sacred pilgrimages, heritage sites, or homestays...",
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
    plannerTitle: "Configure Your Smart Yatra",
    plannerSub: "Tailor your journey's theme (Nature, Spiritual, Heritage, Adventure), pacing, dietary customs, and stay style.",
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
    jainKitchen: "Separate Jain Kitchen",
    pureVegKitchen: "100% Pure Vegetarian",
    halalKitchen: "Halal Certified Kitchen",
    hostLanguage: "Host Speaks My Dialect",
    monumentLabel: "Heritage Landmark",
    natureLabel: "Scenic Nature Stop",
    spiritualLabel: "Sacred Shrine Stop",
    adventureLabel: "Adventure & Wildlife",
    lunchLabel: "Regional Culinary Stop",
    hotelLabel: "Homestay / Eco-Retreat",
    transitLabel: "Scenic Transit",
    startWizard: "Start AI Wizard",
    previous: "Previous",
    next: "Next",
    generate: "Generate Custom Yatra",
    rebuild: "Rebuild Itinerary",
    activeTrip: "Active Itinerary",
    noTripAlert: "No custom itinerary generated yet. Configure options in the wizard or load a pre-loaded trail below.",
    loadDemoKerala: "3-Day Kerala Nature & Backwaters",
    loadDemoVaranasi: "3-Day Divine Kashi Pilgrimage",
    loadDemoGujarat: "3-Day Gujarat Heritage Trail",
    loadDemoHampi: "3-Day Hampi Architectural Circuit"
  },
  hi: {
    brand: "सरल यात्रा",
    tagline: "भारत का संपूर्ण स्मार्ट ट्रिप प्लानर",
    searchPlaceholder: "प्राकृतिक स्थल, तीर्थ, धरोहर या होमस्टे खोजें...",
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
    plannerTitle: "अपनी अनुकूलित यात्रा तैयार करें",
    plannerSub: "प्रकृति, तीर्थ, धरोहर या रोमांच में से अपनी पसंद और खान-पान के अनुसार योजना बनाएं।",
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
    jainKitchen: "अलग जैन रसोई",
    pureVegKitchen: "100% शुद्ध शाकाहारी",
    halalKitchen: "हलाल प्रमाणित रसोई",
    hostLanguage: "मेजबान मेरी भाषा बोलते हैं",
    monumentLabel: "धरोहर स्थल",
    natureLabel: "प्राकृतिक पड़ाव",
    spiritualLabel: "पवित्र तीर्थ स्थल",
    adventureLabel: "रोमांचक गतिविधि",
    lunchLabel: "स्थानीय भोजन",
    hotelLabel: "होमस्टे / आवास",
    transitLabel: "यात्रा पड़ाव",
    startWizard: "एआई विज़ार्ड शुरू करें",
    previous: "पिछला",
    next: "अगला",
    generate: "यात्रा तैयार करें",
    rebuild: "मार्ग फिर से बनाएं",
    activeTrip: "सक्रिय यात्रा",
    noTripAlert: "अभी तक कोई कस्टम यात्रा नहीं बनी है। विज़ार्ड में विकल्प चुनें या डेमो यात्रा लोड करें।",
    loadDemoKerala: "3-दिवसीय केरल प्रकृति व बैकवाटर्स",
    loadDemoVaranasi: "3-दिवसीय दिव्य काशी तीर्थ यात्रा",
    loadDemoGujarat: "3-दिवसीय गुजरात धरोहर यात्रा",
    loadDemoHampi: "3-दिवसीय हम्पी वास्तुकला सर्किट"
  },
  gu: {
    brand: "સરળ યાત્રા",
    tagline: "ભારત માટે સર્વગ્રાહી સ્માર્ટ ટ્રિપ પ્લાનર",
    searchPlaceholder: "કુદરતી સ્થળો, તીર્થસ્થાનો, વારસો કે હોમસ્ટે શોધો...",
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
    plannerTitle: "તમારી મનપસંદ યાત્રા પ્લાન કરો",
    plannerSub: "કુદરત, ધાર્મિક કે વારસા આધારિત પ્રવાસ નક્કી કરો.",
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
    jainKitchen: "અલગ જૈન રસોડું",
    pureVegKitchen: "100% શુદ્ધ શાકાહારી",
    halalKitchen: "હલાલ પ્રમાણિત રસોડું",
    hostLanguage: "યજમાન મારી બોલી બોલે છે",
    monumentLabel: "વારસો સ્ટોપ",
    natureLabel: "કુદરતી સ્ટોપ",
    spiritualLabel: "તીર્થ સ્ટોપ",
    adventureLabel: "સાહસિક સ્ટોપ",
    lunchLabel: "સ્થાનિક ભોજન",
    hotelLabel: "હોમસ્ટે / રિસોર્ટ",
    transitLabel: "મુસાફરી સ્ટોપ",
    startWizard: "એઆઈ વિઝાર્ડ શરૂ કરો",
    previous: "પાછળ",
    next: "આગળ",
    generate: "યાત્રા બનાવો",
    rebuild: "ફરી ગણતરી કરો",
    activeTrip: "સક્રિય પ્રવાસ",
    noTripAlert: "હજી પ્રવાસ માર્ગ બનાવ્યો નથી. ઉપરથી વિકલ્પ પસંદ કરો.",
    loadDemoKerala: "3-દિવસીય કેરળ નેચર ટૂર",
    loadDemoVaranasi: "3-દિવસીય કાશી તીર્થ યાત્રા",
    loadDemoGujarat: "3-દિવસીય ગુજરાત વારસા યાત્રા",
    loadDemoHampi: "3-દિવસીય હમ્પી આર્કિટેક્ચર સર્કિટ"
  },
  ta: {
    brand: "சரல் யாத்ரா",
    tagline: "இந்தியாவிற்கான பல்துறை ஸ்மார்ட் பயண திட்டமிடுபவர்",
    searchPlaceholder: "இயற்கை இடங்கள், ஆன்மீக தலங்கள், பாரம்பரிய சின்னங்கள்...",
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
    plannerTitle: "உங்கள் பயணத்தை வடிவமைக்கவும்",
    plannerSub: "இயற்கை, ஆன்மீகம், பாரம்பரியம் ஆகியவற்றில் உங்கள் விருப்பத்திற்கேற்ப திட்டமிடுங்கள்.",
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
    jainKitchen: "தனி ஜெயின் சமையலறை",
    pureVegKitchen: "100% சுத்த சைவம்",
    halalKitchen: "ஹலால் சமையலறை",
    hostLanguage: "புரவலர் என் மொழி பேசுகிறார்",
    monumentLabel: "பாரம்பரிய இடம்",
    natureLabel: "இயற்கை நிறுத்தம்",
    spiritualLabel: "ஆன்மீக நிறுத்தம்",
    adventureLabel: "சாகச நிறுத்தம்",
    lunchLabel: "பாரம்பரிய உணவு",
    hotelLabel: "ஹோம்ஸ்டே / தங்குமிடம்",
    transitLabel: "போக்குவரத்து",
    startWizard: "ஏஐ வழிகாட்டியைத் தொடங்கு",
    previous: "முந்தைய",
    next: "அடுத்தது",
    generate: "பயணத்தை உருவாக்கு",
    rebuild: "மீண்டும் உருவாக்கு",
    activeTrip: "செயலில் உள்ள பயணம்",
    noTripAlert: "பயணத் திட்டம் தேர்ந்தெடுக்கப்படவில்லை.",
    loadDemoKerala: "3 நாள் கேரளா இயற்கை பயணம்",
    loadDemoVaranasi: "3 நாள் காசி ஆன்மீக யாத்திரை",
    loadDemoGujarat: "3 நாள் குஜராத் பாரம்பரிய பயணம்",
    loadDemoHampi: "3 நாள் ஹம்பி கட்டிடக்கலை பயணம்"
  }
};

export const monuments: Monument[] = [
  // NATURE & SCENIC
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
      en: "Perched at 1,600m in the Western Ghats, Munnar's undulating emerald hills were historically known as the 'High Range'. Home to the endangered Nilgiri Tahr and the blooming Neelakurinji flower which covers hills in violet once every 12 years. The cool mountain mist creates an unforgettable tranquil sanctuary.",
      hi: "पश्चिमी घाट में 1,600 मीटर की ऊंचाई पर स्थित मुन्नार की हरी-भरी पहाड़ियां प्राकृतिक सुंदरता का स्वर्ग हैं। यहाँ दुर्लभ नीलगिरि तहर और 12 साल में एक बार खिलने वाला नीलकुरिंजी फूल पाया जाता है। ठंडी धुंध और चाय के बागान मन को शांति देते हैं।",
      ta: "மேற்குத் தொடர்ச்சி மலையில் 1,600 மீட்டர் உயரத்தில் அமைந்துள்ள மூணாறின் தேயிலைத் தோட்டங்கள் இயற்கை எழில் கொஞ்சும் பகுதியாகும். 12 ஆண்டுகளுக்கு ஒருமுறை பூக்கும் நீலக்குறிஞ்சி மலரும், வரையாடுகளும் இதன் சிறப்பம்சமாகும்."
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
      en: "A mesmerizing network of interconnected brackish lagoons, rivers, and canals fringed by swaying coconut palms. Traditional Kettuvallam houseboats gently cruise through serene waters where local villagers sustain centuries-old paddy farming below sea level in the Kuttanad region.",
      hi: "नारियल के पेड़ों से घिरी झीलों, नहरों और नदियों का अद्भुत प्राकृतिक नेटवर्क। पारंपरिक हाउसबोट शांत पानी में तैरती हैं, जहाँ स्थानीय किसान समुद्र तल से नीचे धान की अनोखी खेती करते हैं।",
      ta: "தென்னை மரங்கள் சூழ்ந்த உப்பங்கழிகள் மற்றும் கால்வாய்களின் அமைதியான வலைப்பின்னல். பாரம்பரிய கெட்டுவள்ளம் படகு வீடுகள் மூலம் கேரள கிராமப்புற அழகை ரசிக்கலாம்."
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
      en: "Surging down from a height of 80 feet, Athirappilly is India's most dramatic waterfall. Flowing through the dense riparian forests of the Anamudi range, it is the only place in the Western Ghats where four endangered hornbill species thrive together.",
      hi: "80 फीट की ऊंचाई से गिरता अतिरापिल्ली भारत का सबसे भव्य जलप्रपात है। शोलायर के घने वर्षावनों से गुजरती चालक्कुडी नदी की गरजती धाराएं मन मोह लेती हैं।",
      ta: "80 அடி உயரத்திலிருந்து ஆர்ப்பரித்துக் கொட்டும் அதிரப்பள்ளி நீர்வீழ்ச்சி இந்தியாவின் நயாகரா என அழைக்கப்படுகிறது. அடர்ந்த சோலையார் மழைக்காடுகளின் நடுவே இது அமைந்துள்ளது."
    }
  },

  // SPIRITUAL & PILGRIMAGE
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
      en: "Varanasi (Kashi) is believed to be one of the oldest continuously inhabited cities in human history, standing on Lord Shiva's trident. The golden spire of Kashi Vishwanath shines over the sacred Ganges. At dusk, the grand Maha Aarti at Dashashwamedh Ghat mesmerizes pilgrims with chanting, brass lamps, and spiritual devotion.",
      hi: "भगवान शिव के त्रिशूल पर बसी काशी विश्व की सबसे प्राचीन जीवित आध्यात्मिक नगरी है। गंगा किनारे दशाश्वमेध घाट पर होने वाली संध्या महा आरती और काशी विश्वनाथ मंदिर की दिव्यता आत्मा को शांति प्रदान करती है।",
      gu: "ભગવાન શિવની પવિત્ર નગરી કાશીમાં ગંગા કિનારે દશાશ્વમેધ ઘાટની સાંજની મહાઆરતી અને કાશી વિશ્વનાથ જ્યોતિર્લિંગના દર્શન અલૌકિક આધ્યાત્મિક અનુભવ કરાવે છે.",
      ta: "சிவபெருமானின் திருநகரமான காசி, உலகின் மிகத் தொன்மையான ஆன்மீக நகரமாகும். கங்கை நதிக்கரையில் நடக்கும் மாலை நேர மகா ஆரத்தி பக்தர்களை மெய்சிலிர்க்க வைக்கிறது."
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
      en: "Just 10 km from Varanasi, Sarnath is the sacred Deer Park where Gautama Buddha gave his first sermon after attaining enlightenment, setting in motion the Wheel of Dharma. The massive 43-meter high Dhamek Stupa marks the exact spot of peace and introspection.",
      hi: "सारनाथ वह पावन स्थल है जहाँ भगवान बुद्ध ने ज्ञान प्राप्ति के बाद अपना पहला उपदेश दिया था। विशाल धमेख स्तूप और शांत हिरण उद्यान ध्यान और आत्मिक शांति का केंद्र हैं।",
      ta: "புத்தர் ஞானம் பெற்ற பிறகு தனது முதல் போதனையை நிகழ்த்திய புனித இடம் சாரநாத். இங்குள்ள கம்பீரமான தமேக் ஸ்தூபி அமைதிக்கும் தியானத்திற்கும் பெயர் பெற்றது."
    }
  },

  // HERITAGE & ARCHITECTURE
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
      en: "Rani ki Vav was built by Queen Udayamati in memory of her husband King Bhimdev I. Resembling an inverted temple honoring sacred water, it has seven levels of stairs decorated with over 500 principal sculptures representing Vishnu's avatars.",
      hi: "रानी की वाव का निर्माण रानी उदयमती ने अपने पति की याद में करवाया था। यह 7 मंजिला उल्टे मंदिर के समान बावड़ी है, जिसमें भगवान विष्णु के 500 से अधिक दिव्य रूप उकेरे गए हैं।",
      gu: "રાણી કી વાવનું નિર્માણ રાણી ઉદયમતીએ કરાવ્યું હતું. આ ૭ માળની ભવ્ય વાવમાં ૫૦૦થી વધુ પૌરાણિક કલાત્મક મૂર્તિઓ કંડારેલી છે.",
      ta: "ராணி கி வாவ் ராணி உதயமதியால் கட்டப்பட்டது. தலைகீழ் கோயில் வடிவில் அமைந்த இக்கிணற்றில் 500க்கும் மேற்பட்ட விஷ்ணு அவதார சிற்பங்கள் உள்ளன."
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
      en: "Dedicated to the Sun God Surya on the banks of Pushpavati River. Built so that equinox solar rays struck the deity's gemmed crown directly. Features the stunning Surya Kunda stepped tank with 108 miniature shrines.",
      hi: "पुष्पावती नदी के तट पर स्थित सूर्य मंदिर स्थापत्य का शिखर है। सूर्यकुंड में 108 छोटे मंदिर बने हैं और विषुव के दिन पहली सूर्य किरण गर्भगृह को आलोकित करती थी।",
      gu: "પુષ્પાવતી નદીના કિનારે મોઢેરાનું સૂર્યમંદિર સોલંકી કાળની સ્થાપત્ય કલાનો અજોડ નમૂનો છે, જેમાં ૧૦૮ નાના મંદિરોવાળો સૂર્યકુંડ છે."
    }
  },
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
      en: "Continuously active since the 7th century, featuring a 49-meter Gopuram. Known for a unique pinhole camera inverted shadow effect and sacred Tungabhadra riverfront architecture.",
      hi: "7वीं शताब्दी से लगातार सक्रिय विरूपाक्ष मंदिर अपने 49 मीटर ऊंचे गोपुरम और पिनहोल कैमरा छाया प्रभाव के लिए विश्वविख्यात है।"
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
      hi: "हम्पी का प्रसिद्ध पत्थर का रथ गरुड़ को समर्पित है। इसके विट्ठल मंदिर परिसर में 56 संगीतमय स्तंभ हैं जो थपथपाने पर सुर उत्पन्न करते हैं।"
    }
  },

  // ADVENTURE & WILDLIFE
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
      en: "Spread across rugged granite boulders and scrub forests, Daroji is Asia's first exclusive sloth bear sanctuary. Watch wild bears foraging on cliff sides from watchtowers during afternoon safaris.",
      hi: "ग्रेनाइट चट्टानों और शुष्क वनों के बीच बसा दरोजी अभयारण्य एशिया का पहला भालू संरक्षण क्षेत्र है, जहाँ प्राकृतिक वातावरण में भालू स्वतंत्र घूमते हैं।"
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
    id: "guj_jain_house",
    name: "Vav Heritage Retreat",
    category: "heritage",
    hostName: "Ketan Shah",
    hostOrigin: "Gujarat (Patan)",
    languagesSpoken: ["Gujarati", "Hindi"],
    foodSpecialty: "Strict Jain Kitchen (No onion, garlic, or root vegetables)",
    dietaryReady: "jain",
    pricePerNight: 3200,
    compatibilityScore: {
      food: 100,
      language: 90,
      heritage: 95,
      overall: 95
    },
    about: "Located 1 km from Rani ki Vav, providing strictly Jain-compliant dining on pure silver thalis."
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
  },
  {
    id: "karnataka_halal_house",
    name: "Tungabhadra River Vista",
    category: "nature",
    hostName: "Imran Khan",
    hostOrigin: "Karnataka (Hampi)",
    languagesSpoken: ["Kannada", "Hindi", "English", "Urdu"],
    foodSpecialty: "Halal Mughlai & Deccani regional cuisine",
    dietaryReady: "halal",
    pricePerNight: 2500,
    compatibilityScore: {
      food: 100,
      language: 80,
      heritage: 90,
      overall: 90
    },
    about: "A beautiful riverside cottage offering fully halal certified dining with private balconies overlooking rocky hills."
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
      monumentsCount: 4
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
          },
          {
            id: "ker-3",
            time: "03:30 PM",
            type: "transit",
            title: "Scenic Drive through Sholayar Rainforest",
            desc: "Drive past mist-clad Western Ghats passes towards Athirappilly.",
            duration: "2.5 hours"
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
      monumentsCount: 4
    },
    itinerary: [
      {
        day: 1,
        stops: [
          {
            id: "var-1",
            time: "06:00 AM",
            type: "spiritual",
            title: "Ganga Sunrise Boat Ride & Subah-e-Banaras",
            desc: "Witness morning chants, rituals, and rising sun over ancient ghats.",
            monumentId: "kashi_vishwanath",
            duration: "2.5 hours",
            lat: 25.3109,
            lng: 83.0107
          },
          {
            id: "var-2",
            time: "10:00 AM",
            type: "spiritual",
            title: "Kashi Vishwanath Jyotirlinga Darshan",
            desc: "Visit the golden temple of Lord Shiva with priority pilgrimage access.",
            duration: "2 hours",
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
          },
          {
            id: "var-5",
            time: "01:30 PM",
            type: "lunch",
            title: "Banarasi Satvik Thali Lunch",
            desc: "Pure Satvik lunch prepared without onion or garlic.",
            duration: "1.5 hours",
            lat: 25.3800,
            lng: 83.0200
          }
        ]
      },
      {
        day: 3,
        stops: [
          {
            id: "var-6",
            time: "09:00 AM",
            type: "spiritual",
            title: "Varanasi Heritage Silk Weaving & Ghats Walk",
            desc: "Discover centuries-old Banarasi silk handlooms and holy shrines.",
            duration: "3 hours",
            lat: 25.3150,
            lng: 83.0120
          },
          {
            id: "var-7",
            time: "02:00 PM",
            type: "hotel",
            title: "Vedic Ashram Blessing & Checkout",
            desc: "Farewell blessings with Pandit Ramashankar Tripathi.",
            duration: "1 hour",
            lat: 25.3100,
            lng: 83.0100
          }
        ]
      }
    ]
  },

  gujarat: {
    id: "gujarat-trail",
    title: "3-Day Heritage Trail of Gujarat",
    category: "heritage",
    region: "Gujarat",
    duration: 3,
    pacing: "Moderate",
    siteMix: "60% Famous / 40% Offbeat",
    culturalFilter: {
      category: "heritage",
      dietary: "pureVeg",
      language: "Gujarati",
      interests: ["Architecture", "Heritage"]
    },
    stats: {
      totalDistance: "190 km",
      travelTime: "4.5 hours total driving",
      monumentsCount: 4
    },
    itinerary: [
      {
        day: 1,
        stops: [
          {
            id: "act-1",
            time: "09:00 AM",
            type: "monument",
            title: "Adalaj Stepwell",
            desc: "15th-century Vaghela stepwell known for intricate carvings and legend of devotion.",
            duration: "2 hours",
            lat: 23.1667,
            lng: 72.5801
          },
          {
            id: "act-2",
            time: "01:00 PM",
            type: "lunch",
            title: "Traditional Lunch at Pol Haveli",
            desc: "Gujarati Thali with Dhokla, Khandvi, and hot Jalebi.",
            duration: "1.5 hours",
            lat: 23.0225,
            lng: 72.5714
          },
          {
            id: "act-3",
            time: "03:30 PM",
            type: "transit",
            title: "Drive to Patan",
            desc: "Travel north towards the historic Solanki capital.",
            duration: "2.5 hours (120 km)"
          }
        ]
      },
      {
        day: 2,
        stops: [
          {
            id: "act-4",
            time: "09:30 AM",
            type: "monument",
            title: "Rani ki Vav",
            desc: "Seven-tiered UNESCO World Heritage stepwell with Vishnu avatar sculptures.",
            monumentId: "ranikivav",
            duration: "3 hours",
            lat: 23.8589,
            lng: 72.1017
          },
          {
            id: "act-6",
            time: "04:30 PM",
            type: "monument",
            title: "Modhera Sun Temple",
            desc: "Golden hour at the Sun Temple on Pushpavati riverbank.",
            monumentId: "modherasun",
            duration: "2 hours",
            lat: 23.5835,
            lng: 72.1330
          }
        ]
      },
      {
        day: 3,
        stops: [
          {
            id: "act-8",
            time: "03:00 PM",
            type: "hotel",
            title: "Vav Heritage Retreat Wrap",
            desc: "Farewell tea with local Patan host Ketan Shah.",
            duration: "1 hour",
            lat: 23.8500,
            lng: 72.1100
          }
        ]
      }
    ]
  },

  hampi: {
    id: "hampi-circuit",
    title: "3-Day Hampi Ruins & Kishkindha Circuit",
    category: "adventure",
    region: "Karnataka",
    duration: 3,
    pacing: "Intensive",
    siteMix: "70% Architecture / 30% Wildlife",
    culturalFilter: {
      category: "adventure",
      dietary: "pureVeg",
      language: "Tamil",
      interests: ["Architecture", "Adventure", "Wildlife"]
    },
    stats: {
      totalDistance: "48 km",
      travelTime: "2 hours total driving",
      monumentsCount: 4
    },
    itinerary: [
      {
        day: 1,
        stops: [
          {
            id: "act-9",
            time: "08:30 AM",
            type: "monument",
            title: "Virupaksha Temple",
            desc: "Explore India's oldest active Shiva temple with 49m Gopuram.",
            monumentId: "virupaksha",
            duration: "2.5 hours",
            lat: 15.3358,
            lng: 76.4564
          },
          {
            id: "act-10",
            time: "12:00 PM",
            type: "lunch",
            title: "Banana Leaf South Indian Lunch",
            desc: "Traditional meal in a rustic mango grove.",
            duration: "1.5 hours",
            lat: 15.3300,
            lng: 76.4600
          }
        ]
      },
      {
        day: 2,
        stops: [
          {
            id: "act-14",
            time: "03:00 PM",
            type: "monument",
            title: "Stone Chariot & Vittala Complex",
            desc: "Admire musical pillars and the monolithic granite chariot.",
            monumentId: "stonechariot",
            duration: "3 hours",
            lat: 15.3428,
            lng: 76.4772
          }
        ]
      },
      {
        day: 3,
        stops: [
          {
            id: "act-15",
            time: "09:00 AM",
            type: "adventure",
            title: "Daroji Sloth Bear Sanctuary Safari",
            desc: "Morning open jeep drive to witness wild sloth bears in granite boulders.",
            monumentId: "daroji_sloth_bear",
            duration: "3 hours",
            lat: 15.2678,
            lng: 76.5411
          },
          {
            id: "act-16",
            time: "02:00 PM",
            type: "hotel",
            title: "Checkout at Kishkindha Farmstay",
            desc: "Farewell handmade banana fiber souvenir from host Mallikarjuna Hegde.",
            duration: "1 hour",
            lat: 15.3470,
            lng: 76.4900
          }
        ]
      }
    ]
  }
};
