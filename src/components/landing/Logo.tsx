import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Logo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "absolute top-6 left-8 z-50 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}
    >
      <span className="font-script text-3xl text-white font-semibold tracking-wide">
        Axel
      </span>
    </div>
  );
}
