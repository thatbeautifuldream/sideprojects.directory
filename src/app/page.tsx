"use client";

import ProjectGrid from "@/components/project-grid";
import { Button } from "@/components/ui/button";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Dices, Github, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-start pt-12 px-4 text-center">
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4",
            instrumentSerif.className
          )}
        >
          Showcase Your Side Projects
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          A curated space for developers to share and discover amazing side
          projects. Add the &apos;side-project&apos; topic to your GitHub
          repositories to showcase them here.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a
              href="https://github.com/topics/side-project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2" />
              Add Your Project
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => router.push("/u/thatbeautifuldream")}
          >
            <Dices className="mr-2" />
            View Example
          </Button>
        </div>
      </section>
      <div className="py-12">
        <ProjectGrid />
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart fill="red" className="h-4 w-4" /> by
          <Link
            href="/u/thatbeautifuldream"
            className="font-medium hover:underline"
          >
            Milind
          </Link>
        </p>
      </footer>
    </div>
  );
}
