import { Faq } from "@/components/contentsections/Content-Faq";
import { Testimonials } from "@/components/contentsections/ContentTestimonials";
import { ContentToolkits } from "@/components/contentsections/ContentToolKits";
import { ContentStrategySection } from "@/components/contentsections/ContentStrategySection";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Marketing Services in USA | Dash Media Solutions",
  description: "Our best content marketing services in USA offer brands to improve their storytelling by data-driven strategies and SEO techniques to enhance reach and ROI.",
  keywords: ["Content Marketing Services in USA", "Digital Marketing Services in USA", "Digital Marketing Agency in USA"],
  alternates: {
    canonical: "https://dashmediasolutions.com/services/content-marketing",
  },
}

const contentMarketingItems = [
  "Growth with Content Marketing Services in USA",
  "Data-Driven Storytelling Excellence",
  "Boost Your Reach With Our Digital Marketing Agency in USA",
  "Strategic Inbound Marketing Solutions",
  "High-Authority Content Marketing Services in USA",
  "Build Trust Through Expert Content",
  "Leading Content Marketing Services in USA",
  "Master Your Brand’s Voice",
  "Exceptional Digital Marketing Agency in USA",
  "Top Content Marketing Services in USA",
  "Drive Measurable Customer Engagement",
  "Premium Content Marketing Services in USA",
  "Innovative Social Media Content Strategies",
  "Boost ROI with Our Digital Marketing Agency in USA",
  "Creative Copywriting That Converts",
  "Expert Digital Marketing Services in USA",
  "Scale Your Online Authority Fast",
  "Proven Content Marketing Services in USA",
  "Sustainable Brand Growth Through Content",
  "Action-Oriented Digital Marketing Agency in USA"
];

export default function ContentMarketingServicePage() {
  return (
    <>
     <h1 className="sr-only">Content Marketing Services in USA | Dash Media Solutions</h1>
     <ContentStrategySection/>
     <ContentToolkits/>
      <MarqueeSeparator items={contentMarketingItems} />
      <Testimonials/>
      <Faq/>
    </>
  );
}