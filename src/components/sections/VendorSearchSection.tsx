import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { VERIFIED_VENDORS } from "../../data";
import { Search, MapPin, Store, Star, Phone } from "lucide-react";

const REGIONS = [
  "All Regions", "Greater Accra Region", "Ashanti Region", "Central Region", 
  "Eastern Region", "Western Region", "Volta Region", "Bono Region", 
  "Bono East", "Northern Region", "Upper East Region", "Upper West Region", 
  "Ahafo Region", "Western North Region", "Oti Region", "Savannah Region", "North East Region"
];

// Generate 721 mock vendors by duplicating the real ones
const ALL_VENDORS = Array.from({ length: 721 }).map((_, i) => {
  const base = VERIFIED_VENDORS[i % VERIFIED_VENDORS.length];
  return {
    ...base,
    id: `${base.id}-${i}`,
    name: i >= VERIFIED_VENDORS.length ? `${base.name} (Branch ${i})` : base.name,
    status: i % 3 === 0 ? "Closed" : "Open Now", // Mock status
  };
});

export default function VendorSearchSection({ isTeaser = false }: { isTeaser?: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [statusFilter, setStatusFilter] = useState("Any Status");
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredVendors = useMemo(() => {
    return ALL_VENDORS.filter(vendor => {
      const matchSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRegion = regionFilter === "All Regions" || vendor.region.includes(regionFilter.replace(" Region", ""));
      const matchStatus = statusFilter === "Any Status" || vendor.status === statusFilter;
      return matchSearch && matchRegion && matchStatus;
    });
  }, [searchTerm, regionFilter, statusFilter]);

  const displayedVendors = filteredVendors.slice(0, isTeaser ? 3 : visibleCount);

  const handleQuickFilter = (type: string, value: string) => {
    if (type === "status") {
      setStatusFilter(value);
      setRegionFilter("All Regions");
      setSearchTerm("");
    } else if (type === "region") {
      setRegionFilter(value);
      setStatusFilter("Any Status");
      setSearchTerm("");
    } else if (type === "category") {
      setSearchTerm(value);
      setRegionFilter("All Regions");
      setStatusFilter("Any Status");
    } else if (type === "all") {
      setSearchTerm("");
      setRegionFilter("All Regions");
      setStatusFilter("Any Status");
    }
    setVisibleCount(24);
  };

  const getCategoryEmoji = (cat: string) => {
    if (cat.includes("cement")) return "🏭";
    if (cat.includes("block")) return "🧱";
    if (cat.includes("rebar") || cat.includes("steel")) return "🔩";
    if (cat.includes("aggregate")) return "🪨";
    return "🏪";
  };

  const scrollToFeedback = (supplierName: string) => {
    // In a real app we would pre-fill via state management.
    // For this prototype, we'll just scroll.
    const el = document.getElementById("feedback");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="vendors" className="py-16 md:py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-forest-950 mb-4">
            Verified Vendor Marketplace
          </h2>
          <p className="text-forest-700 text-lg max-w-2xl mx-auto">
            Search our database of GSA-licensed manufacturing factories, block yards, and steel mills across Ghana.
          </p>
        </div>

        {!isTeaser && (
          <>
            {/* Search Controls */}
            <div className="bg-white p-4 rounded-xl shadow-lg border border-forest-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-700" />
              <input 
                type="text" 
                placeholder="Search by name, city, or description..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(24); }}
                className="w-full pl-10 pr-4 py-3 bg-off-white border border-forest-100 rounded-lg outline-none focus:border-amber transition-colors"
              />
            </div>
            <div className="md:col-span-3">
              <select 
                value={regionFilter}
                onChange={(e) => { setRegionFilter(e.target.value); setVisibleCount(24); }}
                className="w-full px-4 py-3 bg-off-white border border-forest-100 rounded-lg outline-none focus:border-amber transition-colors appearance-none"
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="md:col-span-3">
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setVisibleCount(24); }}
                className="w-full px-4 py-3 bg-off-white border border-forest-100 rounded-lg outline-none focus:border-amber transition-colors appearance-none"
              >
                <option value="Any Status">Any Status</option>
                <option value="Open Now">Open Now</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button onClick={() => handleQuickFilter("all", "")} className="px-4 py-1.5 rounded-full text-sm font-medium border border-forest-200 hover:bg-forest-900 hover:text-white transition-colors bg-white text-forest-950">
            All
          </button>
          <button onClick={() => handleQuickFilter("status", "Open Now")} className="px-4 py-1.5 rounded-full text-sm font-medium border border-forest-200 hover:bg-forest-900 hover:text-white transition-colors bg-white text-forest-950">
            Open Now
          </button>
          <button onClick={() => handleQuickFilter("region", "Greater Accra Region")} className="px-4 py-1.5 rounded-full text-sm font-medium border border-forest-200 hover:bg-forest-900 hover:text-white transition-colors bg-white text-forest-950">
            Greater Accra
          </button>
          <button onClick={() => handleQuickFilter("region", "Ashanti Region")} className="px-4 py-1.5 rounded-full text-sm font-medium border border-forest-200 hover:bg-forest-900 hover:text-white transition-colors bg-white text-forest-950">
            Ashanti
          </button>
          <button onClick={() => handleQuickFilter("category", "cement")} className="px-4 py-1.5 rounded-full text-sm font-medium border border-forest-200 hover:bg-forest-900 hover:text-white transition-colors bg-white text-forest-950">
            Cement
          </button>
          <button onClick={() => handleQuickFilter("category", "steel")} className="px-4 py-1.5 rounded-full text-sm font-medium border border-forest-200 hover:bg-forest-900 hover:text-white transition-colors bg-white text-forest-950">
            Steel / Iron Rods
          </button>
        </div>

        {/* Results Count */}
        <div className="text-sm text-forest-700 font-medium mb-6">
          Showing {displayedVendors.length} of {filteredVendors.length} suppliers {regionFilter !== "All Regions" ? `in ${regionFilter}` : ""}
        </div>
        </>
        )}

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-md border border-forest-100 overflow-hidden flex flex-col">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCategoryEmoji(vendor.category)}</span>
                    <h3 className="font-bold text-lg text-forest-950 leading-tight">{vendor.name}</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-sm text-forest-700 mb-3">
                  <MapPin className="w-4 h-4 text-amber shrink-0" />
                  <span className="truncate">{vendor.location}</span>
                </div>

                <div className="mb-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                    vendor.status === "Open Now" ? "bg-gsa-green-light text-gsa-green-dark" : "bg-gray-100 text-gray-600"
                  }`}>
                    {vendor.status}
                  </span>
                </div>

                <p className="text-sm text-forest-800 line-clamp-2 mb-4">
                  Supplier of certified construction materials including {vendor.certifiedProducts?.join(", ") || vendor.category}.
                </p>

                <div className="flex items-center gap-1 text-sm font-bold text-forest-950">
                  <Star className="w-4 h-4 fill-amber text-amber" />
                  <Star className="w-4 h-4 fill-amber text-amber" />
                  <Star className="w-4 h-4 fill-amber text-amber" />
                  <Star className="w-4 h-4 fill-amber text-amber" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="ml-1 text-forest-700 font-medium">(3 reviews)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 border-t border-forest-100 bg-forest-50/50">
                <a href={`tel:${vendor.phone}`} className="flex flex-col items-center justify-center py-3 border-r border-forest-100 hover:bg-forest-100 transition-colors text-forest-900 group">
                  <Phone className="w-4 h-4 mb-1 group-hover:text-gsa-green" />
                  <span className="text-xs font-semibold">Call</span>
                </a>
                <button className="flex flex-col items-center justify-center py-3 border-r border-forest-100 hover:bg-forest-100 transition-colors text-forest-900 group">
                  <Store className="w-4 h-4 mb-1 group-hover:text-amber" />
                  <span className="text-xs font-semibold">View Profile &nearr;</span>
                </button>
                <button onClick={() => scrollToFeedback(vendor.name)} className="flex flex-col items-center justify-center py-3 hover:bg-forest-100 transition-colors text-forest-900 group">
                  <Star className="w-4 h-4 mb-1 group-hover:text-amber" />
                  <span className="text-xs font-semibold">★ Review</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More or View All */}
        {isTeaser ? (
          <div className="text-center">
            <Link 
              to="/vendors"
              className="inline-block bg-white border-2 border-forest-950 text-forest-950 hover:bg-forest-950 hover:text-white px-8 py-3 rounded-md font-bold transition-colors"
            >
              View All {filteredVendors.length} Suppliers &rarr;
            </Link>
          </div>
        ) : filteredVendors.length > visibleCount && (
          <div className="text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 24)}
              className="bg-white border-2 border-forest-950 text-forest-950 hover:bg-forest-950 hover:text-white px-8 py-3 rounded-md font-bold transition-colors"
            >
              Load more suppliers
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
