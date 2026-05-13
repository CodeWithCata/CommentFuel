"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { PreviewSection } from "../components/PreviewSection";
import { Pricing } from "../components/Pricing";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";
import { Dashboard } from "../components/Dashboard";
import { RektsDashboard } from "../components/RektsDashboard";

export default function Home() {
  const [page, setPage] = useState("landing");

  useEffect(() => {
    if (page === "landing") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <div style={{ animation: "fadeIn 0.3s ease" }} key={page}>
        {page === "landing" ? (
          <>
            <Hero setPage={setPage} />
            <Features />
            <HowItWorks />
            <PreviewSection />
            <Pricing />
            <FinalCTA setPage={setPage} />
            <Footer />
          </>
        ) : page === "rekts" ? (
          <RektsDashboard />
        ) : (
          <Dashboard />
        )}
      </div>
    </>
  );
}