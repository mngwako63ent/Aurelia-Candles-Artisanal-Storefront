import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-300">
      <div className="flex items-center gap-3 bg-stone-900 text-stone-100 px-4 py-3 rounded-lg shadow-xl border border-stone-800 text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
