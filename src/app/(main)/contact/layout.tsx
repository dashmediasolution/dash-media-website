import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Dash Media Solutions",
  description: "Get in touch with Dash Media Solutions. Tell us about your project and business goals.",
  alternates: {
    canonical: "https://dashmediasolutions.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}