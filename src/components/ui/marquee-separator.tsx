'use client';

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react"; // Using Lucide icons for the star

const services = [
  "Elite SEO Services in USA",
  "The Best Digital Marketing Agency in USA",
  "Expert USA SEO Marketing Services",
  "Data-Driven Performance Marketing",
  "SEO Strategies That Scale",
  "Top Search Engine Optimization Services in USA",
  "Digital Marketing Services in USA to Boost Organic Traffic",
  "Search Engine Growth Experts",
  "Sustainable Ranking Excellence",
  "Maximize Your Organic Reach",
  "Scale with SEO Services in USA",
  "Data-Driven SEO Excellence",
  "Elevate Your Global Search Visibility",
  "Organic Growth with Our Digital Marketing Agency in USA",
  "Results-Driven SEO Services in USA",
  "Dominating Search Rankings Through Data",
  "Digital Marketing Agency in USA to Next-Level SEO",
  "Mastering Search Engine Performance Globally",
  "Comprehensive SEO Services in USA"
];

export function MarqueeSeparator({ items = services }: { items?: string[] }) {
  return (
    <div className="w-full bg-primary py-4 overflow-hidden border-y border-white/10 relative z-10">
      
      <div className="flex whitespace-nowrap">
        <MarqueeContent items={items} />
        <MarqueeContent items={items} />
      </div>
    </div>
  );
}

function MarqueeContent({ items }: { items: string[] }) {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ 
        duration: 100, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="flex items-center flex-shrink-0"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className="text-white text-md font-semibold tracking-wider px-10 uppercase font-heading">
            {item}
          </span>
          <Sparkle className="text-white/70 w-5 h-5 md:w-6 md:h-6 fill-white/20" />
        </div>
      ))}
    </motion.div>
  );
}