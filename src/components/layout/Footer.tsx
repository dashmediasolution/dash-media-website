"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

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
    { title: "Instagram", href: "#", icon: Instagram },
    { title: "Facebook", href: "#", icon: Facebook },
    { title: "Twitter", href: "#", icon: Twitter },
  ],
};

// --- Footer Component ---

export function Footer() {
  return (
    <footer className="py-16 border-t bg-gray-50 dark:bg-zinc-950/50">
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        
        {/* Main Grid: Updated to 4 Columns for Company, Services, Links, Social */}
        <div className="grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{companyLinks.title}</h3>
            <div className="flex flex-col space-y-3">
              {companyLinks.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{servicesLinks.title}</h3>
            <div className="flex flex-col space-y-3">
              {servicesLinks.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{otherLinks.title}</h3>
            <div className="flex flex-col space-y-3">
              {otherLinks.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Social Icons */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{socialLinks.title}</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150 flex items-center gap-2 group"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section: Logo and Copyright */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/DashMediaLogo.png"
              alt="Dash Media Solutions Logo"
              width={64}
              height={32}
              className="h-30 w-50 object-contain"
            />
          </Link>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dash Media Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}