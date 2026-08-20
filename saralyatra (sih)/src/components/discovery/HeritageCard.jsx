import React from "react";
import { Headphones, Eye, Gem, Compass } from "lucide-react";
import { translations } from "../../data/mockData";

export default function HeritageCard({
  monument,
  currentLang,
  onOpen360,
  onOpenDetails
}) {
  const t = translations[currentLang];
  const { name, state, era, isOffbeat, imageUrl, folklore, languagesAvailable } = monument;

  const getFolkloreText = () => {
    if (folklore[currentLang]) {
      return folklore[currentLang];
    }
    return folklore.en;
  };

  const truncatedStory = getFolkloreText().length > 135
    ? getFolkloreText().slice(0, 135) + "..."
    : getFolkloreText();

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:border-stone-300 hover:shadow-[0_12px_32px_rgba(28,25,23,0.06)] transition-all duration-300">
      
      <div>
        {/* Unobstructed Image Frame */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Subtle Tag Overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isOffbeat ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-700/90 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md">
                <Gem className="h-3 w-3" />
                <span>{t.hiddenGem || "Hidden Gem"}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/85 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md">
                <Compass className="h-3 w-3" />
                <span>{t.famousGem || "Iconic Site"}</span>
              </span>
            )}
          </div>
        </div>

        {/* Structured Editorial Content Below Image */}
        <div className="p-5 space-y-3">
          
          {/* Era & State Metadata Row */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            <span>{state}</span>
            <span className="text-stone-400 font-normal">•</span>
            <span className="text-terracotta-700 font-medium">{era}</span>
          </div>

          {/* Title */}
          <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors">
            {name}
          </h4>

          {/* Folklore snippet */}
          <p className="text-xs text-stone-600 leading-relaxed font-normal">
            {truncatedStory}
          </p>

          {/* Language translation availability chips */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
              Languages:
            </span>
            <div className="flex gap-1">
              {languagesAvailable.map((lang) => (
                <span
                  key={lang}
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                    currentLang === lang
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-stone-50 text-stone-500 border-stone-200"
                  }`}
                >
                  {lang.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-stone-100 mt-2">
        <button
          onClick={() => onOpenDetails(monument)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
        >
          <Headphones className="h-3.5 w-3.5 text-sand-300" />
          <span>{t.listenStory || "Listen Story"}</span>
        </button>

        <button
          onClick={() => onOpen360(monument)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all border border-stone-200/80 cursor-pointer"
          title="360° Virtual Preview"
        >
          <Eye className="h-3.5 w-3.5 text-terracotta-600" />
          <span className="hidden sm:inline">360°</span>
        </button>
      </div>

    </div>
  );
}
