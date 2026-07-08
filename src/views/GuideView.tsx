import React from "react";
import ReferenceTableSection from "../components/sections/ReferenceTableSection";

export default function GuideView() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <ReferenceTableSection isTeaser={false} />
    </div>
  );
}
