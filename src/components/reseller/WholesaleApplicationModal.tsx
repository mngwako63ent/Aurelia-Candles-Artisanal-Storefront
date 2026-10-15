import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, CheckCircle2, ShieldCheck, Building2, Store } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleApplicationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { showToast } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    businessName: 'Verve & Velvet Boutique',
    contactName: 'Chloe Bennett',
    email: 'chloe@vervevelvet.com',
    phone: '(503) 555-0192',
    businessType: 'brick-and-mortar',
    taxId: 'EIN-84-9218491',
    website: 'https://vervevelvetboutique.com',
    storeLocation: 'Portland, OR',
    projectedVolume: 'tier2',
    notes: 'We carry high-end home goods, linen bedding, and curated apothecary brands.',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Wholesale application registered! Instant stockist access granted.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <Store className="w-5 h-5 text-[#C5A880]" />
            <div>
              <h3 className="font-serif text-lg font-light text-stone-100">
                Aurelia Stockist & Reseller Registration
              </h3>
              <p className="text-[11px] text-stone-400">
                Opening order opening tier: $350 · Net-30 credit approval
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-200 p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-stone-900 font-light">
                Application Approved · Stockist Status Active
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Welcome, <strong>{form.contactName}</strong>! Your account for <strong>{form.businessName}</strong> has been provisioned with Tier 1 wholesale pricing and Net 30 invoicing eligibility.
              </p>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs text-stone-700 max-w-md mx-auto text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Reseller Account ID:</span>
                  <span className="font-mono font-semibold text-stone-900">AUR-RESELLER-7729</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Authorized Region:</span>
                  <span className="font-medium">{form.storeLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Opening Discount:</span>
                  <span className="text-emerald-700 font-semibold">50% off MSRP Guaranteed</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-stone-900 text-stone-50 text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
              >
                Enter Wholesale Ordering Suite
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Boutique / Company Legal Name</label>
                  <input
                    type="text"
                    required
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Primary Buyer / Contact Name</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Commercial Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Direct Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Tax ID / Reseller Permit / EIN</label>
                  <input
                    type="text"
                    required
                    value={form.taxId}
                    onChange={(e) => setForm({ ...form, taxId: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Store Type</label>
                  <select
                    value={form.businessType}
                    onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                  >
                    <option value="brick-and-mortar">Brick & Mortar Boutique</option>
                    <option value="spa-salon">Luxury Spa / Wellness Salon</option>
                    <option value="hospitality">Boutique Hotel / Hospitality</option>
                    <option value="online-gift">Curated E-Commerce / Gift Box</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-medium mb-1">Store Website or Instagram</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-medium mb-1">About Your Retail Concept</label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2.5 text-[11px] text-stone-600">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>
                  By registering, you agree to adhere to Aurelia Minimum Advertised Price (MAP) guidelines and qualify for 50–60% wholesale margins.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Submit Stockist Application
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
