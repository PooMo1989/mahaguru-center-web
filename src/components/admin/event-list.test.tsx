import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventList } from "./event-list";

const mockEvents = [
  {
    id: "1",
    name: "Dhamma Discussion",
    description: "Monthly dhamma discussion on full moon day",
    category: "Dhamma Discussion",
    eventDate: new Date("2025-12-01T18:00:00Z"),
    photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
    createdAt: new Date("2025-11-01"),
    updatedAt: new Date("2025-11-01"),
  },
  {
    id: "2", 
    name: "Meditation Session",
    description: "Guided meditation session",
    category: "Meditation Session",
    eventDate: new Date("2025-12-15T17:30:00Z"),
    photos: [],
    createdAt: new Date("2025-11-02"),
    updatedAt: new Date("2025-11-02"),
  },
];

describe("EventList", () => {
  it("renders empty state when no events", () => {
    const mockOnRefresh = vi.fn();
    render(<EventList events={[]} onRefresh={mockOnRefresh} />);

    expect(screen.getByText("No events found. Create your first event!")).toBeInTheDocument();
  });

  it("renders events table with data", () => {
    const mockOnRefresh = vi.fn();
    render(<EventList events={mockEvents} onRefresh={mockOnRefresh} />);

    // Check table headers
    expect(screen.getByText("Event Name")).toBeInTheDocument();
    expect(screen.getByText("Event Date")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Photos")).toBeInTheDocument();

    // Check event data
    expect(screen.getByText("Dhamma Discussion")).toBeInTheDocument();
    expect(screen.getByText("Meditation Session")).toBeInTheDocument();
    expect(screen.getByText("Monthly dhamma discussion on full moon day")).toBeInTheDocument();
    expect(screen.getByText("Guided meditation session")).toBeInTheDocument();
    expect(screen.getByText("2 photo(s)")).toBeInTheDocument();
    expect(screen.getByText("0 photo(s)")).toBeInTheDocument();
  });

  it("formats dates correctly", () => {
    const mockOnRefresh = vi.fn();
    render(<EventList events={mockEvents} onRefresh={mockOnRefresh} />);

    // The exact format depends on locale, but should contain the date parts
    expect(screen.getByText(/December.*1.*2025.*6:00.*PM/)).toBeInTheDocument();
    expect(screen.getByText(/December.*15.*2025.*5:30.*PM/)).toBeInTheDocument();
  });

  it("displays category badges", () => {
    const mockOnRefresh = vi.fn();
    render(<EventList events={mockEvents} onRefresh={mockOnRefresh} />);

    const categoryBadges = screen.getAllByText(/Dhamma Discussion|Meditation Session/);
    expect(categoryBadges).toHaveLength(3); // 2 in badges + 1 in table
  });

  it("calls onRefresh when refresh button is clicked", () => {
    const mockOnRefresh = vi.fn();
    render(<EventList events={mockEvents} onRefresh={mockOnRefresh} />);

    const refreshButton = screen.getByRole("button", { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it("shows truncated descriptions with full text in title", () => {
    const mockOnRefresh = vi.fn();
    render(<EventList events={mockEvents} onRefresh={mockOnRefresh} />);

    const descriptionCells = screen.getAllByText(/Monthly dhamma discussion|Guided meditation/);
    // Check that the full description is in the title attribute
    const firstDescription = descriptionCells.find(el => 
      el.textContent === "Monthly dhamma discussion on full moon day"
    );
    expect(firstDescription).toHaveAttribute("title", "Monthly dhamma discussion on full moon day");
  });
});