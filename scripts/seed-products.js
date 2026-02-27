// Migration script to seed MongoDB with existing product data
// Run this once to populate your database with initial products

const mongoose = require('mongoose');

// Your existing product data (same as in product-data.js)
const PRODUCT_DATA = [
  // DRINKWARE products (first 6)
  {
    name: 'Cutting Chai Cups With Stand | Set of 6',
    price: 771,
    originalPrice: 1498,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/category-drinkware.jpg',
    images: {
      Azure: ['/images/Azure-1.jpeg', '/images/Azure-2.jpeg', '/images/Azure-3.jpeg'],
      Celeste: ['/images/Celeste-1.jpeg', '/images/Celeste-2.jpeg', '/images/Celeste-3.jpeg'],
      Charcoal: ['/images/Charcoal-1.jpeg', '/images/Charcoal-2.jpeg', '/images/Charcoal-3.jpeg'],
      Coffee: ['/images/Coffee-1.jpeg', '/images/Coffee-2.jpeg', '/images/Coffee-3.jpeg']
    },
    category: 'drinkware',
    brand: 'cgg',
    colors: ['Azure', 'Celeste', 'Charcoal', 'Coffee'],
    inStock: true,
    description: 'Experience traditional chai culture with our premium cutting chai cups. This elegant set of 6 cups comes with a beautiful stand, perfect for serving authentic Indian tea. Crafted from sustainable bio-composite materials, these cups are durable, heat-resistant, and environmentally friendly. Each cup holds 150ml of your favorite beverage and features a classic desi design that adds charm to your tea time ritual.',
    rating: 4.8,
    reviews: 156
  },
  {
    name: 'Mr & Mrs Coffee Mugs for Couple | Set of 2',
    price: 563,
    originalPrice: 849,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/product-chai-cups.jpg',
    images: {
      Azure: ['/images/category-drinkware.jpg', '/images/mr-mrs-azure-2.jpg'],
      'Sand Castle': ['/images/category-drinkware-sand.jpg', '/images/mr-mrs-sand-2.jpg']
    },
    category: 'drinkware',
    brand: 'coffee',
    colors: ['Azure', 'Sand Castle'],
    inStock: true,
    description: 'Celebrate love with this adorable Mr & Mrs coffee mug set designed exclusively for couples. Each mug features elegant typography with "Mr" and "Mrs" engraved designs that make them perfect for anniversaries, Valentine\'s Day, or as a thoughtful wedding gift. Made from premium bio-composite materials, these 300ml mugs are microwave and dishwasher safe.',
    rating: 4.6,
    reviews: 89
  },
  {
    name: 'Classic Mug 300 ml',
    price: 250,
    originalPrice: 399,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/product-chai-cups.jpg',
    images: {
      Pink: ['/images/category-drinkware-pink.jpg', '/images/mug-pink-2.jpg'],
      Blue: ['/images/category-drinkware-blue.jpg', '/images/mug-blue-2.jpg'],
      Green: ['/images/category-drinkware-green.jpg', '/images/mug-green-2.jpg'],
      Yellow: ['/images/category-drinkware-yellow.jpg', '/images/mug-yellow-2.jpg'],
      White: ['/images/category-drinkware-white.jpg', '/images/mug-white-2.jpg']
    },
    category: 'drinkware',
    brand: 'cgg',
    colors: ['Pink', 'Blue', 'Green', 'Yellow', 'White'],
    inStock: true,
    description: 'Our timeless Classic Mug combines functionality with aesthetic appeal. This versatile 300ml mug is perfect for coffee, tea, hot chocolate, or any of your favorite beverages. The sleek design features a comfortable C-shaped handle that fits perfectly in your hand, while the wide opening makes it easy to add ingredients or clean thoroughly.',
    rating: 4.3,
    reviews: 112
  },
  {
    name: 'Insulated Travel Tumbler 500 ml',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/product-chai-cups.jpg',
    images: {
      Black: ['/images/tumbler-black-1.jpg', '/images/tumbler-black-2.jpg'],
      Silver: ['/images/tumbler-silver-1.jpg', '/images/tumbler-silver-2.jpg'],
      'Rose Gold': ['/images/tumbler-rose-1.jpg', '/images/tumbler-rose-2.jpg'],
      Blue: ['/images/tumbler-blue-1.jpg', '/images/tumbler-blue-2.jpg']
    },
    category: 'drinkware',
    brand: 'cgg',
    colors: ['Black', 'Silver', 'Rose Gold', 'Blue'],
    inStock: true,
    description: 'Take your beverages on the go with our eco-friendly Insulated Travel Tumbler. This 500ml tumbler features double-wall insulation that keeps drinks hot for up to 6 hours and cold for 12 hours. The leak-proof lid with sliding closure prevents spills during your commute. Fits most car cup holders and includes a reusable straw.',
    rating: 4.7,
    reviews: 78
  },
  {
    name: 'Espresso Cup Set with Saucers | Set of 4',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/espresso-white-2.jpg',
    images: {
      White: ['/images/espresso-white-1.jpg', '/images/espresso-white-2.jpg', '/images/espresso-white-3.jpg'],
      Black: ['/images/espresso-black-1.jpg', '/images/espresso-black-2.jpg'],
      Brown: ['/images/espresso-brown-1.jpg', '/images/espresso-brown-2.jpg']
    },
    category: 'drinkware',
    brand: 'cgg',
    colors: ['White', 'Black', 'Brown'],
    inStock: true,
    description: 'Elevate your espresso experience with our premium Espresso Cup Set. This elegant set includes 4 cups with matching saucers, each holding 90ml of rich, aromatic espresso. The thick walls maintain optimal temperature while the ergonomic handle ensures comfortable sipping. Perfect for after-dinner coffee rituals or entertaining guests.',
    rating: 4.5,
    reviews: 45
  },
  {
    name: 'Tea Infuser Mug with Lid | 350 ml',
    price: 449,
    originalPrice: 649,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/infuser-blue-2.jpg',
    images: {
      Blue: ['/images/infuser-blue-1.jpg', '/images/infuser-blue-2.jpg'],
      Green: ['/images/infuser-green-1.jpg', '/images/infuser-green-2.jpg'],
      White: ['/images/infuser-white-1.jpg', '/images/infuser-white-2.jpg']
    },
    category: 'drinkware',
    brand: 'cgg',
    colors: ['Blue', 'Green', 'White'],
    inStock: true,
    description: 'Brew the perfect cup of loose-leaf tea with our Tea Infuser Mug. This 350ml mug comes with a fine-mesh stainless steel infuser basket that allows tea leaves to fully expand and release their flavor. The matching lid keeps your tea warm while steeping and doubles as a coaster for the infuser.',
    rating: 4.6,
    reviews: 52
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB using the connection string from environment
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cgg-eha';
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    });
    
    console.log('Connected to MongoDB');
    
    // Define simple product schema for seeding
    const productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      originalPrice: Number,
      primaryImage: String,
      hoverImage: String,
      images: mongoose.Schema.Types.Mixed,
      category: String,
      brand: String,
      colors: [String],
      inStock: Boolean,
      description: String,
      rating: Number,
      reviews: Number,
      isActive: { type: Boolean, default: true },
      createdAt: { type: Date, default: Date.now }
    });
    
    const Product = mongoose.model('Product', productSchema);
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const insertedProducts = await Product.insertMany(PRODUCT_DATA);
    console.log(`Successfully inserted ${insertedProducts.length} products`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();