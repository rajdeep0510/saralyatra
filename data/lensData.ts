import { Monument } from "@/types";
import { monuments } from "./mockData";

export interface ArchitecturalFeature {
  name: string;
  category: "Spire/Dome" | "Carving/Inlay" | "Gate/Pillar" | "Material" | "Layout";
  description: string;
  confidenceScore: number;
}

export interface LensScanResult {
  monumentId: string;
  monumentName: string;
  state: string;
  cityOrDistrict: string;
  imageUrl: string;
  architecturalStyle: string;
  dynastyAndEra: string;
  consecrationYear: string;
  primaryMaterial: string;
  keyFeatures: ArchitecturalFeature[];
  architecturalSignificance: string;
  untoldLegend: string;
  folkloreExcerpt: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  has360StreetView: boolean;
  hasSatellite3D: boolean;
}

export interface SampleHeritageImage {
  id: string;
  title: string;
  state: string;
  thumbnailUrl: string;
  category: string;
  monumentId: string;
}

export const SAMPLE_HERITAGE_GALLERY: SampleHeritageImage[] = [
  {
    id: "sample-hampi",
    title: "Stone Chariot & Vittala Temple",
    state: "Karnataka",
    thumbnailUrl: "https://images.unsplash.com/photo-1600100397608-f010f44383a8?q=80&w=800&auto=format&fit=crop",
    category: "Vijayanagara Granite Architecture",
    monumentId: "kar-1"
  },
  {
    id: "sample-konark",
    title: "Konark Sun Temple Colossal Chariot",
    state: "Odisha",
    thumbnailUrl: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop",
    category: "Kalinga Nagara Architecture",
    monumentId: "odi-2"
  },
  {
    id: "sample-meenakshi",
    title: "Meenakshi Amman Dravidian Gopuram",
    state: "Tamil Nadu",
    thumbnailUrl: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=800&auto=format&fit=crop",
    category: "Dravidian Temple Architecture",
    monumentId: "tn-1"
  },
  {
    id: "sample-taj",
    title: "Taj Mahal Marble Pietra Dura",
    state: "Uttar Pradesh",
    thumbnailUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
    category: "Mughal White Marble Architecture",
    monumentId: "up-2"
  },
  {
    id: "sample-khajuraho",
    title: "Kandariya Mahadeva Temple Spire",
    state: "Madhya Pradesh",
    thumbnailUrl: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=800&auto=format&fit=crop",
    category: "Chandela Sandstone Nagara",
    monumentId: "mp-1"
  },
  {
    id: "sample-ajanta",
    title: "Ajanta Cave Chaitya Rock-Cut Hall",
    state: "Maharashtra",
    thumbnailUrl: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop",
    category: "Buddhist Rock-Cut Monolithic",
    monumentId: "mah-1"
  },
  {
    id: "sample-ranikivav",
    title: "Rani ki Vav Multi-Tiered Stepwell",
    state: "Gujarat",
    thumbnailUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800&auto=format&fit=crop",
    category: "Māru-Gurjara Subterranean Stepwell",
    monumentId: "guj-2"
  },
  {
    id: "sample-goldentemple",
    title: "Harmandir Sahib Golden Sanctum",
    state: "Punjab",
    thumbnailUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop",
    category: "Sikh Heritage Gold & Marble",
    monumentId: "pun-1"
  }
];

