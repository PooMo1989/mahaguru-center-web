"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const icons = [
  "/dhamma-expl-svg01.svg",
  "/dhamma-expl-svg02.svg",
  "/dhamma-expl-svg03.svg",
];

export function AnimatedSVGIcon() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Wait for fade out, then change icon and fade in
      setTimeout(() => {
        setCurrentIconIndex((prev) => (prev + 1) % icons.length);
        setIsVisible(true);
      }, 500); // Half second for fade out
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={icons[currentIconIndex]!}
          alt="Dhamma Explanation Icon"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}
