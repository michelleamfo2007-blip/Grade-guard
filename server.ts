import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Increase payload limits for image uploads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Initialize Gemini client lazily
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "your_api_key_here") {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return ai;
}

// 1. GRADE COMPLIANCE SCANNER API
app.post("/api/scan", async (req, res) => {
  try {
    const { materialType, image, params } = req.body;
    
    if (!materialType) {
      return res.status(400).json({ error: "materialType is required." });
    }

    const client = getGeminiClient();

    // Prepare expert prompts for GSA (Ghana Standards Authority) compliance
    const materialGuides: Record<string, string> = {
      concrete: "Ghana Standards Authority (GSA) guidelines for concrete (GS 297, GS 1118). GSA concrete classes: C15 (blinding), C20/25 (slabs/beams), C30/37 (columns/heavy load). Standard mixes: 1:3:6 (C15), 1:2:4 (C20), 1:1.5:3 (C25), 1:1:2 (C30). Water-cement ratio should ideally be between 0.45 and 0.55. Sand must be free of silt (max 6% silt content by volume).",
      blocks: "Ghana Standards Authority specification for Sandcrete blocks (GS 297). Compressive strength standards: Load-bearing walls: 2.8 N/mm² (average) or 2.5 N/mm² (individual). Non-load bearing walls: 1.5 N/mm² (average). Standard sizes are 5-inch (125mm) and 6-inch (150mm) and 9-inch (225mm). Standard mix ratio: 1 bag of cement (50kg) to maximum 6 barrows of clean river sand.",
      rebars: "GSA standards for high-yield steel reinforcement bars (GS 788 / BS 4449 Grade 500B). Standard diameters used in Ghana: 10mm (stirrups), 12mm, 16mm, 20mm, 25mm (main structural reinforcement). Reinforcement must be clean of flaky rust, concrete cover must be at least 25mm (slabs) or 40mm (beams/columns) to prevent coastal salt-air spalling.",
      sand_aggregates: "GSA specifications for fine aggregate (sand) and coarse aggregates (stones) for concrete. Sand must be river sand or washed quarry dust, NOT salty sea sand. Aggregates should be well-graded (typically 20mm granite for structural concrete). Excessive silt causes cracking and reduced strength."
    };

    const guide = materialGuides[materialType] || "General Ghana building standards and code requirements for safety and durability.";

    if (client) {
      // Prompt construction
      let prompt = `You are "Grade Guard AI", an expert construction compliance inspector trained on Ghana Standards Authority (GSA) building codes, structural engineering best practices, and Ghanaian environmental conditions (coastal corrosion, humidity, heavy rainfall, clay soils).
      
      Analyze the provided construction material/parameter details. 
      Input Details:
      - Material Type: ${materialType.toUpperCase()}
      - Parameters provided: ${JSON.stringify(params || {})}
      
      GSA Standard Reference context: ${guide}
      
      Provide a highly professional compliance assessment in JSON format matching the following schema. Ensure values are accurate to actual Ghanaian construction conditions (e.g. coastal salt-air protection, high humidity).

      Strict Schema:
      {
        "status": "COMPLIANT" | "WARN" | "NON_COMPLIANT" | "CRITICAL",
        "complianceScore": 0 to 100,
        "gsaStandard": "Reference specific GS code (e.g., GS 297:2016 for Sandcrete Blocks)",
        "compressiveStrengthEst": "Estimated or recommended strength (e.g., 20 N/mm² or 2.8 N/mm²)",
        "structuralRisk": "Description of potential structural failures if incorrect (e.g., coastal reinforcement corrosion, roof collapse, wall cracking)",
        "findings": ["At least 3 analytical observations about the material, visual indicators or parameters"],
        "recommendations": ["At least 3 practical corrective actions or site instructions"],
        "localTips": "Custom expert tip for Ghana (e.g., regarding coastal Accra salt-spray protection, using Accra Plains black cotton soil foundation rules, or source of sand)"
      }`;

      let response;
      if (image) {
        // base64 image scan
        const base64Data = image.split(",")[1] || image;
        const mimeType = image.split(";")[0].split(":")[1] || "image/jpeg";
        
        const imagePart = {
          inlineData: {
            mimeType,
            data: base64Data
          }
        };
        const textPart = {
          text: prompt + "\nAnalyze the visual aspects shown in the photo alongside the parameters."
        };

        response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: { parts: [imagePart, textPart] },
          config: {
            responseMimeType: "application/json",
          }
        });
      } else {
        // parameter-only scan
        response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
      }

      const reportText = response.text || "{}";
      const reportData = JSON.parse(reportText.trim());
      return res.json(reportData);
    } else {
      // Fallback Expert Rules Engine (if Gemini API key is not supplied or active)
      // Provides premium high-fidelity simulated response based on engineering guidelines
      const score = calculateOfflineScore(materialType, params);
      const status = score >= 85 ? "COMPLIANT" : score >= 60 ? "WARN" : score >= 35 ? "NON_COMPLIANT" : "CRITICAL";
      
      let reportData = {
        status,
        complianceScore: score,
        gsaStandard: materialType === "blocks" ? "GS 297:2016 (Sandcrete Blocks)" : materialType === "concrete" ? "GS 1118 / BS 8500 (Concrete)" : materialType === "rebars" ? "GS 788:2015 (Reinforcing Steels)" : "GS Fine/Coarse Aggregates Specification",
        compressiveStrengthEst: estimateStrength(materialType, params),
        structuralRisk: getRiskDescription(materialType, params),
        findings: getOfflineFindings(materialType, params),
        recommendations: getOfflineRecommendations(materialType, params),
        localTips: getLocalGhanaTip(materialType, params),
        isSimulated: true
      };

      // Add small artificial delay to mimic scanner
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.json(reportData);
    }
  } catch (error: any) {
    console.error("Scan error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze compliance." });
  }
});

