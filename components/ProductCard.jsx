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
      return product.hoverImage; // Show hover image when hovered
    }
    return product.primaryImage || product.image || categoryImage || '/images/product-chai-cups.jpg'; // Show primary image by default
  };

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/detail/${product._id || product.id}`}>
        <div className="relative aspect-square bg-[#f5f7fa] overflow-hidden mb-4">
          <img
            src={getCurrentImage()}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500"
            onError={(e) => {
              e.target.src = categoryImage || '/images/product-chai-cups.jpg';
            }}
          />
          
          {/* Quick Actions */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
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
        <h3 className="text-sm text-black font-medium line-clamp-2 mb-2 group-hover:text-[#fbb710] transition-colors">
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
    </div>
  );
}