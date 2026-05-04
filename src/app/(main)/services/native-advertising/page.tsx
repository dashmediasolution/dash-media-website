import { Testimonials } from "@/components/nativesections/NativeTestimonials";
import { NativeToolkits } from "@/components/nativesections/NativeToolKits";
import { Faq } from "@/components/nativesections/Native-Faq";
import { NativeStrategySection } from "@/components/nativesections/NativeStrategySection";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Native Advertising Services in USA | Dash Media Solutions",
  description: "Stop interrupting and start connecting. Our native advertising services in USA help your brand blend into the platforms your audience loves for building trust.",
  keywords: ["Native Advertising Services in USA", "Digital Marketing Agency in USA", "Digital Marketing Services in USA"],
  alternates: {
    canonical: "https://dashmediasolutions.com/services/native-advertising",
  },
};

const nativeAdvertisingItems = [
  "Top Native Advertising Services in USA",
  "Ads That Don’t Feel Like Ads",
  "Partner with a Digital Marketing Agency in USA",
  "Blend In, Stand Out",
  "Expert Native Advertising Services in USA",
  "Non-Disruptive Brand Growth",
  "Leading Digital Marketing Agency in USA",
  "Build Trust Through Content",
  "Premium Native Advertising Services in USA",
  "Engage Your Audience Naturally",
  "Proven Native Advertising Services in USA",
  "Seamless Content Integration",
  "Your Trusted Digital Marketing Agency in USA",
  "Drive High-Quality Traffic",
  "Strategic Native Advertising Services in USA",
  "Value-Driven Ad Solutions",
  "Premier Digital Marketing Agency in USA",
  "Capture Attention Authentically",
  "Scalable Native Advertising Services in USA",
  "Smart Ads, Better Results"
];

export default function NativeServicePage() {
  return (
    <>
    <h1 className="sr-only">Native Advertising Services in USA | Dash Media Solutions</h1>
    <NativeStrategySection/>
    <NativeToolkits/>
    <MarqueeSeparator items={nativeAdvertisingItems} />
    <Testimonials/>
    <Faq/>
    </>
  );
}