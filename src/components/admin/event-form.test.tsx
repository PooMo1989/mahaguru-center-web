import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EventForm } from "./event-form";

// Mock the tRPC client
const mockCreateMutate = vi.fn();
const mockUpdateMutate = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    event: {
      createEvent: {
        useMutation: () => ({
          mutate: mockCreateMutate,
          isPending: false,
        }),
      },
      updateEvent: {
        useMutation: () => ({
          mutate: mockUpdateMutate,
          isPending: false,
        }),
      },
    },
  },
  type: {} as Record<string, unknown>,
}));

describe("EventForm", () => {
  const mockOnEventCreated = vi.fn();
  const mockOnEventUpdated = vi.fn();
  const mockOnCancel = vi.fn();

  const mockEvent = {
    id: "1",
    name: "Test Event",
    description: "Test Description",
    category: "Dhamma Discussion",
    eventDate: new Date("2025-12-01T18:00:00"),
    photos: ["https://example.com/photo1.jpg"],
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    expect(screen.getByLabelText(/event name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event date & time/i)).toBeInTheDocument();
    expect(screen.getByText(/photo urls/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create event/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    fireEvent.click(screen.getByRole("button", { name: /create event/i }));

    await waitFor(() => {
      expect(screen.getByText("Event name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(screen.getByText("Category is required")).toBeInTheDocument();
      expect(screen.getByText("Event date is required")).toBeInTheDocument();
    });

    expect(mockCreateMutate).not.toHaveBeenCalled();
  });

  it("fills form and submits successfully", async () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/event name/i), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Dhamma Discussion" },
    });
    fireEvent.change(screen.getByLabelText(/event date & time/i), {
      target: { value: "2025-12-01T18:00" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create event/i }));

    await waitFor(() => {
      expect(mockCreateMutate).toHaveBeenCalledWith({
        name: "Test Event",
        description: "Test Description",
        category: "Dhamma Discussion",
        eventDate: new Date("2025-12-01T18:00"),
        photos: [],
      });
    });
  });

  // Edit Mode Tests
  describe("Edit Mode", () => {
    it("renders in edit mode with pre-populated data", () => {
      render(
        <EventForm
          mode="edit"
          editEvent={mockEvent}
          onEventUpdated={mockOnEventUpdated}
          onCancel={mockOnCancel}
        />,
      );

      expect(screen.getByDisplayValue("Test Event")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Dhamma Discussion")).toBeInTheDocument();
      expect(screen.getByDisplayValue("2025-12-01T18:00")).toBeInTheDocument();
      expect(
        screen.getByText("https://example.com/photo1.jpg"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /update event/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /cancel/i }),
      ).toBeInTheDocument();
    });

    it("calls onCancel when cancel button is clicked", () => {
      render(
        <EventForm
          mode="edit"
          editEvent={mockEvent}
          onEventUpdated={mockOnEventUpdated}
          onCancel={mockOnCancel}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
