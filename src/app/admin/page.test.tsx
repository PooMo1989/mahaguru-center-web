import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminPage from "./page";

// Mock the tRPC api
const mockGetEventsQuery = vi.fn();
const mockGetProjectsQuery = vi.fn();
const mockDeleteEventMutation = vi.fn();
const mockDeleteProjectMutation = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    event: {
      getEvents: {
        useQuery: (): unknown => mockGetEventsQuery(),
      },
      deleteEvent: {
        useMutation: (): unknown => mockDeleteEventMutation(),
      },
    },
    project: {
      getProjects: {
        useQuery: () => mockGetProjectsQuery(),
      },
      deleteProject: {
        useMutation: () => mockDeleteProjectMutation(),
      },
    },
  },
}));

// Mock components
vi.mock("~/components/admin/event-list", () => ({
  EventList: ({ events }: { events: unknown[] }) => <div data-testid="event-list">Events: {events.length}</div>,
}));

vi.mock("~/components/admin/event-form", () => ({
  EventForm: () => <div data-testid="event-form">Event Form</div>,
}));

vi.mock("~/components/admin/project-list", () => ({
  ProjectList: ({ projects }: { projects: unknown[] }) => <div data-testid="project-list">Projects: {projects.length}</div>,
}));

vi.mock("~/components/admin/project-form", () => ({
  ProjectForm: () => <div data-testid="project-form">Project Form</div>,
}));

vi.mock("~/components/admin/confirmation-dialog", () => ({
  ConfirmationDialog: ({ isOpen }: { isOpen: boolean }) => isOpen ? <div data-testid="confirmation-dialog">Confirmation Dialog</div> : null,
}));

describe("AdminPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockGetEventsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    
    mockGetProjectsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    
    mockDeleteEventMutation.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
    
    mockDeleteProjectMutation.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
  });

  it("renders admin portal with tab navigation", () => {
    render(<AdminPage />);
    
    expect(screen.getByText("Admin Portal")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("shows events tab by default", () => {
    render(<AdminPage />);
    
    expect(screen.getByText("Create New Event")).toBeInTheDocument();
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });

  it("switches to projects tab when clicked", () => {
    render(<AdminPage />);
    
    fireEvent.click(screen.getByText("Projects"));
    
    expect(screen.getByText("Add New Project")).toBeInTheDocument();
    expect(screen.getByTestId("project-list")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    mockGetEventsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<AdminPage />);
    
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it("displays error state", () => {
    mockGetEventsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Test error" },
      refetch: vi.fn(),
    });

    render(<AdminPage />);
    
    expect(screen.getByText(/error loading events/i)).toBeInTheDocument();
  });
});