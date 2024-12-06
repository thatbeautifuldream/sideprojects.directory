import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center w-full">
      <h1 className="font-medium">sideprojects.directory</h1>
      <ThemeToggle />
    </div>
  );
};

export default Header;
