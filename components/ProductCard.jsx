// components/ProductCard.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product, categoryImage }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      _id: product._id || product.id,
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.primaryImage || product.image,
    }, 1, product.colors?.[0] || null);
    router.push('/cart');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get the current image based on hover state
  const getCurrentImage = () => {
    if (isHovered && product.hoverImage) {
      return product.hoverImage;
    }
    return product.primaryImage || product.image || categoryImage || '/images/product-chai-cups.jpg';
  };

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/detail/${product._id || product.id}`}>
        <div className="relative aspect-square bg-[#f5f7fa] overflow-hidden mb-2 sm:mb-3 lg:mb-4">
          <img
            src={getCurrentImage()}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = categoryImage || '/images/product-chai-cups.jpg';
            }}
          />
          
          {/* Quick Actions - Desktop only, visible on hover */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 lg:flex">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#131212] hover:text-[#fbb710] hover:shadow-lg transition-all duration-300 disabled:opacity-50 transform hover:scale-110"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#131212] hover:text-[#fbb710] hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#131212] hover:text-[#fbb710] hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Out of Stock Badge */}
          {!product.inStock && (
            <div className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] lg:text-xs font-medium px-1.5 lg:px-2 py-0.5 lg:py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
      </Link>
      
      <Link href={`/detail/${product._id || product.id}`}>
        {/* Mobile version */}
        <h6 
          className="block lg:hidden text-black font-medium line-clamp-2 mb-1 group-hover:text-[#fbb710] transition-colors"
          style={{ fontSize: '15px' }}
        >
          {product.name}
        </h6>
        
        {/* Desktop version */}
        <h5 
          className="hidden lg:block text-black font-medium line-clamp-2 mb-2 group-hover:text-[#fbb710] transition-colors"
          style={{ fontSize: '16px' }}
        >
          {product.name}
        </h5>
      </Link>

      <div className="flex items-center gap-1 lg:gap-2">
        <span className="text-[#fbb710] font-semibold text-xs sm:text-sm lg:text-base">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-[10px] sm:text-xs text-[#6b6b6b] line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>

      {/* Color options */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex flex-wrap gap-0.5 lg:gap-1 mt-1 lg:mt-2">
          {product.colors.slice(0, 3).map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 lg:w-4 lg:h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-[8px] lg:text-xs text-[#6b6b6b]">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}