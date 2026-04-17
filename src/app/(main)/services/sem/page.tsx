import { SemStrategySection } from "@/components/semsections/SemStrategySection";
import { Testimonials } from "@/components/semsections/SemTestimonials";
import { SemToolkits } from "@/components/semsections/SemToolKits";
import { Faq } from "@/components/semsections/Sem-Faq";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Engine Marketing in USA | Dash Media Solutions",
  description: "Drive instant traffic with expert Search Engine Marketing services in USA. Dash Media Solutions offers ROI-focused ads and data-driven SEM strategies. Grow today!",
  keywords: ["Search Engine Marketing Services in USA", "Digital Marketing Agency in USA", "Digital Marketing Services in USA"],
};

const semItems = [
  "Top Search Engine Marketing Services in USA",
  "Instant Search Visibility",
  "Partner with a Digital Marketing Agency in USA",
  "Get Noticed Immediately",
  "Expert Search Engine Marketing Services in USA",
  "Stop Waiting for Traffic",
  "Leading Digital Marketing Agency in USA",
  "Dominate the Top Spot",
  "Premium Search Engine Marketing Services in USA",
  "Ads That Drive Revenue",
  "Proven Search Engine Marketing Services in USA",
  "Precision Targeted Ads",
  "Your Trusted Digital Marketing Agency in USA",
  "Maximize Your Ad Spend",
  "Strategic Search Engine Marketing Services in USA",
  "Smart Clicks, Better Leads",
  "Premier Digital Marketing Agency in USA",
  "Data-Driven Ad Growth",
  "Scalable Search Engine Marketing Services in USA",
  "ROI-Focused Strategies"
];

export default function SemServicePage() {
    return (
        <>
            <SemStrategySection />
            <SemToolkits />
            <MarqueeSeparator items={semItems} />
            <Testimonials />
            <Faq />
        </>
    );
}