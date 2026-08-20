import React from "react";
import { Landmark, Compass, MapPin, Home, Heart } from "lucide-react";
import { translations } from "../../data/mockData";

export default function Sidebar({ activeTab, setActiveTab, currentLang }) {
  const t = translations[currentLang];

  const menuItems = [
    { id: "explore", label: t.exploreTab, icon: Landmark },
    { id: "planner", label: t.plannerTab, icon: Compass },
    { id: "homestays", label: t.homestaysTab, icon: Home },
  ];

  return (
    <aside className="w-64 bg-slate-950/80 border-r border-slate-900 flex flex-col p-4">
      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-terracotta-500/10 text-terracotta-400 border border-terracotta-500/20 shadow-md shadow-terracotta-500/5 font-semibold"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Icon className={`h-4.5 w-4.5 ${isActive ? "text-terracotta-500" : ""}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Decorative / Saved Section */}
      <div className="mt-auto border-t border-slate-900 pt-4">
        <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-800/50">
          <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-2">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>Saved Trails</span>
          </h4>
          <p className="text-[11px] text-slate-500 leading-normal mb-3">
            Your customized cultural itineraries are stored locally for offline viewing.
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="px-2.5 py-1.5 rounded bg-slate-950 text-[10px] text-slate-300 border border-slate-800/80">
              Gujarat Heritage Loop
            </div>
            <div className="px-2.5 py-1.5 rounded bg-slate-950 text-[10px] text-slate-300 border border-slate-800/80">
              Hampi Ruins Circuit
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
