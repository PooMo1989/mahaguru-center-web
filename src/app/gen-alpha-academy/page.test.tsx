import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GenAlphaAcademyPage from "./page";

// Mock the Navigation component with both Navigation and Footer
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Mock Navigation</nav>,
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

describe("Gen Alpha Academy Landing Page", () => {
  it("renders the page with navigation component", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });

  describe("Section 1: Header", () => {
    it("displays the hero section with title, subtitle, and Reserve Now button", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByRole("heading", { name: "Gen Alpha Academy" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Cultivating Leaders & Wise Minds for the 21st Century" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Reserve Now" })).toBeInTheDocument();
    });

    it("has Reserve Now button with proper external link attributes", () => {
      render(<GenAlphaAcademyPage />);
      
      const reserveButton = screen.getByRole("link", { name: "Reserve Now" });
      expect(reserveButton).toHaveAttribute("target", "_blank");
      expect(reserveButton).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Section 2: Workshop Introduction", () => {
    it("displays the workshop introduction with left/right split layout", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByRole("heading", { name: "Fundamentals for Lifelong Transformation" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Dear Parents and Young Adults," })).toBeInTheDocument();
      expect(screen.getByText(/We're excited to welcome you to something truly special/)).toBeInTheDocument();
      expect(screen.getByText(/transformative 5-hour experience filled with energy/)).toBeInTheDocument();
    });

    it("displays the complete workshop introduction text", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByText(/Whether you're exploring who you are/)).toBeInTheDocument();
      expect(screen.getByText(/help you see your future more clearly/)).toBeInTheDocument();
    });
  });

  describe("Section 3: Four Pillars", () => {
    it("displays the four pillars section header and introduction", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByRole("heading", { name: "What makes the program special" })).toBeInTheDocument();
      expect(screen.getByText(/This is the stepping stone to a comprehensive life-preparation journey/)).toBeInTheDocument();
    });

    it("displays all four pillars with exact text from Project Brief", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByRole("heading", { name: "Self-Realization" })).toBeInTheDocument();
      expect(screen.getByText("Discover your true self and life purpose. Cultivate personal insight and awareness.")).toBeInTheDocument();
      
      expect(screen.getByRole("heading", { name: "Maturity through wisdom" })).toBeInTheDocument();
      expect(screen.getByText("Sharpen decision-making skills. Apply practical wisdom to daily life.")).toBeInTheDocument();
      
      expect(screen.getByRole("heading", { name: "Leadership Training" })).toBeInTheDocument();
      expect(screen.getByText("Become a role model at home, school, and beyond. Learn to lead and inspire others.")).toBeInTheDocument();
      
      expect(screen.getByRole("heading", { name: "Emotional Management" })).toBeInTheDocument();
      expect(screen.getByText("Understand and regulate your emotions. Build resilience and emotional well-being.")).toBeInTheDocument();
    });

    it("has 2x2 grid layout for pillars", () => {
      render(<GenAlphaAcademyPage />);
      
      const pillarsGrid = screen.getByText("Self-Realization").closest('.grid');
      expect(pillarsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });
  });

  describe("Section 4: Program Details & Inclusions", () => {
    it("displays program details with all specified information", () => {
      render(<GenAlphaAcademyPage />);
      
      // Use text content instead of exact heading match for emoji issues
      expect(screen.getByText(/Program Details/)).toBeInTheDocument();
      expect(screen.getByText(/August 22nd \(Sunday – During School Holidays\)/)).toBeInTheDocument();
      expect(screen.getByText(/5 Hours/)).toBeInTheDocument();
      expect(screen.getByText(/15–22 Years/)).toBeInTheDocument();
      expect(screen.getByText(/Limited to 15 Participants Only/)).toBeInTheDocument();
      expect(screen.getByText(/Sinhala/)).toBeInTheDocument();
      expect(screen.getByText(/Organized by the Mahaguru Center Australia/)).toBeInTheDocument();
    });

    it("displays what's included section", () => {
      render(<GenAlphaAcademyPage />);
      
      // Use text content instead of exact heading match for emoji issues
      expect(screen.getByText(/What's Included/)).toBeInTheDocument();
      expect(screen.getByText(/Comprehensive training materials and handouts/)).toBeInTheDocument();
      expect(screen.getByText(/Meals for the day/)).toBeInTheDocument();
      expect(screen.getByText(/Access to follow-up sessions monthly/)).toBeInTheDocument();
      expect(screen.getByText(/Access to recorded sessions/)).toBeInTheDocument();
    });
  });

  describe("Section 5: Investment & Mission", () => {
    it("displays investment details", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByRole("heading", { name: "Investment in Your Future" })).toBeInTheDocument();
      expect(screen.getByText(/Program Contribution: LKR 5,000 per participant/)).toBeInTheDocument();
      expect(screen.getByText(/This fee supports high-quality delivery/)).toBeInTheDocument();
      expect(screen.getByText(/If you are unable to make the payment/)).toBeInTheDocument();
      expect(screen.getByText(/\+94777100490/)).toBeInTheDocument();
    });

    it("displays mission contribution explanation", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByRole("heading", { name: "What happens to your contribution" })).toBeInTheDocument();
      expect(screen.getByText(/Your payment is an offering that directly supports/)).toBeInTheDocument();
      expect(screen.getByText(/maintain our physical space/)).toBeInTheDocument();
    });

    it("has Learn More About Our Mission link with proper attributes", () => {
      render(<GenAlphaAcademyPage />);
      
      const missionLink = screen.getByRole("link", { name: "Learn More About Our Mission →" });
      expect(missionLink).toBeInTheDocument();
      expect(missionLink).toHaveAttribute("target", "_blank");
      expect(missionLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Section 6: Why This Program Matters", () => {
    it("displays the program importance explanation", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByText(/In today's world, young people need skills that support long-term success/)).toBeInTheDocument();
      expect(screen.getByText(/This program is designed to plant seeds of awareness/)).toBeInTheDocument();
    });
  });

  describe("Section 7: Final Call to Action", () => {
    it("displays the final registration call to action", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.getByText(/Register Now – Limited Seats!/)).toBeInTheDocument();
      expect(screen.getByText(/To ensure deep, personal learning, we are accepting only 15 participants/)).toBeInTheDocument();
    });

    it("has Inquire via WhatsApp button with proper attributes", () => {
      render(<GenAlphaAcademyPage />);
      
      const whatsappButton = screen.getByRole("link", { name: "Inquire via WhatsApp" });
      expect(whatsappButton).toBeInTheDocument();
      expect(whatsappButton).toHaveAttribute("target", "_blank");
      expect(whatsappButton).toHaveAttribute("rel", "noopener noreferrer");
      expect(whatsappButton).toHaveAttribute("href");
      expect(whatsappButton.getAttribute("href")).toContain("wa.me");
    });
  });

  describe("External Links and Call-to-Action Buttons", () => {
    it("displays at least two call-to-action buttons", () => {
      render(<GenAlphaAcademyPage />);
      
      // Check for Reserve Now button in header
      const reserveButtons = screen.getAllByRole("link", { name: "Reserve Now" });
      expect(reserveButtons.length).toBeGreaterThanOrEqual(1);
      
      // Check for WhatsApp button
      expect(screen.getByRole("link", { name: "Inquire via WhatsApp" })).toBeInTheDocument();
      
      // Total call-to-action buttons should be at least 2
      const allCTAButtons = screen.getAllByRole("link");
      const ctaButtons = allCTAButtons.filter(link => 
        link.textContent?.includes("Reserve Now") || 
        link.textContent?.includes("Inquire via WhatsApp")
      );
      expect(ctaButtons.length).toBeGreaterThanOrEqual(2);
    });

    it("has proper external link security attributes", () => {
      render(<GenAlphaAcademyPage />);
      
      const externalLinks = screen.getAllByRole("link").filter(link => 
        link.hasAttribute("target") && link.getAttribute("target") === "_blank"
      );
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  describe("Responsive Design", () => {
    it("uses consistent styling with gradient background", () => {
      render(<GenAlphaAcademyPage />);
      
      const mainElement = screen.getByRole("main");
      expect(mainElement).toHaveClass('min-h-screen', 'bg-gradient-to-b', 'from-slate-50', 'to-slate-100');
    });

    it("has responsive grid layouts for split sections", () => {
      render(<GenAlphaAcademyPage />);
      
      // Check that the page contains responsive grid layouts
      const gridElements = document.querySelectorAll('.grid');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  describe("Content Verification", () => {
    it("does NOT display 'Coming Soon' content from previous version", () => {
      render(<GenAlphaAcademyPage />);
      
      expect(screen.queryByText(/Program Details Coming Soon/)).not.toBeInTheDocument();
      expect(screen.queryByText(/We're currently finalizing the specific workshop details/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Stay tuned for announcements/)).not.toBeInTheDocument();
    });

    it("displays all required workshop details", () => {
      render(<GenAlphaAcademyPage />);
      
      // Verify specific workshop details are now shown (opposite of Story 1.5)
      expect(screen.getByText(/August 22nd/)).toBeInTheDocument();
      expect(screen.getByText(/5 Hours/)).toBeInTheDocument();
      expect(screen.getByText(/LKR 5,000/)).toBeInTheDocument();
      expect(screen.getByText(/15 Participants/)).toBeInTheDocument();
    });

    it("has all 7 sections from Project Brief", () => {
      render(<GenAlphaAcademyPage />);
      
      // Verify all sections are present by checking key headings/content
      expect(screen.getByRole("heading", { name: "Gen Alpha Academy" })).toBeInTheDocument(); // Section 1
      expect(screen.getByRole("heading", { name: "Fundamentals for Lifelong Transformation" })).toBeInTheDocument(); // Section 2
      expect(screen.getByRole("heading", { name: "What makes the program special" })).toBeInTheDocument(); // Section 3
      expect(screen.getByText(/Program Details/)).toBeInTheDocument(); // Section 4
      expect(screen.getByRole("heading", { name: "Investment in Your Future" })).toBeInTheDocument(); // Section 5
      // Section 6 has no heading but content is tested elsewhere
      expect(screen.getByText(/Register Now – Limited Seats!/)).toBeInTheDocument(); // Section 7
    });
  });
});