'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "How do you determine the strategy for our local market?",
    answer: "Our process begins with a deep dive into your local market dynamics, competitor landscape, and target audience behavior. We use a mix of proprietary tools and industry-standard analytics to identify high-impact opportunities, ensuring your strategy is data-driven and tailored to your specific geography."
  },
  {
    question: "What is the average timeline to see a positive ROI?",
    answer: "While results vary based on channel and industry, our clients typically see a positive return on ad spend within the first 3-4 months. For SEO, foundational improvements yield measurable gains in 6-9 months, with compounding returns over time."
  },
  {
    question: "Do you provide customized reporting dashboards?",
    answer: "Yes, absolutely. We build custom Looker Studio (formerly Google Data Studio) dashboards that integrate data from all your marketing channels. You get a real-time, transparent view of campaign performance, key metrics, and progress towards your goals."
  },
  {
    question: "Can we integrate our existing CRM with your systems?",
    answer: "Yes, we have extensive experience integrating with popular CRMs like HubSpot, Salesforce, and Zoho. This allows for seamless lead tracking, closed-loop reporting, and a holistic view of your entire customer acquisition funnel."
  }
];

interface FaqSectionProps {
  heading?: string | null;
  subheading?: string | null;
}

export default function FaqSection({ heading, subheading }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl ">
          {/* Left Column (Sidebar) */}
          <div className="bg-slate-950 p-10 md:p-14 flex flex-col  justify-between rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl lg:sticky lg:top-10 lg:h-fit">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold mb-6">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                {heading || "Questions Clients Usually Ask Before Starting"}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {subheading || "We keep the process transparent from strategy to reporting, so brands know what to expect before we launch campaigns, refresh content, or improve lead generation."}
              </p>
            </div>
            <div className="mt-20">
              <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                ASK A QUESTION
              </button>
              <div className="grid grid-cols-2 gap-6 mt-8 text-center">
                <div>
                  <p className="text-3xl font-black text-pink-500">7 Days</p>
                  <p className="text-xs text-white/70 uppercase font-semibold tracking-wider mt-1">TYPICAL SETUP WINDOW</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-pink-500">Multi-Channel</p>
                  <p className="text-xs text-white/70 uppercase font-semibold tracking-wider mt-1">SEO, ADS, CONTENT, CRO</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Accordion) */}
          <div className=" p-10 md:p-14 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl">
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md transition-all duration-300">
                  <button
                    className="w-full flex justify-between items-center text-left p-6"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-bold text-lg text-slate-800">{item.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      openIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: openIndex === index ? '1fr' : '0fr',
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-slate-600 px-6 pb-6 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}