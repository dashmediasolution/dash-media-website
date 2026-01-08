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
    title: "1. Campaign Goal & KPI Setting",
    description: "We start by defining clear, measurable goals for your SEM campaigns, whether it's lead generation, online sales, or brand awareness, and establish the KPIs to track success.",
    image: "/images/stats.png",
    metrics: [
      { value: "100%", label: "Goal-Oriented Campaigns", sub: "Aligned with your business objectives" },
      { value: "15+", label: "KPIs Tracked", sub: "For comprehensive performance analysis" },
    ],
  },
  {
    id: 2,
    title: "2. Keyword Research & Ad Creation",
    description: "Our team conducts in-depth keyword research to target high-intent users and writes compelling ad copy that grabs attention and encourages clicks.",
    image: "/images/stats.png",
    metrics: [
      { value: "Top 50", label: "High-Conversion Keywords", sub: "Identified and targeted" },
      { value: "3x", label: "Higher Ad Click-Through Rate", sub: "Compared to industry benchmarks" },
    ],
  },
  {
    id: 3,
    title: "3. Bid Management & A/B Testing",
    description: "We use advanced bidding strategies to maximize your ad spend and continuously A/B test ad elements to improve your Quality Score and lower your costs.",
    image: "/images/stats.png",
    metrics: [
      { value: "25%", label: "Lower Cost-Per-Click", sub: "Through strategic bid management" },
      { value: "9/10", label: "Average Quality Score", sub: "For primary ad groups" },
    ],
  },
  {
    id: 4,
    title: "4. Performance Analytics & ROI Reporting",
    description: "You receive detailed, transparent reports that track every aspect of your campaign's performance, focusing on what matters most: your Return on Investment (ROI).",
    image: "/images/stats.png",
    metrics: [
      { value: "5:1", label: "Average Return on Ad Spend", sub: "Across our SEM campaigns" },
      { value: "100%", label: "Data Transparency", sub: "With custom performance dashboards" },
    ],
  },
];

export function SemStrategySection() {
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
              Search Engine Marketing
            </span>
          </h2>

          <p className="text-muted-foreground px-5 sm:px-0 max-w-3xl text-md sm:text-lg leading-relaxed">
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
                      <p className=" text-md md:text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                  </div>
                </div>

                {/* Metrics */}
                  <div
                  className={cn(
                    "grid grid-cols-1 gap-6 self-center text-left p-8 lg:p-5",
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