"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardView from "@/views/DashboardView";
import { useTravel } from "@/context/TravelContext";

export default function Home() {
  const router = useRouter();
  const { currentLang, handleLoadDemoTrip } = useTravel();

  const handleNavigateTab = (tab: string) => {
    if (tab === "home") {
      router.push("/");
    } else {
      router.push(`/${tab}`);
    }
  };

  return (
    <DashboardView
      currentLang={currentLang}
      onLoadTrip={handleLoadDemoTrip}
      onNavigateTab={handleNavigateTab}
    />
  );
}
