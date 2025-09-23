import { vi } from "vitest";
import type { MockedFunction } from "vitest";

// Type definitions for better type safety
interface MockTRPCQuery<TData = unknown> {
  data: TData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: MockedFunction<() => void>;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isPending: boolean;
  isRefetching: boolean;
  fetchStatus: "fetching" | "idle" | "paused";
  status: "error" | "pending" | "success";
}

interface MockTRPCMutation<TData = unknown, TVariables = unknown> {
  mutate: MockedFunction<(variables: TVariables) => void>;
  mutateAsync: MockedFunction<(variables: TVariables) => Promise<TData>>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
  data: TData | null;
  reset: MockedFunction<() => void>;
}

/**
 * Creates a mock tRPC query with consistent structure and strict typing
 */
export const createMockTRPCQuery = <TData = unknown>(
  data: TData | null = null,
  isLoading = false,
  error: Error | null = null,
): MockTRPCQuery<TData> => ({
  data,
  isLoading,
  error,
  refetch: vi.fn(),
  isError: !!error,
  isSuccess: !error && !isLoading && data !== null,
  isFetching: isLoading,
  isPending: isLoading,
  isRefetching: false,
  fetchStatus: isLoading ? "fetching" : "idle",
  status: error ? "error" : isLoading ? "pending" : "success",
});

/**
 * Creates a mock tRPC mutation with consistent structure and strict typing
 */
export const createMockTRPCMutation = <TData = unknown, TVariables = unknown>(
  mutate: MockedFunction<(variables: TVariables) => void> = vi.fn(),
  isPending = false,
  error: Error | null = null,
): MockTRPCMutation<TData, TVariables> => ({
  mutate,
  mutateAsync: vi.fn(),
  isPending,
  error,
  isError: !!error,
  isSuccess: !error && !isPending,
  data: null,
  reset: vi.fn(),
});

/**
/**
 * Creates a complete mock for the tRPC api object with validation and best practices
 * 
 * @param overrides - Partial overrides for specific endpoints
 * @returns Comprehensive mock of the tRPC API structure
 * 
 * Best Practice: Use this for components that make multiple tRPC calls
 * For single endpoints, use createMockTRPCQuery/createMockTRPCMutation directly
 */
export const createMockTRPCApi = (overrides: Record<string, unknown> = {}) => {
  // Validate overrides structure
  if (overrides && typeof overrides !== "object") {
    console.warn("createMockTRPCApi: overrides should be an object");
  }

  return {
    event: {
      getEvents: {
        useQuery: vi.fn(() => createMockTRPCQuery([])),
      },
      createEvent: {
        useMutation: vi.fn(() => createMockTRPCMutation()),
      },
      updateEvent: {
        useMutation: vi.fn(() => createMockTRPCMutation()),
      },
      deleteEvent: {
        useMutation: vi.fn(() => createMockTRPCMutation()),
      },
    },
    project: {
      getProjects: {
        useQuery: vi.fn(() => createMockTRPCQuery([])),
      },
      createProject: {
        useMutation: vi.fn(() => createMockTRPCMutation()),
      },
      updateProject: {
        useMutation: vi.fn(() => createMockTRPCMutation()),
      },
      deleteProject: {
        useMutation: vi.fn(() => createMockTRPCMutation()),
      },
    },
    ...overrides,
  };
};

/**
 * Sample mock data for events
 */
export const mockEventsData = [
  {
    id: "1",
    name: "Test Event 1",
    description: "Test description 1",
    category: "Workshop",
    eventDate: new Date("2025-12-25T18:00:00Z"),
    photos: ["https://example.com/photo1.jpg"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Test Event 2",
    description: "Test description 2",
    category: "Meditation",
    eventDate: new Date("2025-11-15T18:00:00Z"),
    photos: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * Sample mock data for projects
 */
export const mockProjectsData = [
  {
    id: "1",
    projectName: "Test Project 1",
    description: "Test project description 1",
    photos: ["https://example.com/project1.jpg"],
    donationGoalAmount: { toNumber: () => 50000 },
    amountCollected: { toNumber: () => 25000 },
    projectNature: "Continuous" as const,
    donationTargetType: "Daily Dana" as const,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