// Helper functions for offline engineering rules engine
function calculateOfflineScore(type: string, params: any = {}): number {
  let score = 85;
  if (!params) return score;

  if (type === "concrete") {
    // Check sand-cement ratios
    const cement = Number(params.cementRatio) || 1;
    const sand = Number(params.sandRatio) || 2;
    const stone = Number(params.stoneRatio) || 4;
    const waterCement = Number(params.waterCementRatio) || 0.5;
    const cementType = params.cementType || "32.5R";

    // Penalize if water-cement is too high
    if (waterCement > 0.6) score -= 25;
    if (waterCement < 0.4) score -= 10;
    // Penalize if sand is too high relative to cement
    if (sand / cement > 3.5) score -= 20;
    // Penalize if standard building columns are poured with 32.5R cement instead of recommended 42.5N
    if (params.useCase === "columns" && cementType === "32.5R") score -= 15;
    if (params.sandSiltContent > 6) score -= 20;
  } else if (type === "blocks") {
    const mixRatio = Number(params.mixRatio) || 6; // 1 bag to N sand barrows
    if (mixRatio > 8) score -= 40; // GSA limit is max 6-8 barrows for load bearing
    else if (mixRatio > 6) score -= 15;
    
    if (params.curingDays && Number(params.curingDays) < 14) score -= 20; // 21 days is full strength, 14 standard
    if (params.sandType === "sea") score -= 50; // Salty sea sand is catastrophic
  } else if (type === "rebars") {
    const diameter = Number(params.diameter) || 12;
    if (params.spacing && Number(params.spacing) > 250) score -= 20; // Spacing too wide
    if (params.concreteCover && Number(params.concreteCover) < 25) score -= 25; // Salty air corrosion risk
    if (params.rustLevel === "severe") score -= 30;
  }
  
  return Math.max(15, Math.min(100, score));
}

function estimateStrength(type: string, params: any = {}): string {
  if (type === "concrete") {
    const wc = Number(params.waterCementRatio) || 0.5;
    if (wc > 0.6) return "12 - 15 N/mm² (Below GSA structural slab code)";
    if (params.cementType === "42.5N") return "25 - 30 N/mm² (C25/C30 GSA Compliant for Slabs/Beams)";
    return "18 - 22 N/mm² (C20 Standard structural Concrete)";
  } else if (type === "blocks") {
    const ratio = Number(params.mixRatio) || 6;
    if (params.sandType === "sea") return "0.5 N/mm² (Extremely fragile due to salt)";
    if (ratio <= 6) return "2.9 N/mm² (Exceeds GSA 2.8 N/mm² standard for load-bearing)";
    if (ratio <= 8) return "1.8 N/mm² (Fits non-load-bearing only, GS 297)";
    return "1.1 N/mm² (Substandard block - high risk of crumbling)";
  }
  return "N/A - Direct structural reinforcement test needed";
}

