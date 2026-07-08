import { Product, Vendor } from "./types";

// 1. GSA CERTIFIED PRODUCTS IN GHANA
export const GSA_PRODUCTS: Product[] = [
  {
    id: "prod-ghacem-32",
    name: "GHACEM Super Rapid 32.5R",
    brand: "GHACEM Ltd",
    category: "cement",
    gsaCertified: true,
    certificationCode: "GSA-CEM-32.5R-2024",
    strengthGrade: "Class 32.5R (Rapid Hardening)",
    idealUsage: "Block making, floor screeding, plastering, and general masonry work.",
    description: "Ghana's premier cement formulated for standard masonry work, rapid block molding, and smooth finish rendering. Highly recommended for standard sandcrete blocks.",
    image: "/images/ghacem_32_1783511754247.png",
    specifications: {
      "Standard Reference": "GS 1118-1 / EN 197-1",
      "Compressive Strength (2 days)": "≥ 10.0 N/mm²",
      "Compressive Strength (28 days)": "≥ 32.5 N/mm²",
      "Setting Time (Initial)": "≥ 75 minutes"
    }
  },
  {
    id: "prod-ghacem-42",
    name: "GHACEM Extra 42.5N",
    brand: "GHACEM Ltd",
    category: "cement",
    gsaCertified: true,
    certificationCode: "GSA-CEM-42.5N-2024",
    strengthGrade: "Class 42.5N (High Strength)",
    idealUsage: "Reinforced concrete columns, beams, suspended slabs, bridges, and high-load foundations.",
    description: "Engineered for heavy-duty structural concrete casting. Delivers exceptional load-bearing capacity and fast structural strength gain. Crucial for multi-story pillars.",
    image: "/images/ghacem_42_1783511769257.png",
    specifications: {
      "Standard Reference": "GS 1118-1 / EN 197-1",
      "Compressive Strength (2 days)": "≥ 20.0 N/mm²",
      "Compressive Strength (28 days)": "≥ 42.5 N/mm²",
      "Setting Time (Initial)": "≥ 60 minutes"
    }
  },
  {
    id: "prod-dangote-42",
    name: "Dangote Falcon 42.5R",
    brand: "Dangote Cement Ghana",
    category: "cement",
    gsaCertified: true,
    certificationCode: "GSA-DANG-42.5R-2025",
    strengthGrade: "Class 42.5R (High Strength Rapid)",
    idealUsage: "High-grade concrete foundations, retaining walls, precast slabs, and structural pillars.",
    description: "Premium high-grade cement offering early strength and superior binding. Popular across major commercial projects in Accra and Kumasi for rapid formwork removal.",
    image: "/images/dangote_42_1783511781645.png",
    specifications: {
      "Standard Reference": "GS 1118-1 / EN 197-1",
      "Compressive Strength (2 days)": "≥ 22.0 N/mm²",
      "Compressive Strength (28 days)": "≥ 42.5 N/mm²",
      "Setting Time (Initial)": "≥ 60 minutes"
    }
  },
  {
    id: "prod-rebar-y12",
    name: "High-Yield Ribbed Carbon Steel Rebar Y12",
    brand: "Sentuo Steel Ltd / Tema Steel",
    category: "rebars",
    gsaCertified: true,
    certificationCode: "GSA-STL-500B-12MM",
    strengthGrade: "Grade 500B (High Yield)",
    idealUsage: "Primary reinforcement in concrete slabs, beam cages, and standard lintels.",
    description: "12mm diameter ribbed high-tensile steel bars. Deformed profile provides excellent bond grip with concrete, preventing structural slippage.",
    image: "/images/rebar_y12_1783511795297.png",
    specifications: {
      "Standard Reference": "GS 788:2015 / BS 4449",
      "Nominal Diameter": "12 mm",
      "Yield Strength (Re)": "500 N/mm²",
      "Tensile Ratio (Rm/Re)": "≥ 1.08",
      "Elongation at Max Load": "≥ 5.0 %"
    }
  },
  {
    id: "prod-rebar-y16",
    name: "High-Yield Ribbed Carbon Steel Rebar Y16",
    brand: "Sentuo Steel Ltd / B5 Plus",
    category: "rebars",
    gsaCertified: true,
    certificationCode: "GSA-STL-500B-16MM",
    strengthGrade: "Grade 500B (High Yield)",
    idealUsage: "Main structural columns, heavily loaded beams, and double-reinforced foundation footings.",
    description: "16mm heavy structural rebar engineered to resist high bending and shear loads. Ideal for multi-story residential and commercial structures.",
    image: "/images/rebar_y16_1783511806589.png",
    specifications: {
      "Standard Reference": "GS 788:2015 / BS 4449",
      "Nominal Diameter": "16 mm",
      "Yield Strength (Re)": "500 N/mm²",
      "Tensile Ratio (Rm/Re)": "≥ 1.08"
    }
  },
  {
    id: "prod-blocks-9inch",
    name: "9-inch Hollow Sandcrete Blocks (Load Bearing)",
    brand: "Emerald Blocks & Precast",
    category: "blocks",
    gsaCertified: true,
    certificationCode: "GSA-BLK-9INCH-LB",
    strengthGrade: "Class A (Load Bearing - Avg 3.0 N/mm²)",
    idealUsage: "Load-bearing external walls, foundations, and support walls for single or multi-story buildings.",
    description: "Vibrated hollow sandcrete blocks manufactured under controlled hydration conditions. GSA certified to meet the strict 2.8 N/mm² average compressive threshold.",
    image: "/images/block_9inch_1783511819652.png",
    specifications: {
      "Standard Reference": "GS 297:2016",
      "Size (L x W x H)": "450mm x 225mm x 225mm (9 inches)",
      "Average Compressive Strength": "3.0 N/mm² (GSA Min: 2.8)",
      "Water Absorption": "< 12 %"
    }
  },
  {
    id: "prod-blocks-6inch",
    name: "6-inch Hollow Sandcrete Blocks (Partitioning)",
    brand: "Amasaman Certified Precast",
    category: "blocks",
    gsaCertified: true,
    certificationCode: "GSA-BLK-6INCH-NP",
    strengthGrade: "Class B (Non-Load Bearing - Avg 1.8 N/mm²)",
    idealUsage: "Internal partitioning walls, non-weight bearing fences, and room dividers.",
    description: "Lightweight, highly consistent 6-inch hollow blocks. Excellent sound insulation and surface grip for standard cement plastering.",
    image: "/images/block_6inch_1783511831159.png",
    specifications: {
      "Standard Reference": "GS 297:2016",
      "Size (L x W x H)": "450mm x 150mm x 225mm (6 inches)",
      "Average Compressive Strength": "1.8 N/mm² (GSA Min: 1.5)",
      "Water Absorption": "< 15 %"
    }
  },
  {
    id: "prod-agg-quarry20",
    name: "20mm Granite Aggregate (Granite Stones)",
    brand: "Shai Hills Quarry Consortium",
    category: "aggregates",
    gsaCertified: true,
    certificationCode: "GSA-AGG-GR20",
    idealUsage: "Standard structural concrete mixes (C20/25, C30/37) for slabs, pillars, and beams.",
    description: "Double crushed and washed granite aggregate from the Shai Hills geological belt. Uniform 20mm sizing ensures excellent concrete packing and high compressive limits.",
    image: "/images/aggregate_20mm_1783511873890.png",
    specifications: {
      "Standard Reference": "GS BS 882 / EN 12620",
      "Sieving Profile": "95% passing 20mm sieve",
      "Aggregate Crushing Value": "< 25 % (High Hardness)",
      "Silt/Clay Content": "< 1 %"
    }
  }
];

