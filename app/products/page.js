'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/Footer';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

import { PRODUCTS, CATEGORY_INFO } from '@/lib/product-data';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API
      try {
        const response = await axios.get('/api/admin/products');
        const apiProducts = response.data?.products || response.data?.data || [];
        if (apiProducts.length > 0) {
          setProducts(apiProducts);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.log('API fetch failed, using sample data');
      }
      
      // Fallback to shared data
      setProducts(PRODUCTS);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      _id: product._id || product.id,
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1, product.colors?.[0] || null);
    
    // Redirect to cart page
    router.push('/cart');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Group products by category
  const groupedProducts = {};
  if (!loading && PRODUCTS.length > 0) {
    PRODUCTS.forEach(product => {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    });
  }

  const categoryOrder = ['drinkware', 'tableware', 'storage', 'kitchenware', 'homeware', 'bakeware', 'outdoor', 'gardenware'];

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="main-content-wrapper">
          <div className="h-14 lg:hidden"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 w-64 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-64 rounded"></div>
                ))}
              </div>
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
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Products by Category */}
          <div className="space-y-16">
            {categoryOrder.map(categoryId => {
              const categoryProducts = groupedProducts[categoryId] || [];
              const categoryData = CATEGORY_INFO[categoryId];
              
              if (categoryProducts.length === 0) return null;
              
              return (
                <section key={categoryId} id={categoryId} className="scroll-mt-24">
                  {/* Category Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#131212]">
                        {categoryData?.name || categoryId}
                      </h2>
                      <div className="flex-1 h-px bg-[#ebebeb]"></div>
                    </div>
                    <p className="text-[#6b6b6b]">
                      {categoryData?.description || `${categoryProducts.length} products`}
                    </p>
                  </div>
                  
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.map((product, index) => (
                      <motion.div
                        key={product._id || product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group"
                      >
                        <Link href={`/detail/${product._id || product.id}`}>
                          <div className="relative aspect-square bg-[#f5f7fa] overflow-hidden mb-4">
                            <img
                              src={product.image || categoryData?.image || '/images/product-chai-cups.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = categoryData?.image || '/images/product-chai-cups.jpg';
                              }}
                            />
                            
                            {/* Quick Actions */}
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart(product);
                                }}
                                disabled={!product.inStock}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#131212] hover:text-[#fbb710] hover:shadow-md transition-all disabled:opacity-50"
                                aria-label="Add to cart"
                              >
                                <ShoppingCart className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => e.preventDefault()}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#131212] hover:text-[#fbb710] hover:shadow-md transition-all"
                                aria-label="Quick view"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => e.preventDefault()}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#131212] hover:text-[#fbb710] hover:shadow-md transition-all"
                                aria-label="Add to wishlist"
                              >
                                <Heart className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Out of Stock Badge */}
                            {!product.inStock && (
                              <div className="absolute top-3 left-3 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
                                Out of Stock
                              </div>
                            )}
                          </div>
                        </Link>

                        <Link href={`/detail/${product._id || product.id}`}>
                          <h5 className="text-sm text-black font-medium line-clamp-2 mb-2 group-hover:text-[#fbb710] transition-colors">
                            {product.name}
                          </h5>
                        </Link>

                        <div className="flex items-center gap-2">
                          <span className="text-[#fbb710] font-semibold">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-[#6b6b6b] line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Color options */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {product.colors.slice(0, 4).map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-box border border-gray-200"
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                              />
                            ))}
                            {product.colors.length > 4 && (
                              <span className="text-xs text-[#6b6b6b]">
                                +{product.colors.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* No Products Message */}
          {Object.keys(groupedProducts).length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-[#131212] mb-2">No products found</h3>
              <p className="text-[#6b6b6b]">Check back later for new arrivals</p>
            </div>
          )}
        </div>
        
        <Footer />
      </div>
      
    </div>
  );
}