'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/product-data';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { addToCart } = useCart();
  const router = useRouter();

  // Set mounted to true after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API first
      try {
        const response = await fetch(`/api/admin/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.product) {
            setProduct(data.product);
            if (data.product.colors && data.product.colors.length > 0) {
              setSelectedColor(data.product.colors[0]);
            }
            setLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('API fetch failed, using sample data');
      }
      
      // Fallback to shared data
      const foundProduct = PRODUCTS.find(p => p._id === productId || p.id === parseInt(productId));
      
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      } else {
        // If not found by ID, try to find by id as number
        const numericId = parseInt(productId);
        const foundByNumericId = PRODUCTS.find(p => p.id === numericId);
        if (foundByNumericId) {
          setProduct(foundByNumericId);
          if (foundByNumericId.colors && foundByNumericId.colors.length > 0) {
            setSelectedColor(foundByNumericId.colors[0]);
          }
        } else {
          setProduct(null);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      _id: product._id || product.id,
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, quantity, selectedColor);
    
    // No redirect, no alert - just update cart count
  };

  const getColorCode = (colorName) => {
    const colors = {
      Azure: '#87CEEB',
      Celeste: '#B2FFFF',
      Charcoal: '#36454F',
      Coffee: '#6F4E37',
      Coral: '#FF7F50',
      Fern: '#4F7942',
      Innocent: '#F5F5DC',
      'Sand Castle': '#C2B280',
      Tortilla: '#EFDECD',
      Pink: '#FFC0CB',
      Blue: '#4169E1',
      Green: '#228B22',
      Cream: '#FFFDD0',
      White: '#FFFFFF',
      Multicolor: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
    };
    return colors[colorName] || '#CCCCCC';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // During SSR or before mount, show loading state
  if (!mounted || loading) {
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

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="main-content-wrapper">
          <div className="h-14 lg:hidden"></div>
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <h1 className="text-2xl font-heading font-semibold text-[#131212] mb-2">
                Product not found
              </h1>
              <p className="text-[#6b6b6b] mb-4">
                The product you are looking for does not exist.
              </p>
              <a
                href="/products/allproducts"
                className="amado-btn inline-block"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="main-content-wrapper">
        <div className="h-14 lg:hidden"></div>

        <div className="single-product-area section-padding-100 clearfix">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a href="/" className="text-[#6b6b6b] hover:text-[#fbb710]">Home</a>
                </li>
                <li className="text-[#6b6b6b]">/</li>
                <li>
                  <a href={`/products/allproducts#${product.category}`} className="text-[#6b6b6b] hover:text-[#fbb710]">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </a>
                </li>
                <li className="text-[#6b6b6b]">/</li>
                <li className="text-[#131212]">{product.name}</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Product Images */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2">
                <div className="product-details">
                  <h2 className="text-3xl font-heading font-bold text-[#131212] mb-4">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(product.rating || 4.5) ? 'text-[#fbb710] fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-[#6b6b6b] text-sm">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-[#fbb710]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xl text-[#6b6b6b] line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-[#6b6b6b] leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Color Selection */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-[#131212] mb-3">Colors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              selectedColor === color 
                                ? 'border-[#131212] ring-2 ring-[#fbb710]' 
                                : 'border-gray-300 hover:border-[#6b6b6b]'
                            }`}
                            style={{ backgroundColor: getColorCode(color) }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity and Add to Cart */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center border border-[#ebebeb] rounded">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-[#6b6b6b] hover:text-[#fbb710] transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-[#131212] font-medium min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-[#6b6b6b] hover:text-[#fbb710] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="amado-btn flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="inline-block mr-2 w-5 h-5" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>

                  {/* Product Meta */}
                  <div className="border-t border-[#ebebeb] pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-[#131212]">Category:</span>
                        <span className="text-[#6b6b6b] ml-2 capitalize">{product.category}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#131212]">Brand:</span>
                        <span className="text-[#6b6b6b] ml-2 uppercase">{product.brand}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <ScrollToTop visible={showScrollTop} />
      </div>
    </div>
  );
}