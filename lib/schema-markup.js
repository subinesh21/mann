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