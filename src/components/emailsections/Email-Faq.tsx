'use client';

import {
  CustomAccordion,
  CustomAccordionContent,
  CustomAccordionItem,
  CustomAccordionTrigger,
} from "@/components/ui/faq-accordion";

// Define your FAQs here
const faqs = [
  {
    question: "What kind of results can I expect?",
    answer: "We focus on measurable KPIs such as increased organic traffic, higher search engine rankings, improved conversion rates, and greater brand engagement. We provide transparent reports to track our progress.",
  },
  {
    question: "How long does it take to see SEO results?",
    answer: "SEO is a long-term strategy. While some improvements can be seen in as little as a few weeks, significant results typically take 3-6 months to materialize as search engines index changes and authority is built.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes, we partner with a wide range of businesses, from startups and small local companies to established enterprises. Our strategies are tailored to meet your specific goals and budget.",
  },
  {
    question: "How do you measure the success of a campaign?",
    answer: "Success is measured against the key performance indicators (KPIs) we establish during the strategy phase. This can include metrics like website traffic, lead generation, conversion rates, and return on investment (ROI).",
  },
    {
    question: "How do you measure the success of a campaign?",
    answer: "Success is measured against the key performance indicators (KPIs) we establish during the strategy phase. This can include metrics like website traffic, lead generation, conversion rates, and return on investment (ROI).",
  },
    {
    question: "How do you measure the success of a campaign?",
    answer: "Success is measured against the key performance indicators (KPIs) we establish during the strategy phase. This can include metrics like website traffic, lead generation, conversion rates, and return on investment (ROI).",
  },
];

export function Faq() {
  return (
    <section className="py-15 md:py-35 bg-gray-50">
      <div className="container mx-auto">
        {/* ✅ FIX: Main 2-column grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 items-start">
          
          {/* Left Column */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl lg:text-6xl font-regular font-heading text-primary tracking-tighter">
              Have{" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Questions?
              </span>
              <br />
              Get{" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Answers
              </span>
            </h2>
            <p className="mt-4 text-md sm:text-lg p-5 md:p-0 text-muted-foreground leading-relaxed">
              Can&apos;t find the answer you&apos;re looking for? Feel free to reach out to our team for more information.
            </p>
          </div>

          {/* Right Column */}
           <div className="p-5 sm:p-0">
            <CustomAccordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <CustomAccordionItem
                  key={index}
                  value={`item-${index}`}
                >
                  <CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
                  <CustomAccordionContent>{faq.answer}</CustomAccordionContent>
                </CustomAccordionItem>
              ))}
            </CustomAccordion>
          </div>

        </div>
      </div>
    </section>
  );
}