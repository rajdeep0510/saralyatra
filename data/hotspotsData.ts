import { LanguageCode } from "@/types";

export interface ArchitecturalHotspot {
  id: string;
  monumentId: string;
  xPercent: number; // 10 to 90% across panoramic width
  yPercent: number; // 10 to 90% across panoramic height
  icon: string;
  title: Record<LanguageCode, string>;
  architecturalSecret: Record<LanguageCode, string>;
  audioNarrative: Record<LanguageCode, string>;
}

export const MONUMENT_HOTSPOTS: Record<string, ArchitecturalHotspot[]> = {
  // 1. Taj Mahal
  "taj-mahal": [
    {
      id: "taj-hotspot-1",
      monumentId: "taj-mahal",
      xPercent: 50,
      yPercent: 32,
      icon: "🪷",
      title: {
        en: "Central Lotus Dome & Acoustic Core",
        hi: "केंद्रीय कमल गुंबद और ध्वनिक कोर",
        gu: "કેન્દ્રીય કમળ ગુંબજ અને ધ્વનિ રહસ્ય",
        mr: "मध्यवर्ती कमळ घुमट आणि ध्वनी रहस्य",
        ta: "மத்திய தாமரை குவிமாடம் & ஒலி வடிவமைப்பு",
        bn: "কেন্দ্রীয় পদ্ম গম্বুজ ও শাব্দিক বিস্ময়"
      },
      architecturalSecret: {
        en: "The double-dome design creates an echo lasting exactly 28 seconds, ensuring that chants and verses reverberate in perpetual resonance over the royal cenotaphs.",
        hi: "डबल-डोम तकनीक के कारण इस गुंबद में गूंज ठीक 28 सेकंड तक रहती है, जिससे पवित्र श्लोक अनंत काल तक गूंजते रहते हैं।",
        gu: "આ ડબલ-ડોમ ગુંબજમાં ઉત્પન્ન થયેલો પડઘો પૂરી ૨૮ સેકન્ડ સુધી ગૂંજતો રહે છે, જે પ્રાચીન મુગલ ધ્વનિશાસ્ત્રનો અદ્ભુત નમૂનો છે.",
        mr: "डबल-डोम रचनेमुळे या घुमटातील प्रतिध्वनी तब्बल २८ सेकंद टिकून राहतो.",
        ta: "இரட்டை குவிமாட வடிவம் சரியாக 28 வினாடிகள் எதிரொலிக்கும் வகையில் மிக நேர்த்தியாக அமைக்கப்பட்டுள்ளது.",
        bn: "দ্বৈত-গম্বুজ প্রযুক্তির কারণে এখানে যে কোনো শব্দের প্রতিধ্বনি টানা ২৮ সেকেন্ড স্থায়ী হয়।"
      },
      audioNarrative: {
        en: "Notice the soaring central marble dome. Its inner shell sustains a 28-second sacred acoustic resonance, designed so musical prayers never fade.",
        hi: "इस भव्य संगमरमर के गुंबद को देखें। इसका दोहरा आवरण 28 सेकंड तक दिव्य प्रतिध्वनि बनाए रखता है।",
        gu: "આ ભવ્ય આરસપહાણના ગુંબજને નિહાળો. તેનું અંદરનું સ્થાપત્ય ૨૮ સેકન્ડ સુધી પવિત્ર ધ્વનિ ગૂંજતો રાખે છે.",
        mr: "या संगमरवरी घुमटाची अंतर्गत रचना २८ सेकंदांचा पवित्र प्रतिध्वनी टिकवून ठेवते.",
        ta: "இந்த பிரம்மாண்ட பளிங்கு குவிமாடத்தை கவனியுங்கள். இதன் ஒலி வடிவமைப்பு 28 வினாடிகள் எதிரொலிக்கும்.",
        bn: "এই সুবিশাল মার্বেল গম্বুজের ভিতরের দ্বৈত কাঠামো টানা ২৮ সেকেন্ড স্থায়ী প্রতিধ্বনি সৃষ্টি করে।"
      }
    },
    {
      id: "taj-hotspot-2",
      monumentId: "taj-mahal",
      xPercent: 78,
      yPercent: 55,
      icon: "🏛️",
      title: {
        en: "Optical Illusion Minarets",
        hi: "भूकंप रोधी झुकी हुई मीनारें",
        gu: "ભૂકંપ રક્ષક નમેલી મિનારાઓ",
        mr: "भूकंप-रोधक झुकलेले मनोरे",
        ta: "ஒளியியல் மாய மினாராக்கள்",
        bn: "ভূমিকম্প-রোধী বিশেষ মিনার"
      },
      architecturalSecret: {
        en: "The four outer minarets were deliberately constructed tilting 2 degrees outward so that in the event of a catastrophic earthquake, they fall safely away from the central tomb.",
        hi: "चारों मीनारों को जानबूझकर 2 डिग्री बाहर की ओर झुकाकर बनाया गया है, ताकि भूकंप आने पर वे मुख्य मकबरे से दूर गिरें।",
        gu: "ચારેય મિનારાઓને જાણીજોઈને બહારની તરફ ૨ ડિગ્રી નમાવવામાં આવ્યા છે જેથી ભૂકંપ વખતે મુખ્ય સમાધિને કોઈ નુકસાન ન થાય.",
        mr: "भूकंप झाल्यास मुख्य समाधीला धोका होऊ नये म्हणून चारही मनोरे २ अंश बाहेर झुकवून बांधले आहेत.",
        ta: "நிலநடுக்கம் ஏற்பட்டால் முக்கிய சமாதி சேதமடையாமல் இருக்க, நான்கு மினாராக்களும் 2 டிகிரி வெளிப்புறமாக சாய்ந்து கட்டப்பட்டுள்ளன.",
        bn: "ভূমিকম্পের সময় মূল সমাধি রক্ষার্থে চারটি মিনারকে বাইরে ২ ডিগ্রি হেলিয়ে নির্মাণ করা হয়েছিল।"
      },
      audioNarrative: {
        en: "Look closely at the corner minarets. They tilt two degrees outward as an ingenious earthquake protection system protecting the central sanctum.",
        hi: "कोने की मीनारों को ध्यान से देखें। वे केंद्रीय गर्भगृह की सुरक्षा के लिए 2 डिग्री बाहर की ओर झुकी हैं।",
        gu: "ખૂણાના મિનારાઓને ધ્યાનથી જુઓ. ભૂકંપ સામે મુખ્ય સમાધિના રક્ષણ માટે તે ૨ ડિગ્રી બહાર ઝૂકેલા છે.",
        mr: "कोपऱ्यातील मनोरे २ अंश बाहेर झुकलेले आहेत, जे भूकंपापासून मुख्य संरचनेचे रક્ષણ કરે છે.",
        ta: "மூலை மினாராக்களை கவனியுங்கள். நிலநடுக்க பாதுகாப்பிற்காக அவை வெளிப்புறமாக சாய்ந்துள்ளன.",
        bn: "কোণার মিনারগুলি খেয়াল করুন। মূল সৌধের সুরক্ষায় এগুলি বাইরের দিকে ২ ডিগ্রি হেলিয়ে নির্মিত।"
      }
    }
  ],

  // 2. Modhera Sun Temple
  "modhera-sun-temple": [
    {
      id: "modhera-hotspot-1",
      monumentId: "modhera-sun-temple",
      xPercent: 48,
      yPercent: 40,
      icon: "☀️",
      title: {
        en: "Equinox Solar Alignment Sanctum",
        hi: "विषुव सूर्य संरेखण गर्भगृह",
        gu: "વિષુવવૃત્ત સૂર્ય કિરણ ગર્ભગૃહ",
        mr: "विषुव सूर्यकिरण गर्भगृह",
        ta: "சூரிய ஒளி விழும் கருவறை",
        bn: "বিষুব সূর্যকিরণ গর্ভগৃহ"
      },
      architecturalSecret: {
        en: "On the exact days of the Spring and Autumn Equinox (March 21 & Sept 23), the first golden ray of the rising sun penetrates through the temple halls directly onto the jewel crown of Surya's idol.",
        hi: "विषुव (21 मार्च और 23 सितंबर) के दिन उगते सूर्य की पहली सुनहरी किरण सीधे गर्भगृह में सूर्य देव के मुकुट पर चमकती है।",
        gu: "૨૧ માર્ચ અને ૨૩ સપ્ટેમ્બરના વિષુવ દિવસે ઉગતા સૂર્યનું પહેલું સુવર્ણ કિરણ સીધું ગર્ભગૃહમાં સૂર્યદેવના મુકુટ પર પડે છે.",
        mr: "२१ मार्च आणि २३ सप्टेंबरला उगवत्या सूर्याचे पहिले किरण थेट गर्भगृहातील मूर्तीच्या मस्तकावर पडते.",
        ta: "மார்ச் 21 மற்றும் செப்டம்பர் 23 ஆகிய நாட்களில் உதிக்கும் சூரியனின் முதல் ஒளிக்கதிர் நேராக மூலவர் கிரீடத்தை ஒளிரச் செய்கிறது.",
        bn: "২১শে মার্চ এবং ২৩শে সেপ্টেম্বর উদীয়মান সূর্যের প্রথম আলো সরাসরি গর্ভগৃহে সূর্যমূর্তির কিরীটে পতিত হয়।"
      },
      audioNarrative: {
        en: "This sanctum was engineered in 1026 AD with celestial precision. On equinox mornings, the first ray of dawn illuminates the golden sanctum.",
        hi: "इस गर्भगृह का निर्माण 1026 ईस्वी में खगोलीय सटीकता के साथ किया गया था, जहां सूर्य की पहली किरण सीधे पहुंचती है।",
        gu: "ઈ.સ. ૧૦૨૬માં બનેલું આ અદ્ભુત ગર્ભગૃહ વિષુવના દિવસે સૂર્યના પ્રથમ કિરણથી ઝળહળી ઊઠે છે.",
        mr: "१०२६ मधील हे स्थापत्य विषुवाच्या दिवशी सूर्यकिरणांनी थेट उजळून निघते.",
        ta: "கி.பி 1026-ல் கட்டப்பட்ட இந்த கருவறை சூரியனின் முதல் கதிர்களை நேரடியாக ஈர்க்கும் வடிவம் கொண்டது.",
        bn: "১০২৬ খ্রিস্টাব্দে নির্মিত এই মন্দির গর্ভগৃহে সূর্যোদয়ের প্রথম কিরণ সরাসরি প্রবেশ করে।"
      }
    },
    {
      id: "modhera-hotspot-2",
      monumentId: "modhera-sun-temple",
      xPercent: 25,
      yPercent: 68,
      icon: "💧",
      title: {
        en: "Surya Kund Stepwell Geometry",
        hi: "सूर्य कुंड की ज्यामितीय सीढ़ियाँ",
        gu: "સૂર્ય કુંડની ભૌમિતિક પગથિયાં રચના",
        mr: "सूर्य कुंड पायऱ्यांची भूमिती",
        ta: "சூரிய குண்டம் படிக்கட்டு வடிவமைப்பு",
        bn: "সূর্য কুণ্ডের জ্যামিতিক সোপান"
      },
      architecturalSecret: {
        en: "Features 108 miniature carved shrines embedded into inverted pyramid steps representing the 108 sacred names of the Sun God in Vedic astronomy.",
        hi: "इसमें 108 लघु नक्काशीदार मंदिर शामिल हैं जो वैदिक खगोल विज्ञान में सूर्य देव के 108 पवित्र नामों का प्रतिनिधित्व करते हैं।",
        gu: "આ કુંડમાં ૧૦૮ નાના કંડારેલા મંદિરો છે જે સૂર્યનારાયણના ૧૦૮ પવિત્ર નામોનું પ્રતીક છે.",
        mr: "या कुंडात १०८ नक्षीकाम केलेली मंदिरे आहेत, जी सूर्याच्या १०૮ नावांचे प्रतीक आहेत.",
        ta: "இந்த தீர்த்தக் குளத்தில் வேத வானியலின் 108 சூரிய பெயர்களை குறிக்கும் 108 சிறிய சன்னதிகள் உள்ளன.",
        bn: "এখানে ১০৮টি খোদাই করা ছোট মন্দির রয়েছে যা বৈদিক জ্যোতির্বিজ্ঞানের ১০৮টি পবিত্র সূর্যের নামের প্রতীক।"
      },
      audioNarrative: {
        en: "Look down at the Surya Kund. The stepwell features 108 carved miniature shrines aligned in fractal geometry.",
        hi: "सूर्य कुंड की ओर देखें। इस बावड़ी में ज्यामितीय क्रम में 108 नक्काशीदार लघु मंदिर स्थित हैं।",
        gu: "સૂર્ય કુંડ તરફ જુઓ. આ કુંડમાં ભૌમિતિક રચનામાં ૧૦૮ કંડારેલા નાના મંદિરો આવેલા છે.",
        mr: "सूर्य कुंडाकडे पहा. यात १०८ कोरीव मंदिरे भूमितीय क्रमाने मांडलेली आहेत.",
        ta: "சூரிய குண்டத்தை பாருங்கள். இதில் 108 சிறிய சன்னதிகள் நேர்த்தியாக அமைக்கப்பட்டுள்ளன.",
        bn: "সূর্য কুণ্ডের দিকে লক্ষ্য করুন। ফ্র্যাক্টাল জ্যামিতিতে সাজানো ১০৮টি ছোট মন্দির রয়েছে।"
      }
    }
  ],

  // 3. Rani ki Vav (Patan)
  "rani-ki-vav": [
    {
      id: "vav-hotspot-1",
      monumentId: "rani-ki-vav",
      xPercent: 52,
      yPercent: 48,
      icon: "👑",
      title: {
        en: "Subterranean Inverted Temple Architecture",
        hi: "भूमिगत उल्टा मंदिर शिल्प",
        gu: "ભૂગર્ભ ઊંધું મંદિર સ્થાપત્ય",
        mr: "भूमिगत उलटे मंदिर स्थापत्य",
        ta: "தலைகீழ் நிலத்தடி கோயில்",
        bn: "ভূগর্ভস্থ উল্টানো মন্দির স্থাপত্য"
      },
      architecturalSecret: {
        en: "Built as an inverted subterranean temple descending 7 levels underground to honor the sacred purity of water as the giver of life.",
        hi: "जल की पवित्रता को पूजने के लिए इसे 7 मंजिला गहरे भूमिगत उल्टे मंदिर के रूप में तराशा गया है।",
        gu: "જળને પવિત્ર જીવનદાતા ગણીને ૭ માળ ઊંડા ભૂગર્ભમાં ઊંધા મંદિર સ્વરૂપે આ વાવનું નિર્માણ કરાયું છે.",
        mr: "पाण्याचे पावित्र્ય जपण्यासाठी ७ मजले खोल भूगर्भात उलटे मंदिर म्हणून ही वाव बांधली गेली.",
        ta: "நீரின் புனிதத்தை போற்றும் வகையில் 7 அடுக்குகள் கொண்ட தலைகீழ் நிலத்தடி கோயிலாக வடிவமைக்கப்பட்டுள்ளது.",
        bn: "জলের পবিত্রতাকে সম্মান জানাতে ৭ তলা গভীর উল্টানো মন্দির স্থাপত্য হিসেবে এটি নির্মিত।"
      },
      audioNarrative: {
        en: "Rani ki Vav descends seven levels into the earth, designed as an inverted sanctum where more than 800 sculptures remain naturally preserved.",
        hi: "रानी की वाव धरती में 7 स्तर नीचे उतरती है, जहां 800 से अधिक मूर्तियां आज भी सुरक्षित हैं।",
        gu: "રાણીની વાવ ૭ માળ ઊંડે ઊતરે છે, જ્યાં ૮૦૦થી વધુ શિલ્પો કુદરતી રીતે સચવાયેલા છે.",
        mr: "राणी की वाव जमिनीत ७ मजले खाली जाते, जिथे ८०० हून अधिक शिल्पे सुरक्षित आहेत.",
        ta: "ராணி கி வாவ் 7 அடுக்குகள் கீழே இறங்கிச் செல்லும் ஒரு தலைகீழ் ஆலயமாகும்.",
        bn: "রানি কি ভাব মাটির নিচে ৭ স্তর পর্যন্ত বিস্তৃত এক অপূর্ব স্থাপত্য।"
      }
    }
  ],

  // 4. Meenakshi Amman Temple
  "meenakshi-temple": [
    {
      id: "meenakshi-hotspot-1",
      monumentId: "meenakshi-temple",
      xPercent: 50,
      yPercent: 30,
      icon: "🛕",
      title: {
        en: "Southern Raja Gopuram Sculptures",
        hi: "दक्षिण राजा गोपुरम की 1500 मूर्तियां",
        gu: "દક્ષિણ ગોપુરમની ૧૫૦૦ રંગબેરંગી મૂર્તિઓ",
        mr: "दक्षिण गोपुरमवरील १५०० शिल्पे",
        ta: "தெற்கு ராஜ கோபுர சிற்பங்கள்",
        bn: "দক্ষিণ রাজ গোপুরমের ১৫০০ ভাস্কর্য"
      },
      architecturalSecret: {
        en: "The soaring 170-foot Southern Tower is adorned with 1,511 brightly painted stucco figures depicting scenes from ancient Tamil Sangam epics.",
        hi: "170 फीट ऊंचे दक्षिणी गोपुरम पर 1,511 रंगीन मूर्तियां प्राचीन तमिल संगम महाकाव्यों की गाथा सुनाती हैं।",
        gu: "૧૭૦ ફૂટ ઊંચા દક્ષિણ ગોપુરમ પર પ્રાચીન તમિલ સંગમ યુગના ૧૫૧૧ રંગબેરંગી શિલ્પો કંડારેલા છે.",
        mr: "१७० फूट उंच दक्षिण गोपुरमवर १५११ रंगीबेरंगी मूर्ती कोरलेल्या आहेत.",
        ta: "170 அடி உயரமுள்ள தெற்கு கோபுரத்தில் சங்க கால காவியங்களை விளக்கும் 1,511 வண்ணமயமான சிற்பங்கள் உள்ளன.",
        bn: "১৭০ ফুট উঁচু দক্ষিণ গোপুরমে প্রাচীন তামিল মহাকাব্যের ১৫১১টি রঙিন মূর্তি খোদাই করা।"
      },
      audioNarrative: {
        en: "Look up at the towering 170-foot South Gopuram with over 1500 vivid sculptures carved with Dravidian mastery.",
        hi: "170 फीट ऊंचे दक्षिण गोपुरम को देखें, जिस पर 1500 से अधिक जीवंत मूर्तियां उकेरी गई हैं।",
        gu: "૧૭૦ ફૂટ ઊંચા દક્ષિણ ગોપુરમને નિહાળો, જેના પર ૧૫૦૦થી વધુ સુંદર શિલ્પો છે.",
        mr: "१७० फूट उंच दक्षिण गोपुरमकडे पहा, ज्यावर १५०० हून अधिक शिल्पे आहेत.",
        ta: "170 அடி உயரமுள்ள கம்பீரமான தெற்கு கோபுரத்தை பாருங்கள்.",
        bn: "১৭০ ফুট উঁচু দক্ষিণ গোপুরমের দিকে তাকান যাতে ১৫০০টিরও বেশি নিখুঁত ভাস্কর্য রয়েছে।"
      }
    }
  ]
};

