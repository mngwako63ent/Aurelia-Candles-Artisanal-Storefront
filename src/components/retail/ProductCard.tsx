import React from 'react';
import { Product } from '../../types';
import { formatZAR } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Eye, Plus, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToRetailCart, setQuickViewProduct } = useCart();
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = imagesList[currentImgIndex] || product.image;

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200">
      
      {/* Product Image Stage */}
      <div
        className="relative aspect-[4/3] bg-stone-100 overflow-hidden"
        onMouseEnter={() => {
          if (imagesList.length > 1) setCurrentImgIndex(1);
        }}
        onMouseLeave={() => {
          if (imagesList.length > 1) setCurrentImgIndex(0);
        }}
      >
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {product.isBestSeller && (
          <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide uppercase text-stone-900 bg-white/95 px-2.5 py-0.5 rounded shadow-2xs">
            Best Seller
          </span>
        )}

        {/* Multi-image indicators if product has 2 images */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full z-10">
            {imagesList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentImgIndex === idx ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
            <span className="text-[10px] text-white/90 font-mono ml-0.5">
              {currentImgIndex + 1}/{imagesList.length}
            </span>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-3 right-3 p-2 bg-white/95 hover:bg-white text-stone-700 rounded-lg shadow-sm transition-all cursor-pointer z-10"
          title="Quick View"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>{product.categoryLabel}</span>
            <span>·</span>
            <span>{product.burnTime}</span>
          </div>

          <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Scent notes summary */}
          <div className="text-[11px] text-stone-500 pt-1">
            <span className="font-medium text-stone-700">Notes:</span>{' '}
            {product.scentPyramid.top[0]}, {product.scentPyramid.heart[0]}, {product.scentPyramid.base[0]}
          </div>
        </div>

        {/* Price & Add Action in South African Rand (ZAR) */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-stone-900 tabular-nums">
              {formatZAR(product.retailPrice)}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-500">
              <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
              <span>{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          <button
            onClick={() => addToRetailCart(product, 1)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};
