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

// Import all 10 Place Details JSON datasets
import badaCharDhamDetail from "./place_details_json/BADA_CHAR_DHAM_LOC_DETAIL.json";
import chhotaCharDhamDetail from "./place_details_json/CHHOTA_CHAR_DHAM_LOC_DETAIL.json";
import gujaratDetail from "./place_details_json/GUJARAT_LOC_DETAIL.json";
import kashmirDetail from "./place_details_json/KASHMIR_LOC_DETAILS.json";
import maharashtraDetail from "./place_details_json/MAHARASHTRA_LOC_DETAIL.json";
import manaliShimlaDetail from "./place_details_json/MANALI_SHIMLA_LOC_DETAILS.json";
import meghalayaDetail from "./place_details_json/MEGHALAYA_LOC_DETAILS.json";
import odishaDetail from "./place_details_json/ODISHA_LOC_DETAILS.json";
import rajasthanDetail from "./place_details_json/RAJASTHAN_LOC_DETAILS.json";
import tamilnaduDetail from "./place_details_json/TAMINADU_LOC_DETAILS.json";

// Import multilingual translation dictionary for all 180+ places
import placeTranslations from "./place_translations.json";

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
  description?: string;
  history?: string;
  gallery?: string[];
  "360Tour"?: string;
  facilities?: Record<string, boolean | string | number | undefined>;
  ticketPrices?: Record<string, number | string | undefined>;
}

// Fallback high-resolution photography mapped by state/category
const regionPhotoFallbacks: Record<string, string[]> = {
  Gujarat: [
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  ],
  "Jammu & Kashmir": [
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  ],
  "Himachal Pradesh": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  ],
  Meghalaya: [
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
  ],
  Maharashtra: [
    "https://images.unsplash.com/photo-1600100397608-f010e42e4e75?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
  ],
  Rajasthan: [
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  ],
  "Tamil Nadu": [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1609137144822-49197c36a439?auto=format&fit=crop&w=1200&q=80",
  ],
  Odisha: [
    "https://images.unsplash.com/photo-1609137144822-49197c36a439?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  ],
  Uttarakhand: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
  ]
};

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

function sanitizeImageUrls(gallery: string[] | undefined, state: string): { mainImage: string; allImages: string[] } {
  const fallbacks = regionPhotoFallbacks[state] || regionPhotoFallbacks.default;
  if (!gallery || gallery.length === 0) {
    return { mainImage: fallbacks[0], allImages: fallbacks };
  }

  const validUrls = gallery.filter((url) => url && !url.includes("example.com") && (url.startsWith("http://") || url.startsWith("https://")));
  if (validUrls.length === 0) {
    return { mainImage: fallbacks[0], allImages: fallbacks };
  }

  return {
    mainImage: validUrls[0],
    allImages: validUrls.length < 3 ? [...validUrls, ...fallbacks] : validUrls
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

  // Combine all raw detail arrays into a lookup map by ID
  const detailMap = new Map<string, RawDetail>();
  const allRawDetails: RawDetail[] = [
    ...(badaCharDhamDetail as unknown as RawDetail[]),
    ...(chhotaCharDhamDetail as unknown as RawDetail[]),
    ...(gujaratDetail as unknown as RawDetail[]),
    ...(kashmirDetail as unknown as RawDetail[]),
    ...(maharashtraDetail as unknown as RawDetail[]),
    ...(manaliShimlaDetail as unknown as RawDetail[]),
    ...(meghalayaDetail as unknown as RawDetail[]),
    ...(odishaDetail as unknown as RawDetail[]),
    ...(rajasthanDetail as unknown as RawDetail[]),
    ...(tamilnaduDetail as unknown as RawDetail[]),
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
    const { mainImage, allImages } = sanitizeImageUrls(detail?.gallery, loc.state);

    const cleanDesc = cleanCitations(detail?.description || "");
    const cleanHist = cleanCitations(detail?.history || "");
    const fullStory = [cleanDesc, cleanHist].filter(Boolean).join(" ") || `${loc.name} is a renowned destination in ${loc.city}, ${loc.state}.`;

    const panoramaUrl = detail?.["360Tour"] && !detail["360Tour"].includes("example.com")
      ? detail["360Tour"]
      : "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=80";

    const translated = (placeTranslations as Record<string, { hi?: string; gu?: string; mr?: string; bn?: string; ta?: string }>)[loc.id];

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
        hi: translated?.hi || fullStory,
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
      facilities: detail?.facilities,
      ticketPrices: detail?.ticketPrices
    };

    transformedPlaces.push(monument);
  }

  return transformedPlaces;
}

export const regionalJsonMonuments = loadAndTransformPlaces();
