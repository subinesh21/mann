// Centralized product data for the entire application
// Modify this file to update products across all pages

export const CATEGORIES = [
  {
    id: 'drinkware',
    name: 'Drinkware',
    image: '/images/category-drinkware.jpg',
    description: 'Cups, mugs, and beverage containers',
    count: 6
  },
  {
    id: 'tableware',
    name: 'Tableware',
    image: '/images/category-tableware.jpg',
    description: 'Plates, bowls, and dining essentials',
    count: 6
  },
  {
    id: 'storage',
    name: 'Storage',
    image: '/images/category-storage.jpg',
    description: 'Jars, containers, and organization',
    count: 6
  },
  {
    id: 'kitchenware',
    name: 'Kitchenware',
    image: '/images/product-chai-cups.jpg',
    description: 'Cooking tools and kitchen essentials',
    count: 6
  },
  {
    id: 'homeware',
    name: 'Homeware',
    image: '/images/product-planters.jpg',
    description: 'Home decor and household items',
    count: 6
  },
  {
    id: 'bakeware',
    name: 'Bakeware',
    image: '/images/product-pasta-bowls.jpg',
    description: 'Baking dishes and oven-safe cookware',
    count: 6
  },
  {
    id: 'gardenware',
    name: 'Gardenware',
    image: '/images/category-gardenware.jpg',
    description: 'Planters and gardening supplies',
    count: 6
  },
  {
    id: 'gifting',
    name: 'Gifting',
    image: '/images/product-storage-jars.jpg',
    description: 'Eco-friendly gift sets and hampers',
    count: 6
  }
];

