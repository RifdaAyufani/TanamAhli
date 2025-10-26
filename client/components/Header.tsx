import { Link } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = "/" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Leaf className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Tanamahli
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                currentPath === "/" ? "text-primary" : "text-foreground/70",
              )}
            >
              Home
            </Link>
            <Link
              to="/klinik"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                currentPath === "/klinik"
                  ? "text-primary"
                  : "text-foreground/70",
              )}
            >
              Klinik
            </Link>
            <Link
              to="/shop"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                currentPath === "/shop" ? "text-primary" : "text-foreground/70",
              )}
            >
              Shop
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
