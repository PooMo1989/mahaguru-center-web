import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import EventsPage from "./page";

// Mock the Navigation component
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>,
}));

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
const mockUpcomingEvents = [
  {
    id: "1",
    name: "Future Event 1",
    description: "Description for future event 1",
    category: "Workshop",
    eventDate: new Date("2025-12-25T18:00:00Z"),
    photos: ["https://example.com/photo1.jpg"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Future Event 2",
    description: "Description for future event 2",
    category: "Discussion",
    eventDate: new Date("2025-12-30T19:00:00Z"),
    photos: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockPastEvents = [
  {
    id: "3",
    name: "Past Event 1",
    description: "Description for past event 1",
    category: "Meditation",
    eventDate: new Date("2025-01-15T18:00:00Z"),
    photos: ["https://example.com/photo3.jpg", "https://example.com/photo4.jpg"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("EventsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title and static content", async () => {
    // Mock successful queries
    mockUseQuery
      .mockReturnValueOnce({ data: [], isLoading: false }) // upcoming events
      .mockReturnValueOnce({ data: [], isLoading: false }); // past events

    render(<EventsPage />);

    expect(screen.getByRole("heading", { name: /events & monthly dhamma discussion/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /recurring events/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /upcoming events/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /past events archive/i })).toBeInTheDocument();
  });

  it("displays static recurring events content", () => {
    mockUseQuery
      .mockReturnValueOnce({ data: [], isLoading: false })
      .mockReturnValueOnce({ data: [], isLoading: false });

    render(<EventsPage />);

    expect(screen.getByText("Monthly Dhamma Discussion")).toBeInTheDocument();
    expect(screen.getByText("Weekly Clarity Q&A")).toBeInTheDocument();
    expect(screen.getByText(/signature monthly dhamma discussion/i)).toBeInTheDocument();
    expect(screen.getByText(/interactive weekly clarity q&a session/i)).toBeInTheDocument();
  });

  it("displays upcoming events when available", async () => {
    mockUseQuery
      .mockReturnValueOnce({ data: mockUpcomingEvents, isLoading: false })
      .mockReturnValueOnce({ data: [], isLoading: false });

    render(<EventsPage />);

    await waitFor(() => {
      expect(screen.getByText("Future Event 1")).toBeInTheDocument();
      expect(screen.getByText("Future Event 2")).toBeInTheDocument();
      expect(screen.getByText("Workshop")).toBeInTheDocument();
      expect(screen.getByText("Discussion")).toBeInTheDocument();
    });
  });

  it("displays past events when available", async () => {
    mockUseQuery
      .mockReturnValueOnce({ data: [], isLoading: false })
      .mockReturnValueOnce({ data: mockPastEvents, isLoading: false });

    render(<EventsPage />);

    await waitFor(() => {
      expect(screen.getByText("Past Event 1")).toBeInTheDocument();
      expect(screen.getByText("Meditation")).toBeInTheDocument();
    });
  });

  it("shows empty state for no upcoming events", () => {
    mockUseQuery
      .mockReturnValueOnce({ data: [], isLoading: false })
      .mockReturnValueOnce({ data: [], isLoading: false });

    render(<EventsPage />);

    expect(screen.getByText("No upcoming events scheduled at this time.")).toBeInTheDocument();
    expect(screen.getByText("Please check back soon for new events!")).toBeInTheDocument();
  });

  it("shows empty state for no past events", () => {
    mockUseQuery
      .mockReturnValueOnce({ data: [], isLoading: false })
      .mockReturnValueOnce({ data: [], isLoading: false });

    render(<EventsPage />);

    expect(screen.getByText("No past events in our archive yet.")).toBeInTheDocument();
    expect(screen.getByText("Check back after our first events!")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockUseQuery
      .mockReturnValueOnce({ data: [], isLoading: true })
      .mockReturnValueOnce({ data: [], isLoading: true });

    render(<EventsPage />);

    const loadingSpinners = screen.getAllByTestId("loading-spinner");
    expect(loadingSpinners).toHaveLength(2);
  });

  it("displays event details correctly", async () => {
    mockUseQuery
      .mockReturnValueOnce({ data: mockUpcomingEvents, isLoading: false })
      .mockReturnValueOnce({ data: mockPastEvents, isLoading: false });

    render(<EventsPage />);

    await waitFor(() => {
      // Check event names
      expect(screen.getByText("Future Event 1")).toBeInTheDocument();
      expect(screen.getByText("Past Event 1")).toBeInTheDocument();
      
      // Check descriptions
      expect(screen.getByText("Description for future event 1")).toBeInTheDocument();
      expect(screen.getByText("Description for past event 1")).toBeInTheDocument();
      
      // Check categories
      expect(screen.getByText("Workshop")).toBeInTheDocument();
      expect(screen.getByText("Meditation")).toBeInTheDocument();
    });
  });

  it("handles photo display correctly", async () => {
    mockUseQuery
      .mockReturnValueOnce({ data: mockUpcomingEvents, isLoading: false })
      .mockReturnValueOnce({ data: mockPastEvents, isLoading: false });

    render(<EventsPage />);

    await waitFor(() => {
      // Should show photos for events that have them
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
      
      // Check alt text
      expect(screen.getByAltText("Future Event 1 photo 1")).toBeInTheDocument();
      expect(screen.getByAltText("Past Event 1 photo 1")).toBeInTheDocument();
    });
  });

  it("calls tRPC with correct filters", () => {
    mockUseQuery
      .mockReturnValueOnce({ data: [], isLoading: false })
      .mockReturnValueOnce({ data: [], isLoading: false });

    render(<EventsPage />);

    expect(mockUseQuery).toHaveBeenCalledWith({ filter: "upcoming" });
    expect(mockUseQuery).toHaveBeenCalledWith({ filter: "past" });
  });
});