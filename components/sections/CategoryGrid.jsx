'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/product-data';

export default function CategoryGrid() {
  return (
    <div className="products-catagories-area py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="single-products-catagory group"
            >
              <Link href={`/products/allproducts#${category.id}`} className="block relative overflow-hidden">
                <div className="relative h-80 w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
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
                  <p>{category.count} Products</p>
                  <h4>{category.name}</h4>
                  <p className="text-sm mt-1 opacity-80">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}