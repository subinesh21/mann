'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/Footer';
import Newsletter from '@/components/sections/Newsletter';
import ScrollToTop from '@/components/ScrollToTop';
import { useCart } from '@/context/CartContext';

export default function OrderSuccessPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { clearCart } = useCart();
  const hasCleared = useRef(false); // Prevent multiple clears

  useEffect(() => {
    // Only clear cart once when component mounts
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }

    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [clearCart]); // Add clearCart to dependencies

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="main-content-wrapper">
        <div className="h-14 lg:hidden"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-xl border border-[#ebebeb] p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>

              <h1 className="text-3xl font-bold text-[#131212] mb-4">
                Order Placed Successfully!
              </h1>
              
              <p className="text-[#6b6b6b] mb-8">
                Thank you for your order. We'll send you a confirmation email shortly.
                You can track your order status in your account dashboard.
              </p>

              <div className="bg-[#f5f7fa] p-6 rounded-lg mb-8">
                <Package className="w-12 h-12 text-[#fbb710] mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[#131212] mb-2">
                  What's Next?
                </h3>
                <p className="text-sm text-[#6b6b6b]">
                  We'll process your order and update you on the status. 
                  You'll receive updates via email and SMS.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fbb710] text-white hover:bg-[#131212] transition-colors"
                >
                  <Package className="w-5 h-5" />
                  View My Orders
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#ebebeb] text-[#131212] hover:border-[#fbb710] hover:text-[#fbb710] transition-colors"
                >
                  <Home className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <Newsletter />
        <Footer />
      </div>

      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}