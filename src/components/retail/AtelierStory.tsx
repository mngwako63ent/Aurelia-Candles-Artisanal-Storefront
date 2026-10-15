import React from 'react';
import { CERAMIC_CANDLE_IMAGE } from '../../data/products';
import { Sparkles, Droplets, Leaf, Compass } from 'lucide-react';

export const AtelierStory: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image & Craft Accent */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 aspect-[4/5] bg-stone-100">
              <img
                src={CERAMIC_CANDLE_IMAGE}
                alt="Aurelia handmade ceramic vessel candle being poured"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D6B278]">
                  Atelier Philosophy
                </span>
                <p className="font-serif text-lg font-light text-stone-100 mt-1">
                  "Light is not merely illumination; it is the rhythm of intention in a chaotic world."
                </p>
                <span className="text-xs text-stone-300 mt-1">
                  — Aurelia Studio Manifesto
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Artisanal Alchemy & Provenance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 leading-tight">
              Rooted in botanical science and slow living.
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Aurelia was born from a desire to reclaim the candle from mass-manufactured paraffin novelty. We view scent as architecture for the mind—an invisible sanctuary that can ground your nervous system the moment the match strikes the wick.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Leaf className="w-4 h-4 text-[#C5A880]" />
                  <span>100% Midwestern Soy Wax</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Harvested sustainably from domestic farms. Burns completely soot-free, biodegradable, and cooler for maximum scent throw longevity.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Droplets className="w-4 h-4 text-[#C5A880]" />
                  <span>Cold-Distilled Botanicals</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  We formulate custom blends using pure essential oils and IFRA-certified fine fragrances. Strict ban on phthalates, parabens, and dyes.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Compass className="w-4 h-4 text-[#C5A880]" />
                  <span>Micro-Batch Temperature Pours</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Every batch is hand-mixed in lots of 24, poured at precisely 135°F, and cured for 14 days before boxing to ensure crystalline surface tops.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Heirloom Keepsake Vessels</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Once your candle finishes its 60-hour journey, the apothecary glass or ceramic vessel lives on as timeless tableware or floral tumblers.
                </p>
              </div>
            </div>

            {/* Adjacency Proof Quote */}
            <div className="pt-6 border-t border-stone-200/80">
              <div className="text-xs text-stone-500 italic">
                "Aurelia's Santal & Amber creates an unmatched ambiance in our boutique hotel suites. Our guests constantly ask where to purchase them."
              </div>
              <div className="text-xs font-semibold text-stone-800 mt-1">
                — Clémence Laurent, Creative Director at Maison Vert Studio
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
