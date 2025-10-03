import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Dark Maroon - for navigation bars, headers, prominent panels
        "primary-maroon": "#4A1232",
        
        // Light Peach Background - main page background
        "bg-peach": "#FCE8D9",
        
        // Warm Red Accent - primary actions, buttons, badges, icons
        "accent-red": "#E85D5D",
        "accent-red-hover": "#D64C4C",
        
        // Soft Rose Highlight - top header bar, input backgrounds
        "highlight-rose": "#F3D1C4",
        
        // Off-White / Cream - card backgrounds, subtle panels
        "off-white": "#FFF9F5",
        
        // Gradient colors - for CTA bands and deep panels
        "gradient-start": "#47203B",
        "gradient-end": "#7A344E",
        
        // Dark Text - headings and body copy
        "text-dark": "#301020",
      },
      backgroundImage: {
        "gradient-cta": "linear-gradient(to bottom, #47203B, #7A344E)",
        "gradient-cta-horizontal": "linear-gradient(to right, #47203B, #7A344E)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
