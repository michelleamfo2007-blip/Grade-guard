import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, MessageSquare, ThumbsUp, Sparkles, CheckCircle2 } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  supplier: string;
  rating: number;
  experience: string;
  date: string;
  helpfulCount?: number;
}

const SEED_REVIEWS: Review[] = [
  { id: "sr1", name: "Kwame Asante", role: "Project Manager", supplier: "Diamond Cement factory", rating: 5, experience: "Excellent quality materials and very professional service. The Grade 42.5N cement was perfectly specified for our foundation work.", date: "2026-07-01", helpfulCount: 12 },
  { id: "sr2", name: "Ama Serwaa", role: "Building Inspector", supplier: "Construction Ghana", rating: 4, experience: "Wide variety of materials. Staff could be more knowledgeable on grade specifications — GradeGuard helped us verify on-site.", date: "2026-06-28", helpfulCount: 8 },
  { id: "sr3", name: "Kofi Boateng", role: "Site Supervisor", supplier: "Premier Steel Ltd.", rating: 5, experience: "Y16 rods met all structural specifications. Delivery was on time. Will use again for our next project.", date: "2026-06-15", helpfulCount: 5 },
  { id: "sr4", name: "Abena Mensah", role: "Contractor", supplier: "Atala Limited", rating: 3, experience: "Good supplier but I noticed 32.5R and 42.5N bags in the same section. Please label shelves more clearly.", date: "2026-05-10", helpfulCount: 20 }
];

