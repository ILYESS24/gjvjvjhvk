import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Logo,
  Navigation,
  HeroCarousel,
  HeroContent,
  ProjectsSection,
  BlogSection,
  ContactSection,
} from "./landing";

type PageType = "home" | "about" | "projects" | "blog" | "contact";

function Home() {
  const [isDark, setIsDark] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  // Initialize dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <div
      className={cn(
        "h-screen w-full overflow-hidden transition-colors duration-300 bg-background p-4",
        isDark ? "dark" : ""
      )}
    >
      {/* Main Container with rounded corners */}
      <div className="h-full w-full flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Left Panel - Visual */}
        <div className="h-[40vh] lg:h-full lg:w-1/2 relative rounded-3xl overflow-hidden">
          <Logo />
          {currentPage === "home" && (
            <HeroCarousel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
          )}
          {currentPage === "about" && <AboutVisual />}
          {currentPage === "projects" && <ProjectsVisual />}
          {currentPage === "blog" && <BlogVisual />}
          {currentPage === "contact" && <ContactVisual />}
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 lg:h-full lg:w-1/2 bg-background flex flex-col overflow-hidden">
          {/* Navigation */}
          <Navigation 
            isDark={isDark} 
            onThemeToggle={handleThemeToggle} 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {currentPage === "home" && <HeroContent onNavigate={handlePageChange} />}
            {currentPage === "about" && <AboutContent />}
            {currentPage === "projects" && <ProjectsSection />}
            {currentPage === "blog" && <BlogSection />}
            {currentPage === "contact" && <ContactSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

// About Visual - Left panel for About page
function AboutVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#6b7a99] via-[#8a8f99] to-[#9b9b9b] flex items-center justify-center">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent" />
        <div className="absolute top-8 left-8 w-48 h-48 rounded-full bg-gradient-to-b from-[#e8e5e0] via-[#d5d2cd] to-[#c5c2bd] shadow-2xl" />
      </div>
    </div>
  );
}

// Projects Visual - Left panel for Projects page
function ProjectsVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a5a4a] via-[#2a7a6a] to-[#3a9a8a] flex items-center justify-center">
      {/* Teal/green bowl - matching reference */}
      <div className="relative">
        <div className="w-72 h-36 bg-gradient-to-b from-[#2a8a7a] via-[#1a6a5a] to-[#0a4a3a] rounded-t-[50%] rounded-b-lg shadow-2xl" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-56 h-4 bg-gradient-to-b from-[#3aaa9a] to-[#2a9a8a] rounded-full" />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/30 rounded-full blur-xl" />
      </div>
    </div>
  );
}

// Blog Visual - Left panel for Blog page
function BlogVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#5a9bc7] via-[#6baad6] to-[#7ab9e5] flex flex-col">
      {/* Coffee cup render */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-56 h-72">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-56 bg-gradient-to-b from-[#d94c3d] via-[#c13d30] to-[#a32e23] rounded-b-3xl rounded-t-xl shadow-2xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-16 bg-gradient-to-b from-[#e8e5e0] to-[#d5d2cd] rounded-t-xl rounded-b-[50%]" />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-44 h-10 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] rounded-full" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/30 rounded-full blur-lg" />
        </div>
      </div>
      
      {/* Featured badge and title */}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-white text-xs font-medium">☆ Featured</span>
          </div>
        </div>
        <h3 className="text-white text-xl font-display font-bold leading-tight">
          Beyond the Pixels: Why We Interview Designers,
          <br />
          Makers, and Creative Thinkers
        </h3>
      </div>
    </div>
  );
}

// Contact Visual - Left panel for Contact page (orange arch scene)
function ContactVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#d97a45] via-[#c96a35] to-[#b95a25] flex flex-col">
      {/* Arch background */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-x-8 top-8 bottom-0 bg-gradient-to-b from-[#b95525] to-[#995015] rounded-t-[50%]" />
        
        {/* Desk scene */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          {/* Desk */}
          <div className="absolute bottom-0 left-8 right-8 h-24 bg-gradient-to-b from-[#e8e0d5] to-[#d8d0c5] rounded-t-lg" />
          
          {/* Lamp */}
          <div className="absolute bottom-24 right-1/3">
            <div className="w-20 h-16 bg-gradient-to-b from-[#f5a020] to-[#d58010] rounded-t-full" />
            <div className="w-3 h-16 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] mx-auto" />
          </div>
          
          {/* Picture frame */}
          <div className="absolute bottom-32 left-1/4 w-32 h-24 bg-gradient-to-br from-[#d8d0c5] to-[#c8c0b5] rounded-lg border-4 border-[#f8f0e5] flex items-center justify-center">
            <div className="w-20 h-14 bg-gradient-to-br from-[#e8a080] to-[#d89070] rounded" />
          </div>
          
          {/* Plant */}
          <div className="absolute bottom-24 left-12 w-16 h-20">
            <div className="absolute bottom-0 w-full h-8 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded" />
          </div>
          
          {/* Laptop */}
          <div className="absolute bottom-24 left-1/3 w-20 h-12 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] rounded-t-lg" />
        </div>
      </div>
      
      {/* Contact info */}
      <div className="px-8 py-6 flex gap-8 text-white/90 text-sm">
        <div>
          <div className="text-white/60 text-xs mb-1">Email</div>
          <div>hi@yoursite.com</div>
        </div>
        <div>
          <div className="text-white/60 text-xs mb-1">Phone</div>
          <div>(302) 555-6789</div>
        </div>
        <div>
          <div className="text-white/60 text-xs mb-1">Location</div>
          <div>Amsterdam, NL</div>
        </div>
      </div>
    </div>
  );
}

// About Content - Right panel for About page
function AboutContent() {
  return (
    <div className="flex flex-col justify-center h-full px-6 lg:px-12 py-8">
      <span className="inline-block px-4 py-1.5 bg-secondary text-foreground text-sm font-medium rounded-full mb-6 w-fit">
        About Me
      </span>
      <h1 className="font-display font-extrabold text-4xl lg:text-5xl mb-6 leading-tight">
        Crafting digital experiences with passion
      </h1>
      <p className="text-muted-foreground text-lg mb-6 leading-relaxed max-w-lg">
        I'm a product designer and developer based in Amsterdam, focused on creating meaningful digital experiences. With over 8 years of experience, I blend strategic thinking with creative execution.
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div>
          <div className="font-display font-extrabold text-3xl text-foreground mb-1">8+</div>
          <div className="text-muted-foreground text-sm">Years Experience</div>
        </div>
        <div>
          <div className="font-display font-extrabold text-3xl text-foreground mb-1">150+</div>
          <div className="text-muted-foreground text-sm">Projects</div>
        </div>
        <div>
          <div className="font-display font-extrabold text-3xl text-foreground mb-1">50+</div>
          <div className="text-muted-foreground text-sm">Happy Clients</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
