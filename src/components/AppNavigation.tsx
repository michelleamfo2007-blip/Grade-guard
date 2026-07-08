import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HardHat, Menu, X } from "lucide-react";

export default function AppNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/vendors", label: "Find Vendors" },
    { path: "/scanner", label: "Grade Scanner" },
    { path: "/guide", label: "Grade Guide" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-forest-950 shadow-lg py-3" : "bg-forest-950/90 backdrop-blur-sm py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="text-amber">
              <HardHat className="w-8 h-8" />
            </div>
            <div className="font-display text-2xl tracking-tight">
              <span className="text-amber">Grade</span>
              <span className="text-white">Guard</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors font-medium text-sm ${location.pathname === link.path ? 'text-amber' : 'text-white hover:text-amber'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/feedback"
              className="bg-amber hover:bg-amber-dark text-forest-950 px-5 py-2.5 rounded-md font-bold text-sm transition-colors"
            >
              Leave Feedback
            </Link>
          </nav>

          {/* Mobile Menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-amber transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-forest-950 border-t border-forest-800 p-4 shadow-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`transition-colors font-medium text-left py-2 border-b border-forest-800 ${location.pathname === link.path ? 'text-amber' : 'text-white hover:text-amber'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/feedback"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-amber hover:bg-amber-dark text-forest-950 px-5 py-3 rounded-md font-bold text-center transition-colors w-full mt-2 inline-block"
            >
              Leave Feedback
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