export default function FeedbackSection({ isTeaser = false }: { isTeaser?: boolean }) {
  const [activeTab, setActiveTab] = useState<"write" | "read">(isTeaser ? "read" : "write");
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [hoveredStar, setHoveredStar] = useState(0);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "", role: "", supplier: "", rating: 0, experience: "", type: ""
  });
  
  const [showToast, setShowToast] = useState("");
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

  // AI Mock State
  const [aiLoading, setAiLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("gradeguard_reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews([...parsed, ...SEED_REVIEWS]);
      } catch (e) {}
    }

    if (activeTab === "read") {
      setAiLoading(true);
      setTimeout(() => setAiLoading(false), 2000);
    }
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.supplier || !formData.rating || !formData.experience) {
      triggerToast("Please fill in all required fields and select a rating.", "error");
      return;
    }

    const newReview: Review = {
      id: "r-" + Date.now(),
      name: formData.name,
      role: formData.role,
      supplier: formData.supplier,
      rating: formData.rating,
      experience: formData.experience,
      date: new Date().toISOString().split("T")[0],
      helpfulCount: 0
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    // Save only user reviews to local storage (filter out seeds if we wanted, but we'll just save user ones)
    const userReviews = updatedReviews.filter(r => !r.id.startsWith("sr"));
    localStorage.setItem("gradeguard_reviews", JSON.stringify(userReviews));

    setFormData({ name: "", role: "", supplier: "", rating: 0, experience: "", type: "" });
    triggerToast("Thank you — feedback submitted!", "success");
  };

  const triggerToast = (msg: string, type: "success" | "error") => {
    setShowToast(msg);
    setTimeout(() => setShowToast(""), 3000);
  };

  const markHelpful = (id: string) => {
    if (helpfulClicked.has(id)) return;
    const newSet = new Set(helpfulClicked).add(id);
    setHelpfulClicked(newSet);
    triggerToast("Marked as helpful!", "success");
  };

  return (
    <section id="feedback" className="py-16 md:py-24 bg-off-white relative">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl text-forest-950 mb-4">Customer Feedback</h2>
          <p className="text-forest-700 text-lg max-w-2xl mx-auto">
            Help build a transparent construction marketplace. Share your supplier experiences to protect others.
          </p>
        </div>

        {/* Tabs */}
        {!isTeaser && (
          <div className="flex bg-forest-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setActiveTab("write")}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeTab === "write" ? "bg-white text-forest-950 shadow-sm" : "text-forest-700 hover:text-forest-950"}`}
            >
              Write a Review
            </button>
            <button 
              onClick={() => setActiveTab("read")}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeTab === "read" ? "bg-white text-forest-950 shadow-sm" : "text-forest-700 hover:text-forest-950"}`}
            >
              Read Reviews ({reviews.length})
            </button>
          </div>
        )}

        {/* WRITE TAB */}
        {activeTab === "write" && (
          <div className="bg-white rounded-2xl shadow-xl border border-forest-100 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-forest-900 mb-2">Your Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-off-white border border-forest-200 rounded-lg focus:border-amber outline-none transition-colors" placeholder="e.g. Kwame Asante" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-forest-900 mb-2">Your Role *</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-off-white border border-forest-200 rounded-lg focus:border-amber outline-none transition-colors appearance-none">
                    <option value="" disabled>Select your role...</option>
                    <option value="Site Supervisor">Site Supervisor</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Building Inspector">Building Inspector</option>
                    <option value="Procurement Officer">Procurement Officer</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Building Owner">Building Owner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-forest-900 mb-2">Supplier Name *</label>
                <input type="text" value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} className="w-full px-4 py-3 bg-off-white border border-forest-200 rounded-lg focus:border-amber outline-none transition-colors" placeholder="Which supplier are you reviewing?" />
              </div>

              <div>
                <label className="block text-sm font-bold text-forest-900 mb-2">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setFormData({...formData, rating: star})}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${(hoveredStar || formData.rating) >= star ? "fill-amber text-amber" : "text-forest-200"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-forest-900 mb-2">Your Experience *</label>
                <textarea 
                  rows={4}
                  value={formData.experience} 
                  onChange={e => setFormData({...formData, experience: e.target.value})} 
                  className="w-full px-4 py-3 bg-off-white border border-forest-200 rounded-lg focus:border-amber outline-none transition-colors resize-none" 
                  placeholder="Describe material quality, service, and grade compliance..."
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors">
                <MessageSquare className="w-5 h-5 text-amber" />
                Submit Feedback
              </button>
            </form>
          </div>
        )}

        {/* READ TAB */}
        {activeTab === "read" && (
          <div className="space-y-6">
            
            {/* AI Insight Box */}
            <div className="bg-gradient-to-r from-forest-900 to-forest-950 rounded-2xl p-6 shadow-xl border border-forest-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Sparkles className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-2 mb-3 text-amber font-bold">
                <Sparkles className="w-5 h-5" />
                <span>AI Market Insight</span>
              </div>
              {aiLoading ? (
                <div className="flex items-center gap-3 text-forest-100">
                  <div className="w-5 h-5 border-2 border-t-amber rounded-full animate-spin"></div>
                  Analysing market feedback...
                </div>
              ) : (
                <p className="text-forest-100 leading-relaxed max-w-2xl">
                  Most reviewers are satisfied with material quality but flag issues with grade labelling on site. Cement suppliers in Greater Accra receive the highest ratings for delivery punctuality.
                </p>
              )}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.slice(0, isTeaser ? 3 : reviews.length).map(review => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-forest-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-forest-950 text-lg leading-tight">{review.name}</h4>
                      <div className="text-sm text-forest-600 mb-2">{review.role}</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${review.rating >= star ? "fill-amber text-amber" : "text-gray-200"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-forest-400">{review.date}</div>
                  </div>
                  
                  <div className="inline-block bg-amber-light text-amber-dark px-3 py-1 rounded text-xs font-bold mb-4">
                    Supplier: {review.supplier}
                  </div>
                  
                  <p className="text-forest-800 leading-relaxed mb-4">
                    "{review.experience}"
                  </p>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={() => markHelpful(review.id)}
                      className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-colors ${helpfulClicked.has(review.id) ? "bg-gsa-green-light text-gsa-green-dark" : "bg-off-white text-forest-600 hover:bg-forest-100"}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {helpfulClicked.has(review.id) ? "Helpful" : "Helpful?"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isTeaser && (
              <div className="mt-8 text-center">
                <Link 
                  to="/feedback"
                  className="inline-block bg-white border-2 border-forest-950 text-forest-950 hover:bg-forest-950 hover:text-white px-8 py-3 rounded-md font-bold transition-colors"
                >
                  Read All / Leave Feedback &rarr;
                </Link>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-forest-950 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border-l-4 border-gsa-green">
            <CheckCircle2 className="w-5 h-5 text-gsa-green" />
            <span className="font-medium">{showToast}</span>
          </div>
        </div>
      )}
    </section>
  );
}
