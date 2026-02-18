'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart, Filter, X } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

import { PRODUCTS } from '@/lib/product-data';

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'drinkware', name: 'Drinkware' },
  { id: 'tableware', name: 'Tableware' },
  { id: 'storage', name: 'Storage' },
  { id: 'kitchenware', name: 'Kitchenware' },
  { id: 'homeware', name: 'Homeware' },
  { id: 'bakeware', name: 'Bakeware' },
  { id: 'outdoor', name: 'Outdoor Living' },
  { id: 'gardenware', name: 'Gardenware' },
];

const brands = [
  { id: 'bamboo', name: 'Bamboo Craft' },
  { id: 'rice', name: 'Rice Husk' },
  { id: 'coffee', name: 'Coffee Grounds' },
];

const colorOptions = [
  { name: 'Azure', color: '#007FFF' },
  { name: 'Celeste', color: '#B2FFFF' },
  { name: 'Charcoal', color: '#36454F' },
  { name: 'Coffee', color: '#6F4E37' },
  { name: 'Coral', color: '#FF7F50' },
  { name: 'Fern', color: '#4F7942' },
  { name: 'Sand Castle', color: '#D8C59F' },
  { name: 'Innocent', color: '#F5F5DC' },
];

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  
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

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategory, selectedBrands, selectedColors, priceRange, inStockOnly, sortBy]);

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
      
      // Fallback to sample data
      setProducts(PRODUCTS);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by brands (multiple selection)
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Filter by colors (multiple selection)
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors && p.colors.some(color => selectedColors.includes(color))
      );
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
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

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSortBy('default');
  };

  const toggleBrand = (brandId) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev => 
      prev.includes(colorName) 
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="main-content-wrapper">
        <div className="h-14 lg:hidden"></div>

        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#131212] mb-4 sm:mb-0">All Products</h1>
            
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#ebebeb] text-[#6b6b6b] hover:text-[#fbb710] transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-[#ebebeb] text-[#6b6b6b] focus:outline-none focus:border-[#fbb710]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-6 sticky top-8">
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-[#131212] mb-4">Categories</h3>
                  <div className="space-y-9">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`block text-sm transition-colors ${
                          selectedCategory === category.id 
                            ? 'text-[#fbb710]' 
                            : 'text-[#6b6b6b] hover:text-[#fbb710]'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-[#131212] mb-4">Brands</h3>
                  <div className="space-y-3">
                    {brands.map(brand => (
                      <label key={brand.id} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => toggleBrand(brand.id)}
                          className="w-4 h-4 border-gray-300 rounded text-[#fbb710] focus:ring-[#fbb710] cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-[#6b6b6b]">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-[#131212] mb-4">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((colorOption) => (
                      <button
                        key={colorOption.name}
                        onClick={() => toggleColor(colorOption.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColors.includes(colorOption.name)
                            ? 'border-[#fbb710] scale-110'
                            : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                        title={colorOption.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-[#131212] mb-4">Price</h3>
                  <div className="space-y-4">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div 
                        className="absolute h-2 bg-[#fbb710] rounded-full"
                        style={{
                          left: `${(priceRange[0] / 2000) * 100}%`,
                          right: `${100 - (priceRange[1] / 2000) * 100}%`
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val < priceRange[1]) setPriceRange([val, priceRange[1]]);
                        }}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val > priceRange[0]) setPriceRange([priceRange[0], val]);
                        }}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#6b6b6b]">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* In Stock Only */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 border-gray-300 rounded text-[#fbb710] focus:ring-[#fbb710] cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-[#6b6b6b]">In Stock Only</span>
                  </label>
                </div>

                {/* Clear All */}
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#6b6b6b] hover:text-[#fbb710] transition-colors"
                >
                  Clear All
                </button>

                {/* Close button for mobile */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden w-full mt-6 py-2 border border-[#ebebeb] text-[#6b6b6b] hover:text-[#fbb710] transition-colors"
                >
                  Close Filters
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-64 w-full mb-4"></div>
                      <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-[#131212] mb-2">No products found</h3>
                  <p className="text-[#6b6b6b] mb-4">Try adjusting your filters</p>
                  <button
                    onClick={clearFilters}
                    className="amado-btn inline-block"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[#6b6b6b] mb-4">
                    Showing {filteredProducts.length} products
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product._id || product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group"
                      >
                        <Link href={`/products/detail/${product._id || product.id}`}>
                          <div className="relative aspect-square bg-[#f5f7fa] overflow-hidden mb-4">
                            <img
                              src={product.image || '/images/product-chai-cups.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = '/images/product-chai-cups.jpg';
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

                        <Link href={`/products/detail/${product._id || product.id}`}>
                          <h3 className="text-sm text-[#131212] font-medium line-clamp-2 mb-2 group-hover:text-[#fbb710] transition-colors">
                            {product.name}
                          </h3>
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
                                className="w-4 h-4 rounded-full border border-gray-200"
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
                </>
              )}
            </main>
          </div>
        </div>

        <Footer />
      </div>

      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}