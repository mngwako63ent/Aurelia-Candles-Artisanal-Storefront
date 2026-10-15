import React from 'react';
import { HERO_IMAGE } from '../../data/products';
import { ArrowRight, Flame, ShieldCheck, HeartHandshake, Truck, Store } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onResellerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onResellerClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-14 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Direct, elegant copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500">
              <span className="text-[#C5A880]">✦</span>
              <span>Handcrafted Artisanal Soy Candles · South Africa</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.12]">
              Luminous warmth, poured with pure intention.
            </h1>

            <p className="text-base text-stone-600 leading-relaxed max-w-xl font-normal">
              Slow-burning, 100% natural soy candles formulated with botanical fine oils and unbleached cotton wicks. Made in South Africa for conscious homes, spas, and gifting.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-lg hover:bg-stone-800 transition-all shadow-xs cursor-pointer group"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onResellerClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-stone-800 text-sm font-medium rounded-lg border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-all cursor-pointer"
              >
                <Store className="w-4 h-4 text-[#C5A880]" />
                <span>Wholesale & Reseller Portal</span>
              </button>
            </div>

            {/* Quick badges */}
            <div className="pt-4 flex items-center gap-6 text-xs text-stone-500">
              <span>Pure Soy Wax</span>
              <span>·</span>
              <span>Clean Burn</span>
              <span>·</span>
              <span>SA Delivery</span>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-lg border border-stone-200">
              <img
                src={HERO_IMAGE}
                alt="Aurelia Sandalwood & Amber artisanal soy candle glowing warmly"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Product plaque */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-stone-900/90 backdrop-blur-md text-stone-100 p-4 rounded-xl border border-white/10 shadow-md">
                <div className="text-[10px] font-mono tracking-wider uppercase text-[#C5A880]">
                  Signature Candle · 240g
                </div>
                <div className="font-serif text-base text-white">
                  Santal & Amber Cashmere
                </div>
                <div className="text-xs text-stone-300 mt-1 flex items-center justify-between">
                  <span>55–60 hours burn</span>
                  <span className="font-semibold text-[#D6B278]">R 380.00</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Guarantee Bar */}
        <div className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 shrink-0">
              <Flame className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">100% Pure Soy</h4>
              <p className="text-[11px] text-stone-500">Cleaner, longer 60h burn</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">Toxin-Free</h4>
              <p className="text-[11px] text-stone-500">Paraben & phthalate free</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 shrink-0">
              <HeartHandshake className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">Hand-Poured</h4>
              <p className="text-[11px] text-stone-500">Small artisanal batches</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 shrink-0">
              <Truck className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900">SA Nationwide Courier</h4>
              <p className="text-[11px] text-stone-500">Free delivery over R850</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
