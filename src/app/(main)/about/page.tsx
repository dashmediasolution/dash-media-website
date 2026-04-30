import { AboutIntro } from "@/components/aboutsections/AboutIntro";
import { FoundersSection } from "@/components/aboutsections/FoundersSection";
import { AboutCompany } from "@/components/aboutsections/AboutCompany";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dash Media: Top Digital Marketing Agency in USA",
  description: "Dash Media Solutions is an exceptional digital marketing agency in USA. We are growth architects driven by innovation and a commitment to your brand's success.",
  keywords: [
    "digital marketing agency in USA", 
    "digital marketing services in USA",
    "about Dash Media Solutions",
    "top marketing agency USA"
  ],
  authors: [{ name: "Dash Media Solutions" }],
  creator: "Dash Media Solutions",
  alternates: {
    canonical: "https://dashmediasolutions.com/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dashmediasolutions.com/about",
    title: "About Dash Media: Top Digital Marketing Agency in USA",
    description: "Dash Media Solutions is an exceptional digital marketing agency in USA. We are growth architects driven by innovation and a commitment to your brand's success.",
    siteName: "Dash Media Solutions",
    images: [{ url: "/images/dms-marketing-agency.webp", width: 1200, height: 630, alt: "About Dash Media Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dash Media: Top Digital Marketing Agency in USA",
    description: "Dash Media Solutions is an exceptional digital marketing agency in USA. We are growth architects driven by innovation and a commitment to your brand's success.",
    images: ["/images/dms-marketing-agency.webp"],
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Dash Media: Top Digital Marketing Agency in USA",
    "url": "https://dashmediasolutions.com/about",
    "description": "Dash Media Solutions is an exceptional digital marketing agency in USA. We are growth architects driven by innovation and a commitment to your brand's success.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Dash Media Solutions",
      "url": "https://dashmediasolutions.com",
      "logo": "https://dashmediasolutions.com/images/dms-marketing-agency.webp"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutCompany/>
      <MarqueeSeparator />
      <AboutIntro />
       {/*<MarqueeSeparator />
     <FoundersSection/>*/}
    </>
  );
}