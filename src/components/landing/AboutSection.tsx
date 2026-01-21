import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "150+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="min-h-screen bg-background py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div
            className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6b7a99] via-[#8a8f99] to-[#9b9b9b]" />
              {/* Abstract shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent" />
                  <div className="absolute top-8 left-8 w-48 h-48 rounded-full bg-gradient-to-b from-[#e8e5e0] via-[#d5d2cd] to-[#c5c2bd] shadow-2xl" />
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4876e]/20 rounded-full blur-3xl" />
          </div>

          {/* Right - Content */}
          <div
            className={cn(
              "transition-all duration-700 delay-150",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <span className="inline-block px-4 py-1.5 bg-secondary text-foreground text-sm font-medium rounded-full mb-6">
              About Me
            </span>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl mb-6 leading-tight">
              Crafting digital experiences with passion and precision
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              I'm a product designer and developer based in Amsterdam, focused on creating meaningful digital experiences. With over 8 years of experience, I blend strategic thinking with creative execution to help brands stand out in the digital landscape.
            </p>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              My approach combines user-centered design principles with cutting-edge technology, ensuring every project delivers both aesthetic beauty and functional excellence.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "transition-all duration-700",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="font-display font-extrabold text-3xl lg:text-4xl text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
