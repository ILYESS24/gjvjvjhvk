import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type PageType = "home" | "about" | "projects" | "blog" | "contact";

interface HeroContentProps {
  onNavigate?: (page: PageType) => void;
}

export function HeroContent({ onNavigate }: HeroContentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleViewProjects = () => {
    if (onNavigate) {
      onNavigate("projects");
    }
  };

  const handleBookCall = () => {
    if (onNavigate) {
      onNavigate("contact");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-center h-full px-6 lg:px-12 py-8 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      {/* Availability Badge */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border">
          <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
          <span className="text-sm font-medium text-foreground">Now booking</span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="font-display font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6 tracking-tight">
        I design & build
        <br />
        products that{" "}
        <span className="text-muted-foreground">inspire</span>
      </h1>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
        <button 
          onClick={handleBookCall}
          className="px-6 py-3 bg-foreground text-background font-medium rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
        >
          Book a call
        </button>
        <button 
          onClick={handleViewProjects}
          className="px-6 py-3 bg-secondary text-foreground font-medium rounded-full border border-border transition-all duration-200 hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98]"
        >
          View projects
        </button>
      </div>

      {/* Client Logos */}
      <div className="flex flex-wrap items-center gap-4 lg:gap-6 opacity-50">
        <ClientLogo name="Springfield" icon="🍃" />
        <ClientLogo name="Orbitc" icon="✦" />
        <ClientLogo name="Cloud" icon="☁️" />
        <ClientLogo name="Proline" icon="⚡" />
        <ClientLogo name="Amsterdam" icon="🎯" />
        <ClientLogo name="luminous" icon="✧" />
      </div>
    </div>
  );
}

function ClientLogo({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm font-medium">
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );
}
