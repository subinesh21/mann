'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from '@/lib/axios';

export default function ProductMasonryGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/admin/products');
      // Prefer active products if the API provides them, otherwise use all products
      const data = response.data || {};
      const allProducts = data.products || data.data || [];
      const activeProducts = Array.isArray(allProducts)
        ? allProducts.filter((p) => p.isActive !== false)
        : [];

      if (activeProducts.length > 0) {
        setProducts(activeProducts);
      } else if (allProducts.length > 0) {
        setProducts(allProducts);
      } else {
        // If API returns empty, fall back to placeholders
        setProducts(getPlaceholderProducts());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to placeholder products if API fails
      setProducts(getPlaceholderProducts());
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholderProducts = () => [
    { _id: '1', name: 'Modern Chair', price: 180, image: '/images/product-chai-cups.jpg', category: 'drinkware' },
    { _id: '2', name: 'Minimalistic Plant Pot', price: 180, image: '/images/product-planters.jpg', category: 'gardenware' },
    { _id: '3', name: 'Modern Chair', price: 180, image: '/images/product-pasta-bowls.jpg', category: 'tableware' },
    { _id: '4', name: 'Night Stand', price: 180, image: '/images/product-storage-jars.jpg', category: 'storage' },
    { _id: '5', name: 'Plant Pot', price: 18, image: '/images/product-planters.jpg', category: 'gardenware' },
    { _id: '6', name: 'Small Table', price: 320, image: '/images/product-chai-cups.jpg', category: 'drinkware' },
    { _id: '7', name: 'Metallic Chair', price: 318, image: '/images/product-pasta-bowls.jpg', category: 'tableware' },
    { _id: '8', name: 'Modern Rocking Chair', price: 318, image: '/images/product-storage-jars.jpg', category: 'storage' },
    { _id: '9', name: 'Home Deco', price: 318, image: '/images/product-planters.jpg', category: 'gardenware' },
  ];

  // Masonry layout - different heights for visual interest
  const getItemHeight = (index) => {
    const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80', 'h-72', 'h-64', 'h-80'];
    return heights[index % heights.length];
  };

  if (loading) {
    return (
      <div className="products-catagories-area">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="products-catagories-area">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="single-products-catagory group"
          >
            <a href={`/products/${product.category}`} className="block relative overflow-hidden">
              <div className={`relative ${getItemHeight(index)} w-full overflow-hidden`}>
                <img
                  src={product.image || '/images/product-chai-cups.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/images/product-chai-cups.jpg';
                  }}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              
              {/* Hover Content */}
              <div className="hover-content">
                <div className="line"></div>
                <p>From ${product.price}</p>
                <h4>{product.name}</h4>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
