'use client';

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/ModalProvider";
import { MarqueeSeparator } from "../ui/marquee-separator";

const teamImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200",
];

export function NewHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const { openModal } = useModal();
  const titles = useMemo(() => ["INNOVATIVE", "IMPACTFUL",], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <section className={cn("flex flex-col items-center overflow-hidden w-full bg-white")}>

      {/* --- TOP SECTION --- */}
      <div className="w-full bg-blue-50 pt-35 pb-20">
        <div className="container mx-auto px-5 max-w-7xl">

          {/* 1. Heading - Standardized Two-Line Layout */}
          <div className="w-full text-center mb-10">
            <h1 className="items-center justify-center text-5xl md:text-6xl lg:text-[90px] font-semibold tracking-[-0.05em] leading-[1] text-primary uppercase">

              We Create {" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                impactful
              </span>
              {" "} digital solutions
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-5 items-stretch">

            {/* ✅ LEFT CARD: SEO Dominance 
            Layout: Text Top / Image "Falling" off bottom
            */}
            {/* LEFT CARD: Web Traffic & Performance */}
            <div className="md:col-span-4 relative rounded-xl overflow-hidden group min-h-[500px] bg-white border-none shadow-lg flex flex-col p-10 ">

              <div className="relative z-10 flex flex-col h-full">
                {/* 1. Header Section - Keeping your new style */}
                <div className="mb-12">
                  <h3 className="text-7xl font-semibold text-primary tracking-tighter leading-none mb-6">
                    10+
                  </h3>
                  <p className="text-sm text-muted-foreground leading-snug font-medium max-w-[300px]">
                    expert digital marketing solutions that offer tailored strategy, design, and performance management.
                  </p>
                </div>

                {/* 3. Reverted Overflowing Image (Full width bottom clipped) */}
                <div className="absolute -bottom-12 inset-x-0 h-[30%] sm:h-[70%] z-10">
                  <div className="relative w-full h-full rounded-t-xl overflow-hidden ">
                    <Image
                      src="/images/emoji.png"
                      alt="Performance Analytics"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>


            {/* ✅ CENTER COLUMN: Lead Generation */}
            <div className="md:col-span-3 flex flex-col gap-5 z-20">

              {/* Upper Text Area */}
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-md font-medium text-muted-foreground leading-relaxed mb-4 ">
                  Best Marketing Agency for Developing Digital
                  Campaigns
                </p>
                <div className="w-full px-4">
                  <Button onClick={openModal} className="w-fit rounded-full h-10 text-sm font-bold bg-primary hover:bg-primary/80 transition-colors">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Lead Gen / Team Card - Avatars placed below the stat */}
              <div className="relative rounded-xl overflow-hidden group flex-grow min-h-[350px] bg-white border-none shadow-xl flex flex-col p-8 ">

                <div className="relative z-10 flex flex-col h-full">
                  {/* 1. Header Section */}
                  <div className="mb-6 mt-6">
                    {/* Stat Heading */}
                    <h3 className="text-7xl font-semibold text-primary tracking-tighter leading-none mb-6">
                      25+
                    </h3>

                    {/* 2. Avatar Stack - Moved below the heading */}
                    <div className="flex -space-x-2">
                      {teamImages.map((src, i) => (
                        <div
                          key={i}
                          className="relative w-12 h-12 rounded-full overflow-hidden"
                        >
                          <Image
                            src={src}
                            alt="Team member"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {/* Optional: Add the +12 bubble if needed to match the 40+ logic */}
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-white shadow-sm relative z-10">
                        +12
                      </div>
                    </div>
                  </div>

                  {/* 3. Description Section */}
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      Our team members ensure that your project stands out by applying industry best practices and performance-driven strategic insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* ✅ RIGHT CARD: Web Traffic 
      Layout: Text Top / Image "Falling" off bottom
  */}
            {/* RIGHT CARD: Our Services & Traffic Stats */}
            {/* RIGHT CARD: Our Services & Expertise */}
            <div className="md:col-span-4 bg-white rounded-xl p-10 flex flex-col border-none shadow-xl  min-h-[500px] relative overflow-hidden">


              <div className="relative z-10 flex flex-col h-full">
                {/* 1. Header Section */}
                <div className="mb-16">
                  <h3 className="text-xl font-bold text-primary mb-5">About Us</h3>
                  <p className="text-sm text-muted-foreground leading-snug font-normal max-w-[340px]">
                    We offer exceptional marketing solutions to our clients, upholding their requests and satisfaction as the utmost priority while delivering excellent analytical results.
                  </p>
                </div>

                {/* 2. Main Title Section */}
                <div className="mb-10 mt-auto">
                  <h2 className="text-5xl font-semibold text-primary tracking-tighter leading-none">
                    Expertise In
                  </h2>
                </div>

                {/* 3. Services Pills Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  {[
                    { label: "Web design" },
                    { label: "SEO" },
                    { label: "Content" },
                    { label: "Email" }
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-transparent rounded-full py-4 px-6 border border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer group"
                    >
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {service.label}
                      </span>

                      {/* Arrow Container */}
                      <div className="text-primary transition-transform duration-300 ease-in-out group-hover:-rotate-45">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* --- Separator --- */}
      <div className="w-full">
        <MarqueeSeparator />
      </div>

      <div className="w-full pb-10">
        <div className="px-5 md:px-20 hidden container mx-auto lg:block mt-20 relative animate-appear opacity-0 [animation-delay:500ms]">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-regular font-heading text-primary tracking-tight pb-4 md:pb-8 text-center md:text-left">
            Our <span
              className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
              style={{ backgroundSize: "300% 100%" }}
            >
              Latest Work
            </span>
          </h2>
          <MockupFrame>
            <Mockup type="responsive">
              <Image
                src="/images/our-work-dms.png"
                alt="Dash Media SEO Dashboard"
                width={1600}
                height={1043}
                className=""
                priority
              />
            </Mockup>
          </MockupFrame>
          <div
            className="absolute bottom-0 left-0 right-0 w-full h-1/2"
            style={{
              background: "linear-gradient(to top, hsl(var(--background)) 20%, transparent 100%)",
              zIndex: 10,
            }}
          />
        </div>
      </div>


    </section>
  );
}