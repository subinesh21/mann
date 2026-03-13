export function generateProductSchema(product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [
      product.primaryImage,
      ...(product.hoverImage ? [product.hoverImage] : []),
      ...(product.images ? Object.values(product.images).flat() : [])
    ],
    "description": product.description,
    "sku": product._id,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Thulira"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://thulira.com/detail/${product._id}`,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Thulira"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.5,
      "reviewCount": product.reviews || 0
    },
    "category": product.category,
    "color": product.colors ? product.colors.join(", ") : undefined
  };
}

export function generateBreadcrumbSchema(path) {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://thulira.com/"
    }
  ];

  // Add intermediate breadcrumbs based on path
  if (path.includes('/shop')) {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Shop",
      "item": "https://thulira.com/shop"
    });
  }

  if (path.includes('/detail/')) {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": breadcrumbs.length + 1,
      "name": "Product",
      "item": `https://thulira.com${path}`
    });
  }

  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
}

export function generateHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://thulira.com/#website",
        "url": "https://thulira.com/",
        "name": "Thulira | Biodegradable Products Chennai",
        "description": "Premium biodegradable store in Chennai for sustainable kitchenware, homeuse items, and garden supplies.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://thulira.com/products?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Shop Latest Collection",
            "url": "https://thulira.com/shop"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "All Products",
            "url": "https://thulira.com/products"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Coffee & Tea Essentials",
            "url": "https://thulira.com/shop#Coffee%20&%20Tea"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Dining & Tableware",
            "url": "https://thulira.com/shop#Dining%20Essentials"
          }
        ]
      }
    ]
  };
}