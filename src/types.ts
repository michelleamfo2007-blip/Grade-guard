export interface ScanParams {
  cementRatio?: number;
  sandRatio?: number;
  stoneRatio?: number;
  waterCementRatio?: number;
  cementType?: string;
  useCase?: string;
  sandSiltContent?: number;
  mixRatio?: number; // for blocks (1 bag to N sand)
  curingDays?: number;
  sandType?: string;
  diameter?: number;
  spacing?: number;
  concreteCover?: number;
  rustLevel?: string;
}

export interface ScanResult {
  status: "COMPLIANT" | "WARN" | "NON_COMPLIANT" | "CRITICAL";
  complianceScore: number;
  gsaStandard: string;
  compressiveStrengthEst: string;
  structuralRisk: string;
  findings: string[];
  recommendations: string[];
  localTips: string;
  isSimulated?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: "cement" | "blocks" | "rebars" | "aggregates" | "all";
  location: string;
  region: "Greater Accra" | "Ashanti" | "Western" | "Central" | "Eastern" | "Northern";
  gsaLicenseNo: string;
  phone: string;
  email: string;
  certifiedProducts: string[];
  rating: number;
  image?: string;
  coordinates: { lat: number; lng: number };
  reviews?: Review[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "cement" | "blocks" | "rebars" | "aggregates";
  gsaCertified: boolean;
  certificationCode: string;
  strengthGrade?: string;
  idealUsage: string;
  description: string;
  image?: string;
  specifications: Record<string, string>;
}

export interface ConsultationBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectLocation: string;
  serviceType: string;
  message?: string;
  status: "pending" | "scheduled" | "completed";
  bookingDate: string;
  inspectorName?: string;
}

export interface ProjectScorecard {
  id: string;
  projectName: string;
  location: string;
  complianceRating: number;
  overallStatus: "COMPLIANT" | "WARN" | "NON_COMPLIANT";
  recentScansCount: number;
  pendingConsultations: number;
}
