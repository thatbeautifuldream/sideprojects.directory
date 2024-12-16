import { Button } from "@/components/ui/button";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Dices, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LaunchSvg from "./launch-svg";

export default function HeroSection() {
  const router = useRouter();
  return (
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

      <Link
        href="https://peerlist.io/milind/project/sideprojectsdirectory"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center mb-4 h-24"
      >
        <LaunchSvg className="w-48 h-24" />
      </Link>
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
  );
}
