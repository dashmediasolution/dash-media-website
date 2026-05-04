
import { AppDevStrategySection } from "@/components/appdevsections/AppDevStrategySection";
import { AppDevToolkits } from "@/components/appdevsections/AppDevToolKits";
import { Faq } from "@/components/appdevsections/Appdev-Faq";
import { Testimonials } from "@/components/appdevsections/AppdevTestimonials";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Development Services in USA | Dash Media Solutions",
  description: "Partner with Dash Media Solutions for premier app development services in USA. We build secure and user-centric mobile and web apps tailored for growth.",
  keywords: ["App Development Services in USA", "Digital Marketing Agency in USA", "Digital Marketing Services in USA"],
  alternates: {
    canonical: "https://dashmediasolutions.com/services/app-development",
  },
};

const appDevItems = [
  "Top App Development Services in USA",
  "Apps Built for Growth",
  "Partner with a Digital Marketing Agency in USA",
  "From Concept to App Store",
  "Expert App Development Services in USA",
  "User-First Design Thinking",
  "Leading Digital Marketing Agency in USA",
  "Fast, Secure, and Scalable",
  "Premium App Development Services in USA",
  "Build Your Digital Future",
  "Proven App Development Services in USA",
  "Next-Gen Mobile Solutions",
  "Your Trusted Digital Marketing Agency in USA",
  "Seamless Cross-Platform UX",
  "Strategic App Development Services in USA",
  "Code That Drives Revenue",
  "Scalable App Development Services in USA",
  "Performance-Driven Coding",
  "Premier Digital Marketing Agency in USA",
  "Your Vision, Our Expertise"
];

export default function AppDevServicePage() {
  return (
    <>
    <h1 className="sr-only">App Development Services in USA | Dash Media Solutions</h1>
    <AppDevStrategySection/>
    <AppDevToolkits/>
    <MarqueeSeparator items={appDevItems} />
    <Testimonials/>
    <Faq/>
    </>
  );
}