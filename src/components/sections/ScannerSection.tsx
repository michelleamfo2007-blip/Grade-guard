import React, { useState, useEffect } from "react";
import { Scan, AlertTriangle, CheckCircle, Clock, Trash2, Camera } from "lucide-react";
import { useScanHistory } from "../../hooks/useScanHistory";
import { Html5QrcodeScanner } from "html5-qrcode";

type MaterialId = "cem32" | "cem42" | "cem52" | "y10" | "y16" | "blk6" | "blk9";
type UseId = "foundation" | "column" | "slab" | "loadwall" | "partition" | "plaster" | "mortar";

const MATERIALS = [
  { id: "cem32", label: "Cement 32.5R", type: "Portland Cement" },
  { id: "cem42", label: "Cement 42.5N", type: "Portland Cement" },
  { id: "cem52", label: "Cement 52.5R", type: "Portland Cement" },
  { id: "y10", label: "Iron Rod Y10", type: "High Yield Steel" },
  { id: "y16", label: "Iron Rod Y16+", type: "High Yield Steel" },
  { id: "blk6", label: "Block 6-inch Hollow", type: "Sandcrete" },
  { id: "blk9", label: "Block 9-inch Solid", type: "Sandcrete" }
];

const USES = [
  { id: "foundation", label: "Foundation pillar / pad" },
  { id: "column", label: "Structural column" },
  { id: "slab", label: "Floor or roof slab" },
  { id: "loadwall", label: "Loadbearing external wall" },
  { id: "partition", label: "Internal partition / fencing" },
  { id: "plaster", label: "Plastering / rendering" },
  { id: "mortar", label: "Block laying / mortar" }
];

// Returns: { pass: boolean, approved: string, prohibited: string, msg: string }
function evaluateCompliance(material: MaterialId, use: UseId) {
  let pass = false;
  let msg = "";
  let approved = "";
  let prohibited = "";

  switch (material) {
    case "cem32":
      approved = "Block laying, plastering, floor screed";
      prohibited = "Foundation pillars, columns, lintels, slabs";
      pass = ["plaster", "mortar"].includes(use);
      msg = pass ? "Grade 32.5R is ideal for general masonry and rendering." : "Grade 32.5R is not rated for structural loading. Minimum required: Grade 42.5N.";
      break;
    case "cem42":
      approved = "Foundations, columns, lintels, suspended slabs";
      prohibited = "Thin plastering (can cause cracking)";
      pass = ["foundation", "column", "slab", "loadwall"].includes(use);
      msg = pass ? "Grade 42.5N is approved for structural load-bearing applications." : "Grade 42.5N may be over-specified or prone to shrinkage cracking for this application.";
      break;
    case "cem52":
      approved = "High-strength precast, heavy structural elements";
      prohibited = "General masonry without engineer approval";
      pass = ["foundation", "column", "slab"].includes(use);
      msg = pass ? "Grade 52.5R is approved for high-strength applications." : "Grade 52.5R is strongly over-specified for general masonry.";
      break;
    case "y10":
      approved = "Floor slabs, ring beams, light columns";
      prohibited = "Heavy foundations (check engineer specs)";
      pass = ["slab", "column", "loadwall"].includes(use); // Allowing column lightly
      if (use === "foundation") { pass = false; msg = "Y10 is too thin for primary foundation pads. Use Y16 or higher."; }
      else { msg = pass ? "Y10 is appropriate for light structural reinforcement." : "Not typically used for this application."; }
      break;
    case "y16":
      approved = "Primary columns, deep foundations, heavy beams";
      prohibited = "Light slabs (over-specified)";
      pass = ["foundation", "column"].includes(use);
      msg = pass ? "Y16 is approved for heavy structural loads." : "Y16 is likely over-specified and heavy for this application.";
      break;
    case "blk6":
      approved = "Internal partitions, fencing";
      prohibited = "Loadbearing external walls";
      pass = ["partition"].includes(use);
      msg = pass ? "6-inch hollow blocks are perfect for partitioning." : "6-inch hollow blocks lack the compressive strength for load-bearing walls.";
      break;
    case "blk9":
      approved = "Loadbearing external walls, ground floor walls";
      prohibited = "Rooftop columns without engineer approval";
      pass = ["loadwall", "foundation"].includes(use);
      msg = pass ? "9-inch solid blocks are approved for load-bearing masonry." : "Check structural plans before using 9-inch blocks here due to self-weight.";
      break;
  }

  return { pass, approved, prohibited, msg };
}

