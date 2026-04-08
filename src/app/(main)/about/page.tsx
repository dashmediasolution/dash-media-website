import { AboutIntro } from "@/components/aboutsections/AboutIntro";
import { FoundersSection } from "@/components/aboutsections/FoundersSection";
import { AboutCompany } from "@/components/aboutsections/AboutCompany";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dash Media: Top Digital Marketing Agency in USA",
  description: "Dash Media Solutions is an exceptional digital marketing agency in USA. We are growth architects driven by innovation and a commitment to your brand's success.",
  keywords: ["digital marketing agency in USA", "digital marketing services in USA"],
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