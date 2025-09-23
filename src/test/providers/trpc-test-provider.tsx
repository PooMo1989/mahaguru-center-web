import React from "react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "~/server/api/root";
import superjson from "superjson";

// Create a test-specific tRPC client with proper typing
export const testApi = createTRPCReact<AppRouter>();

interface TRPCTestProviderProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

/**
 * Test provider that wraps components with tRPC context
 * This prevents "Unable to find tRPC Context" errors in tests
 * Provides strict type safety for test scenarios
 */
export function TRPCTestProvider({
  children,
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  }),
}: TRPCTestProviderProps) {
  const trpcClient = testApi.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
        transformer: superjson,
        // Disable actual HTTP calls in tests
        fetch: () => Promise.resolve(new Response("{}", { status: 200 })),
      }),
    ],
  });

  return (
    <testApi.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </testApi.Provider>
  );
}
