
import { PpcStrategySection } from "@/components/ppcsections/PpcStrategySection";
import { Testimonials } from "@/components/ppcsections/PpcTestimonials";
import { PpcToolkits } from "@/components/ppcsections/PpcToolKits";
import { Faq } from "@/components/ppcsections/Ppc-Faq";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Pay Per Click Services in USA | Dash Media Solutions",
  description: "Stop wasting your ad budget. Our pay per click services in USA drive high-intent leads and instant sales with precision targeting and expert PPC audits.",
  keywords: ["Pay Per Click Services in USA", "Digital Marketing Agency in USA", "Digital Marketing Services in USA"],
};

const ppcItems = [
  "Top Rated Pay Per Click Services in USA",
  "Partner with a Digital Marketing Agency in USA",
  "Ads That Actually Convert",
  "Top Pay Per Click Services in USA",
  "High-Intent Lead Generation",
  "Expert Pay Per Click Services in USA",
  "Precision Targeted Campaigns",
  "Leading Digital Marketing Agency in USA",
  "Smart Spend, Better Results",
  "Premium Pay Per Click Services in USA",
  "Scale Your Brand Today",
  "Effective Pay Per Click Services in USA",
  "Instant Search Presence",
  "Your Trusted Digital Marketing Agency in USA",
  "Stop Wasting Ad Budget",
  "Strategic Pay Per Click Services in USA",
  "Leverage Every Single Click",
  "Premier Digital Marketing Agency in USA",
  "Data-Driven Ad Success",
  "Scalable Pay Per Click Services in USA",
  "Dominate Your Market"
];

export default function PpcServicePage() {
  return (
    <>
    <PpcStrategySection/>
    <PpcToolkits/>
    <MarqueeSeparator items={ppcItems} />
    <Testimonials/>
    <Faq/>
    </>
  );
}