export default function ScannerSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialId | "">("");
  const [selectedUse, setSelectedUse] = useState<UseId | "">("");
  const [result, setResult] = useState<ReturnType<typeof evaluateCompliance> | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showToast, setShowToast] = useState("");
  const { history, addLog, clearHistory } = useScanHistory();

  useEffect(() => {
    if (!isScanning) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        // Stop scanning after a successful read
        const matchedMat = MATERIALS.find(m => m.id === decodedText || m.label.toLowerCase() === decodedText.toLowerCase());
        if (matchedMat) {
          setSelectedMaterial(matchedMat.id as MaterialId);
          setResult(null);
          setIsScanning(false);
          triggerToast(`Scanned: ${matchedMat.label}`);
          scanner.clear().catch(console.error);
        } else {
          triggerToast(`Unknown material: ${decodedText.substring(0, 20)}`);
        }
      },
      (error) => {
        // Ignore read errors
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [isScanning]);

  const handleCheck = () => {
    if (!selectedMaterial) {
      triggerToast("Please select a material first");
      return;
    }
    if (!selectedUse) {
      triggerToast("Please select intended use");
      return;
    }
    const res = evaluateCompliance(selectedMaterial as MaterialId, selectedUse as UseId);
    setResult(res);

    const matObj = MATERIALS.find(m => m.id === selectedMaterial);
    const useObj = USES.find(u => u.id === selectedUse);

    addLog({
      materialLabel: matObj?.label || selectedMaterial,
      useLabel: useObj?.label || selectedUse,
      pass: res.pass,
      message: res.msg
    });
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(""), 3000);
  };

  const selectedMatObj = MATERIALS.find(m => m.id === selectedMaterial);

  return (
    <section id="scanner" className="bg-forest-950 py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">Grade Compliance Scanner</h2>
          <p className="text-forest-100 text-lg max-w-2xl mx-auto">
            Select a material grade and its intended use on your site. We'll instantly tell you if it's safe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          
          {/* LEFT: Phone Mockup */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="w-[320px] h-[650px] bg-white rounded-[3rem] border-8 border-forest-900 shadow-2xl overflow-hidden relative flex flex-col">
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-7 bg-forest-900 rounded-b-3xl w-40 mx-auto z-20"></div>
              
              <div className="bg-forest-950 text-white p-6 pt-10 text-center border-b border-forest-800">
                <Scan className="w-8 h-8 text-amber mx-auto mb-2" />
                <h3 className="font-bold text-lg">Scanner Result</h3>
              </div>

              <div className="flex-grow bg-off-white p-5 overflow-y-auto">
                {isScanning ? (
                  <div className="h-full flex flex-col justify-center">
                    <div className="relative w-full bg-black rounded-lg overflow-hidden border border-forest-200 shadow-inner">
                      <div id="reader" className="w-full"></div>
                      {/* Animated Scanning Line */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.8)] animate-scan-line pointer-events-none z-10"></div>
                    </div>
                    <button 
                      onClick={() => setIsScanning(false)}
                      className="mt-4 w-full py-2 bg-gsa-red/10 text-gsa-red font-medium rounded-lg hover:bg-gsa-red/20 transition-colors"
                    >
                      Cancel Scan
                    </button>
                  </div>
                ) : !result ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-forest-700 opacity-60">
                    <Scan className="w-16 h-16 mb-4 animate-pulse" />
                    <p>Awaiting input...</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Verdict Banner */}
                    <div className={`p-4 rounded-xl mb-6 text-white font-bold flex items-center gap-3 ${result.pass ? 'bg-gsa-green' : 'bg-gsa-red'}`}>
                      {result.pass ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                      <span>{result.pass ? '✓ COMPLIANT - Grade Approved' : '✕ GRADE MISMATCH - Do Not Proceed'}</span>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-forest-100 mb-6">
                      <div className="text-xs text-forest-700 uppercase font-bold tracking-wider mb-1">{selectedMatObj?.type}</div>
                      <div className="text-xl font-display text-forest-950 mb-4">{selectedMatObj?.label}</div>
                      
                      <div className="space-y-4 text-sm">
                        <div>
                          <strong className="text-gsa-green flex items-center gap-1 mb-1"><CheckCircle className="w-4 h-4"/> Use For:</strong>
                          <p className="text-forest-800">{result.approved}</p>
                        </div>
                        <div>
                          <strong className="text-gsa-red flex items-center gap-1 mb-1"><AlertTriangle className="w-4 h-4"/> Do Not Use For:</strong>
                          <p className="text-forest-800">{result.prohibited}</p>
                        </div>
                      </div>
                    </div>

                    {/* Mismatch Warning */}
                    {!result.pass && (
                      <div className="bg-gsa-red-light border-l-4 border-gsa-red p-4 rounded-r-xl">
                        <strong className="text-gsa-red-dark block mb-1">GRADE MISMATCH DETECTED</strong>
                        <p className="text-gsa-red-dark text-sm">{result.msg}</p>
                      </div>
                    )}
                    {result.pass && (
                      <div className="bg-gsa-green-light border-l-4 border-gsa-green p-4 rounded-r-xl">
                        <strong className="text-gsa-green-dark block mb-1">SAFE TO PROCEED</strong>
                        <p className="text-gsa-green-dark text-sm">{result.msg}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Controls & History */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="font-display text-2xl text-forest-950 mb-6">Try a compliance check</h3>
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-bold text-forest-900 uppercase tracking-wider">1. Select Material Grade</label>
                  <button
                    onClick={() => setIsScanning(true)}
                    className="text-sm font-bold text-forest-700 hover:text-amber flex items-center gap-1 transition-colors"
                    title="Scan QR/Barcode"
                  >
                    <Camera className="w-4 h-4" /> Scan Code
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setSelectedMaterial(m.id as MaterialId); setResult(null); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border-2 ${
                        selectedMaterial === m.id 
                          ? "bg-amber border-amber text-forest-950" 
                          : "bg-off-white border-forest-100 text-forest-700 hover:border-amber/50 hover:bg-amber/10"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-forest-900 mb-3 uppercase tracking-wider">2. Select Intended Use</label>
                <select
                  value={selectedUse}
                  onChange={(e) => { setSelectedUse(e.target.value as UseId); setResult(null); }}
                  className="w-full bg-off-white border-2 border-forest-100 rounded-xl px-4 py-3 outline-none focus:border-amber transition-colors text-forest-950"
                >
                  <option value="" disabled>-- Select structural application --</option>
                  {USES.map(u => (
                    <option key={u.id} value={u.id}>{u.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCheck}
                className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Scan className="w-5 h-5 text-amber" />
                Check Compliance &rarr;
              </button>
            </div>

            {/* History Section */}
            {history.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl text-forest-950 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber" /> Recent Scans
                  </h3>
                  <button onClick={clearHistory} className="text-sm text-forest-700 hover:text-gsa-red flex items-center gap-1 transition-colors">
                    <Trash2 className="w-4 h-4" /> Clear
                  </button>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {history.map(log => (
                    <div key={log.id} className="p-3 border border-forest-100 rounded-lg flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {log.pass ? <CheckCircle className="w-4 h-4 text-gsa-green" /> : <AlertTriangle className="w-4 h-4 text-gsa-red" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-forest-950 leading-tight">{log.materialLabel}</div>
                        <div className="text-xs text-forest-700 mt-0.5">For: {log.useLabel}</div>
                        <div className="text-[10px] text-forest-500 mt-1 uppercase tracking-wider">{new Date(log.timestamp).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'})}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-forest-950 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border-l-4 border-amber">
            <AlertTriangle className="w-5 h-5 text-amber" />
            <span className="font-medium">{showToast}</span>
          </div>
        </div>
      )}
    </section>
  );
}
