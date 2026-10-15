import React, { useState } from 'react';
import { PRODUCTS, formatZAR } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Store, Plus, FileDown, CheckCircle, Package, ShieldCheck } from 'lucide-react';

export const ResellerPortal: React.FC = () => {
  const { addToWholesaleCart, showToast, wholesaleSubtotal } = useCart();
  const [packSelections, setPackSelections] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      map[p.id] = 1;
    });
    return map;
  });

  const handleAddPack = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const packs = packSelections[productId] || 1;
    const units = packs * product.casePack;
    addToWholesaleCart(product, units);
  };

  const handleDownloadLineSheet = () => {
    showToast('Aurelia SA 2026 Wholesale Catalogue & Price Sheet downloaded!');
  };

  return (
    <div id="wholesale-catalogue" className="bg-[#FAF8F5] min-h-screen text-stone-900 pb-20">
      
      {/* Reseller Banner */}
      <section className="bg-[#1C1917] text-stone-100 py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <img
                  src="/Gold_monogram_logo_asset_2K_20261012134306.png"
                  alt="Aurelia Logo"
                  className="w-7 h-7 object-contain rounded-full shadow-2xs"
                />
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A880]">
                  <Store className="w-3.5 h-3.5" />
                  <span>Wholesale & Stockist Portal · South Africa</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-50">
                Stock Aurelia in Your Boutique or Spa
              </h1>

              <p className="text-sm text-stone-300 font-light leading-relaxed">
                Enjoy 50% to 60% gross retail margin across our entire handcrafted candle range. Opening order minimum is just R2,500 with door-to-door courier across South Africa.
              </p>

              <div className="pt-1 flex items-center gap-3">
                <button
                  onClick={handleDownloadLineSheet}
                  className="px-4 py-2 bg-[#C5A880] hover:bg-[#B8986D] text-stone-950 text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Price Sheet (PDF)</span>
                </button>
              </div>
            </div>

            {/* Simple Account Status Box */}
            <div className="bg-stone-900 border border-stone-700 rounded-xl p-5 sm:w-80 space-y-3 text-xs">
              <div className="flex items-center justify-between text-stone-400">
                <span>Account Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Stockist
                </span>
              </div>

              <div className="flex justify-between text-stone-300">
                <span>Pricing Tier:</span>
                <strong className="text-stone-100">50% Off Retail (Tier 1)</strong>
              </div>

              <div className="flex justify-between text-stone-300">
                <span>Min. Opening Order:</span>
                <strong className="text-stone-100">R 2,500.00</strong>
              </div>

              <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400">
                Current Order Total:{' '}
                <strong className="text-emerald-400">{formatZAR(wholesaleSubtotal)}</strong>
              </div>
            </div>
          </div>

          {/* 3 Simple Wholesale Perks */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-400">
            <div>
              <strong className="block text-stone-200 mb-0.5">50% Guaranteed Margin</strong>
              Double your money on every unit sold at our recommended retail price.
            </div>
            <div>
              <strong className="block text-stone-200 mb-0.5">Free Display Testers</strong>
              Qualifying orders of 24+ candles include full-size display testers.
            </div>
            <div>
              <strong className="block text-stone-200 mb-0.5">Nationwide Courier</strong>
              Carefully packed cartons shipped straight to your storefront.
            </div>
          </div>

        </div>
      </section>

      {/* Wholesale Product Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-900">
            Wholesale Products & Master Packs
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            All prices reflect your 50% wholesale cost. Sold in master packs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => {
            const selectedPacks = packSelections[product.id] || 1;
            const totalUnits = selectedPacks * product.casePack;
            const packCost = product.wholesalePrice * totalUnits;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Pack info with multi-image support */}
                  <div
                    className="relative aspect-[4/3] bg-stone-100 overflow-hidden group/img"
                    onMouseEnter={() => {
                      if (product.images && product.images.length > 1) {
                        setPackSelections((prev) => ({ ...prev, [`${product.id}_img`]: 1 }));
                      }
                    }}
                    onMouseLeave={() => {
                      if (product.images && product.images.length > 1) {
                        setPackSelections((prev) => ({ ...prev, [`${product.id}_img`]: 0 }));
                      }
                    }}
                  >
                    <img
                      src={
                        product.images && product.images.length > 1 && packSelections[`${product.id}_img`] === 1
                          ? product.images[1]
                          : product.image
                      }
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-mono font-semibold bg-stone-900 text-stone-100 px-2.5 py-0.5 rounded">
                        Pack of {product.casePack} units
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-semibold bg-emerald-700 text-white px-2 py-0.5 rounded">
                        50% Margin
                      </span>
                    </div>

                    {product.images && product.images.length > 1 && (
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded-full z-10">
                        {product.images.map((_, imgIdx) => (
                          <button
                            key={imgIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPackSelections((prev) => ({ ...prev, [`${product.id}_img`]: imgIdx }));
                            }}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                              (packSelections[`${product.id}_img`] || 0) === imgIdx
                                ? 'bg-white scale-125'
                                : 'bg-white/60 hover:bg-white'
                            }`}
                            aria-label={`View photo ${imgIdx + 1}`}
                          />
                        ))}
                        <span className="text-[10px] text-white/90 font-mono ml-0.5">2 Photos</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <div className="text-[11px] text-stone-400 font-mono">
                        SKU: {product.sku}
                      </div>
                      <h3 className="font-serif text-lg font-medium text-stone-900">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Simple Price Comparison in South African Rand */}
                    <div className="p-3 bg-[#FAF8F5] rounded-lg border border-stone-200 text-xs flex justify-between items-center">
                      <div>
                        <span className="text-stone-400 text-[10px] block">Retail Price:</span>
                        <span className="text-stone-700 line-through tabular-nums">
                          {formatZAR(product.retailPrice)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-800 text-[10px] font-semibold block">Wholesale Cost:</span>
                        <span className="text-base font-bold text-emerald-800 tabular-nums">
                          {formatZAR(product.wholesalePrice)} / unit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add to Wholesale Order */}
                <div className="p-5 pt-0 border-t border-stone-100 mt-2 space-y-3">
                  <div className="flex items-center justify-between pt-3 text-xs">
                    <div>
                      <span className="text-[11px] text-stone-500 block">Packs:</span>
                      <select
                        value={selectedPacks}
                        onChange={(e) =>
                          setPackSelections({
                            ...packSelections,
                            [product.id]: Number(e.target.value),
                          })
                        }
                        className="px-2 py-1 bg-stone-50 border border-stone-300 rounded font-mono text-xs cursor-pointer"
                      >
                        {[1, 2, 4, 6, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} Pack ({num * product.casePack} units)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block">Subtotal:</span>
                      <span className="font-bold text-stone-900 tabular-nums text-sm">
                        {formatZAR(packCost)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddPack(product.id)}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Add {totalUnits} Units to Wholesale Order</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple Wholesale Policies */}
        <div id="wholesale-terms" className="mt-12 bg-white rounded-xl border border-stone-200 p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>South Africa Stockist Terms</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-relaxed">
            <div>
              <strong className="block text-stone-900 mb-1">Low Minimum Order</strong>
              R2,500 minimum opening order. Re-orders are a minimum of R1,500.
            </div>
            <div>
              <strong className="block text-stone-900 mb-1">Protected Territories</strong>
              We do not supply competing stores in immediate proximity to protect your boutique.
            </div>
            <div>
              <strong className="block text-stone-900 mb-1">Payment & Dispatch</strong>
              Orders dispatched within 2–4 days upon EFT confirmation or on approved 30-day terms.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
