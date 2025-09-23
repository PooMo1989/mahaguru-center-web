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
  fallbackIcon = "No image",
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-200`}
      >
        <span className="text-xs text-gray-500">{fallbackIcon}</span>
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
