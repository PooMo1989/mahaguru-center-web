"use client";

import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
  fallbackIcon?: string;
}

export function SafeImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  fallbackIcon = "No image" 
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500 text-xs">{fallbackIcon}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => setImageError(true)}
    />
  );
}