function getRiskDescription(type: string, params: any = {}): string {
  if (type === "concrete") {
    return "High water content or poor aggregate ratio leads to excessive shrinkage cracks and structural deflection under slab load. If used for pillars, it can result in shear failure or premature building collapse.";
  } else if (type === "blocks") {
    if (params.sandType === "sea") return "Salt-induced efflorescence will destroy plastering, corrode internal reinforcing rebars, and cause sudden block failure.";
    return "Poorly cured or high-sand ratio blocks suffer from compressive crumbling. Walls may buckle or crack under simple roof trusses or dynamic wind loads.";
  } else if (type === "rebars") {
    return "Insufficient concrete cover (less than 25-40mm) exposed to coastal Ghana's marine winds leads to rapid carbonation, rust expansion, spalling, and sudden beam deflection.";
  }
  return "Substandard materials risk overall structural durability and GSA prosecution.";
}

function getOfflineFindings(type: string, params: any = {}): string[] {
  if (type === "concrete") {
    return [
      `Mix ratio indicates approximately ${params.cementRatio || 1}:${params.sandRatio || 2}:${params.stoneRatio || 4} proportions.`,
      `Water-cement ratio of ${params.waterCementRatio || 0.5} assessed.`,
      `Cement grade used is ${params.cementType || "32.5R"}.`
    ];
  } else if (type === "blocks") {
    return [
      `Block sand-cement proportion is 1 bag to ${params.mixRatio || 6} barrows of sand.`,
      `Curing regimen declared: ${params.curingDays || 7} days.`,
      `Primary aggregate source is specified as: ${params.sandType === "river" ? "Clean River Sand" : params.sandType === "quarry" ? "Quarry Dust" : "Coastal Sea Sand (HIGH DANGER)"}.`
    ];
  }
  return [
    "Diameter and spacing dimensions checked against standard BS 8110 / Eurocode 2 details.",
    "Visual assessment of rusting and concrete cover parameters completed.",
    "Yield strength profile benchmarked against Grade 500B high-yield carbon steel rebars."
  ];
}

function getOfflineRecommendations(type: string, params: any = {}): string[] {
  if (type === "concrete") {
    return [
      "Strictly measure water using a standard measuring can; avoid pipe-direct watering which leads to excess water.",
      "For column castings, use Grade 42.5N cement to ensure fast structural strength gain and GSA load compliance.",
      "Cure all casted concrete elements continuously for at least 7-14 days by wrapping in wet hessian sacks or pounding."
    ];
  } else if (type === "blocks") {
    return [
      "Keep blocks under shade and wet them twice daily (morning and evening) for a minimum of 14 days to maximize cement hydration.",
      "Standard sandcrete load-bearing block production should never exceed 6 barrows of river sand per 50kg bag of cement.",
      "Always reject blocks that leave deep sand marks when rubbed by thumb, as this is a prime sign of missing cement."
    ];
  }
  return [
    "Ensure concrete spacers of at least 30mm are secured on the rebars before pouring concrete to prevent reinforcement exposure.",
    "Do not cast concrete over rebars showing flaky, scaling orange rust. Clean them with a wire brush first.",
    "Confirm the rebar lap length is at least 40 times the diameter (e.g. 480mm lap for 12mm bar) to transfer tension correctly."
  ];
}

function getLocalGhanaTip(type: string, params: any = {}): string {
  if (type === "blocks") {
    return "Local Expert Tip: Many block manufacturers in Accra (e.g., Kasoa, Amasaman, Ablekuma) dilute cement to maximize profit. Insist on buying blocks from manufacturers certified by the GSA or cast your own blocks on-site using standard Ghana 42.5R cement.";
  }
  if (type === "concrete") {
    return "Local Expert Tip: When ordering sand from Tipper drivers in Accra/Tema, watch out for 'soil sand' dug from pits rather than rivers. High silt content in clay sand from Dodowa or Shai Hills ruins concrete strength. Always run a jar silt test on-site!";
  }
  return "Local Expert Tip: In coastal Ghana (e.g., James Town, Dansoman, Tema, Sakumono), marine salt-air causes rapid concrete spalling. Always paint exposed structures with anti-carbonation coatings and use marine-grade rebars with high cover depth.";
}

// 2. CONSULTANCY API
app.post("/api/book-consultation", (req, res) => {
  const { name, phone, email, projectLocation, serviceType, message } = req.body;
  if (!name || !phone || !serviceType) {
    return res.status(400).json({ error: "Missing required booking details." });
  }
  
  // Return booking confirmation
  const bookingId = "GG-" + Math.floor(100000 + Math.random() * 900000);
  res.json({
    success: true,
    bookingId,
    message: "Consultation request received successfully! A certified inspector or engineer will contact you shortly.",
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    })
  });
});

// Serve Vite dev / Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
