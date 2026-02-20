'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, CreditCard, MapPin, Phone, User, CheckCircle, ShoppingCart, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { cartItems, cartTotal, placeOrder, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loadingProfile) {
      toast.warning('Please login to checkout');
      router.push('/account');
    }
  }, [isAuthenticated, loadingProfile, router]);

  // Fetch user profile with saved shipping address
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/user/profile?userId=${user.id}`);
          const data = await response.json();
          
          if (response.ok && data.user?.shippingAddress?.fullName) {
            // Use saved shipping address
            setShippingInfo({
              fullName: data.user.shippingAddress.fullName || '',
              address: data.user.shippingAddress.address || '',
              city: data.user.shippingAddress.city || '',
              state: data.user.shippingAddress.state || '',
              zipCode: data.user.shippingAddress.zipCode || '',
              country: data.user.shippingAddress.country || 'India',
              phone: data.user.shippingAddress.phone || '',
            });
          } else {
            // Use user name as default if no saved address
            setShippingInfo(prev => ({
              ...prev,
              fullName: user.name || '',
            }));
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setShippingInfo(prev => ({
            ...prev,
            fullName: user.name || '',
          }));
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingInfo.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!shippingInfo.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(shippingInfo.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!shippingInfo.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!shippingInfo.city?.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!shippingInfo.state?.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!shippingInfo.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(shippingInfo.zipCode)) {
      newErrors.zipCode = 'ZIP code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      router.push('/account');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsPlacingOrder(true);
    
    try {
      const orderData = {
        items: cartItems,
        totalAmount: cartTotal,
        shippingAddress: shippingInfo,
        paymentMethod: 'cod',
      };

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      console.log('Placing order with:', { orderData, userData });

      const orderSuccess = await placeOrder(orderData, userData);

      if (orderSuccess) {
        router.push('/orders/success');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex flex-col min-h-screen">
          <div className="h-14 lg:hidden"></div>
          <div className="flex-1 flex items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-[#fbb710] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex flex-col min-h-screen">
          <div className="h-14 lg:hidden"></div>
          <div className="flex-1 px-3 sm:px-6 py-8">
            <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h2 className="text-lg sm:text-xl font-semibold text-[#131212] mb-2">Please Login to Continue</h2>
              <p className="text-xs sm:text-sm text-[#6b6b6b] mb-4">You need to be logged in to place an order.</p>
              <Link
                href="/account"
                className="inline-flex items-center px-4 py-2 bg-[#fbb710] text-white text-sm rounded-lg hover:bg-[#131212] transition-colors"
              >
                Go to Login
              </Link>
            </div>
          </div>
          <Footer />
        </div>
        <ScrollToTop visible={showScrollTop} />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex flex-col min-h-screen">
          <div className="h-14 lg:hidden"></div>
          <div className="flex-1 px-3 sm:px-6 py-8">
            <div className="max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <ShoppingCart className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h2 className="text-lg sm:text-xl font-semibold text-[#131212] mb-2">Your Cart is Empty</h2>
              <p className="text-xs sm:text-sm text-[#6b6b6b] mb-4">Add some products to your cart before proceeding to checkout.</p>
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 bg-[#fbb710] text-white text-sm rounded-lg hover:bg-[#131212] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
          <Footer />
        </div>
        <ScrollToTop visible={showScrollTop} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />
      
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>
        
        <div className="flex-1 px-3 sm:px-6 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <Link 
              href="/cart" 
              className="inline-flex items-center text-xs sm:text-sm text-[#fbb710] hover:text-[#131212] transition-colors mb-2 sm:mb-3"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </Link>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#131212]">Checkout</h1>
            <p className="text-xs sm:text-sm text-[#6b6b6b] mt-1">Complete your purchase with Cash on Delivery</p>
            {shippingInfo.fullName && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Shipping details loaded from your profile
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Order Summary - Mobile first (shows first on mobile) */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="bg-white rounded-lg sm:rounded-xl border border-[#ebebeb] p-3 sm:p-4 lg:p-6 mb-4 lg:mb-0">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#131212] mb-3 sm:mb-4 lg:mb-6">Order Summary</h2>
                
                <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 lg:max-h-105 overflow-y-auto pr-1 sm:pr-2">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item._id}-${item.color}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center py-2 sm:py-3 border-b border-[#ebebeb] last:border-b-0"
                    >
                      <img 
                        src={item.image || '/images/product-chai-cups.jpg'} 
                        alt={item.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded-md sm:rounded-lg"
                        onError={(e) => {
                          e.target.src = '/images/product-chai-cups.jpg';
                        }}
                      />
                      <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-medium text-[#131212] line-clamp-2">{item.name}</h3>
                        {item.color && (
                          <p className="text-[10px] sm:text-xs text-[#6b6b6b]">Color: {item.color}</p>
                        )}
                        <p className="text-[10px] sm:text-xs text-[#6b6b6b]">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right ml-1">
                        <p className="text-xs sm:text-sm font-medium text-[#131212]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-[8px] sm:text-[10px] text-[#6b6b6b]">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#ebebeb]">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-[#6b6b6b]">Subtotal:</span>
                    <span className="font-medium text-[#131212]">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-[#6b6b6b] mt-1 sm:mt-2">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg lg:text-xl font-bold mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#ebebeb]">
                    <span>Total:</span>
                    <span className="text-[#fbb710]">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information Form */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <div className="bg-white rounded-lg sm:rounded-xl border border-[#ebebeb] p-3 sm:p-4 lg:p-6 sticky top-16 lg:top-8">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#131212] mb-3 sm:mb-4 lg:mb-6">Shipping Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#131212] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${errors.fullName ? 'text-red-500' : 'text-[#6b6b6b]'}`} />
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-xs sm:text-sm border ${errors.fullName ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-0.5 text-[10px] sm:text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#131212] mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${errors.phone ? 'text-red-500' : 'text-[#6b6b6b]'}`} />
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-xs sm:text-sm border ${errors.phone ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-0.5 text-[10px] sm:text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#131212] mb-1">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className={`absolute left-2 sm:left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 ${errors.address ? 'text-red-500' : 'text-[#6b6b6b]'}`} />
                      <textarea
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        rows={2}
                        className={`w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-xs sm:text-sm border ${errors.address ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710] resize-none`}
                        placeholder="Street address, apartment, suite, etc."
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-0.5 text-[10px] sm:text-xs text-red-500">{errors.address}</p>
                    )}
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-medium text-[#131212] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border ${errors.city ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                      {errors.city && (
                        <p className="mt-0.5 text-[8px] sm:text-[10px] text-red-500">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-medium text-[#131212] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border ${errors.state ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                      {errors.state && (
                        <p className="mt-0.5 text-[8px] sm:text-[10px] text-red-500">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-medium text-[#131212] mb-1">
                        ZIP *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        placeholder="6-digit"
                        maxLength={6}
                        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border ${errors.zipCode ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                      {errors.zipCode && (
                        <p className="mt-0.5 text-[8px] sm:text-[10px] text-red-500">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Country (read-only) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#131212] mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      readOnly
                      className="w-full px-3 py-2 sm:py-3 text-xs sm:text-sm border border-[#ebebeb] rounded-none bg-[#f5f7fa] text-[#6b6b6b]"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="pt-2 sm:pt-3 border-t border-[#ebebeb]">
                    <h3 className="text-xs sm:text-sm font-medium text-[#131212] mb-2 sm:mb-3">Payment Method</h3>
                    <div className="flex items-center p-2 sm:p-3 bg-[#f5f7fa] border border-[#ebebeb]">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#131212] mr-2 sm:mr-3" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#131212]">Cash on Delivery</p>
                        <p className="text-[10px] sm:text-xs text-[#6b6b6b]">Pay when your order is delivered</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPlacingOrder}
                    className="w-full bg-[#fbb710] hover:bg-[#52dd28ff] text-white font-medium py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 rounded-none transition-colors flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm lg:text-base"
                  >
                    {isPlacingOrder ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs sm:text-sm">Processing...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                        <span className="text-xs sm:text-sm">Place Order ({formatPrice(cartTotal)})</span>
                      </>
                    )}
                  </button>

                  <p className="text-[8px] sm:text-[10px] text-center text-[#6b6b6b] mt-2 sm:mt-3">
                    By placing this order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}