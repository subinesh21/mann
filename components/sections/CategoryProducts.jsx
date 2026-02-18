'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

import { getProductsByCategory, CATEGORY_INFO } from '@/lib/product-data';

// Sample products data grouped by category
const SAMPLE_PRODUCTS = {
  drinkware: [
    {
      _id: '1',
      id: 1,
      name: 'Cutting Chai Cups With Stand | Set of 6',
      price: 771,
      originalPrice: 1498,
      image: '/images/product-chai-cups.jpg',
      category: 'drinkware',
      colors: ['Azure', 'Celeste', 'Charcoal', 'Coffee'],
      inStock: true,
    },
    {
      _id: '5',
      id: 5,
      name: 'Mr & Mrs Coffee Mugs for Couple | Set of 2',
      price: 563,
      originalPrice: 849,
      image: '/images/category-drinkware.jpg',
      category: 'drinkware',
      colors: ['Azure', 'Sand Castle'],
      inStock: true,
    },
    {
      _id: '11',
      id: 11,
      name: 'Classic Mug 300 ml',
      price: 250,
      originalPrice: 399,
      image: '/images/category-drinkware.jpg',
      category: 'drinkware',
      colors: ['Pink', 'Blue', 'Green'],
      inStock: false,
    }
  ],
  tableware: [
    {
      _id: '4',
      id: 4,
      name: 'Pasta Bowl 750 ml set of 6',
      price: 720,
      originalPrice: 1276,
      image: '/images/product-pasta-bowls.jpg',
      category: 'tableware',
      colors: ['Azure', 'Celeste', 'Innocent'],
      inStock: true,
    },
    {
      _id: '6',
      id: 6,
      name: 'Maze Slow Feeding Pet Bowls 800 ml',
      price: 432,
      originalPrice: 650,
      image: '/images/category-tableware.jpg',
      category: 'tableware',
      colors: ['Azure', 'Tortilla'],
      inStock: true,
    },
    {
      _id: '7',
      id: 7,
      name: 'Snack Plates 8 inch set of 4',
      price: 460,
      originalPrice: 579,
      image: '/images/hero-slide-3.jpg',
      category: 'tableware',
      colors: ['Azure', 'Celeste', 'Charcoal'],
      inStock: true,
    },
    {
      _id: '8',
      id: 8,
      name: 'Soup Bowl 250 ml set of 6',
      price: 714,
      originalPrice: 1149,
      image: '/images/product-pasta-bowls.jpg',
      category: 'tableware',
      colors: ['Azure', 'Celeste', 'Innocent'],
      inStock: true,
    }
  ],
  storage: [
    {
      _id: '2',
      id: 2,
      name: 'Kitchen Storage Jars & Containers | Set of 3',
      price: 695,
      originalPrice: 1158,
      image: '/images/product-storage-jars.jpg',
      category: 'storage',
      colors: ['Azure', 'Celeste', 'Innocent'],
      inStock: true,
    },
    {
      _id: '10',
      id: 10,
      name: 'Terravo Storage Containers | 2200 ml, 1200ml',
      price: 1340,
      originalPrice: 2233,
      image: '/images/category-storage.jpg',
      category: 'storage',
      colors: ['Azure', 'Celeste', 'Innocent'],
      inStock: true,
    },
    {
      _id: '12',
      id: 12,
      name: 'Bathroom Accessories For Home | Pack of 3',
      price: 674,
      originalPrice: 1225,
      image: '/images/product-storage-jars.jpg',
      category: 'storage',
      colors: ['Cream', 'White'],
      inStock: true,
    }
  ],
  kitchenware: [
    {
      _id: '13',
      id: 13,
      name: 'Bio-Composite Cutting Board Set | 3 Pieces',
      price: 899,
      originalPrice: 1499,
      image: '/images/product-chai-cups.jpg',
      category: 'kitchenware',
      colors: ['Bamboo', 'Charcoal', 'Natural'],
      inStock: true,
    },
    {
      _id: '14',
      id: 14,
      name: 'Eco-Friendly Wooden Utensil Set | 6 Pieces',
      price: 549,
      originalPrice: 899,
      image: '/images/product-storage-jars.jpg',
      category: 'kitchenware',
      colors: ['Natural Wood', 'Walnut'],
      inStock: true,
    },
    {
      _id: '15',
      id: 15,
      name: 'Sustainable Mixing Bowls | Set of 3',
      price: 799,
      originalPrice: 1299,
      image: '/images/product-pasta-bowls.jpg',
      category: 'kitchenware',
      colors: ['Azure', 'Innocent', 'Sand Castle'],
      inStock: true,
    }
  ],
  homeware: [
    {
      _id: '16',
      id: 16,
      name: 'Bio-Composite Serving Tray | Large',
      price: 649,
      originalPrice: 1099,
      image: '/images/product-planters.jpg',
      category: 'homeware',
      colors: ['Natural', 'Walnut', 'Charcoal'],
      inStock: true,
    },
    {
      _id: '17',
      id: 17,
      name: 'Eco-Friendly Coasters | Set of 6',
      price: 299,
      originalPrice: 499,
      image: '/images/category-drinkware.jpg',
      category: 'homeware',
      colors: ['Bamboo', 'Cork', 'Natural'],
      inStock: true,
    },
    {
      _id: '18',
      id: 18,
      name: 'Sustainable Wall Hooks | Set of 3',
      price: 449,
      originalPrice: 749,
      image: '/images/hero-slide-3.jpg',
      category: 'homeware',
      colors: ['Natural Wood', 'Black', 'White'],
      inStock: true,
    }
  ],
  bakeware: [
    {
      _id: '19',
      id: 19,
      name: 'Bio-Composite Baking Dish | Rectangular',
      price: 899,
      originalPrice: 1499,
      image: '/images/product-pasta-bowls.jpg',
      category: 'bakeware',
      colors: ['Natural', 'Charcoal', 'Terracotta'],
      inStock: true,
    },
    {
      _id: '20',
      id: 20,
      name: 'Eco-Friendly Muffin Pan | 12 Cups',
      price: 699,
      originalPrice: 1199,
      image: '/images/category-storage.jpg',
      category: 'bakeware',
      colors: ['Non-Stick', 'Natural'],
      inStock: true,
    }
  ],
  outdoor: [
    {
      _id: '21',
      id: 21,
      name: 'Bio-Composite Garden Tools Set | 3 Pieces',
      price: 1299,
      originalPrice: 2199,
      image: '/images/category-gardenware.jpg',
      category: 'outdoor',
      colors: ['Green', 'Brown', 'Natural'],
      inStock: true,
    },
    {
      _id: '22',
      id: 22,
      name: 'Eco-Friendly Patio Furniture | 2 Seater',
      price: 2499,
      originalPrice: 3999,
      image: '/images/product-planters.jpg',
      category: 'outdoor',
      colors: ['Teak', 'Natural', 'Charcoal'],
      inStock: true,
    }
  ],
  gardenware: [
    {
      _id: '3',
      id: 3,
      name: 'Planters Linea 5.5 Inch | Set of 6',
      price: 751,
      originalPrice: 1332,
      image: '/images/product-planters.jpg',
      category: 'gardenware',
      colors: ['Coral', 'Fern', 'Sand Castle'],
      inStock: true,
    },
    {
      _id: '9',
      id: 9,
      name: 'Romano 7.5 inch Planters | Set of 2',
      price: 839,
      originalPrice: 1525,
      image: '/images/category-gardenware.jpg',
      category: 'gardenware',
      colors: ['Innocent', 'Coral', 'Fern'],
      inStock: true,
    }
  ]
};

