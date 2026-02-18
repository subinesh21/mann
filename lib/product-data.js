// Centralized product data for the entire application
// Modify this file to update products across all pages

export const CATEGORIES = [
  {
    id: 'drinkware',
    name: 'Drinkware',
    image: '/images/category-drinkware.jpg',
    description: 'Cups, mugs, and beverage containers',
    count: 3
  },
  {
    id: 'tableware',
    name: 'Tableware',
    image: '/images/category-tableware.jpg',
    description: 'Plates, bowls, and dining essentials',
    count: 4
  },
  {
    id: 'storage',
    name: 'Storage',
    image: '/images/category-storage.jpg',
    description: 'Jars, containers, and organization',
    count: 3
  },
  {
    id: 'kitchenware',
    name: 'Kitchenware',
    image: '/images/product-chai-cups.jpg',
    description: 'Cooking tools and kitchen essentials',
    count: 3
  },
  {
    id: 'homeware',
    name: 'Homeware',
    image: '/images/product-planters.jpg',
    description: 'Home decor and household items',
    count: 3
  },
  {
    id: 'bakeware',
    name: 'Bakeware',
    image: '/images/product-pasta-bowls.jpg',
    description: 'Baking dishes and oven-safe cookware',
    count: 2
  },
  {
    id: 'outdoor',
    name: 'Outdoor Living',
    image: '/images/category-gardenware.jpg',
    description: 'Garden tools and outdoor accessories',
    count: 2
  },
  {
    id: 'gardenware',
    name: 'Gardenware',
    image: '/images/category-gardenware.jpg',
    description: 'Planters and gardening supplies',
    count: 2
  }
];

