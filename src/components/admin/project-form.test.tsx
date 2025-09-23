import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProjectForm } from "./project-form";
import { type RouterOutputs } from "~/trpc/react";

// Mock tRPC
vi.mock("~/trpc/react", () => ({
  api: {
    project: {
      createProject: {
        useMutation: vi.fn(() => ({
          mutate: vi.fn(),
          isPending: false,
        })),
      },
      updateProject: {
        useMutation: vi.fn(() => ({
          mutate: vi.fn(),
          isPending: false,
        })),
      },
    },
  },
}));

// Mock project data for edit mode
const mockProject: RouterOutputs["project"]["getProjects"][number] = {
  id: "1",
  projectName: "Test Project",
  description: "Test description",
  photos: ["https://example.com/photo1.jpg"],
  donationGoalAmount: {
    toNumber: () => 50000,
  } as unknown as RouterOutputs["project"]["getProjects"][number]["donationGoalAmount"],
  currentDonationAmount: {
    toNumber: () => 25000,
  } as unknown as RouterOutputs["project"]["getProjects"][number]["currentDonationAmount"],
  projectType: "Digital Infrastructure",
  projectNature: "Continuous",
  startDate: null,
  endDate: null,
  donationLinkTarget: "Special Projects",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("ProjectForm", () => {
  const mockOnProjectCreated = vi.fn();
  const mockOnProjectUpdated = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create form with all required fields", () => {
    render(<ProjectForm onProjectCreated={mockOnProjectCreated} />);

    // Check all form fields are present
    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
    expect(screen.getByText(/project nature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/donation goal amount/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/current donation amount/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/donation link target/i)).toBeInTheDocument();

    // Check submit button
    expect(
      screen.getByRole("button", { name: /create project/i }),
    ).toBeInTheDocument();
  });

  it("renders edit form with populated data", () => {
    render(
      <ProjectForm
        mode="edit"
        editProject={mockProject}
        onProjectUpdated={mockOnProjectUpdated}
        onCancel={mockOnCancel}
      />,
    );

    // Check if form is populated with project data
    expect(screen.getByDisplayValue("Test Project")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test description")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Digital Infrastructure"),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("50000")).toBeInTheDocument();
    expect(screen.getByDisplayValue("25000")).toBeInTheDocument();

    // Check if edit-specific elements are present
    expect(
      screen.getByRole("button", { name: /update project/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("handles project nature radio button selection", () => {
    render(<ProjectForm onProjectCreated={mockOnProjectCreated} />);

    const continuousRadio = screen.getByLabelText("Continuous");
    const oneTimeRadio = screen.getByLabelText("One-time");
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);

    // Initially, Continuous should be selected and date fields disabled
    expect(continuousRadio).toBeChecked();
    expect(startDateInput).toBeDisabled();
    expect(endDateInput).toBeDisabled();

    // Select One-time
    fireEvent.click(oneTimeRadio);

    expect(oneTimeRadio).toBeChecked();
    expect(startDateInput).not.toBeDisabled();
    expect(endDateInput).not.toBeDisabled();

    // Select Continuous again
    fireEvent.click(continuousRadio);

    expect(continuousRadio).toBeChecked();
    expect(startDateInput).toBeDisabled();
    expect(endDateInput).toBeDisabled();
  });

  it("validates required fields", async () => {
    render(<ProjectForm onProjectCreated={mockOnProjectCreated} />);

    // Try to submit empty form
    const submitButton = screen.getByRole("button", {
      name: /create project/i,
    });
    fireEvent.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText("Project name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(screen.getByText("Project type is required")).toBeInTheDocument();
    });
  });

  it("handles photo URL addition and removal", () => {
    render(<ProjectForm onProjectCreated={mockOnProjectCreated} />);

    const urlInput = screen.getByPlaceholderText("Enter photo URL");
    const addButton = screen.getByText("Add");

    // Add a photo URL
    fireEvent.change(urlInput, {
      target: { value: "https://example.com/photo.jpg" },
    });
    fireEvent.click(addButton);

    // Check if photo is added
    expect(
      screen.getByText("https://example.com/photo.jpg"),
    ).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();

    // Remove the photo
    fireEvent.click(screen.getByText("Remove"));

    // Check if photo is removed
    expect(
      screen.queryByText("https://example.com/photo.jpg"),
    ).not.toBeInTheDocument();
  });

  it("validates donation amounts as positive numbers", async () => {
    render(<ProjectForm onProjectCreated={mockOnProjectCreated} />);

    const goalAmountInput = screen.getByLabelText(/donation goal amount/i);
    const currentAmountInput = screen.getByLabelText(
      /current donation amount/i,
    );

    // Enter negative values
    fireEvent.change(goalAmountInput, { target: { value: "-100" } });
    fireEvent.change(currentAmountInput, { target: { value: "-50" } });

    // Also fill required fields to trigger proper validation
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/project type/i), {
      target: { value: "Test Type" },
    });

    const submitButton = screen.getByRole("button", {
      name: /create project/i,
    });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(
          screen.getByText("Donation goal amount must be positive"),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await waitFor(
      () => {
        expect(
          screen.getByText("Current donation amount cannot be negative"),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("calls onCancel when cancel button is clicked in edit mode", () => {
    render(
      <ProjectForm
        mode="edit"
        editProject={mockProject}
        onProjectUpdated={mockOnProjectUpdated}
        onCancel={mockOnCancel}
      />,
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("handles donation link target selection", () => {
    render(<ProjectForm onProjectCreated={mockOnProjectCreated} />);

    const selectElement = screen.getByLabelText(/donation link target/i);

    // Check default value
    expect(selectElement).toHaveValue("Daily Dana");

    // Change to Special Projects
    fireEvent.change(selectElement, { target: { value: "Special Projects" } });
    expect(selectElement).toHaveValue("Special Projects");

    // Change to Poya Day
    fireEvent.change(selectElement, { target: { value: "Poya Day" } });
    expect(selectElement).toHaveValue("Poya Day");
  });
});
