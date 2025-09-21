import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js modules that cause issues in tests
vi.mock("next/server", () => ({}));
vi.mock("next-auth", () => ({}));
vi.mock("next-auth/providers/google", () => ({}));

// Mock server-side modules
vi.mock("~/server/db", () => ({
  db: {},
}));

vi.mock("~/server/auth", () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("~/env", () => ({
  env: {
    NODE_ENV: "test",
    DATABASE_URL: "test://test",
    NEXTAUTH_SECRET: "test-secret",
    NEXTAUTH_URL: "http://localhost:3000",
    GOOGLE_CLIENT_ID: "test-id",
    GOOGLE_CLIENT_SECRET: "test-secret",
  },
}));
