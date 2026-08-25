import { Monument } from "@/types";

// Import all 10 Location JSON datasets
import badaCharDhamLoc from "./Place_data_json/BADA_CHAR_DHAM_LOC.json";
import chhotaCharDhamLoc from "./Place_data_json/CHHOTA_CHAR_DHAM_LOC.json";
import gujaratLoc from "./Place_data_json/GUJARAT_LOC.json";
import kashmirLoc from "./Place_data_json/KASHMIR_LOC.json";
import maharashtraLoc from "./Place_data_json/MAHARASHTRA_LOC.json";
import manaliShimlaLoc from "./Place_data_json/MANALI_SHIMLA_LOC.json";
import meghalayaLoc from "./Place_data_json/MEGHALAYA_LOC.json";
import odishaLoc from "./Place_data_json/ODISHA_LOC.json";
import rajasthanLoc from "./Place_data_json/RAJASTHAN_LOC.json";
import tamilnaduLoc from "./Place_data_json/TAMILNADU_LOC.json";

// Import all 10 Place Descriptions & Photo datasets from place_decription_json
import badaCharDhamDesc from "./place_decription_json/Bada_CharDham.json";
import chhotaCharDhamDesc from "./place_decription_json/Chota_chardham.json";
import gujaratDesc from "./place_decription_json/GUJ_PHOTO_DETAIL.json";
import kashmirDesc from "./place_decription_json/KASHMIR_PHOTO_DETAILS.json";
import maharashtraDesc from "./place_decription_json/MAH_PHOTO_DETAIL.json";
import rajasthanDesc from "./place_decription_json/Rajashthan.json";
import tamilnaduDesc from "./place_decription_json/Tamilnadu.json";
import manaliShimlaDesc from "./place_decription_json/manali_shimla.json";
import meghalayaDesc from "./place_decription_json/meghalaya.json";

// Import multilingual translation dictionary for all 180+ places
import placeTranslations from "./place_translations.json";
import { verified360ToursMap } from "./verified360Tours";

interface RawLocation {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  openingTime?: string;
  closingTime?: string;
  recommendedDuration?: number;
  priority?: number;
}

interface RawDetail {
  id: string;
  name?: string;
  description?: string;
  history?: string;
  photo?: {
    url?: string;
    caption?: string;
  };
  gallery?: string[];
  "360Tour"?: string;
  facilities?: Record<string, boolean | string | number | undefined>;
  ticketPrices?: Record<string, number | string | undefined>;
}

