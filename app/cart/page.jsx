// app/cart/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
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

  const delivery = 0;
  const total = cartTotal + delivery;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content - Flex column to push footer to bottom */}
      <div className="main-content-wrapper flex-1 flex flex-col min-h-screen">
        {/* Mobile Header Spacer */}
        <div className="h-14 lg:hidden"></div>

        {/* Main Content - Grows to fill available space */}
        <div className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-[#131212]">Shopping Cart</h1>
              <Link
                href="/products/allproducts"
                className="text-sm text-[#fbb710] hover:text-[#131212] transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                <h2 className="text-xl font-semibold text-[#131212] mb-2">
                  Your cart is currently empty.
                </h2>
                <p className="text-[#6b6b6b] mb-6">
                  Add some products to your cart to see them here.
                </p>
                <Link
                  href="/products/allproducts"
                  className="amado-btn inline-block"
                >
                  Return to Shop
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 py-3 border-b border-[#ebebeb] text-sm font-medium text-[#6b6b6b]">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-3 ml-12">Quantity</div>
                    <div className="col-span-1 text-right">Total</div>
                  </div>

                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div
                      key={`${item._id || item.productId || item.id}-${item.color || 'default'}`}
                      className="grid grid-cols-12 gap-4 py-4 border-b border-[#ebebeb] items-center"
                    >
                      <div className="col-span-6 flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-[#131212]">{item.name}</p>
                          {item.color && (
                            <p className="text-xs text-[#6b6b6b]">Color: {item.color}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-[#131212]">
                        ₹{item.price.toFixed(2)}
                      </div>
                      <div className="col-span-3 flex items-center">
                        <div className="flex items-center border border-[#ebebeb]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item._id || item.productId || item.id, item.quantity - 1, item.color)
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-1 border-l border-r border-[#ebebeb] text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item._id || item.productId || item.id, item.quantity + 1, item.color)
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id || item.productId || item.id, item.color)}
                          className="ml-10 text-[#6b6b6b] hover:text-[#ff4d4f] transition-colors"
                        >
                          <Trash2 className="w-16 h-4" />
                        </button>
                      </div>
                      <div className="col-span-1 text-right text-sm text-[#131212]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-[#ebebeb] p-6 sticky top-4">
                    <h3 className="text-lg font-semibold text-[#131212] mb-4">
                      Cart Total
                    </h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Subtotal:</span>
                        <span className="font-medium text-[#131212]">
                          ₹{cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Delivery:</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t border-[#ebebeb] pt-3">
                        <div className="flex justify-between font-bold text-[#131212]">
                          <span>Total:</span>
                          <span>₹{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="block w-full bg-[#fbb710] text-white text-center py-3 hover:bg-[#131212] transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Always at bottom */}
        <Footer />
      </div>

      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}