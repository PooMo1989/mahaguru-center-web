import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GenAlphaAcademyPage from "./page";

// Mock the Navigation component
vi.mock("~/components/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Mock Navigation</nav>,
}));

describe("Gen Alpha Academy Page", () => {
  it("renders the page with navigation component", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });

  it("displays the correct hero section content", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByRole("heading", { name: "Gen Alpha Academy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cultivating Leaders & Wise Minds for the 21st Century" })).toBeInTheDocument();
  });

  it("displays the mission section with introductory text", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByText(/is a visionary non-profit initiative/)).toBeInTheDocument();
    expect(screen.getByText(/dedicated to shaping a better tomorrow/)).toBeInTheDocument();
  });

  it("displays all four pillars of the program", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByRole("heading", { name: "Self-Realization" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Maturity Through Wisdom" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Leadership Training" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Emotional Management" })).toBeInTheDocument();
  });

  it("displays the four pillars section header", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByRole("heading", { name: "What makes the program special" })).toBeInTheDocument();
    expect(screen.getByText(/This is the stepping stone to a comprehensive life-preparation journey/)).toBeInTheDocument();
  });

  it("displays the 'Coming Soon' message for program details", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByRole("heading", { name: "🚀 Program Details Coming Soon" })).toBeInTheDocument();
    expect(screen.getByText(/We're currently finalizing the specific workshop details/)).toBeInTheDocument();
  });

  it("displays the Gen Alpha Academy mission statement", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByRole("heading", { name: "🌱 Gen Alpha Academy Mission" })).toBeInTheDocument();
    expect(screen.getByText(/Gen Alpha Academy is a non-profit initiative founded by Mahaguru Center Australia/)).toBeInTheDocument();
  });

  it("displays why the program matters section", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByRole("heading", { name: "🚀 Why This Program Matters" })).toBeInTheDocument();
    expect(screen.getByText(/In today's world, young people need skills that support long-term success/)).toBeInTheDocument();
  });

  it("does NOT display specific workshop details", () => {
    render(<GenAlphaAcademyPage />);
    
    // Verify no specific workshop details are shown
    expect(screen.queryByText(/August 22nd/)).not.toBeInTheDocument();
    expect(screen.queryByText(/5 Hours/)).not.toBeInTheDocument();
    expect(screen.queryByText(/LKR 5,000/)).not.toBeInTheDocument();
    expect(screen.queryByText(/15 Participants/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reserve Now/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Inquire via WhatsApp/)).not.toBeInTheDocument();
  });

  it("does NOT display registration buttons or pricing", () => {
    render(<GenAlphaAcademyPage />);
    
    // Verify no registration or pricing elements
    expect(screen.queryByRole("button", { name: /Reserve Now/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Inquire via WhatsApp/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Program Contribution/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Investment in Your Future/)).not.toBeInTheDocument();
  });

  it("has responsive layout structure", () => {
    render(<GenAlphaAcademyPage />);
    
    // Check for responsive grid classes
    const pillarsGrid = screen.getByText("Self-Realization").closest('.grid');
    expect(pillarsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
  });

  it("uses consistent styling with gradient background", () => {
    render(<GenAlphaAcademyPage />);
    
    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass('min-h-screen', 'bg-gradient-to-b', 'from-slate-50', 'to-slate-100');
  });

  it("displays pillar descriptions without specific workshop content", () => {
    render(<GenAlphaAcademyPage />);
    
    // Check that pillar descriptions are general, not workshop-specific
    expect(screen.getByText(/Discovering your authentic self/)).toBeInTheDocument();
    expect(screen.getByText(/Developing profound insights/)).toBeInTheDocument();
    expect(screen.getByText(/Building essential leadership skills/)).toBeInTheDocument();
    expect(screen.getByText(/Learning to understand, process/)).toBeInTheDocument();
  });

  it("emphasizes the coming soon nature of detailed information", () => {
    render(<GenAlphaAcademyPage />);
    
    expect(screen.getByText(/Stay tuned for announcements/)).toBeInTheDocument();
    expect(screen.getByText(/upcoming transformative programs/)).toBeInTheDocument();
  });
});