import { AboutIntro } from "@/components/aboutsections/AboutIntro";
import { FoundersSection } from "@/components/aboutsections/FoundersSection";
import { AboutCompany } from "@/components/aboutsections/AboutCompany";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dash Media Solutions: Our Story, Values & Commitment",
  description: "At Dash Media Solutions, we're more than a marketing agency—we're architects of growth who are driven by innovation and creativity to ensure client success.",
  keywords: ["About Dash Media Solutions", "Full-Service Digital Marketing Agency", "Results-Driven Marketing Team", "Digital Growth Experts"],
};

export default function AboutUsPage() {
  return (
    <>
      <AboutCompany/>
      <MarqueeSeparator />
      <AboutIntro />
       {/*<MarqueeSeparator />
     <FoundersSection/>*/}
    </>
  );
}