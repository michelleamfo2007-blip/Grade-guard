import React from "react";
import { CheckCircle2, ShieldCheck, MapPin, Store } from "lucide-react";

export default function StatsBarSection() {
  // In the real app, this would be calculated from the global data array.
  // For MVP UI, we'll hardcode the "Open Now" count as if calculated.
  const openNowCount = 314; 

  return (
    <section id="stats" className="bg-forest-900 border-y border-forest-800 py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-forest-100 text-sm font-medium">
          
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-amber" />
            <span><strong className="text-white">721</strong> suppliers in database</span>
          </div>
          
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-forest-700"></div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber" />
            <span><strong className="text-white">16</strong> regions covered</span>
          </div>
          
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-forest-700"></div>
          
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gsa-green" />
            <span><strong className="text-white">{openNowCount}</strong> suppliers Open Now</span>
          </div>
          
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-forest-700"></div>
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber" />
            <span>Grade standards pre-loaded · Works offline</span>
          </div>

        </div>
      </div>
    </section>
  );
}
