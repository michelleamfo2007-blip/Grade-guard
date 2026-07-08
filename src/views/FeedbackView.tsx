import React from "react";
import FeedbackSection from "../components/sections/FeedbackSection";

export default function FeedbackView() {
  return (
    <div className="pt-20 bg-off-white min-h-screen">
      <FeedbackSection isTeaser={false} />
    </div>
  );
}