// 2. VERIFIED GSA-LICENSED VENDORS IN GHANA
export const VERIFIED_VENDORS: Vendor[] = [
  {
    id: "v-sentuo-steel",
    name: "Sentuo Steel Limited",
    category: "rebars",
    location: "Tema Heavy Industrial Area, Tema",
    region: "Greater Accra",
    gsaLicenseNo: "GSA-LIC-STL-002",
    phone: "+233 303 308 812",
    email: "sales@sentuosteel.com.gh",
    certifiedProducts: ["10mm, 12mm, 16mm, 20mm, 25mm High-Yield Steel Rebars"],
    rating: 4.8,
    image: "/images/v_sentuo_1783512880044.png",
    coordinates: { lat: 5.6664, lng: -0.0031 },
    reviews: [
      { id: "r1", author: "Kwame Asante", rating: 5, comment: "Excellent rebars. Highly consistent.", date: "2026-05-10" },
      { id: "r2", author: "BuildIt Ghana", rating: 4, comment: "Good quality, but delivery was a bit late.", date: "2026-06-01" }
    ]
  },
  {
    id: "v-ghacem-tema",
    name: "GHACEM Tema Factory",
    category: "cement",
    location: "Harbour Road, Industrial Area, Tema",
    region: "Greater Accra",
    gsaLicenseNo: "GSA-LIC-CEM-001",
    phone: "+233 303 204 225",
    email: "info@ghacem.com",
    certifiedProducts: ["Super Rapid 32.5R", "Extra 42.5N", "Super Strong 42.5R"],
    rating: 4.9,
    image: "/images/v_ghacem_tema_1783512937510.png",
    coordinates: { lat: 5.6324, lng: -0.0125 },
    reviews: [
      { id: "r3", author: "Nana Osei", rating: 5, comment: "The 42.5N cement is perfect for our columns.", date: "2026-06-20" }
    ]
  },
  {
    id: "v-dangote-tema",
    name: "Dangote Cement Ghana Depot",
    category: "cement",
    location: "Tema Port Road, Tema",
    region: "Greater Accra",
    gsaLicenseNo: "GSA-LIC-CEM-005",
    phone: "+233 303 216 631",
    email: "ghana@dangotecement.com",
    certifiedProducts: ["Falcon 42.5R", "3X Cement 42.5N"],
    rating: 4.7,
    image: "/images/v_dangote_1783512959366.png",
    coordinates: { lat: 5.6410, lng: -0.0150 }
  },
  {
    id: "v-emerald-blocks",
    name: "Emerald Precast & Blocks",
    category: "blocks",
    location: "Ashaley Botwe Road, near School Junction, Accra",
    region: "Greater Accra",
    gsaLicenseNo: "GSA-LIC-BLK-109",
    phone: "+233 244 558 966",
    email: "emeraldblocks@gmail.com",
    certifiedProducts: ["5-inch Hollow Blocks", "6-inch Hollow Blocks", "9-inch Load-Bearing Blocks", "Pavement Blocks"],
    rating: 4.6,
    image: "/images/v_emerald_1783512975414.png",
    coordinates: { lat: 5.6882, lng: -0.1502 }
  },
  {
    id: "v-b5-plus",
    name: "B5 Plus Limited",
    category: "rebars",
    location: "Kpone Barrier, Kpone, near Tema",
    region: "Greater Accra",
    gsaLicenseNo: "GSA-LIC-STL-015",
    phone: "+233 244 338 522",
    email: "info@b5plus.com",
    certifiedProducts: ["High-Tensile Rebars", "Mild Steel Bars", "Binding Wire", "Iron Sheets"],
    rating: 4.7,
    image: "/images/v_b5plus_1783512988344.png",
    coordinates: { lat: 5.6912, lng: 0.0551 }
  },
  {
    id: "v-shai-quarry",
    name: "Shai Hills Granite Quarry",
    category: "aggregates",
    location: "Shai Hills, on the Tema-Akosombo Road",
    region: "Eastern",
    gsaLicenseNo: "GSA-LIC-AGG-044",
    phone: "+233 208 447 112",
    email: "shaiquarry@gmail.com",
    certifiedProducts: ["10mm, 14mm, 20mm, 25mm Crushed Granite", "Washed Quarry Dust"],
    rating: 4.5,
    image: "/images/v_shai_1783513012500.png",
    coordinates: { lat: 5.8812, lng: 0.0815 }
  },
  {
    id: "v-kumasi-blocks",
    name: "Oseikrom Sandcrete & Concrete Works",
    category: "blocks",
    location: "Apatrapa - Tanoso Road, Kumasi",
    region: "Ashanti",
    gsaLicenseNo: "GSA-LIC-BLK-224",
    phone: "+233 553 441 990",
    email: "oseikromprecast@outlook.com",
    certifiedProducts: ["6-inch Load-Bearing Blocks", "9-inch Foundation Blocks"],
    rating: 4.4,
    image: "/images/v_oseikrom_1783513026444.png",
    coordinates: { lat: 6.7025, lng: -1.6881 }
  },
  {
    id: "v-takoradi-cement",
    name: "GHACEM Takoradi Grinding Plant",
    category: "cement",
    location: "Harbour Road, Takoradi",
    region: "Western",
    gsaLicenseNo: "GSA-LIC-CEM-002",
    phone: "+233 312 022 311",
    email: "takoradi@ghacem.com",
    certifiedProducts: ["Super Rapid 32.5R", "Extra 42.5N"],
    rating: 4.8,
    image: "/images/v_ghacem_tadi_1783513041144.png",
    coordinates: { lat: 4.8915, lng: -1.7482 }
  }
];

