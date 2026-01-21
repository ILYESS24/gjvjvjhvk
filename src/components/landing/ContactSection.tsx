import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [isVisible] = useState(true);

  return (
    <div className="flex flex-col h-full px-6 lg:px-12 py-8 overflow-y-auto">
      <div
        className={cn(
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        {/* Header */}
        <h1 className="font-display font-extrabold text-4xl lg:text-5xl mb-4 leading-tight">
          Let's talk
        </h1>
        <p className="text-muted-foreground text-base mb-8 max-w-md leading-relaxed">
          I'd love to hear from you! Whether you have a question, a project in mind, or just want to say hi, feel free to reach out.
        </p>

        {/* Form */}
        <form className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Axel Smith"
                className="w-full px-4 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="hi@axel.com"
                className="w-full px-4 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-all"
              />
            </div>
          </div>

          {/* Company & Budget Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="Dream Studio"
                className="w-full px-4 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project budget
              </label>
              <select className="w-full px-4 py-3 bg-transparent border-b border-border text-muted-foreground focus:outline-none focus:border-foreground transition-all appearance-none cursor-pointer">
                <option value="">Select your budget</option>
                <option value="5k">$5,000 - $10,000</option>
                <option value="10k">$10,000 - $25,000</option>
                <option value="25k">$25,000 - $50,000</option>
                <option value="50k">$50,000+</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              How I can help?
            </label>
            <textarea
              placeholder="Tell me about your company needs"
              rows={4}
              className="w-full px-4 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-all resize-none"
            />
          </div>

          {/* Submit Row */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-foreground text-background font-medium rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              Get in touch
            </button>
            
            {/* Response time indicator */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>Avg. response: <span className="text-foreground font-medium">24h</span></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
