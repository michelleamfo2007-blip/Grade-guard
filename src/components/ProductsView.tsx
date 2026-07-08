import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Search, 
  HelpCircle, 
  Sliders, 
  Check, 
  Cpu, 
  BookOpen, 
  FileCheck,
  Package,
  Layers,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { Product } from "../types";
import { GSA_PRODUCTS } from "../data";

interface ProductsViewProps {
  outdoorMode: boolean;
}

export default function ProductsView({ outdoorMode }: ProductsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "cement" | "blocks" | "rebars" | "aggregates">("all");
  
  // Interactive Selector state
  const [elementSelect, setElementSelect] = useState("column");
  const [viewSpecId, setViewSpecId] = useState<string | null>(null);

  const filteredProducts = GSA_PRODUCTS.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || prod.category === activeTab;
    return matchesSearch && matchesTab;
  });

  // Cement Selection Advisor
  const getCementAdvisory = (element: string) => {
    switch (element) {
      case "column":
        return {
          grade: "Class 42.5N or 42.5R (High Strength)",
          gsaStandard: "GS 1118-1",
          reason: "Columns (pillars) bear the weight of upper stories and dynamic loads. Pouring columns with Grade 32.5R cement is structural misconduct. GSA strictly recommends Class 42.5N cement to prevent concrete shear and buckle collapses.",
          recProduct: "GHACEM Extra 42.5N / Dangote Falcon 42.5R"
        };
      case "slab":
        return {
          grade: "Class 42.5N (High Strength)",
          gsaStandard: "GS 1118-1",
          reason: "Suspended slabs require fast-hardening, durable concrete binding. Class 42.5N guarantees quick formwork removal within 14-21 days with maximum tension endurance.",
          recProduct: "GHACEM Extra 42.5N"
        };
      case "blocks":
        return {
          grade: "Class 32.5R (Rapid Hardening)",
          gsaStandard: "GS 297:2016",
          reason: "Excellent early green strength for fast mold ejecting. It provides high hydration, preventing the blocks from losing shape under humid coastal conditions.",
          recProduct: "GHACEM Super Rapid 32.5R"
        };
      default:
        return {
          grade: "Class 32.5R",
          gsaStandard: "GS 1118-1",
          reason: "Standard 32.5R offers great workability, high water retention, and a smooth creamy plaster finish.",
          recProduct: "GHACEM Super Rapid 32.5R"
        };
    }
  };

  const advice = getCementAdvisory(elementSelect);

  return (
    <div className="w-full">
      {/* HERO HEADER */}
      <section className={`relative w-full overflow-hidden shadow-xl border-b ${outdoorMode ? "border-slate-800" : "border-brand-blue-800"} text-white flex items-center py-16`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/hero_construction_1783516832734.png" alt="Construction Materials" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-900/90 to-black/40"></div>
        </div>
        
        {/* On-Site Contrast Top Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-safety-amber"></div>

        {/* Hero Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-safety-amber/20 border border-safety-amber text-safety-amber font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            <Award className="w-4 h-4" /> GSA Certification
          </div>

          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
            GSA-Certified Materials Directory
          </h1>

          <p className="text-base text-slate-100 font-medium">
            Explore building products certified by the Ghana Standards Authority (GSA) to satisfy safety and structural specs.
          </p>
          </div>
        </div>
      </section>

      {/* INNER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* CEMENT ADVISORY TOOL (INTERACTIVE COMPONENT) */}
      <section className={`p-6 rounded-2xl border shadow-md relative overflow-hidden ${outdoorMode ? "bg-white border-slate-200 text-slate-900" : "bg-brand-blue-900 border-brand-blue-800 text-white"}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-safety-amber/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="text-safety-amber w-5 h-5" />
            <h3 className={`font-display font-bold text-lg ${outdoorMode ? "text-brand-blue-900" : "text-white"}`}>Structural Cement Selector Assistant</h3>
          </div>
          <p className={`text-xs leading-relaxed max-w-2xl ${outdoorMode ? "text-slate-600" : "text-brand-blue-100"}`}>
            Choose what concrete element you are casting below. Our assistant selects the legal cement grade required by GSA codes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            {/* Element Buttons */}
            <div className="flex flex-col gap-2">
              <span className={`text-[10px] uppercase font-mono font-bold ${outdoorMode ? "text-slate-500" : "text-slate-400"}`}>Select Cast Element:</span>
              <button
                type="button"
                onClick={() => setElementSelect("column")}
                className={`py-2 px-3 text-left rounded-lg text-xs font-bold font-display border transition-all cursor-pointer ${elementSelect === "column" ? "bg-safety-amber text-brand-blue-950 border-safety-amber" : (outdoorMode ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700")}`}
              >
                Pillars / Columns (Weight bearing)
              </button>
              <button
                type="button"
                onClick={() => setElementSelect("slab")}
                className={`py-2 px-3 text-left rounded-lg text-xs font-bold font-display border transition-all cursor-pointer ${elementSelect === "slab" ? "bg-safety-amber text-brand-blue-950 border-safety-amber" : (outdoorMode ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700")}`}
              >
                Suspended Slabs & Beams
              </button>
              <button
                type="button"
                onClick={() => setElementSelect("blocks")}
                className={`py-2 px-3 text-left rounded-lg text-xs font-bold font-display border transition-all cursor-pointer ${elementSelect === "blocks" ? "bg-safety-amber text-brand-blue-950 border-safety-amber" : (outdoorMode ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700")}`}
              >
                Sandcrete Blocks (Molding)
              </button>
              <button
                type="button"
                onClick={() => setElementSelect("plaster")}
                className={`py-2 px-3 text-left rounded-lg text-xs font-bold font-display border transition-all cursor-pointer ${elementSelect === "plaster" ? "bg-safety-amber text-brand-blue-950 border-safety-amber" : (outdoorMode ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700")}`}
              >
                Plastering & Masonry Work
              </button>
            </div>

            {/* Advisor Outputs */}
            <div className={`md:col-span-3 p-5 rounded-xl border flex flex-col justify-between ${outdoorMode ? "bg-slate-50 border-slate-200" : "bg-slate-950/80 border-slate-800"}`}>
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-safety-amber font-bold bg-safety-amber/10 border border-safety-amber/20 px-2 py-0.5 rounded uppercase w-max">
                    GSA Recommended Grade
                  </span>
                  <span className={`text-[10px] font-mono ${outdoorMode ? "text-slate-500" : "text-slate-400"}`}>Code: {advice.gsaStandard}</span>
                </div>
                <h4 className={`font-display font-black text-xl ${outdoorMode ? "text-brand-blue-950" : "text-white"}`}>{advice.grade}</h4>
                <p className={`text-xs leading-relaxed ${outdoorMode ? "text-slate-600" : "text-slate-300"}`}>{advice.reason}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Recommended Brand Product:</span>
                <span className="text-gsa-green font-bold flex items-center gap-1">
                  <FileCheck className="w-4 h-4 text-gsa-green" /> {advice.recProduct}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER SEARCH PANEL */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search certified materials..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl py-2 px-4 pl-10 text-xs font-medium focus:border-brand-blue-800"
          />
          <Search className="absolute left-3.5 top-2.5 text-slate-400 w-4.5 h-4.5" />
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-1 border-b pb-1 w-full sm:w-auto">
          {(["all", "cement", "blocks", "rebars", "aggregates"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 text-xs font-bold rounded-lg uppercase transition-all cursor-pointer ${activeTab === tab ? "bg-brand-blue-800 text-white font-mono" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800"}`}
            >
              {tab === "all" ? "View All" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid-container">
        {filteredProducts.map(prod => (
          <div 
            key={prod.id} 
            className={`card flex flex-col justify-between overflow-hidden ${outdoorMode ? "border-slate-800 text-slate-900 dark:text-slate-100" : "border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"}`}
          >
            {/* Header branding */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-brand-blue-800 dark:text-slate-200 bg-brand-blue-100 dark:bg-slate-800 border border-brand-blue-600/20 px-2 py-0.5 rounded">
                  {prod.brand}
                </span>
                <h3 className="font-display font-bold text-lg text-brand-blue-900 dark:text-slate-100 leading-tight">
                  {prod.name}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 bg-gsa-green-light dark:bg-slate-800 border border-gsa-green/20 text-gsa-green-dark dark:text-gsa-green text-[10px] font-mono font-extrabold px-2 py-1 rounded">
                  <FileCheck className="w-3.5 h-3.5" /> GSA CERTIFIED
                </span>
              </div>
            </div>

            {/* Description & specifications */}
            <div className="p-6 space-y-4 flex-1">
              {prod.image && (
                <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-inner">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {prod.description}
              </p>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Ideal Applications:</span>
                <p className="text-xs text-brand-blue-950 dark:text-white font-semibold bg-brand-blue-100 dark:bg-slate-800/50 p-2.5 rounded-lg border border-brand-blue-800/10">
                  {prod.idealUsage}
                </p>
              </div>

              {/* Collapsible specification Table */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900/50">
                <button
                  type="button"
                  onClick={() => setViewSpecId(viewSpecId === prod.id ? null : prod.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between hover:bg-slate-50 dark:bg-slate-900/50 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-mono">
                    <BookOpen className="w-3.5 h-3.5 text-brand-blue-800 dark:text-slate-200" /> Technical GSA Specifications
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${viewSpecId === prod.id ? "rotate-180" : ""}`} />
                </button>

                {viewSpecId === prod.id && (
                  <div className="border-t border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 space-y-1">
                    <table className="w-full text-xs text-left text-slate-600 dark:text-slate-300 font-mono">
                      <tbody>
                        <tr className="border-b border-slate-100 dark:border-slate-800">
                          <td className="py-1.5 font-bold text-slate-400">License Code</td>
                          <td className="py-1.5 font-bold text-brand-blue-900 dark:text-slate-100 text-right">{prod.certificationCode}</td>
                        </tr>
                        {Object.entries(prod.specifications).map(([key, val]) => (
                          <tr key={key} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                            <td className="py-1.5 text-slate-500 dark:text-slate-400">{key}</td>
                            <td className="py-1.5 text-slate-800 dark:text-slate-200 text-right font-medium">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Footer action button */}
            <div className="p-4 border-t border-slate-50 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono font-bold">Category: {prod.category.toUpperCase()}</span>
              <a 
                href={`tel:+233303204225`}
                className="text-xs font-extrabold text-brand-blue-800 dark:text-slate-200 hover:text-brand-blue-600 cursor-pointer flex items-center gap-1"
              >
                Inquire Purchase <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

// Standard Lucide ArrowRight used
