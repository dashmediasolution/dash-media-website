import { Faq } from "@/components/socialsections/Social-Faq";
import { Testimonials } from "@/components/socialsections/SocialTestimonials";
import { SocialToolkits } from "@/components/socialsections/SocialToolKits";
import { SocialStrategySection } from "@/components/socialsections/SocialStrategySection";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing Services in USA: Dash Media Solutions",
  description: "Boost your brand with social media marketing services in USA. We skip the fluff to focus on real growth and ROI. See how Dash Media makes social work for you.",
  keywords: ["Social Media Marketing Services in USA", "Digital Marketing Agency in USA", "Digital Marketing Services in USA"],
};

const socialMediaItems = [
  "Maximize Your Social Reach",
  "Expert Social Media Marketing Services in USA",
  "High-Performance Ad Strategies",
  "Premier Digital Marketing Agency in USA",
  "Growth-Led Social Media Marketing Services in USA",
  "Connect, Convert, and Scale",
  "Strategic Social Media Marketing Services in USA",
  "Viral Strategies, Real Results",
  "Your Trusted Digital Marketing Agency in USA",
  "Dominating the Social Landscape",
  "Engage Your Digital Audience",
  "Top Social Media Marketing Services in USA",
  "Build Trust, Drive Results",
  "Partner with a Digital Marketing Agency in USA",
  "Modern Social Media Marketing Services in USA",
  "Elevate Your Brand Authority",
  "Scale with Social Media Marketing Services in USA",
  "Innovative Content for Every Platform",
  "Leading Digital Marketing Agency in USA",
  "Data-Driven Social Success"
];

export default function SocialMediaServicePage() {
  return (
    <>
      <SocialStrategySection/>
      <SocialToolkits/>
      <MarqueeSeparator items={socialMediaItems} />
      <Testimonials/>
      <Faq/>
    </>
  );
}