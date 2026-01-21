import { useState, useEffect, useCallback } from "react";
import { ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const carouselSlides = [
  {
    id: 1,
    title: "Osaka",
    category: "Branding",
    gradient: "from-[#8b7fdb] via-[#a099db] to-[#7a6fcc]",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    objectType: "character",
  },
  {
    id: 2,
    title: "Nordic",
    category: "Web Design",
    gradient: "from-[#5a8a8a] via-[#6b9b9b] to-[#7aabab]",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    objectType: "abstract",
  },
  {
    id: 3,
    title: "Beyond the Pixels",
    category: "Editorial",
    gradient: "from-[#5a9bc7] via-[#6baad6] to-[#7ab9e5]",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    objectType: "cup",
  },
];

interface HeroCarouselProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

export function HeroCarousel({ currentSlide, setCurrentSlide }: HeroCarouselProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, setCurrentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((currentSlide + 1) % carouselSlides.length);
  }, [currentSlide, setCurrentSlide]);

  const slide = carouselSlides[currentSlide];

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden transition-all duration-700",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-800",
          slide.gradient
        )}
      />

      {/* 3D Object Placeholder - Using styled div for visual effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[70%] h-[70%] flex items-center justify-center">
          {slide.objectType === "character" && (
            <div className="relative w-80 h-80">
              {/* Cute character ball */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#e8e5e0] via-[#d5d2cd] to-[#c5c2bd] shadow-2xl" />
              {/* Eyes */}
              <div className="absolute top-1/3 left-1/4 w-10 h-14 rounded-full bg-gradient-to-b from-[#3a3030] to-[#2a2020]">
                <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-white/60" />
              </div>
              <div className="absolute top-1/3 right-1/4 w-10 h-14 rounded-full bg-gradient-to-b from-[#3a3030] to-[#2a2020]">
                <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-white/60" />
              </div>
              {/* Blush */}
              <div className="absolute top-[45%] left-[15%] w-6 h-4 rounded-full bg-[#d4a49a] opacity-70" />
              <div className="absolute top-[45%] right-[15%] w-6 h-4 rounded-full bg-[#d4a49a] opacity-70" />
              {/* Smile */}
              <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-8 h-4 border-b-4 border-[#3a3030] rounded-b-full" />
              {/* Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/20 rounded-full blur-lg" />
            </div>
          )}
          {slide.objectType === "abstract" && (
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-[#7aabab] via-[#5a8a8a] to-[#3a6a6a] shadow-2xl animate-pulse" />
              <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-white/20 blur-xl" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/20 rounded-full blur-lg" />
            </div>
          )}
          {slide.objectType === "cup" && (
            <div className="relative w-56 h-72">
              {/* Coffee cup */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-56 bg-gradient-to-b from-[#d94c3d] via-[#c13d30] to-[#a32e23] rounded-b-3xl rounded-t-xl shadow-2xl" />
              {/* Cup rim */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-16 bg-gradient-to-b from-[#e8e5e0] to-[#d5d2cd] rounded-t-xl rounded-b-[50%]" />
              {/* Inner */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-44 h-10 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] rounded-full" />
              {/* Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/30 rounded-full blur-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Featured Badge */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <Star className="w-3 h-3 text-white fill-white" />
          <span className="text-white text-xs font-medium">Featured</span>
        </div>
      </div>

      {/* Content at bottom */}
      <div className="absolute bottom-16 left-8 right-8">
        <h3 className="text-white text-xl font-display font-bold mb-1">
          {slide.title}
        </h3>
        <p className="text-white/70 text-sm">{slide.category}</p>
      </div>

      {/* Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute bottom-16 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:bg-white/20 hover:scale-105"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-6 left-8 flex items-center gap-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
