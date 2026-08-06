'use client';

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react"; // Using Lucide icons for the star

const services = [
"Full-Funnel Search Engine Visibility",
"Algorithmic Search Optimization",
'Modern High-Performance Web Development',
'Brand Storytelling &amp; Thought Leadership',
'Full-Funnel Social Brand Building',
'High-Impact Commercial Video Production',
'Contextual Native Ad Targeting',
'Enterprise Custom Software &amp; App Development',
'Full-Stack Digital Marketing Agency in USA',
'Performance Search Advertising &amp; Retargeting',
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