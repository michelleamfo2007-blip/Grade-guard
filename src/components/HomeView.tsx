import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  ScanLine, 
  Store, 
  MessageSquareCode, 
  FileText, 
  Award, 
  Compass, 
  ChevronRight, 
  AlertOctagon,
  Clock
} from "lucide-react";
import { GSA_STANDARDS_DOCS } from "../data";

interface HomeViewProps {
  onNavigate: (page: string) => void;
  outdoorMode: boolean;
}

export default function HomeView({ onNavigate, outdoorMode }: HomeViewProps) {
  return (
    <div className="w-full">
      {/* 1. HERO HEADER */}
      <section className={`relative w-full overflow-hidden shadow-xl border-b ${outdoorMode ? "border-slate-800" : "border-brand-blue-800"} text-white min-h-[calc(100vh-80px)] flex items-center`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/hero_construction_1783516832734.png" alt="Ghana Construction Site" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-900/90 to-black/30"></div>
        </div>
        
        {/* On-Site Contrast Top Accent */}
        <div className="absolute top-0 left-0 w-full h-3 bg-safety-amber"></div>

        {/* Hero Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-safety-amber/20 border border-safety-amber text-safety-amber font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-4 h-4" /> GSA STANDARD CODES ACTIVE
          </div>

          <h1 className="font-display font-extrabold text-white text-3xl md:text-5xl leading-tight tracking-tight">
            Secure the Strength of <span className="text-safety-amber text-shadow">Ghana's Infrastructure</span>
          </h1>

          <p className="text-base md:text-lg text-slate-100 font-medium">
            Prevent building collapses and poor material mixes. Use **Grade Guard** to verify cement ratios, Sandcrete blocks, and steel rebar sizing under the <strong>Ghana Standards Authority (GSA) guidelines</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => onNavigate("scanner")}
              className="px-6 py-3.5 bg-safety-amber hover:bg-safety-amber-dark text-brand-blue-950 dark:text-white font-bold font-display rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer transform active:scale-98"
            >
              <ScanLine className="w-5 h-5" /> Start Compliance Scan
            </button>
            <button
              onClick={() => onNavigate("vendors")}
              className="px-6 py-3.5 bg-brand-blue-700 hover:bg-brand-blue-600 border border-brand-blue-100/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Store className="w-5 h-5" /> Source GSA Vendors
            </button>
          </div>
        </div>

        {/* Diagonal Visual Badge */}
        <div className="hidden lg:block absolute right-12 bottom-12 opacity-15">
          <ShieldCheck className="w-64 h-64 text-brand-blue-100" />
        </div>
      </section>

      {/* INNER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">


      {/* 3. THE THREE PILLARS SECTIONS */}
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-blue-900 dark:text-slate-100 mb-6 flex items-center gap-2">
          <Award className="text-safety-amber w-6 h-6" /> Our Core Safety Pillars
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Scanner */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`rounded-2xl border flex flex-col overflow-hidden backdrop-blur-xl ${outdoorMode ? "bg-white/90 dark:bg-slate-900/90 border-slate-800 text-slate-900 dark:text-slate-100" : "bg-white/80 dark:bg-slate-900/80 border-slate-200/60 dark:border-slate-800/60 text-slate-800 dark:text-slate-200"} shadow-lg`}
          >
            <div className="h-40 w-full relative">
              <img src="/images/ghacem_32_1783511754247.png" alt="Compliance Scanner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-brand-blue-100 dark:bg-slate-800 text-brand-blue-800 dark:text-slate-200 flex items-center justify-center shadow-lg">
                <ScanLine className="w-6 h-6" />
              </div>
            </div>
            
            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-brand-blue-900 dark:text-slate-100">1. Grade Compliance Scanner</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Analyze concrete mixes, sandcrete hollow blocks, and steel rebar diameters. Upload site images to get a detailed GSA checklist report with calculated strength estimates and environmental tips.
                </p>
              </div>
            <button 
              onClick={() => onNavigate("scanner")}
              className="mt-6 flex items-center gap-1 text-sm font-bold text-brand-blue-800 dark:text-slate-200 hover:text-brand-blue-600 group cursor-pointer"
            >
              Analyze Materials <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            </div>
          </motion.div>

          {/* Pillar 2: Verified Marketplace */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`rounded-2xl border flex flex-col overflow-hidden backdrop-blur-xl ${outdoorMode ? "bg-white/90 dark:bg-slate-900/90 border-slate-800 text-slate-900 dark:text-slate-100" : "bg-white/80 dark:bg-slate-900/80 border-slate-200/60 dark:border-slate-800/60 text-slate-800 dark:text-slate-200"} shadow-lg`}
          >
            <div className="h-40 w-full relative">
              <img src="/images/v_emerald_1783512975414.png" alt="Vendor Marketplace" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-safety-amber-light dark:bg-slate-800 text-safety-amber-dark dark:text-safety-amber flex items-center justify-center shadow-lg">
                <Store className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-brand-blue-900 dark:text-slate-100">2. Verified Vendor Marketplace</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Connect directly with GSA-certified block factories, licensed steel mills, and accredited quarries. Search license numbers instantly to verify current compliance before purchasing.
                </p>
              </div>
            <button 
              onClick={() => onNavigate("vendors")}
              className="mt-6 flex items-center gap-1 text-sm font-bold text-brand-blue-800 dark:text-slate-200 hover:text-brand-blue-600 group cursor-pointer"
            >
              Explore Vendors <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            </div>
          </motion.div>

          {/* Pillar 3: Consultancy Services */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`rounded-2xl border flex flex-col overflow-hidden backdrop-blur-xl ${outdoorMode ? "bg-white/90 dark:bg-slate-900/90 border-slate-800 text-slate-900 dark:text-slate-100" : "bg-white/80 dark:bg-slate-900/80 border-slate-200/60 dark:border-slate-800/60 text-slate-800 dark:text-slate-200"} shadow-lg`}
          >
            <div className="h-40 w-full relative">
              <img src="/images/v_shai_1783513012500.png" alt="Consultancy Services" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-gsa-green-light dark:bg-slate-800 text-gsa-green-dark dark:text-gsa-green flex items-center justify-center shadow-lg">
                <MessageSquareCode className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-brand-blue-900 dark:text-slate-100">3. Consultancy & Inspections</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Book registered Ghana Institution of Engineering (GhIE) structural specialists and GSA-affiliated laboratory testing engineers. Schedule pre-pour slab approvals and block crushing tests.
                </p>
              </div>
            <button 
              onClick={() => onNavigate("consultations")}
              className="mt-6 flex items-center gap-1 text-sm font-bold text-brand-blue-800 dark:text-slate-200 hover:text-brand-blue-600 group cursor-pointer"
            >
              Book Inspection <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. GHANA STANDARDS AUTHORITY DOCUMENT ARCHIVE */}
      <section className={`rounded-2xl p-6 md:p-8 border backdrop-blur-xl ${outdoorMode ? "bg-white/90 dark:bg-slate-900/90 border-slate-800 text-slate-900 dark:text-slate-100" : "bg-slate-900/80 dark:bg-slate-900/80 border-slate-800/60 text-slate-100"} shadow-lg`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800/50 pb-4">
          <div className="space-y-1">
            <h3 className={`font-display font-bold text-xl ${outdoorMode ? "text-slate-900 dark:text-slate-100" : "text-white"}`}>GSA Regulatory Standards Archive</h3>
            <p className="text-sm text-slate-400">Ghanaian building requirements every contractor must memorize.</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm text-slate-300 border border-slate-700/60 text-xs px-3 py-1.5 rounded-lg font-mono font-semibold shadow-inner">
            <FileText className="w-4 h-4 text-safety-amber" /> 4 Active Codes Loading
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GSA_STANDARDS_DOCS.map((doc, idx) => (
            <div 
              key={idx} 
              className={`p-5 rounded-xl border ${outdoorMode ? "bg-slate-50 dark:bg-slate-900/50 border-slate-400 text-slate-900 dark:text-slate-100" : "bg-slate-950 border-slate-850 text-slate-200"} space-y-3`}
            >
              <div className="flex items-center gap-2 justify-between">
                <span className="font-mono font-extrabold text-brand-blue-800 dark:text-slate-200 bg-brand-blue-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-xs border border-brand-blue-600/20">
                  {doc.code}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> Mandatory Code
                </span>
              </div>
              <h4 className="font-display font-bold text-base text-brand-blue-900 dark:text-slate-100 leading-tight">
                {doc.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {doc.scope}
              </p>
              <div className="bg-safety-amber-light dark:bg-slate-800/30 border-l-4 border-safety-amber p-2 rounded text-xs text-slate-800 dark:text-slate-200 font-medium">
                <strong>Critical Rule:</strong> {doc.crucialRule}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. QUICK SAFETY STATS CHEATSHEETS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-brand-blue-900 dark:text-slate-100 font-mono">1:2:4</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold tracking-wider font-mono">C20 Mix Ratio</div>
          <div className="text-[10px] text-gsa-green-dark dark:text-gsa-green font-bold font-mono mt-1">Slabs & Foundations</div>
        </div>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-brand-blue-900 dark:text-slate-100 font-mono">2.8 <span className="text-xs font-sans">N/mm²</span></div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold tracking-wider font-mono">Block Compressive</div>
          <div className="text-[10px] text-gsa-green-dark dark:text-gsa-green font-bold font-mono mt-1">GSA Sandcrete Load Limit</div>
        </div>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-brand-blue-900 dark:text-slate-100 font-mono">40 <span className="text-xs font-sans">mm</span></div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold tracking-wider font-mono">Concrete Cover</div>
          <div className="text-[10px] text-safety-amber-dark dark:text-safety-amber font-bold font-mono mt-1">Minimum for Coastal Beams</div>
        </div>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-brand-blue-900 dark:text-slate-100 font-mono">42.5<span className="text-xs font-sans">N</span></div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold tracking-wider font-mono">Pillar Cement</div>
          <div className="text-[10px] text-gsa-green-dark dark:text-gsa-green font-bold font-mono mt-1">Mandatory for Columns</div>
        </div>
      </div>
      </div>
    </div>
  );
}
