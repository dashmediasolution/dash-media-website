import { EmailStrategySection } from "@/components/emailsections/EmailStrategySection";
import { Testimonials } from "@/components/emailsections/EmailTestimonials";
import { EmailToolkits } from "@/components/emailsections/EmailToolKits";
import { Faq } from "@/components/emailsections/Email-Faq";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Marketing Services in USA | Dash Media Solutions",
  description: "Land in the inbox, not the spam folder. Our email marketing services in USA help you automate campaigns, build loyalty, and drive real ROI with expert strategy.",
  keywords: ["Email Marketing Services in USA", "Digital Marketing Agency in USA", "Digital Marketing Services in USA"],
};

const emailMarketingItems = [
  "Top Email Marketing Services in USA",
  "Inbox-Ready Strategies",
  "Partner with a Digital Marketing Agency in USA",
  "Turn Clicks into Customers",
  "Expert Email Marketing Services in USA",
  "Data-Driven Campaign Growth",
  "Leading Digital Marketing Agency in USA",
  "Personalized Messaging at Scale",
  "Premium Email Marketing Services in USA",
  "Build Lasting Brand Loyalty",
  "Proven Email Marketing Services in USA",
  "Direct Lines to Your Audience",
  "Your Trusted Digital Marketing Agency in USA",
  "Automate Your Success",
  "Strategic Email Marketing Services in USA",
  "High-Converting Newsletters",
  "Premier Digital Marketing Agency in USA",
  "Optimize Every Send",
  "Scalable Email Marketing Services in USA",
  "Smart Marketing, Real ROI"
];

export default function EmailServicePage() {
  return (
    <>
    <EmailStrategySection/>
    <EmailToolkits/>
    <MarqueeSeparator items={emailMarketingItems} />
    <Testimonials/>
    <Faq/>
    </>
  );
}