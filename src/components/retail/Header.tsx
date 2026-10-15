import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Menu, X, Store, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const {
    retailCart,
    wholesaleCart,
    currentMode,
    setCurrentMode,
    setIsCartOpen,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems =
    currentMode === 'retail'
      ? retailCart.reduce((sum, item) => sum + item.quantity, 0)
      : wholesaleCart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Banner with SA Delivery Message */}
      <div className="bg-[#1C1917] text-[#EDE8E1] px-4 py-2 text-xs font-medium text-center tracking-wide flex items-center justify-center gap-3">
        <span>Free Door-to-Door Courier Delivery in South Africa on orders over R850</span>
        <span className="text-[#C5A880] hidden md:inline">·</span>
        <button
          onClick={() => setCurrentMode(currentMode === 'retail' ? 'reseller' : 'retail')}
          className="text-[#D6B278] hover:text-white underline underline-offset-4 hidden md:inline cursor-pointer"
        >
          {currentMode === 'retail' ? 'Looking for wholesale pricing? Switch to Reseller Portal →' : '← Return to Retail Storefront'}
        </button>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo with Gold Monogram */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              <img
                src="/Gold_monogram_logo_asset_2K_20261012134306.png"
                alt="Aurelia Gold Monogram Logo"
                className="w-10 h-10 object-contain rounded-full shadow-2xs group-hover:scale-105 transition-transform shrink-0"
              />
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase text-stone-900 group-hover:text-stone-700 transition-colors">
                  Aurelia
                </span>
                <span className="block text-[10px] font-sans tracking-[0.25em] uppercase text-stone-500 font-medium -mt-1">
                  Artisanal Candles · SA
                </span>
              </div>
            </button>
          </div>

          {/* Simple Segmented View Mode Switcher in Center */}
          <div className="hidden md:flex items-center bg-stone-200/70 p-1 rounded-xl border border-stone-300/60 shadow-2xs">
            <button
              onClick={() => setCurrentMode('retail')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentMode === 'retail'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Retail Store</span>
            </button>
            <button
              onClick={() => setCurrentMode('reseller')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentMode === 'reseller'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Reseller Portal (50% Off)</span>
            </button>
          </div>

          {/* Nav Links & Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
              {currentMode === 'retail' ? (
                <>
                  <button
                    onClick={() => handleNavClick('shop')}
                    className="hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    Shop Candles
                  </button>
                  <button
                    onClick={() => handleNavClick('story')}
                    className="hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => handleNavClick('faq')}
                    className="hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    Delivery & FAQ
                  </button>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('wholesale-catalogue')}
                    className="hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    Wholesale Catalogue
                  </button>
                  <button
                    onClick={() => handleNavClick('wholesale-terms')}
                    className="hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    Terms & Net-30
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Mode Switch Button */}
            <div className="md:hidden">
              <button
                onClick={() => setCurrentMode(currentMode === 'retail' ? 'reseller' : 'retail')}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-stone-900 text-stone-100 flex items-center gap-1.5"
              >
                <Store className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{currentMode === 'retail' ? 'Reseller' : 'Retail'}</span>
              </button>
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 shadow-2xs transition-colors cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C5A880] text-stone-950 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-stone-700 hover:bg-stone-200/60 rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
              {currentMode === 'retail' ? (
                <>
                  <button
                    onClick={() => handleNavClick('shop')}
                    className="text-left py-2 hover:text-stone-950 border-b border-stone-200/50"
                  >
                    Shop Candles
                  </button>
                  <button
                    onClick={() => handleNavClick('story')}
                    className="text-left py-2 hover:text-stone-950 border-b border-stone-200/50"
                  >
                    Our Story
                  </button>
                  <button
                    onClick={() => handleNavClick('faq')}
                    className="text-left py-2 hover:text-stone-950 border-b border-stone-200/50"
                  >
                    Delivery & FAQ
                  </button>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="text-left py-2 hover:text-stone-950"
                  >
                    Contact Atelier
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('wholesale-catalogue')}
                    className="text-left py-2 hover:text-stone-950 border-b border-stone-200/50"
                  >
                    Wholesale Catalogue
                  </button>
                  <button
                    onClick={() => handleNavClick('wholesale-terms')}
                    className="text-left py-2 hover:text-stone-950"
                  >
                    Wholesale Terms
                  </button>
                </>
              )}
            </div>

            <div className="pt-2 border-t border-stone-200">
              <button
                onClick={() => {
                  setCurrentMode(currentMode === 'retail' ? 'reseller' : 'retail');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4 text-[#C5A880]" />
                <span>
                  {currentMode === 'retail' ? 'Switch to Reseller Portal' : 'Return to Retail Store'}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
