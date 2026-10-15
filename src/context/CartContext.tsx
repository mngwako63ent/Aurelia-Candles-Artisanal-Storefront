import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ViewMode } from '../types';

interface CartContextType {
  retailCart: CartItem[];
  wholesaleCart: CartItem[];
  currentMode: ViewMode;
  setCurrentMode: (mode: ViewMode) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  addToRetailCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  addToWholesaleCart: (product: Product, quantity: number) => void;
  updateRetailQuantity: (productId: string, quantity: number) => void;
  updateWholesaleQuantity: (productId: string, quantity: number) => void;
  removeFromRetailCart: (productId: string) => void;
  removeFromWholesaleCart: (productId: string) => void;
  clearRetailCart: () => void;
  clearWholesaleCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedDiscount: number;
  applyPromoCode: (code: string) => boolean;
  retailSubtotal: number;
  retailDiscountAmount: number;
  retailShipping: number;
  retailTotal: number;
  wholesaleSubtotal: number;
  wholesaleTotalUnits: number;
  wholesaleShipping: number;
  wholesaleTotal: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ViewMode>('retail');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [retailCart, setRetailCart] = useState<CartItem[]>([]);
  const [wholesaleCart, setWholesaleCart] = useState<CartItem[]>([]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const addToRetailCart = (product: Product, quantity: number = 1, selectedSize: string = 'Standard 240g') => {
    setRetailCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize,
          isWholesale: false,
          unitPrice: product.retailPrice,
        },
      ];
    });
    showToast(`Added ${quantity} × ${product.name} to cart`);
    setIsCartOpen(true);
  };

  const updateRetailQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromRetailCart(productId);
      return;
    }
    setRetailCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromRetailCart = (productId: string) => {
    setRetailCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearRetailCart = () => {
    setRetailCart([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AURELIA10' || clean === 'WELCOME10') {
      setAppliedDiscount(0.10);
      showToast('10% discount applied!');
      return true;
    } else {
      showToast('Invalid code. Try "AURELIA10" for 10% off.');
      return false;
    }
  };

  const addToWholesaleCart = (product: Product, quantity: number) => {
    const actualQty = Math.max(product.casePack, quantity);
    let unitPrice = product.wholesalePrice;
    for (const tier of product.wholesaleTiers) {
      if (actualQty >= tier.minUnits) {
        unitPrice = tier.pricePerUnit;
      }
    }

    setWholesaleCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + actualQty;
        let newUnitPrice = product.wholesalePrice;
        for (const tier of product.wholesaleTiers) {
          if (newQty >= tier.minUnits) {
            newUnitPrice = tier.pricePerUnit;
          }
        }
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQty, unitPrice: newUnitPrice }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: actualQty,
          selectedSize: product.weight,
          isWholesale: true,
          unitPrice,
        },
      ];
    });
    showToast(`Added ${actualQty} units of ${product.name} to Wholesale Order`);
    setIsCartOpen(true);
  };

  const updateWholesaleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromWholesaleCart(productId);
      return;
    }
    setWholesaleCart((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        let unitPrice = item.product.wholesalePrice;
        for (const tier of item.product.wholesaleTiers) {
          if (quantity >= tier.minUnits) {
            unitPrice = tier.pricePerUnit;
          }
        }
        return { ...item, quantity, unitPrice };
      })
    );
  };

  const removeFromWholesaleCart = (productId: string) => {
    setWholesaleCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed from wholesale order');
  };

  const clearWholesaleCart = () => {
    setWholesaleCart([]);
  };

  // South African Currency Thresholds
  const retailSubtotal = retailCart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const retailDiscountAmount = retailSubtotal * appliedDiscount;
  // Free delivery over R850, otherwise flat R85
  const retailShipping = retailSubtotal >= 850 || retailSubtotal === 0 ? 0 : 85.00;
  const retailTotal = Math.max(0, retailSubtotal - retailDiscountAmount + retailShipping);

  const wholesaleTotalUnits = wholesaleCart.reduce((sum, item) => sum + item.quantity, 0);
  const wholesaleSubtotal = wholesaleCart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  // Free wholesale freight over R5,000, otherwise R180
  const wholesaleShipping = wholesaleSubtotal >= 5000 || wholesaleSubtotal === 0 ? 0 : 180.00;
  const wholesaleTotal = wholesaleSubtotal + wholesaleShipping;

  return (
    <CartContext.Provider
      value={{
        retailCart,
        wholesaleCart,
        currentMode,
        setCurrentMode,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToRetailCart,
        addToWholesaleCart,
        updateRetailQuantity,
        updateWholesaleQuantity,
        removeFromRetailCart,
        removeFromWholesaleCart,
        clearRetailCart,
        clearWholesaleCart,
        promoCode,
        setPromoCode,
        appliedDiscount,
        applyPromoCode,
        retailSubtotal,
        retailDiscountAmount,
        retailShipping,
        retailTotal,
        wholesaleSubtotal,
        wholesaleTotalUnits,
        wholesaleShipping,
        wholesaleTotal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
