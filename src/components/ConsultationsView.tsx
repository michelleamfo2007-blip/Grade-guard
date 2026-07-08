import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquareCode, 
  UserCheck, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ClipboardList, 
  CheckCircle,
  HelpCircle,
  Clock,
  Briefcase,
  AlertTriangle
} from "lucide-react";
import { ConsultationBooking } from "../types";
import { PROFESSIONAL_CONSULTANTS } from "../data";

interface ConsultationsViewProps {
  bookings: ConsultationBooking[];
  onAddBooking: (booking: ConsultationBooking) => void;
  outdoorMode: boolean;
}

export default function ConsultationsView({ bookings, onAddBooking, outdoorMode }: ConsultationsViewProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectLocation: "",
    serviceType: "Slab Casting Integrity Audit",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<{
    id: string;
    msg: string;
    date: string;
  } | null>(null);

  const serviceCategories = [
    "Slab Casting Integrity Audit",
    "Sandcrete Block Compressive Test",
    "Coastal Rust & Salt-Air Mitigation",
    "Foundation Clay-Soil Feasibility",
    "GSA Permit Compliance Inspection"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.projectLocation) {
      alert("Please fill in your Name, Phone Number, and Project Location.");
      return;
    }

    setIsLoading(true);
    setSuccessMsg(null);

    try {
      const response = await fetch("/api/book-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to book consultation.");
      }

      const resData = await response.json();
      
      // Select random inspector
      const randomInspector = PROFESSIONAL_CONSULTANTS[Math.floor(Math.random() * PROFESSIONAL_CONSULTANTS.length)];

      const newBooking: ConsultationBooking = {
        id: resData.bookingId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        projectLocation: formData.projectLocation,
        serviceType: formData.serviceType,
        message: formData.message,
        status: "scheduled",
        bookingDate: resData.scheduledDate,
        inspectorName: randomInspector.name
      };

      // Save to parent state which synced to localstorage
      onAddBooking(newBooking);

      setSuccessMsg({
        id: resData.bookingId,
        msg: resData.message,
        date: resData.scheduledDate
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectLocation: "",
        serviceType: "Slab Casting Integrity Audit",
        message: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error booking inspection. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* HEADER */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="font-display font-extrabold text-3xl text-brand-blue-900 dark:text-slate-100 flex items-center gap-2">
          <MessageSquareCode className="text-safety-amber w-8 h-8" /> Consultancy & Inspections
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Schedule site audits and concrete casting authorizations with registered Ghana Institution of Engineering (GhIE) structural specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: ACTIVE CONSULTANTS DIRECTORY (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display font-bold text-xl text-brand-blue-900 dark:text-slate-100 flex items-center gap-2">
            <UserCheck className="text-gsa-green w-5.5 h-5.5" /> GSA Registered Structural Engineers
          </h3>

          <div className="space-y-4">
            {PROFESSIONAL_CONSULTANTS.map(eng => (
              <div 
                key={eng.id} 
                className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-sm text-brand-blue-950 dark:text-white">{eng.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold font-mono">License: <span className="text-brand-blue-800 dark:text-slate-200">{eng.licenseNo}</span></p>
                  </div>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold font-mono text-[9px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 uppercase">
                    PE Member
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p className="font-bold text-brand-blue-900 dark:text-slate-100 font-display">{eng.title}</p>
                  <p className="leading-relaxed">{eng.expertise}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold">
                  <span>Location: {eng.location}</span>
                  <span className="text-gsa-green-dark dark:text-gsa-green">Available: {eng.availableDays}</span>
                </div>
              </div>
            ))}
          </div>

          {/* GSA MANDATE BOX */}
          <div className="bg-safety-amber-light dark:bg-slate-800/40 border-l-4 border-safety-amber p-4 rounded-xl space-y-1.5">
            <h5 className="text-xs font-mono font-black text-brand-blue-950 dark:text-white flex items-center gap-1 uppercase">
              <AlertTriangle className="w-4 h-4 text-safety-amber-dark dark:text-safety-amber" /> GSA Inspection Mandate
            </h5>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
              Under Act 118, structural inspections are legally required on the Ghana building code before pouring any concrete suspended slabs. Casting without engineer sign-off risks structure closure by the district assembly (KMA, AMA, etc).
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING FORM & TRACKING (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SUCCESS BANNER */}
          <AnimatePresence mode="wait">
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gsa-green-light dark:bg-slate-800 border-2 border-gsa-green text-slate-900 dark:text-slate-100 p-5 rounded-2xl space-y-3 shadow-md"
              >
                <div className="flex gap-2">
                  <CheckCircle className="text-gsa-green w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-display font-extrabold text-gsa-green-dark dark:text-gsa-green text-base uppercase">Inspection Request Approved!</h4>
                    <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mt-1">
                      Booking ID Reference: <span className="text-brand-blue-900 dark:text-slate-100 font-black">{successMsg.id}</span>
                    </p>
                    <p className="text-xs mt-2 font-medium">
                      {successMsg.msg}
                    </p>
                    <div className="mt-3 bg-white dark:bg-slate-900/60 p-2.5 rounded border border-gsa-green/10 text-xs font-bold font-mono text-brand-blue-950 dark:text-white">
                      📅 Scheduled Date: {successMsg.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOOKING FORM */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-5">
            <h3 className="font-display font-bold text-lg text-brand-blue-900 dark:text-slate-100 border-b pb-2 flex items-center gap-2">
              <ClipboardList className="text-safety-amber w-5.5 h-5.5" /> Book GSA Material Testing / Site Audit
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-mono">Builder Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Kofi Boateng"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-mono">WhatsApp/Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +233 244 123 456"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-mono">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. kofi@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-mono">Project Location *</label>
                  <input
                    type="text"
                    name="projectLocation"
                    required
                    placeholder="e.g. East Legon Hills, Accra"
                    value={formData.projectLocation}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-mono">Required Service *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-bold"
                >
                  {serviceCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 font-mono">Project Scope Details / Special Notes</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="e.g., We are casting a 120sqm suspended slab this Friday. We want river sand test and cement grade verification."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:border-brand-blue-800"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-safety-amber hover:bg-safety-amber-dark text-brand-blue-950 dark:text-white font-display font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isLoading ? "Generating Schedule..." : "Schedule GSA Consultation Audit"}
              </button>
            </form>
          </div>

          {/* ACTIVE BOOKINGS LEDGER */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-brand-blue-900 dark:text-slate-100 flex items-center gap-1.5">
              <Calendar className="text-brand-blue-800 dark:text-slate-200 w-5 h-5" /> Active Inspections Ledger
            </h4>

            {bookings.length === 0 ? (
              <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center text-slate-400">
                <Briefcase className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-bold">No active inspection bookings found.</p>
                <p className="text-[10px] text-slate-400 mt-1">Book a consultation above to schedule a site audit.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map(book => (
                  <div 
                    key={book.id} 
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-brand-blue-100 dark:bg-slate-800 text-brand-blue-800 dark:text-slate-200 px-2 py-0.5 rounded border border-brand-blue-800/10">
                          {book.id}
                        </span>
                        <span className="text-gsa-green-dark dark:text-gsa-green text-[10px] font-mono font-bold bg-gsa-green-light dark:bg-slate-800 px-2 py-0.5 rounded">
                          {book.status.toUpperCase()}
                        </span>
                      </div>
                      <h5 className="font-display font-black text-sm text-brand-blue-950 dark:text-white leading-tight">
                        {book.serviceType}
                      </h5>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono space-y-0.5">
                        <p><strong>Builder:</strong> {book.name} | {book.phone}</p>
                        <p><strong>Location:</strong> {book.projectLocation}</p>
                        <p><strong>Assigned Engineer:</strong> {book.inspectorName || "TBD"}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-center sm:text-right shrink-0">
                      <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">INSPECTION DATE</span>
                      <span className="text-xs font-bold text-brand-blue-950 dark:text-white font-mono">{book.bookingDate}</span>
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
