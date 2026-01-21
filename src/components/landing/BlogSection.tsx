import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    category: "Tutorials",
    title: "How We Collaborate with Clients on Design Projects",
    description: "At the heart of every successful project is a strong partnership built on trust, transparency, and a shared vision.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  },
  {
    id: 2,
    category: "Inspiration",
    title: "Designing with Feeling: Why Emotion Is a Creative Superpower",
    description: "Behind every scroll, click, and tap is a human — with moods, memories, hopes, and fears. Great design doesn't just function. It feels like something. It moves people.",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80",
  },
  {
    id: 3,
    category: "Process",
    title: "The Art of Minimalism in Modern Web Design",
    description: "Less is more. Discover how restraint and intentionality create more powerful digital experiences.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export function BlogSection() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col h-full px-6 lg:px-12 py-8 overflow-y-auto">
      {/* Blog Post Cards */}
      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <article
            key={post.id}
            className={cn(
              "group cursor-pointer transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Image with rounded corners */}
            <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Category Tag */}
            <span className="inline-block px-3 py-1.5 bg-[#d4876e] text-white text-xs font-medium rounded-full mb-3">
              {post.category}
            </span>
            
            {/* Title */}
            <h3 className="font-display font-bold text-lg lg:text-xl mb-2 group-hover:text-muted-foreground transition-colors leading-tight">
              {post.title}
            </h3>
            
            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {post.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
