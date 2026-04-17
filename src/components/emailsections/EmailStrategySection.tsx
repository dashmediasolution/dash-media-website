'use client';

import { MarqueeSeparator } from "../ui/marquee-separator";
import Image from "next/image";
 
const strategyData = [
  {
    id: "01",
    title: "Enhanced Audience Research",
    description: "We create relevant email templates to fetch user details, understanding the key metrics, such as the expectations, preferences, and more.",
    image: "/images/strategy/discovery.png", 
    imageBg: "bg-blue-50/50",
    bgColor: "bg-white",
  },
  {
    id: "02",
    title: "Campaign Design",
    description: "We design emails to meet the relevant objectives of brands, whether it is to improve sales, reach a new audience, or even retarget the existing one.",
    image: "/images/strategy/planning.png", 
    imageBg: "bg-purple-50/30",
    bgColor: "bg-white",
  },
  {
    id: "03",
    title: "Advanced Marketing Automation",
    description: "Our team of experts assists companies in automating email marketing strategies so that they can communicate effectively with their clients.",
    image: "/images/strategy/launch.png", 
    imageBg: "bg-emerald-50/30",
    bgColor: "bg-white",
  },
  {
    id: "04",
    title: "Analysis & Reporting",
    description: "We analyze the marketing campaign results to learn about the users' metrics. Further, we use those results to improve upcoming campaign performance.",
    image: "/images/strategy/analysis.png", 
    imageBg: "bg-rose-50/50",
    bgColor: "bg-white",
  }
];

export function EmailStrategySection() {
  return (
    <main className="min-h-screen bg-white">
      {/* --- Editorial Header Section --- */}
      <section className="bg-blue-50 pt-32 pb-17 md:pt-40 md:pb-25 border-b border-black/5">
        <div className="container mx-auto px-5 sm:px-20">
          <header className="text-center">
            <span className="text-md font-bold tracking-[0.4em] uppercase text-muted-foreground mb-4 block">
              Our Services
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-[75px] font-semibold tracking-tighter text-primary uppercase leading-none">
              Boost Your Sales with Email <br />
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Marketing Services in USA
              </span>
            </h2>
          </header>
        </div>
      </section>

      <MarqueeSeparator/>

      {/* --- Refined Abstract Grid --- */}
      <section className="py-10 relative z-10">
        <div className="container mx-auto px-5 sm:px-10">
          {/* Changed to a balanced 2-column grid on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {strategyData.map((step) => (
              <div 
                key={step.id} 
                className={`group relative rounded-xl border-none p-8 md:p-10 overflow-hidden flex flex-row items-center transition-all duration-700 min-h-[320px] ${step.bgColor}`}
              >
                {/* 1. LEFT SIDE: CONTENT */}
                <div className="relative z-10 flex flex-col w-3/5 pr-4">
                  <span className="text-[10px] font-black text-primary/30 tracking-widest mb-4 block uppercase">
                    PHASE {step.id}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-semibold text-primary mb-3 tracking-tighter leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium opacity-80 max-w-[280px]">
                    {step.description}
                  </p>
                </div>

                {/* 2. RIGHT SIDE: IMAGE */}
                <div className="relative w-2/5 h-full min-h-[220px] transition-all duration-1000 group-hover:scale-110 pointer-events-none">
                  {/* Soft Color Glow */}
                  <div className={`w-full h-full rounded-full blur-[80px] absolute opacity-60 ${step.imageBg}`} />
                  
                  <div className="relative w-full h-full">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain object-right"
                      priority={step.id === "01"}
                    />
                  </div>
                </div>

                {/* Glass Highlight Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}