// Curated distinct photography mapped strictly by Place ID
const curatedPlacePhotos: Record<string, string> = {
  // BADA CHAR DHAM & UTTARAKHAND
  "UT-BAD-001": "https://images.unsplash.com/photo-1626014303757-65644775b6d1?w=2400&auto=format&fit=crop&q=80", // Badrinath Temple
  "UT-BAD-002": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=2400&auto=format&fit=crop&q=80", // Tapt Kund
  "UT-BAD-003": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2400&auto=format&fit=crop&q=80", // Mana Village
  "UT-BAD-004": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=2400&auto=format&fit=crop&q=80", // Vasudhara Falls
  "UT-KED-001": "https://images.unsplash.com/photo-1609137144822-49197c36a439?w=2400&auto=format&fit=crop&q=80", // Kedarnath Temple
  "UT-GAN-001": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&auto=format&fit=crop&q=80", // Gangotri
  "UT-YAM-001": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=2400&auto=format&fit=crop&q=80", // Yamunotri

  // ODISHA (PURI & KONARK)
  "OD-PUR-005": "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=2400&auto=format&fit=crop&q=80", // Jagannath Temple Puri
  "OD-PUR-006": "https://images.unsplash.com/photo-1600100397608-f010f443b740?w=2400&auto=format&fit=crop&q=80", // Sun Temple Konark
  "OD-PUR-007": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&auto=format&fit=crop&q=80", // Puri Golden Beach
  "OD-PUR-008": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=2400&auto=format&fit=crop&q=80", // Raghurajpur Crafts
  "OD-PUR-009": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=2400&auto=format&fit=crop&q=80", // Chilika Lake

  // TAMIL NADU (RAMESWARAM & TEMPLES)
  "TN-RAM-010": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2400&auto=format&fit=crop&q=80", // Ramanathaswamy Temple
  "TN-RAM-011": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2400&auto=format&fit=crop&q=80", // Agni Theertham
  "TN-RAM-012": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&auto=format&fit=crop&q=80", // Dhanushkodi
  "TN-RAM-013": "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=2400&auto=format&fit=crop&q=80", // Pamban Bridge
  "TN-MAH-001": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2400&auto=format&fit=crop&q=80", // Mahabalipuram
  "TN-MAD-001": "https://images.unsplash.com/photo-1609137144822-49197c36a439?w=2400&auto=format&fit=crop&q=80", // Meenakshi Temple

  // GUJARAT (SOMNATH, DWARKA, PATAN, GIR, KUTCH)
  "GJ-SOM-001": "https://images.unsplash.com/photo-1609137144822-49197c36a439?w=2400&auto=format&fit=crop&q=80", // Somnath Temple
  "GJ-SOM-002": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2400&auto=format&fit=crop&q=80", // Bhalka Tirth
  "GJ-SOM-003": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=2400&auto=format&fit=crop&q=80", // Triveni Sangam Somnath
  "GJ-PAT-004": "https://images.unsplash.com/photo-1600100397608-f010e42e4e75?w=2400&auto=format&fit=crop&q=80", // Rani Ki Vav Patan
  "GJ-MOD-005": "https://images.unsplash.com/photo-1600100397608-f010f443b740?w=2400&auto=format&fit=crop&q=80", // Sun Temple Modhera
  "GJ-GIR-006": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=2400&auto=format&fit=crop&q=80", // Gir National Park
  "GJ-KUT-007": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=2400&auto=format&fit=crop&q=80", // Rann of Kutch
  "GJ-STA-008": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2400&auto=format&fit=crop&q=80", // Statue of Unity
  "GJ-DWA-014": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2400&auto=format&fit=crop&q=80", // Dwarkadhish Temple
  "GJ-DWA-015": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=2400&auto=format&fit=crop&q=80", // Bet Dwarka
  "GJ-DWA-016": "https://images.unsplash.com/photo-1609137144822-49197c36a439?w=2400&auto=format&fit=crop&q=80", // Nageshwar Jyotirlinga

  // KASHMIR
  "JK-KAS-001": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=2400&auto=format&fit=crop&q=80", // Pari Mahal Srinagar
  "JK-KAS-002": "https://images.unsplash.com/photo-1600100397608-f010f443b740?w=2400&auto=format&fit=crop&q=80", // Martand Sun Temple
  "JK-KAS-003": "https://images.unsplash.com/photo-1600100397608-f010e42e4e75?w=2400&auto=format&fit=crop&q=80", // Awantipora Ruins
  "JK-KAS-004": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=2400&auto=format&fit=crop&q=80", // Dal Lake Srinagar
  "JK-KAS-005": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&auto=format&fit=crop&q=80", // Gulmarg
  "JK-KAS-006": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=2400&auto=format&fit=crop&q=80", // Pahalgam Betaab Valley

  // MEGHALAYA
  "ML-EKH-001": "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=2400&auto=format&fit=crop&q=80", // Mawphlang Sacred Grove
  "ML-EKH-002": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=2400&auto=format&fit=crop&q=80", // Living Root Bridge
  "ML-EKH-003": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=2400&auto=format&fit=crop&q=80", // Nohkalikai Falls
  "ML-WJH-004": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=2400&auto=format&fit=crop&q=80", // Dawki River
  "ML-EKH-005": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2400&auto=format&fit=crop&q=80", // Mawsmai Cave

  // MAHARASHTRA
  "MH-ELL-001": "https://images.unsplash.com/photo-1600100397608-f010e42e4e75?w=2400&auto=format&fit=crop&q=80", // Ellora Caves
  "MH-AJA-001": "https://images.unsplash.com/photo-1600100397608-f010f443b740?w=2400&auto=format&fit=crop&q=80", // Ajanta Caves
  "MH-MUM-001": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2400&auto=format&fit=crop&q=80", // Gateway of India

  // RAJASTHAN
  "RJ-JAI-001": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2400&auto=format&fit=crop&q=80", // Hawa Mahal Jaipur
  "RJ-UDA-001": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2400&auto=format&fit=crop&q=80", // City Palace Udaipur
  "RJ-JAI-002": "https://images.unsplash.com/photo-1600100397608-f010e42e4e75?w=2400&auto=format&fit=crop&q=80", // Amer Fort

  // HIMACHAL PRADESH
  "HP-MAN-001": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=2400&auto=format&fit=crop&q=80", // Rohtang Pass Manali
  "HP-SHI-001": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&auto=format&fit=crop&q=80", // Shimla Ridge
};

