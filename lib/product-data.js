// Centralized product data for the entire application
// Modify this file to update products across all pages

export const CATEGORIES = [
  {
    id: 'Coffee & Tea',
    name: 'Coffee & Tea',
    price: 199,
    image: '/images/category-coffee-tea.png',
    imageFit: 'cover',
    imagePosition: 'center',
    gridSpan: 'normal',
    textPosition: 'top-left',
    textColor: 'white',
    overlay: 'dark',
    overlayOpacity: 0.3,
    padding: 'p-3 sm:p-6',
    description: 'Cups, mugs, and beverage containers',
    count: 12
  },
  {
    id: 'Dining Essentials',
    name: 'Dining Essentials',
    price: 249,
    image: '/images/category-dining-essentials.png',
    imageFit: 'cover',
    imagePosition: 'center',
    gridSpan: 'normal',
    textPosition: 'top-left',
    textColor: 'white',
    overlay: 'dark',
    overlayOpacity: 0.4,
    padding: 'p-3 sm:p-6',
    description: 'Plates, bowls, and dining essentials',
    count: 18
  },
  {
    id: 'Storage',
    name: 'Storage',
    price: 179,
    image: '/images/category-storage.png',
    imageFit: 'cover',
    imagePosition: 'center',
    gridSpan: 'wide',
    textPosition: 'top-left',
    textColor: 'white',
    overlay: 'dark',
    overlayOpacity: 0.3,
    padding: 'p-3 sm:p-6',
    description: 'Jars, containers, and organization',
    count: 12
  },
  {
    id: 'Kitchen Tools',
    name: 'Kitchen Tools',
    price: 299,
    image: '/images/catagory-kitchentools.png',
    imageFit: 'cover',
    imagePosition: 'center',
    gridSpan: 'wide',
    textPosition: 'top-left',
    textColor: 'white',
    overlay: 'dark',
    overlayOpacity: 0.35,
    padding: 'p-3 sm:p-6',
    description: 'Cooking tools and kitchen essentials',
    count: 15
  },
  {
    id: 'Indoor Gardenware',
    name: 'Indoor Gardenware',
    price: 159,
    image: '/images/catagory-indo-gardenware.png',
    imageFit: 'cover',
    imagePosition: 'center',
    gridSpan: 'normal',
    textPosition: 'top-left',
    textColor: 'white',
    overlay: 'dark',
    overlayOpacity: 0.25,
    padding: 'p-3 sm:p-6',
    description: 'Planters and indoor gardening supplies',
    count: 10
  },
  {
    id: 'Outdoor Living',
    name: 'Outdoor Living',
    price: 349,
    image: '/images/catagory-out-gardenware.png',
    imageFit: 'cover',
    imageZoom: 1.2,
    imagePosition: 'center',
    gridSpan: 'normal',
    textPosition: 'top-left',
    textColor: 'white',
    overlay: 'dark',
    overlayOpacity: 0.4,
    padding: 'p-3 sm:p-6',
    description: 'Outdoor planters and gardenware',
    count: 6
  }
];

