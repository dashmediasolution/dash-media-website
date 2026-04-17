"use client";

import { useState } from "react";
import { Briefcase, Layout, Mail, Target, ChevronDown, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { toast } from "sonner";

export default function GrowthPlanForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      websiteUrl: formData.get("websiteUrl"),
      email: formData.get("email"),
      mobileNumber: formData.get("mobileNumber"),
      service: formData.get("service"),
      requirements: formData.get("requirements"),
    };

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Strategy plan requested successfully! We'll be in touch.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to request plan. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Company Name</label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70 group-focus-within/input:text-primary transition-colors">
              <Briefcase size={18} />
            </div>
            <input name="name" type="text" required className="w-full pl-11 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/70 text-foreground font-medium" placeholder="e.g. Acme Corp" />
          </div>
        </div>

        {/* Website URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Website URL</label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70 group-focus-within/input:text-primary transition-colors">
              <Layout size={18} />
            </div>
            <input name="websiteUrl" type="url" required className="w-full pl-11 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/70 text-foreground font-medium" placeholder="https://example.com" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Work Email</label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70 group-focus-within/input:text-primary transition-colors">
              <Mail size={18} />
            </div>
            <input name="email" type="email" required className="w-full pl-11 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/70 text-foreground font-medium" placeholder="you@company.com" />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Mobile Number</label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70 group-focus-within/input:text-primary transition-colors">
              <Phone size={18} />
            </div>
            <input name="mobileNumber" type="tel" required className="w-full pl-11 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/70 text-foreground font-medium" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
      </div>

      {/* Service & Budget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Primary Goal</label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70 group-focus-within/input:text-primary transition-colors">
              <Target size={18} />
            </div>
            <select name="service" className="w-full pl-11 pr-10 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none text-foreground font-medium invalid:text-muted-foreground/70" required defaultValue="">
              <option value="" disabled hidden>Select goal</option>
              <option value="seo" className="text-foreground">More Organic Traffic</option>
              <option value="ppc" className="text-foreground">Better Ad Returns</option>
              <option value="web" className="text-foreground">New Website</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Est. Budget</label>
          <div className="relative group/input">
            <select name="requirements" className="w-full pl-4 pr-10 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none text-foreground font-medium invalid:text-muted-foreground/70" required defaultValue="">
              <option value="" disabled hidden>Select budget</option>
              <option value="1k-5k" className="text-foreground">$1k - $5k / mo</option>
              <option value="5k-10k" className="text-foreground">$5k - $10k / mo</option>
              <option value="10k+" className="text-foreground">$10k+ / mo</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 pointer-events-none" />
          </div>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="w-full py-4 mt-4 bg-primary text-primary-foreground font-bold text-lg rounded-2xl hover:bg-accent hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed">
        {isLoading ? "Submitting..." : "Get my strategy plan"}
        {!isLoading && <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
      </button>
      <p className="text-center text-xs text-muted-foreground/70 mt-4 flex items-center justify-center gap-1.5">
        <CheckCircle2 size={14} className="text-green-500" /> No commitment required. 100% free.
      </p>
    </form>
  );
}