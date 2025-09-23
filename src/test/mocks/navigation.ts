import React from "react";

// Type definitions for better type safety
interface NavigationMock {
  Navigation: React.ComponentType;
  Footer: React.ComponentType;
}

interface MockLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  "data-testid"?: string;
  [key: string]: unknown;
}

interface MockImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  "data-testid"?: string;
  [key: string]: unknown;
}

/**
 * Standardized mock for Navigation component that includes both Navigation and Footer
 * This prevents the common "No Footer export defined" error in tests
 */
export const mockNavigation = (): NavigationMock => ({
  Navigation: () =>
    React.createElement(
      "nav",
      { "data-testid": "navigation" },
      "Mock Navigation",
    ),
  Footer: () =>
    React.createElement("footer", { "data-testid": "footer" }, "Mock Footer"),
});

/**
 * Mock for Next.js Link component with proper type safety
 */
export const MockLink: React.FC<MockLinkProps> = ({
  children,
  href,
  ...props
}) => React.createElement("a", { href, ...props }, children);

/**
 * Mock for Next.js Image component with proper type safety
 */
export const MockImage: React.FC<MockImageProps> = ({ src, alt, ...props }) =>
  React.createElement("img", { src, alt, ...props });
