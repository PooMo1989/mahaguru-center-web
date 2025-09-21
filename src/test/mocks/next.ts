import { vi } from 'vitest';
import type { MockedFunction } from 'vitest';

// Type definitions for better type safety
interface MockSearchParams {
  get: (key: string) => string | null;
  has: (key: string) => boolean;
  getAll: (key: string) => string[];
  keys: () => IterableIterator<string>;
  values: () => IterableIterator<string>;
  entries: () => IterableIterator<[string, string]>;
  forEach: (callback: (value: string, key: string) => void) => void;
  toString: () => string;
}

interface MockRouter {
  push: MockedFunction<(url: string) => void>;
  replace: MockedFunction<(url: string) => void>;
  back: MockedFunction<() => void>;
  forward: MockedFunction<() => void>;
  refresh: MockedFunction<() => void>;
  prefetch: MockedFunction<(url: string) => void>;
  route: string;
  pathname: string;
  query: Record<string, string | string[]>;
  asPath: string;
}

/**
 * Mock for Next.js useSearchParams hook with strict typing
 */
export const createMockSearchParams = (params: Record<string, string> = {}): MockSearchParams => {
  const searchParams = new URLSearchParams(params);
  return {
    get: (key: string) => searchParams.get(key),
    has: (key: string) => searchParams.has(key),
    getAll: (key: string) => searchParams.getAll(key),
    keys: () => searchParams.keys(),
    values: () => searchParams.values(),
    entries: () => searchParams.entries(),
    forEach: (callback: (value: string, key: string) => void) => {
      searchParams.forEach(callback);
    },
    toString: () => searchParams.toString(),
  };
};

/**
 * Mock for Next.js useRouter hook with strict typing
 */
export const createMockRouter = (overrides: Partial<MockRouter> = {}): MockRouter => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  ...overrides,
});

/**
 * Mock for Next.js usePathname hook
 */
export const createMockPathname = (pathname = '/') => pathname;

/**
 * Standard mock implementations for common Next.js hooks
 */
export const mockNextNavigation = (searchParams = {}, pathname = '/') => ({
  useSearchParams: () => createMockSearchParams(searchParams),
  useRouter: () => createMockRouter(),
  usePathname: () => createMockPathname(pathname),
});