'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CATEGORIES, getProductsByCategory } from '@/lib/product-data';

export default function CategoryGrid() {
  const [categoryPrices, setCategoryPrices] = useState({});

  useEffect(() => {
    // Calculate minimum price for each category
    const prices = {};
    CATEGORIES.forEach(category => {
      const products = getProductsByCategory(category.id);
      if (products && products.length > 0) {
        const minPrice = Math.min(...products.map(p => p.price));
        prices[category.id] = minPrice;
      } else {
        prices[category.id] = 180; // Default price
      }
    });
    setCategoryPrices(prices);
  }, []);

  // MANUAL GRID CONFIGURATION - Edit this array to control each grid item
  const gridItems = [
    {
      id: 'drinkware',
      name: 'Drinkware',
      customName: 'Coffee & Tea', // Override display name if needed
      price: 199,
      image: '/images/category-drinkware.jpg',
      imageFit: 'cover', // 'cover', 'contain', or 'zoom' for custom zoom
      imageZoom: 1.1, // Zoom level if imageFit is 'zoom'
      imagePosition: 'center', // 'center', 'top', 'bottom', 'left', 'right'
      gridSpan: 'tall', // 'tall', 'wide', or 'normal'
      textPosition: 'top-left', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
      textBackground: 'solid', // 'gradient', 'solid', 'none'
      textColor: 'white',
      overlay: 'dark', // 'dark', 'light', 'none'
      overlayOpacity: 0.3,
      padding: 'p-8', // Custom padding: 'p-4', 'p-6', 'p-8', etc.
      count: 12,
    },
    {
      id: 'tableware',
      name: 'Tableware',
      customName: 'Dining Essentials',
      price: 249,
      image: '/images/category-tableware.jpg',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textBackground: 'solid',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.4,
      padding: 'p-6',
      count: 18,
    },
    {
      id: 'storage',
      name: 'Storage',
      customName: 'Kitchen Storage',
      price: 179,
      image: '/images/category-storage.jpg',
      imageFit: 'cover', // 'cover', 'contain', or 'zoom' for custom zoom
      imageZoom: 1.1, // Zoom level if imageFit is 'zoom'
      imagePosition: 'center', // 'center', 'top', 'bottom', 'left', 'right'
      gridSpan: 'tall', // 'tall', 'wide', or 'normal'
      textPosition: 'top-left', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
      textBackground: 'solid', // 'gradient', 'solid', 'none'
      textColor: 'white',
      overlay: 'dark', // 'dark', 'light', 'none'
      overlayOpacity: 0.3,
      padding: 'p-8', // Custom padding: 'p-4', 'p-6', 'p-8', etc.
      count: 12,
    },
    {
      id: 'kitchenware',
      name: 'Kitchenware',
      customName: 'Kitchen Tools',
      price: 299,
      image: '/images/product-chai-cups.jpg',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textBackground: 'solid',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.35,
      padding: 'p-6',
      count: 15,
    },
    {
      id: 'gardenware',
      name: 'Gardenware',
      customName: 'Planters & Pots',
      price: 159,
      image: '/images/category-gardenware.jpg',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textBackground: 'gradient',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.25,
      padding: 'p-8',
      count: 10,
    },
    {
      id: 'bakeware',
      name: 'Bakeware',
      customName: 'Baking Essentials',
      price: 219,
      image: '/images/product-pasta-bowls.jpg',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textBackground: 'solid',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.3,
      padding: 'p-6',
      count: 7,
    },
    {
      id: 'outdoor',
      name: 'Outdoor',
      customName: 'Outdoor Living',
      price: 349,
      image: '/images/product-planters.jpg',
      imageFit: 'cover',
      imageZoom: 1.2,
      imagePosition: 'center',
      gridSpan: 'wide',
      textPosition: 'top-left',
      textBackground: 'gradient',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.4,
      padding: 'p-8',
      count: 6,
    },
    {
      id: 'homeware',
      name: 'Homeware',
      customName: 'Home Decor',
      price: 189,
      image: '/images/hero-slide-3.jpg',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'wide',
      textPosition: 'top-left',
      textBackground: 'solid',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.3,
      padding: 'p-6',
      count: 14,
    },
  ];

  // Helper function to get image style based on configuration
  const getImageStyle = (item) => {
    if (item.imageFit === 'cover') {
      return { objectFit: 'cover', objectPosition: item.imagePosition };
    } else if (item.imageFit === 'contain') {
      return { objectFit: 'contain', objectPosition: item.imagePosition };
    } else if (item.imageFit === 'zoom') {
      return { 
        objectFit: 'cover', 
        objectPosition: item.imagePosition,
        transform: `scale(${item.imageZoom})`,
      };
    }
    return { objectFit: 'cover', objectPosition: 'center' };
  };

  // Helper function to get overlay style
  const getOverlayStyle = (item) => {
    if (item.overlay === 'dark') {
      return `bg-black/${Math.round(item.overlayOpacity * 100)}`;
    } else if (item.overlay === 'light') {
      return `bg-white/${Math.round(item.overlayOpacity * 100)}`;
    }
    return '';
  };

  // Helper function to get grid span classes
  const getGridSpan = (span) => {
    switch(span) {
      case 'tall':
        return 'row-span-2 md:row-span-2';
      case 'wide':
        return 'col-span-2 md:col-span-2';
      default:
        return '';
    }
  };

  // Helper function to get text position classes
  const getTextPosition = (position) => {
    switch(position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-0 left-0';
    }
  };

  // Helper function to get height based on grid span
  const getHeight = (span) => {
    switch(span) {
      case 'tall':
        return 'h-[600px] md:h-[700px]';
      case 'wide':
        return 'h-[350px] md:h-[400px]';
      default:
        return 'h-[300px] md:h-[350px]';
    }
  };

  return (
    <section className="min-h-screen bg-background relative">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {gridItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`group relative block overflow-hidden cursor-pointer 
              ${getGridSpan(item.gridSpan)}`}
          >
            <Link href={`/products#${item.id}`} className="block h-full">
              <div className={`relative w-full ${getHeight(item.gridSpan)} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                  style={getImageStyle(item)}
                  onError={(e) => {
                    e.target.src = '/images/product-chai-cups.jpg';
                    e.target.style.objectFit = 'cover';
                  }}
                />
                
                {/* Custom overlay */}
                <div className={`absolute inset-0 ${getOverlayStyle(item)} transition-colors duration-300`} />
                
                {/* Additional hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>

              {/* Text overlay with manual positioning and styling */}
              <div className={`absolute ${getTextPosition(item.textPosition)} ${item.padding}`}>
                  <div className="w-10 h-[3px] bg-[#fbb710] mb-3" />
                  <p className={`text-sm text-${item.textColor}/80 font-medium`}>
                    From ${item.price}
                  </p>
                  <h3 className={`text-lg font-semibold text-${item.textColor}`}>
                    {item.customName || item.name}
                  </h3>
                  <p className={`text-sm text-${item.textColor}/60 mt-1`}>
                    {item.count} Products
                  </p>
                </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}