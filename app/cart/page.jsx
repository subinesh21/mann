// app/cart/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const delivery = 0;
  const total = cartTotal + delivery;

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />

      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>

        <div className="flex-1 container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-2xl sm:text-3xl font-bold text-[#131212]">Shopping Cart</h4>
            <Link 
              href="/products" 
              className="text-[#6b6b6b] text-sm mb-6"
            >
              ← Continue Shopping
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag className="w-14 h-14 text-gray-200 mb-4" />
              <h2 className="text-lg font-semibold text-[#131212] mb-2">Your cart is empty</h2>
              <p className="text-[#6b6b6b] text-sm mb-6">Add products to see them here.</p>
              <Link 
                href="/shop" 
                className="inline-block px-6 py-3 bg-[#52dd28ff] text-white text-sm hover:bg-[#45b824] transition-colors rounded"
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="flex-1 space-y-0">
                {/* Table Header - Hidden on mobile */}
                <div className="hidden sm:grid grid-cols-12 gap-4 py-3 border-b border-[#ebebeb] text-xs font-medium text-[#6b6b6b]">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-3">Quantity</div>
                  <div className="col-span-1 text-right">Total</div>
                </div>

                {/* Cart Items List */}
                {cartItems.map((item) => (
                  <div 
                    key={`${item._id || item.productId || item.id}-${item.color || 'default'}`} 
                    className="border-b border-[#ebebeb] py-4"
                  >
                    {/* Mobile Layout */}
                    <div className="flex gap-3 sm:hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover flex-shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#131212] truncate">{item.name}</p>
                        {item.color && (
                          <p className="text-xs text-[#6b6b6b]">Color: {item.color}</p>
                        )}
                        <p className="text-sm text-[#52dd28ff] font-semibold mt-1">
                          {formatPrice(item.price)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#ebebeb]">
                            <button
                              onClick={() => updateQuantity(item._id || item.productId || item.id, item.quantity - 1, item.color)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-xs border-x border-[#ebebeb]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id || item.productId || item.id, item.quantity + 1, item.color)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          {/* Price and Remove */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-[#131212]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item._id || item.productId || item.id, item.color)}
                              className="text-[#6b6b6b] hover:text-[#ff4d4f] transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover" 
                        />
                        <div>
                          <p className="font-medium text-[#131212] text-sm">{item.name}</p>
                          {item.color && (
                            <p className="text-xs text-[#6b6b6b]">Color: {item.color}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-[#52dd28ff] font-medium">
                        {formatPrice(item.price)}
                      </div>
                      <div className="col-span-3 flex items-center gap-4">
                        <div className="flex items-center border border-[#ebebeb]">
                          <button
                            onClick={() => updateQuantity(item._id || item.productId || item.id, item.quantity - 1, item.color)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-1 border-x border-[#ebebeb] text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id || item.productId || item.id, item.quantity + 1, item.color)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id || item.productId || item.id, item.color)}
                          className="text-[#6b6b6b] hover:text-[#ff4d4f] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="col-span-1 text-right text-sm font-medium text-[#131212]">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary - Smaller and Compact */}
              <div className="lg:w-64">
                <div className="border border-[#ebebeb] p-4 sticky top-16 lg:top-4 rounded">
                  <h3 className="text-base font-semibold text-[#131212] mb-3">Cart Total</h3>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6b6b6b]">Subtotal:</span>
                      <span className="font-medium text-[#131212] text-sm">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6b6b6b]">Delivery:</span>
                      <span className="text-[#52dd28ff] font-medium text-xs">Free</span>
                    </div>
                    <div className="border-t border-[#ebebeb] pt-2 flex justify-between font-semibold text-[#131212]">
                      <span className="text-sm">Total:</span>
                      <span className="text-[#52dd28ff] font-bold text-base">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-[#52dd28ff] text-white text-center py-2.5 text-xs font-semibold hover:bg-[#45b824] transition-colors rounded"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                  
                  <p className="text-[8px] text-center text-[#6b6b6b] mt-2">
                    Secure checkout powered by CGG
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}