import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saral Yatra — Wonders of India & Cultural Tourism Planner",
  description: "A showcase of India's finest cultural treasures curated into personalized smart journeys.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet CSS for interactive route map rendering */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        {/* Editorial Serif & Sans Fonts for museum-grade elegance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf9f5] text-stone-900 overflow-x-hidden antialiased selection:bg-terracotta-100 selection:text-terracotta-800 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