// 3. REGISTERED GHANAIAN BUILDING INSPECTORS / STRUCTURAL ENGINEERS (CONSULTANTS)
export const PROFESSIONAL_CONSULTANTS = [
  {
    id: "eng-kofi-mensah",
    name: "Ing. Kofi Mensah, FGhIE",
    title: "Senior Structural & Materials Specialist",
    licenseNo: "GhIE-PE-1422",
    affiliation: "Ghana Institution of Engineering",
    expertise: "Structural steel design, deep foundations, concrete mix auditing, coastal carbonation prevention.",
    location: "East Legon, Accra",
    rating: 4.9,
    reviews: 24,
    availableDays: "Mon, Wed, Fri"
  },
  {
    id: "eng-ama-addo",
    name: "Ing. Ama Addo, MGhIE",
    title: "Civil & Materials Laboratory Director",
    licenseNo: "GhIE-PE-3088",
    affiliation: "Ghana Institution of Engineering / GSA Affiliate",
    expertise: "Sandcrete block mechanical testing, soil silt evaluation, structural risk modeling.",
    location: "Tema Community 10, Tema",
    rating: 4.8,
    reviews: 18,
    availableDays: "Tue, Thu"
  },
  {
    id: "eng-kwame-osei",
    name: "Ing. Kwame Osei, MGhIE",
    title: "Geotechnical & Site Safety Inspector",
    licenseNo: "GhIE-PE-2211",
    affiliation: "Ghana Institution of Engineering",
    expertise: "Foundation failures on clayey Accra Plains soils, drainage engineering, multi-story inspections.",
    location: "Patasi, Kumasi",
    rating: 4.7,
    reviews: 15,
    availableDays: "Mon, Tue, Thu"
  }
];

