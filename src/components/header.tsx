import { ThemeToggle } from "@/components/theme-toggle";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center w-full">
      <h1 className={cn("font-medium text-2xl", instrumentSerif.className)}>
        sideprojects.directory
      </h1>
      <ThemeToggle />
    </div>
  );
};

export default Header;
