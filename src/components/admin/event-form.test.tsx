import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EventForm } from "./event-form";

// Mock the tRPC client
const mockMutate = vi.fn();
const mockUseMutation = vi.fn(() => ({
  mutate: mockMutate,
  isPending: false,
}));

vi.mock("~/trpc/react", () => ({
  api: {
    event: {
      createEvent: {
        useMutation: mockUseMutation,
      },
    },
  },
}));

describe("EventForm", () => {
  const mockOnEventCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it("renders all form fields", () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    expect(screen.getByLabelText(/event name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event date & time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/photo urls/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create event/i })).toBeInTheDocument();
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

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("fills form and submits successfully", async () => {
    mockUseMutation.mockReturnValue({
      mutate: vi.fn((data, { onSuccess }: { onSuccess: () => void }) => {
        // Simulate successful submission
        onSuccess();
      }),
      isPending: false,
    });

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
      expect(mockOnEventCreated).toHaveBeenCalled();
    });
  });

  it("adds and removes photo URLs", () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    const photoInput = screen.getByPlaceholderText(/enter photo url/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    // Add a photo URL
    fireEvent.change(photoInput, {
      target: { value: "https://example.com/photo.jpg" },
    });
    fireEvent.click(addButton);

    expect(screen.getByText("https://example.com/photo.jpg")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();

    // Remove the photo URL
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(screen.queryByText("https://example.com/photo.jpg")).not.toBeInTheDocument();
  });

  it("validates photo URL format", () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    const photoInput = screen.getByPlaceholderText(/enter photo url/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    // Try to add invalid URL
    fireEvent.change(photoInput, {
      target: { value: "invalid-url" },
    });
    fireEvent.click(addButton);

    expect(screen.getByText("Please enter a valid URL")).toBeInTheDocument();
    expect(screen.queryByText("invalid-url")).not.toBeInTheDocument();
  });

  it("adds photo URL on Enter key press", () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    const photoInput = screen.getByPlaceholderText(/enter photo url/i);

    fireEvent.change(photoInput, {
      target: { value: "https://example.com/photo.jpg" },
    });
    fireEvent.keyPress(photoInput, { key: "Enter", code: "Enter" });

    expect(screen.getByText("https://example.com/photo.jpg")).toBeInTheDocument();
  });

  it("shows loading state during submission", () => {
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    render(<EventForm onEventCreated={mockOnEventCreated} />);

    const submitButton = screen.getByRole("button", { name: /creating.../i });
    expect(submitButton).toBeDisabled();
  });

  it("clears validation errors when user starts typing", async () => {
    render(<EventForm onEventCreated={mockOnEventCreated} />);

    // Trigger validation errors
    fireEvent.click(screen.getByRole("button", { name: /create event/i }));

    await waitFor(() => {
      expect(screen.getByText("Event name is required")).toBeInTheDocument();
    });

    // Start typing in name field
    fireEvent.change(screen.getByLabelText(/event name/i), {
      target: { value: "T" },
    });

    expect(screen.queryByText("Event name is required")).not.toBeInTheDocument();
  });

  it("handles API error gracefully", async () => {
    const errorMessage = "Failed to create event";
    mockUseMutation.mockReturnValue({
      mutate: vi.fn((data, { onError }: { onError: (error: { message: string }) => void }) => {
        onError({ message: errorMessage });
      }),
      isPending: false,
    });

    render(<EventForm onEventCreated={mockOnEventCreated} />);

    // Fill and submit form
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
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockOnEventCreated).not.toHaveBeenCalled();
  });
});