import { Heart } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Footer() {
  return (
    <footer className="py-4 text-center text-sm text-muted-foreground mt-auto">
      <p className="flex items-center justify-center gap-1">
        Made with <Heart className="h-4 w-4 fill-current" /> by
        <Link
          href="/thatbeautifuldream"
          className="font-medium hover:underline"
        >
          Milind
        </Link>
      </p>
    </footer>
  );
}
