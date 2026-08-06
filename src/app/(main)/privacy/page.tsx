"use client";

import React from "react";

const sections = [
  { id: "terms-and-conditions", title: "Terms and Conditions" },
  { id: "services-engagement", title: "Services & Engagement" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "payment-billing-terms", title: "Payment & Billing Terms" },
  { id: "third-party-platforms-ads", title: "Third-Party Platforms & Ads" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "termination", title: "Termination" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact-us", title: "Contact Us" },
];

export default function TermsPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <h1 className="sr-only">Terms and Conditions | Dash Media Solutions</h1>

      {/* --- Page Header --- */}
      <section className="bg-blue-50 border-b border-gray-100 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto px-5 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4 block">
                Agency Policies
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-primary uppercase leading-[0.9]">
                <span
                  className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                  style={{ backgroundSize: "300% 100%" }}
                >
                  Code of <br /> Conduct
                </span>
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-lg lg:text-xl text-muted-foreground max-w-md leading-relaxed">
                We prioritize clear terms and conditions to ensure high-quality collaboration while protecting your business interests.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-6 opacity-60">
                Last Updated: July 29, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Content Section --- */}
      <div className="container mx-auto px-6 max-w-6xl mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Table of Contents (Sticky + Clickable) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 h-fit">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-8">
              Table of Contents
            </h3>
            <nav className="flex flex-col space-y-4">
              {sections.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-4 cursor-pointer text-left w-full focus:outline-none"
                >
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors">
                    0{i + 1}
                  </span>
                  <span className="text-sm font-bold text-primary/60 group-hover:text-primary transition-colors uppercase tracking-tight">
                    {item.title}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-16 p-8 bg-blue-50/50 rounded-2xl border border-blue-100">
              <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                Have questions?
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is ready to assist with any privacy concerns.
              </p>
              <button
                onClick={() => scrollToSection("contact-us")}
                className="text-xs font-bold text-accent hover:underline uppercase tracking-widest cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </aside>

          {/* Right Side: The Policy Content */}
          <main className="lg:col-span-8">
            <article className="prose prose-slate max-w-none 
              prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tighter prose-h2:text-primary prose-h2:uppercase prose-h2:mb-8 prose-h2:scroll-mt-36
              prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-8
              prose-strong:text-primary prose-strong:font-bold">

              <section id="terms-and-conditions" className="mb-20">
                <h2>01. Terms and Conditions</h2>
                <p><strong>Effective Date:</strong> July 29, 2026<br /><strong>Last Updated:</strong> July 29, 2026</p>
                <p>
                  Welcome to Dash Media Solutions. By accessing or using our website located at www.dashmediasolutions.com, engaging our digital marketing, web design, app development, or advertising services, you agree to comply with and be bound by these Terms and Conditions ("Terms").
                </p>
                <p>
                  If you do not agree with any part of these Terms, please do not use our website or services.
                </p>
              </section>

              <section id="services-engagement" className="mb-20">
                <h2>02. Services & Engagement</h2>
                <p>
                  <strong>Scope of Work:</strong> Dash Media Solutions provides digital marketing services, including Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, web design, social media management, content creation, and custom app development. Specific deliverables, timelines, and budgets are outlined in individual project proposals or service agreements signed with clients.
                </p>
                <p>
                  <strong>Client Obligations:</strong> Clients must provide timely access to necessary accounts, logos, website materials, and timely feedback required to complete projects efficiently.
                </p>
              </section>

              <section id="intellectual-property" className="mb-20">
                <h2>03. Intellectual Property</h2>
                <p>
                  <strong>Our Ownership:</strong> All content, designs, graphics, code, and text on this website belong to Dash Media Solutions and are protected under copyright and trademark laws.
                </p>
                <p>
                  <strong>Client Ownership:</strong> Upon full payment of all invoices, clients receive full ownership rights to final completed deliverables (such as approved custom logos, websites, or apps), excluding third-party software, stock assets, or proprietary tools owned by Dash Media Solutions.
                </p>
              </section>

              <section id="payment-billing-terms" className="mb-20">
                <h2>04. Payment & Billing Terms</h2>
                <p>
                  <strong>Payment Schedules:</strong> Invoices are payable according to the terms specified in individual service agreements or proposals.
                </p>
                <p>
                  <strong>Deposits:</strong> Work typically commences upon receipt of an agreed upfront deposit or retainer fee.
                </p>
                <p>
                  <strong>Late Payments:</strong> Failure to make timely payments may result in the temporary suspension of services, ad campaign pauses, or delayed project delivery.
                </p>
              </section>

              <section id="third-party-platforms-ads" className="mb-20">
                <h2>05. Third-Party Platforms & Ads</h2>
                <p>
                  <strong>Third-Party Services:</strong> Our services may involve managing ad accounts on third-party platforms such as Google, Meta, or third-party web hosting providers. Dash Media Solutions is not responsible for outages, policies, or sudden updates made by third-party platforms.
                </p>
                <p>
                  <strong>Ad Spend:</strong> Unless explicitly stated, campaign budgets paid directly to ad platforms (e.g., Google Ads, Facebook Ads) are separate from Dash Media Solutions' agency management fees.
                </p>
              </section>

              <section id="limitation-of-liability" className="mb-20">
                <h2>06. Limitation of Liability</h2>
                <p>
                  <strong>Marketing Results:</strong> While we apply industry-leading strategies to optimize performance and visibility, Dash Media Solutions does not guarantee specific search engine rankings, lead volumes, or sales figures, as market dynamics and search algorithms are beyond our control.
                </p>
                <p>
                  <strong>Liability Cap:</strong> In no event shall Dash Media Solutions be liable for indirect, incidental, or consequential damages resulting from the use of our website or services.
                </p>
              </section>

              <section id="termination" className="mb-20">
                <h2>07. Termination</h2>
                <p>
                  Either party may terminate a service agreement according to the notice period specified in their written contract. Upon termination, the client remains responsible for payment for all work completed up to the termination date.
                </p>
              </section>

              <section id="governing-law" className="mb-20">
                <h2>08. Governing Law</h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                </p>
              </section>

              <section id="contact-us" className="mb-20">
                <h2>09. Contact Us</h2>
                <p>
                  If you have any questions regarding these Terms and Conditions, please contact us at:
                </p>
                <p>
                  <strong>Office Address:</strong> A-2, Shankar Garden, Opp. Metro Pillar 620, Vikaspuri, Delhi 110018<br />
                  <strong>Email:</strong> support@dashmediasolutions.com<br />
                  <strong>Phone:</strong> +91 99110 60907
                </p>
              </section>

            </article>
          </main>

        </div>
      </div>
    </div>
  );
}