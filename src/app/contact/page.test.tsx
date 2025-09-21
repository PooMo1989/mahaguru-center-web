/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

// Mock useSearchParams
const mockSearchParams = new Map();
const mockUseSearchParams = vi.fn(() => ({
  get: (key: string): string | null => mockSearchParams.get(key) ?? null,
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

// Mock Navigation component
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>,
}));

describe("ContactPage URL Parameter Handling", () => {
  beforeEach(() => {
    mockSearchParams.clear();
    vi.clearAllMocks();
  });

  describe("Tab Selection via URL Parameters", () => {
    it("defaults to contact tab when no parameters provided", () => {
      render(<ContactPage />);
      
      // Should show contact tab content (volunteer section)
      expect(screen.getByRole("tab", { name: "Volunteer" })).toBeInTheDocument();
    });

    it("selects donation tab when tab=donate parameter provided", () => {
      mockSearchParams.set('tab', 'donate');
      
      render(<ContactPage />);
      
      // Should show donation tab content
      expect(screen.getByRole("tab", { name: "Donate" })).toBeInTheDocument();
    });
  });

  describe("Donation Fund Selection via URL Parameters", () => {
    beforeEach(() => {
      mockSearchParams.set('tab', 'donate');
    });

    it("defaults to daily-dana fund when no target parameter provided", () => {
      render(<ContactPage />);
      
      // Should show Daily Dana as active tab
      expect(screen.getByRole("tab", { name: "Daily Dana" })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Daily Dana"
      })).toBeInTheDocument();
    });

    it("selects daily-dana fund when target=daily-dana parameter provided", () => {
      mockSearchParams.set('target', 'daily-dana');
      
      render(<ContactPage />);
      
      // Should show Daily Dana content
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Daily Dana"
      })).toBeInTheDocument();
    });

    it("selects poya-day-event fund when target=poya-day-event parameter provided", () => {
      mockSearchParams.set('target', 'poya-day-event');
      
      render(<ContactPage />);
      
      // Click to activate Poya Day tab first (since URL params set initial state)
      // The component should start with this tab active due to URL params
      expect(screen.getByRole("tab", { name: "Poya Day Event" })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Poya Day Event"
      })).toBeInTheDocument();
    });

    it("selects special-projects fund when target=special-projects parameter provided", () => {
      mockSearchParams.set('target', 'special-projects');
      
      render(<ContactPage />);
      
      // Should show Special Projects content
      expect(screen.getByRole("tab", { name: "Special Projects" })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Special Projects"
      })).toBeInTheDocument();
    });

    it("defaults to daily-dana for invalid target parameter", () => {
      mockSearchParams.set('target', 'invalid-target');
      
      render(<ContactPage />);
      
      // Should fallback to Daily Dana
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Daily Dana"
      })).toBeInTheDocument();
    });
  });

  describe("Combined URL Parameters (Projects Page Integration)", () => {
    it("handles /contact?tab=donate&target=daily-dana correctly", () => {
      mockSearchParams.set('tab', 'donate');
      mockSearchParams.set('target', 'daily-dana');
      
      render(<ContactPage />);
      
      // Should be on donation tab with Daily Dana selected
      expect(screen.getByRole("tab", { name: "Donate" })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Daily Dana"
      })).toBeInTheDocument();
    });

    it("handles /contact?tab=donate&target=poya-day-event correctly", () => {
      mockSearchParams.set('tab', 'donate');
      mockSearchParams.set('target', 'poya-day-event');
      
      render(<ContactPage />);
      
      // Should be on donation tab with Poya Day Event selected
      expect(screen.getByRole("tab", { name: "Donate" })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Poya Day Event"
      })).toBeInTheDocument();
    });

    it("handles /contact?tab=donate&target=special-projects correctly", () => {
      mockSearchParams.set('tab', 'donate');
      mockSearchParams.set('target', 'special-projects');
      
      render(<ContactPage />);
      
      // Should be on donation tab with Special Projects selected
      expect(screen.getByRole("tab", { name: "Donate" })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Special Projects"
      })).toBeInTheDocument();
    });
  });

  describe("Project Context Indicator (Story 4.4)", () => {
    beforeEach(() => {
      mockSearchParams.set('tab', 'donate');
    });

    it("shows project name when project parameter is provided", () => {
      mockSearchParams.set('project', 'Digital%20Mission');
      
      render(<ContactPage />);
      
      // Should show project context indicator
      expect(screen.getByText("Inspired by: Digital Mission")).toBeInTheDocument();
    });

    it("handles URL-encoded project names correctly", () => {
      mockSearchParams.set('project', 'AI%20Guru%20%26%20Beyond%20Words');
      
      render(<ContactPage />);
      
      // Should decode URL-encoded project name
      expect(screen.getByText("Inspired by: AI Guru & Beyond Words")).toBeInTheDocument();
    });

    it("shows generic message when no project parameter provided", () => {
      render(<ContactPage />);
      
      // Should show generic context message
      expect(screen.getByText("Inspired by your generosity")).toBeInTheDocument();
    });

    it("combines project context with target parameter correctly", () => {
      mockSearchParams.set('target', 'special-projects');
      mockSearchParams.set('project', 'Beyond%20Words');
      
      render(<ContactPage />);
      
      // Should show both project context and correct fund selection
      expect(screen.getByText("Inspired by: Beyond Words")).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === "Donating to: Special Projects"
      })).toBeInTheDocument();
    });

    it("shows project context on donation tab correctly", () => {
      mockSearchParams.set('project', 'Test%20Project');
      mockSearchParams.set('tab', 'donate'); // Explicitly on donation tab
      
      render(<ContactPage />);
      
      // Should be on donation tab
      expect(screen.getByRole("tab", { name: "Donate" })).toBeInTheDocument();
      
      // Project context should show on donation tab
      expect(screen.getByText("Inspired by: Test Project")).toBeInTheDocument();
    });
  });
});

describe("ContactPage Basic Functionality", () => {
  beforeEach(() => {
    mockSearchParams.clear();
    vi.clearAllMocks();
  });

  it("renders navigation and basic structure", () => {
    render(<ContactPage />);
    
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact Us", level: 1 })).toBeInTheDocument();
  });
});