import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Sparkles, ArrowRight, RotateCcw, Check, Flame } from 'lucide-react';

export const ScentQuiz: React.FC = () => {
  const { addToRetailCart, setQuickViewProduct } = useCart();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<string>('warm');
  const [space, setSpace] = useState<string>('living');
  const [vesselPreference, setVesselPreference] = useState<string>('amber');

  // Match recommendation based on user selections
  const recommendation = React.useMemo(() => {
    if (vesselPreference === 'melts') {
      return PRODUCTS.find((p) => p.category === 'wax-melts') || PRODUCTS[2];
    }
    if (vesselPreference === 'ceramic' || mood === 'crisp') {
      return PRODUCTS.find((p) => p.id === 'fluted-alabaster-cedar') || PRODUCTS[1];
    }
    if (mood === 'sultry') {
      return PRODUCTS.find((p) => p.id === 'spiced-cardamom-bourbon') || PRODUCTS[0];
    }
    return PRODUCTS[0]; // Santal & Amber default
  }, [mood, space, vesselPreference]);

  const handleReset = () => {
    setStep(1);
    setMood('warm');
    setSpace('living');
    setVesselPreference('amber');
  };

  return (
    <section id="quiz" className="py-16 lg:py-24 bg-[#F5F1EB] border-t border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-stone-500 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Interactive Olfactory Consultation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
            Find Your Signature Flame
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Answer three quick sensory prompts to match with the ideal botanical formulation for your sanctuary.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-10">
          
          {step <= 3 ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-6 pb-4 border-b border-stone-100">
                <span>Prompt 0{step} of 03</span>
                <span>
                  {step === 1 && 'Atmosphere & Mood'}
                  {step === 2 && 'Sanctuary Placement'}
                  {step === 3 && 'Aesthetic Vessel'}
                </span>
              </div>

              {/* Step 1: Atmosphere */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-light">
                    What emotional atmosphere do you desire to cultivate?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'warm', label: 'Velvety & Meditative', desc: 'Resinous sandalwood, warm amber, and aged cashmere.' },
                      { id: 'crisp', label: 'Crisp & Restorative', desc: 'Japanese cypress hinoki, mineral stones, and yuzu.' },
                      { id: 'sultry', label: 'Intimate & Decadent', desc: 'Smoked bourbon cask, crushed cardamom, and roasted tonka.' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMood(item.id);
                          setStep(2);
                        }}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          mood === item.id
                            ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                            : 'border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs mt-1.5 leading-relaxed ${mood === item.id ? 'text-stone-300' : 'text-stone-500'}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Room Placement */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-light">
                    Where will this flame burn most frequently?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'living', label: 'Central Living Salon', desc: 'Expansive scent throw suited for shared gatherings.' },
                      { id: 'bedroom', label: 'Bedside Sanctuary', desc: 'Soft soothing botanical notes that encourage deep rest.' },
                      { id: 'bath', label: 'Bath & Soak Retreat', desc: 'Steam-diffusing notes that turn evening baths into private spas.' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSpace(item.id);
                          setStep(3);
                        }}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          space === item.id
                            ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                            : 'border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs mt-1.5 leading-relaxed ${space === item.id ? 'text-stone-300' : 'text-stone-500'}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Vessel Style */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-light">
                    What vessel finish fits your home's interior design?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'amber', label: 'Amber Apothecary Glass', desc: 'Warm vintage silhouette with golden translucent glow.' },
                      { id: 'ceramic', label: 'Fluted Ceramic Tumbler', desc: 'Artisanal matte cream vessel with a crackling wooden wick.' },
                      { id: 'melts', label: 'Wickless Botanical Melts', desc: 'Gentle petal-infused wax blocks for electric warmers.' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setVesselPreference(item.id);
                          setStep(4);
                        }}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          vesselPreference === item.id
                            ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                            : 'border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs mt-1.5 leading-relaxed ${vesselPreference === item.id ? 'text-stone-300' : 'text-stone-500'}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Nav Controls for Quiz */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
                  >
                    ← Previous Prompt
                  </button>
                ) : (
                  <div></div>
                )}
                <div className="text-xs text-stone-400">
                  Select an option to proceed
                </div>
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Your Curated Scent Match</span>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 rounded-xl overflow-hidden bg-stone-100 aspect-square shadow-sm">
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="text-xs text-stone-500">
                    <span>{recommendation.categoryLabel}</span> · <span>{recommendation.burnTime}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-900">
                    {recommendation.name}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {recommendation.description}
                  </p>

                  <div className="bg-[#FAF8F5] p-3 rounded-lg border border-stone-200/70 text-xs text-stone-700">
                    <span className="font-semibold block text-stone-900 mb-0.5">Why this fits your ritual:</span>
                    <span>
                      Harmonizes your desire for a {mood === 'warm' ? 'velvety, grounding' : mood === 'crisp' ? 'restorative, meditative' : 'rich, evening'} atmosphere with clean soy diffusion.
                    </span>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => addToRetailCart(recommendation, 1)}
                      className="px-6 py-3 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Flame className="w-4 h-4 text-[#C5A880]" />
                      <span>Add to Bag · ${recommendation.retailPrice.toFixed(2)}</span>
                    </button>

                    <button
                      onClick={() => setQuickViewProduct(recommendation)}
                      className="px-4 py-3 bg-white text-stone-700 text-xs font-medium rounded-lg border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      View Scent Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
