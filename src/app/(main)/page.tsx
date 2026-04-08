
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NewHero } from "@/components/sections/NewHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogSection } from "@/components/sections/BlogSection";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate the page every 60 seconds to fetch new blog posts

export const metadata: Metadata = {
  title: "Dash Media Solutions: Leading Digital Marketing Services in USA",
  description: "Looking for the best digital marketing company in USA? Dash Media Solutions delivers customizable strategies to boost your brand's visibility and ROI.",
  keywords: ["digital marketing services in USA", "digital marketing agency in USA"],
};

export default function Home() {
  return (
    <>
      <NewHero />
      <ClientLogos />
      <MarqueeSeparator />
      <ServicesSection />
      <Testimonials/>
      <BlogSection />
    </>
  );
}
