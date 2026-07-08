import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Store, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  FileCheck, 
  Sliders, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Compass,
  Filter,
  CheckCircle2,
  Star,
  MessageSquare,
  X
} from "lucide-react";
import { Vendor } from "../types";
import { VERIFIED_VENDORS } from "../data";

interface VendorsViewProps {
  outdoorMode: boolean;
}

export default function VendorsView({ outdoorMode }: VendorsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // GSA License Checker state
  const [checkCode, setCheckCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<{
    status: "verified" | "invalid" | "unverified";
    vendor?: Vendor;
  }>({ status: "unverified" });

  const [vendors, setVendors] = useState<Vendor[]>(VERIFIED_VENDORS);
  const [reviewModalVendor, setReviewModalVendor] = useState<Vendor | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", author: "" });

  const regions = ["all", "Greater Accra", "Ashanti", "Western", "Eastern"];
  const categories = ["all", "cement", "blocks", "rebars", "aggregates"];

  const filteredVendors = VERIFIED_VENDORS.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.gsaLicenseNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || v.region === selectedRegion;
    const matchesCategory = selectedCategory === "all" || v.category === selectedCategory;
    return matchesSearch && matchesRegion && matchesCategory;
  });

  const handleVerifyLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkCode.trim()) return;

    const code = checkCode.trim().toUpperCase();
    const found = vendors.find(v => 
      v.gsaLicenseNo.toUpperCase() === code || 
      v.gsaLicenseNo.toUpperCase().includes(code)
    );

    if (found) {
      setVerificationResult({ status: "verified", vendor: found });
    } else {
      setVerificationResult({ status: "invalid" });
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalVendor || !newReview.comment.trim() || !newReview.author.trim()) return;

    const reviewToAdd = {
      id: "r-" + Math.random().toString(36).substr(2, 9),
      author: newReview.author,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0]
    };

    setVendors(prev => prev.map(v => {
      if (v.id === reviewModalVendor.id) {
        const updatedReviews = [...(v.reviews || []), reviewToAdd];
        const newAvg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return { ...v, reviews: updatedReviews, rating: Number(newAvg.toFixed(1)) };
      }
      return v;
    }));

    // update modal vendor to show immediately
    setReviewModalVendor(prev => prev ? { 
      ...prev, 
      reviews: [...(prev.reviews || []), reviewToAdd],
      rating: Number(((prev.reviews || []).reduce((sum, r) => sum + r.rating, 0) + newReview.rating) / ((prev.reviews?.length || 0) + 1).toFixed(1))
    } : null);

    setNewReview({ rating: 5, comment: "", author: "" });
  };

  const getCategoryColor = (cat: Vendor["category"]) => {
    switch (cat) {
      case "cement": return "bg-brand-blue-100 dark:bg-slate-800 text-brand-blue-900 dark:text-slate-100 border-brand-blue-800/10";
      case "blocks": return "bg-safety-amber-light dark:bg-slate-800 text-safety-amber-dark dark:text-safety-amber border-safety-amber/20";
      case "rebars": return "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300";
      case "aggregates": return "bg-gsa-green-light dark:bg-slate-800 text-gsa-green-dark dark:text-gsa-green border-gsa-green/20";
      default: return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";
    }
  };

  return (
    <div className="w-full">
      {/* HERO HEADER */}
      <section className={`relative w-full overflow-hidden shadow-xl border-b ${outdoorMode ? "border-slate-800" : "border-brand-blue-800"} text-white flex items-center py-16`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/v_sentuo_1783512880044.png" alt="Verified Vendors" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-900/90 to-black/40"></div>
        </div>
        
        {/* On-Site Contrast Top Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-safety-amber"></div>

        {/* Hero Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-safety-amber/20 border border-safety-amber text-safety-amber font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            <Store className="w-4 h-4" /> Trusted Source Network
          </div>

          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
            Verified Vendor Marketplace
          </h1>

          <p className="text-base text-slate-100 font-medium">
            Purchase materials exclusively from GSA-licensed manufacturing factories, block yards, and steel mills in Ghana.
          </p>
          </div>
        </div>
      </section>

      {/* INNER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* GSA LICENSE CHECKER TOOL */}
      <section className={`rounded-2xl p-6 border-2 shadow-md ${outdoorMode ? "bg-white border-slate-200 text-slate-900" : "bg-slate-900 border-slate-800 text-white"}`}>
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="text-safety-amber w-5 h-5 animate-spin-slow" />
            <h3 className={`font-display font-bold text-lg ${outdoorMode ? "text-brand-blue-900" : "text-white"}`}>Instant GSA License Verifier</h3>
          </div>
          <p className={`text-xs leading-relaxed ${outdoorMode ? "text-slate-600" : "text-slate-300"}`}>
            Verify if a block yard or cement supplier holds a valid GSA certificate. Enter their license code below (e.g. <strong className="text-safety-amber font-mono">GSA-LIC-CEM-001</strong> or <strong className="text-safety-amber font-mono">GSA-LIC-BLK-109</strong>).
          </p>

          <form onSubmit={handleVerifyLicense} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter GSA-LIC-XXX-XXX..."
              value={checkCode}
              onChange={e => setCheckCode(e.target.value)}
              className={`flex-1 border-2 rounded-xl px-4 py-2.5 text-xs font-mono uppercase tracking-wider focus:border-safety-amber focus:outline-none ${outdoorMode ? "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white" : "bg-slate-950 border-slate-800 text-white"}`}
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-safety-amber hover:bg-safety-amber-dark text-brand-blue-950 dark:text-white font-bold font-display rounded-xl text-xs transition-colors cursor-pointer"
            >
              Query GSA Database
            </button>
          </form>

          {/* Verification Results Panel */}
          <AnimatePresence mode="wait">
            {verificationResult.status === "verified" && verificationResult.vendor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gsa-green-light dark:bg-slate-800 border-l-4 border-gsa-green text-slate-900 dark:text-slate-100 p-4 rounded-xl mt-4"
              >
                <div className="flex gap-2">
                  <CheckCircle className="text-gsa-green w-5 h-5 shrink-0" />
                  <div className="space-y-1.5">
                    <h5 className="font-bold text-gsa-green-dark dark:text-gsa-green text-sm uppercase font-mono flex items-center gap-1.5">
                      LICENSE ACTIVE & ACCREDITED
                    </h5>
                    <p className="text-xs font-bold font-display text-brand-blue-950 dark:text-white">
                      {verificationResult.vendor.name} ({verificationResult.vendor.location})
                    </p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                      <p><strong>GSA License No:</strong> <span className="font-mono">{verificationResult.vendor.gsaLicenseNo}</span></p>
                      <p><strong>Certified Scope:</strong> {verificationResult.vendor.certifiedProducts.join(", ")}</p>
                      <p><strong>Region:</strong> {verificationResult.vendor.region} State</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {verificationResult.status === "invalid" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gsa-red-light dark:bg-slate-800 border-l-4 border-gsa-red text-gsa-red-dark dark:text-gsa-red p-4 rounded-xl mt-4"
              >
                <div className="flex gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <div>
                    <h5 className="font-bold text-xs uppercase font-mono">UNREGISTERED OR EXPIRED LICENSE</h5>
                    <p className="text-xs mt-1">
                      No matching verified vendor found with that GSA code. Materials from this source may be substandard or un-certified! Proceed with caution.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FILTER SEARCH DIRECTORY */}
      <div className="search-container flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search verified vendors..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-4 pl-10 text-xs font-medium focus:border-brand-blue-800"
          />
          <Search className="search-icon w-4.5 h-4.5" />
        </div>

        <div className="filter-chips items-center w-full sm:w-auto">
          {/* Region selector */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 px-2.5 text-xs font-bold"
            >
              <option value="all">All Regions</option>
              {regions.filter(r => r !== "all").map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Category selector */}
          <div className="flex items-center gap-1">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 px-2.5 text-xs font-bold"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== "all").map(c => (
                <option key={c} value={c}>{c.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VENDOR MARKET GRID */}
      <div className="grid-container">
        {filteredVendors.map(vendor => (
          <div 
            key={vendor.id} 
            className={`vendor-card flex flex-col justify-between overflow-hidden ${outdoorMode ? "border-slate-800 text-slate-900 dark:text-slate-100" : "border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"}`}
          >
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex-1 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${getCategoryColor(vendor.category)}`}>
                  {vendor.category === "all" ? "full supplier" : vendor.category}
                </span>
                <span className="text-slate-400 text-xs font-mono font-semibold flex items-center gap-1 shrink-0">
                  Rating: ★ {vendor.rating}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-brand-blue-900 dark:text-slate-100 leading-tight">
                  {vendor.name}
                </h3>
                <div className="text-[10px] text-slate-400 font-semibold font-mono">
                  GSA License: <span className="text-brand-blue-800 dark:text-slate-200 font-bold">{vendor.gsaLicenseNo}</span>
                </div>
              </div>

              {vendor.image && (
                <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-inner mt-2 mb-1">
                  <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              )}

              {/* Physical Details */}
              <div className="space-y-2 pt-2 border-t border-slate-50">
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <MapPin className="w-4 h-4 text-brand-blue-800 dark:text-slate-200 shrink-0 mt-0.5" />
                  <span>{vendor.location}, {vendor.region} Region</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <Phone className="w-4 h-4 text-brand-blue-800 dark:text-slate-200 shrink-0" />
                  <span>{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <Mail className="w-4 h-4 text-brand-blue-800 dark:text-slate-200 shrink-0" />
                  <span>{vendor.email}</span>
                </div>
              </div>

              {/* Certified scope */}
              <div className="space-y-1 pt-2">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Approved Materials:</span>
                <p className="text-xs text-brand-blue-950 dark:text-white font-semibold bg-slate-50 dark:bg-slate-900/50 p-2 rounded border border-slate-200 dark:border-slate-800">
                  {vendor.certifiedProducts.join(", ")}
                </p>
              </div>

              {/* Reviews Button */}
              <button
                type="button"
                onClick={() => setReviewModalVendor(vendor)}
                className={`w-full py-2.5 rounded-lg border text-xs font-bold font-mono transition-colors flex items-center justify-center gap-2 mt-2 ${outdoorMode ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"}`}
              >
                <MessageSquare className="w-4 h-4" /> View / Add Reviews ({vendor.reviews?.length || 0})
              </button>
            </div>

            {/* Simulated Map coordinates directions locator footer */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">Lat: {vendor.coordinates.lat.toFixed(4)}, Lng: {vendor.coordinates.lng.toFixed(4)}</span>
              <a
                href={`https://maps.google.com/?q=${vendor.coordinates.lat},${vendor.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="text-brand-blue-800 dark:text-slate-200 hover:text-brand-blue-600 font-extrabold flex items-center gap-1 cursor-pointer"
              >
                Get Directions Route
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* REVIEWS MODAL */}
      <AnimatePresence>
        {reviewModalVendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-lg rounded-2xl border shadow-xl flex flex-col max-h-[90vh] overflow-hidden ${outdoorMode ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800"}`}
            >
              <div className={`p-4 border-b flex justify-between items-center ${outdoorMode ? "border-slate-200" : "border-slate-800"}`}>
                <div>
                  <h2 className={`font-display font-bold text-lg ${outdoorMode ? "text-slate-900" : "text-white"}`}>{reviewModalVendor.name}</h2>
                  <p className={`text-xs font-mono ${outdoorMode ? "text-slate-500" : "text-slate-400"}`}>GSA Code: {reviewModalVendor.gsaLicenseNo}</p>
                </div>
                <button
                  onClick={() => setReviewModalVendor(null)}
                  className={`p-2 rounded-full transition-colors ${outdoorMode ? "hover:bg-slate-100 text-slate-500" : "hover:bg-slate-800 text-slate-400"}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* List Reviews */}
                <div className="space-y-4">
                  <h3 className={`font-bold text-sm uppercase tracking-wider font-mono ${outdoorMode ? "text-slate-600" : "text-slate-300"}`}>User Reviews</h3>
                  {(!reviewModalVendor.reviews || reviewModalVendor.reviews.length === 0) ? (
                    <p className="text-sm text-slate-400 italic">No reviews yet for this vendor.</p>
                  ) : (
                    <div className="space-y-3">
                      {reviewModalVendor.reviews.map(rev => (
                        <div key={rev.id} className={`p-3 rounded-xl border ${outdoorMode ? "bg-slate-50 border-slate-200" : "bg-slate-800/50 border-slate-700"}`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`font-bold text-sm ${outdoorMode ? "text-brand-blue-900" : "text-white"}`}>{rev.author}</span>
                            <span className="flex items-center text-safety-amber text-xs font-mono font-bold">
                              {rev.rating} <Star className="w-3.5 h-3.5 ml-1 fill-current" />
                            </span>
                          </div>
                          <p className={`text-sm ${outdoorMode ? "text-slate-700" : "text-slate-300"}`}>{rev.comment}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-2">{rev.date}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleReviewSubmit} className={`p-4 rounded-xl border space-y-3 ${outdoorMode ? "bg-slate-50 border-slate-200" : "bg-slate-800/50 border-slate-700"}`}>
                  <h3 className={`font-bold text-sm uppercase tracking-wider font-mono ${outdoorMode ? "text-slate-600" : "text-slate-300"}`}>Leave a Review</h3>
                  
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${outdoorMode ? "text-slate-600" : "text-slate-400"}`}>Your Name / Company</label>
                    <input
                      type="text"
                      required
                      value={newReview.author}
                      onChange={e => setNewReview({ ...newReview, author: e.target.value })}
                      className={`w-full rounded-lg px-3 py-2 text-sm border focus:outline-none ${outdoorMode ? "bg-white border-slate-300 focus:border-brand-blue-600 text-slate-900" : "bg-slate-900 border-slate-700 focus:border-brand-blue-500 text-white"}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${outdoorMode ? "text-slate-600" : "text-slate-400"}`}>Rating (1-5)</label>
                    <input
                      type="number"
                      required
                      min="1" max="5"
                      value={newReview.rating}
                      onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className={`w-full rounded-lg px-3 py-2 text-sm border focus:outline-none ${outdoorMode ? "bg-white border-slate-300 focus:border-brand-blue-600 text-slate-900" : "bg-slate-900 border-slate-700 focus:border-brand-blue-500 text-white"}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${outdoorMode ? "text-slate-600" : "text-slate-400"}`}>Comment</label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.comment}
                      onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                      className={`w-full rounded-lg px-3 py-2 text-sm border focus:outline-none ${outdoorMode ? "bg-white border-slate-300 focus:border-brand-blue-600 text-slate-900" : "bg-slate-900 border-slate-700 focus:border-brand-blue-500 text-white"}`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-safety-amber hover:bg-safety-amber-dark text-brand-blue-950 font-bold rounded-lg transition-colors text-sm"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
