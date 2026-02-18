import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { imgPath } from '@/lib/paths';

const tabs = ['Featured', 'New Arrivals', 'Best Sellers'];

const products = {
  Featured: [
    {
      id: 1,
      name: 'Cutting Chai Cups',
      price: 771,
      originalPrice: 1498,
      image: '/images/product-chai-cups.jpg',
      hoverImage: '/images/product-chai-cups-hover.jpg',
      colors: ['Azure', 'Celeste', 'Charcoal', 'Coffee', 'Coral', 'Fern', 'Innocent', 'Sand Castle'],
      badge: 'hot',
    },
    {
      id: 2,
      name: 'Earth Friendly Kitchen Storage Jars & Containers | Set of 3 | 800 ml',
      price: 695,
      originalPrice: 1158,
      image: '/images/product-storage-jars.jpg',
      hoverImage: '/images/product-storage-jars-hover.jpg',
      colors: ['Azure', 'Celeste', 'Innocent', 'Sand Castle'],
      badge: 'hot',
    },
    {
      id: 3,
      name: 'Earth Friendly Planters Linea 5.5 Inch | Set of 6 | Bamboo Pots & Planters',
      price: 751,
      originalPrice: 1332,
      image: '/images/product-planters.jpg',
      hoverImage: '/images/product-planters-hover.jpg',
      colors: ['Coral', 'Fern', 'Sand Castle'],
      badge: null,
    },
    {
      id: 4,
      name: 'Pasta Bowl 750 ml set of 6 | Earth friendly Unbreakable bowls with Spoon',
      price: 720,
      originalPrice: 1276,
      image: '/images/product-pasta-bowls.jpg',
      hoverImage: '/images/product-pasta-bowls-hover.jpg',
      colors: ['Azure', 'Celeste', 'Innocent', 'Sand Castle', 'Tortilla'],
      badge: 'sale',
    },
  ],
  'New Arrivals': [
    {
      id: 5,
      name: 'Earth Friendly Mr & Mrs Coffee Mugs for Couple | Set of 2 | 300 ml',
      price: 563,
      originalPrice: 849,
      image: '/images/category-drinkware.jpg',
      hoverImage: '/images/category-drinkware-hover.jpg',
      colors: ['Azure', 'Sand Castle'],
      badge: 'sale',
    },
    {
      id: 6,
      name: 'Maze Slow Feeding Pet Bowls 800 ml | Earth friendly Unbreakable Bowls',
      price: 432,
      originalPrice: 650,
      image: '/images/category-tableware.jpg',
      hoverImage: '/images/category-tableware-hover.jpg',
      colors: ['Azure', 'Tortilla'],
      badge: null,
    },
    {
      id: 7,
      name: 'Snack Plates 8 inch set of 4 | Earth friendly Unbreakable Plates',
      price: 460,
      originalPrice: 579,
      image: '/images/hero-slide-3.jpg',
      hoverImage: '/images/hero-slide-3-hover.jpg',
      colors: ['Azure', 'Celeste', 'Charcoal', 'Coffee', 'Coral'],
      badge: 'hot',
    },
    {
      id: 8,
      name: 'Soup Bowl 250 ml set of 6 | Earth friendly Unbreakable bowls with Spoon',
      price: 714,
      originalPrice: 1149,
      image: '/images/product-pasta-bowls.jpg',
      hoverImage: '/images/product-pasta-bowls-hover.jpg',
      colors: ['Azure', 'Celeste', 'Innocent', 'Multicolor', 'Sand Castle'],
      badge: null,
    },
  ],
  'Best Sellers': [
    {
      id: 9,
      name: 'Earth Friendly Romano 7.5 inch Planters for Home Decor | Set of 2',
      price: 839,
      originalPrice: 1525,
      image: '/images/category-gardenware.jpg',
      hoverImage: '/images/category-gardenware-hover.jpg',
      colors: ['Innocent', 'Coral', 'Fern'],
      badge: 'sale',
    },
    {
      id: 10,
      name: 'Earth Friendly Terravo Storage Containers For Kitchen | 2200 ml, 1200ml',
      price: 1340,
      originalPrice: 2233,
      image: '/images/category-storage.jpg',
      hoverImage: '/images/category-storage-hover.jpg',
      colors: ['Azure', 'Celeste', 'Innocent'],
      badge: 'hot',
    },
    {
      id: 11,
      name: 'Classic Mug 300 ml | Unbreakable Mugs Made with Rice Husk & Bamboo',
      price: 250,
      originalPrice: 399,
      image: '/images/category-drinkware.jpg',
      hoverImage: '/images/category-drinkware-hover.jpg',
      colors: ['Pink', 'Blue', 'Green', 'Cream'],
      badge: 'sold-out',
    },
    {
      id: 12,
      name: 'Earth Friendly Bathroom Accessories For Home | Pack of 3',
      price: 674,
      originalPrice: 1225,
      image: '/images/product-storage-jars.jpg',
      hoverImage: '/images/product-storage-jars-hover.jpg',
      colors: ['Cream', 'White'],
      badge: null,
    },
  ],
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function ProductsCarousel() {
  const [activeTab, setActiveTab] = useState('Featured');

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-eco-text mb-6">
            Circular products for every home
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-2 lg:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 lg:px-6 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-eco-text'
                    : 'text-eco-muted hover:text-eco-text'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {products[activeTab].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with hover effect */}
      <a
        href={`/products/${product.id}`}
        className="block relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4"
      >
        {/* Default Image */}
        <img
          src={imgPath(product.image)}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && product.hoverImage ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Hover Image */}
        {product.hoverImage && (
          <img
            src={imgPath(product.hoverImage)}
            alt={`${product.name} - alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium text-white rounded-full z-10 ${
              product.badge === 'hot'
                ? 'bg-primary'
                : product.badge === 'sale'
                ? 'bg-sale'
                : 'bg-gray-400'
            }`}
          >
            {product.badge === 'sold-out' ? 'SOLD OUT' : product.badge.toUpperCase()}
          </div>
        )}

        {/* Quick Actions */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex justify-center gap-2 transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={product.badge === 'sold-out'}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-eco-text hover:text-primary hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-eco-text hover:text-primary hover:shadow-md transition-all"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-eco-text hover:text-primary hover:shadow-md transition-all"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </a>

      {/* Content */}
      <div className="space-y-2">
        {/* Colors */}
        <div className="flex flex-wrap gap-1">
          {product.colors.slice(0, 5).map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                selectedColor === color ? 'border-primary scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: getColorCode(color) }}
              aria-label={`Select ${color}`}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-xs text-eco-muted">+{product.colors.length - 5}</span>
          )}
        </div>

        {/* Title */}
        <a href={`/products/${product.id}`}>
          <h3 className="text-sm text-eco-text line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </a>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-primary font-semibold">{formatPrice(product.price)}</span>
          <span className="text-eco-light line-through text-sm">
            {formatPrice(product.originalPrice)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function getColorCode(colorName) {
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
}