import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Mail, MapPin, Clock, Send, Sparkles, Phone } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Your message has been received! We will reply within 1 business day.');
  };

  return (
    <section id="contact" className="py-14 lg:py-20 bg-[#F5EFE6]/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Studio info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Studio & Flagship Atelier</span>
            </div>

            <h2 className="font-serif text-3xl font-light text-stone-900 leading-tight">
              Get in touch with our pouring studio.
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Have questions about candle care, custom event gifting, or retail stockist orders? We'd love to assist you.
            </p>

            <div className="space-y-3.5 pt-2 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">The Aurelia Studio</strong>
                  <span className="text-stone-500">Makhubung, Mafikeng, North West, 2745</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Phone / WhatsApp</strong>
                  <a href="tel:+27652442433" className="text-stone-600 hover:text-stone-900 font-medium">
                    +27 652 442 433
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Email</strong>
                  <a href="mailto:ktsineng95@gmail.com" className="text-stone-600 hover:text-stone-900 font-medium">
                    ktsineng95@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Hours</strong>
                  <span className="text-stone-500">Monday – Friday: 09:00 – 17:00 SAST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-xl border border-stone-200 shadow-2xs">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-2">
                <h3 className="font-serif text-xl text-stone-900">Message Received!</h3>
                <p className="text-xs text-stone-500">
                  Thank you for reaching out. We will respond to your email shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah van der Merwe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.co.za"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 bg-white"
                  >
                    <option value="general">General Inquiries</option>
                    <option value="custom-gifting">Weddings & Corporate Gifting</option>
                    <option value="wholesale">Wholesale / Reseller Information</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
