import React, { useState } from "react";
import { 
  Settings, 
  Sun, 
  Monitor, 
  Building, 
  MapPin, 
  ShieldCheck, 
  FileCheck,
  Type,
  FileCode,
  CheckCircle2
} from "lucide-react";

interface SettingsViewProps {
  outdoorMode: boolean;
  onToggleOutdoorMode: () => void;
  codeStandard: "gsa" | "eurocode";
  onSetCodeStandard: (standard: "gsa" | "eurocode") => void;
  fontSizeScale: "normal" | "large" | "xlarge";
  onSetFontSizeScale: (scale: "normal" | "large" | "xlarge") => void;
}

export default function SettingsView({ 
  outdoorMode, 
  onToggleOutdoorMode,
  codeStandard,
  onSetCodeStandard,
  fontSizeScale,
  onSetFontSizeScale
}: SettingsViewProps) {
  
  // Organization Details State
  const [orgDetails, setOrgDetails] = useState({
    contractorName: "Ghana Build Consortium Ltd",
    licenseNo: "GSA-CONT-829910",
    engineerEmail: "inspections@ghanabuild.com.gh",
    phone: "+233 302 990 123",
    siteLocation: "East Legon, Accra",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="w-full">
      {/* HERO HEADER */}
      <section className={`relative w-full overflow-hidden shadow-xl border-b ${outdoorMode ? "border-slate-800" : "border-brand-blue-800"} text-white flex items-center py-16`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/media__1783511504358.png" alt="System Administration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-900/90 to-black/40"></div>
        </div>
        
        {/* On-Site Contrast Top Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-safety-amber"></div>

        {/* Hero Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-safety-amber/20 border border-safety-amber text-safety-amber font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            <Sliders className="w-4 h-4" /> Preferences & Config
          </div>

          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
            System Administration
          </h1>

          <p className="text-base text-slate-100 font-medium">
            Manage app preferences, configure local structural codes, and update your contractor profile details.
          </p>
          </div>
        </div>
      </section>

      {/* INNER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: SYSTEM PREFERENCES (6 COLS) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-brand-blue-900 dark:text-slate-100 flex items-center gap-2">
              <Sun className="text-safety-amber w-5 h-5 animate-pulse" /> Outdoor Site Optimization
            </h3>

            {/* Outdoor high-contrast mode */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                1. High-Contrast Contrast Mode
              </label>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5 max-w-sm">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">☀️ Extreme Outdoor Visibility</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Increases font thickness, darkens borders, and forces absolute high-contrast background coloring. Ideal for workers under harsh noon sunlight in Accra.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onToggleOutdoorMode}
                  className={`px-4 py-2 text-xs font-black font-mono uppercase rounded-lg border-2 transition-all cursor-pointer ${outdoorMode ? "bg-safety-amber text-brand-blue-950 dark:text-white border-safety-amber" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 hover:bg-slate-50 dark:bg-slate-900/50"}`}
                >
                  {outdoorMode ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {/* Font size scale */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                2. Font Size Scaling
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "normal", name: "Standard" },
                  { id: "large", name: "Large Text" },
                  { id: "xlarge", name: "Extra Large" }
                ].map(scale => (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => onSetFontSizeScale(scale.id as any)}
                    className={`py-2 px-1 text-xs font-bold font-display rounded-lg border transition-all cursor-pointer text-center ${fontSizeScale === scale.id ? "border-brand-blue-800 bg-brand-blue-100 dark:bg-slate-800/40 text-brand-blue-900 dark:text-slate-100 font-mono" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900"}`}
                  >
                    {scale.name}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Adjusts letter spacing and sizes across material reports for quick block-walk checklist viewing.
              </p>
            </div>

            {/* Standards Code Select */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                3. Active Compliance Code Standard
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onSetCodeStandard("gsa")}
                  className={`py-3.5 px-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 ${codeStandard === "gsa" ? "border-brand-blue-800 bg-brand-blue-100 dark:bg-slate-800/40 text-brand-blue-900 dark:text-slate-100" : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"}`}
                >
                  <ShieldCheck className="w-5 h-5 text-gsa-green-dark dark:text-gsa-green" />
                  <div className="text-center">
                    <p className="text-xs font-extrabold font-display">GSA Building Codes</p>
                    <p className="text-[9px] font-mono text-slate-400">GS 1207:2018 (Accra)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSetCodeStandard("eurocode")}
                  className={`py-3.5 px-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 ${codeStandard === "eurocode" ? "border-brand-blue-800 bg-brand-blue-100 dark:bg-slate-800/40 text-brand-blue-900 dark:text-slate-100" : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"}`}
                >
                  <FileCode className="w-5 h-5 text-brand-blue-800 dark:text-slate-200" />
                  <div className="text-center">
                    <p className="text-xs font-extrabold font-display">Eurocodes 2 / BS</p>
                    <p className="text-[9px] font-mono text-slate-400">BS EN 1992 (Slabs/Beams)</p>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: CONTRACTOR ORGANIZATION METADATA (6 COLS) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-brand-blue-900 dark:text-slate-100 flex items-center gap-2">
              <Building className="text-brand-blue-800 dark:text-slate-200 w-5.5 h-5.5" /> Contractor & Site Profile
            </h3>

            {isSaved && (
              <div className="bg-gsa-green-light dark:bg-slate-800 border-l-4 border-gsa-green text-gsa-green-dark dark:text-gsa-green p-3 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Profile saved successfully! Saved parameters synced to local state.
              </div>
            )}

            <form onSubmit={handleSaveDetails} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">Contracting Organization</label>
                <input
                  type="text"
                  required
                  value={orgDetails.contractorName}
                  onChange={e => setOrgDetails({ ...orgDetails, contractorName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">GSA Contractor License</label>
                  <input
                    type="text"
                    required
                    value={orgDetails.licenseNo}
                    onChange={e => setOrgDetails({ ...orgDetails, licenseNo: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">Primary Site Location</label>
                  <input
                    type="text"
                    required
                    value={orgDetails.siteLocation}
                    onChange={e => setOrgDetails({ ...orgDetails, siteLocation: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">Lead Engineer Email</label>
                  <input
                    type="email"
                    required
                    value={orgDetails.engineerEmail}
                    onChange={e => setOrgDetails({ ...orgDetails, engineerEmail: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    value={orgDetails.phone}
                    onChange={e => setOrgDetails({ ...orgDetails, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-brand-blue-800 hover:bg-brand-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Save Organization Profile
              </button>
            </form>
          </div>

          {/* Diagnostic Log panel */}
          <div className={`border rounded-2xl p-5 space-y-2 ${outdoorMode ? "bg-white border-slate-200 text-slate-900" : "bg-slate-900 border-slate-800 text-white"}`}>
            <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Diagnostics Trace</span>
            <div className={`p-3 rounded-lg border h-24 overflow-y-auto font-mono text-[9px] space-y-1 ${outdoorMode ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-slate-950 border-slate-800 text-slate-300"}`}>
              <p className="text-gsa-green">[SUCCESS] GSA database connection secure. Active port: 3000</p>
              <p>[INFO] Standards model loaded: GS 1207:2018 unified structural codes.</p>
              <p>[INFO] Local caching initialized: 128kb GSA product catalog memory.</p>
              <p>[INFO] Environment settings: Host Container Cloud Run Service.</p>
            </div>
          </div>

        </div>

      </div>
      </div>
    </div>
  );
}
