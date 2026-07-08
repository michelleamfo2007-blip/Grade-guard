import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scan, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Camera, 
  Upload, 
  FileSpreadsheet, 
  RefreshCw, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";
import { ScanResult, ScanParams } from "../types";

interface ScannerViewProps {
  onSaveScan: (material: string, result: ScanResult) => void;
  outdoorMode: boolean;
}

// Construction sample presets for easy testing
const PRESETS = [
  {
    id: "preset-good-block",
    name: "Standard 6\" Sandcrete Block",
    category: "blocks",
    img: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=600",
    description: "River sand + GSA 32.5R cement, cured for 14 days.",
    params: { mixRatio: 6, sandType: "river", curingDays: 14 }
  },
  {
    id: "preset-sea-block",
    name: "Coastal Substandard Block (Sea Sand)",
    category: "blocks",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600",
    description: "Illegal coastal beach sand block, cured 3 days.",
    params: { mixRatio: 10, sandType: "sea", curingDays: 3 }
  },
  {
    id: "preset-good-slab",
    name: "C25 Suspended Slab Concrete",
    category: "concrete",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600",
    description: "1:1.5:3 structural mix using 42.5N cement, 0.50 W/C.",
    params: { cementRatio: 1, sandRatio: 1.5, stoneRatio: 3, waterCementRatio: 0.5, cementType: "42.5N", useCase: "slabs", sandSiltContent: 2 }
  },
  {
    id: "preset-bad-concrete",
    name: "Diluted Columns Concrete Mix",
    category: "concrete",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    description: "Watery 1:3:6 concrete poured into load-bearing pillars.",
    params: { cementRatio: 1, sandRatio: 3, stoneRatio: 6, waterCementRatio: 0.75, cementType: "32.5R", useCase: "columns", sandSiltContent: 12 }
  },
  {
    id: "preset-rusted-rebar",
    name: "Severely Corroded Y12 Rebars",
    category: "rebars",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    description: "Rebars stored outdoors in salt air with only 15mm cover planned.",
    params: { diameter: 12, spacing: 250, concreteCover: 15, rustLevel: "severe" }
  }
];

