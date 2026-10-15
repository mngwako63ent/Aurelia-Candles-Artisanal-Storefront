import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Calculator, TrendingUp, DollarSign, Package } from 'lucide-react';

export const WholesaleCalculator: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(48);

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Calculate tier price based on quantity
  let unitCost = product.wholesalePrice;
  let activeTierLabel = 'Base Wholesale (50% Margin)';
  for (const tier of product.wholesaleTiers) {
    if (quantity >= tier.minUnits) {
      unitCost = tier.pricePerUnit;
      activeTierLabel = `Tier Volume (${tier.discountPercentage}% Margin)`;
    }
  }

  const totalWholesaleInvestment = unitCost * quantity;
  const projectedRetailRevenue = product.retailPrice * quantity;
  const netGrossProfit = projectedRetailRevenue - totalWholesaleInvestment;
  const profitMarginPercent = Math.round((netGrossProfit / projectedRetailRevenue) * 100);

  return (
    <div id="reseller-calculator" className="bg-[#1C1917] text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive B2B Margin Engine</span>
          </div>
          <h3 className="font-serif text-2xl font-light text-stone-50">
            Wholesale Profit & Return Simulator
          </h3>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Simulate your boutique's investment, retail return, and net profit margins across bulk tier volume breaks.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-900 px-3.5 py-2 rounded-lg border border-stone-800 text-xs">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-stone-300">Target Margin:</span>
          <strong className="text-emerald-400 font-mono font-semibold">{profitMarginPercent}%</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 text-xs">
          <div>
            <label className="block text-stone-300 font-medium mb-1.5">
              Select Fragrance SKU:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (MSRP: ${p.retailPrice.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-stone-300 font-medium">
                Order Quantity (Master Cartons):
              </label>
              <span className="font-mono text-stone-200 font-semibold">{quantity} units ({Math.ceil(quantity / product.casePack)} cases)</span>
            </div>
            <input
              type="range"
              min={product.moq}
              max={240}
              step={product.casePack}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
              <span>MOQ: {product.moq}</span>
              <span>48 units (Tier 2)</span>
              <span>120+ units (Tier 3)</span>
            </div>
          </div>

          <div className="p-3 bg-stone-900/80 rounded-lg border border-stone-800 text-[11px] space-y-1">
            <div className="flex justify-between text-stone-400">
              <span>MSRP per unit:</span>
              <span className="font-mono text-stone-200">${product.retailPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Wholesale Cost / Unit:</span>
              <span className="font-mono text-emerald-400 font-semibold">${unitCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Active Pricing Tier:</span>
              <span className="text-[#C5A880]">{activeTierLabel}</span>
            </div>
          </div>
        </div>

        {/* Results Matrix Column */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                Your Investment
              </div>
              <div className="text-2xl font-bold font-mono text-stone-100 mt-2 tabular-nums">
                ${totalWholesaleInvestment.toFixed(2)}
              </div>
            </div>
            <div className="text-[11px] text-stone-400 mt-3 pt-2 border-t border-stone-800 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-stone-500" />
              <span>{quantity} units packed</span>
            </div>
          </div>

          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                Projected Retail Revenue
              </div>
              <div className="text-2xl font-bold font-mono text-stone-100 mt-2 tabular-nums">
                ${projectedRetailRevenue.toFixed(2)}
              </div>
            </div>
            <div className="text-[11px] text-stone-400 mt-3 pt-2 border-t border-stone-800 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-stone-500" />
              <span>At recommended MSRP</span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-stone-900 to-stone-850 p-4 rounded-xl border border-[#C5A880]/30 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880]">
                Net Gross Profit
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-2 tabular-nums">
                +${netGrossProfit.toFixed(2)}
              </div>
            </div>
            <div className="text-[11px] text-[#C5A880] mt-3 pt-2 border-t border-stone-800/80 font-medium flex items-center justify-between">
              <span>Margin Yield</span>
              <span className="font-mono">{profitMarginPercent}% Return</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
