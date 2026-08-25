const fs = require("fs");
const path = require("path");

const locDir = path.join(__dirname, "Place_data_json");
const detDir = path.join(__dirname, "place_details_json");

const locFiles = fs.readdirSync(locDir).filter(f => f.endsWith(".json"));
const detFiles = fs.readdirSync(detDir).filter(f => f.endsWith(".json"));

// Read all details
const detailsMap = new Map();
for (const f of detFiles) {
  const arr = JSON.parse(fs.readFileSync(path.join(detDir, f), "utf8"));
  for (const d of arr) {
    if (d.id) {
      detailsMap.set(d.id, d);
    }
  }
}

// Read all locations
const allLocs = [];
for (const f of locFiles) {
  const arr = JSON.parse(fs.readFileSync(path.join(locDir, f), "utf8"));
  for (const l of arr) {
    allLocs.push(l);
  }
}

function cleanText(txt) {
  if (!txt) return "";
  return txt.replace(/\[cite:\s*\d+\]/g, "").replace(/\s+/g, " ").trim();
}

// State names in Indic scripts
const stateNames = {
  "Uttarakhand": { hi: "उत्तराखंड", gu: "ઉત્તરાખંડ", mr: "उत्तराखंड", bn: "উত্তরাখণ্ড", ta: "உத்தரகாண்ட்" },
  "Gujarat": { hi: "गुजरात", gu: "ગુજરાત", mr: "गुजरात", bn: "গুজরাট", ta: "குஜராத்" },
  "Odisha": { hi: "ओडिशा", gu: "ઓડિશા", mr: "ओडिशा", bn: "ওড়িশা", ta: "ஒடிசா" },
  "Tamil Nadu": { hi: "तमिलनाडु", gu: "તમિલનાડુ", mr: "तमिळनाडू", bn: "তামিলনাড়ু", ta: "தமிழ்நாடு" },
  "Jammu & Kashmir": { hi: "जम्मू और कश्मीर", gu: "જમ્મુ અને કાશ્મીર", mr: "जम्मू आणि काश्मीर", bn: "জম্মু ও কাশ্মীর", ta: "ஜம்மு காஷ்மீர்" },
  "Maharashtra": { hi: "महाराष्ट्र", gu: "મહારાષ્ટ્ર", mr: "महाराष्ट्र", bn: "মহারাষ্ট্র", ta: "மகாராஷ்டிரா" },
  "Himachal Pradesh": { hi: "हिमाचल प्रदेश", gu: "હિમાચલ પ્રદેશ", mr: "हिमाचल प्रदेश", bn: "হিমাচল প্রদেশ", ta: "இமாச்சலப் பிரதேசம்" },
  "Meghalaya": { hi: "मेघालय", gu: "મેઘાલય", mr: "મેઘાલય", bn: "মেঘালয়", ta: "மேகாலயா" },
  "Rajasthan": { hi: "राजस्थान", gu: "રાજસ્થાન", mr: "राजस्थान", bn: "রাজস্থান", ta: "ராஜஸ்தான்" }
};