export const PRODUCTS = [
  // Drinkware
  {
    _id: '1',
    id: 1,
    name: 'Cutting Chai Cups With Stand | Set of 6',
    price: 771,
    originalPrice: 1498,
    image: '/images/product-chai-cups.jpg',
    category: 'drinkware',
    brand: 'cgg',
    colors: ['Azure', 'Celeste', 'Charcoal', 'Coffee'],
    inStock: true,
    description: 'Experience traditional chai culture with our premium cutting chai cups. This elegant set of 6 cups comes with a beautiful stand, perfect for serving authentic Indian tea. Crafted from sustainable bio-composite materials, these cups are durable, heat-resistant, and environmentally friendly. The ergonomic design ensures comfortable grip while the leak-proof construction makes them ideal for both home and commercial use. Each cup holds 150ml of your favorite beverage and features a classic desi design that adds charm to your tea time ritual.',
    rating: 4.8,
    reviews: 156
  },
  {
    _id: '5',
    id: 5,
    name: 'Mr & Mrs Coffee Mugs for Couple | Set of 2',
    price: 563,
    originalPrice: 849,
    image: '/images/category-drinkware.jpg',
    category: 'drinkware',
    brand: 'coffee',
    colors: ['Azure', 'Sand Castle'],
    inStock: true,
    description: 'Celebrate love with this adorable Mr & Mrs coffee mug set designed exclusively for couples. Each mug features elegant typography with "Mr" and "Mrs" engraved designs that make them perfect for anniversaries, Valentine\'s Day, or as a thoughtful wedding gift. Made from premium bio-composite materials, these 300ml mugs are microwave and dishwasher safe. The comfortable handle design ensures easy grip, while the thermal insulation keeps your beverages at the perfect temperature. Start your mornings together with these charming mugs that celebrate your special bond.',
    rating: 4.6,
    reviews: 89
  },
  {
    _id: '11',
    id: 11,
    name: 'Classic Mug 300 ml',
    price: 250,
    originalPrice: 399,
    image: '/images/category-drinkware.jpg',
    category: 'drinkware',
    brand: 'cgg',
    colors: ['Pink', 'Blue', 'Green'],
    inStock: false,
    description: 'Our timeless Classic Mug combines functionality with aesthetic appeal. This versatile 300ml mug is perfect for coffee, tea, hot chocolate, or any of your favorite beverages. The sleek design features a comfortable C-shaped handle that fits perfectly in your hand, while the wide opening makes it easy to add ingredients or clean thoroughly. Made from sustainable bamboo fiber composite, it\'s lightweight yet sturdy, with excellent heat retention properties. Available in multiple vibrant colors to match your personal style and kitchen décor.',
    rating: 4.3,
    reviews: 112
  },

  // Tableware
  {
    _id: '4',
    id: 4,
    name: 'Pasta Bowl 750 ml set of 6',
    price: 720,
    originalPrice: 1276,
    image: '/images/product-pasta-bowls.jpg',
    category: 'tableware',
    brand: 'cgg',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
    description: 'Transform your dining experience with our premium Pasta Bowl set. This collection of 6 generously sized 750ml bowls is perfect for serving pasta, salads, cereals, or hearty soup portions. Each bowl is crafted from durable bio-composite materials that are BPA-free and food-safe. The wide, shallow design allows for easy mixing and tossing of ingredients, while the substantial capacity accommodates generous servings. The set includes matching spoons for complete meal service. Microwave and dishwasher safe for convenient everyday use.',
    rating: 4.7,
    reviews: 143
  },
  {
    _id: '6',
    id: 6,
    name: 'Maze Slow Feeding Pet Bowls 800 ml',
    price: 432,
    originalPrice: 650,
    image: '/images/category-tableware.jpg',
    category: 'tableware',
    brand: 'bamboo',
    colors: ['Azure', 'Tortilla'],
    inStock: true,
    description: 'Promote healthier eating habits for your beloved pets with our innovative Maze Slow Feeding Bowls. The unique maze design naturally slows down eating pace, preventing gulping and digestive issues. Each 800ml bowl is ergonomically designed with raised edges to reduce mess and spillage. Made from natural bamboo fiber composite, these bowls are chemical-free and gentle on your pet\'s whiskers. The non-slip base keeps the bowl stable during mealtime, while the easy-clean surface makes maintenance simple. Perfect for dogs and cats who tend to eat too quickly.',
    rating: 4.5,
    reviews: 97
  },
  {
    _id: '7',
    id: 7,
    name: 'Snack Plates 8 inch set of 4',
    price: 460,
    originalPrice: 579,
    image: '/images/hero-slide-3.jpg',
    category: 'tableware',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Charcoal'],
    inStock: true,
    description: 'Elevate your entertaining game with our elegant Snack Plates set. This collection of 4 round 8-inch plates is perfect for appetizers, desserts, charcuterie boards, or casual dining. The generous size accommodates ample portions while the lightweight design makes them easy to handle. Crafted from sustainable rice husk composite material, each plate showcases beautiful natural grain patterns that add sophistication to any table setting. Stackable for convenient storage and dishwasher safe for effortless cleanup. Ideal for parties, picnics, or everyday use.',
    rating: 4.4,
    reviews: 78
  },
  {
    _id: '8',
    id: 8,
    name: 'Soup Bowl 250 ml set of 6',
    price: 714,
    originalPrice: 1149,
    image: '/images/product-pasta-bowls.jpg',
    category: 'tableware',
    brand: 'cgg',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
    description: 'Warm hearts and souls with our cozy Soup Bowl collection. This set of 6 deep 250ml bowls is specially designed for soups, stews, oatmeal, and other comforting warm dishes. The deeper profile retains heat effectively while the generous lip prevents spills during serving. Each bowl features a comfortable base that sits securely on tables and countertops. Made from eco-friendly bio-composite materials that are safe for hot foods and beverages. The set includes matching spoons for complete soup service. Microwave and dishwasher safe for modern convenience.',
    rating: 4.6,
    reviews: 134
  },

  // Storage
  {
    _id: '2',
    id: 2,
    name: 'Storage Jars',
    price: 695,
    originalPrice: 1158,
    image: '/images/product-storage-jars.jpg',
    category: 'storage',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
  },
  {
    _id: '10',
    id: 10,
    name: 'Storage Containers',
    price: 1340,
    originalPrice: 2233,
    image: '/images/category-storage.jpg',
    category: 'storage',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
  },
  {
    _id: '12',
    id: 12,
    name: 'Bathroom Accessories',
    price: 674,
    originalPrice: 1225,
    image: '/images/product-storage-jars.jpg',
    category: 'storage',
    brand: 'bamboo',
    colors: ['Cream', 'White'],
    inStock: true,
  },

  // Kitchenware
  {
    _id: '13',
    id: 13,
    name: 'Cutting Board',
    price: 899,
    originalPrice: 1499,
    image: '/images/product-chai-cups.jpg',
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Bamboo', 'Charcoal', 'Natural'],
    inStock: true,
  },
  {
    _id: '14',
    id: 14,
    name: 'Wooden Utensil Set',
    price: 549,
    originalPrice: 899,
    image: '/images/product-storage-jars.jpg',
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Natural Wood', 'Walnut'],
    inStock: true,
  },
  {
    _id: '15',
    id: 15,
    name: 'Mixing Bowls',
    price: 799,
    originalPrice: 1299,
    image: '/images/product-pasta-bowls.jpg',
    category: 'kitchenware',
    brand: 'cgg',
    colors: ['Azure', 'Innocent', 'Sand Castle'],
    inStock: true,
  },

  // Homeware
  {
    _id: '16',
    id: 16,
    name: 'Serving Tray',
    price: 649,
    originalPrice: 1099,
    image: '/images/product-planters.jpg',
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Walnut', 'Charcoal'],
    inStock: true,
  },
  {
    _id: '17',
    id: 17,
    name: ' Coasters',
    price: 299,
    originalPrice: 499,
    image: '/images/category-drinkware.jpg',
    category: 'homeware',
    brand: 'cgg',
    colors: ['Bamboo', 'Cork', 'Natural'],
    inStock: true,
  },
  {
    _id: '18',
    id: 18,
    name: 'Wall Hooks',
    price: 449,
    originalPrice: 749,
    image: '/images/hero-slide-3.jpg',
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural Wood', 'Black', 'White'],
    inStock: true,
  },

  // Bakeware
  {
    _id: '19',
    id: 19,
    name: 'Baking Dish',
    price: 899,
    originalPrice: 1499,
    image: '/images/product-pasta-bowls.jpg',
    category: 'bakeware',
    brand: 'cgg',
    colors: ['Natural', 'Charcoal', 'Terracotta'],
    inStock: true,
  },
  {
    _id: '20',
    id: 20,
    name: 'Muffin Pan',
    price: 699,
    originalPrice: 1199,
    image: '/images/category-storage.jpg',
    category: 'bakeware',
    brand: 'bamboo',
    colors: ['Non-Stick', 'Natural'],
    inStock: true,
  },

  // Outdoor
  {
    _id: '21',
    id: 21,
    name: 'Garden Tools Set',
    price: 1299,
    originalPrice: 2199,
    image: '/images/category-gardenware.jpg',
    category: 'outdoor',
    brand: 'bamboo',
    colors: ['Green', 'Brown', 'Natural'],
    inStock: true,
  },
  {
    _id: '22',
    id: 22,
    name: 'Patio',
    price: 2499,
    originalPrice: 3999,
    image: '/images/product-planters.jpg',
    category: 'outdoor',
    brand: 'cgg',
    colors: ['Teak', 'Natural', 'Charcoal'],
    inStock: true,
  },

  // Gardenware
  {
    _id: '3',
    id: 3,
    name: 'Planters Linea',
    price: 751,
    originalPrice: 1332,
    image: '/images/product-planters.jpg',
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Coral', 'Fern', 'Sand Castle'],
    inStock: true,
  },
  {
    _id: '9',
    id: 9,
    name: 'Planters',
    price: 839,
    originalPrice: 1525,
    image: '/images/category-gardenware.jpg',
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Innocent', 'Coral', 'Fern'],
    inStock: true,
  }
];

