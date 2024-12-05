"use client";

import Header from "@/components/header";
import SideProjects from "@/components/side-projects";

export default function Home() {
  return (
    <div className="container font-mono mx-auto px-4 py-8">
      <Header />
      <SideProjects />
    </div>
  );
}
