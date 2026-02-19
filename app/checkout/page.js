'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, CreditCard, MapPin, Phone, User, CheckCircle, ShoppingCart, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/sections/Sidebar';
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
        <div className="main-content-wrapper">
          <div className="h-14 lg:hidden"></div>
          <div className="flex items-center justify-center py-24">
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
        <div className="main-content-wrapper">
          <div className="h-14 lg:hidden"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
              <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-[#131212] mb-2">Please Login to Continue</h2>
              <p className="text-[#6b6b6b] mb-6">You need to be logged in to place an order.</p>
              <Link
                href="/account"
                className="inline-flex items-center px-6 py-3 bg-[#fbb710] text-white rounded-lg hover:bg-[#131212] transition-colors"
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
        <div className="main-content-wrapper">
          <div className="h-14 lg:hidden"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-[#131212] mb-2">Your Cart is Empty</h2>
              <p className="text-[#6b6b6b] mb-6">Add some products to your cart before proceeding to checkout.</p>
              <Link
                href="/products/allproducts"
                className="inline-flex items-center px-6 py-3 bg-[#fbb710] text-white rounded-lg hover:bg-[#131212] transition-colors"
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
      
      <div className="main-content-wrapper">
        <div className="h-14 lg:hidden"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/cart" 
              className="inline-flex items-center text-[#fbb710] hover:text-[#131212] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-[#131212]">Checkout</h1>
            <p className="text-[#6b6b6b] mt-2">Complete your purchase with Cash on Delivery</p>
            {shippingInfo.fullName && (
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Shipping details loaded from your profile
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-[#ebebeb] p-6">
                <h2 className="text-xl font-semibold text-[#131212] mb-6">Order Summary</h2>
                
                <div className="space-y-4 max-h-105 overflow-y-auto pr-2">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item._id}-${item.color}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center py-4 border-b border-[#ebebeb] last:border-b-0"
                    >
                      <img 
                        src={item.image || '/images/product-chai-cups.jpg'} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/images/product-chai-cups.jpg';
                        }}
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-[#131212] line-clamp-2">{item.name}</h3>
                        {item.color && (
                          <p className="text-sm text-[#6b6b6b]">Color: {item.color}</p>
                        )}
                        <p className="text-sm text-[#6b6b6b]">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#131212]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-[#6b6b6b]">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#ebebeb]">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#6b6b6b] mt-2">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-[#ebebeb]">
                    <span>Total:</span>
                    <span className="text-[#fbb710]">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-[#ebebeb] p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-[#131212] mb-6">Shipping Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${errors.fullName ? 'text-red-500' : 'text-[#6b6b6b]'}`} />
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${errors.phone ? 'text-red-500' : 'text-[#6b6b6b]'}`} />
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className={`absolute left-3 top-3 w-5 h-5 ${errors.address ? 'text-red-500' : 'text-[#6b6b6b]'}`} />
                      <textarea
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.address ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710] resize-none`}
                        placeholder="Street address, apartment, suite, etc."
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#131212] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#131212] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-500">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#131212] mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        placeholder="6-digit PIN code"
                        className={`w-full px-4 py-3 border ${errors.zipCode ? 'border-red-500' : 'border-[#ebebeb]'} rounded-none focus:ring-2 focus:ring-[#fbb710]/20 focus:border-[#fbb710]`}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#131212] mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={shippingInfo.country}
                        readOnly
                        className="w-full px-4 py-3 border border-[#ebebeb] rounded-none bg-[#f5f7fa] text-[#6b6b6b]"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="pt-4 border-t border-[#ebebeb]">
                    <h3 className="font-medium text-[#131212] mb-3">Payment Method</h3>
                    <div className="flex items-center p-4 bg-[#f5f7fa] border border-[#ebebeb]">
                      <CreditCard className="w-5 h-5 text-[#131212] mr-3" />
                      <div>
                        <p className="font-medium text-[#131212]">Cash on Delivery</p>
                        <p className="text-sm text-[#6b6b6b]">Pay when your order is delivered</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPlacingOrder}
                    className="w-full bg-[#fbb710] hover:bg-[#52dd28ff] text-white font-medium py-4 px-6 rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPlacingOrder ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Place Order ({formatPrice(cartTotal)})
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-[#6b6b6b] mt-4">
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