import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavigation from "./components/AppNavigation";
import Footer from "./components/Footer";

// Views
import HomeView from "./views/HomeView";
import VendorsView from "./views/VendorsView";
import ScannerView from "./views/ScannerView";
import GuideView from "./views/GuideView";
import FeedbackView from "./views/FeedbackView";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans text-forest-950 bg-off-white">
        <AppNavigation />
        
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/vendors" element={<VendorsView />} />
            <Route path="/scanner" element={<ScannerView />} />
            <Route path="/guide" element={<GuideView />} />
            <Route path="/feedback" element={<FeedbackView />} />
          </Routes>
        </main>

        <Footer outdoorMode={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;