// Fallback Hotspots Generator for all other heritage wonders
export function getHotspotsForMonument(monumentId: string, monumentName: string): ArchitecturalHotspot[] {
  if (MONUMENT_HOTSPOTS[monumentId]) {
    return MONUMENT_HOTSPOTS[monumentId];
  }

  return [
    {
      id: `${monumentId}-hotspot-1`,
      monumentId,
      xPercent: 50,
      yPercent: 42,
      icon: "🏛️",
      title: {
        en: `${monumentName} Main Architectural Vista`,
        hi: `${monumentName} मुख्य वास्तुशिल्प दृश्य`,
        gu: `${monumentName} મુખ્ય સ્થાપત્ય દર્શન`,
        mr: `${monumentName} मुख्य वास्तू दर्शन`,
        ta: `${monumentName} முக்கிய கட்டிடக்கலை காட்சி`,
        bn: `${monumentName} মূল স্থাপত্য দৃশ্য`
      },
      architecturalSecret: {
        en: "Constructed with indigenous stonework and interlocking dry-masonry techniques that withstand centuries of seasonal monsoons and seismic shifts.",
        hi: "यह प्राचीन इंटरलॉकिंग पत्थर शिल्प तकनीक से निर्मित है जो शताब्दियों से मौसम और भूकंप को सहन कर रहा है।",
        gu: "પ્રાચીન પથ્થર જોડાણ પદ્ધતિથી બનેલું આ સ્થાપત્ય સદીઓથી અડીખમ ઊભું છે.",
        mr: "प्राचीन दगडी इंटरलॉकिंग तंत्रज्ञानाने बांधलेली ही वास्तू शतकांपासून टिकून आहे.",
        ta: "பண்டைய இந்திய கட்டிடக்கலை நுணுக்கத்துடன் கட்டப்பட்ட வரலாற்று சின்னம்.",
        bn: "প্রাচীন ভারতীয় স্থাপত্য কৌশলে নির্মিত শতাব্দী প্রাচীন এক ঐতিহাসিক বিস্ময়।"
      },
      audioNarrative: {
        en: `Explore the magnificent historic core of ${monumentName}, reflecting centuries of Indian craftsmanship and cultural heritage.`,
        hi: `${monumentName} के ऐतिहासिक शिल्प को देखें, जो भारतीय सांस्कृतिक धरोहर का प्रतीक है।`,
        gu: `${monumentName} ના ભવ્ય ઐતિહાસિક સ્થાપત્યને નિહાળો, જે ભારતીય સંસ્કૃતિનું ગૌરવ છે.`,
        mr: `${monumentName} ची ऐतिहासिक वास्तू भारतीय संस्कृतीचे प्रतीक आहे.`,
        ta: `${monumentName} இன் பிரம்மாண்ட வரலாற்று கலைப்படைப்பை கண்டுகளியுங்கள்.`,
        bn: `${monumentName}-এর ঐতিহাসিক ও সাংস্কৃতিক গুরুত্ব গভীরভাবে অনুভব করুন।`
      }
    }
  ];
}
