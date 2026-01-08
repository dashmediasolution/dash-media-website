'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

// Avoid SSR hydration issues by loading react-countup on the client.
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

// Helper hook and functions (can be moved to a utils file if used elsewhere)
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match( /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/ );
  if (!m) return { prefix: "", end: 0, suffix: value, decimals: 0 };
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = (normalized.split(".")[1]?.length ?? 0);
  return { prefix, end, suffix, decimals };
}

function MetricStat({
  value,
  label,
  sub,
  duration = 2,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="flex flex-col gap-2 text-left">
      <p className="text-xl font-semibold text-primary sm:text-4xl">
        {prefix}
        {reduceMotion ? (
          <span>{end.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
        ) : (
          <CountUp end={end} decimals={decimals} duration={duration} separator="," enableScrollSpy scrollSpyOnce />
        )}
        {suffix}
      </p>
      <p className="font-medium text-primary text-left">{label}</p>
      {sub ? <p className="text-sm text-muted-foreground text-left">{sub}</p> : null}
    </div>
  );
}

// 1. Your Web developments Study data
const strategyData = [
  {
    id: 1,
    title: "1. Discovery & UI/UX Planning",
    description: "We begin by mapping out your user's journey, creating wireframes and a clear sitemap to ensure an intuitive and effective user experience (UI/UX).",
    image: "/images/stats.png",
    metrics: [
      { value: "50%", label: "Improved User Engagement", sub: "Projected from UI/UX audit" },
      { value: "99%", label: "Clarity in User Flow", sub: "Before a single line of code is written" },
    ],
  },
  {
    id: 2,
    title: "2. Visual Design & Prototyping",
    description: "Our team crafts a stunning visual identity that aligns with your brand. We create high-fidelity mockups and interactive prototypes for your approval.",
    image: "/images/stats.png",
    metrics: [
      { value: "100%", label: "Brand Guideline Adherence", sub: "Ensuring visual consistency" },
      { value: "3x", label: "Faster Design Iterations", sub: "Using interactive Figma prototypes" },
    ],
  },
  {
    id: 3,
    title: "3. Development & Launch",
    description: "We write clean, performance-optimized code to build your website. Our process ensures it's fully responsive, fast, and ready for launch.",
    image: "/images/stats.png",
    metrics: [
      { value: "95+", label: "Google PageSpeed Score", sub: "Optimized for core web vitals" },
      { value: "100%", label: "Mobile Responsiveness", sub: "Perfect display on all devices" },
    ],
  },
];

export function WebStrategySection() {
  return (
    <section className="pt-30 sm:pt-35 lg:pb-5 bg-gradient-to-b from-blue-50 to-gray-50" aria-labelledby="strategy-heading">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 mb-10 lg:mb-20 text-center">
          <h2 className="text-4xl lg:text-6xl font-regular font-heading text-primary px-2 sm:px-0">
            Our Proven Strategy For {" "}
            <br className="hidden lg:block" />
            <span
              className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
              style={{ backgroundSize: "300% 100%" }}
            >
              Web Development
            </span>
          </h2>

          <p className="text-muted-foreground max-w-3xl text-md sm:text-lg leading-relaxed px-5 sm:px-0">
            A 4-step process designed to deliver tangible results and sustainable growth.
          </p>
        </div>

        {/* Strategy Steps */}
        <div className="mt-10 md:mt-20 flex flex-col gap-10 md:gap-20">
          {strategyData.map((step, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={step.id}
                className="grid gap-10 lg:grid-cols-3 xl:gap-24 items-center "
              >
                {/* Text and Image */}
                <div
                  className={cn(
                    "flex flex-col sm:flex-row gap-10 lg:col-span-2 text-left items-center p-5 lg:p-3",
                    reversed 
                      ? "lg:order-last lg:border-l lg:pl-10 border-black/10" 
                      : "lg:border-r border-black/10 lg:pr-10"
                  )}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={500}
                    height={760}
                    priority
                    className=" rounded-2xl object-cover ring-1 ring-border hover:scale-105 transition-all duration-300"
                  />
                  {/* ✅ 2. Replaced the quote/figcaption with strategy details */}
                  <div className="flex flex-col justify-between gap-6 text-left">
                      <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                        {step.title}
                      </h3>
                      <p className=" text-md lg:text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                  </div>
                </div>

                {/* Metrics */}
                  <div
                  className={cn(
                    "grid grid-cols-1 gap-6 self-center text-left p-5",
                    reversed && "lg:order-first"
                  )}
                >
                  {step.metrics.map((metric, i) => (
                    // ✅ FIX: Wrapped each MetricStat in a Card
                    <Card key={`${step.id}-${i}`} variant="neubrutalism" className="bg-background">
                        <CardContent className="p-0">
                            <MetricStat
                                value={metric.value}
                                label={metric.label}
                                sub={metric.sub}
                            />
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}