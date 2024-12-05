"use client";

import SideProjects from "@/components/side-projects";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Side Projects</h1>
        <ThemeToggle />
      </div>
      <SideProjects />
    </div>
  );
}
