import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "../test/utils/render";
import { createMockSearchParams } from "../test/mocks/next";
import { createMockTRPCQuery } from "../test/mocks/trpc";
import MahaguruPage from "./mahaguru/page";
import ServicesPage from "./services/page";
import ProjectsPage from "./projects/page";
import EventsPage from "./events/page";
import ContactPage from "./contact/page";

// Mock the Navigation component with both Navigation and Footer exports
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Mock Navigation</nav>,
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  useSearchParams: () => createMockSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock tRPC API
vi.mock("~/trpc/react", () => ({
  api: {
    project: {
      getProjects: {
        useQuery: vi.fn(() => createMockTRPCQuery([])),
      },
    },
    event: {
      getEvents: {
        useQuery: vi.fn(() => createMockTRPCQuery([])),
      },
    },
  },
}));

describe("Page Routing and Components", () => {
  describe("Mahaguru Page", () => {
    it("renders the mahaguru page correctly", () => {
      renderWithProviders(<MahaguruPage />);

      expect(screen.getByText("Mahaguru")).toBeInTheDocument();
      expect(
        screen.getAllByText("The Formative Years: An Era of Seeking")[0],
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /This section would chronicle the Mahaguru's early life/,
        ),
      ).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Services Page", () => {
    it("renders the services page correctly", () => {
      renderWithProviders(<ServicesPage />);

      expect(screen.getByText("Our Services")).toBeInTheDocument();
      expect(
        screen.getByText(/programs and services we offer/),
      ).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Projects Page", () => {
    it("renders the projects page correctly", () => {
      renderWithProviders(<ProjectsPage />, { withTRPC: true });

      expect(screen.getByText("Our Projects")).toBeInTheDocument();
      expect(screen.getByText(/meaningful initiatives/)).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Events Page", () => {
    it("renders the events page correctly", () => {
      renderWithProviders(<EventsPage />, { withTRPC: true });

      expect(
        screen.getByText("Events & Monthly Dhamma Discussion"),
      ).toBeInTheDocument();
      expect(screen.getByText(/spiritual growth/)).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Contact Page", () => {
    it("renders the contact page correctly", () => {
      renderWithProviders(<ContactPage />);

      expect(screen.getByText("Contact Us")).toBeInTheDocument();
      expect(
        screen.getByText(/Become a vital part of our mission/),
      ).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("All Pages", () => {
    it("have consistent layout structure", () => {
      const pages = [
        { Component: MahaguruPage, needsTRPC: false },
        { Component: ServicesPage, needsTRPC: false },
        { Component: ProjectsPage, needsTRPC: true },
        { Component: EventsPage, needsTRPC: true },
        { Component: ContactPage, needsTRPC: false },
      ];

      pages.forEach(({ Component, needsTRPC }) => {
        const { unmount } = renderWithProviders(<Component />, {
          withTRPC: needsTRPC,
        });

        // Check for main element with proper classes
        const main = screen.getByRole("main");
        expect(main).toHaveClass(
          "min-h-screen",
          "bg-gradient-to-b",
          "from-slate-50",
          "to-slate-100",
        );

        // Check for navigation
        expect(screen.getByTestId("navigation")).toBeInTheDocument();

        unmount();
      });
    });
  });
});
