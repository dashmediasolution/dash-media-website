"use client";

import {
  CustomAccordion,
  CustomAccordionItem,
  CustomAccordionTrigger,
  CustomAccordionContent,
} from "@/components/ui/faq-accordion";

// 1. Define your FAQs here
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
];

export function Faq() {
  return (
    <>
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-regular font-heading text-primary  tracking-tighter">
              Have  
              {" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Questions ?
              </span>
              <br />
              We&apos;ve Got
               {" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Answers
              </span>
            </h2>
          </div>
          <div className="text-center md:text-left">
            <p className="text-md text-muted-foreground">
              We&apos;re a diverse group of designers, engineers, and thinkers united by one mission: building technology that makes life simpler, smarter, and more human.
            </p>
          </div>
        </div>
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
    </section>
    </>
  );
}