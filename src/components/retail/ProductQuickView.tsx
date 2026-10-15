import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatZAR } from '../../data/products';
import { X, Star, Check, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToRetailCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('Standard 240g');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const imagesList =
    quickViewProduct.images && quickViewProduct.images.length > 0
      ? quickViewProduct.images
      : [quickViewProduct.image];

  const currentDisplayImage = imagesList[activeImageIdx] || quickViewProduct.image;

  const handleAdd = () => {
    addToRetailCart(quickViewProduct, quantity, selectedSize);
    setQuickViewProduct(null);
  };

  const totalPrice = quickViewProduct.retailPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-2xs">
      <div
        className="fixed inset-0"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-10 animate-in fade-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-1.5 text-stone-400 hover:text-stone-700 bg-white/90 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Photo Gallery Column */}
          <div className="relative bg-stone-100 flex flex-col justify-between">
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={currentDisplayImage}
                alt={`${quickViewProduct.name} - view ${activeImageIdx + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Arrows if multiple photos */}
              {imagesList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1))
                    }
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-sm transition-all cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-sm transition-all cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Switcher Bar if product has multiple images */}
            {imagesList.length > 1 && (
              <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-center gap-2">
                {imagesList.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIdx === i
                        ? 'border-stone-900 ring-2 ring-stone-900/20 shadow-xs'
                        : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase tracking-wider font-semibold text-stone-700">
                  {quickViewProduct.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-stone-700 font-medium">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-stone-400">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-light text-stone-900">
                  {quickViewProduct.name}
                </h2>
                <div className="mt-1 text-xl font-semibold text-stone-900 tabular-nums">
                  {formatZAR(quickViewProduct.retailPrice)}
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Scent Notes */}
              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-stone-200 text-xs space-y-1">
                <div className="font-semibold text-stone-700 text-[11px]">Scent Notes Profile:</div>
                <div className="text-stone-600">
                  <strong>Top:</strong> {quickViewProduct.scentPyramid.top.join(', ')}
                </div>
                <div className="text-stone-600">
                  <strong>Heart:</strong> {quickViewProduct.scentPyramid.heart.join(', ')}
                </div>
                <div className="text-stone-600">
                  <strong>Base:</strong> {quickViewProduct.scentPyramid.base.join(', ')}
                </div>
              </div>

              <div className="text-xs text-stone-500 space-y-0.5">
                <div>Burn Time: <strong>{quickViewProduct.burnTime}</strong></div>
                <div>Wax: <strong>{quickViewProduct.waxType}</strong></div>
                <div>Vessel: <strong>{quickViewProduct.vessel}</strong></div>
              </div>
            </div>

            {/* Quantity and Add Button */}
            <div className="pt-3 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-stone-400 block">Total:</span>
                  <span className="text-sm font-semibold text-stone-900 tabular-nums">
                    {formatZAR(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Add to Shopping Bag</span>
                <span>·</span>
                <span>{formatZAR(totalPrice)}</span>
              </button>

              <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>In Stock ({quickViewProduct.stock} left) · Ships across South Africa</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
