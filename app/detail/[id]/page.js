// app/products/detail/[id]/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Minus, Plus, X, MessageSquare, Trash2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FAQAccordion from '@/components/FAQAccordion';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema-markup';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { toast } from 'react-toastify';
import SafeImage from '@/components/SafeImage';
import { CATEGORY_INFO } from '@/lib/product-data';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [hasUserSelectedColor, setHasUserSelectedColor] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Review states
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ reviewerName: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    if (reviews.length === 0) return;
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    if (reviews.length === 0) return;
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };


  const { addToCart } = useCart();



  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  useEffect(() => {
    if (productId) {
      setHasUserSelectedColor(false);
      fetchProductDetails();
    }
  }, [productId]);

  // Update images when color changes
  useEffect(() => {
    if (product && selectedColor) {
      const colorImages = product.images?.[selectedColor];
      if (colorImages && colorImages.length > 0) {
        setProductImages(colorImages.filter(Boolean));
        setSelectedImage(0);
      } else {
        // Fallback to primary image only if no color images exist at all
        setProductImages([product.primaryImage].filter(Boolean));
        setSelectedImage(0);
      }
    }
  }, [product, selectedColor]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching product details for ID:', productId);

      // Fetch from MongoDB API
      const response = await fetch(`/api/products?id=${productId}`);
      const data = await response.json();
      console.log('API Response:', data);

      if (data.success && data.products.length > 0) {
        const foundProduct = data.products[0];
        console.log('Found product:', foundProduct);
        setProduct(foundProduct);

        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      } else {
        console.log('Product not found in database');
        toast.error('Product not found');
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error loading product details');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating || 0);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // Handle carousel index safety
  useEffect(() => {
    if (reviews.length === 0) {
      setCurrentReviewIndex(0);
    } else if (currentReviewIndex >= reviews.length) {
      setCurrentReviewIndex(Math.max(0, reviews.length - 1));
    }
  }, [reviews.length, currentReviewIndex]);

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.reviewerName.trim() || !reviewForm.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          reviewerName: reviewForm.reviewerName,
          rating: reviewForm.rating,
          comment: reviewForm.comment
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Review submitted successfully!');
        setShowReviewModal(false);
        setReviewForm({ reviewerName: '', rating: 5, comment: '' });
        fetchReviews();
        fetchProductDetails();
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews?reviewId=${reviewId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Review deleted');
        fetchReviews();
        fetchProductDetails();
      } else {
        toast.error(data.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Error deleting review');
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      _id: product._id || product.id,
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.primaryImage || product.image,
    }, quantity, selectedColor);
  };

  const getColorCode = (colorName) => {
    const colors = {
      Azure: '#007FFF',
      Celeste: '#B2FFFF',
      Charcoal: '#36454F',
      Coffee: '#6F4E37',
      Coral: '#FF7F50',
      Fern: '#4F7942',
      Innocent: '#f8f8d1ff',
      'Sand Castle': '#D8C59F',
      Pink: '#FFC0CB',
      Blue: '#4169E1',
      Green: '#228B22',
      White: '#FFFFFF',
      Black: '#000000',
      Natural: '#A67B5B',
      Walnut: '#5C4033',
      Bamboo: '#906F5D',
      'Natural Wood': '#8B5A2B',
      Terracotta: '#E2725B',
      Multi: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
    };
    return colors[colorName] || '#CCCCCC';
  };

  // Get text color based on background color (for better contrast)
  const getTextColorForBackground = (bgColor) => {
    // For light colors, return dark text; for dark colors, return light text
    const lightColors = ['#B2FFFF', '#F5F5DC', '#D8C59F', '#EFDECD', '#FFC0CB', '#FFFFFF', '#FFFDD0'];
    if (lightColors.includes(bgColor)) {
      return '#131212'; // dark text for light backgrounds
    }
    return '#FFFFFF'; // white text for dark backgrounds
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-[#52dd28ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex items-center justify-center min-h-screen">
          <div className="text-center px-4">
            <h1 className="text-xl font-heading font-semibold text-[#131212] mb-2">
              Product not found
            </h1>
            <p className="text-sm text-[#6b6b6b] mb-4">
              The product you are looking for does not exist.
            </p>
            <Link
              href="/shop"
              className="inline-block px-4 py-2 bg-[#52dd28ff] text-white text-sm hover:bg-[#6b6b6b] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />

      {/* Structured Data - valid in App Router client component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(product))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(`/detail/${productId}`))
        }}
      />

      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>

        {/* Breadcrumb */}
        <div className="px-3 sm:px-4 lg:px-8 py-3 text-[10px] sm:text-xs font-medium tracking-wide text-[#52dd28ff] flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Link href="/" className="hover:text-green-600 transition-colors">
            HOME
          </Link>
          <span>&gt;</span>
          <Link href="/shop" className="hover:text-green-600 transition-colors">
            SHOP
          </Link>
          <span>&gt;</span>
          <span className="text-[#52dd28ff] truncate max-w-[120px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 pb-12">
          <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10">
            {/* Image Gallery */}
            <div className="w-full lg:max-w-[450px]">
              <div className="relative w-full aspect-square overflow-hidden bg-[#f5f7fa] mb-2 sm:mb-3 lg:mb-4">
                <SafeImage
                  src={productImages[selectedImage] || product.primaryImage || product.image}
                  alt={`${product.name} - ${selectedColor} - View ${selectedImage + 1}`}
                  fill={true}
                  sizes="(max-width: 1024px) 100vw, 450px"
                  priority={true}
                  className="object-cover"
                  fallbackText={product.name}
                />
              </div>

              {/* Thumbnail Images - Exactly 3 boxes */}
              {productImages.length > 0 && (
                <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3 mb-4">
                  {productImages.map((img, idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-square overflow-hidden border-2 transition-colors ${selectedImage === idx ? 'border-[#52dd28ff]' : 'border-transparent hover:border-[#ebebeb]'
                          }`}
                      >
                        <SafeImage
                          src={img}
                          alt={`${product.name} - ${selectedColor} - Thumbnail ${idx}`}
                          fill={true}
                          sizes="(max-width: 1024px) 33vw, 150px"
                          className="object-cover"
                          fallbackText={idx + 1}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
              {/* Review Carousel - Moved below thumbnails */}
              <div className="mt-8 border-t border-[#ebebeb] pt-6 pr-4 hidden lg:block">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#131212] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#52dd28ff]" />
                    Reviews ({reviews.length})
                  </h3>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="text-[11px] font-bold text-[#52dd28ff] hover:underline"
                  >
                    Write a review
                  </button>
                </div>

                {reviews.length === 0 ? (
                  <div className="bg-[#f5f7fa] p-6 rounded-box text-center">
                    <p className="text-xs text-[#6b6b6b]">Be the first to review!</p>
                  </div>
                ) : (
                  <div className="relative group/carousel">
                    <div className="bg-[#f5f7fa] p-4 rounded-box min-h-[120px] transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-[#52dd28ff] rounded-full flex items-center justify-center text-white font-semibold text-[10px]">
                            {reviews[currentReviewIndex].reviewerName?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#131212] line-clamp-1">{reviews[currentReviewIndex].reviewerName}</p>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-2 h-2 ${i < reviews[currentReviewIndex].rating ? 'fill-[#52dd28ff] text-[#52dd28ff]' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(reviews[currentReviewIndex]._id)}
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#6b6b6b] leading-relaxed italic line-clamp-4">
                        "{reviews[currentReviewIndex].comment}"
                      </p>
                    </div>

                    {/* Nav arrows only if more than 1 review */}
                    {reviews.length > 1 && (
                      <>
                        <button
                          onClick={prevReview}
                          className="absolute left-[-15px] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1.5 z-10 hover:text-[#52dd28ff] transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextReview}
                          className="absolute right-[-15px] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1.5 z-10 hover:text-[#52dd28ff] transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div 
              className="flex-1 max-w-[500px] p-4 sm:p-6 lg:p-8 rounded-box bg-cover bg-center shadow-sm border border-gray-100"
              style={{ backgroundImage: "url('/paper.jpg')" }}
            >
              {/* Price bar */}
              <div className="w-8 sm:w-10 lg:w-12 h-[2px] sm:h-[3px] bg-[#52dd28ff] mb-3 sm:mb-4" />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#131212] mb-2 lg:mb-3" style={{ fontFamily: 'var(--font-cinzel), serif', letterSpacing: '1px' }}>
                {product.name}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#52dd28ff] mb-1">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-xs sm:text-sm text-[#6b6b6b] line-through mb-2">
                  {formatPrice(product.originalPrice)}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(averageRating || product.rating || 0)
                        ? 'fill-[#52dd28ff] text-[#52dd28ff]'
                        : i < Math.ceil(averageRating || product.rating || 0)
                          ? 'fill-[#52dd28ff]/50 text-[#52dd28ff]'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="ml-1 sm:ml-2 text-[10px] sm:text-sm font-semibold text-[#52dd28ff]">
                    {averageRating > 0 ? averageRating : (product.rating || 0)}/5
                  </span>
                  <span className="ml-1 text-[10px] sm:text-sm text-[#6b6b6b]">
                    ({reviews.length || product.reviews || 0} reviews)
                  </span>
                </div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="text-[10px] sm:text-sm text-[#6b6b6b] hover:text-[#52dd28ff] underline"
                >
                  Write a review
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                <span
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: product.inStock ? '#22c55e' : '#ef4444' }}
                />
                <span className="text-xs sm:text-sm text-[#6b6b6b]">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="font-mono text-xs sm:text-sm text-[#6b6b6b] leading-relaxed mb-6 sm:mb-8">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-medium text-[#131212] mb-2 sm:mb-3">
                    Color:
                    <span
                      className="ml-1.5 font-bold capitalize"
                      style={{
                        color: ['#FFFFFF', '#F5F5DC', '#FFFDD0'].includes(getColorCode(selectedColor))
                          ? '#131212'
                          : getColorCode(selectedColor),
                        ...(getColorCode(selectedColor)?.includes('gradient') ? {
                          background: getColorCode(selectedColor),
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        } : {})
                      }}
                    >
                      {selectedColor}
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          setHasUserSelectedColor(true);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 transition-all ${selectedColor === color
                          ? 'border-[#131212] ring-2 ring-[#52dd28ff] scale-110'
                          : 'border-gray-300 hover:scale-110'
                          }`}
                        style={{
                          backgroundColor: getColorCode(color),
                          color: getTextColorForBackground(getColorCode(color))
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Qty Selector & Category */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm font-medium text-[#131212]">Qty</span>
                  <div className="flex items-center border border-[#ebebeb]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 sm:p-2 hover:bg-[#f5f7fa] transition-colors"
                      disabled={!product.inStock}
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-[#6b6b6b]" />
                    </button>
                    <span className="w-8 sm:w-12 text-center text-xs sm:text-sm font-medium text-[#131212]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 sm:p-2 hover:bg-[#f5f7fa] transition-colors"
                      disabled={!product.inStock}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-[#6b6b6b]" />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-6 bg-[#ebebeb]"></div>

                <div className="text-xs sm:text-sm flex items-center">
                  <span className="font-medium text-[#131212]">Category:</span>
                  <span className="text-[#6b6b6b] ml-1 sm:ml-2 capitalize">{product.category}</span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="premium-cart-button"
                >
                  <span className="button__text">
                    {product.inStock ? 'Add to cart' : 'Out of Stock'}
                  </span>
                  <span className="button__icon">
                    <ShoppingCart className="w-5 h-5" />
                  </span>
                </button>
              </div>



              {/* FAQ Section */}
              <FAQAccordion faqs={product.faqs} />
            </div>
          </div>

          {/* Reviews List - Visible on small screens, hidden on large (where carousel is active) */}
          <div className="mt-6 sm:mt-12 border-t border-[#ebebeb] pt-5 lg:hidden">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-[#131212] flex items-center gap-1.5 sm:gap-2">
                <MessageSquare className="w-4 h-4 sm:w-10 sm:h-10 text-[#52dd28ff]" />
                Customer Reviews ({reviews.length})
              </h2>
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#52dd28ff] text-white text-[10px] sm:text-sm font-semibold hover:bg-[#6b6b6b] transition-colors rounded-box"
              >
                Write a review
              </button>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8 bg-[#f5f7fa] rounded-box">
                <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-[#6b6b6b] mb-3">No reviews yet. Be the first to review this product!</p>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="text-sm text-[#52dd28ff] hover:text-[#6b6b6b] underline font-medium"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {reviews.map((review, index) => (
                  <div key={review._id || index} className="border border-[#ebebeb] rounded-box p-3 sm:p-5">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#52dd28ff] rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                          {review.reviewerName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-[#131212] line-clamp-1">{review.reviewerName}</p>
                          <p className="text-[9px] sm:text-[10px] text-[#6b6b6b]">
                            {new Date(review.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < review.rating ? 'fill-[#52dd28ff] text-[#52dd28ff]' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-sm text-[#6b6b6b] leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
        <ScrollToTop visible={showScrollTop} />
      </div>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50" onClick={() => setShowReviewModal(false)}>
          <div
            className="bg-white rounded-box w-full max-w-md p-5 sm:p-6 relative bg-cover bg-center"
            style={{ backgroundImage: "url('/paper.jpg')" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-cinzel text-[#131212] mb-1">Write a Review</h3>
            <p className="text-xs text-[#6b6b6b] mb-5">for {product.name}</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-[#131212] mb-1">Your Name</label>
                <input
                  type="text"
                  value={reviewForm.reviewerName}
                  onChange={(e) => setReviewForm({ ...reviewForm, reviewerName: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-[#ebebeb] text-sm focus:outline-none focus:border-[#52dd28ff] rounded-box"
                  required
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-mono text-[#131212] mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${star <= reviewForm.rating
                          ? 'fill-[#ffbb00] text-[#ffbb00]'
                          : 'text-gray-300 hover:text-[#ffbb00]'
                          }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-[#6b6b6b]">{reviewForm.rating}/5</span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-mono text-[#131212] mb-1">Your Review</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  className="w-full px-3 py-2 border border-[#ebebeb] text-sm focus:outline-none focus:border-[#52dd28ff] rounded-box resize-none"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submittingReview}
                className="w-full py-2.5 bg-[#52dd28ff] text-white text-sm font-semibold hover:bg-[#6b6b6b] transition-colors disabled:opacity-50 rounded-box"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}