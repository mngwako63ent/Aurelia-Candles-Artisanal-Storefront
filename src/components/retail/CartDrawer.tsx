import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatZAR } from '../../data/products';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    currentMode,
    isCartOpen,
    setIsCartOpen,
    retailCart,
    wholesaleCart,
    updateRetailQuantity,
    updateWholesaleQuantity,
    removeFromRetailCart,
    removeFromWholesaleCart,
    retailSubtotal,
    retailDiscountAmount,
    retailShipping,
    retailTotal,
    wholesaleSubtotal,
    wholesaleShipping,
    wholesaleTotal,
    appliedDiscount,
    applyPromoCode,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const isRetail = currentMode === 'retail';
  const cartItems = isRetail ? retailCart : wholesaleCart;
  const subtotal = isRetail ? retailSubtotal : wholesaleSubtotal;
  const shipping = isRetail ? retailShipping : wholesaleShipping;
  const total = isRetail ? retailTotal : wholesaleTotal;

  // South African delivery threshold
  const threshold = isRetail ? 850 : 5000;
  const amountToFreeShipping = Math.max(0, threshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromoCode(inputCode);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/50 backdrop-blur-2xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h2 className="font-serif text-lg font-medium text-stone-900">
                {isRetail ? 'Your Shopping Bag' : 'Wholesale Order'}
              </h2>
              <span className="text-xs text-stone-500 font-mono">
                ({cartItems.reduce((s, i) => s + i.quantity, 0)} {isRetail ? 'items' : 'units'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Threshold Banner (ZAR) */}
          <div className="bg-[#F5EFE6] px-5 py-3 border-b border-[#E8DCCB] text-xs">
            <div className="flex items-center gap-2 text-stone-800 font-medium mb-1">
              <Truck className="w-3.5 h-3.5 text-[#A37E4C]" />
              {amountToFreeShipping === 0 ? (
                <span className="text-emerald-800 font-semibold">
                  You qualified for Free Nationwide Courier Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-stone-900">{formatZAR(amountToFreeShipping)}</strong> more for free delivery
                </span>
              )}
            </div>
            <div className="w-full bg-[#E3D4C0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C5A880] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.product.id + (item.selectedSize || '')} className="pt-4 first:pt-0 flex gap-3.5">
                  <div className="w-18 h-18 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-medium text-stone-900 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            isRetail
                              ? removeFromRetailCart(item.product.id)
                              : removeFromWholesaleCart(item.product.id)
                          }
                          className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500">
                        {item.selectedSize || item.product.weight}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                        <button
                          onClick={() => {
                            const step = isRetail ? 1 : item.product.casePack || 6;
                            isRetail
                              ? updateRetailQuantity(item.product.id, item.quantity - step)
                              : updateWholesaleQuantity(item.product.id, item.quantity - step);
                          }}
                          className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            const step = isRetail ? 1 : item.product.casePack || 6;
                            isRetail
                              ? updateRetailQuantity(item.product.id, item.quantity + step)
                              : updateWholesaleQuantity(item.product.id, item.quantity + step);
                          }}
                          className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold text-stone-900 tabular-nums">
                          {formatZAR(item.unitPrice * item.quantity)}
                        </span>
                        <div className="text-[10px] text-stone-400">
                          {formatZAR(item.unitPrice)} each
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse our handcrafted pure soy candles and find your favorite aroma.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Explore Candles
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
              
              {/* Promo Code Input (Retail) */}
              {isRetail && (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. AURELIA10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-stone-200 text-stone-900 placeholder:text-stone-400 uppercase focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-stone-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Totals Breakdown */}
              <div className="space-y-1 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900 tabular-nums">{formatZAR(subtotal)}</span>
                </div>

                {appliedDiscount > 0 && isRetail && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span className="tabular-nums">-{formatZAR(retailDiscountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Courier Delivery (South Africa)</span>
                  <span className="tabular-nums font-medium text-stone-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      formatZAR(shipping)
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-semibold text-stone-900">
                  <span>Total Due</span>
                  <span className="tabular-nums text-base text-stone-950 font-bold">{formatZAR(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{isRetail ? 'Proceed to Checkout' : 'Review & Submit Wholesale Order'}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>

              <div className="text-[10px] text-center text-stone-400">
                Door-to-door courier via The Courier Guy across SA
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
