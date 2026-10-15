import React, { useState } from 'react';
import { FAQS } from '../../data/products';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-stone-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-stone-500 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Ritual Guidance & Reseller Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Everything you need to know about our organic soy waxes, clean burn guidelines, and wholesale distribution.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-sm sm:text-base text-stone-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
