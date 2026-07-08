import React, { useState } from "react";
import { 
  ClipboardCheck, 
  Award, 
  Trash2, 
  History, 
  Activity, 
  Clock, 
  FileCheck2, 
  ShieldAlert, 
  CheckSquare, 
  Square,
  HelpCircle,
  Printer
} from "lucide-react";
import { ScanResult, ConsultationBooking } from "../types";

interface SavedScan {
  id: string;
  material: string;
  date: string;
  result: ScanResult;
}

interface DashboardViewProps {
  savedScans: SavedScan[];
  onDeleteScan: (id: string) => void;
  bookings: ConsultationBooking[];
  outdoorMode: boolean;
}

export default function DashboardView({ savedScans, onDeleteScan, bookings, outdoorMode }: DashboardViewProps) {
  // GSA Checklist items for the builder to click off
  const [checklist, setChecklist] = useState([
    { id: "ch-1", text: "Checked if cement is stored on raised wooden planks (not bare damp soil)", checked: true },
    { id: "ch-2", text: "Verified Sandcrete hollow blocks cured with water twice daily for 14 days", checked: false },
    { id: "ch-3", text: "Ran silt jar test on the river sand (confirmed silt content is below 6%)", checked: true },
    { id: "ch-4", text: "Secured Grade 42.5N cement bags specifically for structural column/pillar pours", checked: false },
    { id: "ch-5", text: "Confirmed reinforcement rebar spacing does not exceed 200mm for suspended slabs", checked: true },
    { id: "ch-6", text: "Placed concrete spacers to guarantee 30-40mm rebar steel cover depth", checked: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Calculate overall site compliance score based on saved scans & checklist
  const getOverallCompliance = () => {
    let totalScore = 0;
    let counts = 0;

    savedScans.forEach(s => {
      totalScore += s.result.complianceScore;
      counts++;
    });

    // Add checklist scores (each checked item counts as 100, unchecked as 0)
    checklist.forEach(item => {
      totalScore += item.checked ? 100 : 0;
      counts++;
    });

    if (counts === 0) return { score: 75, status: "WARN" }; // default healthy benchmark

    const finalScore = Math.round(totalScore / counts);
    let status = "WARN";
    if (finalScore >= 85) status = "COMPLIANT";
    else if (finalScore < 50) status = "NON_COMPLIANT";

    return { score: finalScore, status };
  };

  const compliance = getOverallCompliance();

  const getStatusBg = (status: string) => {
    if (status === "COMPLIANT") return "bg-gsa-green text-white";
    if (status === "NON_COMPLIANT") return "bg-gsa-red text-white";
    return "bg-safety-amber text-brand-blue-950 dark:text-white";
  };

  const exportPDF = (scan: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const html = `
      <html>
        <head>
          <title>GSA Scan Report - ${scan.id}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #111; }
            .header { border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: 800; margin: 0; }
            .subtitle { font-size: 14px; color: #555; margin-top: 5px; }
            .grid { display: flex; gap: 40px; margin-bottom: 30px; }
            .card { border: 1px solid #ccc; padding: 15px; border-radius: 8px; flex: 1; }
            .status { font-weight: 900; font-size: 18px; text-transform: uppercase; }
            .COMPLIANT { color: #10b981; }
            .NON_COMPLIANT { color: #ef4444; }
            .WARN { color: #f59e0b; }
            ul { line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">GRADE GUARD - GSA Site Quality Report</h1>
            <div class="subtitle">Generated on ${new Date().toLocaleDateString()} | Scan ID: ${scan.id}</div>
          </div>
          
          <div class="grid">
            <div class="card">
              <h3>Scan Details</h3>
              <p><strong>Material:</strong> ${scan.material}</p>
              <p><strong>Date Scanned:</strong> ${scan.date}</p>
              <p><strong>GSA Standard:</strong> ${scan.result.gsaStandard}</p>
              <p><strong>Strength Est:</strong> ${scan.result.compressiveStrengthEst}</p>
            </div>
            <div class="card">
              <h3>Compliance Status</h3>
              <p class="status ${scan.result.status}">${scan.result.status}</p>
            </div>
          </div>

          <h3>Detailed Findings</h3>
          <ul>
            ${scan.result.findings.map((f: string) => `<li>${f}</li>`).join('')}
          </ul>
          
          <div style="margin-top: 50px; font-size: 12px; color: #777; text-align: center;">
            <p>This document was generated automatically by the Grade Guard Ghana platform.</p>
            <p>Official structural verification requires a registered GhIE engineer's signature.</p>
          </div>
          <script>
            window.onload = () => { window.print(); window.setTimeout(() => window.close(), 500); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="w-full">
      {/* HERO HEADER */}
      <section className={`relative w-full overflow-hidden shadow-xl border-b ${outdoorMode ? "border-slate-800" : "border-brand-blue-800"} text-white flex items-center py-16`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/media__1783511114367.png" alt="Compliance Dashboard" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-900/90 to-black/40"></div>
        </div>
        
        {/* On-Site Contrast Top Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-safety-amber"></div>

        {/* Hero Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-safety-amber/20 border border-safety-amber text-safety-amber font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            <ClipboardCheck className="w-4 h-4" /> Active Scans
          </div>

          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
            Compliance Dashboard
          </h1>

          <p className="text-base text-slate-100 font-medium">
            Monitor your active project compliance scorecards, audit histories, and construction checkpoints.
          </p>
          </div>
        </div>
      </section>

      {/* INNER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* TOP COMPLIANCE SCORECARD */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SCORE GAUGE */}
        <div className="card flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Project Site Scorecard</span>
            <h3 className="font-display font-bold text-lg text-brand-blue-900 dark:text-slate-100 leading-tight">East Legon Site A</h3>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-8 border-slate-100 dark:border-slate-800 shadow-inner">
              {/* Score circle */}
              <div className="text-2xl font-black font-mono text-brand-blue-900 dark:text-slate-100">{compliance.score}%</div>
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke={compliance.status === "COMPLIANT" ? "#10b981" : compliance.status === "NON_COMPLIANT" ? "#ef4444" : "#f59e0b"}
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * compliance.score) / 100}
                  className="transition-all duration-1000"
                />
              </svg>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Site Safety Status</span>
              <div className={`px-2.5 py-1 text-xs font-black font-mono rounded-lg border text-center ${getStatusBg(compliance.status)}`}>
                GSA {compliance.status}
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
            * Overall score merges results from your **{savedScans.length} active material scans** and GSA compliance checklists.
          </p>
        </div>

        {/* RECENT STATS */}
        <div className="card flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Audit Activities</span>
            <h3 className="font-display font-bold text-lg text-brand-blue-900 dark:text-slate-100">Compliance Metrics</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-2xl font-bold font-mono text-brand-blue-900 dark:text-slate-100">{savedScans.length}</span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block uppercase font-bold font-mono mt-0.5">Scans Completed</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-2xl font-bold font-mono text-brand-blue-900 dark:text-slate-100">{bookings.length}</span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block uppercase font-bold font-mono mt-0.5">Booked Audits</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Inspections prevent structural liabilities. Target a threshold score of <strong>85%</strong> before pouring structural concrete.
          </p>
        </div>

        {/* CHECKS CHECKLIST PROMPT */}
        <div className={`rounded-2xl border p-6 shadow-sm flex flex-col justify-between space-y-3 ${outdoorMode ? "bg-white border-slate-200 text-brand-blue-900" : "bg-brand-blue-900 border-brand-blue-800 text-white"}`}>
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">GSA Field Requirements</span>
            <h3 className={`font-display font-bold text-lg ${outdoorMode ? "text-brand-blue-900" : "text-white"}`}>Pre-pour Verification</h3>
          </div>
          
          <div className={`p-3.5 rounded-xl border space-y-1 ${outdoorMode ? "bg-slate-50 border-slate-200" : "bg-slate-950/50 border-slate-800"}`}>
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span>Task Checklists:</span>
              <span className="text-safety-amber">
                {checklist.filter(c => c.checked).length} / {checklist.length} Completed
              </span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              Complete remaining task items below to boost GSA compliance grades.
            </p>
          </div>

          <div className="text-[9px] text-slate-400 italic">
            * Checklists align with GS 1207:2018 Building Standards.
          </div>
        </div>
      </section>

      {/* COMPLIANCE CHECKLIST AND SCANS HISTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COMPLIANCE CHECKLIST (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-display font-bold text-xl text-brand-blue-900 dark:text-slate-100 flex items-center gap-2">
            <ClipboardCheck className="text-gsa-green w-5.5 h-5.5" /> GSA Site Safety Checklist
          </h3>

          <div className="card space-y-3">
            {checklist.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors bg-slate-50 dark:bg-slate-900/50 flex items-start gap-3 cursor-pointer"
              >
                {item.checked ? (
                  <FileCheck2 className="w-5.5 h-5.5 text-gsa-green shrink-0 mt-0.5" />
                ) : (
                  <div className="w-5.5 h-5.5 border-2 border-slate-300 rounded-md shrink-0 mt-0.5 bg-white dark:bg-slate-900"></div>
                )}
                <span className={`text-xs font-medium leading-relaxed ${item.checked ? "text-slate-500 dark:text-slate-400 line-through" : "text-slate-800 dark:text-slate-200"}`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SCAN HISTORY LEDGER (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-display font-bold text-xl text-brand-blue-900 dark:text-slate-100 flex items-center gap-2">
            <History className="text-brand-blue-800 dark:text-slate-200 w-5.5 h-5.5" /> Material Compliance Scans Ledger
          </h3>

          <div className="space-y-4">
            {savedScans.length === 0 ? (
              <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-slate-400">
                <ShieldAlert className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-bold">No saved material scans found.</p>
                <p className="text-xs text-slate-400 mt-1">Run GSA compliance scans and save them to track site scores.</p>
              </div>
            ) : (
              <div className="list-container">
                {savedScans.map(scan => (
                  <div 
                    key={scan.id} 
                    className="list-item flex-col items-stretch gap-2"
                  >
                    {/* Header bar */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-brand-blue-800 dark:text-slate-200 uppercase">
                            {scan.material} Scan
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">
                            ID: {scan.id}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Date Saved: {scan.date}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 text-[10px] font-black font-mono rounded border uppercase ${getStatusBg(scan.result.status)}`}>
                          {scan.result.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => exportPDF(scan)}
                          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-blue-600 rounded-lg transition-colors cursor-pointer"
                          title="Export PDF Report"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteScan(scan.id)}
                          className="p-1.5 hover:bg-gsa-red-light dark:hover:bg-slate-800 text-slate-400 hover:text-gsa-red rounded-lg transition-colors cursor-pointer"
                          title="Delete Scan Log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content highlights */}
                    <div className="p-4 space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded border border-slate-200 dark:border-slate-800">
                        <p><strong>GSA Standard:</strong> {scan.result.gsaStandard}</p>
                        <p className="text-right"><strong>Strength Est:</strong> {scan.result.compressiveStrengthEst}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">Findings:</p>
                        <ul className="space-y-1">
                          {scan.result.findings.slice(0, 2).map((find, i) => (
                            <li key={i} className="text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                              <span className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 shrink-0"></span>
                              <span>{find}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