// Helper: match any monument in database or synthesize rich architectural analysis
export function analyzeMonumentImage(
  imageSource: string | File | { monumentId?: string; name?: string; filename?: string; visualHint?: string }
): LensScanResult {
  let targetMonument: Monument | undefined;

  if (typeof imageSource === "object") {
    if ("monumentId" in imageSource && imageSource.monumentId) {
      targetMonument = monuments.find((m) => m.id.toLowerCase() === imageSource.monumentId?.toLowerCase());
    }
    if (!targetMonument && "filename" in imageSource && imageSource.filename) {
      const clean = imageSource.filename.toLowerCase().replace(/[-_.]/g, " ");
      targetMonument = monuments.find((m) => 
        clean.includes(m.name.toLowerCase()) || 
        m.name.toLowerCase().split(" ").some(word => word.length > 3 && clean.includes(word)) ||
        clean.includes(m.state.toLowerCase())
      );
    }
  } else if (typeof imageSource === "string") {
    const query = imageSource.toLowerCase();
    // Check direct ID or Name
    targetMonument = monuments.find((m) => 
      m.id.toLowerCase() === query ||
      m.name.toLowerCase() === query ||
      query.includes(m.name.toLowerCase()) || 
      m.name.toLowerCase().split(" ").some(word => word.length > 3 && query.includes(word))
    );
  }

  // If still not matched, pick a premier world heritage monument
  if (!targetMonument) {
    targetMonument = monuments.find((m) => m.id === "kar-1") || monuments.find((m) => m.id === "up-2") || monuments[0];
  }

  const nameLower = targetMonument.name.toLowerCase();
  const stateLower = targetMonument.state.toLowerCase();

  // Determine Architectural Style & Taxonomy
  let architecturalStyle = "Classical Indian Heritage Architecture";
  let dynastyAndEra = "Ancient Historical Era (Circa 10th - 16th Century CE)";
  let consecrationYear = "Circa 11th - 14th Century CE";
  let primaryMaterial = "Locally quarried Granite, Sandstone and Lime Mortar";
  let features: ArchitecturalFeature[] = [];
  let architecturalSignificance = "";
  let untoldLegend = "";

  if (stateLower.includes("tamil nadu") || nameLower.includes("meenakshi") || nameLower.includes("brihadisvara") || nameLower.includes("shore") || nameLower.includes("rameswaram") || nameLower.includes("kanyakumari")) {
    architecturalStyle = "Dravidian Gopuram & Granite Temple Architecture";
    dynastyAndEra = "Chola & Pandyan Dynasties (9th - 16th Century CE)";
    consecrationYear = "1010 - 1560 CE";
    primaryMaterial = "Interlocking Monolithic Hard Granite";
    features = [
      { name: "Multi-Tiered Rajagopuram Gate", category: "Gate/Pillar", description: "Ornately sculpted pyramidal entrance tower depicting 1,500+ celestial mythological deities.", confidenceScore: 98 },
      { name: "Monolithic Granite Cupola / Vimana", category: "Spire/Dome", description: "Single-stone octagonal shikhara balanced using gravitational interlocking without binding cement.", confidenceScore: 96 },
      { name: "Thousand-Pillared Musical Mandapa", category: "Gate/Pillar", description: "Acoustically tuned granite pillars that resonate with distinct musical notes when tapped.", confidenceScore: 94 },
      { name: "Frescoes & High-Relief Bas-Reliefs", category: "Carving/Inlay", description: "Vegetable dye temple murals celebrating classical Shaivite & Vaishnavite cosmic epics.", confidenceScore: 92 }
    ];
    architecturalSignificance = "One of the greatest architectural triumphs of Dravidian engineering, featuring monumental soaring spires that cast minimal shadow at solar noon.";
    untoldLegend = "Ancient folklore recounts that an 80-tonne monolithic granite dome was rolled to the temple spire using a 6-kilometer continuous earthen incline built by thousands of master artisans.";
  } else if (stateLower.includes("karnataka") || nameLower.includes("hampi") || nameLower.includes("vittala") || nameLower.includes("belur") || nameLower.includes("halebidu") || nameLower.includes("mysore") || nameLower.includes("badami") || nameLower.includes("pattadakal")) {
    architecturalStyle = "Vijayanagara & Hoysala Stone Architecture";
    dynastyAndEra = "Vijayanagara Empire / Hoysala Kings (12th - 16th Century CE)";
    consecrationYear = "1509 - 1565 CE";
    primaryMaterial = "Chiseled Deccan Granite and Chloritic Schist Soapstone";
    features = [
      { name: "Monolithic Stone Chariot (Garuda Shrine)", category: "Layout", description: "Carved from giant granite blocks designed to resemble a divine cosmic war chariot with rotating stone wheels.", confidenceScore: 99 },
      { name: "Seven Musical Pillar Cluster (Saptaswara)", category: "Gate/Pillar", description: "Slender solid granite columns engineered with internal acoustic cavities tuned to ancient swaras.", confidenceScore: 97 },
      { name: "Yali (Mythical Dragon-Lion) Balustrades", category: "Carving/Inlay", description: "Fierce guardian sculptures flanking royal stepped pavilions symbolizing cosmic equilibrium.", confidenceScore: 95 },
      { name: "Corbelled Lotus Ceiling Rosettes", category: "Spire/Dome", description: "Multi-layered floral ceiling medallions carved with microscopic precision.", confidenceScore: 91 }
    ];
    architecturalSignificance = "The architectural zenith of the Vijayanagara Empire, synthesizing Dravidian grandeur with advanced Deccan acoustic stonework.";
    untoldLegend = "Legend tells that the stone chariot wheels were once able to turn freely on their stone axles, until British archaeologists cemented them to investigate the hidden musical resonance chamber within.";
  } else if (stateLower.includes("odisha") || nameLower.includes("konark") || nameLower.includes("puri") || nameLower.includes("lingaraj") || nameLower.includes("mukteshwar")) {
    architecturalStyle = "Kalinga Nagara Sun Architecture";
    dynastyAndEra = "Eastern Ganga Dynasty (King Narasimhadeva I, 1250 CE)";
    consecrationYear = "1250 CE";
    primaryMaterial = "Khondalite Stone, Chlorite, and Iron Dowels";
    features = [
      { name: "24 Carved Sun Dial Wheels", category: "Carving/Inlay", description: "Astronomically aligned stone spokes that compute exact local solar time down to the minute via sunlight shadows.", confidenceScore: 99 },
      { name: "Seven Galloping Solar Steeds", category: "Layout", description: "Monumental stone horses representing the seven days of the week and the seven colors of sunlight.", confidenceScore: 96 },
      { name: "Deula & Jagamohana Pyramidal Spire", category: "Spire/Dome", description: "Tiered horizontal roofs crowned with an Amalaka and golden urn kalasha.", confidenceScore: 93 },
      { name: "Magnetic Floating Idol Engineering", category: "Material", description: "Ancient records document heavy magnetic lodestones embedded in the temple spire that kept the main sun deity suspended in mid-air.", confidenceScore: 90 }
    ];
    architecturalSignificance = "A UNESCO World Heritage Masterpiece functioning simultaneously as a colossal sacred temple and an astronomical solar chronometer.";
    untoldLegend = "Oral lore holds that 12-year-old child architect Dharmapada climbed the perilous pinnacle to set the final crown lodestone in place, saving 1,200 master craftsmen from royal execution.";
  } else if (stateLower.includes("rajasthan") || nameLower.includes("fort") || nameLower.includes("palace") || nameLower.includes("amber") || nameLower.includes("mehrangarh") || nameLower.includes("jaisalmer") || nameLower.includes("hawa mahal") || nameLower.includes("city palace") || nameLower.includes("chittorgarh")) {
    architecturalStyle = "Rajput & Indo-Saracenic Fort Architecture";
    dynastyAndEra = "Rathore & Kachwaha Dynasties (15th - 18th Century CE)";
    consecrationYear = "1592 - 1727 CE";
    primaryMaterial = "Golden Jaisalmer Sandstone, Red Agra Stone and Makrana Marble";
    features = [
      { name: "Sheesh Mahal Mirror Inlay Mosaic", category: "Carving/Inlay", description: "Belgian convex mirrors embedded in vaulted ceilings that illuminate an entire royal hall with a single candle.", confidenceScore: 98 },
      { name: "Jharokha Overhanging Balconies & Jali Fretwork", category: "Layout", description: "Perforated stone screens that induce the Venturi effect, funneling cool desert breezes while preserving royal privacy.", confidenceScore: 96 },
      { name: "Triple-Curtain Impenetrable Ramparts", category: "Gate/Pillar", description: "Multi-tiered zigzagging fortified gateways spiked to thwart charging war elephants.", confidenceScore: 95 },
      { name: "Subterranean Rainwater Step-Reservoirs", category: "Material", description: "Underground aqueducts capable of sustaining 5,000 fort inhabitants across multi-year desert droughts.", confidenceScore: 92 }
    ];
    architecturalSignificance = "An indomitable synthesis of Rajput martial defense engineering and opulent palace aesthetics designed to withstand desert sieges.";
    untoldLegend = "Hidden subterranean escape tunnels connected the fort bastions over 15 kilometers into the rugged Aravalli hills, used by royal couriers and guarded by sacred cobras.";
  } else if (nameLower.includes("taj") || nameLower.includes("qutub") || nameLower.includes("humayun") || nameLower.includes("fatehpur") || nameLower.includes("red fort") || nameLower.includes("jama masjid") || nameLower.includes("charminar") || nameLower.includes("golconda")) {
    architecturalStyle = "Mughal & Indo-Islamic Imperial Architecture";
    dynastyAndEra = "Mughal Empire & Deccan Sultanates (16th - 17th Century CE)";
    consecrationYear = "1565 - 1653 CE";
    primaryMaterial = "Translucent Makrana White Marble and Red Sandstone";
    features = [
      { name: "Pietra Dura (Parchin Kari) Gemstone Inlays", category: "Carving/Inlay", description: "Intricate floral arabesques inlaid with semi-precious lapis lazuli, jade, onyx, and coral.", confidenceScore: 99 },
      { name: "Double-Shelled Bulbous Onion Dome", category: "Spire/Dome", description: "Acoustic dome engineering that creates a 28-second ethereal vocal echo chamber.", confidenceScore: 97 },
      { name: "Outward-Tilted Optical Illusion Minarets", category: "Gate/Pillar", description: "Four 40-meter minarets engineered with a 2-degree outward tilt to appear perfectly vertical and protect the central tomb during earthquakes.", confidenceScore: 96 },
      { name: "Charbagh Quadripartite Persian Garden", category: "Layout", description: "Four-quartered paradise garden symbolizing the four celestial rivers of life.", confidenceScore: 94 }
    ];
    architecturalSignificance = "The undisputed zenith of Indo-Islamic geometric symmetry, optical precision, and pietra dura lapidary art on Earth.";
    untoldLegend = "The central marble sanctum was calibrated so that on full moon nights, the luminous Makrana marble reflects the moonlight across the river in changing shades of celestial silver.";
  } else if (stateLower.includes("madhya pradesh") || nameLower.includes("khajuraho") || nameLower.includes("sanchi") || nameLower.includes("bhimbetka") || nameLower.includes("gwalior") || nameLower.includes("ujjain") || nameLower.includes("omkareshwar")) {
    architecturalStyle = "Chandela & Paramara Nagara Sandstone Architecture";
    dynastyAndEra = "Chandela & Maurya Dynasties (3rd Century BCE - 11th Century CE)";
    consecrationYear = "999 - 1025 CE";
    primaryMaterial = "Buff & Pink Fine-grained Panna Sandstone";
    features = [
      { name: "Urusringa (Miniature Cluster Spires)", category: "Spire/Dome", description: "84 subsidiary spires rising rhythmically toward the celestial central peak symbolizing Mount Kailash.", confidenceScore: 98 },
      { name: "Sculptural Mithuna & Cosmic Pantheons", category: "Carving/Inlay", description: "Masterful high-relief carvings celebrating the harmonious union of sacred asceticism, dance, and sensual joy.", confidenceScore: 97 },
      { name: "Elevated Jagati (High Plinth Platform)", category: "Layout", description: "Massive raised masonry terrace designed for circumambulatory rituals overlooking lush Vindhya forests.", confidenceScore: 94 },
      { name: "Mortarless Interlocking Stone Joinery", category: "Material", description: "Precision mortise-and-tenon gravity joints standing unyielding without cement for over a millennium.", confidenceScore: 92 }
    ];
    architecturalSignificance = "India's greatest surviving expression of Nagara temple architecture, renowned for its rhythmic multi-tiered spires and profound celebration of cosmic life.";
    untoldLegend = "The temples were shielded from destruction for centuries by the dense mahogany forests of Bundelkhand until British surveyor T.S. Burt was led to them by local tribal guides in 1838.";
  } else if (stateLower.includes("gujarat") || nameLower.includes("vav") || nameLower.includes("somnath") || nameLower.includes("dwarka") || nameLower.includes("modhera") || nameLower.includes("palitana") || nameLower.includes("rann")) {
    architecturalStyle = "Māru-Gurjara & Solanki Stepwell Architecture";
    dynastyAndEra = "Chaulukya / Solanki Dynasty (10th - 13th Century CE)";
    consecrationYear = "1026 - 1150 CE";
    primaryMaterial = "Dhrangadhra Sandstone and Carved White Marble";
    features = [
      { name: "Multi-Tiered Subterranean Pavilions", category: "Layout", description: "Seven-storied underground inverted temple architecture functioning as a climate-controlled cooling sanctuary.", confidenceScore: 98 },
      { name: "Geometrically Symmetrical Stepped Water Kund", category: "Material", description: "Steep pyramid step formations aligned to solar equinoxes reflecting cosmic temple alignments.", confidenceScore: 96 },
      { name: "Intricate Torana Ornamental Arches", category: "Gate/Pillar", description: "Free-standing celebratory ornamental stone archways featuring cusped floral scrollwork.", confidenceScore: 94 },
      { name: "500+ Principal Sculptures of Vishnu Incarnations", category: "Carving/Inlay", description: "High-relief sculptures honoring the Dashavatara carved along subterranean corridor walls.", confidenceScore: 92 }
    ];
    architecturalSignificance = "A UNESCO World Heritage subterranean stepwell displaying the pinnacle of Western Indian water architecture and sculptural artistry.";
    untoldLegend = "Built by Queen Udayamati in loving memory of King Bhima I as a sacred inverted temple venerating the life-giving sanctity of subterranean waters.";
  } else if (stateLower.includes("maharashtra") || nameLower.includes("ajanta") || nameLower.includes("ellora") || nameLower.includes("elephanta") || nameLower.includes("kailash") || nameLower.includes("shirdi") || nameLower.includes("gateway of india")) {
    architecturalStyle = "Rashtrakuta & Vakataka Monolithic Rock-Cut Architecture";
    dynastyAndEra = "Rashtrakuta & Vakataka Dynasties (2nd Century BCE - 8th Century CE)";
    consecrationYear = "756 - 773 CE";
    primaryMaterial = "Monolithic Deccan Basalt Cliff Face";
    features = [
      { name: "Top-Down Monolithic Excavation", category: "Layout", description: "Carved entirely from a single massive vertical basalt cliff by chiseling 200,000 tonnes of solid volcanic rock from top to bottom.", confidenceScore: 99 },
      { name: "Chaitya Horseshoe Sun Windows", category: "Spire/Dome", description: "Sunlight-directing vaulted apsidal arches illuminating inner stupa sanctums.", confidenceScore: 96 },
      { name: "Colossal Monolithic War Elephants & Pillar Obelisks", category: "Gate/Pillar", description: "Free-standing life-sized stone pachyderms and victory dhwaja-stambhas carved in situ.", confidenceScore: 94 },
      { name: "Frescoes on Plastered Cave Walls", category: "Carving/Inlay", description: "Lapis lazuli and natural mineral pigment paintings depicting Jataka Buddhist lore.", confidenceScore: 92 }
    ];
    architecturalSignificance = "The largest single monolithic rock excavation in human history (Kailasa Temple, Ellora Cave 16), engineered without scaffolding or quarry blocks.";
    untoldLegend = "Architectural legend holds that King Krishna I’s master architect Kokasa vowed that the queen would not break her sacred fast until the temple spire was completed—carving the entire multi-story temple from the roof downwards in record time.";
  } else if (stateLower.includes("punjab") || nameLower.includes("golden temple") || nameLower.includes("harmandir") || nameLower.includes("amritsar")) {
    architecturalStyle = "Sikh Gurdwara Heritage Architecture";
    dynastyAndEra = "Sikh Gurus & Maharaja Ranjit Singh Era (16th - 19th Century CE)";
    consecrationYear = "1588 - 1830 CE";
    primaryMaterial = "Pure 24-Karat Gold Plating, Makrana Marble and Inlaid Pieta Dura";
    features = [
      { name: "Four-Doored Open Sanctum (Sarbat da Bhala)", category: "Layout", description: "Four open entrance portals symbolizing unconditional welcome to all four varnas, faiths, and social strata.", confidenceScore: 99 },
      { name: "Gilded Copper Leaf Onion Dome", category: "Spire/Dome", description: "Crowned with 750 kg of pure gold leaf shining over the Amrit Sarovar sacred pool.", confidenceScore: 98 },
      { name: "Marble Parikrama & Water Causeway", category: "Gate/Pillar", description: "Long marble bridge leading across the holy pool to the central sanctum.", confidenceScore: 95 },
      { name: "Floral Pietra Dura & Fresco Panels (Naqqashi)", category: "Carving/Inlay", description: "Delicate bird, flower, and vine marble carvings crafted by master artisans.", confidenceScore: 92 }
    ];
    architecturalSignificance = "The supreme spiritual sanctum of Sikhism, representing universal humility, spiritual tranquility, and architectural brilliance amidst a sacred nectar pool.";
    untoldLegend = "The foundation stone of Harmandir Sahib was laid in December 1588 by the revered Sufi Muslim saint Hazrat Mian Mir at the invitation of Guru Arjan Dev Ji, demonstrating interfaith brotherhood.";
  } else if (stateLower.includes("uttarakhand") || stateLower.includes("himachal") || nameLower.includes("kedarnath") || nameLower.includes("badrinath") || nameLower.includes("hidimba") || nameLower.includes("manali") || nameLower.includes("rishikesh")) {
    architecturalStyle = "Katyuri Himalayan Stone & Wood Architecture";
    dynastyAndEra = "Katyuri & Adi Shankaracharya Revival Era (8th - 12th Century CE)";
    consecrationYear = "Circa 8th Century CE";
    primaryMaterial = "Massive Interlocking Grey Granite Slabs and Deodar Timber";
    features = [
      { name: "Avalanche-Deflecting Triangular Spire", category: "Spire/Dome", description: "Steep pyramidal stone roof engineered to shed snow and deflect massive glacier floods.", confidenceScore: 98 },
      { name: "Mortarless Heavy Stone Interlocking", category: "Material", description: "Giant granite ashlar blocks that survived 400 years of complete glacial burial during the Little Ice Age.", confidenceScore: 97 },
      { name: "Tiered Pagoda Deodar Wood Eaves", category: "Gate/Pillar", description: "Intricately carved cedar wood gables adorned with mythological animal totems.", confidenceScore: 94 },
      { name: "Sacred Conical Rock Sanctum", category: "Layout", description: "Natural triangular humped rock deity revered as the divine presence of Lord Shiva.", confidenceScore: 92 }
    ];
    architecturalSignificance = "One of the highest and holiest Hindu pilgrimage shrines on Earth, situated at 3,583 meters amidst the glaciated peaks of the Garhwal Himalayas.";
    untoldLegend = "During the devastating 2013 Himalayan flash floods, a colossal natural boulder (now worshipped as the Bhim Shila) rolled down the mountain and stopped directly behind the shrine, diverting the raging floodwaters safely around both sides of the temple.";
  } else {
    // General Classical Heritage
    architecturalStyle = `${targetMonument.category === "heritage" ? "Classical Indian Heritage" : "Sacred Indic"} Architecture`;
    dynastyAndEra = "Medieval to Early Modern Bharat (11th - 18th Century CE)";
    consecrationYear = "Circa 12th - 16th Century CE";
    primaryMaterial = "Indigenous Sandstone, Granite and Traditional Lime Plaster";
    features = [
      { name: "Sanctum Sanctorum (Garbhagriha)", category: "Layout", description: "Sacred inner sanctum aligned with ancient Vastu Purusha Mandala cosmic grid geometries.", confidenceScore: 96 },
      { name: "Ornate Sculptural Mandapa Pillars", category: "Gate/Pillar", description: "Hand-chiseled pillars recording royal land charters, dance mudras, and epic folklore.", confidenceScore: 94 },
      { name: "Pyramidal Superstructure / Shikhara", category: "Spire/Dome", description: "Monumental spire directing spiritual energy upwards toward the cosmic zenith.", confidenceScore: 91 }
    ];
    architecturalSignificance = `A cherished national monument embodying the rich artistic traditions of ${targetMonument.state}.`;
    untoldLegend = targetMonument.folklore.en || `Steeped in centuries of oral legends passed down across generations of ${targetMonument.state}.`;
  }

  return {
    monumentId: targetMonument.id,
    monumentName: targetMonument.name,
    state: targetMonument.state,
    cityOrDistrict: targetMonument.state,
    imageUrl: targetMonument.imageUrl,
    architecturalStyle,
    dynastyAndEra,
    consecrationYear,
    primaryMaterial,
    keyFeatures: features,
    architecturalSignificance,
    untoldLegend,
    folkloreExcerpt: targetMonument.folklore.en || untoldLegend,
    coordinates: targetMonument.coordinates || { lat: 20.5937, lng: 78.9629 },
    has360StreetView: true,
    hasSatellite3D: true
  };
}
