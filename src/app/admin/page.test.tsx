import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminPage from "./page";

// Mock the tRPC api object directly
const mockGetEventsQuery = vi.fn();
const mockCreateEventMutation = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    event: {
      getEvents: {
        useQuery: mockGetEventsQuery,
      },
      createEvent: {
        useMutation: mockCreateEventMutation,
      },
    },
  },
}));

// Mock the components
vi.mock("~/components/admin/event-list", () => ({
  EventList: ({ events, onRefresh }: { events: unknown[]; onRefresh: () => void }) => (
    <div data-testid="event-list">
      <div>Events: {events.length}</div>
      <button onClick={onRefresh} data-testid="refresh-button">
        Refresh
      </button>
    </div>
  ),
}));

vi.mock("~/components/admin/event-form", () => ({
  EventForm: ({ onEventCreated }: { onEventCreated: () => void }) => (
    <div data-testid="event-form">
      <button onClick={onEventCreated} data-testid="create-event-button">
        Create Event
      </button>
    </div>
  ),
}));

describe("Admin Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockGetEventsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<AdminPage />);

    expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockGetEventsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Failed to load events" },
      refetch: vi.fn(),
    });

    render(<AdminPage />);

    expect(screen.getByText("Error loading events: Failed to load events")).toBeInTheDocument();
  });

  it("renders admin portal with events", () => {
    const mockEvents = [
      {
        id: "1",
        name: "Test Event",
        description: "Test Description",
        category: "Test Category",
        eventDate: new Date("2025-12-01"),
        photos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockGetEventsQuery.mockReturnValue({
      data: mockEvents,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<AdminPage />);

    expect(screen.getByText("Event Management")).toBeInTheDocument();
    expect(screen.getByText("Create and manage events for the Mahaguru Center")).toBeInTheDocument();
    expect(screen.getByText("Create New Event")).toBeInTheDocument();
    expect(screen.getByText("All Events")).toBeInTheDocument();
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
    expect(screen.getByText("Events: 1")).toBeInTheDocument();
  });

  it("toggles event creation form", async () => {
    mockGetEventsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<AdminPage />);

    const toggleButton = screen.getByRole("button", { name: /create new event/i });
    
    // Form should not be visible initially
    expect(screen.queryByTestId("event-form")).not.toBeInTheDocument();

    // Click to show form
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("event-form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();

    // Click to hide form
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByTestId("event-form")).not.toBeInTheDocument();
  });

  it("handles event creation successfully", async () => {
    const mockRefetch = vi.fn();
    mockGetEventsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<AdminPage />);

    // Show the form
    fireEvent.click(screen.getByRole("button", { name: /create new event/i }));
    expect(screen.getByTestId("event-form")).toBeInTheDocument();

    // Simulate successful event creation
    fireEvent.click(screen.getByTestId("create-event-button"));

    await waitFor(() => {
      expect(screen.queryByTestId("event-form")).not.toBeInTheDocument();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("refreshes events when refresh button is clicked", () => {
    const mockRefetch = vi.fn();
    mockGetEventsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<AdminPage />);

    fireEvent.click(screen.getByTestId("refresh-button"));
    expect(mockRefetch).toHaveBeenCalled();
  });
});