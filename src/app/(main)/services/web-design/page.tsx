import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Faq } from "@/components/websections/Web-Faq";
import { WebStrategySection } from "@/components/websections/WebStrategySection";
import { Testimonials } from "@/components/websections/WebTestimonials";
import { WebToolkits } from "@/components/websections/WebToolKits";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Web Design Services in USA | Dash Media Solutions",
  description: "We offer web design services in USA to take your brand to the next level. Our top-level websites are fully responsive and support traffic growth and performance.",
  keywords: ["Web Design Services in USA", "Digital Marketing Services in USA", "Digital Marketing Agency in USA"],
};

const webDesignItems = [
  "Web Design Services in USA",
  "High-Converting Custom Websites",
  "Top-Rated Digital Experiences",
  "Digital Marketing Agency in USA",
  "Digital Marketing Services in USA for Modern UI/UX Solutions",
  "Performance-Driven Web Development",
  "Expert Mobile-First Design",
  "Digital Marketing Services in USA for Global Brand Frameworks",
  "Scalable E-commerce Architecture",
  "Modern Design. Mobile-First Results",
  "Stunning Sites, Seamless UX",
  "Performance-Digital Marketing Agency in USA",
  "Scalable Web Development",
  "Design That Drives Business Growth",
  "Exceptional User Experiences",
  "Digital Marketing Services in USA for Next-Gen Development"
];

export default function WebDesignServicePage() {
  return (
    <>
     <WebStrategySection/>
     <WebToolkits/>
     <MarqueeSeparator items={webDesignItems} />
     <Testimonials/>
     <Faq/>
    </>
  );
}