import { ThemeToggle } from "@/components/theme-toggle";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center w-full z-0 bg-background/80 backdrop-blur-sm border-b px-6 pt-2 pb-3">
      <Link
        href="/"
        className={cn("font-medium text-2xl", instrumentSerif.className)}
      >
        sideprojects.directory
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default Header;
