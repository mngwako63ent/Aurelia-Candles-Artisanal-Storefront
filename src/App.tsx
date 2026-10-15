/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/retail/Header';
import { Hero } from './components/retail/Hero';
import { ProductGrid } from './components/retail/ProductGrid';
import { AtelierStory } from './components/retail/AtelierStory';
import { FAQSection } from './components/retail/FAQSection';
import { ContactSection } from './components/retail/ContactSection';
import { CartDrawer } from './components/retail/CartDrawer';
import { CheckoutModal } from './components/retail/CheckoutModal';
import { ProductQuickView } from './components/retail/ProductQuickView';
import { ResellerPortal } from './components/reseller/ResellerPortal';
import { Footer } from './components/shared/Footer';
import { Toast } from './components/shared/Toast';

const MainContent: React.FC = () => {
  const { currentMode, setCurrentMode } = useCart();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#E5D5C5] selection:text-stone-900">
      {/* Universal Navigation Header with SA Banner and Switcher */}
      <Header onNavigate={scrollToSection} />

      {/* Main View Mode: Retail Storefront vs Reseller Portal */}
      <main className="flex-1">
        {currentMode === 'retail' ? (
          <div>
            <Hero
              onShopClick={() => scrollToSection('shop')}
              onResellerClick={() => setCurrentMode('reseller')}
            />
            <ProductGrid />
            <AtelierStory />
            <FAQSection />
            <ContactSection />
          </div>
        ) : (
          <ResellerPortal />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductQuickView />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
