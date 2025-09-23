import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProjectList } from "./project-list";
import { type RouterOutputs } from "~/trpc/react";

// Mock project data
const mockProjects: RouterOutputs["project"]["getProjects"] = [
  {
    id: "1",
    projectName: "Our Digital Mission",
    description: "Multi-pillar digital preservation project",
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
  },
  {
    id: "2",
    projectName: "The AI Guru",
    description: "AI-powered spiritual guidance system",
    photos: [],
    donationGoalAmount: {
      toNumber: () => 100000,
    } as unknown as RouterOutputs["project"]["getProjects"][number]["donationGoalAmount"],
    currentDonationAmount: {
      toNumber: () => 75000,
    } as unknown as RouterOutputs["project"]["getProjects"][number]["currentDonationAmount"],
    projectType: "Technology Development",
    projectNature: "One-time",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    donationLinkTarget: "Special Projects",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("ProjectList", () => {
  const mockOnRefresh = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state when no projects", () => {
    render(
      <ProjectList
        projects={[]}
        onRefresh={mockOnRefresh}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(
      screen.getByText("No projects found. Create your first project!"),
    ).toBeInTheDocument();
  });

  it("renders project list with data", () => {
    render(
      <ProjectList
        projects={mockProjects}
        onRefresh={mockOnRefresh}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    // Check if project names are displayed
    expect(screen.getByText("Our Digital Mission")).toBeInTheDocument();
    expect(screen.getByText("The AI Guru")).toBeInTheDocument();

    // Check if project types are displayed
    expect(screen.getByText("Digital Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Technology Development")).toBeInTheDocument();

    // Check if project natures are displayed
    expect(screen.getByText("Continuous")).toBeInTheDocument();
    expect(screen.getByText("One-time")).toBeInTheDocument();
  });

  it("displays correct donation amounts and progress", () => {
    render(
      <ProjectList
        projects={mockProjects}
        onRefresh={mockOnRefresh}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    // Check formatted currency amounts
    expect(screen.getByText("$50,000.00")).toBeInTheDocument();
    expect(screen.getByText("$25,000.00")).toBeInTheDocument();
    expect(screen.getByText("$100,000.00")).toBeInTheDocument();
    expect(screen.getByText("$75,000.00")).toBeInTheDocument();

    // Check progress percentages
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <ProjectList
        projects={mockProjects}
        onRefresh={mockOnRefresh}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]!);

    expect(mockOnEdit).toHaveBeenCalledWith(mockProjects[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <ProjectList
        projects={mockProjects}
        onRefresh={mockOnRefresh}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]!);

    expect(mockOnDelete).toHaveBeenCalledWith(mockProjects[0]);
  });

  it("calls onRefresh when refresh button is clicked", () => {
    render(
      <ProjectList
        projects={mockProjects}
        onRefresh={mockOnRefresh}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const refreshButton = screen.getByText("Refresh");
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it("truncates long descriptions", () => {
    const projectWithLongDescription = {
      ...mockProjects[0]!,
      description:
        "This is a very long description that should be truncated when displayed in the table to maintain a clean layout",
    };

    render(
      <ProjectList
        projects={[projectWithLongDescription]}
        onRefresh={mockOnRefresh}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    // The full description should be in the title attribute
    const descriptionElement = screen.getByTitle(
      projectWithLongDescription.description,
    );
    expect(descriptionElement).toBeInTheDocument();
  });
});