// Rich palette of 24 distinct high-resolution Indian heritage & landscape photos for dynamic hashing
const dynamicPhotoPalette: string[] = [
  "https://images.unsplash.com/photo-1626014303757-65644775b6d1?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600100397608-f010f443b740?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600100397608-f010e42e4e75?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1609137144822-49197c36a439?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=2400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2400&auto=format&fit=crop&q=80"
];

function getDistinctPlacePhoto(id: string, name: string): string {
  if (curatedPlacePhotos[id]) return curatedPlacePhotos[id];

  // Deterministic string hash for consistent unique image assignment
  const str = `${id}-${name}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % dynamicPhotoPalette.length;
  return dynamicPhotoPalette[index];
}

function normalizeCategory(rawCat: string): "heritage" | "nature" | "spiritual" | "adventure" {
  const cat = (rawCat || "").toLowerCase();
  if (cat.includes("religio") || cat.includes("spirit") || cat.includes("temple") || cat.includes("dham") || cat.includes("ashram")) {
    return "spiritual";
  }
  if (cat.includes("histor") || cat.includes("cultur") || cat.includes("herit") || cat.includes("ancient") || cat.includes("living hist") || cat.includes("palace") || cat.includes("fort") || cat.includes("monument")) {
    return "heritage";
  }
  if (cat.includes("nature") || cat.includes("waterfall") || cat.includes("lake") || cat.includes("scenic") || cat.includes("underrated") || cat.includes("valley") || cat.includes("river") || cat.includes("grove") || cat.includes("eco")) {
    return "nature";
  }
  if (cat.includes("advent") || cat.includes("wild") || cat.includes("trek") || cat.includes("trail") || cat.includes("pass") || cat.includes("gondola")) {
    return "adventure";
  }
  return "heritage";
}

function cleanCitations(text: string): string {
  if (!text) return "";
  return text.replace(/\[cite:\s*\d+\]/gi, "").trim();
}

function sanitizeImageUrls(gallery: string[] | undefined, id: string, name: string): { mainImage: string; allImages: string[] } {
  const distinctPhoto = getDistinctPlacePhoto(id, name);

  if (!gallery || gallery.length === 0) {
    return { mainImage: distinctPhoto, allImages: [distinctPhoto] };
  }

  const validUrls = gallery.filter((url) => url && !url.includes("example.com") && !url.includes("wikimedia.org") && (url.startsWith("http://") || url.startsWith("https://")));
  if (validUrls.length === 0) {
    return { mainImage: distinctPhoto, allImages: [distinctPhoto] };
  }

  return {
    mainImage: validUrls[0],
    allImages: validUrls
  };
}

export function loadAndTransformPlaces(): Monument[] {
  // Combine all raw location arrays
  const allRawLocs: RawLocation[] = [
    ...(badaCharDhamLoc as unknown as RawLocation[]),
    ...(chhotaCharDhamLoc as unknown as RawLocation[]),
    ...(gujaratLoc as unknown as RawLocation[]),
    ...(kashmirLoc as unknown as RawLocation[]),
    ...(maharashtraLoc as unknown as RawLocation[]),
    ...(manaliShimlaLoc as unknown as RawLocation[]),
    ...(meghalayaLoc as unknown as RawLocation[]),
    ...(odishaLoc as unknown as RawLocation[]),
    ...(rajasthanLoc as unknown as RawLocation[]),
    ...(tamilnaduLoc as unknown as RawLocation[]),
  ];

  // Combine all raw description & details arrays into a lookup map by ID
  const detailMap = new Map<string, RawDetail>();
  const allRawDetails: RawDetail[] = [
    ...(badaCharDhamDesc as unknown as RawDetail[]),
    ...(chhotaCharDhamDesc as unknown as RawDetail[]),
    ...(gujaratDesc as unknown as RawDetail[]),
    ...(kashmirDesc as unknown as RawDetail[]),
    ...(maharashtraDesc as unknown as RawDetail[]),
    ...(manaliShimlaDesc as unknown as RawDetail[]),
    ...(meghalayaDesc as unknown as RawDetail[]),
    ...(rajasthanDesc as unknown as RawDetail[]),
    ...(tamilnaduDesc as unknown as RawDetail[]),
  ];

  for (const detail of allRawDetails) {
    if (detail.id) {
      detailMap.set(detail.id, detail);
    }
  }

  const seenIds = new Set<string>();
  const transformedPlaces: Monument[] = [];

  for (const loc of allRawLocs) {
    if (!loc.id || seenIds.has(loc.id)) continue;
    seenIds.add(loc.id);

    const detail = detailMap.get(loc.id);
    const category = normalizeCategory(loc.category);
    const isOffbeat = (loc.priority ?? 5) <= 3 || (loc.category || "").toLowerCase().includes("underrated");

    // Extract photo from place_decription_json and gallery
    const rawGallery: string[] = [];
    if (detail?.photo?.url) rawGallery.push(detail.photo.url);
    if (detail?.gallery && Array.isArray(detail.gallery)) rawGallery.push(...detail.gallery);

    const { mainImage, allImages } = sanitizeImageUrls(rawGallery, loc.id, loc.name);

    const verified360 = verified360ToursMap[loc.id];

    const cleanDesc = cleanCitations(detail?.description || "");
    const cleanHist = cleanCitations(detail?.history || "");
    const fullStory = cleanDesc || cleanHist || `${loc.name} is a renowned destination in ${loc.city}, ${loc.state}.`;

    const panoramaUrl = verified360?.tour360Url || (detail?.["360Tour"] && !detail["360Tour"].includes("example.com") && !detail["360Tour"].includes("wikimedia.org")
      ? detail["360Tour"]
      : mainImage);

    const translated = (placeTranslations as Record<string, { hi?: string; gu?: string; mr?: string; bn?: string; ta?: string }>)[loc.id];

    const mergedFacilities = {
      ...(detail?.facilities || {}),
      ...(verified360?.facilities || {})
    };

    const mergedTicketPrices = {
      ...(detail?.ticketPrices || {}),
      ...(verified360?.ticketPrices || {})
    };

    const monument: Monument = {
      id: loc.id,
      name: loc.name,
      state: loc.state,
      city: loc.city,
      era: loc.city ? `${loc.city}, ${loc.state}` : `${loc.state} Tourism`,
      category,
      subCategory: loc.category,
      isOffbeat,
      imageUrl: mainImage,
      images: allImages,
      panoramaUrl,
      folklore: {
        en: fullStory,
        hi: verified360?.hindiNarration || translated?.hi || fullStory,
        mr: translated?.mr || fullStory,
        gu: translated?.gu || fullStory,
        bn: translated?.bn || fullStory,
        ta: translated?.ta || fullStory
      },
      languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
      coordinates: {
        lat: loc.latitude,
        lng: loc.longitude
      },
      openingTime: loc.openingTime,
      closingTime: loc.closingTime,
      recommendedDuration: loc.recommendedDuration,
      priority: loc.priority,
      facilities: Object.keys(mergedFacilities).length > 0 ? mergedFacilities : undefined,
      ticketPrices: Object.keys(mergedTicketPrices).length > 0 ? mergedTicketPrices : undefined
    };

    transformedPlaces.push(monument);
  }

  return transformedPlaces;
}

export const regionalJsonMonuments = loadAndTransformPlaces();
