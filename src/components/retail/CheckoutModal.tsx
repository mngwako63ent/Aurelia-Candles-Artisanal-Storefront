import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatZAR } from '../../data/products';
import { X, CheckCircle2, Lock, CreditCard, ShieldCheck } from 'lucide-react';

const SA_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Mpumalanga',
  'Limpopo',
  'North West',
  'Northern Cape',
];

export const CheckoutModal: React.FC = () => {
  const {
    currentMode,
    isCheckoutOpen,
    setIsCheckoutOpen,
    retailCart,
    wholesaleCart,
    retailTotal,
    wholesaleTotal,
    clearRetailCart,
    clearWholesaleCart,
  } = useCart();

  const isRetail = currentMode === 'retail';
  const total = isRetail ? retailTotal : wholesaleTotal;

  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    fullName: 'K. Tsineng',
    email: 'ktsineng95@gmail.com',
    phone: '+27 652 442 433',
    address: 'Makhubung',
    city: 'Mafikeng',
    province: 'North West',
    postalCode: '2745',
    companyName: 'Aurelia Candles Partner',
    paymentMethod: isRetail ? 'card-eft' : 'net30',
  });

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = isRetail
      ? `ZA-AUR-${Math.floor(10000 + Math.random() * 90000)}`
      : `ZA-B2B-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generated);
    setSubmitted(true);
    if (isRetail) {
      clearRetailCart();
    } else {
      clearWholesaleCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/65 backdrop-blur-2xs">
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-10 animate-in fade-in duration-200 my-6">
        
        {/* Header */}
        <div className="bg-[#FAF8F5] px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-serif text-lg font-medium text-stone-900">
              {isRetail ? 'Fast Checkout · South Africa' : 'Wholesale Order Confirmation'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            /* Simple Confirmation */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-2xl text-stone-900 font-light">
                  {isRetail ? 'Order Confirmed!' : 'Wholesale Order Logged!'}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Confirmation sent to <strong className="text-stone-800">{formData.email}</strong>
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200 text-xs text-left space-y-2">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Order Number:</span>
                  <span className="font-mono font-semibold text-stone-900">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Recipient:</span>
                  <span className="font-medium text-stone-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="text-stone-800 text-right">
                    {formData.address}, {formData.city}, {formData.province} ({formData.postalCode})
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-semibold text-stone-950 text-sm">
                  <span>Total Paid / Due:</span>
                  <span className="tabular-nums font-bold">{formatZAR(total)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-stone-900 text-stone-50 text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Simplified 1-Page Checkout */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-2.5">
                  1. Delivery Details (South Africa)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Cell / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Province</label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
                    >
                      {SA_PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">City / Town</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2 border-t border-stone-200">
                <h4 className="font-semibold text-stone-900 text-sm mb-2">
                  2. Payment Method
                </h4>

                {isRetail ? (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 p-3 rounded-lg border border-stone-300 bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.paymentMethod === 'card-eft'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card-eft' })}
                      />
                      <CreditCard className="w-4 h-4 text-[#C5A880]" />
                      <span className="font-medium text-stone-900">
                        Visa / Mastercard / Instant EFT (Ozow & PayFast)
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      />
                      <span className="font-medium text-stone-800">
                        Cash or Card on Delivery (Select Areas)
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
                    <div className="font-medium text-stone-900">Wholesale Account: 30-Day Terms</div>
                    <p className="text-stone-500 text-[11px]">
                      Your business will be sent an official commercial tax invoice for EFT payment.
                    </p>
                  </div>
                )}
              </div>

              {/* Total & Submit Button */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-stone-500 block text-[11px]">Total to pay:</span>
                  <span className="text-lg font-bold text-stone-950 tabular-nums">
                    {formatZAR(total)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>{isRetail ? 'Place Order' : 'Submit Wholesale PO'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
