// Verified 360° Virtual Walkthrough & Tour Dataset
// Maps authentic Google Street View and 360Cities interactive panoramas to monuments

export interface Place360Entry {
  id: string;
  name: string;
  state: string;
  city?: string;
  tour360Url: string;
  hindiNarration?: string;
  description?: string;
  history?: string;
  facilities?: Record<string, boolean | string | number | undefined>;
  ticketPrices?: Record<string, number | string | undefined>;
}

export const verified360TourEntries: Place360Entry[] = [
  // 🕉️ BADA CHAR DHAM
  {
    id: "UT-BAD-001",
    name: "Badrinath Temple (North Dham)",
    state: "Uttarakhand",
    city: "Chamoli",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=30.7448,79.4912&cbp=12,210,,0,0&output=svembed",
    hindiNarration: "बद्रीनाथ मंदिर में आपका स्वागत है। यह भारत के चार मुख्य धामों में से उत्तरी धाम है, जो भगवान विष्णु को समर्पित है। आदि शंकराचार्य जी ने आठवीं शताब्दी में इसकी स्थापना की थी।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", taptKundBaths: "Available" },
    ticketPrices: { general: "Free", specialPuja: "INR 500+" }
  },
  {
    id: "OD-PUR-005",
    name: "Shree Jagannath Temple (East Dham)",
    state: "Odisha",
    city: "Puri",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=19.8049,85.8179&cbp=12,270,,0,-15&output=svembed",
    hindiNarration: "श्री जगन्नाथ मंदिर, पुरी में आपका स्वागत है। यह चार धामों में पूर्वी धाम है, जो भगवान जगन्नाथ, बलभद्र और सुभद्रा को समर्पित है। यह अपनी विश्वप्रसिद्ध रथ यात्रा के लिए जाना जाता है।",
    facilities: { shoeStand: "Available at Singhadwara", anandaBazar: "Mahaprasad dining" },
    ticketPrices: { general: "Free" }
  },
  {
    id: "TN-RAM-010",
    name: "Ramanathaswamy Temple (South Dham)",
    state: "Tamil Nadu",
    city: "Rameswaram",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=9.2881,79.3174&cbp=12,90,,0,0&output=svembed",
    hindiNarration: "रामेश्वरम के रामनाथस्वामी मंदिर में आपका स्वागत है। यह दक्षिण का पावन धाम है, जो भगवान शिव और बाइस पवित्र तीर्थ कुंडों के लिए प्रसिद्ध है।",
    facilities: { theerthamBaths: "22 Wells", wheelchairAccessible: "Yes" },
    ticketPrices: { general: "Free", theerthamSnanam: "INR 25" }
  },
  {
    id: "GJ-DWK-015",
    name: "Dwarkadhish Temple (West Dham)",
    state: "Gujarat",
    city: "Dwarka",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=22.2376,68.9678&cbp=12,270,,0,0&output=svembed",
    hindiNarration: "द्वारकाधीश मंदिर, गुजरात में आपका स्वागत है। यह भगवान कृष्ण को समर्पित पश्चिम का पावन धाम है, जिसे जगत मंदिर भी कहा जाता है।",
    facilities: { shoeStand: "Available", lockerRoom: "Available" },
    ticketPrices: { general: "Free" }
  },
  {
    id: "GJ-DWK-002",
    name: "Dwarkadhish Temple (જગત મંદિર દ્વારકા)",
    state: "Gujarat",
    city: "Dwarka",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=22.2376,68.9678&cbp=12,270,,0,0&output=svembed",
    hindiNarration: "द्वारकाधीश जगत मंदिर में आपका स्वागत है। गोमती नदी के संगम पर स्थित यह पावन धाम भगवान कृष्ण की राजधानी और चार धामों में से एक है।",
    facilities: { parking: "Available", wheelchairAccessible: "Partial", restrooms: "Available", lockerRoom: "Available", shoeStand: "Available" },
    ticketPrices: { general: "Free", vipDarshan: "Free" }
  },
  {
    id: "GJ-DWA-014",
    name: "Dwarkadhish Temple",
    state: "Gujarat",
    city: "Dwarka",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=22.2376,68.9678&cbp=12,270,,0,0&output=svembed"
  },

  // 🏔️ CHHOTA CHAR DHAM (UTTARAKHAND)
  {
    id: "UT-YAM-101",
    name: "Yamunotri Temple",
    state: "Uttarakhand",
    city: "Uttarkashi",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=31.0139,78.4600&cbp=12,330,,0,-15&output=svembed",
    hindiNarration: "यमुनोत्री मंदिर में आपका स्वागत है। यह पवित्र यमुना नदी का उद्गम स्थल और छोटा चार धाम यात्रा का पहला पड़ाव है।",
    facilities: { hotWaterSprings: "Surya Kund", ponyService: "Available" },
    ticketPrices: { entry: "Free" }
  },
  {
    id: "UT-YAM-001",
    name: "Yamunotri Temple",
    state: "Uttarakhand",
    city: "Uttarkashi",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=31.0139,78.4600&cbp=12,330,,0,-15&output=svembed"
  },
  {
    id: "UT-KED-109",
    name: "Kedarnath Temple",
    state: "Uttarakhand",
    city: "Rudraprayag",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=30.7352,79.0669&cbp=12,0,,0,0&output=svembed",
    hindiNarration: "केदारनाथ ज्योतिर्लिंग मंदिर में आपका स्वागत है। हिमालय की गोद में बसा यह पावन धाम भगवान शिव का प्रमुख निवास स्थान है।",
    facilities: { helipad: "Shuttle available", gmvnTents: "Available" },
    ticketPrices: { entry: "Free", helicopter: "INR 3000+" }
  },
  {
    id: "UT-KED-001",
    name: "Kedarnath Temple",
    state: "Uttarakhand",
    city: "Rudraprayag",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=30.7352,79.0669&cbp=12,0,,0,0&output=svembed"
  },
  {
    id: "UT-PRY-116",
    name: "Devprayag Sangam",
    state: "Uttarakhand",
    city: "Tehri Garhwal",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=30.1458,78.5986&cbp=12,150,,0,0&output=svembed",
    hindiNarration: "देवप्रयाग संगम में आपका स्वागत है। यहाँ भागीरथी और अलकनंदा नदियों का पावन मिलन होता है, जहाँ से गंगा नदी का स्वरूप बनता है।",
    facilities: { bathingGhat: "Sangam Ghat", suspensionBridge: "Available" },
    ticketPrices: { entry: "Free" }
  },
  {
    id: "UT-PRY-117",
    name: "Rudraprayag Sangam",
    state: "Uttarakhand",
    city: "Rudraprayag",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=30.2847,78.9811&cbp=12,45,,0,0&output=svembed",
    hindiNarration: "रुद्रप्रयाग संगम में आपका स्वागत है। यहाँ अलकनंदा और मंदाकिनी नदियों का संगम होता है, जो भगवान शिव के रुद्र रूप से जुड़ा है।",
    facilities: { wheelchairAccessible: "Yes", sangamGhat: "Available" },
    ticketPrices: { entry: "Free" }
  },

  // 🦁 GUJARAT
  {
    id: "GJ-SOM-001",
    name: "Somnath Jyotirlinga Temple (સોમનાથ મહાદેવ)",
    state: "Gujarat",
    city: "Prabhas Patan, Veraval",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=20.8880,70.4012&cbp=12,210,,0,0&output=svembed",
    hindiNarration: "सोमनाथ ज्योतिर्लिंग मंदिर में आपका स्वागत है। समुद्र तट पर स्थित यह भगवान शिव के 12 पावन ज्योतिर्लिंगों में से प्रथम ज्योतिर्लिंग है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", lockerRoom: "Available", shoeStand: "Available" },
    ticketPrices: { general: "Free", lightAndSoundShowAdult: "INR 30", lightAndSoundShowChild: "INR 15" }
  },
  {
    id: "GJ-PAT-014",
    name: "Rani Ki Vav (રાણકી વાવ)",
    state: "Gujarat",
    city: "Patan",
    tour360Url: "https://www.360cities.net/embed_iframe/well-of-the-queen-s-steps-india",
    hindiNarration: "रानी की वाव, पाटण में आपका स्वागत है। सोलंकी वास्तुकला में बनी सात मंजिला यह ऐतिहासिक बावड़ी यूनेस्को विश्व धरोहर है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", garden: "Available" },
    ticketPrices: { indianAdult: "INR 40", foreignAdult: "INR 600", childrenBelow15: "Free" }
  },
  {
    id: "GJ-PAT-004",
    name: "Rani Ki Vav Patan",
    state: "Gujarat",
    city: "Patan",
    tour360Url: "https://www.360cities.net/embed_iframe/well-of-the-queen-s-steps-india"
  },
  {
    id: "GJ-MSH-016",
    name: "Sun Temple Modhera (મોઢેરા સૂર્ય મંદિર)",
    state: "Gujarat",
    city: "Modhera, Mehsana",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=23.5835,72.1330&cbp=12,90,,0,0&output=svembed",
    hindiNarration: "मोढेरा सूर्य मंदिर में आपका स्वागत है। यह ग्यारहवीं शताब्दी का मंदिर अपनी अद्भुत वास्तुकला और सूर्य कुंड के लिए जाना जाता है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", museum: "Available", cafeteria: "Available" },
    ticketPrices: { indianAdult: "INR 40", foreignAdult: "INR 600", childrenBelow15: "Free" }
  },
  {
    id: "GJ-MOD-005",
    name: "Sun Temple Modhera",
    state: "Gujarat",
    city: "Modhera",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=23.5835,72.1330&cbp=12,90,,0,0&output=svembed"
  },
  {
    id: "GJ-BRD-020",
    name: "Laxmi Vilas Palace (લક્ષ્મી વિલાસ પેલેસ)",
    state: "Gujarat",
    city: "Vadodara",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=22.2937,73.1908&cbp=12,300,,0,0&output=svembed",
    hindiNarration: "लक्ष्मी विलास पैलेस, वडोदरा में आपका स्वागत है। बकिंघम पैलेस से चार गुना बड़ा यह महल गायकवाड़ राजवंश का भव्य निवास है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", audioGuide: "Included", cafe: "Available" },
    ticketPrices: { indianAdult: "INR 250", foreignAdult: "INR 600", palaceAndMuseumCombo: "INR 350" }
  },
  {
    id: "GJ-AMD-022",
    name: "Sidi Saiyyed Mosque (સીદી સૈયદની જાળી)",
    state: "Gujarat",
    city: "Ahmedabad",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=23.0284,72.5815&cbp=12,90,,0,0&output=svembed",
    hindiNarration: "सीदी सैयद की जाली, अहमदाबाद में आपका स्वागत है। पीले बलुआ पत्थर पर नक्काशीदार ट्री ऑफ लाइफ जाली पूरी दुनिया में अपनी बारीक कलाकारी के लिए मशहूर है।",
    facilities: { parking: "Available on road", shoeCounter: "Available" },
    ticketPrices: { entry: "Free" }
  },
  {
    id: "GJ-JUN-023",
    name: "Uparkot Fort (ઉપરકોટનો કિલ્લો)",
    state: "Gujarat",
    city: "Junagadh",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=21.5167,70.4667&cbp=12,45,,0,0&output=svembed",
    hindiNarration: "जूनागढ़ के ऊपरकोट किले में आपका स्वागत है। मौर्य काल का यह प्राचीन किला बौद्ध गुफाओं, अड़ी-कड़ी वाव और नवघन कुएं के ऐतिहासिक रहस्यों को समेटे हुए है।",
    facilities: { parking: "Available", restrooms: "Available", laserShow: "Available" },
    ticketPrices: { indianAdult: "INR 50", foreignAdult: "INR 500" }
  },
  {
    id: "GJ-AMD-029",
    name: "Historic Pols of Old Ahmedabad (અમદાવાદની પોળ)",
    state: "Gujarat",
    city: "Ahmedabad",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=23.0245,72.5898&cbp=12,180,,0,0&output=svembed",
    hindiNarration: "पुराने अहमदाबाद की ऐतिहासिक पोलों में आपका स्वागत है। नक्काशीदार लकड़ी के मकानों वाली यह बस्ती भारत का पहला यूनेस्को हेरिटेज शहर है।",
    facilities: { parking: "No (Narrow lanes)", wheelchairAccessible: "No", restrooms: "Available", guidedHeritageWalk: "Available" },
    ticketPrices: { general: "Free", amcHeritageWalk: "INR 200" }
  },
  {
    id: "GJ-AMD-030",
    name: "Sabarmati Gandhi Ashram (સાબરમતી આશ્રમ)",
    state: "Gujarat",
    city: "Ahmedabad",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=23.0605,72.5806&cbp=12,270,,0,0&output=svembed",
    hindiNarration: "साबरमती आश्रम में आपका स्वागत है। महात्मा गांधी की यह कर्मभूमि स्वतंत्रता संग्राम और ऐतिहासिक दांडी यात्रा का उद्गम केंद्र रही है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", bookstore: "Available", archives: "Available" },
    ticketPrices: { general: "Free" }
  },
  {
    id: "GJ-DWK-049",
    name: "Shivrajpur Blue Flag Beach (શિવરાજપુર બીચ)",
    state: "Gujarat",
    city: "Shivrajpur, Dwarka",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=22.3328,68.9536&cbp=12,270,,0,0&output=svembed",
    hindiNarration: "शिवराजपुर ब्लू फ्लैग बीच में आपका स्वागत है। द्वारका के निकट स्थित यह समुद्र तट अपने स्वच्छ जल और वॉटर स्पोर्ट्स के लिए प्रसिद्ध है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", scubaDiving: "Available", showers: "Available" },
    ticketPrices: { entryAdult: "INR 30", entryChild: "INR 15", scubaDivingApprox: "INR 2500" }
  },

  // 🏰 RAJASTHAN
  {
    id: "RJ-RJ-001",
    name: "Amber Fort",
    state: "Rajasthan",
    city: "Jaipur",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=26.9855,75.8513&cbp=12,210,,0,0&output=svembed",
    hindiNarration: "आमेर किले, जयपुर में आपका स्वागत है। संगमरमर और लाल बलुआ पत्थर से बना यह किला अपने शीश महल और राजपूती शान के लिए प्रसिद्ध है।",
    facilities: { elephantRide: "Available", audioGuide: "Available" },
    ticketPrices: { indianAdult: "INR 50", foreignAdult: "INR 500" }
  },
  {
    id: "RJ-RJ-002",
    name: "Mehrangarh Fort",
    state: "Rajasthan",
    city: "Jodhpur",
    tour360Url: "https://www.360cities.net/embed_iframe/mehrangarh-fort-jodhpur-rajasthan-india",
    hindiNarration: "मेहरानगढ़ किला, जोधपुर में आपका स्वागत है। पहाड़ी पर स्थित यह भारत के सबसे विशाल और भव्य किलों में से एक है।",
    facilities: { elevator: "Available", museum: "Available" },
    ticketPrices: { indianAdult: "INR 100", foreignAdult: "INR 600" }
  },
  {
    id: "RJ-RJ-003",
    name: "Chittorgarh Fort",
    state: "Rajasthan",
    city: "Chittorgarh",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=24.8879,74.6454&cbp=12,45,,0,0&output=svembed",
    hindiNarration: "चित्तौड़गढ़ किले में आपका स्वागत है। यह विशाल किला राजपूती शौर्य, त्याग और विजय स्तंभ की ऐतिहासिक धरोहर है।",
    facilities: { parking: "Available", guideService: "Available" },
    ticketPrices: { indianAdult: "INR 40", foreignAdult: "INR 600" }
  },
  {
    id: "RJ-RJ-004",
    name: "City Palace Udaipur",
    state: "Rajasthan",
    city: "Udaipur",
    tour360Url: "https://www.360cities.net/embed_iframe/court-yard-in-the-palace-at-udaipur",
    hindiNarration: "सिटी पैलेस, उदयपुर में आपका स्वागत है। पिछोला झील के किनारे स्थित यह महल मेवाड़ राजवंश की अद्वितीय वास्तुकला को दर्शाता है।",
    facilities: { guidedTours: "Available", restrooms: "Available" },
    ticketPrices: { indianAdult: "INR 300", foreignAdult: "INR 400" }
  },
  {
    id: "RJ-RJ-014",
    name: "Nakki Lake",
    state: "Rajasthan",
    city: "Mount Abu",
    tour360Url: "https://www.360cities.net/embed_iframe/nakki-lake",
    hindiNarration: "माउंट आबू की नक्की झील में आपका स्वागत है। अरावली की पहाड़ियों में स्थित यह पवित्र झील अपनी सुंदरता और नौकायन के लिए प्रसिद्ध है।",
    facilities: { boating: "Available", restaurants: "Surrounding lake" },
    ticketPrices: { boatingFee: "INR 200 - 400" }
  },

  // 🚩 MAHARASHTRA
  {
    id: "MH-CSN-005",
    name: "Ajanta Caves",
    state: "Maharashtra",
    city: "Chhatrapati Sambhajinagar",
    tour360Url: "https://www.360cities.net/embed_iframe/ajanta-caves-aurangabad-no2-india",
    hindiNarration: "अजंता की गुफाओं में आपका स्वागत है। चट्टानों को काटकर बनाई गई ये बौद्ध गुफाएं प्राचीन भारतीय भित्तिचित्रों और मूर्तिकला का उत्कृष्ट उदाहरण हैं।",
    facilities: { shuttleBus: "Available", parking: "Available" },
    ticketPrices: { indianAdult: "INR 40", foreignAdult: "INR 600" }
  },
  {
    id: "MH-MUM-009",
    name: "Gateway of India",
    state: "Maharashtra",
    city: "Mumbai",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=18.9220,72.8347&cbp=12,90,,0,0&output=svembed",
    hindiNarration: "गेटवे ऑफ इंडिया, मुंबई में आपका स्वागत है। अरब सागर के तट पर स्थित यह ऐतिहासिक स्मारक मुंबई का प्रमुख लैंडमार्क है।",
    facilities: { ferry: "Available", photography: "Allowed" },
    ticketPrices: { entry: "Free" }
  },
  {
    id: "MH-PUN-008",
    name: "Shaniwar Wada",
    state: "Maharashtra",
    city: "Pune",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=18.5196,73.8553&cbp=12,180,,0,0&output=svembed",
    hindiNarration: "शनिवार वाड़ा, पुणे में आपका स्वागत है। यह अठारहवीं शताब्दी का ऐतिहासिक किला मराठा साम्राज्य के पेशवाओं का मुख्य निवास स्थान था।",
    facilities: { lightAndSound: "Evening shows", garden: "Courtyard" },
    ticketPrices: { indianAdult: "INR 25", foreignAdult: "INR 300" }
  },
  {
    id: "MH-PUN-012",
    name: "Aga Khan Palace",
    state: "Maharashtra",
    city: "Pune",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=18.5524,73.9015&cbp=12,210,,0,0&output=svembed",
    hindiNarration: "आगा खान पैलेस, पुणे में आपका स्वागत है। यह ऐतिहासिक महल महात्मा गांधी और स्वतंत्रता संग्राम के अनमोल इतिहास को संजोए हुए है।",
    facilities: { gandhiMuseum: "Available", parking: "Available" },
    ticketPrices: { indianAdult: "INR 25", foreignAdult: "INR 300" }
  },
  {
    id: "MH-BLD-017",
    name: "Lonar Crater Lake",
    state: "Maharashtra",
    city: "Lonar",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=19.9760,76.5070&cbp=12,120,,0,0&output=svembed",
    hindiNarration: "लोनार झील में आपका स्वागत है। उल्कापिंड के टकराने से बनी यह अनोखी खारे पानी की झील वैज्ञानिकों और पर्यटकों के लिए एक बड़ा रहस्य है।",
    facilities: { trekking: "Crater rim trail", viewpoint: "Available" },
    ticketPrices: { entry: "Free" }
  },

  // 🛕 TAMIL NADU
  {
    id: "TN-THA-002",
    name: "Brihadeeswarar Temple",
    state: "Tamil Nadu",
    city: "Thanjavur",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=10.7828,79.1318&cbp=12,230,,0,0&output=svembed",
    hindiNarration: "तंजावुर के बृहदीश्वर मंदिर में आपका स्वागत है। चोल साम्राज्य का यह भव्य ग्रेनाइट मंदिर द्रविड़ वास्तुकला का अनुपम उदाहरण है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", audioGuide: "Available" },
    ticketPrices: { entry: "Free", camera: "INR 50" }
  },
  {
    id: "TN-KAN-003",
    name: "Kanyakumari Triveni Sangam",
    state: "Tamil Nadu",
    city: "Kanyakumari",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=8.0883,77.5385&cbp=12,90,,0,0&output=svembed",
    hindiNarration: "कन्याकुमारी त्रिवेणी संगम में आपका स्वागत है। यह भारत का अंतिम दक्षिणी छोर है जहाँ हिंद महासागर, अरब सागर और बंगाल की खाड़ी का संगम होता है।",
    facilities: { parking: "Available", viewingTower: "Available" },
    ticketPrices: { entry: "Free" }
  },
  {
    id: "TN-KAN-005",
    name: "Vivekananda Rock Memorial",
    state: "Tamil Nadu",
    city: "Kanyakumari",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=8.0777,77.5551&cbp=12,180,,0,0&output=svembed",
    hindiNarration: "विवेकानंद रॉक मेमोरियल में आपका स्वागत है। समुद्र में चट्टान पर स्थित यह पावन स्थल स्वामी विवेकानंद की साधना भूमि है।",
    facilities: { ferryService: "Available", meditationHall: "Available" },
    ticketPrices: { entry: "INR 20", ferry: "INR 50" }
  },
  {
    id: "TN-KOD-009",
    name: "Kodaikanal Lake",
    state: "Tamil Nadu",
    city: "Kodaikanal",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=10.2381,77.4891&cbp=12,120,,0,0&output=svembed",
    hindiNarration: "कोडाइकनाल झील में आपका स्वागत है। पलानी की पहाड़ियों में स्थित यह स्टार के आकार की झील अपनी प्राकृतिक सुंदरता और नौकायन के लिए प्रसिद्ध है।",
    facilities: { boating: "Available", cycleRentals: "Available" },
    ticketPrices: { entry: "Free", pedalBoat: "INR 150 - 300" }
  },
  {
    id: "TN-CHI-011",
    name: "Nataraja Temple",
    state: "Tamil Nadu",
    city: "Chidambaram",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=11.3995,79.6936&cbp=12,45,,0,0&output=svembed",
    hindiNarration: "चिदंबरम के नटराज मंदिर में आपका स्वागत है। यहाँ भगवान शिव अपने आनंद तांडव नृत्य रूप और आकाश तत्व के प्रतीक के रूप में पूजे जाते हैं।",
    facilities: { parking: "Available", prasadCounter: "Available" },
    ticketPrices: { entry: "Free" }
  },

  // 🌊 ODISHA
  {
    id: "RJ-OD-001",
    name: "Konark Sun Temple",
    state: "Odisha",
    city: "Konark",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=19.8876,86.0945&cbp=12,0,,0,0&output=svembed",
    hindiNarration: "कोणार्क सूर्य मंदिर, ओडिशा में आपका स्वागत है। चौबीस पहियों वाले रथ के आकार में बना यह मंदिर भारतीय स्थापत्य कला का एक महाकाव्य है।",
    facilities: { parking: "Available", guidedTours: "Available" },
    ticketPrices: { indianAdult: "INR 40", foreignAdult: "INR 600" }
  },
  {
    id: "OD-PUR-006",
    name: "Sun Temple Konark",
    state: "Odisha",
    city: "Konark",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=19.8876,86.0945&cbp=12,0,,0,0&output=svembed"
  },
  {
    id: "RJ-OD-002",
    name: "Udayagiri & Khandagiri Caves",
    state: "Odisha",
    city: "Bhubaneswar",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=20.2631,85.7861&cbp=12,270,,0,0&output=svembed",
    hindiNarration: "उदयगिरि और खंडगिरि की गुफाओं में आपका स्वागत है। दूसरी शताब्दी ईसा पूर्व में बनाई गई ये प्राचीन गुफाएं जैन भिक्षुओं का निवास स्थान थीं।",
    facilities: { parking: "Available", restrooms: "Available" },
    ticketPrices: { indianAdult: "INR 25", foreignAdult: "INR 300" }
  },
  {
    id: "RJ-OD-003",
    name: "Dhauli Shanti Stupa",
    state: "Odisha",
    city: "Bhubaneswar",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=20.1923,85.8394&cbp=12,180,,0,0&output=svembed",
    hindiNarration: "धौली शांति स्तूप में आपका स्वागत है। दया नदी के तट पर स्थित यह स्तूप सम्राट अशोक के हृदय परिवर्तन और शांति का संदेश देता है।",
    facilities: { parking: "Available", viewpoint: "Available" },
    ticketPrices: { entry: "Free" }
  },
  {
    id: "RJ-OD-004",
    name: "Ratnagiri Buddhist Complex",
    state: "Odisha",
    city: "Jajpur",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=20.6407,86.3344&cbp=12,45,,0,0&output=svembed",
    hindiNarration: "रत्नगिरि बौद्ध परिसर में आपका स्वागत है। प्राचीन काल में यह बौद्ध धर्म, शिक्षा और मूर्तिकला का एक प्रमुख केंद्र था।",
    facilities: { parking: "Available", museum: "ASI Site Museum" },
    ticketPrices: { indianAdult: "INR 25", foreignAdult: "INR 300" }
  },

  // 🌿 MEGHALAYA
  {
    id: "ML-EKH-003",
    name: "Double Decker Living Root Bridge",
    state: "Meghalaya",
    city: "Nongriat, Cherrapunji",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=25.2505,91.6740&cbp=12,210,,0,0&output=svembed",
    hindiNarration: "डबल डेकर लिविंग रूट ब्रिज में आपका स्वागत है। जीवित पेड़ों की जड़ों से बना यह दो मंजिला पुल खासी जनजाति की अनोखी वास्तुकला का करिश्मा है।",
    facilities: { parking: "Available at Tyrna village", wheelchairAccessible: "No (3000 steps trek)", restrooms: "Available", homestays: "Available" },
    ticketPrices: { general: "INR 50" }
  },

  // ❄️ HIMACHAL PRADESH
  {
    id: "HP-SHI-001",
    name: "Viceregal Lodge (Rashtrapati Niwas)",
    state: "Himachal Pradesh",
    city: "Shimla",
    tour360Url: "https://www.360cities.net/embed_iframe/rashtrapati-niwas-viceregal-lodge",
    hindiNarration: "वाइसरीगल लॉज (राष्ट्रपति निवास), शिमला में आपका स्वागत है। 1888 में बनी यह भव्य औपनिवेशिक इमारत भारत के ऐतिहासिक राजनीतिक फैसलों की साक्षी रही है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", guidedTours: "Available" },
    ticketPrices: { general: "INR 50", foreignNational: "INR 200" }
  },
  {
    id: "HP-MAN-003",
    name: "Hidimba Devi Temple",
    state: "Himachal Pradesh",
    city: "Manali",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=32.2483,77.1804&cbp=12,180,,0,0&output=svembed",
    hindiNarration: "हिडिम्बा देवी मंदिर, मनाली में आपका स्वागत है। देवदार के घने जंगलों में स्थित 1553 ईस्वी का यह चार मंजिला लकड़ी का पगोडा मंदिर महाभारत कालीन इतिहास समेटे हुए है।",
    facilities: { parking: "Available", wheelchairAccessible: "No", restrooms: "Available", shoeStand: "Available" },
    ticketPrices: { general: "Free" }
  },
  {
    id: "HP-KUL-014",
    name: "Rohtang Pass",
    state: "Himachal Pradesh",
    city: "Manali - Leh Highway",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=32.3716,77.2466&cbp=12,210,,0,0&output=svembed",
    hindiNarration: "रोहतांग दर्रा में आपका स्वागत है। 3978 मीटर की ऊंचाई पर स्थित यह ऐतिहासिक दर्रा कुल्लू घाटी को लाहुल और स्पीति से जोड़ता है।",
    facilities: { parking: "Available", wheelchairAccessible: "No", restrooms: "Available", snowActivities: "Available" },
    ticketPrices: { general: "NGT Permit INR 500", congestionFee: "INR 50" }
  },
  {
    id: "HP-MAN-016",
    name: "Solang Valley",
    state: "Himachal Pradesh",
    city: "Manali",
    tour360Url: "https://maps.google.com/maps?layer=c&cbll=32.3167,77.1575&cbp=12,180,,0,0&output=svembed",
    hindiNarration: "सोलंग वैली, मनाली में आपका स्वागत है। यह खूबसूरत घाटी पैराग्लाइडिंग, जोरबिंग, स्कीइंग और साहसिक खेलों का प्रमुख केंद्र है।",
    facilities: { parking: "Available", wheelchairAccessible: "Yes", restrooms: "Available", ropeway: "Available", paragliding: "Available" },
    ticketPrices: { general: "Free", ropewayRide: "INR 500 - 1000" }
  }
];

// Lookup Map by Place ID
export const verified360ToursMap: Record<string, Place360Entry> = {};
verified360TourEntries.forEach((entry) => {
  verified360ToursMap[entry.id] = entry;
});
