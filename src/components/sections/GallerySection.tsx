import React from "react";
import { AlertTriangle } from "lucide-react";

export default function GallerySection() {
  const photos = [
    {
      id: 1,
      url: "/images/hero_construction_1783516832734.png",
      caption: "Commercial build · Ashanti Region"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
      caption: "On-site cement mixing · No grade check"
    },
    {
      id: 3,
      url: "/images/v_ghacem_tema_1783512937510.png",
      caption: "Multi-storey development · Greater Accra"
    },
    {
      id: 4,
      url: "/images/v_sentuo_1783512880044.png",
      caption: "Scale of construction · Materials at risk"
    },
    {
      id: 5,
      url: "/images/block_9inch_1783511819652.png",
      caption: "Materials must match the grade required"
    },
    {
      id: 6,
      url: "/images/rebar_y16_1783511806589.png",
      caption: "High Yield Rebars · Structural Pillars"
    },
    {
      id: 7,
      url: "/images/ghacem_42_1783511769257.png",
      caption: "Grade 42.5N Cement · Heavy foundations"
    },
    {
      id: 8,
      url: "/images/aggregate_20mm_1783511873890.png",
      caption: "Granite aggregates for structural packing"
    }
  ];

  return (
    <section id="gallery" className="bg-forest-950 py-16 md:py-24 border-b border-forest-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
            Ghana builds every day. <br />
            <span className="text-amber">Grade misuse happens every day.</span>
          </h2>
          <p className="text-forest-100 text-lg">
            A building rarely fails because the cement was fake. It fails because the 
            wrong grade was used in the wrong place. We need to stop guessing on site.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {photos.slice(0, 3).map((photo) => (
            <div key={photo.id} className="relative h-56 rounded-lg overflow-hidden group">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-sm font-medium">{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {photos.slice(3, 5).map((photo) => (
            <div key={photo.id} className="relative h-64 rounded-lg overflow-hidden group">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-sm font-medium">{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {photos.slice(5, 8).map((photo) => (
            <div key={photo.id} className="relative h-56 rounded-lg overflow-hidden group">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-sm font-medium">{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Banner */}
        <div className="max-w-4xl mx-auto bg-forest-900 border-2 border-amber rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 text-amber/10">
            <AlertTriangle className="w-48 h-48" />
          </div>
          <div className="bg-forest-950 border border-amber/30 p-3 rounded-lg shrink-0 z-10">
            <AlertTriangle className="w-8 h-8 text-amber" />
          </div>
          <div className="z-10">
            <h3 className="font-display text-2xl text-white mb-3">
              The core problem isn't fake materials — it's grade misuse
            </h3>
            <p className="text-forest-100 leading-relaxed text-lg">
              Grade 32.5R cement poured into a foundation that needs 42.5N. The bag is real. The supplier is legitimate. The application is wrong. <strong className="text-white">GradeGuard flags it before it's laid.</strong>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