export default function ScannerView({ onSaveScan, outdoorMode }: ScannerViewProps) {
  const [materialType, setMaterialType] = useState<"concrete" | "blocks" | "rebars">("concrete");
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Concrete Parameters State
  const [concreteParams, setConcreteParams] = useState<ScanParams>({
    cementRatio: 1,
    sandRatio: 2,
    stoneRatio: 4,
    waterCementRatio: 0.50,
    cementType: "32.5R",
    useCase: "slabs",
    sandSiltContent: 3
  });

  // Block Parameters State
  const [blockParams, setBlockParams] = useState<ScanParams>({
    mixRatio: 6,
    sandType: "river",
    curingDays: 14
  });

  // Rebar Parameters State
  const [rebarParams, setRebarParams] = useState<ScanParams>({
    diameter: 12,
    spacing: 150,
    concreteCover: 30,
    rustLevel: "light"
  });

  const handleParamChange = (field: keyof ScanParams, value: any) => {
    if (materialType === "concrete") {
      setConcreteParams(prev => ({ ...prev, [field]: value }));
    } else if (materialType === "blocks") {
      setBlockParams(prev => ({ ...prev, [field]: value }));
    } else {
      setRebarParams(prev => ({ ...prev, [field]: value }));
    }
  };

  const getActiveParams = (): ScanParams => {
    if (materialType === "concrete") return concreteParams;
    if (materialType === "blocks") return blockParams;
    return rebarParams;
  };

  // Image upload handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const selectPreset = (preset: typeof PRESETS[0]) => {
    setMaterialType(preset.category as any);
    setImage(preset.img);
    if (preset.category === "concrete") {
      setConcreteParams(preset.params);
    } else if (preset.category === "blocks") {
      setBlockParams(preset.params);
    } else if (preset.category === "rebars") {
      setRebarParams(preset.params);
    }
    // clear prior results
    setResult(null);
    setError(null);
  };

  // Run the scan via backend proxy API
  const handleStartScan = async () => {
    setIsScanning(true);
    setError(null);
    setResult(null);

    const steps = [
      "Securing connection to Grade Guard GSA database...",
      "Extracting physical sand and cement proportions...",
      "Benchmarking against GS 297:2016 and GS 1118 standards...",
      "Analyzing reinforcement tolerances and cover safety factor...",
      "Generating structural engineering report..."
    ];

    let currentStepIndex = 0;
    setScanStep(steps[currentStepIndex]);

    const stepInterval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex < steps.length) {
        setScanStep(steps[currentStepIndex]);
      } else {
        clearInterval(stepInterval);
      }
    }, 550);

    try {
      const activeParams = getActiveParams();
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialType,
          image,
          params: activeParams
        })
      });

      if (!response.ok) {
        throw new Error("Backend inspection analyzer returned an error.");
      }

      const report: ScanResult = await response.json();
      setResult(report);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to complete material compliance scanning.");
    } finally {
      clearInterval(stepInterval);
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  const getStatusColor = (status: ScanResult["status"]) => {
    switch (status) {
      case "COMPLIANT": return "bg-gsa-green text-white border-gsa-green-dark";
      case "WARN": return "bg-safety-amber text-brand-blue-950 dark:text-white border-safety-amber-dark";
      case "NON_COMPLIANT": return "bg-gsa-red text-white border-gsa-red-dark";
      case "CRITICAL": return "bg-slate-900 text-gsa-red border-gsa-red-dark animate-pulse";
    }
  };

  const getStatusBadgeIcon = (status: ScanResult["status"]) => {
    switch (status) {
      case "COMPLIANT": return <CheckCircle2 className="w-5 h-5 mr-1" />;
      case "WARN": return <AlertTriangle className="w-5 h-5 mr-1" />;
      default: return <XCircle className="w-5 h-5 mr-1" />;
    }
  };

  return (
    <div className="w-full">
      {/* HERO HEADER */}
      <section className={`relative w-full overflow-hidden shadow-xl border-b ${outdoorMode ? "border-slate-800" : "border-brand-blue-800"} text-white flex items-center py-16`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/block_9inch_1783511819652.png" alt="Scanner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-900/90 to-black/40"></div>
        </div>
        
        {/* On-Site Contrast Top Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-safety-amber"></div>

        {/* Hero Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-safety-amber/20 border border-safety-amber text-safety-amber font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3">
              <Scan className="w-4 h-4" /> Live Verification
            </div>

            <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight mb-3">
              GSA Compliance Scanner
            </h1>

            <p className="text-base text-slate-100 font-medium max-w-lg">
              Validate on-site building ingredients and dimensions against national building regulations.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 mt-6 md:mt-0">
            <button
              onClick={() => selectPreset(PRESETS[1])}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer text-left"
            >
              Load Sample Failure Block
            </button>
            <button
              onClick={() => selectPreset(PRESETS[2])}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer text-left"
            >
              Load Sample Structural Slab
            </button>
          </div>
        </div>
      </section>

      {/* INNER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: SCANNER INPUTS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* MATERIAL TYPE SELECTOR */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              Step 1: Select Material Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setMaterialType("concrete"); setResult(null); }}
                className={`py-3 px-1.5 text-xs font-bold font-display rounded-xl border-2 transition-all cursor-pointer text-center ${materialType === "concrete" ? "border-brand-blue-800 bg-brand-blue-100 dark:bg-slate-800/40 text-brand-blue-900 dark:text-slate-100" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900"}`}
              >
                Concrete Mix
              </button>
              <button
                type="button"
                onClick={() => { setMaterialType("blocks"); setResult(null); }}
                className={`py-3 px-1.5 text-xs font-bold font-display rounded-xl border-2 transition-all cursor-pointer text-center ${materialType === "blocks" ? "border-brand-blue-800 bg-brand-blue-100 dark:bg-slate-800/40 text-brand-blue-900 dark:text-slate-100" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900"}`}
              >
                Sandcrete Blocks
              </button>
              <button
                type="button"
                onClick={() => { setMaterialType("rebars"); setResult(null); }}
                className={`py-3 px-1.5 text-xs font-bold font-display rounded-xl border-2 transition-all cursor-pointer text-center ${materialType === "rebars" ? "border-brand-blue-800 bg-brand-blue-100 dark:bg-slate-800/40 text-brand-blue-900 dark:text-slate-100" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900"}`}
              >
                Steel Rebars
              </button>
            </div>
          </div>

          {/* DYNAMIC FORM PARAMETERS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <h3 className="font-display font-bold text-lg text-brand-blue-900 dark:text-slate-100 border-b pb-2 flex items-center justify-between">
              <span>Step 2: Enter Field Parameters</span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded uppercase">GS Compliance</span>
            </h3>

            {/* CONCRETE MIX SPECIFIC */}
            {materialType === "concrete" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">Cement Pt</label>
                    <input
                      type="number"
                      step="0.5"
                      value={concreteParams.cementRatio || 1}
                      onChange={e => handleParamChange("cementRatio", Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">Sand Pt</label>
                    <input
                      type="number"
                      step="0.5"
                      value={concreteParams.sandRatio || 2}
                      onChange={e => handleParamChange("sandRatio", Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 font-mono">Stone Pt</label>
                    <input
                      type="number"
                      step="0.5"
                      value={concreteParams.stoneRatio || 4}
                      onChange={e => handleParamChange("stoneRatio", Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm text-center font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                    <span>Water-Cement Ratio (W/C)</span>
                    <span className="text-brand-blue-800 dark:text-slate-200 font-mono font-bold">{(concreteParams.waterCementRatio || 0.5).toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.30"
                    max="0.80"
                    step="0.02"
                    value={concreteParams.waterCementRatio || 0.50}
                    onChange={e => handleParamChange("waterCementRatio", Number(e.target.value))}
                    className="w-full accent-brand-blue-800 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                    <span>0.30 (Dry/Stiff)</span>
                    <span className="text-gsa-green-dark dark:text-gsa-green font-bold">0.45 - 0.55 (GSA Ideal)</span>
                    <span>0.80 (Watery/Weak)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cement Bag Grade</label>
                    <select
                      value={concreteParams.cementType || "32.5R"}
                      onChange={e => handleParamChange("cementType", e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs font-bold"
                    >
                      <option value="32.5R">32.5R (Rapid Hardening)</option>
                      <option value="42.5N">42.5N (High Strength Columns)</option>
                      <option value="42.5R">42.5R (Premium High early)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Structural Element</label>
                    <select
                      value={concreteParams.useCase || "slabs"}
                      onChange={e => handleParamChange("useCase", e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs font-bold"
                    >
                      <option value="footings">Foundations/Footings</option>
                      <option value="slabs">Suspended Slabs / Beams</option>
                      <option value="columns">Columns/Pillars (VITAL)</option>
                      <option value="blinding">Blinding (Non-structural)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                    <span>Sand Silt Content (%)</span>
                    <span className={`text-xs font-mono font-bold ${(concreteParams.sandSiltContent || 3) > 6 ? "text-gsa-red" : "text-gsa-green-dark dark:text-gsa-green"}`}>
                      {concreteParams.sandSiltContent || 3}% {(concreteParams.sandSiltContent || 3) > 6 ? "(SUBSTANDARD)" : "(GSA APPROVED)"}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={concreteParams.sandSiltContent || 3}
                    onChange={e => handleParamChange("sandSiltContent", Number(e.target.value))}
                    className="w-full accent-brand-blue-800 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    GSA mandates aggregates silt content MUST be below **6%** by volume. High silt weakens cement binding.
                  </p>
                </div>
              </div>
            )}

            {/* SANDCRETE BLOCKS SPECIFIC */}
            {materialType === "blocks" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Sandcrete Mix Proportion
                  </label>
                  <select
                    value={blockParams.mixRatio || 6}
                    onChange={e => handleParamChange("mixRatio", Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs font-bold"
                  >
                    <option value="4">1 bag cement to 4 wheelbarrows sand (Heavy Structural)</option>
                    <option value="6">1 bag cement to 6 wheelbarrows sand (GSA Standard)</option>
                    <option value="8">1 bag cement to 8 wheelbarrows sand (Non-load partition only)</option>
                    <option value="10">1 bag cement to 10 wheelbarrows sand (SUBSTANDARD DANGER)</option>
                    <option value="12">1 bag cement to 12 wheelbarrows sand (HIGH COLLAPSE RISK)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    aggregate / Sand Quality Source
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["river", "quarry", "sea"].map(source => (
                      <button
                        type="button"
                        key={source}
                        onClick={() => handleParamChange("sandType", source)}
                        className={`py-2 px-1 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${blockParams.sandType === source ? (source === "sea" ? "bg-gsa-red-light dark:bg-slate-800 text-gsa-red border-gsa-red" : "bg-brand-blue-100 dark:bg-slate-800 text-brand-blue-900 dark:text-slate-100 border-brand-blue-800") : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"}`}
                      >
                        {source === "river" ? "River Sand" : source === "quarry" ? "Quarry Dust" : "Sea Sand (🚨)"}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    * WARNING: Sea sand contains sodium chloride which absorbs moisture indefinitely and corrodes reinforcement rods inside. GSA strictly prohibits sea sand in building casting.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                    <span>Block Wet Curing Period (Days)</span>
                    <span className="text-brand-blue-800 dark:text-slate-200 font-mono font-bold">{blockParams.curingDays || 14} Days</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="28"
                    step="1"
                    value={blockParams.curingDays || 14}
                    onChange={e => handleParamChange("curingDays", Number(e.target.value))}
                    className="w-full accent-brand-blue-800 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                    <span>1 Day (Extremely Weak)</span>
                    <span className="text-gsa-green-dark dark:text-gsa-green font-bold">14+ Days (Hydrated)</span>
                    <span>28 Days (Full Strength)</span>
                  </div>
                </div>
              </div>
            )}

            {/* REBARS SPECIFIC */}
            {materialType === "rebars" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Rebar Diameter</label>
                    <select
                      value={rebarParams.diameter || 12}
                      onChange={e => handleParamChange("diameter", Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs font-bold"
                    >
                      <option value="10">Y10 (Stirrups / Link rods)</option>
                      <option value="12">Y12 (Main reinforcement slabs)</option>
                      <option value="16">Y16 (Main pillars / beams)</option>
                      <option value="20">Y20 (Heavy Columns)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Center-Center Spacing</label>
                    <select
                      value={rebarParams.spacing || 150}
                      onChange={e => handleParamChange("spacing", Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs font-bold"
                    >
                      <option value="100">100mm (Dense structural)</option>
                      <option value="150">150mm (GSA Recommended)</option>
                      <option value="200">200mm (Maximum for slabs)</option>
                      <option value="250">250mm (Wide - Risk deflection)</option>
                      <option value="300">300mm (HIGH CRACK RISK)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                    <span>Concrete Cover Depth</span>
                    <span className="text-brand-blue-800 dark:text-slate-200 font-mono font-bold">{rebarParams.concreteCover || 30} mm</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={rebarParams.concreteCover || 30}
                    onChange={e => handleParamChange("concreteCover", Number(e.target.value))}
                    className="w-full accent-brand-blue-800 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                    <span>10mm (Exposed)</span>
                    <span className="text-gsa-green-dark dark:text-gsa-green font-bold">25-40mm (Secure GSA Cover)</span>
                    <span>60mm (Deep)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Surface Rust Level</label>
                  <select
                    value={rebarParams.rustLevel || "light"}
                    onChange={e => handleParamChange("rustLevel", e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs font-bold"
                  >
                    <option value="none">None (Bright grey / mill scale)</option>
                    <option value="light">Light Surface Dust (Enhances bond)</option>
                    <option value="moderate">Moderate Rust (Pitted but solid)</option>
                    <option value="severe">Severe Flaky Scaling Rust (Reduces bar area 🚨)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* PRESET CHIPS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-safety-amber" /> Load Quick Site Scenarios
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(preset)}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-bold py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-800 transition-all cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCANNED IMAGE AND LIVE ANALYZER OUTPUT (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* IMAGE UPLOAD PANEL OR SCANNING ANIMATION */}
          <div className={`card-elevated overflow-hidden relative min-h-[320px] flex flex-col justify-between ${outdoorMode ? "" : "bg-slate-900 border-slate-800 text-white"}`}>
            
            {/* Top Accent Indicators */}
            <div className="flex items-center justify-between z-10">
              <span className={`font-mono text-[10px] font-bold py-1 px-2 border rounded uppercase tracking-wider ${outdoorMode ? "bg-slate-100 border-slate-200 text-slate-600" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
                GSA Scan Capture Feed
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gsa-green animate-ping"></span>
                <span className={`text-[10px] font-mono font-semibold ${outdoorMode ? "text-slate-500" : "text-slate-300"}`}>FEED LIVE</span>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="my-auto flex flex-col items-center justify-center space-y-4 z-10 py-6">
              {isScanning ? (
                // Pulse Animation Overlay
                <div className="text-center space-y-4 w-full px-8">
                  <div className="relative w-40 h-40 mx-auto rounded-full border-4 border-dashed border-safety-amber flex items-center justify-center animate-spin">
                    <Scan className="w-16 h-16 text-safety-amber animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-lg text-safety-amber">Scanning Samples...</h4>
                    <p className="text-xs font-mono text-slate-400 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 h-14 flex items-center justify-center">
                      {scanStep}
                    </p>
                  </div>
                </div>
              ) : image ? (
                // Uploaded / Selected image with green overlay lasers
                <div className="relative rounded-xl overflow-hidden border-2 border-slate-800 max-h-[240px] w-full max-w-[360px] mx-auto group">
                  <img src={image} alt="Site scanning capture" className="w-full h-full object-cover aspect-video" />
                  {/* Laser Scan line */}
                  <div className="absolute inset-0 bg-gsa-green/10 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gsa-green animate-scan-line shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 p-1.5 bg-slate-950/70 hover:bg-slate-950 text-white rounded-full text-xs transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                // Empty Image Uploader Area
                <div className="text-center space-y-4 max-w-sm">
                  <div className={`w-16 h-16 mx-auto rounded-full border flex items-center justify-center ${outdoorMode ? "bg-slate-50 border-slate-200" : "bg-slate-800 border-slate-700"}`}>
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-bold ${outdoorMode ? "text-slate-900" : "text-slate-200"}`}>Upload Site Material Photo (Optional)</p>
                    <p className={`text-xs ${outdoorMode ? "text-slate-500" : "text-slate-400"}`}>
                      Snap blocks, concrete mixers, or rebars on your phone. Gemini AI analyzes aggregates visually.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`px-4 py-2 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${outdoorMode ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700" : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"}`}
                    >
                      <Upload className="w-3.5 h-3.5" /> File Upload
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* TRIGGER BUTTON */}
            <div className="z-10 border-t border-slate-800 pt-4 mt-2">
              <button
                type="button"
                disabled={isScanning}
                onClick={handleStartScan}
                className={`w-full py-3 px-4 ${isScanning ? "bg-slate-800 text-slate-500 dark:text-slate-400" : "bg-safety-amber text-brand-blue-950 dark:text-white hover:bg-safety-amber-dark"} font-display font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base cursor-pointer transform active:scale-[0.99]`}
              >
                <Scan className="w-5 h-5" /> Run GSA Compliance Scan
              </button>
            </div>
          </div>

          {/* DYNAMIC RESULTS ANCHOR */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gsa-red-light dark:bg-slate-800 border-l-4 border-gsa-red rounded-xl p-4 text-gsa-red"
              >
                <div className="flex gap-2">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <h5 className="font-bold">Compliance Scanning Failed</h5>
                    <p className="text-xs mt-0.5 font-medium">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className={`result-container ${
                  result.status === "COMPLIANT" ? "result-go" : 
                  (result.status === "NON_COMPLIANT" || result.status === "CRITICAL") ? "result-stop" : "result-caution"
                }`}
              >
                {/* Visual Status Header */}
                <div className="result-header">
                  <div className="flex items-center gap-2">
                    {getStatusBadgeIcon(result.status)}
                    <span className="font-display font-black text-lg tracking-wider">GSA {result.status}</span>
                  </div>
                  <div className="text-right ml-auto">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider opacity-90 text-slate-500">COMPLIANCE SCORE</span>
                    <div className="text-2xl font-black font-mono leading-none text-brand-blue-900">{result.complianceScore}%</div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Two Column details: GSA Reference & Strength Estimate */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">GSA Standard Code</span>
                      <span className="font-display font-bold text-brand-blue-900 dark:text-slate-100 text-sm">{result.gsaStandard}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Compressive Strength Est.</span>
                      <span className="font-display font-bold text-brand-blue-900 dark:text-slate-100 text-sm">{result.compressiveStrengthEst}</span>
                    </div>
                  </div>

                  {/* Structural Risk Warning */}
                  <div className="space-y-1">
                    <h5 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-safety-amber" /> Potential Structural Failures
                    </h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold bg-gsa-red-light dark:bg-slate-800/20 p-3 rounded-lg border border-gsa-red/10">
                      {result.structuralRisk}
                    </p>
                  </div>

                  {/* Analytical Findings */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Layers className="w-4 h-4 text-brand-blue-800 dark:text-slate-200" /> Site Inspector Findings
                    </h5>
                    <ul className="space-y-1.5 pl-1">
                      {result.findings.map((item, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-blue-700 rounded-full mt-1.5 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Corrective Recommendations */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-gsa-green" /> Recommended Action Steps
                    </h5>
                    <ul className="space-y-1.5 pl-1">
                      {result.recommendations.map((item, i) => (
                        <li key={i} className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-start gap-2 bg-gsa-green-light dark:bg-slate-800/20 p-2 rounded border border-gsa-green/10">
                          <CheckCircle2 className="w-4 h-4 text-gsa-green mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ghana Local Tip Box */}
                  <div className="bg-brand-blue-100 dark:bg-slate-800/60 p-4 rounded-xl border border-brand-blue-800/10 space-y-1">
                    <span className="text-[10px] font-mono font-extrabold text-brand-blue-800 dark:text-slate-200 uppercase tracking-wider block">
                      Local Ghana Inspector Advice
                    </span>
                    <p className="text-xs text-brand-blue-950 dark:text-white font-medium leading-relaxed italic">
                      {result.localTips}
                    </p>
                  </div>

                  {/* ACTION CONTROLS */}
                  <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => onSaveScan(materialType, result)}
                      className="flex-1 py-3 px-4 bg-brand-blue-800 hover:bg-brand-blue-700 text-white text-xs font-bold font-display rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4" /> Save Scan to Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={resetScanner}
                      className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" /> Clear
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
      </div>
    </div>
  );
}
