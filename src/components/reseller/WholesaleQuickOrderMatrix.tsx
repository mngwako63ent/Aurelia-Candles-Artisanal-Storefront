import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Table, ShoppingCart, Plus, Minus, Check } from 'lucide-react';

export const WholesaleQuickOrderMatrix: React.FC = () => {
  const { addToWholesaleCart, showToast } = useCart();

  // State maps product id to selected unit count (starts with 0 or MOQ)
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = 0;
    });
    return initial;
  });

  const handleUpdate = (productId: string, deltaCases: number) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const current = quantities[productId] || 0;
    const step = product.casePack;
    const next = Math.max(0, current + deltaCases * step);
    setQuantities((prev) => ({ ...prev, [productId]: next }));
  };

  const handleAddAll = () => {
    let addedCount = 0;
    PRODUCTS.forEach((p) => {
      const qty = quantities[p.id] || 0;
      if (qty > 0) {
        addToWholesaleCart(p, qty);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      showToast(`Added ${addedCount} wholesale lines to your Purchase Order!`);
      // Reset matrix quantities
      const reset: Record<string, number> = {};
      PRODUCTS.forEach((p) => {
        reset[p.id] = 0;
      });
      setQuantities(reset);
    } else {
      showToast('Please select at least 1 case before adding to PO.');
    }
  };

  const totalUnits = Object.values(quantities).reduce((s, q) => s + q, 0);

  const estimatedTotal = PRODUCTS.reduce((sum, p) => {
    const qty = quantities[p.id] || 0;
    if (qty === 0) return sum;
    let unitPrice = p.wholesalePrice;
    for (const tier of p.wholesaleTiers) {
      if (qty >= tier.minUnits) {
        unitPrice = tier.pricePerUnit;
      }
    }
    return sum + unitPrice * qty;
  }, 0);

  return (
    <div id="reseller-matrix" className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-1">
            <Table className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>High-Speed Bulk Buyer Pad</span>
          </div>
          <h3 className="font-serif text-2xl font-light text-stone-900">
            Wholesale Quick Order Matrix
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Key in case quantities across the collection to draft your opening order in seconds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-stone-500">Matrix Selection:</div>
            <div className="text-sm font-semibold text-stone-900 tabular-nums">
              {totalUnits} units · ${estimatedTotal.toFixed(2)}
            </div>
          </div>
          <button
            onClick={handleAddAll}
            disabled={totalUnits === 0}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              totalUnits > 0
                ? 'bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-xs'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-[#C5A880]" />
            <span>Add All Selected to PO</span>
          </button>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-700">
          <thead>
            <tr className="border-b border-stone-200 text-stone-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-3 px-3">SKU & Product</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3 text-right">MSRP</th>
              <th className="py-3 px-3 text-right">Wholesale Cost</th>
              <th className="py-3 px-3 text-center">Case Pack</th>
              <th className="py-3 px-3 text-center">Order Cases</th>
              <th className="py-3 px-3 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {PRODUCTS.map((product) => {
              const currentUnits = quantities[product.id] || 0;
              const currentCases = Math.floor(currentUnits / product.casePack);

              // active tier price
              let lineUnitPrice = product.wholesalePrice;
              for (const tier of product.wholesaleTiers) {
                if (currentUnits >= tier.minUnits) {
                  lineUnitPrice = tier.pricePerUnit;
                }
              }
              const lineTotal = lineUnitPrice * currentUnits;

              return (
                <tr key={product.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-stone-900 text-xs font-serif">
                      {product.name}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400">
                      {product.sku} · {product.weight}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-stone-500">
                    {product.categoryLabel}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono text-stone-500 tabular-nums">
                    ${product.retailPrice.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono text-emerald-800 font-semibold tabular-nums">
                    ${product.wholesalePrice.toFixed(2)}
                    <span className="block text-[9px] text-stone-400 font-normal">50% off MSRP</span>
                  </td>

                  <td className="py-3.5 px-3 text-center text-stone-600 font-mono">
                    {product.casePack} units/ctn
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleUpdate(product.id, -1)}
                        disabled={currentCases <= 0}
                        className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-30 cursor-pointer"
                        title="Remove 1 case"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-12 text-center font-mono font-semibold text-stone-900">
                        {currentCases} <span className="text-[10px] text-stone-400 font-normal">cs</span>
                      </span>
                      <button
                        onClick={() => handleUpdate(product.id, 1)}
                        className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                        title="Add 1 case"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[10px] text-center text-stone-400 font-mono mt-0.5">
                      ({currentUnits} units)
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-bold text-stone-900 tabular-nums">
                    ${lineTotal.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly Add All bar */}
      <div className="sm:hidden pt-4 border-t border-stone-200 flex items-center justify-between">
        <div className="text-xs">
          <span className="text-stone-500 block">Total:</span>
          <span className="font-semibold text-stone-900 tabular-nums">${estimatedTotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleAddAll}
          disabled={totalUnits === 0}
          className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer ${
            totalUnits > 0 ? 'bg-stone-900 text-stone-50' : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4 text-[#C5A880]" />
          <span>Add to PO</span>
        </button>
      </div>

    </div>
  );
};
