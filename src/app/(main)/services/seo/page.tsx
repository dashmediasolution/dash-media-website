import { SeoStrategySection } from "@/components/seosections/SeoStratergySection";
import { SeoToolkits } from "@/components/seosections/SeoToolkits";
import { Faq } from "@/components/seosections/Seo-Faq";
import { Testimonials } from "@/components/seosections/SeoTestimonials";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Search Engine Optimization Services in USA | Dash Media Solutions",
  description: "Drive organic growth with the best search engine optimization services in USA. Dash Media Solutions delivers higher rankings, quality leads, and lasting success.",
  keywords: ["Search Engine Optimization Services in USA", "SEO Services in USA", "Digital Marketing Services in USA", "Digital Marketing Agency in USA"],
  alternates: {
    canonical: "https://dashmediasolutions.com/services/seo",
  },
};

export default function SeoServicePage() {
  return (
    <>
      <h1 className="sr-only">Search Engine Optimization Services in USA | Dash Media Solutions</h1>
      <SeoStrategySection/>
      <SeoToolkits/>
      <MarqueeSeparator/>
      <Testimonials/>
      <Faq/>
    </>
  );
}