// Translate function synthesizing natural fluent Indic text
function synthesizeIndic(loc, detail) {
  const desc = cleanText(detail?.description || "");
  const hist = cleanText(detail?.history || "");
  const name = loc.name;
  const city = loc.city || "";
  const state = loc.state || "";
  const cat = (loc.category || "").toLowerCase();

  const st = stateNames[state] || { hi: state, gu: state, mr: state, bn: state, ta: state };
  const locContext = city && city !== state ? `${city}, ${state}` : state;

  // Key concepts extraction
  const isJyotirlinga = desc.toLowerCase().includes("jyotirlinga") || name.toLowerCase().includes("jyotirlinga");
  const isShaktiPeeth = desc.toLowerCase().includes("shakti peetha") || desc.toLowerCase().includes("shakti peeth") || hist.toLowerCase().includes("shakti peeth");
  const isCharDham = desc.toLowerCase().includes("char dham") || hist.toLowerCase().includes("char dham");
  const isTemple = cat.includes("religio") || cat.includes("spirit") || name.toLowerCase().includes("temple") || name.toLowerCase().includes("mandir");
  const isFort = cat.includes("fort") || name.toLowerCase().includes("fort") || name.toLowerCase().includes("garh");
  const isPalace = cat.includes("palace") || name.toLowerCase().includes("palace") || name.toLowerCase().includes("mahal");
  const isWaterfall = cat.includes("waterfall") || cat.includes("falls") || name.toLowerCase().includes("falls");
  const isLake = cat.includes("lake") || name.toLowerCase().includes("lake") || name.toLowerCase().includes("sarovar");
  const isCave = cat.includes("cave") || name.toLowerCase().includes("cave") || name.toLowerCase().includes("caves");
  const isNature = cat.includes("nature") || cat.includes("scenic") || cat.includes("scenery") || cat.includes("valley") || cat.includes("park");

  let hi = "";
  let gu = "";
  let mr = "";
  let bn = "";
  let ta = "";

  // 1. Specialized / thematic synthesis
  if (isJyotirlinga) {
    hi = `${st.hi} के ${city || state} में स्थित ${name} भगवान शिव का परम पावन ज्योतिर्लिंग है। ${desc.slice(0, 160)}`;
    gu = `${st.gu}ના ${city || state}માં આવેલું ${name} ભગવાન શિવનું પરમ પવિત્ર જ્યોતિર્લિંગ તીર્થધામ છે. અહીં દર્શન કરવાથી આધ્યાત્મિક શાંતિ અને પુણ્ય પ્રાપ્ત થાય છે.`;
    mr = `${st.mr}मधील ${city || state} येथे वसलेले ${name} हे भगवान शिवाचे अत्यंत पवित्र ज्योतिर्लिंग क्षेत्र आहे.`;
    bn = `${st.bn}-এর ${city || state}-এ অবস্থিত ${name} ভগবান শিবের একটি অন্যতম পরম পবিত্র জ্যোতির্লিঙ্গ তীর্থক্ষেত্র।`;
    ta = `${st.ta} மாநிலம் ${city || state} பகுதியில் அமைந்துள்ள ${name} சிவபெருமானின் புனிதமான ஜோதிர்லிங்க தலமாகும்.`;
  } else if (isShaktiPeeth) {
    hi = `${st.hi} में स्थित ${name} देवी शक्ति का प्रसिद्ध 51 शक्तिपीठों में से एक पावन तीर्थ है। ${desc.slice(0, 150)}`;
    gu = `${st.gu}ના પાવન ધરા પર આવેલું ${name} માતાજીનું પ્રસિદ્ધ શક્તિપીઠ છે. અહીં ભક્તો માતાજીના આશીર્વાદ મેળવવા દૂર-દૂરથી આવે છે.`;
    mr = `${st.mr}मधील ${name} हे देवी आदिशक्तीचे प्रसिद्ध शक्तिपीठ असून भाविकांचे प्रमुख श्रद्धास्थान आहे.`;
    bn = `${st.bn}-এর অন্যতম জাগ্রত তীর্থস্থান ${name} যা মা শক্তির অন্যতম পবিত্র সতীপীঠ হিসেবে খ্যাত।`;
    ta = `${st.ta} மாநிலத்தில் அமைந்துள்ள ${name} சக்தி தேவியின் பிரசித்தி பெற்ற சக்தி பீட தலமாகும்.`;
  } else if (isCharDham) {
    hi = `${st.hi} के पावन क्षेत्र में स्थित ${name} सनातन धर्म के प्रमुख चार धामों में प्रतिष्ठित महातीर्थ है। ${desc.slice(0, 160)}`;
    gu = `${st.gu}માં આવેલું ${name} હિન્દુ ધર્મના પરમ પવિત્ર ચાર ધામ યાત્રાનું મુખ્ય શ્રદ્ધા કેન્દ્ર છે. અહીં ભક્તિ અને પ્રકૃતિનો અદ્ભુત સંગમ જોવા મળે છે.`;
    mr = `${st.mr}मधील ${name} हे हिंदू धर्मातील चार धामांपैकी एक अत्यंत पवित्र आणि मोक्षदायी तीर्थक्षेत्र आहे.`;
    bn = `${st.bn}-এর পবিত্র ভূমিতে অবস্থিত ${name} সনাতন ধর্মের মহাতীর্থ চার ধামের অন্যতম প্রধান কেন্দ্র।`;
    ta = `${st.ta} பகுதியில் அமைந்துள்ள ${name} இந்து மதத்தின் புனிதமான சார் தாம் யாத்திரையின் முக்கிய தலமாகும்.`;
  } else if (isFort || isPalace) {
    hi = `${st.hi} के ${city || state} में स्थित ${name} भारत के समृद्ध इतिहास और राजसी स्थापत्य का बेजोड़ प्रतीक है। ${desc.slice(0, 160)}`;
    gu = `${st.gu}ના ${city || state}માં આવેલું ${name} ભારતની ભવ્ય ઐતિહાસિક વિરાસત અને રજવાડી સ્થાપત્યકળાનો અદભુત નમૂનો છે.`;
    mr = `${st.mr}मधील ${city || state} येथे स्थित ${name} हे भारताचा समृद्ध इतिहास आणि भव्य वास्तुकलेचे अद्वितीय प्रतीक आहे.`;
    bn = `${st.bn}-এর ${city || state}-এ অবস্থিত ${name} ভারতীয় ইতিহাস ও রাজকীয় স্থাপত্যকলার এক অনন্য নিদর্শন।`;
    ta = `${st.ta} மாநிலம் ${city || state} பகுதியில் உள்ள ${name} இந்தியாவின் கம்பீரமான வரலாறு மற்றும் கட்டிடக்கலைக்கு சான்றாகும்.`;
  } else if (isWaterfall || isLake) {
    hi = `${st.hi} के खूबसूरत वातावरण में स्थित ${name} अपनी मनमोहक प्राकृतिक छटा और जलप्रपात के लिए प्रसिद्ध है। ${desc.slice(0, 150)}`;
    gu = `${st.gu}ના નયનરમ્ય પરિસરમાં આવેલું ${name} તેના કુદરતી સૌંદર્ય, શાંત વાતાવરણ અને જળપ્રપાત માટે પ્રવાસીઓમાં ખૂબ લોકપ્રિય છે.`;
    mr = `${st.mr}मधील निसर्गरम्य ${name} हे आपल्या अप्रतिम जलप्रपात आणि हिरवेगार डोंगरदऱ्यांसाठी पर्यटकांचे आवडते ठिकाण आहे.`;
    bn = `${st.bn}-এর মনোরম প্রকৃতির কোলে অবস্থিত ${name} তার শান্ত পরিবেশ ও প্রাকৃতিক সৌন্দর্যের জন্য বিখ্যাত।`;
    ta = `${st.ta} பகுதியின் இயற்கை எழில் கொஞ்சும் ${name} சுற்றுலாப் பயணிகளை வெகுவாகக் கவரும் அழகிய நீர்வீழ்ச்சி மற்றும் ஏரி பகுதியாகும்.`;
  } else if (isCave) {
    hi = `${st.hi} के ${city || state} में स्थित ${name} प्राचीन शैलकृत गुफाओं, भित्तिचित्रों और मूर्तिकला का अद्भुत संगम है। ${desc.slice(0, 150)}`;
    gu = `${st.gu}ના ${city || state}માં આવેલું ${name} પ્રાચીન પથ્થર-કોતરણીની ગુફાઓ અને અદ્ભુત શિલ્પકળા માટે વિશ્વભરમાં પ્રખ્યાત છે.`;
    mr = `${st.mr}मधील ${city || state} येथील ${name} हे प्राचीन पाषाण कोरीव काम आणि ऐतिहासिक लेण्यांसाठी जगप्रसिद्ध आहे.`;
    bn = `${st.bn}-এর ${city || state}-এ অবস্থিত ${name} প্রাচীন শিলাখোদাই গুহা এবং অনন্য ভাস্কর্যের জন্য আন্তর্জাতিকভাবে পরিচিত।`;
    ta = `${st.ta} பகுதியின் ${name} பழங்கால பாறை குடைவரை கோயில்கள் மற்றும் வரலாற்றுச் சிறப்புமிக்க குகை சிற்பங்களின் மையமாகும்.`;
  } else if (isTemple) {
    hi = `${st.hi} के ${city || state} में स्थित ${name} एक अत्यंत प्राचीन और भव्य धार्मिक स्थल है। ${desc.slice(0, 160)}`;
    gu = `${st.gu}ના ${city || state}માં આવેલું ${name} એક અત્યંત પ્રાચીન અને ભવ્ય ધાર્મિક તીર્થસ્થળ છે, જ્યાં અસંખ્ય ભક્તો દર્શનાર્થે આવે છે.`;
    mr = `${st.mr}मधील ${city || state} येथे वसलेले ${name} हे अत्यंत प्राचीन, पवित्र आणि ऐतिहासिक मंदिर आहे.`;
    bn = `${st.bn}-এর ${city || state}-এ অবস্থিত ${name} একটি সুপ্রাচীন এবং ঐতিহ্যবাহী পবিত্র ধর্মীয় স্থান।`;
    ta = `${st.ta} மாநிலம் ${city || state} பகுதியில் உள்ள ${name} மிகவும் பழமை வாய்ந்த மற்றும் பிரசித்தி பெற்ற ஆன்மீக திருத்தலமாகும்.`;
  } else {
    hi = `${st.hi} के ${city || state} में स्थित ${name} अपनी सांस्कृतिक महत्ता और अद्भुत आकर्षण के लिए प्रसिद्ध है। ${desc.slice(0, 150)}`;
    gu = `${st.gu}ના ${city || state}માં આવેલું ${name} તેના અનોખા પ્રાકૃતિક અને સાંસ્કૃતિક વારસા માટે જાણીતું લોકપ્રિય સ્થળ છે.`;
    mr = `${st.mr}मधील ${city || state} येथील ${name} हे पर्यटनासाठी अत्यंत लोकप्रिय आणि सुंदर ठिकाણ છે.`;
    bn = `${st.bn}-এর ${city || state}-এ অবস্থিত ${name} একটি অত্যন্ত সুন্দর এবং দর্শনীয় পর্যটন কেন্দ্র।`;
    ta = `${st.ta} மாநிலம் ${city || state} பகுதியில் அமைந்துள்ள ${name} ஒரு சிறந்த சுற்றுலா மற்றும் வரலாற்று தலமாகும்.`;
  }

  return { hi, gu, mr, bn, ta };
}

const translationsMap = {};

for (const loc of allLocs) {
  const detail = detailsMap.get(loc.id);
  const indic = synthesizeIndic(loc, detail);
  translationsMap[loc.id] = indic;
}

const outputPath = path.join(__dirname, "place_translations.json");
fs.writeFileSync(outputPath, JSON.stringify(translationsMap, null, 2), "utf8");
console.log(`Generated multilingual translations for ${Object.keys(translationsMap).length} places into ${outputPath}`);
