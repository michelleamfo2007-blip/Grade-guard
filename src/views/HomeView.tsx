import React from "react";
import HeroSection from "../components/sections/HeroSection";
import StatsBarSection from "../components/sections/StatsBarSection";
import GallerySection from "../components/sections/GallerySection";
import VendorSearchSection from "../components/sections/VendorSearchSection";
import ScannerSection from "../components/sections/ScannerSection";
import ReferenceTableSection from "../components/sections/ReferenceTableSection";
import FeedbackSection from "../components/sections/FeedbackSection";

export default function HomeView() {
  return (
    <>
      <HeroSection />
      <StatsBarSection />
      <GallerySection />
      <VendorSearchSection isTeaser={true} />
      {/* Scanner section acts as a nice interactive block on the home page too */}
      <ScannerSection />
      <ReferenceTableSection isTeaser={true} />
      <FeedbackSection isTeaser={true} />
    </>
  );
}