export const PRODUCTS = [
  // ==================== DRINKWARE (6 products) ====================
  {
    _id: '1',
    id: 1,
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
    _id: '5',
    id: 5,
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
    _id: '11',
    id: 11,
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
    _id: '23',
    id: 23,
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
    _id: '24',
    id: 24,
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
    _id: '26',
    id: 26,
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
  },

  // ==================== TABLEWARE (6 products) ====================
  {
    _id: '4',
    id: 4,
    name: 'Pasta Bowl 750 ml set of 6',
    price: 720,
    originalPrice: 1276,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/pasta-azure-2.jpg',
    images: {
      Azure: ['/images/pasta-azure-1.jpg', '/images/pasta-azure-2.jpg', '/images/pasta-azure-3.jpg'],
      Celeste: ['/images/pasta-celeste-1.jpg', '/images/pasta-celeste-2.jpg'],
      Innocent: ['/images/pasta-innocent-1.jpg', '/images/pasta-innocent-2.jpg'],
      Charcoal: ['/images/pasta-charcoal-1.jpg', '/images/pasta-charcoal-2.jpg']
    },
    category: 'tableware',
    brand: 'cgg',
    colors: ['Azure', 'Celeste', 'Innocent', 'Charcoal'],
    inStock: true,
    description: 'Transform your dining experience with our premium Pasta Bowl set. This collection of 6 generously sized 750ml bowls is perfect for serving pasta, salads, cereals, or hearty soup portions. The wide, shallow design allows for easy mixing and tossing of ingredients.',
    rating: 4.7,
    reviews: 143
  },
  {
    _id: '7',
    id: 7,
    name: 'Snack Plates 8 inch set of 4',
    price: 460,
    originalPrice: 579,
    primaryImage: '/images/hero-slide-3.jpg',
    hoverImage: '/images/snack-azure-2.jpg',
    images: {
      Azure: ['/images/snack-azure-1.jpg', '/images/snack-azure-2.jpg'],
      Celeste: ['/images/snack-celeste-1.jpg', '/images/snack-celeste-2.jpg'],
      Charcoal: ['/images/snack-charcoal-1.jpg', '/images/snack-charcoal-2.jpg'],
      'Sand Castle': ['/images/snack-sand-1.jpg', '/images/snack-sand-2.jpg']
    },
    category: 'tableware',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Charcoal', 'Sand Castle'],
    inStock: true,
    description: 'Elevate your entertaining game with our elegant Snack Plates set. This collection of 4 round 8-inch plates is perfect for appetizers, desserts, charcuterie boards, or casual dining. Crafted from sustainable rice husk composite material.',
    rating: 4.4,
    reviews: 78
  },
  {
    _id: '8',
    id: 8,
    name: 'Soup Bowl 250 ml set of 6',
    price: 714,
    originalPrice: 1149,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/soup-azure-2.jpg',
    images: {
      Azure: ['/images/soup-azure-1.jpg', '/images/soup-azure-2.jpg'],
      Celeste: ['/images/soup-celeste-1.jpg', '/images/soup-celeste-2.jpg'],
      Innocent: ['/images/soup-innocent-1.jpg', '/images/soup-innocent-2.jpg'],
      Charcoal: ['/images/soup-charcoal-1.jpg', '/images/soup-charcoal-2.jpg']
    },
    category: 'tableware',
    brand: 'cgg',
    colors: ['Azure', 'Celeste', 'Innocent', 'Charcoal'],
    inStock: true,
    description: 'Warm hearts and souls with our cozy Soup Bowl collection. This set of 6 deep 250ml bowls is specially designed for soups, stews, oatmeal, and other comforting warm dishes. The deeper profile retains heat effectively.',
    rating: 4.6,
    reviews: 134
  },
  {
    _id: '28',
    id: 28,
    name: 'Dinner Plates 10.5 inch | Set of 4',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/dinner-white-2.jpg',
    images: {
      White: ['/images/dinner-white-1.jpg', '/images/dinner-white-2.jpg', '/images/dinner-white-3.jpg'],
      Natural: ['/images/dinner-natural-1.jpg', '/images/dinner-natural-2.jpg'],
      Charcoal: ['/images/dinner-charcoal-1.jpg', '/images/dinner-charcoal-2.jpg']
    },
    category: 'tableware',
    brand: 'rice',
    colors: ['White', 'Natural', 'Charcoal'],
    inStock: true,
    description: 'Complete your dining collection with our elegant Dinner Plates. This set of 4 generously sized 10.5-inch plates is perfect for main courses, family meals, and entertaining. The classic round design features a subtle rim that adds visual interest.',
    rating: 4.7,
    reviews: 62
  },
  {
    _id: '29',
    id: 29,
    name: 'Salad Bowl Set with Servers | 2L',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/salad-natural-2.jpg',
    images: {
      Natural: ['/images/salad-natural-1.jpg', '/images/salad-natural-2.jpg'],
      Charcoal: ['/images/salad-charcoal-1.jpg', '/images/salad-charcoal-2.jpg'],
      Olive: ['/images/salad-olive-1.jpg', '/images/salad-olive-2.jpg']
    },
    category: 'tableware',
    brand: 'cgg',
    colors: ['Natural', 'Charcoal', 'Olive'],
    inStock: true,
    description: 'Create beautiful salads with our generous Salad Bowl Set. The 2-liter bowl provides ample space for tossing and serving salads for family gatherings or dinner parties. The set includes matching salad servers with ergonomic handles.',
    rating: 4.5,
    reviews: 41
  },
  {
    _id: '33',
    id: 33,
    name: 'Breakfast Bowl 500 ml | Set of 4',
    price: 949,
    originalPrice: 1499,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/breakfast-azure-2.jpg',
    images: {
      Azure: ['/images/breakfast-azure-1.jpg', '/images/breakfast-azure-2.jpg'],
      Celeste: ['/images/breakfast-celeste-1.jpg', '/images/breakfast-celeste-2.jpg'],
      'Sand Castle': ['/images/breakfast-sand-1.jpg', '/images/breakfast-sand-2.jpg']
    },
    category: 'tableware',
    brand: 'cgg',
    colors: ['Azure', 'Celeste', 'Sand Castle'],
    inStock: true,
    description: 'Start your mornings right with our generous Breakfast Bowls. Each 500ml bowl is perfectly sized for cereal, oatmeal, yogurt parfaits, or fruit salads. The set of 4 bowls features a comfortable wide shape that makes eating easy and enjoyable.',
    rating: 4.5,
    reviews: 46
  },

  // ==================== STORAGE (6 products) ====================
  {
    _id: '2',
    id: 2,
    name: 'Kitchen Storage Jars & Containers | Set of 3',
    price: 695,
    originalPrice: 1158,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/storage-azure-2.jpg',
    images: {
      Azure: ['/images/storage-azure-1.jpg', '/images/storage-azure-2.jpg', '/images/storage-azure-3.jpg'],
      Celeste: ['/images/storage-celeste-1.jpg', '/images/storage-celeste-2.jpg'],
      Innocent: ['/images/storage-innocent-1.jpg', '/images/storage-innocent-2.jpg']
    },
    category: 'storage',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
    description: 'Organize your pantry beautifully with our Kitchen Storage Jar Set. This set of 3 jars includes 500ml, 1000ml, and 1500ml sizes, perfect for storing grains, pulses, spices, and snacks. Each jar features an airtight bamboo lid with silicone seal.',
    rating: 4.6,
    reviews: 89
  },
  {
    _id: '10',
    id: 10,
    name: 'Terravo Storage Containers | 2200 ml, 1200ml',
    price: 1340,
    originalPrice: 2233,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/terravo-azure-2.jpg',
    images: {
      Azure: ['/images/terravo-azure-1.jpg', '/images/terravo-azure-2.jpg'],
      Celeste: ['/images/terravo-celeste-1.jpg', '/images/terravo-celeste-2.jpg'],
      Innocent: ['/images/terravo-innocent-1.jpg', '/images/terravo-innocent-2.jpg'],
      Charcoal: ['/images/terravo-charcoal-1.jpg', '/images/terravo-charcoal-2.jpg']
    },
    category: 'storage',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent', 'Charcoal'],
    inStock: true,
    description: 'Maximize your kitchen organization with our Terravo Storage Container set. This practical set includes one 2200ml and one 1200ml container, perfect for storing larger quantities of flour, rice, pasta, or dry goods.',
    rating: 4.4,
    reviews: 67
  },
  {
    _id: '34',
    id: 34,
    name: 'Spice Rack with Jars | Set of 6',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/spice-natural-2.jpg',
    images: {
      Natural: ['/images/spice-natural-1.jpg', '/images/spice-natural-2.jpg', '/images/spice-natural-3.jpg'],
      Charcoal: ['/images/spice-charcoal-1.jpg', '/images/spice-charcoal-2.jpg']
    },
    category: 'storage',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Organize your spices beautifully with our complete Spice Rack Set. This set includes 6 glass jars with bamboo lids and a sturdy bamboo rack that holds everything neatly. Each jar holds 100ml of spices and features an airtight seal.',
    rating: 4.7,
    reviews: 78
  },
  {
    _id: '35',
    id: 35,
    name: 'Food Storage Set with Lids | 5 Pieces',
    price: 1599,
    originalPrice: 2499,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/food-clear-2.jpg',
    images: {
      Clear: ['/images/food-clear-1.jpg', '/images/food-clear-2.jpg'],
      Green: ['/images/food-green-1.jpg', '/images/food-green-2.jpg'],
      Blue: ['/images/food-blue-1.jpg', '/images/food-blue-2.jpg']
    },
    category: 'storage',
    brand: 'cgg',
    colors: ['Clear', 'Green', 'Blue'],
    inStock: true,
    description: 'Complete your kitchen organization with this versatile Food Storage Set. The 5-piece set includes containers in various sizes: 300ml, 500ml, 800ml, 1200ml, and 1800ml, each with a matching leak-proof lid.',
    rating: 4.5,
    reviews: 54
  },
  {
    _id: '36',
    id: 36,
    name: 'Bread Box with Bamboo Lid',
    price: 899,
    originalPrice: 1299,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/bread-natural-2.jpg',
    images: {
      Natural: ['/images/bread-natural-1.jpg', '/images/bread-natural-2.jpg'],
      Charcoal: ['/images/bread-charcoal-1.jpg', '/images/bread-charcoal-2.jpg'],
      White: ['/images/bread-white-1.jpg', '/images/bread-white-2.jpg']
    },
    category: 'storage',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal', 'White'],
    inStock: true,
    description: 'Keep your bread fresh longer with our stylish Bread Box. The generous size accommodates whole loaves, baguettes, or multiple baked goods. Features a sliding bamboo lid that allows air circulation while protecting bread from dust and pests.',
    rating: 4.4,
    reviews: 41
  },
  {
    _id: '37',
    id: 37,
    name: 'Drawer Organizer Set | 4 Pieces',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/drawer-natural-2.jpg',
    images: {
      Natural: ['/images/drawer-natural-1.jpg', '/images/drawer-natural-2.jpg'],
      Charcoal: ['/images/drawer-charcoal-1.jpg', '/images/drawer-charcoal-2.jpg']
    },
    category: 'storage',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Bring order to your drawers with our adjustable Drawer Organizer Set. This 4-piece set includes various sized compartments that can be arranged to fit your specific needs. Perfect for kitchen utensils, office supplies, or bathroom items.',
    rating: 4.3,
    reviews: 36
  },

  // ==================== KITCHENWARE (6 products) ====================
  {
    _id: '13',
    id: 13,
    name: 'Bio-Composite Cutting Board Set | 3 Pieces',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/cutting-bamboo-2.jpg',
    images: {
      Bamboo: ['/images/cutting-bamboo-1.jpg', '/images/cutting-bamboo-2.jpg', '/images/cutting-bamboo-3.jpg'],
      Charcoal: ['/images/cutting-charcoal-1.jpg', '/images/cutting-charcoal-2.jpg'],
      Natural: ['/images/cutting-natural-1.jpg', '/images/cutting-natural-2.jpg']
    },
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Bamboo', 'Charcoal', 'Natural'],
    inStock: true,
    description: 'Complete your kitchen prep with this versatile Cutting Board Set. The 3-piece set includes small, medium, and large boards for all your chopping needs. Each board is crafted from durable bio-composite material that\'s gentle on knife blades.',
    rating: 4.5,
    reviews: 67
  },
  {
    _id: '14',
    id: 14,
    name: 'Eco-Friendly Wooden Utensil Set | 6 Pieces',
    price: 549,
    originalPrice: 899,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/utensil-natural-2.jpg',
    images: {
      'Natural Wood': ['/images/utensil-natural-1.jpg', '/images/utensil-natural-2.jpg'],
      Walnut: ['/images/utensil-walnut-1.jpg', '/images/utensil-walnut-2.jpg']
    },
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Natural Wood', 'Walnut'],
    inStock: true,
    description: 'Cook with nature using our Eco-Friendly Wooden Utensil Set. This 6-piece collection includes a slotted spatula, solid spatula, ladle, spoon, pasta server, and turner, covering all your cooking needs.',
    rating: 4.6,
    reviews: 89
  },
  {
    _id: '15',
    id: 15,
    name: 'Sustainable Mixing Bowls | Set of 3',
    price: 799,
    originalPrice: 1299,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/mixing-azure-2.jpg',
    images: {
      Azure: ['/images/mixing-azure-1.jpg', '/images/mixing-azure-2.jpg'],
      Innocent: ['/images/mixing-innocent-1.jpg', '/images/mixing-innocent-2.jpg'],
      'Sand Castle': ['/images/mixing-sand-1.jpg', '/images/mixing-sand-2.jpg']
    },
    category: 'kitchenware',
    brand: 'cgg',
    colors: ['Azure', 'Innocent', 'Sand Castle'],
    inStock: true,
    description: 'Mix, prep, and serve with our Sustainable Mixing Bowl set. This nesting set includes three bowls: 1.5L, 2.5L, and 4L sizes for all your culinary tasks. The wide, stable bases prevent tipping while mixing.',
    rating: 4.4,
    reviews: 78
  },
  {
    _id: '38',
    id: 38,
    name: 'Colander/Strainer Set | 2 Pieces',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/colander-white-2.jpg',
    images: {
      White: ['/images/colander-white-1.jpg', '/images/colander-white-2.jpg'],
      Green: ['/images/colander-green-1.jpg', '/images/colander-green-2.jpg'],
      Blue: ['/images/colander-blue-1.jpg', '/images/colander-blue-2.jpg']
    },
    category: 'kitchenware',
    brand: 'rice',
    colors: ['White', 'Green', 'Blue'],
    inStock: true,
    description: 'Drain pasta, rinse vegetables, and wash fruits with our versatile Colander Set. This 2-piece set includes a large colander for pasta and a smaller strainer for berries or quinoa.',
    rating: 4.3,
    reviews: 42
  },
  {
    _id: '40',
    id: 40,
    name: 'Kitchen Tool Set | 5 Pieces',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/tool-natural-2.jpg',
    images: {
      Natural: ['/images/tool-natural-1.jpg', '/images/tool-natural-2.jpg'],
      Black: ['/images/tool-black-1.jpg', '/images/tool-black-2.jpg']
    },
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Natural', 'Black'],
    inStock: true,
    description: 'Equip your kitchen with essential tools in this comprehensive 5-piece set. Includes a can opener, bottle opener, peeler, kitchen shears, and pizza cutter, all with ergonomic handles and stainless steel blades.',
    rating: 4.5,
    reviews: 56
  },
  {
    _id: '41',
    id: 41,
    name: 'Measuring Cups & Spoons Set | 10 Pieces',
    price: 449,
    originalPrice: 649,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/measure-azure-2.jpg',
    images: {
      Azure: ['/images/measure-azure-1.jpg', '/images/measure-azure-2.jpg'],
      Celeste: ['/images/measure-celeste-1.jpg', '/images/measure-celeste-2.jpg'],
      Innocent: ['/images/measure-innocent-1.jpg', '/images/measure-innocent-2.jpg']
    },
    category: 'kitchenware',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
    description: 'Measure ingredients accurately with our complete Measuring Set. Includes 4 measuring cups (1/4, 1/3, 1/2, and 1 cup) and 6 measuring spoons (1/8 tsp to 1 tbsp).',
    rating: 4.2,
    reviews: 63
  },

  // ==================== HOMEWARE (6 products) ====================
  {
    _id: '16',
    id: 16,
    name: 'Bio-Composite Serving Tray | Large',
    price: 649,
    originalPrice: 1099,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/tray-natural-2.jpg',
    images: {
      Natural: ['/images/tray-natural-1.jpg', '/images/tray-natural-2.jpg'],
      Walnut: ['/images/tray-walnut-1.jpg', '/images/tray-walnut-2.jpg'],
      Charcoal: ['/images/tray-charcoal-1.jpg', '/images/tray-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Walnut', 'Charcoal'],
    inStock: true,
    description: 'Serve in style with our Bio-Composite Serving Tray. The large size accommodates multiple cups, plates, and snacks for entertaining. The integrated handles make carrying easy and comfortable.',
    rating: 4.4,
    reviews: 52
  },
  {
    _id: '17',
    id: 17,
    name: 'Eco-Friendly Coasters | Set of 6',
    price: 299,
    originalPrice: 499,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/coaster-bamboo-2.jpg',
    images: {
      Bamboo: ['/images/coaster-bamboo-1.jpg', '/images/coaster-bamboo-2.jpg'],
      Cork: ['/images/coaster-cork-1.jpg', '/images/coaster-cork-2.jpg'],
      Natural: ['/images/coaster-natural-1.jpg', '/images/coaster-natural-2.jpg'],
      Charcoal: ['/images/coaster-charcoal-1.jpg', '/images/coaster-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'cgg',
    colors: ['Bamboo', 'Cork', 'Natural', 'Charcoal'],
    inStock: true,
    description: 'Protect your surfaces in style with our Eco-Friendly Coaster set. This set of 6 coasters features natural materials that absorb condensation and prevent water rings. Each coaster is handmade from sustainable bamboo or cork.',
    rating: 4.3,
    reviews: 78
  },
  {
    _id: '18',
    id: 18,
    name: 'Sustainable Wall Hooks | Set of 3',
    price: 449,
    originalPrice: 749,
    primaryImage: '/images/hero-slide-3.jpg',
    hoverImage: '/images/hook-natural-2.jpg',
    images: {
      'Natural Wood': ['/images/hook-natural-1.jpg', '/images/hook-natural-2.jpg'],
      Black: ['/images/hook-black-1.jpg', '/images/hook-black-2.jpg'],
      White: ['/images/hook-white-1.jpg', '/images/hook-white-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural Wood', 'Black', 'White'],
    inStock: true,
    description: 'Add functional style to your walls with our Sustainable Wall Hook set. This set of 3 hooks features a clean, modern design that works in any room—entryway, bathroom, kitchen, or bedroom.',
    rating: 4.2,
    reviews: 63
  },
  {
    _id: '43',
    id: 43,
    name: 'Bamboo Tissue Box Cover',
    price: 399,
    originalPrice: 599,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/tissue-natural-2.jpg',
    images: {
      Natural: ['/images/tissue-natural-1.jpg', '/images/tissue-natural-2.jpg'],
      Walnut: ['/images/tissue-walnut-1.jpg', '/images/tissue-walnut-2.jpg'],
      Charcoal: ['/images/tissue-charcoal-1.jpg', '/images/tissue-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Walnut', 'Charcoal'],
    inStock: true,
    description: 'Elevate everyday essentials with our Bamboo Tissue Box Cover. The clean, minimalist design transforms a utilitarian item into a stylish accessory for your home. Fits standard rectangular tissue boxes.',
    rating: 4.1,
    reviews: 44
  },
  {
    _id: '44',
    id: 44,
    name: 'Desk Organizer Set | 3 Pieces',
    price: 699,
    originalPrice: 999,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/desk-natural-2.jpg',
    images: {
      Natural: ['/images/desk-natural-1.jpg', '/images/desk-natural-2.jpg'],
      Charcoal: ['/images/desk-charcoal-1.jpg', '/images/desk-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Create an organized, productive workspace with our Desk Organizer Set. This 3-piece set includes a pen holder, a letter tray, and a small accessory tray for paper clips, sticky notes, or other desk items.',
    rating: 4.3,
    reviews: 37
  },
  {
    _id: '46',
    id: 46,
    name: 'Magazine Rack',
    price: 899,
    originalPrice: 1299,
    primaryImage: '/images/hero-slide-3.jpg',
    hoverImage: '/images/magazine-natural-2.jpg',
    images: {
      Natural: ['/images/magazine-natural-1.jpg', '/images/magazine-natural-2.jpg'],
      Walnut: ['/images/magazine-walnut-1.jpg', '/images/magazine-walnut-2.jpg'],
      Charcoal: ['/images/magazine-charcoal-1.jpg', '/images/magazine-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Walnut', 'Charcoal'],
    inStock: true,
    description: 'Keep your reading materials organized and accessible with our Bamboo Magazine Rack. The slatted design allows you to see titles at a glance while keeping magazines, newspapers, and catalogs neatly stored.',
    rating: 4.2,
    reviews: 33
  },

  // ==================== BAKEWARE (6 products) ====================
  {
    _id: '19',
    id: 19,
    name: 'Bio-Composite Baking Dish | Rectangular',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/bake-natural-2.jpg',
    images: {
      Natural: ['/images/bake-natural-1.jpg', '/images/bake-natural-2.jpg'],
      Charcoal: ['/images/bake-charcoal-1.jpg', '/images/bake-charcoal-2.jpg'],
      Terracotta: ['/images/bake-terracotta-1.jpg', '/images/bake-terracotta-2.jpg']
    },
    category: 'bakeware',
    brand: 'cgg',
    colors: ['Natural', 'Charcoal', 'Terracotta'],
    inStock: true,
    description: 'Bake beautiful casseroles, lasagnas, and desserts with our Bio-Composite Baking Dish. The generous 9x13 inch size is perfect for family meals and entertaining. Safe for use in ovens up to 450°F.',
    rating: 4.6,
    reviews: 58
  },
  {
    _id: '20',
    id: 20,
    name: 'Eco-Friendly Muffin Pan | 12 Cups',
    price: 699,
    originalPrice: 1199,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/muffin-nonstick-2.jpg',
    images: {
      'Non-Stick': ['/images/muffin-nonstick-1.jpg', '/images/muffin-nonstick-2.jpg'],
      Natural: ['/images/muffin-natural-1.jpg', '/images/muffin-natural-2.jpg']
    },
    category: 'bakeware',
    brand: 'bamboo',
    colors: ['Non-Stick', 'Natural'],
    inStock: true,
    description: 'Bake perfect muffins and cupcakes with our Eco-Friendly Muffin Pan. The 12-cup design lets you bake a full dozen at once. Each cup features a non-stick surface that releases baked goods easily.',
    rating: 4.4,
    reviews: 45
  },
  {
    _id: '47',
    id: 47,
    name: 'Loaf Pan for Baking',
    price: 499,
    originalPrice: 749,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/loaf-natural-2.jpg',
    images: {
      Natural: ['/images/loaf-natural-1.jpg', '/images/loaf-natural-2.jpg'],
      Charcoal: ['/images/loaf-charcoal-1.jpg', '/images/loaf-charcoal-2.jpg']
    },
    category: 'bakeware',
    brand: 'cgg',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Bake perfect banana bread, meatloaf, or pound cake with our Loaf Pan. The standard 9x5 inch size fits most recipes. The non-stick interior ensures your creations release easily.',
    rating: 4.3,
    reviews: 36
  },
  {
    _id: '48',
    id: 48,
    name: 'Round Cake Pan | 9 inch',
    price: 449,
    originalPrice: 699,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/cake-natural-2.jpg',
    images: {
      Natural: ['/images/cake-natural-1.jpg', '/images/cake-natural-2.jpg'],
      Charcoal: ['/images/cake-charcoal-1.jpg', '/images/cake-charcoal-2.jpg']
    },
    category: 'bakeware',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Create beautiful layer cakes with our Round Cake Pan. The 9-inch size is perfect for standard cake recipes. The non-stick surface releases cakes effortlessly and makes cleanup simple.',
    rating: 4.2,
    reviews: 41
  },
  {
    _id: '49',
    id: 49,
    name: 'Cookie Sheet | Large',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/cookie-natural-2.jpg',
    images: {
      Natural: ['/images/cookie-natural-1.jpg', '/images/cookie-natural-2.jpg'],
      Charcoal: ['/images/cookie-charcoal-1.jpg', '/images/cookie-charcoal-2.jpg']
    },
    category: 'bakeware',
    brand: 'cgg',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Bake cookies, roast vegetables, and more with our Large Cookie Sheet. The generous size fits most ovens and accommodates a full batch of cookies. The raised rim on one side provides grip.',
    rating: 4.5,
    reviews: 53
  },
  {
    _id: '76',
    id: 76,
    name: 'Pie Dish | 9 inch',
    price: 649,
    originalPrice: 999,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/pie-natural-2.jpg',
    images: {
      Natural: ['/images/pie-natural-1.jpg', '/images/pie-natural-2.jpg'],
      Terracotta: ['/images/pie-terracotta-1.jpg', '/images/pie-terracotta-2.jpg']
    },
    category: 'bakeware',
    brand: 'cgg',
    colors: ['Natural', 'Terracotta'],
    inStock: true,
    description: 'Bake beautiful pies and quiches with our Ceramic Pie Dish. The fluted edges create a decorative crust while the even heat distribution ensures perfectly baked results every time.',
    rating: 4.4,
    reviews: 29
  },

  // ==================== GARDENWARE (6 products) ====================
  {
    _id: '3',
    id: 3,
    name: 'Planters Linea 5.5 Inch | Set of 6',
    price: 751,
    originalPrice: 1332,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/linea-coral-2.jpg',
    images: {
      Coral: ['/images/linea-coral-1.jpg', '/images/linea-coral-2.jpg'],
      Fern: ['/images/linea-fern-1.jpg', '/images/linea-fern-2.jpg'],
      'Sand Castle': ['/images/linea-sand-1.jpg', '/images/linea-sand-2.jpg'],
      Azure: ['/images/linea-azure-1.jpg', '/images/linea-azure-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Coral', 'Fern', 'Sand Castle', 'Azure'],
    inStock: true,
    description: 'Display your plants beautifully with our Planters Linea set. This set of 6 pots features clean, modern lines that complement any décor. Each 5.5-inch pot is perfect for small to medium houseplants, succulents, or herbs.',
    rating: 4.5,
    reviews: 94
  },
  {
    _id: '9',
    id: 9,
    name: 'Romano 7.5 inch Planters | Set of 2',
    price: 839,
    originalPrice: 1525,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/romano-innocent-2.jpg',
    images: {
      Innocent: ['/images/romano-innocent-1.jpg', '/images/romano-innocent-2.jpg'],
      Coral: ['/images/romano-coral-1.jpg', '/images/romano-coral-2.jpg'],
      Fern: ['/images/romano-fern-1.jpg', '/images/romano-fern-2.jpg'],
      'Sand Castle': ['/images/romano-sand-1.jpg', '/images/romano-sand-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Innocent', 'Coral', 'Fern', 'Sand Castle'],
    inStock: true,
    description: 'Make a statement with our Romano Planter set. These larger 7.5-inch pots are perfect for floor plants, large houseplants, or small trees. The classic urn shape adds elegance to any room.',
    rating: 4.6,
    reviews: 78
  },
  {
    _id: '53',
    id: 53,
    name: 'Hanging Planters | Set of 3',
    price: 899,
    originalPrice: 1399,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/hanging-natural-2.jpg',
    images: {
      Natural: ['/images/hanging-natural-1.jpg', '/images/hanging-natural-2.jpg'],
      White: ['/images/hanging-white-1.jpg', '/images/hanging-white-2.jpg'],
      Charcoal: ['/images/hanging-charcoal-1.jpg', '/images/hanging-charcoal-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Natural', 'White', 'Charcoal'],
    inStock: true,
    description: 'Add dimension to your plant display with our Hanging Planter set. This set of 3 planters comes with adjustable natural jute ropes for hanging at different heights. Perfect for trailing plants like pothos or ferns.',
    rating: 4.4,
    reviews: 56
  },
  {
    _id: '54',
    id: 54,
    name: 'Succulent Planter Set | 4 Pieces',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/succulent-azure-2.jpg',
    images: {
      Azure: ['/images/succulent-azure-1.jpg', '/images/succulent-azure-2.jpg'],
      Coral: ['/images/succulent-coral-1.jpg', '/images/succulent-coral-2.jpg'],
      Fern: ['/images/succulent-fern-1.jpg', '/images/succulent-fern-2.jpg'],
      'Sand Castle': ['/images/succulent-sand-1.jpg', '/images/succulent-sand-2.jpg']
    },
    category: 'gardenware',
    brand: 'cgg',
    colors: ['Azure', 'Coral', 'Fern', 'Sand Castle'],
    inStock: true,
    description: 'Create the perfect succulent garden with our specialized Succulent Planter set. This set of 4 small pots includes a wooden tray that keeps them organized and makes a beautiful display.',
    rating: 4.3,
    reviews: 62
  },
  {
    _id: '55',
    id: 55,
    name: 'Self-Watering Planter | Medium',
    price: 699,
    originalPrice: 999,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/self-white-2.jpg',
    images: {
      White: ['/images/self-white-1.jpg', '/images/self-white-2.jpg'],
      Green: ['/images/self-green-1.jpg', '/images/self-green-2.jpg'],
      Terracotta: ['/images/self-terracotta-1.jpg', '/images/self-terracotta-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['White', 'Green', 'Terracotta'],
    inStock: true,
    description: 'Keep your plants hydrated with our Self-Watering Planter. The innovative reservoir system provides consistent moisture, reducing watering frequency and preventing both over and under-watering.',
    rating: 4.5,
    reviews: 48
  },
  {
    _id: '56',
    id: 56,
    name: 'Herb Planter Kit with Seeds',
    price: 799,
    originalPrice: 1199,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/herb-natural-2.jpg',
    images: {
      Natural: ['/images/herb-natural-1.jpg', '/images/herb-natural-2.jpg'],
      Green: ['/images/herb-green-1.jpg', '/images/herb-green-2.jpg']
    },
    category: 'gardenware',
    brand: 'cgg',
    colors: ['Natural', 'Green'],
    inStock: true,
    description: 'Grow your own fresh herbs with our complete Herb Planter Kit. The set includes a rectangular planter with self-watering feature, organic soil discs, and seed packets for basil, cilantro, mint, and parsley.',
    rating: 4.6,
    reviews: 71
  },

  // ==================== GIFTING (6 products) ====================
  {
    _id: '57',
    id: 57,
    name: 'Tea Lover Gift Set',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/gift-tea-2.jpg',
    images: {
      Multi: ['/images/gift-tea-1.jpg', '/images/gift-tea-2.jpg', '/images/gift-tea-3.jpg']
    },
    category: 'gifting',
    brand: 'cgg',
    colors: ['Multi'],
    inStock: true,
    description: 'Delight the tea enthusiast in your life with our Tea Lover Gift Set. This curated collection includes a ceramic tea infuser mug, a set of 6 assorted organic teas, a bamboo tea tin, and a natural honey dipper.',
    rating: 4.7,
    reviews: 43
  },
  {
    _id: '58',
    id: 58,
    name: 'Coffee Connoisseur Set',
    price: 1499,
    originalPrice: 2299,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/gift-coffee-2.jpg',
    images: {
      Multi: ['/images/gift-coffee-1.jpg', '/images/gift-coffee-2.jpg']
    },
    category: 'gifting',
    brand: 'coffee',
    colors: ['Multi'],
    inStock: true,
    description: 'Treat the coffee lover with our Coffee Connoisseur Set. Includes two 300ml ceramic coffee mugs, a pour-over coffee maker with filters, a bamboo coffee scoop, and a bag of organic fair-trade coffee beans.',
    rating: 4.6,
    reviews: 38
  },
  {
    _id: '59',
    id: 59,
    name: 'Spa & Self Care Gift Set',
    price: 1699,
    originalPrice: 2499,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/gift-spa-2.jpg',
    images: {
      Natural: ['/images/gift-spa-1.jpg', '/images/gift-spa-2.jpg']
    },
    category: 'gifting',
    brand: 'bamboo',
    colors: ['Natural'],
    inStock: true,
    description: 'Encourage relaxation with our Spa & Self Care Gift Set. Includes a bamboo bath tray that fits across standard tubs, a soap dish with natural soap, a bamboo bath brush, and organic cotton washcloths.',
    rating: 4.5,
    reviews: 31
  },
  {
    _id: '60',
    id: 60,
    name: 'Kitchen Starter Set',
    price: 1899,
    originalPrice: 2799,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/gift-kitchen-2.jpg',
    images: {
      Multi: ['/images/gift-kitchen-1.jpg', '/images/gift-kitchen-2.jpg']
    },
    category: 'gifting',
    brand: 'rice',
    colors: ['Multi'],
    inStock: true,
    description: 'Help someone stock their kitchen with our Kitchen Starter Set. This comprehensive collection includes a cutting board, utensil set, mixing bowls, measuring cups, and storage containers.',
    rating: 4.4,
    reviews: 27
  },
  {
    _id: '61',
    id: 61,
    name: 'Plant Parent Gift Box',
    price: 1399,
    originalPrice: 1999,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/gift-plant-2.jpg',
    images: {
      Multi: ['/images/gift-plant-1.jpg', '/images/gift-plant-2.jpg']
    },
    category: 'gifting',
    brand: 'bamboo',
    colors: ['Multi'],
    inStock: true,
    description: 'Celebrate the plant lover with our Plant Parent Gift Box. Includes three handcrafted planters in different sizes, a bamboo watering can, wooden plant markers, and a set of gardening tools.',
    rating: 4.5,
    reviews: 35
  },
  {
    _id: '62',
    id: 62,
    name: 'Eco-Friendly Entertaining Set',
    price: 2199,
    originalPrice: 3299,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/gift-entertain-2.jpg',
    images: {
      Multi: ['/images/gift-entertain-1.jpg', '/images/gift-entertain-2.jpg']
    },
    category: 'gifting',
    brand: 'cgg',
    colors: ['Multi'],
    inStock: true,
    description: 'Host in style with our Eco-Friendly Entertaining Set. Perfect for dinner parties and gatherings. Includes 4 dinner plates, 4 salad plates, 4 bowls, a large serving platter, and a set of serving utensils.',
    rating: 4.7,
    reviews: 22
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
  gardenware: {
    name: 'Gardenware',
    title: 'Gardenware Collection',
    description: 'Planters and gardening supplies made from bio-composite materials.',
    image: '/images/category-gardenware.jpg'
  },
  gifting: {
    name: 'Gifting',
    title: 'Gift Collections',
    description: 'Curated gift sets for every occasion, thoughtfully packaged.',
    image: '/images/product-storage-jars.jpg'
  }
};