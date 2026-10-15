import React from 'react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { X, Download, Printer, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LineSheetModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { showToast } = useCart();

  if (!isOpen) return null;

  const handleDownload = () => {
    showToast('2026 Aurelia Wholesale Line Sheet PDF downloaded successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-6">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#C5A880]" />
            <div>
              <h3 className="font-serif text-lg font-light text-stone-100">
                Aurelia Candles · 2026 Buyer Line Sheet & Specification
              </h3>
              <p className="text-[11px] text-stone-400">
                Official B2B product specifications, case packs, barcodes, and MSRP index
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#B8986D] text-stone-950 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-200 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Line Sheet Document Preview */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto font-sans text-xs space-y-6">
          
          <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
            <div>
              <div className="font-serif text-2xl uppercase tracking-widest text-stone-900 font-light">
                Aurelia Atelier
              </div>
              <div className="text-stone-500 text-[11px] font-mono mt-0.5">
                Wholesale Division · Hudson Valley Studio · MAP Protected
              </div>
            </div>
            <div className="text-right text-[11px] text-stone-500 font-mono">
              <div>Effective: Autumn/Winter 2026</div>
              <div>Terms: Net 30 Upon Approval · FOB Hudson NY</div>
            </div>
          </div>

          {/* Line Sheet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-800 text-[10px] font-mono uppercase tracking-wider text-stone-600">
                  <th className="py-2 pr-3">SKU</th>
                  <th className="py-2 px-3">Item Description</th>
                  <th className="py-2 px-3">Vessel & Wick</th>
                  <th className="py-2 px-3 text-center">Case Pack</th>
                  <th className="py-2 px-3 text-right">Wholesale (Tier 1)</th>
                  <th className="py-2 px-3 text-right">Wholesale (Tier 3)</th>
                  <th className="py-2 pl-3 text-right">MSRP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50">
                    <td className="py-3 pr-3 font-mono text-stone-800 font-semibold">{p.sku}</td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-stone-900">{p.name}</div>
                      <div className="text-[10px] text-stone-500">{p.scentPyramid.top[0]}, {p.scentPyramid.heart[0]}, {p.scentPyramid.base[0]}</div>
                    </td>
                    <td className="py-3 px-3 text-stone-600">
                      <div>{p.vessel}</div>
                      <div className="text-[10px] text-stone-400">{p.weight}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-stone-700">{p.casePack} / box</td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-stone-900">${p.wholesalePrice.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-800">${p.wholesaleTiers[2]?.pricePerUnit.toFixed(2) || p.wholesalePrice.toFixed(2)}</td>
                    <td className="py-3 pl-3 text-right font-mono text-stone-500">${p.retailPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Terms & Policies Callout */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-stone-600">
            <div>
              <strong className="block text-stone-900 font-semibold mb-1">Opening Orders</strong>
              Minimum initial order is $350 or 2 master cartons. Re-orders minimum $200.
            </div>
            <div>
              <strong className="block text-stone-900 font-semibold mb-1">Tester Policy</strong>
              1 free tester unit included for every 48 candle units ordered. Additional testers billed at $10.00.
            </div>
            <div>
              <strong className="block text-stone-900 font-semibold mb-1">Lead Time & Shipping</strong>
              Orders ship within 3–5 business days via UPS Ground or Palletized Freight.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
