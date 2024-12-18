import { ThemeToggle } from "@/components/theme-toggle";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

const Header = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center w-full z-0 bg-background/80 backdrop-blur-sm border-b ~px-4/8 ~py-2/4">
      <Link
        href="/"
        className={cn("font-medium ~text-xl/3xl", instrumentSerif.className)}
      >
        sideprojects.directory
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default Header;
