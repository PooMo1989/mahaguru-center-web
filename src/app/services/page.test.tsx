import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ServicesPage from "./page";

// Mock the Navigation component
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Mock Navigation</nav>,
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Services Page", () => {
  it("renders the page header and navigation", () => {
    render(<ServicesPage />);
    
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText(/Discover the various programs and services/)).toBeInTheDocument();
  });

  it("renders all seven service sections", () => {
    render(<ServicesPage />);
    
    // Check that all seven services are rendered
    expect(screen.getByTestId("service-dhamma-discussion")).toBeInTheDocument();
    expect(screen.getByTestId("service-dhamma-explanation")).toBeInTheDocument();
    expect(screen.getByTestId("service-meditation-guidance")).toBeInTheDocument();
    expect(screen.getByTestId("service-mahaguru-meetup")).toBeInTheDocument();
    expect(screen.getByTestId("service-weekly-qa")).toBeInTheDocument();
    expect(screen.getByTestId("service-gen-alpha-academy")).toBeInTheDocument();
    expect(screen.getByTestId("service-outreach")).toBeInTheDocument();
  });

  it("displays correct service titles", () => {
    render(<ServicesPage />);
    
    // Use more specific queries to avoid conflicts with strong tags
    expect(screen.getByRole("heading", { name: "Dhamma Discussion" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Dhamma Explanation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Meditation Guidance" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mahaguru Meetup" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Weekly Clarity Q&A" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gen Alpha Academy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outreach" })).toBeInTheDocument();
  });

  it("displays complete service descriptions", () => {
    render(<ServicesPage />);
    
    // Use partial text matching to avoid markup boundaries
    expect(screen.getByText((content) => 
      content.includes("Our signature monthly") && content.includes("cornerstone event")
    )).toBeInTheDocument();
    expect(screen.getByText((content) => 
      content.includes("For those seeking deeper clarity")
    )).toBeInTheDocument();
    expect(screen.getByText((content) => 
      content.includes("Advance your spiritual journey with personalized")
    )).toBeInTheDocument();
    expect(screen.getByText((content) => 
      content.includes("offers a rare and unique opportunity")
    )).toBeInTheDocument();
    expect(screen.getByText((content) => 
      content.includes("Join our interactive") && content.includes("session")
    )).toBeInTheDocument();
    expect(screen.getByText((content) => 
      content.includes("visionary non-profit initiative")
    )).toBeInTheDocument();
    expect(screen.getByText((content) => 
      content.includes("Our commitment to compassion extends beyond")
    )).toBeInTheDocument();
  });

  it("renders all call-to-action buttons", () => {
    render(<ServicesPage />);
    
    expect(screen.getByTestId("cta-dhamma-discussion")).toBeInTheDocument();
    expect(screen.getByTestId("cta-dhamma-explanation")).toBeInTheDocument();
    expect(screen.getByTestId("cta-meditation-guidance")).toBeInTheDocument();
    expect(screen.getByTestId("cta-mahaguru-meetup")).toBeInTheDocument();
    expect(screen.getByTestId("cta-weekly-qa")).toBeInTheDocument();
    expect(screen.getByTestId("cta-gen-alpha-academy")).toBeInTheDocument();
    expect(screen.getByTestId("cta-outreach")).toBeInTheDocument();
  });

  it("has correct links for internal pages", () => {
    render(<ServicesPage />);
    
    const mahaguruMeetupLink = screen.getByTestId("cta-mahaguru-meetup");
    const genAlphaAcademyLink = screen.getByTestId("cta-gen-alpha-academy");
    
    expect(mahaguruMeetupLink).toHaveAttribute("href", "/mahaguru-meetup");
    expect(genAlphaAcademyLink).toHaveAttribute("href", "/gen-alpha-academy");
  });

  it("has placeholder external links for other services", () => {
    render(<ServicesPage />);
    
    const dhhamDiscussionLink = screen.getByTestId("cta-dhamma-discussion");
    const dhammaExplanationLink = screen.getByTestId("cta-dhamma-explanation");
    const meditationGuidanceLink = screen.getByTestId("cta-meditation-guidance");
    const weeklyQALink = screen.getByTestId("cta-weekly-qa");
    const outreachLink = screen.getByTestId("cta-outreach");
    
    expect(dhhamDiscussionLink).toHaveAttribute("href", "#");
    expect(dhammaExplanationLink).toHaveAttribute("href", "#");
    expect(meditationGuidanceLink).toHaveAttribute("href", "#");
    expect(weeklyQALink).toHaveAttribute("href", "#");
    expect(outreachLink).toHaveAttribute("href", "#");
  });

  it("includes placeholder image areas for each service", () => {
    render(<ServicesPage />);
    
    expect(screen.getByText("Dhamma Discussion Image")).toBeInTheDocument();
    expect(screen.getByText("Dhamma Explanation Image")).toBeInTheDocument();
    expect(screen.getByText("Meditation Guidance Image")).toBeInTheDocument();
    expect(screen.getByText("Mahaguru Meetup Image")).toBeInTheDocument();
    expect(screen.getByText("Weekly Q&A Image")).toBeInTheDocument();
    expect(screen.getByText("Gen Alpha Academy Image")).toBeInTheDocument();
    expect(screen.getByText("Outreach Programs Image")).toBeInTheDocument();
  });

  it("applies consistent styling to CTA buttons", () => {
    render(<ServicesPage />);
    
    const ctaButtons = [
      screen.getByTestId("cta-dhamma-discussion"),
      screen.getByTestId("cta-dhamma-explanation"),
      screen.getByTestId("cta-meditation-guidance"),
      screen.getByTestId("cta-mahaguru-meetup"),
      screen.getByTestId("cta-weekly-qa"),
      screen.getByTestId("cta-gen-alpha-academy"),
      screen.getByTestId("cta-outreach"),
    ];

    ctaButtons.forEach(button => {
      expect(button).toHaveClass("bg-blue-600");
      expect(button).toHaveClass("text-white");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("py-3");
      expect(button).toHaveClass("rounded-lg");
      expect(button).toHaveClass("font-semibold");
    });
  });
});