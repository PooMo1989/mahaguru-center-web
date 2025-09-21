import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { UpcomingEventsSidebar } from "./UpcomingEventsSidebar";

// Mock tRPC with a factory function that creates the mock
const mockUseQuery = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    event: {
      getEvents: {
        useQuery: (...args: any[]) => mockUseQuery(...args),
      },
    },
  },
}));

// Mock data
const mockEvents = [
  {
    id: "1",
    name: "Upcoming Event 1",
    description: "This is a description for the first upcoming event with some details.",
    category: "Workshop",
    eventDate: new Date("2025-12-25T18:00:00Z"),
    photos: ["https://example.com/photo1.jpg"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Upcoming Event 2 with a Very Long Name That Should Be Truncated",
    description: "This is a very long description for the second upcoming event that should be truncated in the sidebar display to maintain proper layout and readability.",
    category: "Discussion",
    eventDate: new Date("2025-12-30T19:00:00Z"),
    photos: ["https://example.com/photo2.jpg", "https://example.com/photo3.jpg", "https://example.com/photo4.jpg"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Upcoming Event 3",
    description: "Third event description",
    category: "Meditation",
    eventDate: new Date("2026-01-15T18:00:00Z"),
    photos: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("UpcomingEventsSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sidebar title", () => {
    mockUseQuery.mockReturnValue({ data: [], isLoading: false, error: null });

    render(<UpcomingEventsSidebar />);

    expect(screen.getByRole("heading", { name: /upcoming events/i })).toBeInTheDocument();
  });

  it("shows loading state with skeleton placeholders", () => {
    mockUseQuery.mockReturnValue({ data: [], isLoading: true, error: null });

    render(<UpcomingEventsSidebar />);

    // Should show loading skeletons
    const skeletons = screen.getAllByTestId("event-skeleton");
    expect(skeletons).toHaveLength(3);
  });

  it("displays upcoming events when available", async () => {
    mockUseQuery.mockReturnValue({ data: mockEvents, isLoading: false, error: null });

    render(<UpcomingEventsSidebar />);

    await waitFor(() => {
      expect(screen.getByText("Upcoming Event 1")).toBeInTheDocument();
      expect(screen.getByText("Upcoming Event 2 with a Very Long Name That Should Be Truncated")).toBeInTheDocument();
      expect(screen.getByText("Upcoming Event 3")).toBeInTheDocument();
    });
  });

  it("respects maxEvents prop", async () => {
    mockUseQuery.mockReturnValue({ data: mockEvents, isLoading: false, error: null });

    render(<UpcomingEventsSidebar maxEvents={2} />);

    await waitFor(() => {
      expect(screen.getByText("Upcoming Event 1")).toBeInTheDocument();
      expect(screen.getByText("Upcoming Event 2 with a Very Long Name That Should Be Truncated")).toBeInTheDocument();
      expect(screen.queryByText("Upcoming Event 3")).not.toBeInTheDocument();
      
      // Should show count of remaining events
      expect(screen.getByText("And 1 more upcoming events")).toBeInTheDocument();
    });
  });

  it("shows empty state when no events", () => {
    mockUseQuery.mockReturnValue({ data: [], isLoading: false, error: null });

    render(<UpcomingEventsSidebar />);

    expect(screen.getByText("No upcoming events")).toBeInTheDocument();
    expect(screen.getByText("Check back soon for new events!")).toBeInTheDocument();
  });

  it("shows error state when query fails", () => {
    mockUseQuery.mockReturnValue({ 
      data: [], 
      isLoading: false, 
      error: new Error("Failed to fetch") 
    });

    render(<UpcomingEventsSidebar />);

    expect(screen.getByText("Unable to load events")).toBeInTheDocument();
  });

  it("displays event details correctly in compact format", async () => {
    mockUseQuery.mockReturnValue({ data: [mockEvents[0]], isLoading: false, error: null });

    render(<UpcomingEventsSidebar />);

    await waitFor(() => {
      // Event name
      expect(screen.getByText("Upcoming Event 1")).toBeInTheDocument();
      
      // Category badge
      expect(screen.getByText("Workshop")).toBeInTheDocument();
      
      // Description
      expect(screen.getByText("This is a description for the first upcoming event with some details.")).toBeInTheDocument();
      
      // Date formatting (compact format for sidebar)
      expect(screen.getByText(/Dec 25/)).toBeInTheDocument();
    });
  });

  it("handles photo display correctly", async () => {
    mockUseQuery.mockReturnValue({ data: mockEvents, isLoading: false, error: null });

    render(<UpcomingEventsSidebar />);

    await waitFor(() => {
      // Event with one photo
      expect(screen.getByAltText("Upcoming Event 1 photo 1")).toBeInTheDocument();
      
      // Event with multiple photos should show only first 2 + count
      expect(screen.getByAltText("Upcoming Event 2 with a Very Long Name That Should Be Truncated photo 1")).toBeInTheDocument();
      expect(screen.getByAltText("Upcoming Event 2 with a Very Long Name That Should Be Truncated photo 2")).toBeInTheDocument();
      expect(screen.getByText("+1")).toBeInTheDocument(); // +1 more photos
      
      // Event with no photos should not show photo section
      const event3Photos = screen.queryByAltText("Upcoming Event 3 photo 1");
      expect(event3Photos).not.toBeInTheDocument();
    });
  });

  it("applies custom className", () => {
    mockUseQuery.mockReturnValue({ data: [], isLoading: false, error: null });

    const { container } = render(<UpcomingEventsSidebar className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("calls tRPC with upcoming filter", () => {
    mockUseQuery.mockReturnValue({ data: [], isLoading: false, error: null });

    render(<UpcomingEventsSidebar />);

    expect(mockUseQuery).toHaveBeenCalledWith({ filter: "upcoming" });
  });

  it("formats dates in compact sidebar format", async () => {
    const eventWithSpecificDate = {
      ...mockEvents[0],
      eventDate: new Date("2025-12-25T14:30:00Z"), // 2:30 PM UTC
    };

    mockUseQuery.mockReturnValue({ 
      data: [eventWithSpecificDate], 
      isLoading: false, 
      error: null 
    });

    render(<UpcomingEventsSidebar />);

    await waitFor(() => {
      // Should show compact date format with time (accounting for timezone conversion)
      expect(screen.getByText(/Dec 25.*\d{1,2}:\d{2} [AP]M/)).toBeInTheDocument();
    });
  });
});