export default function CategoryProducts({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();
  
  const categoryData = CATEGORY_INFO[categoryId] || {
    name: categoryId,
    title: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Collection`,
    description: `Explore our sustainable ${categoryId} collection.`,
    image: '/images/product-chai-cups.jpg'
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API
      try {
        const response = await axios.get('/api/admin/products');
        const apiProducts = response.data?.products || response.data?.data || [];
        const categoryProducts = apiProducts.filter(p => p.category === categoryId);
        
        if (categoryProducts.length > 0) {
          setProducts(categoryProducts);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.log('API fetch failed, using sample data');
      }
      
      // Fallback to sample data
      setProducts(getProductsByCategory(categoryId));
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(getProductsByCategory(categoryId));
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 w-full mb-4"></div>
              <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#131212] mb-4">
          {categoryData.title}
        </h1>
        <p className="text-[#6b6b6b] max-w-2xl mx-auto text-lg">
          {categoryData.description}
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-[#131212] mb-2">No products found</h3>
          <p className="text-[#6b6b6b] mb-4">Check back later for new arrivals</p>
          <Link href="/shop" className="amado-btn inline-block">
            Browse All Products
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-[#6b6b6b] mb-6">
            Showing {products.length} products
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
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
                      src={product.image || categoryData.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = categoryData.image;
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
    </div>
  );
}