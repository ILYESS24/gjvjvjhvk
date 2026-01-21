import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Luminary Brand Identity",
    category: "Branding",
    description: "Complete brand overhaul for a sustainable fashion startup",
    gradient: "from-[#5a8a8a] to-[#7aabab]",
  },
  {
    id: 2,
    title: "Nordic Dashboard",
    category: "Web Design",
    description: "Analytics platform with intuitive data visualization",
    gradient: "from-[#8b7fdb] to-[#a099db]",
  },
  {
    id: 3,
    title: "Zenith Mobile App",
    category: "Product Design",
    description: "Meditation app focused on user wellness and engagement",
    gradient: "from-[#d4876e] to-[#e8a090]",
  },
  {
    id: 4,
    title: "Craft Coffee Website",
    category: "Web Development",
    description: "E-commerce platform for artisan coffee roasters",
    gradient: "from-[#6b7a99] to-[#8a8f99]",
  },
];

export function ProjectsSection() {
  const [isVisible] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full px-6 lg:px-12 py-8 overflow-y-auto">
      {/* Header */}
      <div
        className={cn(
          "flex items-end justify-between mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div>
          <span className="inline-block px-4 py-1.5 bg-secondary text-foreground text-sm font-medium rounded-full mb-4">
            Selected Work
          </span>
          <h1 className="font-display font-extrabold text-3xl lg:text-4xl">
            Featured Projects
          </h1>
        </div>
        <button className="flex items-center gap-2 text-foreground font-medium text-sm hover:text-muted-foreground transition-colors">
          View all
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={cn(
              "group relative cursor-pointer transition-all duration-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div
              className={cn(
                "relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300",
                hoveredProject === project.id ? "shadow-xl scale-[1.02]" : "shadow-md"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-all duration-500",
                  project.gradient
                )}
              />
              {/* Decorative shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm" />
                <div className="absolute w-16 h-16 rounded-full bg-white/20 top-1/4 right-1/4" />
              </div>
              {/* Arrow */}
              <div
                className={cn(
                  "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300",
                  hoveredProject === project.id
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : "opacity-0 translate-x-2 -translate-y-2"
                )}
              >
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            {/* Content */}
            <div className="mt-3">
              <span className="inline-block px-2 py-0.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full mb-1">
                {project.category}
              </span>
              <h3 className="font-display font-bold text-base mb-0.5 group-hover:text-muted-foreground transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-xs line-clamp-1">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
