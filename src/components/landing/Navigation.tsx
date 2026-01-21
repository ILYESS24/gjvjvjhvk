import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type PageType = "home" | "about" | "projects" | "blog" | "contact";

const navLinks: { label: string; page: PageType }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Projects", page: "projects" },
  { label: "Blog", page: "blog" },
  { label: "Contact", page: "contact" },
];

interface NavigationProps {
  isDark: boolean;
  onThemeToggle: () => void;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export function Navigation({ isDark, onThemeToggle, currentPage, onPageChange }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLinkClick = (page: PageType) => {
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn(
          "flex items-center justify-between px-6 lg:px-12 py-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.page)}
              className={cn(
                "text-sm font-medium transition-all duration-200 hover:text-foreground",
                currentPage === link.page
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={onThemeToggle}
            className="flex items-center gap-1 p-2 rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-secondary"
            aria-label="Toggle theme"
          >
            <Sun
              className={cn(
                "w-4 h-4 transition-all duration-300",
                isDark ? "text-muted-foreground" : "text-foreground"
              )}
            />
            <Moon
              className={cn(
                "w-4 h-4 transition-all duration-300",
                isDark ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-border bg-background/80 backdrop-blur-sm transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-lg lg:hidden transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.page)}
              className={cn(
                "text-2xl font-display font-bold transition-all duration-300",
                currentPage === link.page
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                mobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
