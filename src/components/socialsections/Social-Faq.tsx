'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, PhoneCall , MessagesSquare } from "lucide-react";
import {
  CustomAccordion,
  CustomAccordionContent,
  CustomAccordionItem,
  CustomAccordionTrigger,
} from "@/components/ui/faq-accordion";

const faqs = [
  {
    question: "Does social media marketing work for all businesses?",
    answer: "Yes, social media marketing can work for all businesses, but the strategy and execution are very important. It requires a deep understanding of the business to help in the identification of the target audience. Also, consistent efforts are required to achieve the objectives set.",
  },
  {
    question: "Can social media help generate leads?",
    answer: "Definitely. When done right, social media is a lead-generation machine. We’re seeing a major shift where businesses are moving away from generic posting and hiring pros to build targeted local campaigns. These are designed to turn simple \"likes\" into genuine inquiries and sales.",
  },
  {
    question: "How can social media marketing help my business?",
    answer: "It can improve your business customer engagement program and brand visibility, which fosters higher service satisfaction and customer retention. It also plays a vital role in increasing ROI and conversion rate.",
  },
  {
    question: "How does a social media marketing agency operate?",
    answer: "Think of us as your external marketing department. We do the hard work of figuring out what to post, when to post, and analyzing the data to see what’s actually working. We do not just post and ghost. We pivot to tell the plan what to do to achieve better outcomes in line with your goals.",
  },
  {
    question: "Which social media platforms work well for business?",
    answer: "It really depends on where your audience is. For B2B, LinkedIn is usually the best, along with Instagram and Facebook for visual or lifestyle brands. We utilize expert digital marketing services in USA so you do not spend effort on underperforming platforms.",
  },
  {
    question: "How do you measure the success of a campaign?",
    answer: "We don’t guess—we track. We look at the numbers that actually matter, like how many people are clicking, engaging, and ultimately buying. By using data-led digital marketing services in USA, we can see exactly what’s working in real-time and adjust the strategy to keep your growth steady.",
  },
];

export function Faq() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-5 md:px-20">
        
        {/* --- Main 2-Column Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Header + Accordion (8 Columns) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Header Section Inside Left Column */}
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-regular text-primary tracking-tighter leading-none mb-6">
                Have{" "}
                <span className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" style={{ backgroundSize: "300% 100%" }}>
                  Questions?
                </span>
                <br />
                Get{" "}
                <span className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" style={{ backgroundSize: "300% 100%" }}>
                  Answers
                </span>
              </h2>
              <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Still struggling with concerns about digital marketing services in USA? Read our FAQs or contact our team if you need additional information.
              </p>
            </div>

            {/* Accordion List */}
            <CustomAccordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-2"
            >
              {faqs.map((faq, index) => (
                <CustomAccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-100 px-0"
                >
                  <CustomAccordionTrigger className="hover:no-underline text-left font-bold text-xl py-6 text-primary">
                    {faq.question}
                  </CustomAccordionTrigger>
                  <CustomAccordionContent className="pb-8 text-lg leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </CustomAccordionContent>
                </CustomAccordionItem>
              ))}
            </CustomAccordion>
          </div>

          {/* RIGHT COLUMN: Sidebar Cards (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-primary rounded-xl p-8 text-center text-white relative overflow-hidden">
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 border border-white bg-white rounded-full flex items-center justify-center mb-6">
                    <MessagesSquare className="w-10 h-10 text-primary " />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 leading-tight">Have Any Questions?</h3>
                  <p className="text-white/60 mb-6 text-sm leading-relaxed">
                    Connect with our team to find the answers to all of your questions.
                  </p>
                  
                  <Button className="bg-gray-50 hover:bg-gray-100 text-primary font-bold rounded-full w-fit h-12 shadow-lg transition-transform hover:scale-105">
                    Contact Us
                  </Button>
               </div>
            </div>

            {/* Support Card */}
            <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-4 border border-gray-100">
               <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6 text-white" />
               </div>
               <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Your Growth, Our Mission</p>
                  <h4 className="text-lg font-bold text-primary">24/7 Service</h4>
                  <p className="text-xs font-medium text-muted-foreground">+91 99110 60907</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}