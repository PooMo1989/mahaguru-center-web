import { vi } from "vitest";

export * from "./navigation";
export * from "./trpc";
export * from "./next";

import { mockNavigation, MockLink, MockImage } from "./navigation";
import { createMockTRPCApi } from "./trpc";
import { mockNextNavigation } from "./next";

/**
 * Centralized mock configurations for common test scenarios
 */
export const commonMocks = {
  /**
   * Mocks the navigation component with both Navigation and Footer
   */
  navigation: () => vi.mock("~/components/navigation", () => mockNavigation()),

  /**
   * Mocks Next.js Link component
   */
  nextLink: () => vi.mock("next/link", () => ({ default: MockLink })),

  /**
   * Mocks Next.js Image component
   */
  nextImage: () => vi.mock("next/image", () => ({ default: MockImage })),

  /**
   * Mocks Next.js navigation hooks
   */
  nextNavigation: (searchParams = {}, pathname = "/") =>
    vi.mock("next/navigation", () =>
      mockNextNavigation(searchParams, pathname),
    ),

  /**
   * Mocks tRPC api with default implementations
   */
  tRPCApi: (overrides = {}) =>
    vi.mock("~/trpc/react", () => ({ api: createMockTRPCApi(overrides) })),

  /**
   * Applies all common UI mocks at once
   */
  allUI: () => {
    commonMocks.navigation();
    commonMocks.nextLink();
    commonMocks.nextImage();
  },

  /**
   * Applies all common mocks for pages with tRPC
   */
  allWithTRPC: (tRPCOverrides = {}, searchParams = {}) => {
    commonMocks.allUI();
    commonMocks.nextNavigation(searchParams);
    commonMocks.tRPCApi(tRPCOverrides);
  },
};
