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
    NEXT_PUBLIC_SUPABASE_URL: "https://test.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
    SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
  },
}));

// Mock the Supabase JS library itself to prevent browser API dependencies
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(),
        remove: vi.fn(),
        getPublicUrl: vi.fn(() => ({ 
          data: { publicUrl: "https://test.supabase.co/storage/test.jpg" } 
        })),
      })),
    },
  })),
}));

// Mock Supabase client to prevent initialization errors in tests
vi.mock("~/lib/supabase-storage", () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(),
        remove: vi.fn(),
        getPublicUrl: vi.fn(() => ({ data: { publicUrl: "https://test.supabase.co/storage/test.jpg" } })),
      })),
    },
  },
  supabaseAdmin: {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(),
        remove: vi.fn(),
        getPublicUrl: vi.fn(() => ({ data: { publicUrl: "https://test.supabase.co/storage/test.jpg" } })),
      })),
    },
  },
  STORAGE_BUCKET: "test-bucket",
  uploadFileToSupabase: vi.fn(),
  deleteFileFromSupabase: vi.fn(),
  generateUniqueFilename: vi.fn(() => "test-file.jpg"),
}));
