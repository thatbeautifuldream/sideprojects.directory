/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ProjectGrid from "@/components/project-grid";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="py-12">
        <ProjectGrid />
      </div>
      <Footer />
    </div>
  );
}
