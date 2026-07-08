import React from "react";
import { HardHat } from "lucide-react";

export default function Footer({ outdoorMode }: { outdoorMode?: boolean }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#111a10] text-forest-100 py-12 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 cursor-pointer mb-3"
            >
              <div className="text-amber">
                <HardHat className="w-8 h-8" />
              </div>
              <div className="font-display text-2xl tracking-tight">
                <span className="text-amber">Grade</span>
                <span className="text-white">Guard</span>
              </div>
            </div>
            <p className="text-sm text-forest-400">
              Build with Certainty &middot; Ashesi University &middot; FDE II 2026
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-7 flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <button onClick={() => scrollTo("vendors")} className="text-sm font-medium hover:text-amber transition-colors">Find Suppliers</button>
            <button onClick={() => scrollTo("scanner")} className="text-sm font-medium hover:text-amber transition-colors">Grade Scanner</button>
            <button onClick={() => scrollTo("guide")} className="text-sm font-medium hover:text-amber transition-colors">Grade Guide</button>
            <button onClick={() => scrollTo("feedback")} className="text-sm font-medium hover:text-amber transition-colors">Feedback</button>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-forest-900/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-forest-500">
          <p>&copy; 2026 GradeGuard. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
