import { NextRequest, NextResponse } from 'next/server';

// Static routes that should be included in sitemap
const STATIC_ROUTES = [
  '/',
  '/shop',
  '/products',
  '/blogs',
  '/cart',
  '/checkout'
];

// Categories for product pages
const CATEGORIES = [
  'drinkware',
  'tableware', 
  'storage',
  'kitchenware',
  'homeware',
  'bakeware',
  'gardenware',
  'gifting'
];

export async function GET(request: NextRequest) {
  try {
    // Fetch products from API
    const productsResponse = await fetch(`${request.nextUrl.origin}/api/products`);
    const productsData = await productsResponse.json();
    const products = productsData.success ? productsData.products : [];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  ${STATIC_ROUTES.map(route => `
  <url>
    <loc>${request.nextUrl.origin}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  
  <!-- Category Pages -->
  ${CATEGORIES.map(category => `
  <url>
    <loc>${request.nextUrl.origin}/shop?category=${category}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- Product Detail Pages -->
  ${products.map((product: any) => `
  <url>
    <loc>${request.nextUrl.origin}/detail/${product._id}</loc>
    <lastmod>${new Date(product.updatedAt || product.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  
  <!-- Blog Posts (if any) -->
  <url>
    <loc>${request.nextUrl.origin}/blogs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Return minimal sitemap if there's an error
    const minimalSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${request.nextUrl.origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${request.nextUrl.origin}/shop</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    return new NextResponse(minimalSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

// Add dynamic route config for ISR
export const dynamic = 'force-dynamic';