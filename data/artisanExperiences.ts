export interface ArtisanExperience {
  id: string;
  homestayId?: string;
  region: string;
  craftName: string;
  artisanMaster: string;
  artisanAccreditation: string;
  duration: string;
  feePerPerson: number;
  highlight: string;
  description: string;
  materialsProvided: string[];
  takeHomeSouvenir: string;
  icon: string;
}

export const ARTISAN_WORKSHOPS: Record<string, ArtisanExperience[]> = {
  // Homestay ID or Regional fallback
  "home-1": [
    {
      id: "art-1",
      homestayId: "home-1",
      region: "Kerala",
      craftName: "Kathakali Facial Mask & Natural Pigment Painting",
      artisanMaster: "Guru Gopinath Asan",
      artisanAccreditation: "Kerala Kalamandalam Senior Artist",
      duration: "2.5 Hours",
      feePerPerson: 650,
      highlight: "Learn natural mineral pigment grinding & mudra storytelling gestures",
      description: "Hands-on session where you grind natural stone pigments, paint a miniature wooden Kathakali mask, and learn the 24 basic Mudra hand gestures.",
      materialsProvided: ["Wooden mask base", "Crushed mineral stones", "Herbal binders", "Brush set"],
      takeHomeSouvenir: "Handcrafted miniature Kathakali wooden mask signed by Guru",
      icon: "🎭"
    },
    {
      id: "art-2",
      homestayId: "home-1",
      region: "Kerala",
      craftName: "Cardamom Estate Spice Grinding & Claypot Cooking",
      artisanMaster: "Amma Parvathi",
      artisanAccreditation: "Generational Spice Homesteader",
      duration: "1.5 Hours",
      feePerPerson: 450,
      highlight: "Hand-pound heirloom spices on traditional granite grinding stones",
      description: "Roast and stone-grind whole Malabar black pepper, wild cardamom, and cinnamon bark to create custom organic spice blends.",
      materialsProvided: ["Stone pestle & mortar", "Fresh organic spices", "Jute storage bags"],
      takeHomeSouvenir: "Air-sealed jar of authentic homemade Malabar Garam Masala",
      icon: "🌿"
    }
  ],

  "home-2": [
    {
      id: "art-3",
      homestayId: "home-2",
      region: "Rajasthan",
      craftName: "Jaipur Traditional Blue Pottery Wheel & Glazing Masterclass",
      artisanMaster: "Ustad Kailash Prajapat",
      artisanAccreditation: "Rajasthan Shilp Guru Awardee",
      duration: "3 Hours",
      feePerPerson: 850,
      highlight: "Shape quartz stone clay and paint cobalt blue Persian floral motifs",
      description: "Unlike clay pottery, Jaipur Blue Pottery uses quartz stone powder and glass frit. Shape your own tea coaster or bowl and paint intricate cobalt motifs.",
      materialsProvided: ["Quartz dough mixture", "Traditional potter's turntable", "Cobalt & copper oxides", "Fine squirrel hair brushes"],
      takeHomeSouvenir: "Kiln-fired glazed blue pottery tile coaster with your initials",
      icon: "🏺"
    },
    {
      id: "art-4",
      homestayId: "home-2",
      region: "Rajasthan",
      craftName: "Sanganeri Hand Block Printing on Organic Cotton",
      artisanMaster: "Master Chhaganlal",
      artisanAccreditation: "5th Generation Block Artisan",
      duration: "2 Hours",
      feePerPerson: 550,
      highlight: "Carved teakwood blocks & eco-friendly vegetable dyes",
      description: "Stamp your own rhythmic patterns onto pure Mulmul cotton fabric using centuries-old hand-carved wooden blocks and natural indigo/madder dyes.",
      materialsProvided: ["Hand-carved wooden blocks", "Natural vegetable dyes", "Organic cotton scarf / tote bag"],
      takeHomeSouvenir: "Self-printed organic cotton dupatta or tote bag",
      icon: "🎨"
    }
  ],

  "home-3": [
    {
      id: "art-5",
      homestayId: "home-3",
      region: "Varanasi",
      craftName: "Kashi Zari Silk Handloom Weaving & Brocade Demo",
      artisanMaster: "Mohammad Ansari",
      artisanAccreditation: "Banaras Heritage Silk Guild",
      duration: "2 Hours",
      feePerPerson: 600,
      highlight: "Sit at a pit-loom and weave pure silver/gold zari thread",
      description: "Learn how the intricate Jacquard punch cards create luminous brocades. Try your hands on the wooden shuttle and gold zari threads.",
      materialsProvided: ["Traditional pit loom access", "Silk warp & weft", "Pure silver-plated zari"],
      takeHomeSouvenir: "Framed Banarasi brocade silk bookmark with silver zari motif",
      icon: "🧵"
    }
  ]
};

// Fallback generator for other homestays
export function getArtisanWorkshopsForHomestay(homestayId: string, homestayName: string, region: string): ArtisanExperience[] {
  if (ARTISAN_WORKSHOPS[homestayId]) {
    return ARTISAN_WORKSHOPS[homestayId];
  }

  const reg = (region || homestayName).toLowerCase();

  if (reg.includes("rajasthan") || reg.includes("jaipur") || reg.includes("desert") || reg.includes("haveli")) {
    return ARTISAN_WORKSHOPS["home-2"];
  }

  if (reg.includes("kerala") || reg.includes("munnar") || reg.includes("alleppey") || reg.includes("south")) {
    return ARTISAN_WORKSHOPS["home-1"];
  }

  if (reg.includes("varanasi") || reg.includes("kashi") || reg.includes("ganga") || reg.includes("up")) {
    return ARTISAN_WORKSHOPS["home-3"];
  }

  // Generic indigenous heritage workshop
  return [
    {
      id: `${homestayId}-art-gen`,
      homestayId,
      region,
      craftName: "Local Folk Art & Clay Handicraft Workshop",
      artisanMaster: "Village Craft Master",
      artisanAccreditation: "State Certified Rural Artisan",
      duration: "2 Hours",
      feePerPerson: 500,
      highlight: "Craft organic terracotta items with regional motifs",
      description: "Engage with village elders to learn traditional clay molding, pottery painting, and organic folk motifs.",
      materialsProvided: ["Natural clay", "Mineral paints", "Bamboo crafting tools"],
      takeHomeSouvenir: "Handmade regional terracotta souvenir",
      icon: "🏺"
    }
  ];
}
