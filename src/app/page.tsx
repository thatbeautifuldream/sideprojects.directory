"use client";

import { Button } from "@/components/ui/button";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Dices, Github } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h2
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl mb-6",
            instrumentSerif.className
          )}
        >
          Showcase Your Side Projects
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A curated space for developers to share and discover amazing side
          projects. Add the &apos;side-project&apos; topic to your GitHub
          repositories to showcase them here.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
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
            onClick={() => router.push("/u/thatbeautifuldream")}
          >
            <Dices className="mr-2" />
            View Example
          </Button>
        </div>
      </section>
    </div>
  );
}
