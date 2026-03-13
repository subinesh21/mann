// components/ProductCard.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { ShoppingCart, Eye, Heart, Scale, Image as ImageIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product, categoryImage, viewMode = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCompare } = useCompare();
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      _id: product._id || product.id,
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.primaryImage || product.image,
    }, 1, product.colors?.[0] || null);
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
    return product.primaryImage || product.image;
  };

  const currentImage = getCurrentImage();


  // LIST VIEW
  if (viewMode === 'list') {
    return (
      <div
        className="flex bg-white border border-gray-100 rounded-box overflow-hidden"
      >
        {/* Image */}
        <Link href={`/detail/${product._id || product.id}`} className="flex-shrink-0 w-32 sm:w-40 lg:w-48">
          <div className="relative h-full bg-[#f5f7fa] overflow-hidden">
            <SafeImage
              src={currentImage}
              alt={`${product.name} - Thulira sustainable product`}
              fill={true}
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
              className="object-cover"
              fallbackText={product.name}
            />
            {!product.inStock && (
              <div className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                Out of Stock
              </div>
            )}
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
          <div>
            <Link href={`/detail/${product._id || product.id}`}>
              <h5 className="text-sm sm:text-base font-medium text-black line-clamp-2 mb-1" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                {product.name}
              </h5>
            </Link>
            {product.description && (
              <p className="text-xs text-gray-500 line-clamp-2 mb-2 hidden sm:block">
                {product.description}
              </p>
            )}
            {/* Color options */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {product.colors.slice(0, 5).map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 lg:w-4 lg:h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-[8px] lg:text-xs text-[#6b6b6b]">
                    +{product.colors.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#fbb710] font-semibold text-sm sm:text-base">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-[#6b6b6b] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="p-2 bg-[#f5f7fa] rounded-full text-[#131212] disabled:opacity-50"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW (default)
  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/detail/${product._id || product.id}`}>
        <div className="relative aspect-square bg-[#f5f7fa] overflow-hidden mb-2 sm:mb-3 lg:mb-4">
          <SafeImage
            src={currentImage}
            alt={`${product.name} - Thulira sustainable product`}
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
            fallbackText={product.name}
          />

          {/* Quick Actions - Gray Circle Emoji Style */}
          <div
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center text-lg items-center z-20 gap-2.5 transition-all duration-500 *:transition-all *:duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="relative w-9 h-9 flex items-center justify-center bg-gray-100/90 hover:bg-gray-200 rounded-circle text-gray-700 hover:text-[#52dd28ff] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:flex before:justify-center before:items-center before:h-5 before:text-[0.55rem] before:px-2 before:content-['CART'] before:bg-black/70 before:text-white before:absolute before:-top-8 before:rounded-md hover:-translate-y-2 cursor-pointer transition-all shadow-sm"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/detail/${product._id || product.id}`); }}
              className="relative w-9 h-9 flex items-center justify-center bg-gray-100/90 hover:bg-gray-200 rounded-circle text-gray-700 hover:text-[#52dd28ff] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:flex before:justify-center before:items-center before:h-5 before:text-[0.55rem] before:px-2 before:content-['VIEW'] before:bg-black/70 before:text-white before:absolute before:-top-8 before:rounded-md hover:-translate-y-2 cursor-pointer transition-all shadow-sm"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
              className={`relative w-9 h-9 flex items-center justify-center bg-gray-100/90 hover:bg-gray-200 rounded-circle ${isInWishlist(product._id || product.id) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'} before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:flex before:justify-center before:items-center before:h-5 before:text-[0.55rem] before:px-2 before:content-['WISH'] before:bg-black/70 before:text-white before:absolute before:-top-8 before:rounded-md hover:-translate-y-2 cursor-pointer transition-all shadow-sm`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product._id || product.id) ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCompare(product); }}
              className="relative w-9 h-9 flex items-center justify-center bg-gray-100/90 hover:bg-gray-200 rounded-circle text-gray-700 hover:text-blue-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:flex before:justify-center before:items-center before:h-5 before:text-[0.55rem] before:px-2 before:content-['COMPARE'] before:bg-black/70 before:text-white before:absolute before:-top-8 before:rounded-md hover:-translate-y-2 cursor-pointer transition-all shadow-sm"
              aria-label="Compare"
            >
              <Scale className="w-4 h-4" />
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
          style={{ fontSize: '15px', fontFamily: 'var(--font-cinzel), serif' }}
        >
          {product.name}
        </h6>

        {/* Desktop version */}
        <h5
          className="hidden lg:block text-black font-medium line-clamp-2 mb-2 group-hover:text-[#fbb710] transition-colors"
          style={{ fontSize: '16px', fontFamily: 'var(--font-cinzel), serif' }}
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