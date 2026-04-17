
import { Faq } from "@/components/videosections/Video-Faq";
import { Testimonials } from "@/components/videosections/VideoTestimonials";
import { VideoToolkits } from "@/components/videosections/VideoToolKits";
import { VideoStrategySection } from "@/components/videosections/VideoStrategySection";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Marketing Services in USA | Dash Media Solutions",
  description: "Stop blending in. Use video marketing services in USA to tell your story and actually convert viewers. No more boring ads—just high-impact content that works.",
  keywords: ["Video Marketing Services in USA", "Digital Marketing Services in USA", "Digital Marketing Agency in USA"],
};

const videoMarketingItems = [
  "Bring Your Brand to Life",
  "Top Video Marketing Services in USA",
  "High-Impact Visual Content",
  "Trusted Digital Marketing Agency in USA",
  "Engaging Video Marketing Services in USA",
  "Rank Higher with Video",
  "Partner with Our Digital Marketing Agency in USA",
  "Cinematic Brand Storytelling",
  "Expert Video Marketing Services in USA",
  "Drive More Conversions Now",
  "Capture Attention Instantly",
  "Premium Video Marketing Services in USA",
  "Viral Content That Converts",
  "Leading Digital Marketing Agency in USA",
  "Strategic Video Marketing Services in USA",
  "Boost Engagement with Motion",
  "Elite Digital Marketing Agency in USA",
  "Custom Video Production Plans",
  "Proven Video Marketing Services in USA",
  "Scale Your Online Presence"
];

export default function VideoServicePage() {
  return (
    <>
    <VideoStrategySection/>
    <VideoToolkits/>
    <MarqueeSeparator items={videoMarketingItems} />
    <Testimonials/>
    <Faq/>
    </>
  );
}