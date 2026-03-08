'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const VIDEOS = [
  "/video/cup-video-1.mp4",
  "/video/cup-video-2.mp4",
  "/video/cup-video-3.mp4",
];

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const scrollToGrid = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-56px)] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <AnimatePresence>
          <motion.video
            key={currentVideoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={VIDEOS[currentVideoIndex]} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.25, 0.4, 0.2, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-[#52dd28ff] font-semibold tracking-[0.3em] uppercase text-xs md:text-sm mb-8 block drop-shadow-md"
          >
            Welcome to Thulira
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] drop-shadow-lg" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
            Elevate Your Everyday <br className="hidden md:block"/> With Sustainability
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow">
            Discover our premium collection of eco-friendly products curated for a mindful, beautiful lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/products" 
              className="bg-[#52dd28ff] text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-[#45b922] transition-colors duration-300 shadow-[0_10px_30px_rgba(82,221,40,0.3)] hover:shadow-[0_15px_35px_rgba(82,221,40,0.4)] hover:-translate-y-1 transform"
            >
              Shop Collection
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 cursor-pointer"
        onClick={scrollToGrid}
      >
        <span className="text-white/70 font-medium text-[10px] tracking-[0.3em] uppercase drop-shadow">Scroll to Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/70 to-transparent" />
      </motion.div>
    </section>
  );
}
