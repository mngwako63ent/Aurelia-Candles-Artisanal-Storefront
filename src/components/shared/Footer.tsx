import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { currentMode, setCurrentMode, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed! Use code AURELIA10 for 10% off your first order.');
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/Gold_monogram_logo_asset_2K_20261012134306.png"
                alt="Aurelia Gold Monogram Logo"
                className="w-12 h-12 object-contain rounded-full shadow-2xs shrink-0"
              />
              <div>
                <span className="font-serif text-2xl font-light tracking-[0.16em] uppercase text-stone-100">
                  Aurelia Candles
                </span>
                <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A880] mt-0.5">
                  Hand-poured in Makhubung, Mafikeng, North West
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              Crafted with 100% natural soy wax and botanical essences. Clean, slow-burning flames and fine home scents delivered door-to-door across South Africa.
            </p>

            <div className="text-xs text-stone-400 space-y-1">
              <div>Phone: <a href="tel:+27652442433" className="text-[#C5A880] hover:underline">+27 652 442 433</a></div>
              <div>Email: <a href="mailto:ktsineng95@gmail.com" className="text-[#C5A880] hover:underline">ktsineng95@gmail.com</a></div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setCurrentMode(currentMode === 'retail' ? 'reseller' : 'retail')}
                className="text-xs text-[#D6B278] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                {currentMode === 'retail' ? 'Switch to Reseller Portal (Wholesale 50% Off) →' : '← Return to Retail Storefront'}
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <h4 className="font-serif text-sm font-medium text-stone-100">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#shop" className="hover:text-stone-100 transition-colors">Shop Candles & Sprays (ZAR)</a></li>
              <li><a href="#story" className="hover:text-stone-100 transition-colors">Our Story & Ingredients</a></li>
              <li><a href="#faq" className="hover:text-stone-100 transition-colors">Nationwide Delivery</a></li>
              <li><a href="#contact" className="hover:text-stone-100 transition-colors">Contact Makhubung Studio</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="font-serif text-sm font-medium text-stone-100">
              10% Off Your First Order
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Join our mailing list to receive new fragrance releases and care tips.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-stone-900 rounded-lg border border-stone-700 text-xs text-stone-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Use code <strong>AURELIA10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-stone-900 rounded-lg border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#C5A880] hover:bg-[#B8986D] text-stone-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Aurelia Candles (Pty) Ltd. Handcrafted in South Africa.
          </div>
          <div>All prices in South African Rand (ZAR / R).</div>
        </div>

      </div>
    </footer>
  );
};
