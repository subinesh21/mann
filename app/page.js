'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sections/Sidebar';
import CategoryGrid from '@/components/sections/CategoryGrid';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent hydration mismatch by ensuring consistent rendering
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-[#fbb710] mx-auto"></div>
            <div className="mt-4 text-center text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className="main-content-wrapper">
        <div className="h-14 lg:hidden">
        </div>
        
        <CategoryGrid />
        
        <Footer />
      </div>
    </div>
  );
}