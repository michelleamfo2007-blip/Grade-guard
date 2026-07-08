import React, { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app with global state, we would pass this down to the Vendor section.
    // For now, we'll just scroll to the vendors section.
    const el = document.getElementById("vendors");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-40 md:pb-24 flex items-center min-h-[90vh]">
      {/* Background Image with Dark Green Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero_construction_1783516832734.png" 
          alt="Construction Site in Ghana" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-forest-950/85"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Top Label */}
        <div className="inline-block border border-amber-dark text-amber text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
          Build with Certainty · Ghana · All 16 Regions
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 max-w-4xl">
          The right material. For the <span className="text-amber">right job.</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-forest-100 max-w-2xl mb-10 leading-relaxed">
          GradeGuard connects you to 721 construction material suppliers across Ghana and helps you verify grade compliance before you build.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-12">
          <button 
            onClick={() => scrollTo("vendors")}
            className="w-full sm:w-auto bg-amber hover:bg-amber-dark text-forest-950 px-8 py-3.5 rounded-md font-bold text-lg transition-colors"
          >
            Search Vendors
          </button>
          <button 
            onClick={() => scrollTo("scanner")}
            className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-md font-bold text-lg transition-colors"
          >
            Try Grade Scanner
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-white rounded-lg p-2 shadow-2xl mb-16">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="pl-4 text-forest-700">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search suppliers by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow py-3 px-2 sm:px-4 outline-none text-forest-950 bg-transparent text-base min-w-0 w-full"
            />
            <button 
              type="submit"
              className="bg-forest-950 hover:bg-forest-900 text-white px-4 sm:px-6 py-3 rounded-md font-medium whitespace-nowrap transition-colors text-sm sm:text-base flex-shrink-0"
            >
              Search <span className="hidden sm:inline">Suppliers</span> &rarr;
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="w-full max-w-4xl border-t border-forest-800 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-forest-800">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-display text-white mb-2">721</span>
            <span className="text-forest-100 text-sm font-medium uppercase tracking-wider">Suppliers in Database</span>
          </div>
          <div className="flex flex-col items-center pt-6 md:pt-0">
            <span className="text-4xl font-display text-white mb-2">16</span>
            <span className="text-forest-100 text-sm font-medium uppercase tracking-wider">Regions Covered</span>
          </div>
          <div className="flex flex-col items-center pt-6 md:pt-0">
            <span className="text-4xl font-display text-white mb-2">3</span>
            <span className="text-forest-100 text-sm font-medium uppercase tracking-wider">Pillars: Scanner · Marketplace · Consult</span>
          </div>
        </div>

      </div>
    </section>
  );
}
