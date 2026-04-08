'use client';

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react"; // Using Lucide icons for the star

const services = [
  "Premier Digital Marketing Agency in USA.",
  "Scaling Brands Through Performance",
  "Data-Driven Digital Marketing Agency in USA",
  "Leading Digital Marketing Experts",
  "Expert Digital Marketing Services in USA",
  "Drive Measurable Business Growth",
  "The Best Digital Marketing Agency in USA",
  "Premium Performance Marketing Solutions",
  "Strategic Growth. Expert Results.",
  "Full-Stack Digital Marketing Agency in USA",
];

export function MarqueeSeparator() {
  return (
    <div className="w-full bg-primary py-4 overflow-hidden border-y border-white/10 relative z-10">
      
      <div className="flex whitespace-nowrap">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}

function MarqueeContent() {
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
      {services.map((item, index) => (
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