// Helper functions
export const getProductsByCategory = (categoryId) => {
  return PRODUCTS.filter(product => product.category === categoryId);
};

export const getAllCategories = () => {
  return CATEGORIES;
};

export const getCategoryById = (categoryId) => {
  return CATEGORIES.find(category => category.id === categoryId);
};

export const getProductById = (productId) => {
  return PRODUCTS.find(product => product._id === productId || product.id === parseInt(productId));
};

export const getAllProducts = () => {
  return [...PRODUCTS]; // Return a copy to prevent mutation
};

export const getProductsByBrand = (brand) => {
  return PRODUCTS.filter(product => product.brand === brand);
};

export const getInStockProducts = () => {
  return PRODUCTS.filter(product => product.inStock);
};

export const getOutOfStockProducts = () => {
  return PRODUCTS.filter(product => !product.inStock);
};

export const getProductsOnSale = () => {
  return PRODUCTS.filter(product => product.originalPrice && product.originalPrice > product.price);
};

// Category information mapping
export const CATEGORY_INFO = {
  drinkware: {
    name: 'Drinkware',
    title: 'Drinkware Collection',
    description: 'Sustainable cups, mugs, and beverage containers perfect for your daily routine.',
    image: '/images/category-drinkware.jpg'
  },
  tableware: {
    name: 'Tableware',
    title: 'Tableware Collection',
    description: 'Eco-friendly plates, bowls, and dining essentials for conscious living.',
    image: '/images/category-tableware.jpg'
  },
  storage: {
    name: 'Storage',
    title: 'Storage Collection',
    description: 'Organize your space with sustainable jars, containers, and storage solutions.',
    image: '/images/category-storage.jpg'
  },
  kitchenware: {
    name: 'Kitchenware',
    title: 'Kitchenware Collection',
    description: 'Bio-composite cooking tools and kitchen essentials for modern homes.',
    image: '/images/product-chai-cups.jpg'
  },
  homeware: {
    name: 'Homeware',
    title: 'Homeware Collection',
    description: 'Stylish and sustainable home decor and household items.',
    image: '/images/product-planters.jpg'
  },
  bakeware: {
    name: 'Bakeware',
    title: 'Bakeware Collection',
    description: 'Oven-safe baking dishes made from eco-friendly materials.',
    image: '/images/product-pasta-bowls.jpg'
  },
  outdoor: {
    name: 'Outdoor Living',
    title: 'Outdoor Living Collection',
    description: 'Garden tools and outdoor accessories for sustainable living.',
    image: '/images/category-gardenware.jpg'
  },
  gardenware: {
    name: 'Gardenware',
    title: 'Gardenware Collection',
    description: 'Planters and gardening supplies made from bio-composite materials.',
    image: '/images/category-gardenware.jpg'
  }
};