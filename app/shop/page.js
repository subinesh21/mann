'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORY_INFO } from '@/lib/product-data';

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'drinkware', name: 'Drinkware' },
  { id: 'tableware', name: 'Tableware' },
  { id: 'storage', name: 'Storage' },
  { id: 'kitchenware', name: 'Kitchenware' },
  { id: 'homeware', name: 'Homeware' },
  { id: 'bakeware', name: 'Bakeware' },
  { id: 'gardenware', name: 'Gardenware' },
];

const colorOptions = [
  { name: 'Azure', color: '#007FFF' },
  { name: 'Celeste', color: '#B2FFFF' },
  { name: 'Charcoal', color: '#36454F' },
  { name: 'Coffee', color: '#6F4E37' },
  { name: 'Coral', color: '#b31313ff' },
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

const PRODUCTS_PER_PAGE = 9;

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setProducts(PRODUCTS);
    setLoading(false);
  }, []);

  // Apply filters whenever filter states change
  useEffect(() => {
    applyFilters();
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [products, selectedCategory, selectedColors, priceRange, inStockOnly, sortBy]);

  // Update paginated products whenever filteredProducts or currentPage changes
  useEffect(() => {
    paginateProducts();
  }, [filteredProducts, currentPage]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
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
    setTotalPages(Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  };

  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of products grid
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedColors([]);
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSortBy('default');
    setCurrentPage(1);
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev => 
      prev.includes(colorName) 
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="main-content-wrapper">
        <div className="h-14 lg:hidden"></div>

        <div className="w-full px-2 sm:px-6 lg:px-8 py-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">            
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#ebebeb] text-[#6b6b6b] hover:text-[#fbb710] transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-3 sticky top-4">

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-2 border border-[#ebebeb] text-[#6b6b6b] focus:outline-none focus:border-[#fbb710] w-full"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

                {/* Categories */}
                <div className="mb-4 mt-4">
                  <h3 className="text-sm font-medium text-[#52dd28ff] mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1.5 text-sm border rounded-md transition-colors w-55 ${
                          selectedCategory === category.id 
                            ? 'bg-[#52dd28ff] text-white border-[#52dd28ff]' 
                            : 'bg-white text-[#6b6b6b] border-[#ebebeb] hover:border-[#fbb710] hover:text-[#52dd28ff]'
                        }`}
                      >
                        {category.name}
                      </button>
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
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(colorOption.name)
                            ? 'border-[#fbb710] scale-110 ring-2 ring-[#fbb710] ring-offset-2'
                            : 'border-gray-300 hover:scale-110'
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                        title={colorOption.name}
                      />
                    ))}
                  </div>
                  {/* Selected colors count */}
                  {selectedColors.length > 0 && (
                    <p className="text-xs text-[#6b6b6b] mt-2">
                      {selectedColors.length} color{selectedColors.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-[#52dd28ff] mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div 
                        className="absolute h-2 bg-[#52dd28ff] rounded-full"
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
                          setPriceRange([val, Math.max(val, priceRange[1])]);
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
                          setPriceRange([Math.min(priceRange[0], val), val]);
                        }}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#6b6b6b]">
                      <span className="bg-gray-100 px-2 py-1 rounded">₹{priceRange[0]}</span>
                      <span className="text-[#fbb710]">—</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear All */}
                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-[#6b6b6b] hover:text-[#fbb710] transition-colors py-2 border border-[#ebebeb] rounded-md hover:border-[#fbb710]"
                >
                  Clear All Filters
                </button>

                {/* Close button for mobile */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden w-full mt-4 py-2 border border-[#ebebeb] text-[#6b6b6b] hover:text-[#fbb710] transition-colors rounded-md"
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
                  {/* Products count and current page info */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-[#6b6b6b]">
                      Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1} - {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                    </p>
                    <p className="text-xs text-[#6b6b6b] bg-gray-100 px-3 py-1 rounded-full">
                      Page {currentPage} of {totalPages}
                    </p>
                  </div>

                  {/* Products Grid - Only shows 9 products per page */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product._id || product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ProductCard 
                          product={product} 
                          categoryImage={CATEGORY_INFO[product.category]?.image}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      {/* Previous Button */}
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 border rounded-md transition-colors ${
                          currentPage === 1
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'border-[#ebebeb] text-[#6b6b6b] hover:border-[#fbb710] hover:text-[#fbb710]'
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Page Numbers */}
                      {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                          <span key={`dots-${index}`} className="px-3 py-2 text-[#6b6b6b]">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 border rounded-md transition-colors ${
                              currentPage === page
                                ? 'bg-[#fbb710] text-white border-[#fbb710]'
                                : 'border-[#ebebeb] text-[#6b6b6b] hover:border-[#fbb710] hover:text-[#fbb710]'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      ))}

                      {/* Next Button */}
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 border rounded-md transition-colors ${
                          currentPage === totalPages
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'border-[#ebebeb] text-[#6b6b6b] hover:border-[#fbb710] hover:text-[#fbb710]'
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
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