// 4. GHANA REGIONAL GSA STANDARDS SUMMARY
export const GSA_STANDARDS_DOCS = [
  {
    code: "GS 297:2016",
    title: "Specification for Sandcrete Blocks",
    scope: "Covers hollow and solid block standards. MANDATES minimum average compressive strength of 2.8 N/mm² for load bearing blocks and 1.5 N/mm² for non-load bearing blocks.",
    crucialRule: "Blocks must cure by continuous spraying for at least 14-21 days under damp shade. Do NOT expose freshly casted blocks to hot tropical sun."
  },
  {
    code: "GS 1118-1 / EN 197-1",
    title: "Composition, Specifications, and Conformity Criteria for Common Cement",
    scope: "Governs quality classifications for bags sold in Ghana (CEM I, CEM II).",
    crucialRule: "Grades 32.5R are for standard blockmaking/plastering. Grades 42.5N are mandatory for multi-story columns, beams, and slabs."
  },
  {
    code: "GS 788:2015 / BS 4449",
    title: "Steel for the Reinforcement of Concrete",
    scope: "Specifies properties of weldable reinforcing steel bars.",
    crucialRule: "Main bars must be high-yield ribbed steel (Grade 500B). Standard structural rebar spacing should not exceed 200mm center-to-center."
  },
  {
    code: "Ghana Building Code (GS 1207:2018)",
    title: "National Building Regulations and Structural Safety Guide",
    scope: "Unified building guidelines issued in 2018. Lays out permit regulations, materials testing requirements, and structural inspection intervals.",
    crucialRule: "Every foundation pour and suspended slab casting must be inspected and certified by an authorized structural engineer (MgHIE)."
  }
];
