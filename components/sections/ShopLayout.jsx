'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Newsletter from './Newsletter';
import ScrollToTop from '../ScrollToTop';

export default function ShopLayout({ children, sidebarFilters }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setShowScrollTop(window.scrollY > 400);
    });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="main-content-wrapper">
        {/* Mobile Header Spacer */}
        <div className="h-14 lg:hidden"></div>
        
        {/* Shop Content with Sidebar Filters */}
        <div className="flex flex-col lg:flex-row">
          {/* Shop Sidebar - Filters */}
          {sidebarFilters && (
            <aside className="shop_sidebar_area lg:w-[280px] flex-shrink-0">
              {sidebarFilters}
            </aside>
          )}
          
          {/* Product Area */}
          <main className="amado_product_area flex-1">
            {children}
          </main>
        </div>
        
        {/* Newsletter Section */}
        <Newsletter />
        
        {/* Footer */}
        <Footer />
      </div>
      
      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}
