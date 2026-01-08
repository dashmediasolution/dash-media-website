'use client';

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";

export function NewHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const { openModal } = useModal();
  const titles = useMemo(
    () => ["INNOVATIVE", "IMPACTFUL", "CREATIVE"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <section className={cn("flex flex-col items-center pt-45 sm:pt-35 pb-10 bg-gradient-to-b from-blue-50 to-gray-50 overflow-hidden")}>
      <div className="container mx-auto px-4 md:px-6">
        {/* ✅ FIX 1: Added px-4 to prevent edge-to-edge text touching screen sides */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10 lg:gap-6 items-center">

          {/* Left Column: Heading, Description, Button */}
          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left lg:col-span-2 gap-4 md:gap-9">
            {/* Heading */}
            <h1
              className={cn(
                "animate-appear",
                "text-5xl lg:text-8xl", // ✅ FIX 2: Smoother responsive font scaling
                "font-regular tracking-tight leading-tight",
              )}
            >
              <span className="block text-primary">We Create</span>
              <span className="relative block h-[1.2em] font-semibold">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-x-0 lg:inset-x-auto bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient"
                    style={{ backgroundSize: "300% 100%" }}
                    initial={{ opacity: 0 }}
                    animate={titleNumber === index ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="block text-primary">Digital Solutions</span>
            </h1>

            {/* Description */}
            <p
              className="max-w-xl text-base sm:text-lg md:text-xl text-muted-foreground animate-appear opacity-0 [animation-delay:150ms] px-2 sm:px-0"
            >
              From concept to conversion, we craft digital solutions that elevate your brand and engage your audience.
            </p>

            {/* CTA Button */}
            <div className="animate-appear opacity-0 [animation-delay:300ms] w-full sm:w-auto">
              <Button size="lg" onClick={openModal} className="w-[60%] sm:w-auto">
                Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>


          {/* Right Column: Images */}
          <div className="lg:flex flex-col items-center justify-center gap-4 animate-appear opacity-0 [animation-delay:500ms] lg:col-span-1">

            {/* Image 1: Man with Book (Main) */}
            <div className="relative w-full h-[290px] sm:h-[350px]">
              <Image
                src="/images/stats-removebg.png"
                alt="Hero Section Illustration 1"
                fill
                priority // Keep priority because this is "Above the Fold"
                sizes="(max-width: 1024px) 100vw, 50vw" // ✅ Perfect size calculation
                className="rounded-xl object-contain" // Moved objectFit here
              />
            </div>

            {/* Image 2: Stats Card (Secondary) */}
            <div className="hidden sm:block relative w-full h-[130px] sm:h-[190px]">
              <Image
                src="/images/stats-2-removebg.png"
                alt="Hero Section Illustration 2"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw" // ✅ Perfect size calculation
                className="rounded-lg object-contain"
              />
            </div>

          </div>

        </div>

        {/* Our Latest Work section */}
        <div className=" hidden lg:block w-full max-w-full mt-20 md:mt-35 relative animate-appear opacity-0 [animation-delay:500ms]">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-regular font-heading text-primary tracking-tight pb-4 md:pb-8 text-center md:text-left">
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
                src="/images/dashboard.jpg"
                alt="Dash Media SEO Dashboard"
                width={1600}
                height={1043}
                className="h-auto"
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