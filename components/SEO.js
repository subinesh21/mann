import Head from 'next/head';
import { usePathname } from 'next/navigation';

export default function SEO({
  title = 'Thulira - Sustainable Eco-Friendly Products',
  description = 'Discover sustainable, eco-friendly products for a greener lifestyle. Shop drinkware, tableware, storage solutions, and more from our curated collection.',
  image = '/images/hero-slide-1.jpg',
  url,
  type = 'website',
  keywords = 'sustainable products, eco-friendly, green living, bamboo products, reusable items, zero waste, environmentally conscious'
}) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thulira.com';
  const fullUrl = url || `${baseUrl}${pathname}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Thulira" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:site_name" content="Thulira" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${baseUrl}${image}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Thulira",
          "url": baseUrl,
          "logo": `${baseUrl}/images/logo.png`,
          "sameAs": [
            "https://www.facebook.com/thulira",
            "https://www.instagram.com/thulira",
            "https://twitter.com/thulira"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-XXX-XXX-XXXX",
            "contactType": "customer service"
          }
        })
      }} />
    </Head>
  );
}