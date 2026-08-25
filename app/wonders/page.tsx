"use client";

import React from "react";
import WondersGalleryView from "@/views/WondersGalleryView";
import { useTravel } from "@/context/TravelContext";

export default function WondersPage() {
  const {
    currentLang,
    setSelected360Monument,
    setSelectedDetailMonument,
    searchQuery,
    setSearchQuery,
  } = useTravel();

  return (
    <WondersGalleryView
      currentLang={currentLang}
      onOpen360={setSelected360Monument}
      onOpenDetails={setSelectedDetailMonument}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
