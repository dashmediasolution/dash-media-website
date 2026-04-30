
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
  keywords: [
    "digital marketing services in USA", 
    "digital marketing agency in USA",
    "SEO services",
    "PPC management",
    "web design agency USA",
    "content marketing"
  ],
  authors: [{ name: "Dash Media Solutions" }],
  creator: "Dash Media Solutions",
  alternates: {
    canonical: "https://dashmediasolutions.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dashmediasolutions.com",
    title: "Dash Media Solutions: Leading Digital Marketing Services in USA",
    description: "Looking for the best digital marketing company in USA? Dash Media Solutions delivers customizable strategies to boost your brand's visibility and ROI.",
    siteName: "Dash Media Solutions",
    images: [{ url: "/images/dms-marketing-agency.webp", width: 1200, height: 630, alt: "Dash Media Solutions - Digital Marketing Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dash Media Solutions: Leading Digital Marketing Services in USA",
    description: "Looking for the best digital marketing company in USA? Dash Media Solutions delivers customizable strategies to boost your brand's visibility and ROI.",
    images: ["/images/dms-marketing-agency.webp"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dash Media Solutions",
    "url": "https://dashmediasolutions.com",
    "image": "https://dashmediasolutions.com/images/dms-marketing-agency.webp",
    "description": "Looking for the best digital marketing company in USA? Dash Media Solutions delivers customizable strategies to boost your brand's visibility and ROI.",
    "telephone": "+91 99110 60907",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is SEO important for businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Search engine optimization services in USA create the framework for your digital presence by clearing up technical issues, analyzing metadata, and improving site layout. This strategic approach ensures you surpass competitors and gain valuable organic traffic."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results from SEO efforts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Although some of the adjustments can be done quickly but some reports suggest that noticeable changes in ranking and traffic occur within 3 to 6 months."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Dash Media Solutions unique as an SEO firm?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We create the connection between social authority and search authority. Unlike other digital marketing services in USA, we provide the maximum level of visibility by combining social media analytics and search engine optimization."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer a customizable SEO package?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our search engine optimization services in USA offer customizable packages based on your business size, industry, and unique growth goals."
        }
      },
      {
        "@type": "Question",
        "name": "How to effectively measure the success of SEO campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As part of our search engine optimization services in USA, we offer real-time data tracking of keyword positions, organic traffic, and conversions. This allows clients to assess the impact and ROI of our services."
        }
      },
      {
        "@type": "Question",
        "name": "Do your SEO services work across multiple niche websites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our search engine optimization services in USA cater to any niche, from e-commerce to fintech. We analyze your specific business model to deliver customized growth, visibility, and high conversion rates."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <NewHero />
      <ClientLogos />
      <MarqueeSeparator />
      <ServicesSection />
      <Testimonials/>
      <BlogSection />
    </>
  );
}
