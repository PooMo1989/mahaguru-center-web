import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EventList } from "./event-list";

const mockEvents = [
  {
    id: "1",
    name: "Dhamma Discussion",
    description: "Monthly dhamma discussion on full moon day",
    category: "Dhamma Discussion",
    eventDate: new Date("2025-12-01T18:00:00Z"),
    photos: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
    ],
    images: [],
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
    images: [],
    createdAt: new Date("2025-11-02"),
    updatedAt: new Date("2025-11-02"),
  },
];

describe("EventList", () => {
  const mockOnRefresh = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const defaultProps = {
    events: mockEvents,
    onRefresh: mockOnRefresh,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders empty state when no events", () => {
    render(<EventList {...defaultProps} events={[]} />);

    expect(
      screen.getByText("No events found. Create your first event!"),
    ).toBeInTheDocument();
  });

  it("renders events table with data", () => {
    render(<EventList {...defaultProps} />);

    // Check table headers
    expect(screen.getByText("Event Name")).toBeInTheDocument();
    expect(screen.getByText("Event Date")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Photos")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    // Check event data
    expect(
      screen.getByRole("cell", { name: "Dhamma Discussion" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "Meditation Session" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Monthly dhamma discussion on full moon day"),
    ).toBeInTheDocument();
    expect(screen.getByText("Guided meditation session")).toBeInTheDocument();
    expect(screen.getByText("2 photo(s)")).toBeInTheDocument();
    expect(screen.getByText("0 photo(s)")).toBeInTheDocument();
  });

  it("formats dates correctly", () => {
    render(<EventList {...defaultProps} />);

    // Check for the actual formatted dates as shown in test output
    expect(
      screen.getByText("December 1, 2025 at 11:30 PM"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("December 15, 2025 at 11:00 PM"),
    ).toBeInTheDocument();
  });

  it("displays category badges", () => {
    render(<EventList {...defaultProps} />);

    const categoryBadges = screen.getAllByText(
      /Dhamma Discussion|Meditation Session/,
    );
    expect(categoryBadges).toHaveLength(4); // 2 in title + 2 in badges
  });

  it("calls onRefresh when refresh button is clicked", () => {
    render(<EventList {...defaultProps} />);

    const refreshButton = screen.getByRole("button", { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it("shows truncated descriptions with full text in title", () => {
    render(<EventList {...defaultProps} />);

    const descriptionCells = screen.getAllByText(
      /Monthly dhamma discussion|Guided meditation/,
    );
    // Check that the full description is in the title attribute
    const firstDescription = descriptionCells.find(
      (el) => el.textContent === "Monthly dhamma discussion on full moon day",
    );
    expect(firstDescription).toHaveAttribute(
      "title",
      "Monthly dhamma discussion on full moon day",
    );
  });

  // New tests for edit and delete functionality
  it("renders edit and delete buttons for each event", () => {
    render(<EventList {...defaultProps} />);

    const editButtons = screen.getAllByText("Edit");
    const deleteButtons = screen.getAllByText("Delete");

    expect(editButtons).toHaveLength(2); // One for each event
    expect(deleteButtons).toHaveLength(2); // One for each event
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<EventList {...defaultProps} />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]!);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockEvents[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<EventList {...defaultProps} />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]!);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockEvents[0]);
  });
});
