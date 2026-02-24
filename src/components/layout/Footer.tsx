"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";

// --- Data Configuration ---

const companyLinks = {
  title: "Company",
  items: [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Contact Us", href: "/contact" },
  ],
};

const servicesLinks = {
  title: "Services",
  items: [
    { title: "Search Engine Optimization (SEO)", href: "/services/seo" },
    { title: "Video Marketing", href: "/services/video-marketing" },
    { title: "Content Marketing", href: "/services/content-marketing" },
    { title: "Social Media", href: "/services/social-media" },
    { title: "Pay Per Click (PPC)", href: "/services/pay-per-click" },
    { title: "Email Marketing", href: "/services/email-marketing" },
    { title: "Web Design", href: "/services/web-design" },
    { title: "Native Advertising", href: "/services/native-advertising" },
    { title: "App Development", href: "/services/app-development" },
    { title: "Search Engine Marketing (SEM)", href: "/services/sem" },
  ],
};

const otherLinks = {
  title: "Links",
  items: [
    { title: "Careers", href: "/careers" },
    { title: "Terms and Conditions", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = {
  title: "Social",
  items: [
    { title: "Instagram", href: "https://www.instagram.com/dashmediasolutions", icon: Instagram },
    { title: "Facebook", href: "#", icon: Facebook },

  ],
};

export function Footer() {
  return (
    <footer className="bg-white pt-10 pb-12 ">
      <div className="container mx-auto px-5 max-w-7xl">

        {/* --- REFINED CTA: Expanded Image Banner --- */}
        <div className="relative bg-blue-50/50 border border-gray-100 rounded-xl mb-24 group overflow-hidden">

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-10 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 px-8 py-12 md:px-20 md:py-20 flex flex-col items-start text-left">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-primary leading-[1.05] mb-10">
                Ready to architect
                your  <br /> digital growth?
              </h2>

              <Link href="/contact">
                <button className="bg-primary text-white h-12 px-6 rounded-full font-bold text-md flex items-center gap-3 transition-all hover:bg-primary/80 ">
                  Get Started
                  <ArrowRight className="w-5 h-5 " />
                </button>
              </Link>
            </div>

            {/* Right Image Column: Expanded and Bigger */}
            <div className="lg:col-span-4 h-full min-h-[300px] relative">
              <div className="absolute inset-0 lg:-right-1">
                <Image
                  src="/footer-banner.png"
                  alt="Growth Strategy"
                  fill
                  priority
                  className="object-contain "
                />

              </div>
            </div>

          </div>
        </div>

        {/* --- Standard Link Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-y-16 gap-x-8 px-4">

          {/* Column 1: Branding */}
          <div className="col-span-2 md:col-span-3 space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/DashMediaLogo.png"
                alt="Dash Media Solutions"
                width={160}
                height={40}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-stack digital marketing agency specializing in high-performance growth strategies.
            </p>
            <div className="flex gap-4">
              {socialLinks.items.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.title}`}
                  className="w-10 h-10 rounded-full border-none flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 lg:pl-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-8">Specializations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {servicesLinks.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-0 h-[1px] bg-primary transition-all group-hover:w-3 mr-0 group-hover:mr-2"></span>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1 lg:col-span-2 lg:pl-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-8">Agency</h3>
            <div className="flex flex-col space-y-4">
              {companyLinks.items.map((item, index) => (
                <Link key={index} href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-8">Legal</h3>
            <div className="flex flex-col space-y-4">
              {otherLinks.items.map((item, index) => (
                <Link key={index} href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Row: Copyright --- */}
        <div className="mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Dash Media Solutions. Engineered for Excellence.
          </p>
          <div className="flex gap-8">
            <span className="text-[11px] font-bold text-primary/30 uppercase tracking-tighter">SEO Specialist</span>
            <span className="text-[11px] font-bold text-primary/30 uppercase tracking-tighter">Web Architect</span>
            <span className="text-[11px] font-bold text-primary/30 uppercase tracking-tighter">PPC Expert</span>
          </div>
        </div>

      </div>
    </footer>
  );
}