export const PRODUCTS = [
  // ==================== COFFEE & TEA (61 products) ====================
  {
    "_id": "1",
    "id": 1,
    "name": "Eco Spring Bottle for School Kids | 900 ml",
    "price": 715,
    "originalPrice": 1300,
    "primaryImage": "/images/eco-spring-bottle-for-school-kids.jpg",
    "hoverImage": "/images/eco-spring-bottle-for-school-kids-hover.jpg",
    "images": {
      "Azure": [
        "/images/eco-spring-bottle-for-school-kids-azure-1.jpg",
        "/images/eco-spring-bottle-for-school-kids-azure-2.jpg",
        "/images/eco-spring-bottle-for-school-kids-azure-3.jpg"
      ],
      "Celeste": [
        "/images/eco-spring-bottle-for-school-kids-celeste-1.jpg",
        "/images/eco-spring-bottle-for-school-kids-celeste-2.jpg",
        "/images/eco-spring-bottle-for-school-kids-celeste-3.jpg"
      ],
      "Coffee": [
        "/images/eco-spring-bottle-for-school-kids-coffee-1.jpg",
        "/images/eco-spring-bottle-for-school-kids-coffee-2.jpg",
        "/images/eco-spring-bottle-for-school-kids-coffee-3.jpg"
      ],
      "Innocent": [
        "/images/eco-spring-bottle-for-school-kids-innocent-1.jpg",
        "/images/eco-spring-bottle-for-school-kids-innocent-2.jpg",
        "/images/eco-spring-bottle-for-school-kids-innocent-3.jpg"
      ],
      "Oriole": [
        "/images/eco-spring-bottle-for-school-kids-oriole-1.jpg",
        "/images/eco-spring-bottle-for-school-kids-oriole-2.jpg",
        "/images/eco-spring-bottle-for-school-kids-oriole-3.jpg"
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Azure",
      "Celeste",
      "Coffee",
      "Innocent",
      "Oriole"
    ],
    "inStock": true,
    "description": "Make hydration sustainable with the Earth Friendly Eco Spring Bottle. Crafted from innovative Rice Husk Biocomposite, this 900 ml bottle offers a natural alternative to single-use plastics. Its durable design is perfectly sized for school bags and office desks, ensuring adults and kids stay hydrated all day.",
    "faqs": [
      {
        "question": "Are these cups microwave safe?",
        "answer": "No, these bio-composite cups are not microwave safe. They are designed for serving hot beverages but should not be heated directly in a microwave."
      },
      {
        "question": "Is the stand rust-proof?",
        "answer": "Yes, the stand is coated with a premium rust-resistant finish to ensure durability."
      },
      {
        "question": "What is the capacity of each cup?",
        "answer": "Each cutting chai cup holds 150ml, perfect for traditional servings."
      }
    ]
  },
  {
    "_id": "101",
    "id": 101,
    "name": "Motiva Water Bottle with Stainless Steel Inner | 400 ml",
    "price": 549,
    "originalPrice": 998,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Azure",
      "White",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Motiva Water Bottle with Stainless Steel Inner | 400 ml - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "102",
    "id": 102,
    "name": "Statement Chai Cups With Stand | 120 ml | Set of 6",
    "price": 877,
    "originalPrice": 1595,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Statement Chai Cups With Stand | 120 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "103",
    "id": 103,
    "name": "Statement Chai Cups With Stand | 120 ml | Set of 4",
    "price": 667,
    "originalPrice": 1213,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Natural",
      "Coffee",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Statement Chai Cups With Stand | 120 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "104",
    "id": 104,
    "name": "Dual Java Coffee Mug | 375ml | Set of 2",
    "price": 463,
    "originalPrice": 951,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Charcoal",
      "Innocent",
      "Green"
    ],
    "inStock": true,
    "description": "Dual Java Coffee Mug | 375ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "105",
    "id": 105,
    "name": "Dual Java Coffee Mug | 375ml | Set of 3",
    "price": 659,
    "originalPrice": 1415,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Green",
      "Fern"
    ],
    "inStock": true,
    "description": "Dual Java Coffee Mug | 375ml | Set of 3 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "106",
    "id": 106,
    "name": "Dual Java Coffee Mug | 375ml | Set of 4",
    "price": 799,
    "originalPrice": 1778,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Walnut"
    ],
    "inStock": true,
    "description": "Dual Java Coffee Mug | 375ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "107",
    "id": 107,
    "name": "Rafter Coffee Mug with Lid | 175 ml | Set of 2",
    "price": 436,
    "originalPrice": 793,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Charcoal",
      "Innocent"
    ],
    "inStock": true,
    "description": "Rafter Coffee Mug with Lid | 175 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "108",
    "id": 108,
    "name": "Rafter Coffee Mug with Lid | 250 ml | Set of 2",
    "price": 498,
    "originalPrice": 905,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Celeste",
      "Coffee",
      "Bamboo",
      "Coral"
    ],
    "inStock": true,
    "description": "Rafter Coffee Mug with Lid | 250 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "109",
    "id": 109,
    "name": "Rafter Coffee Mug with Lid | 175 ml | Set of 4",
    "price": 743,
    "originalPrice": 1351,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "White",
      "Azure"
    ],
    "inStock": true,
    "description": "Rafter Coffee Mug with Lid | 175 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1010",
    "id": 1010,
    "name": "Rafter Coffee Mug with Lid | 250 ml | Set of 4",
    "price": 863,
    "originalPrice": 1569,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Natural",
      "Innocent",
      "White"
    ],
    "inStock": true,
    "description": "Rafter Coffee Mug with Lid | 250 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1011",
    "id": 1011,
    "name": "Rafter Coffee Mug with Lid | 175 ml | Set of 6",
    "price": 982,
    "originalPrice": 1785,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Celeste",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Rafter Coffee Mug with Lid | 175 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1012",
    "id": 1012,
    "name": "Rafter Coffee Mug with Lid | 250 ml | Set of 6",
    "price": 1155,
    "originalPrice": 2100,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Coral",
      "White",
      "Bamboo",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Rafter Coffee Mug with Lid | 250 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1013",
    "id": 1013,
    "name": "Statement Chai Cups | 120 ml | Set of 2",
    "price": 302,
    "originalPrice": 503,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Green",
      "Bamboo",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Statement Chai Cups | 120 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1014",
    "id": 1014,
    "name": "Statement Chai Cups | 120 ml | Set of 4",
    "price": 411,
    "originalPrice": 685,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Black",
      "Azure"
    ],
    "inStock": true,
    "description": "Statement Chai Cups | 120 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1015",
    "id": 1015,
    "name": "Statement Chai Cups | 120 ml | Set of 6",
    "price": 564,
    "originalPrice": 940,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Coffee",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Statement Chai Cups | 120 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1016",
    "id": 1016,
    "name": "Eco Nova Drinking Glass | 350 ml | Set of 4",
    "price": 331,
    "originalPrice": 587,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Celeste",
      "Azure"
    ],
    "inStock": true,
    "description": "Eco Nova Drinking Glass | 350 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1017",
    "id": 1017,
    "name": "Eco Nova Drinking Glass | 350 ml | Set of 6",
    "price": 400,
    "originalPrice": 710,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Multi",
      "Fern",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Eco Nova Drinking Glass | 350 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1018",
    "id": 1018,
    "name": "Icon Mug | 350 ml | Set of 2",
    "price": 491,
    "originalPrice": 818,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Innocent",
      "Azure",
      "White",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Icon Mug | 350 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1019",
    "id": 1019,
    "name": "Icon Mug | 350 ml | Set of 4",
    "price": 893,
    "originalPrice": 1488,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Natural",
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Icon Mug | 350 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1020",
    "id": 1020,
    "name": "Java Coffee Mug | 350ml | Set of 2",
    "price": 428,
    "originalPrice": 713,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Walnut",
      "Sand Castle",
      "Azure",
      "Fern"
    ],
    "inStock": true,
    "description": "Java Coffee Mug | 350ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1021",
    "id": 1021,
    "name": "Java Coffee Mug | 350ml | Set of 4",
    "price": 765,
    "originalPrice": 1275,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Celeste",
      "Walnut",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Java Coffee Mug | 350ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1022",
    "id": 1022,
    "name": "Java Coffee Mug | 350ml | Set of 6",
    "price": 1121,
    "originalPrice": 1868,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Java Coffee Mug | 350ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1023",
    "id": 1023,
    "name": "Unbreakable Lassi Tumbler Drinking Glass | 350 ml | Set of 2",
    "price": 392,
    "originalPrice": 653,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Natural",
      "Innocent",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Unbreakable Lassi Tumbler Drinking Glass | 350 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1024",
    "id": 1024,
    "name": "Unbreakable Lassi Tumbler Drinking Glass | 350 ml | Set of 4",
    "price": 613,
    "originalPrice": 1022,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Natural",
      "Innocent"
    ],
    "inStock": true,
    "description": "Unbreakable Lassi Tumbler Drinking Glass | 350 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1025",
    "id": 1025,
    "name": "Unbreakable Lassi Tumbler Drinking Glass | 350 ml | Set of 6",
    "price": 957,
    "originalPrice": 1595,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Sand Castle",
      "Natural"
    ],
    "inStock": true,
    "description": "Unbreakable Lassi Tumbler Drinking Glass | 350 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1026",
    "id": 1026,
    "name": "Wave Stainless Steel Insulated Coffee Mug | 250 ml | Set of 2",
    "price": 504,
    "originalPrice": 893,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Fern",
      "Innocent"
    ],
    "inStock": true,
    "description": "Wave Stainless Steel Insulated Coffee Mug | 250 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1027",
    "id": 1027,
    "name": "Wave Stainless Steel Insulated Coffee Mug | 400 ml | Set of 2",
    "price": 754,
    "originalPrice": 1338,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Sand Castle",
      "Innocent",
      "Walnut",
      "Pink"
    ],
    "inStock": true,
    "description": "Wave Stainless Steel Insulated Coffee Mug | 400 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1028",
    "id": 1028,
    "name": "Wave Stainless Steel Insulated Coffee Mug | 250 ml | Set of 4",
    "price": 931,
    "originalPrice": 1650,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Coral",
      "Fern",
      "Pink",
      "Coffee"
    ],
    "inStock": true,
    "description": "Wave Stainless Steel Insulated Coffee Mug | 250 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1029",
    "id": 1029,
    "name": "Wave Stainless Steel Insulated Coffee Mug | 400 ml | Set of 4",
    "price": 1432,
    "originalPrice": 2538,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Azure",
      "Coffee"
    ],
    "inStock": true,
    "description": "Wave Stainless Steel Insulated Coffee Mug | 400 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1030",
    "id": 1030,
    "name": "Cutting Chai Cups With Stand | Set of 6",
    "price": 771,
    "originalPrice": 1498,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Azure",
      "Green",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Cutting Chai Cups With Stand | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1031",
    "id": 1031,
    "name": "Cutting Chai Cups With Stand | 100 ml | Set of 4",
    "price": 590,
    "originalPrice": 1064,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Terracotta",
      "Blue",
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Cutting Chai Cups With Stand | 100 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1032",
    "id": 1032,
    "name": "Small Drinking Glass for Kids | 180 ml | Set of 2",
    "price": 307,
    "originalPrice": 447,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Sand Castle",
      "Charcoal",
      "Pink",
      "Coral"
    ],
    "inStock": true,
    "description": "Small Drinking Glass for Kids | 180 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1033",
    "id": 1033,
    "name": "Small Drinking Glass for Kids | 180 ml | Set of 4",
    "price": 345,
    "originalPrice": 612,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Blue",
      "Coffee",
      "White"
    ],
    "inStock": true,
    "description": "Small Drinking Glass for Kids | 180 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1034",
    "id": 1034,
    "name": "Small Drinking Glass for Kids | 180 ml | Set of 6",
    "price": 454,
    "originalPrice": 807,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Fern",
      "Celeste"
    ],
    "inStock": true,
    "description": "Small Drinking Glass for Kids | 180 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1035",
    "id": 1035,
    "name": "Statement Coffee Mug | 350 ml | Set of 2",
    "price": 441,
    "originalPrice": 650,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Coffee",
      "Walnut",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Statement Coffee Mug | 350 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1036",
    "id": 1036,
    "name": "Statement Coffee Mug | 350 ml | Set of 4",
    "price": 794,
    "originalPrice": 1146,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Pink",
      "Coral",
      "Innocent"
    ],
    "inStock": true,
    "description": "Statement Coffee Mug | 350 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1037",
    "id": 1037,
    "name": "Statement Coffee Mug | 350 ml | Set of 6",
    "price": 1179,
    "originalPrice": 1735,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Coral",
      "Black",
      "Pink"
    ],
    "inStock": true,
    "description": "Statement Coffee Mug | 350 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1038",
    "id": 1038,
    "name": "Classic Mug | 300 ml | Set of 6",
    "price": 986,
    "originalPrice": 1352,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Innocent",
      "Coral"
    ],
    "inStock": true,
    "description": "Classic Mug | 300 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1039",
    "id": 1039,
    "name": "Classic Mug | 300 ml | Set of 2",
    "price": 403,
    "originalPrice": 603,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Coffee",
      "Sand Castle",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Classic Mug | 300 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1040",
    "id": 1040,
    "name": "Classic Mug | 300 ml | Set of 4",
    "price": 704,
    "originalPrice": 953,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Sand Castle",
      "Celeste",
      "Black"
    ],
    "inStock": true,
    "description": "Classic Mug | 300 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1041",
    "id": 1041,
    "name": "Comfy Cup | 200 ml | Set of 2",
    "price": 315,
    "originalPrice": 446,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Black",
      "Natural"
    ],
    "inStock": true,
    "description": "Comfy Cup | 200 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1042",
    "id": 1042,
    "name": "Comfy Cup | 200 ml | Set of 4",
    "price": 582,
    "originalPrice": 851,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Charcoal",
      "Azure",
      "Pink"
    ],
    "inStock": true,
    "description": "Comfy Cup | 200 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1043",
    "id": 1043,
    "name": "Comfy Cup | 200 ml | Set of 6",
    "price": 770,
    "originalPrice": 1133,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Natural",
      "Celeste",
      "Black"
    ],
    "inStock": true,
    "description": "Comfy Cup | 200 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1044",
    "id": 1044,
    "name": "Cutting Chai Cups | 100 ml | Set of 2",
    "price": 281,
    "originalPrice": 378,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Blue",
      "Multi"
    ],
    "inStock": true,
    "description": "Cutting Chai Cups | 100 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1045",
    "id": 1045,
    "name": "Cutting Chai Cups | 100 ml | Set of 4",
    "price": 403,
    "originalPrice": 618,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Sand Castle",
      "Pink",
      "Green",
      "Innocent"
    ],
    "inStock": true,
    "description": "Cutting Chai Cups | 100 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1046",
    "id": 1046,
    "name": "Cutting Chai Cups | 100 ml | Set of 6",
    "price": 497,
    "originalPrice": 722,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Celeste",
      "Black"
    ],
    "inStock": true,
    "description": "Cutting Chai Cups | 100 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1047",
    "id": 1047,
    "name": "Majestic Mug | 375 ml | Set of 2",
    "price": 447,
    "originalPrice": 785,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Coffee",
      "Innocent",
      "Green",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Majestic Mug | 375 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1048",
    "id": 1048,
    "name": "Majestic Mug | 375 ml | Set of 4",
    "price": 823,
    "originalPrice": 1295,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Walnut",
      "Azure"
    ],
    "inStock": true,
    "description": "Majestic Mug | 375 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1049",
    "id": 1049,
    "name": "Majestic Mug | 375 ml | Set of 6",
    "price": 1334,
    "originalPrice": 1992,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Sand Castle",
      "Innocent",
      "Blue",
      "Walnut"
    ],
    "inStock": true,
    "description": "Majestic Mug | 375 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1050",
    "id": 1050,
    "name": "Insulated Green Bottle & Sipper | 400 ml",
    "price": 729,
    "originalPrice": 1289,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Blue",
      "Celeste"
    ],
    "inStock": true,
    "description": "Insulated Green Bottle & Sipper | 400 ml - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1051",
    "id": 1051,
    "name": "Insulated Green Water Bottle & Sipper | 600 ml",
    "price": 823,
    "originalPrice": 1449,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Blue",
      "Pink"
    ],
    "inStock": true,
    "description": "Insulated Green Water Bottle & Sipper | 600 ml - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1052",
    "id": 1052,
    "name": "Retro Coffee Mug with Lid | 350 ml | Set of 2",
    "price": 459,
    "originalPrice": 685,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Azure",
      "Bamboo",
      "Celeste",
      "Fern"
    ],
    "inStock": true,
    "description": "Retro Coffee Mug with Lid | 350 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1053",
    "id": 1053,
    "name": "Retro Coffee Mug with Lid | 350 ml | Set of 4",
    "price": 840,
    "originalPrice": 1195,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Fern"
    ],
    "inStock": true,
    "description": "Retro Coffee Mug with Lid | 350 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1054",
    "id": 1054,
    "name": "Retro Coffee Mug with Lid | 350 ml | Set of 6",
    "price": 1082,
    "originalPrice": 1918,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "White",
      "Black",
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Retro Coffee Mug with Lid | 350 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1055",
    "id": 1055,
    "name": "Frosted Tumbler | 250 ml | Set of 2",
    "price": 346,
    "originalPrice": 614,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Charcoal",
      "Innocent",
      "Coral"
    ],
    "inStock": true,
    "description": "Frosted Tumbler | 250 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1056",
    "id": 1056,
    "name": "Frosted Tumbler | 250 ml | Set of 4",
    "price": 443,
    "originalPrice": 786,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Walnut",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Frosted Tumbler | 250 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1057",
    "id": 1057,
    "name": "Frosted Tumbler | 250 ml | Set of 6",
    "price": 544,
    "originalPrice": 963,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Azure",
      "Black",
      "Coral"
    ],
    "inStock": true,
    "description": "Frosted Tumbler | 250 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1058",
    "id": 1058,
    "name": "Retro Cup | 250 ml | Set of 2",
    "price": 422,
    "originalPrice": 777,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "White",
      "Green",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Retro Cup | 250 ml | Set of 2 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1059",
    "id": 1059,
    "name": "Retro Cup | 250 ml | Set of 4",
    "price": 704,
    "originalPrice": 1430,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Sand Castle",
      "Natural",
      "Bamboo",
      "Coffee"
    ],
    "inStock": true,
    "description": "Retro Cup | 250 ml | Set of 4 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },
  {
    "_id": "1060",
    "id": 1060,
    "name": "Retro Cup | 250 ml | Set of 6",
    "price": 986,
    "originalPrice": 1081,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Coffee & Tea",
    "colors": [
      "Bamboo",
      "Walnut",
      "White",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Retro Cup | 250 ml | Set of 6 - Eco-friendly and sustainable drinkware.",
    "faqs": []
  },

  // ==================== DINING ESSENTIALS (88 products) ====================
  {
    "_id": "3000",
    "id": 3000,
    "name": "11 Inch Dinner Plate & Soup Bowl with Spoon & Square Tray | Set of 4",
    "price": 1339,
    "originalPrice": 2435,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Azure",
      "Coral",
      "Innocent"
    ],
    "inStock": true,
    "description": "11 Inch Dinner Plate & Soup Bowl with Spoon & Square Tray | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3001",
    "id": 3001,
    "name": "11 Inch Dinner Plate and Soup Bowl with Spoon | Set of 4",
    "price": 1084,
    "originalPrice": 1971,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Azure",
      "Celeste",
      "Fern"
    ],
    "inStock": true,
    "description": "11 Inch Dinner Plate and Soup Bowl with Spoon | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3002",
    "id": 3002,
    "name": "8 inch Small Snack Plates and Curry bowl | Set of 4",
    "price": 633,
    "originalPrice": 1151,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Walnut"
    ],
    "inStock": true,
    "description": "8 inch Small Snack Plates and Curry bowl | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3003",
    "id": 3003,
    "name": "Bloom Bowl for Serving | 600 ml | Set of 4",
    "price": 583,
    "originalPrice": 1060,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Charcoal",
      "Innocent"
    ],
    "inStock": true,
    "description": "Bloom Bowl for Serving | 600 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3004",
    "id": 3004,
    "name": "Bloom Bowl for Serving | 1200 ml | Set of 3",
    "price": 596,
    "originalPrice": 1084,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Coral"
    ],
    "inStock": true,
    "description": "Bloom Bowl for Serving | 1200 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3005",
    "id": 3005,
    "name": "Bloom Bowl for Serving | 600 ml | Set of 3",
    "price": 402,
    "originalPrice": 731,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Charcoal",
      "Bamboo",
      "Innocent",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Bloom Bowl for Serving | 600 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3006",
    "id": 3006,
    "name": "Bloom Bowl for Serving | 800 ml | Set of 3",
    "price": 510,
    "originalPrice": 927,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Green",
      "White"
    ],
    "inStock": true,
    "description": "Bloom Bowl for Serving | 800 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3007",
    "id": 3007,
    "name": "Bloom Bowl for Serving | 1200 ml | Set of 4",
    "price": 693,
    "originalPrice": 1260,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Celeste",
      "Azure",
      "Multi"
    ],
    "inStock": true,
    "description": "Bloom Bowl for Serving | 1200 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3008",
    "id": 3008,
    "name": "Bloom Bowl for Serving | 600 ml | Set of 4",
    "price": 464,
    "originalPrice": 844,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "Coffee",
      "Pink",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Bloom Bowl for Serving | 600 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3009",
    "id": 3009,
    "name": "Bloom Bowls Set (600, 800,1200 ml) | Set of 3",
    "price": 517,
    "originalPrice": 940,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Coffee",
      "Black",
      "Innocent"
    ],
    "inStock": true,
    "description": "Bloom Bowls Set (600, 800,1200 ml) | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3010",
    "id": 3010,
    "name": "Soup Bowl with Spoon and Square Tray | Set of 4",
    "price": 777,
    "originalPrice": 1413,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Pink",
      "Charcoal",
      "White"
    ],
    "inStock": true,
    "description": "Soup Bowl with Spoon and Square Tray | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3011",
    "id": 3011,
    "name": "Salad Bowl Set | 1550, 350 & 850 ml | Set of 3",
    "price": 800,
    "originalPrice": 1455,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "White",
      "Walnut",
      "Green"
    ],
    "inStock": true,
    "description": "Salad Bowl Set | 1550, 350 & 850 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3012",
    "id": 3012,
    "name": "Salad Bowl Set | 1550 & 850 ml | Set of 2",
    "price": 695,
    "originalPrice": 1264,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Natural",
      "Black"
    ],
    "inStock": true,
    "description": "Salad Bowl Set | 1550 & 850 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3013",
    "id": 3013,
    "name": "Salad Bowl Set | 350 & 850 ml | Set of 2",
    "price": 487,
    "originalPrice": 885,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "White"
    ],
    "inStock": true,
    "description": "Salad Bowl Set | 350 & 850 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3014",
    "id": 3014,
    "name": "Soup Bowl | 350ml | Set of 3",
    "price": 516,
    "originalPrice": 1089,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Innocent",
      "Terracotta",
      "Pink"
    ],
    "inStock": true,
    "description": "Soup Bowl | 350ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3015",
    "id": 3015,
    "name": "Soup Bowl | 350ml | Set of 6",
    "price": 1112,
    "originalPrice": 2022,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Fern"
    ],
    "inStock": true,
    "description": "Soup Bowl | 350ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3016",
    "id": 3016,
    "name": "Double Dish Pistachio Serving Bowls | 400ml | Set of 1",
    "price": 522,
    "originalPrice": 870,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Innocent",
      "Coffee",
      "Multi"
    ],
    "inStock": true,
    "description": "Double Dish Pistachio Serving Bowls | 400ml | Set of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3017",
    "id": 3017,
    "name": "Double Dish Pistachio Serving Bowls | 400ml | Set of 2",
    "price": 747,
    "originalPrice": 1245,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coral",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Double Dish Pistachio Serving Bowls | 400ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3018",
    "id": 3018,
    "name": "Elara Curry Bowls | 1000 ml | Set of 3",
    "price": 450,
    "originalPrice": 798,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Coral",
      "Terracotta",
      "Blue"
    ],
    "inStock": true,
    "description": "Elara Curry Bowls | 1000 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3019",
    "id": 3019,
    "name": "Elara Curry Bowls | 300 ml | Set of 3",
    "price": 323,
    "originalPrice": 573,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Innocent",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Elara Curry Bowls | 300 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3020",
    "id": 3020,
    "name": "Elara Curry Bowls | 600 ml | Set of 3",
    "price": 382,
    "originalPrice": 678,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Fern",
      "Green",
      "Innocent"
    ],
    "inStock": true,
    "description": "Elara Curry Bowls | 600 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3021",
    "id": 3021,
    "name": "Elara Curry Bowls | 1000 ml | Set of 4",
    "price": 533,
    "originalPrice": 945,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Innocent",
      "Black"
    ],
    "inStock": true,
    "description": "Elara Curry Bowls | 1000 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3022",
    "id": 3022,
    "name": "Elara Curry Bowls | 300 ml | Set of 4",
    "price": 366,
    "originalPrice": 650,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Charcoal",
      "White"
    ],
    "inStock": true,
    "description": "Elara Curry Bowls | 300 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3023",
    "id": 3023,
    "name": "Elara Curry Bowls | 600 ml | Set of 4",
    "price": 474,
    "originalPrice": 790,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Innocent"
    ],
    "inStock": true,
    "description": "Elara Curry Bowls | 600 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3024",
    "id": 3024,
    "name": "Elara Serving Bowls | 1000, 600, 300ml | Set of 3",
    "price": 392,
    "originalPrice": 695,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Black",
      "Azure",
      "Celeste",
      "Natural"
    ],
    "inStock": true,
    "description": "Elara Serving Bowls | 1000, 600, 300ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3025",
    "id": 3025,
    "name": "Statement Bowls for Food | 550 ml | Set of 2",
    "price": 451,
    "originalPrice": 800,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Multi",
      "Azure"
    ],
    "inStock": true,
    "description": "Statement Bowls for Food | 550 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3026",
    "id": 3026,
    "name": "Statement Bowls for Food | 550 ml | Set of 4",
    "price": 819,
    "originalPrice": 1452,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "Celeste",
      "Azure",
      "Blue"
    ],
    "inStock": true,
    "description": "Statement Bowls for Food | 550 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3027",
    "id": 3027,
    "name": "Statement Bowls for Food | 550 ml | Set of 6",
    "price": 1222,
    "originalPrice": 2165,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Azure",
      "Terracotta",
      "Coffee"
    ],
    "inStock": true,
    "description": "Statement Bowls for Food | 550 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3028",
    "id": 3028,
    "name": "Verde Bowls for Snacks | 300 ml | Set of 4",
    "price": 559,
    "originalPrice": 992,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Green"
    ],
    "inStock": true,
    "description": "Verde Bowls for Snacks | 300 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3029",
    "id": 3029,
    "name": "Verde Round Plates | 8 inch | Set of 4",
    "price": 951,
    "originalPrice": 1687,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Azure",
      "Coral",
      "Fern",
      "Celeste"
    ],
    "inStock": true,
    "description": "Verde Round Plates | 8 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3030",
    "id": 3030,
    "name": "Dinner Set for Kids | Set of 2",
    "price": 683,
    "originalPrice": 968,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Coral",
      "Walnut"
    ],
    "inStock": true,
    "description": "Dinner Set for Kids | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3031",
    "id": 3031,
    "name": "Dinner Set for Kids | Set of 4",
    "price": 1219,
    "originalPrice": 1799,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Blue",
      "Azure",
      "Celeste",
      "Multi"
    ],
    "inStock": true,
    "description": "Dinner Set for Kids | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3032",
    "id": 3032,
    "name": "Round 3 Partition Plates for Kids | 8 inch | Set of 2",
    "price": 463,
    "originalPrice": 771,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Coffee"
    ],
    "inStock": true,
    "description": "Round 3 Partition Plates for Kids | 8 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3033",
    "id": 3033,
    "name": "Round 3 Partition Plates for Kids | 8 inch | Set of 4",
    "price": 727,
    "originalPrice": 1212,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Multi",
      "Black",
      "Coral",
      "Innocent"
    ],
    "inStock": true,
    "description": "Round 3 Partition Plates for Kids | 8 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3034",
    "id": 3034,
    "name": "Round 3 Partition Plates for Kids | 8 inch | Set of 6",
    "price": 1128,
    "originalPrice": 1881,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Natural",
      "White",
      "Blue"
    ],
    "inStock": true,
    "description": "Round 3 Partition Plates for Kids | 8 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3035",
    "id": 3035,
    "name": "Cutlery Set for Dining Table | Set of 2",
    "price": 286,
    "originalPrice": 432,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Charcoal",
      "Sand Castle",
      "Innocent",
      "Coffee"
    ],
    "inStock": true,
    "description": "Cutlery Set for Dining Table | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3036",
    "id": 3036,
    "name": "Cutlery Set for Dining Table | Set of 4",
    "price": 334,
    "originalPrice": 592,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Natural",
      "Charcoal",
      "Walnut"
    ],
    "inStock": true,
    "description": "Cutlery Set for Dining Table | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3037",
    "id": 3037,
    "name": "Kids Bowls | 400 ml | Set of 2",
    "price": 326,
    "originalPrice": 484,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Natural",
      "Sand Castle",
      "Fern"
    ],
    "inStock": true,
    "description": "Kids Bowls | 400 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3038",
    "id": 3038,
    "name": "Kids Bowls | 400 ml | Set of 6",
    "price": 666,
    "originalPrice": 538,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Azure",
      "Coral"
    ],
    "inStock": true,
    "description": "Kids Bowls | 400 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3039",
    "id": 3039,
    "name": "Kids Bowls | 400 ml | Set of 4",
    "price": 459,
    "originalPrice": 395,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "Blue",
      "Coffee",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Kids Bowls | 400 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3040",
    "id": 3040,
    "name": "Small Round Plates for Kids | 8 inch | Set of 2",
    "price": 443,
    "originalPrice": 603,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Black",
      "Innocent",
      "Pink",
      "Coral"
    ],
    "inStock": true,
    "description": "Small Round Plates for Kids | 8 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3041",
    "id": 3041,
    "name": "Small Round Plates for Kids | 8 inch | Set of 4",
    "price": 640,
    "originalPrice": 897,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Blue",
      "Azure",
      "Coffee"
    ],
    "inStock": true,
    "description": "Small Round Plates for Kids | 8 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3042",
    "id": 3042,
    "name": "Small Round Plates for Kids | 8 inch | Set of 6",
    "price": 854,
    "originalPrice": 1190,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Pink",
      "Innocent"
    ],
    "inStock": true,
    "description": "Small Round Plates for Kids | 8 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3043",
    "id": 3043,
    "name": "Small Plates Set for Snacks | 6 inch | Set of 4",
    "price": 412,
    "originalPrice": 595,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Green",
      "Multi",
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Small Plates Set for Snacks | 6 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3044",
    "id": 3044,
    "name": "Small Plates Set for Snacks | 6 inch | Set of 6",
    "price": 540,
    "originalPrice": 793,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "Sand Castle",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Small Plates Set for Snacks | 6 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3045",
    "id": 3045,
    "name": "Soup Bowl with Spoon | 250 ml | Set of 2",
    "price": 365,
    "originalPrice": 531,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "Fern",
      "Celeste",
      "Pink"
    ],
    "inStock": true,
    "description": "Soup Bowl with Spoon | 250 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3046",
    "id": 3046,
    "name": "Soup Bowl with Spoon | 250 ml | Set of 4",
    "price": 535,
    "originalPrice": 751,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Fern",
      "Natural"
    ],
    "inStock": true,
    "description": "Soup Bowl with Spoon | 250 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3047",
    "id": 3047,
    "name": "Soup Bowl with Spoon | 250 ml | Set of 6",
    "price": 714,
    "originalPrice": 1149,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Multi",
      "Green"
    ],
    "inStock": true,
    "description": "Soup Bowl with Spoon | 250 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3048",
    "id": 3048,
    "name": "Dinner Plates | 9 inch | Set of 4",
    "price": 563,
    "originalPrice": 858,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "Blue",
      "Natural"
    ],
    "inStock": true,
    "description": "Dinner Plates | 9 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3049",
    "id": 3049,
    "name": "Square Dinner Plates |11 inch| Set of 4",
    "price": 704,
    "originalPrice": 1138,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Terracotta",
      "Black",
      "Azure",
      "Coral"
    ],
    "inStock": true,
    "description": "Square Dinner Plates |11 inch| Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3050",
    "id": 3050,
    "name": "Dip Bowls for Kitchen | 125 ml | Set of 4",
    "price": 294,
    "originalPrice": 595,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "Walnut",
      "Multi",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Dip Bowls for Kitchen | 125 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3051",
    "id": 3051,
    "name": "Curry Bowl | 175 ml | Set of 2",
    "price": 244,
    "originalPrice": 328,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Natural",
      "Walnut"
    ],
    "inStock": true,
    "description": "Curry Bowl | 175 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3052",
    "id": 3052,
    "name": "Curry Bowl | 175 ml | Set of 4",
    "price": 356,
    "originalPrice": 429,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "White",
      "Coffee",
      "Black",
      "Coral"
    ],
    "inStock": true,
    "description": "Curry Bowl | 175 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3053",
    "id": 3053,
    "name": "Curry Bowl | 175 ml | Set of 6",
    "price": 450,
    "originalPrice": 604,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "Bamboo",
      "Multi"
    ],
    "inStock": true,
    "description": "Curry Bowl | 175 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3054",
    "id": 3054,
    "name": "3 Partition Plates for Kids | 8 inch | Set of 2",
    "price": 592,
    "originalPrice": 993,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "3 Partition Plates for Kids | 8 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3055",
    "id": 3055,
    "name": "3 Partition Plates for Kids | 8 inch | Set of 4",
    "price": 929,
    "originalPrice": 1546,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coral",
      "Sand Castle",
      "White"
    ],
    "inStock": true,
    "description": "3 Partition Plates for Kids | 8 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3056",
    "id": 3056,
    "name": "3 Partition Plates for Kids | 8 inch | Set of 6",
    "price": 1299,
    "originalPrice": 2288,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "Multi",
      "Coral",
      "Azure"
    ],
    "inStock": true,
    "description": "3 Partition Plates for Kids | 8 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3057",
    "id": 3057,
    "name": "6 Partition Plates | 14 inch | Set of 2",
    "price": 787,
    "originalPrice": 1395,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Pink",
      "Natural"
    ],
    "inStock": true,
    "description": "6 Partition Plates | 14 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3058",
    "id": 3058,
    "name": "6 Partition Plates | 14 inch | Set of 4",
    "price": 1328,
    "originalPrice": 2354,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "Blue"
    ],
    "inStock": true,
    "description": "6 Partition Plates | 14 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3059",
    "id": 3059,
    "name": "6 Partition Plates | 14 inch | Set of 6",
    "price": 1880,
    "originalPrice": 1843,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Multi"
    ],
    "inStock": true,
    "description": "6 Partition Plates | 14 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3060",
    "id": 3060,
    "name": "Small Curry Bowls for Kitchen | 175 ml | Set of 4",
    "price": 288,
    "originalPrice": 588,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Green",
      "Blue",
      "Coral",
      "Black"
    ],
    "inStock": true,
    "description": "Small Curry Bowls for Kitchen | 175 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3061",
    "id": 3061,
    "name": "Small Curry Bowls for Kitchen | 250 ml | Set of 4",
    "price": 350,
    "originalPrice": 588,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Small Curry Bowls for Kitchen | 250 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3062",
    "id": 3062,
    "name": "Small Curry Bowls for Kitchen | 300 ml | Set of 4",
    "price": 380,
    "originalPrice": 588,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Black",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Small Curry Bowls for Kitchen | 300 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3063",
    "id": 3063,
    "name": "Small Curry Bowls for Kitchen | 125 ml | Set of 4",
    "price": 306,
    "originalPrice": 588,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coral",
      "Fern",
      "Natural"
    ],
    "inStock": true,
    "description": "Small Curry Bowls for Kitchen | 125 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3064",
    "id": 3064,
    "name": "Frosted Tumbler | 250 ml | Set of 2",
    "price": 346,
    "originalPrice": 614,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Coral",
      "Terracotta",
      "Blue"
    ],
    "inStock": true,
    "description": "Frosted Tumbler | 250 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3065",
    "id": 3065,
    "name": "Frosted Tumbler | 250 ml | Set of 4",
    "price": 443,
    "originalPrice": 786,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Sand Castle",
      "Multi"
    ],
    "inStock": true,
    "description": "Frosted Tumbler | 250 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3066",
    "id": 3066,
    "name": "Frosted Tumbler | 250 ml | Set of 6",
    "price": 544,
    "originalPrice": 963,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Green",
      "Coffee",
      "White",
      "Azure"
    ],
    "inStock": true,
    "description": "Frosted Tumbler | 250 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3067",
    "id": 3067,
    "name": "Frosty Mixing Bowl | 1800 ml | Set of 3",
    "price": 639,
    "originalPrice": 1036,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Azure",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Frosty Mixing Bowl | 1800 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3068",
    "id": 3068,
    "name": "Frosty Mixing Bowl | 1800 ml | Set of 4",
    "price": 751,
    "originalPrice": 1186,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Multi",
      "Innocent",
      "Black"
    ],
    "inStock": true,
    "description": "Frosty Mixing Bowl | 1800 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3069",
    "id": 3069,
    "name": "Frosty Mixing Bowls | 1800 ml | Set of 2",
    "price": 516,
    "originalPrice": 766,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Charcoal",
      "Terracotta",
      "Celeste"
    ],
    "inStock": true,
    "description": "Frosty Mixing Bowls | 1800 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3070",
    "id": 3070,
    "name": "Mini snack plates with Spoon | 6 inch | Set of 2",
    "price": 309,
    "originalPrice": 503,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Natural",
      "Azure"
    ],
    "inStock": true,
    "description": "Mini snack plates with Spoon | 6 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3071",
    "id": 3071,
    "name": "Mini snack plates with Spoon | 6 inch | Set of 4",
    "price": 422,
    "originalPrice": 679,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Innocent",
      "Coral"
    ],
    "inStock": true,
    "description": "Mini snack plates with Spoon | 6 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3072",
    "id": 3072,
    "name": "Mini snack plates with Spoon | 6 inch | Set of 6",
    "price": 515,
    "originalPrice": 912,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Charcoal",
      "Sand Castle",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Mini snack plates with Spoon | 6 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3073",
    "id": 3073,
    "name": "Pasta Bowl with Spoon | 750 ml | Set of 2",
    "price": 328,
    "originalPrice": 582,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Azure",
      "Celeste",
      "White",
      "Multi"
    ],
    "inStock": true,
    "description": "Pasta Bowl with Spoon | 750 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3074",
    "id": 3074,
    "name": "Pasta Bowl with Spoon | 750 ml | Set of 4",
    "price": 498,
    "originalPrice": 883,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "White",
      "Celeste",
      "Innocent"
    ],
    "inStock": true,
    "description": "Pasta Bowl with Spoon | 750 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3075",
    "id": 3075,
    "name": "Pasta Bowl with Spoon | 750 ml | Set of 6",
    "price": 720,
    "originalPrice": 1276,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Bamboo",
      "Innocent",
      "White"
    ],
    "inStock": true,
    "description": "Pasta Bowl with Spoon | 750 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3076",
    "id": 3076,
    "name": "Picnic Plate | 9 inch | Set of 2",
    "price": 441,
    "originalPrice": 737,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Charcoal",
      "Sand Castle",
      "Green",
      "Innocent"
    ],
    "inStock": true,
    "description": "Picnic Plate | 9 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3077",
    "id": 3077,
    "name": "Picnic Plate | 9 inch | Set of 4",
    "price": 625,
    "originalPrice": 1138,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Walnut",
      "White",
      "Coral",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Picnic Plate | 9 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3078",
    "id": 3078,
    "name": "Picnic Plate | 9 inch | Set of 6",
    "price": 866,
    "originalPrice": 1569,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Blue",
      "Azure"
    ],
    "inStock": true,
    "description": "Picnic Plate | 9 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3079",
    "id": 3079,
    "name": "Snack Plates | 8 inch | Set of 2",
    "price": 328,
    "originalPrice": 402,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Fern",
      "Azure",
      "Sand Castle",
      "Pink"
    ],
    "inStock": true,
    "description": "Snack Plates | 8 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3080",
    "id": 3080,
    "name": "Snack Plates | 8 inch | Set of 4",
    "price": 460,
    "originalPrice": 579,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Multi",
      "Innocent",
      "Terracotta",
      "Azure"
    ],
    "inStock": true,
    "description": "Snack Plates | 8 inch | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3081",
    "id": 3081,
    "name": "Snack Plates | 8 inch | Set of 6",
    "price": 601,
    "originalPrice": 785,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Blue",
      "Coral",
      "Walnut"
    ],
    "inStock": true,
    "description": "Snack Plates | 8 inch | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3082",
    "id": 3082,
    "name": "Soup Bowl | 300 ml | Set of 2",
    "price": 282,
    "originalPrice": 415,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Azure",
      "Innocent",
      "Blue"
    ],
    "inStock": true,
    "description": "Soup Bowl | 300 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3083",
    "id": 3083,
    "name": "Soup Bowl | 300 ml | Set of 4",
    "price": 383,
    "originalPrice": 699,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Coffee",
      "Multi",
      "Pink",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Soup Bowl | 300 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3084",
    "id": 3084,
    "name": "Soup Bowl | 300 ml | Set of 6",
    "price": 502,
    "originalPrice": 999,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Azure",
      "Celeste",
      "Fern",
      "Innocent"
    ],
    "inStock": true,
    "description": "Soup Bowl | 300 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3085",
    "id": 3085,
    "name": "Veg Bowl with Spoon | 600 ml | Set of 2",
    "price": 328,
    "originalPrice": 438,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Veg Bowl with Spoon | 600 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3086",
    "id": 3086,
    "name": "Veg Bowl with Spoon | 600 ml | Set of 4",
    "price": 469,
    "originalPrice": 689,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Sand Castle",
      "Azure",
      "Coffee"
    ],
    "inStock": true,
    "description": "Veg Bowl with Spoon | 600 ml | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "3087",
    "id": 3087,
    "name": "Veg Bowl | 600 ml | Set of 6",
    "price": 0,
    "originalPrice": 0,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Dining Essentials",
    "colors": [
      "Terracotta",
      "Charcoal",
      "White"
    ],
    "inStock": false,
    "description": "Veg Bowl | 600 ml | Set of 6 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },

  // ==================== KITCHEN TOOLS (29 products) ====================
  {
    "_id": "4000",
    "id": 4000,
    "name": "Rimora Tray Set for Serving | 15 Inch | Set of 2",
    "price": 1223,
    "originalPrice": 2224,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Charcoal",
      "Coral"
    ],
    "inStock": true,
    "description": "Rimora Tray Set for Serving | 15 Inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4001",
    "id": 4001,
    "name": "Soul Snack Box | 800 ml | Set of 2",
    "price": 727,
    "originalPrice": 1322,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Black",
      "Azure",
      "White"
    ],
    "inStock": true,
    "description": "Soul Snack Box | 800 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4002",
    "id": 4002,
    "name": "Two Dockie Stand & Coasters | Set of 12",
    "price": 393,
    "originalPrice": 715,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Black",
      "Celeste",
      "Coral"
    ],
    "inStock": true,
    "description": "Two Dockie Stand & Coasters | Set of 12 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4003",
    "id": 4003,
    "name": "Velveta Tissue Box holder (with Tissue) | Set of 1",
    "price": 480,
    "originalPrice": 873,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "White",
      "Innocent",
      "Walnut",
      "Coffee"
    ],
    "inStock": true,
    "description": "Velveta Tissue Box holder (with Tissue) | Set of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4004",
    "id": 4004,
    "name": "Velveta Tissue Box holder (with Tissue)| Set of 2",
    "price": 838,
    "originalPrice": 1524,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Velveta Tissue Box holder (with Tissue)| Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4005",
    "id": 4005,
    "name": "Small Cutlery Set for Dining Table | Set of 4",
    "price": 346,
    "originalPrice": 577,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Innocent",
      "Coral",
      "Blue",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Small Cutlery Set for Dining Table | Set of 4 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4006",
    "id": 4006,
    "name": "Curve Serving Bowls with Lid | 1000, 750, 500ml | Set of 3",
    "price": 1079,
    "originalPrice": 1913,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Coffee",
      "Innocent"
    ],
    "inStock": true,
    "description": "Curve Serving Bowls with Lid | 1000, 750, 500ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4007",
    "id": 4007,
    "name": "Terravo Storage Containers | 1200ml, 600ml | Pack Of 2",
    "price": 942,
    "originalPrice": 1672,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Bamboo",
      "Sand Castle",
      "Walnut",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Terravo Storage Containers | 1200ml, 600ml | Pack Of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4008",
    "id": 4008,
    "name": "Terravo Storage Containers | 2200 ml, 1200ml | Pack Of 2",
    "price": 1340,
    "originalPrice": 2377,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Azure",
      "Blue",
      "Celeste",
      "Green"
    ],
    "inStock": true,
    "description": "Terravo Storage Containers | 2200 ml, 1200ml | Pack Of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4009",
    "id": 4009,
    "name": "Terravo Storage Containers | 2200, 1200, 600ml | Pack Of 3",
    "price": 1599,
    "originalPrice": 2835,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Sand Castle",
      "Walnut",
      "Natural",
      "Coral"
    ],
    "inStock": true,
    "description": "Terravo Storage Containers | 2200, 1200, 600ml | Pack Of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4010",
    "id": 4010,
    "name": "Kitchen Storage Jars & Containers | 800 ml | Set of 2",
    "price": 487,
    "originalPrice": 812,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Sand Castle",
      "Green"
    ],
    "inStock": true,
    "description": "Kitchen Storage Jars & Containers | 800 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4011",
    "id": 4011,
    "name": "Kitchen Storage Jars & Containers | 800 ml | Set of 3",
    "price": 695,
    "originalPrice": 1158,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "White",
      "Charcoal",
      "Celeste",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Kitchen Storage Jars & Containers | 800 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4012",
    "id": 4012,
    "name": "Storage Bowl with lids | 1600 ml | Set of 1",
    "price": 694,
    "originalPrice": 1157,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Blue",
      "Celeste",
      "Charcoal",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Storage Bowl with lids | 1600 ml | Set of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4013",
    "id": 4013,
    "name": "Storage Bowl with lids | 2900 ml | Set of 1",
    "price": 921,
    "originalPrice": 1535,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Sand Castle",
      "Innocent",
      "Pink"
    ],
    "inStock": true,
    "description": "Storage Bowl with lids | 2900 ml | Set of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4014",
    "id": 4014,
    "name": "Kitchen Storage Containers | 2000 ml | Set of 1",
    "price": 669,
    "originalPrice": 631,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Charcoal",
      "Fern"
    ],
    "inStock": true,
    "description": "Kitchen Storage Containers | 2000 ml | Set of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4015",
    "id": 4015,
    "name": "Kitchen Storage Jars & Containers | 2000 ml | Set of 2",
    "price": 1019,
    "originalPrice": 1008,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Multi",
      "Terracotta",
      "Coffee"
    ],
    "inStock": true,
    "description": "Kitchen Storage Jars & Containers | 2000 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4016",
    "id": 4016,
    "name": "Kitchen Storage Jars & Containers | 2000 ml | Set of 3",
    "price": 1655,
    "originalPrice": 1533,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Bamboo",
      "Natural"
    ],
    "inStock": true,
    "description": "Kitchen Storage Jars & Containers | 2000 ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4017",
    "id": 4017,
    "name": "Storage Container Bowls | 2000ml | Set of 2",
    "price": 1568,
    "originalPrice": 2470,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Fern",
      "Coffee"
    ],
    "inStock": true,
    "description": "Storage Container Bowls | 2000ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4018",
    "id": 4018,
    "name": "Storage Container Bowls | 2000ml | Set of 1",
    "price": 879,
    "originalPrice": 1558,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Azure",
      "Celeste",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Storage Container Bowls | 2000ml | Set of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4019",
    "id": 4019,
    "name": "Canister Storage with airtight lid | 700ml | Set of 1",
    "price": 371,
    "originalPrice": 658,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Fern",
      "Blue",
      "White",
      "Multi"
    ],
    "inStock": true,
    "description": "Canister Storage with airtight lid | 700ml | Set of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4020",
    "id": 4020,
    "name": "Canister Storage with airtight lid | 700ml | Set of 2",
    "price": 704,
    "originalPrice": 1136,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Coral",
      "Coffee"
    ],
    "inStock": true,
    "description": "Canister Storage with airtight lid | 700ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4021",
    "id": 4021,
    "name": "Canister Storage with airtight lid | 700ml | Set of 3",
    "price": 996,
    "originalPrice": 1535,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Innocent",
      "Coral",
      "Coffee"
    ],
    "inStock": true,
    "description": "Canister Storage with airtight lid | 700ml | Set of 3 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4022",
    "id": 4022,
    "name": "Ecovue Storage Containers | 2100 ml | Pack Of 1",
    "price": 804,
    "originalPrice": 1337,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Natural",
      "Celeste"
    ],
    "inStock": false,
    "description": "Ecovue Storage Containers | 2100 ml | Pack Of 1 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4023",
    "id": 4023,
    "name": "Serving Bowl with lid | 1250 ml | Set of 2",
    "price": 827,
    "originalPrice": 1698,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Azure",
      "Bamboo",
      "Walnut",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Serving Bowl with lid | 1250 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4024",
    "id": 4024,
    "name": "Serving Bowl with lid | 2500 ml | Set of 2",
    "price": 1061,
    "originalPrice": 2199,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Coffee",
      "Azure",
      "Natural"
    ],
    "inStock": true,
    "description": "Serving Bowl with lid | 2500 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4025",
    "id": 4025,
    "name": "Serving Greet Tray | 17 inch | Set of 2",
    "price": 897,
    "originalPrice": 848,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Coffee",
      "Sand Castle",
      "Pink",
      "Multi"
    ],
    "inStock": true,
    "description": "Serving Greet Tray | 17 inch | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4026",
    "id": 4026,
    "name": "Square Greet Tray | 12inch",
    "price": 579,
    "originalPrice": 804,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Charcoal",
      "Sand Castle",
      "Azure",
      "Natural"
    ],
    "inStock": true,
    "description": "Square Greet Tray | 12inch - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4027",
    "id": 4027,
    "name": "Storage Bowl with lids | 1600 ml | Set of 2",
    "price": 869,
    "originalPrice": 1538,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Azure",
      "White"
    ],
    "inStock": true,
    "description": "Storage Bowl with lids | 1600 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },
  {
    "_id": "4028",
    "id": 4028,
    "name": "Storage Bowl with lids | 2900 ml | Set of 2",
    "price": 1240,
    "originalPrice": 2087,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Kitchen Tools",
    "colors": [
      "Multi",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Storage Bowl with lids | 2900 ml | Set of 2 - Upgrade your kitchen and dining experience.",
    "faqs": []
  },

  // ==================== INDOOR GARDENWARE (131 products) ====================
  {
    "_id": "800",
    "id": 800,
    "name": "Nile Planter 9.5 inch Pots for Plants | Pack of 2",
    "price": 751,
    "originalPrice": 1365,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "White"
    ],
    "inStock": true,
    "description": "Nile Planter 9.5 inch Pots for Plants | Pack of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "801",
    "id": 801,
    "name": "Nile Planter 9.5 inch Pots for Plants | Pack of 4",
    "price": 1375,
    "originalPrice": 2500,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Pink",
      "Green",
      "Blue"
    ],
    "inStock": true,
    "description": "Nile Planter 9.5 inch Pots for Plants | Pack of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "802",
    "id": 802,
    "name": "Nile Planter 9.5 inch Pots for Plants | Pack of 6",
    "price": 1784,
    "originalPrice": 3244,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Black",
      "Multi",
      "Azure"
    ],
    "inStock": true,
    "description": "Nile Planter 9.5 inch Pots for Plants | Pack of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "803",
    "id": 803,
    "name": "Oreo 4 inch Small pots for Indoor Plants with 2 Growmix | Pack of 4",
    "price": 891,
    "originalPrice": 1620,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "White",
      "Walnut",
      "Green"
    ],
    "inStock": true,
    "description": "Oreo 4 inch Small pots for Indoor Plants with 2 Growmix | Pack of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "804",
    "id": 804,
    "name": "Romano 5 inch Planters | Set of 2",
    "price": 517,
    "originalPrice": 940,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste",
      "Natural",
      "Walnut"
    ],
    "inStock": true,
    "description": "Romano 5 inch Planters | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "805",
    "id": 805,
    "name": "Romano 5 inch Planters | Set of 4",
    "price": 926,
    "originalPrice": 1684,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Green"
    ],
    "inStock": true,
    "description": "Romano 5 inch Planters | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "806",
    "id": 806,
    "name": "Romano 6 inch Planters | Set of 2",
    "price": 719,
    "originalPrice": 1307,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Blue"
    ],
    "inStock": true,
    "description": "Romano 6 inch Planters | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "807",
    "id": 807,
    "name": "Romano 6 inch Planters | Set of 4",
    "price": 1179,
    "originalPrice": 2144,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Green",
      "Innocent"
    ],
    "inStock": true,
    "description": "Romano 6 inch Planters | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "808",
    "id": 808,
    "name": "Statement Pot 4 Inch Planters | Set of 2",
    "price": 407,
    "originalPrice": 740,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Charcoal",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Statement Pot 4 Inch Planters | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "809",
    "id": 809,
    "name": "Statement Pot 4 Inch Planters | Set of 4",
    "price": 706,
    "originalPrice": 1284,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "Walnut",
      "Azure"
    ],
    "inStock": true,
    "description": "Statement Pot 4 Inch Planters | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8010",
    "id": 8010,
    "name": "Statement Pot 4 Inch Planters | Set of 6",
    "price": 1039,
    "originalPrice": 1889,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Statement Pot 4 Inch Planters | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8011",
    "id": 8011,
    "name": "Cypress 10″ Tower Pots with Plates | Set of 2",
    "price": 919,
    "originalPrice": 1532,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Terracotta",
      "Walnut",
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Cypress 10″ Tower Pots with Plates | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8012",
    "id": 8012,
    "name": "Cypress 10″ Tower Pots with Plates | Set of 4",
    "price": 1609,
    "originalPrice": 2682,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Pink",
      "Innocent",
      "Celeste"
    ],
    "inStock": true,
    "description": "Cypress 10″ Tower Pots with Plates | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8013",
    "id": 8013,
    "name": "Cypress 13″ Tower Pots with Plates | Set of 2",
    "price": 1367,
    "originalPrice": 2278,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Multi",
      "White"
    ],
    "inStock": true,
    "description": "Cypress 13″ Tower Pots with Plates | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8014",
    "id": 8014,
    "name": "Cypress 13″ Tower Pots with Plates | Set of 4",
    "price": 2341,
    "originalPrice": 3902,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Bamboo",
      "Multi",
      "White"
    ],
    "inStock": true,
    "description": "Cypress 13″ Tower Pots with Plates | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8015",
    "id": 8015,
    "name": "Cypress 16″ Tower Pots with Plates | Set of 2",
    "price": 2077,
    "originalPrice": 3462,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "White",
      "Black"
    ],
    "inStock": false,
    "description": "Cypress 16″ Tower Pots with Plates | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8016",
    "id": 8016,
    "name": "Cypress 16″ Tower Pots with Plates | Set of 4",
    "price": 3564,
    "originalPrice": 5940,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Fern",
      "Walnut"
    ],
    "inStock": false,
    "description": "Cypress 16″ Tower Pots with Plates | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8017",
    "id": 8017,
    "name": "8 inch Ripple Pots & Planters | Set of 4",
    "price": 984,
    "originalPrice": 1789,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Charcoal"
    ],
    "inStock": true,
    "description": "8 inch Ripple Pots & Planters | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8018",
    "id": 8018,
    "name": "8 inch Ripple Pots & Planters | Set of 2",
    "price": 613,
    "originalPrice": 1115,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Green",
      "Celeste",
      "Walnut",
      "Multi"
    ],
    "inStock": true,
    "description": "8 inch Ripple Pots & Planters | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8019",
    "id": 8019,
    "name": "10″ Leafy Planters with Tray & Stand | Set of 2",
    "price": 1326,
    "originalPrice": 2210,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Blue",
      "Bamboo",
      "Black"
    ],
    "inStock": true,
    "description": "10″ Leafy Planters with Tray & Stand | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8020",
    "id": 8020,
    "name": "Aura 10 Inch pots with Stand | Set of 2",
    "price": 1380,
    "originalPrice": 2300,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste"
    ],
    "inStock": true,
    "description": "Aura 10 Inch pots with Stand | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8021",
    "id": 8021,
    "name": "Deco 9″ SelfWatering Pots with Stand | Set of 2",
    "price": 1411,
    "originalPrice": 2352,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Sand Castle",
      "Celeste"
    ],
    "inStock": true,
    "description": "Deco 9″ SelfWatering Pots with Stand | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8022",
    "id": 8022,
    "name": "10″ Archway Planters with Tray | Set of 2",
    "price": 975,
    "originalPrice": 1625,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Black",
      "Green"
    ],
    "inStock": true,
    "description": "10″ Archway Planters with Tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8023",
    "id": 8023,
    "name": "10″ Archway Planters with Tray | Set of 4",
    "price": 1362,
    "originalPrice": 2270,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "Bamboo",
      "Terracotta",
      "Green"
    ],
    "inStock": true,
    "description": "10″ Archway Planters with Tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8024",
    "id": 8024,
    "name": "12″ Archway Planters with Tray | Set of 2",
    "price": 1424,
    "originalPrice": 2373,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "Bamboo",
      "Walnut"
    ],
    "inStock": true,
    "description": "12″ Archway Planters with Tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8025",
    "id": 8025,
    "name": "12″ Archway Planters with Tray | Set of 4",
    "price": 2121,
    "originalPrice": 3535,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "White",
      "Azure",
      "Green",
      "Terracotta"
    ],
    "inStock": true,
    "description": "12″ Archway Planters with Tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8026",
    "id": 8026,
    "name": "8″ Archway Planters with Tray | Set of 2",
    "price": 606,
    "originalPrice": 1010,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Innocent",
      "Coral",
      "Pink"
    ],
    "inStock": true,
    "description": "8″ Archway Planters with Tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8027",
    "id": 8027,
    "name": "8″ Archway Planters with Tray | Set of 4",
    "price": 901,
    "originalPrice": 1502,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Walnut",
      "Fern"
    ],
    "inStock": true,
    "description": "8″ Archway Planters with Tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8028",
    "id": 8028,
    "name": "Ace 5 inch Self Watering Pots | Set of 2",
    "price": 368,
    "originalPrice": 613,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Charcoal",
      "Fern"
    ],
    "inStock": true,
    "description": "Ace 5 inch Self Watering Pots | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8029",
    "id": 8029,
    "name": "Ace 5 inch Self Watering Pots | Set of 4",
    "price": 484,
    "originalPrice": 807,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Natural",
      "Celeste"
    ],
    "inStock": true,
    "description": "Ace 5 inch Self Watering Pots | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8030",
    "id": 8030,
    "name": "Ace 5 inch Self Watering Pots | Set of 6",
    "price": 674,
    "originalPrice": 1123,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "White"
    ],
    "inStock": true,
    "description": "Ace 5 inch Self Watering Pots | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8031",
    "id": 8031,
    "name": "Ace 7 inch Self Watering Pots | Set of 2",
    "price": 628,
    "originalPrice": 1047,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Fern",
      "Coral",
      "White"
    ],
    "inStock": true,
    "description": "Ace 7 inch Self Watering Pots | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8032",
    "id": 8032,
    "name": "Ace 7 inch Self Watering Pots | Set of 4",
    "price": 892,
    "originalPrice": 1487,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Coffee",
      "Fern",
      "Blue"
    ],
    "inStock": true,
    "description": "Ace 7 inch Self Watering Pots | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8033",
    "id": 8033,
    "name": "Ace 7 inch Self Watering Pots | Set of 6",
    "price": 1166,
    "originalPrice": 1943,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Pink",
      "Celeste",
      "Terracotta",
      "Coral"
    ],
    "inStock": true,
    "description": "Ace 7 inch Self Watering Pots | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8034",
    "id": 8034,
    "name": "Link 5.5 inch Small Pots | Set of 2",
    "price": 447,
    "originalPrice": 745,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "Celeste",
      "Azure"
    ],
    "inStock": true,
    "description": "Link 5.5 inch Small Pots | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8035",
    "id": 8035,
    "name": "Link 5.5 inch Small Pots | Set of 4",
    "price": 602,
    "originalPrice": 1003,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Fern",
      "Multi",
      "Azure",
      "Pink"
    ],
    "inStock": true,
    "description": "Link 5.5 inch Small Pots | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8036",
    "id": 8036,
    "name": "Link 5.5 inch Small Pots | Set of 6",
    "price": 879,
    "originalPrice": 1465,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Walnut"
    ],
    "inStock": true,
    "description": "Link 5.5 inch Small Pots | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8037",
    "id": 8037,
    "name": "Lush Hanging Pot 7 inch Self Watering Planters | Set of 4",
    "price": 1053,
    "originalPrice": 1867,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "White",
      "Green",
      "Azure",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Lush Hanging Pot 7 inch Self Watering Planters | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8038",
    "id": 8038,
    "name": "Planters Linea 5.5 Inch with trays | Set of 2",
    "price": 467,
    "originalPrice": 885,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Black"
    ],
    "inStock": true,
    "description": "Planters Linea 5.5 Inch with trays | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8039",
    "id": 8039,
    "name": "Planters Linea 5.5 Inch with trays | Set of 4",
    "price": 591,
    "originalPrice": 1048,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Planters Linea 5.5 Inch with trays | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8040",
    "id": 8040,
    "name": "Planters Linea 5.5 Inch with trays | Set of 6",
    "price": 751,
    "originalPrice": 1332,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Coral",
      "Coffee",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Planters Linea 5.5 Inch with trays | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8041",
    "id": 8041,
    "name": "Planters Linea 5.5 Inch with trays | Set of 8",
    "price": 925,
    "originalPrice": 1640,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "Coffee",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Planters Linea 5.5 Inch with trays | Set of 8 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8042",
    "id": 8042,
    "name": "Oreo 4 inch small pots | Set of 1",
    "price": 318,
    "originalPrice": 487,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Black",
      "Bamboo",
      "Charcoal",
      "Natural"
    ],
    "inStock": true,
    "description": "Oreo 4 inch small pots | Set of 1 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8043",
    "id": 8043,
    "name": "Oreo 4 inch small pots | Set of 2",
    "price": 467,
    "originalPrice": 780,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Black",
      "Azure"
    ],
    "inStock": true,
    "description": "Oreo 4 inch small pots | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8044",
    "id": 8044,
    "name": "Oreo 4 inch small pots | Set of 4",
    "price": 779,
    "originalPrice": 1302,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "Sand Castle",
      "Celeste",
      "Fern"
    ],
    "inStock": true,
    "description": "Oreo 4 inch small pots | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8045",
    "id": 8045,
    "name": "Planters Linea 7.5 Inch with trays | Set of 2",
    "price": 553,
    "originalPrice": 1000,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Innocent",
      "Walnut"
    ],
    "inStock": true,
    "description": "Planters Linea 7.5 Inch with trays | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8046",
    "id": 8046,
    "name": "Planters Linea 7.5 Inch with trays | Set of 4",
    "price": 873,
    "originalPrice": 1385,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Sand Castle",
      "Blue"
    ],
    "inStock": true,
    "description": "Planters Linea 7.5 Inch with trays | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8047",
    "id": 8047,
    "name": "Planters Linea 7.5 Inch with trays | Set of 6",
    "price": 1203,
    "originalPrice": 1999,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Fern",
      "Walnut"
    ],
    "inStock": true,
    "description": "Planters Linea 7.5 Inch with trays | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8048",
    "id": 8048,
    "name": "Deco Planters 7 Inch | Set of 2",
    "price": 705,
    "originalPrice": 584,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Deco Planters 7 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8049",
    "id": 8049,
    "name": "Deco Planters 9 Inch | Set of 2",
    "price": 1035,
    "originalPrice": 845,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Sand Castle",
      "Innocent"
    ],
    "inStock": true,
    "description": "Deco Planters 9 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8050",
    "id": 8050,
    "name": "Deco Wheeled Planters 12 Inch Self Watering | Set of 2",
    "price": 1860,
    "originalPrice": 1532,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "Coffee"
    ],
    "inStock": true,
    "description": "Deco Wheeled Planters 12 Inch Self Watering | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8051",
    "id": 8051,
    "name": "Deco Wheeled Planters 14 Inch Self Watering | Set of 2",
    "price": 2115,
    "originalPrice": 3128,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Sand Castle",
      "Fern"
    ],
    "inStock": true,
    "description": "Deco Wheeled Planters 14 Inch Self Watering | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8052",
    "id": 8052,
    "name": "Deco Self Watering Planters 7 Inch | Set of 4",
    "price": 1210,
    "originalPrice": 1080,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "White",
      "Bamboo",
      "Fern",
      "Natural"
    ],
    "inStock": true,
    "description": "Deco Self Watering Planters 7 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8053",
    "id": 8053,
    "name": "Deco Self Watering Planters 9 Inch | Set of 4",
    "price": 1715,
    "originalPrice": 1504,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Walnut",
      "Fern"
    ],
    "inStock": true,
    "description": "Deco Self Watering Planters 9 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8054",
    "id": 8054,
    "name": "Deco Wheeled Planters 12 Inch Self Watering | Set of 4",
    "price": 3100,
    "originalPrice": 2491,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Natural"
    ],
    "inStock": true,
    "description": "Deco Wheeled Planters 12 Inch Self Watering | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8055",
    "id": 8055,
    "name": "Deco Wheeled Planter 14 Inch Self Watering | Set of 4",
    "price": 3761,
    "originalPrice": 5352,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Sand Castle",
      "Innocent",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Deco Wheeled Planter 14 Inch Self Watering | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8056",
    "id": 8056,
    "name": "Planters Regalia 12 Inch with tray | Set of 2",
    "price": 610,
    "originalPrice": 1029,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Pink",
      "Innocent"
    ],
    "inStock": true,
    "description": "Planters Regalia 12 Inch with tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8057",
    "id": 8057,
    "name": "Planters Regalia 12 Inch with tray | Set of 4",
    "price": 986,
    "originalPrice": 873,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Pink",
      "Charcoal",
      "Innocent"
    ],
    "inStock": true,
    "description": "Planters Regalia 12 Inch with tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8058",
    "id": 8058,
    "name": "Planters Regalia 16 Inch with tray | Set of 2",
    "price": 1005,
    "originalPrice": 1939,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Planters Regalia 16 Inch with tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8059",
    "id": 8059,
    "name": "Planters Regalia 16 Inch with tray | Set of 4",
    "price": 1588,
    "originalPrice": 3111,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Planters Regalia 16 Inch with tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8060",
    "id": 8060,
    "name": "Planters Regalia 19 Inch with tray | Set of 2",
    "price": 1410,
    "originalPrice": 2347,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "Coffee",
      "Pink",
      "Fern"
    ],
    "inStock": true,
    "description": "Planters Regalia 19 Inch with tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8061",
    "id": 8061,
    "name": "Planters Regalia 19 Inch with tray | Set of 4",
    "price": 2331,
    "originalPrice": 3762,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "Celeste",
      "Bamboo",
      "Black"
    ],
    "inStock": true,
    "description": "Planters Regalia 19 Inch with tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8062",
    "id": 8062,
    "name": "Planters EcoPod 4 Inch | Set of 2",
    "price": 281,
    "originalPrice": 527,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Celeste",
      "Multi",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Planters EcoPod 4 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8063",
    "id": 8063,
    "name": "Planters EcoPod 4 Inch | Set of 4",
    "price": 400,
    "originalPrice": 825,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste",
      "Blue"
    ],
    "inStock": true,
    "description": "Planters EcoPod 4 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8064",
    "id": 8064,
    "name": "Planters EcoPod 4 Inch | Set of 6",
    "price": 624,
    "originalPrice": 1100,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Planters EcoPod 4 Inch | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8065",
    "id": 8065,
    "name": "Planters EcoBloom 4 Inch Self watering | Set of 2",
    "price": 400,
    "originalPrice": 709,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Pink",
      "Coral"
    ],
    "inStock": true,
    "description": "Planters EcoBloom 4 Inch Self watering | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8066",
    "id": 8066,
    "name": "Planters EcoBloom 4 Inch Self watering | Set of 4",
    "price": 678,
    "originalPrice": 568,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Fern"
    ],
    "inStock": true,
    "description": "Planters EcoBloom 4 Inch Self watering | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8067",
    "id": 8067,
    "name": "Planters EcoBloom 4 Inch Self watering | Set of 6",
    "price": 940,
    "originalPrice": 1399,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Coffee",
      "Green",
      "Pink"
    ],
    "inStock": true,
    "description": "Planters EcoBloom 4 Inch Self watering | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8068",
    "id": 8068,
    "name": "Planters EcoBloom 7 Inch Self watering | Set of 2",
    "price": 661,
    "originalPrice": 1173,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Walnut",
      "Terracotta",
      "Fern"
    ],
    "inStock": true,
    "description": "Planters EcoBloom 7 Inch Self watering | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8069",
    "id": 8069,
    "name": "Planters EcoBloom 7 Inch Self watering | Set of 4",
    "price": 1089,
    "originalPrice": 1048,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Sand Castle",
      "Black",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Planters EcoBloom 7 Inch Self watering | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8070",
    "id": 8070,
    "name": "Planters EcoBloom 7 Inch Self watering | Set of 6",
    "price": 1451,
    "originalPrice": 2574,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Pink",
      "Multi",
      "Sand Castle",
      "White"
    ],
    "inStock": true,
    "description": "Planters EcoBloom 7 Inch Self watering | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8071",
    "id": 8071,
    "name": "Eva 11.5 inch Self Watering Pots | Pack of 2",
    "price": 619,
    "originalPrice": 1097,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Blue",
      "Coffee",
      "Walnut",
      "Multi"
    ],
    "inStock": true,
    "description": "Eva 11.5 inch Self Watering Pots | Pack of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8072",
    "id": 8072,
    "name": "Eva 11.5 inch Self Watering Pots | Pack of 4",
    "price": 1143,
    "originalPrice": 2026,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Sand Castle",
      "Natural",
      "Fern",
      "Walnut"
    ],
    "inStock": true,
    "description": "Eva 11.5 inch Self Watering Pots | Pack of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8073",
    "id": 8073,
    "name": "Eva 11.5 inch Self Watering Pots | Pack of 6",
    "price": 1562,
    "originalPrice": 1542,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Sand Castle",
      "Pink"
    ],
    "inStock": true,
    "description": "Eva 11.5 inch Self Watering Pots | Pack of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8074",
    "id": 8074,
    "name": "Daisy Self Watering Planters 7 Inch | Set of 2",
    "price": 588,
    "originalPrice": 1019,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Multi",
      "Green",
      "White"
    ],
    "inStock": true,
    "description": "Daisy Self Watering Planters 7 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8075",
    "id": 8075,
    "name": "Daisy Self Watering Planters 7 Inch | Set of 4",
    "price": 1184,
    "originalPrice": 2366,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "Green"
    ],
    "inStock": true,
    "description": "Daisy Self Watering Planters 7 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8076",
    "id": 8076,
    "name": "Daisy Self Watering Planters 9 Inch | Set of 2",
    "price": 940,
    "originalPrice": 1259,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "Blue"
    ],
    "inStock": true,
    "description": "Daisy Self Watering Planters 9 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8077",
    "id": 8077,
    "name": "Daisy Self Watering Planters 9 Inch | Set of 4",
    "price": 1682,
    "originalPrice": 2366,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Blue",
      "White",
      "Multi",
      "Walnut"
    ],
    "inStock": true,
    "description": "Daisy Self Watering Planters 9 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8078",
    "id": 8078,
    "name": "Daisy Self Watering Wheeled Planters 12 Inch | Set of 2",
    "price": 1771,
    "originalPrice": 2269,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Innocent",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Daisy Self Watering Wheeled Planters 12 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8079",
    "id": 8079,
    "name": "Daisy Self Watering Wheeled Planters 12 Inch | Set of 4",
    "price": 3332,
    "originalPrice": 3243,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste",
      "Terracotta",
      "Multi"
    ],
    "inStock": true,
    "description": "Daisy Self Watering Wheeled Planters 12 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8080",
    "id": 8080,
    "name": "Daisy Self Watering Wheeled Planters 14 Inch | Set of 2",
    "price": 2591,
    "originalPrice": 4103,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Celeste"
    ],
    "inStock": true,
    "description": "Daisy Self Watering Wheeled Planters 14 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8081",
    "id": 8081,
    "name": "Daisy Self Watering Wheeled Planters 14 Inch | Set of 4",
    "price": 4184,
    "originalPrice": 7872,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Azure",
      "Coffee",
      "Multi"
    ],
    "inStock": false,
    "description": "Daisy Self Watering Wheeled Planters 14 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8082",
    "id": 8082,
    "name": "Planters NatureNest Round 12 Inch | Set of 2",
    "price": 1221,
    "originalPrice": 1221,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Walnut",
      "White"
    ],
    "inStock": false,
    "description": "Planters NatureNest Round 12 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8083",
    "id": 8083,
    "name": "Planters Nature nest Round 12 Inch | Set of 4",
    "price": 1976,
    "originalPrice": 1753,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Multi",
      "White"
    ],
    "inStock": false,
    "description": "Planters Nature nest Round 12 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8084",
    "id": 8084,
    "name": "Planters Nature nest Round 12 Inch | Set of 6",
    "price": 2547,
    "originalPrice": 2497,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste"
    ],
    "inStock": false,
    "description": "Planters Nature nest Round 12 Inch | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8085",
    "id": 8085,
    "name": "Planters DuoSling 11 inch Hanging | Set of 2",
    "price": 759,
    "originalPrice": 1347,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Azure",
      "Multi",
      "Blue"
    ],
    "inStock": true,
    "description": "Planters DuoSling 11 inch Hanging | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8086",
    "id": 8086,
    "name": "Planters DuoSling 11 inch Hanging | Set of 4",
    "price": 1386,
    "originalPrice": 2457,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Celeste"
    ],
    "inStock": true,
    "description": "Planters DuoSling 11 inch Hanging | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8087",
    "id": 8087,
    "name": "Planters DuoSling 11 inch Hanging | Set of 6",
    "price": 1981,
    "originalPrice": 3510,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Terracotta",
      "Azure"
    ],
    "inStock": true,
    "description": "Planters DuoSling 11 inch Hanging | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8088",
    "id": 8088,
    "name": "Planters Ecosling 10 Inch | Set of 4",
    "price": 1037,
    "originalPrice": 1839,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coffee",
      "Natural"
    ],
    "inStock": true,
    "description": "Planters Ecosling 10 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8089",
    "id": 8089,
    "name": "Planters Ecosling 10 Inch | Set of 8",
    "price": 1618,
    "originalPrice": 2868,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "White",
      "Fern"
    ],
    "inStock": true,
    "description": "Planters Ecosling 10 Inch | Set of 8 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8090",
    "id": 8090,
    "name": "Planters Aura 8 Inch | Set of 2",
    "price": 705,
    "originalPrice": 610,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Green"
    ],
    "inStock": true,
    "description": "Planters Aura 8 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8091",
    "id": 8091,
    "name": "Planters Aura 8 Inch | Set of 4",
    "price": 1170,
    "originalPrice": 1080,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Coral",
      "Sand Castle",
      "Innocent"
    ],
    "inStock": true,
    "description": "Planters Aura 8 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8092",
    "id": 8092,
    "name": "Planters Aura 10 Inch | Set of 2",
    "price": 1060,
    "originalPrice": 895,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Sand Castle",
      "Bamboo",
      "Natural",
      "Coral"
    ],
    "inStock": true,
    "description": "Planters Aura 10 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8093",
    "id": 8093,
    "name": "Planters Aura 10 Inch | Set of 4",
    "price": 1715,
    "originalPrice": 1504,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Terracotta",
      "Pink"
    ],
    "inStock": true,
    "description": "Planters Aura 10 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8094",
    "id": 8094,
    "name": "Planters Aura 12 Inch | Set of 2",
    "price": 1700,
    "originalPrice": 1532,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "Black",
      "Celeste"
    ],
    "inStock": true,
    "description": "Planters Aura 12 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8095",
    "id": 8095,
    "name": "Planters Aura 12 Inch | Set of 4",
    "price": 2825,
    "originalPrice": 2438,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Pink": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Pink",
      "Green"
    ],
    "inStock": true,
    "description": "Planters Aura 12 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8096",
    "id": 8096,
    "name": "Metal Sling 10 inch Self Watering Hanging Planters | Set of 4",
    "price": 930,
    "originalPrice": 1456,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "White",
      "Bamboo",
      "Pink"
    ],
    "inStock": true,
    "description": "Metal Sling 10 inch Self Watering Hanging Planters | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8097",
    "id": 8097,
    "name": "Metal Sling 10 inch Self Watering Hanging Planters | Set of 2",
    "price": 658,
    "originalPrice": 952,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Metal Sling 10 inch Self Watering Hanging Planters | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8098",
    "id": 8098,
    "name": "Metal Sling 10 inch Self Watering Hanging Planters | Set of 6",
    "price": 1309,
    "originalPrice": 1122,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Blue": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Blue",
      "Coffee",
      "Innocent",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Metal Sling 10 inch Self Watering Hanging Planters | Set of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "8099",
    "id": 8099,
    "name": "Petal Pot 7 inch | Pack of 2",
    "price": 498,
    "originalPrice": 884,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Green",
      "Coffee"
    ],
    "inStock": true,
    "description": "Petal Pot 7 inch | Pack of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80100",
    "id": 80100,
    "name": "Petal Pot 7 inch | Pack of 4",
    "price": 697,
    "originalPrice": 1236,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Petal Pot 7 inch | Pack of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80101",
    "id": 80101,
    "name": "Petal Pot 7 inch | Pack of 6",
    "price": 962,
    "originalPrice": 1706,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Green",
      "Walnut"
    ],
    "inStock": true,
    "description": "Petal Pot 7 inch | Pack of 6 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80102",
    "id": 80102,
    "name": "Planters BellaRound 10 Inch | Set of 2",
    "price": 974,
    "originalPrice": 2163,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Charcoal",
      "Walnut"
    ],
    "inStock": true,
    "description": "Planters BellaRound 10 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80103",
    "id": 80103,
    "name": "Planters BellaRound 12 Inch | Set of 2",
    "price": 1524,
    "originalPrice": 3503,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Azure",
      "Celeste",
      "Fern"
    ],
    "inStock": true,
    "description": "Planters BellaRound 12 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80104",
    "id": 80104,
    "name": "Planters BellaRound 14 Inch | Set of 2",
    "price": 2012,
    "originalPrice": 4516,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Multi",
      "Terracotta",
      "Coffee"
    ],
    "inStock": true,
    "description": "Planters BellaRound 14 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80105",
    "id": 80105,
    "name": "Planters BellaRound 10 Inch | Set of 4",
    "price": 1633,
    "originalPrice": 2850,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Black",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Planters BellaRound 10 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80106",
    "id": 80106,
    "name": "Planters BellaRound 12 Inch | Set of 4",
    "price": 2473,
    "originalPrice": 4447,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Black",
      "Fern",
      "Coffee",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Planters BellaRound 12 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80107",
    "id": 80107,
    "name": "Planters BellaRound 14 Inch | Set of 4",
    "price": 3321,
    "originalPrice": 5922,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Fern",
      "Walnut",
      "Coral"
    ],
    "inStock": true,
    "description": "Planters BellaRound 14 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80108",
    "id": 80108,
    "name": "Planters Bella Square 8 Inch | Set of 2",
    "price": 762,
    "originalPrice": 1255,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Multi",
      "Celeste"
    ],
    "inStock": true,
    "description": "Planters Bella Square 8 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80109",
    "id": 80109,
    "name": "Planters Bella Square 8 Inch | Set of 4",
    "price": 1359,
    "originalPrice": 2370,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Natural",
      "Fern",
      "Sand Castle",
      "White"
    ],
    "inStock": true,
    "description": "Planters Bella Square 8 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80110",
    "id": 80110,
    "name": "Planters Bella Square 10 Inch | Set of 2",
    "price": 997,
    "originalPrice": 1735,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "White",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Planters Bella Square 10 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80111",
    "id": 80111,
    "name": "Planters Bella Square 10 Inch | Set of 4",
    "price": 1681,
    "originalPrice": 2930,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Fern",
      "Azure",
      "Walnut"
    ],
    "inStock": true,
    "description": "Planters Bella Square 10 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80112",
    "id": 80112,
    "name": "Planters Bella Square 12 Inch | Set of 2",
    "price": 1819,
    "originalPrice": 3113,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Charcoal"
    ],
    "inStock": true,
    "description": "Planters Bella Square 12 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80113",
    "id": 80113,
    "name": "Planters Bella Square 12 Inch | Set of 4",
    "price": 3101,
    "originalPrice": 5488,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "White"
    ],
    "inStock": true,
    "description": "Planters Bella Square 12 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80114",
    "id": 80114,
    "name": "Planters Bella Square 14 Inch | Set of 2",
    "price": 2183,
    "originalPrice": 3808,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Walnut",
      "Celeste"
    ],
    "inStock": true,
    "description": "Planters Bella Square 14 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80115",
    "id": 80115,
    "name": "Planters Bella Square 14 Inch | Set of 4",
    "price": 3681,
    "originalPrice": 6503,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Green",
      "Charcoal",
      "Celeste"
    ],
    "inStock": true,
    "description": "Planters Bella Square 14 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80116",
    "id": 80116,
    "name": "Planters Leafy 8 Inch with tray | Set of 2",
    "price": 672,
    "originalPrice": 1120,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Celeste",
      "Innocent",
      "Multi"
    ],
    "inStock": true,
    "description": "Planters Leafy 8 Inch with tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80117",
    "id": 80117,
    "name": "Planters Leafy 8 Inch with tray | Set of 4",
    "price": 910,
    "originalPrice": 1515,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Green": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Green",
      "Azure"
    ],
    "inStock": true,
    "description": "Planters Leafy 8 Inch with tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80118",
    "id": 80118,
    "name": "Planters Leafy 10 Inch with tray | Set of 2",
    "price": 1060,
    "originalPrice": 1770,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Green",
      "Walnut",
      "Blue"
    ],
    "inStock": true,
    "description": "Planters Leafy 10 Inch with tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80119",
    "id": 80119,
    "name": "Planters Leafy 10 Inch with tray | Set of 4",
    "price": 1595,
    "originalPrice": 2655,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Coral": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Black",
      "Coral"
    ],
    "inStock": true,
    "description": "Planters Leafy 10 Inch with tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80120",
    "id": 80120,
    "name": "Planters Leafy 12 Inch with tray | Set of 2",
    "price": 1680,
    "originalPrice": 2800,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Charcoal",
      "White",
      "Celeste"
    ],
    "inStock": true,
    "description": "Planters Leafy 12 Inch with tray | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80121",
    "id": 80121,
    "name": "Planters Leafy 12 Inch with tray | Set of 4",
    "price": 2390,
    "originalPrice": 3980,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Celeste",
      "Azure",
      "White",
      "Multi"
    ],
    "inStock": true,
    "description": "Planters Leafy 12 Inch with tray | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80122",
    "id": 80122,
    "name": "Planters Verona 13 Inch Wheeled | Set of 2",
    "price": 2668,
    "originalPrice": 6733,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Sand Castle",
      "Azure",
      "White",
      "Fern"
    ],
    "inStock": true,
    "description": "Planters Verona 13 Inch Wheeled | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80123",
    "id": 80123,
    "name": "Planters Verona 13 Inch Wheeled | Set of 4",
    "price": 4590,
    "originalPrice": 12932,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Azure",
      "Coffee"
    ],
    "inStock": true,
    "description": "Planters Verona 13 Inch Wheeled | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80124",
    "id": 80124,
    "name": "Planters Verona 4 Inch | Set of 2",
    "price": 349,
    "originalPrice": 557,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Walnut",
      "Green"
    ],
    "inStock": true,
    "description": "Planters Verona 4 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80125",
    "id": 80125,
    "name": "Planters Verona 4 Inch | Set of 4",
    "price": 490,
    "originalPrice": 1002,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Sand Castle",
      "Celeste",
      "Natural"
    ],
    "inStock": true,
    "description": "Planters Verona 4 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80126",
    "id": 80126,
    "name": "Planters Verona 5 Inch | Set of 2",
    "price": 286,
    "originalPrice": 557,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "White",
      "Walnut",
      "Fern"
    ],
    "inStock": true,
    "description": "Planters Verona 5 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80127",
    "id": 80127,
    "name": "Planters Verona 5 Inch | Set of 4",
    "price": 846,
    "originalPrice": 1002,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Bamboo",
      "Green"
    ],
    "inStock": true,
    "description": "Planters Verona 5 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80128",
    "id": 80128,
    "name": "Planters Verona 9 Inch | Set of 4",
    "price": 2017,
    "originalPrice": 4722,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Walnut",
      "Azure"
    ],
    "inStock": true,
    "description": "Planters Verona 9 Inch | Set of 4 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80129",
    "id": 80129,
    "name": "Verona Planters 9 Inch | Set of 2",
    "price": 1149,
    "originalPrice": 2609,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Innocent",
      "Green"
    ],
    "inStock": true,
    "description": "Verona Planters 9 Inch | Set of 2 - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },
  {
    "_id": "80130",
    "id": 80130,
    "name": "Verdant Planter Pot",
    "price": 654,
    "originalPrice": 879,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Indoor Gardenware",
    "colors": [
      "Sand Castle",
      "Innocent",
      "Black",
      "Natural"
    ],
    "inStock": true,
    "description": "Verdant Planter Pot - Beautiful indoor planters to freshen up your home.",
    "faqs": []
  },

  // ==================== OUTDOOR LIVING (26 products) ====================
  {
    "_id": "500",
    "id": 500,
    "name": "Romano 7.5 inch Planters | Set of 2",
    "price": 839,
    "originalPrice": 1525,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Coral",
      "Walnut",
      "Bamboo"
    ],
    "inStock": true,
    "description": "Romano 7.5 inch Planters | Set of 2 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "501",
    "id": 501,
    "name": "Romano 7.5 inch Planters | Set of 4",
    "price": 1953,
    "originalPrice": 3551,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Black": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Black",
      "Blue"
    ],
    "inStock": true,
    "description": "Romano 7.5 inch Planters | Set of 4 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "502",
    "id": 502,
    "name": "Elanza Pot for Home | 15 inch | Pack of 1",
    "price": 3177,
    "originalPrice": 5776,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "White",
      "Coffee"
    ],
    "inStock": true,
    "description": "Elanza Pot for Home | 15 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "503",
    "id": 503,
    "name": "Elanza Pot for Home | 18 inch | Pack of 1",
    "price": 4357,
    "originalPrice": 7922,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coffee": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Coffee",
      "Fern",
      "Sand Castle",
      "Blue"
    ],
    "inStock": true,
    "description": "Elanza Pot for Home | 18 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "504",
    "id": 504,
    "name": "Premia Pot for Home | 24 inch | Pack of 1",
    "price": 3206,
    "originalPrice": 5829,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Celeste",
      "Sand Castle"
    ],
    "inStock": true,
    "description": "Premia Pot for Home | 24 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "505",
    "id": 505,
    "name": "Mansion Pot for Home | 17 inch | Pack of 1",
    "price": 2477,
    "originalPrice": 4504,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Multi",
      "Coffee",
      "Celeste"
    ],
    "inStock": true,
    "description": "Mansion Pot for Home | 17 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "506",
    "id": 506,
    "name": "Opera Pots for Home | 18 inch | Pack of 1",
    "price": 3090,
    "originalPrice": 5618,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Celeste",
      "White"
    ],
    "inStock": true,
    "description": "Opera Pots for Home | 18 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "507",
    "id": 507,
    "name": "Brindavan Tulsi Pots for Home | 17 inch| Pack of 1",
    "price": 3168,
    "originalPrice": 5760,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Charcoal": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ],
      "Green": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Charcoal",
      "Coffee",
      "Green",
      "Natural"
    ],
    "inStock": true,
    "description": "Brindavan Tulsi Pots for Home | 17 inch| Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "508",
    "id": 508,
    "name": "Plant Pot Set for Home | 20 inch & 8 inch, Pack of 2",
    "price": 3460,
    "originalPrice": 6291,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Coral",
      "White",
      "Multi"
    ],
    "inStock": true,
    "description": "Plant Pot Set for Home | 20 inch & 8 inch, Pack of 2 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "509",
    "id": 509,
    "name": "Deco Pots for Home | 18 inch | Pack of 1",
    "price": 4055,
    "originalPrice": 7373,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Walnut",
      "Multi",
      "Innocent"
    ],
    "inStock": true,
    "description": "Deco Pots for Home | 18 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5010",
    "id": 5010,
    "name": "Deco Pots for Home | 21 inch | Pack of 1",
    "price": 5756,
    "originalPrice": 10465,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Bamboo",
      "Natural"
    ],
    "inStock": true,
    "description": "Deco Pots for Home | 21 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5011",
    "id": 5011,
    "name": "Gallery Pots for Home | 12 inch | Pack of 1",
    "price": 1894,
    "originalPrice": 3444,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Celeste",
      "Walnut",
      "Multi",
      "Coffee"
    ],
    "inStock": true,
    "description": "Gallery Pots for Home | 12 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5012",
    "id": 5012,
    "name": "Gallery Pots for Home | 15 inch | Pack of 1",
    "price": 2748,
    "originalPrice": 4996,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Blue": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Innocent",
      "Black",
      "Blue"
    ],
    "inStock": true,
    "description": "Gallery Pots for Home | 15 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5013",
    "id": 5013,
    "name": "Gallery Pots for Home | 18 inch | Pack of 1",
    "price": 4539,
    "originalPrice": 8253,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Multi": [
        "",
        "",
        ""
      ],
      "Walnut": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Multi",
      "Walnut",
      "Bamboo",
      "Innocent"
    ],
    "inStock": true,
    "description": "Gallery Pots for Home | 18 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5014",
    "id": 5014,
    "name": "Portico Pots for Home | 12 inch | Pack of 1",
    "price": 1984,
    "originalPrice": 3607,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Innocent",
      "Pink"
    ],
    "inStock": true,
    "description": "Portico Pots for Home | 12 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5015",
    "id": 5015,
    "name": "Portico Pots for Home | 15 inch | Pack of 1",
    "price": 3100,
    "originalPrice": 5636,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "White": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Sand Castle",
      "White",
      "Black",
      "Multi"
    ],
    "inStock": true,
    "description": "Portico Pots for Home | 15 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5016",
    "id": 5016,
    "name": "Portico Pots for Home | 18 inch | Pack of 1",
    "price": 4586,
    "originalPrice": 8338,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Sand Castle",
      "Coffee"
    ],
    "inStock": true,
    "description": "Portico Pots for Home | 18 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5017",
    "id": 5017,
    "name": "RotoBloom Pot for Home | 15 inch | Pack of 1",
    "price": 3177,
    "originalPrice": 5776,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Azure",
      "Fern"
    ],
    "inStock": true,
    "description": "RotoBloom Pot for Home | 15 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5018",
    "id": 5018,
    "name": "RotoBloom Pot for Home | 18 inch | Pack of 1",
    "price": 4539,
    "originalPrice": 8253,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "White": [
        "",
        "",
        ""
      ],
      "Pink": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Black": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "White",
      "Pink",
      "Innocent",
      "Black"
    ],
    "inStock": true,
    "description": "RotoBloom Pot for Home | 18 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5019",
    "id": 5019,
    "name": "Tulasi Pots for Home | 21 inch | Pack of 1",
    "price": 2996,
    "originalPrice": 6109,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Coral": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Coral",
      "Natural"
    ],
    "inStock": true,
    "description": "Tulasi Pots for Home | 21 inch | Pack of 1 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5020",
    "id": 5020,
    "name": "Oreo 4 inch Small pots for Indoor Plants with 1 Growmix | Pack of 2",
    "price": 525,
    "originalPrice": 955,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Fern": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Fern",
      "Innocent",
      "Coffee"
    ],
    "inStock": true,
    "description": "Oreo 4 inch Small pots for Indoor Plants with 1 Growmix | Pack of 2 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5021",
    "id": 5021,
    "name": "Ecopod 4 inch Small pots for Indoor Plants with 1 Growmix | Pack of 2",
    "price": 328,
    "originalPrice": 596,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Bamboo": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Innocent": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Azure",
      "Bamboo",
      "Fern",
      "Innocent"
    ],
    "inStock": true,
    "description": "Ecopod 4 inch Small pots for Indoor Plants with 1 Growmix | Pack of 2 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5022",
    "id": 5022,
    "name": "Ecopod 4 inch Small pots for Indoor Plants with 2 Growmix | Pack of 4",
    "price": 508,
    "originalPrice": 924,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Walnut": [
        "",
        "",
        ""
      ],
      "Fern": [
        "",
        "",
        ""
      ],
      "Multi": [
        "",
        "",
        ""
      ],
      "Terracotta": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Walnut",
      "Fern",
      "Multi",
      "Terracotta"
    ],
    "inStock": true,
    "description": "Ecopod 4 inch Small pots for Indoor Plants with 2 Growmix | Pack of 4 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5023",
    "id": 5023,
    "name": "Growlite 13 inch Pots for Plants with Tray | Pack of 2",
    "price": 920,
    "originalPrice": 1673,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Azure": [
        "",
        "",
        ""
      ],
      "Natural": [
        "",
        "",
        ""
      ],
      "Celeste": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Azure",
      "Natural",
      "Celeste"
    ],
    "inStock": true,
    "description": "Growlite 13 inch Pots for Plants with Tray | Pack of 2 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5024",
    "id": 5024,
    "name": "Growlite 13 inch Pots for Plants with Tray | Pack of 3",
    "price": 1081,
    "originalPrice": 1965,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Celeste": [
        "",
        "",
        ""
      ],
      "Sand Castle": [
        "",
        "",
        ""
      ],
      "Azure": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Celeste",
      "Sand Castle",
      "Azure"
    ],
    "inStock": true,
    "description": "Growlite 13 inch Pots for Plants with Tray | Pack of 3 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "5025",
    "id": 5025,
    "name": "Growlite 13 inch Pots for Plants with Tray | Pack of 4",
    "price": 1327,
    "originalPrice": 2413,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Innocent": [
        "",
        "",
        ""
      ],
      "Coffee": [
        "",
        "",
        ""
      ]
    },
    "category": "Outdoor Living",
    "colors": [
      "Innocent",
      "Coffee"
    ],
    "inStock": true,
    "description": "Growlite 13 inch Pots for Plants with Tray | Pack of 4 - Premium quality pots to enhance your living space.",
    "faqs": []
  },
  {
    "_id": "9001",
    "id": 9001,
    "name": "Bathroom Accessories For Home | Pack of 3",
    "price": 674,
    "originalPrice": 1225,
    "primaryImage": "",
    "hoverImage": "",
    "images": {
      "Natural": ["", "", ""],
      "Charcoal": ["", "", ""]
    },
    "category": "Storage",
    "colors": ["Natural", "Charcoal"],
    "inStock": true,
    "description": "Complete your bathroom organization with this eco-friendly Bathroom Accessories set.",
    "faqs": []
  }
];

export const getProductsByCategory = (categoryId) => PRODUCTS.filter(p => p.category === categoryId);
export const getAllCategories = () => CATEGORIES;
export const getCategoryById = (categoryId) => CATEGORIES.find(c => c.id === categoryId);
export const getProductById = (productId) => PRODUCTS.find(p => p._id === productId || p.id === parseInt(productId));
export const getAllProducts = () => [...PRODUCTS];
export const getProductsByBrand = (brand) => PRODUCTS.filter(p => p.brand === brand);
export const getInStockProducts = () => PRODUCTS.filter(p => p.inStock);
export const getOutOfStockProducts = () => PRODUCTS.filter(p => !p.inStock);
export const getProductsOnSale = () => PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price);

export const CATEGORY_INFO = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = {
    name: cat.name,
    title: cat.name,
    description: cat.description,
    image: cat.image,
  };
  return acc;
}, {});