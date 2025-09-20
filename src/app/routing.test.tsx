import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MahaguruPage from "./mahaguru/page";
import ServicesPage from "./services/page";
import ProjectsPage from "./projects/page";
import EventsPage from "./events/page";
import ContactPage from "./contact/page";

// Mock the Navigation component
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Mock Navigation</nav>,
}));

describe("Page Routing and Components", () => {
  describe("Mahaguru Page", () => {
    it("renders the mahaguru page correctly", () => {
      render(<MahaguruPage />);
      
      expect(screen.getByText("Mahaguru")).toBeInTheDocument();
      expect(screen.getByText("The Formative Years: An Era of Seeking")).toBeInTheDocument();
      expect(screen.getByText(/This section would chronicle the Mahaguru's early life/)).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Services Page", () => {
    it("renders the services page correctly", () => {
      render(<ServicesPage />);
      
      expect(screen.getByText("Our Services")).toBeInTheDocument();
      expect(screen.getByText(/programs and services we offer/)).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Projects Page", () => {
    it("renders the projects page correctly", () => {
      render(<ProjectsPage />);
      
      expect(screen.getByText("Our Community Projects")).toBeInTheDocument();
      expect(screen.getByText(/compassionate initiatives/)).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Events Page", () => {
    it("renders the events page correctly", () => {
      render(<EventsPage />);
      
      expect(screen.getByText("Events & Monthly Dhamma Discussion")).toBeInTheDocument();
      expect(screen.getByText(/monthly gatherings/)).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("Contact Page", () => {
    it("renders the contact page correctly", () => {
      render(<ContactPage />);
      
      expect(screen.getByText("Contact Us")).toBeInTheDocument();
      expect(screen.getByText(/Get in touch with us/)).toBeInTheDocument();
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });

  describe("All Pages", () => {
    it("have consistent layout structure", () => {
      const pages = [MahaguruPage, ServicesPage, ProjectsPage, EventsPage, ContactPage];
      
      pages.forEach((PageComponent) => {
        const { unmount } = render(<PageComponent />);
        
        // Check for main element with proper classes
        const main = screen.getByRole("main");
        expect(main).toHaveClass("min-h-screen", "bg-gradient-to-b", "from-slate-50", "to-slate-100");
        
        // Check for navigation
        expect(screen.getByTestId("navigation")).toBeInTheDocument();
        
        unmount();
      });
    });
  });
});