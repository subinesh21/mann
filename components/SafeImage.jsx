'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';

export default function SafeImage({ 
  src, 
  alt, 
  className = "", 
  skeletonClassName = "",
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  objectFit = "cover",
  fallbackText = ""
}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasImage = src && src.trim() !== "" && !error;

  if (!hasImage) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-[#f0f2f5] animate-pulse overflow-hidden px-4 ${skeletonClassName}`}>
        <div className="relative mb-2">
          <ImageIcon className="w-6 h-6 text-gray-300" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
        {fallbackText && (
          <span className="text-[10px] text-gray-400 font-medium text-center line-clamp-2 uppercase tracking-tight opacity-70">
            {fallbackText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={fill ? { width: '100%', height: '100%' } : { width, height }}>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f0f2f5] animate-pulse">
          <ImageIcon className="w-6 h-6 text-gray-300" />
        </div>
      )}
      <Image
        src={src}
        alt={alt || "Image"}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit }}
        onLoadingComplete={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
}
